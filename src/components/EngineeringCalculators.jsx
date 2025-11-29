import { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Calculator, ChevronRight, RotateCcw } from 'lucide-react';

const calculators = [
  {
    id: 'stress',
    name: 'Stress Calculator',
    icon: '🔧',
    color: 'from-blue-500 to-cyan-500',
    inputs: [
      { id: 'force', label: 'Force (N)', default: 1000 },
      { id: 'area', label: 'Area (m²)', default: 0.01 }
    ],
    calculate: (inputs) => {
      const stress = inputs.force / inputs.area;
      return [
        { label: 'Stress (σ)', value: stress.toFixed(2), unit: 'Pa' },
        { label: 'Stress', value: (stress / 1e6).toFixed(4), unit: 'MPa' }
      ];
    },
    formula: 'σ = F / A'
  },
  {
    id: 'gear-ratio',
    name: 'Gear Ratio Calculator',
    icon: '⚙️',
    color: 'from-green-500 to-emerald-500',
    inputs: [
      { id: 'drivingTeeth', label: 'Driving Gear Teeth', default: 20 },
      { id: 'drivenTeeth', label: 'Driven Gear Teeth', default: 40 },
      { id: 'inputRPM', label: 'Input RPM', default: 1000 },
      { id: 'inputTorque', label: 'Input Torque (Nm)', default: 10 }
    ],
    calculate: (inputs) => {
      const ratio = inputs.drivenTeeth / inputs.drivingTeeth;
      const outputRPM = inputs.inputRPM / ratio;
      const outputTorque = inputs.inputTorque * ratio;
      return [
        { label: 'Gear Ratio', value: ratio.toFixed(2), unit: ':1' },
        { label: 'Output RPM', value: outputRPM.toFixed(1), unit: 'RPM' },
        { label: 'Output Torque', value: outputTorque.toFixed(2), unit: 'Nm' },
        { label: 'Mechanical Advantage', value: ratio.toFixed(2), unit: 'x' }
      ];
    },
    formula: 'GR = N₂/N₁'
  },
  {
    id: 'force',
    name: 'Force Calculator (F=ma)',
    icon: '💪',
    color: 'from-orange-500 to-red-500',
    inputs: [
      { id: 'mass', label: 'Mass (kg)', default: 10 },
      { id: 'acceleration', label: 'Acceleration (m/s²)', default: 9.81 }
    ],
    calculate: (inputs) => {
      const force = inputs.mass * inputs.acceleration;
      return [
        { label: 'Force', value: force.toFixed(2), unit: 'N' },
        { label: 'Force', value: (force / 1000).toFixed(4), unit: 'kN' }
      ];
    },
    formula: 'F = m × a'
  },
  {
    id: 'power',
    name: 'Power Calculator',
    icon: '⚡',
    color: 'from-yellow-500 to-amber-500',
    inputs: [
      { id: 'torque', label: 'Torque (Nm)', default: 50 },
      { id: 'rpm', label: 'RPM', default: 3000 }
    ],
    calculate: (inputs) => {
      const powerW = (inputs.torque * inputs.rpm * 2 * Math.PI) / 60;
      const powerHP = powerW / 745.7;
      const powerKW = powerW / 1000;
      return [
        { label: 'Power', value: powerW.toFixed(1), unit: 'W' },
        { label: 'Power', value: powerKW.toFixed(3), unit: 'kW' },
        { label: 'Power', value: powerHP.toFixed(2), unit: 'HP' }
      ];
    },
    formula: 'P = (T × RPM × 2π) / 60'
  },
  {
    id: 'ohms-law',
    name: "Ohm's Law Calculator",
    icon: '🔌',
    color: 'from-purple-500 to-pink-500',
    inputs: [
      { id: 'voltage', label: 'Voltage (V)', default: 12 },
      { id: 'resistance', label: 'Resistance (Ω)', default: 100 }
    ],
    calculate: (inputs) => {
      const current = inputs.voltage / inputs.resistance;
      const power = inputs.voltage * current;
      return [
        { label: 'Current', value: (current * 1000).toFixed(2), unit: 'mA' },
        { label: 'Current', value: current.toFixed(4), unit: 'A' },
        { label: 'Power', value: power.toFixed(3), unit: 'W' }
      ];
    },
    formula: 'V = I × R'
  },
  {
    id: 'brake-distance',
    name: 'Braking Distance',
    icon: '🚗',
    color: 'from-red-500 to-rose-500',
    inputs: [
      { id: 'velocity', label: 'Initial Speed (km/h)', default: 100 },
      { id: 'friction', label: 'Friction Coefficient', default: 0.7 },
      { id: 'reaction', label: 'Reaction Time (s)', default: 1.5 }
    ],
    calculate: (inputs) => {
      const vMs = inputs.velocity / 3.6;
      const reactionDist = vMs * inputs.reaction;
      const brakeDist = (vMs * vMs) / (2 * inputs.friction * 9.81);
      const totalDist = reactionDist + brakeDist;
      return [
        { label: 'Reaction Distance', value: reactionDist.toFixed(1), unit: 'm' },
        { label: 'Braking Distance', value: brakeDist.toFixed(1), unit: 'm' },
        { label: 'Total Stopping Distance', value: totalDist.toFixed(1), unit: 'm' }
      ];
    },
    formula: 'd = v²/(2μg)'
  },
  {
    id: 'lift',
    name: 'Lift Force Calculator',
    icon: '✈️',
    color: 'from-cyan-500 to-blue-500',
    inputs: [
      { id: 'density', label: 'Air Density (kg/m³)', default: 1.225 },
      { id: 'velocity', label: 'Velocity (m/s)', default: 50 },
      { id: 'area', label: 'Wing Area (m²)', default: 20 },
      { id: 'cl', label: 'Lift Coefficient', default: 1.2 }
    ],
    calculate: (inputs) => {
      const lift = 0.5 * inputs.density * inputs.velocity * inputs.velocity * inputs.area * inputs.cl;
      return [
        { label: 'Lift Force', value: lift.toFixed(1), unit: 'N' },
        { label: 'Lift Force', value: (lift / 1000).toFixed(3), unit: 'kN' },
        { label: 'Equivalent Mass', value: (lift / 9.81).toFixed(1), unit: 'kg' }
      ];
    },
    formula: 'L = ½ρv²SC_L'
  },
  {
    id: 'delta-v',
    name: 'Rocket Delta-V',
    icon: '🚀',
    color: 'from-orange-500 to-amber-500',
    inputs: [
      { id: 'isp', label: 'Specific Impulse (s)', default: 300 },
      { id: 'wetMass', label: 'Wet Mass (kg)', default: 10000 },
      { id: 'dryMass', label: 'Dry Mass (kg)', default: 3000 }
    ],
    calculate: (inputs) => {
      const g0 = 9.81;
      const massRatio = inputs.wetMass / inputs.dryMass;
      const deltaV = inputs.isp * g0 * Math.log(massRatio);
      return [
        { label: 'Delta-V', value: deltaV.toFixed(1), unit: 'm/s' },
        { label: 'Delta-V', value: (deltaV / 1000).toFixed(3), unit: 'km/s' },
        { label: 'Mass Ratio', value: massRatio.toFixed(2), unit: '' },
        { label: 'Propellant Mass', value: (inputs.wetMass - inputs.dryMass).toFixed(0), unit: 'kg' }
      ];
    },
    formula: 'Δv = Isp × g₀ × ln(m₀/mf)'
  }
];

