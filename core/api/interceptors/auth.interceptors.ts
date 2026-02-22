import { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { getAccessToken, setRefreshToken } from 'core/utils/tokens';

import {
  getRefreshToken,
  removeAccessToken,
  removeRefreshToken,
  setAccessToken,
} from 'core/utils/tokens';
import { authService } from 'services/auth/auth.service';
import api from '../api';
import { queryClient } from 'core/queryClient/queryClient';

export const authRequestInterceptor = async (
  config: InternalAxiosRequestConfig,
) => {
  if (config.headers) {
    config.headers['Content-Type'] = 'application/json';
    config.headers['Timezone-Val'] =
      Intl.DateTimeFormat().resolvedOptions().timeZone;

    const token = await getAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
};

let isRefreshing = false;
let failedQueue: {
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}[] = [];

const processQueue = (error: unknown, token?: string) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else if (token) {
      promise.resolve(token);
    }
  });

  failedQueue = [];
};

export const authErrorInterceptor = async (error: AxiosError) => {
  const originalRequest = error.config as InternalAxiosRequestConfig & {
    _retry?: boolean;
  };

  if (!originalRequest) {
    return Promise.reject(error);
  }

  if (error.response?.status !== 401) {
    return Promise.reject(error);
  }

  if (originalRequest._retry) {
    return Promise.reject(error);
  }

  if (isRefreshing) {
    return new Promise((resolve, reject) => {
      failedQueue.push({
        resolve: (token: string) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          resolve(api(originalRequest));
        },
        reject,
      });
    });
  }

  originalRequest._retry = true;
  isRefreshing = true;

  try {
    const refreshToken = await getRefreshToken();

    if (!refreshToken) {
      throw new Error('No refresh token');
    }

    const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
      await authService.refreshToken({ refreshToken });

    await setAccessToken(newAccessToken);
    await setRefreshToken(newRefreshToken);

    processQueue(null, newAccessToken);

    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

    return api(originalRequest);
  } catch (refreshError) {
    processQueue(refreshError);

    await removeAccessToken();
    await removeRefreshToken();

    queryClient.setQueryData(['auth'], null);

    return Promise.reject(refreshError);
  } finally {
    isRefreshing = false;
  }
};
