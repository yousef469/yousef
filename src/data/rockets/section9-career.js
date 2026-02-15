// Section 9: Future & Careers — 5 Lessons
export const section9Career = {
    id: 'future-career',
    title: 'Unit 9: Future & Careers',
    description: 'The road to Mars and how you can join the space industry',
    icon: '🌌',
    color: 'from-purple-600 to-indigo-900',
    units: [{
        id: 'industry-future',
        title: 'The New Space Age',
        description: 'Advanced concepts and professional engineering paths',
        lessons: [
            {
                id: 'reusability-revolution',
                title: 'Reusability: The Rapid Turnaround',
                duration: '10 min', xp: 200,
                description: 'How to fly a rocket 100 times without a rebuild',
                aiTutor: true,
                introduction: "For decades, the limiting factor of space was cost. Improving reusability is the single most important delta in modern aerospace. This lesson is about how we move from landing a rocket to 'Rapid Reflight' — where a rocket launches twice in the same day.",
                sections: [
                    { title: '🎯 The Cost Curves', content: "**Why Reusability Matters**\n\nA Falcon 9 costs roughly $60M to build. \n- **Expendable:** $60M per launch.\n- **Reusable (10 flights):** $6M per launch (plus fuel/refurbishment).\n- **Reusable (100 flights):** $600k per launch.\n\nOnce the build cost is spread over hundreds of flights, the only major costs are **Fuel** (~$400k) and **Operations**. This makes space as accessible as international air travel." },
                    { title: '🔧 Refurbishment: The Inspection Loop', content: "**Wear and Tear in Space**\n\nWhen a rocket returns, it has been through 'The Fire.' Engineers look for:\n- **Thermal Fatigue:** Are there cracks in the engine nozzle from the heat?\n- **Sooting:** Does the RP-1 (kerosene) exhaust clog the pipes? (This is why Starship uses Methane — it's cleaner).\n- **Structural Health:** Did the air pressure during Max-Q bend the frame?\n\n**The Goal:** A 'Clean-Sheet' inspection where the rocket lands, is checked by a computer in minutes, refueled, and launched again." },
                    { title: '📐 Stainless Steel vs. Composites', section: 'The Reusability Material', content: "**Why Starship is Metal**\n\nSpaceX moved from carbon fiber to **301 Stainless Steel** for Starship. \n1. **Melting Point:** Steel handles 800°C; Carbon fiber fails at 200°C. \n2. **Cryo-Strength:** Steel gets stronger at -180°C.\n3. **Repair:** You can weld a patch on a steel rocket in a desert; repairing carbon fiber requires an autoclave and a clean room. \n\nSteel is the material of 'The Industrialization of Space.'" },
                    { title: '🚀 The Orbital Depot: Gas Stations in Space', content: "**Refueling for Mars**\n\nYou can't launch a rocket direct to Mars with a useful amount of cargo. \n\n**The Plan:**\n1. Launch Starship to Earth Orbit (Empty on fuel but full of cargo).\n2. Launch 5 'Tanker' Starships to meet it.\n3. Transfer fuel in zero-G. \n4. The first Starship is now in orbit, fully fueled, and ready for the long trip to Mars with 100 tons of payload. This is 'Orbital Refilling' and it is the key to the solar system." },
                    { title: '🧪 Reusability Practice', content: "**P1:** Why is Methane (Methalox) better for reusability than Kerosene (RP-1)?\n*Answer: Kerosene is basically 'Rocket Grade Jet-Fuel.' When it burns, it leaves behind black soot (carbon) that clogs engine valves and injectors. Methane burns extremely clean, leaving the engine looking almost new after firing, which reduces maintenance time.*\n\n**P2:** What is 'Maintenance-Free' flight?\n*Answer: The ultimate engineering goal where a machine doesn't need to be taken apart between uses. Just like you don't rebuild your car engine after every drive, we want rockets that can fly, land, and fly again 1 hour later.*\n\n**P3:** Why does Starship have 'Flaps' instead of traditional wings?\n*Answer: Because it re-enters 'Belly-First' like a skydiver. The 4 flaps (2 top, 2 bottom) act like an athlete's arms and legs, controlling the 'Pitch' and 'Roll' as it falls through the atmosphere to shed speed.*\n\n**P4:** What is 'Full and Rapid Reusability'?\n*Answer: When the FIRST and SECOND stages are both recovered. Currently, SpaceX only recovers the 1st stage. Full reusability means NOTHING is thrown away except the fuel.*\n\n**P5:** Can you land a rocket on the Moon without a launchpad?\n*Answer: Yes, but it's hard. The engine exhaust will kick up moon-dust (regolith) that can damage the ship. Future Mars and Moon bases will need to build landing pads using 3D-printed moon-dirt before 'rapid' operations can begin.*" }
                ],
                keyTakeaways: ['Reusability reduces the cost of spaceflight by orders of magnitude', 'Methane fuel (Methalox) is preferred for rapid reuse because it is soot-free', 'Stainless Steel is superior to composites for high-temperature atmospheric entry', 'Orbital Refilling enables heavy missions to the Moon and Mars', 'Rapid turnaround requires minimizing inspection and refurbishment time'],
                vocabulary: [
                    { term: 'Delta-V', definition: 'The change in velocity required to perform a maneuver' },
                    { term: 'Methalox', definition: 'Methane and Liquid Oxygen propellant combination' },
                    { term: 'Refurbishment', definition: 'The process of cleaning and repairing a vehicle for its next flight' },
                    { term: 'Orbital Refilling', definition: 'Transferring propellant between two spacecraft in orbit' },
                    { term: 'Sooting', definition: 'The accumulation of carbon residue inside an engine from kerosene fuel' }
                ],
                quiz: {
                    questions: [
                        { id: 'q1', question: 'Which fuel is "cleanest" for reusable engines?', options: ['Kerosene (RP-1)', 'Methane (CH4)', 'Solid Fuel', 'Coal'], correctAnswer: 1, explanation: 'Methane burns clean without leaving soot inside the engine pipes.' },
                        { id: 'q2', question: 'Starship uses Stainless Steel because it:', options: ['Is shiny', 'Is cheap and handles high heat better than carbon fiber', 'Is lighter than air', 'It never rusts'], correctAnswer: 1, explanation: 'Steel’s high melting point and cryogenic strength make it ideal for reentry and lox tanks.' },
                        { id: 'q3', question: 'Orbital Refilling is required to:', options: ['Wash the rocket', 'Get heavy payloads to Mars', 'Find water on the Moon', 'Cool the astronauts'], correctAnswer: 1, explanation: 'It allows a mission to leave Earth orbit with 100% of its fuel capacity.' },
                        { id: 'q4', question: 'A "Rapid" turnaround target for Starship is:', options: ['Once a year', 'Once a month', 'Multiple times per day', 'Never'], correctAnswer: 2, explanation: 'To make space travel like air travel, rockets must fly many times a day.' },
                        { id: 'q5', question: 'What is the most expensive part of a modern disposable rocket?', options: ['The fuel', 'The first stage structure and engines', 'The paint', 'The astronaut food'], correctAnswer: 1, explanation: 'Building the engines and tanks for every flight is the primary cost of space.' }
                    ]
                }
            },
            {
                id: 'space-economy-isru',
                title: 'Space Economy: Mining & Mars',
                duration: '10 min', xp: 200,
                description: 'Living off the land: How we survive without Earth\'s help',
                aiTutor: true,
                introduction: "If you carry every liter of water and every gram of fuel from Earth, you will never have a city on Mars. It's too expensive. To stay in space, we must learn to 'Live off the land.' This is ISRU — In-Situ Resource Utilization.",
                sections: [
                    { title: '🎯 ISRU: Making Fuel on Mars', content: "**The Sabatier Reaction**\n\nMars has an atmosphere of CO2 and (we believe) underground ice (H2O). \n\n**The Recipe:**\n1. Dig up ice and turn it into Water (H2O).\n2. Use electricity (Solar/Nuclear) to split H2O into Hydrogen (H2) and Oxygen (O2).\n3. Combine Hydrogen with Martian CO2: **CO2 + 4H2 → CH4 + 2H2O**\n\n**Result:** You just made **Methane (CH4)** and **Oxygen (O2)** — the exact fuel you need to fly home. Mars is a giant gas station." },
                    { title: '🔧 Space Mining: The Asteroid Gold-Rush', content: "**Mountains of Metal**\n\nA small, 100-meter asteroid can contain more Gold, Platinum, and Iridium than is mined on Earth in a decade. \n\n**The Real Treasure (Water):**\nMore importantly, many asteroids are full of frozen water. In space, water isn't just for drinking; it's **Propellant**. If we can mine water from asteroids, we can refuel rockets in deep space without ever landing back on Earth. This creates a 'Space Economy' where rockets never have to fight Earth's gravity twice." },
                    { title: '📐 Orbital Manufacturing: Zero-G Factories', content: "**Building Better than Earth**\n\nSome things can ONLY be made in zero-gravity:\n- **ZBLAN Fiber:** A fiber-optic cable that is 100x better than Earth-made glass, because in zero-G, the glass doesn't 'settle' and form crystals.\n- **Organ Printing:** You can 3D print human hearts in space without them collapsing under their own weight. \n- **Giant Structures:** We can't launch a 1-kilometer telescope on a rocket. But we can launch a 3D printer that 'builds' the telescope in orbit." },
                    { title: '🚀 The Kessler Syndrome: The Risk', section: 'Protecting the Future', content: "**The Space Debris Problem**\n\nAs the space economy grows, we launch more satellites. If they collide, they create thousands of pieces of 'Junk.' \n\n**The Chain Reaction:**\nOne collision creates debris → the debris hits another satellite → more debris. This is the **Kessler Syndrome**. If it happens, we could be 'locked' on Earth because the debris cloud is moving at Mach 25 and would shred any rocket trying to leave. Modern companies (SpaceX/Starlink) solve this by ensuring every satellite can 'Orbit Decay' and burn up in the atmosphere when empty." },
                    { title: '🧪 ISRU Practice', content: "**P1:** What is 'In-Situ' Resource Utilization?\n*Answer: It means 'Using what's there.' Instead of bringing everything from Earth, you use the dirt, ice, and air on the Moon or Mars to build and survive.*\n\n**P2:** Why is 'Lunar Water' so important?\n*Answer: Water can be split into Hydrogen (Fuel) and Oxygen (Air). The Moon has water ice in deep craters. This makes the Moon a perfect 'Stop' on the way to the rest of the solar system.*\n\n**P3:** What is 'Space Debris' made of?\n*Answer: Mostly old rocket parts, dead satellites, and even flecks of paint. Because they orbit at 17,500 mph, even a paint fleck has the energy of a bullet and can pierce a space station hull.*\n\n**P4:** How do you 'mine' an asteroid?\n*Answer: You don't use a pickaxe! You use 'bagging' (wrapping the asteroid in a net) or 'optical mining' (using mirrors to focus sunlight and vaporize the ice/rock) to collect the materials.*\n\n**P5:** What is the 'Sabatier Reaction'?\n*Answer: A chemical process that turns Carbon Dioxide and Hydrogen into Methane and Water. It's the 'Key' to making fuel on Mars so we can fly back to Earth.*" }
                ],
                keyTakeaways: ['ISRU (Living off the land) is the key to permanent space settlements', 'The Sabatier Reaction allows us to manufacture rocket fuel on Mars', 'Asteroid mining could provide unlimited metal and propellant for deep space missions', 'Zero-G manufacturing enables high-performance materials impossible on Earth', 'Kessler Syndrome is the risk of a debris chain-reaction blocking access to space'],
                vocabulary: [
                    { term: 'ISRU', definition: 'In-Situ Resource Utilization — using local resources for mission support' },
                    { term: 'Sabatier Reaction', definition: 'A chemical reaction producing methane and water from CO2 and H2' },
                    { term: 'Kessler Syndrome', definition: 'A scenario where the density of objects in LEO is high enough that collisions create a cascading debris field' },
                    { term: 'Regolith', definition: 'A layer of loose, heterogeneous superficial deposits covering solid rock (Moon/Mars dirt)' },
                    { term: 'LEO', definition: 'Low Earth Orbit — the region of space within 2,000 km of Earth' }
                ],
                quiz: {
                    questions: [
                        { id: 'q1', question: 'ISRU stands for:', options: ['International Space Radio Unit', 'In-Situ Resource Utilization', 'Internal System Recovery Unit', 'Island Space Rocket University'], correctAnswer: 1, explanation: 'Using local materials like Martian ice to make fuel.' },
                        { id: 'q2', question: 'The Sabatier reaction is used to make:', options: ['Gold', 'Methane and Water', 'Computer chips', 'Electricity'], correctAnswer: 1, explanation: 'It is the core chemical reaction for Martian fuel production.' },
                        { id: 'q3', question: 'Kessler Syndrome is a danger involving:', options: ['Space aliens', 'Debris collisions in orbit', 'Sun radiation', 'Bad fuel'], correctAnswer: 1, explanation: 'A chain reaction of satellite collisions could trap us on Earth.' },
                        { id: 'q4', question: 'Why make fiber-optic cable in space?', options: ['It is cheaper to ship', 'Zero-G prevents glass crystal defects', 'There is more light in space', 'To talk to aliens'], correctAnswer: 1, explanation: 'Lack of gravity allows for ultra-pure glass structures.' },
                        { id: 'q5', question: 'Regolith is another name for:', options: ['Rocket fuel', 'Moon/Mars "Dirt"', 'The Pilot', 'A type of star'], correctAnswer: 1, explanation: 'Regolith is the crushed rock and dust covering planetary surfaces.' }
                    ]
                }
            },
            {
                id: 'aerospace-career-paths',
                title: 'Aerospace Careers: Hardware, Software, & Systems',
                duration: '10 min', xp: 200,
                description: 'How to build your path into SpaceX, NASA, or Blue Origin',
                aiTutor: true,
                introduction: "You don't just have to be an 'Aerospace Engineer' to work on rockets. Modern spaceflight needs everyone: from Python programmers and materials scientists to welders and doctors. This lesson maps out the real-world roles in the industry and the skills you need to master.",
                sections: [
                    { title: '🎯 The Hardware Track: Mechanical & Materials', content: "**Building the Machine**\n\nIf you love designing things you can touch, this is for you.\n- **Mechanical Engineer:** Design engine mounts, landing legs, and fairings. (Skills: CAD (SolidWorks), FEA, Statics).\n- **Materials Scientist:** Develop new alloys and heat shields that can survive reentry. (Skills: Chemistry, Metallurgy).\n- **Structural Engineer:** The 'Skin' experts. They ensure the rocket doesn't buckle under Max-Q. (Skills: Composites, Vibration analysis)." },
                    { title: '🔧 The Software Track: GNC & Embedded', content: "**The Brains of the Rocket**\n\nA modern rocket is a computer with engines attached.\n- **Embedded C/C++ Developer:** Write the code that runs in the Flight Computer. It must be 100% bug-free and 'Real-Time.'\n- **GNC Engineer (The Math Experts):** Write the algorithms for the 'Suicide Burn' and Guidance laws. (Skills: Control Theory, PID, Kalman Filters).\n- **Simulation Engineer:** Build the 'Digital Twin' models to test missions 10,000 times before launch. (Skills: Python, C++, Physics)." },
                    { title: '📐 The Systems Track: The Big Picture', content: "**The Glue of the Project**\n\n- **Systems Engineer:** They don't design one part; they manage the INTERFACES between all parts. They track the Mass Budget and the Power Budget. \n- **Mission Analyst:** They calculate the orbits and the launch windows. (Skills: Orbital Mechanics, Math).\n- **Reliability/Safety Engineer:** They think like a pessimist. They perform FMEA (Failure Mode analysis) to ensure a single wire failure doesn't kill the mission." },
                    { title: '🚀 The Ops Track: Launch & Manufacturing', content: "**Real-World Execution**\n\n- **Production Engineer:** Figuring out how to build 100 rockets a year, not just one. (Skills: 3D printing, Welding, Robotics).\n- **Launch Controller (LD):** The people in Mission Control who 'flick the switches' and run the countdown.\n- **Recovery specialist:** Operating the droneships, tugs, and catching helicopters." },
                    { title: '🧪 Career Practice', content: "**P1:** What is the most important skill for a rocket programmer?\n*Answer: Understanding 'Deterministic' systems. You can't have code that 'usually' works fast; it must work within exact millisecond deadlines every single time.*\n\n**P2:** Do I need a PhD to work at SpaceX?\n*Answer: No. Many top engineers only have a Bachelor's degree. In New Space companies, they value 'Projects' more than 'Degrees.' Have you built a high-power rocket? Have you coded a flight sim? Experience wins.*\n\n**P3:** What is CAD?\n*Answer: Computer-Aided Design. Tools like Solidworks or CATIA allow you to build a 3D model of a part, test its weight, and see if it fits other parts before you build it.*\n\n**P4:** What is 'Control Theory'?\n*Answer: The math of 'Correction.' If the wind pushes the rocket 5 degrees left, how much should the engine turn to fix it without 'over-shooting' and crashing? This is the core of GNC engineering.*\n\n**P5:** Which role works on 'Human Habitats'?\n*Answer: Biomedical Engineers and Life Support (EECOM) specialists. They ensure humans have air, water, and don't get radiation poisoning during 6-month trips.*" }
                ],
                keyTakeaways: ['Modern aerospace requires a mix of mechanical, software, and systems expertise', 'GNC engineers focus on the math of stable flight and landing', 'Embedded developers write high-reliability, real-time code in C/C++', 'Systems engineers manage the complex interactions between different departments', 'Practical projects and "hands-on" experience are highly valued by space companies'],
                vocabulary: [
                    { term: 'CAD', definition: 'Computer-Aided Design — software used to create 3D engineering models' },
                    { term: 'Embedded Systems', definition: 'Computer systems with a dedicated function within a larger mechanical or electrical system' },
                    { term: 'Control Theory', definition: 'Mathematical branch dealing with the behavior of dynamical systems with inputs' },
                    { term: 'FEA', definition: 'Finite Element Analysis — structural stress simulation' },
                    { term: 'Kalman Filter', definition: 'An algorithm used to provide estimates of unknown variables given a sequence of measurements observed over time' }
                ],
                quiz: {
                    questions: [
                        { id: 'q1', question: 'Which role specializes in "How the rocket steers"?', options: ['Marketing', 'GNC Engineer', 'Painter', 'Accountant'], correctAnswer: 1, explanation: 'Guidance, Navigation, and Control experts handle the math of flight.' },
                        { id: 'q2', question: 'A Software Engineer for a rocket usually writes code in:', options: ['HTML', 'C / C++', 'Excel', 'Photoshop'], correctAnswer: 1, explanation: 'Rockets require high-performance, real-time code found in C and C++.' },
                        { id: 'q3', question: 'Systems Engineering is primarily about:', options: ['Designing one engine bolt', 'Managing interfaces and the overall "V-Model"', 'Fueling the rocket', 'Hiring pilots'], correctAnswer: 1, explanation: 'Systems engineers ensure all the complex parts work together as a single machine.' },
                        { id: 'q4', question: 'CAD stands for:', options: ['Cold Air Delivery', 'Computer-Aided Design', 'Calculated Astro Data', 'Control and Design'], correctAnswer: 1, explanation: 'CAD tools like SolidWorks are the industry standard for 3D modeling.' },
                        { id: 'q5', question: 'To get a job in "New Space" (SpaceX/RocketLab), it is best to have:', options: ['Only a textbook', 'Hands-on projects and experience', 'A nice suit', 'A lot of money'], correctAnswer: 1, explanation: 'Practical experience (Formula SAE, high-power rockets) is highly valued.' }
                    ]
                }
            },
            {
                id: 'advanced-propulsion-nuclear',
                title: 'Advanced Propulsion: Nuclear, Ion, & Fusion',
                duration: '10 min', xp: 200,
                description: 'Moving beyond chemical fire to reach the stars',
                aiTutor: true,
                introduction: "Chemical rockets are at their limit. To reach the outer planets in months instead of years, we need a new kind of power. This lesson explores the 'Sci-Fi' engines that are being built in labs today: Nuclear Thermal, Ion, and the dream of Fusion.",
                sections: [
                    { title: '🎯 Ion Thrusters: The Efficient Weaklings', content: "**Electricity instead of Fire**\n\nInstead of burning fuel, an Ion thruster uses electricity to strip electrons off a gas (like Xenon), creating Ions. It then uses magnetic fields to 'flick' those ions out the back at 100,000 mph.\n\n- **Efficiency:** 10x better than the best chemical rocket.\n- **Thrust:** Very, very weak. (About the weight of a piece of paper).\n\n**The Trade-off:** Ion engines take months to accelerate a ship, but they use very little fuel. They are perfect for satellites and long-distance cargo ships." },
                    { title: '🔧 NTP: Nuclear Thermal Propulsion', content: "**The Best of Both Worlds**\n\nIn an NTP engine, you don't burn anything. You take a Nuclear Reactor and pass Hydrogen through it. The reactor instantly heats the hydrogen to 2,500°C, and it expands out the nozzle.\n\n- **Performance:** 2x as much 'Isp' as the best chemical engine (900s vs 450s).\n- **Speed:** Can get astronauts to Mars in 3 months instead of 6-9 months.\n\n**Safety:** The reactor only turns on ONCE the rocket is safely in space, so there is no risk of radiation on Earth if the launch fails." },
                    { title: '📐 Fusion Propulsion: The Starship Goal', content: "**Miniature Suns**\n\nIf we can master Fusion (squeezing hydrogen into helium), we can achieve the 'Holy Grail' of spaceflight. \n- **Isp:** 10,000s to 1,000,000s. \n- **Speed:** Can reach 10% of the speed of light. \n\nWith Fusion, the entire solar system becomes reachable in days. We are currently in the early 'Experimental' phase, testing how to contain the 100-million-degree plasma with magnets." },
                    { title: '🚀 Solar Sails: Riding the Light', section: 'No Fuel Required', content: "**Photonic Pressure**\n\nLight has no mass, but it has 'Momentum.' If you build a giant, mirrors-like sail (kilometers wide), the sunlight hitting it will push the ship forward. \n- **Advantage:** No fuel. \n- **Speed:** Slow at first, but with a powerful laser on Earth 'pushing' the sail, a small probe could reach the nearest star (Alpha Centauri) in just 20 years. This is the goal of 'Project Starshot.'" },
                    { title: '🧪 Advanced Propulsion Practice', content: "**P1:** Why is Ion propulsion bad for launching off Earth?\n*Answer: Because its thrust is lower than its weight. An Ion engine can't lift even its own battery off the ground. It only works in the friction-less vacuum of space where tiny force adds up over time.*\n\n**P2:** What is 'Isp' and why is it higher for Nuclear?\n*Answer: Specific Impulse (Isp) is 'Fuel Economy.' Nuclear is higher because the exhaust velocity of hot Hydrogen is much faster than the heavy exhaust of Kerosene/Oxygen fire.*\n\n**P3:** Is Nuclear Thermal Propulsion dangerous for the crew?\n*Answer: Heavy shielding (Lead/Polyethylene) is placed between the reactor and the crew cabin. Since the engine is at the back and the crew is at the front, distance also provides safety.*\n\n**P4:** What gas do Ion thrusters usually use?\n*Answer: Xenon. It is heavy, easy to ionize, and inert so it doesn't corrode the engine. It is expensive, however, which is why Starlink uses Krypton or Argon.*\n\n**P5:** What is 'Hall Effect'?\n*Answer: A type of Ion thruster that uses a magnetic ring to trap electrons, which then ionize the gas. It is the most common 'Electric' engine used for satellites today.*" }
                ],
                keyTakeaways: ['Ion thrusters are highly efficient but produce very low thrust', 'Nuclear Thermal Propulsion (NTP) could halve the travel time to Mars', 'Fusion propulsion remains the ultimate (but unproven) goal for interstellar flight', 'Solar sails use light pressure to move without any onboard fuel', 'Specific Impulse (Isp) measures how much "punch" you get from each kg of fuel'],
                vocabulary: [
                    { term: 'Ion', definition: 'An atom or molecule with a net electric charge due to the loss or gain of electrons' },
                    { term: 'Isp', definition: 'Specific Impulse — a measure of fuel efficiency in rockets' },
                    { term: 'NTP', definition: 'Nuclear Thermal Propulsion — using a nuclear reactor to heat propellant' },
                    { term: 'Photons', definition: 'Particles of light that carry momentum' },
                    { term: 'Plasma', definition: 'A state of matter consisting of free-moving ions and electrons' }
                ],
                quiz: {
                    questions: [
                        { id: 'q1', question: 'Ion thrusters are best suited for:', options: ['Launching from Earth', 'Maneuvering in space and long missions', 'Landing on the moon', 'Blowing up asteroids'], correctAnswer: 1, explanation: 'High efficiency but low thrust makes them perfect for deep space and satellites.' },
                        { id: 'q2', question: 'How does Nuclear Thermal Propulsion (NTP) work?', options: ['Burning nuclear fuel with oxygen', 'Heating hydrogen gas with a nuclear reactor', 'Using a nuclear bomb for thrust', 'None of these'], correctAnswer: 1, explanation: 'A reactor heats liquid hydrogen until it expands out the nozzle.' },
                        { id: 'q3', question: 'Specific Impulse (Isp) is effectively:', options: ['The size of the rocket', 'The fuel economy (efficiency)', 'The color of the exhaust', 'The price of the fuel'], correctAnswer: 1, explanation: 'Higher Isp means you get more thrust for every kilogram of propellant.' },
                        { id: 'q4', question: 'Solar Sails are powered by:', options: ['Wind in space', 'The pressure of light (photons)', 'Solar panels', 'Batteries'], correctAnswer: 1, explanation: 'Light hitting a mirror-like sail exerts a small but constant force.' },
                        { id: 'q5', question: 'Fusion propulsion could potentially reach:', options: ['Mars in a year', 'The edge of the solar system in a day', 'Significant fractions of the speed of light', 'The bottom of the ocean'], correctAnswer: 2, explanation: 'Fusion releases enough energy to make interstellar travel theoretically possible.' }
                    ]
                }
            },
            {
                id: 'capstone-mission-design',
                title: 'Capstone: Designing Your Mars Landing',
                duration: '20 min', xp: 500,
                description: 'Final Exam: Putting all 50 lessons together for a trip to the red planet',
                aiTutor: true,
                introduction: "Congratulations. You have mastered the science of engines, structures, math, and operations. Now, it's time for the final exam. You are the Lead Systems Engineer. Your mission: Land a 10-ton rover on Mars and return the data to Earth. In this lesson, we walk through the 'Trade Studies' you must perform to succeed.",
                sections: [
                    { title: '🎯 Step 1: The Mass Budget', content: "**The Math of Survival**\n\nYou start with a 10-ton (10,000 kg) Rover. \n- **The Heat Shield:** 2,000 kg.\n- **The Descent Stages (Fuel):** 20,000 kg.\n- **The Cruise Stage:** 5,000 kg.\n\n**Total Payload:** 37,000 kg. \n\n**The Trade-off:** If your rover grows by 1 ton, you need 5 tons of extra fuel on the rocket. You must 'Iterate' the design until the rocket is strong enough to lift the total mass." },
                    { title: '🔧 Step 2: Choosing the Propulsion', content: "**The Sabatier Choice**\n\nDo you bring fuel to fly home, or manufacture it on Mars?\n- **Option A:** Bring kerosene. Easy to handle but very heavy launch.\n- **Option B:** Bring some Hydrogen and use Mars ISRU to make CH4. High risk, but saves 40,000 kg of launch mass.\n\n**Decision:** Most modern Mars plans (SpaceX) choose Option B (Methane) because it's the only way to make the mission affordable long-term." },
                    { title: '📐 Step 3: EDL (Entry, Descent, & Landing)', section: 'The 7 Minutes of Terror', content: "**Atmospheric Analysis**\n\nMars' atmosphere is 1% as thick as Earth. \n- **Hypersonic:** Use a 4-meter Aeroshell (heat shield).\n- **Supersonic:** Deploy a giant parachute (must be tested in a supersonic wind tunnel).\n- **Final 100 meters:** Parachutes aren't enough for 10 tons. You need 'Retro-Rockets' (Skycrane) to hover and lower the rover gently on cables. \n\n**GNC Requirement:** The computer must do this autonomously because the 10-minute radio delay to Earth means you can't help." },
                    { title: '🚀 Step 4: Communication & Power', content: "**Staying Alive**\n\n- **Power:** Solar panels or a Nuclear generator (RTG)? Mars has dust storms that last for months. A Solar mission might die; an RTG mission costs $500M extra but is 'Unstoppable.'\n- **Telemetry:** Use a relay satellite in Mars orbit (MRO) to talk back to Earth's Deep Space Network (DSN).\n\n**Final Verification:** You run 1,000 Monte Carlo simulations. If the rover crashes 50 times, you must redesign the landing legs. If it crashes 0 times, you are **GO FOR LAUNCH.**" },
                    { title: '🧪 Capstone Final Quiz', content: "**P1:** What is the 'Sedan Chair' or 'Skycrane' maneuver?\n*Answer: A landing method where the engines are on a separate platform ABOVE the rover. It lowers the rover on cables to avoid kicking up dust that would damage the rover's cameras.*\n\n**P2:** Why is Mars 'EDL' harder than Earth or Moon?\n*Answer: On the Moon, there is no air (no heat). On Earth, the air is thick (parachutes work). Mars has 'just enough' air to burn you up, but 'not enough' to slow you down with parachutes alone. You must use everything: Shields, Chutes, and Rockets.*\n\n**P3:** What is a 'Hohmann Transfer'?\n*Answer: The most fuel-efficient orbital path between two planets. It requires launching when the Earth and Mars are in a specific alignment that happens every 26 months.*\n\n**P4:** What is the 'Deep Space Network'?\n*Answer: A trio of giant radio dishes (Spain, Australia, USA) that ensure we can always talk to Mars no matter which way the Earth is rotating.*\n\n**P5:** You have completed the Rocket Engineering course. What is next?\n*Answer: Apply these principles. Build a model rocket, join a university team, learn to code C++, or move on to the Plane/Electronics/Cars curricula to see how these engineering laws apply to other machines. The Universe is yours to build.*" }
                ],
                keyTakeaways: ['EDL (Entry, Descent, Landing) on Mars is a multi-stage physics challenge', 'ISRU dramatically reduces mission cost by producing fuel on-site', 'GNC must be autonomous due to light-speed communication delays', 'Monte Carlo simulations provide the statistical confidence for launch', 'Trade studies determine the balance between cost, risk, and mission success'],
                vocabulary: [
                    { term: 'EDL', definition: 'Entry, Descent, and Landing — the most dangerous phase of a planetary mission' },
                    { term: 'Skycrane', definition: 'A system used to deliver heavy rovers to the Martian surface via cables' },
                    { term: 'DSN', definition: 'Deep Space Network — NASA\'s international array of giant radio antennas' },
                    { term: 'Monte Carlo', definition: 'Statistical technique for calculating probability of success' },
                    { term: 'Hohmann Transfer', definition: 'An elliptical orbit used to transfer between two circular orbits of different radii' }
                ],
                quiz: {
                    questions: [
                        { id: 'q1', question: 'Why is Mars "EDL" uniquely difficult?', options: ['Too much gravity', 'Not enough air for chutes, too much air for no heat shield', 'It is too far away', 'The dirt is red'], correctAnswer: 1, explanation: 'Mars has a "thin but dangerous" atmosphere that requires multiple braking techniques.' },
                        { id: 'q2', question: 'How do we solve the 10-minute radio delay during a landing?', options: ['Get a faster radio', 'Make the landing fully autonomous (GNC)', 'Guess the position', 'Wait for the signal'], correctAnswer: 1, explanation: 'Autonomous systems must handle "The 7 Minutes of Terror" without human help.' },
                        { id: 'q3', question: 'A "Trade Study" for Mars power compares:', options: ['Kerosene vs Oxygen', 'Solar Panels vs Nuclear (RTG)', 'Red vs Blue robots', 'Small vs Large wheels'], correctAnswer: 1, explanation: 'Trade studies weigh the reliability of nuclear vs the cost of solar.' },
                        { id: 'q4', question: 'Monte Carlo simulations are used to find:', options: ['The most beautiful rocket', 'The probability of landing safely', 'The cost of fuel', 'The name of the rover'], correctAnswer: 1, explanation: 'Simulating 1,000 launches with random errors reveals the "Reliability" of the design.' },
                        { id: 'q5', question: 'Final Question: Engineering is primarily about:', options: ['Getting an A', 'Building the strongest part possible at any cost', 'Managing trade-offs and complexity to solve a problem with data', 'Making things look cool'], correctAnswer: 2, explanation: 'Mastering the balance of Mass, Cost, Risk, and Performance is the definition of Professional Engineering.' }
                    ]
                }
            }
        ]
    }]
};

export default section9Career;
