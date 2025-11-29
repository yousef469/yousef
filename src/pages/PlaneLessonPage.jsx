import { useState, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Plane, CheckCircle, Brain } from 'lucide-react';
import planesLessons from '../data/planes/planesLessonsData.js';
import { useProgress } from '../contexts/ProgressContext';
import EnhancedLessonContent from '../components/EnhancedLessonContent';
import LessonBreadcrumb from '../components/LessonBreadcrumb';
import LessonNavigation from '../components/LessonNavigation';

export default function PlaneLessonPage() {
  const { lessonId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { completeLesson: saveProgress } = useProgress();
  const id = parseInt(lessonId);
  const lessonKey = searchParams.get('lesson') || lessonId;
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    setTimeout(() => window.scrollTo({ top: 0, left: 0, behavior: 'instant' }), 0);
  }, [lessonId]);

  useEffect(() => {
    window.history.scrollRestoration = 'manual';
    return () => { window.history.scrollRestoration = 'auto'; };
  }, []);

  const lessonData = planesLessons[lessonKey];

  useEffect(() => {
    if (quizCompleted && lessonData?.quiz?.questions) {
      const totalQuestions = lessonData.quiz.questions.length;
      const percentage = (score / totalQuestions) * 100;
      saveProgress('planes', id, { score, total: totalQuestions, percentage });
    }
  }, [quizCompleted, score, id, lessonData, saveProgress]);

  const QuizSection = ({ questions }) => {
    if (!questions || questions.length === 0) return null;
    const question = questions[currentQuestion];
    const isLastQuestion = currentQuestion === questions.length - 1;
    const questionText = question.question || question.q;
    const correctAnswer = typeof question.correctAnswer === 'number' 
      ? question.options[question.correctAnswer] 
      : question.a;

    const handleAnswer = (answer) => {
      setSelectedAnswer(answer);
      setShowResult(true);
      if (answer === correctAnswer) setScore(score + 1);
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
          <h4 className="text-lg font-semibold mb-4">{questionText}</h4>
          <div className="space-y-3">
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
                  className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                    showCorrect ? 'border-green-500 bg-green-500/20'
                    : showWrong ? 'border-red-500 bg-red-500/20'
                    : isSelected ? 'border-purple-500 bg-purple-500/20'
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
                <div className="text-2xl font-bold mb-2">Quiz Complete! Score: {score}/{questions.length}</div>
                <div className="text-gray-400 mb-4">
                  {score === questions.length ? '🎉 Perfect!' : score >= questions.length * 0.7 ? '👍 Good job!' : '💪 Keep learning!'}
                </div>
                <button
                  onClick={() => { setQuizCompleted(true); setTimeout(() => navigate('/games/map/planes'), 1000); }}
                  className="px-6 py-3 bg-green-500 hover:bg-green-600 rounded-lg font-semibold transition-colors"
                >
                  Continue to Map →
                </button>
              </div>
            ) : (
              <button onClick={nextQuestion} className="px-6 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg font-semibold transition-colors">
                Next Question →
              </button>
            )}
          </div>
        )}
      </div>
    );
  };

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

  const lesson = lessonData ? {
    unit: lessonData.sectionTitle || lessonData.unitTitle || 'Aircraft Engineering',
    title: lessonData.title,
    description: lessonData.description || lessonData.introduction,
    content: (
      <div className="space-y-8">
        {lessonData.introduction && (
          <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-xl p-6">
            <p className="text-lg text-gray-200">{lessonData.introduction}</p>
          </div>
        )}
        <LessonSections sections={lessonData.sections} />
        <KeyTakeaways takeaways={lessonData.keyTakeaways} />
        <EnhancedLessonContent lessonId={lessonKey} subject="planes" />
        <QuizSection questions={lessonData.quiz?.questions || []} />
      </div>
    )
  } : {
    unit: 'Introduction',
    title: 'Welcome to Aircraft Engineering',
    description: 'Start your journey into aviation',
    content: (
      <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-xl p-8">
        <h3 className="text-2xl font-bold mb-4">✈️ Welcome to Aircraft Engineering</h3>
        <p className="text-gray-300">Select a lesson from the map to begin your journey.</p>
      </div>
    )
  };

  const completeLesson = () => {
    saveProgress('planes', id);
    navigate('/games/map/planes');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="border-b border-gray-700 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={() => navigate('/games/map/planes')} className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <Plane className="w-8 h-8 text-cyan-400" />
              <div>
                <div className="text-sm text-cyan-400 font-semibold">{lesson.unit}</div>
                <h1 className="text-xl font-bold">{lesson.title}</h1>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={completeLesson} className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg font-semibold transition-colors">
                <CheckCircle className="w-5 h-5" />
                <span>Complete Lesson</span>
              </button>
              {id < Object.keys(planesLessons).length - 1 && (
                <button
                  onClick={() => navigate(`/games/play/planes/lesson/${id + 1}`)}
                  className="flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-lg font-semibold transition-colors"
                >
                  <span>Next Lesson</span>
                  <ArrowLeft className="w-5 h-5 rotate-180" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <LessonBreadcrumb subject="planes" lessonId={id} lessonTitle={lesson.title} />
        <div className="mb-8">
          <p className="text-lg text-gray-300">{lesson.description}</p>
        </div>
        {lesson.content}
        <LessonNavigation subject="planes" currentLessonId={id} allLessons={planesLessons} />
      </div>
    </div>
  );
}
