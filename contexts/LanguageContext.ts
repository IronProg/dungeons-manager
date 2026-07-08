import { createContext, useContext } from 'react';

export type SupportedLocale = 'en' | 'pt';

export type LanguageContextType = {
  locale: SupportedLocale;
  setLocale: (locale: SupportedLocale) => void;
};

export const LanguageContext = createContext<LanguageContextType | null>(null);

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);

  if (!ctx) throw new Error('useLanguage must be used inside LanguageProvider');

  return ctx;
};
