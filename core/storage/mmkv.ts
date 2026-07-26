import { MMKV } from 'react-native-mmkv';

export const queryCacheStorage = new MMKV({ id: 'query-cache' });
export const spellListStorage = new MMKV({ id: 'spell-list' });

// Kept only to delete legacy keys on app start.
export const appConfigStorage = new MMKV({ id: 'app-config' });

const LEGACY_LOCALE_KEY = 'app_locale';
const LEGACY_CHARACTER_ID_KEY = 'current_character_id';

export const clearLegacyStorage = () => {
  appConfigStorage.delete(LEGACY_LOCALE_KEY);
  appConfigStorage.delete(LEGACY_CHARACTER_ID_KEY);
};
