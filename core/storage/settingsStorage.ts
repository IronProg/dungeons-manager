import { MMKV } from 'react-native-mmkv';
import type { StateStorage } from 'zustand/middleware';

export const settingsStorage = new MMKV({ id: 'settings' });

export const settingsPersistStorage: StateStorage = {
  getItem: (name) => settingsStorage.getString(name) ?? null,
  setItem: (name, value) => {
    settingsStorage.set(name, value);
  },
  removeItem: (name) => {
    settingsStorage.delete(name);
  },
};
