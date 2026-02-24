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

const isExpired = (token: string) => {
  const { exp } = jwtDecode<{ exp: number }>(token);

  return Date.now() >= exp * 1000 - 20_000;
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
        const { accessToken, refreshToken: newRefresh } =
          await regenerateRefreshToken({
            refreshToken,
          });

        await setAccessToken(accessToken);
        await setRefreshToken(newRefresh);

        config.headers.Authorization = `Bearer ${accessToken}`;
      } catch {
        queryClient.invalidateQueries({ queryKey: ['auth'] });
        await removeAccessToken();
        await removeRefreshToken();
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
