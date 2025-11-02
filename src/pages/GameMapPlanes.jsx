import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plane, Star, Cloud } from 'lucide-react';

export default function GameMapPlanes() {
  const navigate = useNavigate();
  const [completedLevels] = useState([0]);

  // Generate all 83 lessons (10 units with varying lesson counts)
  const generateLevels = () => {
    const levels = [];
    let levelId = 0;

    const units = [
      { name: 'Introduction to Flight', emoji: '✈️', lessons: 7, level: 'Beginner', color: 'from-green-400 to-emerald-500' },
      { name: 'Aerodynamics Basics', emoji: '💨', lessons: 8, level: 'Beginner', color: 'from-blue-400 to-cyan-500' },
      { name: 'Aircraft Structures', emoji: '🏗️', lessons: 7, level: 'Intermediate', color: 'from-purple-400 to-pink-500' },
      { name: 'Propulsion Systems', emoji: '🚀', lessons: 8, level: 'Intermediate', color: 'from-orange-400 to-red-500' },
      { name: 'Flight Mechanics', emoji: '🛫', lessons: 8, level: 'Intermediate', color: 'from-yellow-400 to-amber-500' },
      { name: 'Avionics & Flight Control Systems', emoji: '📡', lessons: 8, level: 'Advanced', color: 'from-indigo-400 to-purple-500' },
      { name: 'Aircraft Design & Simulation', emoji: '🎨', lessons: 8, level: 'Advanced', color: 'from-pink-400 to-rose-500' },
      { name: 'Flight Operations & Systems', emoji: '⚙️', lessons: 8, level: 'Advanced', color: 'from-teal-400 to-cyan-500' },
      { name: 'Aerodynamics of High-Speed Flight', emoji: '⚡', lessons: 6, level: 'Master', color: 'from-sky-400 to-blue-500' },
      { name: 'Future of Aerospace', emoji: '🌟', lessons: 7, level: 'Master', color: 'from-violet-400 to-purple-500' }
    ];

    units.forEach((unit) => {
      for (let i = 0; i < unit.lessons; i++) {
        levels.push({
          id: levelId++,
          type: 'lesson',
          level: unit.level,
          unit: unit.name,
          lesson: `Lesson ${i + 1}`,
          emoji: unit.emoji,
          color: unit.color
        });
      }
    });

    return levels;
  };

  const levels = generateLevels();
  const isLevelUnlocked = () => true; // All lessons unlocked
  const isLevelCompleted = () => false;

  const handleLevelClick = (level) => {
    if (isLevelUnlocked(level.id)) {
      navigate(`/planes/lesson/${level.id}`);
    }
  };

  // Organize lessons by units (varying lesson counts)
  const units = [];
  const lessonCounts = [7, 8, 7, 8, 8, 8, 8, 8, 6, 7]; // Lessons per unit
  let currentIndex = 0;
  
  lessonCounts.forEach((count, i) => {
    units.push({
      lessons: levels.slice(currentIndex, currentIndex + count),
      isReversed: i % 2 === 1
    });
    currentIndex += count;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-300 via-blue-400 to-indigo-600 text-white">
      {/* Clouds Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${15 + Math.random() * 15}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          >
            <Cloud className="w-32 h-32 text-white" />
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="relative z-50 border-b border-white/20 bg-blue-900/90 backdrop-blur-md sticky top-0 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/learn')}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <Plane className="w-8 h-8 text-cyan-300" />
              <div>
                <h1 className="text-xl font-bold">Aircraft Journey</h1>
                <p className="text-sm text-blue-200">83 Lessons • Follow the path</p>
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
            
            // Show level header at start of each difficulty level
            const showLevelHeader = unitIndex === 0 || unitIndex === 2 || unitIndex === 5 || unitIndex === 8;
            const levelInfo = {
              0: { name: 'BEGINNER', subtitle: 'Flight basics, lift, forces', color: 'from-green-500 to-emerald-600', icon: '🟢' },
              2: { name: 'INTERMEDIATE', subtitle: 'Aerodynamics, structures, propulsion', color: 'from-yellow-500 to-orange-600', icon: '🟡' },
              5: { name: 'ADVANCED', subtitle: 'Avionics, systems, design simulation', color: 'from-blue-500 to-cyan-600', icon: '🔵' },
              8: { name: 'MASTER', subtitle: 'Supersonic flight, innovation', color: 'from-red-500 to-pink-600', icon: '🔴' }
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
                  <div className="inline-block px-8 py-3 rounded-2xl border-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-blue-400">
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
                        {/* Plane indicator on current lesson */}
                        {isCurrent && (
                          <div className="absolute -top-16 left-1/2 -translate-x-1/2 animate-bounce z-10">
                            <Plane 
                              className="w-10 h-10 text-white drop-shadow-lg" 
                              style={{ 
                                transform: unit.isReversed ? 'rotate(180deg)' : 'rotate(0deg)',
                                filter: 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.8))'
                              }} 
                            />
                          </div>
                        )}

                        {/* Lesson Node */}
                        <button
                          onClick={() => handleLevelClick(level)}
                          disabled={!unlocked}
                          className="group relative"
                        >
                          {/* Glow Effect */}
                          {isCurrent && (
                            <div className="absolute inset-0 bg-cyan-400 rounded-full blur-xl opacity-50 animate-pulse" />
                          )}

                          {/* Node Circle */}
                          <div
                            className={`relative w-20 h-20 rounded-full border-4 flex items-center justify-center transition-all ${
                              completed
                                ? 'bg-gradient-to-br from-green-400 to-emerald-500 border-green-300 shadow-lg shadow-green-500/50'
                                : unlocked
                                ? `bg-gradient-to-br ${level.color} border-white shadow-lg shadow-blue-500/50 hover:scale-110`
                                : 'bg-gray-700 border-gray-600'
                            }`}
                          >
                            <span className="text-3xl">{level.emoji}</span>
                          </div>
                        </button>

                        {/* Lesson Info */}
                        <div className="mt-3 text-center">
                          <div className="text-sm font-semibold">{level.lesson}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
}
