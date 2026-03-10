import { InternalAxiosRequestConfig } from 'axios';
import {
  getAccessToken,
  removeAccessToken,
  removeRefreshToken,
  setRefreshToken,
} from 'core/utils/tokens';

import { getRefreshToken, setAccessToken } from 'core/utils/tokens';

import { jwtDecode } from 'jwt-decode';
import { queryClient } from 'core/queryClient/queryClient';
import { TokenResponse } from 'types/user';
import refreshApi from '../refresh-api';

let refreshPromise: Promise<TokenResponse> | null = null;

const isExpired = (token: string) => {
  const { exp } = jwtDecode<{ exp: number }>(token);

  console.log({
    now: new Date().toLocaleString(),
    expired: Date.now() >= exp * 1000,
    expiration: new Date(exp * 1000).toLocaleString(),
  });
  return Date.now() >= exp * 1000;
};

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

export const refreshTokenInterceptor = async (
  config: InternalAxiosRequestConfig,
) => {
  const token = await getAccessToken();

  if (token && isExpired(token)) {
    const refreshToken = await getRefreshToken();

    if (refreshToken) {
      try {
        if (!refreshPromise) {
          refreshPromise = regenerateRefreshToken({ refreshToken });
        }

        const { accessToken, refreshToken: newRefresh } = await refreshPromise;

        refreshPromise = null;

        await setAccessToken(accessToken);
        await setRefreshToken(newRefresh);

        config.headers.Authorization = `Bearer ${accessToken}`;
      } catch (error) {
        refreshPromise = null;

        queryClient.invalidateQueries({ queryKey: ['auth'] });
        await removeAccessToken();
        await removeRefreshToken();

        return Promise.reject(error);
      }
    }
  } else if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};

const regenerateRefreshToken = ({ refreshToken }: { refreshToken: string }) =>
  refreshApi
    .post<TokenResponse>(`/refresh_token`, { refresh_token: refreshToken })
    .then((res) => res.data);
