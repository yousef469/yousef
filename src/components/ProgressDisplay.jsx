import { Trophy, Star, Flame, Award, TrendingUp } from 'lucide-react';
import { useProgress } from '../contexts/ProgressContext';

export default function ProgressDisplay() {
  const {
    loading,
    totalXP,
    currentRank,
    rankLevel,
    lessonsCompleted,
    currentStreak,
    totalStars,
    getNextRankProgress
  } = useProgress();

  if (loading) {
    return (
      <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl p-6 border border-purple-500/20 animate-pulse">
        <div className="h-24" />
      </div>
    );
  }

  const nextRankProgress = getNextRankProgress();

  return (
    <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl p-6 border border-purple-500/20">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center">
            <Trophy className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="text-2xl font-bold text-white">{currentRank}</div>
            <div className="text-sm text-gray-400">Level {rankLevel}</div>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-3xl font-bold text-purple-400">{totalXP}</div>
          <div className="text-xs text-gray-400">Total XP</div>
        </div>
      </div>

      {/* XP Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
          <span>Progress to next rank</span>
          <span>{nextRankProgress.current} / {nextRankProgress.needed} XP</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-3">
          <div
            className="h-3 rounded-full bg-gradient-to-r from-purple-500 to-blue-600 transition-all duration-500"
            style={{ width: `${nextRankProgress.percentage}%` }}
          />
        </div>
        {nextRankProgress.nextRank && (
          <div className="text-xs text-gray-400 mt-1">
            Next: {nextRankProgress.nextRank.name} Level {nextRankProgress.nextRank.level}
          </div>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-3">
        <div className="bg-white/5 rounded-lg p-3 text-center">
          <Award className="w-5 h-5 text-green-400 mx-auto mb-1" />
          <div className="text-xl font-bold text-white">{lessonsCompleted}</div>
          <div className="text-xs text-gray-400">Lessons</div>
        </div>
        
        <div className="bg-white/5 rounded-lg p-3 text-center">
          <Star className="w-5 h-5 text-yellow-400 mx-auto mb-1" />
          <div className="text-xl font-bold text-white">{totalStars}</div>
          <div className="text-xs text-gray-400">Stars</div>
        </div>
        
        <div className="bg-white/5 rounded-lg p-3 text-center">
          <Flame className="w-5 h-5 text-orange-400 mx-auto mb-1" />
          <div className="text-xl font-bold text-white">{currentStreak}</div>
          <div className="text-xs text-gray-400">Day Streak</div>
        </div>
        
        <div className="bg-white/5 rounded-lg p-3 text-center">
          <TrendingUp className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
          <div className="text-xl font-bold text-white">{rankLevel}</div>
          <div className="text-xs text-gray-400">Rank</div>
        </div>
      </div>
    </div>
  );
}
