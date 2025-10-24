import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftRight, ArrowLeft, Check } from 'lucide-react';
import ThreeJSViewer from '../components/ThreeJSViewer';

export default function ComparePage() {
  const navigate = useNavigate();
  const [leftModel, setLeftModel] = useState('rocket');
  const [rightModel, setRightModel] = useState('plane');

  const models = [
    { 
      id: 'rocket', 
      name: 'Falcon 9 Rocket', 
      icon: '🚀', 
      type: 'rocket',
      path: '/falcon9.glb',
      modelInfo: {
        name: 'Falcon 9',
        type: 'rocket',
        path: '/falcon9.glb'
      }
    },
    { 
      id: 'plane', 
      name: 'Fighter Jet', 
      icon: '✈️', 
      type: 'plane',
      path: '/plane.glb',
      modelInfo: {
        name: 'Fighter Jet',
        type: 'plane',
        path: '/plane.glb'
      }
    },
    { 
      id: 'car', 
      name: 'Sports Car', 
      icon: '🚗', 
      type: 'car',
      path: '/porsche.glb',
      modelInfo: {
        name: 'Porsche',
        type: 'car',
        path: '/porsche.glb'
      }
    }
  ];

  const comparisonData = {
    'rocket-plane': {
      similarities: [
        'Both use aerodynamic principles for flight',
        'Require thrust to overcome gravity',
        'Use control surfaces for steering',
        'Need structural integrity for high speeds'
      ],
      differences: [
        {
          aspect: 'Propulsion',
          rocket: 'Rocket engines work in vacuum, carry oxidizer',
          plane: 'Jet engines need atmospheric oxygen'
        },
        {
          aspect: 'Speed',
          rocket: 'Up to 28,000 km/h (orbital velocity)',
          plane: 'Up to 3,500 km/h (Mach 3)'
        },
        {
          aspect: 'Altitude',
          rocket: 'Can reach space (400+ km)',
          plane: 'Limited to atmosphere (20-30 km max)'
        },
        {
          aspect: 'Fuel',
          rocket: 'RP-1 kerosene + Liquid Oxygen',
          plane: 'Jet fuel (kerosene-based)'
        }
      ]
    },
    'rocket-car': {
      similarities: [
        'Both convert chemical energy to motion',
        'Use combustion engines',
        'Require fuel and oxidizer',
        'Need cooling systems'
      ],
      differences: [
        {
          aspect: 'Environment',
          rocket: 'Operates in vacuum of space',
          car: 'Operates on ground with air resistance'
        },
        {
          aspect: 'Power Output',
          rocket: '7,607 kN total thrust',
          car: '300-500 HP (220-370 kW)'
        },
        {
          aspect: 'Fuel Efficiency',
          rocket: 'Burns fuel in minutes',
          car: 'Can run for hours on one tank'
        },
        {
          aspect: 'Reusability',
          rocket: 'Falcon 9 is reusable (20+ flights)',
          car: 'Designed for thousands of uses'
        }
      ]
    },
    'plane-car': {
      similarities: [
        'Both use internal combustion principles',
        'Require aerodynamic design',
        'Use similar materials (aluminum, composites)',
        'Have similar control systems'
      ],
      differences: [
        {
          aspect: 'Lift Generation',
          plane: 'Wings generate lift through airfoil shape',
          car: 'Wheels provide traction on ground'
        },
        {
          aspect: 'Speed',
          plane: 'Up to 2,500 km/h (commercial jets)',
          car: 'Up to 400 km/h (high-performance)'
        },
        {
          aspect: 'Engine Type',
          plane: 'Turbofan or turbojet engines',
          car: 'Piston or rotary engines'
        },
        {
          aspect: 'Fuel Consumption',
          plane: '2-3 liters per km (per passenger)',
          car: '0.05-0.15 liters per km'
        }
      ]
    }
  };

  const getComparisonKey = () => {
    const sorted = [leftModel, rightModel].sort();
    return `${sorted[0]}-${sorted[1]}`;
  };

  const currentComparison = comparisonData[getComparisonKey()] || comparisonData['rocket-plane'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-gray-900/95 backdrop-blur border-b border-gray-700 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-400" />
            </button>
            <div className="flex items-center gap-3">
              <ArrowLeftRight className="w-6 h-6 text-cyan-400" />
              <h1 className="text-2xl font-bold text-white">Model Comparison</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* 3D Model Viewers Side by Side */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Model */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">Model A</h3>
              <select
                value={leftModel}
                onChange={(e) => setLeftModel(e.target.value)}
                className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-cyan-500"
              >
                {models.map((model) => (
                  <option key={model.id} value={model.id}>
                    {model.icon} {model.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="h-96 bg-gradient-to-br from-gray-900 to-black rounded-xl border border-gray-700 overflow-hidden">
              <ThreeJSViewer modelInfo={models.find(m => m.id === leftModel)?.modelInfo} />
            </div>
          </div>

          {/* Right Model */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white">Model B</h3>
              <select
                value={rightModel}
                onChange={(e) => setRightModel(e.target.value)}
                className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-cyan-500"
              >
                {models.map((model) => (
                  <option key={model.id} value={model.id}>
                    {model.icon} {model.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="h-96 bg-gradient-to-br from-gray-900 to-black rounded-xl border border-gray-700 overflow-hidden">
              <ThreeJSViewer modelInfo={models.find(m => m.id === rightModel)?.modelInfo} />
            </div>
          </div>
        </div>

        {/* Comparison Analysis */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Similarities */}
          <div className="bg-gray-800/50 backdrop-blur border border-green-500/30 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                <Check className="w-5 h-5 text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-green-400">Similarities</h3>
            </div>
            <ul className="space-y-3">
              {currentComparison.similarities.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Key Differences */}
          <div className="bg-gray-800/50 backdrop-blur border border-cyan-500/30 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                <ArrowLeftRight className="w-5 h-5 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold text-cyan-400">Key Differences</h3>
            </div>
            <div className="space-y-4">
              {currentComparison.differences.map((diff, index) => (
                <div key={index} className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
                  <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">
                    {diff.aspect}
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-cyan-400 mb-1">
                        {models.find(m => m.id === leftModel)?.icon} Model A
                      </div>
                      <p className="text-sm text-gray-300">{diff[leftModel]}</p>
                    </div>
                    <div>
                      <div className="text-xs text-purple-400 mb-1">
                        {models.find(m => m.id === rightModel)?.icon} Model B
                      </div>
                      <p className="text-sm text-gray-300">{diff[rightModel]}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Engineering Insights */}
        <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-6">
          <h3 className="text-xl font-bold text-purple-400 mb-4">💡 Engineering Insights</h3>
          <div className="grid md:grid-cols-2 gap-4 text-gray-300">
            <div>
              <h4 className="font-semibold text-white mb-2">Design Philosophy</h4>
              <p className="text-sm">
                Each vehicle is optimized for its environment. Rockets prioritize thrust-to-weight ratio,
                planes balance lift and drag, while cars focus on traction and handling.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-2">Material Science</h4>
              <p className="text-sm">
                All three use advanced materials: rockets use heat-resistant alloys, planes use lightweight
                composites, and cars balance strength with crash safety requirements.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
