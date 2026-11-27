import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import uzTranslation from './locales/uz/translation.json';
import ruTranslation from './locales/ru/translation.json';
import enTranslation from './locales/en/translation.json';

const resources = {
  uz: {
    translation: uzTranslation,
  },
  ru: {
    translation: ruTranslation,
  },
  en: {
    translation: enTranslation,
  },
};

// Detect saved language or initial url param if any
const savedLang = localStorage.getItem('i18nextLng') || 'uz';
const validLangs = ['uz', 'ru', 'en'];
const initialLang = validLangs.includes(savedLang) ? savedLang : 'uz';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: initialLang,
    fallbackLng: 'uz',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
