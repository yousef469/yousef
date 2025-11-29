import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Beaker, Zap, Droplets, Box, Building2, Flame } from 'lucide-react';

// Import lab components
import CircuitLab from '../components/labs/CircuitLab';
import FluidLab from '../components/labs/FluidLab';
import ForcesLab from '../components/labs/ForcesLab';
import BeamLab from '../components/labs/BeamLab';
import ThermoLab from '../components/labs/ThermoLab';

const labs = [
  {
    id: 'circuit',
    name: 'Circuit Lab',
    icon: Zap,
    color: 'from-yellow-500 to-amber-600',
    description: 'Build circuits, measure voltage & current',
    topics: ["Ohm's Law", 'Series/Parallel', 'Power'],
    component: CircuitLab
  },
  {
    id: 'fluid',
    name: 'Fluid Mechanics Lab',
    icon: Droplets,
    color: 'from-blue-500 to-cyan-600',
    description: 'Explore pipe flow and fluid dynamics',
    topics: ['Bernoulli', 'Continuity', 'Flow Rate'],
    component: FluidLab
  },
  {
    id: 'forces',
    name: 'Forces & Motion Lab',
    icon: Box,
    color: 'from-green-500 to-emerald-600',
    description: 'Apply forces, observe acceleration',
    topics: ["Newton's Laws", 'Friction', 'Momentum'],
    component: ForcesLab
  },
  {
    id: 'beam',
    name: 'Beam Bending Lab',
    icon: Building2,
    color: 'from-purple-500 to-violet-600',
    description: 'Load beams, analyze deflection & stress',
    topics: ['Deflection', 'Stress', 'Safety Factor'],
    component: BeamLab
  },
  {
    id: 'thermo',
    name: 'Thermodynamics Lab',
    icon: Flame,
    color: 'from-orange-500 to-red-600',
    description: 'Heat gases, observe PV changes',
    topics: ['Ideal Gas', 'PV Diagrams', 'Heat Transfer'],
    component: ThermoLab
  }
];

export default function VirtualLabsPage() {
  const navigate = useNavigate();
  const [selectedLab, setSelectedLab] = useState(null);

  const LabComponent = selectedLab?.component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white pb-20 md:pb-0">
      {/* Header */}
      <div className="border-b border-gray-700 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 md:py-6">
          <button
            onClick={() => selectedLab ? setSelectedLab(null) : navigate('/')}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-2"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>{selectedLab ? 'Back to Labs' : 'Back to Home'}</span>
          </button>
          <div className="flex items-center gap-3">
            <Beaker className="w-8 h-8 text-cyan-400" />
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Virtual Labs</h1>
              <p className="text-sm text-gray-400">Interactive engineering simulations</p>
            </div>
          </div>
        </div>
      </div>

      {/* Lab Selection */}
      {!selectedLab && (
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Choose Your Lab</h2>
            <p className="text-gray-400">Experiment with real physics in real-time</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {labs.map(lab => {
              const Icon = lab.icon;
              return (
                <button
                  key={lab.id}
                  onClick={() => setSelectedLab(lab)}
                  className={`relative bg-gradient-to-br ${lab.color} rounded-2xl p-6 border-2 border-white/20 hover:border-white/40 transition-all hover:scale-[1.02] active:scale-[0.98] text-left`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 hover:opacity-100 rounded-2xl transition-opacity" />
                  
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center mb-4">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{lab.name}</h3>
                    <p className="text-white/80 text-sm mb-4">{lab.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {lab.topics.map((topic, idx) => (
                        <span key={idx} className="px-2 py-1 bg-white/20 rounded text-xs">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Active Lab */}
      {selectedLab && LabComponent && (
        <div className="max-w-7xl mx-auto px-4 py-6">
          <LabComponent />
        </div>
      )}
    </div>
  );
}
