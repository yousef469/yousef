// Section 1: Powertrain & ICE - 5 Deep Lessons
export const section1Powertrain = {
  id: 'powertrain',
  title: 'Unit 1: Powertrain & ICE',
  description: 'The engineering of Internal Combustion Engines and power transfer',
  icon: '⚙️',
  color: 'from-red-600 to-orange-700',
  units: [{
    id: 'engine-transmission',
    title: 'The Mechanical Heart',
    description: 'Advanced analysis of combustion and gear systems',
    lessons: [
      {
        id: 'the-4-stroke-cycle-advanced',
        title: 'The 4-Stroke Cycle: Valve Timing & Dynamics',
        duration: '15 min', xp: 200,
        description: 'Advanced analysis of intake, compression, power, and exhaust',
        aiTutor: true,
        introduction: "Every car engine follows the 'Otto Cycle,' but the difference between a lawnmower and a Ferrari is in the precision of the timing. This lesson moves beyond the basic 'Suck, Squeeze, Bang, Blow' and dives into the fluid dynamics and precision timing that make modern engines efficient and powerful.",
        sections: [
          { title: '🎯 The Intake Stroke: Volumetric Efficiency', content: "**Getting the Air In**\n\nThe intake stroke isn't just a vacuum. At high RPM, the air has 'Momentum.' \n- **Inertia Charging:** If you close the intake valve exactly when the piston reaches the bottom, you miss out. Modern engines keep the valve open slightly *after* bottom-dead-center to let the rushing air 'stuff' more mass into the cylinder. \n- **Variable Valve Timing (VVT):** Computers use oil pressure or electric motors to change the angle of the camshaft, adjusting the timing based on engine speed. This allows the engine to have high torque at low speeds and high power at high speeds." },
          { title: '🔧 The Compression Stroke: Adiabatic Realities', content: "**Squeezing the Fire**\n\nCompression is an 'Adiabatic' process — the air gets hot simply because it’s being squeezed. \n- **The Knock Limit:** If the air gets too hot, the fuel will explode before the spark plug fires. This is 'Knock' or 'Pre-ignition.' \n- **Octane Rating:** Higher octane fuel (93 vs 87) resists this heat better, allowing for higher compression ratios and more power. \n- **Squish & Swirl:** Engineers shape the top of the piston to create a 'hurricane' of air. This ensures that when the spark fires, the flame spreads instantly and evenly." },
          { title: '📐 Power & Exhaust: The Scavenging Effect', content: "**Clearing the Room**\n\nThe exhaust stroke has a secret weapon: **Scavenging**.\n- When the exhaust valve opens, a high-pressure pulse of air shoots out. \n- **Valve Overlap:** For a tiny fraction of a second, the intake AND exhaust valves are open at the same time. The rushing exhaust pulse creates a vacuum that 'sucks' the fresh intake air in. \n- **Backpressure:** While some resistance is needed for scavenging, too much backpressure (from a clogged muffler) chokes the engine and robs it of power." },
          { title: '🚀 The Crankcase & Lubrication', section: 'The Friction War', content: "**Keeping it Alive**\n\nA piston moves up and down 100 times per second. Without oil, it would melt in seconds. \n- **Hydrodynamic Lubrication:** The oil isn't just 'wet'; it forms a microscopic 'wedge' of pressurized fluid that floats the metal parts so they never actually touch. \n- **Dry Sump vs. Wet Sump:** Most cars store oil in a pan at the bottom (Wet). Race cars use a 'Dry Sump' with a separate tank. This allows the engine to be mounted lower for a better Center of Gravity and prevents oil from 'sloshing' away from the pump during high-G corners." },
          { title: '🧪 ICE Dynamics Practice', content: "**P1:** What is 'Indicated Horsepower' vs 'Brake Horsepower'?\n*Answer: Indicated HP is the theoretical power produced inside the combustion chamber. Brake HP (BHP) is what’s left at the crankshaft after accounting for friction and pumping losses. BHP is what we actually measure on a dyno.*\n\n**P2:** Why do some engines have 4 valves per cylinder?\n*Answer: Better 'Flow Area.' Two small intake valves have more perimeter area than one giant valve, allowing air to enter with less resistance, which increases Volumetric Efficiency at high RPM.*\n\n**P3:** What is a 'Stroke' in an engine?\n*Answer: The distance the piston travels from the very top (TDC) to the very bottom (BDC) of the cylinder.*\n\n**P4:** What happens if 'Valve Timing' is wrong?\n*Answer: Loss of power, backfiring, or in an 'Interference Engine,' the piston will physically hit the valves, destroying the engine instantly.*\n\n**P5:** What is the 'Connecting Rod's' job?\n*Answer: To translate the 'Linear' (straight) motion of the piston into the 'Rotational' motion of the crankshaft. It is one of the most stressed parts in a car.*" }
        ],
        keyTakeaways: ['Valves must open and close at precise millisecond intervals (VVT)', 'Compression ratios are limited by the thermal "Knock" limit of fuel', 'Scavenging uses exhaust pulses to pull in fresh intake air', 'Hydrodynamic lubrication prevents metal-on-metal contact via oil pressure', 'Volumetric efficiency determines how "full" the cylinder gets with air'],
        vocabulary: [
          { term: 'TDC', definition: 'Top Dead Center — the highest point of a piston’s travel' },
          { term: 'VVT', definition: 'Variable Valve Timing — adjusting valve events based on RPM' },
          { term: 'Scavenging', definition: 'The process of using exhaust flow to assist intake flow' },
          { term: 'Hydrodynamic', definition: 'A state of lubrication where moving surfaces are separated by a fluid film' },
          { term: 'BHP', definition: 'Brake Horsepower — the actual power delivered to the crankshaft' }
        ],
        quiz: {
          questions: [
            { id: 'q1', question: 'Commonly, "Volumetric Efficiency" is highest when:', options: ['The engine is off', 'At the engine’s peak torque RPM', 'At idle', 'Only in winter'], correctAnswer: 1, explanation: 'Peak torque occurs when the engine is "breathing" most efficiently.' },
            { id: 'q2', question: 'Valve Overlap occurs when:', options: ['The engine explodes', 'Both intake and exhaust valves are open simultaneously', 'The piston hits a valve', 'The car is in reverse'], correctAnswer: 1, explanation: 'Overlap uses exhaust momentum to pull in fresh air.' },
            { id: 'q3', question: 'The "Knock" limit is primarily a result of:', options: ['Bad oil', 'Too much fuel', 'High compression heat igniting fuel early', 'Slow driving'], correctAnswer: 2, explanation: 'Excessive heat/pressure causes uncontrolled explosion before the spark.' },
            { id: 'q4', question: 'A "Dry Sump" system is used to:', options: ['Keep the car dry', 'Prevent oil starvation during high-G maneuvers', 'Make the engine heavier', 'Cool the cabin'], correctAnswer: 1, explanation: 'External tanks ensure oil flow regardless of the car’s tilt or cornering.' },
            { id: 'q5', question: 'VVT (Variable Valve Timing) solves which problem?', options: ['Car color', 'The trade-off between low-end torque and high-end power', 'Flat tires', 'Radio noise'], correctAnswer: 1, explanation: 'It optimizes breathing for both slow and fast engine speeds.' }
          ]
        }
      },
      {
        id: 'fuel-delivery-systems',
        title: 'Fuel Delivery: From Carburetors to GDI',
        duration: '15 min', xp: 200,
        description: 'The chemistry of the perfect air-fuel mixture',
        aiTutor: true,
        introduction: "Gasoline doesn't burn; gasoline VAPOR burns. To get power, an engine must mix fuel and air in a perfect ratio (Stoichiometry). This lesson tracks the evolution from the mechanical 'magic' of carburetors to the high-pressure precision of Gasoline Direct Injection (GDI).",
        sections: [
          { title: '🎯 Stoichiometry: The Magic Ratio', content: "**The 14.7:1 Rule**\n\nFor gasoline, the 'Stoichiometric' ratio is **14.7 parts of air to 1 part of fuel**. \n- **Rich Mixture (e.g., 12:1):** More fuel. It runs cooler and produces more power, but wastes gas and increases CO emissions.\n- **Lean Mixture (e.g., 16:1):** Less fuel. It gets great gas mileage but runs very hot and can melt pistons if it goes too far.\n- **Modern Goal:** Electronic sensors (O2 sensors) watch the exhaust and keep the engine at exactly 14.7 for 90% of your drive to maximize the life of the catalytic converter." },
          { title: '🔧 The Carburetor: Bernoulli’s Victory', content: "**Mechanical Atomization**\n\nBefore 1990, most cars used a carburetor. \n- It used the **Venturi Effect**: As air rushes through a narrow pipe, its pressure drops. This 'low pressure' literally sucks fuel out of a small bowl and into the air stream. \n- **The Downside:** Carburetors are approximate. They don't know if it's -20°C or +40°C outside, leading to 'flooding' or hard starts in winter." },
          { title: '📐 Port Fuel Injection (PFI)', content: "**The Digital Spray**\n\nIn the 80s and 90s, PFI took over. \n- Instead of one big mixer, every cylinder got its own 'Fuel Injector' located just outside the intake valve.\n- The ECU (computer) controls how long the injector stays open. \n- **Precision:** The computer can adjust the fuel for every single pulse, reacting to altitude, temperature, and throttle position in milliseconds." },
          { title: '🚀 Gasoline Direct Injection (GDI)', section: 'The Modern Standard', content: "**High-Pressure Precision**\n\nGDI is the current 'Elite' tech. \n- The injector is inside the combustion chamber (like a Diesel).\n- **High Pressure:** Instead of 50 PSI, it sprays at 3,000+ PSI. \n- **Charge Cooling:** When fuel sprays directly into the cylinder, it evaporates instantly, which COOLS the air. This allows for a higher compression ratio without 'Knock,' resulting in 15% more power and better fuel economy." },
          { title: '🧪 Fuel Systems Practice', content: "**P1:** What happens if an 'O2 Sensor' fails?\n*Answer: The computer goes into 'Limp Mode' (Open Loop). It no longer knows the exact air-fuel ratio, so it sprays 'rich' to be safe, which kills your fuel economy and can clog your catalytic converter.*\n\n**P2:** Why do GDI engines sometimes have 'Carbon Buildup' on intake valves?\n*Answer: In PFI engines, the fuel spray 'washes' the intake valves. In GDI, the fuel sprays past them. Oil vapors from the crankcase can stick to the warm valves and bake into carbon, which eventually chokes the engine.*\n\n**P3:** What is the 'Fuel Trim'?\n*Answer: The percentage adjustment the ECU makes to the fuel delivery to maintain the stoichiometric ratio. 'Short Term' trim happens in seconds; 'Long Term' trim tracks engine wear over weeks.*\n\n**P4:** What is 'Evaporative Emissions' (EVAP)?\n*Answer: A system that catches gasoline fumes from the tank in a charcoal canister so they don't leak into the air. The engine then 'sucks' these fumes in and burns them later.*\n\n**P5:** What is 'Octane' really measuring?\n*Answer: Not 'Power,' but 'Stability.' Higher octane fuel is harder to ignite, which prevents it from exploding too early under high pressure.*" }
        ],
        keyTakeaways: ['Stoichiometric ratio (14.7:1) is the "ideal" mix for emissions', 'The Venturi effect enabled mechanical fuel mixing in carburetors', 'GDI enables higher compression by cooling the air inside the cylinder', 'Oxygen sensors provide the "feedback loop" for modern fuel control', 'Higher octane prevents pre-ignition but does not contain more energy'],
        vocabulary: [
          { term: 'Stoichiometric', definition: 'The ideal ratio of air to fuel for complete combustion' },
          { term: 'Venturi Effect', definition: 'Reduction in fluid pressure that results when a fluid flows through a constricted section' },
          { term: 'GDI', definition: 'Gasoline Direct Injection — spraying fuel directly into the cylinder' },
          { term: 'Fuel Trim', definition: 'The ECU’s adjustment of fuel to maintain the correct mixture' },
          { term: 'Detonation', definition: 'Uneven or premature combustion of the fuel-air mixture' }
        ],
        quiz: {
          questions: [
            { id: 'q1', question: 'The stoichiometric ratio for gasoline is approximately:', options: ['5:1', '14.7:1', '25:1', '1:1'], correctAnswer: 1, explanation: '14.7 pounds of air are needed for every 1 pound of fuel.' },
            { id: 'q2', question: 'GDI (Direct Injection) helps prevent "Knock" because:', options: ['The fuel is blue', 'Evaporating fuel cools the intake charge', 'It uses less air', 'It is slower'], correctAnswer: 1, explanation: 'Direct spray into the hot cylinder absorbs heat during evaporation.' },
            { id: 'q3', question: 'What component measures the result of combustion?', options: ['Fuel Pump', 'Spark Plug', 'Oxygen (O2) Sensor', 'Radiator'], correctAnswer: 2, explanation: 'The O2 sensor tells the computer if the mix was too rich or too lean.' },
            { id: 'q4', question: 'Carburetors rely on which physics principle?', options: ['Electromagnetism', 'The Venturi Effect', 'Nuclear fusion', 'Gravity only'], correctAnswer: 1, explanation: 'Reduced air pressure in the "neck" of the carb pulls fuel out of the bowl.' },
            { id: 'q5', question: 'A "Lean" mixture (too little fuel) causes:', options: ['Better cooling', 'Lower emissions', 'Excessive engine heat', 'Wet spark plugs'], correctAnswer: 2, explanation: 'Lean mixtures burn hotter, which can damage internal engine components.' }
          ]
        }
      },
      {
        id: 'forced-induction-systems',
        title: 'Forced Induction: Turbos & Supers',
        duration: '15 min', xp: 200,
        description: 'Squeezing more air into the engine for massive power',
        aiTutor: true,
        introduction: "An engine is basically an air pump. If you want more power, you need to burn more fuel — but you can't burn fuel without oxygen. Forced Induction uses compressors to 'cram' more air into the engine than it could ever suck in naturally. This lesson explains how we make a small 2.0L engine produce the power of a giant 5.0L V8.",
        sections: [
          { title: '🎯 The Turbocharger: Free Energy?', content: "**Exhaust-Driven Boost**\n\nA turbocharger (Turbo) is two fans on a single shaft:\n1. **The Turbine:** Sits in the hot exhaust stream. The waste gases spinning out of the engine turn this fan at up to 200,000 RPM.\n2. **The Compressor:** Sits in the intake stream. It is spun by the Turbine and 'compresses' the incoming air.\n\n**The Trade-off:** Turbos take time to spin up. This is 'Turbo Lag' — the delay between pushing the pedal and the power arriving. Modern 'Twin-Scroll' or small turbos reduce this lag significantly." },
          { title: '🔧 The Supercharger: Instant Torque', content: "**Belt-Driven Boost**\n\nA Supercharger is connected directly to the engine's crankshaft via a belt.\n- **Advantage:** No lag. The moment the engine turns faster, the boost increases. This gives 'instant' throttle response.\n- **Disadvantage:** It takes power to make power. A supercharger acts like a 'parasitic load' on the engine, making it slightly less fuel-efficient than a turbo." },
          { title: '📐 The Intercooler: Heat is the Enemy', content: "**Solving the Ideal Gas Law**\n\nWhen you compress air, it gets HOT (PV=nRT). Hot air is less dense (fewer oxygen molecules) and causes the engine to 'Knock.'\n\n**The Solution:** The Intercooler. Compressed air passes through a radiator before entering the engine. Cooling the air by 50°C can result in 10-20% more density, allowing you to spray more fuel and get more power safely." },
          { title: '🚀 Wastegates & Blow-Off Valves', section: 'Control and Safety', content: "**Managing the Pressure**\n\n- **Wastegate:** A valve that lets exhaust gas 'bypass' the turbo once the desired 'Boost Pressure' is reached. Without a wastegate, the turbo would keep spinning faster and faster until the engine exploded.\n- **Blow-Off Valve (BOV):** When you lift your foot off the gas at 100 mph, the throttle plate closes. The high-pressure air has nowhere to go and would 'hammer' back into the turbo. The BOV releases this pressure into the air (the 'psshhh' sound) or back into the intake." },
          { title: '🧪 Forced Induction Practice', content: "**P1:** What is 'Boost Pressure'?\n*Answer: The amount of air pressure in the intake manifold above standard atmospheric pressure. 14.7 PSI of boost means you are doubling the amount of air in the engine (2 bar).*\n\n**P2:** Why do most modern 'Eco' cars use small turbos?\n*Answer: 'Downsizing.' A small 3-cylinder turbo engine can be very fuel-efficient when cruising (off-boost) but produce 4-cylinder power when you need to merge onto a highway (on-boost).*\n\n**P3:** What is a 'Twin-Turbo' setup?\n*Answer: Using two turbos. 'Parallel' turbos (one for each bank of a V6/V8) or 'Sequential' (a small one for low RPM and a big one for high RPM) to eliminate lag.*\n\n**P4:** What is 'Heat Soak'?\n*Answer: When the intercooler or the area around the turbo gets so hot (usually from sitting in traffic) that it can no longer cool the intake air, resulting in a noticeable loss of power.*\n\n**P5:** Can you 'Over-Boost' an engine?\n*Answer: Yes. If the wastegate fails, the pressure can exceed the structural strength of the head bolts or head gasket, causing them to 'lift' or blow out.*" }
        ],
        keyTakeaways: ['Turbochargers use waste exhaust energy but suffer from "lag"', 'Superchargers provide instant boost but are less efficient due to parasitic drag', 'Intercoolers are essential to keep compressed air dense and prevent "knock"', 'Wastegates prevent the turbo from spinning too fast and destroying the engine', 'Blow-off valves protect the turbo from pressure spikes when the throttle closes'],
        vocabulary: [
          { term: 'Boost', definition: 'The increase in intake manifold pressure above atmospheric pressure' },
          { term: 'Intercooler', definition: 'A heat exchanger used to cool the air after it has been compressed' },
          { term: 'Wastegate', definition: 'A valve that diverts exhaust gases away from the turbine wheel' },
          { term: 'Turbo Lag', definition: 'The delay between the request for power and the delivery of boost' },
          { term: 'Parasitic Drag', definition: 'The power consumed by a device (like a supercharger) to operate' }
        ],
        quiz: {
          questions: [
            { id: 'q1', question: 'A Turbocharger is driven by:', options: ['A belt', 'The Battery', 'Exhaust Gases', 'The Transmission'], correctAnswer: 2, explanation: 'Waste exhaust energy spins the turbine.' },
            { id: 'q2', question: 'What is the main drawback of a Supercharger compared to a Turbo?', options: ['It has lag', 'It reduces fuel efficiency (parasitic drag)', 'It is too quiet', 'It doesn’t work in winter'], correctAnswer: 1, explanation: 'It takes physical power from the crankshaft to turn the compressor.' },
            { id: 'q3', question: 'The function of an Intercooler is to:', options: ['Cool the driver', 'Cool the compressed intake air to increase density', 'Keep the fuel cold', 'Cool the exhaust'], correctAnswer: 1, explanation: 'Cooler air is denser air, which allows for more fuel and power.' },
            { id: 'q4', question: 'A "Wastegate" regulates:', options: ['The speed of the car', 'The amount of boost pressure', 'The amount of oil', 'The radio volume'], correctAnswer: 1, explanation: 'It controls how much exhaust hits the turbine, limiting boost.' },
            { id: 'q5', question: 'Turbo "Lag" is caused by:', options: ['The time it takes for exhaust to spin up the turbine', 'A slow driver', 'Empty fuel tank', 'Heavy wheels'], correctAnswer: 0, explanation: 'The turbine must accelerate to high RPMs before it creates significant boost.' }
          ]
        }
      },
      {
        id: 'transmission-gearing-systems',
        title: 'Transmissions: Manual, Automatic, & DCT',
        duration: '15 min', xp: 200,
        description: 'The math of gear ratios and torque multiplication',
        aiTutor: true,
        introduction: "An engine only produces peak power in a narrow 'rev range' (e.g., 4000 to 6000 RPM). However, you need to drive from 0 to 200 km/h. The transmission is the 'Math Box' that translates engine torque into wheel speed. This lesson explains how gears work and how we automate the shift.",
        sections: [
          { title: '🎯 Gear Ratios & Torque Multiplication', content: "**The Lever of Speed**\n\nIf a small gear (10 teeth) drives a large gear (30 teeth), you have a **3:1 Gear Ratio**.\n- **Torque:** Increases by 3x. (Great for starting from a stop).\n- **Speed:** Decreases by 3x. (The engine has to spin 3,000 RPM just to make the wheels spin 1,000 RPM).\n\n**Overdrive:** In high gears (like 6th gear), the ratio is less than 1:1 (e.g. 0.7:1). The wheels spin faster than the engine, which lowers RPM and saves fuel on the highway." },
          { title: '🔧 The Manual Clutch & Synchronizers', content: "**The Human Link**\n\n- **The Clutch:** Two friction discs that press together. When you push the pedal, you separate them, allowing the engine to spin while the car is stopped.\n- **Synchronizers (Synchros):** When you shift, the gears are spinning at different speeds. A 'Synchro' is a small brass cone that uses friction to 'match' the speeds of the gears before they lock together, preventing that 'crunching' sound." },
          { title: '📐 The Torque Converter: Fluid Power', content: "**The Automatic Secret**\n\nTraditional Automatics don't have a clutch. They use a **Torque Converter** — a bowl of oil with two fans inside.\n- The engine spins one fan, which 'sloshes' oil into the second fan, which turns the transmission.\n- **Advantage:** Smoothness. You can stop at a red light in 'Drive' because the oil just swirls without locking up. \n- **Stall Speed:** The RPM where the oil transfer becomes strong enough to move the car." },
          { title: '🚀 DCT: Dual-Clutch Transmissions', section: 'The Performance Peak', content: "**Preparation is Key**\n\nA DCT is effectively two manual transmissions in one box. \n- One clutch handles gears 1, 3, and 5.\n- The other handles 2, 4, and 6. \n- **The Trick:** While you are driving in 2nd gear, the computer has *already* put the other transmission into 3rd. When it’s time to shift, one clutch opens while the other closes in **milliseconds**. This results in shifts faster than any human, with zero loss of power." },
          { title: '🧪 Transmission Practice', content: "**P1:** What is a 'CVT' (Continuously Variable Transmission)?\n*Answer: It doesn't use gears. It uses two pulleys and a steel belt. By changing the size of the pulleys, it can provide an 'infinite' number of ratios, keeping the engine at its perfect efficiency RPM at all times.*\n\n**P2:** What is the 'Final Drive' ratio?\n*Answer: The fixed gear ratio in the differential (usually 3:1 to 4:1). It multiplies the torque one last time before it reaches the wheels.*\n\n**P3:** Why do modern cars have 8 or 10 speeds?\n*Answer: To keep the engine in its most efficient 'sweet spot.' More gears mean the engine doesn't have to change RPM as much as you accelerate, saving fuel.*\n\n**P4:** What is 'Rev-Matching'?\n*Answer: Blinking the throttle to raise the engine RPM during a downshift so that it matches the speed of the lower gear. This prevents the car from 'jerking' when the clutch is released.*\n\n**P5:** What does a 'Limited Slip Differential' (LSD) do?\n*Answer: In a turn, the outside wheel travels further than the inside. A standard differential lets them spin at different speeds but can send all power to a 'spinning' wheel in the mud. An LSD uses clutches to 'lock' the wheels together if one starts spinning too fast, ensuring both wheels get power.*" }
        ],
        keyTakeaways: ['Gear ratios trade speed for torque or vice versa', 'Torque converters use fluid coupling for smooth automatic shifting', 'Dual-Clutch Transmissions (DCT) pre-select the next gear for near-instant shifts', 'CVTs provide infinite ratios by varying pulley diameters', 'Differentials allow wheels to spin at different speeds during cornering'],
        vocabulary: [
          { term: 'Synchronizer', definition: 'A device used to match the speed of gears before engagement' },
          { term: 'Torque Converter', definition: 'A fluid coupling used in automatic transmissions' },
          { term: 'Overdrive', definition: 'A gear ratio where the output speed is higher than the input speed' },
          { term: 'DCT', definition: 'Dual-Clutch Transmission — semi-automatic gearbox using two separate clutches' },
          { term: 'Differential', definition: 'A gear assembly that allows drive wheels to rotate at different speeds' }
        ],
        quiz: {
          questions: [
            { id: 'q1', question: 'A 4:1 gear ratio means:', options: ['The engine is 4x faster', 'Torque is multiplied by 4', 'The car has 4 wheels', '4 gallons of oil'], correctAnswer: 1, explanation: 'Ratios higher than 1:1 multiply the torque.' },
            { id: 'q2', question: 'Traditional Automatics use ______ instead of a friction clutch.', options: ['Gears', 'A Torque Converter (Fluid)', 'Magnets', 'Cables'], correctAnswer: 1, explanation: 'Fluid coupling allows for idle stops without stalling.' },
            { id: 'q3', question: 'The main advantage of a DCT is:', options: ['It is cheaper', 'It can shift in milliseconds with no power loss', 'It doesn’t need oil', 'It is lighter than a manual'], correctAnswer: 1, explanation: 'Pre-selecting the next gear enables ultra-fast shifts.' },
            { id: 'q4', question: 'An "Overdrive" gear is used for:', options: ['Racing only', 'Maximum acceleration', 'High-speed fuel efficiency (low RPM)', 'Going uphill'], correctAnswer: 2, explanation: 'Low engine RPM at high vehicle speed saves fuel.' },
            { id: 'q5', question: 'A Differential is necessary because:', options: ['The engine is too loud', 'Wheels must spin at different speeds in a turn', 'To change the oil', 'To steer the car'], correctAnswer: 1, explanation: 'The outside wheel travels a longer path in a curve.' }
          ]
        }
      },
      {
        id: 'drivetrain-layouts',
        title: 'Drivetrain Layouts: FWD, RWD, AWD',
        duration: '15 min', xp: 200,
        description: 'The physics of weight transfer and traction control',
        aiTutor: true,
        introduction: "Where you put the engine and which wheels you drive changes everything about how a car feels. From the 'Safe' understeer of a Front-Wheel Drive car to the 'Drift' potential of Rear-Wheel Drive, this lesson explores the dynamics of drivetrain layout.",
        sections: [
          { title: '🎯 FWD: Front-Wheel Drive Efficiency', content: "**The Compact Standard**\n\nMost modern economy cars are FWD. \n- **Packaging:** The engine, transmission, and differential are all in one 'Transaxle' unit under the hood. This leaves more room for passengers. \n- **Understeer:** FWD cars naturally 'Understeer' (the car wants to go straight when you turn). This is safer for average drivers because if you go too fast into a corner, you just slide slowly toward the outside." },
          { title: '🔧 RWD: Rear-Wheel Drive Balance', content: "**The Driver’s Choice**\n\nRWD is preferred for sports cars and trucks. \n- **Balance:** Dividing the labor. The front wheels handle steering, and the rear wheels handle power. This prevents the front tires from being 'overwhelmed.'\n- **Weight Transfer:** When you accelerate, weight shifts to the BACK. In a RWD car, this pushes the tires into the dirt/pavement, giving MORE traction. (In a FWD car, the front lifts up, causing the tires to spin)." },
          { title: '📐 AWD vs. 4WD: The Traction Kings', content: "**Electronic vs. Mechanical**\n\n- **AWD (All-Wheel Drive):** Designed for paved roads and rain/snow. It uses a 'Center Differential' to constantly shift power between front and rear automatically. It stays on 100% of the time.\n- **4WD (Four-Wheel Drive):** Designed for off-road. It usually 'Locks' the front and rear axles together so they spin at exactly the same speed. This is great for mud but can snap the axles if used on dry pavement during a turn." },
          { title: '🚀 Transaxles & Mid-Engine Layouts', section: 'Specialized Balance', content: "**Optimizing the CG**\n\n- **Front-Engine RWD (FR):** Standard layout. Good cooling, easy to work on.\n- **Mid-Engine RWD (MR):** The engine is behind the driver but in front of the rear axle. This provides the best 'Polar Moment of Inertia' for racing.\n- **Rear-Engine RWD (RR):** Think Porsche 911. Putting the engine over the rear wheels gives incredible traction during braking and acceleration, but makes the car 'tail-happy' (prone to spinning) if the driver isn't skilled." },
          { title: '🧪 Drivetrain Practice', content: "**P1:** What is 'Torque Steer'?\n*Answer: A problem in high-power FWD cars. Because the axles are often different lengths, the engine's torque can pull the steering wheel to one side during hard acceleration.*\n\n**P2:** Why do trucks use RWD?\n*Answer: Because when a truck is loaded with 2 tons of gravel, all that weight is over the rear axle. RWD ensures the tires have maximum grip to move that heavy load.*\n\n**P3:** What is a 'Transfer Case'?\n*Answer: The gearbox used in 4WD systems to split power between the front and rear driveshafts. It often includes a 'Low Range' for maximum climbing torque.*\n\n**P4:** What is 'Understeer' vs 'Oversteer'?\n*Answer: Understeer is when the front tires lose grip first ('Push'). Oversteer is when the rear tires lose grip first ('Loose/Drift').*\n\n**P5:** Can AWD cars handle better than RWD?\n*Answer: On a track, RWD is often faster because it is lighter. But in the real world (rain, bumpy roads), AWD is faster because it can put down 100% of its power without spinning the tires.*" }
        ],
        keyTakeaways: ['FWD is efficient and compact but prone to understeer', 'RWD benefits from rearward weight transfer during acceleration', 'AWD automatically balances grip for road safety and performance', '4WD is mechanical and usually locked for heavy off-road use', 'Engine placement (Front, Mid, Rear) dictates the car’s rotational agility'],
        vocabulary: [
          { term: 'Transaxle', definition: 'A combination of transmission, axle, and differential in one assembly' },
          { term: 'Transfer Case', definition: 'Part of a 4WD system that splits engine power to both axles' },
          { term: 'Understeer', definition: 'A handling condition where the car turns less than requested' },
          { term: 'Oversteer', definition: 'A handling condition where the car turns more than requested' },
          { term: 'Torque Steer', definition: 'The tendency for a car to pull to one side under heavy throttle' }
        ],
        quiz: {
          questions: [
            { id: 'q1', question: 'Which layout is most common in compact economy cars?', options: ['Rear-Engine RWD', 'Mid-Engine AWD', 'Front-Engine FWD', '4WD'], correctAnswer: 2, explanation: 'FWD is compact and cheap to manufacture.' },
            { id: 'q2', question: 'Acceleration "Weight Transfer" helps which drivetrain most?', options: ['FWD', 'RWD', 'No effect', 'Electric only'], correctAnswer: 1, explanation: 'Weight shifts to the rear, increasing grip on the driving wheels.' },
            { id: 'q3', question: 'The main difference between "AWD" and "4WD" is:', options: ['4WD has 4 wheels', 'AWD is always on and uses diffs; 4WD is selectable and locks axles', 'AWD only works in summer', 'There is no difference'], correctAnswer: 1, explanation: 'AWD handles varied speeds between wheels; 4WD locks them for mud/snow.' },
            { id: 'q4', question: '"Torque Steer" is a side effect of which layout?', options: ['RWD', 'FWD', 'Mid-Engine', 'Horse and carriage'], correctAnswer: 1, explanation: 'Uneven axle lengths in front-drive cars pull the steering wheel.' },
            { id: 'q5', question: 'Understeer is often called "______" by racing drivers.', options: ['Drifting', 'Pushing', 'Dancing', 'Flying'], correctAnswer: 1, explanation: 'The car "pushes" straight regardless of steering input.' }
          ]
        }
      }
    ]
  }]
};

export default section1Powertrain;
