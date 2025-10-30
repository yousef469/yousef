import { Sparkles, Clock, TrendingUp } from 'lucide-react';
import { useGenerations } from '../contexts/GenerationsContext';
import { useNavigate } from 'react-router-dom';

export default function GenerationsDisplay() {
  const {
    dailyGenerationsUsed,
    maxDailyGenerations,
    generationsUsed,
    maxGenerations,
    userTier,
    isTrialActive,
    daysRemainingInTrial,
    remainingGenerations,
    loading
  } = useGenerations();
  
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg p-4 border border-purple-500/20">
        <div className="animate-pulse flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-400" />
          <span className="text-gray-400">Loading...</span>
        </div>
      </div>
    );
  }

  const getStatusColor = () => {
    if (userTier === 'free') {
      const percentage = (dailyGenerationsUsed / maxDailyGenerations) * 100;
      if (percentage >= 100) return 'text-red-400';
      if (percentage >= 66) return 'text-yellow-400';
      return 'text-green-400';
    } else {
      const percentage = (generationsUsed / maxGenerations) * 100;
      if (percentage >= 100) return 'text-red-400';
      if (percentage >= 80) return 'text-yellow-400';
      return 'text-green-400';
    }
  };

  const getProgressPercentage = () => {
    if (userTier === 'free') {
      return (dailyGenerationsUsed / maxDailyGenerations) * 100;
    }
    return (generationsUsed / maxGenerations) * 100;
  };

  return (
    <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg p-4 border border-purple-500/20">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Sparkles className={`w-5 h-5 ${getStatusColor()}`} />
          <span className="text-white font-semibold">
            {userTier === 'free' ? 'Daily Generations' : 'Monthly Generations'}
          </span>
        </div>
        <span className={`text-lg font-bold ${getStatusColor()}`}>
          {remainingGenerations} left
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-700 rounded-full h-2 mb-3">
        <div
          className={`h-2 rounded-full transition-all duration-300 ${
            getProgressPercentage() >= 100
              ? 'bg-red-500'
              : getProgressPercentage() >= 80
              ? 'bg-yellow-500'
              : 'bg-green-500'
          }`}
          style={{ width: `${Math.min(getProgressPercentage(), 100)}%` }}
        />
      </div>

      {/* Details */}
      <div className="space-y-2 text-sm">
        {userTier === 'free' ? (
          <>
            <div className="flex items-center justify-between text-gray-400">
              <span>Today's usage:</span>
              <span className="text-white">
                {dailyGenerationsUsed} / {maxDailyGenerations}
              </span>
            </div>
            
            {isTrialActive ? (
              <div className="flex items-center justify-between text-gray-400">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>Trial ends in:</span>
                </div>
                <span className="text-white font-semibold">
                  {daysRemainingInTrial} {daysRemainingInTrial === 1 ? 'day' : 'days'}
                </span>
              </div>
            ) : (
              <div className="bg-red-500/20 border border-red-500/30 rounded p-2 mt-2">
                <p className="text-red-300 text-xs">
                  ⚠️ Trial ended. Upgrade to continue generating!
                </p>
              </div>
            )}

            <button
              onClick={() => navigate('/pricing')}
              className="w-full mt-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-all"
            >
              <TrendingUp className="w-4 h-4" />
              Upgrade for More
            </button>
          </>
        ) : (
          <>
            <div className="flex items-center justify-between text-gray-400">
              <span>This month:</span>
              <span className="text-white">
                {generationsUsed} / {maxGenerations === -1 ? '∞' : maxGenerations}
              </span>
            </div>
            <div className="flex items-center gap-2 text-green-400 text-xs mt-2">
              <Sparkles className="w-4 h-4" />
              <span>{userTier.toUpperCase()} Plan Active</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
