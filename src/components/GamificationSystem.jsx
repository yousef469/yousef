import React, { useState } from 'react';
import { Trophy, Star, Zap, Crown, Award, TrendingUp, Gift, Lock } from 'lucide-react';

const GamificationSystem = ({ userLevel = 12, userXP = 3450 }) => {
  const [activeTab, setActiveTab] = useState('levels');

  // Level system
  const levels = [
    { level: 1, title: 'Rookie', xpRequired: 0, color: 'gray', icon: '🌱' },
    { level: 5, title: 'Explorer', xpRequired: 1000, color: 'green', icon: '🔍' },
    { level: 10, title: 'Engineer', xpRequired: 2500, color: 'blue', icon: '⚙️' },
    { level: 15, title: 'Expert', xpRequired: 5000, color: 'purple', icon: '🎓' },
    { level: 20, title: 'Master', xpRequired: 10000, color: 'orange', icon: '🏆' },
    { level: 25, title: 'Legend', xpRequired: 20000, color: 'red', icon: '👑' }
  ];

  // Unlockable content
  const unlockables = [
    { id: 1, name: 'Custom Themes', level: 5, unlocked: true, icon: '🎨' },
    { id: 2, name: 'Advanced Calculators', level: 8, unlocked: true, icon: '🧮' },
    { id: 3, name: 'Exclusive Models', level: 10, unlocked: true, icon: '🚀' },
    { id: 4, name: 'Certificate Generator', level: 12, unlocked: true, icon: '📜' },
    { id: 5, name: 'VIP Community Badge', level: 15, unlocked: false, icon: '⭐' },
    { id: 6, name: 'AR Model Viewer', level: 18, unlocked: false, icon: '📱' },
    { id: 7, name: 'Custom Model Upload', level: 20, unlocked: false, icon: '☁️' },
    { id: 8, name: 'Mentor Status', level: 25, unlocked: false, icon: '👨‍🏫' }
  ];

  // Badges/Achievements
  const badges = [
    { id: 1, name: 'First Steps', desc: 'Complete first lesson', rarity: 'common', earned: true, icon: '🎯' },
    { id: 2, name: 'Week Warrior', desc: '7-day streak', rarity: 'uncommon', earned: true, icon: '🔥' },
    { id: 3, name: 'Quiz Master', desc: '100% on 5 quizzes', rarity: 'rare', earned: true, icon: '🧠' },
    { id: 4, name: 'Helping Hand', desc: 'Help 10 users', rarity: 'uncommon', earned: true, icon: '🤝' },
    { id: 5, name: 'Speed Demon', desc: 'Complete lesson in under 10 min', rarity: 'rare', earned: false, icon: '⚡' },
    { id: 6, name: 'Perfect Score', desc: '100% on all rocket lessons', rarity: 'epic', earned: false, icon: '💯' },
    { id: 7, name: 'Social Butterfly', desc: '50 community interactions', rarity: 'rare', earned: false, icon: '🦋' },
    { id: 8, name: 'Rocket Scientist', desc: 'Master all rocket content', rarity: 'legendary', earned: false, icon: '🚀' }
  ];

  // Rewards shop
  const rewards = [
    { id: 1, name: 'Custom Avatar Frame', cost: 500, icon: '🖼️', type: 'cosmetic' },
    { id: 2, name: 'XP Boost (24h)', cost: 750, icon: '⚡', type: 'boost' },
    { id: 3, name: 'Exclusive Model Pack', cost: 1000, icon: '📦', type: 'content' },
    { id: 4, name: 'Skip Lesson Cooldown', cost: 300, icon: '⏭️', type: 'utility' },
    { id: 5, name: 'Premium Theme', cost: 1500, icon: '🎨', type: 'cosmetic' },
    { id: 6, name: 'Double XP Weekend', cost: 2000, icon: '💎', type: 'boost' }
  ];

  const getRarityColor = (rarity) => {
    switch(rarity) {
      case 'common': return 'text-gray-400 border-gray-500';
      case 'uncommon': return 'text-green-400 border-green-500';
      case 'rare': return 'text-blue-400 border-blue-500';
      case 'epic': return 'text-purple-400 border-purple-500';
      case 'legendary': return 'text-orange-400 border-orange-500';
      default: return 'text-gray-400 border-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Trophy className="w-8 h-8 text-yellow-400" />
          <div>
            <h1 className="text-3xl font-bold">Progression & Rewards</h1>
            <p className="text-gray-400">Level up and unlock exclusive content</p>
          </div>
        </div>

        {/* Current Level Card */}
        <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/50 rounded-2xl p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-4xl">
                ⚙️
              </div>
              <div>
                <h2 className="text-3xl font-bold">Level {userLevel}</h2>
                <p className="text-xl text-purple-400">Engineer</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-4xl font-bold text-cyan-400">{userXP}</p>
              <p className="text-gray-400">Total XP</p>
            </div>
          </div>
          
          <div className="mb-2">
            <div className="flex justify-between text-sm mb-1">
              <span>Progress to Level {userLevel + 1}</span>
              <span className="text-cyan-400 font-bold">65%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-4">
              <div className="bg-gradient-to-r from-purple-500 to-pink-600 h-4 rounded-full" style={{ width: '65%' }} />
            </div>
          </div>
          <p className="text-sm text-gray-400">550 XP to next level</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {['levels', 'badges', 'unlockables', 'rewards'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all whitespace-nowrap ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600'
                  : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Levels Tab */}
        {activeTab === 'levels' && (
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <h3 className="text-2xl font-bold mb-6">Level Progression</h3>
            <div className="space-y-4">
              {levels.map((lvl, index) => (
                <div 
                  key={lvl.level}
                  className={`flex items-center gap-4 p-4 rounded-lg border-2 ${
                    userLevel >= lvl.level 
                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-cyan-500/50' 
                      : 'bg-gray-700/30 border-gray-600'
                  }`}
                >
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl ${
                    userLevel >= lvl.level ? 'bg-cyan-500/20' : 'bg-gray-600'
                  }`}>
                    {lvl.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="text-xl font-bold">Level {lvl.level}</h4>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold bg-${lvl.color}-500/20 text-${lvl.color}-400`}>
                        {lvl.title}
                      </span>
                    </div>
                    <p className="text-gray-400">{lvl.xpRequired.toLocaleString()} XP required</p>
                  </div>
                  {userLevel >= lvl.level && (
                    <div className="text-green-400 flex items-center gap-2">
                      <Trophy className="w-6 h-6" />
                      <span className="font-semibold">Unlocked</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Badges Tab */}
        {activeTab === 'badges' && (
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <h3 className="text-2xl font-bold mb-6">Achievements & Badges</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {badges.map((badge) => (
                <div 
                  key={badge.id}
                  className={`p-6 rounded-xl border-2 transition-all ${
                    badge.earned 
                      ? `${getRarityColor(badge.rarity)} bg-gradient-to-br from-${badge.rarity === 'legendary' ? 'orange' : badge.rarity === 'epic' ? 'purple' : 'cyan'}-500/20 to-transparent`
                      : 'border-gray-600 bg-gray-700/30 opacity-50'
                  }`}
                >
                  <div className="text-5xl mb-3 text-center">{badge.icon}</div>
                  <h4 className="font-bold text-center mb-2">{badge.name}</h4>
                  <p className="text-xs text-gray-400 text-center mb-3">{badge.desc}</p>
                  <div className="text-center">
                    <span className={`text-xs px-2 py-1 rounded ${getRarityColor(badge.rarity)}`}>
                      {badge.rarity.toUpperCase()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Unlockables Tab */}
        {activeTab === 'unlockables' && (
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <h3 className="text-2xl font-bold mb-6">Unlockable Content</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {unlockables.map((item) => (
                <div 
                  key={item.id}
                  className={`flex items-center gap-4 p-6 rounded-xl border-2 ${
                    item.unlocked 
                      ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-500/50' 
                      : 'bg-gray-700/30 border-gray-600'
                  }`}
                >
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl ${
                    item.unlocked ? 'bg-green-500/20' : 'bg-gray-600'
                  }`}>
                    {item.unlocked ? item.icon : <Lock className="w-8 h-8 text-gray-400" />}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-lg mb-1">{item.name}</h4>
                    <p className="text-sm text-gray-400">
                      {item.unlocked ? 'Unlocked!' : `Unlock at Level ${item.level}`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Rewards Tab */}
        {activeTab === 'rewards' && (
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold">Rewards Shop</h3>
              <div className="flex items-center gap-2 px-4 py-2 bg-yellow-500/20 rounded-lg">
                <Star className="w-5 h-5 text-yellow-400" />
                <span className="font-bold text-yellow-400">{userXP} Points</span>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {rewards.map((reward) => (
                <div key={reward.id} className="bg-gray-700/50 rounded-xl p-6 hover:bg-gray-700 transition-all">
                  <div className="text-5xl mb-4 text-center">{reward.icon}</div>
                  <h4 className="font-bold text-center mb-2">{reward.name}</h4>
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span className="font-bold text-yellow-400">{reward.cost}</span>
                  </div>
                  <button 
                    className={`w-full py-2 rounded-lg font-semibold transition-all ${
                      userXP >= reward.cost
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700'
                        : 'bg-gray-600 cursor-not-allowed'
                    }`}
                    disabled={userXP < reward.cost}
                  >
                    {userXP >= reward.cost ? 'Redeem' : 'Not Enough Points'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GamificationSystem;
