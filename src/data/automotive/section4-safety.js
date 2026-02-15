// Section 4: Safety & Testing - 5 Deep Lessons
export const section4Safety = {
  id: 'safety-testing',
  title: 'Unit 4: Safety & Testing',
  description: 'The engineering of life preservation and vehicle validation',
  icon: '🛡️',
  color: 'from-green-600 to-emerald-800',
  units: [{
    id: 'safety-systems',
    title: 'Life Protection Systems',
    description: 'Hardware and software designed to prevent and survive accidents',
    lessons: [
      {
        id: 'passive-safety-crumple-zones',
        title: 'Passive Safety: Surviving the Crash',
        duration: '15 min', xp: 200,
        description: 'Airbags, crumple zones, and the physics of deceleration',
        aiTutor: true,
        introduction: "When a car stops instantly, the people inside keep moving. Passive safety is about managing that 60 km/h energy so it doesn't break human bones. This lesson explores the structural engineering and explosive chemical reactions that keep you alive when the worst happens.",
        sections: [
          { title: '🎯 Crumple Zones: Managing Kinetic Energy', content: "**The Accordion Effect**\n\nA modern car's front end is designed to be 'Weak' in a very specific way. \n- **Work = Force × Distance:** To stop a human safely, you need to increase the **Distance** of the deceleration. \n- If a car is rigid (like a 1950s truck), the stop happens in 0.05 seconds. If the front end crumples by 2 feet, the stop happens in 0.15 seconds. \n- This 3x increase in time reduces the **Peak Force** on your body by 70%. The engine is often designed to 'Drop' out of the bottom of the car rather than being pushed into your legs." },
          { title: '🔧 Airbags: Controlled Explosions', content: "**Sodium Azide and 0.03 Seconds**\n\n- **The Trigger:** An accelerometer detects a deceleration of -20G or more. \n- **The Reaction:** An electrical match ignites **Sodium Azide (NaN3)**. In 30 milliseconds, it decomposes into 70 liters of hot Nitrogen gas. \n- **The Cushion:** The bag is ALREADY DEFLATING by the time your head hits it. If it were still inflating, it would feel like hitting a rock. The holes in the back of the bag allow the gas to escape, absorbing the energy of your head slowly." },
          { title: '📐 Seatbelts & Pre-tensioners', content: "**Linking You to the Cage**\n\n- **Force Limiters:** Seatbelts have a small 'release' mechanism. If the belt pulls too hard on your chest, it 'gives' slightly to prevent breaking your ribs.\n- **Pre-tensioners:** Most modern belts have a small explosive charge inside the spool. The moment the airbag fires, the belt *yanks* you back into your seat, removing any 'slack' so you are in the perfect position to hit the airbag." },
          { title: '🚀 The Safety Cage: Boron and Beyond', section: 'The Unbreakable Box', content: "**Protecting the Core**\n\nWhile the front and back of the car are designed to fail (Crumple), the 'Passenger Cell' (A-pillars, B-pillars, and Roof) is designed to be **unbreakable**.\n- Engineers use **Hot-Stamped Boron Steel** which has a yield strength of 1,500 MPa. \n- This 'Cage' ensures that even if a semi-truck hits the car, the space where the humans sit remains intact. This is why modern car roofs don't collapse when the car flips upside down." },
          { title: '🧪 Passive Safety Practice', content: "**P1:** Why shouldn't children sit in the front seat?\n*Answer: Because of the Force of the Airbag. An airbag deploys at 200 mph. For a small child, the impact of the bag itself can be fatal. Children are safer in the rear where there are no frontal airbags and their seat is farther from the impact.*\n\n**P2:** What is 'Submarining' in a car crash?\n*Answer: When a passenger slides *under* the lap belt during a crash. To prevent this, engineers design 'Anti-Submarining' ramps into the seat frame to keep your hips locked in place.*\n\n**P3:** Do airbags work if you aren't wearing a seatbelt?\n*Answer: Yes, but they can be dangerous. Without a belt, you will reach the bag too fast or at the wrong angle. Many cars have 'Multi-stage' airbags that fire with less force if the computer sees the belt is unbuckled.*\n\n**P4:** What is the 'Sled Test'?\n*Answer: A common engineering test where a car interior is mounted on a rail and 'Slammed' into a wall. It allows engineers to test seats and airbags without destroying a whole car.*\n\n**P5:** What is 'Laminated Glass'?\n*Answer: Windshields are two layers of glass with plastic (PVB) in the middle. This ensures the glass 'webs' instead of shattering into sharp shards, and it keeps you from being ejected through the front window.*" }
        ],
        keyTakeaways: ['Crumple zones increase the time/distance of deceleration to reduce peak force', 'Airbags use rapid chemical decomposition (NaN3) to create a pillow of gas', 'Pre-tensioners "lock" the driver into the seat milliseconds before impact', 'Boron steel creates a rigid safety cage that protects the passenger cabin', 'Force limiters in seatbelts prevent chest injuries by allowing controlled "give"'],
        vocabulary: [
          { term: 'Sodium Azide', definition: 'The chemical compound used as a propellant in airbags' },
          { term: 'Pre-tensioner', definition: 'A device that tightens seatbelts during a crash' },
          { term: 'A-Pillar', definition: 'The structural support on either side of a vehicle’s windshield' },
          { term: 'Boron Steel', definition: 'An ultra-high-strength steel used for structural safety members' },
          { term: 'PVB', definition: 'Polyvinyl Butyral — the plastic layer in laminated safety glass' }
        ],
        quiz: {
          questions: [
            { id: 'q1', question: 'Crumple zones help by:', options: ['Making the car look cool', 'Increasing the time and distance of a stop to reduce force', 'Preventing the car from ever hitting anything', 'None of these'], correctAnswer: 1, explanation: 'Decelerating over a longer distance lowers the peak energy impact on humans.' },
            { id: 'q2', question: 'Airbags are typically filled with which gas?', options: ['Oxygen', 'Hydrogen', 'Nitrogen', 'Helium'], correctAnswer: 2, explanation: 'Sodium Azide decomposes rapidly into clean Nitrogen gas.' },
            { id: 'q3', question: 'Boron Steel is used primarily in the:', options: ['Wheels', 'Bumpers', 'Roof pillars and passenger safety cage', 'Tires'], correctAnswer: 2, explanation: 'Its extreme strength prevents the cabin from collapsing in a rollover or side impact.' },
            { id: 'q4', question: 'A seatbelt "Force Limiter" is designed to:', options: ['Make the belt stay loose', 'Release slightly during a crash to prevent chest/rib injuries', 'Pull harder', 'Hold the radio'], correctAnswer: 1, explanation: 'It limits the specific amount of pressure the belt puts on the human torso.' },
            { id: 'q5', question: 'When an airbag is working correctly, it should be:', options: ['Already deflating when you hit it', 'Rock hard', 'Hot as fire', 'Filled with water'], correctAnswer: 0, explanation: 'The deflation is what actually absorbs the energy of the passenger.' }
          ]
        }
      },
      {
        id: 'active-safety-adas-control',
        title: 'Active Safety: Preventing the Collision',
        duration: '15 min', xp: 200,
        description: 'Electronic Stability Control, AEB, and the math of collision avoidance',
        aiTutor: true,
        introduction: "The best crash is the one that never happens. Active safety uses computers and actuators to 'fix' a driver's mistake before the tires lose grip. This lesson explores the math behind ESC (Electronic Stability Control) and AEB (Automatic Emergency Braking).",
        sections: [
          { title: '🎯 ESC: The Mathematical Savior', content: "**Comparing Intent to Reality**\n\nESC is the most important safety invention since the seatbelt. \n- **The Sensors:** A 'Yaw Rate' sensor (measures if the car is spinning) and a 'Steering Angle' sensor (measures where the driver wants to go).\n- **The Logic:** If you turn right, but the yaw sensor says the car is going straight (Understeer), the computer instantly brakes the **Inside Rear Wheel**. This creates a 'Torque' that pulls the nose of the car back into the turn. It does this 50 times per second, far faster than any human." },
          { title: '🔧 AEB: Automatic Emergency Braking', content: "**Time-to-Collision (TTC)**\n\nAEB uses Radar and Cameras to calculate the distance (d) and relative velocity (v) of the car in front. \n- **TTC = d / v**\n- If the TTC falls below a certain threshold (e.g., 1.5 seconds) and the driver hasn't touched the brake, the car will 'Pre-charge' the brakes (move the pads closer to the disc) and then slam them on at 100% force to stop the car or at least reduce the impact speed." },
          { title: '📐 Lane Keep Assist (LKA) & Departure Warning', content: "**Vision-Based Guidance**\n\nUsing a camera behind the rearview mirror, the car looks for the high-contrast lines of the road. \n- **The Algorithms:** It uses 'Edge Detection' to find the lane. \n- **Feedback:** If the car drifts, the EPS (Electric Power Steering) motor applies a 'Counter-Torque' to the steering rack to gently nudge the car back. If the computer sees the driver's hands aren't on the wheel, it will alert him or 'Hand-off' control." },
          { title: '🚀 Stability vs. Traction Control', section: 'Taming the Power', content: "**Traction Control (TCS):** Only watches the wheels during ACCELERATION. If a wheel spins too fast, it either reduces engine power or brakes that specific wheel. \n**Electronic Stability Control (ESC):** Watches the car during CORNERING and BRAKING. It is a much more complex system that can save a car from a high-speed spin." },
          { title: '🧪 Active Safety Practice', content: "**P1:** Can you 'Out-brake' an ABS system?\n*Answer: On dry pavement, an elite race driver might match ABS. But in rain or on 'split-mu' (half ice, half dry) pavement, a human CANNOT pump the brakes 20 times per second on each individual wheel independently like the computer can.*\n\n**P2:** What is 'Brake Assist' (BA)?\n*Answer: Research shows that in emergencies, humans often hit the brake fast but don't push hard enough. BA detects a 'Panic' pedal movement and applies 100% force automatically.*\n\n**P3:** What is a 'Blind Spot' monitor?\n*Answer: Two small radars under the rear bumper corners. They 'see' in a 180-degree arc behind you and light up a warning in your side mirror if a car is there.*\n\n**P4:** What is 'Driver Drowsiness' monitoring?\n*Answer: A camera that watches your eyes (for blinking frequency) or a computer that watches your steering inputs. If you start making 'micro-corrections' typical of a sleepy person, it will prompt you to take a coffee break.*\n\n**P5:** What is 'Adaptive Cruise Control' (ACC)?\n*Answer: Standard cruise control plus Radar. It maintains a set speed but automatically slows down to match the speed of the car in front, maintaining a constant 'Gap' (distance).*" }
        ],
        keyTakeaways: ['ESC uses individual wheel braking to correct understeer and oversteer', 'AEB calculates "Time-to-Collision" to prevent frontal accidents', 'Traction control prevents wheel spin during acceleration', 'Lane Keep Assist uses cameras and edge-detection to guide the steering', 'Brake Assist ensures maximum stopping power even if the driver is hesitant'],
        vocabulary: [
          { term: 'ESC', definition: 'Electronic Stability Control — corrects vehicle path using selective braking' },
          { term: 'Yaw Rate', definition: 'The rate of rotation of a vehicle around its vertical axis' },
          { term: 'AEB', definition: 'Automatic Emergency Braking — brakes applied by the car to avoid impact' },
          { term: 'TCS', definition: 'Traction Control System — prevents drive wheels from spinning' },
          { term: 'Split-Mu', definition: 'A surface where different wheels have different coefficients of friction (e.g., ice/dry)' }
        ],
        quiz: {
          questions: [
            { id: 'q1', question: 'ESC (Electronic Stability Control) stops a spin by:', options: ['Turning the engine off', 'Braking individual wheels to create a correcting torque', 'Opening the trunk', 'Changing the radio station'], correctAnswer: 1, explanation: 'Braking one specific wheel "pulls" the car back into the intended line.' },
            { id: 'q2', question: 'Automatic Emergency Braking (AEB) uses which two main sensors?', options: ['Fuel Gauge and Compass', 'Radar and Cameras', 'Microphone and GPS', 'Tire Pressure and Oil'], correctAnswer: 1, explanation: 'Radar measures distance/speed; Cameras provide object identification and context.' },
            { id: 'q3', question: 'The system that prevents wheels from spinning when you hit the gas on ice is:', options: ['ABS', 'Traction Control (TCS)', 'Air conditioning', 'Cruise Control'], correctAnswer: 1, explanation: 'Traction control manages engine output and wheel braking during acceleration.' },
            { id: 'q4', question: '"Split-Mu" refers to a road condition where:', options: ['The road is split in half', 'Left and right wheels have different amounts of grip (e.g. ice on one side)', 'The car is fast', 'The tires are flat'], correctAnswer: 1, explanation: 'Electronic systems are much better than humans at managing uneven side-to-side grip.' },
            { id: 'q5', question: 'Lane Keep Assist (LKA) works by:', options: ['Using GPS', 'Using a camera to find road lines and nudging the steering', 'Following the car in front only', 'Magnets in the road'], correctAnswer: 1, explanation: 'Computer vision identifies the lane boundaries and commands the steering motor.' }
          ]
        }
      },
      {
        id: 'crash-testing-standards-ncap',
        title: 'Crash Testing: The Science of Impact',
        duration: '15 min', xp: 200,
        description: 'Euro NCAP, IIHS, and the evaluation of vehicle safety',
        aiTutor: true,
        introduction: "How do we know a car is safe? We wreck it. Every new model must survive millions of dollars worth of controlled crashes. This lesson covers the standardized tests used by Euro NCAP and IIHS to rate cars from 1 to 5 stars.",
        sections: [
          { title: '🎯 The Frontal Offset Test', content: "**The Most Dangerous Crash**\n\nMost accidents aren't a perfectly 'flat' hit against a wall. They are 'Offset' — hitting another car with only half of your bumper.\n- **The Challenge:** This puts all the energy into ONE side of the car, which tries to 'Twist' the cabin and push the wheel into the driver's legs.\n- **Small Overlap (25%):** The IIHS (USA) introduced this brutal test where only 25% of the car hits a barrier. This misses the main 'Front Rails' of the car, forcing the suspension and wheels to absorb the energy. This test revolutionized car design in the 2010s." },
          { title: '🔧 Side Impact & Pole Tests', content: "**The Lack of Space**\n\nIn a frontal crash, you have 5 feet of hood to crumple. In a side crash, you have 6 inches of door.\n- **The MDB Test:** A 1,500 kg 'Sled' hits the car from the side. \n- **The Pole Test:** The car is slid sideways at 32 km/h into a narrow metal pole. \n- **The Solution:** Side-curtain airbags and ultra-strong 'B-pillars' made of Boron steel. The door also has 'Intrusion Beams' — horizontal metal bars that prevent the door from folding like paper." },
          { title: '📐 Whiplash & Pedestrian Safety', content: "**Safety for Everyone**\n\n- **Rear Impact (Whiplash):** Using a specialized sled (BioRID), engineers measure the movement of the neck. Modern 'Active Headrests' snap forward to catch your head, preventing the 'whip' movement that causes spinal injury.\n- **Pedestrian Safety:** If a car hits a person, the person's head usually hits the hood. Many cars now have 'Pop-up Hoods' — small explosive charges that lift the hood 4 inches in a split second, creating a 'pillow' of air between the person's head and the hard engine below." },
          { title: '🚀 The Dummies: Biofidelic Tools', section: 'Measuring the Human', content: "**ATDs (Anthropomorphic Test Devices)**\n\nCrash dummies (like 'THOR') cost $500,000 each. \n- They are filled with hundreds of sensors: Accelerometers in the head, load cells in the neck, and 3D distance sensors in the chest. \n- **HIC (Head Injury Criterion):** A mathematical value calculated from the dummy's data. If the HIC is too high, the car fails, even if it looks fine from the outside." },
          { title: '🧪 Testing Practice', content: "**P1:** What does 'NCAP' stand for?\n*Answer: New Car Assessment Program. It is the international standard for safety ratings (e.g. Euro NCAP, ANCAP).*\n\n**P2:** Why do older cars (1960s) often look 'Safer' after a crash (less damage) but kill the passengers?\n*Answer: Stiff structures. Because the car didn't 'Crumple,' all the kinetic energy was passed directly to the humans inside, bursting their organs and breaking their necks. A destroyed car is a sign of a safe car.*\n\n**P3:** What is a 'Roof Crush' test?\n*Answer: A giant hydraulic press pushes down on the corner of the roof. To get a top rating, the roof must hold FOUR TIMES the weight of the car without collapsing.*\n\n**P4:** What is 'Compatibility' in crash testing?\n*Answer: Ensuring a giant SUV doesn't just 'run over' a small hatchback. This is why SUV bumpers are being lowered to align with the safety structures of smaller cars.*\n\n**P5:** Can simulation replace real crash testing?\n*Answer: Almost. Companies run 10,000 'Digital Crashes' (FEA) before they build a single car. But the final 'Star Rating' almost always requires a real, physical car hitting a real wall to verify the code.*" }
        ],
        keyTakeaways: ['Offset frontal tests assess how a car handles uneven energy loads', 'Side impact tests focus on structural reinforcement in tight spaces', 'Pedestrian safety features (pop-up hoods) protect those outside the vehicle', 'Modern ATDs (dummies) provide hundreds of high-speed data points on injury potential', 'A "totaled" car front end is evidence of successfully redirected impact energy'],
        vocabulary: [
          { term: 'NCAP', definition: 'New Car Assessment Program — standardized safety rating system' },
          { term: 'HIC', definition: 'Head Injury Criterion — a measure of likelihood of head injury' },
          { term: 'B-Pillar', definition: 'The structural support between the front and rear doors' },
          { term: 'ATD', definition: 'Anthropomorphic Test Device — a crash test dummy' },
          { term: 'FEA', definition: 'Finite Element Analysis — computer simulation of stresses and impacts' }
        ],
        quiz: {
          questions: [
            { id: 'q1', question: 'In a "Small Overlap" crash test, what percentage of the car hits the barrier?', options: ['100%', '50%', '25%', '5%'], correctAnswer: 2, explanation: 'The 25% test is one of the hardest for a car to pass structurally.' },
            { id: 'q2', question: 'Why is a "Pole Test" so difficult?', options: ['The pole is made of gold', 'Concentrating all force into a tiny, narrow area', 'The car is fast', 'Drivers hate poles'], correctAnswer: 1, explanation: 'Narrow impacts can easily pierce the side of a car if not heavily reinforced.' },
            { id: 'q3', question: 'Advanced crash dummies (like THOR) cost roughly:', options: ['$500', '$5,000', '$500,000', '$20'], correctAnswer: 2, explanation: 'They are precision instruments filled with high-tech sensors.' },
            { id: 'q4', question: 'A pop-up hood is designed to protect:', options: ['The engine', 'The driver', 'A pedestrian hit by the car', 'The fuel tank'], correctAnswer: 2, explanation: 'It provides a "crumple zone" for a person’s head before they hit the hard engine.' },
            { id: 'q5', question: 'If an old car looks "fine" after a crash but the passengers died, it’s because:', options: ['The passengers were asleep', 'The car was too stiff and transferred all energy to the humans', 'The car was too soft', 'None of these'], correctAnswer: 1, explanation: 'Stiff structures protect the car but kill the people; soft crumple zones do the opposite.' }
          ]
        }
      },
      {
        id: 'functional-safety-iso26262',
        title: 'Functional Safety: ISO 26262 & ASIL',
        duration: '15 min', xp: 200,
        description: 'Ensuring the software doesn\'t "decide" to kill you',
        aiTutor: true,
        introduction: "When your steering is controlled by a computer, a single 'Bit Flip' (caused by a cosmic ray or a bug) could turn the car into a wall. Functional Safety is the engineering discipline of ensuring that electronic systems fail in a 'Safe' way. This lesson introduces **ISO 26262** and the **ASIL** rating system.",
        sections: [
          { title: '🎯 What is Functional Safety?', content: "**Defending against the Unforeseen**\n\nFunctional Safety (FuSa) is NOT about crash testing. It is about **electronic malfunctions**.\n- **The Goal:** If the steering computer breaks, the car shouldn't swerve. It should detect the error, alert the driver, and fall back to a safe mode. \n- **Redundancy:** High-safety systems often have two computers running the same math. If Computer A and Computer B disagree, they pull the 'Emergency Stop' and hand control to the driver." },
          { title: '🔧 ASIL Levels: A to D', content: "**The Severity of Risk**\n\nEvery system in a car is given an **ASIL** (Automotive Safety Integrity Level) rating based on three factors:\n1. **Severity:** How bad is the crash if this breaks?\n2. **Exposure:** how often is the car in this state? (e.g. driving 100 km/h is high exposure).\n3. **Controllability:** Can a human driver 'Fix' it? (If your radio breaks, it's easy to control. if your brakes break, it's not).\n\n- **ASIL-A:** Low risk (e.g., dome light).\n- **ASIL-D:** Critical risk (e.g., Airbags, ABS, Steer-by-Wire). ASIL-D systems require the highest level of rigorous testing and hardware redundancy." },
          { title: "📐 Failure Modes: 'Safe' vs 'Dangerous'", content: "**The Fail-Safe Concept**\n\n- **Fail-Safe:** The system shuts down (e.g. an e-brake that locks if it loses power). \n- **Fail-Operational:** The system KEEPS working even when broken (needed for self-driving cars, which must have a backup 'brain' ready to pull over if the main one dies).\n- **Diagnostic Coverage:** The computer constantly runs 'Self-Tests' on its own memory and circuits to find errors before they cause a physical movement." },
          { title: '🚀 HARA: Hazard Analysis and Risk Assessment', section: 'Thinking like a Villain', content: "**Finding the Weak Spot**\n\nBefore building a part, engineers perform a **HARA**. \n1. They list every 'Hazard' (e.g., 'Unintended steering at high speed').\n2. They identify the 'Case' (e.g., 'A short circuit in the motor controller').\n3. They design a 'Safety Goal' (e.g., 'The system must disable motor power within 50 milliseconds of detecting a short')." },
          { title: '🧪 Functional Safety Practice', content: "**P1:** What does 'ASIL-D' imply about a system?\n*Answer: It is the highest safety rating. It means the system must have massive hardware redundancy, checked software code, and a survival rate of 'less than 1 failure per 100 million hours of operation.'*\n\n**P2:** What is 'Redundant Hardware'?\n*Answer: Having two of everything. Two batteries, two steering motors, or two independent CPUs. If one catches fire or glitches, the other 'takes the wheel' immediately.*\n\n**P3:** Why is 'Software Quality' so important in ISO 26262?\n*Answer: Because most modern failures are code-based. ISO 26262 mandates that ASIL-D code must be written with specific rules (like no 'Dynamic Memory') to prevent crashes or memory leaks.*\n\n**P4:** What is a 'Watchdog Timer'?\n*Answer: A simple hardware circuit. The main computer must 'pet' the watchdog every few milliseconds. If the computer freezes, it stops petting the watchdog, which then manually resets the whole system.*\n\n**P5:** Can a screen be 'ASIL' rated?\n*Answer: Yes. The dashboard screen (IPC) is often ASIL-B because it MUST correctly show your speed. If the screen freezes and says you are going 0 km/h while you are doing 100, that is a safety failure.*" }
        ],
        keyTakeaways: ['Functional safety addresses electronic malfunctions rather than physical crashes', 'ASIL-D is the highest safety requirement, reserved for brakes and steering', 'HARA (Hazard Analysis) identifies potential failure points before they are built', 'Fail-operational systems can continue driving even after a component fails', 'Software for critical systems must follow strict real-time coding standards'],
        vocabulary: [
          { term: 'ISO 26262', definition: 'The international standard for functional safety in road vehicles' },
          { term: 'ASIL', definition: 'Automotive Safety Integrity Level — a risk classification scheme' },
          { term: 'HARA', definition: 'Hazard Analysis and Risk Assessment — identifying system risks' },
          { term: 'Redundancy', definition: 'The duplication of critical components to increase system reliability' },
          { term: 'Fail-Safe', definition: 'A design feature that minimizes damage in the event of system failure' }
        ],
        quiz: {
          questions: [
            { id: 'q1', question: 'Which ASIL level is the MOST stringent for safety?', options: ['ASIL-A', 'ASIL-B', 'ASIL-C', 'ASIL-D'], correctAnswer: 3, explanation: 'ASIL-D is reserved for systems where failure likely lead to catastrophic results.' },
            { id: 'q2', question: 'A "Fail-Operational" system is different from "Fail-Safe" because:', options: ['It breaks faster', 'It keeps working even after a failure occurs', 'It is cheaper', 'It uses no power'], correctAnswer: 1, explanation: 'Critical autonomous systems must be fail-operational to safely pull the car over.' },
            { id: 'q3', question: 'A "Watchdog Timer" is used to:', options: ['Time how fast the car is', 'Detect if the computer has frozen and reset it', 'Count the laps', 'Check the oil'], correctAnswer: 1, explanation: 'It is a simple hardware failsafe for software freezes.' },
            { id: 'q4', question: 'HARA is performed during which stage of engineering?', options: ['After the car is sold', 'During the initial design phase', 'Only if someone crashes', 'Every Tuesday'], correctAnswer: 1, explanation: 'Hazard analysis must be baked into the design from the start.' },
            { id: 'q5', question: 'Functional Safety focuses on which type of failures?', options: ['Flat tires', 'Electronic malfunctions and software bugs', 'Dirty windshields', 'Running out of gas'], correctAnswer: 1, explanation: 'FuSa is strictly about the "Intelligence" and "Digital" systems failing safely.' }
          ]
        }
      },
      {
        id: 'human-factors-ergonomics',
        title: 'Human Factors: Ergonomics & HMI',
        duration: '15 min', xp: 200,
        description: 'Designing the interface between the human and the machine',
        aiTutor: true,
        introduction: "If a driver can't floor the brake because the seat is wrong, or if they crash because the touchscreen is too confusing, the car has failed its 'Human Factors' engineering. This lesson is about Ergonomics (Comfort/Fit) and HMI (Human-Machine Interface).",
        sections: [
          { title: '🎯 The 95th Percentile Rule', content: "**Designing for Everyone**\n\nEngineers use a 'Digital Mannequin' to test car interiors. \n- **The Range:** A car must fit everyone from the 5th percentile female (small) to the 95th percentile male (large). \n- **Adjustability:** This is why your seat moves in 12 directions and the steering wheel 'telescopes' in and out. If the car only fits 'average' people, it is dangerous for everyone else." },
          { title: '🔧 The "Blind" Reach Zone', content: "**Muscle Memory Engineering**\n\nCritical controls (Lights, Wipers, Turn Signals) must be in the 'Primary Reach Zone.' \n- These controls should have **Tactile Feedback** (a physical click). \n- **The Rule:** A driver should be able to turn on the wipers or the headlights without taking their eyes off the road. This is why many engineers prefer physical buttons over touchscreens for critical safety functions." },
          { title: '📐 Cognitive Load & HMI', content: "**Don’t Overwhelm the Driver**\n\n- **Cognitive Load:** The amount of 'Brain Power' needed to use a system. If the radio volume is hidden in 3 menus on a touchscreen, the cognitive load is too high, and the driver is' distracted.'\n- **HUD (Head-Up Display):** Beams the speed and navigation directly onto the windshield. This allows the driver's eyes to stay 'at infinity' rather than refocusing on the dashboard, saving about 0.5 seconds of reaction time." },
          { title: '🚀 NVH: Noise, Vibration, & Harshness', section: 'The Psychology of Quality', content: "**The Invisible Engineering**\n\nNVH is about what you feel and hear. \n- **Isolators:** Rubber mounts that keep the engine vibration from the chassis.\n- **Acoustic Glass:** Specialized windows that cancel out wind noise. \n- **The Goal:** Fatigue reduction. A loud, vibrating car makes the driver tired faster, which leads to slower reaction times and more accidents." },
          { title: '🧪 Human Factors Practice', content: "**P1:** What is 'Eye Box' in a HUD?\n*Answer: The 3D area where the driver's eyes can be and still see the digital projection on the windshield. A better HUD has a larger eye box, so the image doesn't 'disappear' if you tilt your head.*\n\n**P2:** Why are some turn signals 'Clicky'?\n*Answer: 'Haptic Feedback.' The sound and feel tell your brain the action was successful without you having to look at the dashboard icon.*\n\n**P3:** What is 'Package' in car design?\n*Answer: The geometric layout of the engine, wheels, and passengers. 'Packaging' is the puzzle of fitting a 6-foot human and a 400hp engine into a small, aerodynamic shape.*\n\n**P4:** What is 'Biomechanical Loading'?\n*Answer: The stress placed on joints (wrists, elbows) when using a control. An poorly placed shifter can cause long-term RSI (Repetitive Strain Injury) for taxi or truck drivers.*\n\n**P5:** Is a touchscreen 'Safer' than buttons?\n*Answer: Generally, no. Studies show physical buttons are safer for 'Primary' tasks (climate, volume) because they don't require visual attention. Touchscreens are better for 'Secondary' tasks like Navigation or Spotify.*" }
        ],
        keyTakeaways: ['Ergonomics ensures the car fits 90% of the human population', 'Primary controls must be reachable without taking eyes off the road', 'Head-Up Displays (HUD) reduce the time needed to check speed and nav', 'Low NVH (Noise/Vibration) reduces driver fatigue and improves safety', 'Cognitive load must be minimized to prevent distracted driving accidents'],
        vocabulary: [
          { term: 'Ergonomics', definition: 'The study of people’s efficiency in their working environment' },
          { term: 'HMI', definition: 'Human-Machine Interface — the dashboard, screens, and knobs' },
          { term: 'NVH', definition: 'Noise, Vibration, and Harshness — a measure of vehicle refinement' },
          { term: 'HUD', definition: 'Head-Up Display — data projected onto the windshield' },
          { term: 'Tactile', definition: 'Relating to the sense of touch' }
        ],
        quiz: {
          questions: [
            { id: 'q1', question: 'Vehicle ergonomics aims to fit which range of the population?', options: ['Only tall people', 'Exactly 50% (the average)', '5th to 95th percentile', 'Children only'], correctAnswer: 2, explanation: 'Engineering standards require cars to be adjustable for almost everyone.' },
            { id: 'q2', question: 'What is the main safety benefit of a "Head-Up Display" (HUD)?', options: ['It looks cool', 'It keeps the driver’s eyes on the road and at focal infinity', 'It saves gas', 'It has more colors'], correctAnswer: 1, explanation: 'Drivers don’t have to look down at the dashboard, reducing distracted time.' },
            { id: 'q3', question: '"NVH" stands for:', options: ['New Vehicle Heat', 'Noise, Vibration, and Harshness', 'Navigational Video Hub', 'Normalized Velocity Heat'], correctAnswer: 1, explanation: 'NVH engineering is about making the car quiet and smooth.' },
            { id: 'q4', question: 'Primary controls (Lights/Wipers) should ideally have:', options: ['Touchscreen menus only', 'Tactile feedback (physical buttons/clicks)', 'No labels', 'Voice control only'], correctAnswer: 1, explanation: 'Physical controls allow the driver to use "muscle memory" without looking.' },
            { id: 'q5', question: 'Cognitive Load refers to:', options: ['The weight of the car', 'The amount of brain-processing power required to operate the car', 'The size of the battery', 'The number of passengers'], correctAnswer: 1, explanation: 'Complex UI designs increase cognitive load and leads to driver distraction.' }
          ]
        }
      }
    ]
  }]
};

export default section4Safety;
