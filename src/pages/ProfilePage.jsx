import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useProgress } from '../contexts/ProgressContext';
import { supabase } from '../services/supabase';
import { 
  ArrowLeft, Edit2, Save, X, Trophy, Flame, BookMarked, Award, TrendingUp,
  Zap, Crown, Share2, Gift, Globe, LogOut
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Leaderboard from '../components/Leaderboard';
import ReferralSystem, { ReferralButton } from '../components/ReferralSystem';
import LanguageSelector from '../components/LanguageSelector';

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { progress, userProfile } = useProgress();
  const { t } = useTranslation();
  
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('👤');
  const [activeTab, setActiveTab] = useState('overview');
  const [saving, setSaving] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [showReferral, setShowReferral] = useState(false);
  const [showLangModal, setShowLangModal] = useState(false);

  const avatarOptions = ['👤', '🚀', '✈️', '🚗', '🤖', '⚡', '🔬', '🎓', '💻', '🛠️', '🌟', '🔥'];

  // Load user profile data
  useEffect(() => {
    if (!user) return;
    
    try {
      // Load from localStorage
      const saved = localStorage.getItem(`profile_${user.id}`);
      if (saved) {
        const { username: savedUsername, avatar: savedAvatar } = JSON.parse(saved);
        setUsername(savedUsername || user.email?.split('@')[0] || 'User');
        setSelectedAvatar(savedAvatar || '👤');
      } else {
        setUsername(user.email?.split('@')[0] || 'User');
      }
    } catch (error) {
      console.error('Error loading profile:', error);
      setUsername(user.email?.split('@')[0] || 'User');
    } finally {
      setLoadingProfile(false);
    }
  }, [user]);

  // Calculate REAL stats from actual user data
  const totalLessons = 88;
  const completedLessons = Object.keys(progress.completedLessons || {}).length;
  const totalXP = userProfile.total_xp || 0;
  const level = userProfile.level || 1;
  const xpInCurrentLevel = totalXP % 1000;
  const achievementsCount = progress.achievements?.length || 0;

  // Debug logging
  console.log('Profile Debug:', {
    totalXP,
    level,
    completedLessons,
    userProfile,
    progressData: progress
  });

  // TEMPORARY: Clear fake data if user has 0 completed lessons but shows XP
  useEffect(() => {
    if (completedLessons === 0 && totalXP > 0 && user) {
      console.warn('⚠️ Detected fake XP data! Clearing...');
      // Clear fake data from Supabase
      supabase
        .from('user_profiles')
        .update({
          total_xp: 0,
          level: 1,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id)
        .then(() => {
          console.log('✅ Fake data cleared! Please refresh the page.');
          alert('Fake data detected and cleared! Please refresh the page (Ctrl+R)');
        });
    }
  }, [completedLessons, totalXP, user]);
  
  const getRank = (lvl) => {
    if (lvl >= 20) return 'Diamond';
    if (lvl >= 15) return 'Platinum';
    if (lvl >= 10) return 'Gold';
    if (lvl >= 5) return 'Silver';
    return 'Bronze';
  };

  const xpPercentage = (xpInCurrentLevel / 1000) * 100;
  const lessonPercentage = (completedLessons / totalLessons) * 100;

  // Get recent activity
  const recentActivity = Object.entries(progress.completedLessons)
    .slice(-6)
    .reverse()
    .map(([key, data]) => ({
      type: 'lesson',
      title: `${data.subject} Lesson ${data.lessonId}`,
      points: data.xpEarned || 100,
      time: new Date(data.completedAt).toLocaleString()
    }));

  // Achievements
  const allAchievements = [
    { id: 'first_lesson', name: 'First Steps', desc: 'Complete your first lesson', icon: '🎯' },
    { id: 'ten_lessons', name: 'Getting Started', desc: 'Complete 10 lessons', icon: '🔟' },
    { id: 'quarter_century', name: 'Quarter Century', desc: 'Complete 25 lessons', icon: '🎯' },
    { id: 'half_century', name: 'Half Century', desc: 'Complete 50 lessons', icon: '🏆' },
    { id: 'quiz_master', name: 'Quiz Master', desc: 'Get perfect scores on 10 quizzes', icon: '🧠' },
    { id: 'rocket_master', name: 'Rocket Scientist', desc: 'Complete all rocket lessons', icon: '🚀' },
    { id: 'car_master', name: 'Automotive Master', desc: 'Complete all car lessons', icon: '🚗' },
    { id: 'plane_master', name: 'Aviation Master', desc: 'Complete all plane lessons', icon: '✈️' },
    { id: 'electronics_master', name: 'Electronics Master', desc: 'Complete all electronics lessons', icon: '⚡' }
  ];
  
  const achievements = allAchievements.map(ach => ({
    ...ach,
    unlocked: progress.achievements?.includes(ach.id) || completedLessons >= (ach.id === 'first_lesson' ? 1 : ach.id === 'ten_lessons' ? 10 : ach.id === 'quarter_century' ? 25 : ach.id === 'half_century' ? 50 : 999)
  }));

  // Helper functions for followers/following
  const getFollowerCount = () => {
    const followData = JSON.parse(localStorage.getItem('follow_data') || '{}');
    let followers = 0;
    Object.values(followData).forEach(userData => {
      if (userData.following?.includes(user?.id)) {
        followers++;
      }
    });
    return followers;
  };

  const getFollowingCount = () => {
    const followData = JSON.parse(localStorage.getItem('follow_data') || '{}');
    return followData[user?.id]?.following?.length || 0;
  };

  // Helper function for streak data
  const getStreakData = () => {
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
      return data;
    }
    return { currentStreak: 0, longestStreak: 0, activityDates: [] };
  };

  const handleSave = async () => {
    if (!user) return;
    
    setSaving(true);
    try {
      // Save to localStorage for now (Supabase table may not have username/avatar columns)
      localStorage.setItem(`profile_${user.id}`, JSON.stringify({
        username,
        avatar: selectedAvatar
      }));
      
      setIsEditing(false);
      alert('✅ Profile updated successfully!');
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('❌ Error saving profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const shareProgress = () => {
    const shareText = `🚀 I'm Level ${level} on Engineerium! ${completedLessons}/${totalLessons} lessons completed with ${totalXP} XP earned! Join me in learning engineering! 🎓`;
    const shareUrl = window.location.origin;
    
    if (navigator.share) {
      navigator.share({
        title: 'My Engineerium Progress',
        text: shareText,
        url: shareUrl
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${shareText}\n\n${shareUrl}`);
      alert('Progress copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </button>

        {/* Profile Header with Level & XP */}
        <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/50 rounded-2xl p-6 mb-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-6">
              {/* Avatar */}
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-5xl">
                  {selectedAvatar}
                </div>

              </div>

              {/* User Info */}
              <div>
                {isEditing ? (
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="text-2xl font-bold bg-gray-700 px-4 py-2 rounded-lg mb-2"
                  />
                ) : (
                  <h1 className="text-2xl font-bold mb-1">{username}</h1>
                )}
                <p className="text-gray-400 text-sm mb-2">{user?.email}</p>
                
                {/* Followers & Following */}
                <div className="flex items-center gap-4 mb-3">
                  <div className="text-center">
                    <div className="font-bold text-white">{getFollowerCount()}</div>
                    <div className="text-xs text-gray-500">Followers</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-white">{getFollowingCount()}</div>
                    <div className="text-xs text-gray-500">Following</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-orange-400">{getStreakData().currentStreak}</div>
                    <div className="text-xs text-gray-500">Day Streak</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Crown className="w-5 h-5 text-yellow-400" />
                    <span className="text-lg font-bold">Level {level}</span>
                  </div>
                  <div className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-sm font-semibold">
                    {getRank(level)}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 flex-wrap">
              {!isEditing ? (
                <>
                  <button
                    onClick={() => setShowReferral(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-lg transition-all"
                  >
                    <Gift className="w-4 h-4" />
                    Invite
                  </button>
                  <button
                    onClick={shareProgress}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-lg transition-all"
                  >
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    {saving ? 'Saving...' : 'Save'}
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                </>
              )}
            </div>
          </div>

          {/* XP Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span>{xpInCurrentLevel} XP</span>
              <span>1000 XP</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-purple-500 to-pink-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${xpPercentage}%` }}
              />
            </div>
            <p className="text-sm text-gray-400 mt-1">{1000 - xpInCurrentLevel} XP to Level {level + 1}</p>
          </div>

          {/* Avatar Selection */}
          {isEditing && (
            <div className="border-t border-gray-700 pt-4 mt-4">
              <h3 className="text-sm font-bold mb-3">Choose Avatar</h3>
              <div className="grid grid-cols-12 gap-2">
                {avatarOptions.map((avatar) => (
                  <button
                    key={avatar}
                    onClick={() => setSelectedAvatar(avatar)}
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl transition-all ${
                      selectedAvatar === avatar
                        ? 'bg-blue-600 scale-110'
                        : 'bg-gray-700 hover:bg-gray-600'
                    }`}
                  >
                    {avatar}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-800/50 border border-cyan-500/30 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Trophy className="w-5 h-5 text-yellow-400" />
              <span className="text-gray-400 text-sm">Total XP</span>
            </div>
            <p className="text-2xl font-bold">{totalXP.toLocaleString()}</p>
          </div>

          <div className="bg-gray-800/50 border border-green-500/30 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <BookMarked className="w-5 h-5 text-green-400" />
              <span className="text-gray-400 text-sm">Lessons</span>
            </div>
            <p className="text-2xl font-bold">{completedLessons}/{totalLessons}</p>
          </div>

          <div className="bg-gray-800/50 border border-purple-500/30 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-5 h-5 text-purple-400" />
              <span className="text-gray-400 text-sm">Achievements</span>
            </div>
            <p className="text-2xl font-bold">{achievementsCount}</p>
          </div>

          <div className="bg-gray-800/50 border border-orange-500/30 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Flame className="w-5 h-5 text-orange-400" />
              <span className="text-gray-400 text-sm">Streak</span>
            </div>
            <p className="text-2xl font-bold">{userProfile.streak || 0}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {['overview', 'activity', 'achievements', 'leaderboard'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors whitespace-nowrap ${
                activeTab === tab
                  ? 'bg-cyan-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Progress */}
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-cyan-400" />
                Learning Progress
              </h3>
              
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-300">Overall Completion</span>
                  <span className="text-cyan-400 font-bold">{Math.round(lessonPercentage)}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-4">
                  <div 
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 h-4 rounded-full transition-all duration-500"
                    style={{ width: `${lessonPercentage}%` }}
                  />
                </div>
              </div>

              {completedLessons === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  <p>Start your first lesson to see progress!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {['rockets', 'planes', 'cars', 'physics', 'mathematics', 'electronics'].map(subject => {
                    const subjectCompleted = Object.keys(progress.completedLessons).filter(k => k.startsWith(`${subject}-`)).length;
                    if (subjectCompleted === 0) return null;
                    
                    const subjectTotal = subject === 'physics' ? 33 : subject === 'mathematics' ? 37 : 18;
                    const subjectPercent = Math.round((subjectCompleted / subjectTotal) * 100);
                    const icons = { rockets: '🚀', planes: '✈️', cars: '🚗', physics: '⚛️', mathematics: '🔢', electronics: '⚡' };
                    
                    return (
                      <div key={subject} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{icons[subject]}</span>
                          <div>
                            <p className="font-semibold capitalize">{subject}</p>
                            <p className="text-sm text-gray-400">{subjectCompleted}/{subjectTotal} lessons</p>
                          </div>
                        </div>
                        <span className="text-cyan-400 font-bold">{subjectPercent}%</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>


          </div>
        )}

        {activeTab === 'activity' && (
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              Recent Activity
            </h3>
            
            {recentActivity.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <p>No activity yet. Start learning to see your progress here!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentActivity.map((activity, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                        📚
                      </div>
                      <div>
                        <p className="font-semibold">{activity.title}</p>
                        <p className="text-sm text-gray-400">{activity.time}</p>
                      </div>
                    </div>
                    <span className="text-green-400 font-bold">+{activity.points} XP</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-purple-400" />
              Achievements
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {achievements.map((achievement) => (
                <div 
                  key={achievement.id}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    achievement.unlocked 
                      ? 'bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-yellow-500/50' 
                      : 'bg-gray-700/30 border-gray-600 opacity-50'
                  }`}
                >
                  <div className="text-4xl mb-2">{achievement.icon}</div>
                  <p className="font-semibold mb-1">{achievement.name}</p>
                  <p className="text-xs text-gray-400">{achievement.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'leaderboard' && (
          <Leaderboard />
        )}
      </div>

      {/* Settings Section */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mt-6">
        <h3 className="text-xl font-bold mb-4">Settings</h3>
        <div className="space-y-3">
          <button
            onClick={() => setShowLangModal(true)}
            className="w-full flex items-center justify-between p-4 bg-gray-700/50 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-cyan-400" />
              <span>{t('nav.language')}</span>
            </div>
            <span className="text-gray-400">→</span>
          </button>
          
          <button
            onClick={async () => {
              await signOut();
              navigate('/');
            }}
            className="w-full flex items-center justify-between p-4 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded-lg transition-colors text-red-400"
          >
            <div className="flex items-center gap-3">
              <LogOut className="w-5 h-5" />
              <span>{t('nav.signOut')}</span>
            </div>
            <span>→</span>
          </button>
        </div>
      </div>

      {/* Referral System Modal */}
      <ReferralSystem isOpen={showReferral} onClose={() => setShowReferral(false)} />
      
      {/* Language Selector Modal */}
      <LanguageSelector isOpen={showLangModal} onClose={() => setShowLangModal(false)} />
    </div>
  );
}
