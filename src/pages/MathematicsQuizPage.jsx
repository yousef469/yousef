import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, XCircle, Award } from 'lucide-react';
import { mathematicsQuizzes } from '../data/mathematics/quizzes/mathematicsQuizzes';
import MultipleChoiceQuestion from '../components/quiz/MultipleChoiceQuestion';
import TrueFalseQuestion from '../components/quiz/TrueFalseQuestion';

export default function MathematicsQuizPage() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const quiz = mathematicsQuizzes[parseInt(lessonId)];

  useEffect(() => {
    if (!quiz) {
      navigate('/learn/mathematics/engineering/map');
    }
  }, [quiz, navigate]);

  if (!quiz) return null;

  const questions = quiz.questions;
  const totalQuestions = questions.length;

  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      calculateScore();
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) {
        correct++;
      }
    });
    setScore(correct);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setScore(0);
  };

  const question = questions[currentQuestion];
  const isAnswered = answers[question.id] !== undefined;
  const percentage = showResults ? Math.round((score / totalQuestions) * 100) : 0;

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900 text-white p-8">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => navigate('/learn/mathematics/engineering/map')}
            className="flex items-center gap-2 text-green-300 hover:text-green-200 mb-8"
          >
            <ArrowLeft size={20} />
            Back
          </button>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <div className="text-center mb-8">
              <Award className="w-20 h-20 mx-auto mb-4 text-yellow-400" />
              <h1 className="text-4xl font-bold mb-2">Quiz Complete!</h1>
              <p className="text-xl text-green-200">Lesson {lessonId} Quiz Results</p>
            </div>

            <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl p-6 mb-8">
              <div className="text-center">
                <div className="text-6xl font-bold mb-2">{percentage}%</div>
                <div className="text-xl text-green-200">
                  {score} out of {totalQuestions} correct
                </div>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              {questions.map((q, idx) => {
                const userAnswer = answers[q.id];
                const isCorrect = userAnswer === q.correctAnswer;
                
                return (
                  <div
                    key={q.id}
                    className={`p-4 rounded-lg border-2 ${
                      isCorrect
                        ? 'bg-green-500/20 border-green-500'
                        : 'bg-red-500/20 border-red-500'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {isCorrect ? (
                        <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                      ) : (
                        <XCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
                      )}
                      <div className="flex-1">
                        <p className="font-semibold mb-2">Question {idx + 1}: {q.question}</p>
                        {!isCorrect && (
                          <p className="text-sm text-green-200">{q.explanation}</p>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => navigate(`/learn/mathematics/engineering/lesson/${lessonId}`)}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
              >
                Back to Lesson
              </button>
              <button
                onClick={() => navigate(`/learn/mathematics/engineering/lesson/${parseInt(lessonId) + 1}`)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
              >
                Next Lesson →
              </button>
              <button
                onClick={resetQuiz}
                className="flex-1 bg-white/10 hover:bg-white/20 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
              >
                Retake Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900 text-white p-8">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => navigate('/learn/mathematics/engineering/map')}
          className="flex items-center gap-2 text-green-300 hover:text-green-200 mb-8"
        >
          <ArrowLeft size={20} />
          Back
        </button>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold">Lesson {lessonId} Quiz</h1>
              <span className="text-green-200">
                Question {currentQuestion + 1} of {totalQuestions}
              </span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
              />
            </div>
          </div>

          <div className="mb-8">
            {question.type === 'multiple-choice' && (
              <MultipleChoiceQuestion
                question={question}
                selectedAnswer={answers[question.id]}
                onAnswer={(answer) => handleAnswer(question.id, answer)}
                showExplanation={false}
              />
            )}
            {question.type === 'true-false' && (
              <TrueFalseQuestion
                question={question}
                selectedAnswer={answers[question.id]}
                onAnswer={(answer) => handleAnswer(question.id, answer)}
                showExplanation={false}
              />
            )}
          </div>

          <div className="flex justify-between gap-4">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-semibold transition-colors"
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={!isAnswered}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-semibold transition-colors"
            >
              {currentQuestion === totalQuestions - 1 ? 'Finish Quiz' : 'Next Question'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

