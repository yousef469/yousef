export default function CarDiagram({ type = "forces" }) {
  if (type === "forces") {
    return (
      <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 my-6 border-2 border-orange-200 dark:border-orange-700">
        <h4 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">🚗 Forces on a Vehicle</h4>
        <svg viewBox="0 0 600 400" className="w-full max-w-2xl mx-auto">
          {/* Car body */}
          <rect x="200" y="180" width="200" height="60" rx="10" fill="#e53e3e" stroke="#333" strokeWidth="2"/>
          <rect x="220" y="160" width="160" height="30" rx="5" fill="#87ceeb" stroke="#333" strokeWidth="2"/>
          
          {/* Wheels */}
          <circle cx="240" cy="250" r="20" fill="#333" stroke="#666" strokeWidth="3"/>
          <circle cx="360" cy="250" r="20" fill="#333" stroke="#666" strokeWidth="3"/>
          
          {/* TRACTION arrow (forward from rear wheel) */}
          <line x1="360" y1="250" x2="460" y2="250" stroke="#48bb78" strokeWidth="5" markerEnd="url(#arrowgreen3)"/>
          <text x="410" y="240" fill="#48bb78" fontSize="16" fontWeight="bold">TRACTION</text>
          <text x="410" y="260" fill="#48bb78" fontSize="11">F_t = μN</text>
          
          {/* DRAG arrow (backward) */}
          <line x1="200" y1="210" x2="100" y2="210" stroke="#ed8936" strokeWidth="4" markerEnd="url(#arroworange3)"/>
          <text x="110" y="200" fill="#ed8936" fontSize="16" fontWeight="bold">DRAG</text>
          <text x="110" y="220" fill="#ed8936" fontSize="11">F_d = ½ρv²C_dA</text>
          
          {/* WEIGHT arrow (down) */}
          <line x1="300" y1="240" x2="300" y2="320" stroke="#e53e3e" strokeWidth="4" markerEnd="url(#arrowred3)"/>
          <text x="310" y="285" fill="#e53e3e" fontSize="16" fontWeight="bold">WEIGHT</text>
          <text x="310" y="305" fill="#e53e3e" fontSize="11">W = mg</text>
          
          {/* NORMAL FORCE arrows (up from wheels) */}
          <line x1="240" y1="250" x2="240" y2="200" stroke="#4299e1" strokeWidth="3" markerEnd="url(#arrowblue3)"/>
          <line x1="360" y1="250" x2="360" y2="200" stroke="#4299e1" strokeWidth="3" markerEnd="url(#arrowblue3)"/>
          <text x="270" y="190" fill="#4299e1" fontSize="14" fontWeight="bold">NORMAL FORCE</text>
          
          {/* Ground */}
          <line x1="100" y1="270" x2="500" y2="270" stroke="#8b4513" strokeWidth="4"/>
          <rect x="100" y="270" width="400" height="10" fill="#d2691e" opacity="0.5"/>
          
          {/* Arrow markers */}
          <defs>
            <marker id="arrowgreen3" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
              <polygon points="0,0 10,5 0,10" fill="#48bb78"/>
            </marker>
            <marker id="arroworange3" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
              <polygon points="0,0 10,5 0,10" fill="#ed8936"/>
            </marker>
            <marker id="arrowred3" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
              <polygon points="0,0 10,5 0,10" fill="#e53e3e"/>
            </marker>
            <marker id="arrowblue3" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
              <polygon points="0,0 10,5 0,10" fill="#4299e1"/>
            </marker>
          </defs>
        </svg>
        
        <div className="mt-4 grid md:grid-cols-2 gap-3 text-sm">
          <div className="flex items-start gap-2">
            <div className="w-4 h-4 bg-green-500 rounded mt-1"></div>
            <div>
              <strong className="text-gray-700 dark:text-gray-300">Traction:</strong>
              <span className="text-gray-600 dark:text-gray-400"> Forward force from tires, limited by friction (μN)</span>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-4 h-4 bg-orange-500 rounded mt-1"></div>
            <div>
              <strong className="text-gray-700 dark:text-gray-300">Drag:</strong>
              <span className="text-gray-600 dark:text-gray-400"> Air resistance, increases with v²</span>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-4 h-4 bg-red-500 rounded mt-1"></div>
            <div>
              <strong className="text-gray-700 dark:text-gray-300">Weight:</strong>
              <span className="text-gray-600 dark:text-gray-400"> Gravitational force downward</span>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded mt-1"></div>
            <div>
              <strong className="text-gray-700 dark:text-gray-300">Normal Force:</strong>
              <span className="text-gray-600 dark:text-gray-400"> Ground pushes up on tires</span>
            </div>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <strong>Acceleration:</strong> F<sub>net</sub> = F<sub>traction</sub> - F<sub>drag</sub> - F<sub>rolling</sub>
            <br/>
            <strong>Maximum Traction:</strong> F<sub>max</sub> = μN (limited by tire grip!)
          </p>
        </div>
      </div>
    );
  }

  if (type === "braking") {
    return (
      <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 my-6 border-2 border-red-200 dark:border-red-700">
        <h4 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">🛑 Braking Forces & Weight Transfer</h4>
        <svg viewBox="0 0 600 400" className="w-full max-w-2xl mx-auto">
          {/* Car body (tilted forward during braking) */}
          <rect x="200" y="170" width="200" height="60" rx="10" fill="#e53e3e" stroke="#333" strokeWidth="2"/>
          <rect x="220" y="150" width="160" height="30" rx="5" fill="#87ceeb" stroke="#333" strokeWidth="2"/>
          
          {/* Wheels */}
          <circle cx="240" cy="240" r="20" fill="#333" stroke="#666" strokeWidth="3"/>
          <circle cx="360" cy="240" r="20" fill="#333" stroke="#666" strokeWidth="3"/>
          
          {/* Brake force arrows (backward from wheels) */}
          <line x1="240" y1="240" x2="160" y2="240" stroke="#e53e3e" strokeWidth="5" markerEnd="url(#arrowred4)"/>
          <line x1="360" y1="240" x2="280" y2="240" stroke="#e53e3e" strokeWidth="5" markerEnd="url(#arrowred4)"/>
          <text x="150" y="230" fill="#e53e3e" fontSize="14" fontWeight="bold">BRAKE FORCE</text>
          
          {/* Weight transfer arrows */}
          <line x1="300" y1="200" x2="240" y2="200" stroke="#9f7aea" strokeWidth="4" markerEnd="url(#arrowpurple4)"/>
          <text x="250" y="190" fill="#9f7aea" fontSize="13" fontWeight="bold">Weight Transfer</text>
          
          {/* Normal force - larger on front */}
          <line x1="240" y1="240" x2="240" y2="180" stroke="#4299e1" strokeWidth="5" markerEnd="url(#arrowblue4)"/>
          <text x="200" y="170" fill="#4299e1" fontSize="12" fontWeight="bold">N_front (larger)</text>
          
          <line x1="360" y1="240" x2="360" y2="200" stroke="#4299e1" strokeWidth="3" markerEnd="url(#arrowblue4)"/>
          <text x="370" y="195" fill="#4299e1" fontSize="12">N_rear (smaller)</text>
          
          {/* Deceleration arrow */}
          <line x1="300" y1="130" x2="200" y2="130" stroke="#ed8936" strokeWidth="4" markerEnd="url(#arroworange4)"/>
          <text x="210" y="120" fill="#ed8936" fontSize="14" fontWeight="bold">DECELERATION</text>
          
          {/* Ground */}
          <line x1="100" y1="260" x2="500" y2="260" stroke="#8b4513" strokeWidth="4"/>
          
          {/* Arrow markers */}
          <defs>
            <marker id="arrowred4" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
              <polygon points="0,0 10,5 0,10" fill="#e53e3e"/>
            </marker>
            <marker id="arrowblue4" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
              <polygon points="0,0 10,5 0,10" fill="#4299e1"/>
            </marker>
            <marker id="arrowpurple4" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
              <polygon points="0,0 10,5 0,10" fill="#9f7aea"/>
            </marker>
            <marker id="arroworange4" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
              <polygon points="0,0 10,5 0,10" fill="#ed8936"/>
            </marker>
          </defs>
        </svg>
        
        <div className="mt-4 space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <p><strong>Weight Transfer:</strong> During braking, weight shifts forward</p>
          <p><strong>Front Tires:</strong> Gain normal force → More braking capacity</p>
          <p><strong>Rear Tires:</strong> Lose normal force → Less braking capacity</p>
          <p><strong>Result:</strong> Front brakes do 60-70% of the work!</p>
        </div>
        
        <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <strong>Weight Transfer Formula:</strong> ΔW = (m × a × h) / L
            <br/>
            <span className="text-xs">m = mass, a = deceleration, h = CG height, L = wheelbase</span>
          </p>
        </div>
      </div>
    );
  }

  // Default: powertrain
  return (
    <div className="bg-gradient-to-br from-gray-50 to-slate-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 my-6 border-2 border-gray-200 dark:border-gray-700">
      <h4 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">⚙️ Powertrain Layout</h4>
      <svg viewBox="0 0 600 300" className="w-full max-w-2xl mx-auto">
        {/* Engine */}
        <rect x="100" y="120" width="80" height="60" rx="5" fill="#e53e3e" stroke="#333" strokeWidth="2"/>
        <text x="140" y="155" textAnchor="middle" fontSize="14" fontWeight="bold" fill="white">ENGINE</text>
        
        {/* Transmission */}
        <rect x="220" y="130" width="60" height="40" rx="5" fill="#4299e1" stroke="#333" strokeWidth="2"/>
        <text x="250" y="155" textAnchor="middle" fontSize="12" fontWeight="bold" fill="white">TRANS</text>
        
        {/* Driveshaft */}
        <rect x="300" y="145" width="120" height="10" fill="#666" stroke="#333" strokeWidth="2"/>
        <text x="360" y="140" textAnchor="middle" fontSize="11">Driveshaft</text>
        
        {/* Differential */}
        <circle cx="450" cy="150" r="30" fill="#ed8936" stroke="#333" strokeWidth="2"/>
        <text x="450" y="155" textAnchor="middle" fontSize="12" fontWeight="bold" fill="white">DIFF</text>
        
        {/* Axles */}
        <line x1="450" y1="150" x2="450" y2="220" stroke="#666" strokeWidth="8"/>
        <line x1="450" y1="220" x2="400" y2="220" stroke="#666" strokeWidth="6"/>
        <line x1="450" y1="220" x2="500" y2="220" stroke="#666" strokeWidth="6"/>
        
        {/* Wheels */}
        <circle cx="400" cy="220" r="25" fill="#333" stroke="#666" strokeWidth="3"/>
        <circle cx="500" cy="220" r="25" fill="#333" stroke="#666" strokeWidth="3"/>
        <text x="450" y="265" textAnchor="middle" fontSize="12">Drive Wheels</text>
        
        {/* Power flow arrows */}
        <text x="300" y="100" textAnchor="middle" fontSize="14" fill="#9f7aea" fontWeight="bold">POWER FLOW →</text>
        
        {/* Labels */}
        <text x="140" y="100" textAnchor="middle" fontSize="11" fill="#666">Combustion</text>
        <text x="250" y="110" textAnchor="middle" fontSize="11" fill="#666">Gear Ratios</text>
        <text x="450" y="110" textAnchor="middle" fontSize="11" fill="#666">Split Power</text>
      </svg>
      
      <div className="mt-4 space-y-2 text-sm text-gray-700 dark:text-gray-300">
        <p><strong>Engine:</strong> Converts fuel to rotational power (torque × RPM)</p>
        <p><strong>Transmission:</strong> Multiplies torque through gear ratios</p>
        <p><strong>Driveshaft:</strong> Transfers power to differential</p>
        <p><strong>Differential:</strong> Splits power to wheels, allows different speeds in turns</p>
        <p><strong>Wheels:</strong> Convert rotational power to linear motion</p>
      </div>
      
      <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-900/20 rounded-lg">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          <strong>Power Loss:</strong> ~15% lost through drivetrain friction and heat
          <br/>
          <strong>Wheel Torque:</strong> T<sub>wheel</sub> = T<sub>engine</sub> × Gear Ratio × Final Drive × η
        </p>
      </div>
    </div>
  );
}
