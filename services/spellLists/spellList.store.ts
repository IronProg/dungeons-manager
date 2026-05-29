import { getItemAsync, setItemAsync } from 'expo-secure-store';

import i18n from '@/i18n';

const SPELL_LIST_URL_KEY = 'spell_list_url';

export const getLastExternalSpellsUrl = async () =>
  getItemAsync(SPELL_LIST_URL_KEY);

export const setLastExternalSpellsUrl = async (url: string) =>
  setItemAsync(SPELL_LIST_URL_KEY, url);

export const getCurrentExternalSpellsUrl = () =>
  i18n.locale === 'pt'
    ? process.env.EXPO_PUBLIC_JSON_PT_URL
    : process.env.EXPO_PUBLIC_JSON_EN_URL;
