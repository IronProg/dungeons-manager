import * as Localization from 'expo-localization';
import { useState } from 'react';

import {
  LanguageContext,
  type SupportedLocale,
} from '@/contexts/LanguageContext';
import { getPersistedLocale, setPersistedLocale } from '@/core/storage/mmkv';
import i18n from '@/i18n';

const normalizeLocale = (raw?: string): SupportedLocale => {
  const code = raw?.split('-')[0];
  return code === 'en' || code === 'pt' ? code : 'pt';
};

export const LanguageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [locale, setLocaleState] = useState<SupportedLocale>(() => {
    const stored = getPersistedLocale();
    const initial =
      stored ??
      normalizeLocale(Localization.getLocales()[0]?.languageCode ?? undefined);
    i18n.locale = initial;
    return initial;
  });

  const setLocale = (newLocale: SupportedLocale) => {
    // eslint-disable-next-line react-compiler/react-compiler
    i18n.locale = newLocale;
    setPersistedLocale(newLocale);
    setLocaleState(newLocale);
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale }}>
      {children}
    </LanguageContext.Provider>
  );
};
