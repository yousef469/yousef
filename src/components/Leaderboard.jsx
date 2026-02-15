import { useState, useEffect } from 'react';
import { Trophy, Medal, Star, TrendingUp, Award, Zap, Loader2, Users, ChevronRight, Crown, ArrowUp } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../services/supabase';

export default function Leaderboard() {
  const { user } = useAuth();
  const [timeframe, setTimeframe] = useState('week'); // Leagues usually reset weekly
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUserRank, setCurrentUserRank] = useState(null);

  // League Config
  const currentLeague = "Silver League";
  const promotionZoneSize = 10;
  const demotionZoneSize = 5;

  useEffect(() => {
    fetchLeaderboard();
  }, [timeframe]);

  const fetchLeaderboard = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('user_profiles')
        .select(`
          user_id, 
          total_xp, 
          level, 
          streak, 
          updated_at,
          profiles:user_id (
            full_name,
            avatar_url
          )
        `)
        .order('total_xp', { ascending: false })
        .limit(30);

      const { data, error } = await query;
      if (error) throw error;

      const transformedData = data.map((profile, index) => {
        return {
          rank: index + 1,
          user: {
            name: profile.profiles?.full_name || `User_${profile.user_id.substring(0, 5)}`,
            avatar: profile.profiles?.avatar_url || getRandomAvatar(profile.user_id),
            id: profile.user_id,
          },
          xp: profile.total_xp || 0,
          level: profile.level || 1,
          streak: profile.streak || 0,
          isPro: index % 4 === 0 // Mocking pro status for variety
        };
      });

      setLeaderboardData(transformedData);

      if (user) {
        const userEntry = transformedData.find(entry => entry.user.id === user.id);
        setCurrentUserRank(userEntry);
      }
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      setLeaderboardData([]);
    } finally {
      setLoading(false);
    }
  };

  const getRandomAvatar = (userId) => {
    const avatars = ['👨‍🚀', '👩‍🔬', '🧑‍💻', '👩‍✈️', '🧑‍🎓', '👨‍🔧', '👩‍🏫', '🧑‍🚒', '👨‍⚕️', '👩‍💼'];
    const hash = userId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return avatars[hash % avatars.length];
  };

  if (loading) {
    return (
      <div className="bg-gray-800/40 backdrop-blur-xl border border-white/10 rounded-3xl p-12 flex flex-col items-center justify-center min-h-[400px]">
        <Loader2 className="w-10 h-10 animate-spin text-cyan-400 mb-4" />
        <p className="text-gray-400 font-medium">Synchronizing with league...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800/40 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* League Header */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-800 p-8 text-white relative">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <Trophy className="w-32 h-32" />
        </div>

        <div className="relative z-10 flex items-center justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="bg-white/20 p-1.5 rounded-lg">
                <Medal className="w-5 h-5 text-gray-300" />
              </div>
              <span className="text-xs font-black uppercase tracking-[0.2em] text-blue-200">Current Tier</span>
            </div>
            <h3 className="text-3xl font-black italic uppercase tracking-wider">{currentLeague}</h3>
          </div>

          <div className="text-right">
            <div className="text-xs font-bold text-blue-200 mb-1">RESET IN</div>
            <div className="bg-black/20 backdrop-blur-md px-4 py-2 rounded-xl font-mono font-bold text-lg border border-white/10">
              3d 14h 22m
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm font-medium text-blue-100/80">
          <div className="flex items-center gap-1.5">
            <Users className="w-4 h-4" />
            <span>30 participants</span>
          </div>
          <div className="w-1 h-1 bg-white/20 rounded-full" />
          <div className="flex items-center gap-1.5">
            <ArrowUp className="w-4 h-4 text-green-400" />
            <span>Top {promotionZoneSize} promote to Gold</span>
          </div>
        </div>
      </div>

      {/* Main List */}
      <div className="p-3 max-h-[600px] overflow-y-auto custom-scrollbar bg-gray-900/40">
        <div className="space-y-1">
          {leaderboardData.map((entry, index) => {
            const isMe = user && entry.user.id === user.id;
            const isPromotion = index < promotionZoneSize;

            return (
              <div
                key={entry.user.id}
                className={`flex flex-col ${index === promotionZoneSize ? 'mt-4' : ''}`}
              >
                {index === promotionZoneSize && (
                  <div className="w-full flex items-center justify-center gap-4 py-4 px-2 opacity-50">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gray-700" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Promotion Line</span>
                    <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gray-700" />
                  </div>
                )}

                <div
                  className={`relative group flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 ${isMe
                    ? 'bg-cyan-500/10 border border-cyan-500/50 shadow-lg shadow-cyan-500/10 z-10'
                    : 'hover:bg-white/5 border border-transparent'
                    }`}
                >
                  {/* Rank */}
                  <div className="w-10 flex justify-center items-center">
                    {index === 0 && <Crown className="w-6 h-6 text-yellow-400" />}
                    {index === 1 && <Medal className="w-6 h-6 text-gray-400" />}
                    {index === 2 && <Medal className="w-6 h-6 text-amber-600" />}
                    {index > 2 && <span className="font-black text-gray-500 text-lg">#{index + 1}</span>}
                  </div>

                  {/* Avatar */}
                  <div className={`relative w-12 h-12 rounded-full flex items-center justify-center text-2xl border-2 transition-transform duration-300 group-hover:scale-110 ${isMe ? 'border-cyan-400 bg-cyan-900/50' : 'border-gray-700 bg-gray-800'
                    }`}>
                    {entry.user.avatar}
                    {entry.streak > 5 && (
                      <div className="absolute -bottom-1 -right-1 bg-orange-500 text-[8px] p-0.5 rounded-full border border-gray-900">
                        🔥
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className={`font-bold truncate ${isMe ? 'text-cyan-400' : 'text-white'}`}>
                        {entry.user.name}
                        {isMe && <span className="ml-1 text-[10px] bg-cyan-500 text-white px-1.5 py-0.5 rounded-full">YOU</span>}
                      </h4>
                      {entry.isPro && (
                        <div className="flex items-center bg-gradient-to-r from-amber-400 to-orange-500 px-1.5 py-0.5 rounded text-[8px] font-black text-white uppercase tracking-tighter">
                          PRO
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                      <span>Level {entry.level}</span>
                      <span className="w-0.5 h-0.5 bg-gray-700 rounded-full" />
                      <span>{entry.streak} day streak</span>
                    </div>
                  </div>

                  {/* Score */}
                  <div className="text-right">
                    <div className={`text-lg font-black ${isMe ? 'text-cyan-400' : 'text-white'}`}>
                      {entry.xp.toLocaleString()}
                    </div>
                    <div className="text-[10px] text-gray-500 font-black uppercase tracking-widest">XP</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Info */}
      <div className="p-6 bg-gray-900 border-t border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-green-500/10 p-2 rounded-xl">
            <TrendingUp className="w-5 h-5 text-green-500" />
          </div>
          <div>
            <div className="text-[10px] text-gray-500 font-black uppercase tracking-widest leading-none mb-1">Status</div>
            <div className="text-sm font-bold text-green-400">Promoting to Gold</div>
          </div>
        </div>

        <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-xl transition-colors group">
          <span className="text-sm font-bold text-gray-300">View All Leagues</span>
          <ChevronRight className="w-4 h-4 text-gray-500 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
