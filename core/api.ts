import axios from 'axios';
import humps from 'humps';
import * as SecureStore from 'expo-secure-store';

export const authKey = 'Authorization';

declare module 'axios' {
  export interface AxiosRequestConfig {
    decamelizeRequest?: boolean;
    camelizeResponse?: boolean;
  }
}

const api = axios.create({
  baseURL: 'http://192.168.1.8:3000',

  decamelizeRequest: true,
  camelizeResponse: true,
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
  config.headers.Authorization = SecureStore.getItem(authKey);

  return config;
});

// Store auth header
api.interceptors.response.use((response) => {
  if (
    response.headers['authorization'] &&
    response.headers['authorization'] !== '-'
  ) {
    SecureStore.setItem(authKey, response.headers['authorization']);
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
