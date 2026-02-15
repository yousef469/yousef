import { useState } from 'react';
import { Calculator, Zap } from 'lucide-react';

export default function OhmsLawCalculator() {
  const [voltage, setVoltage] = useState(12);
  const [resistance, setResistance] = useState(100);
  
  const current = voltage / resistance; // Ohm's Law: I = V/R
  const power = voltage * current; // Power: P = V×I
  const currentMa = current * 1000; // Convert to mA

  const getSafetyLevel = (currentMa) => {
    if (currentMa < 1) return { level: "Safe", color: "green", icon: "✅" };
    if (currentMa < 10) return { level: "Tingling", color: "yellow", icon: "⚠️" };
    if (currentMa < 30) return { level: "Painful", color: "orange", icon: "⚠️" };
    if (currentMa < 100) return { level: "Dangerous", color: "red", icon: "🚨" };
    return { level: "Lethal", color: "red", icon: "☠️" };
  };

  const safety = getSafetyLevel(currentMa);

  return (
    <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 my-6 border-2 border-yellow-200 dark:border-yellow-700">
      <div className="flex items-center gap-3 mb-4">
        <Calculator className="w-6 h-6 text-yellow-600" />
        <h3 className="text-xl font-bold text-gray-800 dark:text-white">
          ⚡ Ohm's Law Calculator
        </h3>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-4">
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
          <strong>Ohm's Law:</strong> V = I×R  |  <strong>Power:</strong> P = V×I = I²×R = V²/R
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        {/* Voltage */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Voltage (V)
          </label>
          <input
            type="range"
            min="1"
            max="240"
            step="1"
            value={voltage}
            onChange={(e) => setVoltage(Number(e.target.value))}
            className="w-full h-2 bg-yellow-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between items-center mt-2">
            <input
              type="number"
              value={voltage}
              onChange={(e) => setVoltage(Number(e.target.value))}
              className="w-24 px-2 py-1 border rounded text-sm dark:bg-gray-700 dark:text-white"
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">Volts</span>
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {voltage <= 12 && "🔋 Battery voltage"}
            {voltage > 12 && voltage <= 48 && "🚗 Automotive/Low voltage"}
            {voltage > 48 && voltage <= 120 && "🏠 Household (US)"}
            {voltage > 120 && "⚡ High voltage"}
          </div>
        </div>

        {/* Resistance */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Resistance (R)
          </label>
          <input
            type="range"
            min="1"
            max="10000"
            step="10"
            value={resistance}
            onChange={(e) => setResistance(Number(e.target.value))}
            className="w-full h-2 bg-yellow-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between items-center mt-2">
            <input
              type="number"
              value={resistance}
              onChange={(e) => setResistance(Math.max(1, Number(e.target.value)))}
              className="w-24 px-2 py-1 border rounded text-sm dark:bg-gray-700 dark:text-white"
            />
            <span className="text-sm text-gray-600 dark:text-gray-400">Ω (Ohms)</span>
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {resistance < 100 && "Low resistance"}
            {resistance >= 100 && resistance < 1000 && "Medium resistance"}
            {resistance >= 1000 && resistance < 10000 && `${(resistance/1000).toFixed(1)}k Ω`}
            {resistance >= 10000 && `${(resistance/1000).toFixed(0)}k Ω`}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="grid md:grid-cols-3 gap-4 mb-4">
        <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg p-4 text-white">
          <div className="text-sm opacity-90 mb-1">Current (I)</div>
          <div className="text-3xl font-bold">{currentMa.toFixed(1)}</div>
          <div className="text-sm opacity-90">mA</div>
          <div className="text-xs opacity-75 mt-1">({current.toFixed(4)} A)</div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg p-4 text-white">
          <div className="text-sm opacity-90 mb-1">Power (P)</div>
          <div className="text-3xl font-bold">
            {power >= 1 ? power.toFixed(2) : (power * 1000).toFixed(1)}
          </div>
          <div className="text-sm opacity-90">{power >= 1 ? 'Watts' : 'mW'}</div>
        </div>

        <div className={`bg-gradient-to-br from-${safety.color}-500 to-${safety.color}-600 rounded-lg p-4 text-white`}>
          <div className="text-sm opacity-90 mb-1">Safety Level</div>
          <div className="text-2xl font-bold">{safety.icon}</div>
          <div className="text-sm opacity-90">{safety.level}</div>
        </div>
      </div>

      {/* Circuit Diagram */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-4">
        <div className="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">Simple Circuit:</div>
        <div className="flex items-center justify-center gap-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-400 rounded-lg flex items-center justify-center text-2xl">
              <Zap />
            </div>
            <div className="text-xs mt-1 text-gray-600 dark:text-gray-400">{voltage}V</div>
          </div>
          <div className="text-2xl text-gray-400">→</div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gray-300 dark:bg-gray-600 rounded-lg flex items-center justify-center text-xs font-bold">
              {resistance}Ω
            </div>
            <div className="text-xs mt-1 text-gray-600 dark:text-gray-400">Resistor</div>
          </div>
          <div className="text-2xl text-gray-400">→</div>
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-400 rounded-lg flex items-center justify-center text-2xl">
              ⚡
            </div>
            <div className="text-xs mt-1 text-gray-600 dark:text-gray-400">{currentMa.toFixed(1)}mA</div>
          </div>
        </div>
      </div>

      {/* Interpretation */}
      <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          <strong>💡 Interpretation:</strong> With <strong>{voltage}V</strong> across <strong>{resistance}Ω</strong>, 
          current is <strong>{currentMa.toFixed(1)} mA</strong> and power dissipated is <strong>{power.toFixed(2)} W</strong>.
        </p>
        <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
          <strong>Safety note:</strong> {safety.icon} {safety.level} - 
          {currentMa < 1 && " Safe for human contact."}
          {currentMa >= 1 && currentMa < 10 && " Can feel tingling sensation."}
          {currentMa >= 10 && currentMa < 30 && " Painful, can't let go!"}
          {currentMa >= 30 && " DANGEROUS - can cause serious injury or death!"}
        </p>
      </div>

      {/* Common Examples */}
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2">
        <button
          onClick={() => { setVoltage(5); setResistance(1000); }}
          className="px-3 py-2 bg-blue-100 dark:bg-blue-900 rounded text-xs hover:bg-blue-200 dark:hover:bg-blue-800"
        >
          USB (5V, 1kΩ)
        </button>
        <button
          onClick={() => { setVoltage(12); setResistance(100); }}
          className="px-3 py-2 bg-green-100 dark:bg-green-900 rounded text-xs hover:bg-green-200 dark:hover:bg-green-800"
        >
          Car Battery (12V, 100Ω)
        </button>
        <button
          onClick={() => { setVoltage(120); setResistance(1440); }}
          className="px-3 py-2 bg-yellow-100 dark:bg-yellow-900 rounded text-xs hover:bg-yellow-200 dark:hover:bg-yellow-800"
        >
          Light Bulb (120V, 100W)
        </button>
        <button
          onClick={() => { setVoltage(3.3); setResistance(330); }}
          className="px-3 py-2 bg-purple-100 dark:bg-purple-900 rounded text-xs hover:bg-purple-200 dark:hover:bg-purple-800"
        >
          LED (3.3V, 330Ω)
        </button>
      </div>
    </div>
  );
}
