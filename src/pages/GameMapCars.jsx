import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Car, Star, Lock, CheckCircle, Flag } from 'lucide-react';

export default function GameMapCars() {
  const navigate = useNavigate();
  const [completedLevels, setCompletedLevels] = useState([0]);

  const levels = [
    { id: 0, name: 'Garage Start', location: 'Home', emoji: '🏠', position: { top: '85%', left: '10%' } },
    { id: 1, name: 'City Streets', location: 'Downtown', emoji: '🏙️', position: { top: '75%', left: '25%' } },
    { id: 2, name: 'Gas Station', location: 'Fuel Up', emoji: '⛽', position: { top: '65%', left: '40%' } },
    { id: 3, name: 'Highway', location: 'Interstate', emoji: '🛣️', position: { top: '50%', left: '55%' } },
    { id: 4, name: 'Pit Stop', location: 'Service', emoji: '🔧', position: { top: '40%', left: '70%' } },
    { id: 5, name: 'Mountain Road', location: 'Scenic Route', emoji: '⛰️', position: { top: '25%', left: '60%' } },
    { id: 6, name: 'Race Track', location: 'Circuit', emoji: '🏁', position: { top: '15%', left: '45%' } },
    { id: 7, name: 'Finish Line', location: 'Victory', emoji: '🏆', position: { top: '10%', left: '30%' } }
  ];

  const isLevelUnlocked = (levelId) => completedLevels.includes(levelId);
  const isLevelCompleted = (levelId) => completedLevels.includes(levelId) && completedLevels.includes(levelId + 1);

  const handleLevelClick = (level) => {
    if (isLevelUnlocked(level.id)) {
      navigate(`/games/play/cars/${level.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-950 via-gray-900 to-black text-white overflow-hidden">
      {/* Road Background Pattern */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 50px, #fff 50px, #fff 52px)',
          transform: 'skewY(-5deg)'
        }} />
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
              <Car className="w-8 h-8 text-orange-400" />
              <div>
                <h1 className="text-xl font-bold">Road Trip Journey</h1>
                <p className="text-sm text-gray-400">Drive through stations</p>
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
        <div className="relative h-[800px] rounded-3xl">
          {/* Road Path */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <defs>
              <linearGradient id="roadGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#4b5563" />
                <stop offset="100%" stopColor="#1f2937" />
              </linearGradient>
            </defs>
            {levels.slice(0, -1).map((level, index) => {
              const nextLevel = levels[index + 1];
              const completed = isLevelCompleted(level.id);
              
              return (
                <g key={index}>
                  {/* Road */}
                  <line
                    x1={level.position.left}
                    y1={level.position.top}
                    x2={nextLevel.position.left}
                    y2={nextLevel.position.top}
                    stroke={completed ? '#f97316' : '#374151'}
                    strokeWidth="20"
                    strokeLinecap="round"
                    className="transition-all duration-500"
                  />
                  {/* Road Lines */}
                  <line
                    x1={level.position.left}
                    y1={level.position.top}
                    x2={nextLevel.position.left}
                    y2={nextLevel.position.top}
                    stroke="#fbbf24"
                    strokeWidth="2"
                    strokeDasharray="20,15"
                    className="transition-all duration-500"
                  />
                </g>
              );
            })}
          </svg>

          {/* Level Stations */}
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
                  <div className="absolute inset-0 bg-orange-500 rounded-full blur-xl opacity-50 animate-pulse" />
                )}

                {/* Station Circle */}
                <div
                  className={`relative w-24 h-24 rounded-full border-4 flex items-center justify-center transition-all ${
                    completed
                      ? 'bg-gradient-to-br from-green-500 to-emerald-600 border-green-400'
                      : unlocked
                      ? 'bg-gradient-to-br from-orange-500 to-red-600 border-orange-400 group-hover:scale-110'
                      : 'bg-gray-800 border-gray-600'
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
                  <div className="text-xs text-gray-400">{level.location}</div>
                </div>

                {/* Car Animation for Current Level */}
                {unlocked && !completed && (
                  <div className="absolute -top-16 left-1/2 -translate-x-1/2 animate-bounce">
                    <Car className="w-8 h-8 text-orange-400" />
                  </div>
                )}

                {/* Finish Flag */}
                {level.id === levels.length - 1 && (
                  <div className="absolute -top-20 left-1/2 -translate-x-1/2">
                    <Flag className="w-10 h-10 text-yellow-400 animate-wave" />
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
