import type { InternalAxiosRequestConfig } from 'axios';

import i18n from '@/i18n';

export const localeRequestInterceptor = (
  config: InternalAxiosRequestConfig,
) => {
  if (config.headers) {
    const locale = i18n.locale || 'en';

    config.headers['X-Accept-Language'] = locale;
  }

  return config;
};
