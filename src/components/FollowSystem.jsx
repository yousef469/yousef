import { useState, useEffect } from 'react';
import { UserPlus, UserMinus, Users, Search, Trophy, Flame, Star } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function FollowSystem({ userId, userName, userLevel, compact = false }) {
  const { user } = useAuth();
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userId && user) {
      loadFollowStatus();
    }
  }, [userId, user]);

  const loadFollowStatus = () => {
    // Load from localStorage (in production, this would be from database)
    const followData = JSON.parse(localStorage.getItem('follow_data') || '{}');
    
    // Check if current user follows this user
    const currentUserFollowing = followData[user?.id]?.following || [];
    setIsFollowing(currentUserFollowing.includes(userId));
    
    // Count followers for this user
    let followers = 0;
    Object.values(followData).forEach(userData => {
      if (userData.following?.includes(userId)) {
        followers++;
      }
    });
    setFollowerCount(followers);
    
    // Count following for this user
    setFollowingCount(followData[userId]?.following?.length || 0);
  };

  const handleFollow = async () => {
    if (!user || loading) return;
    setLoading(true);

    try {
      const followData = JSON.parse(localStorage.getItem('follow_data') || '{}');
      
      if (!followData[user.id]) {
        followData[user.id] = { following: [] };
      }

      if (isFollowing) {
        // Unfollow
        followData[user.id].following = followData[user.id].following.filter(id => id !== userId);
        setFollowerCount(prev => prev - 1);
      } else {
        // Follow
        followData[user.id].following.push(userId);
        setFollowerCount(prev => prev + 1);
      }

      localStorage.setItem('follow_data', JSON.stringify(followData));
      setIsFollowing(!isFollowing);
    } catch (error) {
      console.error('Follow error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Don't show follow button for own profile
  if (user?.id === userId) {
    if (compact) return null;
    return (
      <div className="flex items-center gap-4 text-sm">
        <div className="text-center">
          <div className="font-bold text-white">{followerCount}</div>
          <div className="text-gray-500">Followers</div>
        </div>
        <div className="text-center">
          <div className="font-bold text-white">{followingCount}</div>
          <div className="text-gray-500">Following</div>
        </div>
      </div>
    );
  }

  if (compact) {
    return (
      <button
        onClick={handleFollow}
        disabled={loading || !user}
        className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
          isFollowing
            ? 'bg-gray-700 text-gray-300 hover:bg-red-500/20 hover:text-red-400'
            : 'bg-cyan-500 text-white hover:bg-cyan-400'
        }`}
      >
        {isFollowing ? (
          <>
            <UserMinus className="w-4 h-4" />
            <span>Following</span>
          </>
        ) : (
          <>
            <UserPlus className="w-4 h-4" />
            <span>Follow</span>
          </>
        )}
      </button>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-4 text-sm">
        <div className="text-center">
          <div className="font-bold text-white">{followerCount}</div>
          <div className="text-gray-500">Followers</div>
        </div>
        <div className="text-center">
          <div className="font-bold text-white">{followingCount}</div>
          <div className="text-gray-500">Following</div>
        </div>
      </div>
      
      <button
        onClick={handleFollow}
        disabled={loading || !user}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
          isFollowing
            ? 'bg-gray-700 text-gray-300 hover:bg-red-500/20 hover:text-red-400'
            : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:from-cyan-400 hover:to-blue-500'
        }`}
      >
        {loading ? (
          <span className="animate-spin">⏳</span>
        ) : isFollowing ? (
          <>
            <UserMinus className="w-5 h-5" />
            <span>Unfollow</span>
          </>
        ) : (
          <>
            <UserPlus className="w-5 h-5" />
            <span>Follow</span>
          </>
        )}
      </button>
    </div>
  );
}


// Discover Users Component
export function DiscoverUsers() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadSuggestedUsers();
  }, []);

  const loadSuggestedUsers = () => {
    // Load real users from localStorage (in production, fetch from database)
    const registeredUsers = JSON.parse(localStorage.getItem('registered_users') || '[]');
    // Filter out current user
    const otherUsers = registeredUsers.filter(u => u.id !== user?.id);
    setUsers(otherUsers);
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl p-4 md:p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-white flex items-center gap-2">
          <Users className="w-5 h-5 text-cyan-400" />
          Discover Engineers
        </h3>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search users..."
          className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 text-sm"
        />
      </div>

      {/* User List */}
      <div className="space-y-3">
        {filteredUsers.map((u) => (
          <div key={u.id} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-xl">
                {u.avatar}
              </div>
              <div>
                <p className="font-semibold text-white">{u.name}</p>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-400" />
                    Level {u.level}
                  </span>
                  <span className="flex items-center gap-1">
                    <Flame className="w-3 h-3 text-orange-400" />
                    {u.streak} day streak
                  </span>
                </div>
              </div>
            </div>
            <FollowSystem userId={u.id} userName={u.name} compact={true} />
          </div>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <p className="text-center text-gray-500 py-4">No users found</p>
      )}
    </div>
  );
}

// Following Feed Component
export function FollowingFeed() {
  const { user } = useAuth();
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    loadFollowingActivities();
  }, []);

  const loadFollowingActivities = () => {
    // Mock activities (in production, fetch from database)
    const mockActivities = [
      { id: 1, user: 'Alex Chen', avatar: '🚀', action: 'completed', target: 'Rocket Propulsion Lesson', time: '2h ago', xp: 100 },
      { id: 2, user: 'Sarah Kim', avatar: '✈️', action: 'earned', target: 'Aviation Master badge', time: '4h ago', xp: 500 },
      { id: 3, user: 'Mike Johnson', avatar: '🏎️', action: 'reached', target: 'Level 20', time: '1d ago', xp: 0 },
      { id: 4, user: 'Emma Davis', avatar: '⚡', action: 'completed', target: 'Weekly Challenge', time: '1d ago', xp: 300 },
    ];
    setActivities(mockActivities);
  };

  return (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl p-4 md:p-6">
      <h3 className="font-bold text-white mb-4 flex items-center gap-2">
        <Users className="w-5 h-5 text-cyan-400" />
        Following Activity
      </h3>

      <div className="space-y-3">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3 p-3 bg-gray-800/50 rounded-lg">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-xl flex-shrink-0">
              {activity.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-300">
                <span className="font-semibold text-white">{activity.user}</span>
                {' '}{activity.action}{' '}
                <span className="text-cyan-400">{activity.target}</span>
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-gray-500">{activity.time}</span>
                {activity.xp > 0 && (
                  <span className="text-xs text-yellow-400">+{activity.xp} XP</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {activities.length === 0 && (
        <p className="text-center text-gray-500 py-4">
          Follow other engineers to see their activity!
        </p>
      )}
    </div>
  );
}
