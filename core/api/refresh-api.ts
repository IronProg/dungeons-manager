import axios from 'axios';

import {
  camelizeRequestInterceptor,
  decamelizeResponseInterceptor,
} from '@/core/api/interceptors/humps.interceptors';
import { localeRequestInterceptor } from '@/core/api/interceptors/locale.interceptors';

export const authHeader = 'Authorization';

declare module 'axios' {
  export interface AxiosRequestConfig {
    decamelizeRequest?: boolean;
    camelizeResponse?: boolean;
  }
}

const refreshApi = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  decamelizeRequest: true,
  camelizeResponse: true,
  timeout: 15000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
});

refreshApi.interceptors.request.use(camelizeRequestInterceptor);
refreshApi.interceptors.request.use(localeRequestInterceptor);

refreshApi.interceptors.response.use(decamelizeResponseInterceptor);

export default refreshApi;
