import { InternalAxiosRequestConfig } from 'axios';
import { getAccessToken, setRefreshToken } from 'core/utils/tokens';

import { getRefreshToken, setAccessToken } from 'core/utils/tokens';
import { authService } from 'services/auth/auth.service';

import { jwtDecode } from 'jwt-decode';

const isExpired = (token: string) => {
  const { exp } = jwtDecode<{ exp: number }>(token);

  console.log({ exp: new Date(exp * 1000) });
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
      const { accessToken, refreshToken: newRefresh } =
        await authService.refreshToken({ refreshToken });

      console.log({ accessToken, newRefresh });

      await setAccessToken(accessToken);
      await setRefreshToken(newRefresh);

      config.headers.Authorization = `Bearer ${accessToken}`;
    }
  } else if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};
