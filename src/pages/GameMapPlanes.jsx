import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plane, Star, Lock, CheckCircle, Cloud } from 'lucide-react';

export default function GameMapPlanes() {
  const navigate = useNavigate();
  const [completedLevels, setCompletedLevels] = useState([0]);

  const levels = [
    { id: 0, name: 'Runway', location: 'Takeoff', emoji: '🛫', position: { top: '90%', left: '15%' } },
    { id: 1, name: 'Low Altitude', location: '1,000 ft', emoji: '☁️', position: { top: '75%', left: '30%' } },
    { id: 2, name: 'Through Clouds', location: '5,000 ft', emoji: '⛅', position: { top: '60%', left: '45%' } },
    { id: 3, name: 'Cruising', location: '10,000 ft', emoji: '✈️', position: { top: '45%', left: '60%' } },
    { id: 4, name: 'High Altitude', location: '30,000 ft', emoji: '🌤️', position: { top: '30%', left: '70%' } },
    { id: 5, name: 'Jet Stream', location: '35,000 ft', emoji: '💨', position: { top: '20%', left: '55%' } },
    { id: 6, name: 'Stratosphere', location: '40,000 ft', emoji: '🌌', position: { top: '10%', left: '40%' } },
    { id: 7, name: 'Landing', location: 'Destination', emoji: '🛬', position: { top: '5%', left: '25%' } }
  ];

  const isLevelUnlocked = (levelId) => completedLevels.includes(levelId);
  const isLevelCompleted = (levelId) => completedLevels.includes(levelId) && completedLevels.includes(levelId + 1);

  const handleLevelClick = (level) => {
    if (isLevelUnlocked(level.id)) {
      navigate(`/games/play/planes/${level.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 via-blue-600 to-indigo-900 text-white overflow-hidden">
      {/* Clouds Background */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${10 + Math.random() * 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          >
            <Cloud className="w-32 h-32 text-white" />
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="relative z-10 border-b border-blue-700 bg-blue-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/games')}
                className="p-2 hover:bg-blue-800 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <Plane className="w-8 h-8 text-cyan-300" />
              <div>
                <h1 className="text-xl font-bold">Flight Journey</h1>
                <p className="text-sm text-blue-200">Soar through the skies</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-300" />
              <span className="text-xl font-bold">{completedLevels.length - 1}/{levels.length - 1}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        <div className="relative h-[800px] rounded-3xl">
          {/* Flight Path */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {levels.slice(0, -1).map((level, index) => {
              const nextLevel = levels[index + 1];
              const completed = isLevelCompleted(level.id);
              
              return (
                <g key={index}>
                  {/* Contrail */}
                  <line
                    x1={level.position.left}
                    y1={level.position.top}
                    x2={nextLevel.position.left}
                    y2={nextLevel.position.top}
                    stroke={completed ? '#06b6d4' : '#60a5fa'}
                    strokeWidth="4"
                    strokeDasharray={completed ? '0' : '15,10'}
                    strokeLinecap="round"
                    className="transition-all duration-500"
                    opacity="0.6"
                  />
                  {/* Dotted line */}
                  <line
                    x1={level.position.left}
                    y1={level.position.top}
                    x2={nextLevel.position.left}
                    y2={nextLevel.position.top}
                    stroke="white"
                    strokeWidth="2"
                    strokeDasharray="5,10"
                    opacity="0.3"
                  />
                </g>
              );
            })}
          </svg>

          {/* Level Checkpoints */}
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
                  <div className="absolute inset-0 bg-cyan-400 rounded-full blur-xl opacity-50 animate-pulse" />
                )}

                {/* Checkpoint Circle */}
                <div
                  className={`relative w-24 h-24 rounded-full border-4 flex items-center justify-center transition-all ${
                    completed
                      ? 'bg-gradient-to-br from-green-400 to-emerald-500 border-green-300'
                      : unlocked
                      ? 'bg-gradient-to-br from-cyan-400 to-blue-500 border-cyan-300 group-hover:scale-110'
                      : 'bg-blue-900 border-blue-700'
                  }`}
                >
                  {completed ? (
                    <CheckCircle className="w-10 h-10 text-white" />
                  ) : unlocked ? (
                    <span className="text-4xl">{level.emoji}</span>
                  ) : (
                    <Lock className="w-8 h-8 text-blue-400" />
                  )}
                </div>

                {/* Label */}
                <div className="absolute top-full mt-3 left-1/2 -translate-x-1/2 text-center whitespace-nowrap">
                  <div className={`font-bold ${unlocked ? 'text-white' : 'text-blue-300'}`}>
                    {level.name}
                  </div>
                  <div className="text-xs text-blue-200">{level.location}</div>
                </div>

                {/* Plane Animation for Current Level */}
                {unlocked && !completed && (
                  <div className="absolute -top-16 left-1/2 -translate-x-1/2 animate-bounce">
                    <Plane className="w-8 h-8 text-cyan-300" style={{ transform: 'rotate(-45deg)' }} />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-20px) translateX(30px); }
        }
      `}</style>
    </div>
  );
}
