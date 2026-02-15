import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { getUserProfile, addXP, getCompletedLessons, isLessonUnlocked as checkLessonUnlocked, awardXP, awardProjectXP, awardCommunityQuestionXP, awardCommunityAnswerXP, awardDailyStreakXP } from '../services/supabase';

const ProgressContext = createContext();

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within ProgressProvider');
  }
  return context;
}

export function ProgressProvider({ children }) {
  const { user } = useAuth();
  const [progress, setProgress] = useState({
    completedLessons: {},
    quizScores: {},
    lastAccessed: {},
    totalTimeSpent: 0,
    achievements: []
  });
  
  const [userProfile, setUserProfile] = useState({
    total_xp: 0,
    level: 1,
    completed_lessons: []
  });
  
  const [newAchievement, setNewAchievement] = useState(null);

  // Load progress from localStorage AND Supabase on mount
  useEffect(() => {
    // Load from localStorage first (instant)
    const savedProgress = localStorage.getItem('engineerium_progress');
    if (savedProgress) {
      try {
        setProgress(JSON.parse(savedProgress));
      } catch (error) {
        // Error loading progress
      }
    }

    // Then load from Supabase if user is logged in
    if (user) {
      loadUserProfile();
    }
  }, [user]);

  // Load user profile from Supabase
  const loadUserProfile = async () => {
    if (!user) return;
    
    const { data, error } = await getUserProfile(user.id);
    if (data && !error) {
      setUserProfile(data);
    }
  };

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('engineerium_progress', JSON.stringify(progress));
  }, [progress]);

  // Mark lesson as completed with XP reward
  const completeLesson = async (subject, lessonId, quizScore = null) => {
    const key = `${subject}-${lessonId}`;
    
    // Calculate XP based on quiz score
    let xpEarned = 100; // Base XP for completing lesson
    if (quizScore !== null) {
      const percentage = (quizScore.score / quizScore.totalQuestions) * 100;
      if (percentage === 100) xpEarned += 50; // Bonus for perfect score
      else if (percentage >= 80) xpEarned += 30; // Bonus for good score
      else if (percentage >= 60) xpEarned += 10; // Small bonus
    }
    
    // Track if user leveled up and Supabase result
    let leveledUp = false;
    let supabaseResult = null;
    
    // Update Supabase if user is logged in
    if (user) {
      supabaseResult = await addXP(user.id, xpEarned, lessonId, subject);
      
      if (supabaseResult.data) {
        setUserProfile(supabaseResult.data);
        leveledUp = supabaseResult.leveledUp || false;
        
        // Show level up notification
        if (leveledUp) {
          setNewAchievement({
            id: 'level_up',
            title: `Level ${supabaseResult.data.level} Reached!`,
            description: `You've earned ${xpEarned} XP and leveled up!`,
            icon: '⭐'
          });
        }
      }
    }
    
    // Record learning activity for streak
    if (typeof window !== 'undefined' && window.recordLearningActivity) {
      window.recordLearningActivity();
    }
    
    // ALWAYS update localStorage progress (this is the fallback)
    setProgress(prev => {
      const newProgress = {
        ...prev,
        completedLessons: {
          ...prev.completedLessons,
          [key]: {
            completedAt: new Date().toISOString(),
            subject,
            lessonId,
            xpEarned
          }
        },
        lastAccessed: {
          ...prev.lastAccessed,
          [subject]: lessonId
        }
      };

      // Add quiz score if provided
      if (quizScore !== null) {
        newProgress.quizScores = {
          ...prev.quizScores,
          [key]: quizScore
        };
      }

      // Check for achievements
      const oldAchievements = prev.achievements || [];
      newProgress.achievements = checkAchievements(newProgress);
      
      // Check if new achievement was unlocked
      const newAchievements = newProgress.achievements.filter(
        a => !oldAchievements.includes(a)
      );
      if (newAchievements.length > 0 && !leveledUp) {
        setNewAchievement(getAchievementInfo(newAchievements[0]));
      }

      return newProgress;
    });
    
    // Force a re-render by updating userProfile with localStorage data if Supabase failed
    if (!user || !supabaseResult?.data) {
      setUserProfile(prev => ({
        ...prev,
        completed_lessons: [...(prev.completed_lessons || []), key].filter((v, i, a) => a.indexOf(v) === i)
      }));
    }
    
    return { xpEarned };
  };

  // Save quiz score
  const saveQuizScore = (subject, lessonId, score, totalQuestions) => {
    setProgress(prev => ({
      ...prev,
      quizScores: {
        ...prev.quizScores,
        [`${subject}-${lessonId}`]: {
          score,
          totalQuestions,
          percentage: (score / totalQuestions) * 100,
          completedAt: new Date().toISOString()
        }
      }
    }));
  };

  // Check if lesson is completed
  const isLessonCompleted = (subject, lessonId) => {
    const key = `${subject}-${lessonId}`;
    // Check both localStorage and Supabase profile
    const inLocalStorage = !!progress.completedLessons[key];
    const inSupabase = userProfile.completed_lessons?.includes(key) || false;
    return inLocalStorage || inSupabase;
  };

  // Get quiz score for a lesson
  const getQuizScore = (subject, lessonId) => {
    return progress.quizScores[`${subject}-${lessonId}`] || null;
  };

  // Get progress for a subject
  const getSubjectProgress = (subject, totalLessons) => {
    const completed = Object.keys(progress.completedLessons).filter(
      key => key.startsWith(`${subject}-`)
    ).length;
    return {
      completed,
      total: totalLessons,
      percentage: totalLessons > 0 ? (completed / totalLessons) * 100 : 0
    };
  };

  // Get last accessed lesson for subject
  const getLastLesson = (subject) => {
    return progress.lastAccessed[subject] || 0;
  };

  // Reset progress (for testing or user request)
  const resetProgress = () => {
    if (window.confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      setProgress({
        completedLessons: {},
        quizScores: {},
        lastAccessed: {},
        totalTimeSpent: 0,
        achievements: []
      });
      localStorage.removeItem('engineerium_progress');
    }
  };

  // Check for achievements
  const checkAchievements = (currentProgress) => {
    const achievements = [...(currentProgress.achievements || [])];
    const completedCount = Object.keys(currentProgress.completedLessons).length;

    // First lesson achievement
    if (completedCount === 1 && !achievements.includes('first_lesson')) {
      achievements.push('first_lesson');
    }

    // Complete 10 lessons
    if (completedCount >= 10 && !achievements.includes('ten_lessons')) {
      achievements.push('ten_lessons');
    }

    // Complete 25 lessons
    if (completedCount >= 25 && !achievements.includes('quarter_century')) {
      achievements.push('quarter_century');
    }

    // Complete 50 lessons
    if (completedCount >= 50 && !achievements.includes('half_century')) {
      achievements.push('half_century');
    }

    // Complete all rockets lessons (28)
    const rocketLessons = Object.keys(currentProgress.completedLessons).filter(
      key => key.startsWith('rockets-')
    ).length;
    if (rocketLessons >= 28 && !achievements.includes('rocket_master')) {
      achievements.push('rocket_master');
    }

    // Complete all car lessons (20)
    const carLessons = Object.keys(currentProgress.completedLessons).filter(
      key => key.startsWith('cars-')
    ).length;
    if (carLessons >= 20 && !achievements.includes('car_master')) {
      achievements.push('car_master');
    }

    // Complete all plane lessons (20)
    const planeLessons = Object.keys(currentProgress.completedLessons).filter(
      key => key.startsWith('planes-')
    ).length;
    if (planeLessons >= 20 && !achievements.includes('plane_master')) {
      achievements.push('plane_master');
    }

    // Complete all electronics lessons (20)
    const electronicsLessons = Object.keys(currentProgress.completedLessons).filter(
      key => key.startsWith('electronics-')
    ).length;
    if (electronicsLessons >= 20 && !achievements.includes('electronics_master')) {
      achievements.push('electronics_master');
    }

    // Perfect quiz scores
    const perfectQuizzes = Object.values(currentProgress.quizScores).filter(
      score => score.percentage === 100
    ).length;
    if (perfectQuizzes >= 10 && !achievements.includes('quiz_master')) {
      achievements.push('quiz_master');
    }

    return achievements;
  };

  // Get achievement info
  const getAchievementInfo = (achievementId) => {
    const achievements = {
      first_lesson: { title: '🎓 First Steps', description: 'Complete your first lesson' },
      ten_lessons: { title: '🔟 Getting Started', description: 'Complete 10 lessons' },
      quarter_century: { title: '🎯 Quarter Century', description: 'Complete 25 lessons' },
      half_century: { title: '🏆 Half Century', description: 'Complete 50 lessons' },
      rocket_master: { title: '🚀 Rocket Master', description: 'Complete all rocket lessons' },
      car_master: { title: '🚗 Automotive Master', description: 'Complete all car lessons' },
      plane_master: { title: '✈️ Aviation Master', description: 'Complete all plane lessons' },
      electronics_master: { title: '⚡ Electronics Master', description: 'Complete all electronics lessons' },
      quiz_master: { title: '🧠 Quiz Master', description: 'Get perfect scores on 10 quizzes' }
    };
    return achievements[achievementId] || { title: 'Achievement', description: '' };
  };

  // Check if lesson is unlocked (sequential progression)
  const isLessonUnlocked = async (subject, lessonId) => {
    // Convert to number to ensure proper comparison
    const lessonNum = parseInt(lessonId);
    
    // First lesson is ALWAYS unlocked, no matter what
    if (lessonNum === 1) return true;
    
    try {
      const previousLessonKey = `${subject}-${lessonNum - 1}`;
      
      // Check if user is logged in
      if (user) {
        const { unlocked } = await checkLessonUnlocked(user.id, subject, lessonNum);
        // ALSO check localStorage as fallback
        const unlockedInLocalStorage = !!progress.completedLessons[previousLessonKey];
        return unlocked || unlockedInLocalStorage;
      }
      
      // Fallback to localStorage check
      return !!progress.completedLessons[previousLessonKey];
    } catch (error) {
      // On error, check localStorage
      const previousLessonKey = `${subject}-${lessonNum - 1}`;
      return !!progress.completedLessons[previousLessonKey] || lessonNum === 1;
    }
  };

  // Wrapper for awarding XP with profile update
  const awardUserXP = async (xpAmount, activityType, activityId) => {
    if (!user) return;
    const result = await awardXP(user.id, xpAmount, activityType, activityId);
    if (result.data) {
      setUserProfile(result.data);
      if (result.leveledUp) {
        setNewAchievement({
          id: 'level_up',
          title: `Level ${result.newLevel} Reached!`,
          description: `You've earned ${result.xpAwarded} XP and leveled up!`,
          icon: '⭐'
        });
      }
    }
    return result;
  };

  const value = {
    progress,
    userProfile,
    completeLesson,
    saveQuizScore,
    isLessonCompleted,
    isLessonUnlocked,
    getQuizScore,
    getSubjectProgress,
    getLastLesson,
    resetProgress,
    getAchievementInfo,
    newAchievement,
    clearNewAchievement: () => setNewAchievement(null),
    // XP award functions
    awardXP: awardUserXP,
    awardProjectXP: (projectId) => awardProjectXP(user?.id, projectId),
    awardCommunityQuestionXP: (questionId) => awardCommunityQuestionXP(user?.id, questionId),
    awardCommunityAnswerXP: (answerId) => awardCommunityAnswerXP(user?.id, answerId),
    awardDailyStreakXP: () => awardDailyStreakXP(user?.id)
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
}
