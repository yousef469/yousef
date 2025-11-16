import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calculator, Rocket, Settings, Zap, Wind, Gauge, Target, TrendingUp, Flame } from 'lucide-react';

export default function EngineeringToolboxPage() {
  const navigate = useNavigate();
  const [selectedTool, setSelectedTool] = useState(null);

  const tools = [
    {
      id: 'rocket-equation',
      name: 'Rocket Equation',
      icon: Rocket,
      description: 'Calculate delta-v using the Tsiolkovsky rocket equation',
      category: 'Aerospace',
      gradient: 'from-orange-500 to-red-600'
    },
    {
      id: 'gear-ratio',
      name: 'Gear Ratio',
      icon: Settings,
      description: 'Calculate gear ratios and mechanical advantage',
      category: 'Mechanical',
      gradient: 'from-blue-500 to-cyan-600'
    },
    {
      id: 'lift-equation',
      name: 'Lift Equation',
      icon: Wind,
      description: 'Calculate aerodynamic lift force',
      category: 'Aerospace',
      gradient: 'from-cyan-500 to-blue-600'
    },
    {
      id: 'heat-transfer',
      name: 'Heat Transfer',
      icon: Flame,
      description: 'Calculate conduction, convection, and radiation',
      category: 'Thermodynamics',
      gradient: 'from-red-500 to-orange-600'
    },
    {
      id: 'ohms-law',
      name: "Ohm's Law",
      icon: Zap,
      description: 'Calculate voltage, current, and resistance',
      category: 'Electronics',
      gradient: 'from-yellow-500 to-amber-600'
    },
    {
      id: 'motor-torque',
      name: 'Motor Torque',
      icon: Gauge,
      description: 'Calculate motor torque and power',
      category: 'Mechanical',
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      id: 'drag-equation',
      name: 'Drag Equation',
      icon: Wind,
      description: 'Calculate aerodynamic drag force',
      category: 'Aerospace',
      gradient: 'from-teal-500 to-green-600'
    },
    {
      id: 'projectile-motion',
      name: 'Projectile Motion',
      icon: Target,
      description: 'Calculate trajectory, range, and flight time',
      category: 'Physics',
      gradient: 'from-indigo-500 to-purple-600'
    },
    {
      id: 'brake-distance',
      name: 'Brake Distance',
      icon: TrendingUp,
      description: 'Calculate stopping distance and deceleration',
      category: 'Automotive',
      gradient: 'from-pink-500 to-rose-600'
    }
  ];

  const ToolCalculator = ({ tool }) => {
    const [inputs, setInputs] = useState({});
    const [result, setResult] = useState(null);

    const handleCalculate = () => {
      // Placeholder calculation logic
      switch (tool.id) {
        case 'rocket-equation':
          // Δv = ve * ln(m0/mf)
          const ve = parseFloat(inputs.exhaustVelocity) || 0;
          const m0 = parseFloat(inputs.initialMass) || 0;
          const mf = parseFloat(inputs.finalMass) || 0;
          if (m0 > 0 && mf > 0 && m0 > mf) {
            const deltaV = ve * Math.log(m0 / mf);
            setResult(`Delta-V: ${deltaV.toFixed(2)} m/s`);
          }
          break;
        case 'ohms-law':
          const v = parseFloat(inputs.voltage);
          const i = parseFloat(inputs.current);
          const r = parseFloat(inputs.resistance);
          if (!isNaN(v) && !isNaN(i)) {
            setResult(`Resistance: ${(v / i).toFixed(2)} Ω`);
          } else if (!isNaN(v) && !isNaN(r)) {
            setResult(`Current: ${(v / r).toFixed(2)} A`);
          } else if (!isNaN(i) && !isNaN(r)) {
            setResult(`Voltage: ${(i * r).toFixed(2)} V`);
          }
          break;
        case 'brake-distance':
          const speed = parseFloat(inputs.speed) || 0;
          const friction = parseFloat(inputs.friction) || 0.7;
          const g = 9.81;
          const distance = (speed * speed) / (2 * friction * g);
          setResult(`Stopping Distance: ${distance.toFixed(2)} m`);
          break;
        default:
          setResult('Calculation coming soon!');
      }
    };

    const renderInputs = () => {
      switch (tool.id) {
        case 'rocket-equation':
          return (
            <>
              <input
                type="number"
                placeholder="Exhaust Velocity (m/s)"
                className="w-full px-4 py-2 bg-gray-700 rounded-lg"
                onChange={(e) => setInputs({...inputs, exhaustVelocity: e.target.value})}
              />
              <input
                type="number"
                placeholder="Initial Mass (kg)"
                className="w-full px-4 py-2 bg-gray-700 rounded-lg"
                onChange={(e) => setInputs({...inputs, initialMass: e.target.value})}
              />
              <input
                type="number"
                placeholder="Final Mass (kg)"
                className="w-full px-4 py-2 bg-gray-700 rounded-lg"
                onChange={(e) => setInputs({...inputs, finalMass: e.target.value})}
              />
            </>
          );
        case 'ohms-law':
          return (
            <>
              <input
                type="number"
                placeholder="Voltage (V)"
                className="w-full px-4 py-2 bg-gray-700 rounded-lg"
                onChange={(e) => setInputs({...inputs, voltage: e.target.value})}
              />
              <input
                type="number"
                placeholder="Current (A)"
                className="w-full px-4 py-2 bg-gray-700 rounded-lg"
                onChange={(e) => setInputs({...inputs, current: e.target.value})}
              />
              <input
                type="number"
                placeholder="Resistance (Ω)"
                className="w-full px-4 py-2 bg-gray-700 rounded-lg"
                onChange={(e) => setInputs({...inputs, resistance: e.target.value})}
              />
            </>
          );
        case 'brake-distance':
          return (
            <>
              <input
                type="number"
                placeholder="Speed (m/s)"
                className="w-full px-4 py-2 bg-gray-700 rounded-lg"
                onChange={(e) => setInputs({...inputs, speed: e.target.value})}
              />
              <input
                type="number"
                placeholder="Friction Coefficient (0-1)"
                step="0.1"
                className="w-full px-4 py-2 bg-gray-700 rounded-lg"
                onChange={(e) => setInputs({...inputs, friction: e.target.value})}
              />
            </>
          );
        default:
          return <p className="text-gray-400">Calculator coming soon!</p>;
      }
    };

    return (
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
        <button
          onClick={() => setSelectedTool(null)}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Tools
        </button>

        <h2 className="text-2xl font-bold mb-4">{tool.name}</h2>
        <p className="text-gray-300 mb-6">{tool.description}</p>

        <div className="space-y-4 mb-6">
          {renderInputs()}
        </div>

        <button
          onClick={handleCalculate}
          className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-lg font-semibold transition-all"
        >
          Calculate
        </button>

        {result && (
          <div className="mt-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg">
            <p className="text-xl font-bold text-green-300">{result}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </button>

        {!selectedTool ? (
          <>
            {/* Hero Section */}
            <div className="text-center mb-12">
              <Calculator className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
              <h1 className="text-5xl font-bold mb-4">Engineering Toolbox</h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Essential calculators and tools for engineering calculations
              </p>
            </div>

            {/* Tools Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.map((tool) => {
                const Icon = tool.icon;
                return (
                  <button
                    key={tool.id}
                    onClick={() => setSelectedTool(tool)}
                    className={`bg-gradient-to-br ${tool.gradient} rounded-xl p-6 border-2 border-white/20 hover:scale-105 transition-all text-left`}
                  >
                    <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-white">{tool.name}</h3>
                    <p className="text-white/90 text-sm mb-3">{tool.description}</p>
                    <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur rounded-full text-xs font-semibold">
                      {tool.category}
                    </span>
                  </button>
                );
              })}
            </div>
          </>
        ) : (
          <ToolCalculator tool={selectedTool} />
        )}
      </div>
    </div>
  );
}
