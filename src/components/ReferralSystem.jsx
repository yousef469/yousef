import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  Gift, Copy, Check, Users, Trophy, Share2, X, 
  Sparkles, ChevronRight, Star, Zap
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useProgress } from '../contexts/ProgressContext';

// Referral rewards configuration
const REFERRAL_REWARDS = {
  PER_REFERRAL: 500,      // XP for each successful referral
  REFEREE_BONUS: 200,     // XP bonus for the person who signs up
  MILESTONE_5: 1000,      // Bonus at 5 referrals
  MILESTONE_10: 2500,     // Bonus at 10 referrals
  MILESTONE_25: 5000,     // Bonus at 25 referrals
};

export default function ReferralSystem({ isOpen, onClose }) {
  const { user } = useAuth();
  const { addXP } = useProgress();
  const [referralCode, setReferralCode] = useState('');
  const [referralStats, setReferralStats] = useState({
    totalReferrals: 0,
    pendingReferrals: 0,
    totalXPEarned: 0,
    referredUsers: []
  });
  const [copied, setCopied] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (user) {
      generateReferralCode();
      loadReferralStats();
    }
  }, [user]);

  // Generate unique referral code based on user ID
  const generateReferralCode = () => {
    if (!user) return;
    const code = `ENG-${user.id.substring(0, 8).toUpperCase()}`;
    setReferralCode(code);
    
    // Store the code mapping
    const referralCodes = JSON.parse(localStorage.getItem('referral_codes') || '{}');
    referralCodes[code] = user.id;
    localStorage.setItem('referral_codes', JSON.stringify(referralCodes));
  };

  // Load referral statistics
  const loadReferralStats = () => {
    if (!user) return;
    const stats = JSON.parse(localStorage.getItem(`referral_stats_${user.id}`) || 'null');
    if (stats) {
      setReferralStats(stats);
    }
  };

  // Copy referral link
  const copyReferralLink = () => {
    const link = `${window.location.origin}?ref=${referralCode}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Copy just the code
  const copyCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Share via native share API
  const shareReferral = async () => {
    const link = `${window.location.origin}?ref=${referralCode}`;
    const shareData = {
      title: 'Join Engineerium!',
      text: `Learn engineering with me on Engineerium! Use my referral code ${referralCode} to get bonus XP when you sign up. 🚀`,
      url: link
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        copyReferralLink();
      }
    } else {
      copyReferralLink();
    }
  };

  // Calculate next milestone
  const getNextMilestone = () => {
    const { totalReferrals } = referralStats;
    if (totalReferrals < 5) return { target: 5, reward: REFERRAL_REWARDS.MILESTONE_5 };
    if (totalReferrals < 10) return { target: 10, reward: REFERRAL_REWARDS.MILESTONE_10 };
    if (totalReferrals < 25) return { target: 25, reward: REFERRAL_REWARDS.MILESTONE_25 };
    return null;
  };

  const nextMilestone = getNextMilestone();
  const milestoneProgress = nextMilestone 
    ? (referralStats.totalReferrals / nextMilestone.target) * 100 
    : 100;

  if (!isOpen) return null;

  return createPortal(
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl max-w-lg w-full border border-purple-500/30 my-auto max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative p-6 border-b border-gray-700 bg-gradient-to-r from-purple-500/20 to-pink-500/20">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
          
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Gift className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Invite Friends</h2>
              <p className="text-gray-400">Earn {REFERRAL_REWARDS.PER_REFERRAL} XP per referral!</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Referral Code Card */}
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
            <p className="text-sm text-gray-400 mb-2">Your Referral Code</p>
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-gray-900 border border-purple-500/30 rounded-lg px-4 py-3 font-mono text-xl text-purple-400 tracking-wider">
                {referralCode}
              </div>
              <button
                onClick={copyCode}
                className={`p-3 rounded-lg transition-all ${
                  copied 
                    ? 'bg-green-500 text-white' 
                    : 'bg-purple-500 hover:bg-purple-600 text-white'
                }`}
              >
                {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Share Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={copyReferralLink}
              className="flex items-center justify-center gap-2 py-3 bg-gray-700 hover:bg-gray-600 rounded-xl font-medium transition-all active:scale-95"
            >
              <Copy className="w-4 h-4" />
              Copy Link
            </button>
            <button
              onClick={shareReferral}
              className="flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-xl font-medium transition-all active:scale-95"
            >
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-3 text-center">
              <Users className="w-5 h-5 text-purple-400 mx-auto mb-1" />
              <p className="text-2xl font-bold text-white">{referralStats.totalReferrals}</p>
              <p className="text-xs text-gray-400">Referrals</p>
            </div>
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-3 text-center">
              <Zap className="w-5 h-5 text-yellow-400 mx-auto mb-1" />
              <p className="text-2xl font-bold text-white">{referralStats.totalXPEarned}</p>
              <p className="text-xs text-gray-400">XP Earned</p>
            </div>
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-3 text-center">
              <Star className="w-5 h-5 text-cyan-400 mx-auto mb-1" />
              <p className="text-2xl font-bold text-white">{referralStats.pendingReferrals}</p>
              <p className="text-xs text-gray-400">Pending</p>
            </div>
          </div>

          {/* Milestone Progress */}
          {nextMilestone && (
            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-400" />
                  <span className="font-semibold text-white">Next Milestone</span>
                </div>
                <span className="text-purple-400 font-bold">+{nextMilestone.reward} XP</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all"
                    style={{ width: `${milestoneProgress}%` }}
                  />
                </div>
                <span className="text-sm text-gray-400">
                  {referralStats.totalReferrals}/{nextMilestone.target}
                </span>
              </div>
            </div>
          )}

          {/* How it Works */}
          <div className="space-y-3">
            <h3 className="font-semibold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              How it Works
            </h3>
            <div className="space-y-2">
              {[
                { step: 1, text: 'Share your unique referral code with friends' },
                { step: 2, text: 'They sign up using your code' },
                { step: 3, text: `You earn ${REFERRAL_REWARDS.PER_REFERRAL} XP, they get ${REFERRAL_REWARDS.REFEREE_BONUS} XP bonus!` }
              ].map((item) => (
                <div key={item.step} className="flex items-center gap-3 text-sm">
                  <div className="w-6 h-6 bg-purple-500/20 border border-purple-500/30 rounded-full flex items-center justify-center text-purple-400 font-bold text-xs">
                    {item.step}
                  </div>
                  <span className="text-gray-300">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Referrals */}
          {referralStats.referredUsers.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-semibold text-white">Recent Referrals</h3>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {referralStats.referredUsers.slice(0, 5).map((referral, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-sm">
                        {referral.name?.charAt(0) || '?'}
                      </div>
                      <span className="text-sm text-gray-300">{referral.name || 'Anonymous'}</span>
                    </div>
                    <span className="text-green-400 text-sm font-medium">+{REFERRAL_REWARDS.PER_REFERRAL} XP</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}

// Hook to check and process referral on signup
export function useReferralOnSignup() {
  const processReferral = (newUserId, newUserName) => {
    // Check if there's a referral code in URL or localStorage
    const urlParams = new URLSearchParams(window.location.search);
    const refCode = urlParams.get('ref') || localStorage.getItem('pending_referral');
    
    if (!refCode) return null;

    // Get the referrer's user ID from the code
    const referralCodes = JSON.parse(localStorage.getItem('referral_codes') || '{}');
    const referrerId = referralCodes[refCode];
    
    if (!referrerId || referrerId === newUserId) {
      localStorage.removeItem('pending_referral');
      return null;
    }

    // Update referrer's stats
    const referrerStats = JSON.parse(localStorage.getItem(`referral_stats_${referrerId}`) || JSON.stringify({
      totalReferrals: 0,
      pendingReferrals: 0,
      totalXPEarned: 0,
      referredUsers: []
    }));

    referrerStats.totalReferrals += 1;
    referrerStats.totalXPEarned += REFERRAL_REWARDS.PER_REFERRAL;
    referrerStats.referredUsers.unshift({
      id: newUserId,
      name: newUserName,
      date: new Date().toISOString()
    });

    // Check for milestone bonuses
    let milestoneBonus = 0;
    if (referrerStats.totalReferrals === 5) milestoneBonus = REFERRAL_REWARDS.MILESTONE_5;
    if (referrerStats.totalReferrals === 10) milestoneBonus = REFERRAL_REWARDS.MILESTONE_10;
    if (referrerStats.totalReferrals === 25) milestoneBonus = REFERRAL_REWARDS.MILESTONE_25;
    
    if (milestoneBonus > 0) {
      referrerStats.totalXPEarned += milestoneBonus;
    }

    localStorage.setItem(`referral_stats_${referrerId}`, JSON.stringify(referrerStats));
    
    // Store XP to be awarded to referrer (will be processed on their next login)
    const pendingXP = JSON.parse(localStorage.getItem(`pending_referral_xp_${referrerId}`) || '0');
    localStorage.setItem(`pending_referral_xp_${referrerId}`, JSON.stringify(
      pendingXP + REFERRAL_REWARDS.PER_REFERRAL + milestoneBonus
    ));

    // Clear the referral code
    localStorage.removeItem('pending_referral');
    
    // Return the bonus XP for the new user
    return REFERRAL_REWARDS.REFEREE_BONUS;
  };

  return { processReferral };
}

// Component to capture referral code from URL
export function ReferralCapture() {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const refCode = urlParams.get('ref');
    
    if (refCode) {
      localStorage.setItem('pending_referral', refCode);
      // Clean URL without reload
      const newUrl = window.location.pathname;
      window.history.replaceState({}, '', newUrl);
    }
  }, []);

  return null;
}

// Small button to show in profile/header
export function ReferralButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 hover:border-purple-400 rounded-lg transition-all active:scale-95"
    >
      <Gift className="w-4 h-4 text-purple-400" />
      <span className="text-sm font-medium text-purple-300">Invite</span>
    </button>
  );
}
