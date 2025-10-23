import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Wrench, CheckCircle, XCircle, RotateCw, Trophy } from 'lucide-react';

export default function SimulationGame() {
  const navigate = useNavigate();
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Jet Engine Challenge
  const [airFlow, setAirFlow] = useState(50);
  const [fuelFlow, setFuelFlow] = useState(50);
  const [compression, setCompression] = useState(50);

  // Suspension Challenge
  const [springStiffness, setSpringStiffness] = useState(50);
  const [damping, setDamping] = useState(50);
  const [rideHeight, setRideHeight] = useState(50);

  // Rocket Nozzle Challenge
  const [throatArea, setThroatArea] = useState(50);
  const [exitArea, setExitArea] = useState(50);
  const [chamberPressure, setChamberPressure] = useState(50);

  const challenges = [
    {
      id: 'jet-engine',
      title: 'Jet Engine Optimization',
      description: 'Adjust air flow, fuel flow, and compression to achieve optimal thrust',
      target: 'Achieve 85-95% efficiency',
      parameters: [
        { name: 'Air Flow', value: airFlow, setter: setAirFlow, unit: '%', optimal: [70, 90] },
        { name: 'Fuel Flow', value: fuelFlow, setter: setFuelFlow, unit: '%', optimal: [60, 80] },
        { name: 'Compression Ratio', value: compression, setter: setCompression, unit: 'x', optimal: [75, 95] }
      ],
      calculate: () => {
        const airFuelRatio = airFlow / fuelFlow;
        const efficiency = (airFuelRatio * compression) / 100;
        return { value: efficiency, inRange: efficiency >= 0.85 && efficiency <= 0.95 };
      }
    },
    {
      id: 'suspension',
      title: 'Car Suspension Balance',
      description: 'Balance spring stiffness, damping, and ride height for optimal handling',
      target: 'Achieve balanced ride comfort and handling',
      parameters: [
        { name: 'Spring Stiffness', value: springStiffness, setter: setSpringStiffness, unit: 'N/mm', optimal: [40, 60] },
        { name: 'Damping', value: damping, setter: setDamping, unit: '%', optimal: [45, 65] },
        { name: 'Ride Height', value: rideHeight, setter: setRideHeight, unit: 'mm', optimal: [35, 55] }
      ],
      calculate: () => {
        const balance = Math.abs(springStiffness - damping) + Math.abs(rideHeight - 50);
        const score = 100 - balance;
        return { value: score, inRange: score >= 75 };
      }
    },
    {
      id: 'rocket-nozzle',
      title: 'Rocket Nozzle Design',
      description: 'Optimize throat area, exit area, and chamber pressure for maximum thrust',
      target: 'Achieve optimal expansion ratio',
      parameters: [
        { name: 'Throat Area', value: throatArea, setter: setThroatArea, unit: 'm²', optimal: [30, 50] },
        { name: 'Exit Area', value: exitArea, setter: setExitArea, unit: 'm²', optimal: [70, 90] },
        { name: 'Chamber Pressure', value: chamberPressure, setter: setChamberPressure, unit: 'MPa', optimal: [60, 80] }
      ],
      calculate: () => {
        const expansionRatio = exitArea / throatArea;
        const thrust = expansionRatio * chamberPressure;
        return { value: thrust, inRange: thrust >= 100 && thrust <= 150 };
      }
    }
  ];

  const challenge = challenges[currentChallenge];
  const result = challenge.calculate();

  const checkSolution = () => {
    setAttempts(attempts + 1);
    setShowResult(true);
    
    if (result.inRange) {
      setIsSuccess(true);
      setScore(score + Math.max(100 - attempts * 10, 50));
    } else {
      setIsSuccess(false);
    }
  };

  const nextChallenge = () => {
    if (currentChallenge < challenges.length - 1) {
      setCurrentChallenge(currentChallenge + 1);
      setAttempts(0);
      setShowResult(false);
      setIsSuccess(false);
      // Reset all values
      setAirFlow(50);
      setFuelFlow(50);
      setCompression(50);
      setSpringStiffness(50);
      setDamping(50);
      setRideHeight(50);
      setThroatArea(50);
      setExitArea(50);
      setChamberPressure(50);
    } else {
      // Game complete
      navigate('/games');
    }
  };

  const resetChallenge = () => {
    setAttempts(0);
    setShowResult(false);
    setIsSuccess(false);
    challenge.parameters.forEach(param => param.setter(50));
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
              <Wrench className="w-8 h-8 text-cyan-400" />
              <div>
                <h1 className="text-xl font-bold">Simulation Challenge</h1>
                <p className="text-sm text-gray-400">Challenge {currentChallenge + 1}/{challenges.length}</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-400" />
                <span className="text-2xl font-bold text-yellow-400">{score}</span>
              </div>
              <div className="text-sm text-gray-400">
                Attempts: {attempts}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Challenge */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Controls */}
          <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-2">{challenge.title}</h2>
            <p className="text-gray-400 mb-6">{challenge.description}</p>

            <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4 mb-6">
              <div className="text-sm text-gray-400 mb-1">Target:</div>
              <div className="font-semibold text-cyan-400">{challenge.target}</div>
            </div>

            <div className="space-y-6">
              {challenge.parameters.map((param, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium text-gray-300">{param.name}</label>
                    <span className="text-sm font-bold text-cyan-400">
                      {param.value} {param.unit}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={param.value}
                    onChange={(e) => {
                      param.setter(parseFloat(e.target.value));
                      setShowResult(false);
                    }}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Min</span>
                    <span>Max</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-4 mt-8">
              <button
                onClick={checkSolution}
                className="flex-1 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold hover:scale-105 transition-transform"
              >
                Check Solution
              </button>
              <button
                onClick={resetChallenge}
                className="p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              >
                <RotateCw className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Visualization */}
          <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-2xl p-8">
            <h3 className="text-xl font-bold mb-6">System Status</h3>

            {/* Result Display */}
            <div className="mb-8">
              <div className="text-sm text-gray-400 mb-2">Current Performance:</div>
              <div className="text-4xl font-bold mb-4">
                <span className={result.inRange ? 'text-green-400' : 'text-orange-400'}>
                  {result.value.toFixed(2)}
                </span>
              </div>

              {/* Performance Bar */}
              <div className="bg-gray-700 rounded-full h-4 overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    result.inRange ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gradient-to-r from-orange-500 to-red-500'
                  }`}
                  style={{ width: `${Math.min(result.value, 100)}%` }}
                />
              </div>
            </div>

            {/* Parameter Status */}
            <div className="space-y-3 mb-8">
              {challenge.parameters.map((param, index) => {
                const inRange = param.value >= param.optimal[0] && param.value <= param.optimal[1];
                return (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg">
                    <span className="text-sm text-gray-300">{param.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold">{param.value}{param.unit}</span>
                      {inRange ? (
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      ) : (
                        <XCircle className="w-5 h-5 text-gray-600" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Result Message */}
            {showResult && (
              <div className={`p-4 rounded-lg border-2 ${
                isSuccess
                  ? 'bg-green-500/10 border-green-500'
                  : 'bg-orange-500/10 border-orange-500'
              }`}>
                <div className="flex items-center gap-3 mb-2">
                  {isSuccess ? (
                    <CheckCircle className="w-6 h-6 text-green-400" />
                  ) : (
                    <XCircle className="w-6 h-6 text-orange-400" />
                  )}
                  <span className="font-bold">
                    {isSuccess ? 'Success!' : 'Not quite right'}
                  </span>
                </div>
                <p className="text-sm text-gray-300">
                  {isSuccess
                    ? 'Perfect! You optimized the system successfully.'
                    : 'Try adjusting the parameters to reach the target range.'}
                </p>
                {isSuccess && (
                  <button
                    onClick={nextChallenge}
                    className="mt-4 w-full py-2 bg-green-500 hover:bg-green-600 rounded-lg font-semibold transition-colors"
                  >
                    {currentChallenge < challenges.length - 1 ? 'Next Challenge' : 'Complete'}
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Progress */}
        <div className="mt-8 bg-gray-800 rounded-full h-2 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300"
            style={{ width: `${((currentChallenge + 1) / challenges.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}
