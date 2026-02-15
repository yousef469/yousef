// Section 3: Flight Controls & Systems - 6 Lessons (2 units × 3 lessons)

export const section3Controls = {
  id: 'controls',
  title: 'Section 3: Flight Controls & Systems',
  description: 'Avionics, hydraulics, and flight control systems',
  icon: '🎛️',
  color: 'from-cyan-500 to-blue-500',
  units: [
    {
      id: 'flight-controls',
      title: 'Flight Control Systems',
      description: 'How pilots control the aircraft',
      lessons: [
        {
          id: 'control-systems',
          title: 'Flight Control System Types',
          duration: '25 min', xp: 150,
          description: 'Manual, hydraulic, and fly-by-wire systems',
          introduction: 'Flight control systems translate pilot inputs into aircraft movement. Modern aircraft use sophisticated systems for precise control.',
          sections: [
            { title: 'Manual Controls', content: '**Direct Mechanical Connection:**\n- Cables, pulleys, push-pull rods\n- Pilot feels aerodynamic forces\n- Light aircraft (Cessna, Piper)\n\n**Advantages:**\n- Simple, reliable\n- Direct feedback\n- No power required\n\n**Limitations:**\n- Heavy forces at high speed\n- Limited to small aircraft' },
            { title: 'Hydraulic Controls', content: '**Power-Assisted:**\n- Hydraulic actuators move surfaces\n- Pilot input controls valves\n- Artificial feel systems\n\n**Fully Powered:**\n- No mechanical backup\n- Multiple hydraulic systems\n- Boeing 747, 777\n\n**Hydraulic Pressure:**\n- Typical: 3,000 psi\n- Provides enormous force\n- Redundant systems essential' },
            { title: 'Fly-By-Wire', content: '**Electronic Control:**\n- Pilot inputs to computers\n- Computers command actuators\n- No mechanical connection\n\n**Advantages:**\n- Weight savings\n- Envelope protection\n- Optimized handling\n- Reduced pilot workload\n\n**Examples:**\n- Airbus A320 (first FBW airliner)\n- Boeing 777, 787\n- F-16, F-22 (military)' }
          ],
          keyTakeaways: ['Manual controls use cables and rods', 'Hydraulics provide power assistance', 'Fly-by-wire uses computers for control', 'Modern aircraft have multiple redundant systems'],
          quiz: { questions: [
            { id: 'q1', question: 'First fly-by-wire airliner:', options: ['Boeing 747', 'Airbus A320', 'Boeing 777', 'Concorde'], correctAnswer: 1, explanation: 'The Airbus A320 was the first commercial fly-by-wire airliner.' },
            { id: 'q2', question: 'Typical hydraulic pressure:', options: ['500 psi', '1,500 psi', '3,000 psi', '10,000 psi'], correctAnswer: 2, explanation: 'Aircraft hydraulic systems typically operate at 3,000 psi.' },
            { id: 'q3', question: 'Fly-by-wire advantage:', options: ['Simpler design', 'Envelope protection', 'Lower cost', 'Heavier structure'], correctAnswer: 1, explanation: 'FBW computers can prevent pilots from exceeding aircraft limits.' }
          ]}
        },
        {
          id: 'autopilot',
          title: 'Autopilot & Autoflight',
          duration: '30 min', xp: 175,
          description: 'Automatic flight control systems',
          introduction: 'Autopilot systems reduce pilot workload and enable precise navigation. Modern autoflight can handle entire flights from takeoff to landing.',
          sections: [
            { title: 'Autopilot Basics', content: '**What Autopilot Does:**\n- Maintains heading, altitude, speed\n- Follows navigation routes\n- Executes approaches\n\n**Basic Modes:**\n- Heading hold\n- Altitude hold\n- Vertical speed\n- IAS/Mach hold\n\n**Engagement:**\n- Minimum altitude requirements\n- System checks before engage\n- Pilot always in command' },
            { title: 'Flight Management System', content: '**FMS Functions:**\n- Navigation database\n- Performance calculations\n- Fuel management\n- Route planning\n\n**LNAV:** Lateral navigation\n- Follows programmed route\n- Intercepts airways, approaches\n\n**VNAV:** Vertical navigation\n- Climbs, descents, level-offs\n- Speed management\n- Fuel optimization' },
            { title: 'Autoland', content: '**Categories:**\n- CAT I: 200 ft decision height\n- CAT II: 100 ft decision height\n- CAT III: Below 100 ft or zero\n\n**Requirements:**\n- Dual/triple autopilot\n- ILS or GLS approach\n- Certified aircraft & crew\n\n**CAT IIIc:**\n- Zero visibility\n- No decision height\n- Automatic rollout' }
          ],
          keyTakeaways: ['Autopilot maintains heading, altitude, speed', 'FMS handles navigation and performance', 'Autoland enables zero-visibility landings', 'Pilot always has final authority'],
          quiz: { questions: [
            { id: 'q1', question: 'CAT IIIc allows:', options: ['200 ft minimums', '100 ft minimums', 'Zero visibility landing', 'Visual approaches only'], correctAnswer: 2, explanation: 'CAT IIIc permits landing with zero visibility and no decision height.' },
            { id: 'q2', question: 'LNAV controls:', options: ['Vertical path', 'Lateral path', 'Speed', 'Thrust'], correctAnswer: 1, explanation: 'LNAV (Lateral Navigation) controls the horizontal flight path.' },
            { id: 'q3', question: 'FMS primary function:', options: ['Engine control', 'Navigation & performance', 'Cabin pressure', 'Fuel pumps'], correctAnswer: 1, explanation: 'The FMS manages navigation, performance, and fuel calculations.' }
          ]}
        },
        {
          id: 'stability-augmentation',
          title: 'Stability Augmentation',
          duration: '25 min', xp: 150,
          description: 'Systems that enhance aircraft stability',
          introduction: 'Some aircraft are designed with reduced natural stability for performance. Stability augmentation systems make them flyable.',
          sections: [
            { title: 'Why Augmentation?', content: '**Relaxed Static Stability:**\n- Less stable = more maneuverable\n- Fighter aircraft design\n- Reduced trim drag\n\n**Problem:**\n- Naturally unstable aircraft\n- Impossible to fly manually\n- Requires computer assistance\n\n**Solution:**\n- Stability Augmentation System (SAS)\n- Continuous corrections\n- Faster than human reaction' },
            { title: 'SAS Components', content: '**Sensors:**\n- Rate gyros (angular rates)\n- Accelerometers\n- Air data (speed, altitude)\n- Angle of attack vanes\n\n**Computers:**\n- Process sensor data\n- Calculate corrections\n- Command actuators\n\n**Actuators:**\n- Move control surfaces\n- High bandwidth response\n- Redundant systems' },
            { title: 'Envelope Protection', content: '**What It Prevents:**\n- Stall (angle of attack limit)\n- Overspeed (Vmo/Mmo)\n- Over-g (load factor limits)\n- Bank angle limits\n\n**How It Works:**\n- Monitors flight parameters\n- Limits control authority\n- Automatic recovery\n\n**Airbus Philosophy:**\n- Hard limits (cannot exceed)\n- Pilot cannot override\n\n**Boeing Philosophy:**\n- Soft limits (can override)\n- Pilot has final authority' }
          ],
          keyTakeaways: ['Relaxed stability improves maneuverability', 'SAS makes unstable aircraft flyable', 'Envelope protection prevents exceeding limits', 'Different manufacturers have different philosophies'],
          quiz: { questions: [
            { id: 'q1', question: 'Relaxed stability provides:', options: ['More stability', 'Better maneuverability', 'Lower speed', 'More weight'], correctAnswer: 1, explanation: 'Relaxed stability trades natural stability for improved maneuverability.' },
            { id: 'q2', question: 'Envelope protection prevents:', options: ['Normal flight', 'Exceeding limits', 'Autopilot use', 'Manual control'], correctAnswer: 1, explanation: 'Envelope protection prevents stall, overspeed, and over-g conditions.' },
            { id: 'q3', question: 'Airbus envelope protection:', options: ['Soft limits', 'Hard limits', 'No limits', 'Pilot choice'], correctAnswer: 1, explanation: 'Airbus uses hard limits that cannot be overridden by the pilot.' }
          ]}
        }
      ]
    },
    {
      id: 'aircraft-systems',
      title: 'Aircraft Systems',
      description: 'Electrical, hydraulic, and pneumatic systems',
      lessons: [
        {
          id: 'electrical-systems',
          title: 'Electrical Systems',
          duration: '25 min', xp: 150,
          description: 'Power generation and distribution',
          introduction: 'Modern aircraft depend heavily on electrical power for avionics, lighting, and increasingly for flight controls.',
          sections: [
            { title: 'Power Generation', content: '**AC Generators:**\n- Engine-driven\n- 115V AC, 400 Hz\n- Constant speed drive or variable frequency\n\n**APU Generator:**\n- Auxiliary Power Unit\n- Ground power capability\n- Backup in flight\n\n**Emergency Power:**\n- Ram Air Turbine (RAT)\n- Batteries\n- Essential bus only' },
            { title: 'Distribution', content: '**Bus Architecture:**\n- Main buses (L & R)\n- Essential bus\n- Battery bus\n- Ground service bus\n\n**Load Shedding:**\n- Automatic in emergency\n- Non-essential loads dropped\n- Prioritizes flight-critical\n\n**Typical Loads:**\n- Avionics: 5-10 kW\n- Lighting: 2-5 kW\n- Galley: 50-100 kW' },
            { title: 'More Electric Aircraft', content: '**Trend:**\n- Replace hydraulic/pneumatic with electric\n- Boeing 787 example\n\n**Benefits:**\n- Weight reduction\n- Simpler systems\n- Better efficiency\n- Easier maintenance\n\n**787 Features:**\n- Electric brakes\n- Electric cabin pressurization\n- No bleed air system' }
          ],
          keyTakeaways: ['Aircraft use 115V AC at 400 Hz', 'Multiple buses provide redundancy', 'RAT provides emergency power', 'More electric aircraft trend continues'],
          quiz: { questions: [
            { id: 'q1', question: 'Aircraft AC frequency:', options: ['50 Hz', '60 Hz', '400 Hz', '1000 Hz'], correctAnswer: 2, explanation: 'Aircraft use 400 Hz AC for lighter, more efficient equipment.' },
            { id: 'q2', question: 'RAT provides:', options: ['Normal power', 'Emergency power', 'Ground power', 'No power'], correctAnswer: 1, explanation: 'Ram Air Turbine deploys to provide emergency electrical and hydraulic power.' },
            { id: 'q3', question: 'Boeing 787 innovation:', options: ['More hydraulics', 'More bleed air', 'More electric systems', 'More pneumatics'], correctAnswer: 2, explanation: 'The 787 pioneered more electric aircraft architecture.' }
          ]}
        },
        {
          id: 'hydraulic-systems',
          title: 'Hydraulic Systems',
          duration: '25 min', xp: 150,
          description: 'High-pressure fluid power systems',
          introduction: 'Hydraulic systems provide the muscle for flight controls, landing gear, and brakes. Understanding hydraulics is essential for aircraft operation.',
          sections: [
            { title: 'Hydraulic Basics', content: '**Pascals Law:**\nPressure applied to confined fluid transmits equally in all directions.\n\n**Advantages:**\n- High power density\n- Precise control\n- Reliable\n\n**Fluid:**\n- Skydrol (phosphate ester)\n- Fire resistant\n- Operating temp: -54 to 135°C' },
            { title: 'System Components', content: '**Pumps:**\n- Engine-driven (primary)\n- Electric (backup)\n- 3,000 psi output\n\n**Reservoir:**\n- Stores fluid\n- Pressurized\n- Quantity indication\n\n**Actuators:**\n- Linear (cylinders)\n- Rotary (motors)\n- Move control surfaces, gear' },
            { title: 'Redundancy', content: '**Multiple Systems:**\n- Typically 3 independent systems\n- Each can operate essential functions\n- Cross-feed capability\n\n**Example: Boeing 777**\n- Left, Center, Right systems\n- Each: 3,000 psi, 36 gpm\n- Any two can land aircraft\n\n**Failure Modes:**\n- Leak detection\n- Automatic isolation\n- Manual backup' }
          ],
          keyTakeaways: ['Hydraulics operate at 3,000 psi', 'Skydrol fluid is fire resistant', 'Multiple independent systems for safety', 'Any two systems can land the aircraft'],
          quiz: { questions: [
            { id: 'q1', question: 'Hydraulic fluid type:', options: ['Mineral oil', 'Skydrol', 'Water', 'Kerosene'], correctAnswer: 1, explanation: 'Skydrol (phosphate ester) is used for its fire resistance.' },
            { id: 'q2', question: 'Typical number of hydraulic systems:', options: ['1', '2', '3', '5'], correctAnswer: 2, explanation: 'Most large aircraft have 3 independent hydraulic systems.' },
            { id: 'q3', question: 'Operating pressure:', options: ['500 psi', '1,500 psi', '3,000 psi', '10,000 psi'], correctAnswer: 2, explanation: 'Aircraft hydraulic systems typically operate at 3,000 psi.' }
          ]}
        },
        {
          id: 'environmental-systems',
          title: 'Environmental Control Systems',
          duration: '25 min', xp: 150,
          description: 'Pressurization, air conditioning, and oxygen',
          introduction: 'Environmental systems keep passengers and crew comfortable and alive at high altitudes where conditions are hostile to human life.',
          sections: [
            { title: 'Pressurization', content: '**Why Pressurize?**\n- At 35,000 ft: Only 25% sea level pressure\n- Hypoxia occurs above 10,000 ft\n- Cabin maintained at 8,000 ft equivalent\n\n**Pressure Differential:**\n- ΔP = 8-9 psi typical\n- Outflow valve controls pressure\n- Safety valve prevents over-pressure' },
            { title: 'Air Conditioning', content: '**Bleed Air System:**\n- Hot air from engine compressor\n- Cooled by air cycle machine\n- Mixed with recirculated air\n\n**Pack (Air Cycle Machine):**\n- Compressor\n- Heat exchangers\n- Turbine\n- Cools air to ~15°C\n\n**Temperature Control:**\n- Zone controllers\n- Mixing valves\n- Typical: 22-24°C cabin' },
            { title: 'Oxygen Systems', content: '**Crew Oxygen:**\n- Diluter-demand masks\n- 100% O2 available\n- Quick-don masks\n\n**Passenger Oxygen:**\n- Chemical generators\n- Drop-down masks\n- 12-22 minutes supply\n\n**Emergency Descent:**\n- If pressurization fails\n- Descend to 10,000 ft\n- Oxygen masks deploy automatically' }
          ],
          keyTakeaways: ['Cabin altitude maintained at 8,000 ft', 'Bleed air provides pressurization and cooling', 'Chemical oxygen generators for passengers', 'Emergency descent if pressurization fails'],
          quiz: { questions: [
            { id: 'q1', question: 'Typical cabin altitude:', options: ['Sea level', '5,000 ft', '8,000 ft', '15,000 ft'], correctAnswer: 2, explanation: 'Cabin altitude is maintained at approximately 8,000 ft.' },
            { id: 'q2', question: 'Passenger oxygen duration:', options: ['5 minutes', '12-22 minutes', '1 hour', '4 hours'], correctAnswer: 1, explanation: 'Chemical oxygen generators provide 12-22 minutes of oxygen.' },
            { id: 'q3', question: 'Bleed air comes from:', options: ['APU only', 'Engine compressor', 'Cabin air', 'External source'], correctAnswer: 1, explanation: 'Bleed air is extracted from the engine compressor stages.' }
          ]}
        }
      ]
    }
  ]
};

export default section3Controls;
