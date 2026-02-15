import { useState } from 'react';
import { Calculator } from 'lucide-react';

export default function OrbitalTransferCalculator() {
  const [r1, setR1] = useState(6571); // km (LEO: 200km altitude)
  const [r2, setR2] = useState(42164); // km (GEO)
  
  const GM = 398600; // km³/s² (Earth's gravitational parameter)
  
  // Circular orbit velocities
  const v1 = Math.sqrt(GM / r1);
  const v2 = Math.sqrt(GM / r2);
  
  // Hohmann transfer calculations
  const a_transfer = (r1 + r2) / 2; // Semi-major axis of transfer orbit
  
  // Velocities at periapsis and apoapsis of transfer orbit
  const v_transfer_peri = Math.sqrt(GM * (2/r1 - 1/a_transfer));
  const v_transfer_apo = Math.sqrt(GM * (2/r2 - 1/a_transfer));
  
  // Delta-v requirements
  const deltaV1 = Math.abs(v_transfer_peri - v1); // Burn at r1
  const deltaV2 = Math.abs(v2 - v_transfer_apo); // Burn at r2
  const totalDeltaV = deltaV1 + deltaV2;
  
  // Transfer time (half period of transfer orbit)
  const transferTime = Math.PI * Math.sqrt(Math.pow(a_transfer, 3) / GM);
  const transferTimeHours = transferTime / 3600;
  
  // Orbital periods
  const period1 = 2 * Math.PI * Math.sqrt(Math.pow(r1, 3) / GM) / 3600; // hours
  const period2 = 2 * Math.PI * Math.sqrt(Math.pow(r2, 3) / GM) / 3600; // hours

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 my-6 border-2 border-indigo-200 dark:border-indigo-700">
      <div className="flex items-center gap-3 mb-4">
        <Calculator className="w-6 h-6 text-indigo-600" />
        <h3 className="text-xl font-bold text-gray-800 dark:text-white">
          🛰️ Hohmann Transfer Calculator
        </h3>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-4">
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
          <strong>Hohmann Transfer:</strong> Most fuel-efficient way to move between circular orbits
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Δv<sub>total</sub> = Δv<sub>1</sub> + Δv<sub>2</sub>
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        {/* Initial Orbit Radius */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Initial Orbit Radius (r₁)
          </label>
          <input
            type="range"
            min="6471"
            max="50000"
            step="100"
            value={r1}
            onChange={(e) => setR1(Number(e.target.value))}
            className="w-full h-2 bg-indigo-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between items-center mt-2">
            <input
              type="number"
              value={r1}
              onChange={(e) => setR1(Number(e.target.value))}
              className="w-28 px-2 py-1 border rounded text-sm dark:bg-gray-700 dark:text-white"
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">km</span>
          </div>
          <div className="text-xs text-gray-500 mt-1">
            Altitude: {(r1 - 6371).toFixed(0)} km | Period: {period1.toFixed(1)} hrs
          </div>
        </div>

        {/* Final Orbit Radius */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Final Orbit Radius (r₂)
          </label>
          <input
            type="range"
            min={r1 + 100}
            max="100000"
            step="500"
            value={r2}
            onChange={(e) => setR2(Number(e.target.value))}
            className="w-full h-2 bg-indigo-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between items-center mt-2">
            <input
              type="number"
              value={r2}
              onChange={(e) => setR2(Math.max(r1 + 100, Number(e.target.value)))}
              className="w-28 px-2 py-1 border rounded text-sm dark:bg-gray-700 dark:text-white"
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">km</span>
          </div>
          <div className="text-xs text-gray-500 mt-1">
            Altitude: {(r2 - 6371).toFixed(0)} km | Period: {period2.toFixed(1)} hrs
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="grid md:grid-cols-4 gap-4 mb-4">
        <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg p-4 text-white">
          <div className="text-xs opacity-90 mb-1">First Burn (Δv₁)</div>
          <div className="text-2xl font-bold">{deltaV1.toFixed(2)}</div>
          <div className="text-xs opacity-90">km/s</div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg p-4 text-white">
          <div className="text-xs opacity-90 mb-1">Second Burn (Δv₂)</div>
          <div className="text-2xl font-bold">{deltaV2.toFixed(2)}</div>
          <div className="text-xs opacity-90">km/s</div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-lg p-4 text-white">
          <div className="text-xs opacity-90 mb-1">Total Δv</div>
          <div className="text-2xl font-bold">{totalDeltaV.toFixed(2)}</div>
          <div className="text-xs opacity-90">km/s</div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg p-4 text-white">
          <div className="text-xs opacity-90 mb-1">Transfer Time</div>
          <div className="text-2xl font-bold">{transferTimeHours.toFixed(1)}</div>
          <div className="text-xs opacity-90">hours</div>
        </div>
      </div>

      {/* Visual Representation */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-4">
        <div className="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">Transfer Orbit:</div>
        <svg viewBox="0 0 400 300" className="w-full">
          {/* Earth */}
          <circle cx="200" cy="150" r="20" fill="#4299e1" stroke="#2c5282" strokeWidth="2"/>
          <text x="200" y="155" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">🌍</text>
          
          {/* Initial orbit */}
          <circle cx="200" cy="150" r={r1/400} fill="none" stroke="#48bb78" strokeWidth="2" strokeDasharray="5,5"/>
          <text x="200" y={150 - r1/400 - 10} textAnchor="middle" fontSize="11" fill="#48bb78">r₁</text>
          
          {/* Final orbit */}
          <circle cx="200" cy="150" r={Math.min(r2/400, 140)} fill="none" stroke="#ed8936" strokeWidth="2" strokeDasharray="5,5"/>
          <text x="200" y={150 - Math.min(r2/400, 140) - 10} textAnchor="middle" fontSize="11" fill="#ed8936">r₂</text>
          
          {/* Transfer orbit (ellipse) */}
          <ellipse cx="200" cy="150" rx={Math.min((r1/400 + r2/400)/2, 100)} ry={Math.min((r1/400 + r2/400)/2 * 0.7, 70)} 
                   fill="none" stroke="#9f7aea" strokeWidth="3"/>
          
          {/* Burn points */}
          <circle cx={200 - r1/400} cy="150" r="5" fill="#f56565"/>
          <text x={200 - r1/400 - 20} y="155" fontSize="10" fill="#f56565" fontWeight="bold">Δv₁</text>
          
          <circle cx={200 + Math.min(r2/400, 140)} cy="150" r="5" fill="#f56565"/>
          <text x={200 + Math.min(r2/400, 140) + 15} y="155" fontSize="10" fill="#f56565" fontWeight="bold">Δv₂</text>
        </svg>
      </div>

      {/* Interpretation */}
      <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          <strong>💡 Interpretation:</strong> To transfer from <strong>{(r1-6371).toFixed(0)} km</strong> altitude 
          to <strong>{(r2-6371).toFixed(0)} km</strong> altitude requires <strong>{totalDeltaV.toFixed(2)} km/s</strong> total Δv 
          and takes <strong>{transferTimeHours.toFixed(1)} hours</strong>.
        </p>
        <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
          <strong>Efficiency:</strong> Hohmann transfer is the most fuel-efficient but takes longer than direct transfers.
        </p>
      </div>

      {/* Common Transfer Presets */}
      <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-2">
        <button
          onClick={() => { setR1(6571); setR2(6771); }}
          className="px-3 py-2 bg-blue-100 dark:bg-blue-900 rounded text-xs hover:bg-blue-200 dark:hover:bg-blue-800"
        >
          LEO to LEO+200km
        </button>
        <button
          onClick={() => { setR1(6571); setR2(42164); }}
          className="px-3 py-2 bg-green-100 dark:bg-green-900 rounded text-xs hover:bg-green-200 dark:hover:bg-green-800"
        >
          LEO to GEO
        </button>
        <button
          onClick={() => { setR1(6571); setR2(384400); }}
          className="px-3 py-2 bg-purple-100 dark:bg-purple-900 rounded text-xs hover:bg-purple-200 dark:hover:bg-purple-800"
        >
          Earth to Moon
        </button>
      </div>
    </div>
  );
}
