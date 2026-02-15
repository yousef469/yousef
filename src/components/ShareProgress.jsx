import { useState } from 'react';
import { createPortal } from 'react-dom';
import { 
  X, Share2, Trophy, Star, Zap, Gift, Award, 
  Twitter, Facebook, Linkedin, Copy, Check,
  Download, Users, Sparkles, ChevronRight
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useProgress } from '../contexts/ProgressContext';

export default function ShareProgress({ isOpen, onClose }) {
  const { user } = useAuth();
  const { xp, level, completedLessons, achievements } = useProgress();
  const [activeTab, setActiveTab] = useState('badge');
  const [copied, setCopied] = useState(false);

  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Engineer';
  const referralCode = user ? `ENG-${user.id.substring(0, 8).toUpperCase()}` : 'ENG-XXXXX';

  // Generate shareable text for different platforms
  const getShareText = (type) => {
    switch (type) {
      case 'badge':
        return `🏆 Level ${level} Engineer on Engineerium!\n⚡ ${xp.toLocaleString()} XP earned\n📚 ${completedLessons?.length || 0} lessons completed\n\nJoin me and learn engineering in 3D! 🚀`;
      case 'progress':
        return `📊 My Engineerium Progress:\n🎯 Level ${level}\n⚡ ${xp.toLocaleString()} XP\n🏅 ${achievements?.length || 0} achievements\n\nLearn rockets, cars, planes & more in 3D!`;
      case 'invite':
        return `🎓 Join me on Engineerium - the best way to learn engineering!\n\nUse my code: ${referralCode}\nGet 200 bonus XP when you sign up! 🎁\n\n`;
      default:
        return '';
    }
  };

  const shareUrl = `${window.location.origin}?ref=${referralCode}`;

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareNative = async (text) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Engineerium - Learn Engineering',
          text: text,
          url: shareUrl
        });
      } catch (err) {
        copyToClipboard(text + '\n' + shareUrl);
      }
    } else {
      copyToClipboard(text + '\n' + shareUrl);
    }
  };

  const shareToTwitter = (text) => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const shareToFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const shareToLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  if (!isOpen) return null;

  return createPortal(
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl max-w-md w-full border border-cyan-500/30 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative p-6 border-b border-gray-700 bg-gradient-to-r from-cyan-500/20 to-purple-500/20">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
          
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-xl flex items-center justify-center">
              <Share2 className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Share & Earn</h2>
              <p className="text-gray-400">Show off your progress!</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-700">
          {[
            { id: 'badge', icon: Trophy, label: 'XP Badge' },
            { id: 'progress', icon: Zap, label: 'Progress' },
            { id: 'invite', icon: Gift, label: 'Invite' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-cyan-400 border-b-2 border-cyan-400 bg-cyan-500/10'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {/* XP Badge Tab */}
          {activeTab === 'badge' && (
            <div className="space-y-4">
              {/* Badge Preview */}
              <div className="bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 rounded-xl p-6 text-center">
                <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg shadow-yellow-500/30">
                  <Trophy className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-1">{userName}</h3>
                <p className="text-cyan-400 font-semibold mb-3">Level {level} Engineer</p>
                <div className="flex justify-center gap-6 text-sm">
                  <div>
                    <p className="text-2xl font-bold text-yellow-400">{xp.toLocaleString()}</p>
                    <p className="text-gray-400">XP</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-green-400">{completedLessons?.length || 0}</p>
                    <p className="text-gray-400">Lessons</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-purple-400">{achievements?.length || 0}</p>
                    <p className="text-gray-400">Badges</p>
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-400 text-center">Share your XP badge with friends!</p>
            </div>
          )}

          {/* Progress Tab */}
          {activeTab === 'progress' && (
            <div className="space-y-4">
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
                <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  Your Journey So Far
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Current Level</span>
                    <span className="text-cyan-400 font-bold">Level {level}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Total XP</span>
                    <span className="text-yellow-400 font-bold">{xp.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Lessons Completed</span>
                    <span className="text-green-400 font-bold">{completedLessons?.length || 0}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Achievements</span>
                    <span className="text-purple-400 font-bold">{achievements?.length || 0}</span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-400 text-center">Inspire others with your progress!</p>
            </div>
          )}

          {/* Invite Tab */}
          {activeTab === 'invite' && (
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Gift className="w-6 h-6 text-purple-400" />
                  <div>
                    <h3 className="font-semibold text-white">Earn 500 XP per friend!</h3>
                    <p className="text-xs text-gray-400">They get 200 XP bonus too</p>
                  </div>
                </div>
                
                <div className="bg-gray-900 border border-purple-500/30 rounded-lg px-4 py-3 font-mono text-lg text-purple-400 text-center tracking-wider mb-3">
                  {referralCode}
                </div>

                <button
                  onClick={() => copyToClipboard(`Join me on Engineerium! Use code: ${referralCode}\n${shareUrl}`)}
                  className={`w-full py-2 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                    copied 
                      ? 'bg-green-500 text-white' 
                      : 'bg-purple-500 hover:bg-purple-600 text-white'
                  }`}
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied!' : 'Copy Invite Link'}
                </button>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Users className="w-4 h-4" />
                <span>Reach milestones for bonus XP: 5 friends = +1000 XP!</span>
              </div>
            </div>
          )}

          {/* Share Buttons */}
          <div className="mt-6 space-y-3">
            <p className="text-sm text-gray-400 text-center mb-3">Share via</p>
            
            <div className="grid grid-cols-4 gap-2">
              <button
                onClick={() => shareNative(getShareText(activeTab))}
                className="flex flex-col items-center gap-1 p-3 bg-gray-800 hover:bg-gray-700 rounded-xl transition-colors"
              >
                <Share2 className="w-5 h-5 text-cyan-400" />
                <span className="text-xs text-gray-400">Share</span>
              </button>
              <button
                onClick={() => shareToTwitter(getShareText(activeTab))}
                className="flex flex-col items-center gap-1 p-3 bg-gray-800 hover:bg-[#1DA1F2] rounded-xl transition-colors group"
              >
                <Twitter className="w-5 h-5 text-[#1DA1F2] group-hover:text-white" />
                <span className="text-xs text-gray-400 group-hover:text-white">Twitter</span>
              </button>
              <button
                onClick={shareToFacebook}
                className="flex flex-col items-center gap-1 p-3 bg-gray-800 hover:bg-[#4267B2] rounded-xl transition-colors group"
              >
                <Facebook className="w-5 h-5 text-[#4267B2] group-hover:text-white" />
                <span className="text-xs text-gray-400 group-hover:text-white">Facebook</span>
              </button>
              <button
                onClick={shareToLinkedIn}
                className="flex flex-col items-center gap-1 p-3 bg-gray-800 hover:bg-[#0077B5] rounded-xl transition-colors group"
              >
                <Linkedin className="w-5 h-5 text-[#0077B5] group-hover:text-white" />
                <span className="text-xs text-gray-400 group-hover:text-white">LinkedIn</span>
              </button>
            </div>

            <button
              onClick={() => copyToClipboard(getShareText(activeTab) + '\n' + shareUrl)}
              className="w-full py-3 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 rounded-xl font-medium transition-all flex items-center justify-center gap-2"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied to Clipboard!' : 'Copy Share Text'}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

// Small share button for use in various places
export function ShareButton({ onClick, variant = 'default' }) {
  if (variant === 'icon') {
    return (
      <button
        onClick={onClick}
        className="p-2 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/30 rounded-lg transition-colors"
        title="Share Progress"
      >
        <Share2 className="w-4 h-4 text-cyan-400" />
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 hover:border-cyan-400 rounded-lg transition-all"
    >
      <Share2 className="w-4 h-4 text-cyan-400" />
      <span className="text-sm font-medium text-cyan-300">Share Progress</span>
    </button>
  );
}
