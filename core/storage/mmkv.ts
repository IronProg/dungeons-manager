import { MMKV } from 'react-native-mmkv';

export const queryCacheStorage = new MMKV({ id: 'query-cache' });

export const spellListStorage = new MMKV({ id: 'spell-list' });

export const appConfigStorage = new MMKV({ id: 'app-config' });

const CHARACTER_ID_KEY = 'current_character_id';
const LOCALE_KEY = 'app_locale';

export const getPersistedLocale = (): 'en' | 'pt' | undefined => {
  const raw = appConfigStorage.getString(LOCALE_KEY);
  if (raw === 'en' || raw === 'pt') return raw;
  return undefined;
};

export const setPersistedLocale = (locale: 'en' | 'pt') => {
  appConfigStorage.set(LOCALE_KEY, locale);
};

export const getPersistedCharacterId = (): number | undefined => {
  const raw = appConfigStorage.getString(CHARACTER_ID_KEY);
  if (!raw) return undefined;
  const parsed = Number(raw);
  return Number.isNaN(parsed) ? undefined : parsed;
};

export const setPersistedCharacterId = (id: number | undefined) => {
  if (id === undefined) {
    appConfigStorage.delete(CHARACTER_ID_KEY);
  } else {
    appConfigStorage.set(CHARACTER_ID_KEY, String(id));
  }
};
