// Section 3: Electronics & Sensors - 6 Lessons (2 units × 3 lessons)

export const section3Electronics = {
  id: 'electronics',
  title: 'Section 3: Electronics & Sensors',
  description: 'Automotive electrical systems and sensors',
  icon: '⚡',
  color: 'from-yellow-500 to-amber-500',
  units: [
    {
      id: 'electrical-systems',
      title: 'Electrical Systems',
      description: 'Power generation and distribution',
      lessons: [
        {
          id: 'electrical-fundamentals',
          title: 'Automotive Electrical Basics',
          duration: '25 min', xp: 150,
          description: '12V systems, batteries, and alternators',
          introduction: 'Modern vehicles contain complex electrical systems powering everything from ignition to infotainment.',
          sections: [
            { title: '12V System', content: "**Why 12V?**\nHistorical standard\nGood balance of safety and wire size\n\n**Actual Voltages:**\n- Battery: 12.6V (fully charged)\n- Running: 13.5-14.5V (alternator)\n- Cranking: 10-11V (under load)\n\n**48V Mild Hybrid:**\nHigher voltage for:\n- Electric supercharger\n- Stronger starter/generator\n- Reduced current (thinner wires)" },
            { title: 'Batteries', content: "**Lead-Acid:**\n- 6 cells × 2.1V = 12.6V\n- CCA: Cold Cranking Amps\n- Reserve capacity: Minutes at 25A\n\n**AGM (Absorbed Glass Mat):**\n- Sealed, maintenance-free\n- Better for start-stop systems\n- More expensive\n\n**Lithium (12V auxiliary):**\n- Lightweight\n- Fast charging\n- Premium vehicles\n\n**State of Charge:**\n12.6V = 100%, 12.4V = 75%, 12.2V = 50%" },
            { title: 'Alternators', content: "**Function:**\nConvert mechanical to electrical energy\nCharge battery, power accessories\n\n**Components:**\n- Rotor (electromagnet, spins)\n- Stator (3-phase windings)\n- Rectifier (AC to DC)\n- Voltage regulator\n\n**Output:**\n- 80-200A typical\n- Regulated to 14.2V\n- Varies with RPM and load\n\n**Smart Alternators:**\nECU-controlled for efficiency\nReduce load during acceleration" }
          ],
          keyTakeaways: ['12.6V is fully charged battery', 'Running voltage is 13.5-14.5V', 'AGM batteries for start-stop', 'Alternator output is regulated'],
          quiz: { questions: [
            { id: 'q1', question: 'Fully charged 12V battery voltage:', options: ['12.0V', '12.6V', '14.0V', '15.0V'], correctAnswer: 1, explanation: 'A fully charged lead-acid battery reads 12.6V.' },
            { id: 'q2', question: 'CCA stands for:', options: ['Current Charging Amps', 'Cold Cranking Amps', 'Continuous Current Amps', 'Cell Capacity Amps'], correctAnswer: 1, explanation: 'CCA = Cold Cranking Amps, battery starting power at 0°F.' },
            { id: 'q3', question: 'Alternator running voltage:', options: ['12.0V', '12.6V', '13.5-14.5V', '18V'], correctAnswer: 2, explanation: 'Alternator regulates output to 13.5-14.5V when running.' }
          ]}
        },
        {
          id: 'wiring-networks',
          title: 'Wiring & Networks',
          duration: '30 min', xp: 175,
          description: 'CAN bus and vehicle networks',
          introduction: 'Modern vehicles use sophisticated networks to connect dozens of electronic control units.',
          sections: [
            { title: 'Wiring Basics', content: "**Wire Gauge:**\nAWG (American Wire Gauge)\nLower number = thicker wire\n- 18 AWG: Signals, lights\n- 14 AWG: Accessories\n- 8-4 AWG: High current\n- 0-4/0 AWG: Battery cables\n\n**Color Coding:**\nVaries by manufacturer\nGround usually black or brown\n\n**Connectors:**\n- Weatherproof for exterior\n- Locking tabs prevent disconnection\n- Gold plating for reliability" },
            { title: 'CAN Bus', content: "**Controller Area Network:**\nStandard vehicle communication protocol\n\n**Characteristics:**\n- Two-wire differential (CAN-H, CAN-L)\n- 500 kbps (high speed)\n- 125 kbps (low speed)\n- Multi-master, priority-based\n\n**Message Structure:**\n- ID (priority)\n- Data (0-8 bytes)\n- CRC (error check)\n\n**Termination:**\n120Ω at each end of bus" },
            { title: 'Other Networks', content: "**LIN (Local Interconnect Network):**\n- Single wire, 20 kbps\n- Simple, low-cost\n- Mirrors, seats, windows\n\n**FlexRay:**\n- 10 Mbps, redundant\n- Safety-critical systems\n- Steer-by-wire, brake-by-wire\n\n**Ethernet:**\n- 100 Mbps - 1 Gbps\n- Cameras, infotainment\n- Future backbone\n\n**MOST (Media Oriented Systems Transport):**\n- Fiber optic\n- Audio/video streaming" }
          ],
          keyTakeaways: ['CAN bus is standard vehicle network', 'Lower AWG = thicker wire', 'LIN for simple subsystems', 'Ethernet for high bandwidth'],
          quiz: { questions: [
            { id: 'q1', question: 'CAN bus speed (high speed):', options: ['20 kbps', '125 kbps', '500 kbps', '10 Mbps'], correctAnswer: 2, explanation: 'High-speed CAN operates at 500 kbps.' },
            { id: 'q2', question: 'CAN bus termination:', options: ['50Ω', '75Ω', '120Ω', '1kΩ'], correctAnswer: 2, explanation: 'CAN bus requires 120Ω termination at each end.' },
            { id: 'q3', question: 'LIN bus is used for:', options: ['Engine control', 'Safety systems', 'Simple subsystems', 'Cameras'], correctAnswer: 2, explanation: 'LIN is used for simple, low-speed subsystems like mirrors and windows.' }
          ]}
        },
        {
          id: 'lighting-systems',
          title: 'Lighting Systems',
          duration: '25 min', xp: 150,
          description: 'Halogen, HID, and LED technology',
          introduction: 'Automotive lighting has evolved from simple bulbs to sophisticated adaptive systems.',
          sections: [
            { title: 'Halogen Lights', content: "**Technology:**\nIncandescent with halogen gas\nFilament at ~2500°C\n\n**Characteristics:**\n- 55-65W typical\n- ~1000 hour life\n- Warm color (3200K)\n- Inexpensive\n\n**Bulb Types:**\n- H1, H4, H7: Headlights\n- H11: Fog lights\n- 9005/9006: US standard\n\n**Limitations:**\nMost energy becomes heat\nLimited brightness" },
            { title: 'HID/Xenon', content: "**High Intensity Discharge:**\nArc between electrodes in xenon gas\n\n**Characteristics:**\n- 35W typical\n- 3× brighter than halogen\n- 2000+ hour life\n- Blue-white (4300-6000K)\n\n**Components:**\n- Bulb (D1S, D2S, etc.)\n- Ballast (igniter)\n- Auto-leveling required\n\n**Disadvantages:**\n- Warm-up time\n- Expensive to replace\n- Can blind oncoming traffic" },
            { title: 'LED & Adaptive', content: "**LED Advantages:**\n- Instant on\n- Very long life (25,000+ hrs)\n- Low power consumption\n- Compact, flexible design\n\n**Matrix LED:**\n- Individual LED control\n- Selective dimming\n- Keep high beams on, shade oncoming cars\n\n**Laser Headlights:**\n- Laser excites phosphor\n- Extreme range (600m)\n- Very compact\n- Premium vehicles only" }
          ],
          keyTakeaways: ['LEDs are most efficient', 'HID needs ballast and leveling', 'Matrix LED enables adaptive high beam', 'Laser lights have extreme range'],
          quiz: { questions: [
            { id: 'q1', question: 'HID lights require:', options: ['Nothing extra', 'Ballast', 'Transformer', 'Inverter'], correctAnswer: 1, explanation: 'HID lights need a ballast to create the initial arc.' },
            { id: 'q2', question: 'LED headlight advantage:', options: ['Cheapest', 'Warmest color', 'Instant on, long life', 'Brightest'], correctAnswer: 2, explanation: 'LEDs turn on instantly and last 25,000+ hours.' },
            { id: 'q3', question: 'Matrix LED can:', options: ['Change color', 'Selectively dim areas', 'Project images', 'Heat windshield'], correctAnswer: 1, explanation: 'Matrix LED can selectively dim to avoid blinding oncoming traffic.' }
          ]}
        }
      ]
    },
    {
      id: 'sensors-adas',
      title: 'Sensors & ADAS',
      description: 'Advanced driver assistance systems',
      lessons: [
        {
          id: 'engine-sensors',
          title: 'Engine & Drivetrain Sensors',
          duration: '25 min', xp: 150,
          description: 'Sensors for engine management',
          introduction: 'Modern engines rely on numerous sensors to optimize performance, efficiency, and emissions.',
          sections: [
            { title: 'Air & Fuel Sensors', content: "**MAF (Mass Air Flow):**\nMeasures intake air mass\nHot-wire or hot-film element\n\n**MAP (Manifold Absolute Pressure):**\nMeasures intake vacuum/boost\nPiezoelectric or capacitive\n\n**O2 Sensors:**\n- Narrowband: Rich/lean only\n- Wideband: Exact AFR\n- Pre-cat and post-cat\n\n**Fuel Pressure:**\nMonitors rail pressure\nCritical for direct injection" },
            { title: 'Position & Speed Sensors', content: "**Crankshaft Position (CKP):**\nTrigger wheel with missing tooth\nMagnetic or Hall effect\nDetermines engine position, RPM\n\n**Camshaft Position (CMP):**\nIdentifies cylinder phase\nNeeded for sequential injection\n\n**Throttle Position (TPS):**\nPotentiometer or Hall effect\nDriver demand input\n\n**Wheel Speed (WSS):**\nFor ABS, TCS, ESC\nTone ring and sensor" },
            { title: 'Temperature & Pressure', content: "**Coolant Temperature (ECT):**\nThermistor (NTC)\nAffects fuel mixture, fan control\n\n**Intake Air Temperature (IAT):**\nAir density calculation\nOften combined with MAF\n\n**Oil Pressure:**\nWarning light or gauge\nCritical for engine protection\n\n**Exhaust Pressure:**\nDPF monitoring (diesel)\nTurbo control" }
          ],
          keyTakeaways: ['MAF measures air mass for fuel calculation', 'CKP determines engine position and RPM', 'O2 sensors enable closed-loop fuel control', 'Wheel speed sensors enable ABS/ESC'],
          quiz: { questions: [
            { id: 'q1', question: 'MAF sensor measures:', options: ['Air temperature', 'Air pressure', 'Air mass', 'Air velocity'], correctAnswer: 2, explanation: 'Mass Air Flow sensor measures the mass of intake air.' },
            { id: 'q2', question: 'Wideband O2 sensor provides:', options: ['Rich/lean only', 'Exact AFR', 'Temperature', 'Pressure'], correctAnswer: 1, explanation: 'Wideband O2 sensors measure exact air-fuel ratio.' },
            { id: 'q3', question: 'CKP sensor uses:', options: ['Thermistor', 'Trigger wheel', 'Pressure diaphragm', 'Light beam'], correctAnswer: 1, explanation: 'Crankshaft position sensor reads a trigger wheel with missing tooth.' }
          ]}
        },
        {
          id: 'adas-sensors',
          title: 'ADAS Sensor Technologies',
          duration: '30 min', xp: 175,
          description: 'Cameras, radar, and lidar',
          introduction: 'Advanced Driver Assistance Systems use multiple sensor types to perceive the environment around the vehicle.',
          sections: [
            { title: 'Camera Systems', content: "**Forward Camera:**\n- Lane detection\n- Traffic sign recognition\n- Pedestrian detection\n- High beam assist\n\n**Surround View:**\n- 4+ cameras\n- 360° bird's eye view\n- Parking assistance\n\n**Driver Monitoring:**\n- IR camera watches driver\n- Detects drowsiness\n- Ensures attention (L2+ autonomy)\n\n**Resolution:**\n1-8 megapixels typical" },
            { title: 'Radar Systems', content: "**Long Range Radar (LRR):**\n- 77 GHz\n- 200+ meter range\n- Adaptive cruise control\n- Forward collision warning\n\n**Short Range Radar (SRR):**\n- 24 or 77 GHz\n- 30-80 meter range\n- Blind spot detection\n- Cross-traffic alert\n\n**Advantages:**\n- Works in all weather\n- Measures velocity directly\n- Relatively inexpensive" },
            { title: 'Lidar & Ultrasonics', content: "**Lidar:**\n- Laser-based ranging\n- 3D point cloud\n- Centimeter accuracy\n- Expensive, weather sensitive\n\n**Types:**\n- Mechanical spinning\n- Solid-state (cheaper, more reliable)\n- Flash lidar\n\n**Ultrasonics:**\n- 40 kHz sound waves\n- 0-5 meter range\n- Parking sensors\n- Low cost, simple" }
          ],
          keyTakeaways: ['Cameras for recognition, radar for ranging', 'Radar works in all weather', 'Lidar provides 3D point cloud', 'Sensor fusion combines all data'],
          quiz: { questions: [
            { id: 'q1', question: 'Long range radar frequency:', options: ['24 GHz', '40 kHz', '77 GHz', '2.4 GHz'], correctAnswer: 2, explanation: 'Long range automotive radar operates at 77 GHz.' },
            { id: 'q2', question: 'Lidar provides:', options: ['2D image', '3D point cloud', 'Velocity only', 'Temperature map'], correctAnswer: 1, explanation: 'Lidar creates a 3D point cloud of the environment.' },
            { id: 'q3', question: 'Ultrasonic sensors are used for:', options: ['Highway driving', 'Parking', 'Lane keeping', 'Cruise control'], correctAnswer: 1, explanation: 'Ultrasonic sensors are used for close-range parking assistance.' }
          ]}
        },
        {
          id: 'adas-features',
          title: 'ADAS Features & Levels',
          duration: '25 min', xp: 150,
          description: 'From cruise control to autonomy',
          introduction: 'ADAS features range from simple warnings to semi-autonomous driving, classified by SAE levels.',
          sections: [
            { title: 'SAE Autonomy Levels', content: "**Level 0:** No automation\nDriver does everything\n\n**Level 1:** Driver assistance\nSteering OR acceleration (not both)\nAdaptive cruise, lane centering\n\n**Level 2:** Partial automation\nSteering AND acceleration\nDriver must monitor\n\n**Level 3:** Conditional automation\nSystem monitors environment\nDriver backup required\n\n**Level 4:** High automation\nNo driver needed in conditions\n\n**Level 5:** Full automation\nNo driver needed ever" },
            { title: 'Common ADAS Features', content: "**Adaptive Cruise Control (ACC):**\nMaintains distance to car ahead\nRadar + camera fusion\n\n**Lane Keep Assist (LKA):**\nSteers to stay in lane\nCamera-based\n\n**Automatic Emergency Braking (AEB):**\nBrakes if collision imminent\nRadar + camera\n\n**Blind Spot Monitoring:**\nWarns of vehicles in blind spot\nRadar-based\n\n**Cross-Traffic Alert:**\nWarns when reversing\nRear radar" },
            { title: 'Sensor Fusion', content: "**Why Fusion?**\nEach sensor has limitations:\n- Camera: Poor in darkness/weather\n- Radar: Can't read signs\n- Lidar: Expensive, weather issues\n- Ultrasonics: Short range only\n\n**Fusion Benefits:**\n- Redundancy (safety)\n- Complementary strengths\n- Higher confidence\n\n**Processing:**\n- Central computer\n- AI/ML algorithms\n- Real-time decisions" }
          ],
          keyTakeaways: ['Level 2 requires driver monitoring', 'Level 3+ system monitors environment', 'Sensor fusion combines multiple inputs', 'AEB is most important safety feature'],
          quiz: { questions: [
            { id: 'q1', question: 'Level 2 automation means:', options: ['No automation', 'Steering OR acceleration', 'Steering AND acceleration', 'Full autonomy'], correctAnswer: 2, explanation: 'Level 2 = system controls both steering and acceleration, driver monitors.' },
            { id: 'q2', question: 'AEB stands for:', options: ['Automatic Engine Braking', 'Automatic Emergency Braking', 'Advanced Electronic Braking', 'Anti-lock Emergency Braking'], correctAnswer: 1, explanation: 'AEB = Automatic Emergency Braking.' },
            { id: 'q3', question: 'Sensor fusion combines:', options: ['Multiple cameras', 'Multiple radars', 'Different sensor types', 'Multiple vehicles'], correctAnswer: 2, explanation: 'Sensor fusion combines data from different sensor types (camera, radar, lidar).' }
          ]}
        }
      ]
    }
  ]
};

export default section3Electronics;
