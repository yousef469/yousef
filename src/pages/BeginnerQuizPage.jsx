import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Clock, Star, Trophy } from 'lucide-react';
import { useProgress } from '../contexts/ProgressContext';
import beginnerLessons from '../data/beginnerLessonsData';
import MultipleChoiceQuestion from '../components/quiz/MultipleChoiceQuestion';
import TrueFalseQuestion from '../components/quiz/TrueFalseQuestion';

export default function BeginnerQuizPage() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [timeStarted] = useState(Date.now());
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [progressSaved, setProgressSaved] = useState(false);
  
  const { completeQuiz } = useProgress();
  
  // Find lesson
  let lesson = null;
  for (const key in beginnerLessons) {
    const found = beginnerLessons[key].find(l => l.id === parseInt(lessonId));
    if (found) {
      lesson = found;
      break;
    }
  }
  
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeElapsed(Math.floor((Date.now() - timeStarted) / 1000));
    }, 1000);
    
    return () => clearInterval(interval);
  }, [timeStarted]);
  
  if (!lesson || !lesson.quiz || !lesson.quiz.questions || lesson.quiz.questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Quiz Not Available</h1>
          <button
            onClick={() => navigate('/learn')}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
          >
            Back to Learning
          </button>
        </div>
      </div>
    );
  }

  const questions = lesson.quiz.questions;
  const totalQuestions = questions.length;
  const currentQ = questions[currentQuestion];

  const handleAnswer = (answer) => {
    setAnswers({
      ...answers,
      [currentQuestion]: answer
    });
  };

  const handleNext = async () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
      
      // Save progress
      if (!progressSaved) {
        const results = calculateResults();
        await completeQuiz(
          parseInt(lessonId),
          1,
          results.correct,
          results.total,
          timeElapsed,
          answers
        );
        setProgressSaved(true);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateResults = () => {
    let correct = 0;
    questions.forEach((q, index) => {
      const userAnswer = answers[index];
      if (q.type === 'multiple-choice') {
        if (userAnswer === q.correctAnswer) correct++;
      } else if (q.type === 'true-false') {
        if (userAnswer === q.correctAnswer) correct++;
      }
    });
    
    const percentage = (correct / totalQuestions) * 100;
    const stars = percentage >= 90 ? 3 : percentage >= 75 ? 2 : percentage >= 60 ? 1 : 0;
    
    return { correct, total: totalQuestions, percentage, stars };
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (showResults) {
    const results = calculateResults();
    const xpEarned = 10 + (results.percentage === 100 ? 5 : 0);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white flex items-center justify-center p-6">
        <div className="max-w-2xl w-full">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 text-center">
            <div className="mb-6">
              <div className="w-24 h-24 mx-auto bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center shadow-2xl">
                <Trophy className="w-12 h-12 text-white" />
              </div>
            </div>

            <h1 className="text-4xl font-bold mb-2">Quiz Complete!</h1>
            <p className="text-xl text-white/80 mb-8">{lesson.title}</p>

            <div className="bg-white/10 rounded-2xl p-6 mb-6">
              <div className="text-6xl font-bold mb-2">
                {results.percentage.toFixed(0)}%
              </div>
              <div className="text-lg text-white/80">
                {results.correct} out of {results.total} correct
              </div>
            </div>

            <div className="flex justify-center gap-2 mb-6">
              {[1, 2, 3].map((star) => (
                <Star
                  key={star}
                  className={`w-12 h-12 ${
                    star <= results.stars
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-gray-400'
                  }`}
                />
              ))}
            </div>

            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl p-6 mb-6 border border-purple-400/30">
              <div className="text-2xl font-bold mb-2">+{xpEarned} XP</div>
              <div className="text-sm text-white/80">Experience Points Earned</div>
            </div>

            <div className="flex items-center justify-center gap-2 text-white/60 mb-8">
              <Clock className="w-5 h-5" />
              <span>Completed in {formatTime(timeElapsed)}</span>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => navigate(`/learn/unit/${lesson.unitNumber}`)}
                className="flex-1 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg font-semibold transition-colors"
              >
                Back to Unit
              </button>
              <button
                onClick={() => window.location.reload()}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-lg font-semibold transition-all"
              >
                Retake Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const renderQuestion = () => {
    switch (currentQ.type) {
      case 'multiple-choice':
        return (
          <MultipleChoiceQuestion
            question={currentQ}
            answer={answers[currentQuestion]}
            onAnswer={handleAnswer}
          />
        );
      case 'true-false':
        return (
          <TrueFalseQuestion
            question={currentQ}
            answer={answers[currentQuestion]}
            onAnswer={handleAnswer}
          />
        );
      default:
        return <div>Unknown question type</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white">
      {/* Header */}
      <div className="border-b border-white/20 bg-purple-900/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(`/learn/beginner/lesson/${lessonId}`)}
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Lesson</span>
            </button>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-cyan-300" />
                <span className="text-sm font-mono">{formatTime(timeElapsed)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quiz Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-white/60">
              Question {currentQuestion + 1} of {totalQuestions}
            </span>
            <span className="text-sm text-white/60">
              {Object.keys(answers).length} answered
            </span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-white/20">
          {renderQuestion()}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
          >
            Previous
          </button>

          <button
            onClick={handleNext}
            disabled={answers[currentQuestion] === undefined}
            className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg font-semibold transition-all shadow-lg"
          >
            {currentQuestion === totalQuestions - 1 ? 'Finish Quiz' : 'Next Question'}
          </button>
        </div>
      </div>
    </div>
  );
}
