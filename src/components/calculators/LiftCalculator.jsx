import { useState } from 'react';
import { Calculator, Plane } from 'lucide-react';

export default function LiftCalculator() {
  const [velocity, setVelocity] = useState(70); // m/s
  const [wingArea, setWingArea] = useState(50); // m²
  const [liftCoefficient, setLiftCoefficient] = useState(1.2);
  const [altitude, setAltitude] = useState(0); // meters
  
  // Air density at altitude (simplified)
  const getAirDensity = (alt) => {
    const seaLevelDensity = 1.225; // kg/m³
    return seaLevelDensity * Math.exp(-alt / 8500);
  };
  
  const airDensity = getAirDensity(altitude);
  
  // Lift equation: L = 0.5 × ρ × v² × S × CL
  const lift = 0.5 * airDensity * velocity * velocity * wingArea * liftCoefficient;
  
  // Typical aircraft weight (for comparison)
  const typicalWeight = 40000; // N (about 4,000 kg aircraft)
  const weightRatio = (lift / typicalWeight * 100);
  
  const canFly = lift >= typicalWeight;

  return (
    <div className="bg-gradient-to-br from-sky-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 my-6 border-2 border-sky-200 dark:border-sky-700">
      <div className="flex items-center gap-3 mb-4">
        <Calculator className="w-6 h-6 text-sky-600" />
        <h3 className="text-xl font-bold text-gray-800 dark:text-white">
          ✈️ Lift Force Calculator
        </h3>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-4">
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
          <strong>Lift Equation:</strong> L = ½ρv²SC<sub>L</sub>
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          ρ = air density, v = velocity, S = wing area, C<sub>L</sub> = lift coefficient
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        {/* Velocity */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Velocity (v)
          </label>
          <input
            type="range"
            min="20"
            max="150"
            step="5"
            value={velocity}
            onChange={(e) => setVelocity(Number(e.target.value))}
            className="w-full h-2 bg-sky-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between items-center mt-2">
            <input
              type="number"
              value={velocity}
              onChange={(e) => setVelocity(Number(e.target.value))}
              className="w-24 px-2 py-1 border rounded text-sm dark:bg-gray-700 dark:text-white"
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">m/s ({(velocity * 3.6).toFixed(0)} km/h)</span>
          </div>
        </div>

        {/* Wing Area */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Wing Area (S)
          </label>
          <input
            type="range"
            min="10"
            max="200"
            step="5"
            value={wingArea}
            onChange={(e) => setWingArea(Number(e.target.value))}
            className="w-full h-2 bg-sky-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between items-center mt-2">
            <input
              type="number"
              value={wingArea}
              onChange={(e) => setWingArea(Number(e.target.value))}
              className="w-24 px-2 py-1 border rounded text-sm dark:bg-gray-700 dark:text-white"
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">m²</span>
          </div>
        </div>

        {/* Lift Coefficient */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Lift Coefficient (C<sub>L</sub>)
          </label>
          <input
            type="range"
            min="0.2"
            max="2.0"
            step="0.1"
            value={liftCoefficient}
            onChange={(e) => setLiftCoefficient(Number(e.target.value))}
            className="w-full h-2 bg-sky-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between items-center mt-2">
            <input
              type="number"
              step="0.1"
              value={liftCoefficient}
              onChange={(e) => setLiftCoefficient(Number(e.target.value))}
              className="w-24 px-2 py-1 border rounded text-sm dark:bg-gray-700 dark:text-white"
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">C<sub>L</sub></span>
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {liftCoefficient < 0.5 && "Cruise flight"}
            {liftCoefficient >= 0.5 && liftCoefficient < 1.0 && "Normal flight"}
            {liftCoefficient >= 1.0 && liftCoefficient < 1.5 && "High angle of attack"}
            {liftCoefficient >= 1.5 && "Near stall!"}
          </div>
        </div>

        {/* Altitude */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Altitude
          </label>
          <input
            type="range"
            min="0"
            max="12000"
            step="500"
            value={altitude}
            onChange={(e) => setAltitude(Number(e.target.value))}
            className="w-full h-2 bg-sky-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between items-center mt-2">
            <input
              type="number"
              value={altitude}
              onChange={(e) => setAltitude(Number(e.target.value))}
              className="w-24 px-2 py-1 border rounded text-sm dark:bg-gray-700 dark:text-white"
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">meters</span>
          </div>
          <div className="text-xs text-gray-500 mt-1">
            ρ = {airDensity.toFixed(3)} kg/m³
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="grid md:grid-cols-3 gap-4 mb-4">
        <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg p-4 text-white">
          <div className="text-sm opacity-90 mb-1">Lift Force</div>
          <div className="text-3xl font-bold">{(lift / 1000).toFixed(1)}</div>
          <div className="text-sm opacity-90">kN</div>
          <div className="text-xs opacity-75 mt-1">({lift.toFixed(0)} N)</div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg p-4 text-white">
          <div className="text-sm opacity-90 mb-1">Weight Support</div>
          <div className="text-3xl font-bold">{weightRatio.toFixed(0)}%</div>
          <div className="text-sm opacity-90">of 40 kN</div>
        </div>

        <div className={`bg-gradient-to-br ${canFly ? 'from-green-500 to-emerald-500' : 'from-red-500 to-orange-500'} rounded-lg p-4 text-white`}>
          <div className="text-sm opacity-90 mb-1">Flight Status</div>
          <div className="text-3xl font-bold">{canFly ? '✈️' : '⬇️'}</div>
          <div className="text-sm opacity-90">{canFly ? 'Can Fly!' : 'Too Heavy'}</div>
        </div>
      </div>

      {/* Visual Representation */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-center gap-8">
          <div className="text-center">
            <Plane className="w-16 h-16 text-sky-500 mx-auto" />
            <div className="text-xs text-gray-600 dark:text-gray-400 mt-2">Aircraft</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-blue-500 text-2xl">↑</div>
            <div className="text-sm font-bold text-blue-500">{(lift/1000).toFixed(1)} kN</div>
            <div className="text-xs text-gray-500">Lift</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-red-500 text-2xl">↓</div>
            <div className="text-sm font-bold text-red-500">40 kN</div>
            <div className="text-xs text-gray-500">Weight</div>
          </div>
        </div>
      </div>

      {/* Interpretation */}
      <div className="p-4 bg-sky-50 dark:bg-sky-900/20 rounded-lg">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          <strong>💡 Interpretation:</strong> At <strong>{velocity} m/s</strong> with <strong>{wingArea} m²</strong> wing area 
          and C<sub>L</sub> = <strong>{liftCoefficient}</strong>, the aircraft generates <strong>{(lift/1000).toFixed(1)} kN</strong> of lift.
          {canFly && " ✅ Sufficient lift to fly!"}
          {!canFly && " ❌ Need more speed, larger wings, or higher angle of attack!"}
        </p>
        <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
          <strong>Key insight:</strong> Lift increases with v² - doubling speed quadruples lift!
        </p>
      </div>

      {/* Common Aircraft Presets */}
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2">
        <button
          onClick={() => { setVelocity(70); setWingArea(50); setLiftCoefficient(1.2); setAltitude(0); }}
          className="px-3 py-2 bg-blue-100 dark:bg-blue-900 rounded text-xs hover:bg-blue-200 dark:hover:bg-blue-800"
        >
          Small Aircraft
        </button>
        <button
          onClick={() => { setVelocity(250); setWingArea(120); setLiftCoefficient(0.5); setAltitude(10000); }}
          className="px-3 py-2 bg-green-100 dark:bg-green-900 rounded text-xs hover:bg-green-200 dark:hover:bg-green-800"
        >
          Airliner Cruise
        </button>
        <button
          onClick={() => { setVelocity(80); setWingArea(120); setLiftCoefficient(1.8); setAltitude(0); }}
          className="px-3 py-2 bg-yellow-100 dark:bg-yellow-900 rounded text-xs hover:bg-yellow-200 dark:hover:bg-yellow-800"
        >
          Landing Config
        </button>
        <button
          onClick={() => { setVelocity(300); setWingArea(80); setLiftCoefficient(0.3); setAltitude(12000); }}
          className="px-3 py-2 bg-purple-100 dark:bg-purple-900 rounded text-xs hover:bg-purple-200 dark:hover:bg-purple-800"
        >
          Fighter Jet
        </button>
      </div>
    </div>
  );
}
