import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Lock, CheckCircle, Play } from 'lucide-react';
import { useProgress } from '../contexts/ProgressContext';

export default function LearningHubPage() {
  const navigate = useNavigate();
  const { lessonsCompleted } = useProgress();
  
  const units = [
    {
      id: 1,
      title: "Introduction to Engineering",
      description: "Discover what engineers do, learn the design process, and explore different engineering fields.",
      lessons: 6,
      emoji: "🔧",
      color: "from-blue-600 to-cyan-600",
      unlocked: true
    },
    {
      id: 2,
      title: "Physics Basics",
      description: "Master fundamental physics concepts: forces, motion, energy, and more.",
      lessons: 6,
      emoji: "⚡",
      color: "from-purple-600 to-pink-600",
      unlocked: false,
      comingSoon: true
    },
    {
      id: 3,
      title: "Mathematics for Engineers",
      description: "Build your mathematical toolkit with algebra, trigonometry, and calculus basics.",
      lessons: 6,
      emoji: "📐",
      color: "from-green-600 to-emerald-600",
      unlocked: false,
      comingSoon: true
    },
    {
      id: 4,
      title: "Basics of Flight",
      description: "Understand how aircraft fly, from the four forces to flight instruments.",
      lessons: 6,
      emoji: "✈️",
      color: "from-sky-600 to-blue-600",
      unlocked: false,
      comingSoon: true
    },
    {
      id: 5,
      title: "Aircraft Components",
      description: "Explore aircraft structures from wings and fuselage to landing gear.",
      lessons: 6,
      emoji: "🛩️",
      color: "from-orange-600 to-red-600",
      unlocked: false,
      comingSoon: true
    },
    {
      id: 6,
      title: "Materials & Tools",
      description: "Learn about aerospace materials and the tools engineers use.",
      lessons: 6,
      emoji: "🔨",
      color: "from-yellow-600 to-orange-600",
      unlocked: false,
      comingSoon: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Header */}
      <div className="border-b border-gray-700 bg-gray-900/50 backdrop-blur sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Page Header */}
        <div className="mb-12 text-center">
          <div className="inline-block px-4 py-2 bg-purple-600/20 border border-purple-500/30 rounded-full text-purple-300 text-sm font-semibold mb-4">
            Level 1 - Beginner
          </div>
          <h1 className="text-5xl font-bold mb-4">Learning Hub</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Start your engineering journey with these foundational units. Complete lessons to unlock new content!
          </p>
        </div>

        {/* Units Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {units.map((unit) => (
            <div
              key={unit.id}
              className={`bg-gray-800 rounded-xl border transition-all ${
                unit.unlocked
                  ? 'border-gray-700 hover:border-purple-500 cursor-pointer transform hover:scale-105'
                  : 'border-gray-800 opacity-70'
              }`}
              onClick={() => unit.unlocked && navigate(`/learn/unit/${unit.id}`)}
            >
              <div className={`h-2 rounded-t-xl bg-gradient-to-r ${unit.color}`} />
              
              <div className="p-6">
                {/* Unit Icon */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center text-4xl ${
                    unit.unlocked
                      ? `bg-gradient-to-br ${unit.color}`
                      : 'bg-gray-700'
                  }`}>
                    {unit.unlocked ? unit.emoji : <Lock className="w-8 h-8 text-gray-500" />}
                  </div>
                  
                  {unit.comingSoon && (
                    <span className="px-3 py-1 bg-yellow-600/20 border border-yellow-500/30 rounded-full text-yellow-300 text-xs font-semibold">
                      Coming Soon
                    </span>
                  )}
                </div>

                {/* Unit Info */}
                <h3 className="text-2xl font-bold mb-2">{unit.title}</h3>
                <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                  {unit.description}
                </p>

                {/* Stats */}
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4" />
                    <span>{unit.lessons} Lessons</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Play className="w-4 h-4" />
                    <span>~{unit.lessons * 15} min</span>
                  </div>
                </div>

                {/* Action Button */}
                {unit.unlocked ? (
                  <button className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-lg font-semibold transition-all">
                    Start Learning
                  </button>
                ) : (
                  <div className="w-full px-4 py-3 bg-gray-700 rounded-lg text-center text-gray-400 flex items-center justify-center gap-2">
                    <Lock className="w-4 h-4" />
                    <span>Locked</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Progress Summary */}
        <div className="mt-12 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-xl p-8 border border-purple-500/30">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-2">Your Progress</h3>
              <p className="text-gray-300">Keep learning to unlock more units!</p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-purple-400 mb-1">
                {lessonsCompleted}
              </div>
              <div className="text-sm text-gray-400">Lessons Completed</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
