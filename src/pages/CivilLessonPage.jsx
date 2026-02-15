import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle, Clock, Brain, XCircle } from 'lucide-react';
import civilLessons from '../data/civilLessonsData';
import { useProgress } from '../contexts/ProgressContext';
import EnhancedLessonContent from '../components/EnhancedLessonContent';
import LessonBreadcrumb from '../components/LessonBreadcrumb';
import LessonNavigation from '../components/LessonNavigation';
import LessonVoiceNarrator from '../components/LessonVoiceNarrator';
import MicroLessonPlayer from '../components/MicroLessonPlayer';

export default function CivilLessonPage() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const [lessonCompleted, setLessonCompleted] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    setTimeout(() => window.scrollTo({ top: 0, left: 0, behavior: 'instant' }), 0);
  }, [lessonId]);

  useEffect(() => {
    window.history.scrollRestoration = 'manual';
    return () => {
      window.history.scrollRestoration = 'auto';
    };
  }, []);

  const lesson = civilLessons[parseInt(lessonId)];
  const { completeLesson } = useProgress();

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Lesson Not Found</h1>
          <button
            onClick={() => navigate('/games/map/civil')}
            className="px-6 py-3 bg-amber-500 hover:bg-amber-600 rounded-lg transition-colors"
          >
            Back to Map
          </button>
        </div>
      </div>
    );
  }

  const totalSections = lesson.content.sections.length;
  const isLastSection = currentSection === totalSections - 1;
  const hasQuiz = lesson.quiz && lesson.quiz.questions && lesson.quiz.questions.length > 0;

  const handleNext = async () => {
    if (isLastSection && !showQuiz && hasQuiz) {
      setShowQuiz(true);
    } else if (showQuiz && currentQuestion < lesson.quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else if (showQuiz && currentQuestion === lesson.quiz.questions.length - 1) {
      if (!lessonCompleted) {
        const totalQuestions = lesson.quiz.questions.length;
        const percentage = (quizScore / totalQuestions) * 100;

        completeLesson('civil', parseInt(lessonId), {
          score: quizScore,
          total: totalQuestions,
          percentage
        });

        setLessonCompleted(true);
      }
      navigate('/games/map/civil');
    } else {
      setCurrentSection(currentSection + 1);
    }
  };

  const handlePrevious = () => {
    if (showQuiz && currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(null);
    } else if (showQuiz && currentQuestion === 0) {
      setShowQuiz(false);
      setCurrentQuestion(0);
      setSelectedAnswer(null);
    } else if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const handleAnswerSelect = (answerIndex) => {
    if (answeredQuestions.includes(currentQuestion)) return;

    setSelectedAnswer(answerIndex);
    const question = lesson.quiz.questions[currentQuestion];
    if (answerIndex === question.correctAnswer) {
      setQuizScore(quizScore + 1);
    }
    setAnsweredQuestions([...answeredQuestions, currentQuestion]);
  };

  const currentContent = lesson.content.sections[currentSection];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-900 via-stone-900 to-gray-900 text-white">
      {/* Header */}
      <div className="border-b border-white/20 bg-black/30 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/games/map/civil')}
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Back to Map</span>
            </button>

            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-amber-300" />
              <span className="text-sm">{lesson.duration}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Lesson Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 pb-24">
        <LessonBreadcrumb
          subject="civil"
          lessonId={lessonId}
          lessonTitle={lesson.title}
        />

        {/* Lesson Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="text-4xl sm:text-6xl">🏗️</div>
            <div>
              <div className="text-xs sm:text-sm text-white/60 mb-1">
                {lesson.level} • Lesson {parseInt(lessonId) + 1}
              </div>
              <h1 className="text-2xl sm:text-4xl font-bold">{lesson.title}</h1>
              <div className="text-sm sm:text-lg text-white/80 mt-2">{lesson.unit}</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-white/20 rounded-full h-2 mt-4 sm:mt-6">
            <div
              className="bg-gradient-to-r from-amber-400 to-orange-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentSection + 1) / totalSections) * 100}%` }}
            />
          </div>
          <div className="text-xs sm:text-sm text-white/60 mt-2 text-center">
            Section {currentSection + 1} of {totalSections}
          </div>
        </div>

        {/* Voice Narrator */}
        <div className="mb-6">
          <LessonVoiceNarrator lessonData={{
            title: lesson.title,
            introduction: lesson.content?.introduction,
            sections: lesson.content?.sections,
            keyTakeaways: lesson.content?.keyTakeaways
          }} />
        </div>

        {/* Micro-Lesson Player */}
        <MicroLessonPlayer
          subject="civil"
          lessonData={lesson}
          onComplete={() => {
            completeLesson('civil', parseInt(lessonId));
            navigate('/games/map/civil');
          }}
        />

        <LessonNavigation
          subject="civil"
          currentLessonId={lessonId}
          allLessons={civilLessons}
        />
      </div>
    </div>
  );
}
