import { useState } from 'react';
import { Calculator } from 'lucide-react';

export default function RocketEquationCalculator() {
  const [exhaustVelocity, setExhaustVelocity] = useState(3000);
  const [initialMass, setInitialMass] = useState(1000);
  const [finalMass, setFinalMass] = useState(200);
  
  const massRatio = initialMass / finalMass;
  const deltaV = exhaustVelocity * Math.log(massRatio);
  const fuelFraction = ((initialMass - finalMass) / initialMass * 100);

  return (
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 my-6 border-2 border-purple-200 dark:border-purple-700">
      <div className="flex items-center gap-3 mb-4">
        <Calculator className="w-6 h-6 text-purple-600" />
        <h3 className="text-xl font-bold text-gray-800 dark:text-white">
          🚀 Rocket Equation Calculator
        </h3>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-4">
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
          <strong>Tsiolkovsky Rocket Equation:</strong> Δv = v<sub>e</sub> × ln(m<sub>0</sub>/m<sub>f</sub>)
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        {/* Exhaust Velocity */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Exhaust Velocity (v<sub>e</sub>)
          </label>
          <input
            type="range"
            min="2000"
            max="4500"
            step="100"
            value={exhaustVelocity}
            onChange={(e) => setExhaustVelocity(Number(e.target.value))}
            className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between items-center mt-2">
            <input
              type="number"
              value={exhaustVelocity}
              onChange={(e) => setExhaustVelocity(Number(e.target.value))}
              className="w-24 px-2 py-1 border rounded text-sm dark:bg-gray-700 dark:text-white"
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">m/s</span>
          </div>
        </div>

        {/* Initial Mass */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Initial Mass (m<sub>0</sub>)
          </label>
          <input
            type="range"
            min="100"
            max="10000"
            step="100"
            value={initialMass}
            onChange={(e) => setInitialMass(Number(e.target.value))}
            className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between items-center mt-2">
            <input
              type="number"
              value={initialMass}
              onChange={(e) => setInitialMass(Number(e.target.value))}
              className="w-24 px-2 py-1 border rounded text-sm dark:bg-gray-700 dark:text-white"
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">kg</span>
          </div>
        </div>

        {/* Final Mass */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Final Mass (m<sub>f</sub>)
          </label>
          <input
            type="range"
            min="10"
            max={initialMass}
            step="10"
            value={finalMass}
            onChange={(e) => setFinalMass(Number(e.target.value))}
            className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between items-center mt-2">
            <input
              type="number"
              value={finalMass}
              onChange={(e) => setFinalMass(Math.min(Number(e.target.value), initialMass))}
              className="w-24 px-2 py-1 border rounded text-sm dark:bg-gray-700 dark:text-white"
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">kg</span>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg p-4 text-white">
          <div className="text-sm opacity-90 mb-1">Delta-V (Δv)</div>
          <div className="text-3xl font-bold">{deltaV.toFixed(0)}</div>
          <div className="text-sm opacity-90">m/s</div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg p-4 text-white">
          <div className="text-sm opacity-90 mb-1">Mass Ratio (R)</div>
          <div className="text-3xl font-bold">{massRatio.toFixed(2)}</div>
          <div className="text-sm opacity-90">m₀/m_f</div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-lg p-4 text-white">
          <div className="text-sm opacity-90 mb-1">Fuel Fraction</div>
          <div className="text-3xl font-bold">{fuelFraction.toFixed(1)}%</div>
          <div className="text-sm opacity-90">of total mass</div>
        </div>
      </div>

      {/* Interpretation */}
      <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          <strong>💡 Interpretation:</strong> This rocket can achieve <strong>{deltaV.toFixed(0)} m/s</strong> of delta-v 
          with a mass ratio of <strong>{massRatio.toFixed(2)}</strong>, meaning <strong>{fuelFraction.toFixed(1)}%</strong> of 
          the rocket is fuel. 
          {deltaV >= 9400 && " ✅ Enough to reach orbit!"}
          {deltaV < 9400 && deltaV >= 7000 && " ⚠️ Close to orbital velocity."}
          {deltaV < 7000 && " ❌ Not enough for orbit (need ~9,400 m/s)."}
        </p>
      </div>
    </div>
  );
}
