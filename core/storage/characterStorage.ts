import { MMKV } from 'react-native-mmkv';
import type { StateStorage } from 'zustand/middleware';

export const characterStorage = new MMKV({ id: 'character' });

export const characterPersistStorage: StateStorage = {
  getItem: (name) => characterStorage.getString(name) ?? null,
  setItem: (name, value) => {
    characterStorage.set(name, value);
  },
  removeItem: (name) => {
    characterStorage.delete(name);
  },
};
