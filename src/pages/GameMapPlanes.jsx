import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plane, Star, Lock, CheckCircle, Cloud } from 'lucide-react';

export default function GameMapPlanes() {
  const navigate = useNavigate();
  const [completedLevels, setCompletedLevels] = useState([0]);

  // Generate all lessons (quizzes happen after lessons, not on map)
  const generateLevels = () => {
    const levels = [];
    let levelId = 0;

    // BEGINNER - 6 units, 6 lessons each = 36 lessons (1 quiz per lesson)
    const beginnerUnits = [
      { name: 'Introduction to Engineering', emoji: '🎓', quizzesPerLesson: 1 },
      { name: 'Physics Fundamentals', emoji: '⚛️', quizzesPerLesson: 1 },
      { name: 'Basic Math for Engineers', emoji: '📐', quizzesPerLesson: 1 },
      { name: 'Introduction to Aerodynamics', emoji: '💨', quizzesPerLesson: 1 },
      { name: 'Aircraft Components & Systems', emoji: '✈️', quizzesPerLesson: 1 },
      { name: 'Materials & Tools', emoji: '🔧', quizzesPerLesson: 1 }
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

    // INTERMEDIATE (Applied Mechanics & Design) - 6 units, 7 lessons each = 42 lessons (2 quizzes per lesson)
    const intermediateUnits = [
      { name: 'Statics', emoji: '⚖️', quizzesPerLesson: 2 },
      { name: 'Dynamics', emoji: '🔄', quizzesPerLesson: 2 },
      { name: 'Strength of Materials', emoji: '💪', quizzesPerLesson: 2 },
      { name: 'Fluid Mechanics I', emoji: '🌊', quizzesPerLesson: 2 },
      { name: 'Thermodynamics', emoji: '🔥', quizzesPerLesson: 2 },
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

    // ADVANCED (Aerospace Systems & Design) - 6 units, 8 lessons each = 48 lessons (2 quizzes per lesson)
    const advancedUnits = [
      { name: 'Aerodynamics II', emoji: '🌪️', quizzesPerLesson: 2 },
      { name: 'Propulsion Systems', emoji: '🚀', quizzesPerLesson: 2 },
      { name: 'Flight Mechanics', emoji: '🛫', quizzesPerLesson: 2 },
      { name: 'Avionics & Control Systems', emoji: '📡', quizzesPerLesson: 2 },
      { name: 'Manufacturing & Assembly', emoji: '🏭', quizzesPerLesson: 2 },
      { name: 'Structural Analysis', emoji: '🏗️', quizzesPerLesson: 2 }
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

    // EXPERT (Simulation & Systems Integration) - 5 units, 8 lessons each = 40 lessons (2-3 quizzes per lesson)
    const expertUnits = [
      { name: 'CFD Simulation', emoji: '💻', quizzesPerLesson: 3 },
      { name: 'FEA Analysis', emoji: '📊', quizzesPerLesson: 3 },
      { name: 'Systems Integration', emoji: '🔗', quizzesPerLesson: 2 },
      { name: 'Testing & Validation', emoji: '🧪', quizzesPerLesson: 2 },
      { name: 'Performance Optimization', emoji: '⚡', quizzesPerLesson: 2 }
    ];

    expertUnits.forEach((unit, unitIdx) => {
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

    // MASTER (Professional Engineering) - 5 units, 9 lessons each = 45 lessons (2-3 quizzes per lesson)
    const masterUnits = [
      { name: 'Aircraft Design Project', emoji: '✈️', quizzesPerLesson: 3 },
      { name: 'Certification & Regulations', emoji: '📋', quizzesPerLesson: 2 },
      { name: 'Advanced Materials', emoji: '🔬', quizzesPerLesson: 2 },
      { name: 'Innovation & Research', emoji: '💡', quizzesPerLesson: 3 },
      { name: 'Master Certification', emoji: '🏆', quizzesPerLesson: 2 }
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
  const isLevelUnlocked = (levelId) => levelId === 0 || completedLevels.includes(levelId - 1);
  const isLevelCompleted = (levelId) => completedLevels.includes(levelId) && completedLevels.includes(levelId + 1);

  const handleLevelClick = (level) => {
    if (isLevelUnlocked(level.id)) {
      navigate(`/games/play/planes/${level.type}/${level.id}`);
    }
  };

  // Organize lessons by units (each unit = 6 lessons in a row)
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
      <div className="relative z-10 border-b border-white/20 bg-blue-900/80 backdrop-blur-sm sticky top-0">
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
                <p className="text-sm text-blue-200">211 Lessons • Follow the path</p>
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
            // Show level header at the start of each level
            const showLevelHeader = 
              (unitIndex === 0) || // Beginner
              (unitIndex === 6) || // Intermediate
              (unitIndex === 12) || // Advanced
              (unitIndex === 18) || // Expert
              (unitIndex === 23); // Master
            
            const levelSubtitles = {
              'Beginner': 'Foundation',
              'Intermediate': 'Applied Mechanics & Design',
              'Advanced': 'Aerospace Systems & Design',
              'Expert': 'Simulation & Systems Integration',
              'Master': 'Professional Engineering'
            };
            const row = unit.isReversed ? [...unit.lessons].reverse() : unit.lessons;
            
            return (
              <div key={unitIndex} className="relative">
                {/* Level Header */}
                {showLevelHeader && (
                  <div className="mb-12 text-center">
                    <div className={`inline-block px-12 py-6 rounded-3xl border-4 shadow-2xl ${
                      unit.level === 'Beginner' ? 'bg-gradient-to-r from-green-500 to-emerald-600 border-green-300' :
                      unit.level === 'Intermediate' ? 'bg-gradient-to-r from-blue-500 to-cyan-600 border-blue-300' :
                      unit.level === 'Advanced' ? 'bg-gradient-to-r from-purple-500 to-pink-600 border-purple-300' :
                      unit.level === 'Expert' ? 'bg-gradient-to-r from-orange-500 to-red-600 border-orange-300' :
                      'bg-gradient-to-r from-yellow-500 to-amber-600 border-yellow-300'
                    }`}>
                      <div className="text-4xl font-bold text-white mb-2">{unit.level}</div>
                      <div className="text-lg text-white/90">{levelSubtitles[unit.level]}</div>
                    </div>
                  </div>
                )}

                {/* Unit Header */}
                <div className="mb-6 text-center">
                  <div className={`inline-block px-8 py-3 rounded-2xl border-2 ${
                    unit.level === 'Beginner' ? 'bg-green-500/20 border-green-400' :
                    unit.level === 'Intermediate' ? 'bg-blue-500/20 border-blue-400' :
                    unit.level === 'Advanced' ? 'bg-purple-500/20 border-purple-400' :
                    unit.level === 'Expert' ? 'bg-orange-500/20 border-orange-400' :
                    'bg-yellow-500/20 border-yellow-400'
                  }`}>
                    <div className="font-bold text-2xl mb-1">{unit.lessons[0].unit}</div>
                    <div className="text-sm opacity-80">
                      {unit.level} • Unit {(unitIndex % (unit.level === 'Beginner' ? 6 : unit.level === 'Intermediate' ? 6 : unit.level === 'Advanced' ? 6 : 5)) + 1}
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
                          {completed ? (
                            <CheckCircle className="w-10 h-10 text-white" />
                          ) : unlocked ? (
                            <span className="text-3xl">{level.emoji}</span>
                          ) : (
                            <Lock className="w-7 h-7 text-gray-400" />
                          )}
                        </div>
                      </button>

                      {/* Label */}
                      <div className="mt-3 text-center">
                        <div className={`text-xs font-semibold mb-1 ${unlocked ? 'text-white' : 'text-gray-400'}`}>
                          {level.level}
                        </div>
                        <div className={`font-bold text-sm ${unlocked ? 'text-white' : 'text-gray-500'}`}>
                          {level.lesson}
                        </div>
                        {level.quizzesAfter > 0 && (
                          <div className="text-xs text-cyan-300 mt-1">
                            +{level.quizzesAfter} {level.quizzesAfter === 1 ? 'quiz' : 'quizzes'}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

                {/* Connecting line to next unit */}
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
                <div className="text-sm text-white/90 mt-1">Master Pilot Certified</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-30px) translateX(40px); }
        }
      `}</style>
    </div>
  );
}
