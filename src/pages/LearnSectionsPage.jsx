import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Trophy, Flame, Star, BookOpen, Clock, ChevronRight } from 'lucide-react';
import { useProgress } from '../contexts/ProgressContext';
import Leaderboard from '../components/Leaderboard';

export default function LearnSectionsPage() {
  const navigate = useNavigate();
  const { userProfile, getSubjectProgress } = useProgress();
  const recommendation = localStorage.getItem('onboarding_recommendation');

  const subjects = [
    {
      title: 'Rockets',
      icon: '🚀',
      color: 'from-orange-500 to-red-600',
      bgGlow: 'shadow-orange-500/30',
      path: '/games/map/rockets',
      lessons: 50,
      description: 'Rocket science & aerospace'
    },
    {
      title: 'Planes',
      icon: '✈️',
      color: 'from-blue-500 to-indigo-600',
      bgGlow: 'shadow-blue-500/30',
      path: '/games/map/planes',
      lessons: 50,
      description: 'Aircraft design & aviation'
    },
    {
      title: 'Cars',
      icon: '🚗',
      color: 'from-purple-500 to-pink-600',
      bgGlow: 'shadow-purple-500/30',
      path: '/games/map/cars',
      lessons: 50,
      description: 'Automotive engineering'
    },
    {
      title: 'Electronics',
      icon: '⚡',
      color: 'from-teal-500 to-cyan-600',
      bgGlow: 'shadow-teal-500/30',
      path: '/games/map/electronics',
      lessons: 50,
      description: 'Circuits & robotics'
    },
    {
      title: 'Civil',
      icon: '🏗️',
      color: 'from-amber-500 to-orange-600',
      bgGlow: 'shadow-amber-500/30',
      path: '/games/map/civil',
      lessons: 50,
      description: 'Structures & infrastructure'
    }
  ];

  const totalLessons = subjects.reduce((sum, s) => sum + s.lessons, 0);
  const totalCompleted = subjects.reduce((sum, s) => {
    const progress = getSubjectProgress(s.title.toLowerCase(), s.lessons);
    return sum + progress.completed;
  }, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 text-white pb-24 md:pb-8">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Header */}
      <div className="relative z-10 border-b border-white/10 bg-gray-900/80 backdrop-blur-xl sticky top-0">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/home')}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Home</span>
            </button>

            {/* User Stats */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                <Flame className="w-4 h-4 text-orange-400" />
                <span className="text-sm font-medium">{userProfile?.streak || 0}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
                <Star className="w-4 h-4 text-yellow-400" />
                <span className="text-sm font-medium">{userProfile?.total_xp || 0} XP</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent">
            Learning Journeys
          </h1>
          <p className="text-gray-400 text-sm sm:text-base max-w-md mx-auto">
            Master engineering through interactive lessons and hands-on projects
          </p>
        </div>

        {/* Overall Progress Card */}
        <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-2xl p-5 mb-8 border border-white/10 backdrop-blur-sm">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Trophy className="w-7 h-7 text-white" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Your Progress</div>
                <div className="text-2xl font-bold">{totalCompleted} / {totalLessons} lessons</div>
              </div>
            </div>
            <div className="w-full sm:w-48">
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>Overall</span>
                <span>{totalLessons > 0 ? Math.round((totalCompleted / totalLessons) * 100) : 0}%</span>
              </div>
              <div className="h-2.5 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full transition-all duration-500"
                  style={{ width: `${totalLessons > 0 ? (totalCompleted / totalLessons) * 100 : 0}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid with Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Subjects */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {subjects.map((subject) => {
                const progress = getSubjectProgress(subject.title.toLowerCase(), subject.lessons);
                const progressPercent = Math.round(progress.percentage);

                return (
                  <button
                    key={subject.title}
                    onClick={() => navigate(subject.path)}
                    className={`group relative bg-gray-800/50 backdrop-blur-sm rounded-3xl p-5 sm:p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-xl ${subject.bgGlow} text-left overflow-hidden hover-tilt`}
                  >
                    {/* Gradient Overlay on Hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${subject.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl`} />

                    {/* Recommendation Badge */}
                    {recommendation === subject.title.toLowerCase() && (
                      <div className="absolute top-4 left-4 z-20">
                        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-lg animate-bounce">
                          RECOMMENDED
                        </div>
                      </div>
                    )}

                    {/* Progress Ring Background */}
                    <div className="absolute -right-8 -top-8 w-32 h-32 opacity-10">
                      <svg className="w-full h-full" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" className="text-white/20" />
                        <circle
                          cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8"
                          className={`text-white`}
                          strokeDasharray={`${progressPercent * 2.83} 283`}
                          strokeLinecap="round"
                          transform="rotate(-90 50 50)"
                        />
                      </svg>
                    </div>

                    <div className="relative z-10">
                      {/* Icon & Title */}
                      <div className="flex items-start justify-between mb-4">
                        <div className={`w-14 h-14 bg-gradient-to-br ${subject.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          <span className="text-2xl">{subject.icon}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-400">
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>{subject.lessons}</span>
                        </div>
                      </div>

                      {/* Title & Description */}
                      <h3 className="text-lg sm:text-xl font-bold mb-1 group-hover:text-white transition-colors">
                        {subject.title}
                      </h3>
                      <p className="text-gray-400 text-sm mb-4">{subject.description}</p>

                      {/* Progress Bar */}
                      <div className="mb-3">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-500">{progress.completed} completed</span>
                          <span className={`font-medium ${progressPercent > 0 ? 'text-cyan-400' : 'text-gray-500'}`}>
                            {progressPercent}%
                          </span>
                        </div>
                        <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className={`h-full bg-gradient-to-r ${subject.color} rounded-full transition-all duration-500`}
                            style={{ width: `${progressPercent}%` }}
                          />
                        </div>
                      </div>

                      {/* CTA */}
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-400 group-hover:text-white transition-colors">
                          {progress.completed === 0 ? 'Start Learning' : 'Continue'}
                        </span>
                        <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Sidebar (Leaderboard) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="sticky top-24">
              <Leaderboard />

              {/* Additional Sidebar Info */}
              <div className="mt-6 bg-gray-800/30 rounded-2xl p-6 border border-white/5">
                <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  Weekly Tips
                </h4>
                <p className="text-sm text-gray-400 italic">
                  "Spending 15 minutes a day is more effective than a 4-hour marathon. Keep your streak alive!"
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-3 mt-8">
          <div className="bg-gray-800/30 rounded-xl p-4 text-center border border-white/5">
            <div className="text-2xl sm:text-3xl font-bold text-cyan-400">{totalLessons}</div>
            <div className="text-xs text-gray-500">Total Lessons</div>
          </div>
          <div className="bg-gray-800/30 rounded-xl p-4 text-center border border-white/5">
            <div className="text-2xl sm:text-3xl font-bold text-purple-400">6</div>
            <div className="text-xs text-gray-500">Subjects</div>
          </div>
          <div className="bg-gray-800/30 rounded-xl p-4 text-center border border-white/5">
            <div className="text-2xl sm:text-3xl font-bold text-green-400">{userProfile?.level || 1}</div>
            <div className="text-xs text-gray-500">Your Level</div>
          </div>
        </div>
      </div>
    </div>
  );
}
