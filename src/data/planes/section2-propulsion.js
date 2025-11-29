// Section 2: Propulsion Systems - 6 Lessons (2 units × 3 lessons)

export const section2Propulsion = {
  id: 'propulsion',
  title: 'Section 2: Propulsion Systems',
  description: 'Piston engines, turboprops, and jet engines',
  icon: '🔥',
  color: 'from-orange-500 to-red-500',
  units: [
    {
      id: 'piston-turboprop',
      title: 'Piston & Turboprop Engines',
      description: 'Propeller-driven aircraft powerplants',
      lessons: [
        {
          id: 'piston-engines',
          title: 'Piston Engine Fundamentals',
          duration: '25 min', xp: 150,
          description: 'How reciprocating engines power aircraft',
          introduction: 'Piston engines powered the first century of aviation and still dominate general aviation today.',
          sections: [
            { title: 'Four-Stroke Cycle', content: '**Intake-Compression-Power-Exhaust**\n\n1. **Intake:** Piston down, fuel-air mixture enters\n2. **Compression:** Piston up, mixture compressed\n3. **Power:** Spark ignites, expansion pushes piston\n4. **Exhaust:** Piston up, gases expelled\n\n**Compression Ratio:** 7:1 to 10:1 typical\n**Firing Order:** Ensures smooth operation' },
            { title: 'Aircraft Engine Features', content: '**Horizontally Opposed:**\n- Flat configuration\n- Low vibration\n- Good cooling\n\n**Air Cooling:**\n- Fins on cylinders\n- Cowl flaps control airflow\n\n**Dual Ignition:**\n- Two spark plugs per cylinder\n- Two magnetos\n- Redundancy for safety' },
            { title: 'Performance & Limitations', content: '**Power Output:**\n- Measured in horsepower (HP)\n- Typical: 100-400 HP\n- Decreases with altitude (less air)\n\n**Turbocharging:**\n- Compresses intake air\n- Maintains power at altitude\n\n**Limitations:**\n- Detonation (knock)\n- Overheating\n- Fuel quality requirements' }
          ],
          keyTakeaways: ['Four-stroke cycle: intake, compression, power, exhaust', 'Aircraft engines use dual ignition for safety', 'Power decreases with altitude without turbocharging'],
          quiz: { questions: [
            { id: 'q1', question: 'Aircraft piston engines typically use:', options: ['Water cooling', 'Air cooling', 'Oil cooling', 'No cooling'], correctAnswer: 1, explanation: 'Most aircraft piston engines are air-cooled with cylinder fins.' },
            { id: 'q2', question: 'Dual ignition provides:', options: ['More power', 'Redundancy', 'Less fuel use', 'Quieter operation'], correctAnswer: 1, explanation: 'Two independent ignition systems provide redundancy for safety.' },
            { id: 'q3', question: 'Turbocharging helps maintain:', options: ['Fuel efficiency', 'Power at altitude', 'Engine cooling', 'Oil pressure'], correctAnswer: 1, explanation: 'Turbochargers compress air to maintain power as altitude increases.' }
          ]}
        },
        {
          id: 'propellers',
          title: 'Propeller Theory & Design',
          duration: '25 min', xp: 150,
          description: 'How propellers convert power to thrust',
          introduction: 'Propellers are rotating airfoils that convert engine power into thrust. Understanding propeller theory is essential for efficient flight.',
          sections: [
            { title: 'Propeller Aerodynamics', content: '**Rotating Airfoil:**\nEach blade section is an airfoil\n- Angle of attack varies along blade\n- Twist compensates for speed variation\n\n**Blade Angle:**\n- Angle between chord and plane of rotation\n- Higher near hub, lower at tip\n\n**Advance Ratio:** J = V/(nD)\n- V = airspeed\n- n = RPM\n- D = diameter' },
            { title: 'Propeller Types', content: '**Fixed Pitch:**\n- Simple, no moving parts\n- Optimized for one condition\n- Training aircraft\n\n**Constant Speed:**\n- Governor adjusts pitch\n- Optimal efficiency across speeds\n- Most GA and all turboprops\n\n**Feathering:**\n- Blades turn edge-on to wind\n- Minimizes drag if engine fails\n- Multi-engine aircraft' },
            { title: 'Efficiency & Performance', content: '**Propeller Efficiency:**\nη = Thrust Power / Shaft Power\nη = TV / P\n\n**Typical Values:**\n- Fixed pitch: 70-80%\n- Constant speed: 80-90%\n\n**Factors Affecting Efficiency:**\n- Blade design\n- Operating RPM\n- Airspeed\n- Number of blades' }
          ],
          keyTakeaways: ['Propeller blades are twisted airfoils', 'Constant speed props maintain optimal efficiency', 'Feathering reduces drag after engine failure'],
          quiz: { questions: [
            { id: 'q1', question: 'Propeller blade twist compensates for:', options: ['Weight', 'Speed variation along blade', 'Temperature', 'Vibration'], correctAnswer: 1, explanation: 'Blade tips move faster than roots, requiring twist to maintain optimal angle of attack.' },
            { id: 'q2', question: 'Constant speed propeller efficiency:', options: ['50-60%', '60-70%', '80-90%', '95-100%'], correctAnswer: 2, explanation: 'Constant speed propellers achieve 80-90% efficiency.' },
            { id: 'q3', question: 'Feathering is used when:', options: ['Climbing', 'Cruising', 'Engine fails', 'Landing'], correctAnswer: 2, explanation: 'Feathering minimizes drag from a windmilling propeller after engine failure.' }
          ]}
        },
        {
          id: 'turboprops',
          title: 'Turboprop Engines',
          duration: '30 min', xp: 175,
          description: 'Gas turbines driving propellers',
          introduction: 'Turboprops combine jet engine efficiency with propeller thrust, ideal for regional aircraft and military transports.',
          sections: [
            { title: 'Turboprop Basics', content: '**How It Works:**\n1. Compressor draws in air\n2. Combustion adds energy\n3. Turbine extracts power\n4. Power drives propeller via gearbox\n\n**Power Split:**\n- ~90% thrust from propeller\n- ~10% from jet exhaust\n\n**Advantages:**\n- Fuel efficient at medium speeds\n- Good short-field performance\n- Reliable' },
            { title: 'Components', content: '**Gas Generator:**\n- Compressor (axial or centrifugal)\n- Combustion chamber\n- Gas generator turbine\n\n**Power Section:**\n- Free power turbine\n- Reduction gearbox\n- Propeller\n\n**Reduction Gearbox:**\n- Turbine: 20,000-40,000 RPM\n- Propeller: 1,500-2,000 RPM\n- Gear ratio: ~15:1' },
            { title: 'Performance', content: '**Equivalent Shaft Horsepower (ESHP):**\nESHP = SHP + (Thrust × V)/550\n\n**Typical Power:**\n- Regional: 1,000-5,000 SHP\n- Military: Up to 11,000 SHP (C-130)\n\n**Altitude Performance:**\n- Better than piston at altitude\n- Flat-rated to certain altitude\n\n**Speed Range:**\n- Optimal: 250-400 knots\n- Above 400 kts, jets more efficient' }
          ],
          keyTakeaways: ['Turboprops are gas turbines driving propellers', '90% of thrust comes from the propeller', 'Reduction gearbox matches turbine to propeller speed', 'Most efficient at 250-400 knots'],
          quiz: { questions: [
            { id: 'q1', question: 'Turboprop thrust from propeller:', options: ['50%', '70%', '90%', '100%'], correctAnswer: 2, explanation: 'About 90% of turboprop thrust comes from the propeller, 10% from exhaust.' },
            { id: 'q2', question: 'Reduction gearbox ratio typically:', options: ['2:1', '5:1', '15:1', '50:1'], correctAnswer: 2, explanation: 'Gearbox reduces ~30,000 RPM turbine to ~2,000 RPM propeller (15:1).' },
            { id: 'q3', question: 'Turboprops most efficient at:', options: ['100-200 kts', '250-400 kts', '500-600 kts', 'Mach 0.85'], correctAnswer: 1, explanation: 'Turboprops are most efficient in the 250-400 knot range.' }
          ]}
        }
      ]
    },
    {
      id: 'jet-engines',
      title: 'Jet Engines',
      description: 'Turbofan and turbojet propulsion',
      lessons: [
        {
          id: 'jet-fundamentals',
          title: 'Jet Engine Fundamentals',
          duration: '30 min', xp: 175,
          description: 'How gas turbines produce thrust',
          introduction: 'Jet engines revolutionized aviation, enabling high-speed, high-altitude flight. Understanding their operation is essential for modern aviation.',
          sections: [
            { title: 'Brayton Cycle', content: '**The Jet Engine Thermodynamic Cycle:**\n\n1. **Compression:** Air compressed (pressure rises)\n2. **Combustion:** Fuel added, constant pressure burn\n3. **Expansion:** Hot gas expands through turbine\n4. **Exhaust:** High-velocity jet produces thrust\n\n**Thrust Equation:**\nF = ṁ(Ve - V0) + (Pe - P0)Ae\n\nSimplified: F = ṁ × ΔV' },
            { title: 'Engine Components', content: '**Inlet:** Slows air, increases pressure\n**Compressor:** Raises pressure 20-40:1\n**Combustor:** Burns fuel at ~2000°C\n**Turbine:** Extracts power for compressor\n**Nozzle:** Accelerates exhaust\n\n**Spool Configuration:**\n- Single spool: Simple\n- Dual spool: N1 (fan), N2 (core)\n- Triple spool: Some Rolls-Royce' },
            { title: 'Turbojet vs Turbofan', content: '**Turbojet:**\n- All air through core\n- High exhaust velocity\n- Efficient at high Mach\n- Loud, fuel hungry at low speed\n\n**Turbofan:**\n- Bypass air around core\n- Lower exhaust velocity\n- More efficient subsonic\n- Quieter\n\n**Bypass Ratio:**\nBPR = Bypass air / Core air\n- Low BPR (1-2): Military\n- High BPR (8-12): Airliners' }
          ],
          keyTakeaways: ['Jet engines follow the Brayton cycle', 'Thrust = mass flow × velocity change', 'High bypass turbofans are most efficient for airliners', 'Bypass ratio affects efficiency and noise'],
          quiz: { questions: [
            { id: 'q1', question: 'Modern airliner bypass ratio:', options: ['0.5:1', '2:1', '8-12:1', '20:1'], correctAnswer: 2, explanation: 'Modern high-bypass turbofans have BPR of 8-12:1.' },
            { id: 'q2', question: 'Compressor pressure ratio:', options: ['2:1', '10:1', '20-40:1', '100:1'], correctAnswer: 2, explanation: 'Modern jet engines compress air 20-40 times.' },
            { id: 'q3', question: 'Turbofans are quieter because:', options: ['Smaller engines', 'Lower exhaust velocity', 'No combustion', 'Electric motors'], correctAnswer: 1, explanation: 'Bypass air has lower velocity, reducing noise.' }
          ]}
        },
        {
          id: 'jet-performance',
          title: 'Jet Engine Performance',
          duration: '25 min', xp: 150,
          description: 'Thrust, efficiency, and operating parameters',
          introduction: 'Understanding jet engine performance helps pilots and engineers optimize aircraft operations.',
          sections: [
            { title: 'Thrust Characteristics', content: '**Thrust vs Speed:**\n- Turbojet: Thrust fairly constant\n- Turbofan: Thrust decreases with speed\n\n**Thrust vs Altitude:**\n- Decreases with air density\n- ~50% at 35,000 ft\n\n**Thrust Settings:**\n- Takeoff: Maximum (time limited)\n- Max Continuous: Unlimited use\n- Climb: Reduced for engine life\n- Cruise: Optimized for efficiency' },
            { title: 'Efficiency Metrics', content: '**Specific Fuel Consumption (SFC):**\nSFC = Fuel flow / Thrust\nUnits: lb/hr/lb or kg/hr/N\n\n**Typical Values:**\n- Turbojet: 0.8-1.0\n- Low BPR turbofan: 0.5-0.7\n- High BPR turbofan: 0.3-0.4\n\n**Thermal Efficiency:**\nη_th = Work out / Heat in\n~40-50% for modern engines\n\n**Propulsive Efficiency:**\nη_p = Thrust power / Jet power' },
            { title: 'Engine Ratings', content: '**Takeoff Thrust:**\n- Maximum rated thrust\n- Time limited (5 minutes)\n- Example: CFM56: 27,000 lbf\n\n**Flat Rating:**\n- Full thrust up to certain temp\n- Above that, thrust decreases\n\n**Derate:**\n- Reduced thrust for engine life\n- Assumed takeoff thrust\n- Saves maintenance costs' }
          ],
          keyTakeaways: ['Thrust decreases with altitude and speed', 'High BPR engines have best SFC', 'Takeoff thrust is time-limited', 'Derate extends engine life'],
          quiz: { questions: [
            { id: 'q1', question: 'High BPR turbofan SFC:', options: ['0.8-1.0', '0.5-0.7', '0.3-0.4', '0.1-0.2'], correctAnswer: 2, explanation: 'High bypass turbofans achieve SFC of 0.3-0.4 lb/hr/lb.' },
            { id: 'q2', question: 'Takeoff thrust time limit:', options: ['1 minute', '5 minutes', '30 minutes', 'Unlimited'], correctAnswer: 1, explanation: 'Takeoff thrust is typically limited to 5 minutes.' },
            { id: 'q3', question: 'At 35,000 ft, thrust is approximately:', options: ['100%', '75%', '50%', '25%'], correctAnswer: 2, explanation: 'Thrust is roughly 50% of sea level value at 35,000 ft.' }
          ]}
        },
        {
          id: 'engine-systems',
          title: 'Engine Systems & Operation',
          duration: '25 min', xp: 150,
          description: 'Fuel, oil, starting, and control systems',
          introduction: 'Jet engines require sophisticated support systems for reliable operation. Understanding these systems is crucial for safe flight.',
          sections: [
            { title: 'Fuel System', content: '**Jet Fuel Types:**\n- Jet A: Commercial (freeze -40°C)\n- Jet A-1: International (-47°C)\n- JP-8: Military\n\n**Fuel System Components:**\n- Tanks (wing, center)\n- Boost pumps\n- Fuel heaters\n- Fuel control unit (FCU)\n\n**Fuel Flow:**\n- Cruise: 2,000-3,000 lb/hr per engine\n- Takeoff: 5,000-8,000 lb/hr' },
            { title: 'Oil System', content: '**Functions:**\n- Lubrication\n- Cooling\n- Cleaning\n\n**Dry Sump System:**\n- Oil stored in tank\n- Pumped to bearings\n- Scavenged back to tank\n\n**Oil Consumption:**\n- Normal: 0.1-0.5 qt/hr\n- Monitored for trends\n\n**Temperature Limits:**\n- Max: ~150°C\n- Indicates bearing health' },
            { title: 'Starting & Control', content: '**Starting Sequence:**\n1. Starter motor spins engine\n2. Ignition activated\n3. Fuel introduced\n4. Light-off occurs\n5. Engine accelerates to idle\n\n**FADEC:**\nFull Authority Digital Engine Control\n- Computer controls all parameters\n- Optimizes performance\n- Protects engine limits\n- Redundant channels' }
          ],
          keyTakeaways: ['Jet A is standard commercial fuel', 'Dry sump oil system with external tank', 'FADEC provides automatic engine control', 'Oil consumption trends indicate engine health'],
          quiz: { questions: [
            { id: 'q1', question: 'FADEC stands for:', options: ['Fast Acting Digital Engine Control', 'Full Authority Digital Engine Control', 'Fuel And Digital Engine Computer', 'Flight Automated Digital Engine Control'], correctAnswer: 1, explanation: 'FADEC = Full Authority Digital Engine Control.' },
            { id: 'q2', question: 'Jet A freeze point:', options: ['-20°C', '-40°C', '-60°C', '-80°C'], correctAnswer: 1, explanation: 'Jet A freezes at -40°C (-40°F).' },
            { id: 'q3', question: 'Normal oil consumption:', options: ['0 qt/hr', '0.1-0.5 qt/hr', '2-3 qt/hr', '5+ qt/hr'], correctAnswer: 1, explanation: 'Normal jet engine oil consumption is 0.1-0.5 quarts per hour.' }
          ]}
        }
      ]
    }
  ]
};

export default section2Propulsion;
