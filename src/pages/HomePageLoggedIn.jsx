import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Rocket, Plane, Car, Sparkles, ArrowLeftRight, Users as UsersIcon, Lock, Globe, Briefcase, Maximize2, Crown, MessageSquare, ChevronRight, Box, Cpu } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { useProgress } from '../contexts/ProgressContext';
import { useUsageLimits } from '../contexts/UsageLimitsContext';
import ModelComparison from '../components/ModelComparison';
import LanguageSelector from '../components/LanguageSelector';
import SidebarMenu from '../components/SidebarMenu';
import ContinueLearning from '../components/ContinueLearning';
import Logo from '../components/Logo';
import OnboardingFlow from '../components/OnboardingFlow';
import StreakCounter from '../components/StreakCounter';
import CelebrationOverlay from '../components/CelebrationOverlay';
import StoryPlayer from '../components/StoryPlayer';
import stories from '../data/storiesData';
import DailyChallenge from '../components/DailyChallenge';
import WeeklyChallenge from '../components/WeeklyChallenge';
import SRSReviewCard from '../components/SRSReviewCard';

const HomePageLoggedIn = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user, signOut, showLanguageSelector, setShowLanguageSelector } = useAuth();
  const { progress, levelUpCelebration, clearLevelUpCelebration } = useProgress();
  const { canUseModelComparison, useModelComparison, getRemainingComparisons, getTimeUntilReset, isPremium } = useUsageLimits();
  const [showComparison, setShowComparison] = useState(false);
  const [showLangModal, setShowLangModal] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [activeStory, setActiveStory] = useState(null);

  // Check if user needs onboarding
  useEffect(() => {
    const completed = localStorage.getItem('onboarding_completed');
    if (!completed && user) {
      setTimeout(() => setShowOnboarding(true), 1000);
    }
  }, [user]);

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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white page-enter pb-20 md:pb-0">
      <SidebarMenu />

      {/* Header - Mobile Optimized */}
      <header className="border-b border-primary/20 bg-background/50 backdrop-blur sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3 md:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 md:gap-8">
              {/* Spacer for menu button */}
              <div className="w-10 md:w-14"></div>
              <Logo size="md" showText={true} />

              <nav className="hidden md:flex items-center gap-6">
                <button onClick={() => navigate('/about')} className="text-white hover:text-primary transition-colors font-medium">{t('nav.about')}</button>
                <button onClick={() => navigate('/toolbox')} className="text-white hover:text-primary transition-colors font-medium">{t('nav.toolbox')}</button>
                <button onClick={() => navigate('/pricing')} className="text-white hover:text-primary transition-colors font-medium">{t('nav.pricing')}</button>
              </nav>
            </div>

            <div className="flex items-center gap-2 md:gap-3">
              {/* Streak Counter */}
              <StreakCounter />

              <button onClick={() => setShowLangModal(true)} className="flex items-center gap-2 px-3 md:px-4 py-2 bg-background-light hover:bg-background-light rounded-lg transition-colors text-sm font-medium">
                <Globe className="w-4 h-4" />
                <span className="hidden sm:inline">{t('nav.language')}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8 md:py-16">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 md:mb-4 text-white">
            {t('home.hero.title')}
          </h2>

          {/* Welcome Message */}
          <p className="text-lg md:text-2xl font-semibold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4 md:mb-6">
            {t('home.hero.welcome')}
          </p>

          <p className="text-base md:text-xl text-gray-300 max-w-2xl mx-auto px-4">
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
            className="w-full group relative bg-gradient-to-br from-secondary to-secondary-dark hover:from-secondary-light hover:to-secondary rounded-2xl p-12 border-2 border-secondary hover:border-secondary-light transition-all cursor-pointer card-hover glow-cyan ripple shadow-premium-lg"
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

              <h3 className="text-3xl font-bold mb-4 text-white text-center">{t('home.learn.title')}</h3>
              <p className="text-white/90 text-center text-lg mb-6">
                {t('home.learn.subtitle')}
              </p>

              <div className="flex items-center justify-center text-white font-semibold group-hover:gap-3 gap-2 transition-all text-lg">
                <span>{t('home.learn.explore')}</span>
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
            {/* Compare Models - Free during Beta */}
            <button
              onClick={() => setShowComparison(true)}
              className="group relative bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-500 hover:from-cyan-600 hover:via-blue-700 hover:to-purple-600 rounded-2xl p-8 border-2 border-cyan-400/50 hover:border-cyan-300 transition-all cursor-pointer card-hover ripple shadow-premium-lg"
            >
              <div className="absolute top-4 right-4 px-3 py-1 bg-green-500/80 backdrop-blur rounded-full flex items-center gap-1 text-xs text-white font-medium">
                <Sparkles className="w-3 h-3" />
                Free
              </div>

              <div className="relative z-10">
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
                  <span>{t('home.features.compare.button')}</span>
                  <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </button>

            {/* Community */}
            <button
              onClick={() => navigate('/community')}
              className="group relative bg-gradient-to-br from-pink-500 via-rose-600 to-red-500 hover:from-pink-600 hover:via-rose-700 hover:to-red-600 rounded-2xl p-8 border-2 border-pink-400/50 hover:border-pink-300 transition-all cursor-pointer card-hover ripple shadow-premium-lg"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity" />

              <div className="relative z-10">
                <div className="flex justify-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur">
                    <UsersIcon className="w-8 h-8 text-white" />
                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-3 text-white text-center">🌍 {t('home.features.community.title')}</h3>
                <p className="text-white/90 text-center mb-4">
                  {t('home.features.community.desc')}
                </p>

                <div className="flex items-center justify-center gap-2 text-white font-semibold">
                  <span>{t('home.features.community.button')}</span>
                  <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </button>

            {/* Career Projects */}
            <button
              onClick={() => navigate('/career-projects')}
              className="group relative bg-gradient-to-br from-purple-500 via-violet-600 to-indigo-500 hover:from-purple-600 hover:via-violet-700 hover:to-indigo-600 rounded-2xl p-8 border-2 border-purple-400/50 hover:border-purple-300 transition-all cursor-pointer hover:scale-105 hover:shadow-xl shadow-purple-500/30"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity" />

              <div className="relative z-10">
                <div className="flex justify-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur">
                    <Briefcase className="w-8 h-8 text-white" />
                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-3 text-white text-center">🚀 {t('home.features.career.title')}</h3>
                <p className="text-white/90 text-center mb-4">
                  {t('home.features.career.desc')}
                </p>

                <div className="flex items-center justify-center gap-2 text-white font-semibold">
                  <span>{t('home.features.career.button')}</span>
                  <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </button>

            {/* 3D SimLab & CAD */}
            <button
              onClick={() => navigate('/sim-lab')}
              className="group relative bg-gradient-to-br from-amber-500 via-orange-600 to-red-500 hover:from-amber-600 hover:via-orange-700 hover:to-red-600 rounded-2xl p-8 border-2 border-amber-400/50 hover:border-amber-300 transition-all cursor-pointer hover:scale-105 hover:shadow-xl shadow-amber-500/30"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity" />

              <div className="relative z-10">
                <div className="flex justify-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur">
                    <Box className="w-8 h-8 text-white" />
                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-3 text-white text-center">⚒️ {t('home.features.physicsLab.title')}</h3>
                <p className="text-white/90 text-center mb-4">
                  {t('home.features.physicsLab.desc')}
                </p>

                <div className="flex items-center justify-center gap-2 text-white font-semibold">
                  <span>{t('home.features.physicsLab.button')}</span>
                  <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </button>

            {/* AI Homework Solver */}
            <button
              onClick={() => navigate('/homework-solver')}
              className="group relative bg-gradient-to-br from-purple-500 via-violet-600 to-fuchsia-600 hover:from-purple-600 hover:via-violet-700 hover:to-fuchsia-700 rounded-2xl p-8 border-2 border-purple-400/50 hover:border-purple-300 transition-all cursor-pointer hover:scale-105 hover:shadow-xl shadow-purple-500/30"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity" />

              <div className="relative z-10">
                <div className="flex justify-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-purple-400/20 rounded-xl flex items-center justify-center backdrop-blur border-2 border-purple-300/30 group-hover:border-purple-300/60 transition-all">
                    <Sparkles className="w-8 h-8 text-purple-100 group-hover:text-white transition-colors" />
                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-3 text-white text-center">✨ {t('home.features.homework.title')}</h3>
                <p className="text-white/90 text-center mb-4">
                  {t('home.features.homework.desc')}
                </p>

                <div className="flex items-center justify-center gap-2 text-white font-semibold">
                  <span>{t('home.features.homework.button')}</span>
                  <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </button>

            {/* JARVIS Mode - AI-Powered 3D Analysis */}
            <button
              onClick={() => navigate('/explode-view')}
              className="group relative bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-600 hover:via-blue-700 hover:to-indigo-700 rounded-2xl p-8 border-2 border-cyan-400/50 hover:border-cyan-300 transition-all cursor-pointer hover:scale-105 hover:shadow-xl shadow-cyan-500/30"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity" />

              {/* Animated tech corners */}
              <div className="absolute top-2 left-2 w-8 h-8 border-l-2 border-t-2 border-cyan-300/50 rounded-tl-lg opacity-60 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-2 right-2 w-8 h-8 border-r-2 border-b-2 border-cyan-300/50 rounded-br-lg opacity-60 group-hover:opacity-100 transition-opacity" />

              <div className="relative z-10">
                <div className="flex justify-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-cyan-400/20 rounded-xl flex items-center justify-center backdrop-blur border-2 border-cyan-300/30 group-hover:border-cyan-300/60 transition-all">
                    <Maximize2 className="w-8 h-8 text-cyan-100 group-hover:text-white transition-colors" />
                  </div>
                </div>

                <h3 className="text-2xl font-bold mb-2 text-white text-center flex items-center justify-center gap-2">
                  <span className="text-cyan-300">{t('home.features.jarvis.title')}</span>
                </h3>
                <p className="text-xs text-cyan-200 text-center mb-3 font-mono tracking-wider">
                  {t('home.features.jarvis.fullName')}
                </p>
                <p className="text-white/90 text-center mb-4">
                  {t('home.features.jarvis.desc')}
                </p>

                <div className="flex items-center justify-center gap-2 text-white font-semibold">
                  <span>{t('home.features.jarvis.button')}</span>
                  <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Stories Section (Feature 11) */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black text-white flex items-center gap-3 italic uppercase tracking-wider">
              <MessageSquare className="w-6 h-6 text-purple-400" />
              Daily Story
            </h2>
            <span className="text-xs font-black text-gray-500 uppercase tracking-[0.2em]">New story every 24h</span>
          </div>

          <div
            onClick={() => setActiveStory(stories[0])}
            className="group relative bg-gradient-to-br from-purple-900/40 via-indigo-900/40 to-gray-900 border-2 border-purple-500/30 rounded-3xl p-8 cursor-pointer hover:border-purple-400 transition-all card-hover glow-purple overflow-hidden hover-tilt"
          >
            {/* Background elements */}
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-purple-500/10 rounded-full blur-[100px] group-hover:bg-purple-500/20 transition-all" />

            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-3xl flex items-center justify-center text-5xl shadow-2xl group-hover:rotate-6 transition-transform">
                🚀
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                  <span className="bg-purple-500/20 text-purple-400 text-[10px] font-black px-2 py-0.5 rounded-full border border-purple-500/30 uppercase tracking-widest">
                    In Space
                  </span>
                  <span className="text-gray-500 text-xs">•</span>
                  <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">5 min read</span>
                </div>
                <h3 className="text-3xl font-black text-white mb-2">{stories[0].title}</h3>
                <p className="text-gray-400 text-lg max-w-xl line-clamp-2">
                  {stories[0].description}
                </p>
              </div>
              <button className="bg-white text-gray-900 font-black px-8 py-4 rounded-2xl flex items-center gap-2 group-hover:px-10 transition-all shadow-xl">
                START STORY
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Daily & Weekly Challenges - At Bottom */}
      <div className="max-w-6xl mx-auto px-4 mt-12 space-y-6">
        <h2 className="text-2xl font-bold text-white text-center mb-6">{t('home.challenges.title')}</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DailyChallenge />
          <SRSReviewCard />
          <WeeklyChallenge />
        </div>
      </div>

      <footer className="border-t border-primary/20 mt-20 py-10 bg-gray-900/80">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex justify-center items-center gap-6 mb-6">
            <button
              onClick={() => navigate('/help')}
              className="text-white hover:text-cyan-400 transition-colors text-lg font-semibold underline cursor-pointer"
            >
              {t('nav.help')}
            </button>
            <span className="text-gray-500 text-2xl">|</span>
            <button
              onClick={() => navigate('/privacy')}
              className="text-white hover:text-cyan-400 transition-colors text-lg font-semibold underline cursor-pointer"
            >
              {t('nav.privacy')}
            </button>
            <span className="text-gray-500 text-2xl">|</span>
            <button
              onClick={() => navigate('/terms')}
              className="text-white hover:text-cyan-400 transition-colors text-lg font-semibold underline cursor-pointer"
            >
              {t('nav.terms')}
            </button>
          </div>
          <p className="text-gray-400">{t('home.footer.copyright')}</p>
          <p className="text-xs mt-2 text-gray-600">{t('home.footer.version')}</p>
        </div>
      </footer>

      <ModelComparison isOpen={showComparison} onClose={() => setShowComparison(false)} />
      <LanguageSelector isOpen={showLangModal} onClose={() => { setShowLangModal(false); if (setShowLanguageSelector) { setShowLanguageSelector(false); } }} />
      {selectedCourse && <CourseOverview courseId={selectedCourse} onClose={() => setSelectedCourse(null)} />}
      {showOnboarding && <OnboardingFlow onComplete={() => setShowOnboarding(false)} />}
      {levelUpCelebration && (
        <CelebrationOverlay
          type="level"
          xp={levelUpCelebration.xp}
          onComplete={clearLevelUpCelebration}
        />
      )}
      {activeStory && (
        <StoryPlayer
          storyData={activeStory}
          onComplete={() => setActiveStory(null)}
        />
      )}
    </div>
  );
};

export default HomePageLoggedIn;
