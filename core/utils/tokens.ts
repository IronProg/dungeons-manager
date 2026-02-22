import { getItemAsync, setItemAsync, deleteItemAsync } from 'expo-secure-store';

const access_token = 'access_token';
const refresh_token = 'refresh_token';

export const setAccessToken = (token: string): Promise<void> => {
  return setItemAsync(access_token, token);
};

export const getAccessToken = (): Promise<string | null> => {
  return getItemAsync(access_token);
};

export const removeAccessToken = (): Promise<void> => {
  return deleteItemAsync(access_token);
};

export const setRefreshToken = (token: string): Promise<void> => {
  return setItemAsync(refresh_token, token);
};

export const getRefreshToken = (): Promise<string | null> => {
  return getItemAsync(refresh_token);
};

export const removeRefreshToken = (): Promise<void> => {
  return deleteItemAsync(refresh_token);
};
