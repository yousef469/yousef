import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Flame, X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function StreakCounter() {
  const [streakData, setStreakData] = useState({
    currentStreak: 0,
    longestStreak: 0,
    activityDates: [],
    streakStartDate: null
  });
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    loadStreakData();
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (showCalendar) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showCalendar]);

  const loadStreakData = () => {
    const saved = localStorage.getItem('learning_streak');
    if (saved) {
      const data = JSON.parse(saved);
      const today = new Date().toDateString();
      const lastDate = data.lastActivityDate;
      
      if (lastDate) {
        const lastActivity = new Date(lastDate);
        const todayDate = new Date(today);
        const diffDays = Math.floor((todayDate - lastActivity) / (1000 * 60 * 60 * 24));
        
        if (diffDays > 1) {
          data.currentStreak = 0;
        }
      }
      
      // Find streak start date
      if (data.activityDates && data.activityDates.length > 0 && data.currentStreak > 0) {
        const sortedDates = [...data.activityDates].sort((a, b) => new Date(b) - new Date(a));
        let streakStart = new Date(sortedDates[0]);
        for (let i = 1; i < data.currentStreak && i < sortedDates.length; i++) {
          streakStart = new Date(sortedDates[i]);
        }
        data.streakStartDate = streakStart.toDateString();
      }
      
      setStreakData(data);
    }
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];
    
    // Add empty slots for days before first day of month
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null);
    }
    
    // Add all days of month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i));
    }
    
    return days;
  };

  const isActivityDay = (date) => {
    if (!date) return false;
    return streakData.activityDates?.includes(date.toDateString()) || false;
  };

  const isToday = (date) => {
    if (!date) return false;
    return date.toDateString() === new Date().toDateString();
  };

  const isStreakStart = (date) => {
    if (!date || !streakData.streakStartDate) return false;
    return date.toDateString() === streakData.streakStartDate;
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                      'July', 'August', 'September', 'October', 'November', 'December'];

  return (
    <>
      {/* Compact Streak Button */}
      <button
        onClick={() => setShowCalendar(true)}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
          streakData.currentStreak > 0 
            ? 'bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 hover:border-orange-400'
            : 'bg-gray-800 border border-gray-700 hover:border-gray-600'
        }`}
      >
        <Flame className={`w-5 h-5 ${streakData.currentStreak > 0 ? 'text-orange-400' : 'text-gray-500'}`} />
        <span className={`font-bold ${streakData.currentStreak > 0 ? 'text-orange-400' : 'text-gray-400'}`}>
          {streakData.currentStreak}
        </span>
      </button>

      {/* Calendar Modal - Using Portal to render at body level */}
      {showCalendar && createPortal(
        <div 
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setShowCalendar(false)}
        >
          <div 
            className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-4 sm:p-6 max-w-md w-full border border-orange-500/30 my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg">
                  <Flame className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Learning Streak</h3>
                  <p className="text-sm text-gray-400">
                    {streakData.currentStreak} day streak • {streakData.longestStreak || 0} best
                  </p>
                </div>
              </div>
              <button onClick={() => setShowCalendar(false)} className="text-gray-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Streak Info */}
            {streakData.currentStreak > 0 && streakData.streakStartDate && (
              <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-3 mb-4">
                <p className="text-sm text-orange-300">
                  🔥 Streak started: {new Date(streakData.streakStartDate).toLocaleDateString('en-US', { 
                    weekday: 'long', month: 'long', day: 'numeric' 
                  })}
                </p>
              </div>
            )}

            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-4">
              <button onClick={prevMonth} className="p-2 hover:bg-gray-700 rounded-lg">
                <ChevronLeft className="w-5 h-5 text-gray-400" />
              </button>
              <span className="font-semibold text-white">
                {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </span>
              <button onClick={nextMonth} className="p-2 hover:bg-gray-700 rounded-lg">
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-1 mb-4">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                <div key={i} className="text-center text-xs text-gray-500 py-1 sm:py-2">{day}</div>
              ))}
              {getDaysInMonth(currentMonth).map((date, i) => (
                <div
                  key={i}
                  className={`aspect-square flex items-center justify-center rounded text-xs sm:text-sm relative ${
                    !date ? '' :
                    isActivityDay(date) 
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold'
                      : isToday(date)
                        ? 'bg-gray-700 text-white border border-cyan-500'
                        : 'text-gray-400 hover:bg-gray-700'
                  }`}
                >
                  {date?.getDate()}
                  {isStreakStart(date) && (
                    <div className="absolute -top-0.5 -right-0.5 w-2 h-2 sm:w-3 sm:h-3 bg-yellow-400 rounded-full" />
                  )}
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-4 text-xs text-gray-400">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-gradient-to-r from-orange-500 to-red-500 rounded" />
                <span>Active</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-gray-700 border border-cyan-500 rounded" />
                <span>Today</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                <span>Streak Start</span>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
