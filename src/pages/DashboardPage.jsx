import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useProgress } from '../contexts/ProgressContext';
import { 
  Trophy, Target, Flame, BookMarked, Award, TrendingUp, 
  Calendar, Clock, Zap, Star, Crown, ChevronRight, Share2
} from 'lucide-react';
import DailyChallenge from '../components/DailyChallenge';
import AIStudyBuddy from '../components/AIStudyBuddy';
import SocialShare from '../components/SocialShare';
import CertificateGenerator from '../components/CertificateGenerator';
import ShareAchievement from '../components/ShareAchievement';

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { progress, userProfile } = useProgress();
  const [shareAchievement, setShareAchievement] = useState(null);
  const [showCertificate, setShowCertificate] = useState(null);
  
  // Calculate real stats from user progress
  const totalLessons = 88; // Total across all subjects
  const completedLessons = Object.keys(progress.completedLessons).length;
  const totalXP = userProfile.total_xp || 0;
  const level = userProfile.level || 1;
  const xpToNextLevel = level * 1000; // 1000 XP per level
  const xpInCurrentLevel = totalXP % 1000;
  const achievementsCount = progress.achievements?.length || 0;
  
  // Calculate rank based on level
  const getRank = (lvl) => {
    if (lvl >= 20) return 'Diamond';
    if (lvl >= 15) return 'Platinum';
    if (lvl >= 10) return 'Gold';
    if (lvl >= 5) return 'Silver';
    return 'Bronze';
  };
  
  const stats = {
    level,
    xp: xpInCurrentLevel,
    xpToNextLevel: 1000,
    totalPoints: totalXP,
    lessonsCompleted: completedLessons,
    totalLessons,
    streak: 0, // TODO: Implement streak tracking
    achievements: achievementsCount,
    rank: getRank(level),
    studyTime: 0 // TODO: Implement time tracking
  };

  // Get recent activity from completed lessons
  const recentActivity = Object.entries(progress.completedLessons)
    .slice(-4)
    .reverse()
    .map(([key, data]) => ({
      type: 'lesson',
      title: `${data.subject} Lesson ${data.lessonId}`,
      points: data.xpEarned || 100,
      time: new Date(data.completedAt).toLocaleString()
    }));

  // Real achievements from progress
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
    unlocked: progress.achievements?.includes(ach.id) || false
  }));

  const xpPercentage = (stats.xp / stats.xpToNextLevel) * 100;
  const lessonPercentage = (stats.lessonsCompleted / stats.totalLessons) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Header */}
      <header className="border-b border-gray-700 bg-gray-900/50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">My Dashboard</h1>
              <p className="text-gray-400 mt-1">Welcome back, {user?.email?.split('@')[0]}!</p>
            </div>
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
            >
              Back to Home
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Level & XP Card */}
        <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/50 rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                <Crown className="w-10 h-10 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold">Level {stats.level}</h2>
                <p className="text-gray-300">{stats.rank} Rank</p>
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-lg transition-all">
              <Share2 className="w-4 h-4" />
              Share Progress
            </button>
          </div>
          
          <div className="mb-2">
            <div className="flex justify-between text-sm mb-1">
              <span>{stats.xp} XP</span>
              <span>{stats.xpToNextLevel} XP</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-purple-500 to-pink-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${xpPercentage}%` }}
              />
            </div>
          </div>
          <p className="text-sm text-gray-400">{stats.xpToNextLevel - stats.xp} XP to Level {stats.level + 1}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-800/50 border border-cyan-500/30 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <Trophy className="w-6 h-6 text-yellow-400" />
              <span className="text-gray-400 text-sm">Total Points</span>
            </div>
            <p className="text-3xl font-bold">{stats.totalPoints.toLocaleString()}</p>
          </div>

          <div className="bg-gray-800/50 border border-orange-500/30 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <Flame className="w-6 h-6 text-orange-400" />
              <span className="text-gray-400 text-sm">Day Streak</span>
            </div>
            <p className="text-3xl font-bold">{stats.streak}</p>
          </div>

          <div className="bg-gray-800/50 border border-green-500/30 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <BookMarked className="w-6 h-6 text-green-400" />
              <span className="text-gray-400 text-sm">Lessons Done</span>
            </div>
            <p className="text-3xl font-bold">{stats.lessonsCompleted}/{stats.totalLessons}</p>
          </div>

          <div className="bg-gray-800/50 border border-purple-500/30 rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <Award className="w-6 h-6 text-purple-400" />
              <span className="text-gray-400 text-sm">Achievements</span>
            </div>
            <p className="text-3xl font-bold">{stats.achievements}</p>
          </div>
        </div>

        {/* Daily Challenge */}
        <div className="mb-8">
          <DailyChallenge />
        </div>

        {/* Certificate (if completed course) */}
        {stats.lessonsCompleted >= 25 && (
          <div className="mb-8">
            <CertificateGenerator 
              courseName="Rocket Mechanics Mastery" 
              completionDate={new Date().toLocaleDateString()}
              score={95}
            />
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          {/* AI Study Buddy */}
          <div>
            <AIStudyBuddy userStats={stats} />
          </div>

          {/* Progress Section */}
          <div>
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-cyan-400" />
              Learning Progress
            </h3>
            
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-6">
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

              <div className="space-y-4">
                {/* Physics */}
                {(() => {
                  const physicsCompleted = Object.keys(progress.completedLessons).filter(k => k.startsWith('physics-')).length;
                  const physicsTotal = 33;
                  const physicsPercent = Math.round((physicsCompleted / physicsTotal) * 100);
                  return physicsCompleted > 0 && (
                    <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                          <span className="text-2xl">⚛️</span>
                        </div>
                        <div>
                          <p className="font-semibold">Physics</p>
                          <p className="text-sm text-gray-400">{physicsCompleted}/{physicsTotal} lessons</p>
                        </div>
                      </div>
                      <span className="text-blue-400 font-bold">{physicsPercent}%</span>
                    </div>
                  );
                })()}
                
                {/* Mathematics */}
                {(() => {
                  const mathCompleted = Object.keys(progress.completedLessons).filter(k => k.startsWith('mathematics-')).length;
                  const mathTotal = 37;
                  const mathPercent = Math.round((mathCompleted / mathTotal) * 100);
                  return mathCompleted > 0 && (
                    <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                          <span className="text-2xl">🔢</span>
                        </div>
                        <div>
                          <p className="font-semibold">Mathematics</p>
                          <p className="text-sm text-gray-400">{mathCompleted}/{mathTotal} lessons</p>
                        </div>
                      </div>
                      <span className="text-green-400 font-bold">{mathPercent}%</span>
                    </div>
                  );
                })()}
                
                {/* Show message if no lessons completed */}
                {completedLessons === 0 && (
                  <div className="text-center py-8 text-gray-400">
                    <p>Start your first lesson to see progress here!</p>
                  </div>
                )}
              </div>
            </div>

            {/* Study Time */}
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-cyan-400" />
                <h4 className="text-lg font-semibold">Study Time</h4>
              </div>
              <p className="text-4xl font-bold mb-2">{stats.studyTime} hours</p>
              <p className="text-gray-400 text-sm">This month</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mt-8">
          {/* Recent Activity & Achievements */}
          <div>
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Zap className="w-6 h-6 text-yellow-400" />
              Recent Activity
            </h3>
            
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-6">
              <div className="space-y-3">
                {recentActivity.map((activity, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        activity.type === 'lesson' ? 'bg-cyan-500/20' :
                        activity.type === 'quiz' ? 'bg-green-500/20' :
                        activity.type === 'achievement' ? 'bg-yellow-500/20' :
                        'bg-purple-500/20'
                      }`}>
                        {activity.type === 'lesson' && '📚'}
                        {activity.type === 'quiz' && '🧠'}
                        {activity.type === 'achievement' && '🏆'}
                        {activity.type === 'challenge' && '⚡'}
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{activity.title}</p>
                        <p className="text-xs text-gray-400">{activity.time}</p>
                      </div>
                    </div>
                    <span className="text-green-400 font-bold">+{activity.points}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <Award className="w-6 h-6 text-purple-400" />
              Achievements
            </h3>
            
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
              <div className="grid grid-cols-2 gap-3">
                {achievements.map((achievement) => (
                  <div 
                    key={achievement.id}
                    className={`p-4 rounded-lg border-2 transition-all relative group ${
                      achievement.unlocked 
                        ? 'bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-yellow-500/50' 
                        : 'bg-gray-700/30 border-gray-600 opacity-50'
                    }`}
                  >
                    <div className="text-3xl mb-2">{achievement.icon}</div>
                    <p className="font-semibold text-sm mb-1">{achievement.name}</p>
                    <p className="text-xs text-gray-400">{achievement.desc}</p>
                    
                    {achievement.unlocked && (
                      <button
                        onClick={() => setShareAchievement({ 
                          title: achievement.name, 
                          description: achievement.desc,
                          icon: achievement.icon 
                        })}
                        className="absolute top-2 right-2 p-2 bg-cyan-500/20 hover:bg-cyan-500/40 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Share Achievement"
                      >
                        <Share2 className="w-4 h-4 text-cyan-400" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Share Achievement Modal */}
      {shareAchievement && (
        <ShareAchievement 
          achievement={shareAchievement} 
          onClose={() => setShareAchievement(null)} 
        />
      )}

      {/* Certificate Generator Modal */}
      {showCertificate && (
        <CertificateGenerator 
          subject={showCertificate.subject}
          totalLessons={showCertificate.totalLessons}
          onClose={() => setShowCertificate(null)} 
        />
      )}
    </div>
  );
};

export default DashboardPage;
