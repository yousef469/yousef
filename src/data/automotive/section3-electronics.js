// Section 3: Automotive Electronics - 5 Deep Lessons
export const section3Electronics = {
  id: 'electronics',
  title: 'Unit 3: Automotive Electronics',
  description: 'The digital nervous system of the modern vehicle',
  icon: '⚡',
  color: 'from-amber-500 to-yellow-700',
  units: [{
    id: 'networking-control',
    title: 'Sensors & Networking',
    description: 'Mastering the signals and computers that run the car',
    lessons: [
      {
        id: 'automotive-sensors-actuators',
        title: 'Sensors & Actuators: The Car’s Senses',
        duration: '15 min', xp: 200,
        description: 'How a computer knows the temperature, speed, and position of every part',
        aiTutor: true,
        introduction: "A modern car has over 100 sensors. Without them, the ECU would be 'blind' and couldn't fuel the engine or save you from a skid. This lesson introduces the hardware that translates the physical world (heat, pressure, light) into 0s and 1s for the car's computer.",
        sections: [
          { title: '🎯 Engine Sensors: The Big Four', content: "**Critical Data for Combustion**\n\n1. **MAF (Mass Air Flow):** Uses a heated wire to measure exactly how many grams of air are entering the engine. If the wire cools down, more air is passing by.\n2. **MAP (Manifold Absolute Pressure):** Measures the 'vacuum' or 'boost' pressure inside the intake. This is the backup for the MAF.\n3. **CKP (Crankshaft Position):** A Hall-Effect sensor that 'watches' the teeth on the crank. It tells the computer exactly when to fire the spark plug (down to the microsecond).\n4. **WSS (Wheel Speed Sensor):** Used for ABS and Traction Control. It detects if a wheel is spinning or locked up by measuring magnetic pulses." },
          { title: '🔧 Hall-Effect vs. Variable Reluctance', content: "**The Physics of Speed**\n\nMost speed sensors use one of two principles:\n- **Variable Reluctance (VR):** A magnet and a coil of wire. As a metal tooth passes by, it induces a voltage in the wire. This is 'Passive' (needs no battery) but doesn't work well at very low speeds.\n- **Hall-Effect:** A semiconductor that changes voltage in the presence of a magnetic field. This is 'Active' (needs 5V or 12V power) and can measure speed all the way down to a complete stop. Modern cars almost exclusively use Hall-Effect for precision." },
          { title: '📐 Actuators: Doing the Work', content: "**PWM (Pulse Width Modulation)**\n\nAn ECU doesn't just turn things 'On' or 'Off.' It uses PWM to control 'Percentage.'\n- **How it works:** To run a fuel pump at 50% power, the ECU turns it on and off 1,000 times per second. By changing the 'Duty Cycle' (how long it stays on vs off), it can precisely control speed or pressure without wasting energy as heat.\n- **Solenoids:** Electromagnetic switches used to open fuel injectors or shift gears in an automatic transmission." },
          { title: '🚀 Piezoelectric Sensors: The Knock Watchers', section: 'Advanced Sensing', content: "**Hearing the Engine**\n\n- **The Knock Sensor:** A small crystal (Piezoelectric) bolted to the engine block. When the engine 'knocks' (vibrates at a specific frequency), the crystal deforms and generates a small electric voltage. \n- **The Response:** The ECU 'hears' this voltage and instantly retards the ignition timing to stop the knocking before it damages the pistons." },
          { title: '🧪 Sensor Practice', content: "**P1:** What happens if the MAF sensor is dirty?\n*Answer: The computer gets an incorrect reading of incoming air. It might spray too much or too little fuel, leading to 'Stumbling,' 'Rough Idle,' or a check engine light for 'System Lean/Rich.'*\n\n**P2:** What is 'Open Loop' vs 'Closed Loop'?\n*Answer: In 'Open Loop' (at startup), the computer uses pre-set 'Maps.' In 'Closed Loop' (once warm), the computer uses the O2 sensors to 'listen' to its own performance and adjust fuel in a continuous feedback loop.*\n\n**P3:** Why is 'Reference Voltage' (Vref) important?\n*Answer: Most sensors are 5V systems. If the car's 12V battery drops to 9V, the computer uses a 'Regulator' to keep the sensors at exactly 5V, ensuring the readings stay accurate regardless of the battery's health.*\n\n**P4:** What is a 'Stepping Motor'?\n*Answer: A motor that moves in precise 'steps' (e.g., 0.9 degrees per pulse). This is used for 'Electronic Throttle Control' (Drive-by-Wire) to precisely open the butterfly valve based on your foot's position.*\n\n**P5:** What is the 'Wideband' O2 sensor?\n*Answer: A high-end sensor that can measure the EXACT air-fuel ratio (e.g., 13.2:1) rather than just saying 'Rich' or 'Lean.' This is standard on all modern turbocharged cars for safety and power.*" }
        ],
        keyTakeaways: ['MAF and MAP sensors are the primary eyes of the engine for fueling', 'Hall-Effect sensors provide high-precision speed data down to zero RPM', 'PWM (Pulse Width Modulation) allows for precise, efficient control of actuators', 'Knock sensors use piezoelectricity to "listen" for dangerous combustion vibration', 'Feedback loops (Closed Loop) use sensors to continuously optimize efficiency'],
        vocabulary: [
          { term: 'PWM', definition: 'Pulse Width Modulation — a method of controlling power by switching on and off rapidly' },
          { term: 'Hall-Effect', definition: 'Generation of a voltage difference across an electrical conductor in a magnetic field' },
          { term: 'Actuator', definition: 'A component responsible for moving or controlling a mechanism or system' },
          { term: 'Solenoid', definition: 'A coil of wire that acts as a magnet when carrying an electric current' },
          { term: 'Piezoelectric', definition: 'Electricity resulting from pressure and latent heat in certain solid materials' }
        ],
        quiz: {
          questions: [
            { id: 'q1', question: 'Which sensor measures the VOLUME of air entering the engine?', options: ['Knock Sensor', 'Oxygen (O2) Sensor', 'MAF (Mass Air Flow)', 'WSS'], correctAnswer: 2, explanation: 'The MAF uses a heated wire to calculate the weight of incoming air molecules.' },
            { id: 'q2', question: 'PWM (Pulse Width Modulation) is used to:', options: ['Increase the fuel price', 'Efficiently control the speed or output of electrical devices', 'Paint the car', 'Cool the battery'], correctAnswer: 1, explanation: 'Varying the "Duty Cycle" provides a software-controlled average power output.' },
            { id: 'q3', question: 'A Knock Sensor works because of which property?', options: ['Magnetism', 'Piezoelectricity (voltage from vibration)', 'Solar power', 'Gravity'], correctAnswer: 1, explanation: 'Vibration deforms a crystal, which generates a measurable electrical signal.' },
            { id: 'q4', question: 'Why use Hall-Effect over Variable Reluctance for wheel speed?', options: ['It’s cheaper', 'It can read speed at 0 RPM (active)', 'It is bigger', 'It’s made of wood'], correctAnswer: 1, explanation: 'Active Hall sensors can "see" a tooth even if it is stationary.' },
            { id: 'q5', question: 'When an engine is in "Closed Loop", it is:', options: ['Off', 'Unlocked', 'Using O2 sensor feedback to adjust its fuel delivery', 'Stuck in 2nd gear'], correctAnswer: 2, explanation: 'Closed loop means the computer is verifying its own result and making corrections.' }
          ]
        }
      },
      {
        id: 'can-bus-networking-advanced',
        title: 'CAN Bus & Networking: The Car’s Internet',
        duration: '15 min', xp: 200,
        description: 'How 100 computers share two wires to control the whole car',
        aiTutor: true,
        introduction: "In the 1980s, cars had miles of heavy copper wires. Today, they have two: the CAN Bus. This lesson explores the revolutionary networking protocol that allows the engine, transmission, and brakes to talk to each other in milliseconds without a single dedicated wire.",
        sections: [
          { title: '🎯 The CAN Bus: Controller Area Network', content: "**The Two-Wire Paradox**\n\nCAN (bus) was invented by Bosch. It uses two twisted wires (CAN High and CAN Low).\n- **High Availability:** Every computer (Node) on the car is connected to these same two wires. \n- **Broadcast System:** When the engine wants to share its RPM, it 'shouts' it onto the wires. The Dashboard, Transmission, and ABS all 'hear' it at the same time and decide if they need that info. This eliminates the need for 100 separate wires for 100 systems." },
          { title: '🔧 Differential Signaling: Noise Immunity', content: "**Why Twisted Wires?**\n\nCars are 'Noisy' environments. Ignition sparks and alternators create massive electromagnetic interference (EMI). \n- **The Solution:** CAN uses 'Differential Signaling.' If the signal is 5V, CAN-High goes to 3.5V and CAN-Low goes to 1.5V. \n- If a lightning strike or interference adds +1V to both wires, the computer just calculates the **Difference** (3.5 - 1.5 = 2.0V). The noise cancels out! This is why your car doesn't go crazy every time you use a microwave or drive under power lines." },
          { title: '📐 Priority & Arbitration', content: "**Who Talks First?**\n\nWhat if the 'Radio' and the 'Airbag' try to talk at the same time? \n- **Identifier Priority:** Every message has an ID number. Lower numbers = Higher priority.\n- **Destructive Arbitration:** If two nodes start talking, they both 'listen' to the bus. The moment one sees a message with a higher priority (Lower ID), it immediately shuts up and waits. This ensures that 'Airbag Deployed' ALWAYS beats 'Volume Up' to the network." },
          { title: '🚀 LIN, FlexRay, & Automotive Ethernet', section: 'The Hierarchy', content: "**Beyond CAN**\n\nModern cars use a 'Zonal' architecture:\n- **LIN (Local Interconnect):** Very cheap, slow. Used for simple things like 'Mirror Glass Move' or 'Seat Heat.'\n- **FlexRay:** Faster and 'Deterministic.' Used for critical things like Steer-by-Wire or Suspension where timing must be perfect.\n- **Automotive Ethernet:** 100x faster than CAN. Used for Cameras and Autopilot data where the massive amounts of video data would 'choke' a standard CAN line." },
          { title: '🧪 Networking Practice', content: "**P1:** What is a 'Gateway'?\n*Answer: A powerful computer that acts as a 'Translator' between different networks. It might move a message from the slow LIN bus into the fast CAN bus for the engine to see.*\n\n**P2:** What happens if the CAN-High and CAN-Low wires touch (Short)?\n*Answer: The 'Differential' math breaks. The entire bus goes silent ('Communication Loss'). This is why a single broken wire in a door hinge can sometimes make your whole car Refuse to start.*\n\n**P3:** What is 'Bus Loading'?\n*Answer: A measure of how much traffic is on the wires. If it exceeds 50%, high-priority messages might be delayed. Engineers monitor this to ensure 'Safety-Critical' signals never wait more than a few milliseconds.*\n\n**P4:** What is 'Bit Stuffing'?\n*Answer: A CAN protocol trick. If there are too many 1s in a row, the computer 'stuffs' a 0 in. This keeps the electrical signal 'pulsing' so the computers can stay synchronized on the timing.*\n\n**P5:** Can you 'Hack' a car via CAN?\n*Answer: Yes. Since the system is broadcast based, if you plug into the OBD-II port, you can 'spoof' messages. This is why modern cars use 'Secured CAN' which requires a password or key before the computer will follow a command like 'Unlock Doors'.*" }
        ],
        keyTakeaways: ['CAN Bus uses two wires to share data among all vehicle computers', 'Differential signaling prevents electromagnetic noise from corrupting data', 'Priority-based arbitration ensures safety messages always get through first', 'Automotive Ethernet handles high-bandwidth data like autonomous video streams', 'Zonal architecture divides the car into high and low-speed network zones'],
        vocabulary: [
          { term: 'Node', definition: 'Any computer or device connected to a network' },
          { term: 'Differential Signaling', definition: 'A method of transmitting information using two complementary signals' },
          { term: 'Arbitration', definition: 'The process of determining which node has access to the bus' },
          { term: 'EMI', definition: 'Electromagnetic Interference — electrical noise from external sources' },
          { term: 'OBD-II', definition: 'On-Board Diagnostics — the standardized port for vehicle communication' }
        ],
        quiz: {
          questions: [
            { id: 'q1', question: 'How many signal wires does a standard "CAN High/Low" bus use?', options: ['1', '2 (Twisted Pair)', '8', '32'], correctAnswer: 1, explanation: 'Two wires provide a differential signal that resists noise.' },
            { id: 'q2', question: 'If two computers talk at once, who wins the "Arbitration"?', options: ['The loudest one', 'The one with the LOWEST ID (Highest Priority)', 'The radio', 'The battery'], correctAnswer: 1, explanation: 'Lower ID numbers are reserved for critical safety systems.' },
            { id: 'q3', question: 'Twisted-pair wiring is used in cars primarily to:', options: ['Saves copper', 'Cancels out electromagnetic interference (noise)', 'Make the car faster', 'Look nice'], correctAnswer: 1, explanation: 'Twisting ensures both wires receive the same noise, which then cancels out in the differential math.' },
            { id: 'q4', question: 'Which network is used for High-Speed video and autonomous data?', options: ['LIN', 'CAN', 'Automotive Ethernet', 'FM Radio'], correctAnswer: 2, explanation: 'Ethernet provides the bandwidth needed for megapixel cameras.' },
            { id: 'q5', question: 'A "Short to Ground" on the CAN bus usually results in:', options: ['Faster shifting', 'Total loss of communication between computers', 'Brighter lights', 'Nothing'], correctAnswer: 1, explanation: 'Shorts destroy the electrical signal, making data transmission impossible.' }
          ]
        }
      },
      {
        id: 'ecu-software-architecture',
        title: 'ECU Architecture & Control Logic',
        duration: '15 min', xp: 200,
        description: 'How a computer "thinks": Maps, Logic, and Real-Time OS',
        aiTutor: true,
        introduction: "An ECU (Electronic Control Unit) isn't like your laptop. It doesn't run Windows; it runs a 'Real-Time Operating System' (RTOS) that must make decisions in microseconds or the engine dies. This lesson takes you inside the code and the silicon that manages your drive.",
        sections: [
          { title: '🎯 The Look-Up Table (The Map)', content: "**The Engineer’s Brain in Data**\n\nThe ECU doesn't calculate complex physics equations while you drive. Instead, it uses **3D Maps**. \n- **X-Axis:** Engine RPM\n- **Y-Axis:** Engine Load (Throttle position)\n- **Z-Axis (The Value):** How much fuel to spray or when to spark.\n\n**Example:** If the computer sees 3,000 RPM and 50% load, it simply looks at the 'Cell' on the map where those meet. This 'Look-Up' is 100x faster than doing the math from scratch, allowing the computer to manage every single combustion cycle." },
          { title: '🔧 PID Control: The correction Loop', content: "**Proportional, Integral, Derivative**\n\nHow does the Cruise Control stay at exactly 100 km/h? \n- **P (Proportional):** If you are 5 km/h too slow, push the gas a little. If 10 too slow, push it a lot. \n- **I (Integral):** If been 5 too slow for a *long time*, push even harder (to overcome a hill).\n- **D (Derivative):** If you are speeding up *really fast*, back off early so you don't overshoot. \n\nThis 'Tuning' is applied to everything: Turbo boost, Idle speed, and Battery temperature." },
          { title: '📐 Flash Memory vs. RAM', content: "**The Vehicle’s Memory**\n\n- **Flash (ROM):** Stores the 'Tuning' and the operating code. It stays even when the battery is disconnected. This is what 'Tuners' overwrite when they 'Flash' a car for more power.\n- **SRAM (Static RAM):** Very fast, used for calculations.\n- **EEPROM/NVRAM:** Stores 'Adaptations.' If the engine gets older and wear makes it run lean, the computer 'Learns' to add 5% more fuel and stores that info here so it remembers the next time you turn the key." },
          { title: '🚀 Cybersecurity: The Gateway', section: 'Protecting the Code', content: "**Secure Boot**\n\nModern ECUs use 'Encrypted Gateways.' \n- Every piece of code must have a 'Digital Signature' from the manufacturer. \n- If you try to upload 'Hacked' code, the processor (The HSM - Hardware Security Module) will see that the signature doesn't match and refuse to start. This prevents hackers from taking over your steering or brakes remotely." },
          { title: '🧪 ECU Practice', content: "**P1:** What is an 'Automotive-Grade' processor?\n*Answer: Unlike home computers, these chips must survive -40°C to +125°C, intense vibrations, and 15 years of constant use without failing. They are often less powerful than a phone but much more reliable.*\n\n**P2:** What is 'Fuel Cut-off'?\n*Answer: A logic rule. When you take your foot off the gas at high speed, the ECU sees 'High RPM' + 'Zero Load.' It completely turns off the fuel injectors to save gas, letting the car's momentum keep the engine spinning.*\n\n**P3:** What is a 'Check Engine Light' (MIL) really?\n*Answer: The ECU constantly runs 'Diagnostics.' If a sensor reading stays outside its allowed range for a certain amount of time, the ECU stores a 'DTC' (Diagnostic Trouble Code) and turns on the light.*\n\n**P4:** What is 'Drive-by-Wire' (DbW)?\n*Answer: No cable. Your pedal is just a sensor. The ECU reads your foot and decides how to move the engine throttle based on traction, temperature, and fuel maps.*\n\n**P5:** Can one ECU do everything?\n*Answer: Historically, no. You had an Engine ECU, a Body ECU, etc. Modern cars are moving to 'Central Compute' — one or two giant computers that run the whole car as different 'Virtual' processes.*" }
        ],
        keyTakeaways: ['Look-up tables (3D maps) enable near-instant lookup of complex tuning parameters', 'PID control loops maintain stable targets for speed, heat, and boost pressure', 'Automotive processors are built for extreme durability rather than raw speed', 'Non-volatile memory (EEPROM) allows the car to "learn" and adapt to mechanical wear', 'Cybersecurity modules prevent unauthorized code from controlling critical safety systems'],
        vocabulary: [
          { term: 'Look-Up Table', definition: 'An array of data used to replace runtime computation with a simple indexing operation' },
          { term: 'PID', definition: 'Proportional-Integral-Derivative — a control loop feedback mechanism' },
          { term: 'Flash', definition: 'Electronic non-volatile computer memory that can be electrically erased and reprogrammed' },
          { term: 'DTC', definition: 'Diagnostic Trouble Code — a numeric identifier for a specific hardware fault' },
          { term: 'HSM', definition: 'Hardware Security Module — a physical computing device that manages digital keys' }
        ],
        quiz: {
          questions: [
            { id: 'q1', question: 'A 3D "Tune Map" usually compares RPM and Load to find:', options: ['The car color', 'Fuel injector "on-time"', 'The radio station', 'The date'], correctAnswer: 1, explanation: 'The map tells the computer how much fuel is needed for a specific engine state.' },
            { id: 'q2', question: 'Cruise control uses a "PID" loop to:', options: ['Measure the oil', 'Smoothly maintain a target speed without "overshooting"', 'Turn the lights on', 'Stop the car'], correctAnswer: 1, explanation: 'PID loops use math to correct errors between the actual and target speed.' },
            { id: 'q3', question: 'Automotive processors are unique because they must survive:', options: ['Extreme temperatures (-40 to 125C) and vibrations', 'Coffee spills', 'Water only', 'Gaming'], correctAnswer: 0, explanation: 'Durability and reliability are the #1 priority for automotive silicon.' },
            { id: 'q4', question: 'If the computer "Learns" to adjust for an old fuel pump, where does it store this info?', options: ['The Radio', 'EEPROM / NVRAM (memory that survives restart)', 'A sticky note', 'The tail light'], correctAnswer: 1, explanation: 'Persistent memory stores long-term adaptation data.' },
            { id: 'q5', question: '"Drive-by-Wire" means your foot pedal is actually a:', options: ['Mechanical lever', 'Electronic sensor', 'Brake', 'Fuel tank'], correctAnswer: 1, explanation: 'The computer interprets your intent and controls the engine via a motor.' }
          ]
        }
      },
      {
        id: 'adas-autonomous-systems',
        title: 'ADAS: Radar, Lidar, & Machine Vision',
        duration: '15 min', xp: 200,
        description: 'How a car sees the world and makes safety decisions',
        aiTutor: true,
        introduction: "Advanced Driver Assistance Systems (ADAS) are the eyes of the modern vehicle. This lesson covers the three pillars of machine perception: Radar (for distance), Lidar (for 3D mapping), and Cameras (for semantic understanding).",
        sections: [
          { title: '🎯 Radar: The Blind-Spot Watcher', content: "**Radio Detection and Ranging**\n\nRadar uses radio waves to measure the distance and speed of objects.\n- **Advantage:** It works in rain, fog, and snow. It 'sees' through bad weather because radio waves aren't blocked by droplets. \n- **Usage:** Adaptive Cruise Control and Blind Spot monitoring. It is great at telling you *how fast* the car in front is moving, but bad at telling you *what* it is (it can't tell a semi-truck from a bridge)." },
          { title: '🔧 Lidar: The High-Def 3D Map', content: "**Laser Imaging Detection**\n\nLidar pulses millions of laser beams per second to create a 'Point Cloud.'\n- **Advantage:** Precision. It can see the exact shape of a pedestrian, a cyclist, or a pothole with millimeter accuracy. \n- **The Trade-off:** Most Lidar units are very expensive ($1,000+). They also struggle in heavy rain because the laser light reflects off the water drops." },
          { title: '📐 Computer Vision: Neural Networks', content: "**Pixels to Meaning**\n\nA camera is just a grid of colors. To drive, the car needs a **Neural Network** to interpret it.\n- **Semantic Segmentation:** The computer colors in every pixel: 'This is Road,' 'This is a Red Light,' 'This is the Lane Line.'\n- **Depth Estimation:** By using two cameras (Stereo Vision) or by watching how an object grows in size, the computer can 'guess' distance just like a human eye." },
          { title: '🚀 Sensor Fusion: The Truth-Finder', section: 'Combining Perspectives', content: "**Trust but Verify**\n\nThe car never trusts just one sensor. \n- If the Radar says 'There is a wall' but the Camera says 'It’s just an empty highway,' the **Sensor Fusion** algorithm has to decide who is right.\n- This prevents 'Phantom Braking' (when a car stops for no reason). By combining the strengths of each sensor, the vehicle builds a 360-degree 'World Model' that is often more accurate than a human driver." },
          { title: '🧪 ADAS Practice', content: "**P1:** What is Level 5 Autonomy?\n*Answer: Full Automation. The car can drive anywhere, in any weather, with zero human intervention. Most current cars (Tesla/Waymo) are Level 2 to Level 4.*\n\n**P2:** Why do cameras struggle at night?\n*Answer: High noise and low dynamic range. Car computers often use 'Infrared' lights or high-sensitivity sensors to see in the dark.*\n\n**P3:** What is 'Lane Keep Assist' (LKA)?\n*Answer: A system that uses the camera to find lane lines. If you drift over the line without signaling, the EPS motor applies a small 'Nudge' to the steering wheel to bring you back.*\n\n**P4:** What is 'Pedestrian Detection'?\n*Answer: A specialized Neural Network trained on thousands of photos of people. If it detects a human shape in the path, it can trigger AEB (Automatic Emergency Braking).*\n\n**P5:** Can external things 'Blind' a car's sensors?\n*Answer: Yes. Very bright direct sunlight can blind a camera (Flare), and heavy mud on the front bumper can disable the Radar. This is why 'Sensor Cleaning' systems are becoming more common.*" }
        ],
        keyTakeaways: ['Radar is reliable in all weather but has low resolution', 'Lidar provides a precise 3D "point cloud" but is expensive', 'Computer Vision uses neural networks to identify objects like traffic lights', 'Sensor fusion merges data from multiple sources for high-confidence decisions', 'ADAS levels categorize how much of the "driving" the computer is responsible for'],
        vocabulary: [
          { term: 'Lidar', definition: 'Light Detection and Ranging — a remote sensing method using light in the form of a pulsed laser' },
          { term: 'Neural Network', definition: 'A computer system modeled on the human brain and nervous system' },
          { term: 'Sensor Fusion', definition: 'The process of combining data from multiple sensors to achieve more accurate results' },
          { term: 'Point Cloud', definition: 'A set of data points in space representing 3D shapes' },
          { term: 'ADAS', definition: 'Advanced Driver Assistance Systems — electronic systems that help with driving and parking' }
        ],
        quiz: {
          questions: [
            { id: 'q1', question: 'Which sensor is best for "seeing" through thick fog?', options: ['Camera', 'Radar', 'Human Eye', 'Lidar'], correctAnswer: 1, explanation: 'Radio waves (Radar) pass through water droplets much better than light.' },
            { id: 'q2', question: 'A "Point Cloud" is the output of which sensor?', options: ['F1 Engine', 'Tire Pressure Monitor', 'Lidar', 'Radio'], correctAnswer: 2, explanation: 'Lidar uses laser pulses to map the 3D world into millions of individual points.' },
            { id: 'q3', question: 'Sensor Fusion is used to:', options: ['Melt the sensors together', 'Combine data from Radar, Lidar, and Cameras for a "shared truth"', 'Save battery', 'Make the car faster'], correctAnswer: 1, explanation: 'It prevents errors by cross-referencing different sensor types.' },
            { id: 'q4', question: 'Which system identifies if a light is "Red" or "Green"?', options: ['Radar', 'Computer Vision (Camera)', 'Lidar', 'The Exhaust'], correctAnswer: 1, explanation: 'Only visual sensors (cameras) can perceive the "meaning" of colors and signs.' },
            { id: 'q5', question: 'Level 2 Autonomy means:', options: ['The car drives itself while you sleep', 'The car has Adaptive Cruise and Lane Keep, but the driver must still supervise', 'The car has no computer', 'The car is a Transformer'], correctAnswer: 1, explanation: 'Level 2 requires constant human attention despite system assistance.' }
          ]
        }
      },
      {
        id: 'telematics-connectivity-v2x',
        title: 'Telematics & V2X: The Connected Car',
        duration: '15 min', xp: 200,
        description: 'How cars talk to the city, the internet, and each other',
        aiTutor: true,
        introduction: "A car is no longer an island. It is a connected node on the 'Internet of Vehicles.' This lesson covers Telematics (the car-to-cell-tower link) and V2X (the car-to-car link) that will define the future of traffic safety.",
        sections: [
          { title: '🎯 Telematics: The GPS/Cell Link', content: "**Remote Diagnostics**\n\nTelematics is the combination of Telecommunications and Informatics. \n- **Asset Tracking:** Companies use this to know exactly where their fleet of trucks is.\n- **OTA (Over-the-Air) Updates:** Just like your phone, a connected car can download a new 'Brake Map' while it's parked in your driveway, fixing a recall without you ever visiting a mechanic." },
          { title: '🔧 V2V: Vehicle-to-Vehicle', content: "**The Digital Honk**\n\nImagine you are behind a semi-truck and can't see the road. A car two miles ahead hits its brakes hard for an accident. \n- **V2V Communication:** That car 'Shouts' a message via 5G or DSRC: 'EMERGENCY BRAKE AT LOCATION X.' \n- Your car 'Hears' this message and starts slowing down before you even see the accident. V2V allows cars to 'see around corners' by sharing their own sensor data with everyone nearby." },
          { title: '📐 V2I: Vehicle-to-Infrastructure', content: "**Talking to the Traffic Light**\n\n- **Green Light Optimization:** The traffic light tells your car 'I will turn Green in 5 seconds.' Your car can then perfectly time its acceleration to never have to stop, saving massive amounts of gas and brake wear. \n- **Road Safety:** A bridge can 'Shout' that it is icy, or a construction zone can send its exact lane-closure data directly to your dashboard." },
          { title: '🚀 The Security Mesh', section: 'V2X Privacy', content: "**Trusting the Message**\n\n- How do you know the 'Emergency Brake' message is real and not a prank? \n- **PKI (Public Key Infrastructure):** Every car has a digital 'ID Card.' The messages are 'Signed' — a car will only believe a message if it can verify that a real, certified vehicle sent it. \n- **Anonymity:** To prevent people from tracking you, the car's ID changes every few minutes (Rotating Certificates), so you can be 'Safe' without being followed." },
          { title: '🧪 Connectivity Practice', content: "**P1:** What does 'Latency' mean in V2X?\n*Answer: The time delay. For safety messages (like 'I'm about to crash into you'), the delay must be less than 0.02 seconds. V2X uses specialized high-speed radio bands (DSRC) to ensure this speed.*\n\n**P2:** What is 'Geofencing'?\n*Answer: Setting a virtual boundary. An owner can get a text if their car leaves a certain area, or a rental car can be 'Limited' to 20 km/h in a dangerous construction zone.*\n\n**P3:** Can V2X work without the internet?\n*Answer: Yes. 'Directed V2X' works car-to-car directly like a walkie-talkie. It doesn't need a cell tower to be nearby to prevent a collision.*\n\n**P4:** What is 'Platooning'?\n*Answer: When a group of trucks 'Links' together via V2X. They drive inches apart at 100 km/h, perfectly synchronized. This reduces air drag for the whole group, saving 15% on fuel.*\n\n**P5:** How does GPS 'Adfjust' in a city with skyscrapers?\n*Answer: 'Dead Reckoning.' When the GPS signal is lost under a tunnel, the car uses its own Wheel Speed Sensors and Gyroscope to 'calculate' where it is until the satellites are visible again.*" }
        ],
        keyTakeaways: ['OTA updates allow vehicles to improve performance and safety remotely', 'V2V enables cars to "see around corners" by sharing emergency data', 'V2I (Vehicle to Infrastructure) helps optimize traffic flow and signal timing', 'Digital signatures (PKI) ensure that car-to-car messages are authentic and secure', 'Geofencing allows for virtual boundaries to control vehicle speed or access'],
        vocabulary: [
          { term: 'Telematics', definition: 'The branch of information technology that deals with the long-distance transmission of computerized information' },
          { term: 'V2X', definition: 'Vehicle-to-Everything communication' },
          { term: 'OTA', definition: 'Over-the-Air — wireless delivery of new software or data' },
          { term: 'Latency', definition: 'The delay before a transfer of data begins following an instruction for its transfer' },
          { term: 'Geofencing', definition: 'The use of GPS or RFID technology to create a virtual geographic boundary' }
        ],
        quiz: {
          questions: [
            { id: 'q1', question: 'V2V communication allows cars to:', options: ['Change the color of other cars', 'Share safety and speed data to "see around corners"', 'Listen to the same radio station', 'Fly'], correctAnswer: 1, explanation: 'Direct car-to-car links warn drivers of hazards before they are visible.' },
            { id: 'q2', question: 'The main benefit of an "OTA Update" is:', options: ['New wheels', 'Fixing a software recall without visiting a dealership', 'Making the car heavier', 'Washing the car'], correctAnswer: 1, explanation: 'Over-The-Air updates save time and money by updating code via the internet.' },
            { id: 'q3', question: 'V2I (Vehicle-to-Infrastructure) involves the car talking to:', options: ['Other cars', 'The driver', 'Traffic lights and road sensors', 'The gas station'], correctAnswer: 2, explanation: 'Infrastructure links help manage traffic and optimize fuel usage.' },
            { id: 'q4', question: 'How is privacy handled in V2X?', options: ['The car has no name', 'Rotating digital certificates that change every few minutes', 'It is not private', 'By turning the radio up'], correctAnswer: 1, explanation: 'Changing IDs prevents long-term tracking of specific vehicles.' },
            { id: 'q5', question: '"Platooning" is a V2X feature that allows trucks to:', options: ['Drive faster than the speed limit', 'Drive very close together to save fuel through reduced air drag', 'Avoid traffic', 'None of these'], correctAnswer: 1, explanation: 'Synchronized braking and acceleration enable safe, tight spacing.' }
          ]
        }
      }
    ]
  }]
};

export default section3Electronics;
