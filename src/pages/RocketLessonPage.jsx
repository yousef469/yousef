import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Rocket, CheckCircle, Brain } from 'lucide-react';
import ThrustSliderDemo from '../components/lessons/ThrustSliderDemo';
import DragVisualization from '../components/lessons/DragVisualization';
import StabilityDemo from '../components/lessons/StabilityDemo';
import OrbitalDemo from '../components/lessons/OrbitalDemo';
import { rocketLessons } from '../data/rocketLessonsData';

export default function RocketLessonPage() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const id = parseInt(lessonId);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  // Get lesson data from curriculum
  const lessonData = rocketLessons[id];

  // Quiz Component
  const QuizSection = ({ questions }) => {
    if (!questions || questions.length === 0) return null;

    const question = questions[currentQuestion];
    const isLastQuestion = currentQuestion === questions.length - 1;

    const handleAnswer = (answer) => {
      setSelectedAnswer(answer);
      setShowResult(true);
      if (answer === question.a) {
        setScore(score + 1);
      }
    };

    const nextQuestion = () => {
      if (!isLastQuestion) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      }
    };

    return (
      <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Brain className="w-6 h-6 text-purple-400" />
            <h3 className="text-xl font-bold">Knowledge Check</h3>
          </div>
          <div className="text-sm text-gray-400">
            Question {currentQuestion + 1}/{questions.length} • Score: {score}/{questions.length}
          </div>
        </div>

        <div className="mb-6">
          <h4 className="text-lg font-semibold mb-4">{question.q}</h4>
          <div className="space-y-3">
            {question.options.map((option, idx) => {
              const isSelected = selectedAnswer === option;
              const isCorrect = option === question.a;
              const showCorrect = showResult && isCorrect;
              const showWrong = showResult && isSelected && !isCorrect;

              return (
                <button
                  key={idx}
                  onClick={() => !showResult && handleAnswer(option)}
                  disabled={showResult}
                  className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                    showCorrect
                      ? 'border-green-500 bg-green-500/20'
                      : showWrong
                      ? 'border-red-500 bg-red-500/20'
                      : isSelected
                      ? 'border-purple-500 bg-purple-500/20'
                      : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>

        {showResult && (
          <div className="flex justify-end">
            {isLastQuestion ? (
              <div className="text-center w-full">
                <div className="text-2xl font-bold mb-2">
                  Quiz Complete! Score: {score}/{questions.length}
                </div>
                <div className="text-gray-400">
                  {score === questions.length ? '🎉 Perfect!' : score >= questions.length * 0.7 ? '👍 Good job!' : '💪 Keep learning!'}
                </div>
              </div>
            ) : (
              <button
                onClick={nextQuestion}
                className="px-6 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg font-semibold transition-colors"
              >
                Next Question →
              </button>
            )}
          </div>
        )}
      </div>
    );
  };

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
      title: lessonData?.title || 'Newton\'s Laws of Motion',
      description: lessonData?.concept || 'Understanding the fundamental forces that make rockets fly',
      content: (
        <div className="space-y-8">
          <ThrustSliderDemo />
          {lessonData && <QuizSection questions={lessonData.questions} />}
        </div>
      )
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

  // Get lesson from data or use default
  const lesson = lessons[id] || (lessonData ? {
    unit: `Module ${lessonData.module}`,
    title: lessonData.title,
    description: lessonData.concept,
    content: <QuizSection questions={lessonData.questions} />
  } : {
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
  });

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
