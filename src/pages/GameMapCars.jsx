import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Car, Star, Lock, CheckCircle, Building2 } from 'lucide-react';
import { automotiveCurriculum, getAllLessons } from '../data/automotive/comprehensive-curriculum.js';
import { useProgress } from '../contexts/ProgressContext';
import CourseIntro from '../components/CourseIntro';

export default function GameMapCars() {
  const navigate = useNavigate();
  const { isLessonCompleted, getSubjectProgress, userProfile } = useProgress();
  const [showIntro, setShowIntro] = useState(true);

  // Get all lessons from curriculum
  const allLessons = getAllLessons();
  const totalLessons = allLessons.length;

  // Generate levels from curriculum sections
  const generateLevels = () => {
    return allLessons.map((lesson, index) => ({
      id: index,
      lessonId: lesson.id,
      fullId: lesson.fullId,
      type: 'lesson',
      title: lesson.title,
      description: lesson.description || lesson.introduction,
      section: lesson.sectionTitle,
      sectionId: lesson.sectionId,
      unit: lesson.unitTitle,
      emoji: automotiveCurriculum.sections[lesson.sectionIndex]?.icon || '🚗',
      color: automotiveCurriculum.sections[lesson.sectionIndex]?.color || 'from-orange-400 to-red-500',
      xp: lesson.xp || 150,
      duration: lesson.duration || '25 min'
    }));
  };

  const levels = generateLevels();
  const isLevelUnlocked = (levelId) => {
    if (levelId === 0) return true;
    return isLessonCompleted('cars', levelId - 1);
  };
  const isLevelCompleted = (levelId) => isLessonCompleted('cars', levelId);
  
  const progress = getSubjectProgress('cars', totalLessons);
  const nextLesson = levels.find(level => isLevelUnlocked(level.id) && !isLevelCompleted(level.id));
  
  const currentLevel = userProfile.level || 1;
  const currentXP = userProfile.total_xp || 0;
  const xpForCurrentLevel = (currentLevel - 1) * 1000;
  const xpProgress = currentXP - xpForCurrentLevel;
  const xpNeeded = (currentLevel * 1000) - currentXP;

  const handleLevelClick = (level) => {
    if (isLevelUnlocked(level.id)) {
      navigate(`/games/play/cars/${level.type}/${level.id}`);
    }
  };

  // Organize lessons by sections
  const sections = automotiveCurriculum.sections.map((section, sectionIndex) => {
    const sectionLessons = levels.filter(l => l.sectionId === section.id);
    return {
      ...section,
      lessons: sectionLessons,
      isReversed: sectionIndex % 2 === 1
    };
  });

  const totalQuizzes = totalLessons;

  return (
    <>
      {showIntro && (
        <CourseIntro
          subject="cars"
          totalLessons={totalLessons}
          totalQuizzes={totalQuizzes}
          completedLessons={progress.completed}
          onStart={() => setShowIntro(false)}
        />
      )}
      
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
                <h1 className="text-xl font-bold">Automotive Engineering Journey</h1>
                <p className="text-sm text-orange-200">{totalLessons} Lessons • Master vehicle engineering</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <Star className="w-5 h-5 text-yellow-300" />
                <span className="text-lg font-bold">{progress.completed}/{totalLessons}</span>
              </div>
              <div className="text-sm text-orange-200">
                {progress.percentage.toFixed(0)}% Complete
              </div>
              <div className="bg-white/10 px-4 py-2 rounded-lg">
                <div className="text-xs text-orange-200 mb-1">Level {currentLevel}</div>
                <div className="flex items-center gap-2">
                  <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-orange-400 to-red-500 transition-all duration-500"
                      style={{ width: `${(xpProgress / 1000) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-white font-bold">{xpNeeded} XP</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Next Lesson CTA */}
      {nextLesson && (
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-8">
          <button
            onClick={() => handleLevelClick(nextLesson)}
            className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <Car className="w-6 h-6" />
              <div className="text-left">
                <div className="text-sm opacity-90">Continue Learning</div>
                <div className="text-lg">Lesson {nextLesson.id + 1}: {nextLesson.title}</div>
              </div>
            </div>
            <div className="text-2xl group-hover:translate-x-1 transition-transform">→</div>
          </button>
        </div>
      )}

      {/* Grid Layout */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <div className="space-y-12">
          {sections.map((section, sectionIndex) => {
            const row = section.isReversed ? [...section.lessons].reverse() : section.lessons;
            const completedInSection = section.lessons.filter(l => isLevelCompleted(l.id)).length;

            return (
              <div key={section.id} className="relative">
                {/* Section Header */}
                <div className="mb-12 text-center">
                  <div className={`inline-block px-10 py-6 rounded-2xl border-2 bg-gradient-to-r ${section.color} border-white/30 shadow-xl`}>
                    <div className="text-4xl mb-2">{section.icon}</div>
                    <div className="text-2xl font-bold text-white mb-1">{section.title}</div>
                    <div className="text-sm text-white/90 mb-3">{section.description}</div>
                    {/* Section Progress Bar */}
                    <div className="w-48 h-2 bg-white/20 rounded-full overflow-hidden mx-auto">
                      <div 
                        className="h-full bg-white transition-all duration-500"
                        style={{ width: `${(completedInSection / section.lessons.length) * 100}%` }}
                      />
                    </div>
                    <div className="text-xs text-white/80 mt-2">
                      {completedInSection}/{section.lessons.length} Complete
                    </div>
                  </div>
                </div>

                {/* Row of lessons */}
                <div className="flex flex-wrap justify-center gap-6">
                  {row.map((level) => {
                    const unlocked = isLevelUnlocked(level.id);
                    const completed = isLevelCompleted(level.id);
                    const isCurrent = unlocked && !completed;

                    return (
                      <div key={level.id} className="relative flex flex-col items-center" style={{ width: '140px' }}>
                        {isCurrent && (
                          <div className="absolute -top-12 left-1/2 -translate-x-1/2 animate-bounce z-10">
                            <Car
                              className="w-8 h-8 text-orange-400 drop-shadow-lg"
                              style={{ filter: 'drop-shadow(0 0 10px rgba(249, 115, 22, 0.8))' }}
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
                            className={`relative w-16 h-16 rounded-full border-4 flex items-center justify-center transition-all ${
                              completed
                                ? 'bg-gradient-to-br from-green-400 to-emerald-500 border-green-300 shadow-lg shadow-green-500/50'
                                : unlocked
                                ? `bg-gradient-to-br ${level.color} border-white shadow-lg shadow-orange-500/50 hover:scale-110`
                                : 'bg-gray-700 border-gray-600'
                            }`}
                          >
                            {completed ? (
                              <CheckCircle className="w-8 h-8 text-white" />
                            ) : unlocked ? (
                              <span className="text-2xl">{level.emoji}</span>
                            ) : (
                              <Lock className="w-6 h-6 text-gray-400" />
                            )}
                          </div>
                        </button>

                        <div className="mt-2 text-center">
                          <div className={`font-bold text-xs ${unlocked ? 'text-white' : 'text-gray-500'}`}>
                            Lesson {level.id + 1}
                          </div>
                          <div className={`text-xs mt-1 line-clamp-2 ${unlocked ? 'text-white/70' : 'text-gray-500'}`}>
                            {level.title}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {sectionIndex < sections.length - 1 && (
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
    </>
  );
}
