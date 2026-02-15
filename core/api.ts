import axios from 'axios';
import humps from 'humps';
import * as SecureStore from 'expo-secure-store';

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
    'X-Requested-With': 'XMLHttpRequest', // Isso ajuda o Rails a entender que é uma chamada de API
  },
});

// Decamelize request
api.interceptors.request.use((config) => {
  if (config.decamelizeRequest) {
    if (
      // Skip decamelize with FormData's
      !(config.data instanceof FormData)
    ) {
      config.data = humps.decamelizeKeys(config.data);
    }

    if (config.params) {
      config.params = humps.decamelizeKeys(config.params);
    }
  }

  return config;
});

// Send auth header
api.interceptors.request.use((config) => {
  config.headers.Authorization = SecureStore.getItem(authHeader);

  return config;
});

// Store auth header
api.interceptors.response.use((response) => {
  if (
    response.headers['authorization'] &&
    response.headers['authorization'] !== '-'
  ) {
    SecureStore.setItem(authHeader, response.headers['authorization']);
  }

  return response;
});

// Camelize response
api.interceptors.response.use((response) => {
  if (response.config.responseType && response.config.responseType !== 'json') {
    return response;
  }

  if (response.config.camelizeResponse && response.data) {
    response.data = humps.camelizeKeys(response.data);
  }

  return response;
});

export default api;
