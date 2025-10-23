import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Rocket, Plane, Car } from 'lucide-react';

export default function GameCategorySelect() {
  const navigate = useNavigate();

  const categories = [
    {
      id: 'rockets',
      title: 'Rocket Mechanics',
      description: 'Journey through space, planet by planet',
      icon: Rocket,
      color: 'from-cyan-500 to-blue-600',
      emoji: '🚀',
      route: '/games/map/rockets'
    },
    {
      id: 'planes',
      title: 'Aircraft Mechanics',
      description: 'Fly through the clouds, checkpoint by checkpoint',
      icon: Plane,
      color: 'from-blue-500 to-indigo-600',
      emoji: '✈️',
      route: '/games/map/planes'
    },
    {
      id: 'cars',
      title: 'Automotive Mechanics',
      description: 'Drive down the road, station by station',
      icon: Car,
      color: 'from-orange-500 to-red-600',
      emoji: '🚗',
      route: '/games/map/cars'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Header */}
      <div className="border-b border-gray-700 bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold">Choose Your Path</h1>
              <p className="text-sm text-gray-400">What do you want to learn about?</p>
            </div>
          </div>
        </div>
      </div>

      {/* Category Selection */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Select Your Engineering Journey
          </h2>
          <p className="text-xl text-gray-300">
            Each path has unique challenges and a visual journey to complete
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => navigate(category.route)}
                className="group relative bg-gray-800/50 backdrop-blur border-2 border-gray-700 rounded-2xl p-8 hover:border-gray-600 transition-all hover:scale-105"
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity`} />
                
                {/* Icon */}
                <div className={`relative w-24 h-24 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform`}>
                  <Icon className="w-12 h-12 text-white" />
                </div>

                {/* Content */}
                <div className="relative text-center">
                  <div className="text-4xl mb-3">{category.emoji}</div>
                  <h3 className="text-2xl font-bold mb-3">{category.title}</h3>
                  <p className="text-gray-400 mb-6">{category.description}</p>
                  
                  <div className="inline-flex items-center gap-2 text-cyan-400 group-hover:text-cyan-300 transition-colors font-semibold">
                    <span>Start Journey</span>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Info Section */}
        <div className="mt-16 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/30 rounded-2xl p-8">
          <h3 className="text-2xl font-bold mb-6 text-center">How It Works</h3>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-4xl mb-3">🗺️</div>
              <h4 className="font-semibold mb-2">Visual Journey</h4>
              <p className="text-sm text-gray-400">Follow an animated path with checkpoints</p>
            </div>
            <div>
              <div className="text-4xl mb-3">🎯</div>
              <h4 className="font-semibold mb-2">Complete Challenges</h4>
              <p className="text-sm text-gray-400">Quiz, matching, simulation, and building</p>
            </div>
            <div>
              <div className="text-4xl mb-3">⭐</div>
              <h4 className="font-semibold mb-2">Unlock Progress</h4>
              <p className="text-sm text-gray-400">Advance to new stations and earn rewards</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
