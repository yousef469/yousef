import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Rocket, Plane, Car, Sparkles, LogIn, UserPlus, Send, Bot, ArrowLeftRight, Globe, User, ChevronDown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import CommunityQA from '../components/CommunityQA';
import Leaderboard from '../components/Leaderboard';
import ModelComparison from '../components/ModelComparison';
import LanguageSelector from '../components/LanguageSelector';
import MixpanelTest from '../components/MixpanelTest';
import LiveChatBot from '../components/LiveChatBot';
import SidebarMenu from '../components/SidebarMenu';


const HomePage = () => {
  const navigate = useNavigate();
  const { user, signOut, showLanguageSelector, setShowLanguageSelector } = useAuth();
  const { t } = useTranslation();
  const [showComparison, setShowComparison] = useState(false);
  const [showLangModal, setShowLangModal] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Show language selector for new users
  useEffect(() => {
    if (showLanguageSelector) {
      setShowLangModal(true);
    }
  }, [showLanguageSelector]);





  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Sidebar Menu */}
      <SidebarMenu />
      
      {/* AeroAI 3D - Interactive Engineering Platform */}
      {/* Header */}
      <header className="border-b border-gray-700 bg-gray-900/50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-3">
                <Sparkles className="w-8 h-8 text-cyan-400" />
                <div>
                  <h1 className="text-3xl font-bold">{t('app.title')}</h1>
                  <p className="text-gray-400 text-sm mt-1">{t('app.subtitle')}</p>
                </div>
              </div>
              
              {/* Navigation Links */}
              <nav className="hidden md:flex items-center gap-6">
                <button
                  onClick={() => navigate('/ai-generator')}
                  className="text-white hover:text-cyan-400 transition-colors font-medium"
                >
                  AI 3D
                </button>
                <button
                  onClick={() => navigate('/pricing')}
                  className="text-white hover:text-cyan-400 transition-colors font-medium"
                >
                  Pricing
                </button>
              </nav>
            </div>
            
            {/* Auth Buttons */}
            <div className="flex items-center gap-3">
              {/* Language Selector Button */}
              <button
                onClick={() => setShowLangModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-sm font-medium"
                title={t('nav.language')}
              >
                <Globe className="w-4 h-4" />
                <span className="hidden sm:inline">{t('nav.language')}</span>
              </button>

              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-sm font-medium"
                  >
                    <User className="w-4 h-4" />
                    <span className="hidden sm:inline">{user.email?.split('@')[0]}</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  
                  {showProfileMenu && (
                    <div className="absolute right-0 mt-2 w-56 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50">
                      <div className="p-3 border-b border-gray-700">
                        <p className="text-xs text-gray-400">Signed in as</p>
                        <p className="text-sm text-white truncate">{user.email}</p>
                      </div>
                      <div className="py-2">
                        <button onClick={() => { navigate('/upload'); setShowProfileMenu(false); }} className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-700 transition-colors text-left">
                          <Upload className="w-4 h-4 text-green-400" />
                          <span className="text-sm">Upload Model</span>
                        </button>
                        <button onClick={() => { navigate('/collaborate'); setShowProfileMenu(false); }} className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-700 transition-colors text-left">
                          <UsersIcon className="w-4 h-4 text-yellow-400" />
                          <span className="text-sm">Collaborate</span>
                        </button>
                      </div>
                      <div className="border-t border-gray-700 py-2">
                        <button onClick={() => { signOut(); setShowProfileMenu(false); }} className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-700 transition-colors text-left text-red-400">
                          <LogIn className="w-4 h-4" />
                          <span className="text-sm">{t('nav.signOut')}</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <button
                    onClick={() => navigate('/auth')}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-sm font-medium"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>{t('nav.login')}</span>
                  </button>
                  <button
                    onClick={() => navigate('/auth')}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-lg transition-colors text-sm font-medium"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>{t('nav.signUp')}</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            {t('home.hero.title')}
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-6">
            {t('home.hero.subtitle')}
          </p>
          
          {/* New Features Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/50 rounded-full animate-pulse">
            <Sparkles className="w-4 h-4 text-green-400" />
            <span className="text-sm font-semibold text-green-400">
              {t('home.hero.new')}
            </span>
          </div>
        </div>

        {/* Live AI Chat Assistant - TOP PRIORITY */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              {t('home.ai.title')}
            </h2>
            <p className="text-gray-300">{t('home.ai.subtitle')}</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <LiveChatBot />
          </div>
        </div>

        {/* CTA for non-authenticated users */}
        {!user && (
          <div className="mb-12 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-3">{t('home.hero.readyToExplore')}</h3>
            <p className="text-gray-300 mb-6">{t('home.hero.signUpNow')}</p>
            <button
              onClick={() => navigate('/auth')}
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-lg transition-all font-semibold text-lg"
            >
              <UserPlus className="w-5 h-5" />
              <span>{t('home.hero.getStarted')}</span>
            </button>
          </div>
        )}

        {/* Main Sections Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {/* 3D Models Viewer */}
          <button
            onClick={() => user ? navigate('/viewer') : navigate('/auth')}
            className="group relative bg-gradient-to-br from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-2xl p-8 border-2 border-cyan-400/50 hover:border-cyan-300 transition-all cursor-pointer hover:scale-105 hover:shadow-xl shadow-cyan-500/30"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity" />
            
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

          {/* Learn Rocket Mechanics */}
          <button
            onClick={() => user ? navigate('/learn/rockets') : navigate('/auth')}
            className="group relative bg-gradient-to-br from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 rounded-2xl p-8 border-2 border-orange-400/50 hover:border-orange-300 transition-all cursor-pointer hover:scale-105 hover:shadow-xl shadow-orange-500/30"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity" />
            
            <div className="relative z-10">
              <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform">
                <Rocket className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold mb-3 text-white text-center">{t('home.learn.rockets')}</h3>
              <p className="text-white/90 text-center text-sm mb-4">
                {t('home.learn.rocketsDesc')}
              </p>
              
              <div className="flex items-center justify-center text-white font-semibold group-hover:gap-3 gap-2 transition-all">
                <span>{t('home.learn.button')}</span>
                <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          </button>

          {/* Learn Plane Mechanics */}
          <button
            onClick={() => user ? navigate('/learn/planes') : navigate('/auth')}
            className="group relative bg-gradient-to-br from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 rounded-2xl p-8 border-2 border-blue-400/50 hover:border-blue-300 transition-all cursor-pointer hover:scale-105 hover:shadow-xl shadow-blue-500/30"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity" />
            
            <div className="relative z-10">
              <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform">
                <Plane className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold mb-3 text-white text-center">{t('home.learn.planes')}</h3>
              <p className="text-white/90 text-center text-sm mb-4">
                {t('home.learn.planesDesc')}
              </p>
              
              <div className="flex items-center justify-center text-white font-semibold group-hover:gap-3 gap-2 transition-all">
                <span>{t('home.learn.button')}</span>
                <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          </button>

          {/* Learn Car Mechanics */}
          <button
            onClick={() => user ? navigate('/learn/cars') : navigate('/auth')}
            className="group relative bg-gradient-to-br from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 rounded-2xl p-8 border-2 border-purple-400/50 hover:border-purple-300 transition-all cursor-pointer hover:scale-105 hover:shadow-xl shadow-purple-500/30"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity" />
            
            <div className="relative z-10">
              <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform">
                <Car className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold mb-3 text-white text-center">{t('home.learn.cars')}</h3>
              <p className="text-white/90 text-center text-sm mb-4">
                {t('home.learn.carsDesc')}
              </p>
              
              <div className="flex items-center justify-center text-white font-semibold group-hover:gap-3 gap-2 transition-all">
                <span>{t('home.learn.button')}</span>
                <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          </button>
        </div>

        {/* Learn by Games & Compare Models Section */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              {t('home.interactive.title')}
            </h2>
            <p className="text-gray-300">{t('home.interactive.subtitle')}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {/* Games Button */}
            <button
              onClick={() => user ? navigate('/games') : navigate('/auth')}
              className="group relative bg-gradient-to-br from-purple-500 via-blue-600 to-cyan-500 hover:from-purple-600 hover:via-blue-700 hover:to-cyan-600 rounded-2xl p-8 border-2 border-cyan-400/50 hover:border-cyan-300 transition-all cursor-pointer hover:scale-105 hover:shadow-xl shadow-cyan-500/30"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity" />
              
              <div className="relative z-10">
                <div className="flex justify-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur animate-bounce">
                    <Rocket className="w-8 h-8 text-white" />
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold mb-3 text-white text-center">🚀 {t('home.journey.title')}</h3>
                <p className="text-white/90 text-center mb-4">
                  {t('home.journey.desc')}
                </p>
                
                <div className="flex justify-center gap-4 text-xs text-white/80 mb-4">
                  <span>🧠 {t('home.journey.quiz')}</span>
                  <span>🧩 {t('home.journey.matching')}</span>
                  <span>⚙️ {t('home.journey.simulation')}</span>
                  <span>🔧 {t('home.journey.building')}</span>
                </div>

                <div className="flex items-center justify-center gap-2 text-white font-semibold">
                  <span>{t('home.journey.button')}</span>
                  <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </button>

            {/* Compare Models Button */}
            <button
              onClick={() => navigate('/compare')}
              className="group relative bg-gradient-to-br from-orange-500 via-pink-600 to-purple-500 hover:from-orange-600 hover:via-pink-700 hover:to-purple-600 rounded-2xl p-8 border-2 border-orange-400/50 hover:border-orange-300 transition-all cursor-pointer hover:scale-105 hover:shadow-xl shadow-orange-500/30"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity" />
              
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
                
                <div className="flex justify-center gap-4 text-xs text-white/80 mb-4">
                  <span>🚀 {t('home.compare.rocket')}</span>
                  <span>✈️ {t('home.compare.plane')}</span>
                  <span>🚗 {t('home.compare.car')}</span>
                  <span>📤 Upload yours</span>
                </div>

                <div className="flex items-center justify-center gap-2 text-white font-semibold">
                  <span>{t('home.compare.button')}</span>
                  <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </button>

            {/* Collaborate Button */}
            <button
              onClick={() => user ? navigate('/collaborate') : navigate('/auth')}
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

            {/* AI 3D Generator Button - NEW! */}
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

        {/* Leaderboard & Community Section */}
        <div className="mt-16 grid lg:grid-cols-2 gap-8">
          {/* Leaderboard */}
          <div>
            <Leaderboard />
          </div>

          {/* Community Q&A */}
          <div>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                {t('home.community.title')}
              </h2>
              <p className="text-gray-400 text-sm">{t('home.community.subtitle')}</p>
            </div>
            <CommunityQA />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-700 mt-20 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500">
          <p>{t('home.footer.copyright')}</p>
          <p className="text-xs mt-2 text-gray-600">{t('home.footer.version')}</p>
        </div>
      </footer>

      {/* Model Comparison Modal */}
      <ModelComparison isOpen={showComparison} onClose={() => setShowComparison(false)} />

      {/* Language Selector Modal */}
      <LanguageSelector 
        isOpen={showLangModal} 
        onClose={() => {
          setShowLangModal(false);
          if (setShowLanguageSelector) {
            setShowLanguageSelector(false);
          }
        }}
        onSelect={(lang) => {
          console.log('Language selected:', lang);
        }}
      />

      {/* Mixpanel Test Component (only in development) */}
      {import.meta.env.DEV && <MixpanelTest />}
    </div>
  );
};

export default HomePage;
