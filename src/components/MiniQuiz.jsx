import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  X, CheckCircle, XCircle, Trophy, Zap, Clock, 
  ChevronRight, RotateCcw, Sparkles
} from 'lucide-react';
import { useProgress } from '../contexts/ProgressContext';

const quizCategories = {
  mechanics: {
    name: 'Mechanics',
    icon: '⚙️',
    questions: [
      { q: "What is Newton's Second Law?", options: ['F = ma', 'E = mc²', 'P = mv', 'W = Fd'], correct: 0, explanation: 'Force equals mass times acceleration' },
      { q: 'What is the unit of force?', options: ['Joule', 'Newton', 'Watt', 'Pascal'], correct: 1, explanation: 'The Newton (N) is the SI unit of force' },
      { q: 'Kinetic energy formula is:', options: ['KE = mgh', 'KE = ½mv²', 'KE = Fd', 'KE = mv'], correct: 1, explanation: 'Kinetic energy equals half mass times velocity squared' },
      { q: 'What does torque measure?', options: ['Linear force', 'Rotational force', 'Pressure', 'Energy'], correct: 1, explanation: 'Torque is the rotational equivalent of linear force' },
      { q: 'Power is measured in:', options: ['Newtons', 'Joules', 'Watts', 'Pascals'], correct: 2, explanation: 'Power is measured in Watts (W) = Joules/second' },
    ]
  },
  aerospace: {
    name: 'Aerospace',
    icon: '🚀',
    questions: [
      { q: 'What equation describes rocket propulsion?', options: ['Bernoulli', 'Tsiolkovsky', 'Navier-Stokes', 'Euler'], correct: 1, explanation: 'The Tsiolkovsky rocket equation relates delta-v to mass ratio' },
      { q: 'Lift force depends on:', options: ['Only velocity', 'Only wing area', 'Velocity squared', 'Mass only'], correct: 2, explanation: 'Lift is proportional to velocity squared (L = ½ρv²SCL)' },
      { q: 'What is specific impulse (Isp)?', options: ['Thrust per unit mass', 'Fuel efficiency measure', 'Exhaust velocity', 'All of the above'], correct: 3, explanation: 'Isp measures engine efficiency and relates to exhaust velocity' },
      { q: 'Escape velocity from Earth is approximately:', options: ['7.9 km/s', '11.2 km/s', '15.0 km/s', '3.0 km/s'], correct: 1, explanation: 'Earth escape velocity is about 11.2 km/s' },
      { q: 'What causes drag?', options: ['Gravity', 'Air resistance', 'Thrust', 'Lift'], correct: 1, explanation: 'Drag is caused by air resistance opposing motion' },
    ]
  },
  automotive: {
    name: 'Automotive',
    icon: '🚗',
    questions: [
      { q: 'Gear ratio is calculated by:', options: ['Driven/Driving teeth', 'Driving/Driven teeth', 'RPM × Torque', 'Speed × Force'], correct: 0, explanation: 'Gear ratio = Number of driven gear teeth / Number of driving gear teeth' },
      { q: 'What affects braking distance most?', options: ['Car color', 'Initial speed', 'Tire brand', 'Engine size'], correct: 1, explanation: 'Braking distance increases with the square of velocity' },
      { q: 'Horsepower is calculated from:', options: ['Torque × RPM / 5252', 'Force × Distance', 'Mass × Velocity', 'Pressure × Area'], correct: 0, explanation: 'HP = (Torque × RPM) / 5252 for lb-ft and RPM' },
      { q: 'What is understeer?', options: ['Front tires lose grip', 'Rear tires lose grip', 'All tires grip', 'No tires grip'], correct: 0, explanation: 'Understeer occurs when front tires lose grip and car goes wide' },
      { q: 'Differential allows:', options: ['Equal wheel speed', 'Different wheel speeds', 'More power', 'Less fuel'], correct: 1, explanation: 'Differential allows wheels to rotate at different speeds in turns' },
    ]
  },
  electrical: {
    name: 'Electrical',
    icon: '⚡',
    questions: [
      { q: "Ohm's Law states:", options: ['V = IR', 'P = IV', 'E = mc²', 'F = ma'], correct: 0, explanation: 'Voltage equals Current times Resistance' },
      { q: 'What is the unit of resistance?', options: ['Volt', 'Ampere', 'Ohm', 'Watt'], correct: 2, explanation: 'Resistance is measured in Ohms (Ω)' },
      { q: 'In a series circuit, current is:', options: ['Different everywhere', 'Same everywhere', 'Zero', 'Infinite'], correct: 1, explanation: 'Current is the same throughout a series circuit' },
      { q: 'Capacitors store:', options: ['Current', 'Resistance', 'Electric charge', 'Magnetic field'], correct: 2, explanation: 'Capacitors store electric charge in an electric field' },
      { q: 'Power in DC circuits:', options: ['P = V/I', 'P = VI', 'P = V+I', 'P = V-I'], correct: 1, explanation: 'Power equals Voltage times Current' },
    ]
  },
  materials: {
    name: 'Materials',
    icon: '🔧',
    questions: [
      { q: 'Stress is defined as:', options: ['Force × Area', 'Force / Area', 'Area / Force', 'Force + Area'], correct: 1, explanation: 'Stress = Force per unit Area (σ = F/A)' },
      { q: 'Strain is:', options: ['Absolute deformation', 'Relative deformation', 'Force applied', 'Material property'], correct: 1, explanation: 'Strain is the relative change in length (ε = ΔL/L₀)' },
      { q: "Young's Modulus measures:", options: ['Hardness', 'Stiffness', 'Ductility', 'Toughness'], correct: 1, explanation: "Young's Modulus (E) measures material stiffness" },
      { q: 'Factor of Safety should be:', options: ['Less than 1', 'Equal to 1', 'Greater than 1', 'Zero'], correct: 2, explanation: 'FoS > 1 ensures the design can handle more than expected loads' },
      { q: 'Yield strength is:', options: ['Breaking point', 'Elastic limit', 'Stiffness', 'Density'], correct: 1, explanation: 'Yield strength is where permanent deformation begins' },
    ]
  }
};

