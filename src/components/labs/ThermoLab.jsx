import React, { useState, useEffect, useRef } from 'react';
import { Thermometer, Play, Pause, RotateCcw, Info, Flame, Snowflake } from 'lucide-react';

const ThermoLab = ({ onComplete }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  
  const [isRunning, setIsRunning] = useState(false);
  const [process, setProcess] = useState('isothermal'); // isothermal, isobaric, isochoric, adiabatic
  const [initialPressure, setInitialPressure] = useState(100); // kPa
  const [initialVolume, setInitialVolume] = useState(1); // L
  const [temperature, setTemperature] = useState(300); // K
  const [currentState, setCurrentState] = useState({ P: 100, V: 1, T: 300 });
  const [targetVolume, setTargetVolume] = useState(2);
  const [animationProgress, setAnimationProgress] = useState(0);
  const [showInfo, setShowInfo] = useState(false);
  const [completed, setCompleted] = useState(false);

  const R = 8.314; // J/(mol·K)
  const n = 0.04; // moles of gas

  // Calculate state based on process type
  const calculateState = (progress) => {
    const V1 = initialVolume;
    const V2 = targetVolume;
    const P1 = initialPressure;
    const T1 = temperature;
    const V = V1 + (V2 - V1) * progress;

    switch (process) {
      case 'isothermal':
        // PV = constant, T constant
        return { P: (P1 * V1) / V, V, T: T1 };
      
      case 'isobaric':
        // P constant, V/T = constant
        return { P: P1, V, T: (T1 * V) / V1 };
      
      case 'isochoric':
        // V constant, P/T = constant
        const newT = T1 + (targetVolume - 1) * 100 * progress;
        return { P: (P1 * newT) / T1, V: V1, T: newT };
      
      case 'adiabatic':
        // PV^γ = constant, γ = 1.4 for diatomic gas
        const gamma = 1.4;
        const newP = P1 * Math.pow(V1 / V, gamma);
        const newTemp = T1 * Math.pow(V1 / V, gamma - 1);
        return { P: newP, V, T: newTemp };
      
      default:
        return { P: P1, V, T: T1 };
    }
  };

  // Calculate work done
  const calculateWork = () => {
    const V1 = initialVolume;
    const V2 = process === 'isochoric' ? V1 : targetVolume;
    const P1 = initialPressure;

    switch (process) {
      case 'isothermal':
        return n * R * temperature * Math.log(V2 / V1) / 1000;
      case 'isobaric':
        return P1 * (V2 - V1);
      case 'isochoric':
        return 0;
      case 'adiabatic':
        const gamma = 1.4;
        const P2 = P1 * Math.pow(V1 / V2, gamma);
        return (P1 * V1 - P2 * V2) / (gamma - 1);
      default:
        return 0;
    }
  };

  // Draw PV diagram
  const drawDiagram = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const padding = 50;

    // Clear canvas
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, width, height);

    // Draw grid
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= 10; i++) {
      const x = padding + (i / 10) * (width - 2 * padding);
      const y = padding + (i / 10) * (height - 2 * padding);
      ctx.beginPath();
      ctx.moveTo(x, padding);
      ctx.lineTo(x, height - padding);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(width - padding, y);
      ctx.stroke();
    }

    // Draw axes
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, height - padding);
    ctx.lineTo(width - padding, height - padding);
    ctx.stroke();

    // Axis labels
    ctx.fillStyle = '#fff';
    ctx.font = '14px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Volume (L)', width / 2, height - 10);
    ctx.save();
    ctx.translate(15, height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('Pressure (kPa)', 0, 0);
    ctx.restore();

    // Scale factors
    const maxV = 3;
    const maxP = 200;
    const scaleX = (width - 2 * padding) / maxV;
    const scaleY = (height - 2 * padding) / maxP;

    // Draw process curve
    ctx.strokeStyle = getProcessColor();
    ctx.lineWidth = 3;
    ctx.beginPath();

    const steps = 100;
    for (let i = 0; i <= steps * animationProgress; i++) {
      const progress = i / steps;
      const state = calculateState(progress);
      const x = padding + state.V * scaleX;
      const y = height - padding - state.P * scaleY;
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();

    // Draw current state point
    const x = padding + currentState.V * scaleX;
    const y = height - padding - currentState.P * scaleY;
    
    ctx.beginPath();
    ctx.arc(x, y, 8, 0, Math.PI * 2);
    ctx.fillStyle = getProcessColor();
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw initial point
    const x0 = padding + initialVolume * scaleX;
    const y0 = height - padding - initialPressure * scaleY;
    ctx.beginPath();
    ctx.arc(x0, y0, 6, 0, Math.PI * 2);
    ctx.fillStyle = '#4ade80';
    ctx.fill();

    // Axis tick labels
    ctx.fillStyle = '#888';
    ctx.font = '12px Arial';
    for (let v = 0; v <= maxV; v++) {
      const xTick = padding + v * scaleX;
      ctx.fillText(v.toString(), xTick, height - padding + 20);
    }
    for (let p = 0; p <= maxP; p += 50) {
      const yTick = height - padding - p * scaleY;
      ctx.fillText(p.toString(), padding - 25, yTick + 4);
    }
  };

  const getProcessColor = () => {
    switch (process) {
      case 'isothermal': return '#3b82f6';
      case 'isobaric': return '#22c55e';
      case 'isochoric': return '#f59e0b';
      case 'adiabatic': return '#ef4444';
      default: return '#fff';
    }
  };

  const getProcessName = () => {
    switch (process) {
      case 'isothermal': return 'Isothermal (T = constant)';
      case 'isobaric': return 'Isobaric (P = constant)';
      case 'isochoric': return 'Isochoric (V = constant)';
      case 'adiabatic': return 'Adiabatic (Q = 0)';
      default: return '';
    }
  };


  // Animation loop
  useEffect(() => {
    if (isRunning && animationProgress < 1) {
      animationRef.current = requestAnimationFrame(() => {
        setAnimationProgress(prev => {
          const newProgress = Math.min(prev + 0.01, 1);
          setCurrentState(calculateState(newProgress));
          
          if (newProgress >= 1 && !completed) {
            setCompleted(true);
            if (onComplete) onComplete(75);
          }
          
          return newProgress;
        });
      });
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isRunning, animationProgress, completed]);

  // Draw on state change
  useEffect(() => {
    drawDiagram();
  }, [currentState, animationProgress, process]);

  // Reset when process changes
  useEffect(() => {
    handleReset();
  }, [process]);

  const handleReset = () => {
    setIsRunning(false);
    setAnimationProgress(0);
    setCurrentState({ P: initialPressure, V: initialVolume, T: temperature });
    setCompleted(false);
  };

  const work = calculateWork();

  return (
    <div className="bg-dark-200 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
            <Thermometer className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Thermodynamics Lab</h2>
            <p className="text-gray-400 text-sm">Explore PV diagrams and thermodynamic processes</p>
          </div>
        </div>
        <button
          onClick={() => setShowInfo(!showInfo)}
          className="p-2 bg-dark-300 rounded-lg hover:bg-dark-400 transition-colors"
        >
          <Info className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      {showInfo && (
        <div className="bg-dark-300 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-white mb-2">Thermodynamic Processes</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-blue-400 font-medium">Isothermal</p>
              <p className="text-gray-400">Temperature constant, PV = nRT</p>
            </div>
            <div>
              <p className="text-green-400 font-medium">Isobaric</p>
              <p className="text-gray-400">Pressure constant, W = PΔV</p>
            </div>
            <div>
              <p className="text-yellow-400 font-medium">Isochoric</p>
              <p className="text-gray-400">Volume constant, W = 0</p>
            </div>
            <div>
              <p className="text-red-400 font-medium">Adiabatic</p>
              <p className="text-gray-400">No heat transfer, PV^γ = const</p>
            </div>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        {/* PV Diagram */}
        <div className="bg-dark-300 rounded-xl p-4">
          <h3 className="text-white font-semibold mb-3">PV Diagram</h3>
          <canvas
            ref={canvasRef}
            width={400}
            height={300}
            className="w-full rounded-lg"
          />
          <div className="flex items-center gap-2 mt-3">
            <div className="w-3 h-3 rounded-full bg-green-400"></div>
            <span className="text-gray-400 text-sm">Initial State</span>
            <div className="w-3 h-3 rounded-full ml-4" style={{ backgroundColor: getProcessColor() }}></div>
            <span className="text-gray-400 text-sm">Current State</span>
          </div>
        </div>

        {/* Controls */}
        <div className="space-y-4">
          {/* Process Selection */}
          <div className="bg-dark-300 rounded-xl p-4">
            <h3 className="text-white font-semibold mb-3">Process Type</h3>
            <div className="grid grid-cols-2 gap-2">
              {['isothermal', 'isobaric', 'isochoric', 'adiabatic'].map((p) => (
                <button
                  key={p}
                  onClick={() => setProcess(p)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    process === p
                      ? 'bg-primary-500 text-white'
                      : 'bg-dark-400 text-gray-300 hover:bg-dark-500'
                  }`}
                >
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </button>
              ))}
            </div>
            <p className="text-gray-400 text-sm mt-2">{getProcessName()}</p>
          </div>

          {/* Parameters */}
          <div className="bg-dark-300 rounded-xl p-4">
            <h3 className="text-white font-semibold mb-3">Initial Conditions</h3>
            
            <div className="space-y-3">
              <div>
                <label className="text-gray-400 text-sm">Initial Pressure: {initialPressure} kPa</label>
                <input
                  type="range"
                  min="50"
                  max="150"
                  value={initialPressure}
                  onChange={(e) => {
                    setInitialPressure(Number(e.target.value));
                    handleReset();
                  }}
                  className="w-full accent-primary-500"
                  disabled={isRunning}
                />
              </div>

              <div>
                <label className="text-gray-400 text-sm">Initial Volume: {initialVolume} L</label>
                <input
                  type="range"
                  min="0.5"
                  max="1.5"
                  step="0.1"
                  value={initialVolume}
                  onChange={(e) => {
                    setInitialVolume(Number(e.target.value));
                    handleReset();
                  }}
                  className="w-full accent-primary-500"
                  disabled={isRunning}
                />
              </div>

              {process !== 'isochoric' && (
                <div>
                  <label className="text-gray-400 text-sm">Target Volume: {targetVolume} L</label>
                  <input
                    type="range"
                    min="1.5"
                    max="2.5"
                    step="0.1"
                    value={targetVolume}
                    onChange={(e) => {
                      setTargetVolume(Number(e.target.value));
                      handleReset();
                    }}
                    className="w-full accent-primary-500"
                    disabled={isRunning}
                  />
                </div>
              )}

              <div>
                <label className="text-gray-400 text-sm">Temperature: {temperature} K</label>
                <input
                  type="range"
                  min="200"
                  max="400"
                  value={temperature}
                  onChange={(e) => {
                    setTemperature(Number(e.target.value));
                    handleReset();
                  }}
                  className="w-full accent-primary-500"
                  disabled={isRunning}
                />
              </div>
            </div>
          </div>

          {/* Current State */}
          <div className="bg-dark-300 rounded-xl p-4">
            <h3 className="text-white font-semibold mb-3">Current State</h3>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-dark-400 rounded-lg p-3 text-center">
                <p className="text-gray-400 text-xs">Pressure</p>
                <p className="text-white font-bold">{currentState.P.toFixed(1)} kPa</p>
              </div>
              <div className="bg-dark-400 rounded-lg p-3 text-center">
                <p className="text-gray-400 text-xs">Volume</p>
                <p className="text-white font-bold">{currentState.V.toFixed(2)} L</p>
              </div>
              <div className="bg-dark-400 rounded-lg p-3 text-center">
                <p className="text-gray-400 text-xs">Temperature</p>
                <p className="text-white font-bold">{currentState.T.toFixed(0)} K</p>
              </div>
            </div>
            
            <div className="mt-3 bg-dark-400 rounded-lg p-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Work Done:</span>
                <span className={`font-bold ${work >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {(work * animationProgress).toFixed(2)} kJ
                </span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                {work > 0 ? (
                  <>
                    <Flame className="w-4 h-4 text-orange-400" />
                    <span className="text-gray-400 text-sm">System does work (expansion)</span>
                  </>
                ) : work < 0 ? (
                  <>
                    <Snowflake className="w-4 h-4 text-blue-400" />
                    <span className="text-gray-400 text-sm">Work done on system (compression)</span>
                  </>
                ) : (
                  <span className="text-gray-400 text-sm">No work (constant volume)</span>
                )}
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex gap-3">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className={`flex-1 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors ${
                isRunning
                  ? 'bg-yellow-500 hover:bg-yellow-600 text-black'
                  : 'bg-primary-500 hover:bg-primary-600 text-white'
              }`}
            >
              {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              {isRunning ? 'Pause' : 'Start Process'}
            </button>
            <button
              onClick={handleReset}
              className="px-4 py-3 bg-dark-300 hover:bg-dark-400 rounded-xl transition-colors"
            >
              <RotateCcw className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {completed && (
            <div className="bg-green-500/20 border border-green-500/50 rounded-xl p-4 text-center">
              <p className="text-green-400 font-semibold">Process Complete! +75 XP</p>
              <p className="text-gray-400 text-sm mt-1">
                Total work: {work.toFixed(2)} kJ
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ThermoLab;
