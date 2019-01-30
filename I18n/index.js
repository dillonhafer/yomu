import { Localization } from 'expo-localization';
import i18n from 'i18n-js';

export const locale = Localization.locale;

const translations = locale => {
  switch (locale) {
    case 'ja-JP':
      return () => require('./jp.json');
    case 'en-US':
    default:
      return () => require('./en.json');
  }
};

i18n.fallbacks = true;
i18n.translations = { [locale]: translations(locale)() };
i18n.locale = locale;

export const weekDays = {
  'ja-JP': ['日', '月', '火', '水', '木', '金', '土'],
  'en-US': ['S', 'M', 'T', 'W', 'R', 'F', 'S'],
}[locale];

export default i18n;
