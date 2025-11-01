import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { supabase } from '../services/supabase';

const ProgressContext = createContext();

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within ProgressProvider');
  }
  return context;
}

// Rank thresholds
const RANKS = [
  { level: 1, name: 'Student', minXP: 0 },
  { level: 2, name: 'Student', minXP: 100 },
  { level: 3, name: 'Student', minXP: 200 },
  { level: 4, name: 'Student', minXP: 300 },
  { level: 5, name: 'Student', minXP: 400 },
  { level: 6, name: 'Apprentice', minXP: 500 },
  { level: 7, name: 'Apprentice', minXP: 600 },
  { level: 8, name: 'Apprentice', minXP: 700 },
  { level: 9, name: 'Apprentice', minXP: 800 },
  { level: 10, name: 'Apprentice', minXP: 900 },
  { level: 11, name: 'Engineer', minXP: 1000 },
  { level: 12, name: 'Engineer', minXP: 1100 },
  { level: 13, name: 'Engineer', minXP: 1200 },
  { level: 14, name: 'Engineer', minXP: 1300 },
  { level: 15, name: 'Engineer', minXP: 1400 },
  { level: 16, name: 'Designer', minXP: 1500 },
  { level: 17, name: 'Designer', minXP: 1600 },
  { level: 18, name: 'Designer', minXP: 1700 },
  { level: 19, name: 'Designer', minXP: 1800 },
  { level: 20, name: 'Designer', minXP: 1900 },
  { level: 21, name: 'Expert', minXP: 2000 },
  { level: 22, name: 'Expert', minXP: 2100 },
  { level: 23, name: 'Expert', minXP: 2200 },
  { level: 24, name: 'Expert', minXP: 2300 },
  { level: 25, name: 'Expert', minXP: 2400 },
  { level: 26, name: 'Master', minXP: 2500 },
  { level: 27, name: 'Master', minXP: 2600 },
  { level: 28, name: 'Master', minXP: 2700 },
  { level: 29, name: 'Master', minXP: 2800 },
  { level: 30, name: 'Master', minXP: 2900 },
  { level: 31, name: 'Legend', minXP: 3000 }
];

function calculateRank(xp) {
  for (let i = RANKS.length - 1; i >= 0; i--) {
    if (xp >= RANKS[i].minXP) {
      return RANKS[i];
    }
  }
  return RANKS[0];
}

