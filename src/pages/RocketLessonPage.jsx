import { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Rocket, CheckCircle, Brain } from 'lucide-react';
import ThrustSliderDemo from '../components/lessons/ThrustSliderDemo';
import DragVisualization from '../components/lessons/DragVisualization';
import StabilityDemo from '../components/lessons/StabilityDemo';
import OrbitalDemo from '../components/lessons/OrbitalDemo';
import CommunityQA from '../components/CommunityQA';
import EnhancedLessonContent from '../components/EnhancedLessonContent';
import LessonBreadcrumb from '../components/LessonBreadcrumb';
import LessonNavigation from '../components/LessonNavigation';
import LessonVoiceNarrator from '../components/LessonVoiceNarrator';
import rocketsLessons from '../data/rocketsLessonsData.js';
import { useProgress } from '../contexts/ProgressContext';
import MicroLessonPlayer from '../components/MicroLessonPlayer';

export default function RocketLessonPage() {
  const { lessonId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { completeLesson: saveProgress } = useProgress();
  const id = parseInt(lessonId);
  // Get the string lesson ID from query param for content lookup
  const lessonKey = searchParams.get('lesson') || lessonId;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Scroll to top when lesson changes or component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    // Also scroll on next tick to override browser scroll restoration
    setTimeout(() => window.scrollTo({ top: 0, left: 0, behavior: 'instant' }), 0);
  }, [lessonId]);

  // Scroll to top on mount to override browser scroll restoration
  useEffect(() => {
    window.history.scrollRestoration = 'manual';
    return () => {
      window.history.scrollRestoration = 'auto';
    };
  }, []);

  // Get lesson data from curriculum using string lessonKey
  const lessonData = rocketsLessons[lessonKey];

  // Save progress when quiz is completed
  useEffect(() => {
    if (quizCompleted && lessonData?.questions) {
      const totalQuestions = lessonData.questions.length;
      const percentage = (score / totalQuestions) * 100;

      saveProgress('rockets', id, {
        score,
        total: totalQuestions,
        percentage
      });
    }
  }, [quizCompleted, score, id, lessonData, saveProgress]);

  // Quiz Component - handles both old format (q/a) and new format (question/correctAnswer)
  const QuizSection = ({ questions }) => {
    if (!questions || questions.length === 0) return null;

    const question = questions[currentQuestion];
    const isLastQuestion = currentQuestion === questions.length - 1;

    // Get question text (supports both formats)
    const questionText = question.question || question.q;
    // Get correct answer (supports both formats - new uses index, old uses text)
    const correctAnswer = typeof question.correctAnswer === 'number'
      ? question.options[question.correctAnswer]
      : question.a;

    const handleAnswer = (answer) => {
      setSelectedAnswer(answer);
      setShowResult(true);
      if (answer === correctAnswer) {
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
      <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-xl p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 sm:mb-6">
          <div className="flex items-center gap-2">
            <Brain className="w-5 sm:w-6 h-5 sm:h-6 text-purple-400" />
            <h3 className="text-lg sm:text-xl font-bold">Knowledge Check</h3>
          </div>
          <div className="text-xs sm:text-sm text-gray-400">
            Question {currentQuestion + 1}/{questions.length} • Score: {score}/{questions.length}
          </div>
        </div>

        <div className="mb-4 sm:mb-6">
          <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">{questionText}</h4>
          <div className="space-y-2 sm:space-y-3">
            {question.options.map((option, idx) => {
              const isSelected = selectedAnswer === option;
              const isCorrect = option === correctAnswer;
              const showCorrect = showResult && isCorrect;
              const showWrong = showResult && isSelected && !isCorrect;

              return (
                <button
                  key={idx}
                  onClick={() => !showResult && handleAnswer(option)}
                  disabled={showResult}
                  className={`w-full p-3 sm:p-4 rounded-lg border-2 text-left transition-all text-sm sm:text-base ${showCorrect
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
                <div className="text-xl sm:text-2xl font-bold mb-2">
                  Quiz Complete! Score: {score}/{questions.length}
                </div>
                <div className="text-sm sm:text-base text-gray-400 mb-4">
                  {score === questions.length ? '🎉 Perfect!' : score >= questions.length * 0.7 ? '👍 Good job!' : '💪 Keep learning!'}
                </div>
                <button
                  onClick={() => {
                    setQuizCompleted(true);
                    setTimeout(() => navigate('/games/map/rockets'), 1000);
                  }}
                  className="px-5 sm:px-6 py-2 sm:py-3 bg-green-500 hover:bg-green-600 rounded-lg font-semibold transition-colors text-sm sm:text-base"
                >
                  Continue to Map →
                </button>
              </div>
            ) : (
              <button
                onClick={nextQuestion}
                className="px-5 sm:px-6 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg font-semibold transition-colors text-sm sm:text-base"
              >
                Next Question →
              </button>
            )}
          </div>
        )}
      </div>
    );
  };

  // Lesson content mapping with interactive demos (using string lesson IDs)
  const interactiveDemos = {
    'vectors-forces': <ThrustSliderDemo />,
    'newtons-laws': <ThrustSliderDemo />,
    'rocket-equation': <ThrustSliderDemo />,
    'orbital-mechanics-intro': <OrbitalDemo />,
    'thermodynamics-basics': <DragVisualization />,
    'fluid-dynamics-basics': <DragVisualization />,
    'materials-basics': <StabilityDemo />,
    'rocket-basics-intro': <StabilityDemo />
  };

  // Render lesson sections content
  const LessonSections = ({ sections }) => {
    if (!sections || sections.length === 0) return null;

    return (
      <div className="space-y-8">
        {sections.map((section, idx) => (
          <div key={idx} className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-xl p-6">
            <h3 className="text-xl font-bold text-cyan-400 mb-4">{section.title}</h3>
            <div className="prose prose-invert max-w-none">
              {section.content.split('\n').map((paragraph, pIdx) => (
                <p key={pIdx} className="text-gray-300 mb-3 whitespace-pre-wrap">{paragraph}</p>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Key takeaways component
  const KeyTakeaways = ({ takeaways }) => {
    if (!takeaways || takeaways.length === 0) return null;

    return (
      <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-6">
        <h3 className="text-xl font-bold text-green-400 mb-4">🎯 Key Takeaways</h3>
        <ul className="space-y-2">
          {takeaways.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2 text-gray-300">
              <span className="text-green-400 mt-1">✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  // Build lesson from data (new curriculum structure)
  const lesson = lessonData ? {
    unit: lessonData.sectionTitle || lessonData.unitTitle || 'Rocket Engineering',
    title: lessonData.title,
    description: lessonData.description || lessonData.introduction,
    content: (
      <div className="space-y-8">
        {/* Interactive Demo */}
        {interactiveDemos[lessonKey]}

        {/* Lesson Introduction */}
        {lessonData.introduction && (
          <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-xl p-6">
            <p className="text-lg text-gray-200">{lessonData.introduction}</p>
          </div>
        )}

        {/* Main Lesson Content Sections */}
        <LessonSections sections={lessonData.sections || lessonData.content?.sections} />

        {/* Key Takeaways */}
        <KeyTakeaways takeaways={lessonData.keyTakeaways || lessonData.content?.keyTakeaways} />

        {/* Enhanced Content (calculators, diagrams) */}
        <EnhancedLessonContent lessonId={lessonKey} subject="rockets" />

        {/* Quiz */}
        <QuizSection questions={lessonData.quiz?.questions || []} />
      </div>
    )
  } : {
    unit: 'Introduction',
    title: 'Welcome to Rocket Engineering',
    description: 'Start your journey into rocket science',
    content: (
      <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-xl p-8">
        <h3 className="text-2xl font-bold mb-4">🚀 Welcome to Rocket Engineering</h3>
        <p className="text-gray-300">Select a lesson from the map to begin your journey.</p>
      </div>
    )
  };

  const completeLesson = () => {
    // Mark lesson as complete (even without quiz)
    saveProgress('rockets', id);
    navigate('/games/map/rockets');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white pb-20 md:pb-0">
      {/* Header */}
      <div className="border-b border-gray-700 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
          {/* Mobile: Stack layout */}
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            {/* Title row */}
            <div className="flex items-center gap-2 sm:gap-4 min-w-0">
              <button
                onClick={() => navigate('/games/map/rockets')}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors flex-shrink-0"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <Rocket className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-400 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <div className="text-xs sm:text-sm text-cyan-400 font-semibold truncate">{lesson.unit}</div>
                <h1 className="text-base sm:text-xl font-bold truncate">{lesson.title}</h1>
              </div>
            </div>
            {/* Action buttons - horizontal scroll on mobile */}
            <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-1 -mx-3 px-3 sm:mx-0 sm:px-0 sm:overflow-visible">
              <button
                onClick={completeLesson}
                className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg font-semibold transition-colors text-sm sm:text-base whitespace-nowrap flex-shrink-0"
              >
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden xs:inline">Complete</span>
                <span className="xs:hidden">✓</span>
              </button>
              {id < Object.keys(rocketsLessons).length - 1 && (
                <button
                  onClick={() => navigate(`/games/play/rockets/lesson/${id + 1}`)}
                  className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-lg font-semibold transition-colors text-sm sm:text-base whitespace-nowrap flex-shrink-0"
                >
                  <span>Next</span>
                  <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 rotate-180" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Lesson Content */}
      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
        <LessonBreadcrumb
          subject="rockets"
          lessonId={id}
          lessonTitle={lesson.title}
        />

        {/* Micro-Lesson Player */}
        {lessonData ? (
          <MicroLessonPlayer
            subject="rockets"
            lessonData={lessonData}
            onComplete={completeLesson}
          />
        ) : (
          <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4 italic">🚀 Preparing Launch...</h3>
            <p className="text-gray-400">Loading your micro-lesson experience.</p>
          </div>
        )}


        {/* Community Q&A */}
        <div className="mt-12">
          <CommunityQA lessonId={id} />
        </div>

        {/* Enhanced Navigation */}
        <LessonNavigation
          subject="rockets"
          currentLessonId={id}
          allLessons={rocketsLessons}
        />
      </div>
    </div>
  );
}
