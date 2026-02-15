import { useState } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

export default function ForceBalanceDemo() {
  const [thrust, setThrust] = useState(15000); // Newtons
  const [mass, setMass] = useState(1000); // kg
  
  const weight = mass * 9.8; // Weight in Newtons
  const netForce = thrust - weight;
  const acceleration = netForce / mass;
  
  const rocketY = Math.max(0, Math.min(80, 40 - (netForce / 200)));
  
  const getStatus = () => {
    if (netForce > 100) return { text: '🚀 LIFTOFF!', color: 'text-green-400' };
    if (netForce > -100) return { text: '⚖️ Balanced', color: 'text-yellow-400' };
    return { text: '⬇️ Too Heavy', color: 'text-red-400' };
  };
  
  const status = getStatus();
  
  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border-2 border-blue-500/30">
      <h3 className="text-2xl font-bold mb-4 text-center">🚀 Force Balance Demo</h3>
      <p className="text-sm text-gray-300 mb-6 text-center">
        Adjust thrust and mass to achieve liftoff! Net force must overcome weight.
      </p>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Visualization */}
        <div className="bg-black/30 rounded-lg p-4 h-96 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 to-transparent" />
          
          {/* Ground */}
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-green-600" />
          
          {/* Rocket */}
          <div 
            className="absolute left-1/2 -translate-x-1/2 transition-all duration-300"
            style={{ bottom: `${rocketY}px` }}
          >
            <div className="text-6xl">🚀</div>
            
            {/* Thrust Arrow */}
            {thrust > 0 && (
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center">
                <div className="text-orange-400 font-bold text-sm">{thrust}N</div>
                <ArrowDown className="w-8 h-8 text-orange-400 animate-pulse" />
                <div className="w-2 h-8 bg-gradient-to-b from-orange-500 to-transparent" />
              </div>
            )}
            
            {/* Weight Arrow */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex flex-col items-center">
              <div className="w-2 h-8 bg-gradient-to-t from-red-500 to-transparent" />
              <ArrowUp className="w-8 h-8 text-red-400" />
              <div className="text-red-400 font-bold text-sm">{weight.toFixed(0)}N</div>
            </div>
          </div>
          
          {/* Status */}
          <div className={`absolute top-4 left-1/2 -translate-x-1/2 text-2xl font-bold ${status.color}`}>
            {status.text}
          </div>
        </div>
        
        {/* Controls */}
        <div className="space-y-6">
          {/* Thrust Control */}
          <div>
            <label className="block text-sm font-bold mb-2">
              🔥 Thrust Force: {thrust.toLocaleString()} N
            </label>
            <input
              type="range"
              min="0"
              max="30000"
              step="500"
              value={thrust}
              onChange={(e) => setThrust(Number(e.target.value))}
              className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>0 N</span>
              <span>30,000 N</span>
            </div>
          </div>
          
          {/* Mass Control */}
          <div>
            <label className="block text-sm font-bold mb-2">
              ⚖️ Rocket Mass: {mass.toLocaleString()} kg
            </label>
            <input
              type="range"
              min="500"
              max="3000"
              step="100"
              value={mass}
              onChange={(e) => setMass(Number(e.target.value))}
              className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>500 kg</span>
              <span>3,000 kg</span>
            </div>
          </div>
          
          {/* Calculations */}
          <div className="bg-blue-900/30 rounded-lg p-4 space-y-2">
            <h4 className="font-bold text-lg mb-3">📊 Calculations</h4>
            <div className="flex justify-between">
              <span>Weight (mg):</span>
              <span className="font-mono">{weight.toFixed(0)} N</span>
            </div>
            <div className="flex justify-between">
              <span>Thrust:</span>
              <span className="font-mono">{thrust.toFixed(0)} N</span>
            </div>
            <div className="border-t border-blue-500/30 my-2" />
            <div className="flex justify-between font-bold">
              <span>Net Force:</span>
              <span className={`font-mono ${netForce > 0 ? 'text-green-400' : 'text-red-400'}`}>
                {netForce.toFixed(0)} N
              </span>
            </div>
            <div className="flex justify-between">
              <span>Acceleration:</span>
              <span className="font-mono">{acceleration.toFixed(2)} m/s²</span>
            </div>
          </div>
          
          {/* Formula */}
          <div className="bg-purple-900/30 rounded-lg p-4">
            <h4 className="font-bold mb-2">📐 Newton's 2nd Law</h4>
            <div className="font-mono text-center text-lg">
              F<sub>net</sub> = ma
            </div>
            <div className="text-sm text-gray-300 mt-2">
              Net Force = Mass × Acceleration
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
