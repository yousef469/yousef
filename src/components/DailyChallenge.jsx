import { useState, useEffect } from 'react';
import { Trophy, Clock, Zap, CheckCircle } from 'lucide-react';
import { useProgress } from '../contexts/ProgressContext';

export default function DailyChallenge() {
  const { awardXP } = useProgress();
  const [challenge, setChallenge] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const challenges = [
    {
      question: "What is the escape velocity from Earth?",
      options: ["7.9 km/s", "11.2 km/s", "15.4 km/s", "20.1 km/s"],
      correct: 1,
      xp: 50
    },
    {
      question: "Which force opposes motion through air?",
      options: ["Lift", "Thrust", "Drag", "Weight"],
      correct: 2,
      xp: 50
    },
    {
      question: "What does RPM stand for?",
      options: ["Rotations Per Minute", "Rate Per Mile", "Revolutions Per Minute", "Ratio Per Motor"],
      correct: 2,
      xp: 50
    },
    {
      question: "What is Newton's Second Law?",
      options: ["F = ma", "E = mc²", "V = IR", "P = IV"],
      correct: 0,
      xp: 50
    },
    {
      question: "What powers a rocket in space?",
      options: ["Air pressure", "Propellant combustion", "Solar panels", "Gravity"],
      correct: 1,
      xp: 50
    }
  ];

  useEffect(() => {
    const today = new Date().toDateString();
    const lastCompleted = localStorage.getItem('daily_challenge_date');
    
    if (lastCompleted === today) {
      setCompleted(true);
    } else {
      // Pick random challenge
      const randomIndex = Math.floor(Math.random() * challenges.length);
      setChallenge(challenges[randomIndex]);
    }
  }, []);

  const handleAnswer = (index) => {
    if (showResult) return;
    
    setSelectedAnswer(index);
    setShowResult(true);

    if (index === challenge.correct) {
      // Award XP
      if (awardXP) {
        awardXP(challenge.xp, 'daily_challenge');
      }
      
      // Mark as completed
      const today = new Date().toDateString();
      localStorage.setItem('daily_challenge_date', today);
      
      setTimeout(() => {
        setCompleted(true);
      }, 2000);
    }
  };

  if (completed) {
    return (
      <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border border-green-500/30 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-3">
          <CheckCircle className="w-6 h-6 text-green-400" />
          <h3 className="text-xl font-bold text-white">Daily Challenge Complete!</h3>
        </div>
        <p className="text-gray-300">Come back tomorrow for a new challenge and more XP!</p>
      </div>
    );
  }

  if (!challenge) return null;

  return (
    <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-500/30 radius-md p-6 shadow-premium-lg card-hover">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Trophy className="w-6 h-6 text-yellow-400" />
          <h3 className="text-xl font-bold text-white">Daily Challenge</h3>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Clock className="w-4 h-4" />
          <span>Resets in {24 - new Date().getHours()}h</span>
        </div>
      </div>

      <p className="text-lg text-white mb-4">{challenge.question}</p>

      <div className="space-y-2 mb-4">
        {challenge.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(index)}
            disabled={showResult}
            className={`w-full p-3 radius-sm text-left transition-all ripple ${
              showResult
                ? index === challenge.correct
                  ? 'bg-green-500/20 border-2 border-green-500 text-white'
                  : index === selectedAnswer
                  ? 'bg-red-500/20 border-2 border-red-500 text-white'
                  : 'bg-gray-800 border border-gray-700 text-gray-400'
                : 'bg-gray-800 border border-gray-700 hover:border-purple-500 text-white'
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      {showResult && (
        <div className={`flex items-center gap-2 p-3 rounded-lg ${
          selectedAnswer === challenge.correct
            ? 'bg-green-500/20 text-green-400'
            : 'bg-red-500/20 text-red-400'
        }`}>
          <Zap className="w-5 h-5" />
          <span className="font-semibold">
            {selectedAnswer === challenge.correct
              ? `Correct! +${challenge.xp} XP earned!`
              : 'Incorrect. Try again tomorrow!'}
          </span>
        </div>
      )}
    </div>
  );
}
