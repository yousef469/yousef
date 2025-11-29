import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plane, Star, Lock, CheckCircle, Cloud } from 'lucide-react';
import planesLessons, { planesSections, curriculumStats } from '../data/planes/planesLessonsData.js';
import { useProgress } from '../contexts/ProgressContext';
import CourseIntro from '../components/CourseIntro';

export default function GameMapPlanes() {
  const navigate = useNavigate();
  const { isLessonCompleted, getSubjectProgress, userProfile } = useProgress();
  const [showIntro, setShowIntro] = useState(true);

  // Generate levels from the comprehensive curriculum
  const generateLevels = () => {
    const levels = [];
    let levelId = 0;

    planesSections.forEach((section) => {
      section.units.forEach((unit) => {
        unit.lessons.forEach((lessonId) => {
          const lesson = planesLessons[lessonId];
          levels.push({
            id: levelId++,
            lessonId: lessonId,
            type: 'lesson',
            section: section.title,
            sectionId: section.id,
            unit: unit.title,
            title: lesson?.title || lessonId,
            emoji: section.icon,
            color: section.color,
            level: section.level,
            xp: lesson?.xp || 150
          });
        });
      });
    });

    return levels;
  };

  const levels = generateLevels();
  
  const isLevelUnlocked = (levelId) => {
    if (levelId === 0) return true;
    return isLessonCompleted('planes', levelId - 1);
  };
  
  const isLevelCompleted = (levelId) => isLessonCompleted('planes', levelId);
  
  const progress = getSubjectProgress('planes', levels.length);
  
  const currentLevel = userProfile.level || 1;
  const currentXP = userProfile.total_xp || 0;
  const xpForCurrentLevel = (currentLevel - 1) * 1000;
  const xpNeeded = currentLevel * 1000 - currentXP;
  const xpProgress = currentXP - xpForCurrentLevel;
  
  const nextLesson = levels.find(level => isLevelUnlocked(level.id) && !isLevelCompleted(level.id));

  const handleLevelClick = (level) => {
    if (isLevelUnlocked(level.id)) {
      navigate(`/games/play/planes/lesson/${level.id}?lesson=${level.lessonId}`);
    }
  };

  const organizedSections = planesSections.map((section, sectionIndex) => {
    const sectionLessons = levels.filter(l => l.sectionId === section.id);
    return {
      ...section,
      lessons: sectionLessons,
      completedCount: sectionLessons.filter(l => isLevelCompleted(l.id)).length
    };
  });

  const totalQuizzes = levels.length;

  return (
    <>
      {showIntro && (
        <CourseIntro
          subject="planes"
          totalLessons={levels.length}
          totalQuizzes={totalQuizzes}
          completedLessons={progress.completed}
          onStart={() => setShowIntro(false)}
        />
      )}
      
    <div className="min-h-screen bg-gradient-to-br from-sky-300 via-blue-400 to-indigo-600 text-white">
      {/* Clouds Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
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
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 md:gap-4 min-w-0">
              <button
                onClick={() => navigate('/learn')}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors flex-shrink-0"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <Plane className="w-6 h-6 md:w-8 md:h-8 text-cyan-300 flex-shrink-0" />
              <div className="min-w-0">
                <h1 className="text-base md:text-xl font-bold truncate">Aircraft Engineering</h1>
                <p className="text-xs md:text-sm text-blue-200">{curriculumStats.totalLessons} Lessons • {curriculumStats.totalHours} Hours</p>
              </div>
            </div>
            <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
              <div className="flex items-center gap-1 md:gap-2 bg-white/10 px-2 md:px-4 py-1 md:py-2 rounded-full">
                <Star className="w-4 h-4 md:w-5 md:h-5 text-yellow-300" />
                <span className="text-sm md:text-lg font-bold">{progress.completed}/{levels.length}</span>
              </div>
              <div className="text-xs md:text-sm text-blue-200 hidden md:block">
                {progress.percentage.toFixed(0)}%
              </div>
              <div className="bg-white/10 px-2 md:px-4 py-1 md:py-2 rounded-lg hidden lg:block">
                <div className="text-xs text-blue-200 mb-1">Level {currentLevel}</div>
                <div className="flex items-center gap-2">
                  <div className="w-24 md:w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-500"
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
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 pt-4 md:pt-8">
          <button
            onClick={() => handleLevelClick(nextLesson)}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-3 md:py-4 px-4 md:px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-between group active:scale-[0.98]"
          >
            <div className="flex items-center gap-2 md:gap-3 min-w-0">
              <Plane className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0" />
              <div className="text-left min-w-0">
                <div className="text-xs md:text-sm opacity-90">Continue Learning</div>
                <div className="text-sm md:text-lg truncate">{nextLesson.title}</div>
              </div>
            </div>
            <div className="text-xl md:text-2xl group-hover:translate-x-1 transition-transform flex-shrink-0">→</div>
          </button>
        </div>
      )}

      {/* Sections Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="space-y-12">
          {organizedSections.map((section) => (
            <div key={section.id} className="relative">
              {/* Section Header */}
              <div className="mb-6 md:mb-8 text-center">
                <div className={`inline-block px-6 md:px-8 py-3 md:py-4 rounded-2xl border-2 bg-gradient-to-r ${section.color} border-white/30 shadow-xl`}>
                  <div className="text-3xl md:text-4xl mb-2">{section.icon}</div>
                  <div className="text-xl md:text-2xl font-bold text-white mb-1">{section.title}</div>
                  <div className="text-xs md:text-sm text-white/80 mb-2">{section.description}</div>
                  <div className="text-xs text-white/60">
                    {section.level} • {section.lessons.length} Lessons
                  </div>
                  <div className="w-32 md:w-48 h-2 bg-white/20 rounded-full overflow-hidden mx-auto mt-3">
                    <div 
                      className="h-full bg-white transition-all duration-500"
                      style={{ width: `${section.lessons.length > 0 ? (section.completedCount / section.lessons.length) * 100 : 0}%` }}
                    />
                  </div>
                  <div className="text-xs text-white/80 mt-1">
                    {section.completedCount}/{section.lessons.length} Complete
                  </div>
                </div>
              </div>

              {/* Lessons Grid */}
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 md:gap-6">
                {section.lessons.map((level) => {
                  const unlocked = isLevelUnlocked(level.id);
                  const completed = isLevelCompleted(level.id);
                  const isCurrent = unlocked && !completed;

                  return (
                    <div key={level.id} className="relative flex flex-col items-center">
                      {isCurrent && (
                        <div className="absolute -top-8 md:-top-10 left-1/2 -translate-x-1/2 animate-bounce z-10">
                          <Plane 
                            className="w-6 h-6 md:w-8 md:h-8 text-white drop-shadow-lg" 
                            style={{ filter: 'drop-shadow(0 0 10px rgba(34, 211, 238, 0.8))' }} 
                          />
                        </div>
                      )}

                      <button
                        onClick={() => handleLevelClick(level)}
                        disabled={!unlocked}
                        className="group relative"
                      >
                        {isCurrent && (
                          <div className="absolute inset-0 bg-cyan-400 rounded-full blur-xl opacity-50 animate-pulse" />
                        )}

                        <div
                          className={`relative w-14 h-14 md:w-20 md:h-20 rounded-full border-4 flex items-center justify-center transition-all ${
                            completed
                              ? 'bg-gradient-to-br from-green-400 to-emerald-500 border-green-300 shadow-lg shadow-green-500/50'
                              : unlocked
                              ? `bg-gradient-to-br ${level.color} border-white shadow-lg shadow-blue-500/50 hover:scale-110`
                              : 'bg-gray-700 border-gray-600'
                          }`}
                        >
                          {completed ? (
                            <CheckCircle className="w-6 h-6 md:w-10 md:h-10 text-white" />
                          ) : unlocked ? (
                            <span className="text-xl md:text-3xl">{level.emoji}</span>
                          ) : (
                            <Lock className="w-5 h-5 md:w-7 md:h-7 text-gray-400" />
                          )}
                        </div>
                      </button>

                      <div className="mt-2 text-center max-w-[80px] md:max-w-[100px]">
                        <div className={`font-medium text-[10px] md:text-xs ${unlocked ? 'text-white' : 'text-gray-500'}`}>
                          {level.title?.substring(0, 18)}{level.title?.length > 18 ? '...' : ''}
                        </div>
                        <div className="text-[8px] md:text-[10px] text-cyan-300 mt-1">+{level.xp} XP</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Final Trophy */}
          <div className="flex justify-center mt-8 md:mt-12">
            <div className="bg-gradient-to-r from-yellow-400 to-amber-500 rounded-2xl md:rounded-3xl p-6 md:p-8 border-4 border-yellow-300 shadow-2xl shadow-yellow-500/50">
              <div className="text-center">
                <div className="text-4xl md:text-6xl mb-2 md:mb-3">🏆</div>
                <div className="text-xl md:text-2xl font-bold text-white">Journey Complete!</div>
                <div className="text-xs md:text-sm text-white/90 mt-1">Master Aircraft Engineer</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
    </>
  );
}
