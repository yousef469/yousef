import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Car, Star, Lock, CheckCircle, Building2 } from 'lucide-react';

export default function GameMapCars() {
  const navigate = useNavigate();
  const [completedLevels, setCompletedLevels] = useState([0]);

  // Generate all 80 lessons (10 units)
  const generateLevels = () => {
    const levels = [];
    let levelId = 0;

    // BEGINNER - 2 units, 15 lessons total
    const beginnerUnits = [
      { name: 'Introduction to Automotive Engineering', emoji: '🎓', lessons: 7, quizzesPerLesson: 1 },
      { name: 'Physics & Math Fundamentals', emoji: '⚛️', lessons: 8, quizzesPerLesson: 1 }
    ];

    beginnerUnits.forEach((unit) => {
      for (let i = 0; i < unit.lessons; i++) {
        levels.push({
          id: levelId++,
          type: 'lesson',
          level: 'Beginner',
          unit: unit.name,
          lesson: `Lesson ${i + 1}`,
          emoji: unit.emoji,
          color: 'from-green-400 to-emerald-500',
          quizzesAfter: unit.quizzesPerLesson
        });
      }
    });

    // INTERMEDIATE - 3 units, 24 lessons total
    const intermediateUnits = [
      { name: 'Mechanics & Materials', emoji: '⚙️', lessons: 8, quizzesPerLesson: 2 },
      { name: 'Thermodynamics & Fluids', emoji: '🔥', lessons: 8, quizzesPerLesson: 2 },
      { name: 'Electrical Systems & CAD', emoji: '🔌', lessons: 8, quizzesPerLesson: 2 }
    ];

    intermediateUnits.forEach((unit) => {
      for (let i = 0; i < unit.lessons; i++) {
        levels.push({
          id: levelId++,
          type: 'lesson',
          level: 'Intermediate',
          unit: unit.name,
          lesson: `Lesson ${i + 1}`,
          emoji: unit.emoji,
          color: 'from-blue-400 to-cyan-500',
          quizzesAfter: unit.quizzesPerLesson
        });
      }
    });

    // ADVANCED - 3 units, 27 lessons total
    const advancedUnits = [
      { name: 'Vehicle Dynamics & Powertrain', emoji: '🏁', lessons: 9, quizzesPerLesson: 2 },
      { name: 'Structures & Thermal Systems', emoji: '🏗️', lessons: 9, quizzesPerLesson: 2 },
      { name: 'Control Systems & Manufacturing', emoji: '🎮', lessons: 9, quizzesPerLesson: 2 }
    ];

    advancedUnits.forEach((unit) => {
      for (let i = 0; i < unit.lessons; i++) {
        levels.push({
          id: levelId++,
          type: 'lesson',
          level: 'Advanced',
          unit: unit.name,
          lesson: `Lesson ${i + 1}`,
          emoji: unit.emoji,
          color: 'from-purple-400 to-pink-500',
          quizzesAfter: unit.quizzesPerLesson
        });
      }
    });

    // MASTER - 2 units, 14 lessons total
    const masterUnits = [
      { name: 'Electric & Autonomous Vehicles', emoji: '⚡', lessons: 7, quizzesPerLesson: 3 },
      { name: 'Innovation & Future Tech', emoji: '🚀', lessons: 7, quizzesPerLesson: 3 }
    ];

    masterUnits.forEach((unit) => {
      for (let i = 0; i < unit.lessons; i++) {
        levels.push({
          id: levelId++,
          type: 'lesson',
          level: 'Master',
          unit: unit.name,
          lesson: `Lesson ${i + 1}`,
          emoji: unit.emoji,
          color: 'from-yellow-400 to-amber-500',
          quizzesAfter: unit.quizzesPerLesson
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
      navigate(`/games/play/cars/${level.type}/${level.id}`);
    }
  };

  // Organize lessons by units - 80 lessons total across 10 units
  const units = [];
  const lessonCounts = [7, 8, 8, 8, 8, 9, 9, 9, 7, 7]; // Lessons per unit
  let currentIndex = 0;

  lessonCounts.forEach((count, i) => {
    units.push({
      lessons: levels.slice(currentIndex, currentIndex + count),
      isReversed: i % 2 === 1
    });
    currentIndex += count;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-900 via-gray-900 to-black text-white">
      {/* City Buildings Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute opacity-10"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: '0',
              width: `${50 + Math.random() * 100}px`,
              height: `${100 + Math.random() * 200}px`,
              background: 'linear-gradient(to top, #1a1a1a, transparent)'
            }}
          >
            <Building2 className="w-full h-full text-orange-500" />
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="relative z-50 border-b border-gray-700 bg-gray-900/90 backdrop-blur-md sticky top-0 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/learn')}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <Car className="w-8 h-8 text-orange-400" />
              <div>
                <h1 className="text-xl font-bold">Automotive Journey</h1>
                <p className="text-sm text-orange-200">80 Lessons • Drive through the curriculum</p>
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
              0: { name: 'BEGINNER', subtitle: 'How cars move, mechanical basics', color: 'from-green-500 to-emerald-600', icon: '🟢' },
              2: { name: 'INTERMEDIATE', subtitle: 'Dynamics, materials, and electronics', color: 'from-yellow-500 to-orange-600', icon: '🟡' },
              5: { name: 'ADVANCED', subtitle: 'Energy systems, automation, design', color: 'from-blue-500 to-cyan-600', icon: '🔵' },
              8: { name: 'MASTER', subtitle: 'Maintenance, innovation, sustainability', color: 'from-red-500 to-pink-600', icon: '🔴' }
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
                  <div className={`inline-block px-8 py-3 rounded-2xl border-2 ${unit.level === 'Beginner' ? 'bg-green-500/20 border-green-400' :
                    unit.level === 'Intermediate' ? 'bg-blue-500/20 border-blue-400' :
                      unit.level === 'Advanced' ? 'bg-purple-500/20 border-purple-400' :
                        unit.level === 'Expert' ? 'bg-orange-500/20 border-orange-400' :
                          'bg-yellow-500/20 border-yellow-400'
                    }`}>
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
                            <Car
                              className="w-10 h-10 text-white drop-shadow-lg"
                              style={{
                                transform: unit.isReversed ? 'scaleX(-1)' : 'scaleX(1)',
                                filter: 'drop-shadow(0 0 10px rgba(249, 115, 22, 0.8))'
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
                            <div className="absolute inset-0 bg-orange-400 rounded-full blur-xl opacity-50 animate-pulse" />
                          )}

                          <div
                            className={`relative w-20 h-20 rounded-full border-4 flex items-center justify-center transition-all ${completed
                              ? 'bg-gradient-to-br from-green-400 to-emerald-500 border-green-300 shadow-lg shadow-green-500/50'
                              : unlocked
                                ? `bg-gradient-to-br ${level.color} border-white shadow-lg shadow-orange-500/50 hover:scale-110`
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
                          <div className={`text-xs font-semibold mb-1 ${unlocked ? 'text-white' : 'text-gray-400'}`}>
                            {level.level}
                          </div>
                          <div className={`font-bold text-sm ${unlocked ? 'text-white' : 'text-gray-500'}`}>
                            {level.lesson}
                          </div>
                          {level.quizzesAfter > 0 && (
                            <div className="text-xs text-orange-300 mt-1">
                              +{level.quizzesAfter} {level.quizzesAfter === 1 ? 'quiz' : 'quizzes'}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {unitIndex < units.length - 1 && (
                  <div className="flex justify-center my-8">
                    <div className="w-1 h-12 bg-white/30 rounded-full" />
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
                <div className="text-sm text-white/90 mt-1">Master Automotive Engineer</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
