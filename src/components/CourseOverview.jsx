import { Clock, BookOpen, Target, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const courseData = {
  physics: {
    title: 'Physics Engineering',
    icon: '⚛️',
    color: 'from-blue-400 to-indigo-500',
    lessons: 33,
    estimatedTime: '25-30 hours',
    description: 'Master the fundamental principles of physics applied to engineering, from mechanics to thermodynamics.',
    topics: [
      'Mechanics & Motion',
      'Work, Energy & Power',
      'Fluids & Pressure',
      'Thermodynamics',
      'Waves, Electricity & Magnetism',
      'Materials & Structures'
    ],
    mapRoute: '/learn/physics/engineering/map'
  },
  mathematics: {
    title: 'Mathematics Engineering',
    icon: '🔢',
    color: 'from-green-400 to-emerald-500',
    lessons: 37,
    estimatedTime: '30-35 hours',
    description: 'Build a strong mathematical foundation for engineering with algebra, calculus, and applied mathematics.',
    topics: [
      'Algebra & Equations',
      'Geometry & Trigonometry',
      'Calculus (Derivatives & Integrals)',
      'Linear Algebra',
      'Statistics & Data',
      'Advanced Calculus',
      'Differential Equations'
    ],
    mapRoute: '/learn/mathematics/engineering/map'
  },
  electronics: {
    title: 'Electronics & Robotics',
    icon: '⚡',
    color: 'from-yellow-400 to-orange-500',
    lessons: 20,
    estimatedTime: '15-20 hours',
    description: 'Learn electronics fundamentals, circuit design, embedded systems, and robotics automation.',
    topics: [
      'Electronics Foundations',
      'Power & Motors',
      'Embedded Control Systems',
      'Robotics & Automation'
    ],
    mapRoute: '/learn/electronics/map'
  },
  rockets: {
    title: 'Rocket Engineering',
    icon: '🚀',
    color: 'from-orange-400 to-red-500',
    lessons: 28,
    estimatedTime: '20-25 hours',
    description: 'Explore rocket propulsion, orbital mechanics, and spacecraft design from basics to advanced concepts.',
    topics: [
      'Rocket Foundations',
      'Propulsion Systems',
      'Orbital Mechanics',
      'Advanced Rocketry'
    ],
    mapRoute: '/games/map/rockets'
  },
  planes: {
    title: 'Aircraft Engineering',
    icon: '✈️',
    color: 'from-cyan-400 to-blue-500',
    lessons: 20,
    estimatedTime: '15-20 hours',
    description: 'Understand aerodynamics, aircraft structures, and flight mechanics for aviation engineering.',
    topics: [
      'Aerodynamics Foundations',
      'Aircraft Structures',
      'Flight Mechanics',
      'Advanced Aviation'
    ],
    mapRoute: '/games/map/planes'
  },
  cars: {
    title: 'Automotive Engineering',
    icon: '🚗',
    color: 'from-purple-400 to-pink-500',
    lessons: 20,
    estimatedTime: '15-20 hours',
    description: 'Master vehicle dynamics, powertrain systems, and automotive design principles.',
    topics: [
      'Foundations: Math & Physics',
      'Vehicle Dynamics',
      'Powertrain Systems',
      'Systems & Design'
    ],
    mapRoute: '/games/map/cars'
  }
};

export default function CourseOverview({ courseId, onClose }) {
  const navigate = useNavigate();
  const course = courseData[courseId];

  if (!course) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl max-w-2xl w-full border border-gray-700 shadow-2xl">
        {/* Header */}
        <div className={`bg-gradient-to-r ${course.color} p-6 rounded-t-2xl`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-6xl">{course.icon}</div>
              <div>
                <h2 className="text-3xl font-bold text-white">{course.title}</h2>
                <p className="text-white/80 mt-1">{course.description}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white text-2xl"
            >
              ×
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 text-white">
          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center gap-2 text-cyan-400 mb-2">
                <BookOpen className="w-5 h-5" />
                <span className="text-sm font-semibold">Total Lessons</span>
              </div>
              <p className="text-2xl font-bold">{course.lessons}</p>
            </div>
            <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center gap-2 text-purple-400 mb-2">
                <Clock className="w-5 h-5" />
                <span className="text-sm font-semibold">Estimated Time</span>
              </div>
              <p className="text-2xl font-bold">{course.estimatedTime}</p>
            </div>
          </div>

          {/* Topics */}
          <div className="mb-6">
            <div className="flex items-center gap-2 text-yellow-400 mb-3">
              <Target className="w-5 h-5" />
              <h3 className="text-lg font-semibold">What You'll Learn</h3>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {course.topics.map((topic, index) => (
                <div key={index} className="flex items-center gap-2 text-gray-300">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                  <span>{topic}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => navigate(course.mapRoute)}
              className={`flex-1 bg-gradient-to-r ${course.color} hover:opacity-90 text-white py-3 px-6 rounded-lg font-bold flex items-center justify-center gap-2 transition-all`}
            >
              Start Learning
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
