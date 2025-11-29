import { useState } from 'react';
import { createPortal } from 'react-dom';
import { 
  X, Search, Copy, Check, BookOpen, Rocket, Car, Plane, 
  Zap, Settings, Calculator, ChevronDown, ChevronRight
} from 'lucide-react';

const formulas = {
  mechanics: {
    name: 'Mechanics',
    icon: '⚙️',
    color: 'from-blue-500 to-cyan-500',
    formulas: [
      { name: "Newton's Second Law", formula: 'F = ma', description: 'Force equals mass times acceleration', variables: { F: 'Force (N)', m: 'Mass (kg)', a: 'Acceleration (m/s²)' } },
      { name: 'Kinetic Energy', formula: 'KE = ½mv²', description: 'Energy of motion', variables: { KE: 'Kinetic Energy (J)', m: 'Mass (kg)', v: 'Velocity (m/s)' } },
      { name: 'Potential Energy', formula: 'PE = mgh', description: 'Energy due to position', variables: { PE: 'Potential Energy (J)', m: 'Mass (kg)', g: 'Gravity (9.81 m/s²)', h: 'Height (m)' } },
      { name: 'Work', formula: 'W = Fd cos(θ)', description: 'Work done by a force', variables: { W: 'Work (J)', F: 'Force (N)', d: 'Distance (m)', θ: 'Angle' } },
      { name: 'Power', formula: 'P = W/t', description: 'Rate of doing work', variables: { P: 'Power (W)', W: 'Work (J)', t: 'Time (s)' } },
      { name: 'Momentum', formula: 'p = mv', description: 'Linear momentum', variables: { p: 'Momentum (kg·m/s)', m: 'Mass (kg)', v: 'Velocity (m/s)' } },
      { name: 'Torque', formula: 'τ = rF sin(θ)', description: 'Rotational force', variables: { τ: 'Torque (N·m)', r: 'Radius (m)', F: 'Force (N)', θ: 'Angle' } },
    ]
  },
  aerospace: {
    name: 'Aerospace',
    icon: '🚀',
    color: 'from-orange-500 to-red-500',
    formulas: [
      { name: 'Tsiolkovsky Rocket Equation', formula: 'Δv = Isp × g₀ × ln(m₀/mf)', description: 'Change in velocity for rockets', variables: { 'Δv': 'Delta-v (m/s)', 'Isp': 'Specific Impulse (s)', 'g₀': 'Standard gravity (9.81 m/s²)', 'm₀': 'Initial mass', 'mf': 'Final mass' } },
      { name: 'Thrust', formula: 'F = ṁ × Ve + (Pe - Pa) × Ae', description: 'Rocket engine thrust', variables: { 'F': 'Thrust (N)', 'ṁ': 'Mass flow rate (kg/s)', 'Ve': 'Exhaust velocity (m/s)', 'Pe': 'Exit pressure', 'Pa': 'Ambient pressure', 'Ae': 'Exit area' } },
      { name: 'Lift Equation', formula: 'L = ½ρv²SCL', description: 'Aerodynamic lift force', variables: { 'L': 'Lift (N)', 'ρ': 'Air density (kg/m³)', 'v': 'Velocity (m/s)', 'S': 'Wing area (m²)', 'CL': 'Lift coefficient' } },
      { name: 'Drag Equation', formula: 'D = ½ρv²SCD', description: 'Aerodynamic drag force', variables: { 'D': 'Drag (N)', 'ρ': 'Air density (kg/m³)', 'v': 'Velocity (m/s)', 'S': 'Reference area (m²)', 'CD': 'Drag coefficient' } },
      { name: 'Orbital Velocity', formula: 'v = √(GM/r)', description: 'Circular orbital velocity', variables: { v: 'Velocity (m/s)', G: 'Gravitational constant', M: 'Central body mass (kg)', r: 'Orbital radius (m)' } },
      { name: 'Escape Velocity', formula: 'Ve = √(2GM/r)', description: 'Velocity to escape gravity', variables: { Ve: 'Escape velocity (m/s)', G: 'Gravitational constant', M: 'Body mass (kg)', r: 'Distance from center (m)' } },
    ]
  },
  automotive: {
    name: 'Automotive',
    icon: '🚗',
    color: 'from-green-500 to-emerald-500',
    formulas: [
      { name: 'Gear Ratio', formula: 'GR = N₂/N₁', description: 'Ratio of gear teeth', variables: { 'GR': 'Gear Ratio', 'N₂': 'Driven gear teeth', 'N₁': 'Driving gear teeth' } },
      { name: 'Braking Distance', formula: 'd = v²/(2μg)', description: 'Distance to stop', variables: { 'd': 'Distance (m)', 'v': 'Initial velocity (m/s)', 'μ': 'Friction coefficient', 'g': 'Gravity (9.81 m/s²)' } },
      { name: 'Centripetal Force', formula: 'Fc = mv²/r', description: 'Force for circular motion', variables: { Fc: 'Centripetal force (N)', m: 'Mass (kg)', v: 'Velocity (m/s)', r: 'Radius (m)' } },
      { name: 'Engine Power', formula: 'P = (T × RPM)/5252', description: 'Horsepower from torque', variables: { P: 'Power (hp)', T: 'Torque (lb-ft)', RPM: 'Revolutions per minute' } },
      { name: 'Tire Slip Ratio', formula: 'S = (ωr - v)/v', description: 'Tire slip during acceleration', variables: { S: 'Slip ratio', ω: 'Angular velocity (rad/s)', r: 'Tire radius (m)', v: 'Vehicle velocity (m/s)' } },
    ]
  },
  electrical: {
    name: 'Electrical',
    icon: '⚡',
    color: 'from-yellow-500 to-amber-500',
    formulas: [
      { name: "Ohm's Law", formula: 'V = IR', description: 'Voltage, current, resistance relationship', variables: { V: 'Voltage (V)', I: 'Current (A)', R: 'Resistance (Ω)' } },
      { name: 'Power (DC)', formula: 'P = VI = I²R = V²/R', description: 'Electrical power', variables: { P: 'Power (W)', V: 'Voltage (V)', I: 'Current (A)', R: 'Resistance (Ω)' } },
      { name: 'Capacitance', formula: 'C = Q/V', description: 'Charge storage capacity', variables: { C: 'Capacitance (F)', Q: 'Charge (C)', V: 'Voltage (V)' } },
      { name: 'Inductance Energy', formula: 'E = ½LI²', description: 'Energy stored in inductor', variables: { E: 'Energy (J)', L: 'Inductance (H)', I: 'Current (A)' } },
      { name: 'RC Time Constant', formula: 'τ = RC', description: 'RC circuit time constant', variables: { τ: 'Time constant (s)', R: 'Resistance (Ω)', C: 'Capacitance (F)' } },
    ]
  },
  materials: {
    name: 'Materials & Stress',
    icon: '🔧',
    color: 'from-purple-500 to-pink-500',
    formulas: [
      { name: 'Stress', formula: 'σ = F/A', description: 'Force per unit area', variables: { 'σ': 'Stress (Pa)', 'F': 'Force (N)', 'A': 'Area (m²)' } },
      { name: 'Strain', formula: 'ε = ΔL/L₀', description: 'Relative deformation', variables: { 'ε': 'Strain (dimensionless)', 'ΔL': 'Change in length (m)', 'L₀': 'Original length (m)' } },
      { name: "Young's Modulus", formula: 'E = σ/ε', description: 'Material stiffness', variables: { 'E': "Young's Modulus (Pa)", 'σ': 'Stress (Pa)', 'ε': 'Strain' } },
      { name: 'Factor of Safety', formula: 'FoS = σᵧ/σ', description: 'Safety margin', variables: { 'FoS': 'Factor of Safety', 'σᵧ': 'Yield strength (Pa)', 'σ': 'Applied stress (Pa)' } },
      { name: 'Beam Deflection (Cantilever)', formula: 'δ = FL³/(3EI)', description: 'Max deflection of cantilever beam', variables: { 'δ': 'Deflection (m)', 'F': 'Force (N)', 'L': 'Length (m)', 'E': "Young's Modulus (Pa)", 'I': 'Moment of inertia (m⁴)' } },
    ]
  },
  thermodynamics: {
    name: 'Thermodynamics',
    icon: '🔥',
    color: 'from-red-500 to-orange-500',
    formulas: [
      { name: 'Ideal Gas Law', formula: 'PV = nRT', description: 'Ideal gas behavior', variables: { 'P': 'Pressure (Pa)', 'V': 'Volume (m³)', 'n': 'Moles', 'R': 'Gas constant (8.314 J/mol·K)', 'T': 'Temperature (K)' } },
      { name: 'Heat Transfer (Conduction)', formula: 'Q = kA(ΔT/d)', description: 'Heat conduction through material', variables: { 'Q': 'Heat flow (W)', 'k': 'Thermal conductivity (W/m·K)', 'A': 'Area (m²)', 'ΔT': 'Temperature difference (K)', 'd': 'Thickness (m)' } },
      { name: 'Carnot Efficiency', formula: 'η = 1 - Tc/Th', description: 'Maximum heat engine efficiency', variables: { 'η': 'Efficiency', 'Tc': 'Cold temperature (K)', 'Th': 'Hot temperature (K)' } },
      { name: 'Specific Heat', formula: 'Q = mcΔT', description: 'Heat to change temperature', variables: { 'Q': 'Heat (J)', 'm': 'Mass (kg)', 'c': 'Specific heat (J/kg·K)', 'ΔT': 'Temperature change (K)' } },
    ]
  }
};

