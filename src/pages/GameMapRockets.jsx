import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Rocket, Star, Lock, CheckCircle } from 'lucide-react';

export default function GameMapRockets() {
  const navigate = useNavigate();
  const [completedLevels, setCompletedLevels] = useState([0]); // Level 0 is unlocked by default

  const levels = [
    { id: 0, name: 'Launch Pad', planet: 'Earth', emoji: '🌍', position: { top: '85%', left: '50%' } },
    { id: 1, name: 'Low Orbit', planet: 'Earth Orbit', emoji: '🛰️', position: { top: '70%', left: '45%' } },
    { id: 2, name: 'Moon Base', planet: 'Moon', emoji: '🌙', position: { top: '55%', left: '55%' } },
    { id: 3, name: 'Mars Station', planet: 'Mars', emoji: '🔴', position: { top: '40%', left: '40%' } },
    { id: 4, name: 'Asteroid Belt', planet: 'Asteroids', emoji: '☄️', position: { top: '30%', left: '60%' } },
    { id: 5, name: 'Jupiter Orbit', planet: 'Jupiter', emoji: '🪐', position: { top: '20%', left: '35%' } },
    { id: 6, name: 'Saturn Rings', planet: 'Saturn', emoji: '💫', position: { top: '10%', left: '50%' } },
    { id: 7, name: 'Deep Space', planet: 'Beyond', emoji: '🌌', position: { top: '5%', left: '45%' } }
  ];

  const isLevelUnlocked = (levelId) => completedLevels.includes(levelId);
  const isLevelCompleted = (levelId) => completedLevels.includes(levelId) && completedLevels.includes(levelId + 1);

  const handleLevelClick = (level) => {
    if (isLevelUnlocked(level.id)) {
      // Navigate to the actual game with this level
      navigate(`/games/play/rockets/${level.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-indigo-950 to-purple-950 text-white overflow-hidden">
      {/* Stars Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: Math.random() * 0.7 + 0.3
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="relative z-10 border-b border-gray-700 bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/games')}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <Rocket className="w-8 h-8 text-cyan-400" />
              <div>
                <h1 className="text-xl font-bold">Rocket Journey</h1>
                <p className="text-sm text-gray-400">Travel through the solar system</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400" />
              <span className="text-xl font-bold">{completedLevels.length - 1}/{levels.length - 1}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        <div className="relative h-[800px] bg-gradient-to-b from-transparent via-blue-900/10 to-transparent rounded-3xl">
          {/* Path Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {levels.slice(0, -1).map((level, index) => {
              const nextLevel = levels[index + 1];
              return (
                <line
                  key={index}
                  x1={level.position.left}
                  y1={level.position.top}
                  x2={nextLevel.position.left}
                  y2={nextLevel.position.top}
                  stroke={isLevelCompleted(level.id) ? '#06b6d4' : '#374151'}
                  strokeWidth="3"
                  strokeDasharray={isLevelCompleted(level.id) ? '0' : '10,5'}
                  className="transition-all duration-500"
                />
              );
            })}
          </svg>

          {/* Level Nodes */}
          {levels.map((level) => {
            const unlocked = isLevelUnlocked(level.id);
            const completed = isLevelCompleted(level.id);

            return (
              <button
                key={level.id}
                onClick={() => handleLevelClick(level)}
                disabled={!unlocked}
                className="absolute -translate-x-1/2 -translate-y-1/2 group"
                style={{ top: level.position.top, left: level.position.left }}
              >
                {/* Glow Effect */}
                {unlocked && !completed && (
                  <div className="absolute inset-0 bg-cyan-500 rounded-full blur-xl opacity-50 animate-pulse" />
                )}

                {/* Node Circle */}
                <div
                  className={`relative w-24 h-24 rounded-full border-4 flex items-center justify-center transition-all ${
                    completed
                      ? 'bg-gradient-to-br from-green-500 to-emerald-600 border-green-400 scale-100'
                      : unlocked
                      ? 'bg-gradient-to-br from-cyan-500 to-blue-600 border-cyan-400 scale-110 group-hover:scale-125'
                      : 'bg-gray-800 border-gray-600 scale-90'
                  }`}
                >
                  {completed ? (
                    <CheckCircle className="w-10 h-10 text-white" />
                  ) : unlocked ? (
                    <span className="text-4xl">{level.emoji}</span>
                  ) : (
                    <Lock className="w-8 h-8 text-gray-500" />
                  )}
                </div>

                {/* Label */}
                <div className="absolute top-full mt-3 left-1/2 -translate-x-1/2 text-center whitespace-nowrap">
                  <div className={`font-bold ${unlocked ? 'text-white' : 'text-gray-500'}`}>
                    {level.name}
                  </div>
                  <div className="text-xs text-gray-400">{level.planet}</div>
                </div>

                {/* Rocket Animation for Current Level */}
                {unlocked && !completed && (
                  <div className="absolute -top-16 left-1/2 -translate-x-1/2 animate-bounce">
                    <Rocket className="w-8 h-8 text-cyan-400" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
