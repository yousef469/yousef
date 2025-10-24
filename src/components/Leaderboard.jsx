import { useState, useEffect } from 'react';
import { Trophy, Medal, Star, TrendingUp, Award, Zap } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Leaderboard() {
  const { user } = useAuth();
  const [timeframe, setTimeframe] = useState('week'); // week, month, alltime
  const [category, setCategory] = useState('all'); // all, rockets, planes, cars

  // Mock leaderboard data - replace with Supabase queries
  const leaderboardData = [
    {
      rank: 1,
      user: { name: 'Alex Chen', avatar: '👨‍🚀', id: '1' },
      points: 12450,
      lessonsCompleted: 45,
      questionsAsked: 23,
      helpfulAnswers: 67,
      streak: 15
    },
    {
      rank: 2,
      user: { name: 'Sarah Johnson', avatar: '👩‍🔬', id: '2' },
      points: 11230,
      lessonsCompleted: 42,
      questionsAsked: 31,
      helpfulAnswers: 54,
      streak: 12
    },
    {
      rank: 3,
      user: { name: 'Mike Rodriguez', avatar: '🧑‍💻', id: '3' },
      points: 10890,
      lessonsCompleted: 38,
      questionsAsked: 19,
      helpfulAnswers: 71,
      streak: 21
    },
    {
      rank: 4,
      user: { name: 'Emma Wilson', avatar: '👩‍✈️', id: '4' },
      points: 9560,
      lessonsCompleted: 35,
      questionsAsked: 28,
      helpfulAnswers: 45,
      streak: 8
    },
    {
      rank: 5,
      user: { name: 'David Kim', avatar: '🧑‍🎓', id: '5' },
      points: 8920,
      lessonsCompleted: 33,
      questionsAsked: 25,
      helpfulAnswers: 38,
      streak: 10
    }
  ];

  const getRankIcon = (rank) => {
    if (rank === 1) return <Trophy className="w-6 h-6 text-yellow-400" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-400" />;
    if (rank === 3) return <Medal className="w-6 h-6 text-amber-600" />;
    return <Star className="w-5 h-5 text-gray-500" />;
  };

  const getRankBadge = (rank) => {
    if (rank === 1) return 'bg-gradient-to-r from-yellow-500 to-orange-500';
    if (rank === 2) return 'bg-gradient-to-r from-gray-400 to-gray-500';
    if (rank === 3) return 'bg-gradient-to-r from-amber-600 to-amber-700';
    return 'bg-gray-700';
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-xl p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Trophy className="w-7 h-7 text-yellow-400" />
          <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            Leaderboard
          </h2>
        </div>

        <div className="flex gap-2">
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="px-3 py-1 bg-gray-700 border border-gray-600 rounded-lg text-sm focus:outline-none focus:border-yellow-500"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="alltime">All Time</option>
          </select>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-3 py-1 bg-gray-700 border border-gray-600 rounded-lg text-sm focus:outline-none focus:border-yellow-500"
          >
            <option value="all">All Categories</option>
            <option value="rockets">🚀 Rockets</option>
            <option value="planes">✈️ Planes</option>
            <option value="cars">🚗 Cars</option>
          </select>
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {leaderboardData.slice(0, 3).map((entry, idx) => {
          const order = idx === 0 ? 1 : idx === 1 ? 0 : 2; // 2nd, 1st, 3rd
          const heights = ['h-32', 'h-40', 'h-28'];
          const actualEntry = idx === 0 ? leaderboardData[1] : idx === 1 ? leaderboardData[0] : leaderboardData[2];
          
          return (
            <div key={actualEntry.rank} className={`flex flex-col items-center ${order === 1 ? 'order-2' : order === 0 ? 'order-1' : 'order-3'}`}>
              <div className="text-4xl mb-2">{actualEntry.user.avatar}</div>
              <div className="text-center mb-2">
                <div className="font-bold text-white">{actualEntry.user.name}</div>
                <div className="text-sm text-gray-400">{actualEntry.points.toLocaleString()} pts</div>
              </div>
              <div className={`${getRankBadge(actualEntry.rank)} ${heights[order]} w-full rounded-t-lg flex flex-col items-center justify-center border-t-4 ${actualEntry.rank === 1 ? 'border-yellow-400' : actualEntry.rank === 2 ? 'border-gray-400' : 'border-amber-600'}`}>
                {getRankIcon(actualEntry.rank)}
                <div className="text-2xl font-bold text-white mt-2">#{actualEntry.rank}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Full Leaderboard List */}
      <div className="space-y-2">
        {leaderboardData.map((entry) => {
          const isCurrentUser = user && entry.user.id === user.id;
          
          return (
            <div
              key={entry.rank}
              className={`flex items-center gap-4 p-4 rounded-lg transition-all ${
                isCurrentUser
                  ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-2 border-cyan-500'
                  : 'bg-gray-900/50 border border-gray-700 hover:bg-gray-800/50'
              }`}
            >
              {/* Rank */}
              <div className="flex items-center justify-center w-12">
                {entry.rank <= 3 ? (
                  getRankIcon(entry.rank)
                ) : (
                  <span className="text-lg font-bold text-gray-500">#{entry.rank}</span>
                )}
              </div>

              {/* User Info */}
              <div className="flex items-center gap-3 flex-1">
                <div className="text-3xl">{entry.user.avatar}</div>
                <div>
                  <div className="font-semibold text-white flex items-center gap-2">
                    {entry.user.name}
                    {isCurrentUser && (
                      <span className="px-2 py-0.5 bg-cyan-500 text-white text-xs rounded-full">You</span>
                    )}
                  </div>
                  <div className="text-sm text-gray-400">
                    {entry.lessonsCompleted} lessons • {entry.helpfulAnswers} helpful answers
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-6">
                {/* Streak */}
                <div className="flex items-center gap-1">
                  <Zap className="w-4 h-4 text-orange-400" />
                  <span className="text-sm font-semibold text-orange-400">{entry.streak} day streak</span>
                </div>

                {/* Points */}
                <div className="text-right">
                  <div className="text-2xl font-bold text-yellow-400">
                    {entry.points.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500">points</div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Your Rank (if not in top 5) */}
      {user && !leaderboardData.find(e => e.user.id === user.id) && (
        <div className="mt-6 pt-6 border-t border-gray-700">
          <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-2 border-cyan-500 rounded-lg">
            <div className="flex items-center justify-center w-12">
              <span className="text-lg font-bold text-gray-400">#47</span>
            </div>
            <div className="flex items-center gap-3 flex-1">
              <div className="text-3xl">👤</div>
              <div>
                <div className="font-semibold text-white flex items-center gap-2">
                  {user.email?.split('@')[0]}
                  <span className="px-2 py-0.5 bg-cyan-500 text-white text-xs rounded-full">You</span>
                </div>
                <div className="text-sm text-gray-400">Keep learning to climb the ranks!</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-yellow-400">1,250</div>
              <div className="text-xs text-gray-500">points</div>
            </div>
          </div>
        </div>
      )}

      {/* Points Info */}
      <div className="mt-6 p-4 bg-gray-900/50 rounded-lg border border-gray-700">
        <h4 className="text-sm font-semibold text-gray-400 mb-3">How to earn points:</h4>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-green-400" />
            <span className="text-gray-300">Complete lesson: <span className="text-green-400 font-semibold">+100</span></span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-blue-400" />
            <span className="text-gray-300">Ask question: <span className="text-blue-400 font-semibold">+10</span></span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-purple-400" />
            <span className="text-gray-300">Helpful answer: <span className="text-purple-400 font-semibold">+50</span></span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-orange-400" />
            <span className="text-gray-300">Daily streak: <span className="text-orange-400 font-semibold">+25</span></span>
          </div>
        </div>
      </div>
    </div>
  );
}
