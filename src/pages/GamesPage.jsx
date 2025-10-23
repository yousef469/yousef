import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Gamepad2, Brain, Wrench, Beaker, Trophy, Target } from 'lucide-react';

export default function GamesPage() {
  const navigate = useNavigate();

  const games = [
    {
      id: 'simulation',
      title: 'Simulation Challenge',
      description: 'Adjust sliders until the system works perfectly',
      icon: Wrench,
      difficulty: 'Medium',
      color: 'from-cyan-500 to-blue-600',
      examples: 'Jet engine air/fuel mix, car suspension balance',
      route: '/games/simulation'
    },
    {
      id: 'quiz',
      title: 'Quiz Battle',
      description: 'Timed multiple-choice engineering quiz',
      icon: Brain,
      difficulty: 'Easy',
      color: 'from-purple-500 to-pink-600',
      examples: 'Identify rocket parts, aviation terminology',
      route: '/games/quiz'
    },
    {
      id: 'build',
      title: 'Fix & Build Game',
      description: 'Drag parts to correct positions',
      icon: Target,
      difficulty: 'Medium',
      color: 'from-orange-500 to-red-600',
      examples: 'Assemble a gearbox or aircraft wing',
      route: '/games/build'
    },
    {
      id: 'sandbox',
      title: 'Experiment Sandbox',
      description: 'Try inputs and see live results',
      icon: Beaker,
      difficulty: 'Easy',
      color: 'from-green-500 to-emerald-600',
      examples: 'Pressure vs thrust, lift vs angle',
      route: '/games/sandbox'
    },
    {
      id: 'upgrade',
      title: 'Upgrade Game',
      description: 'Earn XP and upgrade your models',
      icon: Trophy,
      difficulty: 'Hard',
      color: 'from-yellow-500 to-orange-600',
      examples: 'Better rocket stages, improved aerodynamics',
      route: '/games/upgrade'
    },
    {
      id: 'mission',
      title: 'Mission Game',
      description: 'Solve engineering problems in story mode',
      icon: Gamepad2,
      difficulty: 'Hard',
      color: 'from-indigo-500 to-purple-600',
      examples: 'Fix power on Mars rover, rescue mission',
      route: '/games/mission'
    }
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-400';
      case 'Medium': return 'text-yellow-400';
      case 'Hard': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Header */}
      <div className="border-b border-gray-700 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <Gamepad2 className="w-8 h-8 text-purple-400" />
            <div>
              <h1 className="text-2xl font-bold">Learn Mechanics by Games</h1>
              <p className="text-sm text-gray-400">Interactive engineering challenges and simulations</p>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Master Engineering Through Play
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Learn complex concepts by doing. Each game teaches real engineering principles in a fun, interactive way.
          </p>
        </div>

        {/* Games Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.map((game) => {
            const Icon = game.icon;
            return (
              <button
                key={game.id}
                onClick={() => navigate(game.route)}
                className="group relative bg-gray-800/50 backdrop-blur border border-gray-700 rounded-2xl p-6 hover:border-gray-600 transition-all hover:scale-105"
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${game.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity`} />
                
                {/* Icon */}
                <div className={`relative w-16 h-16 bg-gradient-to-br ${game.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <div className="relative text-left">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-white">{game.title}</h3>
                    <span className={`text-xs font-semibold px-2 py-1 rounded ${getDifficultyColor(game.difficulty)} bg-gray-900/50`}>
                      {game.difficulty}
                    </span>
                  </div>
                  
                  <p className="text-gray-400 text-sm mb-3">{game.description}</p>
                  
                  <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-700">
                    <div className="text-xs text-gray-500 mb-1">Examples:</div>
                    <div className="text-xs text-gray-300">{game.examples}</div>
                  </div>

                  <div className="mt-4 flex items-center text-purple-400 group-hover:text-purple-300 transition-colors">
                    <span className="text-sm font-semibold">Play Now</span>
                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Benefits Section */}
        <div className="mt-16 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-2xl p-8">
          <h3 className="text-2xl font-bold mb-6 text-center">Why Learn Through Games?</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Brain className="w-6 h-6 text-purple-400" />
              </div>
              <h4 className="font-semibold mb-2">Better Retention</h4>
              <p className="text-sm text-gray-400">Learn by doing - retain 75% more than passive reading</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Target className="w-6 h-6 text-pink-400" />
              </div>
              <h4 className="font-semibold mb-2">Instant Feedback</h4>
              <p className="text-sm text-gray-400">See results immediately and learn from mistakes</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Trophy className="w-6 h-6 text-indigo-400" />
              </div>
              <h4 className="font-semibold mb-2">Track Progress</h4>
              <p className="text-sm text-gray-400">Earn XP, unlock achievements, compete with friends</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
