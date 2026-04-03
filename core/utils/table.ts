import {
  getItemAsync,
  setItemAsync,
  deleteItemAsync,
  getItem,
} from 'expo-secure-store';

const tableId = 'table_id';

export const setTableId = (token: string): Promise<void> => {
  return setItemAsync(tableId, token);
};

export const getTableId = (): string | null => {
  return getItem(tableId);
};

export const getTableIdAsync = (): Promise<string | null> => {
  return getItemAsync(tableId);
};

export const removeTableId = (): Promise<void> => {
  return deleteItemAsync(tableId);
};
