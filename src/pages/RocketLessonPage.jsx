import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Rocket, CheckCircle } from 'lucide-react';
import ThrustSliderDemo from '../components/lessons/ThrustSliderDemo';
import DragVisualization from '../components/lessons/DragVisualization';
import StabilityDemo from '../components/lessons/StabilityDemo';
import OrbitalDemo from '../components/lessons/OrbitalDemo';

export default function RocketLessonPage() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const id = parseInt(lessonId);

  // Lesson content mapping
  const lessons = {
    0: {
      unit: 'Introduction',
      title: 'Welcome to Rocket Engineering',
      description: 'Learn the basics of how rockets work and what makes them fly',
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-xl p-8">
            <h3 className="text-2xl font-bold mb-4">🚀 What You'll Learn</h3>
            <div className="grid md:grid-cols-2 gap-6 text-gray-300">
              <div>
                <h4 className="font-semibold text-cyan-400 mb-2">Unit 1: Flight Dynamics</h4>
                <p className="text-sm">Forces, thrust, mass, and the rocket equation</p>
              </div>
              <div>
                <h4 className="font-semibold text-blue-400 mb-2">Unit 2: Aerodynamics</h4>
                <p className="text-sm">Drag, streamlines, and nose cone design</p>
              </div>
              <div>
                <h4 className="font-semibold text-purple-400 mb-2">Unit 3: Stability</h4>
                <p className="text-sm">Balance, control, and keeping rockets straight</p>
              </div>
              <div>
                <h4 className="font-semibold text-green-400 mb-2">Unit 4: Orbital Mechanics</h4>
                <p className="text-sm">Getting to space and staying there</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    1: {
      unit: 'Flight Dynamics',
      title: 'Newton\'s Laws of Motion',
      description: 'Understanding the fundamental forces that make rockets fly',
      content: <ThrustSliderDemo />
    },
    2: {
      unit: 'Flight Dynamics',
      title: 'Thrust & Propulsion',
      description: 'How rocket engines generate thrust',
      content: <ThrustSliderDemo />
    },
    7: {
      unit: 'Aerodynamics',
      title: 'Drag Forces',
      description: 'Understanding air resistance and how to minimize it',
      content: <DragVisualization />
    },
    8: {
      unit: 'Aerodynamics',
      title: 'Nose Cone Design',
      description: 'Why shape matters for high-speed flight',
      content: <DragVisualization />
    },
    13: {
      unit: 'Stability & Control',
      title: 'Center of Gravity',
      description: 'Understanding balance in rocket design',
      content: <StabilityDemo />
    },
    14: {
      unit: 'Stability & Control',
      title: 'Center of Pressure',
      description: 'Where aerodynamic forces act on the rocket',
      content: <StabilityDemo />
    },
    19: {
      unit: 'Orbital Mechanics',
      title: 'Kepler\'s Laws',
      description: 'The mathematics of orbital motion',
      content: <OrbitalDemo />
    },
    20: {
      unit: 'Orbital Mechanics',
      title: 'Orbital Elements',
      description: 'Describing orbits with precision',
      content: <OrbitalDemo />
    }
  };

  // Default lesson for IDs not specifically defined
  const lesson = lessons[id] || {
    unit: 'Rocket Engineering',
    title: `Lesson ${id}`,
    description: 'Interactive rocket engineering lesson',
    content: (
      <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-xl p-8 text-center">
        <Rocket className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-4">Lesson Content Coming Soon</h3>
        <p className="text-gray-400 mb-6">
          This lesson is being developed. Check back soon for interactive demos and challenges!
        </p>
      </div>
    )
  };

  const completeLesson = () => {
    // TODO: Save progress to Supabase
    navigate('/games/map/rockets');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Header */}
      <div className="border-b border-gray-700 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/games/map/rockets')}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <Rocket className="w-8 h-8 text-cyan-400" />
              <div>
                <div className="text-sm text-cyan-400 font-semibold">{lesson.unit}</div>
                <h1 className="text-xl font-bold">{lesson.title}</h1>
              </div>
            </div>
            <button
              onClick={completeLesson}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg font-semibold transition-colors"
            >
              <CheckCircle className="w-5 h-5" />
              <span>Complete Lesson</span>
            </button>
          </div>
        </div>
      </div>

      {/* Lesson Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <p className="text-lg text-gray-300">{lesson.description}</p>
        </div>

        {lesson.content}

        {/* Navigation */}
        <div className="mt-8 flex justify-between items-center">
          <button
            onClick={() => id > 0 && navigate(`/lessons/rockets/${id - 1}`)}
            disabled={id === 0}
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:cursor-not-allowed rounded-lg font-semibold transition-colors"
          >
            ← Previous Lesson
          </button>
          <button
            onClick={() => id < 24 && navigate(`/lessons/rockets/${id + 1}`)}
            disabled={id === 24}
            className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-800 disabled:cursor-not-allowed rounded-lg font-semibold transition-colors"
          >
            Next Lesson →
          </button>
        </div>
      </div>
    </div>
  );
}
