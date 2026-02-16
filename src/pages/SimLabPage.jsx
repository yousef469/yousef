import { useState, useRef, useEffect, Suspense, lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ArrowLeft, Box, Cpu, Zap, Activity, Layers,
    Settings, Save, Play, RotateCcw, Trash2,
    Palette, MousePointer, Info, Maximize2,
    ChevronRight, ChevronDown, CheckCircle
} from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stage, PerspectiveCamera, Environment, Grid, Float, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

// --- Types & Constants ---
const BUILDING_TYPES = {
    ROCKET: 'rocket',
    CAR: 'car',
    DRONE: 'drone'
};

const MODES = {
    BUILD: 'build',
    DESIGN: 'design',
    SIMULATE: 'simulate'
};

// --- Procedural Components ---
const RocketBody = ({ height, radius, color, material }) => (
    <mesh position={[0, height / 2, 0]}>
        <cylinderGeometry args={[radius, radius, height, 32]} />
        <meshStandardMaterial color={color} metalness={material === 'metal' ? 0.9 : 0.2} roughness={material === 'metal' ? 0.1 : 0.8} />
    </mesh>
);

const RocketNose = ({ radius, height, color, material, parentHeight }) => (
    <mesh position={[0, parentHeight + height / 2, 0]}>
        <coneGeometry args={[radius, height, 32]} />
        <meshStandardMaterial color={color} metalness={material === 'metal' ? 0.9 : 0.2} roughness={material === 'metal' ? 0.1 : 0.8} />
    </mesh>
);

const RocketFin = ({ position, rotation, color, material }) => (
    <mesh position={position} rotation={rotation} castShadow receiveShadow>
        <boxGeometry args={[0.05, 0.8, 0.4]} />
        <meshStandardMaterial color={color} metalness={material === 'metal' ? 0.9 : 0.2} roughness={material === 'metal' ? 0.1 : 0.8} />
    </mesh>
);

const RocketEngine = ({ position, scale = 1, color = '#333' }) => (
    <mesh position={position} rotation={[Math.PI, 0, 0]} castShadow>
        <cylinderGeometry args={[0.2 * scale, 0.3 * scale, 0.5 * scale, 16]} />
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
        {/* Bell Glow effect */}
        <pointLight color="#ff4400" intensity={0.5} position={[0, -0.2, 0]} />
    </mesh>
);

const RocketBooster = ({ position, height, radius, color, material }) => (
    <group position={position}>
        <mesh position={[0, height / 2, 0]} castShadow>
            <cylinderGeometry args={[radius, radius, height, 24]} />
            <meshStandardMaterial color={color} metalness={material === 'metal' ? 0.9 : 0.2} roughness={material === 'metal' ? 0.1 : 0.8} />
        </mesh>
        <mesh position={[0, height + (radius * 1.5) / 2, 0]} castShadow>
            <coneGeometry args={[radius, radius * 1.5, 24]} />
            <meshStandardMaterial color={color} metalness={material === 'metal' ? 0.9 : 0.2} roughness={material === 'metal' ? 0.1 : 0.8} />
        </mesh>
        <RocketEngine position={[0, -0.2, 0]} scale={radius * 2} />
    </group>
);

