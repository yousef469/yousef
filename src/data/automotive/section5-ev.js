// Section 5: EV & Hybrid Systems - 5 Deep Lessons
export const section5EV = {
    id: 'ev-hybrid',
    title: 'Unit 5: EV & Hybrid Systems',
    description: 'The engineering of the electric revolution',
    icon: '🔋',
    color: 'from-green-400 to-blue-500',
    units: [{
        id: 'electric-powertrain',
        title: 'Electric Propulsion',
        description: 'Batteries, Motors, and Power Electronics',
        lessons: [
            {
                id: 'ev-battery-chemistry-bms',
                title: 'Battery Chemistry & Management (BMS)',
                duration: '15 min', xp: 200,
                description: 'Lithium-ion physics and the software that prevents fire',
                aiTutor: true,
                introduction: "An EV battery isn't just a big AA battery. It's a complex chemical factory. This lesson explores the chemistry of Lithium-ion cells and the critical 'Battery Management System' (BMS) that keeps 800 volts of energy stable and safe.",
                sections: [
                    { title: '🎯 Lithium-ion Fundamentals: Anodes & Cathodes', content: "**The Movement of Ions**\n\n- **In an EV Battery:** Lithium ions move from the Negative side (Anode) to the Positive side (Cathode) through a liquid electrolyte to create electricity. \n- **The Cathode (The Secret Sauce):** This is the most expensive part. Modern EVs use chemistries like **NMC** (Nickel Manganese Cobalt) for high power, or **LFP** (Lithium Iron Phosphate) which is cheaper, heavier, but almost impossible to set on fire.\n- **Energy Density:** Gas has 100x the energy density of a battery. To compete, EV engineers must make batteries that are incredibly efficient and lightweight." },
                    { title: '🔧 The BMS: The Digital Guard', content: "**Voltage, Temperature, and Balance**\n\nA battery pack has 7,000+ tiny cells. The BMS is the computer that watches every one of them.\n1. **Cell Balancing:** If one cell is at 4.2V and another is at 4.0V, the BMS bleeds off energy from the high one. If they stay 'out of balance,' the whole pack's range drops significantly.\n2. **Thermal Management:** Batteries hate being hot (degradation) and hate being cold (slow charging). The BMS controls a liquid cooling system that keeps the pack between 20°C and 35°C at all times." },
                    { title: '📐 State of Charge (SoC) vs State of Health (SoH)', content: "**The Prediction Problem**\n\nUnlike a gas tank, you can't 'see' how much electricity is left. \n- **SoC (The Fuel Gauge):** The BMS uses 'Coulomb Counting' (measuring every electron that goes in and out) and 'Open Circuit Voltage' to estimate your range.\n- **SoH (The Age):** Every time you charge, the battery gets slightly 'scarred.' The SoH tracks how much total capacity is left compared to when the car was new. When SoH hits 70%, the battery is usually moved from the car to a 'second life' in house-energy storage." },
                    { title: '🚀 Fast Charging: Ions in a Rush', section: 'Thermal Limits', content: "**The Bottleneck**\n\nWhy does charging slow down after 80%? \n- Think of the battery as a theater. At 10%, there are lots of empty seats (Anode spots). The ions can 'run' in fast. \n- At 80%, most seats are full. To get the last few ions in, they have to walk slowly to find a spot. \n- If you force them in too fast (High Amperage), they 'pile up' and plate onto the anode as metal, which can cause shorthand-circuits and 'Thermal Runaway' (fire)." },
                    { title: '🧪 Battery Practice', content: "**P1:** What is 'Thermal Runaway'?\n*Answer: A chain reaction where a failing cell generates heat, which causes neighbor cells to fail, which generates more heat. Once it starts, it provides its own oxygen chemically and is nearly impossible to put out with water.*\n\n**P2:** Why do most EVs use 400V or 800V systems?\n*Answer: Efficiency. Higher voltage means you need less Current (Amps) to get the same Power (Watts). Less current means you can use thinner, lighter wires and you lose less energy to heat (Power = I²R).*\n\n**P3:** What is a 'Solid-State' battery?\n*Answer: The 'Holy Grail' of EV tech. It replaces the liquid electrolyte with a solid ceramic. It is 2x as dense as current batteries, charges in minutes, and cannot catch fire. It is currently in the late lab/prototype stage.*\n\n**P4:** What is 'C-Rate'?\n*Answer: A measure of how fast a battery is charged or discharged. 1C means the battery is fully charged in 1 hour. 2C is 30 minutes. Drag racers might use a discharge rate of 50C for 10 seconds!*\n\n**P5:** Can you recycle an EV battery?\n*Answer: Yes. Over 95% of the Cobalt, Nickel, and Lithium can be recovered, which is often cheaper and more ethical than mining new materials.*" }
                ],
                keyTakeaways: ['Lithium-ion batteries move ions between anodes and cathodes using an electrolyte', 'The BMS is critical for cell balancing and thermal safety', 'SoC (State of Charge) is an estimation based on current flow and voltage', 'Fast charging is limited by internal resistance and ion "crowding" at high states of charge', '800V architectures allow for faster charging and lighter, more efficient wiring systems'],
                vocabulary: [
                    { term: 'NMC / LFP', definition: 'The two dominant chemical mixes for EV cathodes (Nickel-Manganese-Cobalt and Lithium-Iron-Phosphate)' },
                    { term: 'BMS', definition: 'Battery Management System — the brain of the battery pack' },
                    { term: 'Coulomb Counting', definition: 'A technique to track the state of charge by integrating the current flow over time' },
                    { term: 'Thermal Runaway', definition: 'An unstoppable, self-sustaining fire caused by chemical decomposition' },
                    { term: 'Specific Energy', definition: 'The amount of energy stored per unit of weight (Wh/kg)' }
                ],
                quiz: {
                    questions: [
                        { id: 'q1', question: 'Which cathode chemistry is known for being very safe and long-lasting, though heavier?', options: ['NMC', 'LFP', 'Lead-Acid', 'Potato'], correctAnswer: 1, explanation: 'LFP (Lithium Iron Phosphate) has a very stable chemical structure.' },
                        { id: 'q2', question: 'The BMS performs "Cell Balancing" to:', options: ['Make the car weigh less', 'Ensure every cell in the pack has the same voltage', 'Change the radio', 'Cool the driver'], correctAnswer: 1, explanation: 'Balanced cells prevent one weak cell from limiting the performance of the whole pack.' },
                        { id: 'q3', question: 'Higher voltage (e.g., 800V vs 400V) in an EV primarily allows for:', options: ['Brighter lights', 'Faster charging and thinner/lighter wires', 'Better radio reception', 'More cup holders'], correctAnswer: 1, explanation: 'Higher voltage reduces current, which reduces heat loss (resistance) and cable weight.' },
                        { id: 'q4', question: 'State of Health (SoH) measures:', options: ['How fast the car is', 'The permanent degradation of the battery over time', 'The tire pressure', 'The driver’s heart rate'], correctAnswer: 1, explanation: 'SoH tracks how much of the original capacity remains as the battery ages.' },
                        { id: 'q5', question: 'Fast charging slows down after 80% because:', options: ['The charger gets tired', 'Ions have fewer "empty spots" to inhabit, increasing resistance and heat risk', 'The battery is full', 'Solar flares'], correctAnswer: 1, explanation: 'The final 20% of charge requires slower ion movement to prevent damage.' }
                    ]
                }
            },
            {
                id: 'electric-motors-pmsm-induction',
                title: 'Electric Motors: Induction vs. PMSRM',
                duration: '15 min', xp: 200,
                description: 'Lorentz Force and the engineering of invisible rotation',
                aiTutor: true,
                introduction: "An electric motor has one moving part, zero explosions, and 100% of its torque at 0 RPM. This lesson compares the two kings of EV propulsion: the Induction motor (invented by Tesla) and the Permanent Magnet Synchronous Motor (standard in most modern EVs).",
                sections: [
                    { title: '🎯 The Lorentz Force: Electricity to Motion', content: "**The Physics of Pull**\n\nWhen you pass electricity through a wire in a magnetic field, the wire feels a physical PUSH (The Lorentz Force). \n- In a motor, we arrange these wires in a circle (The **Stator**) and use them to 'drag' a central shaft (The **Rotor**) around. \n- **Frequency Control:** By changing the speed of the electrical 'pulses,' we change the speed of the motor. No transmission is needed; the motor can spin from 0 to 180,000 RPM effortlessly." },
                    { title: '🔧 Induction Motors: Tesla’s Heritage', content: "**Magnetism without Magnets**\n\nInduction motors (AC Induction) use 'Induction' to create a magnetic field in the rotor.\n- **Advantage:** No rare-earth magnets. No Cobalt or Neodymium. It’s just copper and iron. It is also very efficient at high-speed highway cruising. \n- **Disadvantage:** It is slightly less efficient at low speeds because it 'wastes' electricity just to generate the magnetic field." },
                    { title: '📐 Permanent Magnet Motors (PMSRM)', content: "**The Modern Standard**\n\nMost EVs today use Permanent Magnet Motors.\n- **Advantage:** The rotor is ALREADY magnetic (using Neodymium magnets). This means the motor is incredibly efficient at low speeds and stop-and-go traffic.\n- **Carbon Fiber Sleeves:** At 20,000 RPM, the magnets want to fly off the rotor due to centrifugal force. Companies (like Tesla on the Plaid) wrap the rotor in a 'sleeve' of carbon fiber to hold it together." },
                    { title: '🚀 Axial Flux Motors: The Future of Torque', section: 'Pancake Motors', content: "**Redefining the Shape**\n\n- Standard motors are **Radial Flux** (the magnetic field moves out like flower petals). \n- **Axial Flux** motors have the field move forward (like the wheels of a bike). \n- **The Result:** They are 'Pancake' shaped. They are 4x the torque and 1/2 the size of standard motors. Expect to see these inside the actual wheels of future supercars." },
                    { title: '🧪 Motor Practice', content: "**P1:** Why don't EVs have multicourse transmissions?\n*Answer: Because electric motors have a giant 'Power Band.' A gas engine only makes power between 3,000 and 6,000 RPM. An electric motor makes max torque at 0 RPM and can spin up to 20,000 RPM, covering all road speeds with just one gear ratio.*\n\n**P2:** What is 'Regenerative Braking' in the motor?\n*Answer: When you lift your foot, the computer 'reverses' the magnetic field. The wheels start spinning the motor, which turns it into a GENERATOR, pushing electricity back into the battery. It slows the car down while 'making' fuel.*\n\n**P3:** What is 'Cognitive Cogging'?\n*Answer: The 'notchy' feeling in some electric motors. Engineers use 'Offset Rotors' to ensure the magnetic pull is perfectly smooth, which is why EVs are so quiet and vibration-free.*\n\n**P4:** How do you cool a motor?\n*Answer: Liquid cooling. The 'Stator' is surrounded by a jacket of water/glycol. Some high-performance rotors actually spray oil directly onto the spinning copper to keep it from melting during a 0-60 run.*\n\n**P5:** What are 'Hairpin' windings?\n*Answer: Instead of round copper wire, engineers use flat copper 'hairpins.' This allows for much more copper to be packed into the same space, increasing power and efficiency by 5-10%.*" }
                ],
                keyTakeaways: ['Motors use magnetic fields to convert electrical energy into physical "torque"', 'Induction motors use induced magnetism, avoiding expensive rare-earth magnets', 'Permanent Magnet motors (PMSRM) are highly efficient at low speeds', 'Regen braking turns the motor into a generator to capture kinetic energy', 'High-RPM motors require carbon fiber reinforcement to prevent structural failure'],
                vocabulary: [
                    { term: 'Stator', definition: 'The stationary part of an electric motor' },
                    { term: 'Rotor', definition: 'The rotating part of an electric motor' },
                    { term: 'Axial Flux', definition: 'A motor design where the magnetic flux is parallel to the axis of rotation' },
                    { term: 'Lorentz Force', definition: 'The force exerted on a charged particle moving through a magnetic field' },
                    { term: 'Inverter', definition: 'The power electronics that convert DC (battery) to 3-phase AC (motor)' }
                ],
                quiz: {
                    questions: [
                        { id: 'q1', question: 'Which motor type is famous for NOT using rare-earth magnets?', options: ['Permanent Magnet', 'AC Induction', 'Steam Engine', 'Diesel'], correctAnswer: 1, explanation: 'Induction motors use electrical current to "induce" a magnetic field in the rotor.' },
                        { id: 'q2', question: 'Electric motors reach "Maximum Torque" at what RPM?', options: ['0 RPM', '3,000 RPM', '7,000 RPM', 'Only at top speed'], correctAnswer: 0, explanation: 'Unlike gas engines, electric motors pull with full force the instant they turn on.' },
                        { id: 'q3', question: 'In "Regenerative Braking," the motor behaves as a:', options: ['Heater', 'Generator', 'Air pump', 'Radio'], correctAnswer: 1, explanation: 'It captures the car’s kinetic energy and converts it back to electricity.' },
                        { id: 'q4', question: 'Why wrap a motor rotor in a Carbon Fiber sleeve?', options: ['To make it pretty', 'To prevent centrifugal forces from ripping the magnets off at high RPM', 'To keep it warm', 'To block radio waves'], correctAnswer: 1, explanation: 'High-speed rotation (20,000+ RPM) generates massive force that can destroy the rotor.' },
                        { id: 'q5', question: 'The "Inverter" is responsible for:', options: ['Pumping the oil', 'Converting DC battery power into 3-phase AC power for the motor', 'Steering the car', 'Opening the windows'], correctAnswer: 1, explanation: 'The motor needs alternating pulses of electricity to spin; the inverter provides this.' }
                    ]
                }
            },
            {
                id: 'inverters-power-electronics-sic',
                title: 'Inverters & Power Electronics: The Controller',
                duration: '15 min', xp: 200,
                description: 'Silicon Carbide (SiC) and the language of 3-Phase power',
                aiTutor: true,
                introduction: "The battery is DC (Direct Current). The motor is 3-Phase AC (Alternating Current). The Inverter is the 'Translator' that sits between them, switching thousands of Amps of current at 20,000 times per second. This is the most heat-stressed part of an EV.",
                sections: [
                    { title: '🎯 DC to 3-Phase AC: The Switching Magic', content: "**The 6-Switch Bridge**\n\nThe inverter uses a group of 6 massive transistors (IGBTs or MOSFETs). \n- By turning these switches on and off in a specific pattern, it 'fools' the motor into thinking it is receiving a smooth AC wave. \n- **PWM Control:** By changing the 'Pulse Width,' the inverter controls how much torque the motor produces. This is how you can drive a 1,000hp car as slowly and smoothly as a golf cart." },
                    { title: '🔧 Silicon Carbide (SiC): The Game Changer', content: "**Wide Bandgap Semiconductors**\n\nOld inverters used standard Silicon. \n- **The Problem:** Silicon 'wastes' about 5% of energy as heat every time it switches. \n- **SiC Advantage:** Silicon Carbide is much tougher. It can switch faster, survive higher heat, and is 99% efficient. \n- **The Result:** Switching to SiC (like Tesla did in the Model 3) increases EV range by 10% without changing the battery at all." },
                    { title: '📐 The DC-DC Converter', content: "**Stepping Down the Power**\n\nYour EV has an 800V battery, but your phone charger and headlights need 12V. \n- The **DC-DC Converter** acts like a 'Solid State Transformer.' \n- It takes the high-voltage energy and 'steps it down' to charge the small 12V lead-acid or lithium battery that runs the car's computers and lights. This eliminates the need for an Alternator." },
                    { title: '🚀 Thermal Management: Cold Plates', section: 'Taming the Heat', content: "**Extreme Cooling**\n\nBecause the inverter moves so much current, the transistors can reach 150°C in seconds. \n- **The Cold Plate:** The transistors are bolted to a precision-machined aluminum plate with water channels. \n- High-performance inverters (like in Formula E) use 'Direct Cooling' where the fluid actually touches the transistor chips to pull heat away faster." },
                    { title: '🧪 Inverter Practice', content: "**P1:** What is an 'IGBT'?\n*Answer: Insulated Gate Bipolar Transistor. It is the 'Big Switch' used in older or cheaper EVs to control motor current.*\n\n**P2:** Why do inverters make a high-pitched 'Whining' sound?\n*Answer: That is the 'Switching Frequency.' The metal parts of the inverter are physically vibrating 10,000 to 20,000 times per second as the electricity pulses through them.*\n\n**P3:** What is 'Space Vector Modulation' (SVM)?\n*Answer: The mathematical algorithm used by the inverter to calculate exactly which switch to turn on to get the most efficient motor rotation.*\n\n**P4:** What is 'EMI' (Electromagnetic Interference) in an inverter?\n*Answer: Rapid switching creates massive radio noise. If the inverter isn't shielded in a thick aluminum box, it would ruin your radio, GPS, and cell signal.*\n\n**P5:** Can the inverter 'Blow up'?\n*Answer: Yes. If a switch fails (stays closed), it causes a 'Shoot-Through' short circuit that can melt the copper busbars in milliseconds. Modern inverters have 'Desaturation' circuits that can detect this and kill the power in microseconds.*" }
                ],
                keyTakeaways: ['Inverters translate DC battery energy into 3-phase AC for the motor', 'Silicon Carbide (SiC) semiconductors significantly improve EV efficiency and range', 'PWM allows for infinitely variable motor speed and torque control', 'DC-DC converters replace the alternator by stepping down high voltage for 12V systems', 'Inverters must be liquid-cooled to handle the heat of high-current switching'],
                vocabulary: [
                    { term: 'SiC', definition: 'Silicon Carbide — a wide-bandgap semiconductor with high efficiency' },
                    { term: 'PWM', definition: 'Pulse Width Modulation — used to control the effective voltage to the motor' },
                    { term: 'IGBT', definition: 'Insulated-Gate Bipolar Transistor — a type of high-power electrical switch' },
                    { term: '3-Phase AC', definition: 'Three separate alternating currents that work together to rotate the motor' },
                    { term: 'Busbar', definition: 'A thick copper strip used to move massive amounts of electrical current' }
                ],
                quiz: {
                    questions: [
                        { id: 'q1', question: 'The Inverter bridges the gap between:', options: ['The Radio and the Speakers', 'The DC Battery and the AC Motor', 'The Engine and the Trunk', 'The Tires and the Road'], correctAnswer: 1, explanation: 'It converts the stored battery energy into the form the motor needs to spin.' },
                        { id: 'q2', question: 'Why is "Silicon Carbide" (SiC) better than regular Silicon?', options: ['It is cheaper', 'It is 99% efficient and handles higher heat/voltage', 'It is made of recycled plastic', 'It is lighter'], correctAnswer: 1, explanation: 'SiC reduces energy loss, increasing the car’s total driving range.' },
                        { id: 'q3', question: 'The component that charges the 12V battery from the 800V battery is:', options: ['The Spark Plug', 'The DC-DC Converter', 'The Fuel Pump', 'An Alternator'], correctAnswer: 1, explanation: 'It steps down the voltage for the car’s accessories.' },
                        { id: 'q4', question: 'Switching Frequency in an inverter is usually around:', options: ['1 Hz', '60 Hz', '10,000 to 20,000 Hz', '1,000,000 Hz'], correctAnswer: 2, explanation: 'High-frequency switching allows for smooth motor control and smaller components.' },
                        { id: 'q5', question: 'What is "PWM"?', options: ['Pumping Water Method', 'Pulse Width Modulation', 'Power Without Management', 'Police Warning Message'], correctAnswer: 1, explanation: 'A way to control power by rapidly pulsing a switch on and off.' }
                    ]
                }
            },
            {
                id: 'hybrid-architectures-series-parallel',
                title: 'Hybrid Architectures: Series, Parallel, & PHEV',
                duration: '15 min', xp: 200,
                description: 'Blended Powertrains: The Best of Both Worlds',
                aiTutor: true,
                introduction: "A Hybrid car is one of the most complex machines ever built. It has two engines (Gas and Electric) and they must work together perfectly. This lesson breaks down the three ways to build a Hybrid: Series, Parallel, and the 'Power-Split' (PHEV).",
                sections: [
                    { title: '🎯 Series Hybrids (The Generator Car)', content: "**Gas makes Electricity**\n\nIn a Series Hybrid (like a BMW i3 or a Diesel Locomotive), the gas engine NEVER touches the wheels. \n- **How it works:** The engine spins a generator, which sends electricity to the battery/motor. The car is 100% electric-drive. \n- **Advantage:** The engine can run at its 'Perfect' RPM for efficiency all day long, regardless of how fast the car is moving." },
                    { title: '🔧 Parallel Hybrids: Teamwork', content: "**Physical Connection**\n\nIn a Parallel Hybrid, both the gas engine and the electric motor are connected to the same transmission.\n- **How it works:** The electric motor can help the gas engine accelerate (giving extra torque) or it can handle low speeds alone. \n- **Advantage:** Great for trucks or towing where you need the 'Raw Power' of both systems working together." },
                    { title: '📐 Power-Split / PHEV (The Toyota Secret)', content: "**The Planetary Gearset**\n\nToyota (The Prius) uses a 'Power-Split' device. \n- It uses a clever gear system to allow the engine, the motor, and the wheels to all spin at different speeds. \n- **PHEV (Plug-in Hybrid):** A hybrid with a much bigger battery (e.g. 15kWh) and a charge port. You can drive 50 miles on pure electricity for the commute, and the gas engine only kicks in for a 400-mile road trip." },
                    { title: '🚀 Regenerative Braking & Idle Stop', section: 'Saving Energy', content: "**Stopping the Waste**\n\n- **Idle-Stop:** In a city, 20% of gas is wasted sitting at red lights. Hybrids turn the engine completely OFF. When the light goes green, the electric motor moves the car instantly while the gas engine restarts silently. \n- **Regen:** Hybrids don't have a 'Plug' usually (HEVs). They get all their 'Free' energy by capturing the kinetic energy of braking that would have been wasted as heat." },
                    { title: '🧪 Hybrid Practice', content: "**P1:** What is an 'Atkinson Cycle' engine?\n*Answer: Most hybrids use this specialized gas engine. It trades a little bit of power for 15% more efficiency by keeping the intake valve open longer. It is 'Weak' for a normal car, but the electric motor 'fills in' the missing torque.*\n\n**P2:** What is 'One-Pedal Driving'?\n*Answer: The regen is set so high that when you lift your foot, the car slows down significantly. You almost never have to touch the physical brake pedal.*\n\n**P3:** Why is there 'Energy Loss' in a hybrid?\n*Answer: 'Round-Trip' efficiency. Converting Motion -> Electricity -> Chemical (Battery) -> Electricity -> Motion loses about 10-15% of energy to heat.*\n\n**P4:** What is a '48V Mild Hybrid'?\n*Answer: A cheap middle-ground. It has a tiny motor that replaces the alternator. It can't drive the car on electricity alone, but it can smooth out the stop-start system and give a tiny 15hp boost.*\n\n**P5:** Can you drive a Plug-in Hybrid if you never charge it?\n*Answer: Yes. It just acts like a normal efficient hybrid. But you are carrying a heavy battery for no reason, so your gas mileage will be slightly worse than a regular hybrid.*" }
                ],
                keyTakeaways: ['Series hybrids use the gas engine as a dedicated generator', 'Parallel hybrids utilize both engine and motor to drive the wheels simultaneously', 'Power-split systems (Toyota) allow for infinite combinations of gas and electric power', 'PHEVs bridge the gap by offering significant electric-only range with a plug', 'Atkinson cycle engines maximize hybrid efficiency by sacrificing low-end torque'],
                vocabulary: [
                    { term: 'Series Hybrid', definition: 'The engine generates electricity; the motor drives the wheels' },
                    { term: 'Parallel Hybrid', definition: 'Both engine and motor are mechanically coupled to the wheels' },
                    { term: 'PHEV', definition: 'Plug-in Hybrid Electric Vehicle — a hybrid that can be charged from the grid' },
                    { term: 'Atkinson Cycle', definition: 'A combustion cycle that prioritizes efficiency over power density' },
                    { term: 'Planetary Gearset', definition: 'A gear system used to mix power from two different sources (engine and motor)' }
                ],
                quiz: {
                    questions: [
                        { id: 'q1', question: 'In a "Series Hybrid," the gas engine is connected to:', options: ['The wheels', 'A generator (only makes electricity)', 'The radio', 'The tires'], correctAnswer: 1, explanation: 'The engine acts as a portable power plant, not a drive source.' },
                        { id: 'q2', question: 'Toyota’s Hybrid Synergy Drive uses a "______" to mix power.', options: ['Planetary Gearset', 'Rubber band', 'Standard manual clutch', 'Electric pump'], correctAnswer: 0, explanation: 'The planetary gear allows the engine and motor to share the load dynamically.' },
                        { id: 'q3', question: 'Atkinson Cycle engines are used in hybrids because:', options: ['They are faster', 'They are more efficient when combined with electric torque', 'They are cheaper', 'They use no oil'], correctAnswer: 1, explanation: 'They have better fuel efficiency but low torque, which the motor compensates for.' },
                        { id: 'q4', question: 'What is the "One-Pedal" driving experience?', options: ['The car has no brakes', 'Regenerative braking is strong enough to slow the car almost to a stop', 'Driving with your left foot', 'A car with only a gas pedal'], correctAnswer: 1, explanation: 'Regen serves as the primary deceleration force.' },
                        { id: 'q5', question: 'A PHEV (Plug-in Hybrid) is different because:', options: ['It uses 10 wheels', 'It can be charged from a wall outlet for pure electric driving', 'It has no engine', 'It only works in the city'], correctAnswer: 1, explanation: 'PHEVs allow for daily electric-only commuting while retaining gas for long trips.' }
                    ]
                }
            },
            {
                id: 'ev-thermal-management-hvac',
                title: 'EV Thermal Management & HVAC',
                duration: '15 min', xp: 200,
                description: 'Managing heat without a radiator and keeping the cabin warm',
                aiTutor: true,
                introduction: "In a gas car, 'Heat' is a waste product you have too much of. In an EV, heat is a precious resource. This lesson explores the complex liquid loops and 'Heat Pumps' used to keep the battery, motor, and humans at the perfect temperature.",
                sections: [
                    { title: '🎯 The Battery Chill Plate', content: "**Precision Cooling**\n\nA battery is most efficient at 25°C. \n- **Charging:** Fast charging creates massive amounts of heat. If the cells hit 60°C, they stop charging to prevent fire. \n- **The Solution:** Ribbon-shaped tubes of cooling fluid wrap around every cell, or a 'Chill Plate' sits at the bottom of the battery. The car can even use a 'Chiller' (like a refrigerator) to make the fluid colder than the outside air if needed." },
                    { title: '🔧 Heat Pumps: 300% Efficiency', content: "**Moving Heat vs. Making Heat**\n\n- **Resistance Heaters:** Like a toaster. You turn 1,000 Watts of electricity into 1,000 Watts of heat. \n- **Heat Pumps:** Use a compressor and refrigerant to 'Steal' heat from the outside air and 'Move' it into the cabin. \n- **The Math:** A heat pump can provide 3,000 Watts of heat using only 1,000 Watts of electricity. This increases winter EV range by up to 20%." },
                    { title: '📐 Scavenging: The Octovalve', content: "**Waste Not, Want Not**\n\n- The Tesla 'Octovalve' is a 5-way valve that can connect every loop in the car. \n- If the **Motor** is hot, the computer can send that waste heat to the **Battery** to warm it up for charging. \n- If the **Battery** is hot, the computer can send that heat to the **Cabin** to warm up the driver. This 'Scavenging' ensures that not a single Joule of energy is wasted." },
                    { title: '🚀 Pre-Conditioning: The Secret to Speed', section: 'Preparing the Cells', content: "**Thinking Ahead**\n\n- If you enter a 'Supercharger' into the GPS, the car starts 'Pre-Conditioning.' \n- It uses the motors to intentionally generate heat (by running them slightly inefficiently) to bring the battery up to exactly 45°C. \n- **Why?** At 45°C, the chemicals inside the battery can accept electrons much faster, cutting your charging time in half." },
                    { title: '🧪 Thermal Practice', content: "**P1:** Why does EV range drop in the winter?\n*Answer: Two reasons: 1. You have to use battery power to stay warm (no waste engine heat). 2. Cold batteries have higher internal resistance, meaning you lose more energy just moving the ions.*\n\n**P2:** What is 'Passive' cooling?\n*Answer: Using just the wind. Early EVs (like the Nissan Leaf) used this. It was cheap, but led to rapid battery degradation because the cells would 'slow-cook' in hot climates.*\n\n**P3:** Can an EV battery freeze?\n*Answer: The liquid electrolyte can thicken or freeze at extremely low temperatures (-30°C). The car will 'eat' its own battery power to run a heater and keep itself from freezing while parked.*\n\n**P4:** What is 'Immersion Cooling'?\n*Answer: The next gen of tech. Instead of tubes, the cells are submerged in a non-conductive 'Oil.' This is 10x more effective at pulling heat away and is used in hyper-EVs like the Rimac Nevera.*\n\n**P5:** What is the 'Radiator' on an EV for?\n*Answer: EVs still have a small radiator in the front. It is used to dump the heat from the AC/Heat Pump system and to cool the motors during high-speed driving.*" }
                ],
                keyTakeaways: ['EVs must actively manage heat to maintain battery life and charging speed', 'Heat pumps provide hyper-efficient cabin heating by moving rather than creating heat', 'Thermal scavenging reuses motor heat to warm the battery or cabin', 'Pre-conditioning the battery via GPS integration enables maximum charging rates', 'Active liquid cooling is essential for preventing battery degradation in hot climates'],
                vocabulary: [
                    { term: 'Heat Pump', definition: 'A device that transfers heat from a colder area to a hotter area by using mechanical energy' },
                    { term: 'Scavenging', definition: 'Capturing waste energy from one system to power another' },
                    { term: 'Pre-conditioning', definition: 'Heating or cooling the battery to an optimal temperature before charging or driving' },
                    { term: 'Resistance Heater', definition: 'A device that converts electrical energy into heat directly (PTC heater)' },
                    { term: 'Chiller', definition: 'A heat exchanger that uses the AC refrigerant to cool the liquid coolant loop' }
                ],
                quiz: {
                    questions: [
                        { id: 'q1', question: 'In an EV, a "Heat Pump" is better than a "Resistance Heater" because:', options: ['It is louder', 'It moves heat rather than creating it, making it much more efficient', 'It uses no electricity', 'It is made of wood'], correctAnswer: 1, explanation: 'Heat pumps can provide 3-4 units of heat for every 1 unit of electricity used.' },
                        { id: 'q2', question: 'What is the goal of "Pre-Conditioning" before a fast charger?', options: ['To wash the car', 'To bring the battery to the optimal temperature for high-speed electron absorption', 'To empty the battery', 'To test the lights'], correctAnswer: 1, explanation: 'A warm battery can handle much higher charging speeds without damage.' },
                        { id: 'q3', question: 'Why did the Nissan Leaf have battery problems in hot climates?', options: ['The radio was too loud', 'It used "Passive" air cooling instead of active liquid cooling', 'It was too fast', 'It had no battery'], correctAnswer: 1, explanation: 'Passive cooling cannot keep up with heat buildup, leading to permanent chemical degradation.' },
                        { id: 'q4', question: 'Thermal Scavenging refers to:', options: ['Looking for food', 'Using waste motor heat to warm the cabin or battery', 'Throwing away the battery', 'Charging for free'], correctAnswer: 1, explanation: 'It’s a way to maximize efficiency by recycling every bit of thermal energy.' },
                        { id: 'q5', question: 'At what temperature are Lithium-ion batteries generally happiest?', options: ['-50°C', '25°C (Room Temp)', '100°C', '0°C'], correctAnswer: 1, explanation: 'Batteries, like humans, function best at moderate temperatures (~77°F).' }
                    ]
                }
            }
        ]
    }]
};

export default section5EV;
