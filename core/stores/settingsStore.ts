import * as Localization from 'expo-localization';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import {
  settingsPersistStorage,
  settingsStorage,
} from '@/core/storage/settingsStorage';
import i18n from '@/i18n';

export type SupportedLocale = 'en' | 'pt';

const normalizeLocale = (raw?: string): SupportedLocale => {
  const code = raw?.split('-')[0];

  return code === 'en' || code === 'pt' ? code : 'en';
};

const getDeviceLocale = (): SupportedLocale => {
  return normalizeLocale(
    Localization.getLocales()[0]?.languageCode ?? undefined,
  );
};

const readPersistedLocale = (): SupportedLocale | undefined => {
  try {
    const raw = settingsStorage.getString('settings-store');

    if (!raw) return undefined;

    const parsed = JSON.parse(raw) as { state?: { language?: unknown } };
    const language = parsed.state?.language;

    return language === 'en' || language === 'pt' ? language : undefined;
  } catch {
    return undefined;
  }
};

type SettingsState = {
  language: SupportedLocale;
  diceRollingEnabled: boolean;
  setLanguage: (language: SupportedLocale) => void;
  setDiceRollingEnabled: (enabled: boolean) => void;
};

type SettingsPersistedState = Pick<
  SettingsState,
  'language' | 'diceRollingEnabled'
>;

const initialLanguage = readPersistedLocale() ?? getDeviceLocale();

export const useSettingsStore = create<SettingsState>()(
  persist<SettingsState, [], [], SettingsPersistedState>(
    (set) => ({
      language: initialLanguage,
      diceRollingEnabled: true,
      setLanguage: (language) => {
        i18n.locale = language;
        set({ language });
      },
      setDiceRollingEnabled: (diceRollingEnabled) =>
        set({ diceRollingEnabled }),
    }),
    {
      name: 'settings-store',
      storage: createJSONStorage(() => settingsPersistStorage),
      partialize: (state) => ({
        language: state.language,
        diceRollingEnabled: state.diceRollingEnabled,
      }),
    },
  ),
);

i18n.locale = useSettingsStore.getState().language;
