import { useState } from 'react';
import { Calculator, Rocket } from 'lucide-react';

export default function ThrustCalculator() {
  const [nozzleArea, setNozzleArea] = useState(0.5);
  const [chamberPressure, setChamberPressure] = useState(10);
  const [exitPressure, setExitPressure] = useState(1);
  const [ambientPressure, setAmbientPressure] = useState(1);

  // Thrust = (Pc - Pe) * Ae + (Pe - Pa) * Ae
  // Simplified: Thrust ≈ (Pc - Pa) * Ae
  const calculateThrust = () => {
    const thrust = (chamberPressure - ambientPressure) * nozzleArea * 1000;
    return thrust.toFixed(2);
  };

  const calculateSpecificImpulse = () => {
    const isp = ((chamberPressure - ambientPressure) / ambientPressure) * 30;
    return isp.toFixed(1);
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-cyan-500/20 rounded-lg">
          <Calculator className="w-6 h-6 text-cyan-400" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-white">Thrust Calculator</h3>
          <p className="text-sm text-gray-400">Calculate rocket engine thrust</p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Nozzle Area */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Nozzle Exit Area (m²): {nozzleArea}
          </label>
          <input
            type="range"
            min="0.1"
            max="2"
            step="0.1"
            value={nozzleArea}
            onChange={(e) => setNozzleArea(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
          />
        </div>

        {/* Chamber Pressure */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Chamber Pressure (MPa): {chamberPressure}
          </label>
          <input
            type="range"
            min="1"
            max="30"
            step="1"
            value={chamberPressure}
            onChange={(e) => setChamberPressure(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
          />
        </div>

        {/* Exit Pressure */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Exit Pressure (MPa): {exitPressure}
          </label>
          <input
            type="range"
            min="0.1"
            max="5"
            step="0.1"
            value={exitPressure}
            onChange={(e) => setExitPressure(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
          />
        </div>

        {/* Ambient Pressure */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Ambient Pressure (MPa): {ambientPressure}
          </label>
          <input
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={ambientPressure}
            onChange={(e) => setAmbientPressure(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
          />
        </div>

        {/* Results */}
        <div className="mt-6 p-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <Rocket className="w-5 h-5 text-cyan-400" />
            <h4 className="font-semibold text-white">Results</h4>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-400">Thrust</div>
              <div className="text-2xl font-bold text-cyan-400">{calculateThrust()} kN</div>
            </div>
            <div>
              <div className="text-sm text-gray-400">Specific Impulse</div>
              <div className="text-2xl font-bold text-blue-400">{calculateSpecificImpulse()} s</div>
            </div>
          </div>
          <div className="mt-3 text-xs text-gray-400">
            Formula: Thrust = (Pc - Pa) × Ae
          </div>
        </div>
      </div>
    </div>
  );
}
