import { useState, useEffect } from 'react';
import { Rocket, Gauge } from 'lucide-react';

export default function ThrustSliderDemo() {
  const [thrust, setThrust] = useState(50);
  const [mass, setMass] = useState(100);
  const [velocity, setVelocity] = useState(0);
  const [altitude, setAltitude] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const gravity = 9.8;
  const drag = 0.1;

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      // F_net = Thrust - Weight - Drag
      const weight = mass * gravity;
      const dragForce = drag * velocity * velocity;
      const netForce = thrust - weight - dragForce;
      
      // a = F/m
      const acceleration = netForce / mass;
      
      // Update velocity and altitude
      setVelocity(v => Math.max(0, v + acceleration * 0.1));
      setAltitude(a => Math.max(0, a + velocity * 0.1));
      
      // Burn fuel (reduce mass)
      setMass(m => Math.max(20, m - 0.5));
    }, 100);

    return () => clearInterval(interval);
  }, [isRunning, thrust, mass, velocity]);

  const reset = () => {
    setVelocity(0);
    setAltitude(0);
    setMass(100);
    setIsRunning(false);
  };

  const acceleration = (thrust - mass * gravity - drag * velocity * velocity) / mass;

  return (
    <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-xl p-6">
      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Rocket className="w-6 h-6 text-cyan-400" />
        Thrust Slider Demo
      </h3>
      <p className="text-sm text-gray-400 mb-6">
        Adjust thrust and watch how acceleration changes in real-time. Notice how acceleration increases as fuel burns!
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="space-y-6">
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium">Thrust (N)</label>
              <span className="text-cyan-400 font-bold">{thrust}</span>
            </div>
            <input
              type="range"
              min="0"
              max="200"
              value={thrust}
              onChange={(e) => setThrust(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
            />
          </div>

          <div className="space-y-3">
            <div className="bg-gray-900/50 rounded-lg p-3">
              <div className="text-xs text-gray-400">Mass</div>
              <div className="text-2xl font-bold text-white">{mass.toFixed(1)} kg</div>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-3">
              <div className="text-xs text-gray-400">Acceleration</div>
              <div className={`text-2xl font-bold ${acceleration > 0 ? 'text-green-400' : 'text-red-400'}`}>
                {acceleration.toFixed(2)} m/s²
              </div>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-3">
              <div className="text-xs text-gray-400">Velocity</div>
              <div className="text-2xl font-bold text-cyan-400">{velocity.toFixed(1)} m/s</div>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-3">
              <div className="text-xs text-gray-400">Altitude</div>
              <div className="text-2xl font-bold text-purple-400">{altitude.toFixed(0)} m</div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className={`flex-1 py-2 rounded-lg font-semibold transition-colors ${
                isRunning
                  ? 'bg-red-500 hover:bg-red-600'
                  : 'bg-green-500 hover:bg-green-600'
              }`}
            >
              {isRunning ? 'Stop' : 'Launch'}
            </button>
            <button
              onClick={reset}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold transition-colors"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Visualization */}
        <div className="relative h-96 bg-gradient-to-b from-blue-900/20 to-gray-900/50 rounded-xl overflow-hidden border border-gray-700">
          {/* Altitude markers */}
          {[0, 100, 200, 300, 400, 500].map(alt => (
            <div
              key={alt}
              className="absolute left-0 right-0 border-t border-gray-700/50"
              style={{ bottom: `${(alt / 500) * 100}%` }}
            >
              <span className="text-xs text-gray-500 ml-2">{alt}m</span>
            </div>
          ))}

          {/* Rocket */}
          <div
            className="absolute left-1/2 -translate-x-1/2 transition-all duration-100"
            style={{ bottom: `${Math.min((altitude / 500) * 100, 95)}%` }}
          >
            <Rocket className={`w-8 h-8 text-cyan-400 ${isRunning ? 'animate-bounce' : ''}`} />
            {isRunning && thrust > mass * gravity && (
              <div className="absolute top-8 left-1/2 -translate-x-1/2 w-2 h-6 bg-gradient-to-b from-orange-500 to-transparent animate-pulse" />
            )}
          </div>

          {/* Ground */}
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-green-600" />
        </div>
      </div>

      {/* Key Insight */}
      <div className="mt-6 p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
        <div className="text-sm font-semibold text-cyan-400 mb-1">💡 Key Insight:</div>
        <div className="text-sm text-gray-300">
          As fuel burns, mass decreases. With the same thrust, F = ma means acceleration increases! 
          This is why rockets accelerate faster as they climb.
        </div>
      </div>
    </div>
  );
}
