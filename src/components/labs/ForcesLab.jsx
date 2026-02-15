import { useState, useEffect, useRef } from 'react';
import { Box, Play, Pause, RotateCcw } from 'lucide-react';

export default function ForcesLab() {
  const [mass, setMass] = useState(10); // kg
  const [force, setForce] = useState(50); // N
  const [friction, setFriction] = useState(0.2);
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [position, setPosition] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const [history, setHistory] = useState([]);
  const animationRef = useRef(null);

  // Physics calculations
  const frictionForce = friction * mass * 9.81;
  const netForce = Math.max(0, force - frictionForce);
  const acceleration = netForce / mass;

  // Reset simulation
  const reset = () => {
    setIsRunning(false);
    setTime(0);
    setPosition(0);
    setVelocity(0);
    setHistory([]);
  };

  // Animation loop
  useEffect(() => {
    if (!isRunning) return;

    const dt = 0.05; // time step
    const interval = setInterval(() => {
      setTime(t => {
        const newTime = t + dt;
        if (newTime > 10) {
          setIsRunning(false);
          return t;
        }
        return newTime;
      });
      
      setVelocity(v => {
        const newV = v + acceleration * dt;
        return newV;
      });
      
      setPosition(p => {
        const newP = p + velocity * dt + 0.5 * acceleration * dt * dt;
        return Math.min(newP, 100); // Cap at 100m
      });

      setHistory(h => [...h.slice(-100), { time: time, position, velocity }]);
    }, 50);

    return () => clearInterval(interval);
  }, [isRunning, acceleration, velocity, time, position]);

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Controls */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Box className="w-5 h-5 text-green-400" />
          Force Controls
        </h3>

        {/* Mass */}
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <label className="text-gray-400">Mass</label>
            <span className="text-purple-400 font-mono">{mass} kg</span>
          </div>
          <input
            type="range"
            min="1"
            max="50"
            value={mass}
            onChange={(e) => { setMass(Number(e.target.value)); reset(); }}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
          />
        </div>

        {/* Applied Force */}
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <label className="text-gray-400">Applied Force</label>
            <span className="text-green-400 font-mono">{force} N</span>
          </div>
          <input
            type="range"
            min="0"
            max="200"
            value={force}
            onChange={(e) => { setForce(Number(e.target.value)); reset(); }}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500"
          />
        </div>

        {/* Friction */}
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <label className="text-gray-400">Friction Coefficient (μ)</label>
            <span className="text-orange-400 font-mono">{friction.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={friction}
            onChange={(e) => { setFriction(Number(e.target.value)); reset(); }}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
          />
        </div>

        {/* Control Buttons */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`flex-1 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 ${
              isRunning 
                ? 'bg-yellow-500 hover:bg-yellow-600 text-black' 
                : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
          >
            {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            {isRunning ? 'Pause' : 'Start'}
          </button>
          <button
            onClick={reset}
            className="px-4 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>

        {/* Results */}
        <div className="bg-gray-900/50 rounded-lg p-4 space-y-3">
          <h4 className="font-semibold text-white mb-3">Physics Values</h4>
          <div className="flex justify-between">
            <span className="text-gray-400">Friction Force</span>
            <span className="font-mono text-red-400">{frictionForce.toFixed(1)} N</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Net Force</span>
            <span className="font-mono text-green-400">{netForce.toFixed(1)} N</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Acceleration</span>
            <span className="font-mono text-cyan-400">{acceleration.toFixed(2)} m/s²</span>
          </div>
          <div className="border-t border-gray-700 pt-3 mt-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Time</span>
              <span className="font-mono text-white">{time.toFixed(2)} s</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Velocity</span>
              <span className="font-mono text-blue-400">{velocity.toFixed(2)} m/s</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Position</span>
              <span className="font-mono text-purple-400">{position.toFixed(2)} m</span>
            </div>
          </div>
        </div>

        {/* Formula */}
        <div className="mt-4 p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
          <p className="text-xs text-cyan-300 font-mono">
            F_net = F - μmg = {force} - {friction}×{mass}×9.81 = {netForce.toFixed(1)} N
          </p>
          <p className="text-xs text-cyan-300 font-mono mt-1">
            a = F_net/m = {netForce.toFixed(1)}/{mass} = {acceleration.toFixed(2)} m/s²
          </p>
        </div>
      </div>

      {/* Visualization */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
        <h3 className="text-xl font-bold mb-6">Motion Visualization</h3>
        
        {/* Animation area */}
        <div className="relative h-32 bg-gray-900 rounded-lg mb-6 overflow-hidden">
          {/* Ground */}
          <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-amber-900 to-amber-800" />
          
          {/* Distance markers */}
          {[0, 25, 50, 75, 100].map(mark => (
            <div 
              key={mark} 
              className="absolute bottom-4 text-xs text-gray-500"
              style={{ left: `${mark}%`, transform: 'translateX(-50%)' }}
            >
              {mark}m
            </div>
          ))}
          
          {/* Box */}
          <div 
            className="absolute bottom-4 transition-all duration-100"
            style={{ left: `${Math.min(position, 95)}%` }}
          >
            <div 
              className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg flex items-center justify-center text-white font-bold shadow-lg"
              style={{ 
                width: `${Math.max(30, mass)}px`, 
                height: `${Math.max(30, mass)}px` 
              }}
            >
              {mass}kg
            </div>
            {/* Force arrow */}
            {force > frictionForce && (
              <div className="absolute left-full top-1/2 -translate-y-1/2 flex items-center">
                <div 
                  className="h-1 bg-green-500"
                  style={{ width: `${Math.min(force / 3, 50)}px` }}
                />
                <div className="w-0 h-0 border-t-4 border-b-4 border-l-8 border-transparent border-l-green-500" />
              </div>
            )}
          </div>
        </div>

        {/* Velocity vs Time Graph */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-400 mb-2">Velocity vs Time</h4>
          <div className="h-32 bg-gray-900 rounded-lg p-2 relative">
            <svg className="w-full h-full">
              {/* Grid */}
              {[0, 25, 50, 75, 100].map(y => (
                <line key={y} x1="0" y1={`${y}%`} x2="100%" y2={`${y}%`} stroke="#374151" strokeWidth="0.5" />
              ))}
              
              {/* Velocity line */}
              <polyline
                fill="none"
                stroke="#3b82f6"
                strokeWidth="2"
                points={history.map((h, i) => 
                  `${(i / 100) * 100}%,${100 - Math.min(h.velocity * 5, 100)}%`
                ).join(' ')}
              />
            </svg>
            <div className="absolute bottom-1 right-2 text-xs text-gray-500">
              v = {velocity.toFixed(1)} m/s
            </div>
          </div>
        </div>

        {/* Position vs Time Graph */}
        <div>
          <h4 className="text-sm font-semibold text-gray-400 mb-2">Position vs Time</h4>
          <div className="h-32 bg-gray-900 rounded-lg p-2 relative">
            <svg className="w-full h-full">
              {[0, 25, 50, 75, 100].map(y => (
                <line key={y} x1="0" y1={`${y}%`} x2="100%" y2={`${y}%`} stroke="#374151" strokeWidth="0.5" />
              ))}
              
              <polyline
                fill="none"
                stroke="#a855f7"
                strokeWidth="2"
                points={history.map((h, i) => 
                  `${(i / 100) * 100}%,${100 - Math.min(h.position, 100)}%`
                ).join(' ')}
              />
            </svg>
            <div className="absolute bottom-1 right-2 text-xs text-gray-500">
              x = {position.toFixed(1)} m
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
