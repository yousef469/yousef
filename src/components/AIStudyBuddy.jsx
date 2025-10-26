import React, { useState, useEffect } from 'react';
import { Brain, TrendingUp, Target, Lightbulb, BookOpen, Zap } from 'lucide-react';

const AIStudyBuddy = ({ userStats }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [learningPath, setLearningPath] = useState(null);
  const [insights, setInsights] = useState([]);

  useEffect(() => {
    // Generate personalized recommendations based on user stats
    generateRecommendations();
    generateLearningPath();
    generateInsights();
  }, [userStats]);

  const generateRecommendations = () => {
    const recs = [
      {
        id: 1,
        type: 'lesson',
        title: 'Orbital Mechanics Advanced',
        reason: 'You scored 95% on basic orbital mechanics',
        difficulty: 'Hard',
        estimatedTime: '45 min',
        xp: 150,
        icon: '🚀'
      },
      {
        id: 2,
        type: 'practice',
        title: 'Thrust Calculation Practice',
        reason: 'Strengthen your weak area from last quiz',
        difficulty: 'Medium',
        estimatedTime: '20 min',
        xp: 75,
        icon: '🧮'
      },
      {
        id: 3,
        type: 'review',
        title: 'Review: Aerodynamic Forces',
        reason: 'You learned this 2 weeks ago',
        difficulty: 'Easy',
        estimatedTime: '15 min',
        xp: 50,
        icon: '✈️'
      }
    ];
    setRecommendations(recs);
  };

  const generateLearningPath = () => {
    const path = {
      currentLevel: 'Intermediate',
      nextMilestone: 'Advanced Rocketry',
      progress: 65,
      steps: [
        { id: 1, title: 'Master Orbital Mechanics', completed: true },
        { id: 2, title: 'Understand Staging', completed: true },
        { id: 3, title: 'Learn Reentry Physics', completed: false, current: true },
        { id: 4, title: 'Advanced Propulsion', completed: false },
        { id: 5, title: 'Mission Planning', completed: false }
      ]
    };
    setLearningPath(path);
  };

  const generateInsights = () => {
    const insightsList = [
      {
        id: 1,
        type: 'strength',
        icon: '💪',
        title: 'Strong in Theory',
        description: 'You excel at conceptual questions (92% avg)',
        color: 'green'
      },
      {
        id: 2,
        type: 'improvement',
        icon: '📈',
        title: 'Practice Calculations',
        description: 'Math problems need more practice (68% avg)',
        color: 'orange'
      },
      {
        id: 3,
        type: 'habit',
        icon: '⏰',
        title: 'Best Study Time',
        description: 'You learn best between 2-4 PM',
        color: 'blue'
      },
      {
        id: 4,
        type: 'streak',
        icon: '🔥',
        title: 'Consistency Matters',
        description: 'Your 7-day streak boosted retention by 35%',
        color: 'red'
      }
    ];
    setInsights(insightsList);
  };

  return (
    <div className="space-y-6">
      {/* AI Study Buddy Header */}
      <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/50 rounded-xl p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">AI Study Buddy</h2>
            <p className="text-gray-300">Your personalized learning assistant</p>
          </div>
        </div>
        
        <div className="bg-gray-900/50 rounded-lg p-4">
          <p className="text-gray-300 mb-2">
            <span className="text-cyan-400 font-semibold">Good afternoon!</span> Based on your progress, 
            I've prepared a personalized study plan for you today.
          </p>
          <p className="text-sm text-gray-400">
            You're on track to reach <span className="text-purple-400 font-semibold">Level 13</span> by this weekend! 🎯
          </p>
        </div>
      </div>

      {/* Personalized Recommendations */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Lightbulb className="w-6 h-6 text-yellow-400" />
          Recommended For You
        </h3>
        
        <div className="space-y-3">
          {recommendations.map((rec) => (
            <div 
              key={rec.id}
              className="bg-gray-700/50 rounded-lg p-4 hover:bg-gray-700 transition-all cursor-pointer border-l-4 border-cyan-500"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <div className="text-3xl">{rec.icon}</div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-white mb-1">{rec.title}</h4>
                    <p className="text-sm text-gray-400 mb-2">{rec.reason}</p>
                    <div className="flex items-center gap-3 text-xs">
                      <span className={`px-2 py-1 rounded ${
                        rec.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                        rec.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {rec.difficulty}
                      </span>
                      <span className="text-gray-400">⏱️ {rec.estimatedTime}</span>
                      <span className="text-cyan-400">+{rec.xp} XP</span>
                    </div>
                  </div>
                </div>
                <button className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-lg text-sm font-semibold transition-colors">
                  Start
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Learning Path */}
      {learningPath && (
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Target className="w-6 h-6 text-cyan-400" />
            Your Learning Path
          </h3>
          
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">Progress to {learningPath.nextMilestone}</span>
              <span className="text-cyan-400 font-bold">{learningPath.progress}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-cyan-500 to-blue-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${learningPath.progress}%` }}
              />
            </div>
          </div>

          <div className="space-y-3">
            {learningPath.steps.map((step, index) => (
              <div 
                key={step.id}
                className={`flex items-center gap-4 p-3 rounded-lg ${
                  step.completed ? 'bg-green-500/10' :
                  step.current ? 'bg-cyan-500/10 border border-cyan-500/30' :
                  'bg-gray-700/30'
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  step.completed ? 'bg-green-500 text-white' :
                  step.current ? 'bg-cyan-500 text-white' :
                  'bg-gray-600 text-gray-400'
                }`}>
                  {step.completed ? '✓' : index + 1}
                </div>
                <div className="flex-1">
                  <p className={`font-semibold ${
                    step.completed ? 'text-green-400' :
                    step.current ? 'text-cyan-400' :
                    'text-gray-400'
                  }`}>
                    {step.title}
                  </p>
                  {step.current && (
                    <p className="text-xs text-gray-400 mt-1">Currently learning</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AI Insights */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-green-400" />
          AI Insights
        </h3>
        
        <div className="grid md:grid-cols-2 gap-4">
          {insights.map((insight) => (
            <div 
              key={insight.id}
              className={`bg-${insight.color}-500/10 border border-${insight.color}-500/30 rounded-lg p-4`}
            >
              <div className="flex items-start gap-3">
                <div className="text-2xl">{insight.icon}</div>
                <div>
                  <h4 className={`font-semibold text-${insight.color}-400 mb-1`}>
                    {insight.title}
                  </h4>
                  <p className="text-sm text-gray-300">{insight.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Zap className="w-6 h-6 text-yellow-400" />
          Quick Actions
        </h3>
        
        <div className="grid grid-cols-2 gap-3">
          <button className="p-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-lg transition-all">
            <BookOpen className="w-6 h-6 mx-auto mb-2" />
            <p className="text-sm font-semibold">Continue Learning</p>
          </button>
          <button className="p-4 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 rounded-lg transition-all">
            <Target className="w-6 h-6 mx-auto mb-2" />
            <p className="text-sm font-semibold">Take Quiz</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIStudyBuddy;
