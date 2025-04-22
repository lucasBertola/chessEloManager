import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { en, fr, es, pt } from './translations';

// Fonction pour obtenir la langue initiale
const getInitialLanguage = () => {
  // 1. Vérifier l'URL
  const urlParams = new URLSearchParams(window.location.search);
  const langParam = urlParams.get('lang');
  if (langParam && ['en', 'fr', 'es', 'pt'].includes(langParam)) {
    localStorage.setItem('preferredLanguage', langParam);
    return langParam;
  }

  // 2. Vérifier le localStorage
  const savedLang = localStorage.getItem('preferredLanguage');
  if (savedLang && ['en', 'fr', 'es', 'pt'].includes(savedLang)) {
    return savedLang;
  }

  // 3. Utiliser la langue du navigateur
  const browserLang = navigator.language.split('-')[0];
  const defaultLang = ['en', 'fr', 'es', 'pt'].includes(browserLang) ? browserLang : 'en';
  localStorage.setItem('preferredLanguage', defaultLang);
  return defaultLang;
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      fr: { translation: fr },
      es: { translation: es },
      pt: { translation: pt }
    },
    lng: getInitialLanguage(),
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

// Écouter les changements de langue
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('preferredLanguage', lng);
});

export default i18n; 