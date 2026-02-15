import { useNavigate } from 'react-router-dom';
import { useProgress } from '../contexts/ProgressContext';
import { ArrowRight, Rocket, Car, Plane, Zap } from 'lucide-react';

export default function ContinueLearning() {
  const navigate = useNavigate();
  const { progress, getLastLesson, getSubjectProgress } = useProgress();

  const subjects = [
    { 
      id: 'rockets', 
      name: 'Rockets', 
      total: 28, 
      emoji: '🚀', 
      icon: Rocket,
      color: 'from-purple-500 to-indigo-500',
      path: '/games/play/rockets/lesson/'
    },
    { 
      id: 'cars', 
      name: 'Automotive', 
      total: 20, 
      emoji: '🚗', 
      icon: Car,
      color: 'from-orange-500 to-red-500',
      path: '/games/play/cars/lesson/'
    },
    { 
      id: 'planes', 
      name: 'Aircraft', 
      total: 20, 
      emoji: '✈️', 
      icon: Plane,
      color: 'from-blue-500 to-cyan-500',
      path: '/games/play/planes/lesson/'
    },
    { 
      id: 'electronics', 
      name: 'Electronics', 
      total: 20, 
      emoji: '⚡', 
      icon: Zap,
      color: 'from-yellow-500 to-orange-500',
      path: '/games/play/electronics/lesson/'
    }
  ];

  // Find subjects with progress
  const subjectsWithProgress = subjects
    .map(subject => ({
      ...subject,
      lastLesson: getLastLesson(subject.id),
      progress: getSubjectProgress(subject.id, subject.total)
    }))
    .filter(subject => subject.progress.completed > 0)
    .sort((a, b) => {
      // Sort by most recently accessed (higher lesson number = more recent)
      return b.lastLesson - a.lastLesson;
    });

  if (subjectsWithProgress.length === 0) {
    return null; // Don't show if no progress
  }

  const mostRecent = subjectsWithProgress[0];
  const Icon = mostRecent.icon;

  return (
    <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-2xl p-6 border border-purple-400/30">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold mb-1">Continue Learning</h3>
          <p className="text-sm text-gray-400">Pick up where you left off</p>
        </div>
        <Icon className="w-8 h-8 text-purple-400" />
      </div>

      {/* Most recent subject */}
      <div 
        onClick={() => navigate(`${mostRecent.path}${mostRecent.lastLesson}`)}
        className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-4 cursor-pointer hover:bg-white/20 transition-all group"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${mostRecent.color} flex items-center justify-center text-3xl`}>
              {mostRecent.emoji}
            </div>
            <div>
              <div className="font-bold text-lg">{mostRecent.name}</div>
              <div className="text-sm text-gray-400">
                Lesson {mostRecent.lastLesson + 1} • {mostRecent.progress.percentage.toFixed(0)}% Complete
              </div>
              <div className="w-48 bg-gray-700 rounded-full h-2 mt-2">
                <div 
                  className={`h-full rounded-full bg-gradient-to-r ${mostRecent.color} transition-all`}
                  style={{ width: `${mostRecent.progress.percentage}%` }}
                />
              </div>
            </div>
          </div>
          <ArrowRight className="w-6 h-6 text-purple-400 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>

      {/* Other subjects with progress */}
      {subjectsWithProgress.length > 1 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {subjectsWithProgress.slice(1).map(subject => (
            <button
              key={subject.id}
              onClick={() => navigate(`${subject.path}${subject.lastLesson}`)}
              className="bg-white/5 hover:bg-white/10 rounded-lg p-3 text-left transition-all group"
            >
              <div className="text-2xl mb-1">{subject.emoji}</div>
              <div className="text-sm font-semibold">{subject.name}</div>
              <div className="text-xs text-gray-400">
                {subject.progress.percentage.toFixed(0)}% done
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
