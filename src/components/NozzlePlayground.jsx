import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Zap, X, Maximize2 } from 'lucide-react';

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

const NozzlePlayground = ({ onParamsChange }) => {
  const [expansionRatio, setExpansionRatio] = useState(10);
  const [ambientPressure, setAmbientPressure] = useState(101325);
  const [throttle, setThrottle] = useState(1.0);
  const [isExpanded, setIsExpanded] = useState(false);
  const canvasRef = useRef(null);

  const nominalMassFlow = 250;
  const Ae = 0.5;
  const pe = 101325 / Math.max(1, 1 / expansionRatio);

  const massFlow = nominalMassFlow * throttle;
  const isp = useMemo(() => computeIsp(expansionRatio, ambientPressure), [expansionRatio, ambientPressure]);
  const thrust = useMemo(() => computeThrust(massFlow, isp, pe, ambientPressure, Ae), [massFlow, isp, pe, ambientPressure]);

  // Notify parent of parameter changes
  useEffect(() => {
    if (onParamsChange) {
      onParamsChange({ expansionRatio, ambientPressure, throttle });
    }
  }, [expansionRatio, ambientPressure, throttle, onParamsChange]);

  // Animated exhaust effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const particles = [];
    let animationId;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        const nozzleExitX = canvas.offsetWidth * 0.45;
        const nozzleExitY = canvas.offsetHeight * 0.5;
        const exitRadius = Math.min(canvas.offsetWidth, canvas.offsetHeight) * 0.08 * Math.sqrt(expansionRatio / 10);
        
        this.x = nozzleExitX;
        this.y = nozzleExitY + (Math.random() - 0.5) * exitRadius;
        this.vx = (2 + Math.random() * 3) * throttle * (1 + expansionRatio / 40);
        this.vy = (Math.random() - 0.5) * 0.5 * (1 + expansionRatio / 20);
        this.life = 1.0;
        this.decay = 0.008 + Math.random() * 0.012;
        this.size = (2 + Math.random() * 4) * throttle;
        this.hue = 180 + Math.random() * 40;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += (Math.random() - 0.5) * 0.1;
        this.life -= this.decay;
        
        if (this.life <= 0 || this.x > canvas.offsetWidth) {
          this.reset();
        }
      }

      draw(ctx) {
        const alpha = this.life * throttle;
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
        gradient.addColorStop(0, `hsla(${this.hue}, 100%, 70%, ${alpha})`);
        gradient.addColorStop(0.5, `hsla(${this.hue}, 100%, 50%, ${alpha * 0.5})`);
        gradient.addColorStop(1, `hsla(${this.hue}, 100%, 30%, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Initialize particles
    const particleCount = Math.floor(30 * throttle);
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

      // Draw nozzle
      const nozzleStartX = canvas.offsetWidth * 0.15;
      const nozzleEndX = canvas.offsetWidth * 0.45;
      const centerY = canvas.offsetHeight * 0.5;
      const throatRadius = Math.min(canvas.offsetWidth, canvas.offsetHeight) * 0.04;
      const exitRadius = throatRadius * Math.sqrt(expansionRatio / 10);

      // Nozzle gradient
      const nozzleGradient = ctx.createLinearGradient(nozzleStartX, 0, nozzleEndX, 0);
      nozzleGradient.addColorStop(0, '#4a5568');
      nozzleGradient.addColorStop(0.5, '#2d3748');
      nozzleGradient.addColorStop(1, '#1a202c');

      ctx.fillStyle = nozzleGradient;
      ctx.strokeStyle = '#718096';
      ctx.lineWidth = 2;

      // Draw nozzle shape
      ctx.beginPath();
      ctx.moveTo(nozzleStartX, centerY - throatRadius * 1.5);
      ctx.lineTo(nozzleStartX + (nozzleEndX - nozzleStartX) * 0.3, centerY - throatRadius);
      ctx.quadraticCurveTo(
        nozzleStartX + (nozzleEndX - nozzleStartX) * 0.5, centerY - throatRadius * 0.8,
        nozzleEndX, centerY - exitRadius
      );
      ctx.lineTo(nozzleEndX, centerY + exitRadius);
      ctx.quadraticCurveTo(
        nozzleStartX + (nozzleEndX - nozzleStartX) * 0.5, centerY + throatRadius * 0.8,
        nozzleStartX + (nozzleEndX - nozzleStartX) * 0.3, centerY + throatRadius
      );
      ctx.lineTo(nozzleStartX, centerY + throatRadius * 1.5);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Draw throat indicator
      const throatX = nozzleStartX + (nozzleEndX - nozzleStartX) * 0.35;
      ctx.strokeStyle = '#f56565';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(throatX, centerY - throatRadius);
      ctx.lineTo(throatX, centerY + throatRadius);
      ctx.stroke();

      // Update and draw particles
      const currentParticleCount = Math.floor(30 * throttle);
      while (particles.length < currentParticleCount) {
        particles.push(new Particle());
      }
      while (particles.length > currentParticleCount) {
        particles.pop();
      }

      particles.forEach(particle => {
        particle.update();
        particle.draw(ctx);
      });

      // Draw exhaust glow
      if (throttle > 0.1) {
        const glowGradient = ctx.createRadialGradient(
          nozzleEndX, centerY, 0,
          nozzleEndX + 50, centerY, 100 * throttle
        );
        glowGradient.addColorStop(0, `rgba(100, 200, 255, ${0.3 * throttle})`);
        glowGradient.addColorStop(1, 'rgba(100, 200, 255, 0)');
        ctx.fillStyle = glowGradient;
        ctx.fillRect(nozzleEndX, centerY - 100, 150, 200);
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [expansionRatio, throttle]);

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

      {/* Visual Nozzle Display */}
      <div className="mb-4 bg-black/40 rounded-lg border border-gray-700 overflow-hidden">
        <canvas
          ref={canvasRef}
          className="w-full"
          style={{ height: '200px' }}
        />
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
};

export default NozzlePlayground;
