import { Localization } from 'expo-localization';
import i18n from 'i18n-js';

const locale = Localization.locale;

const translations = locale => {
  switch (locale) {
    case 'ja-JP':
      return () => require('./jp.json');
    default:
      return () => require('./en.json');
  }
};

i18n.fallbacks = true;
i18n.translations = { [locale]: translations(locale)() };
i18n.locale = locale;

export default i18n;
