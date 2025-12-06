import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Building2, Star, Lock, CheckCircle, HardHat } from 'lucide-react';
import { civilCurriculum, getAllLessons } from '../data/civil/comprehensive-curriculum.js';
import { useProgress } from '../contexts/ProgressContext';
import CourseIntro from '../components/CourseIntro';

export default function GameMapCivil() {
  const navigate = useNavigate();
  const { isLessonCompleted, getSubjectProgress, userProfile } = useProgress();
  const [showIntro, setShowIntro] = useState(true);

  const allLessons = getAllLessons();
  const totalLessons = allLessons.length;

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
      emoji: civilCurriculum.sections[lesson.sectionIndex]?.icon || '🏗️',
      color: civilCurriculum.sections[lesson.sectionIndex]?.color || 'from-amber-500 to-orange-500',
      xp: lesson.xp || 150,
      duration: lesson.duration || '25 min'
    }));
  };

  const levels = generateLevels();
  const isLevelUnlocked = (levelId) => {
    if (levelId === 0) return true;
    return isLessonCompleted('civil', levelId - 1);
  };
  const isLevelCompleted = (levelId) => isLessonCompleted('civil', levelId);
  
  const progress = getSubjectProgress('civil', totalLessons);
  const nextLesson = levels.find(level => isLevelUnlocked(level.id) && !isLevelCompleted(level.id));
  
  const currentLevel = userProfile.level || 1;
  const currentXP = userProfile.total_xp || 0;
  const xpForCurrentLevel = (currentLevel - 1) * 1000;
  const xpProgress = currentXP - xpForCurrentLevel;
  const xpNeeded = (currentLevel * 1000) - currentXP;

  const handleLevelClick = (level) => {
    if (isLevelUnlocked(level.id)) {
      navigate(`/games/play/civil/${level.type}/${level.id}`);
    }
  };

  const sections = civilCurriculum.sections.map((section, sectionIndex) => {
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
          subject="civil"
          totalLessons={totalLessons}
          totalQuizzes={totalQuizzes}
          completedLessons={progress.completed}
          onStart={() => setShowIntro(false)}
        />
      )}
      
    <div className="min-h-screen bg-gradient-to-br from-amber-900 via-stone-900 to-gray-900 text-white pb-20 md:pb-0">
      {/* Building Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute opacity-10"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: '0',
              width: `${60 + Math.random() * 100}px`,
              height: `${150 + Math.random() * 250}px`,
              background: 'linear-gradient(to top, #78350f, transparent)'
            }}
          >
            <Building2 className="w-full h-full text-amber-500" />
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="relative z-50 border-b border-amber-700 bg-stone-900/90 backdrop-blur-md sticky top-0 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/learn')}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <HardHat className="w-8 h-8 text-amber-400" />
              <div>
                <h1 className="text-lg sm:text-xl font-bold">Civil Engineering Journey</h1>
                <p className="text-xs sm:text-sm text-amber-200">{totalLessons} Lessons • Master infrastructure</p>
              </div>
            </div>
            <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto justify-between sm:justify-end">
              <div className="flex items-center gap-2 bg-white/10 px-3 sm:px-4 py-2 rounded-full">
                <Star className="w-4 sm:w-5 h-4 sm:h-5 text-yellow-300" />
                <span className="text-sm sm:text-lg font-bold">{progress.completed}/{totalLessons}</span>
              </div>
              <div className="bg-white/10 px-3 sm:px-4 py-2 rounded-lg">
                <div className="text-xs text-amber-200 mb-1">Level {currentLevel}</div>
                <div className="flex items-center gap-2">
                  <div className="w-20 sm:w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-500"
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
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-6 sm:pt-8">
          <button
            onClick={() => handleLevelClick(nextLesson)}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <HardHat className="w-5 sm:w-6 h-5 sm:h-6" />
              <div className="text-left">
                <div className="text-xs sm:text-sm opacity-90">Continue Learning</div>
                <div className="text-sm sm:text-lg">Lesson {nextLesson.id + 1}: {nextLesson.title}</div>
              </div>
            </div>
            <div className="text-xl sm:text-2xl group-hover:translate-x-1 transition-transform">→</div>
          </button>
        </div>
      )}

      {/* Grid Layout */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 pb-24">
        <div className="space-y-8 sm:space-y-12">
          {sections.map((section, sectionIndex) => {
            const row = section.isReversed ? [...section.lessons].reverse() : section.lessons;
            const completedInSection = section.lessons.filter(l => isLevelCompleted(l.id)).length;

            return (
              <div key={section.id} className="relative">
                {/* Section Header */}
                <div className="mb-8 sm:mb-12 text-center">
                  <div className={`inline-block px-6 sm:px-10 py-4 sm:py-6 rounded-2xl border-2 bg-gradient-to-r ${section.color} border-white/30 shadow-xl`}>
                    <div className="text-3xl sm:text-4xl mb-2">{section.icon}</div>
                    <div className="text-lg sm:text-2xl font-bold text-white mb-1">{section.title}</div>
                    <div className="text-xs sm:text-sm text-white/90 mb-3">{section.description}</div>
                    <div className="w-32 sm:w-48 h-2 bg-white/20 rounded-full overflow-hidden mx-auto">
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
                <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
                  {row.map((level) => {
                    const unlocked = isLevelUnlocked(level.id);
                    const completed = isLevelCompleted(level.id);
                    const isCurrent = unlocked && !completed;

                    return (
                      <div key={level.id} className="relative flex flex-col items-center" style={{ width: '100px', maxWidth: '140px' }}>
                        {isCurrent && (
                          <div className="absolute -top-10 sm:-top-12 left-1/2 -translate-x-1/2 animate-bounce z-10">
                            <HardHat
                              className="w-6 sm:w-8 h-6 sm:h-8 text-amber-400 drop-shadow-lg"
                              style={{ filter: 'drop-shadow(0 0 10px rgba(245, 158, 11, 0.8))' }}
                            />
                          </div>
                        )}

                        <button
                          onClick={() => handleLevelClick(level)}
                          disabled={!unlocked}
                          className="group relative"
                        >
                          {isCurrent && (
                            <div className="absolute inset-0 bg-amber-400 rounded-full blur-xl opacity-50 animate-pulse" />
                          )}

                          <div
                            className={`relative w-14 sm:w-16 h-14 sm:h-16 rounded-full border-4 flex items-center justify-center transition-all ${
                              completed
                                ? 'bg-gradient-to-br from-green-400 to-emerald-500 border-green-300 shadow-lg shadow-green-500/50'
                                : unlocked
                                ? `bg-gradient-to-br ${level.color} border-white shadow-lg shadow-amber-500/50 hover:scale-110`
                                : 'bg-gray-700 border-gray-600'
                            }`}
                          >
                            {completed ? (
                              <CheckCircle className="w-7 sm:w-8 h-7 sm:h-8 text-white" />
                            ) : unlocked ? (
                              <span className="text-xl sm:text-2xl">{level.emoji}</span>
                            ) : (
                              <Lock className="w-5 sm:w-6 h-5 sm:h-6 text-gray-400" />
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
                  <div className="flex justify-center my-6 sm:my-8">
                    <div className="w-1 h-10 sm:h-12 bg-white/30 rounded-full" />
                  </div>
                )}
              </div>
            );
          })}

          {/* Final Trophy */}
          <div className="flex justify-center mt-8 sm:mt-12">
            <div className="bg-gradient-to-r from-yellow-400 to-amber-500 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border-4 border-yellow-300 shadow-2xl shadow-yellow-500/50">
              <div className="text-center">
                <div className="text-5xl sm:text-6xl mb-3">🏆</div>
                <div className="text-xl sm:text-2xl font-bold text-white">Journey Complete!</div>
                <div className="text-xs sm:text-sm text-white/90 mt-1">Master Civil Engineer</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
