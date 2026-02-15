import { useState, useEffect } from 'react';
import ProjectTemplate from '../../components/projects/ProjectTemplate';
import { careerProjects } from '../../data/careerProjects';
import { TrendingUp, Zap, Thermometer, Gauge } from 'lucide-react';

export default function RocketNozzleProject() {
  const project = careerProjects.find(p => p.id === 'rocket-nozzle');
  
  // State for controls
  const [throatDiameter, setThroatDiameter] = useState(45); // mm
  const [expansionRatio, setExpansionRatio] = useState(12);
  const [chamberPressure, setChamberPressure] = useState(60); // bar
  const [fuelType, setFuelType] = useState('RP-1');

  // Calculated values
  const [thrust, setThrust] = useState(0);
  const [efficiency, setEfficiency] = useState(0);
  const [isp, setIsp] = useState(0);
  const [exitVelocity, setExitVelocity] = useState(0);

  // Fuel properties
  const fuelData = {
    'RP-1': { baseIsp: 285, density: 810, color: 'orange' },
    'LH2': { baseIsp: 450, density: 71, color: 'blue' },
    'Methane': { baseIsp: 330, density: 422, color: 'green' }
  };

  // Calculate performance
  useEffect(() => {
    const throatArea = Math.PI * Math.pow((throatDiameter / 2000), 2); // m²
    const exitArea = throatArea * expansionRatio;
    
    // Simplified thrust calculation
    const baseFuel = fuelData[fuelType];
    const pressureFactor = chamberPressure / 100; // Normalized
    const expansionFactor = Math.min(expansionRatio / 15, 1.2); // Optimal around 15
    
    // Efficiency calculation (peaks around expansion ratio 12-15 for sea level)
    const optimalRatio = 12;
    const efficiencyCalc = 100 - Math.abs(expansionRatio - optimalRatio) * 3;
    const finalEfficiency = Math.max(60, Math.min(95, efficiencyCalc));
    
    // Thrust calculation (simplified)
    const calculatedThrust = throatArea * chamberPressure * 100000 * expansionFactor * (finalEfficiency / 100);
    
    // Specific impulse
    const calculatedIsp = baseFuel.baseIsp * (finalEfficiency / 100) * expansionFactor;
    
    // Exit velocity
    const calculatedExitVelocity = calculatedIsp * 9.81;
    
    setThrust(calculatedThrust);
    setEfficiency(finalEfficiency);
    setIsp(calculatedIsp);
    setExitVelocity(calculatedExitVelocity);
  }, [throatDiameter, expansionRatio, chamberPressure, fuelType]);

  const getInsight = () => {
    const insights = [];
    
    if (expansionRatio < 8) {
      insights.push({
        type: 'warning',
        text: 'Low expansion ratio. Your nozzle is under-expanded, losing potential thrust.'
      });
    } else if (expansionRatio > 16) {
      insights.push({
        type: 'warning',
        text: 'High expansion ratio. This is optimized for vacuum but will lose efficiency at sea level.'
      });
    } else if (expansionRatio >= 10 && expansionRatio <= 14) {
      insights.push({
        type: 'success',
        text: 'Excellent! This expansion ratio is optimal for sea-level operation, similar to Falcon 9 first stage.'
      });
    }
    
    if (efficiency > 85) {
      insights.push({
        type: 'success',
        text: `Great efficiency! Your design is ${efficiency.toFixed(1)}% efficient, comparable to modern rocket engines.`
      });
    }
    
    if (fuelType === 'LH2') {
      insights.push({
        type: 'info',
        text: 'Liquid Hydrogen provides the highest specific impulse but requires cryogenic storage. Used in Space Shuttle and SLS.'
      });
    } else if (fuelType === 'Methane') {
      insights.push({
        type: 'info',
        text: 'Methane is SpaceX Starship\'s choice - good performance with easier storage than LH2.'
      });
    }
    
    return insights;
  };

  const handleGenerateReport = () => {
    const report = `
ROCKET NOZZLE DESIGN REPORT
===========================

DESIGN PARAMETERS:
- Throat Diameter: ${throatDiameter}mm
- Expansion Ratio: ${expansionRatio}
- Chamber Pressure: ${chamberPressure} bar
- Fuel Type: ${fuelType}

PERFORMANCE METRICS:
- Thrust: ${(thrust / 1000).toFixed(2)} kN
- Specific Impulse: ${isp.toFixed(1)}s
- Exit Velocity: ${exitVelocity.toFixed(0)} m/s
- Efficiency: ${efficiency.toFixed(1)}%

ANALYSIS:
${getInsight().map(i => `• ${i.text}`).join('\n')}

SCORE: ${Math.round(efficiency)}/100

This design ${efficiency > 85 ? 'shows excellent optimization' : 'has room for improvement'}.
    `.trim();
    
    alert(report);
  };

  const controls = (
    <div className="space-y-6">
      {/* Throat Diameter */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Throat Diameter: {throatDiameter}mm
        </label>
        <input
          type="range"
          min="10"
          max="100"
          value={throatDiameter}
          onChange={(e) => setThroatDiameter(Number(e.target.value))}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>10mm</span>
          <span>100mm</span>
        </div>
      </div>

      {/* Expansion Ratio */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Expansion Ratio: {expansionRatio}
        </label>
        <input
          type="range"
          min="1"
          max="20"
          step="0.5"
          value={expansionRatio}
          onChange={(e) => setExpansionRatio(Number(e.target.value))}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>1</span>
          <span>20</span>
        </div>
      </div>

      {/* Chamber Pressure */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Chamber Pressure: {chamberPressure} bar
        </label>
        <input
          type="range"
          min="10"
          max="100"
          value={chamberPressure}
          onChange={(e) => setChamberPressure(Number(e.target.value))}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-red-500"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>10 bar</span>
          <span>100 bar</span>
        </div>
      </div>

      {/* Fuel Type */}
      <div>
        <label className="block text-sm font-medium mb-2">Fuel Type</label>
        <select
          value={fuelType}
          onChange={(e) => setFuelType(e.target.value)}
          className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
        >
          <option value="RP-1">RP-1 (Kerosene)</option>
          <option value="LH2">Liquid Hydrogen</option>
          <option value="Methane">Methane</option>
        </select>
        <p className="text-xs text-gray-400 mt-1">
          {fuelType === 'RP-1' && 'Used in: Falcon 9, Soyuz'}
          {fuelType === 'LH2' && 'Used in: Space Shuttle, SLS'}
          {fuelType === 'Methane' && 'Used in: Starship, Vulcan'}
        </p>
      </div>
    </div>
  );

  const simulation = (
    <div className="space-y-6">
      {/* Output Metrics */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-blue-900/50 to-blue-800/50 rounded-lg p-4 border border-blue-500/30">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-blue-400" />
            <span className="text-sm text-gray-300">Thrust</span>
          </div>
          <div className="text-2xl font-bold text-blue-400">
            {(thrust / 1000).toFixed(2)} kN
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-900/50 to-orange-800/50 rounded-lg p-4 border border-orange-500/30">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-5 h-5 text-orange-400" />
            <span className="text-sm text-gray-300">Efficiency</span>
          </div>
          <div className="text-2xl font-bold text-orange-400">
            {efficiency.toFixed(1)}%
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/50 rounded-lg p-4 border border-purple-500/30">
          <div className="flex items-center gap-2 mb-2">
            <Gauge className="w-5 h-5 text-purple-400" />
            <span className="text-sm text-gray-300">Specific Impulse</span>
          </div>
          <div className="text-2xl font-bold text-purple-400">
            {isp.toFixed(0)}s
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-900/50 to-green-800/50 rounded-lg p-4 border border-green-500/30">
          <div className="flex items-center gap-2 mb-2">
            <Thermometer className="w-5 h-5 text-green-400" />
            <span className="text-sm text-gray-300">Exit Velocity</span>
          </div>
          <div className="text-2xl font-bold text-green-400">
            {(exitVelocity / 1000).toFixed(2)} km/s
          </div>
        </div>
      </div>

      {/* Nozzle Visualization */}
      <div className="bg-gray-900/50 rounded-lg p-6 border border-gray-700">
        <h3 className="text-sm font-semibold mb-4 text-center">Nozzle Profile</h3>
        <svg viewBox="0 0 400 200" className="w-full">
          {/* Nozzle shape */}
          <defs>
            <linearGradient id="nozzleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ef4444" />
              <stop offset="50%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#eab308" />
            </linearGradient>
          </defs>
          
          {/* Chamber */}
          <rect x="20" y="60" width="80" height="80" fill="#374151" stroke="#6b7280" strokeWidth="2" />
          
          {/* Converging section */}
          <path
            d={`M 100 60 L ${100 + 50} ${100 - throatDiameter/2} L ${100 + 50} ${100 + throatDiameter/2} L 100 140 Z`}
            fill="url(#nozzleGradient)"
            stroke="#6b7280"
            strokeWidth="2"
          />
          
          {/* Throat */}
          <line
            x1={150}
            y1={100 - throatDiameter/2}
            x2={150}
            y2={100 + throatDiameter/2}
            stroke="#3b82f6"
            strokeWidth="3"
          />
          
          {/* Diverging section (expansion) */}
          <path
            d={`M ${150} ${100 - throatDiameter/2} L ${150 + expansionRatio * 10} ${100 - (throatDiameter/2) * Math.sqrt(expansionRatio)} L ${150 + expansionRatio * 10} ${100 + (throatDiameter/2) * Math.sqrt(expansionRatio)} L ${150} ${100 + throatDiameter/2} Z`}
            fill="url(#nozzleGradient)"
            fillOpacity="0.7"
            stroke="#6b7280"
            strokeWidth="2"
          />
          
          {/* Labels */}
          <text x="60" y="50" fill="#9ca3af" fontSize="12" textAnchor="middle">Chamber</text>
          <text x="150" y="50" fill="#3b82f6" fontSize="12" textAnchor="middle">Throat</text>
          <text x={150 + expansionRatio * 10} y="50" fill="#9ca3af" fontSize="12" textAnchor="middle">Exit</text>
        </svg>
      </div>

      {/* Performance Graph */}
      <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
        <h3 className="text-sm font-semibold mb-2">Efficiency vs Expansion Ratio</h3>
        <div className="h-32 flex items-end justify-around gap-1">
          {[...Array(20)].map((_, i) => {
            const ratio = i + 1;
            const optimalRatio = 12;
            const barEfficiency = 100 - Math.abs(ratio - optimalRatio) * 3;
            const height = Math.max(20, Math.min(100, barEfficiency));
            const isCurrentRatio = Math.abs(ratio - expansionRatio) < 0.5;
            
            return (
              <div
                key={i}
                className={`flex-1 rounded-t transition-all ${
                  isCurrentRatio ? 'bg-blue-500' : 'bg-gray-600'
                }`}
                style={{ height: `${height}%` }}
                title={`Ratio ${ratio}: ${barEfficiency.toFixed(0)}%`}
              />
            );
          })}
        </div>
        <div className="flex justify-between text-xs text-gray-400 mt-2">
          <span>1</span>
          <span>10</span>
          <span>20</span>
        </div>
      </div>
    </div>
  );

  const insights = (
    <div className="space-y-3">
      {getInsight().map((insight, idx) => (
        <div
          key={idx}
          className={`p-4 rounded-lg border ${
            insight.type === 'success'
              ? 'bg-green-900/20 border-green-500/30 text-green-300'
              : insight.type === 'warning'
              ? 'bg-yellow-900/20 border-yellow-500/30 text-yellow-300'
              : 'bg-blue-900/20 border-blue-500/30 text-blue-300'
          }`}
        >
          {insight.text}
        </div>
      ))}
      
      <div className="p-4 bg-gray-800/50 rounded-lg border border-gray-600">
        <p className="text-sm text-gray-300">
          <strong>Real-World Comparison:</strong> The Falcon 9 Merlin engine uses an expansion ratio of ~16 for the first stage and ~117 for the vacuum-optimized second stage. Your design with a ratio of {expansionRatio} is {expansionRatio < 20 ? 'optimized for atmospheric flight' : 'better suited for vacuum operation'}.
        </p>
      </div>
    </div>
  );

  return (
    <ProjectTemplate
      project={project}
      controls={controls}
      simulation={simulation}
      insights={insights}
      onGenerateReport={handleGenerateReport}
    />
  );
}
