import { useState, useEffect, useRef } from 'react';
import { Droplets, RotateCcw } from 'lucide-react';

export default function FluidLab() {
  const [pipeDiameter, setPipeDiameter] = useState(50); // mm
  const [pressure, setPressure] = useState(100); // kPa
  const [fluidDensity, setFluidDensity] = useState(1000); // kg/m³ (water)
  const canvasRef = useRef(null);

  // Calculate flow using simplified Bernoulli
  const area = Math.PI * Math.pow(pipeDiameter / 2000, 2); // m²
  const velocity = Math.sqrt((2 * pressure * 1000) / fluidDensity); // m/s
  const flowRate = area * velocity * 1000; // L/s
  const reynoldsNumber = (fluidDensity * velocity * (pipeDiameter / 1000)) / 0.001; // Assuming water viscosity

  // Animate particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const particles = [];
    const particleCount = 30;

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: 100 + Math.random() * (pipeDiameter * 1.5),
        speed: velocity * 5 + Math.random() * 2
      });
    }

    let animationId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw pipe
      const pipeY = 100;
      const pipeHeight = pipeDiameter * 1.5;
      
      // Pipe walls
      ctx.fillStyle = '#374151';
      ctx.fillRect(0, pipeY - 10, canvas.width, 10);
      ctx.fillRect(0, pipeY + pipeHeight, canvas.width, 10);
      
      // Pipe interior
      ctx.fillStyle = '#1e3a5f';
      ctx.fillRect(0, pipeY, canvas.width, pipeHeight);
      
      // Flow particles
      ctx.fillStyle = '#60a5fa';
      particles.forEach(p => {
        p.x += p.speed;
        if (p.x > canvas.width) {
          p.x = 0;
          p.y = pipeY + Math.random() * pipeHeight;
        }
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
        ctx.fill();
      });
      
      // Velocity arrows
      ctx.strokeStyle = '#22c55e';
      ctx.lineWidth = 2;
      for (let i = 50; i < canvas.width; i += 80) {
        const arrowLen = Math.min(40, velocity * 8);
        ctx.beginPath();
        ctx.moveTo(i, pipeY + pipeHeight / 2);
        ctx.lineTo(i + arrowLen, pipeY + pipeHeight / 2);
        ctx.stroke();
        // Arrow head
        ctx.beginPath();
        ctx.moveTo(i + arrowLen, pipeY + pipeHeight / 2);
        ctx.lineTo(i + arrowLen - 8, pipeY + pipeHeight / 2 - 5);
        ctx.lineTo(i + arrowLen - 8, pipeY + pipeHeight / 2 + 5);
        ctx.closePath();
        ctx.fillStyle = '#22c55e';
        ctx.fill();
      }
      
      animationId = requestAnimationFrame(animate);
    };
    
    animate();
    return () => cancelAnimationFrame(animationId);
  }, [pipeDiameter, velocity]);

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Controls */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Droplets className="w-5 h-5 text-blue-400" />
          Fluid Controls
        </h3>

        {/* Pipe Diameter */}
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <label className="text-gray-400">Pipe Diameter</label>
            <span className="text-blue-400 font-mono">{pipeDiameter} mm</span>
          </div>
          <input
            type="range"
            min="20"
            max="100"
            value={pipeDiameter}
            onChange={(e) => setPipeDiameter(Number(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
        </div>

        {/* Pressure */}
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <label className="text-gray-400">Inlet Pressure</label>
            <span className="text-green-400 font-mono">{pressure} kPa</span>
          </div>
          <input
            type="range"
            min="10"
            max="500"
            step="10"
            value={pressure}
            onChange={(e) => setPressure(Number(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500"
          />
        </div>

        {/* Fluid Type */}
        <div className="mb-6">
          <label className="text-gray-400 block mb-2">Fluid Type</label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { name: 'Water', density: 1000 },
              { name: 'Oil', density: 900 },
              { name: 'Mercury', density: 13600 }
            ].map(fluid => (
              <button
                key={fluid.name}
                onClick={() => setFluidDensity(fluid.density)}
                className={`py-2 px-3 rounded-lg text-sm transition-all ${
                  fluidDensity === fluid.density
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                {fluid.name}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="bg-gray-900/50 rounded-lg p-4 space-y-3">
          <h4 className="font-semibold text-white mb-3">Calculations</h4>
          <div className="flex justify-between">
            <span className="text-gray-400">Flow Velocity</span>
            <span className="font-mono text-cyan-400">{velocity.toFixed(2)} m/s</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Flow Rate</span>
            <span className="font-mono text-green-400">{flowRate.toFixed(3)} L/s</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Reynolds Number</span>
            <span className={`font-mono ${reynoldsNumber > 4000 ? 'text-red-400' : reynoldsNumber > 2300 ? 'text-yellow-400' : 'text-green-400'}`}>
              {reynoldsNumber.toFixed(0)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Flow Type</span>
            <span className={`font-mono ${reynoldsNumber > 4000 ? 'text-red-400' : reynoldsNumber > 2300 ? 'text-yellow-400' : 'text-green-400'}`}>
              {reynoldsNumber > 4000 ? 'Turbulent' : reynoldsNumber > 2300 ? 'Transitional' : 'Laminar'}
            </span>
          </div>
        </div>

        {/* Formula */}
        <div className="mt-4 p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
          <p className="text-xs text-cyan-300 font-mono">
            v = √(2P/ρ) = √(2×{pressure}000/{fluidDensity}) = {velocity.toFixed(2)} m/s
          </p>
          <p className="text-xs text-cyan-300 font-mono mt-1">
            Q = A×v = {(area*1000000).toFixed(2)}mm² × {velocity.toFixed(2)} = {flowRate.toFixed(3)} L/s
          </p>
        </div>
      </div>

      {/* Visualization */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
        <h3 className="text-xl font-bold mb-6">Pipe Flow Visualization</h3>
        
        <canvas 
          ref={canvasRef} 
          width={500} 
          height={300}
          className="w-full h-64 md:h-72 bg-gray-900 rounded-lg"
        />

        {/* Legend */}
        <div className="mt-4 flex flex-wrap gap-4 justify-center text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-400 rounded-full" />
            <span className="text-gray-400">Fluid particles</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-0.5 bg-green-500" />
            <span className="text-gray-400">Velocity vectors</span>
          </div>
        </div>

        {/* Flow rate bar */}
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-400">Flow Rate</span>
            <span className="text-blue-400">{flowRate.toFixed(2)} L/s</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded-full transition-all"
              style={{ width: `${Math.min(100, flowRate * 10)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
