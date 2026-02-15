// Section 8: Maintenance & Diagnostics - 5 Deep Lessons
export const section8Maintenance = {
    id: 'maintenance-diagnostics',
    title: 'Unit 8: Maintenance & Diagnostics',
    description: 'The science of troubleshooting and vehicle longevity',
    icon: '🛠️',
    color: 'from-orange-400 to-red-600',
    units: [{
        id: 'automotive-service',
        title: 'The Diagnostic Protocol',
        description: 'Mastering the tools and logic of vehicle repair',
        lessons: [
            {
                id: 'obd2-diagnostics-logic',
                title: 'OBD-II: Reading the Digital Mind',
                duration: '15 min', xp: 200,
                description: 'DTCs, Freeze Frames, and Mode $06 data',
                aiTutor: true,
                introduction: "When a car has a problem, it doesn't just turn on a light; it records a 'Diary' of exactly what happened. This is **OBD-II** (On-Board Diagnostics). This lesson explains how to read the codes and, more importantly, how to interpret the 'Freeze Frame' data to find an intermittent bug.",
                sections: [
                    { title: '🎯 The DTC: A Five-Character Language', content: "**Decoding the Code**\n\nEvery Diagnostic Trouble Code (DTC) has a meaning:\n- **First Letter:** P (Powertrain), C (Chassis), B (Body), U (Network).\n- **Second Digit:** 0 (Standard/Generic), 1 (Manufacturer Specific).\n- **Example (P0301):** P (Engine) + 0 (Standard) + 3 (Ignition System) + 01 (Cylinder 1). This tells you Cylinder 1 is misfiring. It doesn't tell you *why*, just *where*." },
                    { title: '🔧 Freeze Frames: A Snapshot in Time', content: "**The Crime Scene Investigation**\n\nA code might trigger while you are driving at 100 km/h in the rain. \n- **The Freeze Frame:** The computer saves a 'snapshot' of every sensor at the exact millisecond the code was set. \n- You can see: RPM, Engine Temp, Vehicle Speed, and Fuel Trim. \n- **Logic:** If a misfire only happens when the Engine Temp is high but RPM is low, you know it's likely a heat-soaked ignition coil, not a spark plug." },
                    { title: '📐 Readiness Monitors', content: "**The EPA Gatekeeper**\n\nYou can't just clear a 'Check Engine Light' to pass an emissions test. \n- **Readiness Monitors:** The car must run a series of 'Self-Tests' while you drive (e.g. testing the Catalytic Converter). \n- These can take 50 miles of driving to complete. If you clear the codes, the car reports 'Not Ready,' and the inspector will fail you automatically." },
                    { title: '🚀 Mode $06: The Inner Secrets', section: 'Advanced Diagnostics', content: "**Seeing the Future**\n\n- **Mode $06** allows you to see the actual PASS/FAIL numbers. \n- **Example:** A cylinder might fail if it misfires 100 times. Mode $06 shows that Cylinder 2 has misfired 95 times. \n- The 'Check Engine Light' isn't on yet, but you can see the component is about to fail. This is 'Predictive Maintenance' for professional technicians." },
                    { title: '🧪 OBD-II Practice', content: "**P1:** What is 'Limp Mode'?\n*Answer: A safety state where the ECU detects a major failure (like a transmission sensor). It limits the engine to 2,500 RPM and stays in 3rd gear to prevent the car from destroying itself while allowing you to 'Limp' home.*\n\n**P2:** What is the difference between a 'Pending' and 'Confirmed' code?\n*Answer: A 'Pending' code happens once. The computer waits to see if it happens again. If it does, it becomes 'Confirmed' and turns on the light. This prevents 'glitches' from annoying the driver.*\n\n**P3:** Where is the OBD-II port?\n*Answer: Usually within 2 feet of the steering wheel. Standardized in 1996, it allows any mechanic in the world to talk to any car using a standard plug.*\n\n**P4:** What is 'Fuel Trim' in diagnostics?\n*Answer: If the computer is adding 20% more fuel (Positive Trim), it means there is likely a vacuum leak (too much air). If it is subtracting fuel (Negative Trim), an injector might be stuck open.*\n\n**P5:** Can you use OBD-II on an EV?\n*Answer: Yes. While there is no 'emission' system, EVs use it to report Battery Health (SoH), Cell Balancing errors, and Inverter temperature.*" }
                ],
                keyTakeaways: ['DTCs provide a standardized language for identifying vehicle system faults', 'Freeze Frame data captures a snapshot of sensor values at the moment of failure', 'Readiness monitors prevent the simple clearing of codes to bypass emissions tests', 'Mode $06 data provides raw test values for predictive component analysis', 'OBD-II is a universal standard for all cars manufactured after 1996'],
                vocabulary: [
                    { term: 'DTC', definition: 'Diagnostic Trouble Code' },
                    { term: 'Freeze Frame', definition: 'A snapshot of engine data stored when a fault is detected' },
                    { term: 'Readiness Monitor', definition: 'A background self-test the ECU runs on emissions systems' },
                    { term: 'Mode $06', definition: 'A diagnostic mode for accessing results of non-continuous monitoring tests' },
                    { term: 'Fuel Trim', definition: 'The ECU’s adjustment to fuel delivery to maintain stoichiometry' }
                ],
                quiz: {
                    questions: [
                        { id: 'q1', question: 'In the code P0301, what does the "P" stand for?', options: ['Power', 'Powertrain (Engine/Trans)', 'Plastic', 'Pressure'], correctAnswer: 1, explanation: 'P codes refer to the engine and transmission systems.' },
                        { id: 'q2', question: 'Why is "Freeze Frame" data valuable to a mechanic?', options: ['It stops the car from moving', 'It reveals the exact sensor conditions when the error happened', 'It makes the car colder', 'It saves gas'], correctAnswer: 1, explanation: 'Knowing the engine temp and speed at the time of failure helps find the root cause.' },
                        { id: 'q3', question: 'If you clear your codes, why will you fail an emissions test immediately?', options: ['The car is too quiet', 'The "Readiness Monitors" will report "Not Ready"', 'The car will be too fast', 'The battery is dead'], correctAnswer: 1, explanation: 'The car must prove it has successfully tested its own systems via driving.' },
                        { id: 'q4', question: 'A "Pending" code means:', options: ['The engine has exploded', 'A fault was detected once, but needs to happen again to turn on the light', 'The car is waiting for gas', 'Maintenance is free'], correctAnswer: 1, explanation: 'Pending codes prevent temporary glitches from triggering the Check Engine Light.' },
                        { id: 'q5', question: 'Which tool allows you to see the "limits" of a component before it fails?', options: ['The Radio', 'Mode $06 Data', 'A hammer', 'The speedometer'], correctAnswer: 1, explanation: 'Mode $06 shows raw data values compared to their pass/fail thresholds.' }
                    ]
                }
            },
            {
                id: 'fault-tree-analysis-logic',
                title: 'Troubleshooting: Fault Tree Analysis',
                duration: '15 min', xp: 200,
                description: 'The logical "Why" behind mechanical failure',
                aiTutor: true,
                introduction: "Mechanical engineering isn't just about turning wrenches; it’s about **Logic**. When a car 'Won't Start,' there are 100 possibilities. **Fault Tree Analysis (FTA)** is the systematic way to narrow them down from 100 to 1 without guessing.",
                sections: [
                    { title: '🎯 The Top Event: Define the Failure', content: "**Start at the End**\n\nIn FTA, you start with the outcome (e.g., 'Engine will not crank'). \n- You then move DOWN to the immediate causes: 'Starter motor not turning' or 'Engine physically seized.' \n- By testing these two, you immediately eliminate 50% of the possibilities. This is the 'Deductive' method used by Elite Formula 1 and Aerospace engineers." },
                    { title: '🔧 The Big Three: Air, Fuel, Spark', content: "**The Triangle of Life**\n\nFor any ICE engine to run, it needs three things. To troubleshoot 'Crank but no Start':\n1. **Spark:** Check the ignition coil. \n2. **Fuel:** Check if the fuel pump is 'Whirring' when you turn the key. \n3. **Air (Compression):** Check if the timing belt is broken. \n\nIf you have all three, the engine HAS to start. If it doesn't, you have a 'Timing' or 'Logic' issue." },
                    { title: '📐 Symptom Correlation', content: "**Pattern Recognition**\n\n- **Symptom:** 'Car vibrates ONLY at 100 km/h.'\n- **Logic:** If it was the engine, it would vibrate at a specific RPM, not speed. Since it is speed-dependent, the fault MUST be in the 'Rotating Mass' of the wheels, tires, or driveshaft. \n- Narrowing down by *when* a symptom occurs is the fastest way to find a ghost in the machine." },
                    { title: '🚀 Root Cause Analysis (RCA)', section: 'The Five Whys', content: "**Fixing the Source**\n\n- 'The tire is flat.' Why? 'A nail hit it.' Why? 'There is construction at the factory.' \n- If you just fix the tire, it will happen again. \n- In engineering maintenance, we look for 'Systemic' failures. Is the part failing because it's weak, or because another part (like a bad radiator) is making it too hot?" },
                    { title: '🧪 FTA Practice', content: "**P1:** What is an 'Intermittent' fault?\n*Answer: The hardest to find. A problem that comes and goes. Technicians often use 'Wiggle Tests' — physically shaking the wires while the car is running to see if the engine stumbles, indicating a broken copper strand inside the insulation.*\n\n**P2:** What is 'Voltage Drop' testing?\n*Answer: The 'Golden Rule' of electrical diagnostics. You measure the voltage AT the component while it's on. If the battery has 12V but the pump only has 9V, you have a high-resistance 'choke point' in a wire somewhere.*\n\n**P3:** What is a 'Technical Service Bulletin' (TSB)?\n*Answer: A 'Cheat Sheet' from the manufacturer. If 1,000 people have the same weird vibration, the factory writes a TSB telling every mechanic exactly how to fix it.*\n\n**P4:** What is 'Paraffinning' in Diesel engines?\n*Answer: In cold weather, diesel fuel turns into 'Wax.' The car won't start because the fuel can't fit through the filter. The FTA would lead you to 'Temperature' as the root cause.*\n\n**P5:** Can you diagnose a car with your ears?\n*Answer: Yes. 'Chirp' = Loose belt. 'Clunk' = Bad bushing. 'Hiss' = Vacuum leak. Sound is a high-frequency vibration that points directly to the moving part that is failing.*" }
                ],
                keyTakeaways: ['FTA uses a deductive process to narrow down failures from top-level symptoms', 'Combustion requires the "Big Three": Air, Fuel, and Spark', 'Speed-dependent symptoms point to drivetrain/wheels; RPM-dependent to the engine', 'Root Cause Analysis (RCA) seeks to prevent repeat failures by fixing the "system"', 'Voltage drop testing is the most effective way to find hidden electrical resistance'],
                vocabulary: [
                    { term: 'FTA', definition: 'Fault Tree Analysis — a top-down, deductive failure analysis' },
                    { term: 'RCA', definition: 'Root Cause Analysis — identifying the origin of a problem' },
                    { term: 'Compression', definition: 'The pressure generated in the cylinder during the upstroke' },
                    { term: 'Voltage Drop', definition: 'The loss of electrical potential as current flows through a resistance' },
                    { term: 'TSB', definition: 'Technical Service Bulletin — a document issued by a manufacturer for common repairs' }
                ],
                quiz: {
                    questions: [
                        { id: 'q1', question: 'In Fault Tree Analysis, you start with:', options: ['The smallest part', 'The final failure symptom (Top Event)', 'The price of the car', 'The owner’s name'], correctAnswer: 1, explanation: 'Moving from the effect back to the cause is the deductive logic of FTA.' },
                        { id: 'q2', question: 'An engine that "Cranks but won’t start" is missing one of which three things?', options: ['Oil, Water, Air', 'Air, Fuel, Spark', 'Radio, GPS, Bluetooth', 'Lights, Wipers, Horn'], correctAnswer: 1, explanation: 'These are the three mandatory elements for internal combustion.' },
                        { id: 'q3', question: 'A vibration that happens only at 60mph regardless of engine RPM points to:', options: ['A bad spark plug', 'The wheels or tires', 'Low oil', 'A broken radio'], correctAnswer: 1, explanation: 'Tire/wheel issues are speed-dependent, while engine issues are RPM-dependent.' },
                        { id: 'q4', question: 'The "Five Whys" is a technique used in:', options: ['Painting', 'Root Cause Analysis (RCA)', 'Driving fast', 'Washing the car'], correctAnswer: 1, explanation: 'Asking "Why" repeatedly helps you find the underlying system failure.' },
                        { id: 'q5', question: 'What does a "Hissing" sound from the engine usually mean?', options: ['A snake is inside', 'A vacuum leak (air escaping/entering a hose)', 'Low battery', 'Flat tire'], correctAnswer: 1, explanation: 'Vacuum leaks create a distinct hissing sound as air is pulled into a high-vacuum area.' }
                    ]
                }
            },
            {
                id: 'preventive-maintenance-fluids-filters',
                title: 'Preventive Maintenance: Fluids & Filters',
                duration: '15 min', xp: 200,
                description: 'The chemistry of longevity: Oil, Coolant, and Filtration',
                aiTutor: true,
                introduction: "Cars don't 'break'; they 'wear out.' Preventive maintenance is the act of replacing sacrificial parts (Filters and Fluids) before they cause permanent damage to a $10,000 engine. This lesson covers the molecular engineering of engine oil and the 'Lifeblood' of your vehicle.",
                sections: [
                    { title: '🎯 Engine Oil: The Liquid Component', content: "**More than just Slippery**\n\nEngine oil has four jobs:\n1. **Lubricate:** Prevent metal-on-metal contact.\n2. **Cool:** Carry heat away from the pistons.\n3. **Clean:** Using 'Detergents' to keep carbon from sticking to parts.\n4. **Seal:** Helping the piston rings seal against the cylinder walls.\n\n**Viscosity (e.g. 5W-30):** The first number (5W) is how it flows when COLD (Winter). The second (30) is how it flows when HOT. Modern engines use very thin oil (0W-20) to reduce friction and save fuel." },
                    { title: '🔧 The Filtration Barrier', content: "**Capturing Microns**\n\nFilters are 'Sacrificial' walls. \n- **Oil Filter:** Catches microscopic bits of metal and carbon. \n- **Air Filter:** An engine 'breathes' 10,000 liters of air for every 1 liter of gas. A single grain of sand can scratch a cylinder wall, so the air filter must catch 99% of dust down to 5 microns (invisible to the human eye)." },
                    { title: '📐 Coolant: The PH Balance', content: "**Heat Transfer and Corrosion**\n\n'Antifreeze' isn't just for cold. It contains **Corrosion Inhibitors**. \n- Inside an engine, different metals (Aluminum and Iron) touch. Without coolant, this creates a 'Battery' effect that would eat the engine from the inside out. \n- **Flush:** Over time, the coolant becomes 'Acidic.' If you don't change it, it will eat through your radiator and head gasket." },
                    { title: '🚀 Brake Fluid: The Non-Compressible Link', section: 'Safety Chemistry', content: "**Hygroscopic Reality**\n\nBrake fluid is **Hygroscopic** — it absorbs water from the air. \n- **The Risk:** Water boils at 100°C. Brake fluid boils at 250°C. \n- If your old fluid has 3% water, and you brake hard down a hill, the water turns to STEAM. You can't compress a liquid, but you CAN compress steam. Your brake pedal will go to the floor, and the car won't stop." },
                    { title: '🧪 Maintenance Practice', content: "**P1:** What does 'Synthetic' oil really mean?\n*Answer: Standard oil is made of 'shaggy' molecules of different sizes. Synthetic oil is engineered so every single molecule is the exact same size and shape. This makes it much harder to break down under extreme heat.*\n\n**P2:** What is 'Oil Dilution'?\n*Answer: When gasoline leaks past the rings and mixes with the oil. This happens most in short city drives in winter where the engine never gets hot enough to 'evaporate' the gas out of the oil.*\n\n**P3:** Why should you change your 'Cabin Air Filter'?\n*Answer: For your lungs. It catches pollen, exhaust fumes, and dust before they reach the AC vents. A clogged one makes your car smell musty and reduces the power of the heater.*\n\n**P4:** What is 'Lifetime Fluid'?\n*Answer: A marketing trick. No fluid lasts forever. While a transmission might not need a change for 100,000 miles, 'Lifetime' usually just means 'Until the warranty expires.'*\n\n**P5:** Can you 'Overfill' an engine with oil?\n*Answer: Yes! If the oil level is too high, the spinning crankshaft will 'whip' it into a froth (bubbles). Air bubbles don't lubricate, so overfilling can actually melt your engine just as fast as underfilling.*" }
                ],
                keyTakeaways: ['Engine oil lubricates, cools, cleans, and seals the internal components', 'Viscosity ratings (e.g., 5W-30) define how oil flows at different temperatures', 'Filters must capture particles as small as 5 microns to prevent engine wear', 'Coolant prevents "Galvanic Corrosion" between different engine metals', 'Brake fluid must be changed because it absorbs water, which can boil and cause brake failure'],
                vocabulary: [
                    { term: 'Viscosity', definition: 'The measure of a fluid’s resistance to flow' },
                    { term: 'Hygroscopic', definition: 'The property of a substance to absorb moisture from the air' },
                    { term: 'Synthetic', definition: 'Chemically engineered oil with uniform molecular structure' },
                    { term: 'Micron', definition: 'One-millionth of a meter — used to measure filter efficiency' },
                    { term: 'Corrosion Inhibitor', definition: 'A chemical additive that prevents rust and oxidation' }
                ],
                quiz: {
                    questions: [
                        { id: 'q1', question: 'What is the "First Job" of engine oil?', options: ['To make the car smell good', 'To prevent metal-on-metal contact via lubrication', 'To make the car heavier', 'To paint the engine'], correctAnswer: 1, explanation: 'Lubrication is the primary defense against engine friction.' },
                        { id: 'q2', question: 'An oil rated "0W-20" flows _______ than "20W-50" in the winter.', options: ['Slower', 'Faster/Easier', 'The same', 'It freezes'], correctAnswer: 1, explanation: 'The lower the "W" (Winter) number, the better it flows at low temperatures.' },
                        { id: 'q3', question: 'Why is "Hygroscopic" brake fluid dangerous after 2 years?', options: ['It turns blue', 'It has absorbed water, which could boil into steam and cause brake failure', 'It gets too slippery', 'It smells bad'], correctAnswer: 1, explanation: 'Water in the lines creates gas pockets when hot, making the brakes non-functional.' },
                        { id: 'q4', question: 'A clogged air filter will MOST affect your:', options: ['Radio', 'Fuel economy and engine power', 'Tire pressure', 'Seat comfort'], correctAnswer: 1, explanation: 'Engines need massive amounts of air; a clog is like trying to run while breathing through a straw.' },
                        { id: 'q5', question: 'The "Coolant Flush" is necessary because:', options: ['The color fades', 'The corrosion inhibitors wear out and the fluid becomes acidic', 'To save on gas', 'The radiator gets too big'], correctAnswer: 1, explanation: 'Old coolant starts eating the internal metal parts of the engine.' }
                    ]
                }
            },
            {
                id: 'tire-brake-wear-service',
                title: 'Tires & Brakes: Wear Indicators',
                duration: '15 min', xp: 200,
                description: 'How to read the health of your contact points',
                aiTutor: true,
                introduction: "Tires and brakes are designed to 'Die' for you. They are consumable parts that wear down so your more expensive car (and your body) stay safe. This lesson covers how to read 'Wear Bars,' 'Brake Squealers,' and tire 'Cupping.'",
                sections: [
                    { title: '🎯 Tire Tread: The Wear Bars', content: "**The Legal Minimum**\n\nInside the grooves of every tire are small rubber bridges called **Wear Bars**. \n- When the tread is level with these bars, the tire is at **2/32nds of an inch** (1.6mm).\n- **The Risk:** At this level, the tire can no longer move water. In the rain, you will hydroplane at city speeds. Engineers recommend replacing tires at 4/32nds for safety." },
                    { title: '🔧 Alignment & Tire Patterns', content: "**The Road’s Fingerprint**\n\n- **Wear on Both Edges:** Tires are under-inflated.\n- **Wear in the Center:** Tires are over-inflated.\n- **Wear on ONE edge (Inner or Outer):** The car’s 'Camber' or 'Toe' alignment is wrong. \n- **Cupping (Scalloped dips):** The shocks/struts are dead, letting the tire 'pogo' down the road, creating uneven wear patches." },
                    { title: '📐 Brake Squealers & Sensors', content: "**Hearing the Thinness**\n\n- **Mechanical Squealers:** A small piece of spring steel. When the pads get too thin, the steel touches the rotor and makes a high-pitched 'Shriek.' This isn't a failure; it’s an 'Alarm' designed by engineers.\n- **Electronic Wear Sensors:** A wire embedded in the pad. When the pad wears down, the wire is cut, breaking a circuit and turning on a 'Replace Brakes' light on the dash." },
                    { title: '🚀 Rotor Runout & Glazing', section: 'Surface Science', content: "**Smooth Stopping**\n\n- **Glazing:** If you ride the brakes down a mountain, the pads get so hot the surface turns into 'Glass.' They become too smooth and lose their friction grip. \n- **Runout:** If the rotor is warped (even by 0.05mm), you will feel a 'Pulsing' in the steering wheel during braking. This is often fixed by 'Turning' the rotors on a lathe or replacing them." },
                    { title: '🧪 Tire/Brake Practice', content: "**P1:** What is 'DOT' on a tire?\n*Answer: The 'Birthday.' Tires have 4 numbers (e.g., 2223). This means the tire was made in the 22nd week of 2023. Rubber gets hard and dangerous after 6-10 years, even if it has perfect tread.*\n\n**P2:** Why do some tires wear faster in the front?\n*Answer: 'Rotation.' In FWD cars, the front tires handle steering, braking, AND power. They wear 2x as fast as the rears. You must 'Rotate' them (swap front to back) every 5,000 miles to keep the wear even.*\n\n**P3:** What is a 'Brake Bed-in' procedure?\n*Answer: When you get new pads, you must do several controlled stops from 60 to 10 mph. This transfers a 'film' of pad material onto the rotor, which is necessary for the brakes to work at 100% capacity.*\n\n**P4:** What is 'Uneven Pad Wear'?\n*Answer: If the inner pad is gone but the outer is thick, the 'Caliper Slides' are stuck. The brake 'Clamped' but didn't 'Release' properly.*\n\n**P5:** Can tires 'Bubble'?\n*Answer: Yes! An 'Impact Break.' If you hit a pothole, the internal steel belts can tear. The air pressure then pushes the rubber out into a bubble. This is a 'Time Bomb' and can blow out at any second.*" }
                ],
                keyTakeaways: ['Wear bars denote the 2/32" legal minimum for tire tread', 'Tantamount tire wear patterns reveal underlying inflation or alignment issues', 'Brake squealers are intentional mechanical alarms for pad replacement', "DOT codes reveal the tire's age; rubber degrades regardless of use", 'Regular rotation balances the uneven wear between steering and trailing axles'],
                vocabulary: [
                    { term: 'DOT Code', definition: 'The Department of Transportation code indicating the tire’s manufacturing date' },
                    { term: 'Cupping', definition: 'Uneven tire wear caused by faulty suspension (shocks/struts)' },
                    { term: 'Rotor Runout', definition: 'The amount of side-to-side wobble in a brake rotor' },
                    { term: 'Bed-in', definition: 'The process of seasoning new brake pads and rotors' },
                    { term: 'Wear Bar', definition: 'Raised indicator in tire grooves representing the limit of safe tread' }
                ],
                quiz: {
                    questions: [
                        { id: 'q1', question: 'Tires should generally be replaced when they reach ______ of tread depth.', options: ['2/32nds (The wear bars)', 'Half an inch', 'Only when they pop', 'Every year'], correctAnswer: 0, explanation: 'At the wear bars, the tire can no longer safely clear water.' },
                        { id: 'q2', question: 'Tire "Cupping" (scalloped wear) is a sign of:', options: ['Bad alignment', 'Worn out shocks/struts letting the wheel bounce', 'High speed', 'Low gas'], correctAnswer: 1, explanation: 'Dead shocks let the tire "pogo" on the road, creating high/low spots.' },
                        { id: 'q3', question: 'The "DOT" code on a tire tells you:', options: ['How much it costs', 'Its birth date (Week and Year of manufacture)', 'The car it belongs to', 'The air pressure'], correctAnswer: 1, explanation: 'Tires "age out" due to rubber hardening after about 6 years.' },
                        { id: 'q4', question: 'If you feel a "Pulsating" in the brake pedal, you likely have:', options: ['Warped rotors (Runout)', 'A low battery', 'A dirty windshield', 'New tires'], correctAnswer: 0, explanation: 'Warped or unevenly deposited rotors push the pads back and forth, vibrating the pedal.' },
                        { id: 'q5', question: 'Brake "Squealers" are designed to:', options: ['Annoy the driver', 'Alert the driver that the brake pads are dangerously thin', 'Screech when you go fast', 'Call the police'], correctAnswer: 1, explanation: 'It is a clever mechanical warning system.' }
                    ]
                }
            },
            {
                id: 'advanced-diagnostics-oscilloscope',
                title: 'Advanced Diagnostics: The Oscilloscope',
                duration: '15 min', xp: 200,
                description: 'Seeing electricity: Lab scopes and "The Truth" in waves',
                aiTutor: true,
                introduction: "Sometimes the OBD-II computer lies. It might say 'Crank Sensor Error,' but the sensor is fine — the wire is just 'noisy.' To find these bugs, master technicians use an **Oscilloscope** (Lab Scope). This lesson explains how to 'See' electricity and catch glitches that happen in a millionth of a second.",
                sections: [
                    { title: '🎯 Why a Multimeter isn’t Enough', content: "**The Speed of Data**\n\nA multimeter shows an 'Average' (e.g. 12.4V). \n- If a wire is 'Flickering' on and off 100 times per second, the multimeter will still say 12V. \n- The **Oscilloscope** draws a picture of the voltage over time. You can see the 'Square Wave' of a digital signal or the 'Sine Wave' of a speed sensor. You can see the exact millisecond a wire has a 'glitch.' " },
                    { title: '🔧 Scope Patterns: Ignition and Injectors', content: "**The DNA of a Spark**\n\nBy 'Scoping' an ignition coil, you can see:\n1. **The Dwell:** The time the computer is 'loading' the coil.\n2. **The Firing Event:** The actual spark jumping the gap.\n3. **The Burn Time:** How long the fire lasted in the cylinder.\n\nIf the 'Burn Time' is too short, you know the fuel mix is too Lean, even if you are just looking at a wire! The electrical pattern tells you the chemical reality of the engine." },
                    { title: '📐 Measuring the CAN Bus', content: "**Listening to the 'Internet'**\n\nWhen a car's computers stop talking, a scope is the only way to find out why. \n- You look at the 'Mirror Image' of CAN-High and CAN-Low. \n- If the waves are 'Round' instead of 'Square,' there is too much resistance. \n- If the waves are 'Flat,' the wire is shorted to the frame. This 'Physical Layer' diagnosis saves hours of guessing." },
                    { title: '🚀 Pressure Transducers: In-Cylinder Testing', section: 'Diagnostics without teardown', content: "**Seeing Inside the Metal**\n\n- You can screw a 'Pressure Transducer' into a spark plug hole. \n- It sends a voltage signal to the scope representing the exact PSI inside the engine as it runs. \n- **The Benefit:** You can see if a valve is leaking, if the timing belt is off by one 'tooth,' or if the exhaust is clogged — all without ever taking the engine apart." },
                    { title: '🧪 Advanced Diagnostics Practice', content: "**P1:** What is 'Aliasing' on a scope?\n*Answer: When the scope isn't 'Listening' fast enough. If a signal pulses 1,000 times a second but you only check 500 times, the drawing will look totally wrong. Professional scopes sample at 1-20 Million times per second.*\n\n**P2:** What is an 'Inductive Amp Clamp'?\n*Answer: A tool that measures electricity without touching a wire. You 'Clamp' it over the wire, and it uses magnetism to tell the scope how many Amps are flowing. This is used to test starters and fuel pumps while they are buried inside the car.*\n\n**P3:** What is 'Parasitic Draw'?\n*Answer: When a computer doesn't 'Go to sleep' and drains your battery overnight. You use a scope or meter to watch the 'milli-amps' while the car is off.*\n\n**P4:** What is a 'Ghost Signal'?\n*Answer: Interference. If a spark plug wire is too close to a sensor wire, the electricity 'Jumps' across through induction. The computer sees 'Fake' sensor readings, causing the car to run poorly.*\n\n**P5:** Is scope training worth it?\n*Answer: Yes. A standard mechanic guesses parts ($500 for a new ECU). A scope technician finds a 5-cent wire with a green 'crusty' connector. The scope tech is 10x more valuable because they find the 'Root Cause.'*" }
                ],
                keyTakeaways: ['Oscilloscopes visualize electrical signals over time to catch high-speed glitches', 'Multimeters only provide averages, missing intermittent "drop-outs" in digital data', 'Ignition waveforms reveal the internal combustion health through electrical patterns', 'CAN Bus diagnosis requires scoping the physical signals for noise and shorts', 'Pressure transducers allow for non-invasive internal engine health analysis'],
                vocabulary: [
                    { term: 'Oscilloscope', definition: 'An instrument that graphically displays varying signal voltages' },
                    { term: 'Square Wave', definition: 'A non-sinusoidal periodic waveform typical of digital signals' },
                    { term: 'Transducer', definition: 'A device that converts one form of energy (pressure) into another (voltage)' },
                    { term: 'Sample Rate', definition: 'How many times per second a digital instrument "looks" at a signal' },
                    { term: 'Dwell', definition: 'The period during which the primary ignition circuit is closed' }
                ],
                quiz: {
                    questions: [
                        { id: 'q1', question: 'A Multimeter shows the "Average" voltage; an Oscilloscope shows:', options: ['The price of the wire', 'Voltage over Time (a picture of the signal)', 'The color of the electricity', 'Nothing'], correctAnswer: 1, explanation: 'Scopes let you see changes that happen too fast for a human eye or a standard meter.' },
                        { id: 'q2', question: 'How can you test if a valve is leaking without opening the engine?', options: ['Using a Pressure Transducer and a Scope', 'By smelling the exhaust', 'By changing the oil', 'By kicking the tire'], correctAnswer: 0, explanation: 'Transducers turn cylinder pressure into a graph you can analyze for leaks.' },
                        { id: 'q3', question: 'What does a "Perfect" CAN Bus signal look like?', options: ['A messy scribbled line', 'Two "Mirror Image" square waves', 'A flat line at 12V', 'A circle'], correctAnswer: 1, explanation: 'The differential pair should be identical but inverted to cancel noise.' },
                        { id: 'q4', question: 'An "Inductive Amp Clamp" is useful because:', options: ['It’s louder', 'It measures current flow without needing to cut or disconnect any wires', 'It looks cool', 'It makes the car faster'], correctAnswer: 1, explanation: 'It uses the magnetic field of the wire to read the Amps safely.' },
                        { id: 'q5', question: 'Advanced scope technicians are more valuable because:', options: ['They have bigger toolboxes', 'They find the "Root Cause" of a failure rather than just guessing parts', 'They work faster', 'They only work on Ferraris'], correctAnswer: 1, explanation: 'Data-driven diagnostics saves thousands of dollars in "Guesswork" parts.' }
                    ]
                }
            }
        ]
    }]
};

export default section8Maintenance;
