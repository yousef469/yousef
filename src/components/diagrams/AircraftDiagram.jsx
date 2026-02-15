export default function AircraftDiagram({ type = "forces" }) {
  if (type === "forces") {
    return (
      <div className="bg-gradient-to-br from-sky-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 my-6 border-2 border-sky-200 dark:border-sky-700">
        <h4 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">✈️ Four Forces of Flight</h4>
        <svg viewBox="0 0 500 400" className="w-full max-w-2xl mx-auto">
          {/* Aircraft body */}
          <ellipse cx="250" cy="200" rx="80" ry="20" fill="#e0e0e0" stroke="#333" strokeWidth="2"/>
          
          {/* Wings */}
          <rect x="170" y="190" width="160" height="20" fill="#c0c0c0" stroke="#333" strokeWidth="2"/>
          
          {/* Tail */}
          <polygon points="320,200 350,200 350,180 340,180" fill="#c0c0c0" stroke="#333" strokeWidth="2"/>
          <polygon points="345,180 355,160 365,180" fill="#c0c0c0" stroke="#333" strokeWidth="2"/>
          
          {/* Cockpit */}
          <circle cx="190" cy="200" r="15" fill="#87ceeb" stroke="#333" strokeWidth="2"/>
          
          {/* LIFT arrow (up) */}
          <line x1="250" y1="190" x2="250" y2="80" stroke="#48bb78" strokeWidth="5" markerEnd="url(#arrowgreen)"/>
          <text x="260" y="130" fill="#48bb78" fontSize="18" fontWeight="bold">LIFT</text>
          <text x="260" y="150" fill="#48bb78" fontSize="12">L = ½ρv²SC_L</text>
          
          {/* WEIGHT arrow (down) */}
          <line x1="250" y1="210" x2="250" y2="320" stroke="#e53e3e" strokeWidth="5" markerEnd="url(#arrowred)"/>
          <text x="260" y="270" fill="#e53e3e" fontSize="18" fontWeight="bold">WEIGHT</text>
          <text x="260" y="290" fill="#e53e3e" fontSize="12">W = mg</text>
          
          {/* THRUST arrow (forward) */}
          <line x1="170" y1="200" x2="60" y2="200" stroke="#4299e1" strokeWidth="5" markerEnd="url(#arrowblue)"/>
          <text x="70" y="190" fill="#4299e1" fontSize="18" fontWeight="bold">THRUST</text>
          <text x="70" y="210" fill="#4299e1" fontSize="12">T = F_engine</text>
          
          {/* DRAG arrow (backward) */}
          <line x1="330" y1="200" x2="440" y2="200" stroke="#ed8936" strokeWidth="5" markerEnd="url(#arroworange)"/>
          <text x="350" y="190" fill="#ed8936" fontSize="18" fontWeight="bold">DRAG</text>
          <text x="350" y="210" fill="#ed8936" fontSize="12">D = ½ρv²SC_D</text>
          
          {/* Arrow markers */}
          <defs>
            <marker id="arrowgreen" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
              <polygon points="0,0 10,5 0,10" fill="#48bb78"/>
            </marker>
            <marker id="arrowred" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
              <polygon points="0,0 10,5 0,10" fill="#e53e3e"/>
            </marker>
            <marker id="arrowblue" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
              <polygon points="0,0 10,5 0,10" fill="#4299e1"/>
            </marker>
            <marker id="arroworange" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
              <polygon points="0,0 10,5 0,10" fill="#ed8936"/>
            </marker>
          </defs>
        </svg>
        
        <div className="mt-4 grid md:grid-cols-2 gap-3 text-sm">
          <div className="flex items-start gap-2">
            <div className="w-4 h-4 bg-green-500 rounded mt-1"></div>
            <div>
              <strong className="text-gray-700 dark:text-gray-300">Lift:</strong>
              <span className="text-gray-600 dark:text-gray-400"> Upward force from wings, opposes weight</span>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-4 h-4 bg-red-500 rounded mt-1"></div>
            <div>
              <strong className="text-gray-700 dark:text-gray-300">Weight:</strong>
              <span className="text-gray-600 dark:text-gray-400"> Downward gravitational force</span>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded mt-1"></div>
            <div>
              <strong className="text-gray-700 dark:text-gray-300">Thrust:</strong>
              <span className="text-gray-600 dark:text-gray-400"> Forward force from engines</span>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-4 h-4 bg-orange-500 rounded mt-1"></div>
            <div>
              <strong className="text-gray-700 dark:text-gray-300">Drag:</strong>
              <span className="text-gray-600 dark:text-gray-400"> Backward air resistance</span>
            </div>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-sky-50 dark:bg-sky-900/20 rounded-lg">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <strong>Steady Flight:</strong> Lift = Weight, Thrust = Drag
            <br/>
            <strong>Climbing:</strong> Lift &gt; Weight or Thrust &gt; Drag
          </p>
        </div>
      </div>
    );
  }

  if (type === "airfoil") {
    return (
      <div className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 my-6 border-2 border-cyan-200 dark:border-cyan-700">
        <h4 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">🪽 Airfoil Cross-Section</h4>
        <svg viewBox="0 0 500 300" className="w-full max-w-2xl mx-auto">
          {/* Airfoil shape */}
          <path d="M 100 150 Q 150 120, 250 140 Q 350 145, 400 150 Q 350 160, 250 155 Q 150 152, 100 150 Z" 
                fill="#4299e1" stroke="#2c5282" strokeWidth="2" opacity="0.8"/>
          
          {/* Chord line */}
          <line x1="100" y1="150" x2="400" y2="150" stroke="#666" strokeWidth="2" strokeDasharray="5,5"/>
          <text x="420" y="155" fontSize="12" fill="#666">Chord Line</text>
          
          {/* Airflow lines (top - faster) */}
          <path d="M 50 100 Q 150 80, 250 100 Q 350 110, 450 120" 
                fill="none" stroke="#48bb78" strokeWidth="2" markerEnd="url(#arrowgreen2)"/>
          <path d="M 50 110 Q 150 90, 250 110 Q 350 120, 450 130" 
                fill="none" stroke="#48bb78" strokeWidth="2" markerEnd="url(#arrowgreen2)"/>
          <text x="460" y="125" fontSize="12" fill="#48bb78" fontWeight="bold">Faster</text>
          <text x="460" y="140" fontSize="10" fill="#48bb78">Lower Pressure</text>
          
          {/* Airflow lines (bottom - slower) */}
          <path d="M 50 200 Q 150 210, 250 200 Q 350 195, 450 190" 
                fill="none" stroke="#e53e3e" strokeWidth="2" markerEnd="url(#arrowred2)"/>
          <path d="M 50 210 Q 150 220, 250 210 Q 350 205, 450 200" 
                fill="none" stroke="#e53e3e" strokeWidth="2" markerEnd="url(#arrowred2)"/>
          <text x="460" y="195" fontSize="12" fill="#e53e3e" fontWeight="bold">Slower</text>
          <text x="460" y="210" fontSize="10" fill="#e53e3e">Higher Pressure</text>
          
          {/* Lift arrow */}
          <line x1="250" y1="140" x2="250" y2="50" stroke="#9f7aea" strokeWidth="4" markerEnd="url(#arrowpurple)"/>
          <text x="260" y="90" fontSize="16" fill="#9f7aea" fontWeight="bold">LIFT</text>
          
          {/* Angle of attack */}
          <line x1="80" y1="150" x2="120" y2="150" stroke="#ed8936" strokeWidth="2"/>
          <line x1="80" y1="150" x2="110" y2="130" stroke="#ed8936" strokeWidth="2"/>
          <path d="M 95 150 Q 95 145, 100 142" fill="none" stroke="#ed8936" strokeWidth="1"/>
          <text x="85" y="170" fontSize="11" fill="#ed8936">α (angle of attack)</text>
          
          {/* Arrow markers */}
          <defs>
            <marker id="arrowgreen2" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
              <polygon points="0,0 8,4 0,8" fill="#48bb78"/>
            </marker>
            <marker id="arrowred2" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
              <polygon points="0,0 8,4 0,8" fill="#e53e3e"/>
            </marker>
            <marker id="arrowpurple" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
              <polygon points="0,0 10,5 0,10" fill="#9f7aea"/>
            </marker>
          </defs>
        </svg>
        
        <div className="mt-4 space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <p><strong>Bernoulli's Principle:</strong> Faster airflow = Lower pressure</p>
          <p><strong>Curved Top Surface:</strong> Air travels faster over top → Lower pressure above</p>
          <p><strong>Flatter Bottom:</strong> Air travels slower below → Higher pressure below</p>
          <p><strong>Result:</strong> Pressure difference creates upward lift force!</p>
        </div>
        
        <div className="mt-4 p-3 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <strong>Angle of Attack (α):</strong> Increasing α increases lift, but too much causes stall!
          </p>
        </div>
      </div>
    );
  }

  // Default: basic aircraft components
  return (
    <div className="bg-gradient-to-br from-blue-50 to-sky-50 dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 my-6 border-2 border-blue-200 dark:border-blue-700">
      <h4 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">✈️ Aircraft Components</h4>
      <svg viewBox="0 0 600 400" className="w-full max-w-2xl mx-auto">
        {/* Fuselage */}
        <ellipse cx="300" cy="200" rx="120" ry="30" fill="#e0e0e0" stroke="#333" strokeWidth="2"/>
        <text x="300" y="205" textAnchor="middle" fontSize="14" fontWeight="bold">Fuselage</text>
        
        {/* Wings */}
        <rect x="200" y="185" width="200" height="30" fill="#c0c0c0" stroke="#333" strokeWidth="2"/>
        <text x="300" y="235" textAnchor="middle" fontSize="12">Wings</text>
        
        {/* Engines */}
        <ellipse cx="240" cy="215" rx="20" ry="15" fill="#666" stroke="#333" strokeWidth="2"/>
        <ellipse cx="360" cy="215" rx="20" ry="15" fill="#666" stroke="#333" strokeWidth="2"/>
        <text x="300" y="250" textAnchor="middle" fontSize="11">Engines</text>
        
        {/* Tail */}
        <polygon points="410,200 460,200 460,190 440,190" fill="#c0c0c0" stroke="#333" strokeWidth="2"/>
        <text x="450" y="185" textAnchor="middle" fontSize="11">Horizontal Stabilizer</text>
        
        {/* Vertical stabilizer */}
        <polygon points="450,190 460,150 470,190" fill="#c0c0c0" stroke="#333" strokeWidth="2"/>
        <text x="480" y="170" fontSize="11">Vertical Stabilizer</text>
        
        {/* Cockpit */}
        <circle cx="200" cy="200" r="20" fill="#87ceeb" stroke="#333" strokeWidth="2"/>
        <text x="200" y="165" textAnchor="middle" fontSize="11">Cockpit</text>
        
        {/* Landing gear */}
        <line x1="250" y1="230" x2="250" y2="260" stroke="#333" strokeWidth="3"/>
        <circle cx="250" cy="265" r="8" fill="#333"/>
        <line x1="350" y1="230" x2="350" y2="260" stroke="#333" strokeWidth="3"/>
        <circle cx="350" cy="265" r="8" fill="#333"/>
        <text x="300" y="285" textAnchor="middle" fontSize="11">Landing Gear</text>
        
        {/* Labels with lines */}
        <line x1="300" y1="170" x2="300" y2="140" stroke="#666" strokeWidth="1"/>
        <text x="305" y="135" fontSize="12" fill="#666">Main Wing (generates lift)</text>
        
        <line x1="180" y1="200" x2="150" y2="180" stroke="#666" strokeWidth="1"/>
        <text x="60" y="175" fontSize="12" fill="#666">Nose (aerodynamic)</text>
        
        <line x1="420" y1="200" x2="480" y2="220" stroke="#666" strokeWidth="1"/>
        <text x="485" y="225" fontSize="12" fill="#666">Tail (stability & control)</text>
      </svg>
      
      <div className="mt-4 space-y-2 text-sm text-gray-700 dark:text-gray-300">
        <p><strong>Fuselage:</strong> Main body, carries passengers/cargo</p>
        <p><strong>Wings:</strong> Generate lift through airfoil shape</p>
        <p><strong>Engines:</strong> Provide thrust for forward motion</p>
        <p><strong>Tail:</strong> Provides stability and control</p>
        <p><strong>Landing Gear:</strong> Supports aircraft on ground</p>
      </div>
    </div>
  );
}
