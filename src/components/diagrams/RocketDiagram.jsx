export default function RocketDiagram({ type = "basic" }) {
  if (type === "forces") {
    return (
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 my-6 border-2 border-indigo-200 dark:border-indigo-700">
        <h4 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">🚀 Forces on a Rocket</h4>
        <svg viewBox="0 0 400 500" className="w-full max-w-md mx-auto">
          {/* Rocket body */}
          <rect x="150" y="150" width="100" height="200" fill="#e0e0e0" stroke="#333" strokeWidth="2"/>
          <polygon points="150,150 200,100 250,150" fill="#ff6b6b" stroke="#333" strokeWidth="2"/>
          
          {/* Thrust arrow (down from rocket) */}
          <line x1="200" y1="350" x2="200" y2="450" stroke="#ff4444" strokeWidth="4" markerEnd="url(#arrowred)"/>
          <text x="210" y="400" fill="#ff4444" fontSize="16" fontWeight="bold">Thrust (T)</text>
          <text x="210" y="420" fill="#ff4444" fontSize="12">Upward Force</text>
          
          {/* Weight arrow (down) */}
          <line x1="200" y1="250" x2="200" y2="150" stroke="#4444ff" strokeWidth="4" markerEnd="url(#arrowblue)"/>
          <text x="210" y="200" fill="#4444ff" fontSize="16" fontWeight="bold">Weight (mg)</text>
          <text x="210" y="220" fill="#4444ff" fontSize="12">Downward Force</text>
          
          {/* Drag arrow (up) */}
          <line x1="120" y1="250" x2="50" y2="250" stroke="#ff9900" strokeWidth="3" markerEnd="url(#arroworange)"/>
          <text x="10" y="240" fill="#ff9900" fontSize="14" fontWeight="bold">Drag</text>
          <text x="10" y="255" fill="#ff9900" fontSize="11">Air Resistance</text>
          
          {/* Exhaust */}
          <polygon points="180,350 200,380 220,350" fill="#ffaa00" opacity="0.7"/>
          <polygon points="170,350 200,400 230,350" fill="#ff6600" opacity="0.5"/>
          
          {/* Arrow markers */}
          <defs>
            <marker id="arrowred" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
              <polygon points="0,0 10,5 0,10" fill="#ff4444"/>
            </marker>
            <marker id="arrowblue" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
              <polygon points="0,0 10,5 0,10" fill="#4444ff"/>
            </marker>
            <marker id="arroworange" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
              <polygon points="0,0 10,5 0,10" fill="#ff9900"/>
            </marker>
          </defs>
        </svg>
        
        <div className="mt-4 space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            <span className="text-gray-700 dark:text-gray-300"><strong>Thrust (T):</strong> Force from expelled exhaust gases</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded"></div>
            <span className="text-gray-700 dark:text-gray-300"><strong>Weight (mg):</strong> Gravitational force pulling down</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-orange-500 rounded"></div>
            <span className="text-gray-700 dark:text-gray-300"><strong>Drag:</strong> Air resistance (increases with v²)</span>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <strong>Net Force:</strong> F<sub>net</sub> = T - mg - D<sub>drag</sub>
            <br/>
            <strong>Acceleration:</strong> a = F<sub>net</sub> / m
          </p>
        </div>
      </div>
    );
  }

  if (type === "staging") {
    return (
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 my-6 border-2 border-purple-200 dark:border-purple-700">
        <h4 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">🚀 Rocket Staging</h4>
        <div className="grid md:grid-cols-3 gap-4">
          {/* Stage 1 */}
          <div className="text-center">
            <svg viewBox="0 0 150 300" className="w-full max-w-[120px] mx-auto">
              <rect x="40" y="50" width="70" height="80" fill="#ff6b6b" stroke="#333" strokeWidth="2"/>
              <text x="75" y="95" textAnchor="middle" fontSize="12" fontWeight="bold">Stage 2</text>
              <rect x="40" y="130" width="70" height="120" fill="#4ecdc4" stroke="#333" strokeWidth="2"/>
              <text x="75" y="195" textAnchor="middle" fontSize="12" fontWeight="bold">Stage 1</text>
              <polygon points="40,50 75,20 110,50" fill="#ffd93d" stroke="#333" strokeWidth="2"/>
              <text x="75" y="280" textAnchor="middle" fontSize="14" fontWeight="bold">Liftoff</text>
            </svg>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">Full rocket with all stages</p>
          </div>
          
          {/* Stage 2 */}
          <div className="text-center">
            <svg viewBox="0 0 150 300" className="w-full max-w-[120px] mx-auto">
              <rect x="40" y="50" width="70" height="80" fill="#ff6b6b" stroke="#333" strokeWidth="2"/>
              <text x="75" y="95" textAnchor="middle" fontSize="12" fontWeight="bold">Stage 2</text>
              <polygon points="40,50 75,20 110,50" fill="#ffd93d" stroke="#333" strokeWidth="2"/>
              
              {/* Falling stage 1 */}
              <rect x="40" y="180" width="70" height="120" fill="#4ecdc4" stroke="#333" strokeWidth="2" opacity="0.5"/>
              <text x="75" y="245" textAnchor="middle" fontSize="12" opacity="0.5">Stage 1</text>
              <line x1="50" y1="190" x2="40" y2="210" stroke="#ff4444" strokeWidth="2"/>
              <line x1="100" y1="190" x2="110" y2="210" stroke="#ff4444" strokeWidth="2"/>
              
              <text x="75" y="280" textAnchor="middle" fontSize="14" fontWeight="bold">Separation</text>
            </svg>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">Stage 1 drops off (empty)</p>
          </div>
          
          {/* Stage 3 */}
          <div className="text-center">
            <svg viewBox="0 0 150 300" className="w-full max-w-[120px] mx-auto">
              <rect x="40" y="80" width="70" height="80" fill="#ff6b6b" stroke="#333" strokeWidth="2"/>
              <text x="75" y="125" textAnchor="middle" fontSize="12" fontWeight="bold">Stage 2</text>
              <polygon points="40,80 75,50 110,80" fill="#ffd93d" stroke="#333" strokeWidth="2"/>
              <polygon points="50,160 75,180 100,160" fill="#ffaa00" opacity="0.7"/>
              <text x="75" y="280" textAnchor="middle" fontSize="14" fontWeight="bold">Orbit!</text>
            </svg>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">Lighter, faster, more Δv!</p>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <strong>Why Staging Works:</strong> By dropping empty tanks, you don't waste fuel carrying dead weight. 
            Each stage can achieve its own Δv, and they add up: Δv<sub>total</sub> = Δv<sub>1</sub> + Δv<sub>2</sub> + ...
          </p>
        </div>
      </div>
    );
  }

  // Default: basic rocket diagram
  return (
    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 my-6 border-2 border-blue-200 dark:border-blue-700">
      <h4 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">🚀 Rocket Components</h4>
      <svg viewBox="0 0 300 400" className="w-full max-w-sm mx-auto">
        {/* Nose cone */}
        <polygon points="100,50 150,10 200,50" fill="#ff6b6b" stroke="#333" strokeWidth="2"/>
        <text x="150" y="35" textAnchor="middle" fontSize="12" fontWeight="bold">Payload</text>
        
        {/* Upper stage */}
        <rect x="100" y="50" width="100" height="80" fill="#ffd93d" stroke="#333" strokeWidth="2"/>
        <text x="150" y="95" textAnchor="middle" fontSize="12" fontWeight="bold">Upper Stage</text>
        <circle cx="150" cy="110" r="8" fill="#333"/>
        
        {/* Interstage */}
        <rect x="100" y="130" width="100" height="20" fill="#95e1d3" stroke="#333" strokeWidth="2"/>
        <text x="150" y="143" textAnchor="middle" fontSize="10">Interstage</text>
        
        {/* Lower stage */}
        <rect x="100" y="150" width="100" height="150" fill="#4ecdc4" stroke="#333" strokeWidth="2"/>
        <text x="150" y="230" textAnchor="middle" fontSize="12" fontWeight="bold">First Stage</text>
        <circle cx="130" cy="260" r="12" fill="#333"/>
        <circle cx="170" cy="260" r="12" fill="#333"/>
        
        {/* Engines */}
        <rect x="110" y="300" width="30" height="40" fill="#666" stroke="#333" strokeWidth="2"/>
        <rect x="160" y="300" width="30" height="40" fill="#666" stroke="#333" strokeWidth="2"/>
        <text x="150" y="325" textAnchor="middle" fontSize="10" fill="white">Engines</text>
        
        {/* Exhaust */}
        <polygon points="115,340 125,370 135,340" fill="#ff6600" opacity="0.7"/>
        <polygon points="165,340 175,370 185,340" fill="#ff6600" opacity="0.7"/>
        
        {/* Labels */}
        <line x1="210" y1="30" x2="250" y2="30" stroke="#666" strokeWidth="1"/>
        <text x="255" y="35" fontSize="11" fill="#666">Nose Cone</text>
        
        <line x1="210" y1="90" x2="250" y2="90" stroke="#666" strokeWidth="1"/>
        <text x="255" y="95" fontSize="11" fill="#666">Fuel Tank</text>
        
        <line x1="210" y1="225" x2="250" y2="225" stroke="#666" strokeWidth="1"/>
        <text x="255" y="230" fontSize="11" fill="#666">Oxidizer Tank</text>
        
        <line x1="210" y1="320" x2="250" y2="320" stroke="#666" strokeWidth="1"/>
        <text x="255" y="325" fontSize="11" fill="#666">Nozzles</text>
      </svg>
      
      <div className="mt-4 space-y-2 text-sm text-gray-700 dark:text-gray-300">
        <p><strong>Payload:</strong> Satellite, spacecraft, or cargo</p>
        <p><strong>Fuel & Oxidizer Tanks:</strong> 85-95% of rocket mass</p>
        <p><strong>Engines:</strong> Convert chemical energy to thrust</p>
        <p><strong>Structure:</strong> Holds everything together</p>
      </div>
    </div>
  );
}
