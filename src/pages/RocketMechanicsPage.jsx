import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Rocket, Zap, Gauge, Flame } from 'lucide-react';

const RocketMechanicsPage = () => {
  const [activeTab, setActiveTab] = useState('spacex');
  const navigate = useNavigate();

  const spacexData = {
    company: 'SpaceX',
    rockets: [
      {
        name: 'Falcon 9',
        description: 'Two-stage orbital rocket designed for reliable and safe transport of satellites and crew',
        specs: {
          height: '70 m (230 ft)',
          diameter: '3.7 m (12 ft)',
          mass: '549,054 kg (1,207,920 lb)',
          payload: '22,800 kg to LEO'
        },
        stages: [
          {
            name: 'First Stage',
            details: 'Powered by 9 Merlin engines generating 7,607 kN of thrust at sea level. Reusable - lands vertically after launch.',
            fuel: 'RP-1 (Rocket-grade kerosene) and Liquid Oxygen (LOX)',
            burnTime: '162 seconds',
            engines: '9x Merlin 1D'
          },
          {
            name: 'Second Stage',
            details: 'Single Merlin Vacuum engine optimized for space. Powers payload to orbit.',
            fuel: 'RP-1 and LOX',
            burnTime: '397 seconds',
            engines: '1x Merlin Vacuum'
          }
        ]
      },
      {
        name: 'Falcon Heavy',
        description: 'Most powerful operational rocket - essentially three Falcon 9 first stages strapped together',
        specs: {
          height: '70 m (230 ft)',
          diameter: '12.2 m (40 ft) at base',
          mass: '1,420,788 kg (3,125,735 lb)',
          payload: '63,800 kg to LEO'
        },
        stages: [
          {
            name: 'Three Boosters',
            details: '27 Merlin engines total (9 per booster) generating 22,819 kN of thrust. All three cores are reusable.',
            fuel: 'RP-1 and LOX',
            burnTime: '162 seconds',
            engines: '27x Merlin 1D'
          }
        ]
      }
    ],
    engines: [
      {
        name: 'Merlin 1D',
        type: 'Gas-generator cycle engine',
        thrust: '845 kN (190,000 lbf) at sea level, 934 kN in vacuum',
        isp: '282s sea level, 311s vacuum',
        details: 'Uses RP-1 and liquid oxygen. Features regenerative cooling where fuel flows through channels in the nozzle walls to cool them before combustion. Can throttle from 40% to 100%. Designed for reusability.',
        innovations: [
          'Pintle injector for reliable combustion',
          'Regenerative cooling system',
          'Throttle capability for landing',
          'Designed for 10+ flights'
        ]
      },
      {
        name: 'Merlin Vacuum',
        type: 'Vacuum-optimized variant',
        thrust: '934 kN (210,000 lbf)',
        isp: '348s',
        details: 'Larger nozzle optimized for vacuum. Powers the second stage. Cannot be used at sea level due to over-expansion.',
        innovations: [
          'Large expansion ratio nozzle',
          'Niobium alloy nozzle extension',
          'Optimized for space efficiency'
        ]
      }
    ],
    technology: [
      {
        title: 'Reusability',
        description: 'First stage lands vertically using grid fins for steering and engine thrust for braking. Lands on drone ships or landing pads.',
        impact: 'Reduces launch cost by 30-50%'
      },
      {
        title: 'Propellant',
        description: 'RP-1 (refined kerosene) is denser than hydrogen, allowing smaller tanks. LOX is super-cooled to -207°C for higher density.',
        impact: 'More fuel in smaller volume'
      },
      {
        title: 'Octaweb Engine Layout',
        description: '9 engines arranged in circle (8 outer + 1 center). Provides redundancy - can lose 2 engines and still complete mission.',
        impact: 'Increased reliability and safety'
      }
    ]
  };

  const nasaData = {
    company: 'NASA',
    rockets: [
      {
        name: 'Saturn V',
        description: 'Legendary moon rocket that powered Apollo missions. Most powerful rocket ever flown until 2022.',
        specs: {
          height: '110.6 m (363 ft)',
          diameter: '10.1 m (33 ft)',
          mass: '2,970,000 kg (6,540,000 lb)',
          payload: '140,000 kg to LEO, 48,600 kg to Moon'
        },
        stages: [
          {
            name: 'S-IC First Stage',
            details: 'Five F-1 engines - largest single-chamber engines ever made. Burned for 2.5 minutes.',
            fuel: 'RP-1 and LOX',
            burnTime: '150 seconds',
            engines: '5x F-1'
          },
          {
            name: 'S-II Second Stage',
            details: 'Five J-2 engines burning liquid hydrogen. First use of hydrogen in a manned rocket.',
            fuel: 'Liquid Hydrogen and LOX',
            burnTime: '360 seconds',
            engines: '5x J-2'
          },
          {
            name: 'S-IVB Third Stage',
            details: 'Single J-2 engine. Could restart in space for trans-lunar injection.',
            fuel: 'Liquid Hydrogen and LOX',
            burnTime: '165 + 335 seconds',
            engines: '1x J-2'
          }
        ]
      },
      {
        name: 'Space Shuttle',
        description: 'Partially reusable spacecraft system. Flew 135 missions from 1981-2011.',
        specs: {
          height: '56.1 m (184 ft)',
          wingspan: '23.8 m (78 ft)',
          mass: '2,030,000 kg (4,470,000 lb)',
          payload: '27,500 kg to LEO'
        },
        stages: [
          {
            name: 'Solid Rocket Boosters (SRBs)',
            details: 'Two reusable solid fuel boosters. Provided 83% of thrust at liftoff.',
            fuel: 'Solid propellant (aluminum powder + ammonium perchlorate)',
            burnTime: '124 seconds',
            engines: '2x SRBs'
          },
          {
            name: 'Space Shuttle Main Engines (SSMEs)',
            details: 'Three liquid hydrogen engines on the orbiter. Most efficient rocket engines ever built.',
            fuel: 'Liquid Hydrogen and LOX',
            burnTime: '480 seconds',
            engines: '3x RS-25'
          }
        ]
      }
    ],
    engines: [
      {
        name: 'F-1 Engine',
        type: 'Gas-generator cycle',
        thrust: '6,770 kN (1,522,000 lbf)',
        isp: '263s sea level, 304s vacuum',
        details: 'Largest single-chamber liquid-fuel engine ever made. Used on Saturn V first stage. Burned 3 tons of propellant per second. So powerful it created instabilities that required baffles in combustion chamber.',
        innovations: [
          'Massive scale - 5.5m tall',
          'Regenerative cooling with RP-1',
          'Hypergolic ignition system',
          'Gimbal for thrust vectoring'
        ]
      },
      {
        name: 'RS-25 (SSME)',
        type: 'Staged combustion cycle',
        thrust: '1,859 kN (418,000 lbf) at sea level, 2,279 kN in vacuum',
        isp: '366s sea level, 452s vacuum',
        details: 'Most efficient rocket engine ever flown. Uses staged combustion - pre-burns fuel to drive turbopumps, then burns again in main chamber. Can throttle 67-109%. Reusable for 55 flights.',
        innovations: [
          'Highest ISP of any rocket engine',
          'Staged combustion cycle',
          'Advanced throttle control',
          'Designed for reusability'
        ]
      }
    ],
    technology: [
      {
        title: 'Liquid Hydrogen Fuel',
        description: 'Hydrogen has highest energy per kg of any fuel. Requires cryogenic storage at -253°C. Very low density requires large tanks.',
        impact: 'Maximum efficiency for upper stages'
      },
      {
        title: 'Solid Rocket Boosters',
        description: 'Simple, reliable, powerful. Cannot be throttled or shut down once ignited. Reusable casings.',
        impact: 'Massive thrust for liftoff'
      },
      {
        title: 'Thermal Protection System',
        description: 'Space Shuttle used 24,000+ heat-resistant tiles. Each unique shape. Protected from 1,650°C reentry heat.',
        impact: 'Enabled reusable spacecraft'
      }
    ]
  };

  const data = activeTab === 'spacex' ? spacexData : nasaData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Header */}
      <header className="border-b border-gray-700 bg-gray-900/50 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </button>
            
            <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
              🚀 Rocket Mechanics
            </h1>
            
            <div className="w-24" /> {/* Spacer */}
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mt-4">
            <button
              onClick={() => setActiveTab('spacex')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'spacex'
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              SpaceX
            </button>
            <button
              onClick={() => setActiveTab('nasa')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'nasa'
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              NASA
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
        {/* Rockets Section */}
        <section>
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <Rocket className="w-8 h-8 text-orange-400" />
            {data.company} Rockets
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {data.rockets.map((rocket, idx) => (
              <div key={idx} className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-xl p-6 hover:border-gray-600 transition-all">
                <h3 className="text-2xl font-bold mb-3 text-cyan-400">{rocket.name}</h3>
                <p className="text-gray-300 mb-4">{rocket.description}</p>
                
                <div className="bg-gray-900/50 rounded-lg p-4 mb-4">
                  <h4 className="font-semibold mb-2 text-orange-400">Specifications</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    {Object.entries(rocket.specs).map(([key, value]) => (
                      <div key={key}>
                        <span className="text-gray-400 capitalize">{key}:</span>
                        <span className="text-white ml-2">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-orange-400">Stages</h4>
                  {rocket.stages.map((stage, i) => (
                    <div key={i} className="bg-gray-900/30 rounded-lg p-3 border-l-4 border-cyan-500">
                      <h5 className="font-semibold text-cyan-300 mb-1">{stage.name}</h5>
                      <p className="text-sm text-gray-300 mb-2">{stage.details}</p>
                      <div className="text-xs text-gray-400 space-y-1">
                        <div>⚡ {stage.engines}</div>
                        <div>🔥 {stage.fuel}</div>
                        <div>⏱️ Burn: {stage.burnTime}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Engines Section */}
        <section>
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <Flame className="w-8 h-8 text-red-400" />
            Rocket Engines
          </h2>
          
          <div className="space-y-6">
            {data.engines.map((engine, idx) => (
              <div key={idx} className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur border border-gray-700 rounded-xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-orange-400">{engine.name}</h3>
                    <p className="text-gray-400">{engine.type}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-cyan-400">{engine.thrust}</div>
                    <div className="text-sm text-gray-400">Thrust</div>
                  </div>
                </div>

                <p className="text-gray-300 mb-4">{engine.details}</p>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-900/50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Gauge className="w-5 h-5 text-cyan-400" />
                      <h4 className="font-semibold">Specific Impulse (ISP)</h4>
                    </div>
                    <p className="text-cyan-400 text-xl font-bold">{engine.isp}</p>
                    <p className="text-xs text-gray-400 mt-1">Higher = more efficient</p>
                  </div>

                  <div className="bg-gray-900/50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="w-5 h-5 text-orange-400" />
                      <h4 className="font-semibold">Key Innovations</h4>
                    </div>
                    <ul className="text-sm text-gray-300 space-y-1">
                      {engine.innovations.map((innovation, i) => (
                        <li key={i}>• {innovation}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Technology Section */}
        <section>
          <h2 className="text-3xl font-bold mb-6">Key Technologies</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {data.technology.map((tech, idx) => (
              <div key={idx} className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-xl p-6 hover:border-cyan-500 transition-all">
                <h3 className="text-xl font-bold mb-3 text-cyan-400">{tech.title}</h3>
                <p className="text-gray-300 mb-4 text-sm">{tech.description}</p>
                <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-lg p-3">
                  <div className="text-xs text-gray-400 mb-1">Impact:</div>
                  <div className="text-sm font-semibold text-orange-400">{tech.impact}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default RocketMechanicsPage;
