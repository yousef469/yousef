import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Brain, Clock, Trophy, CheckCircle, XCircle } from 'lucide-react';

export default function QuizGame() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const questions = [
    {
      question: "What is the primary function of a rocket nozzle?",
      options: [
        "To cool the engine",
        "To convert thermal energy into kinetic energy",
        "To store fuel",
        "To generate electricity"
      ],
      correct: 1,
      explanation: "The nozzle accelerates hot gases to high velocity, converting thermal energy into kinetic energy for thrust."
    },
    {
      question: "What creates lift on an aircraft wing?",
      options: [
        "Engine thrust",
        "Weight distribution",
        "Pressure difference (Bernoulli's principle)",
        "Wing material"
      ],
      correct: 2,
      explanation: "Lift is created by pressure difference - lower pressure above the wing and higher pressure below."
    },
    {
      question: "What does a turbocharger do in a car engine?",
      options: [
        "Cools the engine",
        "Compresses intake air using exhaust gases",
        "Filters the fuel",
        "Reduces emissions"
      ],
      correct: 1,
      explanation: "A turbocharger uses exhaust gases to spin a turbine that compresses intake air, increasing engine power."
    },
    {
      question: "What is specific impulse (Isp) in rocketry?",
      options: [
        "Engine weight",
        "Fuel efficiency measure (thrust per fuel flow)",
        "Maximum speed",
        "Launch angle"
      ],
      correct: 1,
      explanation: "Specific impulse measures how efficiently a rocket uses propellant - higher Isp means better fuel efficiency."
    },
    {
      question: "What is the critical angle of attack for most aircraft?",
      options: [
        "5-10 degrees",
        "15-20 degrees",
        "30-35 degrees",
        "45-50 degrees"
      ],
      correct: 1,
      explanation: "Most aircraft stall at 15-20 degrees angle of attack when airflow separates from the wing."
    },
    {
      question: "What type of engine does the SpaceX Falcon 9 use?",
      options: [
        "Solid rocket motors",
        "Nuclear engines",
        "Merlin liquid-fuel engines",
        "Ion thrusters"
      ],
      correct: 2,
      explanation: "Falcon 9 uses Merlin engines burning RP-1 (kerosene) and liquid oxygen."
    },
    {
      question: "What is the drag coefficient (Cd) of a typical modern sedan?",
      options: [
        "0.10-0.15",
        "0.25-0.30",
        "0.50-0.60",
        "0.80-0.90"
      ],
      correct: 1,
      explanation: "Modern sedans typically have a Cd of 0.25-0.30. Lower is more aerodynamic."
    },
    {
      question: "What does regenerative braking do in electric vehicles?",
      options: [
        "Cools the brakes",
        "Converts kinetic energy back to electricity",
        "Increases brake pad life only",
        "Reduces tire wear"
      ],
      correct: 1,
      explanation: "Regenerative braking uses the motor as a generator to convert kinetic energy back into electricity for the battery."
    }
  ];

  useEffect(() => {
    if (timeLeft > 0 && !showResult && !gameOver) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult) {
      handleAnswer(null);
    }
  }, [timeLeft, showResult, gameOver]);

  const handleAnswer = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    if (answerIndex === questions[currentQuestion].correct) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
        setTimeLeft(30);
      } else {
        setGameOver(true);
      }
    }, 2000);
  };

  const restartGame = () => {
    setCurrentQuestion(0);
    setScore(0);
    setTimeLeft(30);
    setSelectedAnswer(null);
    setShowResult(false);
    setGameOver(false);
  };

  if (gameOver) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-gray-800/50 backdrop-blur border border-gray-700 rounded-2xl p-8 text-center">
          <Trophy className="w-20 h-20 text-yellow-400 mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-4">Quiz Complete!</h2>
          <div className="text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            {score}/{questions.length}
          </div>
          <p className="text-2xl text-gray-300 mb-8">
            {percentage >= 80 ? '🎉 Excellent!' : percentage >= 60 ? '👍 Good job!' : '💪 Keep learning!'}
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={restartGame}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg font-semibold hover:scale-105 transition-transform"
            >
              Play Again
            </button>
            <button
              onClick={() => navigate('/games')}
              className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold transition-colors"
            >
              Back to Games
            </button>
          </div>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Header */}
      <div className="border-b border-gray-700 bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/games')}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <Brain className="w-8 h-8 text-purple-400" />
              <div>
                <h1 className="text-xl font-bold">Quiz Battle</h1>
                <p className="text-sm text-gray-400">Question {currentQuestion + 1}/{questions.length}</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-cyan-400" />
                <span className={`text-2xl font-bold ${timeLeft <= 10 ? 'text-red-400' : 'text-cyan-400'}`}>
                  {timeLeft}s
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-400" />
                <span className="text-2xl font-bold text-yellow-400">{score}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-8">{question.question}</h2>

          <div className="space-y-4">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrect = index === question.correct;
              const showCorrect = showResult && isCorrect;
              const showWrong = showResult && isSelected && !isCorrect;

              return (
                <button
                  key={index}
                  onClick={() => !showResult && handleAnswer(index)}
                  disabled={showResult}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    showCorrect
                      ? 'border-green-500 bg-green-500/20'
                      : showWrong
                      ? 'border-red-500 bg-red-500/20'
                      : isSelected
                      ? 'border-purple-500 bg-purple-500/20'
                      : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                  } ${showResult ? 'cursor-not-allowed' : 'cursor-pointer hover:scale-102'}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{option}</span>
                    {showCorrect && <CheckCircle className="w-6 h-6 text-green-400" />}
                    {showWrong && <XCircle className="w-6 h-6 text-red-400" />}
                  </div>
                </button>
              );
            })}
          </div>

          {showResult && (
            <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <p className="text-sm text-gray-300">{question.explanation}</p>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="mt-6 bg-gray-800 rounded-full h-2 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
