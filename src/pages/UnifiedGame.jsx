import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Rocket, Trophy, Star, Zap } from 'lucide-react';

export default function UnifiedGame() {
  const navigate = useNavigate();
  const [currentLevel, setCurrentLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [rocketHeight, setRocketHeight] = useState(0);
  const [showLevelComplete, setShowLevelComplete] = useState(false);
  const [gameState, setGameState] = useState({});

  // All challenge types mixed together
  const challenges = [
    // Quiz challenges
    {
      type: 'quiz',
      question: "What creates lift on an aircraft wing?",
      options: ["Engine thrust", "Weight", "Pressure difference", "Wing material"],
      correct: 2,
      explanation: "Lift is created by pressure difference - lower pressure above, higher below."
    },
    // Matching challenge
    {
      type: 'matching',
      title: 'Match Engine Parts',
      pairs: [
        { part: 'Piston', function: 'Converts pressure to motion', emoji: '🔩' },
        { part: 'Crankshaft', function: 'Converts linear to rotational', emoji: '⚙️' },
        { part: 'Turbocharger', function: 'Compresses intake air', emoji: '🌀' }
      ]
    },
    // Simulation challenge
    {
      type: 'simulation',
      title: 'Balance Suspension',
      description: 'Adjust spring stiffness and damping',
      parameters: [
        { name: 'Spring Stiffness', min: 0, max: 100, optimal: [40, 60] },
        { name: 'Damping', min: 0, max: 100, optimal: [45, 65] }
      ]
    },
    // Quiz
    {
      type: 'quiz',
      question: "What does a turbocharger do?",
      options: ["Cools engine", "Compresses air", "Filters fuel", "Reduces emissions"],
      correct: 1,
      explanation: "Turbochargers use exhaust gases to compress intake air for more power."
    },
    // Builder challenge
    {
      type: 'builder',
      title: 'Build Fuel System',
      parts: [
        { id: 'pump', name: 'Fuel Pump', emoji: '⛽', slot: 'tank' },
        { id: 'filter', name: 'Filter', emoji: '🔍', slot: 'line' },
        { id: 'injector', name: 'Injector', emoji: '💉', slot: 'engine' }
      ],
      slots: [
        { id: 'tank', label: 'Tank' },
        { id: 'line', label: 'Line' },
        { id: 'engine', label: 'Engine' }
      ]
    },
    // More quiz
    {
      type: 'quiz',
      question: "What is specific impulse in rocketry?",
      options: ["Engine weight", "Fuel efficiency", "Max speed", "Launch angle"],
      correct: 1,
      explanation: "Specific impulse measures thrust per fuel flow - higher is more efficient."
    },
    // Matching
    {
      type: 'matching',
      title: 'Match Aircraft Controls',
      pairs: [
        { part: 'Aileron', function: 'Controls roll', emoji: '✈️' },
        { part: 'Elevator', function: 'Controls pitch', emoji: '🛫' },
        { part: 'Rudder', function: 'Controls yaw', emoji: '🎯' }
      ]
    },
    // Simulation
    {
      type: 'simulation',
      title: 'Optimize Thrust',
      description: 'Adjust nozzle and pressure',
      parameters: [
        { name: 'Nozzle Area', min: 0, max: 100, optimal: [30, 50] },
        { name: 'Chamber Pressure', min: 0, max: 100, optimal: [60, 80] }
      ]
    },
    // Quiz
    {
      type: 'quiz',
      question: "What is the drag coefficient of a modern sedan?",
      options: ["0.10-0.15", "0.25-0.30", "0.50-0.60", "0.80-0.90"],
      correct: 1,
      explanation: "Modern sedans have Cd of 0.25-0.30. Lower is more aerodynamic."
    },
    // Final matching
    {
      type: 'matching',
      title: 'Match Rocket Parts',
      pairs: [
        { part: 'Nozzle', function: 'Accelerates exhaust', emoji: '🚀' },
        { part: 'Turbopump', function: 'Pressurizes fuel', emoji: '💨' },
        { part: 'Grid Fins', function: 'Aerodynamic control', emoji: '📊' }
      ]
    }
  ];

  const challenge = challenges[currentLevel];
  const totalLevels = challenges.length;
  const progress = ((currentLevel + 1) / totalLevels) * 100;

  const completeLevel = (earnedPoints) => {
    setScore(score + earnedPoints);
    setRocketHeight(((currentLevel + 1) / totalLevels) * 100);
    setShowLevelComplete(true);
    
    setTimeout(() => {
      if (currentLevel < totalLevels - 1) {
        setCurrentLevel(currentLevel + 1);
        setShowLevelComplete(false);
        setGameState({});
      } else {
        // Game complete
        navigate('/games');
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Header */}
      <div className="border-b border-gray-700 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={() => navigate('/games')} className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <Rocket className="w-8 h-8 text-cyan-400" />
              <div>
                <h1 className="text-xl font-bold">Engineering Journey</h1>
                <p className="text-sm text-gray-400">Level {currentLevel + 1}/{totalLevels}</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-400" />
                <span className="text-2xl font-bold text-yellow-400">{score}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Rocket Progress Visualization */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-2xl p-6 sticky top-24">
              <h3 className="text-lg font-bold mb-4 text-center">Mission Progress</h3>
              
              {/* Rocket Animation */}
              <div className="relative h-96 bg-gradient-to-b from-blue-900/20 to-gray-900/50 rounded-xl overflow-hidden">
                {/* Stars background */}
                <div className="absolute inset-0">
                  {[...Array(20)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 2}s`
                      }}
                    />
                  ))}
                </div>
                
                {/* Rocket */}
                <div
                  className="absolute left-1/2 -translate-x-1/2 transition-all duration-1000 ease-out"
                  style={{ bottom: `${rocketHeight}%` }}
                >
                  <div className="relative">
                    <Rocket className="w-12 h-12 text-cyan-400 animate-bounce" />
                    {rocketHeight > 0 && (
                      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-2 h-8 bg-gradient-to-b from-orange-500 to-transparent animate-pulse" />
                    )}
                  </div>
                </div>
                
                {/* Ground */}
                <div className="absolute bottom-0 left-0 right-0 h-2 bg-green-600" />
              </div>

              {/* Stats */}
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Altitude</span>
                  <span className="text-cyan-400 font-bold">{Math.round(rocketHeight)}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Levels Completed</span>
                  <span className="text-yellow-400 font-bold">{currentLevel}/{totalLevels}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Challenge Area */}
          <div className="lg:col-span-2">
            {challenge.type === 'quiz' && (
              <QuizChallenge challenge={challenge} onComplete={completeLevel} />
            )}
            {challenge.type === 'matching' && (
              <MatchingChallenge challenge={challenge} onComplete={completeLevel} />
            )}
            {challenge.type === 'simulation' && (
              <SimulationChallenge challenge={challenge} onComplete={completeLevel} />
            )}
            {challenge.type === 'builder' && (
              <BuilderChallenge challenge={challenge} onComplete={completeLevel} />
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-8 bg-gray-800 rounded-full h-3 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Level Complete Modal */}
      {showLevelComplete && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="bg-gray-800 border-2 border-cyan-500 rounded-2xl p-8 text-center animate-bounce">
            <Star className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-2">Level Complete!</h2>
            <p className="text-gray-400">Launching to next challenge...</p>
          </div>
        </div>
      )}
    </div>
  );
}

// Quiz Challenge Component
function QuizChallenge({ challenge, onComplete }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (index) => {
    setSelectedAnswer(index);
    setShowResult(true);
    
    if (index === challenge.correct) {
      setTimeout(() => onComplete(100), 1500);
    }
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-2xl p-8">
      <div className="flex items-center gap-2 mb-6">
        <Zap className="w-6 h-6 text-purple-400" />
        <h2 className="text-2xl font-bold">Quick Quiz</h2>
      </div>
      
      <h3 className="text-xl mb-6">{challenge.question}</h3>

      <div className="space-y-3">
        {challenge.options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrect = index === challenge.correct;
          const showCorrect = showResult && isCorrect;
          const showWrong = showResult && isSelected && !isCorrect;

          return (
            <button
              key={index}
              onClick={() => !showResult && handleAnswer(index)}
              disabled={showResult}
              className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                showCorrect ? 'border-green-500 bg-green-500/20' :
                showWrong ? 'border-red-500 bg-red-500/20' :
                'border-gray-700 bg-gray-800/50 hover:border-gray-600'
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>

      {showResult && (
        <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
          <p className="text-sm text-gray-300">{challenge.explanation}</p>
        </div>
      )}
    </div>
  );
}

// Matching Challenge Component
function MatchingChallenge({ challenge, onComplete }) {
  const [selectedPart, setSelectedPart] = useState(null);
  const [selectedFunc, setSelectedFunc] = useState(null);
  const [matches, setMatches] = useState([]);

  const shuffledParts = [...challenge.pairs].sort(() => Math.random() - 0.5);
  const shuffledFuncs = [...challenge.pairs].sort(() => Math.random() - 0.5);

  const handleMatch = (partIdx, funcIdx) => {
    const part = shuffledParts[partIdx];
    const func = shuffledFuncs[funcIdx];
    
    if (part.part === func.part) {
      const newMatches = [...matches, { partIdx, funcIdx }];
      setMatches(newMatches);
      
      if (newMatches.length === challenge.pairs.length) {
        setTimeout(() => onComplete(150), 1000);
      }
    }
    
    setSelectedPart(null);
    setSelectedFunc(null);
  };

  const handlePartClick = (idx) => {
    if (matches.find(m => m.partIdx === idx)) return;
    setSelectedPart(idx);
    if (selectedFunc !== null) handleMatch(idx, selectedFunc);
  };

  const handleFuncClick = (idx) => {
    if (matches.find(m => m.funcIdx === idx)) return;
    setSelectedFunc(idx);
    if (selectedPart !== null) handleMatch(selectedPart, idx);
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-2xl p-8">
      <h2 className="text-2xl font-bold mb-6">{challenge.title}</h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <h3 className="font-semibold text-purple-400 mb-3">Parts</h3>
          {shuffledParts.map((item, idx) => {
            const isMatched = matches.find(m => m.partIdx === idx);
            const isSelected = selectedPart === idx;
            
            return (
              <button
                key={idx}
                onClick={() => handlePartClick(idx)}
                disabled={isMatched}
                className={`w-full p-3 rounded-lg border-2 transition-all ${
                  isMatched ? 'border-green-500 bg-green-500/20' :
                  isSelected ? 'border-purple-500 bg-purple-500/20' :
                  'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                }`}
              >
                <span className="text-2xl mr-2">{item.emoji}</span>
                {item.part}
              </button>
            );
          })}
        </div>

        <div className="space-y-3">
          <h3 className="font-semibold text-cyan-400 mb-3">Functions</h3>
          {shuffledFuncs.map((item, idx) => {
            const isMatched = matches.find(m => m.funcIdx === idx);
            const isSelected = selectedFunc === idx;
            
            return (
              <button
                key={idx}
                onClick={() => handleFuncClick(idx)}
                disabled={isMatched}
                className={`w-full p-3 rounded-lg border-2 transition-all ${
                  isMatched ? 'border-green-500 bg-green-500/20' :
                  isSelected ? 'border-cyan-500 bg-cyan-500/20' :
                  'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                }`}
              >
                {item.function}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Simulation Challenge Component
function SimulationChallenge({ challenge, onComplete }) {
  const [values, setValues] = useState(challenge.parameters.map(() => 50));

  const checkSolution = () => {
    const allCorrect = challenge.parameters.every((param, idx) => {
      return values[idx] >= param.optimal[0] && values[idx] <= param.optimal[1];
    });

    if (allCorrect) {
      onComplete(200);
    }
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-2xl p-8">
      <h2 className="text-2xl font-bold mb-2">{challenge.title}</h2>
      <p className="text-gray-400 mb-6">{challenge.description}</p>

      <div className="space-y-6 mb-6">
        {challenge.parameters.map((param, idx) => (
          <div key={idx}>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">{param.name}</span>
              <span className="text-cyan-400 font-bold">{values[idx]}</span>
            </div>
            <input
              type="range"
              min={param.min}
              max={param.max}
              value={values[idx]}
              onChange={(e) => {
                const newValues = [...values];
                newValues[idx] = parseFloat(e.target.value);
                setValues(newValues);
              }}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
            />
          </div>
        ))}
      </div>

      <button
        onClick={checkSolution}
        className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold hover:scale-105 transition-transform"
      >
        Check Solution
      </button>
    </div>
  );
}

// Builder Challenge Component
function BuilderChallenge({ challenge, onComplete }) {
  const [placed, setPlaced] = useState({});
  const [draggedPart, setDraggedPart] = useState(null);

  const handleDrop = (slotId) => {
    if (draggedPart) {
      setPlaced({ ...placed, [slotId]: draggedPart });
      setDraggedPart(null);
    }
  };

  const checkSolution = () => {
    const allCorrect = challenge.parts.every(part => placed[part.slot]?.id === part.id);
    if (allCorrect) {
      onComplete(180);
    }
  };

  const availableParts = challenge.parts.filter(
    part => !Object.values(placed).find(p => p.id === part.id)
  );

  return (
    <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-2xl p-8">
      <h2 className="text-2xl font-bold mb-6">{challenge.title}</h2>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-semibold mb-4">Available Parts</h3>
          <div className="grid grid-cols-2 gap-3">
            {availableParts.map(part => (
              <div
                key={part.id}
                draggable
                onDragStart={() => setDraggedPart(part)}
                className="bg-gray-900/50 border-2 border-gray-700 rounded-lg p-3 cursor-move hover:border-orange-500"
              >
                <div className="text-3xl text-center mb-1">{part.emoji}</div>
                <div className="text-xs text-center">{part.name}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-4">Assembly</h3>
          <div className="space-y-3">
            {challenge.slots.map(slot => {
              const placedPart = placed[slot.id];
              return (
                <div
                  key={slot.id}
                  onDrop={() => handleDrop(slot.id)}
                  onDragOver={(e) => e.preventDefault()}
                  className={`h-20 border-2 rounded-lg flex items-center justify-center ${
                    placedPart ? 'border-orange-500 bg-orange-500/10' : 'border-dashed border-gray-600'
                  }`}
                >
                  {placedPart ? (
                    <div className="text-center">
                      <div className="text-2xl">{placedPart.emoji}</div>
                      <div className="text-xs">{placedPart.name}</div>
                    </div>
                  ) : (
                    <span className="text-sm text-gray-500">{slot.label}</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <button
        onClick={checkSolution}
        disabled={availableParts.length > 0}
        className="w-full mt-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg font-semibold hover:scale-105 transition-transform disabled:opacity-50"
      >
        Check Assembly
      </button>
    </div>
  );
}
