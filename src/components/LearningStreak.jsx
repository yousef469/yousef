import { useState, useEffect } from 'react';
import { Flame, Calendar, Trophy, Zap, Gift } from 'lucide-react';

export default function LearningStreak({ compact = false }) {
  const [streakData, setStreakData] = useState({
    currentStreak: 0,
    longestStreak: 0,
    lastActivityDate: null,
    weekActivity: [false, false, false, false, false, false, false],
    totalDaysLearned: 0
  });
  const [showReward, setShowReward] = useState(false);

  useEffect(() => {
    loadStreakData();
  }, []);

  const loadStreakData = () => {
    const saved = localStorage.getItem('learning_streak');
    if (saved) {
      const data = JSON.parse(saved);
      const today = new Date().toDateString();
      const lastDate = data.lastActivityDate;
      
      // Check if streak is still valid
      if (lastDate) {
        const lastActivity = new Date(lastDate);
        const todayDate = new Date(today);
        const diffDays = Math.floor((todayDate - lastActivity) / (1000 * 60 * 60 * 24));
        
        if (diffDays > 1) {
          // Streak broken - reset current streak but keep longest
          data.currentStreak = 0;
        }
      }
      
      // Update week activity
      const weekActivity = getWeekActivity(data.activityDates || []);
      data.weekActivity = weekActivity;
      
      setStreakData(data);
    }
  };

  const getWeekActivity = (activityDates) => {
    const today = new Date();
    const weekActivity = [];
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toDateString();
      weekActivity.push(activityDates.includes(dateStr));
    }
    
    return weekActivity;
  };

  const getDayName = (index) => {
    const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    const today = new Date().getDay();
    const dayIndex = (today - 6 + index + 7) % 7;
    return days[dayIndex];
  };

  // Record activity (call this when user completes a lesson)
  const recordActivity = () => {
    const today = new Date().toDateString();
    const saved = localStorage.getItem('learning_streak');
    let data = saved ? JSON.parse(saved) : {
      currentStreak: 0,
      longestStreak: 0,
      lastActivityDate: null,
      activityDates: [],
      totalDaysLearned: 0
    };

    // Check if already recorded today
    if (data.lastActivityDate === today) {
      return data.currentStreak;
    }

    // Check if continuing streak or starting new
    if (data.lastActivityDate) {
      const lastActivity = new Date(data.lastActivityDate);
      const todayDate = new Date(today);
      const diffDays = Math.floor((todayDate - lastActivity) / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        // Continuing streak
        data.currentStreak += 1;
      } else if (diffDays > 1) {
        // Streak broken
        data.currentStreak = 1;
      }
    } else {
      data.currentStreak = 1;
    }

    // Update longest streak
    if (data.currentStreak > data.longestStreak) {
      data.longestStreak = data.currentStreak;
    }

    // Update activity dates (keep last 30 days)
    if (!data.activityDates) data.activityDates = [];
    if (!data.activityDates.includes(today)) {
      data.activityDates.push(today);
      data.totalDaysLearned = (data.totalDaysLearned || 0) + 1;
    }
    data.activityDates = data.activityDates.slice(-30);

    data.lastActivityDate = today;
    data.weekActivity = getWeekActivity(data.activityDates);

    localStorage.setItem('learning_streak', JSON.stringify(data));
    setStreakData(data);

    // Show reward for milestone streaks
    if ([3, 7, 14, 30, 50, 100].includes(data.currentStreak)) {
      setShowReward(true);
      setTimeout(() => setShowReward(false), 3000);
    }

    return data.currentStreak;
  };

  // Expose recordActivity globally
  useEffect(() => {
    window.recordLearningActivity = recordActivity;
  }, []);

  const getStreakColor = () => {
    if (streakData.currentStreak >= 30) return 'from-purple-500 to-pink-500';
    if (streakData.currentStreak >= 14) return 'from-yellow-500 to-orange-500';
    if (streakData.currentStreak >= 7) return 'from-orange-500 to-red-500';
    return 'from-orange-400 to-red-400';
  };

  const getStreakBonus = () => {
    if (streakData.currentStreak >= 30) return '3x XP';
    if (streakData.currentStreak >= 14) return '2x XP';
    if (streakData.currentStreak >= 7) return '1.5x XP';
    return null;
  };

  if (compact) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-lg">
        <Flame className={`w-5 h-5 ${streakData.currentStreak > 0 ? 'text-orange-400 animate-pulse' : 'text-gray-500'}`} />
        <span className="font-bold text-white">{streakData.currentStreak}</span>
        <span className="text-xs text-gray-400">day streak</span>
      </div>
    );
  }


  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-orange-500/30 rounded-xl p-4 md:p-6">
      {/* Streak Reward Popup */}
      {showReward && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-8 text-center animate-bounce">
            <Gift className="w-16 h-16 text-white mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-white mb-2">🔥 {streakData.currentStreak} Day Streak!</h2>
            <p className="text-white/90">Keep it up! You're on fire!</p>
            {getStreakBonus() && (
              <div className="mt-4 px-4 py-2 bg-white/20 rounded-lg">
                <span className="text-yellow-300 font-bold">{getStreakBonus()} Bonus Active!</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg bg-gradient-to-r ${getStreakColor()}`}>
            <Flame className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-white">Learning Streak</h3>
            <p className="text-xs text-gray-400">Keep learning daily!</p>
          </div>
        </div>
        {getStreakBonus() && (
          <div className="px-3 py-1 bg-yellow-500/20 border border-yellow-500/30 rounded-full">
            <span className="text-yellow-400 text-sm font-bold">{getStreakBonus()}</span>
          </div>
        )}
      </div>

      {/* Current Streak */}
      <div className="text-center mb-6">
        <div className={`text-5xl md:text-6xl font-bold bg-gradient-to-r ${getStreakColor()} bg-clip-text text-transparent`}>
          {streakData.currentStreak}
        </div>
        <p className="text-gray-400 mt-1">day streak</p>
      </div>

      {/* Week Activity */}
      <div className="mb-4">
        <p className="text-xs text-gray-500 mb-2">This Week</p>
        <div className="flex justify-between gap-1">
          {streakData.weekActivity.map((active, i) => (
            <div key={i} className="flex flex-col items-center gap-1">
              <div
                className={`w-8 h-8 md:w-10 md:h-10 rounded-lg flex items-center justify-center transition-all ${
                  active
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                    : 'bg-gray-700 text-gray-500'
                }`}
              >
                {active ? <Flame className="w-4 h-4" /> : <span className="text-xs">{getDayName(i)}</span>}
              </div>
              <span className="text-[10px] text-gray-500">{getDayName(i)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gray-800/50 rounded-lg p-3 text-center">
          <Trophy className="w-5 h-5 text-yellow-400 mx-auto mb-1" />
          <div className="text-lg font-bold text-white">{streakData.longestStreak}</div>
          <p className="text-xs text-gray-500">Longest Streak</p>
        </div>
        <div className="bg-gray-800/50 rounded-lg p-3 text-center">
          <Calendar className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
          <div className="text-lg font-bold text-white">{streakData.totalDaysLearned || 0}</div>
          <p className="text-xs text-gray-500">Total Days</p>
        </div>
      </div>

      {/* Motivation */}
      <div className="mt-4 p-3 bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-lg">
        <p className="text-sm text-center text-gray-300">
          {streakData.currentStreak === 0 && "Start your streak today! 🚀"}
          {streakData.currentStreak >= 1 && streakData.currentStreak < 7 && "Great start! Keep going! 💪"}
          {streakData.currentStreak >= 7 && streakData.currentStreak < 14 && "One week strong! Amazing! 🔥"}
          {streakData.currentStreak >= 14 && streakData.currentStreak < 30 && "Two weeks! You're unstoppable! ⚡"}
          {streakData.currentStreak >= 30 && "30+ days! You're a legend! 👑"}
        </p>
      </div>
    </div>
  );
}

// Export the record function for use in other components
export const recordLearningActivity = () => {
  if (window.recordLearningActivity) {
    return window.recordLearningActivity();
  }
  return 0;
};
