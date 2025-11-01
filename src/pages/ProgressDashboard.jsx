import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Trophy, Star, Flame, Award, Clock, Target, TrendingUp, Medal } from 'lucide-react';
import { useProgress } from '../contexts/ProgressContext';

export default function ProgressDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  
  const {
    loading,
    totalXP,
    currentRank,
    rankLevel,
    lessonsCompleted,
    quizzesCompleted,
    perfectQuizzes,
    currentStreak,
    longestStreak,
    badges,
    totalTimeSpent,
    averageQuizScore,
    totalStars,
    getNextRankProgress
  } = useProgress();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  const nextRankProgress = getNextRankProgress();
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: TrendingUp },
    { id: 'badges', name: 'Badges', icon: Medal },
    { id: 'stats', name: 'Statistics', icon: Target }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Header */}
      <div className="border-b border-gray-700 bg-gray-900/50 backdrop-blur sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </button>
            
            <h1 className="text-2xl font-bold">Progress Dashboard</h1>
            
            <div className="w-24" />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Rank & XP Header */}
        <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-2xl p-8 mb-8 border border-purple-500/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center shadow-2xl">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              <div>
                <div className="text-4xl font-bold text-white mb-1">{currentRank}</div>
                <div className="text-lg text-gray-300">Level {rankLevel}</div>
                <div className="text-sm text-gray-400">{totalXP} Total XP</div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-2xl font-bold text-purple-400 mb-2">
                {nextRankProgress.percentage.toFixed(0)}%
              </div>
              <div className="text-sm text-gray-400 mb-3">
                Progress to next rank
              </div>
              <div className="w-48 bg-gray-700 rounded-full h-3">
                <div
                  className="h-3 rounded-full bg-gradient-to-r from-purple-500 to-blue-600 transition-all duration-500"
                  style={{ width: `${nextRankProgress.percentage}%` }}
                />
              </div>
              {nextRankProgress.nextRank && (
                <div className="text-xs text-gray-400 mt-2">
                  Next: {nextRankProgress.nextRank.name} Level {nextRankProgress.nextRank.level}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.name}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <Award className="w-8 h-8 text-green-400 mb-3" />
                <div className="text-3xl font-bold text-white mb-1">{lessonsCompleted}</div>
                <div className="text-sm text-gray-400">Lessons Completed</div>
              </div>
              
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <Star className="w-8 h-8 text-yellow-400 mb-3" />
                <div className="text-3xl font-bold text-white mb-1">{totalStars}</div>
                <div className="text-sm text-gray-400">Stars Earned</div>
              </div>
              
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <Flame className="w-8 h-8 text-orange-400 mb-3" />
                <div className="text-3xl font-bold text-white mb-1">{currentStreak}</div>
                <div className="text-sm text-gray-400">Day Streak</div>
              </div>
              
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <Clock className="w-8 h-8 text-cyan-400 mb-3" />
                <div className="text-3xl font-bold text-white mb-1">{formatTime(totalTimeSpent)}</div>
                <div className="text-sm text-gray-400">Time Spent</div>
              </div>
            </div>

            {/* Recent Achievements */}
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4">Recent Achievements</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {lessonsCompleted > 0 && (
                  <div className="flex items-center gap-3 p-3 bg-green-500/20 rounded-lg border border-green-500/30">
                    <Award className="w-6 h-6 text-green-400" />
                    <div>
                      <div className="font-semibold text-white">First Lesson Complete!</div>
                      <div className="text-sm text-gray-400">Completed your first lesson</div>
                    </div>
                  </div>
                )}
                
                {totalXP > 0 && (
                  <div className="flex items-center gap-3 p-3 bg-purple-500/20 rounded-lg border border-purple-500/30">
                    <Trophy className="w-6 h-6 text-purple-400" />
                    <div>
                      <div className="font-semibold text-white">Rank Up!</div>
                      <div className="text-sm text-gray-400">Reached {currentRank} Level {rankLevel}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'badges' && (
          <div className="space-y-6">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4">Earned Badges ({badges.length})</h3>
              {badges.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {badges.map((badge, index) => (
                    <div key={index} className="bg-gradient-to-br from-yellow-500/20 to-amber-500/20 rounded-lg p-4 border border-yellow-400/30 text-center">
                      <Medal className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                      <div className="font-semibold text-white text-sm">{badge.badge_name}</div>
                      <div className="text-xs text-gray-400 mt-1">{badge.badge_description}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Medal className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <div className="text-gray-400">No badges earned yet</div>
                  <div className="text-sm text-gray-500 mt-2">Complete lessons and quizzes to earn badges!</div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Learning Stats */}
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-4">Learning Statistics</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Lessons Completed</span>
                    <span className="text-white font-semibold">{lessonsCompleted}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Quizzes Completed</span>
                    <span className="text-white font-semibold">{quizzesCompleted}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Perfect Quizzes</span>
                    <span className="text-white font-semibold">{perfectQuizzes}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Average Quiz Score</span>
                    <span className="text-white font-semibold">{averageQuizScore.toFixed(1)}%</span>
                  </div>
                </div>
              </div>

              {/* Streak Stats */}
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-4">Streak Statistics</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Current Streak</span>
                    <div className="flex items-center gap-2">
                      <Flame className="w-5 h-5 text-orange-400" />
                      <span className="text-white font-semibold">{currentStreak} days</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Longest Streak</span>
                    <div className="flex items-center gap-2">
                      <Flame className="w-5 h-5 text-red-400" />
                      <span className="text-white font-semibold">{longestStreak} days</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Total Time Spent</span>
                    <span className="text-white font-semibold">{formatTime(totalTimeSpent)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
