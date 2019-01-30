import { Localization } from 'expo-localization';
import i18n from 'i18n-js';

export const locale = Localization.locale;
export const localeShort = locale.split('-')[0];

const translations = locale => {
  switch (locale) {
    case 'ja':
      return () => require('./jp.json');
    case 'en':
    default:
      return () => require('./en.json');
  }
};

i18n.fallbacks = true;
i18n.translations = { [locale]: translations(localeShort)() };
i18n.locale = locale;

export const weekDays = {
  ja: ['日', '月', '火', '水', '木', '金', '土'],
  en: ['S', 'M', 'T', 'W', 'R', 'F', 'S'],
}[localeShort];

export default i18n;
