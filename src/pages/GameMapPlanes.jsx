import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plane, Star, Lock, CheckCircle, ArrowUp, Cloud } from 'lucide-react';

export default function GameMapPlanes() {
  const navigate = useNavigate();
  const [completedLevels, setCompletedLevels] = useState([0]);

  // Auto-scroll to bottom on mount (start position)
  useEffect(() => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }, []);

  // Generate all lessons (quizzes happen after lessons, not on map)
  const generateLevels = () => {
    const levels = [];
    let levelId = 0;
    let yPosition = 98; // Start from bottom

    // Helper to add levels with zigzag positioning
    const addLesson = (data) => {
      const xPositions = [50, 30, 20, 40, 60, 70, 50, 35, 65, 45];
      const xPos = xPositions[levelId % xPositions.length];
      
      levels.push({
        id: levelId++,
        type: 'lesson',
        ...data,
        position: { top: `${yPosition}%`, left: `${xPos}%` }
      });
      
      yPosition -= 3; // Move up for next level
    };

    // BEGINNER - 6 units, 6 lessons each = 36 lessons (1 quiz per lesson after completion)
    const beginnerUnits = [
      { name: 'Introduction to Flight', emoji: '🛫', quizzesPerLesson: 1 },
      { name: 'Basic Aerodynamics', emoji: '💨', quizzesPerLesson: 1 },
      { name: 'Aircraft Parts', emoji: '✈️', quizzesPerLesson: 1 },
      { name: 'Forces of Flight', emoji: '⬆️', quizzesPerLesson: 1 },
      { name: 'Takeoff & Landing', emoji: '🛬', quizzesPerLesson: 1 },
      { name: 'Basic Navigation', emoji: '🧭', quizzesPerLesson: 1 }
    ];

    beginnerUnits.forEach((unit) => {
      for (let i = 0; i < 6; i++) {
        addLesson({
          level: 'Beginner',
          unit: unit.name,
          lesson: `Lesson ${i + 1}`,
          emoji: unit.emoji,
          color: 'from-green-400 to-emerald-500',
          quizzesAfter: unit.quizzesPerLesson
        });
      }
    });

    // INTERMEDIATE - 6 units, 7 lessons each = 42 lessons (2 quizzes per lesson)
    const intermediateUnits = [
      { name: 'Wing Design', emoji: '🪽', quizzesPerLesson: 2 },
      { name: 'Engine Systems', emoji: '⚙️', quizzesPerLesson: 2 },
      { name: 'Flight Controls', emoji: '🎮', quizzesPerLesson: 2 },
      { name: 'Weather & Flight', emoji: '⛈️', quizzesPerLesson: 2 },
      { name: 'Instrument Flying', emoji: '📊', quizzesPerLesson: 2 },
      { name: 'Air Traffic Control', emoji: '📡', quizzesPerLesson: 2 }
    ];

    intermediateUnits.forEach((unit) => {
      for (let i = 0; i < 7; i++) {
        addLesson({
          level: 'Intermediate',
          unit: unit.name,
          lesson: `Lesson ${i + 1}`,
          emoji: unit.emoji,
          color: 'from-blue-400 to-cyan-500',
          quizzesAfter: unit.quizzesPerLesson
        });
      }
    });

    // ADVANCED - 6 units, 8 lessons each = 48 lessons (2 quizzes per lesson)
    const advancedUnits = [
      { name: 'Advanced Aerodynamics', emoji: '🌪️', quizzesPerLesson: 2 },
      { name: 'Jet Propulsion', emoji: '🚀', quizzesPerLesson: 2 },
      { name: 'High-Speed Flight', emoji: '⚡', quizzesPerLesson: 2 },
      { name: 'Aircraft Performance', emoji: '📈', quizzesPerLesson: 2 },
      { name: 'Emergency Procedures', emoji: '🚨', quizzesPerLesson: 2 },
      { name: 'Complex Systems', emoji: '🔧', quizzesPerLesson: 2 }
    ];

    advancedUnits.forEach((unit) => {
      for (let i = 0; i < 8; i++) {
        addLesson({
          level: 'Advanced',
          unit: unit.name,
          lesson: `Lesson ${i + 1}`,
          emoji: unit.emoji,
          color: 'from-purple-400 to-pink-500',
          quizzesAfter: unit.quizzesPerLesson
        });
      }
    });

    // EXPERT - 5 units, 8 lessons each = 40 lessons (2-3 quizzes per lesson)
    const expertUnits = [
      { name: 'Supersonic Flight', emoji: '💥' },
      { name: 'Military Aviation', emoji: '🎖️' },
      { name: 'Test Pilot Training', emoji: '🧪' },
      { name: 'Aerobatic Maneuvers', emoji: '🎪' },
      { name: 'Advanced Navigation', emoji: '🗺️' }
    ];

    expertUnits.forEach((unit, unitIdx) => {
      for (let i = 0; i < 8; i++) {
        const quizCount = (unitIdx * 8 + i) < 10 ? 3 : 2;
        addLesson({
          level: 'Expert',
          unit: unit.name,
          lesson: `Lesson ${i + 1}`,
          emoji: unit.emoji,
          color: 'from-orange-400 to-red-500',
          quizzesAfter: quizCount
        });
      }
    });

    // MASTER - 5 units, 9 lessons each = 45 lessons (2-3 quizzes per lesson)
    const masterUnits = [
      { name: 'Aircraft Design', emoji: '📐' },
      { name: 'Future of Aviation', emoji: '🔮' },
      { name: 'Space Planes', emoji: '🛸' },
      { name: 'Aviation Engineering', emoji: '🏗️' },
      { name: 'Master Certification', emoji: '🏆' }
    ];

    masterUnits.forEach((unit) => {
      for (let i = 0; i < 9; i++) {
        const quizCount = i % 3 === 0 ? 3 : 2;
        addLesson({
          level: 'Master',
          unit: unit.name,
          lesson: `Lesson ${i + 1}`,
          emoji: unit.emoji,
          color: 'from-yellow-400 to-amber-500',
          quizzesAfter: quizCount
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-300 via-blue-400 to-indigo-600 text-white overflow-hidden">
      {/* Clouds Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
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
        <div className="max-w-7xl mx-auto px-4 py-4">
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
                <p className="text-sm text-blue-200">Soar through the skies</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-300" />
                <span className="text-xl font-bold">{completedLevels.length}/{levels.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 z-20 p-4 bg-cyan-500 hover:bg-cyan-600 rounded-full shadow-lg transition-all hover:scale-110"
        title="Scroll to Top"
      >
        <ArrowUp className="w-6 h-6 text-white" />
      </button>

      {/* Journey Direction Indicator */}
      <div className="fixed left-8 top-1/2 -translate-y-1/2 z-20 bg-blue-900/90 backdrop-blur border border-cyan-500/30 rounded-lg p-4 text-center">
        <ArrowUp className="w-8 h-8 text-cyan-300 mx-auto mb-2 animate-bounce" />
        <div className="text-xs text-white">Fly</div>
        <div className="text-xs text-white">Upward</div>
      </div>

      {/* Map Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Level Headers */}
        <div className="mb-8 grid grid-cols-5 gap-4">
          <div className="bg-green-500/20 border border-green-400/30 rounded-lg p-3 text-center">
            <div className="text-2xl mb-1">🛫</div>
            <div className="font-bold text-sm">Beginner</div>
            <div className="text-xs text-white/80">36 Lessons</div>
          </div>
          <div className="bg-blue-500/20 border border-blue-400/30 rounded-lg p-3 text-center">
            <div className="text-2xl mb-1">🪽</div>
            <div className="font-bold text-sm">Intermediate</div>
            <div className="text-xs text-white/80">42 Lessons</div>
          </div>
          <div className="bg-purple-500/20 border border-purple-400/30 rounded-lg p-3 text-center">
            <div className="text-2xl mb-1">🌪️</div>
            <div className="font-bold text-sm">Advanced</div>
            <div className="text-xs text-white/80">48 Lessons</div>
          </div>
          <div className="bg-orange-500/20 border border-orange-400/30 rounded-lg p-3 text-center">
            <div className="text-2xl mb-1">💥</div>
            <div className="font-bold text-sm">Expert</div>
            <div className="text-xs text-white/80">40 Lessons</div>
          </div>
          <div className="bg-yellow-500/20 border border-yellow-400/30 rounded-lg p-3 text-center">
            <div className="text-2xl mb-1">🏆</div>
            <div className="font-bold text-sm">Master</div>
            <div className="text-xs text-white/80">45 Lessons</div>
          </div>
        </div>

        <div className="relative h-[6500px] bg-gradient-to-b from-transparent via-white/5 to-transparent rounded-3xl">
          {/* Path Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {levels.slice(0, -1).map((level, index) => {
              const nextLevel = levels[index + 1];
              const completed = isLevelCompleted(level.id);
              
              return (
                <line
                  key={index}
                  x1={level.position.left}
                  y1={level.position.top}
                  x2={nextLevel.position.left}
                  y2={nextLevel.position.top}
                  stroke={completed ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.2)'}
                  strokeWidth="3"
                  strokeDasharray={completed ? '0' : '10,5'}
                  className="transition-all duration-500"
                />
              );
            })}
          </svg>

          {/* Level Nodes */}
          {levels.map((level) => {
            const unlocked = isLevelUnlocked(level.id);
            const completed = isLevelCompleted(level.id);
            const isCurrent = unlocked && !completed;

            return (
              <button
                key={level.id}
                onClick={() => handleLevelClick(level)}
                disabled={!unlocked}
                className="absolute -translate-x-1/2 -translate-y-1/2 group"
                style={{ top: level.position.top, left: level.position.left }}
              >
                {/* Glow Effect */}
                {isCurrent && (
                  <div className="absolute inset-0 bg-cyan-400 rounded-full blur-xl opacity-50 animate-pulse" />
                )}

                {/* Node Circle */}
                <div
                  className={`relative w-20 h-20 rounded-full border-4 flex items-center justify-center transition-all ${
                    completed
                      ? 'bg-gradient-to-br from-green-400 to-emerald-500 border-green-300 scale-100'
                      : unlocked
                      ? `bg-gradient-to-br ${level.color} border-white scale-110 group-hover:scale-125`
                      : 'bg-gray-700 border-gray-600 scale-90'
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

                {/* Label */}
                <div className="absolute top-full mt-3 left-1/2 -translate-x-1/2 text-center whitespace-nowrap">
                  <div className={`text-xs font-semibold ${unlocked ? 'text-white' : 'text-gray-400'}`}>
                    {level.level}
                  </div>
                  <div className={`font-bold text-sm ${unlocked ? 'text-white' : 'text-gray-500'}`}>
                    {level.lesson}
                  </div>
                  {level.quizzesAfter > 0 && (
                    <div className="text-xs text-cyan-300">
                      +{level.quizzesAfter} {level.quizzesAfter === 1 ? 'quiz' : 'quizzes'}
                    </div>
                  )}
                </div>

                {/* Plane Animation for Current Level */}
                {isCurrent && (
                  <div className="absolute -top-16 left-1/2 -translate-x-1/2 animate-bounce">
                    <Plane 
                      className="w-10 h-10 text-white drop-shadow-lg" 
                      style={{ 
                        transform: 'rotate(-45deg)',
                        filter: 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.8))'
                      }} 
                    />
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
          50% { transform: translateY(-30px) translateX(40px); }
        }
      `}</style>
    </div>
  );
}
