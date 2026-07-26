import {
  useSettingsStore,
  type SupportedLocale,
} from '@/core/stores/settingsStore';

export const useLanguage = () => {
  const locale = useSettingsStore((state) => state.language);
  const setLocale = useSettingsStore((state) => state.setLanguage);

  return { locale, setLocale };
};

export type { SupportedLocale };