export default function EngineeringCalculators({ isOpen, onClose }) {
  const [selectedCalc, setSelectedCalc] = useState(null);
  const [inputs, setInputs] = useState({});
  const [results, setResults] = useState([]);

  const selectCalculator = (calc) => {
    setSelectedCalc(calc);
    const defaultInputs = {};
    calc.inputs.forEach(input => {
      defaultInputs[input.id] = input.default;
    });
    setInputs(defaultInputs);
    setResults(calc.calculate(defaultInputs));
  };

  const updateInput = (id, value) => {
    const newInputs = { ...inputs, [id]: parseFloat(value) || 0 };
    setInputs(newInputs);
    if (selectedCalc) {
      setResults(selectedCalc.calculate(newInputs));
    }
  };

  const resetCalculator = () => {
    if (selectedCalc) {
      const defaultInputs = {};
      selectedCalc.inputs.forEach(input => {
        defaultInputs[input.id] = input.default;
      });
      setInputs(defaultInputs);
      setResults(selectedCalc.calculate(defaultInputs));
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden border border-green-500/30 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-700 bg-gradient-to-r from-green-500/10 to-emerald-500/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Engineering Calculators</h2>
                <p className="text-gray-400 text-sm">Quick calculations for engineers</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-700 rounded-lg">
              <X className="w-6 h-6 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {!selectedCalc ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {calculators.map(calc => (
                <button
                  key={calc.id}
                  onClick={() => selectCalculator(calc)}
                  className={`p-4 rounded-xl border border-gray-700 hover:border-green-500/50 bg-gradient-to-br ${calc.color} bg-opacity-10 transition-all hover:scale-[1.02] active:scale-[0.98] text-center`}
                >
                  <span className="text-3xl block mb-2">{calc.icon}</span>
                  <span className="text-white font-medium text-sm">{calc.name}</span>
                </button>
              ))}
            </div>
          ) : (
            <div>
              {/* Back Button */}
              <button
                onClick={() => setSelectedCalc(null)}
                className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
              >
                ← Back to Calculators
              </button>

              {/* Calculator Header */}
              <div className={`bg-gradient-to-r ${selectedCalc.color} rounded-xl p-4 mb-6`}>
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{selectedCalc.icon}</span>
                  <div>
                    <h3 className="text-xl font-bold text-white">{selectedCalc.name}</h3>
                    <p className="text-white/80 font-mono text-sm">{selectedCalc.formula}</p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Inputs */}
                <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-white">Inputs</h4>
                    <button
                      onClick={resetCalculator}
                      className="p-2 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-white transition-colors"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="space-y-4">
                    {selectedCalc.inputs.map(input => (
                      <div key={input.id}>
                        <label className="block text-sm text-gray-400 mb-1">{input.label}</label>
                        <input
                          type="number"
                          value={inputs[input.id] || ''}
                          onChange={(e) => updateInput(input.id, e.target.value)}
                          className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-green-500"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Results */}
                <div className="bg-gray-800/50 border border-green-500/30 rounded-xl p-4">
                  <h4 className="font-semibold text-white mb-4">Results</h4>
                  <div className="space-y-3">
                    {results.map((result, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg">
                        <span className="text-gray-400">{result.label}</span>
                        <span className="font-mono text-lg text-green-400">
                          {result.value} <span className="text-gray-500 text-sm">{result.unit}</span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
