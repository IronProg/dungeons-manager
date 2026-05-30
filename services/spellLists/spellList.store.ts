import { spellListStorage } from '@/core/storage/mmkv';
import i18n from '@/i18n';

const SPELL_LIST_URL_KEY = 'spell_list_url';

export const getLastExternalSpellsUrl = () =>
  spellListStorage.getString(SPELL_LIST_URL_KEY) ?? null;

export const setLastExternalSpellsUrl = (url: string) =>
  spellListStorage.set(SPELL_LIST_URL_KEY, url);

export const getCurrentExternalSpellsUrl = () =>
  i18n.locale === 'pt'
    ? process.env.EXPO_PUBLIC_JSON_PT_URL
    : process.env.EXPO_PUBLIC_JSON_EN_URL;
