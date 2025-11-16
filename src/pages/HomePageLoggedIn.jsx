import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Rocket, Plane, Car, Sparkles, ArrowLeftRight, Users as UsersIcon, Lock, LogIn, UserPlus, Globe, User, ChevronDown, Upload } from 'lucide-react';
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
                <button onClick={() => navigate('/ai-generator')} className="text-white hover:text-primary transition-colors font-medium">AI 3D</button>
                <button onClick={() => navigate('/pricing')} className="text-white hover:text-primary transition-colors font-medium">Pricing</button>
              </nav>
            </div>
            
            <div className="flex items-center gap-3">
              <button onClick={() => setShowLangModal(true)} className="flex items-center gap-2 px-4 py-2 bg-background-light hover:bg-background-light rounded-lg transition-colors text-sm font-medium">
                <Globe className="w-4 h-4" />
                <span className="hidden sm:inline">{t('nav.language')}</span>
              </button>

              {user ? (
                <div className="relative">
                  <button onClick={() => setShowProfileMenu(!showProfileMenu)} className="flex items-center gap-2 px-4 py-2 bg-background-light hover:bg-background-light rounded-lg transition-colors text-sm font-medium">
                    <User className="w-4 h-4" />
                    <span className="hidden sm:inline">{user.email?.split('@')[0]}</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  
                  {showProfileMenu && (
                    <div className="absolute right-0 mt-2 w-56 bg-background-light border border-primary/20 rounded-lg shadow-xl z-50">
                      <div className="p-3 border-b border-primary/20">
                        <p className="text-xs text-text-secondary">Signed in as</p>
                        <p className="text-sm text-white truncate">{user.email}</p>
                      </div>
                      <div className="py-2">
                        <button onClick={() => { navigate('/dashboard'); setShowProfileMenu(false); }} className="w-full flex items-center gap-3 px-4 py-2 hover:bg-background-light transition-colors text-left">
                          <User className="w-4 h-4 text-primary" />
                          <span className="text-sm">Dashboard</span>
                        </button>
                        <button onClick={() => { navigate('/upload'); setShowProfileMenu(false); }} className="w-full flex items-center gap-3 px-4 py-2 hover:bg-background-light transition-colors text-left">
                          <Upload className="w-4 h-4 text-secondary" />
                          <span className="text-sm">Upload Model</span>
                        </button>
                        <button onClick={() => { navigate('/collaborate'); setShowProfileMenu(false); }} className="w-full flex items-center gap-3 px-4 py-2 hover:bg-background-light transition-colors text-left">
                          <UsersIcon className="w-4 h-4 text-accent" />
                          <span className="text-sm">Collaborate</span>
                        </button>
                      </div>
                      <div className="border-t border-primary/20 py-2">
                        <button onClick={() => { signOut(); setShowProfileMenu(false); }} className="w-full flex items-center gap-3 px-4 py-2 hover:bg-background-light transition-colors text-left text-red-400">
                          <LogIn className="w-4 h-4" />
                          <span className="text-sm">{t('nav.signOut')}</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <button onClick={() => navigate('/auth')} className="flex items-center gap-2 px-4 py-2 bg-background-light hover:bg-background-light rounded-lg transition-colors text-sm font-medium">
                    <LogIn className="w-4 h-4" />
                    <span>{t('nav.login')}</span>
                  </button>
                  <button onClick={() => navigate('/auth')} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-lg transition-colors text-sm font-medium">
                    <UserPlus className="w-4 h-4" />
                    <span>{t('nav.signUp')}</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent hero-title-glow">
          {t('home.hero.title')}
        </h2>
        
        {/* Welcome Message */}
        <p className="text-2xl font-semibold text-white/90 mb-3 animate-fade-in">
          {t('home.hero.welcome')}
        </p>
        
        <p className="text-xl text-text max-w-2xl mx-auto mb-6">
          {t('home.hero.subtitle')}
        </p>
        
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/20 border-2 border-secondary rounded-full">
          <Sparkles className="w-4 h-4 text-secondary" />
          <span className="text-sm font-semibold text-secondary">
            {t('home.hero.new')}
          </span>
        </div>
      </div>

      {/* Continue Learning - Only show if user has progress */}
      {completedLessons > 0 && (
        <div className="mb-12 max-w-6xl mx-auto">
          <ContinueLearning />
        </div>
      )}

      {/* Main Sections Grid - 2 Primary Features */}
      <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto mb-8">
        {/* 3D Models Viewer */}
        <button
          onClick={() => navigate('/viewer')}
          className="group relative bg-gradient-to-br from-primary to-primary-dark hover:from-primary-light hover:to-primary rounded-2xl p-8 border-2 border-primary hover:border-primary-light transition-all cursor-pointer hover:scale-105"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity" />
          
          <div className="relative z-10">
            <div className="flex justify-center gap-4 mb-6">
              <div className="w-14 h-14 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Rocket className="w-7 h-7 text-white" />
              </div>
              <div className="w-14 h-14 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform delay-75">
                <Plane className="w-7 h-7 text-white" />
              </div>
              <div className="w-14 h-14 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform delay-150">
                <Car className="w-7 h-7 text-white" />
              </div>
            </div>
            
            <h3 className="text-2xl font-bold mb-3 text-white text-center">{t('home.viewer.title')}</h3>
            <p className="text-white/90 text-center mb-4">
              {t('home.viewer.desc')}
            </p>
            
            <div className="flex items-center justify-center text-white font-semibold group-hover:gap-3 gap-2 transition-all">
              <span>{t('home.viewer.button')}</span>
              <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </div>
        </button>

        {/* Learn Mechanics */}
        <button
          onClick={() => navigate('/learn')}
          className="group relative bg-gradient-to-br from-secondary to-secondary-dark hover:from-secondary-light hover:to-secondary rounded-2xl p-8 border-2 border-secondary hover:border-secondary-light transition-all cursor-pointer hover:scale-105"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity" />
          
          <div className="relative z-10">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Rocket className="w-6 h-6 text-white" />
              </div>
              <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Plane className="w-6 h-6 text-white" />
              </div>
              <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Car className="w-6 h-6 text-white" />
              </div>
            </div>
            
            <h3 className="text-2xl font-bold mb-3 text-white text-center">Learn Mechanics</h3>
            <p className="text-white/90 text-center text-sm mb-4">
              Choose from Rockets, Planes, or Cars to start learning
            </p>
            
            <div className="flex items-center justify-center text-white font-semibold group-hover:gap-3 gap-2 transition-all">
              <span>Explore Categories</span>
              <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
            </div>
          </div>
        </button>
      </div>

      {/* Interactive Features Section - 3 Additional Features */}
      <div className="mt-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            {t('home.interactive.title')}
          </h2>
          <p className="text-text">{t('home.interactive.subtitle')}</p>
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

          {/* Collaborate */}
          <button
            onClick={() => navigate('/collaborate')}
            className="group relative bg-gradient-to-br from-yellow-500 via-amber-600 to-orange-500 hover:from-yellow-600 hover:via-amber-700 hover:to-orange-600 rounded-2xl p-8 border-2 border-yellow-400/50 hover:border-yellow-300 transition-all cursor-pointer hover:scale-105 hover:shadow-xl shadow-yellow-500/30"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity" />
            
            <div className="relative z-10">
              <div className="flex justify-center gap-4 mb-6">
                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur">
                  <UsersIcon className="w-8 h-8 text-white" />
                </div>
              </div>
              
              <h3 className="text-2xl font-bold mb-3 text-white text-center">👥 {t('home.features.collaborate.title')}</h3>
              <p className="text-white/90 text-center mb-4">
                {t('home.features.collaborate.fullDesc')}
              </p>

              <div className="flex items-center justify-center gap-2 text-white font-semibold">
                <span>{t('home.features.collaborate.button')}</span>
                <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          </button>

          {/* AI 3D Generator */}
          <button
            onClick={() => navigate('/ai-generator')}
            className="group relative bg-gradient-to-br from-purple-500 via-fuchsia-600 to-pink-500 hover:from-purple-600 hover:via-fuchsia-700 hover:to-pink-600 rounded-2xl p-8 border-2 border-purple-400/50 hover:border-purple-300 transition-all cursor-pointer hover:scale-105 hover:shadow-xl shadow-purple-500/30"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity" />
            
            <div className="relative z-10">
              <div className="flex justify-center gap-4 mb-6">
                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur animate-pulse">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
              </div>
              
              <h3 className="text-2xl font-bold mb-3 text-white text-center">✨ AI 3D Generator</h3>
              <p className="text-white/90 text-center mb-4">
                Create 3D models from text or images using AI
              </p>

              <div className="flex items-center justify-center gap-2 text-white font-semibold">
                <span>Generate Now</span>
                <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          </button>
        </div>
      </div>
      </div>

      <footer className="border-t border-primary/20 mt-20 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-text-muted">
          <p>{t('home.footer.copyright')}</p>
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