// --- Preview Component ---
const ModelPreview = ({ config, mode }) => {
    const meshRef = useRef();
    const [physics, setPhysics] = useState({ vy: 0, y: 0, ay: 0 });

    useFrame((state, delta) => {
        if (mode === MODES.SIMULATE && config.isSimulating) {
            // Realistic Physics Integration
            const thrustForce = config.thrust * 40;
            const gravityForce = config.gravity * 2;
            const dragForce = config.drag * physics.vy * Math.abs(physics.vy) * 0.5;

            const mass = 1.0;
            const netForce = thrustForce - gravityForce - dragForce;
            const ay = netForce / mass;

            const nvy = physics.vy + ay * delta;
            const ny = Math.max(0, physics.y + nvy * delta);

            setPhysics({ vy: nvy, y: ny, ay });

            meshRef.current.position.y = ny;
            meshRef.current.rotation.y += 0.005;
        } else {
            if (physics.y !== 0 || physics.vy !== 0) {
                setPhysics({ vy: 0, y: 0, ay: 0 });
                meshRef.current.position.y = 0;
            }
        }
    });

    return (
        <group ref={meshRef}>
            {config.type === BUILDING_TYPES.ROCKET && (
                <group>
                    <RocketBody height={config.height} radius={config.radius} color={config.colors.primary} material={config.material} />
                    <RocketNose radius={config.radius} height={config.noseHeight} color={config.colors.secondary} material={config.material} parentHeight={config.height} />

                    {/* Main Engines */}
                    {Array.from({ length: config.engineCount }).map((_, i) => {
                        const angle = (i / config.engineCount) * Math.PI * 2;
                        const dist = config.radius * 0.5;
                        return (
                            <RocketEngine
                                key={i}
                                position={[Math.cos(angle) * dist, -0.2, Math.sin(angle) * dist]}
                                scale={config.radius * 1.5}
                            />
                        );
                    })}

                    {/* Side Boosters */}
                    {config.hasBoosters && (
                        <>
                            <RocketBooster position={[config.radius * 1.5, 0, 0]} height={config.height * 0.6} radius={config.radius * 0.4} color={config.colors.accent} material={config.material} />
                            <RocketBooster position={[-config.radius * 1.5, 0, 0]} height={config.height * 0.6} radius={config.radius * 0.4} color={config.colors.accent} material={config.material} />
                        </>
                    )}

                    {/* Fins (only if no boosters) */}
                    {!config.hasBoosters && (
                        <>
                            <RocketFin position={[config.radius, 0.5, 0]} rotation={[0, 0, 0]} color={config.colors.accent} material={config.material} />
                            <RocketFin position={[-config.radius, 0.5, 0]} rotation={[0, 0, 0]} color={config.colors.accent} material={config.material} />
                            <RocketFin position={[0, 0.5, config.radius]} rotation={[0, Math.PI / 2, 0]} color={config.colors.accent} material={config.material} />
                            <RocketFin position={[0, 0.5, -config.radius]} rotation={[0, Math.PI / 2, 0]} color={config.colors.accent} material={config.material} />
                        </>
                    )}
                </group>
            )}

            {/* Environment shadows */}
            {mode === MODES.SIMULATE && (
                <ContactShadows opacity={0.4} scale={20} blur={2.4} far={10} resolution={256} color="#000000" />
            )}
        </group>
    );
};

