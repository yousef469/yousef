import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Rocket, Star, Lock, CheckCircle, ArrowUp } from 'lucide-react';

export default function GameMapRockets() {
  const navigate = useNavigate();
  const [completedLevels, setCompletedLevels] = useState([0]);

  // Auto-scroll to bottom on mount (start position)
  useEffect(() => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }, []); // Level 0 is unlocked by default

  // Intro + 4 Units × 6 Lessons = 25 levels
  // Positions from BOTTOM to TOP (rocket launches upward)
  const levels = [
    // INTRO STAGE - Start at bottom
    { id: 0, name: 'Intro', unit: 'Introduction', lesson: 'Welcome to Rocketry', planet: 'Earth', emoji: '🚀', position: { top: '98%', left: '50%' } },
    
    // UNIT 1: Rocket Flight Dynamics (Lessons 1-6)
    { id: 1, name: 'Lesson 1', unit: 'Flight Dynamics', lesson: 'Newton\'s Laws', planet: 'Earth Orbit', emoji: '⚡', position: { top: '94%', left: '35%' } },
    { id: 2, name: 'Lesson 2', unit: 'Flight Dynamics', lesson: 'Thrust & Propulsion', planet: 'Low Orbit', emoji: '🔥', position: { top: '90%', left: '60%' } },
    { id: 3, name: 'Lesson 3', unit: 'Flight Dynamics', lesson: 'Specific Impulse', planet: 'LEO', emoji: '📊', position: { top: '86%', left: '40%' } },
    { id: 4, name: 'Lesson 4', unit: 'Flight Dynamics', lesson: 'Rocket Equation', planet: 'Orbit', emoji: '🧮', position: { top: '82%', left: '65%' } },
    { id: 5, name: 'Lesson 5', unit: 'Flight Dynamics', lesson: 'Staging', planet: 'High Orbit', emoji: '🔗', position: { top: '78%', left: '45%' } },
    { id: 6, name: 'Lesson 6', unit: 'Flight Dynamics', lesson: 'Trajectory', planet: 'Transfer', emoji: '📈', position: { top: '74%', left: '30%' } },
    
    // UNIT 2: Aerodynamics (Lessons 7-12)
    { id: 7, name: 'Lesson 7', unit: 'Aerodynamics', lesson: 'Drag Forces', planet: 'Atmosphere', emoji: '💨', position: { top: '70%', left: '55%' } },
    { id: 8, name: 'Lesson 8', unit: 'Aerodynamics', lesson: 'Nose Cone Design', planet: 'Ascent', emoji: '🔺', position: { top: '66%', left: '35%' } },
    { id: 9, name: 'Lesson 9', unit: 'Aerodynamics', lesson: 'Fins & Surfaces', planet: 'Flight', emoji: '🎯', position: { top: '62%', left: '70%' } },
    { id: 10, name: 'Lesson 10', unit: 'Aerodynamics', lesson: 'Heat Shields', planet: 'Reentry', emoji: '🛡️', position: { top: '58%', left: '50%' } },
    { id: 11, name: 'Lesson 11', unit: 'Aerodynamics', lesson: 'Supersonic Flow', planet: 'Mach', emoji: '⚡', position: { top: '54%', left: '30%' } },
    { id: 12, name: 'Lesson 12', unit: 'Aerodynamics', lesson: 'Pressure Distribution', planet: 'Analysis', emoji: '📉', position: { top: '50%', left: '65%' } },
    
    // UNIT 3: Stability & Control (Lessons 13-18)
    { id: 13, name: 'Lesson 13', unit: 'Stability', lesson: 'Center of Gravity', planet: 'Balance', emoji: '⚖️', position: { top: '46%', left: '45%' } },
    { id: 14, name: 'Lesson 14', unit: 'Stability', lesson: 'Center of Pressure', planet: 'Forces', emoji: '🎪', position: { top: '42%', left: '25%' } },
    { id: 15, name: 'Lesson 15', unit: 'Stability', lesson: 'Gimbal Control', planet: 'Steering', emoji: '🎮', position: { top: '38%', left: '60%' } },
    { id: 16, name: 'Lesson 16', unit: 'Stability', lesson: 'Thrust Vectoring', planet: 'Control', emoji: '🔄', position: { top: '34%', left: '40%' } },
    { id: 17, name: 'Lesson 17', unit: 'Stability', lesson: 'Attitude Control', planet: 'Orientation', emoji: '🧭', position: { top: '30%', left: '70%' } },
    { id: 18, name: 'Lesson 18', unit: 'Stability', lesson: 'RCS Systems', planet: 'Thrusters', emoji: '💫', position: { top: '26%', left: '50%' } },
    
    // UNIT 4: Orbital Mechanics (Lessons 19-24)
    { id: 19, name: 'Lesson 19', unit: 'Orbital Mechanics', lesson: 'Kepler\'s Laws', planet: 'Moon', emoji: '🌙', position: { top: '22%', left: '30%' } },
    { id: 20, name: 'Lesson 20', unit: 'Orbital Mechanics', lesson: 'Orbital Elements', planet: 'Ellipse', emoji: '⭕', position: { top: '18%', left: '65%' } },
    { id: 21, name: 'Lesson 21', unit: 'Orbital Mechanics', lesson: 'Hohmann Transfer', planet: 'Mars', emoji: '🔴', position: { top: '14%', left: '45%' } },
    { id: 22, name: 'Lesson 22', unit: 'Orbital Mechanics', lesson: 'Delta-V Budget', planet: 'Planning', emoji: '📋', position: { top: '10%', left: '25%' } },
    { id: 23, name: 'Lesson 23', unit: 'Orbital Mechanics', lesson: 'Gravity Assist', planet: 'Jupiter', emoji: '🪐', position: { top: '6%', left: '70%' } },
    { id: 24, name: 'Lesson 24', unit: 'Orbital Mechanics', lesson: 'Mission Design', planet: 'Deep Space', emoji: '🌌', position: { top: '2%', left: '50%' } }
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
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-400" />
                <span className="text-xl font-bold">{completedLevels.length - 1}/{levels.length - 1}</span>
              </div>
              <div className="text-sm text-gray-400">
                {Math.floor((completedLevels.length - 1) / 6)} / 4 Units
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 z-20 p-4 bg-cyan-500 hover:bg-cyan-600 rounded-full shadow-lg transition-all hover:scale-110"
        title="Scroll to Deep Space"
      >
        <ArrowUp className="w-6 h-6 text-white" />
      </button>

      {/* Journey Direction Indicator */}
      <div className="fixed left-8 top-1/2 -translate-y-1/2 z-20 bg-gray-800/90 backdrop-blur border border-cyan-500/30 rounded-lg p-4 text-center">
        <ArrowUp className="w-8 h-8 text-cyan-400 mx-auto mb-2 animate-bounce" />
        <div className="text-xs text-gray-400">Launch</div>
        <div className="text-xs text-gray-400">Upward</div>
      </div>

      {/* Map Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Unit Headers */}
        <div className="mb-8 grid grid-cols-4 gap-4">
          <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-3 text-center">
            <div className="text-2xl mb-1">🚀</div>
            <div className="font-bold text-sm">Unit 1</div>
            <div className="text-xs text-gray-400">Flight Dynamics</div>
          </div>
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 text-center">
            <div className="text-2xl mb-1">💨</div>
            <div className="font-bold text-sm">Unit 2</div>
            <div className="text-xs text-gray-400">Aerodynamics</div>
          </div>
          <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3 text-center">
            <div className="text-2xl mb-1">⚖️</div>
            <div className="font-bold text-sm">Unit 3</div>
            <div className="text-xs text-gray-400">Stability & Control</div>
          </div>
          <div className="bg-pink-500/10 border border-pink-500/30 rounded-lg p-3 text-center">
            <div className="text-2xl mb-1">🌙</div>
            <div className="font-bold text-sm">Unit 4</div>
            <div className="text-xs text-gray-400">Orbital Mechanics</div>
          </div>
        </div>

        <div className="relative h-[2800px] bg-gradient-to-b from-transparent via-blue-900/10 to-transparent rounded-3xl">
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
                  <div className={`text-xs font-semibold ${unlocked ? 'text-cyan-400' : 'text-gray-600'}`}>
                    {level.unit}
                  </div>
                  <div className={`font-bold ${unlocked ? 'text-white' : 'text-gray-500'}`}>
                    {level.name}
                  </div>
                  <div className="text-xs text-gray-400">{level.lesson}</div>
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
