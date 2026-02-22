import { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import humps from 'humps';

export const camelizeRequestInterceptor = (
  config: InternalAxiosRequestConfig,
) => {
  if (config.decamelizeRequest) {
    if (!(config.data instanceof FormData)) {
      config.data = humps.decamelizeKeys(config.data);
    }

    if (config.params) {
      config.params = humps.decamelizeKeys(config.params);
    }
  }

  return config;
};

export const decamelizeResponseInterceptor = (response: AxiosResponse) => {
  if (response.config.responseType && response.config.responseType !== 'json') {
    return response;
  }

  if (response.config.camelizeResponse && response.data) {
    response.data = humps.camelizeKeys(response.data);
  }

  return response;
};
