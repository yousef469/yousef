import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calculator, Star, Lock, CheckCircle } from 'lucide-react';
import { useProgress } from '../contexts/ProgressContext';

export default function GameMapMathematics() {
  const navigate = useNavigate();
  const { isLessonCompleted, isLessonUnlocked, progress } = useProgress();
  // Initialize with lesson 1 unlocked
  const [lessonStates, setLessonStates] = useState({ 1: { completed: false, unlocked: true } });

  // Generate all 37 lessons across 7 units - memoized to prevent recreation
  const levels = useMemo(() => {
    const levels = [];
    let levelId = 1; // Start from 1 instead of 0

    const units = [
      { 
        name: 'Algebra & Equations', 
        emoji: '🟢', 
        color: 'from-green-400 to-emerald-500', 
        lessons: [
          'Variables, Constants & Units',
          'Linear & Quadratic Equations',
          'Systems of Equations (2-3 unknowns)',
          'Exponents, Powers & Roots',
          'Logarithms (sensors, sound, drag)',
          'Rearranging Formulas'
        ],
        level: 'Beginner'
      },
      { 
        name: 'Geometry & Trigonometry', 
        emoji: '🟣', 
        color: 'from-purple-400 to-pink-500', 
        lessons: [
          '2D Geometry (distance, area, angles)',
          '3D Coordinate Geometry (x, y, z)',
          'Triangles (sin, cos, tan)',
          'Vector Basics (direction & magnitude)',
          'Dot & Cross Product',
          'Transformations & Rotations'
        ],
        level: 'Beginner'
      },
      { 
        name: 'Calculus (Basic Derivatives & Integrals)', 
        emoji: '🔵', 
        color: 'from-blue-400 to-cyan-500', 
        lessons: [
          'What is a Derivative (rate of change)',
          'Velocity & Acceleration from Position',
          'Integration (area, distance, work)',
          'Simple Physical Models (free fall)',
          'Graph Interpretation (slope, curvature)'
        ],
        level: 'Intermediate'
      },
      { 
        name: 'Linear Algebra (Intro Level)', 
        emoji: '🟠', 
        color: 'from-orange-400 to-red-500', 
        lessons: [
          'Vectors & Matrices',
          'Adding, Scaling & Multiplying Matrices',
          'Solving Systems (Ax = b)',
          'Transformations & Rotation Matrices'
        ],
        level: 'Intermediate'
      },
      { 
        name: 'Statistics & Data', 
        emoji: '🟡', 
        color: 'from-yellow-400 to-amber-500', 
        lessons: [
          'Data & Averages',
          'Standard Deviation',
          'Probability Basics',
          'Error & Uncertainty',
          'Units, Dimensions & Conversions',
          'Vector Math in Physical Systems'
        ],
        level: 'Intermediate'
      },
      { 
        name: 'Advanced Calculus', 
        emoji: '🔴', 
        color: 'from-red-400 to-rose-500', 
        lessons: [
          'Partial Derivatives',
          'Multiple Integrals',
          'Chain Rule & Implicit Differentiation',
          'Optimization with Constraints',
          'Taylor Series & Approximations'
        ],
        level: 'Advanced'
      },
      { 
        name: 'Differential Equations', 
        emoji: '⚫', 
        color: 'from-gray-400 to-slate-500', 
        lessons: [
          'Introduction & First Order',
          'Second Order DEs',
          'Damping & Resonance',
          'Laplace Transforms',
          'Numerical Methods'
        ],
        level: 'Advanced'
      }
    ];

    let sequentialLessonNumber = 1; // Global counter for sequential numbering 1-27
    units.forEach((unit) => {
      unit.lessons.forEach((lessonName, i) => {
        levels.push({
          id: levelId++,
          type: 'lesson',
          unit: unit.name,
          lesson: `Lesson ${sequentialLessonNumber++}`, // Use sequential number 1-27
          lessonName: lessonName,
          emoji: unit.emoji,
          color: unit.color,
          level: unit.level
        });
      });
    });

    return levels;
  }, []);

  // Load lesson states on mount and when progress changes
  useEffect(() => {
    const loadStates = async () => {
      const states = {};
      for (const level of levels) {
        const completed = isLessonCompleted('mathematics', level.id);
        // Lesson 1 is ALWAYS unlocked
        const unlocked = level.id === 1 ? true : await isLessonUnlocked('mathematics', level.id);
        states[level.id] = { completed, unlocked };
      }
      setLessonStates(states);
    };
    loadStates();
  }, [levels, isLessonCompleted, isLessonUnlocked, progress]);

  const handleLevelClick = (level) => {
    const state = lessonStates[level.id];
    if (state?.unlocked) {
      navigate(`/learn/mathematics/engineering/lesson/${level.id}`);
    }
  };

  // Organize lessons by units
  const units = [];
  const lessonCounts = [6, 6, 5, 4, 6, 5, 5]; // Lessons per unit: 6+6+5+4+6+5+5 = 37 total
  let currentIndex = 0;
  
  lessonCounts.forEach((count, i) => {
    units.push({
      lessons: levels.slice(currentIndex, currentIndex + count),
      isReversed: i % 2 === 1
    });
    currentIndex += count;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-950 via-emerald-950 to-black text-white">
      {/* Mathematical Grid Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-10">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Header */}
      <div className="relative z-50 border-b border-green-700 bg-green-900/90 backdrop-blur-md sticky top-0 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/learn')}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <Calculator className="w-8 h-8 text-secondary" />
              <div>
                <h1 className="text-xl font-bold">Mathematics for Engineering</h1>
                <p className="text-sm text-green-200">27 Lessons • Master the language of engineering</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <Star className="w-5 h-5 text-yellow-300" />
                <span className="text-lg font-bold">
                  {Object.values(lessonStates).filter(s => s.completed).length}/{levels.length}
                </span>
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
            const showLevelHeader = unitIndex === 0 || unitIndex === 2;
            const levelInfo = {
              0: { name: 'BEGINNER', subtitle: 'Foundation — the language of engineering', color: 'from-green-500 to-emerald-600', icon: '🟢' },
              2: { name: 'INTERMEDIATE', subtitle: 'Advanced tools for real engineering', color: 'from-blue-500 to-cyan-600', icon: '🔵' }
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
                <div className="mb-20 text-center">
                  <div className="inline-block px-8 py-3 rounded-2xl border-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-400">
                    <div className="font-bold text-2xl mb-1">{unit.lessons[0].unit}</div>
                    <div className="text-sm opacity-80">
                      {unit.lessons[0].level} • Unit {unitIndex + 1} • {unit.lessons.length} Lessons
                    </div>
                  </div>
                </div>

                {/* Row of lessons */}
                <div className={`grid gap-6`} style={{ gridTemplateColumns: `repeat(${unit.lessons.length}, minmax(0, 1fr))` }}>
                  {row.map((level) => {
                    const state = lessonStates[level.id] || { completed: false, unlocked: false };
                    const { completed, unlocked } = state;
                    const isCurrent = unlocked && !completed;

                    return (
                      <div key={level.id} className="relative flex flex-col items-center">
                        {isCurrent && (
                          <div className="absolute -top-16 left-1/2 -translate-x-1/2 animate-bounce z-10">
                            <Calculator 
                              className="w-10 h-10 text-white drop-shadow-lg" 
                              style={{ 
                                filter: 'drop-shadow(0 0 10px rgba(34, 197, 94, 0.8))'
                              }} 
                            />
                          </div>
                        )}

                        <button
                          onClick={() => handleLevelClick(level)}
                          disabled={!unlocked}
                          className={`group relative ${!unlocked ? 'cursor-not-allowed' : ''}`}
                        >
                          {isCurrent && (
                            <div className="absolute inset-0 bg-green-400 rounded-full blur-xl opacity-50 animate-pulse" />
                          )}

                          <div
                            className={`relative w-20 h-20 rounded-full border-4 flex items-center justify-center transition-all ${
                              completed
                                ? 'bg-gradient-to-br from-green-500 to-emerald-600 border-green-300 shadow-lg shadow-green-500/50'
                                : unlocked
                                ? `bg-gradient-to-br ${level.color} border-white shadow-lg shadow-green-500/50 hover:scale-110`
                                : 'bg-gradient-to-br from-gray-600 to-gray-700 border-gray-500 opacity-50'
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

                        <div className="mt-3 text-center max-w-[120px]">
                          <div className={`font-bold text-sm mb-1 ${unlocked ? 'text-white' : 'text-gray-500'}`}>
                            {level.lesson}
                          </div>
                          <div className={`text-xs leading-tight ${unlocked ? 'text-green-200' : 'text-gray-600'}`}>
                            {level.lessonName}
                          </div>
                          {!unlocked && level.id > 1 && (
                            <div className="text-xs text-gray-500 mt-1">
                              Complete Lesson {level.id - 1}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {unitIndex < units.length - 1 && (
                  <div className="flex justify-center my-8">
                    <div className="w-1 h-12 bg-secondary/30 rounded-full" />
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
                <div className="text-2xl font-bold text-white">Foundation Complete!</div>
                <div className="text-sm text-white/90 mt-1">Ready for Engineering Specialization</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
