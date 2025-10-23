import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Brain, CheckCircle, Trophy, RotateCw } from 'lucide-react';

export default function MatchingGame() {
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [currentRound, setCurrentRound] = useState(0);
  const [selectedPart, setSelectedPart] = useState(null);
  const [selectedFunction, setSelectedFunction] = useState(null);
  const [matches, setMatches] = useState([]);
  const [showResult, setShowResult] = useState(false);

  const rounds = [
    {
      title: 'Engine Components',
      pairs: [
        { part: 'Piston', function: 'Converts pressure into motion', emoji: '🔩' },
        { part: 'Crankshaft', function: 'Converts linear to rotational motion', emoji: '⚙️' },
        { part: 'Camshaft', function: 'Controls valve timing', emoji: '🔧' },
        { part: 'Turbocharger', function: 'Compresses intake air', emoji: '🌀' },
        { part: 'Spark Plug', function: 'Ignites air-fuel mixture', emoji: '⚡' }
      ]
    },
    {
      title: 'Aircraft Parts',
      pairs: [
        { part: 'Aileron', function: 'Controls roll (banking)', emoji: '✈️' },
        { part: 'Elevator', function: 'Controls pitch (nose up/down)', emoji: '🛫' },
        { part: 'Rudder', function: 'Controls yaw (nose left/right)', emoji: '🎯' },
        { part: 'Flaps', function: 'Increases lift at low speed', emoji: '📐' },
        { part: 'Slats', function: 'Delays stall at high angles', emoji: '🔺' }
      ]
    },
    {
      title: 'Rocket Systems',
      pairs: [
        { part: 'Nozzle', function: 'Accelerates exhaust gases', emoji: '🚀' },
        { part: 'Turbopump', function: 'Pressurizes propellants', emoji: '💨' },
        { part: 'Gimbal', function: 'Steers thrust direction', emoji: '🎮' },
        { part: 'Heat Shield', function: 'Protects from reentry heat', emoji: '🛡️' },
        { part: 'Grid Fins', function: 'Provides aerodynamic control', emoji: '📊' }
      ]
    }
  ];

  const round = rounds[currentRound];
  const shuffledParts = [...round.pairs].sort(() => Math.random() - 0.5);
  const shuffledFunctions = [...round.pairs].sort(() => Math.random() - 0.5);

  const handlePartClick = (index) => {
    if (matches.find(m => m.partIndex === index)) return;
    setSelectedPart(index);
    
    if (selectedFunction !== null) {
      checkMatch(index, selectedFunction);
    }
  };

  const handleFunctionClick = (index) => {
    if (matches.find(m => m.functionIndex === index)) return;
    setSelectedFunction(index);
    
    if (selectedPart !== null) {
      checkMatch(selectedPart, index);
    }
  };

  const checkMatch = (partIdx, funcIdx) => {
    const part = shuffledParts[partIdx];
    const func = shuffledFunctions[funcIdx];
    
    if (part.part === func.part) {
      // Correct match
      setMatches([...matches, { partIndex: partIdx, functionIndex: funcIdx, correct: true }]);
      setScore(score + 20);
    } else {
      // Wrong match - show briefly then reset
      setMatches([...matches, { partIndex: partIdx, functionIndex: funcIdx, correct: false }]);
      setTimeout(() => {
        setMatches(matches.filter(m => m.partIndex !== partIdx && m.functionIndex !== funcIdx));
      }, 1000);
    }
    
    setSelectedPart(null);
    setSelectedFunction(null);
  };

  const isComplete = matches.filter(m => m.correct).length === round.pairs.length;

  const nextRound = () => {
    if (currentRound < rounds.length - 1) {
      setCurrentRound(currentRound + 1);
      setMatches([]);
      setSelectedPart(null);
      setSelectedFunction(null);
      setShowResult(false);
    } else {
      navigate('/games');
    }
  };

  const resetRound = () => {
    setMatches([]);
    setSelectedPart(null);
    setSelectedFunction(null);
    setShowResult(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Header */}
      <div className="border-b border-gray-700 bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
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
                <h1 className="text-xl font-bold">Matching Game</h1>
                <p className="text-sm text-gray-400">Round {currentRound + 1}/{rounds.length}</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-400" />
                <span className="text-2xl font-bold text-yellow-400">{score}</span>
              </div>
              <div className="text-sm text-gray-400">
                {matches.filter(m => m.correct).length}/{round.pairs.length} matched
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Game Area */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">{round.title}</h2>
          <p className="text-gray-400">Match each part with its function</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Parts Column */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold mb-4 text-purple-400">Parts</h3>
            {shuffledParts.map((item, index) => {
              const isMatched = matches.find(m => m.partIndex === index && m.correct);
              const isWrong = matches.find(m => m.partIndex === index && !m.correct);
              const isSelected = selectedPart === index;

              return (
                <button
                  key={index}
                  onClick={() => handlePartClick(index)}
                  disabled={isMatched}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    isMatched
                      ? 'border-green-500 bg-green-500/20 cursor-not-allowed'
                      : isWrong
                      ? 'border-red-500 bg-red-500/20 animate-shake'
                      : isSelected
                      ? 'border-purple-500 bg-purple-500/20 scale-105'
                      : 'border-gray-700 bg-gray-800/50 hover:border-gray-600 hover:scale-102'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{item.emoji}</span>
                    <span className="font-semibold">{item.part}</span>
                    {isMatched && <CheckCircle className="w-5 h-5 text-green-400 ml-auto" />}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Functions Column */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold mb-4 text-cyan-400">Functions</h3>
            {shuffledFunctions.map((item, index) => {
              const isMatched = matches.find(m => m.functionIndex === index && m.correct);
              const isWrong = matches.find(m => m.functionIndex === index && !m.correct);
              const isSelected = selectedFunction === index;

              return (
                <button
                  key={index}
                  onClick={() => handleFunctionClick(index)}
                  disabled={isMatched}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    isMatched
                      ? 'border-green-500 bg-green-500/20 cursor-not-allowed'
                      : isWrong
                      ? 'border-red-500 bg-red-500/20 animate-shake'
                      : isSelected
                      ? 'border-cyan-500 bg-cyan-500/20 scale-105'
                      : 'border-gray-700 bg-gray-800/50 hover:border-gray-600 hover:scale-102'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm">{item.function}</span>
                    {isMatched && <CheckCircle className="w-5 h-5 text-green-400 ml-auto" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Complete Message */}
        {isComplete && (
          <div className="bg-green-500/10 border-2 border-green-500 rounded-xl p-6 text-center">
            <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
            <h3 className="text-2xl font-bold mb-2">Perfect Match!</h3>
            <p className="text-gray-300 mb-4">You matched all parts correctly!</p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={nextRound}
                className="px-6 py-3 bg-green-500 hover:bg-green-600 rounded-lg font-semibold transition-colors"
              >
                {currentRound < rounds.length - 1 ? 'Next Round' : 'Complete'}
              </button>
              <button
                onClick={resetRound}
                className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold transition-colors flex items-center gap-2"
              >
                <RotateCw className="w-5 h-5" />
                Reset
              </button>
            </div>
          </div>
        )}

        {/* Progress */}
        <div className="mt-8 bg-gray-800 rounded-full h-2 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
            style={{ width: `${((currentRound + 1) / rounds.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
