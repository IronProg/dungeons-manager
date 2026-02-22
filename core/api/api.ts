import axios from 'axios';

import {
  authErrorInterceptor,
  authRequestInterceptor,
} from './interceptors/auth.interceptors';
import {
  camelizeRequestInterceptor,
  decamelizeResponseInterceptor,
} from './interceptors/humps.interceptors';

export const authHeader = 'Authorization';

declare module 'axios' {
  export interface AxiosRequestConfig {
    decamelizeRequest?: boolean;
    camelizeResponse?: boolean;
  }
}

const api = axios.create({
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

api.interceptors.request.use(camelizeRequestInterceptor);

api.interceptors.request.use(authRequestInterceptor);

api.interceptors.response.use((response) => response, authErrorInterceptor);

api.interceptors.response.use(decamelizeResponseInterceptor);

export default api;
