import { I18n } from 'i18n-js';
import * as Localization from 'expo-localization';
import { pt } from './locales/pt';

const i18n = new I18n({
  pt,
  en: {
    save: 'Save',
    cancel: 'Cancel',
  },
});

i18n.locale = Localization.getLocales()[0]?.languageCode ?? 'pt';
i18n.enableFallback = true;

export default i18n;
