// Section 0: Foundations - 5 Deep Lessons
export const section0Foundations = {
  id: 'foundations',
  title: 'Unit 0: Foundations',
  description: 'The mathematical and physical bedrock of automotive design',
  icon: '🔧',
  color: 'from-slate-600 to-gray-800',
  units: [{
    id: 'foundations-core',
    title: 'Foundations of Vehicle Engineering',
    description: 'Core scientific principles that govern all automotive systems',
    lessons: [
      {
        id: 'applied-mechanics-vehicles',
        title: 'Applied Mechanics: Forces in Equilibrium',
        duration: '15 min', xp: 200,
        description: 'Newton’s laws and vector analysis applied to vehicle stability',
        aiTutor: true,
        introduction: "Automotive engineering is the art of managing forces. Whether it's a car cruising at 100 km/h or a truck carrying 40 tons, the laws of statics and dynamics dictate its behavior. This lesson moves beyond basic physics into 'Applied Mechanics' — the tools engineers use to ensure a car stays on the road and doesn't buckle under its own weight.",
        sections: [
          { title: '🎯 Newton’s Laws in Automotive Context', content: "**Statics vs. Dynamics**\n\nA vehicle engineer must master both:\n- **Statics:** Analyzing the car when it is parked or moving at a perfectly constant speed. The sum of all forces (ΣF) must equal zero.\n- **Dynamics:** Analyzing the car during acceleration, braking, or cornering. Here, ΣF = ma (Newton’s 2nd Law).\n\n**The Normal Force (N):**\nOn a flat road, the normal force is simply the weight of the car distributed across four tires. However, on a 5-degree incline, the normal force is reduced to **W * cos(θ)**. This reduction is why cars have less grip on steep hills — the tire is being 'pushed' into the road with less force." },
          { title: '🔧 Vector Analysis of Traction', content: "**The Friction Circle**\n\nTires provide force in two directions simultaneously:\n1. **Longitudinal:** For acceleration and braking.\n2. **Lateral:** For steering and cornering.\n\n**The Limit:** A tire can only provide a finite total amount of force (determined by the Coefficient of Friction, μ). If you are using 90% of your tire's grip to brake hard, you only have 10% left to steer. If you try to do both at 100%, the vector sum exceeds the limit, and the 'Friction Circle' is broken — resulting in a skid. This is the fundamental math behind Electronic Stability Control (ESC)." },
          { title: '📐 Moment of Inertia & Weight Distribution', content: "**Polar Moment of Inertia**\n\nWhy do sports cars put the engine in the middle? \n- **Moment of Inertia (I):** Measures how hard it is to 'spin' an object. \n- A car with weight at the far ends (front engine, rear trunk) has a high moment of inertia and is slow to turn.\n- A mid-engine car concentrates mass near the center, allowing it to rotate (yaw) into a corner instantly. \n\n**The 50/50 Ideal:** For balanced handling, engineers strive for equal weight on the front and rear axles. This ensures that during a turn, both front and rear tires reach their 'Friction Limit' at the same time, preventing understeer or oversteer." },
          { title: '🚀 Free Body Diagrams (FBD)', section: 'The Engineer’s Map', content: "**Mapping the Vehicle**\n\nTo solve any automotive problem, we draw a Free Body Diagram. \n- **Arrows Forward:** Tractive force from the wheels.\n- **Arrows Backward:** Aerodynamic drag and rolling resistance.\n- **Arrows Up:** Normal force from the pavement.\n- **Arrows Down:** Gravity (Weight).\n\n**Equilibrium at Top Speed:**\nA Bugatti Chiron at 400 km/h is in 'Dynamic Equilibrium.' The engine is producing 1,500 HP of forward force, but the wind is pushing back with 1,500 HP of drag. The car isn't accelerating because the sum of forces is zero." },
          { title: '🧪 Applied Mechanics Practice', content: "**P1:** Why does a car 'nose-dive' during hard braking?\n*Answer: Because of 'Weight Transfer.' The deceleration creates a 'Moment' (torque) around the center of gravity. This force compresses the front springs and extends the rear ones, shifting the Normal Force to the front tires.*\n\n**P2:** What is the 'Coefficient of Rolling Resistance' (Crr)?\n*Answer: It is the energy lost as the tire deforms (squishes) against the road. Harder tires have lower Crr, which is why fuel-efficient cars use high-pressure, narrow tires.*\n\n**P3:** How does 'Downforce' affect the Friction Circle?\n*Answer: Downforce (from wings) increases the Normal Force (N) without adding mass (m). Since Friction = μ * N, downforce gives the car more grip for cornering without making it heavier and harder to accelerate.*\n\n**P4:** What is 'Unsprung Mass'?\n*Answer: The weight of the components not supported by the suspension (wheels, tires, brakes). Minimizing unsprung mass is CRITICAL for performance, as it allows the wheels to follow bumps in the road much faster.*\n\n**P5:** If a car has a 60/40 weight distribution (Front/Rear), which tires will wear out faster?\n*Answer: Usually the front. They carry more weight, have higher normal forces, and therefore experience more friction heat during steering and braking.*" }
        ],
        keyTakeaways: ['Vector analysis determines the total grip available (Friction Circle)', 'Mid-engine layouts minimize Polar Moment of Inertia for better agility', 'Normal force changes with road incline and aerodynamic downforce', 'Unsprung mass reduction is key to keeping tires in contact with the road', 'Top speed is reached when Tractive Force equals total Resistance Force'],
        vocabulary: [
          { term: 'Statics', definition: 'The study of bodies at rest or in constant motion' },
          { term: 'Friction Circle', definition: 'The graphical representation of a tire’s total grip limit' },
          { term: 'Yaw', definition: 'The rotation of a car around its vertical axis (turning)' },
          { term: 'Crr', definition: 'Coefficient of Rolling Resistance — resistance caused by tire deformation' },
          { term: 'Normal Force', definition: 'The component of a contact force that is perpendicular to the surface' }
        ],
        quiz: {
          questions: [
            { id: 'q1', question: 'The "Friction Circle" concept explains that:', options: ['Tires never slip', 'Engine power is constant', 'Grip is shared between steering and braking', 'Brakes only work in circles'], correctAnswer: 2, explanation: 'Using grip for one action (braking) reduces what is available for another (steering).' },
            { id: 'q2', question: 'Mid-engine cars handle better because they have:', options: ['More weight', 'Lower Polar Moment of Inertia', 'Bigger trunks', 'Four engines'], correctAnswer: 1, explanation: 'Centering mass makes the vehicle easier to rotate (yaw).' },
            { id: 'q3', question: 'Aerodynamic downforce is unique because it adds ______ without adding mass.', options: ['Torque', 'Speed', 'Normal Force (Grip)', 'Chrome'], correctAnswer: 2, explanation: 'Downforce "pushes" the car into the road, increasing friction.' },
            { id: 'q4', question: 'A car nose-dives during braking due to:', options: ['Bad engine', 'Weight Transfer', 'Wind', 'Gravity'], correctAnswer: 1, explanation: 'Momentum and the center of gravity cause weight to shift to the front springs.' },
            { id: 'q5', question: 'Unsprung mass includes which component?', options: ['The Driver', 'The Engine', 'The Wheels and Brakes', 'The Stereo'], correctAnswer: 2, explanation: 'Anything not supported by the springs (wheels, tires, brakes) is unsprung.' }
          ]
        }
      },
      {
        id: 'automotive-thermodynamics',
        title: 'Thermodynamics: Heat, Work, & Waste',
        duration: '15 min', xp: 200,
        description: 'The science of turning burning fuel into mechanical motion',
        aiTutor: true,
        introduction: "Cars are, at heart, 'Heat Engines.' Whether it's gasoline, diesel, or even a battery undergoing chemical reactions, the laws of thermodynamics dictate how much energy we can get out and how much is wasted as exhaust. This lesson covers the absolute limits of efficiency.",
        sections: [
          { title: '🎯 The First Law: Conservation of Energy', content: "**Energy In = Energy Out**\n\nYou cannot create energy. When you burn a liter of gasoline, it contains roughly 33 MegaJoules (MJ) of energy.\n- **1/3 goes to the wheels:** Moving the car.\n- **1/3 goes to the radiator:** Wasted heat.\n- **1/3 goes to the exhaust:** Wasted pressure and heat.\n\n**The Energy Balance:** To improve fuel economy, engineers don't 'find' more energy; they reduce the waste in the radiator and exhaust streams." },
          { title: '🔧 The Second Law & Efficiency Limits', content: "**The Carnot Limit**\n\nNature has a 'Tax' on heat engines. You can never achieve 100% efficiency. The maximum theoretical efficiency (η) is determined by the temperature difference between the burning fuel and the outside air:\n\n**η = 1 - (T_cold / T_hot)**\n\nThis is why modern engines run as hot as possible (reaching 1,000°C+). The hotter the 'fire' and the cooler the 'exhaust,' the more work you can extract. This is also why high-performance cars need massive radiators — to keep the 'cold side' as cool as possible." },
          { title: '📐 The Otto vs. Diesel Cycle', content: "**Pressure-Volume (PV) Diagrams**\n\nEngineers use 'Cycles' to model engines:\n- **Otto Cycle (Gasoline):** Uses spark ignition. Heat is added at a constant volume. It's efficient at high RPM but limited by 'Knock' (pre-ignition).\n- **Diesel Cycle:** Uses compression ignition. Heat is added at a constant pressure. It has much higher compression ratios (20:1 vs 10:1), making it more efficient but heavier and slower-revving.\n\n**Compression Ratio (r):** The higher the ratio, the more you 'squeeze' the air, and the higher the thermal efficiency. However, squeeze gasoline too much, and it explodes early (knocking) and destroys the engine." },
          { title: '🚀 Entropy & Friction Losses', section: 'The Silent Killers', content: "**Where the Energy Goes**\n\nEven after the thermal conversion, there are mechanical losses:\n- **Pumping Losses:** The energy spent just 'sucking' air into the engine and 'pushing' exhaust out.\n- **Friction Losses:** Piston rings rubbing against cylinder walls.\n- **Accessory Drive:** The energy used to run the alternator, water pump, and air conditioning.\n\n**Turbocharging:** A turbocharger uses the 'Entropy' (spent energy) in the exhaust to spin a turbine, which pushes more air into the engine. It's essentially 'Recycling' waste heat to create more power." },
          { title: '🧪 Thermodynamics Practice', content: "**P1:** Why are diesel engines more efficient than gasoline engines?\n*Answer: Higher compression ratios. Because diesel doesn't ignite with a spark, you can squeeze the air much harder, resulting in a higher 'T_hot' and more work extracted per gram of fuel.*\n\n**P2:** What is 'Volumetric Efficiency'?\n*Answer: The ratio of air that actually enters the cylinder compared to the cylinder's actual volume. A naturally aspirated engine is usually 80-90% efficient; a turbocharged engine can be 150-200% efficient.*\n\n**P3:** Why does a car's heater use the engine's coolant?\n*Answer: Because 1/3 of the fuel's energy is already being dumped into the coolant as waste heat. Using it for the cabin heater is a form of 'Heat Recovery' that doesn't cost any extra fuel.*\n\n**P4:** What is 'Specific Fuel Consumption' (BSFC)?\n*Answer: A measure of how many grams of fuel it takes to produce 1 kiloWatt of power for 1 hour. Lower BSFC means a more efficient engine design.*\n\n**P5:** Why do electric cars (EVs) have higher 'Efficiency' than gas cars?\n*Answer: EVs don't use a 'Heat Cycle.' They use electromagnetic force, which avoids the Carnot Limit. An electric motor is 90% efficient, whereas a gas engine is lucky to reach 35%.*" }
        ],
        keyTakeaways: ['Thermodynamics determines the limit of how much fuel becomes motion', 'Higher compression ratios lead to higher thermal efficiency', 'The Carnot Limit states that you must have a temperature difference to get work', 'Turbochargers recycle waste exhaust energy to improve performance', 'Pumping losses and friction are the primary mechanical energy drains'],
        vocabulary: [
          { term: 'Entropy', definition: 'The measure of disorder or "unusable" energy in a system' },
          { term: 'Carnot Limit', definition: 'The maximum theoretical efficiency of a heat engine' },
          { term: 'Compression Ratio', definition: 'The ratio of the volume of the cylinder when the piston is at the bottom vs top' },
          { term: 'Otto Cycle', definition: 'The thermodynamic cycle that describes a standard 4-stroke gasoline engine' },
          { term: 'BSFC', definition: 'Brake Specific Fuel Consumption — fuel mass flow rate per unit power' }
        ],
        quiz: {
          questions: [
            { id: 'q1', question: 'What percentage of fuel energy typically reaches the wheels in a gas car?', options: ['100%', '75%', '25-33%', '5%'], correctAnswer: 2, explanation: 'Most energy is lost as heat through the radiator and exhaust.' },
            { id: 'q2', question: 'The Carnot cycle suggests that for higher efficiency, we need:', options: ['Cold fuel', 'Higher temperature differences', 'Less air', 'Slower pistons'], correctAnswer: 1, explanation: 'Increasing the "T_hot" relative to "T_cold" maximizes work extraction.' },
            { id: 'q3', question: 'A Turbocharger is effectively a ______ system.', options: ['Cooling', 'Braking', 'Waste-heat recycling', 'Fuel printing'], correctAnswer: 2, explanation: 'It uses exhaust pressure (waste) to compress intake air.' },
            { id: 'q4', question: 'Higher compression ratios in Diesel engines result in:', options: ['Lower efficiency', 'Higher thermal efficiency', 'More sparks', 'Less weight'], correctAnswer: 1, explanation: 'More compression allows for more expansion work during the power stroke.' },
            { id: 'q5', question: 'Pumping losses occur when the engine is:', options: ['Off', 'Sucking in air or pushing out exhaust', 'Idling only', 'Braking'], correctAnswer: 1, explanation: 'The physical work of moving air in and out of cylinders uses fuel.' }
          ]
        }
      },
      {
        id: 'automotive-materials-science',
        title: 'Materials: Steel, Aluminum, & Carbon Fiber',
        duration: '15 min', xp: 200,
        description: 'The chemistry and physics of the vehicle skeleton',
        aiTutor: true,
        introduction: "An automotive engineer must choose materials that are light enough for fuel economy but strong enough to survive a 60 km/h crash. This is the 'Materials Trade-off.' From high-strength steel to exotic composites, we explore why cars are built the way they are.",
        sections: [
          { title: '🎯 Strength vs. Stiffness: The Difference', content: "**Young’s Modulus**\n\nEngineers distinguish between two key properties:\n1. **Stiffness (Modulus):** How much a part BENDS under a load. (You want a stiff chassis for good handling).\n2. **Strength:** When the part actually BREAKS or permanently deforms.\n\n**Steel vs. Aluminum:** Steel is 3x stiffer than Aluminum, but also 3x heavier. This means if you build a part out of Aluminum, you have to make it thicker to get the same stiffness, but it will still usually be lighter than the steel version." },
          { title: '🔧 AHSS: Advanced High-Strength Steel', content: "**The Safety Cage**\n\nMost modern cars are made of 'Multi-phase' steels. \n- **Boron Steel:** Used in the 'A-pillars' and roof. It is so strong that standard firefighters' tools (jaws of life) can't cut through it. This ensures the roof doesn't collapse if the car flips.\n- **Crinkle Zones:** Use 'Milder' steels. These are designed to fold like an accordion, absorbing the kinetic energy of a crash so that the energy doesn't reach the passengers." },
          { title: '📐 The Aluminum Revolution', content: "**Ford F-150 and Luxury Cars**\n\nAluminum is popular because it resists corrosion and saves mass. \n- **Weight Saving:** Switching a car frame from steel to aluminum can save 200-300kg. \n- **The Downside:** Aluminum is harder to weld. Engineers often use 'Self-Piercing Rivets' and structural adhesives (glue) to join aluminum parts together. This 'bonded' structure is often stiffer than a welded one." },
          { title: '🚀 Composites & Carbon Fiber', section: 'The Formula 1 Tech', content: "**Anisotropic Materials**\n\nUnlike steel (which is the same in every direction), Carbon Fiber is **Anisotropic**. \n- It has incredible strength in the direction of the fibers, but very little perpendicular to them. \n- **The Engineer’s Power:** You can 'tune' the chassis! You can make a part stiff in one direction (to keep the suspension aligned) but flexible in another (to absorb bumps). \n- **The Cost:** Carbon fiber is 10x more expensive than steel and takes hours to 'bake' in an oven (autoclave), making it too slow for mass production (like a Toyota Corolla)." },
          { title: '🧪 Materials Practice', content: "**P1:** Why don't we build the whole car out of Carbon Fiber?\n*Answer: Cost and speed. A steel car body can be stamped out in seconds; carbon fiber takes hours. Also, carbon fiber is 'Brittle' — it shatters in a crash, whereas steel 'Yields' (bends), which absorbs more energy safer for passengers.*\n\n**P2:** What is 'Galvanic Corrosion'?\n*Answer: When you touch Aluminum and Steel together in the presence of water, they create a tiny 'battery' effect that eats away the aluminum. To prevent this, engineers use special coatings and glues to keep the metals separated.*\n\n**P3:** What is a 'Monocoque' chassis?\n*Answer: A design where the 'Skin' of the car (the body) also carries all the weight and stress. Older cars used 'Body-on-Frame' (a heavy ladder frame under a light shell), but monocoques are much lighter and stiffer.*\n\n**P4:** Why is Titanium used in exhaust systems but not the frame?\n*Answer: Titanium handles heat extremely well and is light, but it is incredibly difficult to weld and expensive. It's used where thermal resistance is the priority over structural volume.*\n\n**P5:** What is 'Yield Strength'?\n*Answer: The point at which a material stops acting like a rubber band (returning to its shape) and stays permanently bent. We want a car's safety cage to have a very high yield strength.*" }
        ],
        keyTakeaways: ['Stiffness (handling) and Strength (crash safety) are different properties', 'Advanced High-Strength Steel (AHSS) protects passengers in rollovers', 'Aluminum saves weight but requires specialized joining techniques like riveting', 'Carbon fiber allows for directional strength tuning but is slow to produce', 'Crinkle zones use "softer" materials to absorb crash energy intentionally'],
        vocabulary: [
          { term: 'Yield Strength', definition: 'The stress at which a material begins to deform permanently' },
          { term: 'Anisotropic', definition: 'A material that has different properties in different directions' },
          { term: 'Chassis', definition: 'The structural frame or skeleton of a vehicle' },
          { term: 'Monocoque', definition: 'A structural system where the load is supported through the object’s external skin' },
          { term: 'Autoclave', definition: 'A pressurized oven used to "cure" composites like carbon fiber' }
        ],
        quiz: {
          questions: [
            { id: 'q1', question: 'Steel is roughly _____ times stiffer than Aluminum.', options: ['1.5', '3.0', '10.0', '0.5'], correctAnswer: 1, explanation: 'Young’s modulus for steel is ~210 GPa vs ~70 GPa for Aluminum.' },
            { id: 'q2', question: 'Why is Boron Steel used in the roof pillars?', options: ['It is cheap', 'It is easy to paint', 'Ultra-high strength to prevent collapse during rollovers', 'It is lightweight'], correctAnswer: 2, explanation: 'Boron steel is one of the strongest materials usable in mass production.' },
            { id: 'q3', question: 'An "Anisotropic" material like Carbon Fiber has:', options: ['Uniform strength', 'Directional strength based on fibers', 'No strength', 'Liquid state'], correctAnswer: 1, explanation: 'Carbon fiber is only strong in the direction the fibers are laid.' },
            { id: 'q4', question: 'Crinkle zones are designed to:', options: ['Make the car look bad', 'Absorb kinetic energy by deforming', 'Prevent rust', 'Help the car fly'], correctAnswer: 1, explanation: 'Deforming metal turns crash energy into heat and work, sparing the passengers.' },
            { id: 'q5', question: 'Monocoque chassis are generally better than Body-on-Frame because:', options: ['They are heavier', 'They are cheaper to fix', 'They are lighter and have higher torsional stiffness', 'They are made of wood'], correctAnswer: 2, explanation: 'Integrating the shell and frame saves mass and improves handling.' }
          ]
        }
      },
      {
        id: 'automotive-fluid-dynamics',
        title: 'Aerodynamics: Slicing the Wind',
        duration: '15 min', xp: 200,
        description: 'Managing drag, lift, and cooling at high speed',
        aiTutor: true,
        introduction: "At 100 km/h, more than half of your fuel is spent just pushing air out of the way. Aerodynamics isn't just about 'looking fast' — it's about stability, fuel economy, and cooling the engine. From 'Slippery' sedans to high-downforce racercars, this lesson explores the invisible forces of the wind.",
        sections: [
          { title: '🎯 Cd: The Coefficient of Drag', content: "**The Shape of the Wind**\n\nCd is a number that describes how 'slippery' a shape is.\n- **Brick:** Cd ≈ 1.0\n- **Modern SUV:** Cd ≈ 0.35\n- **Tesla Model S:** Cd ≈ 0.20\n- **Drop of Water (The Ideal):** Cd ≈ 0.04\n\n**The Drag Equation:** Drag increases with the **square** of velocity. To go twice as fast, you need **four times** the force, but **eight times** the power. This is why the jump from 300 to 400 km/h is so much harder than 0 to 100 km/h." },
          { title: '🔧 Lift vs. Downforce', content: "**Wings and Spoilers**\n\nA car is naturally shaped like an airplane wing (flat on the bottom, curved on the top). This creates **positive lift** at high speeds, making the car feel 'floaty' and dangerous.\n- **Spoilers:** These 'spoil' the lift by breaking up the airflow at the back.\n- **Wings (Inverted Airfoils):** These create 'Negative Lift' (Downforce). A Formula 1 car produces so much downforce that it could theoretically drive on the ceiling at 150 km/h." },
          { title: '📐 The Boundary Layer & Separation', content: "**Clean vs. Dirty Air**\n\nAir likes to stick to the car's surface (the Boundary Layer). However, if the car's tail is too 'steep,' the air can't follow the curve and 'detaches,' creating a massive vacuum of 'Dirty Air' (turbulence) behind the car.\n- **Kamm-Tail:** A design where the car is cut off abruptly. It trick the air into thinking the car is longer than it is, reducing the size of the wake and lowering drag." },
          { title: '🚀 Internal Aerodynamics', section: 'Cooling the Beast', content: "**Radiator Flow**\n\nThe air that goes INSIDE the car is often the 'draggiest.' \n- Air entering the front grille has to smash into the radiator. \n- **Active Grille Shutters:** Modern cars close their grilles at highway speeds when the engine is cool. This forces air to go *around* the car instead of *through* it, saving fuel. \n- **Brake Ducts:** Small channels that direct cool air specifically onto the brake rotors to prevent 'Brake Fade' (melting)." },
          { title: '🧪 Aerodynamics Practice', content: "**P1:** Why are the bottoms of modern cars covered in flat plastic panels?\n*Answer: 'Underbody Aero.' Air moving under the car is just as important as air moving over it. A flat floor prevents air from getting caught on the exhaust and suspension, which reduces drag and lift.*\n\n**P2:** What is 'Drafting' (Slipstreaming)?\n*Answer: Driving closely behind another car. The first car does the work of 'breaking' the air; the second car sits in the vacuum, needing significantly less power to maintain the same speed.*\n\n**P3:** Why do some cars have 'Air Curtains' (slits in the front bumper)?\n*Answer: They direct a thin stream of high-speed air across the face of the front wheels. This acts like a 'wall' that prevents the turbulent air from the spinning wheels from messing up the side of the car.*\n\n**P4:** What is the 'Center of Pressure' (CoP)?\n*Answer: The point where all aerodynamic forces act on the car. For stability at high speed, the CoP should ideally be BEHIND the Center of Gravity (CoG). If the wind pushes the front of the car more than the back, it will be unstable.*\n\n**P5:** Does a spoiler actually help at 50 km/h?\n*Answer: Not really. Aerodynamic forces are tiny at low speeds. Most 'street' spoilers are for aesthetics until you reach 80-100 km/h, where the physics finally starts to matter.*" }
        ],
        keyTakeaways: ['Drag increases with the square of speed, necessitating massive power for high speeds', 'A standard car shape naturally creates dangerous lift at high speeds', 'Kamm-tails and flat underbodies are key engineering tricks for efficiency', 'Active aero (shutters/wings) optimizes between cooling and slipperiness', 'Centers of Pressure must be balanced against Gravity for stability'],
        vocabulary: [
          { term: 'Cd', definition: 'Drag Coefficient — a dimensionless quantity used to quantify the drag of an object' },
          { term: 'Downforce', definition: 'A downward lift force created by the aerodynamic features of a vehicle' },
          { term: 'Boundary Layer', definition: 'The layer of fluid in the immediate vicinity of a bounding surface' },
          { term: 'Turblence', definition: 'Violent or unsteady movement of air or water' },
          { term: 'Brake Fade', definition: 'Reduction in stopping power caused by overheating of the brake system' }
        ],
        quiz: {
          questions: [
            { id: 'q1', question: 'To go twice as fast, how much more POWER is needed to overcome air drag?', options: ['2×', '4×', '8×', '16×'], correctAnswer: 2, explanation: 'Power ∝ v³, so 2³ = 8× power.' },
            { id: 'q2', question: 'The ideal "sleekest" aerodynamic shape in nature is a:', options: ['Brick', 'Square', 'Teardrop', 'Circle'], correctAnswer: 2, explanation: 'A teardrop allows the air to reconnect behind the object without turbulence.' },
            { id: 'q3', question: 'Spoilers are used on street cars to:', options: ['Make the car fly', 'Reduce lift and stabilize the rear at speed', 'Cool the engine', 'Increase drag'], correctAnswer: 1, explanation: 'They "spoil" the lift-inducing airflow.' },
            { id: 'q4', question: 'Active Grille Shutters help fuel economy by:', options: ['Turning the engine off', 'Closing at high speeds to reduce internal drag', 'Opening to make more noise', 'Cleaning the air'], correctAnswer: 1, explanation: 'Closing the grille forces air around the aerodynamic body of the car.' },
            { id: 'q5', question: 'For high-speed stability, the Center of Pressure (CoP) should be:', options: ['At the front bumper', 'Behind the Center of Gravity', 'On the roof', 'In the trunk'], correctAnswer: 1, explanation: 'Having the CoP behind the CoG keeps the car straight (like a dart).' }
          ]
        }
      },
      {
        id: 'automotive-engineering-history',
        title: 'The Engineering Evolution: From Steam to Silicon',
        duration: '15 min', xp: 200,
        description: 'How a century of breakthroughs created the modern vehicle',
        aiTutor: true,
        introduction: "We take for granted that a car will start in the winter and drive 200,000 miles. But for most of history, cars were unreliable, dangerous, and difficult to drive. This lesson tracks the 'Quantum Leaps' in engineering that took us from the Model T to the autonomous EVs of today.",
        sections: [
          { title: '🎯 1908: The Assembly Line (Henry Ford)', content: "**Manufacturing as Engineering**\n\nBefore Ford, cars were built like houses — one at a time, by hand. \n- **Interchangeable Parts:** The engineering breakthrough wasn't the car; it was the **Tolerances**. Ford designed parts so precise that any wheel would fit any car. \n- **The Moving Line:** By moving the car to the worker, he reduced build time from 12 hours to 90 minutes. This 'Systems Engineering' made the car a tool for everyone, not just the rich." },
          { title: '🔧 1950s: The Safety Awakening', content: "**Bela Barenyi and the Crinkle Zone**\n\nUntil the 50s, engineers thought 'Stronger is Safer.' Cars were built like tanks. \n- **The Insight:** Rigid cars kill people because the human inside stops too fast. \n- **1952:** Mercedes-Benz engineer Bela Barenyi patented the **Crinkle Zone**. He designed a car that would 'Sacrifice' its front and back to protect the rigid passenger cell. This single idea has saved millions of lives." },
          { title: '📐 1970s: The Silicon Transition', content: "**The Rise of the ECU**\n\nIn the 1970s, fuel crises and emissions laws made mechanical engines obsolete. \n- **The Problem:** A carburetor (mechanical fuel mixer) couldn't be precise enough. \n- **The Solution:** The Electronic Control Unit (ECU). For the first time, a computer 'watched' the exhaust and adjusted the fuel 100 times per second. This paved the way for Fuel Injection, which doubled fuel economy in a decade." },
          { title: '🚀 The Future: The Software-Defined Vehicle', section: 'Beyond the Engine', content: "**The 21st Century Shift**\n\nWe are currently in the 4th great transition:\n1. **Electrification:** Moving from Heat Engines to Electric Motors.\n2. **Connectivity:** Cars talking to the internet and each other (V2X).\n3. **Autonomy:** The transition from a human driver to a Machine Learning pilot.\n\n**The 'SDV' Concept:** Modern cars are no longer hardware defined. A Tesla or Rivian can get a 'Software Update' that makes it go faster or brake better, changing the fundamental engineering of the vehicle overnight." },
          { title: '🧪 History Practice', content: "**P1:** Who developed the first practical internal combustion car?\n*Answer: Karl Benz in 1886. The 'Benz Patent-Motorwagen' had 0.75 horsepower and only three wheels, but it established the layout of the modern engine.*\n\n**P2:** What was the significance of the 'Catalytic Converter' (1975)?\n*Answer: It used platinum and palladium chemicals to 'react' with toxic gases (NOx and CO), turning them into harmless Nitrogen and CO2. This was the first major 'Environmental Engineering' mandate in automotive.*\n\n**P3:** Why did 'Disc Brakes' replace 'Drum Brakes'?\n*Answer: 'Heat Dissipation.' Under heavy braking, drums get hot and 'expand' away from the pads (fade). Disc brakes are exposed to the air, staying cool and consistent even during mountain descents.*\n\n**P4:** What is 'Unibody' construction and when did it start?\n*Answer: Popularized in the 1930s (Citroen Traction Avant/Lancia Lambda), it integrated the body and frame. This allowed for lighter cars that didn't rattle as much as old body-on-frame designs.*\n\n**P5:** How did the 'Japanese Production System' (Toyota) change engineering?\n*Answer: 'Justin-in-Time' and 'Kaizen.' Instead of building 1,000 cars and finding errors at the end, Toyota empowered every worker to stop the line if they saw a defect. This led to the extreme reliability we expect from cars today.*" }
        ],
        keyTakeaways: ['High-precision tolerances enabled the first mass production of vehicles', 'Crinkle zones protect passengers by turning kinetic energy into deformation work', 'Electronic Control Units (ECUs) allowed engines to meet modern emissions standards', 'Japanese manufacturing philosophy shifted focus from quantity to total reliability', 'Software-Defined Vehicles (SDVs) allow for hardware performance updates via the cloud'],
        vocabulary: [
          { term: 'Crinkle Zone', definition: 'A structural area of a vehicle designed to absorb the energy from a dynamic impact' },
          { term: 'ECU', definition: 'Electronic Control Unit — an embedded system that controls one or more electrical systems' },
          { term: 'SDV', definition: 'Software-Defined Vehicle — a vehicle whose features are primarily enabled by software' },
          { term: 'Kaizen', definition: 'A Japanese business philosophy of continuous improvement' },
          { term: 'Interchangeability', definition: 'The ability to substitute one part for another without custom fitting' }
        ],
        quiz: {
          questions: [
            { id: 'q1', question: 'Henry Ford’s main contribution was:', options: ['Inventing the wheel', 'High-precision interchangeable parts and the moving assembly line', 'Building the first electric car', 'Flying cars'], correctAnswer: 1, explanation: 'Standardization and timing revolutionized the industry cost.' },
            { id: 'q2', question: 'The "Crinkle Zone" protects humans by:', options: ['Staying as rigid as possible', 'Bending to absorb crash energy', 'Being made of rubber', 'Ejecting the seats'], correctAnswer: 1, explanation: 'Controlled deformation reduces the deceleration force on passengers.' },
            { id: 'q3', question: 'ECUs were primarily introduced to handle:', options: ['Air conditioning', 'FM Radio', 'Precise fuel and emissions control', 'Anti-theft'], correctAnswer: 2, explanation: 'Computers could mix fuel more accurately than mechanical carburetors.' },
            { id: 'q4', question: 'Which company pioneered the "Kaizen" (continuous improvement) model?', options: ['Ford', 'Tesla', 'Toyota', 'Ferrari'], correctAnswer: 2, explanation: 'Toyota’s focus on quality and small improvements created the reliability standard.' },
            { id: 'q5', question: 'A "Software-Defined Vehicle" (SDV) means:', options: ['The car is made of code', 'Hardware can be updated or changed via software updates', 'It has a TV', 'It doesn’t need a battery'], correctAnswer: 1, explanation: 'Performance, range, and features are controlled and improved via code.' }
          ]
        }
      }
    ]
  }]
};

export default section0Foundations;
