import { useState } from 'react';
import { Building2 } from 'lucide-react';

const materials = {
  steel: { name: 'Steel', E: 200e9, yield: 250e6, color: '#6b7280' },
  aluminum: { name: 'Aluminum', E: 70e9, yield: 270e6, color: '#9ca3af' },
  wood: { name: 'Wood', E: 12e9, yield: 40e6, color: '#92400e' },
  concrete: { name: 'Concrete', E: 30e9, yield: 30e6, color: '#78716c' }
};

export default function BeamLab() {
  const [length, setLength] = useState(5); // m
  const [load, setLoad] = useState(10000); // N
  const [width, setWidth] = useState(0.1); // m
  const [height, setHeight] = useState(0.2); // m
  const [material, setMaterial] = useState('steel');
  const [loadType, setLoadType] = useState('point'); // point or distributed

  const mat = materials[material];
  
  // Moment of inertia for rectangular cross-section
  const I = (width * Math.pow(height, 3)) / 12;
  
  // Maximum bending moment
  const M = loadType === 'point' 
    ? (load * length) / 4  // Point load at center
    : (load * length * length) / 8; // Distributed load
  
  // Maximum deflection
  const deflection = loadType === 'point'
    ? (load * Math.pow(length, 3)) / (48 * mat.E * I) * 1000 // mm
    : (5 * load * Math.pow(length, 4)) / (384 * mat.E * I) * 1000; // mm
  
  // Maximum stress
  const stress = (M * (height / 2)) / I / 1e6; // MPa
  
  // Factor of safety
  const FoS = (mat.yield / 1e6) / stress;
  
  // Stress ratio for color
  const stressRatio = Math.min(stress / (mat.yield / 1e6), 1);

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Controls */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Building2 className="w-5 h-5 text-purple-400" />
          Beam Parameters
        </h3>

        {/* Material Selection */}
        <div className="mb-6">
          <label className="text-gray-400 block mb-2">Material</label>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(materials).map(([key, m]) => (
              <button
                key={key}
                onClick={() => setMaterial(key)}
                className={`py-2 px-3 rounded-lg text-sm transition-all flex items-center gap-2 ${
                  material === key
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <div className="w-3 h-3 rounded" style={{ backgroundColor: m.color }} />
                {m.name}
              </button>
            ))}
          </div>
        </div>

        {/* Load Type */}
        <div className="mb-6">
          <label className="text-gray-400 block mb-2">Load Type</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setLoadType('point')}
              className={`py-2 px-3 rounded-lg text-sm ${
                loadType === 'point' ? 'bg-purple-500 text-white' : 'bg-gray-700 text-gray-300'
              }`}
            >
              Point Load
            </button>
            <button
              onClick={() => setLoadType('distributed')}
              className={`py-2 px-3 rounded-lg text-sm ${
                loadType === 'distributed' ? 'bg-purple-500 text-white' : 'bg-gray-700 text-gray-300'
              }`}
            >
              Distributed
            </button>
          </div>
        </div>

        {/* Beam Length */}
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <label className="text-gray-400">Beam Length</label>
            <span className="text-blue-400 font-mono">{length} m</span>
          </div>
          <input
            type="range"
            min="1"
            max="10"
            step="0.5"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
        </div>

        {/* Load */}
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <label className="text-gray-400">Applied Load</label>
            <span className="text-red-400 font-mono">{(load/1000).toFixed(1)} kN</span>
          </div>
          <input
            type="range"
            min="1000"
            max="100000"
            step="1000"
            value={load}
            onChange={(e) => setLoad(Number(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-red-500"
          />
        </div>

        {/* Cross Section */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-gray-400 text-sm">Width</label>
              <span className="text-cyan-400 font-mono text-sm">{(width*100).toFixed(0)} cm</span>
            </div>
            <input
              type="range"
              min="0.05"
              max="0.3"
              step="0.01"
              value={width}
              onChange={(e) => setWidth(Number(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
            />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-gray-400 text-sm">Height</label>
              <span className="text-cyan-400 font-mono text-sm">{(height*100).toFixed(0)} cm</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="0.5"
              step="0.01"
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
            />
          </div>
        </div>

        {/* Results */}
        <div className="bg-gray-900/50 rounded-lg p-4 space-y-3">
          <h4 className="font-semibold text-white mb-3">Analysis Results</h4>
          <div className="flex justify-between">
            <span className="text-gray-400">Max Deflection</span>
            <span className="font-mono text-blue-400">{deflection.toFixed(2)} mm</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Max Stress</span>
            <span className={`font-mono ${stress > mat.yield/1e6 ? 'text-red-400' : 'text-green-400'}`}>
              {stress.toFixed(1)} MPa
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Yield Strength</span>
            <span className="font-mono text-gray-400">{(mat.yield/1e6).toFixed(0)} MPa</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Factor of Safety</span>
            <span className={`font-mono font-bold ${
              FoS < 1 ? 'text-red-400' : FoS < 1.5 ? 'text-yellow-400' : 'text-green-400'
            }`}>
              {FoS.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Status</span>
            <span className={`px-2 py-1 rounded text-xs font-bold ${
              FoS < 1 ? 'bg-red-500/20 text-red-400' : 
              FoS < 1.5 ? 'bg-yellow-500/20 text-yellow-400' : 
              'bg-green-500/20 text-green-400'
            }`}>
              {FoS < 1 ? '⚠️ FAILURE' : FoS < 1.5 ? '⚠️ MARGINAL' : '✓ SAFE'}
            </span>
          </div>
        </div>
      </div>

      {/* Visualization */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
        <h3 className="text-xl font-bold mb-6">Beam Visualization</h3>
        
        {/* Beam diagram */}
        <svg viewBox="0 0 400 200" className="w-full h-48 mb-6">
          {/* Supports */}
          <polygon points="40,140 30,160 50,160" fill="#6b7280" />
          <polygon points="360,140 350,160 370,160" fill="#6b7280" />
          
          {/* Ground */}
          <line x1="20" y1="160" x2="380" y2="160" stroke="#6b7280" strokeWidth="2" />
          
          {/* Beam - with deflection curve */}
          <path
            d={`M 40 130 Q 200 ${130 + Math.min(deflection * 2, 40)} 360 130`}
            fill="none"
            stroke={mat.color}
            strokeWidth="12"
            strokeLinecap="round"
          />
          
          {/* Stress gradient overlay */}
          <defs>
            <linearGradient id="stressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22c55e" />
              <stop offset="50%" stopColor={stressRatio > 0.8 ? '#ef4444' : stressRatio > 0.5 ? '#eab308' : '#22c55e'} />
              <stop offset="100%" stopColor="#22c55e" />
            </linearGradient>
          </defs>
          <path
            d={`M 40 130 Q 200 ${130 + Math.min(deflection * 2, 40)} 360 130`}
            fill="none"
            stroke="url(#stressGradient)"
            strokeWidth="8"
            strokeLinecap="round"
            opacity="0.7"
          />
          
          {/* Load arrows */}
          {loadType === 'point' ? (
            <g>
              <line x1="200" y1="60" x2="200" y2="120" stroke="#ef4444" strokeWidth="3" />
              <polygon points="200,125 195,115 205,115" fill="#ef4444" />
              <text x="200" y="50" textAnchor="middle" fill="#ef4444" fontSize="12">{(load/1000).toFixed(1)} kN</text>
            </g>
          ) : (
            <g>
              {[80, 120, 160, 200, 240, 280, 320].map(x => (
                <g key={x}>
                  <line x1={x} y1="80" x2={x} y2="120" stroke="#ef4444" strokeWidth="2" />
                  <polygon points={`${x},125 ${x-4},115 ${x+4},115`} fill="#ef4444" />
                </g>
              ))}
              <text x="200" y="70" textAnchor="middle" fill="#ef4444" fontSize="11">Distributed Load</text>
            </g>
          )}
          
          {/* Deflection indicator */}
          <line x1="200" y1="130" x2="200" y2={130 + Math.min(deflection * 2, 40)} stroke="#3b82f6" strokeWidth="1" strokeDasharray="4" />
          <text x="210" y={135 + Math.min(deflection, 20)} fill="#3b82f6" fontSize="10">δ = {deflection.toFixed(1)}mm</text>
          
          {/* Length indicator */}
          <line x1="40" y1="175" x2="360" y2="175" stroke="#9ca3af" strokeWidth="1" />
          <text x="200" y="190" textAnchor="middle" fill="#9ca3af" fontSize="11">L = {length} m</text>
        </svg>

        {/* Cross section */}
        <div className="flex items-center gap-6">
          <div>
            <h4 className="text-sm font-semibold text-gray-400 mb-2">Cross Section</h4>
            <div 
              className="border-2 border-gray-500 rounded"
              style={{ 
                width: `${width * 200}px`, 
                height: `${height * 200}px`,
                backgroundColor: mat.color,
                maxWidth: '100px',
                maxHeight: '150px'
              }}
            />
            <p className="text-xs text-gray-500 mt-1">{(width*100).toFixed(0)}×{(height*100).toFixed(0)} cm</p>
          </div>
          
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-gray-400 mb-2">Stress Distribution</h4>
            <div className="h-24 bg-gray-900 rounded-lg p-2 flex items-center justify-center">
              <div className="relative w-8 h-20 border-2 border-gray-600 rounded">
                <div 
                  className="absolute inset-x-0 top-0 bg-gradient-to-b from-red-500 to-transparent rounded-t"
                  style={{ height: '40%', opacity: stressRatio }}
                />
                <div 
                  className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-blue-500 to-transparent rounded-b"
                  style={{ height: '40%', opacity: stressRatio }}
                />
                <div className="absolute inset-x-0 top-1/2 h-0.5 bg-gray-400" />
              </div>
              <div className="ml-3 text-xs text-gray-400">
                <div className="text-red-400">Tension</div>
                <div className="my-2">Neutral</div>
                <div className="text-blue-400">Compression</div>
              </div>
            </div>
          </div>
        </div>

        {/* Safety meter */}
        <div className="mt-6">
          <h4 className="text-sm font-semibold text-gray-400 mb-2">Safety Factor Meter</h4>
          <div className="relative h-6 bg-gray-700 rounded-full overflow-hidden">
            <div className="absolute inset-0 flex">
              <div className="w-1/3 bg-red-500/30" />
              <div className="w-1/6 bg-yellow-500/30" />
              <div className="flex-1 bg-green-500/30" />
            </div>
            <div 
              className="absolute top-0 bottom-0 w-1 bg-white shadow-lg"
              style={{ left: `${Math.min(FoS / 3 * 100, 100)}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0</span>
            <span>1.0</span>
            <span>1.5</span>
            <span>3.0+</span>
          </div>
        </div>
      </div>
    </div>
  );
}
