import { useState, useEffect } from 'react';
import { Zap, RotateCcw } from 'lucide-react';

export default function CircuitLab() {
  const [voltage, setVoltage] = useState(12);
  const [resistance, setResistance] = useState(100);
  const [isCircuitComplete, setIsCircuitComplete] = useState(true);

  // Calculate values using Ohm's Law
  const current = isCircuitComplete ? (voltage / resistance) * 1000 : 0; // mA
  const power = isCircuitComplete ? (voltage * voltage) / resistance : 0; // W
  const ledBrightness = Math.min(100, (current / 200) * 100);

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Controls */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Zap className="w-5 h-5 text-yellow-400" />
          Circuit Controls
        </h3>

        {/* Voltage Slider */}
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <label className="text-gray-400">Battery Voltage</label>
            <span className="text-yellow-400 font-mono">{voltage} V</span>
          </div>
          <input
            type="range"
            min="1"
            max="24"
            value={voltage}
            onChange={(e) => setVoltage(Number(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-yellow-500"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>1V</span>
            <span>24V</span>
          </div>
        </div>

        {/* Resistance Slider */}
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <label className="text-gray-400">Resistance</label>
            <span className="text-blue-400 font-mono">{resistance} Ω</span>
          </div>
          <input
            type="range"
            min="10"
            max="1000"
            step="10"
            value={resistance}
            onChange={(e) => setResistance(Number(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>10Ω</span>
            <span>1000Ω</span>
          </div>
        </div>

        {/* Circuit Switch */}
        <div className="mb-6">
          <label className="flex items-center gap-3 cursor-pointer">
            <div 
              onClick={() => setIsCircuitComplete(!isCircuitComplete)}
              className={`w-14 h-7 rounded-full transition-colors ${isCircuitComplete ? 'bg-green-500' : 'bg-gray-600'}`}
            >
              <div className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform mt-0.5 ${isCircuitComplete ? 'translate-x-7' : 'translate-x-0.5'}`} />
            </div>
            <span className="text-gray-300">Circuit {isCircuitComplete ? 'Closed' : 'Open'}</span>
          </label>
        </div>

        {/* Results */}
        <div className="bg-gray-900/50 rounded-lg p-4 space-y-3">
          <h4 className="font-semibold text-white mb-3">Measurements</h4>
          <div className="flex justify-between">
            <span className="text-gray-400">Current (I)</span>
            <span className="font-mono text-green-400">{current.toFixed(2)} mA</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Power (P)</span>
            <span className="font-mono text-orange-400">{power.toFixed(3)} W</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">LED Brightness</span>
            <span className="font-mono text-yellow-400">{ledBrightness.toFixed(0)}%</span>
          </div>
        </div>

        {/* Formula */}
        <div className="mt-4 p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
          <p className="text-xs text-cyan-300 font-mono">
            V = I × R → I = V/R = {voltage}/{resistance} = {(voltage/resistance*1000).toFixed(2)} mA
          </p>
        </div>
      </div>

      {/* Circuit Visualization */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
        <h3 className="text-xl font-bold mb-6">Circuit Diagram</h3>
        
        <svg viewBox="0 0 400 300" className="w-full h-64 md:h-80">
          {/* Background grid */}
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#374151" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="400" height="300" fill="url(#grid)"/>
          
          {/* Wires */}
          <path 
            d="M 50 150 L 50 50 L 350 50 L 350 150" 
            fill="none" 
            stroke={isCircuitComplete ? "#22c55e" : "#6b7280"} 
            strokeWidth="3"
          />
          <path 
            d="M 50 150 L 50 250 L 350 250 L 350 150" 
            fill="none" 
            stroke={isCircuitComplete ? "#22c55e" : "#6b7280"} 
            strokeWidth="3"
          />
          
          {/* Battery */}
          <rect x="30" y="120" width="40" height="60" fill="#1f2937" stroke="#fbbf24" strokeWidth="2" rx="4"/>
          <text x="50" y="155" textAnchor="middle" fill="#fbbf24" fontSize="12" fontWeight="bold">{voltage}V</text>
          <line x1="40" y1="125" x2="60" y2="125" stroke="#fbbf24" strokeWidth="3"/>
          <line x1="45" y1="175" x2="55" y2="175" stroke="#fbbf24" strokeWidth="2"/>
          
          {/* Resistor */}
          <rect x="150" y="35" width="100" height="30" fill="#1f2937" stroke="#3b82f6" strokeWidth="2" rx="4"/>
          <text x="200" y="55" textAnchor="middle" fill="#3b82f6" fontSize="11">{resistance}Ω</text>
          
          {/* LED */}
          <circle 
            cx="350" 
            cy="150" 
            r="20" 
            fill={isCircuitComplete ? `rgba(250, 204, 21, ${ledBrightness/100})` : "#374151"}
            stroke="#fbbf24" 
            strokeWidth="2"
          />
          {isCircuitComplete && ledBrightness > 10 && (
            <>
              <line x1="380" y1="130" x2="395" y2="115" stroke="#fbbf24" strokeWidth="2"/>
              <line x1="380" y1="150" x2="400" y2="150" stroke="#fbbf24" strokeWidth="2"/>
              <line x1="380" y1="170" x2="395" y2="185" stroke="#fbbf24" strokeWidth="2"/>
            </>
          )}
          
          {/* Switch */}
          <circle cx="200" cy="250" r="8" fill={isCircuitComplete ? "#22c55e" : "#ef4444"} />
          <text x="200" y="280" textAnchor="middle" fill="#9ca3af" fontSize="10">
            {isCircuitComplete ? 'CLOSED' : 'OPEN'}
          </text>
          
          {/* Current flow animation */}
          {isCircuitComplete && (
            <circle r="4" fill="#22c55e">
              <animateMotion dur="2s" repeatCount="indefinite">
                <mpath href="#currentPath"/>
              </animateMotion>
            </circle>
          )}
          <path id="currentPath" d="M 50 150 L 50 50 L 350 50 L 350 250 L 50 250 L 50 150" fill="none"/>
          
          {/* Labels */}
          <text x="50" y="100" textAnchor="middle" fill="#9ca3af" fontSize="10">Battery</text>
          <text x="200" y="20" textAnchor="middle" fill="#9ca3af" fontSize="10">Resistor</text>
          <text x="350" y="200" textAnchor="middle" fill="#9ca3af" fontSize="10">LED</text>
        </svg>

        {/* Current indicator */}
        <div className="mt-4 flex items-center justify-center gap-4">
          <div className={`w-3 h-3 rounded-full ${isCircuitComplete ? 'bg-green-500 animate-pulse' : 'bg-gray-600'}`} />
          <span className="text-sm text-gray-400">
            {isCircuitComplete ? 'Current flowing' : 'No current'}
          </span>
        </div>
      </div>
    </div>
  );
}
