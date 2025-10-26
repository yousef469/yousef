import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Rocket, Plane, Car, Sparkles, LogIn, UserPlus, Send, Bot, ArrowLeftRight, Globe, LayoutDashboard, BookMarked, Users, Upload, Trophy } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import CommunityQA from '../components/CommunityQA';
import Leaderboard from '../components/Leaderboard';
import VoiceInput, { speakText } from '../components/VoiceInput';
import ModelComparison from '../components/ModelComparison';
import LanguageSelector from '../components/LanguageSelector';
import PricingTiers from '../components/PricingTiers';
import { askGemini } from '../services/gemini';

const HomePage = () => {
  const navigate = useNavigate();
  const { user, signOut, showLanguageSelector, setShowLanguageSelector } = useAuth();
  const { t } = useTranslation();
  const [aiInput, setAiInput] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [showLangModal, setShowLangModal] = useState(false);

  // Show language selector for new users
  useEffect(() => {
    if (showLanguageSelector) {
      setShowLangModal(true);
    }
  }, [showLanguageSelector]);

  const handleAskAI = async (question = aiInput) => {
    if (!question.trim() || aiLoading) return;

    const q = question.trim();
    setAiInput('');
    setAiLoading(true);
    setAiResponse('');

    try {
      const result = await askGemini(q, []);
      setAiResponse(result.response);
      
      // Speak the response
      speakText(result.response);
    } catch (error) {
      setAiResponse('Sorry, I had trouble processing that. Please try again.');
    } finally {
      setAiLoading(false);
    }
  };

  const handleVoiceTranscript = (transcript) => {
    setAiInput(transcript);
  };

  const handleVoiceSpeechEnd = (transcript) => {
    if (transcript.trim()) {
      handleAskAI(transcript);
    }
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* AeroAI 3D - Interactive Engineering Platform */}
      {/* Header */}
      <header className="border-b border-gray-700 bg-gray-900/50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-cyan-400" />
              <div>
                <h1 className="text-3xl font-bold">{t('app.title')}</h1>
                <p className="text-gray-400 text-sm mt-1">{t('app.subtitle')}</p>
              </div>
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
                <>
                  <div className="text-sm text-gray-400">
                    {t('nav.welcome')}, <span className="text-cyan-400 font-semibold">{user.email}</span>
                  </div>
                  <button
                    onClick={() => signOut()}
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-sm font-medium"
                  >
                    {t('nav.signOut')}
                  </button>
                </>
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

        {/* Quick Features Showcase */}
        <div className="mb-12 grid grid-cols-2 md:grid-cols-5 gap-4">
          <button onClick={() => navigate('/dashboard')} className="bg-gray-800/50 border border-cyan-500/30 rounded-xl p-4 text-center hover:bg-gray-700/50 transition-all">
            <LayoutDashboard className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
            <div className="text-sm font-semibold text-cyan-400">Dashboard</div>
            <div className="text-xs text-gray-400">Track progress</div>
          </button>
          <button onClick={() => navigate('/bookmarks')} className="bg-gray-800/50 border border-purple-500/30 rounded-xl p-4 text-center hover:bg-gray-700/50 transition-all">
            <BookMarked className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <div className="text-sm font-semibold text-purple-400">Bookmarks</div>
            <div className="text-xs text-gray-400">Save lessons</div>
          </button>
          <button onClick={() => navigate('/collaborate')} className="bg-gray-800/50 border border-yellow-500/30 rounded-xl p-4 text-center hover:bg-gray-700/50 transition-all">
            <Users className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
            <div className="text-sm font-semibold text-yellow-400">Collaborate</div>
            <div className="text-xs text-gray-400">Study together</div>
          </button>
          <button onClick={() => navigate('/upload')} className="bg-gray-800/50 border border-green-500/30 rounded-xl p-4 text-center hover:bg-gray-700/50 transition-all">
            <Upload className="w-8 h-8 text-green-400 mx-auto mb-2" />
            <div className="text-sm font-semibold text-green-400">Upload</div>
            <div className="text-xs text-gray-400">Share models</div>
          </button>
          <button onClick={() => navigate('/progression')} className="bg-gray-800/50 border border-orange-500/30 rounded-xl p-4 text-center hover:bg-gray-700/50 transition-all">
            <Trophy className="w-8 h-8 text-orange-400 mx-auto mb-2" />
            <div className="text-sm font-semibold text-orange-400">Progression</div>
            <div className="text-xs text-gray-400">Levels & rewards</div>
          </button>
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
            onClick={() => user ? navigate('/rockets') : navigate('/auth')}
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

          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
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
                </div>

                <div className="flex items-center justify-center gap-2 text-white font-semibold">
                  <span>{t('home.compare.button')}</span>
                  <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* Quick AI Assistant */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Quick AI Assistant
            </h2>
            <p className="text-gray-300">Get instant answers to your engineering questions</p>
          </div>

          <div className="max-w-3xl mx-auto bg-gray-800/50 backdrop-blur border border-gray-700 rounded-xl p-6">
            <div className="flex gap-3 mb-4">
              <input
                type="text"
                value={aiInput}
                onChange={(e) => setAiInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAskAI()}
                placeholder="Ask anything about rockets, planes, or cars..."
                className="flex-1 bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500"
                disabled={aiLoading}
              />
              
              {/* Voice Input */}
              <VoiceInput 
                onTranscript={handleVoiceTranscript}
                onSpeechEnd={handleVoiceSpeechEnd}
              />
              
              <button
                onClick={() => handleAskAI()}
                disabled={!aiInput.trim() || aiLoading}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 disabled:from-gray-700 disabled:to-gray-700 rounded-lg font-semibold transition-all flex items-center gap-2"
              >
                {aiLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Thinking...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Ask</span>
                  </>
                )}
              </button>
            </div>

            {aiResponse && (
              <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-lg p-4">
                <div className="flex items-center gap-2 text-cyan-400 font-semibold mb-2">
                  <Bot className="w-5 h-5" />
                  <span>AI Response</span>
                </div>
                <p className="text-gray-300 whitespace-pre-wrap">{aiResponse}</p>
              </div>
            )}

            {!aiResponse && !aiLoading && (
              <div className="text-center text-gray-500 text-sm">
                <p>Try asking: "How does a rocket engine work?" or "Explain lift force on airplane wings"</p>
              </div>
            )}
          </div>
        </div>

        {/* Pricing Tiers Section */}
        <PricingTiers />

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
                Community Q&A
              </h2>
              <p className="text-gray-400 text-sm">Ask questions and help others learn</p>
            </div>
            <CommunityQA />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-700 mt-20 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500">
          <p>© 2025 AeroAI 3D - Interactive Engineering Education</p>
          <p className="text-xs mt-2 text-gray-600">v2.0 - Voice AI • Model Comparison • Leaderboards • PWA</p>
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
    </div>
  );
};

export default HomePage;
