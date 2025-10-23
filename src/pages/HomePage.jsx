import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Rocket, Plane, Car, Sparkles, LogIn, UserPlus } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const HomePage = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();



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

        {/* 3D Models Viewer Button */}
        <div className="flex justify-center">
          <button
            onClick={() => user ? navigate('/rockets') : navigate('/auth')}
            className="group relative bg-gradient-to-br from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-3xl p-12 border-2 border-cyan-400/50 hover:border-cyan-300 transition-all cursor-pointer hover:scale-105 hover:shadow-2xl shadow-cyan-500/50 max-w-2xl w-full"
          >
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity" />
            
            {/* Content */}
            <div className="relative z-10 text-center">
              {/* Icons */}
              <div className="flex justify-center gap-6 mb-8">
                <div className="w-20 h-20 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Rocket className="w-10 h-10 text-white" />
                </div>
                <div className="w-20 h-20 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform delay-75">
                  <Plane className="w-10 h-10 text-white" />
                </div>
                <div className="w-20 h-20 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform delay-150">
                  <Car className="w-10 h-10 text-white" />
                </div>
              </div>
              
              <h3 className="text-4xl font-bold mb-4 text-white">3D Models Viewer</h3>
              <p className="text-xl text-white/90 mb-8">
                Explore rockets, aircraft, and vehicles in stunning 3D with AI-powered learning
              </p>
              
              <div className="flex items-center justify-center text-white font-bold text-lg group-hover:gap-4 gap-3 transition-all">
                <span>Launch Viewer</span>
                <span className="text-2xl group-hover:translate-x-2 transition-transform">→</span>
              </div>
            </div>
          </button>
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
