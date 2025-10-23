import { useState } from 'react';
import { Wind } from 'lucide-react';

export default function DragVisualization() {
  const [shape, setShape] = useState('cone');
  const [speed, setSpeed] = useState(50);

  const shapes = {
    cone: { name: 'Cone', cd: 0.5, emoji: '🔺' },
    cylinder: { name: 'Cylinder', cd: 1.2, emoji: '🔲' },
    sphere: { name: 'Sphere', cd: 0.47, emoji: '⚪' },
    streamlined: { name: 'Streamlined', cd: 0.04, emoji: '💧' }
  };

  const currentShape = shapes[shape];
  const area = 1; // m²
  const airDensity = 1.225; // kg/m³
  
  // Drag = 0.5 × ρ × v² × Cd × A
  const dragForce = 0.5 * airDensity * (speed * speed) * currentShape.cd * area;
  const fuelCost = dragForce * 0.1; // Simplified fuel cost

  return (
    <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-xl p-6">
      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Wind className="w-6 h-6 text-blue-400" />
        Aerodynamic Drag Visualization
      </h3>
      <p className="text-sm text-gray-400 mb-6">
        See how shape affects drag! Streamlined shapes cut through air more efficiently.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-3">Nose Cone Shape</label>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(shapes).map(([key, s]) => (
                <button
                  key={key}
                  onClick={() => setShape(key)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    shape === key
                      ? 'border-blue-500 bg-blue-500/20'
                      : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                  }`}
                >
                  <div className="text-3xl mb-1">{s.emoji}</div>
                  <div className="text-sm font-semibold">{s.name}</div>
                  <div className="text-xs text-gray-400">Cd: {s.cd}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium">Speed (m/s)</label>
              <span className="text-blue-400 font-bold">{speed}</span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              value={speed}
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>

          <div className="space-y-3">
            <div className="bg-gray-900/50 rounded-lg p-3">
              <div className="text-xs text-gray-400">Drag Force</div>
              <div className="text-2xl font-bold text-red-400">{dragForce.toFixed(1)} N</div>
            </div>
            <div className="bg-gray-900/50 rounded-lg p-3">
              <div className="text-xs text-gray-400">Fuel Cost (relative)</div>
              <div className="text-2xl font-bold text-orange-400">{fuelCost.toFixed(1)} units</div>
            </div>
          </div>
        </div>

        {/* Visualization */}
        <div className="relative h-96 bg-gradient-to-r from-blue-900/20 to-transparent rounded-xl overflow-hidden border border-gray-700">
          {/* Airflow lines */}
          <svg className="absolute inset-0 w-full h-full">
            {[...Array(8)].map((_, i) => {
              const y = (i + 1) * 12;
              const deflection = currentShape.cd * 20;
              
              return (
                <g key={i}>
                  {/* Streamline */}
                  <path
                    d={`M 0,${y}% Q 40,${y - deflection}% 100,${y}%`}
                    stroke="#3b82f6"
                    strokeWidth="2"
                    fill="none"
                    opacity="0.3"
                  />
                  {/* Flow particles */}
                  <circle
                    cx="10%"
                    cy={`${y}%`}
                    r="3"
                    fill="#60a5fa"
                    opacity="0.6"
                  >
                    <animate
                      attributeName="cx"
                      from="0%"
                      to="100%"
                      dur={`${2 / (speed / 50)}s`}
                      repeatCount="indefinite"
                    />
                  </circle>
                </g>
              );
            })}
          </svg>

          {/* Shape */}
          <div className="absolute left-1/3 top-1/2 -translate-y-1/2">
            <div className="text-6xl">{currentShape.emoji}</div>
          </div>

          {/* Pressure zones */}
          <div className="absolute right-4 top-4 bg-gray-900/80 rounded-lg p-3 text-xs">
            <div className="font-semibold mb-2">Pressure</div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-3 h-3 bg-red-500 rounded" />
              <span>High</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded" />
              <span>Low</span>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
          <div className="text-sm font-semibold text-green-400 mb-1">✓ Best Shape</div>
          <div className="text-sm text-gray-300">
            Streamlined (Cd: 0.04) - Minimal drag, maximum efficiency
          </div>
        </div>
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
          <div className="text-sm font-semibold text-red-400 mb-1">✗ Worst Shape</div>
          <div className="text-sm text-gray-300">
            Cylinder (Cd: 1.2) - High drag, wastes fuel
          </div>
        </div>
      </div>

      {/* Key Insight */}
      <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
        <div className="text-sm font-semibold text-blue-400 mb-1">💡 Key Insight:</div>
        <div className="text-sm text-gray-300">
          Drag increases with the square of velocity (v²)! That's why rockets need streamlined nose cones 
          to minimize fuel waste during high-speed ascent.
        </div>
      </div>
    </div>
  );
}
