import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Rocket, Star, Lock, CheckCircle, Sparkles } from 'lucide-react';

export default function GameMapRockets() {
  const navigate = useNavigate();
  const [completedLevels, setCompletedLevels] = useState([0]);

  // Generate all 74 lessons (10 units with varying lesson counts)
  const generateLevels = () => {
    const levels = [];
    let levelId = 0;

    const units = [
      { name: 'Introduction to Rockets', emoji: '🚀', color: 'from-blue-400 to-cyan-500', lessons: 6, level: 'Beginner' },
      { name: 'Rocket Physics & Forces', emoji: '🔥', color: 'from-orange-400 to-red-500', lessons: 8, level: 'Beginner' },
      { name: 'Rocket Propulsion Systems', emoji: '⚙️', color: 'from-green-400 to-emerald-500', lessons: 10, level: 'Intermediate' },
      { name: 'Rocket Structures & Materials', emoji: '🧱', color: 'from-yellow-400 to-amber-500', lessons: 6, level: 'Intermediate' },
      { name: 'Guidance, Navigation & Control', emoji: '🧭', color: 'from-indigo-400 to-purple-500', lessons: 8, level: 'Intermediate' },
      { name: 'Orbital Mechanics', emoji: '🌌', color: 'from-violet-400 to-purple-500', lessons: 10, level: 'Advanced' },
      { name: 'Rocket Design & Simulation', emoji: '🧮', color: 'from-pink-400 to-rose-500', lessons: 8, level: 'Advanced' },
      { name: 'Avionics & Communication', emoji: '🛰️', color: 'from-sky-400 to-blue-500', lessons: 6, level: 'Advanced' },
      { name: 'Mission Design & Operations', emoji: '🌕', color: 'from-teal-400 to-cyan-500', lessons: 6, level: 'Master' },
      { name: 'Advanced Rocketry & Innovation', emoji: '🚀', color: 'from-purple-400 to-pink-500', lessons: 6, level: 'Master' }
    ];

    units.forEach((unit) => {
      for (let i = 0; i < unit.lessons; i++) {
        levels.push({
          id: levelId++,
          type: 'lesson',
          unit: unit.name,
          lesson: `Lesson ${i + 1}`,
          emoji: unit.emoji,
          color: unit.color,
          level: unit.level
        });
      }
    });

    return levels;
  };

  const levels = generateLevels();
  const isLevelUnlocked = (levelId) => true; // All lessons unlocked
  const isLevelCompleted = (levelId) => false;

  const handleLevelClick = (level) => {
    if (isLevelUnlocked(level.id)) {
      navigate(`/games/play/rockets/${level.type}/${level.id}`);
    }
  };

  // Organize lessons by units (varying lesson counts)
  const units = [];
  const lessonCounts = [6, 8, 10, 6, 8, 10, 8, 6, 6, 6]; // Lessons per unit
  let currentIndex = 0;
  
  lessonCounts.forEach((count, i) => {
    units.push({
      lessons: levels.slice(currentIndex, currentIndex + count),
      isReversed: i % 2 === 1
    });
    currentIndex += count;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-black text-white">
      {/* Stars Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3}px`,
              height: `${Math.random() * 3}px`,
              opacity: Math.random() * 0.7 + 0.3,
              animation: `twinkle ${Math.random() * 3 + 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="relative z-50 border-b border-purple-700 bg-purple-900/90 backdrop-blur-md sticky top-0 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/learn')}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <Rocket className="w-8 h-8 text-cyan-400" />
              <div>
                <h1 className="text-xl font-bold">Rocket Engineering Journey</h1>
                <p className="text-sm text-cyan-200">74 Lessons • Launch into space exploration</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <Star className="w-5 h-5 text-yellow-300" />
                <span className="text-lg font-bold">{completedLevels.length}/{levels.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <div className="space-y-12">
          {units.map((unit, unitIndex) => {
            const row = unit.isReversed ? [...unit.lessons].reverse() : unit.lessons;
            
            // Determine if we should show a level header
            const showLevelHeader = unitIndex === 0 || unitIndex === 2 || unitIndex === 5 || unitIndex === 8;
            const levelInfo = {
              0: { name: 'BEGINNER', subtitle: 'Build foundation — how it works', color: 'from-green-500 to-emerald-600', icon: '🟢' },
              2: { name: 'INTERMEDIATE', subtitle: 'Learn systems and physics', color: 'from-yellow-500 to-orange-600', icon: '🟡' },
              5: { name: 'ADVANCED', subtitle: 'Design, simulate, analyze', color: 'from-blue-500 to-cyan-600', icon: '🔵' },
              8: { name: 'MASTER', subtitle: 'Innovate and optimize', color: 'from-red-500 to-pink-600', icon: '🔴' }
            };
            
            return (
              <div key={unitIndex} className="relative">
                {/* Level Header */}
                {showLevelHeader && (
                  <div className="mb-16 text-center">
                    <div className={`inline-block px-16 py-8 rounded-3xl border-4 shadow-2xl bg-gradient-to-r ${levelInfo[unitIndex].color} border-white/30`}>
                      <div className="text-5xl mb-2">{levelInfo[unitIndex].icon}</div>
                      <div className="text-4xl font-bold text-white mb-2">{levelInfo[unitIndex].name}</div>
                      <div className="text-lg text-white/90">{levelInfo[unitIndex].subtitle}</div>
                    </div>
                  </div>
                )}
                
                {/* Unit Header */}
                <div className="mb-12 text-center">
                  <div className="inline-block px-8 py-3 rounded-2xl border-2 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border-purple-400">
                    <div className="font-bold text-2xl mb-1">{unit.lessons[0].unit}</div>
                    <div className="text-sm opacity-80">
                      {unit.lessons[0].level} • Unit {unitIndex + 1} • {unit.lessons.length} Lessons
                    </div>
                  </div>
                </div>

                {/* Row of lessons */}
                <div className={`grid gap-6`} style={{ gridTemplateColumns: `repeat(${unit.lessons.length}, minmax(0, 1fr))` }}>
                  {row.map((level) => {
                    const unlocked = isLevelUnlocked(level.id);
                    const completed = isLevelCompleted(level.id);
                    const isCurrent = unlocked && !completed;

                    return (
                      <div key={level.id} className="relative flex flex-col items-center">
                        {isCurrent && (
                          <div className="absolute -top-16 left-1/2 -translate-x-1/2 animate-bounce z-10">
                            <Rocket 
                              className="w-10 h-10 text-white drop-shadow-lg" 
                              style={{ 
                                transform: unit.isReversed ? 'rotate(180deg)' : 'rotate(0deg)',
                                filter: 'drop-shadow(0 0 10px rgba(34, 211, 238, 0.8))'
                              }} 
                            />
                          </div>
                        )}

                        <button
                          onClick={() => handleLevelClick(level)}
                          disabled={!unlocked}
                          className="group relative"
                        >
                          {isCurrent && (
                            <div className="absolute inset-0 bg-cyan-400 rounded-full blur-xl opacity-50 animate-pulse" />
                          )}

                          <div
                            className={`relative w-20 h-20 rounded-full border-4 flex items-center justify-center transition-all ${
                              completed
                                ? 'bg-gradient-to-br from-green-400 to-emerald-500 border-green-300 shadow-lg shadow-green-500/50'
                                : unlocked
                                ? `bg-gradient-to-br ${level.color} border-white shadow-lg shadow-cyan-500/50 hover:scale-110`
                                : 'bg-gray-700 border-gray-600'
                            }`}
                          >
                            {completed ? (
                              <CheckCircle className="w-10 h-10 text-white" />
                            ) : unlocked ? (
                              <span className="text-3xl">{level.emoji}</span>
                            ) : (
                              <Lock className="w-7 h-7 text-gray-400" />
                            )}
                          </div>
                        </button>

                        <div className="mt-3 text-center">
                          <div className={`font-bold text-sm ${unlocked ? 'text-white' : 'text-gray-500'}`}>
                            {level.lesson}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {unitIndex < units.length - 1 && (
                  <div className="flex justify-center my-8">
                    <div className="w-1 h-12 bg-purple-500/30 rounded-full" />
                  </div>
                )}
              </div>
            );
          })}

          {/* Final Trophy */}
          <div className="flex justify-center mt-12">
            <div className="bg-gradient-to-r from-yellow-400 to-amber-500 rounded-3xl p-8 border-4 border-yellow-300 shadow-2xl shadow-yellow-500/50">
              <div className="text-center">
                <div className="text-6xl mb-3">🏆</div>
                <div className="text-2xl font-bold text-white">Journey Complete!</div>
                <div className="text-sm text-white/90 mt-1">Master Rocket Engineer</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
