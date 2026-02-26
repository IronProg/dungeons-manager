import { I18n } from 'i18n-js';
import * as Localization from 'expo-localization';
import { pt } from './locales/pt';
import { en } from './locales/en';

const i18n = new I18n({ en, pt });

const deviceLocale = Localization.getLocales()[0]?.languageCode ?? 'pt';

i18n.locale = deviceLocale.split('-')[0];
i18n.enableFallback = true;

export default i18n;
