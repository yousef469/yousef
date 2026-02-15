import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle, Clock, Brain, XCircle } from 'lucide-react';
import electronicsLessons from '../data/electronicsLessonsData';
import { useProgress } from '../contexts/ProgressContext';
import EnhancedLessonContent from '../components/EnhancedLessonContent';
import LessonBreadcrumb from '../components/LessonBreadcrumb';
import LessonNavigation from '../components/LessonNavigation';
import LessonVoiceNarrator from '../components/LessonVoiceNarrator';

export default function ElectronicsLessonPage() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState(0);
  const [lessonCompleted, setLessonCompleted] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizScore, setQuizScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  
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
  
  const lesson = electronicsLessons[parseInt(lessonId)];
  const { completeLesson } = useProgress();
  
  if (!lesson) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Lesson Not Found</h1>
          <button
            onClick={() => navigate('/games/map/electronics')}
            className="px-6 py-3 bg-purple-500 hover:bg-purple-600 rounded-lg transition-colors"
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
      // Show quiz after last section
      setShowQuiz(true);
    } else if (showQuiz && currentQuestion < lesson.quiz.questions.length - 1) {
      // Move to next quiz question
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else if (showQuiz && currentQuestion === lesson.quiz.questions.length - 1) {
      // Quiz complete, finish lesson
      if (!lessonCompleted) {
        const totalQuestions = lesson.quiz.questions.length;
        const percentage = (quizScore / totalQuestions) * 100;
        
        // Save quiz score
        completeLesson('electronics', parseInt(lessonId), {
          score: quizScore,
          total: totalQuestions,
          percentage
        });
        
        setLessonCompleted(true);
      }
      navigate('/games/map/electronics');
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
    if (answeredQuestions.includes(currentQuestion)) return; // Already answered
    
    setSelectedAnswer(answerIndex);
    const question = lesson.quiz.questions[currentQuestion];
    if (answerIndex === question.correctAnswer) {
      setQuizScore(quizScore + 1);
    }
    setAnsweredQuestions([...answeredQuestions, currentQuestion]);
  };

  const currentContent = lesson.content.sections[currentSection];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white pb-20 md:pb-0">
      {/* Header */}
      <div className="border-b border-white/20 bg-black/30 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/games/map/electronics')}
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">Back to Map</span>
            </button>
            
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-purple-300" />
              <span className="text-sm">{lesson.duration}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Lesson Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
        <LessonBreadcrumb 
          subject="electronics" 
          lessonId={lessonId} 
          lessonTitle={lesson.title} 
        />
        
        {/* Lesson Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="text-4xl sm:text-6xl">⚡</div>
            <div className="min-w-0 flex-1">
              <div className="text-xs sm:text-sm text-white/60 mb-1">
                {lesson.level} • Lesson {lesson.id}
              </div>
              <h1 className="text-2xl sm:text-4xl font-bold truncate">{lesson.title}</h1>
              <div className="text-sm sm:text-lg text-white/80 mt-2 truncate">{lesson.unit}</div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full bg-white/20 rounded-full h-2 mt-4 sm:mt-6">
            <div
              className="bg-gradient-to-r from-purple-400 to-pink-500 h-2 rounded-full transition-all duration-300"
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

        {/* Introduction (only on first section) */}
        {currentSection === 0 && (
          <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 border border-white/20">
            <div className="flex items-start gap-3">
              <BookOpen className="w-5 sm:w-6 h-5 sm:h-6 text-purple-300 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-base sm:text-lg mb-2">Introduction</h3>
                <p className="text-sm sm:text-base text-white/90 leading-relaxed">{lesson.content.introduction}</p>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Interactive Content */}
        {!showQuiz && <EnhancedLessonContent lessonId={parseInt(lessonId)} subject="electronics" />}

        {/* Current Section Content */}
        {!showQuiz && (
          <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-5 sm:p-8 mb-6 sm:mb-8 border border-white/20">
            <h2 className="text-xl sm:text-3xl font-bold mb-4 sm:mb-6">{currentContent.title}</h2>
            <div className="prose prose-invert prose-sm sm:prose-lg max-w-none">
              {currentContent.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-3 sm:mb-4 text-sm sm:text-base text-white/90 leading-relaxed whitespace-pre-line">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Key Takeaways (only on last section) */}
        {isLastSection && !showQuiz && (
          <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 border border-green-400/30">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 sm:w-6 h-5 sm:h-6 text-green-300 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-bold text-base sm:text-lg mb-3">Key Takeaways</h3>
                <ul className="space-y-2">
                  {lesson.content.keyTakeaways.map((takeaway, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-green-300 mt-1">•</span>
                      <span className="text-sm sm:text-base text-white/90">{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Vocabulary (only on last section) */}
        {isLastSection && !showQuiz && lesson.content.vocabulary && lesson.content.vocabulary.length > 0 && (
          <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 border border-white/20">
            <h3 className="font-bold text-lg sm:text-xl mb-4">Vocabulary</h3>
            <div className="grid gap-3 sm:gap-4">
              {lesson.content.vocabulary.map((item, index) => (
                <div key={index} className="border-l-4 border-purple-400 pl-3 sm:pl-4">
                  <div className="font-bold text-purple-300 text-sm sm:text-base">{item.term}</div>
                  <div className="text-white/80 text-xs sm:text-sm mt-1">{item.definition}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quiz Section */}
        {showQuiz && hasQuiz && (
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-xl sm:rounded-2xl p-5 sm:p-8 mb-6 sm:mb-8 border border-purple-400/30">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <Brain className="w-6 sm:w-8 h-6 sm:h-8 text-purple-300" />
              <div>
                <h3 className="font-bold text-xl sm:text-2xl">Quiz Time!</h3>
                <p className="text-sm text-white/70">Question {currentQuestion + 1} of {lesson.quiz.questions.length}</p>
              </div>
            </div>

            <div className="mb-4 sm:mb-6">
              <p className="text-base sm:text-xl mb-4 sm:mb-6">{lesson.quiz.questions[currentQuestion].question}</p>
              
              <div className="space-y-2 sm:space-y-3">
                {lesson.quiz.questions[currentQuestion].options.map((option, index) => {
                  const isSelected = selectedAnswer === index;
                  const isCorrect = index === lesson.quiz.questions[currentQuestion].correctAnswer;
                  const showResult = answeredQuestions.includes(currentQuestion);
                  
                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      disabled={showResult}
                      className={`w-full text-left p-3 sm:p-4 rounded-lg border-2 transition-all text-sm sm:text-base ${
                        showResult
                          ? isCorrect
                            ? 'bg-green-500/20 border-green-400 text-white'
                            : isSelected
                            ? 'bg-red-500/20 border-red-400 text-white'
                            : 'bg-white/5 border-white/20 text-white/60'
                          : isSelected
                          ? 'bg-purple-500/20 border-purple-400 text-white'
                          : 'bg-white/10 border-white/20 hover:bg-white/20 text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2 sm:gap-3">
                        <span className="font-bold">{String.fromCharCode(65 + index)}.</span>
                        <span className="flex-1">{option}</span>
                        {showResult && isCorrect && <CheckCircle className="w-4 sm:w-5 h-4 sm:h-5 text-green-400 flex-shrink-0" />}
                        {showResult && isSelected && !isCorrect && <XCircle className="w-4 sm:w-5 h-4 sm:h-5 text-red-400 flex-shrink-0" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {answeredQuestions.includes(currentQuestion) && (
              <div className="bg-white/10 rounded-lg p-3 sm:p-4 border border-white/20">
                <p className="text-xs sm:text-sm text-white/90">
                  <span className="font-bold">Explanation:</span> {lesson.quiz.questions[currentQuestion].explanation}
                </p>
              </div>
            )}

            <div className="mt-4 sm:mt-6 text-center">
              <p className="text-sm text-white/70">
                Score: {quizScore} / {answeredQuestions.length}
                {answeredQuestions.length === lesson.quiz.questions.length && 
                  ` (${Math.round((quizScore / lesson.quiz.questions.length) * 100)}%)`
                }
              </p>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
          <button
            onClick={handlePrevious}
            disabled={currentSection === 0 && !showQuiz}
            className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors text-sm sm:text-base"
          >
            <ArrowLeft className="w-4 sm:w-5 h-4 sm:h-5" />
            <span className="hidden sm:inline">Previous</span>
          </button>

          <button
            onClick={handleNext}
            disabled={showQuiz && !answeredQuestions.includes(currentQuestion)}
            className="flex items-center gap-2 px-5 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-semibold transition-all shadow-lg text-sm sm:text-base"
          >
            {showQuiz && currentQuestion === lesson.quiz.questions.length - 1 
              ? 'Complete' 
              : showQuiz 
              ? 'Next'
              : isLastSection && hasQuiz
              ? 'Start Quiz'
              : isLastSection
              ? 'Complete'
              : 'Next'}
            <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5" />
          </button>
        </div>

        {/* Enhanced Lesson Navigation */}
        <LessonNavigation 
          subject="electronics" 
          currentLessonId={lessonId} 
          allLessons={electronicsLessons} 
        />
      </div>
    </div>
  );
}
