import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Zap, Star, Lock, CheckCircle } from 'lucide-react';
import { useProgress } from '../contexts/ProgressContext';

export default function GameMapPhysics() {
  const navigate = useNavigate();
  const { isLessonCompleted, isLessonUnlocked, progress, userProfile } = useProgress();
  // Initialize with lesson 1 unlocked
  const [lessonStates, setLessonStates] = useState({ 1: { completed: false, unlocked: true } });

  const levels = useMemo(() => {
    const levels = [];
    let levelId = 1;
    let sequentialLessonNumber = 1; // Global counter for sequential numbering 1-33

    const units = [
      { 
        name: 'Mechanics & Motion', 
        emoji: '🚀', 
        color: 'from-blue-400 to-indigo-500', 
        lessons: [
          'Understanding Motion',
          "Newton's Laws of Motion",
          'Forces & Free-Body Diagrams',
          'Friction, Normal Force & Tension',
          'Circular Motion',
          'Momentum & Collisions',
          'Gravity & Weight',
          'Projectile Motion'
        ],
        level: 'Beginner'
      },
      { 
        name: 'Work, Energy & Power', 
        emoji: '⚡', 
        color: 'from-yellow-400 to-orange-500', 
        lessons: [
          'What is Energy?',
          'Work & Power',
          'Conservation of Energy',
          'Efficiency',
          'Power Systems'
        ],
        level: 'Beginner'
      },
      { 
        name: 'Fluids & Pressure', 
        emoji: '🌊', 
        color: 'from-cyan-400 to-blue-500', 
        lessons: [
          'Pressure: Force Per Area Explained',
          'Buoyancy & Density: Why Things Float',
          "Bernoulli's Principle: Lift & Airflow",
          'Fluid Resistance: Drag & Viscosity',
          'Compressible Flow: High-Speed Gases'
        ],
        level: 'Intermediate'
      },
      { 
        name: 'Thermodynamics', 
        emoji: '🔥', 
        color: 'from-red-400 to-orange-500', 
        lessons: [
          'Temperature & Heat: Energy Transfer',
          'Heat Transfer: Conduction, Convection, Radiation',
          'Laws of Thermodynamics: Energy Balance',
          'Internal Combustion: How Engines Work',
          'Efficiency Limits: Carnot Cycle'
        ],
        level: 'Intermediate'
      },
      { 
        name: 'Waves, Electricity & Magnetism', 
        emoji: '📡', 
        color: 'from-purple-400 to-pink-500', 
        lessons: [
          'Wave Properties: Sound, Light & Vibration',
          'Frequency & Amplitude: Signal Basics',
          'Electricity Basics: Charge, Voltage, Current',
          "Circuits & Ohm's Law: Resistance Explained",
          'Magnetism & Electromagnetism: Motors & Generators'
        ],
        level: 'Intermediate'
      },
      { 
        name: 'Materials & Structures', 
        emoji: '🏗️', 
        color: 'from-gray-400 to-slate-500', 
        lessons: [
          'What Are Materials?: Metals, Ceramics, Composites',
          'Stress & Strain: Force vs Deformation',
          'Elastic & Plastic Deformation: Reversible vs Permanent',
          'Failure & Fatigue: How Things Break',
          'Material Selection: Weight, Strength, Cost'
        ],
        level: 'Intermediate'
      }
    ];

    units.forEach((unit) => {
      unit.lessons.forEach((lessonName, i) => {
        levels.push({
          id: levelId++,
          type: 'lesson',
          unit: unit.name,
          lesson: `Lesson ${sequentialLessonNumber++}`, // Use sequential number 1-33
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
        const completed = isLessonCompleted('physics', level.id);
        // Lesson 1 is ALWAYS unlocked
        const unlocked = level.id === 1 ? true : await isLessonUnlocked('physics', level.id);
        states[level.id] = { completed, unlocked };
      }
      setLessonStates(states);
    };
    loadStates();
  }, [levels, isLessonCompleted, isLessonUnlocked, progress, userProfile]);

  const handleLevelClick = (level) => {
    const state = lessonStates[level.id];
    if (state?.unlocked) {
      navigate(`/learn/physics/engineering/lesson/${level.id}`);
    }
  };

  const units = [];
  const lessonCounts = [8, 5, 5, 5, 5, 5];
  let currentIndex = 0;
  
  lessonCounts.forEach((count, i) => {
    units.push({
      lessons: levels.slice(currentIndex, currentIndex + count),
      isReversed: i % 2 === 1 && i !== 1 // Don't reverse unit 2 (index 1)
    });
    currentIndex += count;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-indigo-950 to-black text-white">
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

      <div className="relative z-50 border-b border-blue-700 bg-blue-900/90 backdrop-blur-md sticky top-0 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/learn')}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <Zap className="w-8 h-8 text-secondary" />
              <div>
                <h1 className="text-xl font-bold">Physics for Engineering</h1>
                <p className="text-sm text-blue-200">33 Lessons • Master the principles of motion and energy</p>
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

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <div className="space-y-12">
          {units.map((unit, unitIndex) => {
            const row = unit.isReversed ? [...unit.lessons].reverse() : unit.lessons;
            
            const showLevelHeader = unitIndex === 0 || unitIndex === 2;
            const levelInfo = {
              0: { name: 'BEGINNER', subtitle: 'Foundation — understanding motion and forces', color: 'from-blue-500 to-indigo-600', icon: '🚀' },
              2: { name: 'INTERMEDIATE', subtitle: 'Advanced physics for real engineering', color: 'from-cyan-500 to-blue-600', icon: '⚡' }
            };
            
            return (
              <div key={unitIndex} className="relative">
                {showLevelHeader && (
                  <div className="mb-16 text-center">
                    <div className={`inline-block px-16 py-8 rounded-3xl border-4 shadow-2xl bg-gradient-to-r ${levelInfo[unitIndex].color} border-white/30`}>
                      <div className="text-5xl mb-2">{levelInfo[unitIndex].icon}</div>
                      <div className="text-4xl font-bold text-white mb-2">{levelInfo[unitIndex].name}</div>
                      <div className="text-lg text-white/90">{levelInfo[unitIndex].subtitle}</div>
                    </div>
                  </div>
                )}
                
                <div className="mb-20 text-center">
                  <div className="inline-block px-8 py-3 rounded-2xl border-2 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 border-blue-400">
                    <div className="font-bold text-2xl mb-1">{unit.lessons[0].unit}</div>
                    <div className="text-sm opacity-80">
                      {unit.lessons[0].level} • Unit {unitIndex + 1} • {unit.lessons.length} Lessons
                    </div>
                  </div>
                </div>

                <div className={`grid gap-6`} style={{ gridTemplateColumns: `repeat(${unit.lessons.length}, minmax(0, 1fr))` }}>
                  {row.map((level) => {
                    const state = lessonStates[level.id] || { completed: false, unlocked: false };
                    const { completed, unlocked } = state;
                    const isCurrent = unlocked && !completed;

                    return (
                      <div key={level.id} className="relative flex flex-col items-center">
                        {isCurrent && (
                          <div className="absolute -top-16 left-1/2 -translate-x-1/2 animate-bounce z-10">
                            <Zap 
                              className="w-10 h-10 text-white drop-shadow-lg" 
                              style={{ 
                                filter: 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.8))'
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
                            <div className="absolute inset-0 bg-blue-400 rounded-full blur-xl opacity-50 animate-pulse" />
                          )}

                          <div
                            className={`relative w-20 h-20 rounded-full border-4 flex items-center justify-center transition-all ${
                              completed
                                ? 'bg-gradient-to-br from-green-500 to-emerald-600 border-green-300 shadow-lg shadow-green-500/50'
                                : unlocked
                                ? `bg-gradient-to-br ${level.color} border-white shadow-lg shadow-blue-500/50 hover:scale-110`
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
                          <div className={`text-xs leading-tight ${unlocked ? 'text-blue-200' : 'text-gray-600'}`}>
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

          <div className="flex justify-center mt-12">
            <div className="bg-gradient-to-r from-yellow-400 to-amber-500 rounded-3xl p-8 border-4 border-yellow-300 shadow-2xl shadow-yellow-500/50">
              <div className="text-center">
                <div className="text-6xl mb-3">🏆</div>
                <div className="text-2xl font-bold text-white">Physics Complete!</div>
                <div className="text-sm text-white/90 mt-1">Ready for Engineering Specialization</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
