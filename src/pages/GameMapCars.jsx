import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Car, Star, Lock, CheckCircle, Building2 } from 'lucide-react';

export default function GameMapCars() {
  const navigate = useNavigate();
  const [completedLevels, setCompletedLevels] = useState([0]);

  // Generate all lessons
  const generateLevels = () => {
    const levels = [];
    let levelId = 0;

    // BEGINNER - 6 units, 6 lessons each = 36 lessons
    const beginnerUnits = [
      { name: 'Introduction to Engineering', emoji: '🎓', quizzesPerLesson: 1 },
      { name: 'Physics Fundamentals', emoji: '⚛️', quizzesPerLesson: 1 },
      { name: 'Basic Mathematics for Engineers', emoji: '📐', quizzesPerLesson: 1 },
      { name: 'Introduction to Mechanics', emoji: '⚙️', quizzesPerLesson: 1 },
      { name: 'Materials & Tools', emoji: '🔧', quizzesPerLesson: 1 },
      { name: 'Vehicle Basics', emoji: '🚗', quizzesPerLesson: 1 }
    ];

    beginnerUnits.forEach((unit) => {
      for (let i = 0; i < 6; i++) {
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

    // INTERMEDIATE - 6 units, 7 lessons each = 42 lessons
    const intermediateUnits = [
      { name: 'Statics & Dynamics', emoji: '⚖️', quizzesPerLesson: 2 },
      { name: 'Strength of Materials', emoji: '💪', quizzesPerLesson: 2 },
      { name: 'Fluid Mechanics I', emoji: '🌊', quizzesPerLesson: 2 },
      { name: 'Thermodynamics', emoji: '🔥', quizzesPerLesson: 2 },
      { name: 'Electrical Fundamentals', emoji: '🔌', quizzesPerLesson: 2 },
      { name: 'Computer-Aided Design (CAD)', emoji: '💻', quizzesPerLesson: 2 }
    ];

    intermediateUnits.forEach((unit) => {
      for (let i = 0; i < 7; i++) {
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

    // ADVANCED - 6 units, 8 lessons each = 48 lessons
    const advancedUnits = [
      { name: 'Vehicle Dynamics', emoji: '🏁', quizzesPerLesson: 2 },
      { name: 'Powertrain Systems', emoji: '⚙️', quizzesPerLesson: 2 },
      { name: 'Vehicle Structures', emoji: '🏗️', quizzesPerLesson: 2 },
      { name: 'Thermal Systems', emoji: '🔥', quizzesPerLesson: 2 },
      { name: 'Control Systems & Sensors', emoji: '🎮', quizzesPerLesson: 2 },
      { name: 'Manufacturing & Assembly', emoji: '🏭', quizzesPerLesson: 2 }
    ];

    advancedUnits.forEach((unit) => {
      for (let i = 0; i < 8; i++) {
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

    // EXPERT - 5 units, 8 lessons each = 40 lessons
    const expertUnits = [
      { name: 'Finite Element Analysis (FEA)', emoji: '📊', quizzesPerLesson: 3 },
      { name: 'Computational Fluid Dynamics (CFD)', emoji: '💨', quizzesPerLesson: 3 },
      { name: 'Automotive Electronics', emoji: '🔌', quizzesPerLesson: 2 },
      { name: 'Systems Integration', emoji: '🔗', quizzesPerLesson: 2 },
      { name: 'Safety and Certification', emoji: '✅', quizzesPerLesson: 2 }
    ];

    expertUnits.forEach((unit) => {
      for (let i = 0; i < 8; i++) {
        levels.push({
          id: levelId++,
          type: 'lesson',
          level: 'Expert',
          unit: unit.name,
          lesson: `Lesson ${i + 1}`,
          emoji: unit.emoji,
          color: 'from-orange-400 to-red-500',
          quizzesAfter: unit.quizzesPerLesson
        });
      }
    });

    // MASTER - 5 units, 9 lessons each = 45 lessons
    const masterUnits = [
      { name: 'Electric & Hybrid Powertrains', emoji: '⚡', quizzesPerLesson: 3 },
      { name: 'Autonomous & AI Systems', emoji: '🤖', quizzesPerLesson: 2 },
      { name: 'Advanced Vehicle Design', emoji: '🎨', quizzesPerLesson: 2 },
      { name: 'Manufacturing Innovation', emoji: '🏭', quizzesPerLesson: 3 },
      { name: 'Capstone / Research Project', emoji: '🎓', quizzesPerLesson: 2 }
    ];

    masterUnits.forEach((unit) => {
      for (let i = 0; i < 9; i++) {
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

  // Organize lessons by units
  const units = [];
  let currentIndex = 0;

  // BEGINNER - 6 units × 6 lessons = 36 lessons
  for (let i = 0; i < 6; i++) {
    units.push({
      level: 'Beginner',
      lessons: levels.slice(currentIndex, currentIndex + 6),
      isReversed: i % 2 === 1
    });
    currentIndex += 6;
  }

  // INTERMEDIATE - 6 units × 7 lessons = 42 lessons
  for (let i = 0; i < 6; i++) {
    units.push({
      level: 'Intermediate',
      lessons: levels.slice(currentIndex, currentIndex + 7),
      isReversed: (6 + i) % 2 === 1
    });
    currentIndex += 7;
  }

  // ADVANCED - 6 units × 8 lessons = 48 lessons
  for (let i = 0; i < 6; i++) {
    units.push({
      level: 'Advanced',
      lessons: levels.slice(currentIndex, currentIndex + 8),
      isReversed: (12 + i) % 2 === 1
    });
    currentIndex += 8;
  }

  // EXPERT - 5 units × 8 lessons = 40 lessons
  for (let i = 0; i < 5; i++) {
    units.push({
      level: 'Expert',
      lessons: levels.slice(currentIndex, currentIndex + 8),
      isReversed: (18 + i) % 2 === 1
    });
    currentIndex += 8;
  }

  // MASTER - 5 units × 9 lessons = 45 lessons
  for (let i = 0; i < 5; i++) {
    units.push({
      level: 'Master',
      lessons: levels.slice(currentIndex, currentIndex + 9),
      isReversed: (23 + i) % 2 === 1
    });
    currentIndex += 9;
  }

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
      <div className="relative z-10 border-b border-gray-700 bg-gray-900/80 backdrop-blur-sm sticky top-0">
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
                <p className="text-sm text-orange-200">76 Lessons • Drive through the curriculum</p>
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
                <div className="mb-6 text-center">
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
