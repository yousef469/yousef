// Section 5: Rocket Design & Analysis — 5 Lessons
export const section5Design = {
  id: 'design',
  title: 'Unit 5: Rocket Design & Analysis',
  description: 'How engineers calculate, simulate, and design complex launch vehicles',
  icon: '📐',
  color: 'from-blue-600 to-indigo-700',
  units: [{
    id: 'design-engineering',
    title: 'Systems Engineering & Design',
    description: 'The process of designing a rocket from a blank sheet of paper',
    lessons: [
      {
        id: 'systems-engineering',
        title: 'Systems Engineering: The V-Model',
        duration: '10 min', xp: 200,
        description: 'Managing complexity in a machine with millions of parts',
        aiTutor: true,
        introduction: "A rocket isn't just an engine with a tank attached. It's a complex system of systems. Systems Engineering is the discipline that ensures when the engine vibrates, it doesn't shake the delicate satellite or snap the avionics wires. It is the glue that holds a multi-billion dollar project together.",
        sections: [
          { title: '🎯 Requirements: The "Shall" Statements', content: "**Starting with the End in Mind**\n\nEvery rocket starts with a set of **Requirements**. In engineering, these are written as 'The vehicle SHALL...' statements.\n\n**Example Requirements:**\n- The vehicle SHALL lift 20,000 kg to Low Earth Orbit.\n- The vehicle SHALL withstand 4G of longitudinal acceleration.\n- The avionics SHALL operate in temperatures from -40°C to +85°C.\n\n**Derived Requirements:**\nIf the whole rocket must lift 20 tons, the Systems Engineer 'derives' requirements for the parts: 'The engine SHALL produce 800 kN of thrust.' This creates a hierarchy where every bolt's existence is justified by a requirement." },
          { title: '🔧 The V-Model: Design to Verification', content: "**The Lifecycle of a Rocket**\n\nSystems engineering follows the 'V-Model':\n\n**The Left Side (Decomposition):**\n1. Concept of Operations (What's the mission?)\n2. High-Level Requirements (The whole rocket)\n3. Detailed Design (The individual parts)\n\n**The Bottom (Implementation):**\nBuild the parts.\n\n**The Right Side (Integration & Verification):**\n1. Component Test (Does the valve open?)\n2. Sub-system Test (Does the engine fire?)\n3. System Verification (Does the rocket work as a whole?)\n\n**Verification vs. Validation:**\n- **Verification:** Did we build the system RIGHT? (Does it meet the 800kN requirement?)\n- **Validation:** Did we build the RIGHT system? (Does it actually get the satellite to orbit?)" },
          { title: '📐 Trade Studies: Choosing the Best Path', content: "**Engineering is the Art of Compromise**\n\nA 'Trade Study' is a formal process for making decisions. \n\n**Example: Choosing a Propellant**\n- **Option A (Kerosene):** Cheap, dense, easy to handle. Lower performance.\n- **Option B (Hydrogen):** High performance, but requires massive tanks and extreme cooling.\n\nEngineers score these options based on **Weightings**: (Cost: 40%, Mass: 30%, Risk: 20%, Schedule: 10%). The result tells them which path is scientifically 'best' for that specific mission. There is no 'best' rocket, only the best rocket for a specific job." },
          { title: '🚀 Interfaces: Where Systems Meet', content: "**The Danger Zone**\n\nMost failures happen at **Interfaces** — the point where two different teams' work meets. \n\n**Interface Control Documents (ICD):**\nThis is a legal-style contract between sub-systems. \n- **Mechanical ICD:** Exactly where the bolt holes are and what size bolts to use.\n- **Electrical ICD:** How many volts are on Pin 1 of this connector?\n- **Software ICD:** What format is the data packet (JSON? Binary?) and how often is it sent?\n\nIf the Engine team changes a bolt hole by 1mm and doesn't update the ICD, the Tank team won't know, and the rocket can't be assembled. Systems Engineering manages these 'Handshakes'." },
          { title: '🧪 Systems Engineering Practice', content: "**P1:** Why are 'Shall' statements preferred over 'Must' or 'Will'?\n*Answer: 'Shall' is the legal standard in engineering contracts. It implies a mandatory, testable requirement. 'Will' often implies a statement of fact or future intent, which is harder to hold a contractor to.*\n\n**P2:** If a component fails Verification, what part of the V-Model do you go back to?\n*Answer: You go back across the 'V' to the corresponding Design or Requirement stage on the left side to see if the design was wrong or the requirement was unrealistic.*\n\n**P3:** What is the 'Concept of Operations' (ConOps)?\n*Answer: A high-level description of how the system will be used from start to finish (Launch → Ascent → Deployment → Disposal). It helps everyone understand the big picture before they get lost in the math.*\n\n**P4:** Why do engineers perform 'Mass Margin' analysis?\n*Answer: Because during design, everything gets heavier. Systems engineers track a 'Weight Budget' and keep a ~15% reserve (margin). If the rocket starts getting too heavy, they must 'trade' features or find ways to cut weight elsewhere.*\n\n**P5:** What is an ICD?\n*Answer: Interface Control Document. It defines the electrical, mechanical, and data boundaries between two system components to ensure they fit and work together.*" }
        ],
        keyTakeaways: ['Systems Engineering manages the "glue" between complex sub-systems', 'The V-Model traces requirements from concept to final testing', 'Verification checks if specs are met; Validation checks if the goal is achieved', 'Interface Control Documents (ICDs) prevent assembly and communication failures', 'Engineering is about making data-driven compromises (Trade Studies)'],
        vocabulary: [
          { term: 'Requirement', definition: 'A mandatory condition or capability that a system must conform to' },
          { term: 'V-Model', definition: 'System development lifecycle model tracing design to testing' },
          { term: 'Verification', definition: 'The process of confirming a system meets its specified requirements' },
          { term: 'ICD', definition: 'Interface Control Document — defines the boundaries between systems' },
          { term: 'Trade Study', definition: 'Objective evaluation of multiple technical solutions to find the best compromise' }
        ],
        quiz: {
          questions: [
            { id: 'q1', question: 'The primary language of engineering requirements is:', options: ['May', 'Could', 'Shall', 'Should'], correctAnswer: 2, explanation: "'Shall' denotes a mandatory, testable requirement." },
            { id: 'q2', question: 'Validation answers which question?', options: ['Did we build the system right?', 'Did we build the right system?', 'Is it cheap?', 'Does it look good?'], correctAnswer: 1, explanation: "Validation ensures the final product actually solves the user's problem." },
            { id: 'q3', question: 'An ICD (Interface Control Document) is used to:', options: ['Design engines', 'Define how components fit together', 'Calculate orbits', 'Buy materials'], correctAnswer: 1, explanation: 'It manages the boundaries and connections between different parts of the system.' },
            { id: 'q4', question: 'Mass Margin is used because:', options: ['Rockets are too light', 'Components tend to get heavier during design', 'To waste fuel', 'For better stability'], correctAnswer: 1, explanation: 'A mass buffer is necessary to account for the fact that designs get heavier as they become more detailed.' },
            { id: 'q5', question: 'In the V-Model, the right side represents:', options: ['Design', 'Concept', 'Integration and Testing', 'Manufacturing'], correctAnswer: 2, explanation: 'The left side is design/decomposition; the right side is assembly and verification.' }
          ]
        }
      },
      {
        id: 'mass-budget-balancing',
        title: 'Mass Budgets & The Tyranny of the KG',
        duration: '10 min', xp: 200,
        description: 'Every gram counts: Managing mass properties for stability and performance',
        aiTutor: true,
        introduction: "In rocketry, mass is life. Every kilogram added to the structure is a kilogram subtracted from the satellite or the crew's food. This lesson is about the Mass Budget — the most stressful spreadsheet in aerospace engineering.",
        sections: [
          { title: '🎯 Dry Mass vs. Wet Mass', content: "**The Weight of Fuel**\n\nA typical rocket (like Falcon 9) is ~90-95% fuel by weight. \n\n- **Dry Mass:** The weight of the empty rocket (metal, engines, computers).\n- **Wet Mass:** Dry mass plus all propellants (Fuel + Oxidizer).\n\n**The Ratio:**\nTo reach orbit, a single-stage rocket generally needs a 'Mass Fraction' of about 0.90 (90% fuel). If the structure is too heavy (Dry Mass is too high), the rocket will run out of fuel before it reaches orbital speed. This is why we use stages — we 'drop' the empty mass as soon as it's useless." },
          { title: '🔧 Center of Mass (CoM) vs. Center of Pressure (CoP)', content: "**The Stability Balance**\n\nMass isn't just about weight; it's about **Distribution**.\n\n- **Center of Mass (CoM):** The average position of all mass in the rocket. If you balanced the rocket on a finger, this is the point where it wouldn't tip.\n- **Center of Pressure (CoP):** The point where all aerodynamic (wind) forces act. Think of it as the 'Center of the Wind.'\n\n**The Rule of Stability:**\nThe CoM MUST be **higher** (closer to the nose) than the CoP. If the weight is at the back and the 'wind catcher' (fins) is at the front, the rocket will flip immediately. As fuel burns, the CoM moves. Engineers must ensure the rocket stays stable throughout the entire burn." },
          { title: '📐 Moment of Inertia: Resistance to Spinning', content: "**Why Long Rockets Turn Slower**\n\nMoment of Inertia (I) is the measure of how hard it is to rotate something. \n\n- A short, fat rocket rotates easily (Low I).\n- A long, skinny rocket is harder to start spinning, but harder to STOP once it starts (High I).\n\n**The Slosh Problem:**\nAs a rocket maneuvers, 400 tons of liquid oxygen can 'slosh' inside the tanks. This moves the CoM and changes the Moment of Inertia dynamically. High-speed computers must calculate these changes in real-time to adjust the engine steering (gimbals) accordingly." },
          { title: '🚀 Mass Margin: The Buffer', content: "**Accounting for Error**\n\nAt the start of a project, engineers use 'Estimated Mass.' As they actually build the part, it becomes 'Measured Mass.' \n\nA Systems Engineer manages the **Mass Margin**: \n- Concept phase: 20-30% margin.\n- Design phase: 10-15% margin.\n- Launch phase: 1-2% margin.\n\nIf the landing legs come in 500kg heavier than the budget, the engineer must find 500kg to cut from the tanks or the avionics. This is a constant game of 'weight loss' optimization." },
          { title: '🧪 Mass Analysis Practice', content: "**P1:** A rocket has a 500,000 kg wet mass and a 50,000 kg dry mass. What is the Propellant Mass Fraction?\n*Answer: (Wet - Dry) / Wet = 450,000 / 500,000 = 0.90 (or 90%).*\n\n**P2:** If you add heavy fins to the bottom of a rocket, does it become MORE or LESS stable?\n*Answer: MORE stable. Fins at the bottom pull the Center of Pressure (CoP) backward, increasing the distance between CoM and CoP (the 'static margin').*\n\n**P3:** Why does the Center of Mass move during flight?\n*Answer: Because fuel (which is 90% of the mass) is being consumed at the bottom of the tanks and ejected out the engine nozzle. The balance point of the vehicle shifts upward or downward depending on tank design.*\n\n**P4:** What is the 'Ballast' in a rocket?\n*Answer: Ballast is dead weight (like steel plates) added intentionally to adjust the Center of Mass or to simulate a payload when the real one isn't ready. Adding ballast is a 'last resort' because it wastes performance.*\n\n**P5:** If a rocket is 70 meters tall, is it harder to 'pitch' than a 10-meter rocket?\n*Answer: Yes. The Moment of Inertia increases with the square of the distance (I = m * r^2). Long rockets require much more gimbal force to rotate.*" }
        ],
        keyTakeaways: ['The Propellant Mass Fraction (90%+) is critical for reaching orbit', 'Stability requires Center of Mass (CoM) to be above Center of Pressure (CoP)', 'Moment of Inertia determines how much force is needed to steer the rocket', 'Propellant slosh dynamically changes the vehicle\'s center of gravity', 'Mass Margin accounts for the inevitable "weight gain" during engineering design'],
        vocabulary: [
          { term: 'Dry Mass', definition: 'The mass of a rocket without any propellant' },
          { term: 'Mass Fraction', definition: 'The ratio of propellant mass to total mission mass' },
          { term: 'Moment of Inertia', definition: 'A property which describes how much resistance an object has to rotational change' },
          { term: 'Static Margin', definition: 'The distance between the Center of Mass and Center of Pressure' },
          { term: 'Slosh', definition: 'Movement of liquid propellant inside tanks, which affects stability' }
        ],
        quiz: {
          questions: [
            { id: 'q1', question: 'For a stable flight, the Center of Pressure (CoP) must be:', options: ['Above the CoM', 'Below the CoM', 'At the very tip', 'Exactly aligned with CoM'], correctAnswer: 1, explanation: 'CoP below CoM (like a dart) provides aerodynamic stability.' },
            { id: 'q2', question: 'About what percentage of a rocket is fuel?', options: ['10%', '50%', '90%', '99%'], correctAnswer: 2, explanation: 'Most orbital rockets are 90-95% propellant.' },
            { id: 'q3', question: 'Moment of Inertia resists which motion?', options: ['Forward speed', 'Falling', 'Rotation', 'Vibration'], correctAnswer: 2, explanation: 'Inertia resists changes in rotation (Roll, Pitch, Yaw).' },
            { id: 'q4', question: 'Adding fins to the tail of a rocket:', options: ['Increases CoM', 'Lowers CoP', 'Increases CoP', 'Makes it lighter'], correctAnswer: 1, explanation: 'Fins move the Center of Pressure toward the rear of the vehicle.' },
            { id: 'q5', question: 'Propellant slosh is dangerous because it:', options: ['Cools the fuel', 'Moves the Center of Mass unexpectedly', 'Increases thrust', 'Makes the rocket heavier'], correctAnswer: 1, explanation: 'Moving liquid can destabilize a rocket by shifting the balance point.' }
          ]
        }
      },
      {
        id: 'aerodynamic-analysis',
        title: 'Aerodynamics: Flying Through the Soup',
        duration: '10 min', xp: 200,
        description: 'From Mach 1 to Max-Q: The invisible forces that can crush a rocket',
        aiTutor: true,
        introduction: "Rockets don't fly in a vacuum until they leave the earth. For the first two minutes, they are fighting an ocean of air. At high speeds, air becomes as hard as concrete. This lesson is about how we design rockets to survive the Aero phase of flight.",
        sections: [
          { title: '🎯 Mach Numbers and Shockwaves', content: "**Breaking the Sound Barrier**\n\nAs a rocket accelerates, it quickly approaches the speed of sound (**Mach 1** ~343 m/s). \n\n**Transonic Region (Mach 0.8 - 1.2):**\nThis is the most dangerous aerodynamic phase. Air moves around the rocket's nose at supersonic speeds while it's still subsonic, creating random, moving shockwaves. This can cause 'buffeting' — intense vibration that can literally shake a rocket apart. \n\n**Supersonic (Mach 1.2+):**\nOnce fully supersonic, a 'Bow Shock' forms at the tip. The air can't move out of the way fast enough, so it compresses into a thin, hot wave. Everything behind this wave must be designed to withstand that pressure." },
          { title: '🔧 Max-Q: The Breaking Point', content: "**Maximum Dynamic Pressure**\n\n**q = 0.5 * rho * v^2**\n\n- rho: Air Density (gets thinner as you go up)\n- v: Velocity (gets faster as you burn)\n\n**Max-Q** is the moment when these two balance out at their highest point. The air is pushing as hard as it possibly can against the rocket. \n\n**The SpaceX Trick:**\nDuring Max-Q (around 1 minute into flight), SpaceX actually **throttles down** the Merlin engines to reduce acceleration. Once they pass the thickest air and dynamic pressure drops, they throttle back up to 100%. This saves the rocket from having to be built extra heavy just to survive 30 seconds of thin-air wind." },
          { title: '📐 Drag Coefficients (Cd)', content: "**Slippery Shapes**\n\nA rocket's shape is optimized for minimum drag. \n- **The Nose Cone:** The 'Ogive' shape (a curved cone) is the most efficient for supersonic speeds. \n- **Interstage:** The gap between the first and second stage must be smooth. \n- **Skin Friction:** At high speeds, even the roughness of the paint causes drag and heat.\n\n**Total Drag:**\nDrag subtracts from your thrust. An 'un-aerodynamic' rocket requires more fuel to do the same job. But the trade-off is often complexity: the more complex the shape, the harder it is to build." },
          { title: '🚀 Atmospheric Heating: The Fire of Ascent', content: "**Air as a Blowtorch**\n\nAs you fly at Mach 5 through the atmosphere, air molecules don't have time to move. They collide with the rocket skin, generating immense heat through **Compression**. \n\nThe rocket's 'Nose Fairing' must be able to withstand ~600°C without melting or burning the satellite inside. Most fairings are made of aluminum honeycomb or carbon fiber with specialized thermal white paint to reflect heat and withstand the friction of launch." },
          { title: '🧪 Aerodynamics Practice', content: "**P1:** Why are rocket fins usually very thin and sharp compared to airplane wings?\n*Answer: Airplane wings are designed for subsonic lift (thick for air flow). Rocket fins are designed for supersonic stability (thin to minimize drag and shockwave resistance).*\n\n**P2:** If you double your speed, how much does the dynamic pressure (q) increase?\n*Answer: Speed is squared (v^2), so doubling speed increases pressure by 4 TIMES. This is why Max-Q comes so quickly as the rocket speeds up.*\n\n**P3:** At the top of the atmosphere, density is near zero. What is the dynamic pressure even if you are going Mach 20?\n*Answer: Near zero. If there are no air molecules (rho), there is no pressure (q). This is why ICBMs and rockets can fly thousands of km/h in space without heating up.*\n\n**P4:** What is 'Buffeting'?\n*Answer: Strong, turbulent vibrations caused by moving shockwaves during the transonic phase (near Mach 1). It's like driving a car over a very bumpy road at high speed.*\n\n**P5:** Why does the fairing separate as soon as the rocket leaves the atmosphere?\n*Answer: To save weight. The fairing (which can weigh 1,000kg+) is only needed to protect the payload from air pressure and heat. Once in space, it is 'dead weight' that reduces mission performance.*" }
        ],
        keyTakeaways: ['Transonic buffeting occurs near Mach 1 and causes intense vibration', 'Max-Q is the moment of maximum physical stress on the rocket structure', 'Rockets throttle down during Max-Q to reduce the "q" load', 'Shockwaves at supersonic speeds compress and heat the air', 'Fairings are jettisoned in space to increase fuel efficiency (payload capacity)'],
        vocabulary: [
          { term: 'Max-Q', definition: 'Maximum Dynamic Pressure — the peak aerodynamic load on the vehicle' },
          { term: 'Mach Number', definition: 'The ratio of an object\'s speed to the local speed of sound' },
          { term: 'Ogive', definition: 'A rounded, pointed geometric shape used for rocket nose cones' },
          { term: 'Transonic', definition: 'The speed range (Mach 0.8-1.2) where airflow is both sub- and supersonic' },
          { term: 'Dynamic Pressure', definition: 'The kinetic energy of the air per unit volume (1/2 rho v^2)' }
        ],
        quiz: {
          questions: [
            { id: 'q1', question: 'Max-Q occurs when which two values reach their combined peak?', options: ['Thrust and Mass', 'Altitude and Speed', 'Air Density and Velocity', 'Heat and Pressure'], correctAnswer: 2, explanation: 'Dynamic pressure is a function of both density (rho) and velocity (v).' },
            { id: 'q2', question: 'To survive Max-Q, many rockets do what?', options: ['Throttle down', 'Release fuel', 'Turn off computers', 'Expand the fairing'], correctAnswer: 0, explanation: 'Throttling down reduces the stress on the structure until they reach thinner air.' },
            { id: 'q3', question: 'Mach 1 represents:', options: ['The speed of light', 'The speed of sound', 'Orbital velocity', 'Escape velocity'], correctAnswer: 1, explanation: 'Mach 1 is the speed of sound (~343 m/s in air).' },
            { id: 'q4', question: 'Why is the "Transonic" region dangerous?', options: ['No air to breathe', 'Engines stop working', 'Moving shockwaves cause intense buffeting', 'Gravity is stronger'], correctAnswer: 2, explanation: 'The mixture of subsonic and supersonic flow creates turbulent shockwaves.' },
            { id: 'q5', question: 'Fairings are jettisoned (dropped) when:', options: ['On the launchpad', 'During Max-Q', 'When in the vacuum of space', 'Never'], correctAnswer: 2, explanation: 'Once air pressure is gone, the heavy fairing is no longer needed to protect the satellite.' }
          ]
        }
      },
      {
        id: 'safety-factors-margins',
        title: 'Safety Factors & Reliability',
        duration: '10 min', xp: 200,
        description: 'How strong is "strong enough"? Designing for failure without the weight',
        aiTutor: true,
        introduction: "In bridge building, you might make it 5 times stronger than needed. In rocketry, if you make it 5 times stronger, it will never leave the ground. Engineers must balance Safety with Mass. This is the study of Safety Factors and the statistics of reliability.",
        sections: [
          { title: '🎯 Factor of Safety (FoS)', content: "**The Definition of Confidence**\n\n**FoS = Failure Load / Expected Load**\n\n- **Aviation Standard:** 1.5 (Things fail at 150% of the maximum expected load).\n- **Rocket Standard:** 1.1 to 1.25. (Extremely tight! High precision required).\n- **Human-Rated Standard:** 1.4 (Increased safety for capsules carrying astronauts).\n\nIf a tank is expected to hold 100 PSI, and the FoS is 1.25, it must be designed to burst at 125 PSI. Any stronger is 'wasted weight.'" },
          { title: '🔧 Margin of Safety (MoS)', content: "**The Engineer's Scorecard**\n\nMargin of Safety tells you how much 'extra' strength you have left after accounting for your Safety Factor.\n\n**MoS = Actual Strength / (Safety Factor * Max Load) - 1**\n\n- **Positive Margin (>0):** The part is safe.\n- **Zero Margin (0):** The part is exactly as strong as the requirement (Perfect Engineering).\n- **Negative Margin (<0):** The part will fail. Must redesign.\n\nAerospace engineers aim for very small positive margins (e.g., +0.02). Large positive margins (+5.0) indicate a part that is 'overbuilt' and too heavy." },
          { title: '📐 Redundancy: 1+1 = Survival', content: "**Dealing with Statistics**\n\nEverything has a 'Reliability' (e.g., 99%). If a rocket has 100 parts with 99% reliability, the chance of the WHOLE rocket working is 0.99^100 = 36.6%. Too low!\n\n**Types of Redundancy:**\n- **Active Redundancy:** Both systems run at once (Triple Flight Computers).\n- **Standby Redundancy:** Backup system turns on only if Primary fails (Auxiliary batteries).\n- **Dissimilar Redundancy:** Two different ways to do the same thing (Parachutes + Thrusters) to prevent a 'common cause' failure." },
          { title: '🚀 FMEA: Thinking Like a Pessimist', content: "**Failure Mode and Effects Analysis**\n\nEngineers perform an FMEA for every single part. They ask three questions:\n1. **How can it fail?** (e.g., 'The seal leaks').\n2. **What is the effect?** (e.g., 'Fire in the engine bay').\n3. **How likely is it?** (1 to 10 scale).\n\nThey then calculate a **Risk Priority Number (RPN)**. Any part with a high RPN (High risk + Bad effect) MUST be redesigned with more redundancy or a higher Safety Factor." },
          { title: '🧪 Safety Practice', content: "**P1:** A beam handles 1,000kg. To have a Factor of Safety of 1.4, what load must it fail at during testing?\n*Answer: 1,000 * 1.4 = 1,400 kg.*\n\n**P2:** If an engineer calculates a Margin of Safety of -0.1, what does that mean?\n*Answer: The part is roughly 10% too weak. It will likely fail during service and needs to be thickened or made of stronger material.*\n\n**P3:** Why can't we just use a Safety Factor of 10 to be 'Super Safe'?\n*Answer: Mass. A Safety Factor of 10 would make the rocket tanks 10x thicker and heavier. Such a rocket would be too heavy to even lift itself off the pad, let alone reach orbit.*\n\n**P4:** What is 'Human-Rating'?\n*Answer: A certification given to rockets (like Falcon 9 + Crew Dragon) that meet higher safety standards, have more redundancy, and undergo much more intense testing than 'cargo-only' rockets.*\n\n**P5:** If you have two independent batteries, each with a 10% failure rate, what is the chance of TOTAL power failure?\n*Answer: 0.1 * 0.1 = 0.01 (1%). This shows how redundancy dramatically improves reliability even with imperfect parts.*" }
        ],
        keyTakeaways: ['Rockets use tight Safety Factors (1.25) to minimize weight', 'Margin of Safety measures "extra" strength relative to requirements', 'Redundancy protects against individual component failures', 'FMEA identifies and prioritizes the most dangerous risks', 'Human-rated vehicles require higher safety margins (1.4 FoS)'],
        vocabulary: [
          { term: 'Factor of Safety', definition: 'The ratio of a material\'s strength to the maximum expected stress' },
          { term: 'Margin of Safety', definition: 'The amount of safety factor remaining beyond requirements' },
          { term: 'FMEA', definition: 'Failure Mode and Effects Analysis — a systematic risk-assessment method' },
          { term: 'Human-Rated', definition: 'Certified as safe enough for human transportation' },
          { term: 'Common Cause Failure', definition: 'One event that causes multiple redundant systems to fail at once' }
        ],
        quiz: {
          questions: [
            { id: 'q1', question: 'A typical aerospace Factor of Safety is:', options: ['1.25', '2.0', '5.0', '10.0'], correctAnswer: 0, explanation: 'Tight margins (1.25 to 1.5) are necessary to keep the vehicle light enough to fly.' },
            { id: 'q2', question: 'A Margin of Safety of ZERO means:', options: ['The part will break', 'The part is perfectly engineered to requirements', 'The part is too heavy', 'The part has no mass'], correctAnswer: 1, explanation: 'Zero margin means it meets the safety factor exactly with no extra wasted weight.' },
            { id: 'q3', question: 'FMEA is used to:', options: ['Design engines', 'Identify and mitigate potential failures', 'Calculate orbits', 'Hire astronauts'], correctAnswer: 1, explanation: 'Failure Mode and Effects Analysis is the standard method for finding risks.' },
            { id: 'q4', question: 'Two redundant sensors with 90% reliability have a combined reliability of:', options: ['90%', '99%', '81%', '50%'], correctAnswer: 1, explanation: 'Failure chance is 10% * 10% = 1%. Success chance = 100 - 1 = 99%.' },
            { id: 'q5', question: 'Redundancy that uses two different technologies is called:', options: ['Dissimilar Redundancy', 'Active Redundancy', 'Slow Redundancy', 'Weak Redundancy'], correctAnswer: 0, explanation: 'Dissimilar redundancy prevents one bug or physics error from killing both systems.' }
          ]
        }
      },
      {
        id: 'simulation-software-tools',
        title: 'Simulation: Flying Before You Build',
        duration: '10 min', xp: 200,
        description: 'CFD, FEA, and GMAT — the software that replaces expensive failed launches',
        aiTutor: true,
        introduction: "In the 1960s, if you wanted to know if a rocket would explode, you built it and watched. Today, we fly a rocket 10,000 times on a computer before the first piece of metal is cut. This is the world of engineering simulation.",
        sections: [
          { title: '🎯 FEA: Structural Simulation', content: "**Finite Element Analysis**\n\nHow do you know if a tank will burst under 100 tons of weight? You divide the 3D model of the tank into millions of tiny triangles (elements). \n\n**The Computer Calculates:**\n- Stress at every single corner (node) of those triangles.\n- Heat flow from the engine into the metal.\n- Vibrations (resonance) that might shake things loose.\n\n**Result:** Engineers see a 'Heat Map' of stress. If one spot turns red, they know they need a thicker weld there. If it stays blue, they can cut some metal away to save weight." },
          { title: '🔧 CFD: Aerodynamic Simulation', content: "**Computational Fluid Dynamics**\n\nCFD simulates how air (or liquid fuel) flows. It is a Virtual Wind Tunnel.\n\n**Applications:**\n- **External Aero:** Calculating Max-Q and aerodynamic drag.\n- **Internal Flow:** Simulating how fuel enters the combustion chamber through the injector. \n- **Thermal:** Mapping the 3,000°C exhaust gas to see if it will melt the nozzle.\n\nCFD requires supercomputers. A single 10-second simulation of an engine fire can take weeks for a computer to calculate." },
          { title: '📐 GMAT & Mission Design', content: "**Calculating the Path**\n\n**Software (GMAT, STK, Kerbal!):**\nThese tools calculate the physics of orbital mechanics. They account for the gravity of the Earth, Moon, and Sun, and even the 'pressure' of light from the Sun hitting the rocket. \n\nEngineers use these to plan the 'Transfer Maneuvers.' They determine exactly which day and which second the rocket must launch to reach Mars with the least amount of fuel. This 'Mission Analysis' determines the fuel requirements for the entire vehicle design." },
          { title: '🚀 MBSE: The Modern Project Map', content: "**Model-Based Systems Engineering**\n\nOlder rockets were designed with thousands of paper blueprints. Modern rockets (like Starship) use **MBSE**. \n\nThe 'Digital Twin' is a central model that connects everything. If the Engine team increases the engine mass in the 3D model, the Mission team's simulation AUTOMATICALLY updates the available payload capacity on their screen. MBSE ensures the System of Systems stays in sync without thousands of meetings." },
          { title: '🧪 Simulation Practice', content: "**P1:** Why is FEA (Finite Element Analysis) better than hand calculations?\n*Answer: Hand calculations work for simple shapes like a tube. FEA works for complex, real-world shapes like a engine mount with holes, welds, and changing thicknesses that are impossible to solve on paper.*\n\n**P2:** What is a 'Digital Twin'?\n*Answer: A highly accurate virtual model of the rocket. As the real rocket flies, sensors feed data back to the digital twin, allowing engineers to see if the real vehicle is behaving exactly as predicted.*\n\n**P3:** Why is CFD (Fluid Dynamics) so computationally expensive?\n*Answer: Fluids are chaotic (turbulence). To be accurate, the computer must solve the Navier-Stokes equations for millions of small volumes of air, tracking pressure and temperature trillions of times over.*\n\n**P4:** If a simulation says the rocket will fail, but the math on paper says it's safe, which do you trust?\n*Answer: Usually neither! You investigate the discrepancy. Simulations are only as good as their models (Garbage In, Garbage Out). You use a 'Validation Test' to see which one matches reality.*\n\n**P5:** What is 'Monte Carlo' simulation in rocketry?\n*Answer: Running the same launch 1,000 times with random variations (e.g., wind at 5mph, 10mph, 15mph). If the rocket reaches orbit 995 times out of 1,000, you have a 99.5% confidence in the launch window.*" }
        ],
        keyTakeaways: ['FEA (Finite Element Analysis) predicts structural failure and stress', 'CFD (Fluid Dynamics) simulates air and fuel flow without a wind tunnel', 'Mission Design software (like GMAT) calculates interplanetary trajectories', 'MBSE creates a "Digital Twin" where changes sync automatically', 'Simulations allow for "testing" failure scenarios that are too dangerous in real life'],
        vocabulary: [
          { term: 'FEA', definition: 'Finite Element Analysis — structural simulation via mesh decomposition' },
          { term: 'CFD', definition: 'Computational Fluid Dynamics — numerical simulation of gas and liquid flow' },
          { term: 'GMAT', definition: 'General Mission Analysis Tool — open source orbital mechanics software' },
          { term: 'Monte Carlo', definition: 'Statistical technique using repeated random sampling to find probability' },
          { term: 'Digital Twin', definition: 'A virtual representation that serves as the real-time digital counterpart of a physical object' }
        ],
        quiz: {
          questions: [
            { id: 'q1', question: 'FEA is used primarily to simulate:', options: ['Air flow', 'Structures and stresses', 'Orbits', 'Marketing'], correctAnswer: 1, explanation: 'Finite Element Analysis checks if parts will bend or break under load.' },
            { id: 'q2', question: 'CFD stands for:', options: ['Continuous Fuel Delivery', 'Computational Fluid Dynamics', 'Computer Flight Design', 'Calculated Flow Data'], correctAnswer: 1, explanation: 'CFD is the study of how gases and liquids move.' },
            { id: 'q3', question: 'A "Digital Twin" is:', options: ['A second rocket', 'A virtual model of the real rocket', 'An identical twin astronaut', 'A backup hard drive'], correctAnswer: 1, explanation: 'It is a high-fidelity virtual model that mirrors the behavior of the real hardware.' },
            { id: 'q4', question: 'Monte Carlo simulation is used to find:', options: ['The cheapest fuel', 'The probability of success', 'The heaviest part', 'The tallest rocket'], correctAnswer: 1, explanation: 'By running thousands of random-variation sims, you find the statistical success rate.' },
            { id: 'q5', question: 'Why separate the payload fairing based on simulation?', options: ['To save power', 'To reduce weight as soon as drag is low', 'For better radio', 'To cool the satellite'], correctAnswer: 1, explanation: 'Sims show exactly where drag becomes low enough to drop the heavy fairing safely.' }
          ]
        }
      }
    ]
  }]
};

export default section5Design;