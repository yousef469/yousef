import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plane, Star, Lock, CheckCircle, Cloud, Trophy } from 'lucide-react';

export default function GameMapPlanes() {
  const navigate = useNavigate();
  const [completedUnits, setCompletedUnits] = useState([]);

  // 28 units total with 211 lessons
  const units = [
    // BEGINNER - 6 units, 6 lessons each = 36 lessons
    { id: 1, level: 'Beginner', name: 'Introduction to Flight', lessons: 6, emoji: '🛫', color: 'from-green-400 to-emerald-500' },
    { id: 2, level: 'Beginner', name: 'Basic Aerodynamics', lessons: 6, emoji: '💨', color: 'from-green-400 to-emerald-500' },
    { id: 3, level: 'Beginner', name: 'Aircraft Parts', lessons: 6, emoji: '✈️', color: 'from-green-400 to-emerald-500' },
    { id: 4, level: 'Beginner', name: 'Forces of Flight', lessons: 6, emoji: '⬆️', color: 'from-green-400 to-emerald-500' },
    { id: 5, level: 'Beginner', name: 'Takeoff & Landing', lessons: 6, emoji: '🛬', color: 'from-green-400 to-emerald-500' },
    { id: 6, level: 'Beginner', name: 'Basic Navigation', lessons: 6, emoji: '🧭', color: 'from-green-400 to-emerald-500' },
    
    // INTERMEDIATE - 6 units, 7 lessons each = 42 lessons
    { id: 7, level: 'Intermediate', name: 'Wing Design', lessons: 7, emoji: '🪽', color: 'from-blue-400 to-cyan-500' },
    { id: 8, level: 'Intermediate', name: 'Engine Systems', lessons: 7, emoji: '⚙️', color: 'from-blue-400 to-cyan-500' },
    { id: 9, level: 'Intermediate', name: 'Flight Controls', lessons: 7, emoji: '🎮', color: 'from-blue-400 to-cyan-500' },
    { id: 10, level: 'Intermediate', name: 'Weather & Flight', lessons: 7, emoji: '⛈️', color: 'from-blue-400 to-cyan-500' },
    { id: 11, level: 'Intermediate', name: 'Instrument Flying', lessons: 7, emoji: '📊', color: 'from-blue-400 to-cyan-500' },
    { id: 12, level: 'Intermediate', name: 'Air Traffic Control', lessons: 7, emoji: '📡', color: 'from-blue-400 to-cyan-500' },
    
    // ADVANCED - 6 units, 8 lessons each = 48 lessons
    { id: 13, level: 'Advanced', name: 'Advanced Aerodynamics', lessons: 8, emoji: '🌪️', color: 'from-purple-400 to-pink-500' },
    { id: 14, level: 'Advanced', name: 'Jet Propulsion', lessons: 8, emoji: '🚀', color: 'from-purple-400 to-pink-500' },
    { id: 15, level: 'Advanced', name: 'High-Speed Flight', lessons: 8, emoji: '⚡', color: 'from-purple-400 to-pink-500' },
    { id: 16, level: 'Advanced', name: 'Aircraft Performance', lessons: 8, emoji: '📈', color: 'from-purple-400 to-pink-500' },
    { id: 17, level: 'Advanced', name: 'Emergency Procedures', lessons: 8, emoji: '🚨', color: 'from-purple-400 to-pink-500' },
    { id: 18, level: 'Advanced', name: 'Complex Systems', lessons: 8, emoji: '🔧', color: 'from-purple-400 to-pink-500' },
    
    // EXPERT - 5 units, 8 lessons each = 40 lessons
    { id: 19, level: 'Expert', name: 'Supersonic Flight', lessons: 8, emoji: '💥', color: 'from-orange-400 to-red-500' },
    { id: 20, level: 'Expert', name: 'Military Aviation', lessons: 8, emoji: '🎖️', color: 'from-orange-400 to-red-500' },
    { id: 21, level: 'Expert', name: 'Test Pilot Training', lessons: 8, emoji: '🧪', color: 'from-orange-400 to-red-500' },
    { id: 22, level: 'Expert', name: 'Aerobatic Maneuvers', lessons: 8, emoji: '🎪', color: 'from-orange-400 to-red-500' },
    { id: 23, level: 'Expert', name: 'Advanced Navigation', lessons: 8, emoji: '🗺️', color: 'from-orange-400 to-red-500' },
    
    // MASTER - 5 units, 9 lessons each = 45 lessons
    { id: 24, level: 'Master', name: 'Aircraft Design', lessons: 9, emoji: '📐', color: 'from-yellow-400 to-amber-500' },
    { id: 25, level: 'Master', name: 'Future of Aviation', lessons: 9, emoji: '🔮', color: 'from-yellow-400 to-amber-500' },
    { id: 26, level: 'Master', name: 'Space Planes', lessons: 9, emoji: '🛸', color: 'from-yellow-400 to-amber-500' },
    { id: 27, level: 'Master', name: 'Aviation Engineering', lessons: 9, emoji: '🏗️', color: 'from-yellow-400 to-amber-500' },
    { id: 28, level: 'Master', name: 'Master Certification', lessons: 9, emoji: '🏆', color: 'from-yellow-400 to-amber-500' }
  ];

  const totalLessons = units.reduce((sum, unit) => sum + unit.lessons, 0);
  const levelStats = {
    'Beginner': { units: 6, lessons: 36, color: 'text-green-400' },
    'Intermediate': { units: 6, lessons: 42, color: 'text-blue-400' },
    'Advanced': { units: 6, lessons: 48, color: 'text-purple-400' },
    'Expert': { units: 5, lessons: 40, color: 'text-orange-400' },
    'Master': { units: 5, lessons: 45, color: 'text-yellow-400' }
  };

  const isUnitUnlocked = (unitId) => {
    if (unitId === 1) return true;
    return completedUnits.includes(unitId - 1);
  };

  const isUnitCompleted = (unitId) => completedUnits.includes(unitId);

  const handleUnitClick = (unit) => {
    if (isUnitUnlocked(unit.id)) {
      navigate(`/games/play/planes/unit/${unit.id}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-400 via-blue-600 to-indigo-900 text-white">
      {/* Clouds Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute opacity-10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${15 + Math.random() * 15}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          >
            <Cloud className="w-40 h-40 text-white" />
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="relative z-10 border-b border-blue-700 bg-blue-900/80 backdrop-blur-sm sticky top-0">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/learn')}
                className="p-2 hover:bg-blue-800 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <Plane className="w-8 h-8 text-cyan-300" />
              <div>
                <h1 className="text-2xl font-bold">Aircraft Journey</h1>
                <p className="text-sm text-blue-200">28 Units • {totalLessons} Lessons</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-300" />
                <span className="text-lg font-bold">{completedUnits.length}/{units.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Level Stats */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-5 gap-4 mb-8">
          {Object.entries(levelStats).map(([level, stats]) => (
            <div key={level} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <div className={`text-lg font-bold ${stats.color}`}>{level}</div>
              <div className="text-sm text-white/80">{stats.units} units • {stats.lessons} lessons</div>
            </div>
          ))}
        </div>

        {/* Units Grid */}
        <div className="space-y-12">
          {['Beginner', 'Intermediate', 'Advanced', 'Expert', 'Master'].map((level) => {
            const levelUnits = units.filter(u => u.level === level);
            const stats = levelStats[level];
            
            return (
              <div key={level} className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className={`text-3xl font-bold ${stats.color}`}>{level}</div>
                  <div className="flex-1 h-1 bg-white/20 rounded-full">
                    <div 
                      className={`h-full bg-gradient-to-r ${levelUnits[0].color} rounded-full transition-all`}
                      style={{ 
                        width: `${(completedUnits.filter(id => levelUnits.find(u => u.id === id)).length / levelUnits.length) * 100}%` 
                      }}
                    />
                  </div>
                  <div className="text-sm text-white/60">
                    {completedUnits.filter(id => levelUnits.find(u => u.id === id)).length}/{levelUnits.length}
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {levelUnits.map((unit) => {
                    const unlocked = isUnitUnlocked(unit.id);
                    const completed = isUnitCompleted(unit.id);

                    return (
                      <button
                        key={unit.id}
                        onClick={() => handleUnitClick(unit)}
                        disabled={!unlocked}
                        className={`group relative p-6 rounded-2xl border-2 transition-all ${
                          completed
                            ? 'bg-gradient-to-br from-green-500/20 to-emerald-500/20 border-green-400'
                            : unlocked
                            ? `bg-gradient-to-br ${unit.color}/20 border-white/30 hover:scale-105 hover:shadow-xl`
                            : 'bg-gray-800/50 border-gray-700'
                        }`}
                      >
                        {/* Glow Effect */}
                        {unlocked && !completed && (
                          <div className="absolute inset-0 bg-cyan-400/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                        )}

                        <div className="relative space-y-3">
                          {/* Icon */}
                          <div className="text-5xl mb-2">{unit.emoji}</div>

                          {/* Status Icon */}
                          <div className="absolute top-0 right-0">
                            {completed ? (
                              <CheckCircle className="w-6 h-6 text-green-400" />
                            ) : !unlocked ? (
                              <Lock className="w-6 h-6 text-gray-500" />
                            ) : null}
                          </div>

                          {/* Unit Info */}
                          <div>
                            <div className="text-xs text-white/60 mb-1">Unit {unit.id}</div>
                            <div className={`font-bold text-sm mb-2 ${unlocked ? 'text-white' : 'text-gray-500'}`}>
                              {unit.name}
                            </div>
                            <div className="text-xs text-white/60">
                              {unit.lessons} lessons
                            </div>
                          </div>

                          {/* Progress Bar */}
                          {unlocked && (
                            <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                              <div 
                                className={`h-full bg-gradient-to-r ${unit.color} transition-all`}
                                style={{ width: completed ? '100%' : '0%' }}
                              />
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
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
