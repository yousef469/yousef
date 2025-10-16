import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Rocket, Plane, Car, Sparkles } from 'lucide-react';

const HomePage = () => {
  const navigate = useNavigate();

  const categories = [
    {
      id: 'rockets',
      title: 'Rockets',
      icon: Rocket,
      color: 'cyan',
      gradient: 'from-cyan-500 to-blue-600',
      description: 'Explore space vehicles and launch systems',
      path: '/rockets'
    },
    {
      id: 'planes',
      title: 'Aircraft',
      icon: Plane,
      color: 'blue',
      gradient: 'from-blue-500 to-indigo-600',
      description: 'Discover aviation and flight technology',
      path: '/planes'
    },
    {
      id: 'cars',
      title: 'Vehicles',
      icon: Car,
      color: 'orange',
      gradient: 'from-orange-500 to-red-600',
      description: 'Experience automotive engineering',
      path: '/cars'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Header */}
      <header className="border-b border-gray-700 bg-gray-900/50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-cyan-400" />
            <h1 className="text-3xl font-bold">AeroAI 3D</h1>
          </div>
          <p className="text-gray-400 mt-2">Interactive 3D Engineering Models</p>
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

        {/* Category Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <div
                key={category.id}
                onClick={() => navigate(category.path)}
                className="group relative bg-gray-800/50 backdrop-blur rounded-2xl p-8 border border-gray-700 hover:border-gray-600 transition-all cursor-pointer hover:scale-105 hover:shadow-2xl"
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity`} />
                
                {/* Content */}
                <div className="relative z-10">
                  <div className={`w-16 h-16 bg-gradient-to-br ${category.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-3">{category.title}</h3>
                  <p className="text-gray-400 mb-6">{category.description}</p>
                  
                  <div className="flex items-center text-cyan-400 font-semibold group-hover:gap-3 gap-2 transition-all">
                    <span>Explore Models</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </div>
            );
          })}
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
