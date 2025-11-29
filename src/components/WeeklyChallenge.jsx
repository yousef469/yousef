import { useState, useEffect } from 'react';
import { Trophy, Clock, Star, CheckCircle, Zap, Target, Award } from 'lucide-react';
import { useProgress } from '../contexts/ProgressContext';

export default function WeeklyChallenge() {
  const { awardXP } = useProgress();
  const [challenge, setChallenge] = useState(null);
  const [timeLeft, setTimeLeft] = useState('');
  const [userAnswer, setUserAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);
  const [showHint, setShowHint] = useState(false);

  const weeklyChallenge = [
    {
      id: 'week1',
      title: 'Rocket Fuel Efficiency',
      category: 'Aerospace',
      difficulty: 'Hard',
      xpReward: 500,
      icon: '🚀',
      color: 'from-orange-500 to-red-600',
      question: 'A rocket needs to achieve a delta-v of 9.4 km/s to reach orbit. If the exhaust velocity is 3.0 km/s, what mass ratio (initial mass / final mass) is required? Round to 2 decimal places.',
      hint: 'Use the Tsiolkovsky rocket equation: Δv = ve × ln(m0/mf)',
      answer: '23.14',
      tolerance: 0.5,
      explanation: 'Using Δv = ve × ln(m0/mf), we get 9.4 = 3.0 × ln(m0/mf). Solving: ln(m0/mf) = 3.133, so m0/mf = e^3.133 ≈ 23.14'
    },
    {
      id: 'week2',
      title: 'Gear Ratio Challenge',
      category: 'Automotive',
      difficulty: 'Medium',
      xpReward: 300,
      icon: '⚙️',
      color: 'from-blue-500 to-cyan-600',
      question: 'A car engine produces 250 Nm of torque. If the transmission has a gear ratio of 3.5:1 and the differential has a ratio of 4.1:1, what is the total torque at the wheels? (in Nm)',
      hint: 'Total torque = Engine torque × Transmission ratio × Differential ratio',
      answer: '3587.5',
      tolerance: 10,
      explanation: 'Total torque = 250 × 3.5 × 4.1 = 3587.5 Nm'
    },
    {
      id: 'week3',
      title: 'Aircraft Lift Calculation',
      category: 'Aviation',
      difficulty: 'Hard',
      xpReward: 500,
      icon: '✈️',
      color: 'from-cyan-500 to-blue-600',
      question: 'An aircraft wing has an area of 30 m², flying at 250 m/s at sea level (air density = 1.225 kg/m³). If the lift coefficient is 0.8, what is the lift force in kN? Round to 1 decimal.',
      hint: 'Lift = 0.5 × ρ × v² × A × CL',
      answer: '918.8',
      tolerance: 5,
      explanation: 'L = 0.5 × 1.225 × 250² × 30 × 0.8 = 918,750 N = 918.8 kN'
    },
    {
      id: 'week4',
      title: 'Circuit Power Analysis',
      category: 'Electronics',
      difficulty: 'Medium',
      xpReward: 300,
      icon: '⚡',
      color: 'from-yellow-500 to-orange-600',
      question: 'A circuit has three resistors in parallel: 10Ω, 20Ω, and 30Ω, connected to a 12V source. What is the total power dissipated in watts? Round to 2 decimal places.',
      hint: 'First find equivalent resistance, then use P = V²/R',
      answer: '26.40',
      tolerance: 0.5,
      explanation: '1/Req = 1/10 + 1/20 + 1/30 = 11/60, so Req = 5.45Ω. P = 12²/5.45 = 26.40 W'
    }
  ];

  useEffect(() => {
    loadChallenge();
    const timer = setInterval(updateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  const loadChallenge = () => {
    // Get current week number
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const weekNum = Math.ceil((((now - startOfYear) / 86400000) + startOfYear.getDay() + 1) / 7);
    
    // Select challenge based on week
    const challengeIndex = weekNum % weeklyChallenge.length;
    setChallenge(weeklyChallenge[challengeIndex]);

    // Check if already completed this week
    const completedKey = `weekly_challenge_${weekNum}_${now.getFullYear()}`;
    const completed = localStorage.getItem(completedKey);
    if (completed) {
      setSubmitted(true);
      setResult(JSON.parse(completed));
    }
  };

  const updateTimeLeft = () => {
    const now = new Date();
    const endOfWeek = new Date(now);
    endOfWeek.setDate(now.getDate() + (7 - now.getDay()));
    endOfWeek.setHours(23, 59, 59, 999);
    
    const diff = endOfWeek - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    setTimeLeft(`${days}d ${hours}h ${minutes}m`);
  };


  const handleSubmit = () => {
    if (!userAnswer.trim()) return;

    const userNum = parseFloat(userAnswer);
    const correctNum = parseFloat(challenge.answer);
    const isCorrect = Math.abs(userNum - correctNum) <= challenge.tolerance;

    const resultData = {
      correct: isCorrect,
      userAnswer: userAnswer,
      correctAnswer: challenge.answer,
      xpEarned: isCorrect ? challenge.xpReward : 50 // Participation XP
    };

    // Save completion
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const weekNum = Math.ceil((((now - startOfYear) / 86400000) + startOfYear.getDay() + 1) / 7);
    const completedKey = `weekly_challenge_${weekNum}_${now.getFullYear()}`;
    localStorage.setItem(completedKey, JSON.stringify(resultData));

    // Award XP
    if (awardXP) {
      awardXP(resultData.xpEarned, 'weekly_challenge');
    }

    setResult(resultData);
    setSubmitted(true);
  };

  if (!challenge) return null;

  return (
    <div className={`bg-gradient-to-br ${challenge.color} rounded-xl overflow-hidden`}>
      {/* Header */}
      <div className="bg-black/20 px-4 md:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-3xl">{challenge.icon}</div>
            <div>
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-300" />
                <span className="font-bold text-white">Weekly Challenge</span>
              </div>
              <p className="text-sm text-white/80">{challenge.category}</p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 text-white/80 text-sm">
              <Clock className="w-4 h-4" />
              <span>{timeLeft}</span>
            </div>
            <div className="flex items-center gap-1 mt-1">
              <Zap className="w-4 h-4 text-yellow-300" />
              <span className="text-yellow-300 font-bold">{challenge.xpReward} XP</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 md:p-6 bg-gray-900/90">
        <h3 className="text-xl font-bold text-white mb-2">{challenge.title}</h3>
        
        <div className="flex items-center gap-2 mb-4">
          <span className={`px-2 py-1 rounded text-xs font-bold ${
            challenge.difficulty === 'Hard' ? 'bg-red-500/20 text-red-400' :
            challenge.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
            'bg-green-500/20 text-green-400'
          }`}>
            {challenge.difficulty}
          </span>
        </div>

        <p className="text-gray-300 mb-4">{challenge.question}</p>

        {!submitted ? (
          <>
            {/* Hint */}
            <button
              onClick={() => setShowHint(!showHint)}
              className="text-sm text-cyan-400 hover:text-cyan-300 mb-4 flex items-center gap-1"
            >
              <Target className="w-4 h-4" />
              {showHint ? 'Hide Hint' : 'Show Hint'}
            </button>
            
            {showHint && (
              <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-3 mb-4">
                <p className="text-cyan-300 text-sm">💡 {challenge.hint}</p>
              </div>
            )}

            {/* Answer Input */}
            <div className="flex gap-3">
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Enter your answer..."
                className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
              />
              <button
                onClick={handleSubmit}
                disabled={!userAnswer.trim()}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 text-white rounded-lg font-bold transition-all"
              >
                Submit
              </button>
            </div>
          </>
        ) : (
          /* Result */
          <div className={`rounded-xl p-6 ${result?.correct ? 'bg-green-500/20 border border-green-500/50' : 'bg-red-500/20 border border-red-500/50'}`}>
            <div className="flex items-center gap-3 mb-4">
              {result?.correct ? (
                <>
                  <CheckCircle className="w-8 h-8 text-green-400" />
                  <div>
                    <h4 className="text-xl font-bold text-green-400">Correct! 🎉</h4>
                    <p className="text-green-300">+{result.xpEarned} XP earned!</p>
                  </div>
                </>
              ) : (
                <>
                  <Award className="w-8 h-8 text-orange-400" />
                  <div>
                    <h4 className="text-xl font-bold text-orange-400">Good Try!</h4>
                    <p className="text-orange-300">+{result?.xpEarned} XP for participating</p>
                  </div>
                </>
              )}
            </div>
            
            <div className="space-y-2 text-sm">
              <p className="text-gray-300">
                <span className="text-gray-500">Your answer:</span> {result?.userAnswer}
              </p>
              <p className="text-gray-300">
                <span className="text-gray-500">Correct answer:</span> {result?.correctAnswer}
              </p>
            </div>

            <div className="mt-4 p-3 bg-gray-800/50 rounded-lg">
              <p className="text-sm text-gray-300">
                <span className="text-cyan-400 font-bold">Explanation:</span> {challenge.explanation}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
