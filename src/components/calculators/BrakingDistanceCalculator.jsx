import { useState } from 'react';
import { Calculator } from 'lucide-react';

export default function BrakingDistanceCalculator() {
  const [speed, setSpeed] = useState(100); // km/h
  const [friction, setFriction] = useState(0.7);
  const [reactionTime, setReactionTime] = useState(1.5); // seconds
  
  const speedMs = speed / 3.6; // Convert to m/s
  const g = 9.81;
  
  // Reaction distance
  const reactionDistance = speedMs * reactionTime;
  
  // Braking distance: v²/(2μg)
  const brakingDistance = (speedMs * speedMs) / (2 * friction * g);
  
  // Total stopping distance
  const totalDistance = reactionDistance + brakingDistance;
  
  // Time to stop (after braking starts)
  const brakingTime = speedMs / (friction * g);
  const totalTime = reactionTime + brakingTime;

  const getSurfaceType = (mu) => {
    if (mu >= 0.8) return "Dry asphalt (excellent)";
    if (mu >= 0.6) return "Wet asphalt (good)";
    if (mu >= 0.4) return "Wet road (poor)";
    if (mu >= 0.2) return "Snow (dangerous)";
    return "Ice (extremely dangerous)";
  };

  return (
    <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 my-6 border-2 border-orange-200 dark:border-orange-700">
      <div className="flex items-center gap-3 mb-4">
        <Calculator className="w-6 h-6 text-orange-600" />
        <h3 className="text-xl font-bold text-gray-800 dark:text-white">
          🚗 Braking Distance Calculator
        </h3>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-4">
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
          <strong>Physics:</strong> d<sub>brake</sub> = v²/(2μg) + v×t<sub>reaction</sub>
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        {/* Speed */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Speed
          </label>
          <input
            type="range"
            min="20"
            max="200"
            step="5"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="w-full h-2 bg-orange-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between items-center mt-2">
            <input
              type="number"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="w-24 px-2 py-1 border rounded text-sm dark:bg-gray-700 dark:text-white"
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">km/h</span>
          </div>
          <div className="text-xs text-gray-500 mt-1">
            ({speedMs.toFixed(1)} m/s)
          </div>
        </div>

        {/* Friction Coefficient */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Friction Coefficient (μ)
          </label>
          <input
            type="range"
            min="0.1"
            max="1.0"
            step="0.05"
            value={friction}
            onChange={(e) => setFriction(Number(e.target.value))}
            className="w-full h-2 bg-orange-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between items-center mt-2">
            <input
              type="number"
              step="0.05"
              value={friction}
              onChange={(e) => setFriction(Number(e.target.value))}
              className="w-24 px-2 py-1 border rounded text-sm dark:bg-gray-700 dark:text-white"
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">μ</span>
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {getSurfaceType(friction)}
          </div>
        </div>

        {/* Reaction Time */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Reaction Time
          </label>
          <input
            type="range"
            min="0.5"
            max="3.0"
            step="0.1"
            value={reactionTime}
            onChange={(e) => setReactionTime(Number(e.target.value))}
            className="w-full h-2 bg-orange-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between items-center mt-2">
            <input
              type="number"
              step="0.1"
              value={reactionTime}
              onChange={(e) => setReactionTime(Number(e.target.value))}
              className="w-24 px-2 py-1 border rounded text-sm dark:bg-gray-700 dark:text-white"
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">sec</span>
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {reactionTime <= 1.0 && "Alert driver"}
            {reactionTime > 1.0 && reactionTime <= 2.0 && "Average driver"}
            {reactionTime > 2.0 && "Distracted/tired"}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="grid md:grid-cols-4 gap-4 mb-4">
        <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg p-4 text-white">
          <div className="text-xs opacity-90 mb-1">Reaction Distance</div>
          <div className="text-2xl font-bold">{reactionDistance.toFixed(1)}</div>
          <div className="text-xs opacity-90">meters</div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg p-4 text-white">
          <div className="text-xs opacity-90 mb-1">Braking Distance</div>
          <div className="text-2xl font-bold">{brakingDistance.toFixed(1)}</div>
          <div className="text-xs opacity-90">meters</div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-lg p-4 text-white">
          <div className="text-xs opacity-90 mb-1">Total Distance</div>
          <div className="text-2xl font-bold">{totalDistance.toFixed(1)}</div>
          <div className="text-xs opacity-90">meters</div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg p-4 text-white">
          <div className="text-xs opacity-90 mb-1">Total Time</div>
          <div className="text-2xl font-bold">{totalTime.toFixed(1)}</div>
          <div className="text-xs opacity-90">seconds</div>
        </div>
      </div>

      {/* Visual Representation */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-4">
        <div className="text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">Stopping Distance Breakdown:</div>
        <div className="flex items-center gap-2">
          <div 
            className="bg-blue-400 h-8 rounded flex items-center justify-center text-white text-xs font-bold"
            style={{ width: `${(reactionDistance / totalDistance) * 100}%` }}
          >
            {reactionDistance.toFixed(0)}m
          </div>
          <div 
            className="bg-red-400 h-8 rounded flex items-center justify-center text-white text-xs font-bold"
            style={{ width: `${(brakingDistance / totalDistance) * 100}%` }}
          >
            {brakingDistance.toFixed(0)}m
          </div>
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>🚗 Reaction</span>
          <span>🛑 Braking</span>
        </div>
      </div>

      {/* Interpretation */}
      <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          <strong>💡 Interpretation:</strong> At <strong>{speed} km/h</strong> on <strong>{getSurfaceType(friction)}</strong>, 
          you need <strong>{totalDistance.toFixed(1)} meters</strong> to stop completely. 
          {totalDistance > 100 && " ⚠️ That's longer than a football field!"}
          {friction < 0.3 && " 🚨 Extremely dangerous conditions - slow down!"}
        </p>
        <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
          <strong>Key insight:</strong> Doubling speed quadruples braking distance due to v² relationship!
        </p>
      </div>
    </div>
  );
}
