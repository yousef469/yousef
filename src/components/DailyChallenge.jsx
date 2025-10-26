import React, { useState, useEffect } from 'react';
import { Zap, Trophy, Clock, CheckCircle, XCircle, Flame } from 'lucide-react';

const DailyChallenge = () => {
  const [challenge, setChallenge] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [streak, setStreak] = useState(7);
  const [timeLeft, setTimeLeft] = useState('23:45:12');

  const challenges = [
    {
      id: 1,
      difficulty: 'Medium',
      points: 75,
      question: 'What is the specific impulse (Isp) of the SpaceX Raptor engine?',
      options: ['330s', '350s', '380s', '420s'],
      correct: 2,
      explanation: 'The Raptor engine has an Isp of approximately 380 seconds in vacuum, making it one of the most efficient rocket engines.',
      category: 'Rockets'
    },
    {
      id: 2,
      difficulty: 'Hard',
      points: 100,
      question: 'At what angle of attack does a typical airfoil stall?',
      options: ['10-12°', '15-18°', '20-22°', '25-28°'],
      correct: 1,
      explanation: 'Most airfoils stall between 15-18° angle of attack, though this varies by design.',
      category: 'Planes'
    },
    {
      id: 3,
      difficulty: 'Easy',
      points: 50,
      question: 'What does a turbocharger use to compress air?',
      options: ['Belt drive', 'Exhaust gases', 'Electric motor', 'Crankshaft'],
      correct: 1,
      explanation: 'Turbochargers use exhaust gases to spin a turbine that compresses intake air.',
      category: 'Cars'
    }
  ];

  useEffect(() => {
    // Load today's challenge
    const today = new Date().toDateString();
    const savedChallenge = localStorage.getItem('dailyChallenge');
    const savedDate = localStorage.getItem('challengeDate');
    
    if (savedDate === today && savedChallenge) {
      setIsCompleted(true);
    } else {
      // Pick random challenge
      const randomChallenge = challenges[Math.floor(Math.random() * challenges.length)];
      setChallenge(randomChallenge);
    }

    // Update countdown timer
    const timer = setInterval(() => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);
      
      const diff = tomorrow - now;
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      setTimeLeft(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubmit = () => {
    if (selectedAnswer === null) return;

    const isCorrect = selectedAnswer === challenge.correct;
    
    if (isCorrect) {
      setStreak(streak + 1);
      localStorage.setItem('dailyChallenge', 'completed');
      localStorage.setItem('challengeDate', new Date().toDateString());
      setIsCompleted(true);
    }
  };

  if (!challenge) {
    return (
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8 text-center">
        <Zap className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
        <p className="text-gray-400">Loading today's challenge...</p>
      </div>
    );
  }

  if (isCompleted) {
    return (
      <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/50 rounded-xl p-8">
        <div className="text-center">
          <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2">Challenge Complete! 🎉</h3>
          <p className="text-gray-300 mb-4">You've earned {challenge.points} points today</p>
          
          <div className="flex items-center justify-center gap-2 mb-6">
            <Flame className="w-6 h-6 text-orange-400" />
            <span className="text-2xl font-bold">{streak} Day Streak!</span>
          </div>

          <div className="bg-gray-800/50 rounded-lg p-4">
            <div className="flex items-center justify-center gap-2 text-gray-400 mb-2">
              <Clock className="w-4 h-4" />
              <span className="text-sm">Next challenge in</span>
            </div>
            <p className="text-3xl font-bold text-cyan-400">{timeLeft}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Daily Challenge</h3>
            <p className="text-sm text-gray-400">{challenge.category} • {challenge.difficulty}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-2 text-orange-400 mb-1">
            <Flame className="w-5 h-5" />
            <span className="font-bold">{streak} Day Streak</span>
          </div>
          <div className="flex items-center gap-2 text-yellow-400">
            <Trophy className="w-4 h-4" />
            <span className="text-sm font-semibold">+{challenge.points} Points</span>
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="bg-gray-900/50 rounded-lg p-6 mb-6">
        <p className="text-lg text-white mb-6">{challenge.question}</p>

        {/* Options */}
        <div className="space-y-3">
          {challenge.options.map((option, index) => (
            <button
              key={index}
              onClick={() => setSelectedAnswer(index)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                selectedAnswer === index
                  ? 'border-cyan-500 bg-cyan-500/20'
                  : 'border-gray-600 bg-gray-800/50 hover:border-gray-500'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selectedAnswer === index
                    ? 'border-cyan-500 bg-cyan-500'
                    : 'border-gray-500'
                }`}>
                  {selectedAnswer === index && (
                    <div className="w-3 h-3 bg-white rounded-full" />
                  )}
                </div>
                <span className="text-white">{option}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={selectedAnswer === null}
        className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 disabled:from-gray-700 disabled:to-gray-700 rounded-lg font-semibold transition-all disabled:cursor-not-allowed"
      >
        Submit Answer
      </button>

      {/* Timer */}
      <div className="mt-4 text-center">
        <div className="flex items-center justify-center gap-2 text-gray-400 text-sm">
          <Clock className="w-4 h-4" />
          <span>New challenge in {timeLeft}</span>
        </div>
      </div>
    </div>
  );
};

export default DailyChallenge;
