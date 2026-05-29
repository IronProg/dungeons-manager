import type { InternalAxiosRequestConfig } from 'axios';

import { getTableIdAsync } from '@/core/utils/table';

export const tableRequestInterceptor = async (
  config: InternalAxiosRequestConfig,
) => {
  if (config.headers) {
    const tableId = await getTableIdAsync();

    if (tableId) config.headers['X-Table-Id'] = tableId;
  }

  return config;
};
