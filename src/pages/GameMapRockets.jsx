import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Rocket, Star, Lock, CheckCircle } from 'lucide-react';
import rocketsLessons, { rocketSections, curriculumStats } from '../data/rocketsLessonsData.js';
import { useProgress } from '../contexts/ProgressContext';
import CourseIntro from '../components/CourseIntro';

export default function GameMapRockets() {
  const navigate = useNavigate();
  const { isLessonCompleted, getSubjectProgress, userProfile } = useProgress();
  const [showIntro, setShowIntro] = useState(true);


  // Generate levels from the comprehensive curriculum
  const generateLevels = () => {
    const levels = [];
    let levelId = 0;

    rocketSections.forEach((section) => {
      section.units.forEach((unit) => {
        unit.lessons.forEach((lessonId) => {
          const lesson = rocketsLessons[lessonId];
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
            comingSoon: lesson?.comingSoon || false,
            xp: lesson?.xp || 150
          });
        });
      });
    });

    return levels;
  };

  const levels = generateLevels();
  const isLevelUnlocked = (levelId) => {
    // First lesson is always unlocked
    if (levelId === 0) return true;
    // Coming soon lessons are locked
    const level = levels[levelId];
    if (level?.comingSoon) return false;
    // Check if previous non-coming-soon lesson is completed
    const prevAvailable = levels.slice(0, levelId).filter(l => !l.comingSoon);
    if (prevAvailable.length === 0) return true;
    const lastAvailable = prevAvailable[prevAvailable.length - 1];
    return isLessonCompleted('rockets', lastAvailable.id);
  };
  const isLevelCompleted = (levelId) => isLessonCompleted('rockets', levelId);
  
  // Get progress for display - use available lessons count
  const availableLessons = levels.filter(l => !l.comingSoon).length;
  const progress = getSubjectProgress('rockets', availableLessons);
  
  // Calculate XP to next level
  const currentLevel = userProfile.level || 1;
  const currentXP = userProfile.total_xp || 0;
  const xpForCurrentLevel = (currentLevel - 1) * 1000;
  const xpForNextLevel = currentLevel * 1000;
  const xpProgress = currentXP - xpForCurrentLevel;
  const xpNeeded = xpForNextLevel - currentXP;
  
  // Find next incomplete lesson (skip coming soon)
  const nextLesson = levels.find(level => !level.comingSoon && isLevelUnlocked(level.id) && !isLevelCompleted(level.id));

  const handleLevelClick = (level) => {
    if (level.comingSoon) return;
    if (isLevelUnlocked(level.id)) {
      // Pass both numeric id (for progress tracking) and lessonId (for content lookup)
      navigate(`/games/play/rockets/${level.type}/${level.id}?lesson=${level.lessonId}`);
    }
  };

  // Organize lessons by sections
  const organizedSections = rocketSections.map((section, sectionIndex) => {
    const sectionLessons = levels.filter(l => l.sectionId === section.id);
    return {
      ...section,
      lessons: sectionLessons,
      isReversed: sectionIndex % 2 === 1,
      completedCount: sectionLessons.filter(l => isLevelCompleted(l.id)).length,
      availableCount: sectionLessons.filter(l => !l.comingSoon).length
    };
  });

  // Calculate quiz count (each lesson has a quiz)
  const totalQuizzes = levels.filter(l => !l.comingSoon).length;

  return (
    <>
      {showIntro && (
        <CourseIntro
          subject="rockets"
          totalLessons={availableLessons}
          totalQuizzes={totalQuizzes}
          completedLessons={progress.completed}
          onStart={() => setShowIntro(false)}
        />
      )}
      
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-black text-white">
      {/* Stars Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3}px`,
              height: `${Math.random() * 3}px`,
              opacity: Math.random() * 0.7 + 0.3,
              animation: `twinkle ${Math.random() * 3 + 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Header - Mobile Optimized */}
      <div className="relative z-50 border-b border-purple-700 bg-purple-900/90 backdrop-blur-md sticky top-0 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 md:gap-4 min-w-0">
              <button
                onClick={() => navigate('/learn')}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors flex-shrink-0"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <Rocket className="w-6 h-6 md:w-8 md:h-8 text-cyan-400 flex-shrink-0 hidden sm:block" />
              <div className="min-w-0">
                <h1 className="text-base md:text-xl font-bold truncate">Rocket Engineering</h1>
                <p className="text-xs md:text-sm text-cyan-200 hidden sm:block">{curriculumStats.totalLessons} Lessons • {curriculumStats.availableLessons} Available</p>
              </div>
            </div>
            <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
              <div className="flex items-center gap-1 md:gap-2 bg-white/10 px-2 md:px-4 py-1 md:py-2 rounded-full">
                <Star className="w-4 h-4 md:w-5 md:h-5 text-yellow-300" />
                <span className="text-sm md:text-lg font-bold">{progress.completed}/{levels.length}</span>
              </div>
              <div className="text-xs md:text-sm text-cyan-200 hidden md:block">
                {progress.percentage.toFixed(0)}%
              </div>
              {/* XP Progress - Hidden on mobile */}
              <div className="bg-white/10 px-2 md:px-4 py-1 md:py-2 rounded-lg hidden lg:block">
                <div className="text-xs text-cyan-200 mb-1">Level {currentLevel}</div>
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

      {/* Next Lesson CTA - Mobile Optimized */}
      {nextLesson && (
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 pt-4 md:pt-8">
          <button
            onClick={() => handleLevelClick(nextLesson)}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-3 md:py-4 px-4 md:px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-between group active:scale-[0.98]"
          >
            <div className="flex items-center gap-2 md:gap-3 min-w-0">
              <Rocket className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0" />
              <div className="text-left min-w-0">
                <div className="text-xs md:text-sm opacity-90">Continue Learning</div>
                <div className="text-sm md:text-lg truncate">{nextLesson.title}</div>
              </div>
            </div>
            <div className="text-xl md:text-2xl group-hover:translate-x-1 transition-transform flex-shrink-0">→</div>
          </button>
        </div>
      )}

      {/* Grid Layout */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <div className="space-y-12">
          {organizedSections.map((section, sectionIndex) => {
            const displayLessons = section.lessons.slice(0, 12); // Show max 12 per section for layout
            
            return (
              <div key={section.id} className="relative">
                {/* Section Header */}
                <div className="mb-8 text-center">
                  <div className={`inline-block px-8 py-4 rounded-2xl border-2 bg-gradient-to-r ${section.color} border-white/30 shadow-xl`}>
                    <div className="text-4xl mb-2">{section.icon}</div>
                    <div className="text-2xl font-bold text-white mb-1">{section.title}</div>
                    <div className="text-sm text-white/80 mb-2">{section.description}</div>
                    <div className="text-xs text-white/60">
                      {section.level} • {section.lessons.length} Lessons • {section.availableCount} Available
                    </div>
                    {/* Section Progress Bar */}
                    <div className="w-48 h-2 bg-white/20 rounded-full overflow-hidden mx-auto mt-3">
                      <div 
                        className="h-full bg-white transition-all duration-500"
                        style={{ 
                          width: `${section.availableCount > 0 ? (section.completedCount / section.availableCount) * 100 : 0}%` 
                        }}
                      />
                    </div>
                    <div className="text-xs text-white/80 mt-1">
                      {section.completedCount}/{section.availableCount} Complete
                    </div>
                  </div>
                </div>

                {/* Lessons Grid */}
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 md:gap-6">
                  {displayLessons.map((level) => {
                    const unlocked = isLevelUnlocked(level.id);
                    const completed = isLevelCompleted(level.id);
                    const isCurrent = unlocked && !completed && !level.comingSoon;

                    return (
                      <div key={level.id} className="relative flex flex-col items-center">
                        {isCurrent && (
                          <div className="absolute -top-10 left-1/2 -translate-x-1/2 animate-bounce z-10">
                            <Rocket 
                              className="w-8 h-8 text-white drop-shadow-lg" 
                              style={{ filter: 'drop-shadow(0 0 10px rgba(34, 211, 238, 0.8))' }} 
                            />
                          </div>
                        )}

                        <button
                          onClick={() => handleLevelClick(level)}
                          disabled={!unlocked || level.comingSoon}
                          className="group relative"
                        >
                          {isCurrent && (
                            <div className="absolute inset-0 bg-cyan-400 rounded-full blur-xl opacity-50 animate-pulse" />
                          )}

                          <div
                            className={`relative w-16 h-16 md:w-20 md:h-20 rounded-full border-4 flex items-center justify-center transition-all ${
                              completed
                                ? 'bg-gradient-to-br from-green-400 to-emerald-500 border-green-300 shadow-lg shadow-green-500/50'
                                : level.comingSoon
                                ? 'bg-gray-800 border-gray-600 opacity-50'
                                : unlocked
                                ? `bg-gradient-to-br ${level.color} border-white shadow-lg shadow-cyan-500/50 hover:scale-110`
                                : 'bg-gray-700 border-gray-600'
                            }`}
                          >
                            {completed ? (
                              <CheckCircle className="w-8 h-8 md:w-10 md:h-10 text-white" />
                            ) : level.comingSoon ? (
                              <span className="text-xl md:text-2xl opacity-50">🔜</span>
                            ) : unlocked ? (
                              <span className="text-2xl md:text-3xl">{level.emoji}</span>
                            ) : (
                              <Lock className="w-6 h-6 md:w-7 md:h-7 text-gray-400" />
                            )}
                          </div>
                          
                          {level.comingSoon && (
                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-yellow-500 text-black text-[8px] px-1 rounded font-bold">
                              SOON
                            </div>
                          )}
                        </button>

                        <div className="mt-2 text-center max-w-[100px]">
                          <div className={`font-medium text-xs ${unlocked && !level.comingSoon ? 'text-white' : 'text-gray-500'}`}>
                            {level.title?.substring(0, 20)}{level.title?.length > 20 ? '...' : ''}
                          </div>
                          <div className="text-[10px] text-cyan-300 mt-1">+{level.xp} XP</div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {section.lessons.length > 12 && (
                  <div className="text-center mt-4">
                    <button className="text-cyan-400 text-sm hover:underline">
                      +{section.lessons.length - 12} more lessons →
                    </button>
                  </div>
                )}

                {sectionIndex < organizedSections.length - 1 && (
                  <div className="flex justify-center my-8">
                    <div className="w-1 h-12 bg-purple-500/30 rounded-full" />
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
                <div className="text-sm text-white/90 mt-1">Master Rocket Engineer</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
    </>
  );
}
