import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Wrench, CheckCircle, XCircle, Trophy, RotateCw } from 'lucide-react';

export default function EngineBuilderGame() {
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [placedParts, setPlacedParts] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [draggedPart, setDraggedPart] = useState(null);

  const levels = [
    {
      title: 'Basic Engine Assembly',
      description: 'Place the core engine components in the correct positions',
      parts: [
        { id: 'piston', name: 'Piston', emoji: '🔩', slot: 'cylinder' },
        { id: 'crankshaft', name: 'Crankshaft', emoji: '⚙️', slot: 'bottom' },
        { id: 'valves', name: 'Valves', emoji: '🔧', slot: 'top' },
        { id: 'sparkplug', name: 'Spark Plug', emoji: '⚡', slot: 'head' }
      ],
      slots: [
        { id: 'head', label: 'Cylinder Head', position: 'top-0' },
        { id: 'top', label: 'Valve Train', position: 'top-20' },
        { id: 'cylinder', label: 'Cylinder', position: 'top-40' },
        { id: 'bottom', label: 'Crankcase', position: 'top-60' }
      ]
    },
    {
      title: 'Turbocharger System',
      description: 'Assemble the forced induction system',
      parts: [
        { id: 'compressor', name: 'Compressor', emoji: '🌀', slot: 'intake' },
        { id: 'turbine', name: 'Turbine', emoji: '💨', slot: 'exhaust' },
        { id: 'intercooler', name: 'Intercooler', emoji: '❄️', slot: 'cooling' },
        { id: 'wastegate', name: 'Wastegate', emoji: '🚪', slot: 'control' }
      ],
      slots: [
        { id: 'intake', label: 'Air Intake', position: 'top-0' },
        { id: 'cooling', label: 'Cooling System', position: 'top-20' },
        { id: 'exhaust', label: 'Exhaust Side', position: 'top-40' },
        { id: 'control', label: 'Boost Control', position: 'top-60' }
      ]
    },
    {
      title: 'Fuel Injection System',
      description: 'Build a complete fuel delivery system',
      parts: [
        { id: 'pump', name: 'Fuel Pump', emoji: '⛽', slot: 'tank' },
        { id: 'filter', name: 'Fuel Filter', emoji: '🔍', slot: 'line' },
        { id: 'rail', name: 'Fuel Rail', emoji: '🚂', slot: 'manifold' },
        { id: 'injector', name: 'Injector', emoji: '💉', slot: 'cylinder' }
      ],
      slots: [
        { id: 'tank', label: 'Fuel Tank', position: 'top-0' },
        { id: 'line', label: 'Fuel Line', position: 'top-20' },
        { id: 'manifold', label: 'Intake Manifold', position: 'top-40' },
        { id: 'cylinder', label: 'Combustion Chamber', position: 'top-60' }
      ]
    }
  ];

  const level = levels[currentLevel];

  const handleDragStart = (part) => {
    setDraggedPart(part);
  };

  const handleDrop = (slotId) => {
    if (draggedPart) {
      setPlacedParts({ ...placedParts, [slotId]: draggedPart });
      setDraggedPart(null);
      setShowResult(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const checkSolution = () => {
    let correct = 0;
    level.parts.forEach(part => {
      if (placedParts[part.slot]?.id === part.id) {
        correct++;
      }
    });

    const isComplete = correct === level.parts.length;
    setShowResult(true);

    if (isComplete) {
      setScore(score + 100);
    }

    return isComplete;
  };

  const nextLevel = () => {
    if (currentLevel < levels.length - 1) {
      setCurrentLevel(currentLevel + 1);
      setPlacedParts({});
      setShowResult(false);
    } else {
      navigate('/games');
    }
  };

  const resetLevel = () => {
    setPlacedParts({});
    setShowResult(false);
  };

  const isCorrectPlacement = (slotId) => {
    const placedPart = placedParts[slotId];
    if (!placedPart) return null;
    const correctPart = level.parts.find(p => p.slot === slotId);
    return placedPart.id === correctPart?.id;
  };

  const availableParts = level.parts.filter(
    part => !Object.values(placedParts).find(p => p.id === part.id)
  );

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
              <Wrench className="w-8 h-8 text-orange-400" />
              <div>
                <h1 className="text-xl font-bold">Engine Builder</h1>
                <p className="text-sm text-gray-400">Level {currentLevel + 1}/{levels.length}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-400" />
              <span className="text-2xl font-bold text-yellow-400">{score}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Game Area */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">{level.title}</h2>
          <p className="text-gray-400">{level.description}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Parts Inventory */}
          <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-2xl p-6">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Wrench className="w-5 h-5 text-orange-400" />
              Available Parts
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {availableParts.map(part => (
                <div
                  key={part.id}
                  draggable
                  onDragStart={() => handleDragStart(part)}
                  className="bg-gray-900/50 border-2 border-gray-700 rounded-xl p-4 cursor-move hover:border-orange-500 hover:scale-105 transition-all"
                >
                  <div className="text-4xl mb-2 text-center">{part.emoji}</div>
                  <div className="text-sm font-semibold text-center">{part.name}</div>
                </div>
              ))}
            </div>

            {availableParts.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                All parts placed! Check your solution.
              </div>
            )}

            <div className="mt-6 flex gap-3">
              <button
                onClick={checkSolution}
                disabled={availableParts.length > 0}
                className="flex-1 py-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg font-semibold hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Check Solution
              </button>
              <button
                onClick={resetLevel}
                className="p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              >
                <RotateCw className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Assembly Area */}
          <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-2xl p-6">
            <h3 className="text-xl font-bold mb-6">Engine Assembly</h3>
            <div className="relative h-96 bg-gray-900/50 rounded-xl border-2 border-dashed border-gray-600">
              {level.slots.map(slot => {
                const placedPart = placedParts[slot.id];
                const isCorrect = isCorrectPlacement(slot.id);

                return (
                  <div
                    key={slot.id}
                    onDrop={() => handleDrop(slot.id)}
                    onDragOver={handleDragOver}
                    className={`absolute left-1/2 -translate-x-1/2 ${slot.position} w-3/4 h-20 border-2 rounded-lg transition-all ${
                      placedPart
                        ? showResult
                          ? isCorrect
                            ? 'border-green-500 bg-green-500/20'
                            : 'border-red-500 bg-red-500/20'
                          : 'border-orange-500 bg-orange-500/10'
                        : 'border-gray-600 border-dashed hover:border-gray-500'
                    }`}
                  >
                    <div className="absolute -top-6 left-0 text-xs text-gray-400">
                      {slot.label}
                    </div>
                    {placedPart && (
                      <div className="h-full flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-3xl mb-1">{placedPart.emoji}</div>
                          <div className="text-xs font-semibold">{placedPart.name}</div>
                        </div>
                        {showResult && (
                          <div className="absolute top-2 right-2">
                            {isCorrect ? (
                              <CheckCircle className="w-5 h-5 text-green-400" />
                            ) : (
                              <XCircle className="w-5 h-5 text-red-400" />
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {showResult && (
              <div className={`mt-6 p-4 rounded-lg border-2 ${
                checkSolution()
                  ? 'bg-green-500/10 border-green-500'
                  : 'bg-orange-500/10 border-orange-500'
              }`}>
                <div className="flex items-center gap-3 mb-2">
                  {checkSolution() ? (
                    <CheckCircle className="w-6 h-6 text-green-400" />
                  ) : (
                    <XCircle className="w-6 h-6 text-orange-400" />
                  )}
                  <span className="font-bold">
                    {checkSolution() ? 'Perfect Assembly!' : 'Some parts are incorrect'}
                  </span>
                </div>
                {checkSolution() && (
                  <button
                    onClick={nextLevel}
                    className="mt-3 w-full py-2 bg-green-500 hover:bg-green-600 rounded-lg font-semibold transition-colors"
                  >
                    {currentLevel < levels.length - 1 ? 'Next Level' : 'Complete'}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Progress */}
        <div className="mt-8 bg-gray-800 rounded-full h-2 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-300"
            style={{ width: `${((currentLevel + 1) / levels.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