export default function FormulaLibrary({ isOpen, onClose }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategory, setExpandedCategory] = useState('mechanics');
  const [copiedFormula, setCopiedFormula] = useState(null);

  const copyFormula = (formula) => {
    navigator.clipboard.writeText(formula);
    setCopiedFormula(formula);
    setTimeout(() => setCopiedFormula(null), 2000);
  };

  const filteredFormulas = () => {
    if (!searchQuery) return formulas;
    
    const filtered = {};
    Object.keys(formulas).forEach(cat => {
      const matchingFormulas = formulas[cat].formulas.filter(f => 
        f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.formula.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (matchingFormulas.length > 0) {
        filtered[cat] = { ...formulas[cat], formulas: matchingFormulas };
      }
    });
    return filtered;
  };

  if (!isOpen) return null;

  const displayFormulas = filteredFormulas();

  return createPortal(
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-cyan-500/30 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-700 bg-gradient-to-r from-cyan-500/10 to-blue-500/10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Formula Library</h2>
                <p className="text-gray-400 text-sm">Essential engineering formulas</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-700 rounded-lg">
              <X className="w-6 h-6 text-gray-400" />
            </button>
          </div>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search formulas..."
              className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {Object.keys(displayFormulas).length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <Calculator className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No formulas found</p>
            </div>
          ) : (
            <div className="space-y-4">
              {Object.keys(displayFormulas).map(catKey => {
                const category = displayFormulas[catKey];
                const isExpanded = expandedCategory === catKey || searchQuery;
                
                return (
                  <div key={catKey} className="border border-gray-700 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setExpandedCategory(isExpanded && !searchQuery ? null : catKey)}
                      className={`w-full flex items-center justify-between p-4 bg-gradient-to-r ${category.color} bg-opacity-20 hover:bg-opacity-30 transition-all`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{category.icon}</span>
                        <span className="font-semibold text-white">{category.name}</span>
                        <span className="text-sm text-gray-300 bg-white/10 px-2 py-0.5 rounded">
                          {category.formulas.length} formulas
                        </span>
                      </div>
                      {!searchQuery && (
                        isExpanded ? <ChevronDown className="w-5 h-5 text-gray-400" /> : <ChevronRight className="w-5 h-5 text-gray-400" />
                      )}
                    </button>
                    
                    {isExpanded && (
                      <div className="p-4 space-y-3 bg-gray-800/50">
                        {category.formulas.map((f, idx) => (
                          <div key={idx} className="bg-gray-900/50 border border-gray-700 rounded-lg p-4 hover:border-cyan-500/50 transition-all">
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="font-semibold text-white">{f.name}</h4>
                              <button
                                onClick={() => copyFormula(f.formula)}
                                className={`p-1.5 rounded transition-all ${
                                  copiedFormula === f.formula 
                                    ? 'bg-green-500 text-white' 
                                    : 'bg-gray-700 hover:bg-gray-600 text-gray-400'
                                }`}
                              >
                                {copiedFormula === f.formula ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                              </button>
                            </div>
                            <div className="bg-gray-800 rounded-lg px-4 py-3 mb-3 font-mono text-lg text-cyan-400">
                              {f.formula}
                            </div>
                            <p className="text-sm text-gray-400 mb-3">{f.description}</p>
                            <div className="flex flex-wrap gap-2">
                              {Object.entries(f.variables).map(([key, desc]) => (
                                <span key={key} className="text-xs bg-gray-700 px-2 py-1 rounded text-gray-300">
                                  <span className="text-cyan-400 font-mono">{key}</span> = {desc}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
