import { useState } from 'react';
import { Target } from 'lucide-react';

export default function StabilityDemo() {
  const [comPosition, setComPosition] = useState(40); // Center of Mass
  const [copPosition, setCopPosition] = useState(60); // Center of Pressure
  const [tilt, setTilt] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);

  const isStable = copPosition > comPosition;
  const stabilityMargin = copPosition - comPosition;

  const applyPerturbation = () => {
    setTilt(15);
    setIsSimulating(true);

    // Simulate response
    let currentTilt = 15;
    const interval = setInterval(() => {
      if (isStable) {
        // Restoring motion - oscillate back to zero
        currentTilt = currentTilt * 0.8;
        setTilt(currentTilt);
        
        if (Math.abs(currentTilt) < 0.5) {
          setTilt(0);
          setIsSimulating(false);
          clearInterval(interval);
        }
      } else {
        // Divergent motion - gets worse
        currentTilt = currentTilt * 1.2;
        setTilt(Math.min(currentTilt, 90));
        
        if (currentTilt >= 90) {
          setIsSimulating(false);
          clearInterval(interval);
        }
      }
    }, 100);
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-xl p-6">
      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Target className="w-6 h-6 text-purple-400" />
        Stability & Balance Demo
      </h3>
      <p className="text-sm text-gray-400 mb-6">
        Move the Center of Mass (CoM) and Center of Pressure (CoP). For stability, CoP must be behind CoM!
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="space-y-6">
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium">Center of Mass (CoM)</label>
              <span className="text-red-400 font-bold">{comPosition}%</span>
            </div>
            <input
              type="range"
              min="20"
              max="80"
              value={comPosition}
              onChange={(e) => {
                setComPosition(parseFloat(e.target.value));
                setTilt(0);
              }}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-red-500"
            />
            <div className="text-xs text-gray-400 mt-1">
              Payload, fuel, structure weight
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium">Center of Pressure (CoP)</label>
              <span className="text-blue-400 font-bold">{copPosition}%</span>
            </div>
            <input
              type="range"
              min="20"
              max="80"
              value={copPosition}
              onChange={(e) => {
                setCopPosition(parseFloat(e.target.value));
                setTilt(0);
              }}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <div className="text-xs text-gray-400 mt-1">
              Aerodynamic forces (fins, body)
            </div>
          </div>

          <div className={`p-4 rounded-lg border-2 ${
            isStable
              ? 'bg-green-500/10 border-green-500'
              : 'bg-red-500/10 border-red-500'
          }`}>
            <div className="font-bold mb-2">
              {isStable ? '✓ STABLE' : '✗ UNSTABLE'}
            </div>
            <div className="text-sm text-gray-300">
              Stability Margin: {stabilityMargin.toFixed(1)}%
            </div>
            <div className="text-xs text-gray-400 mt-2">
              {isStable
                ? 'CoP is behind CoM - rocket will self-correct'
                : 'CoP is ahead of CoM - rocket will tumble!'}
            </div>
          </div>

          <button
            onClick={applyPerturbation}
            disabled={isSimulating}
            className="w-full py-3 bg-purple-500 hover:bg-purple-600 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-lg font-semibold transition-colors"
          >
            {isSimulating ? 'Simulating...' : 'Apply Wind Gust'}
          </button>
        </div>

        {/* Visualization */}
        <div className="relative h-96 bg-gradient-to-b from-gray-900/50 to-transparent rounded-xl overflow-hidden border border-gray-700 flex items-center justify-center">
          {/* Rocket */}
          <div
            className="relative transition-transform duration-300"
            style={{ transform: `rotate(${tilt}deg)` }}
          >
            {/* Rocket body */}
            <div className="relative w-16 h-64 bg-gradient-to-b from-gray-300 to-gray-400 rounded-t-full">
              {/* Nose cone */}
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-gray-300" />
              
              {/* Center of Mass marker */}
              <div
                className="absolute left-1/2 -translate-x-1/2 w-8 h-8 bg-red-500 rounded-full border-4 border-white flex items-center justify-center text-xs font-bold"
                style={{ top: `${comPosition}%` }}
              >
                CoM
              </div>

              {/* Center of Pressure marker */}
              <div
                className="absolute left-1/2 -translate-x-1/2 w-8 h-8 bg-blue-500 rounded-full border-4 border-white flex items-center justify-center text-xs font-bold"
                style={{ top: `${copPosition}%` }}
              >
                CoP
              </div>

              {/* Fins */}
              <div className="absolute bottom-4 -left-6 w-6 h-12 bg-gray-500 clip-triangle" />
              <div className="absolute bottom-4 -right-6 w-6 h-12 bg-gray-500 clip-triangle" />
            </div>
          </div>

          {/* Tilt indicator */}
          {tilt !== 0 && (
            <div className="absolute top-4 right-4 bg-gray-900/80 rounded-lg p-2 text-sm">
              Tilt: {tilt.toFixed(1)}°
            </div>
          )}
        </div>
      </div>

      {/* Key Insight */}
      <div className="mt-6 p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
        <div className="text-sm font-semibold text-purple-400 mb-1">💡 Key Insight:</div>
        <div className="text-sm text-gray-300">
          When CoP is behind CoM, aerodynamic forces create a restoring moment that straightens the rocket. 
          This is why fins are at the bottom - they move the CoP backward!
        </div>
      </div>

      <style jsx>{`
        .clip-triangle {
          clip-path: polygon(0 0, 100% 50%, 0 100%);
        }
      `}</style>
    </div>
  );
}
