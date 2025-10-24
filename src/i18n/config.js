import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation resources
const resources = {
  en: {
    translation: {
      "app.title": "AeroAI 3D",
      "app.subtitle": "Interactive 3D Engineering Models",
      "app.footer": "Interactive Engineering Education",
      "home.title": "Explore Engineering in 3D",
      "home.subtitle": "Choose a category to view detailed 3D models with interactive controls",
      "home.getStarted": "Get Started Free",
      "nav.language": "Language",
      "nav.login": "Login",
      "nav.signUp": "Sign Up",
      "nav.signOut": "Sign Out",
      "nav.welcome": "Welcome",
      "ai.title": "Quick AI Assistant",
      "ai.placeholder": "Ask anything about rockets, planes, or cars...",
      "ai.ask": "Ask",
      "ai.loading": "Thinking...",
      "categories.title": "Engineering Categories",
      "categories.rockets": "Rockets",
      "categories.rockets.desc": "Space Launch Vehicles",
      "categories.planes": "Aircraft",
      "categories.planes.desc": "Aviation Engineering",
      "categories.cars": "Vehicles",
      "categories.cars.desc": "Automotive Engineering",
      "categories.compare": "Compare Models",
      "categories.compare.desc": "Side-by-side comparison",
      "community.title": "Community Q&A",
      "leaderboard.title": "Leaderboard"
    }
  },
  es: {
    translation: {
      "app.title": "AeroAI 3D",
      "app.subtitle": "Modelos de Ingeniería 3D Interactivos",
      "app.footer": "Educación de Ingeniería Interactiva",
      "home.title": "Explora Ingeniería en 3D",
      "home.subtitle": "Elige una categoría para ver modelos 3D detallados con controles interactivos",
      "home.getStarted": "Comenzar Gratis",
      "nav.language": "Idioma",
      "nav.login": "Iniciar Sesión",
      "nav.signUp": "Registrarse",
      "nav.signOut": "Cerrar Sesión",
      "nav.welcome": "Bienvenido",
      "ai.title": "Asistente IA Rápido",
      "ai.placeholder": "Pregunta sobre cohetes, aviones o autos...",
      "ai.ask": "Preguntar",
      "ai.loading": "Pensando...",
      "categories.title": "Categorías de Ingeniería",
      "categories.rockets": "Cohetes",
      "categories.rockets.desc": "Vehículos de Lanzamiento Espacial",
      "categories.planes": "Aviones",
      "categories.planes.desc": "Ingeniería de Aviación",
      "categories.cars": "Vehículos",
      "categories.cars.desc": "Ingeniería Automotriz",
      "categories.compare": "Comparar Modelos",
      "categories.compare.desc": "Comparación lado a lado",
      "community.title": "Preguntas y Respuestas",
      "leaderboard.title": "Clasificación"
    }
  },
  ar: {
    translation: {
      "app.title": "AeroAI 3D",
      "app.subtitle": "نماذج هندسية ثلاثية الأبعاد تفاعلية",
      "app.footer": "التعليم الهندسي التفاعلي",
      "home.title": "استكشف الهندسة بتقنية ثلاثية الأبعاد",
      "home.subtitle": "اختر فئة لعرض نماذج ثلاثية الأبعاد مفصلة مع عناصر تحكم تفاعلية",
      "home.getStarted": "ابدأ مجاناً",
      "nav.language": "اللغة",
      "nav.login": "تسجيل الدخول",
      "nav.signUp": "إنشاء حساب",
      "nav.signOut": "تسجيل الخروج",
      "nav.welcome": "مرحباً",
      "ai.title": "مساعد الذكاء الاصطناعي السريع",
      "ai.placeholder": "اسأل عن الصواريخ أو الطائرات أو السيارات...",
      "ai.ask": "اسأل",
      "ai.loading": "جاري التفكير...",
      "categories.title": "فئات الهندسة",
      "categories.rockets": "صواريخ",
      "categories.rockets.desc": "مركبات الإطلاق الفضائية",
      "categories.planes": "طائرات",
      "categories.planes.desc": "هندسة الطيران",
      "categories.cars": "مركبات",
      "categories.cars.desc": "هندسة السيارات",
      "categories.compare": "مقارنة النماذج",
      "categories.compare.desc": "مقارنة جنباً إلى جنب",
      "community.title": "أسئلة وأجوبة المجتمع",
      "leaderboard.title": "لوحة المتصدرين"
    }
  },
  fr: {
    translation: {
      "app.title": "AeroAI 3D",
      "app.subtitle": "Modèles d'Ingénierie 3D Interactifs",
      "app.footer": "Éducation en Ingénierie Interactive",
      "home.title": "Explorez l'Ingénierie en 3D",
      "home.subtitle": "Choisissez une catégorie pour voir des modèles 3D détaillés avec des contrôles interactifs",
      "home.getStarted": "Commencer Gratuitement",
      "nav.language": "Langue",
      "nav.login": "Se Connecter",
      "nav.signUp": "S'inscrire",
      "nav.signOut": "Se Déconnecter",
      "nav.welcome": "Bienvenue",
      "ai.title": "Assistant IA Rapide",
      "ai.placeholder": "Posez des questions sur les fusées, avions ou voitures...",
      "ai.ask": "Demander",
      "ai.loading": "Réflexion...",
      "categories.title": "Catégories d'Ingénierie",
      "categories.rockets": "Fusées",
      "categories.rockets.desc": "Véhicules de Lancement Spatial",
      "categories.planes": "Avions",
      "categories.planes.desc": "Ingénierie Aéronautique",
      "categories.cars": "Véhicules",
      "categories.cars.desc": "Ingénierie Automobile",
      "categories.compare": "Comparer les Modèles",
      "categories.compare.desc": "Comparaison côte à côte",
      "community.title": "Questions et Réponses",
      "leaderboard.title": "Classement"
    }
  }
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

export default i18n;
