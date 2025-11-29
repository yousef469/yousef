// Section 1: Engine & Powertrain Systems - 6 Lessons (2 units × 3 lessons)

export const section1Powertrain = {
  id: 'powertrain',
  title: 'Section 1: Engine & Powertrain',
  description: 'Internal combustion engines and power delivery',
  icon: '⚙️',
  color: 'from-red-500 to-orange-500',
  units: [
    {
      id: 'engines',
      title: 'Internal Combustion Engines',
      description: 'How engines convert fuel to power',
      lessons: [
        {
          id: 'engine-fundamentals',
          title: 'Engine Fundamentals',
          duration: '30 min', xp: 175,
          description: 'Four-stroke cycle and engine components',
          introduction: 'The internal combustion engine has powered vehicles for over a century. Understanding its operation is fundamental to automotive engineering.',
          sections: [
            { title: 'Four-Stroke Cycle', content: "**1. Intake Stroke:**\nPiston moves down, intake valve opens\nAir-fuel mixture enters cylinder\n\n**2. Compression Stroke:**\nBoth valves closed, piston moves up\nMixture compressed (8:1 to 12:1 ratio)\n\n**3. Power Stroke:**\nSpark ignites mixture\nExpanding gases push piston down\n\n**4. Exhaust Stroke:**\nExhaust valve opens\nPiston pushes out burned gases" },
            { title: 'Engine Components', content: "**Block & Cylinders:**\n- Cast iron or aluminum\n- Contains cylinders, coolant passages\n- Inline, V, or flat configurations\n\n**Pistons & Connecting Rods:**\n- Aluminum pistons with rings\n- Rods connect to crankshaft\n\n**Crankshaft:**\n- Converts linear to rotational motion\n- Counterweights for balance\n\n**Camshaft & Valves:**\n- Cam lobes open valves\n- Timing chain/belt syncs with crank" },
            { title: 'Engine Specifications', content: "**Displacement:**\nTotal volume of all cylinders\nV = π/4 × bore² × stroke × cylinders\n\n**Compression Ratio:**\n(V_max + V_clearance) / V_clearance\nHigher = more efficient, needs better fuel\n\n**Bore × Stroke:**\n- Oversquare: bore > stroke (high RPM)\n- Undersquare: stroke > bore (torque)\n\n**Firing Order:**\nSequence cylinders fire\nBalances vibration and power delivery" }
          ],
          keyTakeaways: ['Four strokes: intake, compression, power, exhaust', 'Compression ratio affects efficiency', 'Displacement determines engine size', 'Firing order balances the engine'],
          quiz: { questions: [
            { id: 'q1', question: 'Which stroke produces power?', options: ['Intake', 'Compression', 'Power', 'Exhaust'], correctAnswer: 2, explanation: 'The power stroke is when combustion pushes the piston down.' },
            { id: 'q2', question: 'Higher compression ratio means:', options: ['Less efficiency', 'More efficiency', 'No change', 'Less power'], correctAnswer: 1, explanation: 'Higher compression = more efficient combustion.' },
            { id: 'q3', question: 'Crankshaft converts:', options: ['Rotational to linear', 'Linear to rotational', 'Heat to light', 'AC to DC'], correctAnswer: 1, explanation: 'Crankshaft converts piston linear motion to rotational motion.' }
          ]}
        },
        {
          id: 'fuel-systems',
          title: 'Fuel & Ignition Systems',
          duration: '25 min', xp: 150,
          description: 'Fuel delivery and combustion control',
          introduction: 'Modern fuel and ignition systems precisely control combustion for optimal power, efficiency, and emissions.',
          sections: [
            { title: 'Fuel Injection', content: "**Port Fuel Injection (PFI):**\n- Injector in intake manifold\n- One per cylinder\n- Simple, reliable\n\n**Direct Injection (GDI):**\n- Injector in combustion chamber\n- Higher pressure (200+ bar)\n- Better efficiency, more power\n\n**Fuel Pressure:**\n- PFI: 3-5 bar\n- GDI: 50-200 bar\n- High-pressure pump required" },
            { title: 'Ignition Systems', content: "**Spark Plug:**\n- Creates spark to ignite mixture\n- Gap: 0.7-1.1mm typical\n- Heat range matches engine\n\n**Coil-on-Plug (COP):**\n- Individual coil per cylinder\n- No distributor needed\n- Precise timing control\n\n**Ignition Timing:**\n- Degrees before TDC (BTDC)\n- Advanced for efficiency\n- Retarded to prevent knock" },
            { title: 'Engine Management', content: "**ECU (Engine Control Unit):**\nComputer controlling:\n- Fuel injection timing & duration\n- Ignition timing\n- Variable valve timing\n- Boost pressure (turbo)\n\n**Sensors:**\n- MAF/MAP (air flow/pressure)\n- O2 sensors (exhaust)\n- Knock sensor\n- Coolant/air temp\n\n**Closed-Loop Control:**\nO2 sensor feedback adjusts fuel mixture" }
          ],
          keyTakeaways: ['Direct injection is more efficient', 'ECU controls all engine parameters', 'O2 sensors enable closed-loop control', 'Ignition timing affects power and knock'],
          quiz: { questions: [
            { id: 'q1', question: 'GDI pressure is typically:', options: ['3-5 bar', '10-20 bar', '50-200 bar', '500+ bar'], correctAnswer: 2, explanation: 'Gasoline Direct Injection operates at 50-200 bar.' },
            { id: 'q2', question: 'O2 sensor measures:', options: ['Fuel pressure', 'Exhaust oxygen', 'Air temperature', 'Engine speed'], correctAnswer: 1, explanation: 'O2 sensors measure oxygen in exhaust for fuel mixture control.' },
            { id: 'q3', question: 'Knock sensor detects:', options: ['Engine speed', 'Detonation', 'Oil pressure', 'Coolant temp'], correctAnswer: 1, explanation: 'Knock sensor detects abnormal combustion (detonation/knock).' }
          ]}
        },
        {
          id: 'forced-induction',
          title: 'Turbocharging & Supercharging',
          duration: '25 min', xp: 150,
          description: 'Forced induction for more power',
          introduction: 'Forced induction increases engine power by compressing intake air, allowing more fuel to be burned.',
          sections: [
            { title: 'Turbochargers', content: "**How It Works:**\nExhaust gases spin turbine\nTurbine drives compressor\nCompressor pressurizes intake air\n\n**Components:**\n- Turbine housing (exhaust side)\n- Compressor housing (intake side)\n- Center cartridge (bearings, shaft)\n- Wastegate (boost control)\n\n**Turbo Lag:**\nDelay before boost builds\nSmaller turbos = less lag, less peak power" },
            { title: 'Superchargers', content: "**Types:**\n- Roots: Positive displacement, instant boost\n- Twin-screw: Efficient, expensive\n- Centrifugal: Like turbo, belt-driven\n\n**Advantages:**\n- No lag (mechanically driven)\n- Linear power delivery\n\n**Disadvantages:**\n- Parasitic loss (uses engine power)\n- Less efficient than turbo\n- Belt/gear maintenance" },
            { title: 'Boost & Intercooling', content: "**Boost Pressure:**\nMeasured in PSI or bar above atmospheric\nTypical: 0.5-1.5 bar (7-22 PSI)\n\n**Intercooler:**\nCools compressed air\n- Air-to-air: Simple, effective\n- Air-to-water: Compact, complex\n\n**Why Cool?**\nCooler air = denser = more oxygen\nPrevents detonation\n\n**Charge Pipe:**\nConnects turbo to intercooler to throttle" }
          ],
          keyTakeaways: ['Turbos use exhaust energy', 'Superchargers have no lag', 'Intercoolers increase density', 'Boost is measured above atmospheric'],
          quiz: { questions: [
            { id: 'q1', question: 'Turbo lag is caused by:', options: ['Cold engine', 'Time to spool turbine', 'Low fuel', 'Bad spark plugs'], correctAnswer: 1, explanation: 'Turbo lag is the time needed for exhaust to spin up the turbine.' },
            { id: 'q2', question: 'Supercharger advantage:', options: ['More efficient', 'No parasitic loss', 'No lag', 'Cheaper'], correctAnswer: 2, explanation: 'Superchargers provide instant boost with no lag.' },
            { id: 'q3', question: 'Intercooler purpose:', options: ['Cool engine', 'Cool intake air', 'Cool exhaust', 'Cool oil'], correctAnswer: 1, explanation: 'Intercoolers cool compressed intake air for denser charge.' }
          ]}
        }
      ]
    },
    {
      id: 'transmission',
      title: 'Transmission & Drivetrain',
      description: 'Power delivery to the wheels',
      lessons: [
        {
          id: 'manual-transmission',
          title: 'Manual Transmissions',
          duration: '30 min', xp: 175,
          description: 'Gear ratios and manual shifting',
          introduction: 'Manual transmissions give drivers direct control over gear selection, offering engagement and efficiency.',
          sections: [
            { title: 'Gear Ratios', content: "**Gear Ratio:**\nDriven teeth / Driving teeth\n\n**Example:**\n30 teeth / 10 teeth = 3:1 ratio\n- Input spins 3×, output spins 1×\n- Torque multiplied 3×\n- Speed reduced 3×\n\n**First Gear:**\nHighest ratio (3-4:1)\nMax torque, low speed\n\n**Top Gear:**\nLowest ratio (0.7-1:1)\nCruising efficiency" },
            { title: 'Clutch Operation', content: "**Clutch Components:**\n- Flywheel (attached to engine)\n- Clutch disc (friction material)\n- Pressure plate (clamps disc)\n- Release bearing (disengages)\n\n**Engagement:**\n1. Press pedal → release bearing pushes\n2. Pressure plate releases disc\n3. Engine disconnected from trans\n4. Release pedal → friction engages\n\n**Clutch Slip:**\nPartial engagement for smooth starts" },
            { title: 'Synchromesh', content: "**Problem:**\nGears spinning at different speeds\nCan't mesh without grinding\n\n**Synchronizer:**\n- Brass cone matches speeds\n- Friction slows/speeds gear\n- Then sleeve engages\n\n**Double-Clutch (old method):**\n1. Clutch in, neutral\n2. Clutch out, rev match\n3. Clutch in, select gear\n4. Clutch out\n\nSynchros eliminated this need" }
          ],
          keyTakeaways: ['Lower gears multiply torque', 'Clutch connects/disconnects engine', 'Synchros match gear speeds', 'Gear ratio = driven/driving teeth'],
          quiz: { questions: [
            { id: 'q1', question: '3:1 gear ratio means:', options: ['3× speed', '3× torque', '3× fuel use', '3× RPM'], correctAnswer: 1, explanation: '3:1 ratio multiplies torque by 3 while reducing speed by 3.' },
            { id: 'q2', question: 'Synchromesh purpose:', options: ['Increase power', 'Match gear speeds', 'Cool transmission', 'Reduce noise'], correctAnswer: 1, explanation: 'Synchronizers match gear speeds for smooth shifting.' },
            { id: 'q3', question: 'First gear has:', options: ['Lowest ratio', 'Highest ratio', 'No ratio', '1:1 ratio'], correctAnswer: 1, explanation: 'First gear has the highest ratio for maximum torque multiplication.' }
          ]}
        },
        {
          id: 'automatic-transmission',
          title: 'Automatic Transmissions',
          duration: '30 min', xp: 175,
          description: 'Torque converters and planetary gears',
          introduction: 'Automatic transmissions shift gears without driver input, using hydraulics and electronics for smooth operation.',
          sections: [
            { title: 'Torque Converter', content: "**Components:**\n- Impeller (pump, attached to engine)\n- Turbine (attached to trans input)\n- Stator (redirects fluid)\n\n**Operation:**\n1. Engine spins impeller\n2. Fluid flows to turbine\n3. Turbine drives transmission\n4. Stator multiplies torque\n\n**Lock-up Clutch:**\nMechanically locks at cruise\nEliminates slip for efficiency" },
            { title: 'Planetary Gearsets', content: "**Components:**\n- Sun gear (center)\n- Planet gears (orbit sun)\n- Ring gear (outer)\n- Carrier (holds planets)\n\n**Gear Selection:**\nHold different components:\n- Hold sun → forward reduction\n- Hold ring → forward overdrive\n- Hold carrier → reverse\n\n**Multiple Sets:**\nCombined for 6-10 speeds" },
            { title: 'Shift Control', content: "**Hydraulic Control:**\n- Valve body directs fluid\n- Clutch packs engage gears\n- Bands hold components\n\n**Electronic Control:**\n- TCU (Transmission Control Unit)\n- Solenoids control valves\n- Sensors: speed, throttle, temp\n\n**Shift Points:**\nBased on:\n- Vehicle speed\n- Throttle position\n- Engine load\n- Driver mode selection" }
          ],
          keyTakeaways: ['Torque converter replaces clutch', 'Planetary gears enable multiple ratios', 'Lock-up clutch improves efficiency', 'TCU controls shift points'],
          quiz: { questions: [
            { id: 'q1', question: 'Torque converter uses:', options: ['Gears', 'Fluid coupling', 'Belts', 'Chains'], correctAnswer: 1, explanation: 'Torque converter uses fluid to transfer power.' },
            { id: 'q2', question: 'Planetary gearset has:', options: ['2 components', '3 components', '4 components', '5 components'], correctAnswer: 2, explanation: 'Sun gear, planet gears, ring gear, and carrier = 4 components.' },
            { id: 'q3', question: 'Lock-up clutch purpose:', options: ['Start engine', 'Eliminate slip', 'Reverse gear', 'Park lock'], correctAnswer: 1, explanation: 'Lock-up clutch eliminates torque converter slip for efficiency.' }
          ]}
        },
        {
          id: 'differentials-awd',
          title: 'Differentials & AWD Systems',
          duration: '25 min', xp: 150,
          description: 'Power distribution to wheels',
          introduction: 'Differentials allow wheels to spin at different speeds while transferring power. AWD systems distribute power to all wheels.',
          sections: [
            { title: 'Open Differential', content: "**Purpose:**\nAllow wheels to spin at different speeds\nEssential for turning (outer wheel travels farther)\n\n**Components:**\n- Ring gear (from driveshaft)\n- Spider gears (between axles)\n- Side gears (to each wheel)\n\n**Limitation:**\nPower goes to wheel with least traction\nOne wheel spinning = no forward motion" },
            { title: 'Limited-Slip Differentials', content: "**Types:**\n\n**Clutch-type (most common):**\nFriction clutches limit speed difference\n\n**Torsen:**\nWorm gears bias torque\nNo clutches to wear\n\n**Electronic (eLSD):**\nBrakes spinning wheel\nSimulates LSD effect\n\n**Locking Diff:**\nFully locks axles together\nOff-road use only" },
            { title: 'AWD & 4WD Systems', content: "**4WD (Part-time):**\n- 2WD normally\n- Engage for off-road\n- Transfer case locks front/rear\n\n**AWD (Full-time):**\n- Always powers all wheels\n- Center differential splits power\n- Varies front/rear bias\n\n**Torque Vectoring:**\n- Varies power left/right\n- Improves handling\n- Uses clutches or brakes" }
          ],
          keyTakeaways: ['Differentials allow different wheel speeds', 'LSD prevents single-wheel spin', 'AWD is always engaged', 'Torque vectoring improves handling'],
          quiz: { questions: [
            { id: 'q1', question: 'Open diff sends power to:', options: ['Both wheels equally', 'Wheel with most grip', 'Wheel with least grip', 'Front wheels only'], correctAnswer: 2, explanation: 'Open diff sends power to the wheel with least resistance (least grip).' },
            { id: 'q2', question: 'Torsen diff uses:', options: ['Clutches', 'Worm gears', 'Electronics', 'Chains'], correctAnswer: 1, explanation: 'Torsen uses worm gears to bias torque.' },
            { id: 'q3', question: 'AWD vs 4WD:', options: ['Same thing', 'AWD is part-time', 'AWD is full-time', '4WD is full-time'], correctAnswer: 2, explanation: 'AWD is typically full-time, 4WD is part-time/selectable.' }
          ]}
        }
      ]
    }
  ]
};

export default section1Powertrain;
