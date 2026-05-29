import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { jwtDecode } from 'jwt-decode';

import refreshApi from '@/core/api/refresh-api';
import { queryClient } from '@/core/queryClient/queryClient';
import {
  getAccessToken,
  getRefreshToken,
  removeAccessToken,
  removeRefreshToken,
  setAccessToken,
  setRefreshToken,
} from '@/core/utils/tokens';
import type { TokenResponse } from '@/types/user';

let refreshPromise: Promise<TokenResponse> | null = null;
let clockOffset = 0; // serverTime - localTime

const BUFFER_SECONDS = 30;

const isExpired = (token: string) => {
  const { exp } = jwtDecode<{ exp: number }>(token);
  const serverNow = Math.floor((Date.now() + clockOffset) / 1000);

  const expired = serverNow >= exp - BUFFER_SECONDS;

  return expired;
};

export const clockSyncInterceptor = (response: AxiosResponse) => {
  const serverDateHeader = response.headers?.['x-server-time'];

  if (serverDateHeader) {
    const serverTime = new Date(serverDateHeader).getTime();
    const localTime = Date.now();
    clockOffset = serverTime - localTime;
  }
  return response;
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
        refreshPromise ??= regenerateRefreshToken({ refreshToken });

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