export default function MiniQuiz({ isOpen, onClose, category = null }) {
  const { addXP } = useProgress();
  const [selectedCategory, setSelectedCategory] = useState(category);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [quizComplete, setQuizComplete] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    if (timerActive && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && timerActive) {
      handleAnswer(-1); // Time's up, wrong answer
    }
  }, [timeLeft, timerActive]);

  const startQuiz = (cat) => {
    setSelectedCategory(cat);
    setCurrentQuestion(0);
    setScore(0);
    setAnswers([]);
    setQuizComplete(false);
    setSelectedAnswer(null);
    setShowResult(false);
    setTimeLeft(30);
    setTimerActive(true);
  };

  const handleAnswer = (answerIndex) => {
    if (showResult) return;
    
    setTimerActive(false);
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    const questions = quizCategories[selectedCategory].questions;
    const isCorrect = answerIndex === questions[currentQuestion].correct;
    
    if (isCorrect) {
      setScore(score + 1);
    }
    
    setAnswers([...answers, { questionIndex: currentQuestion, selected: answerIndex, correct: isCorrect }]);
  };

  const nextQuestion = () => {
    const questions = quizCategories[selectedCategory].questions;
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setTimeLeft(30);
      setTimerActive(true);
    } else {
      setQuizComplete(true);
      // Award XP based on score
      const xpEarned = score * 20;
      if (xpEarned > 0 && addXP) {
        addXP(xpEarned, 'mini_quiz');
      }
    }
  };

  const resetQuiz = () => {
    setSelectedCategory(null);
    setCurrentQuestion(0);
    setScore(0);
    setAnswers([]);
    setQuizComplete(false);
    setSelectedAnswer(null);
    setShowResult(false);
    setTimerActive(false);
  };

  if (!isOpen) return null;

  const questions = selectedCategory ? quizCategories[selectedCategory].questions : [];
  const currentQ = questions[currentQuestion];

  return createPortal(
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-purple-500/30"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-700 bg-gradient-to-r from-purple-500/10 to-pink-500/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Mini Quiz</h2>
                <p className="text-gray-400 text-sm">Test your engineering knowledge</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-700 rounded-lg">
              <X className="w-6 h-6 text-gray-400" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Category Selection */}
          {!selectedCategory && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white mb-4">Choose a Topic</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {Object.keys(quizCategories).map(cat => (
                  <button
                    key={cat}
                    onClick={() => startQuiz(cat)}
                    className="p-4 bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-purple-500 rounded-xl transition-all text-center active:scale-95"
                  >
                    <span className="text-3xl block mb-2">{quizCategories[cat].icon}</span>
                    <span className="text-white font-medium">{quizCategories[cat].name}</span>
                    <span className="text-xs text-gray-400 block mt-1">{quizCategories[cat].questions.length} questions</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quiz in Progress */}
          {selectedCategory && !quizComplete && (
            <div>
              {/* Progress & Timer */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{quizCategories[selectedCategory].icon}</span>
                  <span className="text-gray-400">Question {currentQuestion + 1}/{questions.length}</span>
                </div>
                <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${
                  timeLeft <= 10 ? 'bg-red-500/20 text-red-400' : 'bg-gray-700 text-gray-300'
                }`}>
                  <Clock className="w-4 h-4" />
                  <span className="font-mono">{timeLeft}s</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-700 rounded-full h-2 mb-6">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                />
              </div>

              {/* Question */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-white mb-4">{currentQ.q}</h3>
                <div className="space-y-3">
                  {currentQ.options.map((option, idx) => {
                    let buttonClass = 'bg-gray-800 border-gray-700 hover:border-purple-500';
                    
                    if (showResult) {
                      if (idx === currentQ.correct) {
                        buttonClass = 'bg-green-500/20 border-green-500';
                      } else if (idx === selectedAnswer && idx !== currentQ.correct) {
                        buttonClass = 'bg-red-500/20 border-red-500';
                      }
                    } else if (selectedAnswer === idx) {
                      buttonClass = 'bg-purple-500/20 border-purple-500';
                    }
                    
                    return (
                      <button
                        key={idx}
                        onClick={() => handleAnswer(idx)}
                        disabled={showResult}
                        className={`w-full p-4 rounded-xl border-2 text-left transition-all ${buttonClass} ${
                          !showResult ? 'active:scale-98' : ''
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-white">{option}</span>
                          {showResult && idx === currentQ.correct && (
                            <CheckCircle className="w-5 h-5 text-green-400" />
                          )}
                          {showResult && idx === selectedAnswer && idx !== currentQ.correct && (
                            <XCircle className="w-5 h-5 text-red-400" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Explanation */}
              {showResult && (
                <div className={`p-4 rounded-xl mb-6 ${
                  selectedAnswer === currentQ.correct 
                    ? 'bg-green-500/10 border border-green-500/30' 
                    : 'bg-red-500/10 border border-red-500/30'
                }`}>
                  <p className="text-sm text-gray-300">
                    <span className="font-semibold">
                      {selectedAnswer === currentQ.correct ? '✓ Correct! ' : '✗ Incorrect. '}
                    </span>
                    {currentQ.explanation}
                  </p>
                </div>
              )}

              {/* Next Button */}
              {showResult && (
                <button
                  onClick={nextQuestion}
                  className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-xl font-semibold text-white flex items-center justify-center gap-2 active:scale-98"
                >
                  {currentQuestion < questions.length - 1 ? 'Next Question' : 'See Results'}
                  <ChevronRight className="w-5 h-5" />
                </button>
              )}
            </div>
          )}

          {/* Quiz Complete */}
          {quizComplete && (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Trophy className="w-10 h-10 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-2">Quiz Complete!</h3>
              <p className="text-gray-400 mb-6">
                You scored {score} out of {questions.length}
              </p>

              {/* Score Display */}
              <div className="bg-gray-800 rounded-xl p-6 mb-6">
                <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-2">
                  {Math.round((score / questions.length) * 100)}%
                </div>
                <div className="flex items-center justify-center gap-2 text-yellow-400">
                  <Zap className="w-5 h-5" />
                  <span className="font-semibold">+{score * 20} XP earned!</span>
                </div>
              </div>

              {/* Performance Message */}
              <p className="text-gray-300 mb-6">
                {score === questions.length && '🎉 Perfect score! You\'re an expert!'}
                {score >= questions.length * 0.8 && score < questions.length && '🌟 Great job! Almost perfect!'}
                {score >= questions.length * 0.6 && score < questions.length * 0.8 && '👍 Good work! Keep learning!'}
                {score < questions.length * 0.6 && '📚 Keep practicing! You\'ll improve!'}
              </p>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => startQuiz(selectedCategory)}
                  className="flex-1 py-3 bg-gray-700 hover:bg-gray-600 rounded-xl font-semibold text-white flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-5 h-5" />
                  Retry
                </button>
                <button
                  onClick={resetQuiz}
                  className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-xl font-semibold text-white"
                >
                  New Topic
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
