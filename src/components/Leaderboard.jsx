import { useState, useEffect } from 'react';
import { Trophy, Medal, Star, TrendingUp, Award, Zap, Loader2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../services/supabase';

export default function Leaderboard() {
  const { user } = useAuth();
  const [timeframe, setTimeframe] = useState('alltime'); // week, month, alltime
  const [category, setCategory] = useState('all'); // all, rockets, planes, cars
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUserRank, setCurrentUserRank] = useState(null);

  // Fetch real leaderboard data from Supabase
  useEffect(() => {
    fetchLeaderboard();
  }, [timeframe, category]);

  const fetchLeaderboard = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('user_profiles')
        .select('user_id, total_xp, level, completed_lessons, created_at')
        .order('total_xp', { ascending: false })
        .limit(50);

      // Apply timeframe filter
      if (timeframe === 'week') {
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        query = query.gte('updated_at', weekAgo.toISOString());
      } else if (timeframe === 'month') {
        const monthAgo = new Date();
        monthAgo.setMonth(monthAgo.getMonth() - 1);
        query = query.gte('updated_at', monthAgo.toISOString());
      }

      const { data, error } = await query;

      if (error) {
        console.error('Leaderboard fetch error:', error);
        throw error;
      }



      // Transform data to match component format
      const transformedData = data.map((profile, index) => {
        // Generate username from user_id (first 8 chars)
        const email = `User_${profile.user_id.substring(0, 8)}`;
        const username = email.split('@')[0];
        const completedLessons = profile.completed_lessons?.length || 0;
        
        // Filter by category if needed
        let categoryLessons = completedLessons;
        if (category !== 'all' && profile.completed_lessons) {
          categoryLessons = profile.completed_lessons.filter(lesson => 
            lesson.toLowerCase().includes(category)
          ).length;
        }

        return {
          rank: index + 1,
          user: {
            name: username.charAt(0).toUpperCase() + username.slice(1),
            avatar: getRandomAvatar(profile.user_id),
            id: profile.user_id,
            email: email
          },
          points: profile.total_xp || 0,
          level: profile.level || 1,
          lessonsCompleted: categoryLessons,
          questionsAsked: 0, // TODO: Add when community features are ready
          helpfulAnswers: 0, // TODO: Add when community features are ready
          streak: profile.streak || 0
        };
      });

      // Filter by category if needed
      let filteredData = transformedData;
      if (category !== 'all') {
        filteredData = transformedData.filter(entry => entry.lessonsCompleted > 0);
        // Re-rank after filtering
        filteredData = filteredData.map((entry, index) => ({
          ...entry,
          rank: index + 1
        }));
      }

      setLeaderboardData(filteredData);


      // Find current user's rank
      if (user) {
        const userEntry = filteredData.find(entry => entry.user.id === user.id);
        if (userEntry) {
          setCurrentUserRank(userEntry);
        } else {
          // User not in top 50, fetch their actual rank
          const { count } = await supabase
            .from('user_profiles')
            .select('*', { count: 'exact', head: true })
            .gt('total_xp', transformedData.find(e => e.user.id === user.id)?.points || 0);
          
          const userProfile = await supabase
            .from('user_profiles')
            .select('*')
            .eq('user_id', user.id)
            .single();

          if (userProfile.data) {
            setCurrentUserRank({
              rank: (count || 0) + 1,
              user: {
                name: user.email?.split('@')[0] || 'You',
                avatar: '👤',
                id: user.id
              },
              points: userProfile.data.total_xp || 0,
              level: userProfile.data.level || 1,
              lessonsCompleted: userProfile.data.completed_lessons?.length || 0,
              streak: userProfile.data.streak || 0
            });
          }
        }
      }
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      // Set empty array on error so we show "no users yet" message
      setLeaderboardData([]);
    } finally {
      setLoading(false);
    }
  };

  // Generate consistent avatar based on user ID
  const getRandomAvatar = (userId) => {
    const avatars = ['👨‍🚀', '👩‍🔬', '🧑‍💻', '👩‍✈️', '🧑‍🎓', '👨‍🔧', '👩‍🏫', '🧑‍🚒', '👨‍⚕️', '👩‍💼'];
    const hash = userId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return avatars[hash % avatars.length];
  };



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

  // Show loading state
  if (loading) {
    return (
      <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-xl p-6">
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-yellow-400" />
          <span className="ml-3 text-gray-400">Loading leaderboard...</span>
        </div>
      </div>
    );
  }

  // Show empty state if no data
  if (leaderboardData.length === 0) {
    return (
      <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <Trophy className="w-7 h-7 text-yellow-400" />
          <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            Leaderboard
          </h2>
        </div>
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Trophy className="w-16 h-16 text-gray-600 mb-4" />
          <h3 className="text-xl font-bold text-gray-400 mb-2">No Rankings Yet</h3>
          <p className="text-gray-500">Complete lessons to appear on the leaderboard!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800/50 backdrop-blur border border-gray-700 radius-md p-6 shadow-premium-lg">
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

      {/* Top 3 Podium - Only show if we have at least 3 users */}
      {leaderboardData.length >= 3 && (
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
      )}

      {/* Full Leaderboard List */}
      <div className="space-y-2">
        {leaderboardData.map((entry) => {
          const isCurrentUser = user && entry.user.id === user.id;
          
          return (
            <div
              key={entry.rank}
              className={`flex items-center gap-4 p-4 radius-sm transition-all card-hover ${
                isCurrentUser
                  ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-2 border-cyan-500 glow-cyan'
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

      {/* Your Rank (if not in top 50) */}
      {user && currentUserRank && !leaderboardData.find(e => e.user.id === user.id) && (
        <div className="mt-6 pt-6 border-t border-gray-700">
          <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-2 border-cyan-500 rounded-lg">
            <div className="flex items-center justify-center w-12">
              <span className="text-lg font-bold text-gray-400">#{currentUserRank.rank}</span>
            </div>
            <div className="flex items-center gap-3 flex-1">
              <div className="text-3xl">{currentUserRank.user.avatar}</div>
              <div>
                <div className="font-semibold text-white flex items-center gap-2">
                  {currentUserRank.user.name}
                  <span className="px-2 py-0.5 bg-cyan-500 text-white text-xs rounded-full">You</span>
                </div>
                <div className="text-sm text-gray-400">
                  {currentUserRank.lessonsCompleted} lessons • Level {currentUserRank.level}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-1">
                <Zap className="w-4 h-4 text-orange-400" />
                <span className="text-sm font-semibold text-orange-400">{currentUserRank.streak} day streak</span>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-yellow-400">{currentUserRank.points.toLocaleString()}</div>
                <div className="text-xs text-gray-500">points</div>
              </div>
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
