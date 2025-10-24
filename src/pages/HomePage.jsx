import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Rocket, Plane, Car, Sparkles, LogIn, UserPlus, Send, Bot } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import CommunityQA from '../components/CommunityQA';
import Leaderboard from '../components/Leaderboard';
import { askGemini } from '../services/gemini';

const HomePage = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [aiInput, setAiInput] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [aiLoading, setAiLoading] = useState(false);

  const handleAskAI = async () => {
    if (!aiInput.trim() || aiLoading) return;

    const question = aiInput.trim();
    setAiInput('');
    setAiLoading(true);
    setAiResponse('');

    try {
      const result = await askGemini(question, []);
      setAiResponse(result.response);
    } catch (error) {
      setAiResponse('Sorry, I had trouble processing that. Please try again.');
    } finally {
      setAiLoading(false);
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
                <h1 className="text-3xl font-bold">AeroAI 3D</h1>
                <p className="text-gray-400 text-sm mt-1">Interactive 3D Engineering Models</p>
              </div>
            </div>
            
            {/* Auth Buttons */}
            <div className="flex items-center gap-3">
              {user ? (
                <>
                  <div className="text-sm text-gray-400">
                    Welcome, <span className="text-cyan-400 font-semibold">{user.email}</span>
                  </div>
                  <button
                    onClick={() => signOut()}
                    className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-sm font-medium"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => navigate('/auth')}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-sm font-medium"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Login</span>
                  </button>
                  <button
                    onClick={() => navigate('/auth')}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-lg transition-colors text-sm font-medium"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Sign Up</span>
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
            Explore Engineering in 3D
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Choose a category to view detailed 3D models with interactive controls
          </p>
        </div>

        {/* CTA for non-authenticated users */}
        {!user && (
          <div className="mb-12 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-3">Ready to explore?</h3>
            <p className="text-gray-300 mb-6">Sign up now to access all 3D models and AI-powered learning</p>
            <button
              onClick={() => navigate('/auth')}
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-lg transition-all font-semibold text-lg"
            >
              <UserPlus className="w-5 h-5" />
              <span>Get Started Free</span>
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
              
              <h3 className="text-2xl font-bold mb-3 text-white text-center">3D Models Viewer</h3>
              <p className="text-white/90 text-center mb-4">
                Explore all models in interactive 3D
              </p>
              
              <div className="flex items-center justify-center text-white font-semibold group-hover:gap-3 gap-2 transition-all">
                <span>Launch Viewer</span>
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
              
              <h3 className="text-2xl font-bold mb-3 text-white text-center">Learn Rocket Mechanics</h3>
              <p className="text-white/90 text-center text-sm mb-4">
                Master propulsion, orbital mechanics, staging, and launch systems
              </p>
              
              <div className="flex items-center justify-center text-white font-semibold group-hover:gap-3 gap-2 transition-all">
                <span>Start Learning</span>
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
              
              <h3 className="text-2xl font-bold mb-3 text-white text-center">Learn Plane Mechanics</h3>
              <p className="text-white/90 text-center text-sm mb-4">
                Understand aerodynamics, flight controls, engines, and aviation systems
              </p>
              
              <div className="flex items-center justify-center text-white font-semibold group-hover:gap-3 gap-2 transition-all">
                <span>Start Learning</span>
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
              
              <h3 className="text-2xl font-bold mb-3 text-white text-center">Learn Car Mechanics</h3>
              <p className="text-white/90 text-center text-sm mb-4">
                Explore engines, transmissions, suspension, and automotive engineering
              </p>
              
              <div className="flex items-center justify-center text-white font-semibold group-hover:gap-3 gap-2 transition-all">
                <span>Start Learning</span>
                <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          </button>
        </div>

        {/* Learn by Games Section */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Learn Mechanics by Games
            </h2>
            <p className="text-gray-300">Master engineering through interactive challenges and simulations</p>
          </div>

          <button
            onClick={() => user ? navigate('/games') : navigate('/auth')}
            className="group relative bg-gradient-to-br from-purple-500 via-blue-600 to-cyan-500 hover:from-purple-600 hover:via-blue-700 hover:to-cyan-600 rounded-2xl p-8 border-2 border-cyan-400/50 hover:border-cyan-300 transition-all cursor-pointer hover:scale-105 hover:shadow-xl shadow-cyan-500/30 w-full max-w-4xl mx-auto block"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity" />
            
            <div className="relative z-10">
              <div className="flex justify-center gap-4 mb-6">
                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur animate-bounce">
                  <Rocket className="w-8 h-8 text-white" />
                </div>
              </div>
              
              <h3 className="text-3xl font-bold mb-3 text-white text-center">🚀 Engineering Journey</h3>
              <p className="text-white/90 text-center text-lg mb-4">
                Complete challenges and watch your rocket fly to space!
              </p>
              
              <div className="flex justify-center gap-6 text-sm text-white/80 mb-4">
                <span>🧠 Quiz</span>
                <span>🧩 Matching</span>
                <span>⚙️ Simulation</span>
                <span>🔧 Building</span>
              </div>

              <div className="bg-white/10 backdrop-blur rounded-lg p-3 mb-4 max-w-md mx-auto">
                <p className="text-white/80 text-sm text-center">
                  Mixed challenges • Progressive difficulty • Track your rocket's altitude
                </p>
              </div>

              <div className="flex items-center justify-center gap-2 text-white font-semibold text-lg">
                <span>Start Journey</span>
                <span className="text-2xl group-hover:translate-x-1 transition-transform">🚀</span>
              </div>
            </div>
          </button>
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
              <button
                onClick={handleAskAI}
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
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