export function ProgressProvider({ children }) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  
  // XP and Ranking
  const [totalXP, setTotalXP] = useState(0);
  const [currentRank, setCurrentRank] = useState('Student');
  const [rankLevel, setRankLevel] = useState(1);
  
  // Progress Stats
  const [lessonsCompleted, setLessonsCompleted] = useState(0);
  const [quizzesCompleted, setQuizzesCompleted] = useState(0);
  const [perfectQuizzes, setPerfectQuizzes] = useState(0);
  const [unitsCompleted, setUnitsCompleted] = useState(0);
  const [levelsCompleted, setLevelsCompleted] = useState(0);
  
  // Streaks
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  
  // Badges
  const [badges, setBadges] = useState([]);
  
  // Stats
  const [totalTimeSpent, setTotalTimeSpent] = useState(0);
  const [averageQuizScore, setAverageQuizScore] = useState(0);
  const [totalStars, setTotalStars] = useState(0);
  const [coins, setCoins] = useState(0);

  useEffect(() => {
    if (user) {
      loadUserProgress();
    }
  }, [user]);

  async function loadUserProgress() {
    try {
      setLoading(true);
      
      // Load XP data
      const { data: xpData, error: xpError } = await supabase
        .from('user_xp')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (xpError && xpError.code !== 'PGRST116') {
        console.error('Error loading XP:', xpError);
      }

      if (xpData) {
        setTotalXP(xpData.total_xp);
        setCurrentRank(xpData.current_rank);
        setRankLevel(xpData.rank_level);
        setLessonsCompleted(xpData.lessons_completed);
        setQuizzesCompleted(xpData.quizzes_completed);
        setPerfectQuizzes(xpData.perfect_quizzes);
        setUnitsCompleted(xpData.units_completed);
        setLevelsCompleted(xpData.levels_completed);
      } else {
        // Initialize XP record
        await initializeProgress();
      }

      // Load streak data
      const { data: streakData } = await supabase
        .from('user_streaks')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (streakData) {
        setCurrentStreak(streakData.current_streak);
        setLongestStreak(streakData.longest_streak);
      }

      // Load badges
      const { data: badgesData } = await supabase
        .from('user_badges')
        .select('*')
        .eq('user_id', user.id);

      if (badgesData) {
        setBadges(badgesData);
      }

      // Load stats
      const { data: statsData } = await supabase
        .from('user_stats')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (statsData) {
        setTotalTimeSpent(statsData.total_time_spent);
        setAverageQuizScore(statsData.average_quiz_score);
        setTotalStars(statsData.total_stars);
        setCoins(statsData.coins);
      }

    } catch (error) {
      console.error('Error loading progress:', error);
    } finally {
      setLoading(false);
    }
  }

  async function initializeProgress() {
    try {
      const { error } = await supabase
        .from('user_xp')
        .insert({
          user_id: user.id,
          total_xp: 0,
          current_rank: 'Student',
          rank_level: 1
        });

      if (error) throw error;
    } catch (error) {
      console.error('Error initializing progress:', error);
    }
  }

  async function awardXP(amount, reason) {
    try {
      const newTotal = totalXP + amount;
      const newRank = calculateRank(newTotal);

      const { error } = await supabase
        .from('user_xp')
        .update({
          total_xp: newTotal,
          current_rank: newRank.name,
          rank_level: newRank.level,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id);

      if (error) throw error;

      setTotalXP(newTotal);
      setCurrentRank(newRank.name);
      setRankLevel(newRank.level);

      return { newTotal, newRank };
    } catch (error) {
      console.error('Error awarding XP:', error);
      return null;
    }
  }

  async function completeLesson(lessonId, stars, timeSpent) {
    try {
      // Update progress
      const { error: progressError } = await supabase
        .from('user_progress')
        .upsert({
          user_id: user.id,
          lesson_id: lessonId,
          completed: true,
          stars: stars,
          time_spent: timeSpent,
          completed_at: new Date().toISOString()
        });

      if (progressError) throw progressError;

      // Update XP
      const { error: xpError } = await supabase
        .from('user_xp')
        .update({
          lessons_completed: lessonsCompleted + 1,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id);

      if (xpError) throw xpError;

      setLessonsCompleted(lessonsCompleted + 1);

      // Award XP
      await awardXP(10, 'Lesson completed');

      // Update streak
      await updateStreak();

    } catch (error) {
      console.error('Error completing lesson:', error);
    }
  }

  async function completeQuiz(lessonId, quizNumber, score, totalQuestions, timeSpent, answers) {
    try {
      const percentage = (score / totalQuestions) * 100;
      const isPerfect = percentage === 100;

      // Save quiz result
      const { error: quizError } = await supabase
        .from('quiz_results')
        .insert({
          user_id: user.id,
          lesson_id: lessonId,
          quiz_number: quizNumber,
          score: score,
          total_questions: totalQuestions,
          percentage: percentage,
          time_taken: timeSpent,
          answers: answers
        });

      if (quizError) throw quizError;

      // Update XP
      const { error: xpError } = await supabase
        .from('user_xp')
        .update({
          quizzes_completed: quizzesCompleted + 1,
          perfect_quizzes: isPerfect ? perfectQuizzes + 1 : perfectQuizzes,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id);

      if (xpError) throw xpError;

      setQuizzesCompleted(quizzesCompleted + 1);
      if (isPerfect) setPerfectQuizzes(perfectQuizzes + 1);

      // Award XP
      const xpAmount = isPerfect ? 15 : 10;
      await awardXP(xpAmount, isPerfect ? 'Perfect quiz!' : 'Quiz completed');

      return { percentage, isPerfect };
    } catch (error) {
      console.error('Error completing quiz:', error);
      return null;
    }
  }

  async function updateStreak() {
    try {
      // Call Supabase function
      const { error } = await supabase.rpc('update_streak', {
        p_user_id: user.id
      });

      if (error) throw error;

      // Reload streak data
      const { data: streakData } = await supabase
        .from('user_streaks')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (streakData) {
        setCurrentStreak(streakData.current_streak);
        setLongestStreak(streakData.longest_streak);
      }
    } catch (error) {
      console.error('Error updating streak:', error);
    }
  }

  async function awardBadge(badgeType, badgeName, badgeDescription) {
    try {
      const { error } = await supabase
        .from('user_badges')
        .insert({
          user_id: user.id,
          badge_type: badgeType,
          badge_name: badgeName,
          badge_description: badgeDescription
        });

      if (error && error.code !== '23505') throw error; // Ignore duplicate errors

      // Reload badges
      const { data: badgesData } = await supabase
        .from('user_badges')
        .select('*')
        .eq('user_id', user.id);

      if (badgesData) {
        setBadges(badgesData);
      }
    } catch (error) {
      console.error('Error awarding badge:', error);
    }
  }

  function getNextRankProgress() {
    const currentRankData = calculateRank(totalXP);
    const nextRankIndex = RANKS.findIndex(r => r.level === currentRankData.level) + 1;
    
    if (nextRankIndex >= RANKS.length) {
      return { current: totalXP, needed: totalXP, percentage: 100 };
    }
    
    const nextRank = RANKS[nextRankIndex];
    const xpInCurrentRank = totalXP - currentRankData.minXP;
    const xpNeededForNext = nextRank.minXP - currentRankData.minXP;
    const percentage = (xpInCurrentRank / xpNeededForNext) * 100;
    
    return {
      current: xpInCurrentRank,
      needed: xpNeededForNext,
      percentage: Math.min(percentage, 100),
      nextRank: nextRank
    };
  }

  const value = {
    loading,
    totalXP,
    currentRank,
    rankLevel,
    lessonsCompleted,
    quizzesCompleted,
    perfectQuizzes,
    unitsCompleted,
    levelsCompleted,
    currentStreak,
    longestStreak,
    badges,
    totalTimeSpent,
    averageQuizScore,
    totalStars,
    coins,
    awardXP,
    completeLesson,
    completeQuiz,
    updateStreak,
    awardBadge,
    getNextRankProgress,
    loadUserProgress
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
}
