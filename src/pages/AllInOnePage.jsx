import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Rocket, Plane, Car, Zap, Settings, Info, RotateCw, Menu, X, BookOpen, Play, Maximize2, LogOut, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import ThreeJSViewer from '../components/ThreeJSViewer';
import AITutor from '../components/AITutor';

// ============================================================================
// DATA - Models and Lessons
// ============================================================================

const MODELS = [
  {
    id: 'falcon9',
    name: 'Falcon 9',
    category: 'rockets',
    path: '/falcon9-spacex.glb',
    thumbnail: 'https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?w=200&h=150&fit=crop',
    specs: { thrust: '7607 kN (sea level)', stages: 2, mass: '549,054 kg', height: '70m' },
    description: 'SpaceX\'s workhorse rocket for orbital missions',
    type: 'Rockets'
  },
  {
    id: 'saturnv',
    name: 'Saturn V',
    category: 'rockets',
    path: '/saturn-v.glb',
    thumbnail: 'https://images.unsplash.com/photo-1581822261290-991b38693d1b?w=200&h=150&fit=crop',
    specs: { thrust: '34,020 kN', stages: 3, mass: '2,970,000 kg', height: '110.6m' },
    description: 'Historic moon landing rocket from Apollo program',
    type: 'Rockets'
  },
  {
    id: 'falcon-heavy',
    name: 'Falcon Heavy',
    category: 'rockets',
    path: '/falcon-heavy.glb',
    thumbnail: 'https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=200&h=150&fit=crop',
    specs: { thrust: '22,819 kN', stages: 2, mass: '1,420,788 kg', height: '70m' },
    description: 'Most powerful operational rocket with three Falcon 9 cores',
    type: 'Rockets'
  },
  {
    id: 'shuttle',
    name: 'Space Shuttle',
    category: 'rockets',
    path: '/space-shuttle.glb',
    thumbnail: 'https://images.unsplash.com/photo-1457364847821-58861bbda116?w=200&h=150&fit=crop',
    specs: { thrust: '30,160 kN', crew: '7', mass: '2,030,000 kg', height: '56.1m' },
    description: 'Reusable orbital spacecraft',
    type: 'Rockets'
  },
  {
    id: 'porsche911',
    name: 'Porsche 911 Carrera 4S',
    category: 'cars',
    path: '/porsche.glb',
    thumbnail: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=200&h=150&fit=crop',
    specs: { hp: '443 HP', weight: '1,435 kg', topSpeed: '307 km/h', acceleration: '3.2s 0-100km/h' },
    description: 'Iconic sports car with detailed exterior and interior',
    type: 'Cars'
  },
  {
    id: 'bmw-m4',
    name: 'BMW M4 F82',
    category: 'cars',
    path: '/bmw-m4.glb',
    thumbnail: 'https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=200&h=150&fit=crop',
    specs: { hp: '425 HP', weight: '1,497 kg', topSpeed: '250 km/h', acceleration: '3.9s 0-100km/h' },
    description: 'High-performance sports coupe with aggressive styling',
    type: 'Cars'
  },
  {
    id: 'f22',
    name: 'F-22 Raptor',
    category: 'planes',
    path: '/f22-raptor.glb',
    thumbnail: 'https://images.unsplash.com/photo-1583884421430-d4d5e0e4f4c5?w=200&h=150&fit=crop',
    specs: { topSpeed: '2,410 km/h', thrust: '78 kN × 2', ceiling: '19,812m', range: '2,963 km' },
    description: 'Fifth-generation stealth fighter aircraft',
    type: 'Planes'
  },
  {
    id: 'f16',
    name: 'F-16 Fighting Falcon',
    category: 'planes',
    path: '/f16.glb',
    thumbnail: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=200&h=150&fit=crop',
    specs: { topSpeed: '2,124 km/h', thrust: '131 kN', ceiling: '15,240m', range: '4,220 km' },
    description: 'Legendary multi-role fighter with exceptional maneuverability',
    type: 'Planes'
  }
];

