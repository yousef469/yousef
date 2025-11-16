import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useProgress } from '../contexts/ProgressContext';
import { supabase } from '../services/supabase';
import { ArrowLeft, Camera, Edit2, Save, X, Copy, Check } from 'lucide-react';

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { userProfile } = useProgress();
  
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState(user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User');
  const [selectedAvatar, setSelectedAvatar] = useState('👤');

  const avatarOptions = ['👤', '🚀', '✈️', '🚗', '🤖', '⚡', '🔬', '🎓', '💻', '🛠️', '🌟', '🔥'];

  const handleSave = () => {
    // Here you would save to Supabase
    // For now, just close editing mode
    setIsEditing(false);
    alert('Profile updated! (Note: This would save to database in production)');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </button>

        {/* Profile Header */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700 mb-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-6">
              {/* Avatar */}
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-6xl">
                  {selectedAvatar}
                </div>
                {isEditing && (
                  <button className="absolute bottom-0 right-0 p-2 bg-blue-600 rounded-full hover:bg-blue-700 transition-colors">
                    <Camera className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* User Info */}
              <div>
                {isEditing ? (
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="text-3xl font-bold bg-gray-700 px-4 py-2 rounded-lg mb-2"
                  />
                ) : (
                  <h1 className="text-3xl font-bold mb-2">{username}</h1>
                )}
                <p className="text-gray-400">{user?.email}</p>
                <div className="flex items-center gap-4 mt-4">
                  <div>
                    <div className="text-2xl font-bold text-cyan-400">Level {userProfile.level || 1}</div>
                    <div className="text-sm text-gray-400">Current Level</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-400">{userProfile.total_xp || 0}</div>
                    <div className="text-sm text-gray-400">Total XP</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Edit Button */}
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors"
              >
                <Edit2 className="w-5 h-5" />
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-semibold transition-colors"
                >
                  <Save className="w-5 h-5" />
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold transition-colors"
                >
                  <X className="w-5 h-5" />
                  Cancel
                </button>
              </div>
            )}
          </div>

          {/* Avatar Selection */}
          {isEditing && (
            <div className="border-t border-gray-700 pt-6">
              <h3 className="text-lg font-bold mb-4">Choose Avatar</h3>
              <div className="grid grid-cols-6 gap-3">
                {avatarOptions.map((avatar) => (
                  <button
                    key={avatar}
                    onClick={() => setSelectedAvatar(avatar)}
                    className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl transition-all ${
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
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-bold mb-2">Lessons Completed</h3>
            <p className="text-3xl font-bold text-green-400">
              {Object.keys(userProfile.completed_lessons || []).length}
            </p>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-bold mb-2">Achievements</h3>
            <p className="text-3xl font-bold text-yellow-400">
              {userProfile.achievements?.length || 0}
            </p>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <h3 className="text-lg font-bold mb-2">Rank</h3>
            <p className="text-3xl font-bold text-purple-400">
              {userProfile.level >= 20 ? 'Diamond' : userProfile.level >= 10 ? 'Gold' : 'Silver'}
            </p>
          </div>
        </div>

        {/* Personal Meeting ID Section */}
        <PersonalMeetingIDSection userId={user?.id} />
      </div>
    </div>
  );
}

// Personal Meeting ID Component
function PersonalMeetingIDSection({ userId }) {
  const [pmi, setPmi] = useState('');
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const loadPMI = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('personal_meeting_id')
          .eq('id', userId)
          .single();

        if (error) throw error;
        
        if (data?.personal_meeting_id) {
          setPmi(data.personal_meeting_id);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error loading PMI:', error);
        setLoading(false);
      }
    };

    if (userId) {
      loadPMI();
    }
  }, [userId]);

  const copyPMI = () => {
    navigator.clipboard.writeText(pmi);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copyMeetingLink = () => {
    const link = `${window.location.origin}/collaborate/session/${pmi}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="mt-6 bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border border-blue-500/30 rounded-xl p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-700 rounded w-1/3 mb-4"></div>
          <div className="h-12 bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6 bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border border-blue-500/30 rounded-xl p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold mb-1">Personal Meeting ID</h3>
          <p className="text-sm text-gray-400">Your permanent meeting room - like Zoom PMI</p>
        </div>
        <div className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-xs font-semibold text-blue-400">
          PERMANENT
        </div>
      </div>

      <div className="bg-gray-900/50 rounded-lg p-4 mb-4">
        <p className="text-sm text-gray-400 mb-2">Your PMI</p>
        <div className="flex items-center justify-between">
          <p className="text-3xl font-bold tracking-wider font-mono">{pmi || 'Loading...'}</p>
          <button
            onClick={copyPMI}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-all flex items-center gap-2"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy ID
              </>
            )}
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        <button
          onClick={copyMeetingLink}
          className="px-4 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-lg transition-all text-sm font-semibold"
        >
          Copy Meeting Link
        </button>
        <button
          onClick={() => window.location.href = `/collaborate/session/${pmi}`}
          className="px-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-lg transition-all text-sm font-semibold"
        >
          Start Personal Room
        </button>
      </div>

      <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
        <p className="text-xs text-blue-300">
          💡 <strong>Tip:</strong> Share your PMI with students or colleagues for easy access to your personal meeting room anytime!
        </p>
      </div>
    </div>
  );
}
