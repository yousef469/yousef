import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import en from '../translations/en.json';
import es from '../translations/es.json';
import ar from '../translations/ar.json';
import fr from '../translations/fr.json';
import zh from '../translations/zh.json';
import hi from '../translations/hi.json';
import pt from '../translations/pt.json';
import ru from '../translations/ru.json';

// Translation resources
const resources = {
  en: { translation: en },
  es: { translation: es },
  ar: { translation: ar },
  fr: { translation: fr },
  zh: { translation: zh },
  hi: { translation: hi },
  pt: { translation: pt },
  ru: { translation: ru }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('preferredLanguage') || 'en',
    fallbackLng: 'en',
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    },
    interpolation: {
      escapeValue: false
    },
    react: {
      useSuspense: false
    }
  });

// RTL languages list
const rtlLanguages = ['ar', 'he', 'fa', 'ur'];

// Set document direction based on language
const setDocumentDirection = (language) => {
  const isRTL = rtlLanguages.includes(language);
  document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
  document.documentElement.lang = language;
};

// Set initial direction
setDocumentDirection(i18n.language);

// Update direction when language changes
i18n.on('languageChanged', (lng) => {
  setDocumentDirection(lng);
});

export default i18n;