const LESSONS = [
  {
    id: 'propulsion-basics',
    title: 'Rocket Propulsion Fundamentals',
    teaser: 'Understand Newton\'s laws and basic rocket physics',
    bullets: [
      'Thrust is reaction — engine pushes mass backward to move forward (Newton\'s 3rd Law)',
      'F = ma links force, mass, and acceleration; mass drop changes acceleration during burn',
      'ISP is a measure of engine efficiency (higher is better for fuel usage)'
    ],
    exercise: 'Tune thrust and mass to reach a target velocity in a short-time challenge'
  },
  {
    id: 'engine-types',
    title: 'Engine Types',
    teaser: 'Compare solid, liquid, hybrid, and ion propulsion',
    bullets: [
      'Solid motors are simple and robust, once lit they cannot be throttled',
      'Liquid engines allow throttle, restart, and higher control but are complex',
      'Electric/ion engines have low thrust but very high ISP — good for long missions'
    ],
    exercise: 'Pick an engine for a 1000 kg probe to transfer to Mars—justify your choice'
  },
  {
    id: 'nozzles',
    title: 'Nozzle Design',
    teaser: 'Explore how nozzle geometry affects performance',
    bullets: [
      'Expansion ratio is exit area / throat area and affects exhaust velocity',
      'At sea level, too-high expansion causes flow separation and loss of thrust',
      'Optimal nozzle depends on ambient pressure (altitude) and mission profile'
    ],
    exercise: 'Design a nozzle for max sea-level thrust under area constraints'
  },
  {
    id: 'staging',
    title: 'Multi-Stage Rockets',
    teaser: 'Learn why rockets use stages and trajectory mechanics',
    bullets: [
      'Staging drops dead mass to increase final velocity (delta-v advantage)',
      'Trajectory pitch programs and gravity losses matter for orbital insertion',
      'Delta-v budget planning is the central part of mission design'
    ],
    exercise: 'Create a two-stage rocket that puts 200 kg into LEO'
  },
  {
    id: 'aerodynamics',
    title: 'Aerodynamics & Thermal Protection',
    teaser: 'Understand airflow and heat management',
    bullets: [
      'Drag increases with velocity squared; streamlining reduces drag coefficient',
      'Re-entry heating requires thermal protection systems (TPS)',
      'Angle of attack and control surfaces enable precise trajectory control'
    ],
    exercise: 'Optimize a heat shield design for Mars EDL mission'
  },
  {
    id: 'orbital-mechanics',
    title: 'Orbital Mechanics',
    teaser: 'Master the physics of orbits and transfers',
    bullets: [
      'Orbits are governed by gravity and initial velocity conditions',
      'Hohmann transfers are fuel-efficient paths between circular orbits',
      'Delta-v requirements determine mission feasibility and fuel needs'
    ],
    exercise: 'Calculate delta-v for Earth to Mars transfer orbit'
  }
];

// ============================================================================
// NOZZLE PLAYGROUND COMPONENT
// ============================================================================

const g0 = 9.80665;

function computeIsp(expansionRatio, ambientPressure) {
  const base = 300;
  const isp = base * (1 + Math.log10(1 + expansionRatio) * 0.28) * (1 - ambientPressure * 0.0005);
  return Math.max(50, isp);
}

function computeThrust(massFlow, isp, pe, pa, Ae) {
  const ve = isp * g0;
  return massFlow * ve + (pe - pa) * Ae;
}

