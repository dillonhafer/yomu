import { Localization } from 'expo-localization';
import i18n from 'i18n-js';

export const locale = Localization.locale;
export const localeShort = locale.split('-')[0];

const translations = locale => {
  switch (locale) {
    case 'ja':
      return () => require('./ja.json');
    case 'pt':
      return () => require('./pt.json');
    case 'en':
    default:
      return () => require('./en.json');
  }
};

i18n.fallbacks = true;
i18n.translations = { [locale]: translations(localeShort)() };
i18n.locale = locale;

export const weekDays = [
  i18n.t('weekDays.sun'),
  i18n.t('weekDays.mon'),
  i18n.t('weekDays.tue'),
  i18n.t('weekDays.wed'),
  i18n.t('weekDays.thu'),
  i18n.t('weekDays.fri'),
  i18n.t('weekDays.sat'),
];

export default i18n;