export default function SimLabPage() {
    const navigate = useNavigate();
    const [mode, setMode] = useState(MODES.BUILD);
    const [config, setConfig] = useState({
        type: BUILDING_TYPES.ROCKET,
        height: 6,
        radius: 0.8,
        noseHeight: 1.5,
        engineCount: 3,
        hasBoosters: true,
        colors: {
            primary: '#ffffff',
            secondary: '#2563eb',
            accent: '#dc2626'
        },
        material: 'matte',
        thrust: 0,
        gravity: 9.8,
        drag: 0.1,
        isSimulating: false
    });

    const handleConfigChange = (key, value) => {
        setConfig(prev => ({ ...prev, [key]: value }));
    };

    const handleColorChange = (part, color) => {
        setConfig(prev => ({
            ...prev,
            colors: { ...prev.colors, [part]: color }
        }));
    };

    return (
        <div className="flex h-screen bg-gray-950 text-white overflow-hidden font-sans">
            {/* Sidebar - Controls */}
            <div className="w-80 border-r border-white/10 bg-gray-900/50 backdrop-blur-xl flex flex-col z-20 shadow-2xl">
                <div className="p-6 border-b border-white/10 flex items-center gap-3">
                    <button onClick={() => navigate('/home')} className="p-2 hover:bg-white/5 rounded-lg transition-all">
                        <ArrowLeft className="w-5 h-5 text-gray-400" />
                    </button>
                    <div>
                        <h1 className="text-xl font-black tracking-tight italic uppercase">3D SimLab</h1>
                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Physics & CAD Sandbox</p>
                    </div>
                </div>

                {/* Mode Switcher */}
                <div className="p-4 grid grid-cols-3 gap-2 border-b border-white/10">
                    {[
                        { id: MODES.BUILD, icon: Box, label: 'Build' },
                        { id: MODES.DESIGN, icon: Palette, label: 'Design' },
                        { id: MODES.SIMULATE, icon: Zap, label: 'Sim' }
                    ].map(m => (
                        <button
                            key={m.id}
                            onClick={() => setMode(m.id)}
                            className={`flex flex-col items-center gap-1.5 p-3 rounded-xl transition-all ${mode === m.id ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/20' : 'text-gray-500 hover:bg-white/5 hover:text-gray-300'
                                }`}
                        >
                            <m.icon className="w-5 h-5" />
                            <span className="text-[10px] font-black uppercase tracking-tighter">{m.label}</span>
                        </button>
                    ))}
                </div>

                {/* Scrollable Params */}
                <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
                    {mode === MODES.BUILD && (
                        <div className="space-y-6 animate-in slide-in-from-left duration-300">
                            <section>
                                <h3 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-4 flex items-center gap-2">
                                    <Box className="w-3 h-3 text-cyan-400" />
                                    Dimensions
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <div className="flex justify-between text-[11px] mb-2 font-bold uppercase tracking-wider text-gray-400">
                                            <span>Fuselage Height</span>
                                            <span className="text-cyan-400">{config.height}m</span>
                                        </div>
                                        <input type="range" min="1" max="10" step="0.1" value={config.height} onChange={e => handleConfigChange('height', parseFloat(e.target.value))} className="w-full accent-cyan-500 h-1.5 bg-gray-800 rounded-full cursor-pointer" />
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-[11px] mb-2 font-bold uppercase tracking-wider text-gray-400">
                                            <span>Diameter</span>
                                            <span className="text-cyan-400">{config.radius * 2}m</span>
                                        </div>
                                        <input type="range" min="0.2" max="2" step="0.1" value={config.radius} onChange={e => handleConfigChange('radius', parseFloat(e.target.value))} className="w-full accent-cyan-500 h-1.5 bg-gray-800 rounded-full cursor-pointer" />
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-[11px] mb-2 font-bold uppercase tracking-wider text-gray-400">
                                            <span>Nose Cone</span>
                                            <span className="text-cyan-400">{config.noseHeight}m</span>
                                        </div>
                                        <input type="range" min="0.5" max="3" step="0.1" value={config.noseHeight} onChange={e => handleConfigChange('noseHeight', parseFloat(e.target.value))} className="w-full accent-cyan-500 h-1.5 bg-gray-800 rounded-full cursor-pointer" />
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h3 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-4 flex items-center gap-2">
                                    <Cpu className="w-3 h-3 text-cyan-400" />
                                    Subsystems
                                </h3>
                                <div className="space-y-4 mb-6">
                                    <div>
                                        <div className="flex justify-between text-[11px] mb-2 font-bold uppercase tracking-wider text-gray-400">
                                            <span>Engine Count</span>
                                            <span className="text-cyan-400">{config.engineCount}x</span>
                                        </div>
                                        <input type="range" min="1" max="9" step="1" value={config.engineCount} onChange={e => handleConfigChange('engineCount', parseInt(e.target.value))} className="w-full accent-cyan-500 h-1.5 bg-gray-800 rounded-full cursor-pointer" />
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5 cursor-pointer hover:bg-white/10 transition-all" onClick={() => handleConfigChange('hasBoosters', !config.hasBoosters)}>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Side Boosters</span>
                                        <div className={`w-10 h-5 rounded-full transition-all relative ${config.hasBoosters ? 'bg-cyan-500' : 'bg-gray-700'}`}>
                                            <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${config.hasBoosters ? 'left-6' : 'left-1'}`} />
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <button className="p-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-bold uppercase hover:bg-white/10 transition-all">Add RS-25 Engine</button>
                                    <button className="p-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-bold uppercase hover:bg-white/10 transition-all">Add RCS Pods</button>
                                </div>
                            </section>
                        </div>
                    )}

                    {mode === MODES.DESIGN && (
                        <div className="space-y-6 animate-in slide-in-from-left duration-300">
                            <section>
                                <h3 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-4 flex items-center gap-2">
                                    <Palette className="w-3 h-3 text-cyan-400" />
                                    Color Palette
                                </h3>
                                <div className="space-y-4">
                                    {['primary', 'secondary', 'accent'].map(part => (
                                        <div key={part} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{part} Part</span>
                                            <input type="color" value={config.colors[part]} onChange={e => handleColorChange(part, e.target.value)} className="w-10 h-6 bg-transparent cursor-pointer rounded overflow-hidden" />
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section>
                                <h3 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-4 flex items-center gap-2">
                                    <Layers className="w-3 h-3 text-cyan-400" />
                                    Material Type
                                </h3>
                                <div className="grid grid-cols-2 gap-2">
                                    {['matte', 'metal'].map(m => (
                                        <button
                                            key={m}
                                            onClick={() => handleConfigChange('material', m)}
                                            className={`p-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${config.material === m ? 'bg-cyan-500 border-cyan-400' : 'bg-white/5 border-white/10 text-gray-500 hover:bg-white/10'
                                                }`}
                                        >
                                            {m}
                                        </button>
                                    ))}
                                </div>
                            </section>
                        </div>
                    )}

                    {mode === MODES.SIMULATE && (
                        <div className="space-y-6 animate-in slide-in-from-left duration-300">
                            <section>
                                <h3 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-4 flex items-center gap-2">
                                    <Activity className="w-3 h-3 text-orange-400" />
                                    Physics Constants
                                </h3>
                                <div className="space-y-4 text-xs font-bold uppercase text-gray-400">
                                    {/* ... Gravity etc ... */}
                                    <div>
                                        <div className="flex justify-between mb-2">
                                            <span>Gravity</span>
                                            <span className="text-orange-400">{config.gravity} m/s²</span>
                                        </div>
                                        <input type="range" min="0" max="25" step="0.1" value={config.gravity} onChange={e => handleConfigChange('gravity', parseFloat(e.target.value))} className="w-full accent-orange-500 h-1.5 bg-gray-800 rounded-full" />
                                    </div>
                                    <div>
                                        <div className="flex justify-between mb-2">
                                            <span>Air Density</span>
                                            <span className="text-orange-400">{config.drag} ρ</span>
                                        </div>
                                        <input type="range" min="0" max="2" step="0.01" value={config.drag} onChange={e => handleConfigChange('drag', parseFloat(e.target.value))} className="w-full accent-orange-500 h-1.5 bg-gray-800 rounded-full" />
                                    </div>
                                    <div className="pt-2">
                                        <div className="flex justify-between mb-2">
                                            <span>Thrust Output</span>
                                            <span className="text-orange-400">{config.thrust}%</span>
                                        </div>
                                        <input type="range" min="0" max="1" step="0.01" value={config.thrust} onChange={e => handleConfigChange('thrust', parseFloat(e.target.value))} className="w-full accent-orange-500 h-1.5 bg-gray-800 rounded-full" />
                                    </div>
                                </div>
                            </section>

                            <div className="pt-4">
                                <button
                                    onClick={() => handleConfigChange('isSimulating', !config.isSimulating)}
                                    className={`w-full py-4 rounded-2xl flex items-center justify-center gap-3 font-black uppercase tracking-widest transition-all ${config.isSimulating ? 'bg-red-500 hover:bg-red-600 shadow-lg shadow-red-500/20' : 'bg-green-500 hover:bg-green-600 shadow-lg shadow-green-500/20'
                                        }`}
                                >
                                    {config.isSimulating ? <RotateCcw className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                                    {config.isSimulating ? 'Reset Simulation' : 'Launch Build'}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Main Viewport */}
            <div className="flex-1 relative bg-[#020617]">
                {/* Background Gradients */}
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-cyan-500/5 rounded-full blur-[140px] -mr-40 -mt-40 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] -ml-20 -mb-20 pointer-events-none" />

                <Canvas shadows gl={{ antialias: true }}>
                    <PerspectiveCamera makeDefault position={[10, 5, 10]} fov={45} />
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1} castShadow />
                    <spotLight position={[-5, 10, 5]} angle={0.15} penumbra={1} intensity={0.8} />

                    <Suspense fallback={null}>
                        <Float speed={config.isSimulating ? 0 : 2} rotationIntensity={config.isSimulating ? 0 : 0.5} floatIntensity={config.isSimulating ? 0 : 0.5}>
                            <ModelPreview config={config} mode={mode} />
                        </Float>
                        <Environment preset="city" />
                        <Stage environment="city" intensity={0.5} contactShadow={false} center>
                            {/* Model goes here via Float/ModelPreview */}
                        </Stage>
                        {mode === MODES.SIMULATE && <Grid infiniteGrid cellColor="#1e293b" sectionColor="#334155" fadeDistance={50} />}
                    </Suspense>

                    <OrbitControls makeDefault enableDamping dampingFactor={0.05} />
                </Canvas>

                {/* Floating Overlays */}
                <div className="absolute top-8 left-8 flex items-center gap-2 px-4 py-2 bg-gray-900/40 backdrop-blur-md rounded-full border border-white/5 pointer-events-none">
                    <div className={`w-2 h-2 rounded-full animate-pulse ${mode === MODES.SIMULATE ? 'bg-orange-500' : 'bg-cyan-500'}`} />
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-300">System Live: Rendering at 60FPS</span>
                </div>

                {/* CAD Grid Info */}
                {(mode === MODES.BUILD || mode === MODES.DESIGN) && (
                    <div className="absolute bottom-8 right-8 text-right font-mono p-4 bg-gray-900/40 backdrop-blur-md rounded-2xl border border-white/5">
                        <div className="text-[10px] text-gray-500 uppercase font-black mb-1">Entity Specs</div>
                        <div className="text-xs space-y-1">
                            <div className="flex justify-end gap-3"><span className="text-gray-500">Mass:</span> <span className="text-white">1,240 kg</span></div>
                            <div className="flex justify-end gap-3"><span className="text-gray-500">Drag Coeff:</span> <span className="text-white">0.32 Cb</span></div>
                            <div className="flex justify-end gap-3"><span className="text-gray-500">Materials:</span> <span className="text-white">{config.material}</span></div>
                        </div>
                    </div>
                )}

                {/* Simulation HUD */}
                {mode === MODES.SIMULATE && config.isSimulating && (
                    <div className="absolute inset-0 pointer-events-none border-[20px] border-orange-500/10 animate-pulse">
                        {/* Crosshair/HUD stuff can go here */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-2 border-orange-500/20 rounded-full flex items-center justify-center">
                            <div className="w-1 h-1 bg-orange-500 rounded-full" />
                        </div>
                        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex items-end gap-12">
                            <div className="text-center">
                                <div className="text-[10px] font-black uppercase tracking-widest text-orange-500 mb-1">Velocity</div>
                                <div className="text-4xl font-black italic">{(120 + Math.random() * 2).toFixed(1)} <span className="text-sm not-italic ml-1">KNOTS</span></div>
                            </div>
                            <div className="text-center">
                                <div className="text-[10px] font-black uppercase tracking-widest text-orange-500 mb-1">Altitude</div>
                                <div className="text-4xl font-black italic">{(1450 + Math.random() * 5).toFixed(0)} <span className="text-sm not-italic ml-1">FT</span></div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
