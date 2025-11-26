import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Rocket, Plane, Car, Sparkles, ArrowLeftRight, Users as UsersIcon, Lock, LogIn, UserPlus, Globe, User, ChevronDown, Upload, Briefcase, Share2, Calculator, Maximize2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { useProgress } from '../contexts/ProgressContext';
import ModelComparison from '../components/ModelComparison';
import LanguageSelector from '../components/LanguageSelector';
import MixpanelTest from '../components/MixpanelTest';
import SidebarMenu from '../components/SidebarMenu';
import ContinueLearning from '../components/ContinueLearning';
import CourseOverview from '../components/CourseOverview';
import Logo from '../components/Logo';

const HomePageLoggedIn = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user, signOut, showLanguageSelector, setShowLanguageSelector } = useAuth();
  const { progress } = useProgress();
  const [showComparison, setShowComparison] = useState(false);
  const [showLangModal, setShowLangModal] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  
  // Calculate overall progress
  const totalLessons = 88;
  const completedLessons = Object.keys(progress.completedLessons).length;
  const overallProgress = (completedLessons / totalLessons) * 100;

  useEffect(() => {
    if (showLanguageSelector) {
      setShowLangModal(true);
    }
  }, [showLanguageSelector]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <SidebarMenu />
      
      <header className="border-b border-primary/20 bg-background/50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Logo size="md" showText={true} />
              
              <nav className="hidden md:flex items-center gap-6">
                <button onClick={() => navigate('/about')} className="text-white hover:text-primary transition-colors font-medium">About</button>
                <button onClick={() => navigate('/pricing')} className="text-white hover:text-primary transition-colors font-medium">Pricing</button>
              </nav>
            </div>
            
            <div className="flex items-center gap-3">
              <button onClick={() => setShowLangModal(true)} className="flex items-center gap-2 px-4 py-2 bg-background-light hover:bg-background-light rounded-lg transition-colors text-sm font-medium">
                <Globe className="w-4 h-4" />
                <span className="hidden sm:inline">{t('nav.language')}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-bold mb-4 text-white">
          {t('home.hero.title')}
        </h2>
        
        {/* Welcome Message */}
        <p className="text-2xl font-semibold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-6">
          {t('home.hero.welcome')}
        </p>
        
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          {t('home.hero.subtitle')}
        </p>
      </div>

      {/* Continue Learning - Only show if user has progress */}
      {completedLessons > 0 && (
        <div className="mb-12 max-w-6xl mx-auto">
          <ContinueLearning />
        </div>
      )}

      {/* Main Section - Learn Mechanics */}
      <div className="max-w-3xl mx-auto mb-12">
        <button
          onClick={() => navigate('/learn')}
          className="w-full group relative bg-gradient-to-br from-secondary to-secondary-dark hover:from-secondary-light hover:to-secondary rounded-2xl p-12 border-2 border-secondary hover:border-secondary-light transition-all cursor-pointer hover:scale-105"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity" />
          
          <div className="relative z-10">
            <div className="flex items-center justify-center gap-6 mb-8">
              <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Rocket className="w-8 h-8 text-white" />
              </div>
              <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Plane className="w-8 h-8 text-white" />
              </div>
              <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Car className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <h3 className="text-3xl font-bold mb-4 text-white text-center">Learn Mechanics</h3>
            <p className="text-white/90 text-center text-lg mb-6">
              Choose from Rockets, Planes, or Cars to start learning
            </p>
            
            <div className="flex items-center justify-center text-white font-semibold group-hover:gap-3 gap-2 transition-all text-lg">
              <span>Explore Categories</span>
              <span className="text-2xl group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </div>
        </button>
      </div>

      {/* Interactive Features Section */}
      <div className="mt-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            {t('home.interactive.title')}
          </h2>
          <p className="text-text-secondary">{t('home.interactive.subtitle')}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {/* Compare Models - Locked */}
          <div className="relative group">
            <button
              onClick={() => navigate('/pricing')}
              className="w-full relative bg-gradient-to-br from-red-500 via-pink-600 to-purple-500 hover:from-gray-600 hover:via-gray-700 hover:to-gray-800 rounded-2xl p-8 border-2 border-red-400/50 hover:border-gray-500 transition-all cursor-pointer hover:scale-105 hover:shadow-xl shadow-red-500/30"
            >
              <div className="absolute top-4 right-4 w-12 h-12 bg-black/50 backdrop-blur rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Lock className="w-6 h-6 text-white" />
              </div>
              
              <div className="relative z-10 opacity-75 group-hover:opacity-100 transition-opacity">
                <div className="flex justify-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur">
                    <ArrowLeftRight className="w-8 h-8 text-white" />
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold mb-3 text-white text-center">⚖️ {t('home.compare.title')}</h3>
                <p className="text-white/90 text-center mb-4">
                  {t('home.compare.desc')}
                </p>

                <div className="flex items-center justify-center gap-2 text-white font-semibold">
                  <Lock className="w-4 h-4" />
                  <span>Upgrade to Unlock</span>
                </div>
              </div>
            </button>
          </div>


          {/* Career Projects */}
          <button
            onClick={() => navigate('/projects')}
            className="group relative bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-500 hover:from-emerald-600 hover:via-teal-700 hover:to-cyan-600 rounded-2xl p-8 border-2 border-emerald-400/50 hover:border-emerald-300 transition-all cursor-pointer hover:scale-105 hover:shadow-xl shadow-emerald-500/30"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity" />
            
            <div className="relative z-10">
              <div className="flex justify-center gap-4 mb-6">
                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur">
                  <Briefcase className="w-8 h-8 text-white" />
                </div>
              </div>
              
              <h3 className="text-2xl font-bold mb-3 text-white text-center">💼 Career Projects</h3>
              <p className="text-white/90 text-center mb-4">
                Build real-world engineering projects for your portfolio
              </p>

              <div className="flex items-center justify-center gap-2 text-white font-semibold">
                <span>Start Building</span>
                <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          </button>

          {/* Community */}
          <button
            onClick={() => navigate('/community')}
            className="group relative bg-gradient-to-br from-pink-500 via-rose-600 to-red-500 hover:from-pink-600 hover:via-rose-700 hover:to-red-600 rounded-2xl p-8 border-2 border-pink-400/50 hover:border-pink-300 transition-all cursor-pointer hover:scale-105 hover:shadow-xl shadow-pink-500/30"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity" />
            
            <div className="relative z-10">
              <div className="flex justify-center gap-4 mb-6">
                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur">
                  <UsersIcon className="w-8 h-8 text-white" />
                </div>
              </div>
              
              <h3 className="text-2xl font-bold mb-3 text-white text-center">🌍 Community</h3>
              <p className="text-white/90 text-center mb-4">
                Ask questions, share projects, and learn together
              </p>

              <div className="flex items-center justify-center gap-2 text-white font-semibold">
                <span>Join Community</span>
                <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          </button>

          {/* Explode View Mode */}
          <button
            onClick={() => navigate('/explode-view')}
            className="group relative bg-gradient-to-br from-orange-500 via-amber-600 to-yellow-500 hover:from-orange-600 hover:via-amber-700 hover:to-yellow-600 rounded-2xl p-8 border-2 border-orange-400/50 hover:border-orange-300 transition-all cursor-pointer hover:scale-105 hover:shadow-xl shadow-orange-500/30"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity" />
            
            <div className="relative z-10">
              <div className="flex justify-center gap-4 mb-6">
                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur">
                  <Maximize2 className="w-8 h-8 text-white" />
                </div>
              </div>
              
              <h3 className="text-2xl font-bold mb-3 text-white text-center">🔧 Explode View Mode</h3>
              <p className="text-white/90 text-center mb-4">
                Explore 3D models with interactive exploded views. Click parts to highlight and focus.
              </p>

              <div className="flex items-center justify-center gap-2 text-white font-semibold">
                <span>Try Explode View</span>
                <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          </button>
        </div>
      </div>
      </div>

      <footer className="border-t border-primary/20 mt-20 py-10 bg-gray-900/80">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex justify-center items-center gap-6 mb-6">
            <a 
              href="mailto:youseflovemessi@gmail.com" 
              className="text-white hover:text-cyan-400 transition-colors text-lg font-semibold underline"
            >
              Help
            </a>
            <span className="text-gray-500 text-2xl">|</span>
            <a 
              href="/privacy" 
              className="text-white hover:text-cyan-400 transition-colors text-lg font-semibold underline"
            >
              Privacy
            </a>
            <span className="text-gray-500 text-2xl">|</span>
            <a 
              href="/terms" 
              className="text-white hover:text-cyan-400 transition-colors text-lg font-semibold underline"
            >
              Terms
            </a>
          </div>
          <p className="text-gray-400">{t('home.footer.copyright')}</p>
          <p className="text-xs mt-2 text-gray-600">{t('home.footer.version')}</p>
        </div>
      </footer>

      <ModelComparison isOpen={showComparison} onClose={() => setShowComparison(false)} />
      <LanguageSelector isOpen={showLangModal} onClose={() => { setShowLangModal(false); if (setShowLanguageSelector) { setShowLanguageSelector(false); }}} />
      {selectedCourse && <CourseOverview courseId={selectedCourse} onClose={() => setSelectedCourse(null)} />}
      {import.meta.env.DEV && <MixpanelTest />}
    </div>
  );
};

export default HomePageLoggedIn;