function NozzlePlayground({ onParamsChange }) {
  const [expansionRatio, setExpansionRatio] = useState(10);
  const [ambientPressure, setAmbientPressure] = useState(101325);
  const [throttle, setThrottle] = useState(1.0);
  const [isExpanded, setIsExpanded] = useState(false);

  const nominalMassFlow = 250;
  const Ae = 0.5;
  const pe = 101325 / Math.max(1, 1 / expansionRatio);

  const massFlow = nominalMassFlow * throttle;
  const isp = useMemo(() => computeIsp(expansionRatio, ambientPressure), [expansionRatio, ambientPressure]);
  const thrust = useMemo(() => computeThrust(massFlow, isp, pe, ambientPressure, Ae), [massFlow, isp, pe, ambientPressure]);

  useEffect(() => {
    if (onParamsChange) {
      onParamsChange({ expansionRatio, ambientPressure, throttle });
    }
  }, [expansionRatio, ambientPressure, throttle, onParamsChange]);

  return (
    <div className={`bg-gradient-to-br from-gray-800/95 to-gray-900/95 backdrop-blur-sm rounded-xl border border-gray-700 transition-all ${isExpanded ? 'p-6' : 'p-4'}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-cyan-400" />
          <h3 className="font-semibold text-lg text-white">Nozzle Playground</h3>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1 hover:bg-white/10 rounded transition-colors text-white"
        >
          {isExpanded ? <X className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm text-gray-300">Expansion Ratio</label>
            <span className="text-sm font-medium text-cyan-400">{expansionRatio.toFixed(1)}x</span>
          </div>
          <input
            type="range"
            min="1"
            max="80"
            value={expansionRatio}
            onChange={e => setExpansionRatio(Number(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm text-gray-300">Ambient Pressure</label>
            <span className="text-sm font-medium text-cyan-400">{Math.round(ambientPressure)} Pa</span>
          </div>
          <input
            type="range"
            min="100"
            max="101325"
            value={ambientPressure}
            onChange={e => setAmbientPressure(Number(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm text-gray-300">Throttle</label>
            <span className="text-sm font-medium text-cyan-400">{Math.round(throttle * 100)}%</span>
          </div>
          <input
            type="range"
            min="0.1"
            max="1.0"
            step="0.01"
            value={throttle}
            onChange={e => setThrottle(Number(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-4">
        <div className="bg-black/40 p-3 rounded-lg border border-gray-700">
          <div className="text-xs text-gray-400 mb-1">Specific Impulse</div>
          <div className="text-xl font-bold text-cyan-400">{isp.toFixed(1)} s</div>
        </div>
        <div className="bg-black/40 p-3 rounded-lg border border-gray-700">
          <div className="text-xs text-gray-400 mb-1">Thrust</div>
          <div className="text-xl font-bold text-emerald-400">{(thrust / 1000).toFixed(2)} kN</div>
        </div>
      </div>

      {isExpanded && (
        <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
          <div className="font-medium text-sm mb-2 text-blue-300">Key Insights</div>
          <ul className="text-xs text-gray-300 space-y-1">
            <li>• Higher expansion ratio increases vacuum performance (ISP)</li>
            <li>• Lower ambient pressure improves effective expansion</li>
            <li>• Thrust scales with mass flow × exhaust velocity</li>
          </ul>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// MAIN APP COMPONENT
// ============================================================================

export default function AllInOnePage() {
  const location = window.location;
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  
  // Determine initial category from URL
  const getInitialCategory = () => {
    if (location.pathname.includes('/rockets')) return 'rockets';
    if (location.pathname.includes('/planes')) return 'planes';
    if (location.pathname.includes('/cars')) return 'cars';
    return 'all';
  };
  
  const [selectedCategory, setSelectedCategory] = useState(getInitialCategory());
  const [selectedModel, setSelectedModel] = useState(MODELS[0]);
  const [showLessons, setShowLessons] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [autoRotate, setAutoRotate] = useState(true);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [nozzleParams, setNozzleParams] = useState({
    expansionRatio: 10,
    ambientPressure: 101325,
    throttle: 1.0
  });

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const filteredModels = selectedCategory === 'all'
    ? MODELS
    : MODELS.filter(m => m.category === selectedCategory);

  useEffect(() => {
    if (!filteredModels.find(m => m.id === selectedModel.id)) {
      setSelectedModel(filteredModels[0]);
    }
  }, [selectedCategory, filteredModels, selectedModel.id]);

  const CategoryButton = ({ category, icon: Icon, label }) => (
    <button
      onClick={() => setSelectedCategory(category)}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
        selectedCategory === category
          ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-500/50'
          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
      }`}
    >
      <Icon className="w-4 h-4" />
      <span className="text-sm font-medium">{label}</span>
    </button>
  );

  return (
    <div className="h-screen flex flex-col bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                AeroAI 3D
              </h1>
              <p className="text-sm text-gray-400">Interactive Engineering Models</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowLessons(!showLessons)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline text-sm">Lessons</span>
            </button>
            
            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              >
                <User className="w-4 h-4" />
                <span className="hidden sm:inline text-sm">{user?.email?.split('@')[0]}</span>
              </button>
              
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50">
                  <div className="p-3 border-b border-gray-700">
                    <p className="text-xs text-gray-400">Signed in as</p>
                    <p className="text-sm text-white truncate">{user?.email}</p>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-2 px-4 py-2 text-left hover:bg-gray-700 transition-colors text-red-400"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm">Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
          <CategoryButton category="all" icon={Settings} label="All Models" />
          <CategoryButton category="rockets" icon={Rocket} label="Rockets" />
          <CategoryButton category="planes" icon={Plane} label="Aircraft" />
          <CategoryButton category="cars" icon={Car} label="Cars" />
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 fixed lg:relative z-30 w-80 h-full bg-gray-800 border-r border-gray-700 transition-transform duration-300 overflow-y-auto`}
        >
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-gray-400">
                MODELS ({filteredModels.length})
              </h2>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-1 hover:bg-gray-700 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              {filteredModels.map(model => (
                <button
                  key={model.id}
                  onClick={() => {
                    setSelectedModel(model);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex gap-3 p-3 rounded-lg text-left transition-all ${
                    selectedModel.id === model.id
                      ? 'bg-cyan-600/20 border-2 border-cyan-500'
                      : 'bg-gray-700/50 hover:bg-gray-700 border-2 border-transparent'
                  }`}
                >
                  <img
                    src={model.thumbnail}
                    alt={model.name}
                    className="w-16 h-12 object-cover rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm truncate">{model.name}</div>
                    <div className="text-xs text-gray-400 truncate">
                      {model.category} • {Object.values(model.specs)[0]}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 relative bg-black">
          {/* Model Info Overlay */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 bg-black/60 backdrop-blur-sm px-6 py-3 rounded-full border border-gray-700">
            <div className="text-center">
              <div className="font-semibold">{selectedModel.name}</div>
              <div className="text-xs text-gray-400">{selectedModel.description}</div>
            </div>
          </div>

          {/* Controls */}
          <div className="absolute top-4 right-4 z-20 flex gap-2">
            <button
              onClick={() => setAutoRotate(!autoRotate)}
              className={`p-3 rounded-lg backdrop-blur-sm transition-all ${
                autoRotate ? 'bg-cyan-600/80' : 'bg-gray-800/80'
              }`}
              title="Toggle auto-rotation"
            >
              <RotateCw className="w-5 h-5" />
            </button>
          </div>

          {/* 3D Viewer */}
          <div className="w-full h-full">
            <ThreeJSViewer
              modelType={selectedModel.type.toLowerCase()}
              modelInfo={selectedModel}
              nozzleParams={nozzleParams}
            />
          </div>

          {/* Specs Panel */}
          <div className="absolute bottom-4 left-4 z-20 bg-gray-800/95 backdrop-blur-sm p-4 rounded-xl border border-gray-700 max-w-sm">
            <div className="flex items-center gap-2 mb-3">
              <Info className="w-4 h-4 text-cyan-400" />
              <h3 className="font-semibold">Specifications</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(selectedModel.specs).map(([key, value]) => (
                <div key={key} className="bg-black/40 p-2 rounded">
                  <div className="text-xs text-gray-400 capitalize">{key.replace('_', ' ')}</div>
                  <div className="text-sm font-medium">{value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Nozzle Playground */}
          {selectedModel.category === 'rockets' && (
            <div className="absolute bottom-4 right-4 z-20 w-96">
              <NozzlePlayground onParamsChange={setNozzleParams} />
            </div>
          )}
        </main>
      </div>

      {/* Lessons Modal */}
      {showLessons && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
            <div className="sticky top-0 bg-gray-800 border-b border-gray-700 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold">Engineering Lessons</h2>
              <button
                onClick={() => setShowLessons(false)}
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 grid gap-4">
              {LESSONS.map(lesson => (
                <div
                  key={lesson.id}
                  className="bg-gray-700/50 p-5 rounded-xl border border-gray-600 hover:border-cyan-500 transition-all"
                >
                  <h3 className="text-xl font-semibold mb-2">{lesson.title}</h3>
                  <p className="text-gray-300 text-sm mb-4">{lesson.teaser}</p>

                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-cyan-400 mb-2">Key Concepts:</h4>
                    <ul className="space-y-1">
                      {lesson.bullets.map((bullet, idx) => (
                        <li key={idx} className="text-sm text-gray-300 flex gap-2">
                          <span className="text-cyan-400">•</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-blue-500/10 border border-blue-500/30 p-3 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Play className="w-4 h-4 text-blue-400" />
                      <h4 className="text-sm font-medium text-blue-400">Interactive Exercise:</h4>
                    </div>
                    <p className="text-sm text-gray-300">{lesson.exercise}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* AI Tutor Chat */}
      <AITutor />
    </div>
  );
}
