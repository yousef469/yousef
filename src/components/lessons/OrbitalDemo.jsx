import { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';

export default function OrbitalDemo() {
  const [horizontalVelocity, setHorizontalVelocity] = useState(7.8);
  const [isLaunching, setIsLaunching] = useState(false);
  const [satellitePos, setSatellitePos] = useState({ x: 50, y: 80 });
  const [trajectory, setTrajectory] = useState([]);
  const [orbitType, setOrbitType] = useState('');

  const earthRadius = 100;
  const orbitRadius = 150;
  const orbitalVelocity = 7.8; // km/s for LEO

  useEffect(() => {
    if (!isLaunching) return;

    const interval = setInterval(() => {
      setSatellitePos(prev => {
        const centerX = 50;
        const centerY = 50;
        
        // Calculate distance from Earth center
        const dx = prev.x - centerX;
        const dy = prev.y - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Gravity acceleration (simplified)
        const gravity = 400 / (distance * distance);
        
        // Velocity components
        const vx = horizontalVelocity * 0.5;
        const vy = -gravity * 0.1;
        
        const newX = prev.x + vx;
        const newY = prev.y + vy;
        
        // Check if crashed or escaped
        if (distance < 15) {
          setIsLaunching(false);
          setOrbitType('crashed');
          return prev;
        }
        
        if (distance > 80) {
          setIsLaunching(false);
          setOrbitType('escaped');
          return prev;
        }
        
        // Add to trajectory
        setTrajectory(t => [...t.slice(-50), { x: newX, y: newY }]);
        
        return { x: newX, y: newY };
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isLaunching, horizontalVelocity]);

  const launch = () => {
    setSatellitePos({ x: 50, y: 80 });
    setTrajectory([]);
    setIsLaunching(true);
    
    // Determine orbit type
    if (horizontalVelocity < 6.5) {
      setOrbitType('suborbital');
    } else if (horizontalVelocity >= 6.5 && horizontalVelocity <= 9) {
      setOrbitType('orbital');
    } else {
      setOrbitType('escape');
    }
  };

  const reset = () => {
    setIsLaunching(false);
    setSatellitePos({ x: 50, y: 80 });
    setTrajectory([]);
    setOrbitType('');
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-xl p-6">
      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Globe className="w-6 h-6 text-green-400" />
        Orbital Mechanics Simulator
      </h3>
      <p className="text-sm text-gray-400 mb-6">
        Set horizontal velocity at burnout. Too slow = crash. Just right = orbit. Too fast = escape!
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="space-y-6">
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium">Horizontal Velocity (km/s)</label>
              <span className="text-green-400 font-bold">{horizontalVelocity.toFixed(1)}</span>
            </div>
            <input
              type="range"
              min="0"
              max="12"
              step="0.1"
              value={horizontalVelocity}
              onChange={(e) => setHorizontalVelocity(parseFloat(e.target.value))}
              disabled={isLaunching}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>Too slow</span>
              <span className="text-green-400">~7.8 km/s</span>
              <span>Too fast</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className={`p-3 rounded-lg border-2 ${
              orbitType === 'orbital'
                ? 'bg-green-500/20 border-green-500'
                : orbitType === 'suborbital' || orbitType === 'crashed'
                ? 'bg-red-500/20 border-red-500'
                : orbitType === 'escape'
                ? 'bg-yellow-500/20 border-yellow-500'
                : 'bg-gray-800/50 border-gray-700'
            }`}>
              <div className="font-bold mb-1">
                {orbitType === 'orbital' && '✓ Stable Orbit!'}
                {orbitType === 'suborbital' && '✗ Suborbital'}
                {orbitType === 'crashed' && '✗ Crashed'}
                {orbitType === 'escape' && '⚠ Escape Velocity'}
                {!orbitType && 'Ready to Launch'}
              </div>
              <div className="text-xs text-gray-300">
                {orbitType === 'orbital' && 'Perfect! Satellite stays in orbit'}
                {orbitType === 'suborbital' && 'Too slow - will fall back'}
                {orbitType === 'crashed' && 'Hit the atmosphere'}
                {orbitType === 'escape' && 'Too fast - leaving Earth'}
                {!orbitType && 'Adjust velocity and launch'}
              </div>
            </div>

            <div className="bg-gray-900/50 rounded-lg p-3">
              <div className="text-xs text-gray-400">Orbital Velocity (LEO)</div>
              <div className="text-lg font-bold text-green-400">~7.8 km/s</div>
              <div className="text-xs text-gray-400 mt-1">
                Balance between gravity and centrifugal force
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={launch}
              disabled={isLaunching}
              className="flex-1 py-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-lg font-semibold transition-colors"
            >
              Launch
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
        <div className="relative h-96 bg-black rounded-xl overflow-hidden border border-gray-700">
          {/* Stars */}
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5 + 0.3
              }}
            />
          ))}

          {/* Earth */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-br from-blue-500 to-green-500 rounded-full">
            <div className="absolute inset-2 bg-gradient-to-br from-blue-400 to-green-400 rounded-full opacity-50" />
          </div>

          {/* Orbital path reference */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-2 border-dashed border-green-500/30 rounded-full" />

          {/* Trajectory */}
          <svg className="absolute inset-0 w-full h-full">
            <polyline
              points={trajectory.map(p => `${p.x}%,${p.y}%`).join(' ')}
              fill="none"
              stroke="#22c55e"
              strokeWidth="2"
              opacity="0.6"
            />
          </svg>

          {/* Satellite */}
          {isLaunching && (
            <div
              className="absolute w-3 h-3 bg-yellow-400 rounded-full"
              style={{
                left: `${satellitePos.x}%`,
                top: `${satellitePos.y}%`,
                transform: 'translate(-50%, -50%)',
                boxShadow: '0 0 10px #fbbf24'
              }}
            />
          )}
        </div>
      </div>

      {/* Key Insight */}
      <div className="mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
        <div className="text-sm font-semibold text-green-400 mb-1">💡 Key Insight:</div>
        <div className="text-sm text-gray-300">
          An orbit is continuous free fall! The satellite falls toward Earth, but moves forward fast enough 
          that it keeps missing. At 7.8 km/s, gravity's pull exactly matches the centrifugal effect.
        </div>
      </div>
    </div>
  );
}
