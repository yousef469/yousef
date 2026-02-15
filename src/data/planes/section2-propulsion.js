export const section2Propulsion = {
  id: 'propulsion',
  title: 'Section 2: Propulsion Systems',
  description: 'Piston engines, jets, and propellers',
  icon: '🔥',
  color: 'from-orange-500 to-red-500',
  units: [
    {
      id: 'propulsion-systems',
      title: 'Aircraft Powerplants',
      description: 'From pistons to jets',
      lessons: [
        {
          id: 'piston-engines',
          title: 'Reciprocating Engines',
          duration: '30 min',
          xp: 175,
          description: 'The four-stroke cycle and engine operation',
          introduction: 'Piston engines powered the first century of aviation and still dominate general aviation today. They are masterpieces of mechanical timing.',
          sections: [
            {
              title: 'The Otto Cycle',
              content: `**Four Strokes of Power:**\n\n1. **Intake:** Piston moves down, sucking in fuel/air mixture.\n2. **Compression:** Piston moves up, squeezing the mixture (Ratio 7:1 to 10:1).\n3. **Power:** Spark plug fires, explosion pushes piston down (The only working stroke).\n4. **Exhaust:** Piston moves up, pushing out burnt gases.\n\n**Key Concepts:**\n- **Ignition:** Dual magnetos (self-powered) fire two spark plugs per cylinder for redundancy and better burn.\n- **Cooling:** Air-cooled (fins) vs Liquid-cooled.`
            },
            {
              title: 'Performance & Systems',
              content: `**Engine Controls:**\n- **Throttle:** Controls Manifold Pressure (Air/Fuel amount) -> Power.\n- **Mixture:** Controls Fuel/Air ratio. (Lean it as you climb because air gets thinner!).\n- **Propeller:** Controls RPM.\n\n**Turbocharging vs Supercharging:**\nBoth force more air into the engine to maintain sea-level power at altitude.\n- **Turbo:** Driven by exhaust gas (free energy, but hot).\n- **Supercharger:** Driven by the engine crankshaft (instant response, but steals HP).`
            },
            {
              title: 'Operational Realities',
              content: `**Detonation:**\nExplosive uneven burning of fuel (Knocking). Can destroy an engine in seconds.\n- Cause: Low grade fuel, high heat, too lean.\n\n**Shock Cooling:**\nDescending too fast with low power cools the engine rapidly, causing cylinder heads to crack.`
            }
          ],
          keyTakeaways: [
            'Aircraft engines use the 4-stroke Otto cycle',
            'Dual ignition provides safety and efficiency',
            'Mixture must be leaned at altitude to maintain correct ratio',
            'Turbocharging restores power lost at high altitudes'
          ],
          quiz: {
            questions: [
              { id: 'q1', question: 'Which stroke actually produces power?', options: ['Intake', 'Compression', 'Power', 'Exhaust'], correctAnswer: 2, explanation: 'Only the Power stroke turns the crankshaft; the others consume energy.' },
              { id: 'q2', question: 'Why do aircraft engines have two spark plugs per cylinder?', options: ['More power', 'Safety/Redundancy', 'Cheaper', 'Less weight'], correctAnswer: 1, explanation: 'If one fails, the other keeps the engine running. It also burns fuel more evenly.' },
              { id: 'q3', question: 'What drives a Turbocharger?', options: ['Crankshaft', 'Exhaust gas', 'Electric motor', 'Wind'], correctAnswer: 1, explanation: 'Turbos use the waste energy of the high-velocity exhaust gases.' }
            ]
          }
        },
        {
          id: 'propellers',
          title: 'Propeller Aerodynamics',
          duration: '25 min',
          xp: 150,
          description: 'Converting torque into thrust',
          introduction: 'A propeller is just a rotating wing. Understanding its twist and pitch is crucial for efficiency.',
          sections: [
            {
              title: 'Blade Element Theory',
              content: `**A Twisted Wing**\n\n- The tip moves near speed of sound (Mach 0.9).\n- The root (near hub) moves slowly.\n- **Twist:** The blade angle is high at the root and low at the tip to keep the Angle of Attack (AoA) constant along the blade.\n\n**Forces:**\n- **Thrust:** The "Lift" pointing forward.\n- **Torque:** The "Drag" resisting rotation (Engine must overcome this).`
            },
            {
              title: 'Propeller Types',
              content: `**Fixed Pitch:**\n- Simple, one piece.\n- Compromise: "Climb Prop" (low pitch) vs "Cruise Prop" (high pitch).\n\n**Constant Speed (Variable Pitch):**\n- Pilot sets RPM.\n- **Governor** uses oil pressure to twist blades automatically.\n- Like an automatic transmission for a car.\n\n**Feathering:**\n- Turning blades edge-on to the wind.\n- Critical for multi-engine failure to reduce drag.`
            },
            {
              title: 'P-Factor & Torque Effects',
              content: `**Why planes turn left:**\n\n1. **Torque:** Newton's 3rd law. Prop turns right, plane rolls left.\n2. **P-Factor:** At high AoA (climb), descending blade takes a bigger "bite" of air than ascending blade. Yaw to the left.\n3. **Spiraling Slipstream:** Prop wash hits the left side of the vertical stabilizer.`
            }
          ],
          keyTakeaways: [
            'Propellers are twisted to maintain constant AoA along the blade',
            'Constant speed props optimize efficiency for both climb and cruise',
            'Feathering a prop reduces drag significantly after engine failure',
            'P-Factor causes a left-turning tendency during high-power climbs'
          ],
          quiz: {
            questions: [
              { id: 'q1', question: 'Why are propeller blades twisted?', options: ['For style', 'To reduce noise', 'To maintain constant AoA', 'To increase strength'], correctAnswer: 2, explanation: 'The twist compensates for the different speeds of the blade sections (tip vs root).' },
              { id: 'q2', question: 'In a Constant Speed prop, what changes the blade angle?', options: ['Electric motor', 'Oil pressure via Governor', 'Wind force', 'Human strength'], correctAnswer: 1, explanation: 'A governor regulates oil pressure to the hub to change pitch and maintain RPM.' },
              { id: 'q3', question: 'P-Factor is most noticeable during:', options: ['Cruise', 'Descent', 'High angles of attack (Climb)', 'Taxiing'], correctAnswer: 2, explanation: 'P-Factor is caused by asymmetric thrust loading on the blades at high angles of attack.' }
            ]
          }
        },
        {
          id: 'gas-turbines',
          title: 'Gas Turbine Fundamentals',
          duration: '35 min',
          xp: 200,
          description: 'The Brayton cycle, Turbojets, and Turbofans',
          introduction: 'Gas turbines are the muscle of modern aviation. They compress air, burn it, and use the expansion to create massive thrust.',
          sections: [
            {
              title: 'The Brayton Cycle',
              content: `**Suck, Squeeze, Bang, Blow**\n\nSuccessful continuous combustion:\n1. **Inlet:** Slows air down, increases pressure.\n2. **Compressor:** Squeezes air (Pressure Ratio 30:1+).\n3. **Combustor:** Fuel added, continuous burn (const pressure).\n4. **Turbine:** Exhaust spins turbine (which drives compressor).\n5. **Nozzle:** Accelerates gas to create Jet Thrust.`
            },
            {
              title: 'Engine Types',
              content: `**Turbojet:**\n- All air goes through the core.\n- Loud, inefficient at low speed. Fast exhaust.\n- Used in older fighters/Concorde.\n\n**Turbofan:**\n- **Core** generates power to spin a huge **Fan**.\n- **Bypass Ratio:** Most air goes *around* the core (80-90%).\n- Quiet, efficient, massive thrust at takeoff.\n- The "Fan" is basically a ducted propeller.\n\n**Components:**\n- **N1:** Low pressure spool (Fan).\n- **N2:** High pressure spool (Core).`
            },
            {
              title: 'Performance Metrics',
              content: `**Thrust vs. Speed:**\n- Jets produce *more* power as they go faster (Ram effect).\n\n**Specific Fuel Consumption (SFC):**\n- Fuel used per pound of thrust.\n- High Bypass Turbofans have the lowest (best) SFC.\n- Altitude: Jets are efficient at high altitude (cold air = efficient thermodynamic cycle).`
            }
          ],
          keyTakeaways: [
            'Gas turbines operate on the continuous Brayton cycle',
            'Turbofans are more efficient because they accelerate a large mass of air slowly',
            'The Turbine extracts energy to drive the Compressor',
            'High Bypass engines power almost all modern airliners'
          ],
          quiz: {
            questions: [
              { id: 'q1', question: 'In a Turbofan, most thrust comes from:', options: ['The Core', 'The Fan (Bypass air)', 'The Afterburner', 'The Nozzle'], correctAnswer: 1, explanation: 'In high-bypass engines, up to 90% of thrust is generated by the large front fan.' },
              { id: 'q2', question: 'What does the Turbine do?', options: ['Compresses air', 'Adds fuel', 'Extracts energy to drive the compressor', 'Cooling'], correctAnswer: 2, explanation: 'The turbine absorbs energy from the hot exhaust to keep the compressor spinning.' },
              { id: 'q3', question: 'The Brayton Cycle consists of:', options: ['Compression, Combustion, Expansion', 'Intake, Compression, Power, Exhaust', 'Lift, Weight, Thrust', 'None'], correctAnswer: 0, explanation: 'Continuous Compression, Constant Pressure Combustion, and Expansion.' }
            ]
          }
        },
        {
          id: 'turboprops',
          title: 'Turboprop & Turboshaft',
          duration: '30 min',
          xp: 175,
          description: 'Harnessing jet power for shafts and rotors',
          introduction: 'Sometimes you don not want jet thrust; you want raw torque. Turboprops and turboshafts use a gas turbine to drive a gearbox, not a nozzle.',
          sections: [
            {
              title: 'How They Work',
              content: `**Extracting the Power**\n\nInstead of letting the exhaust gas shoot out the back (Thrust):\n1. Use extra **Turbine Stages** to absorb almost ALL the energy.\n2. Send this rotational energy to a shaft.\n3. **Reduction Gearbox:** Slows the 30,000 RPM turbine down to 2,000 RPM for the prop/rotor.\n\n**Free Turbine:**\nThe power turbine is not mechanically connected to the engine core (Gas Generator). The air coupling acts like a fluid clutch.`
            },
            {
              title: 'Turboprops',
              content: `**The Efficient Middle Ground**\n- **Best for:** 250-400 knots, short runways.\n- **Why:** Propellers move a lot of air (efficient at low speed).\n- **Example:** C-130 Hercules, Q400, PC-12.\n- **Reverse Thrust:** Easy to implement by changing propeller pitch.`
            },
            {
              title: 'Turboshafts',
              content: `**Helicopter Power**\n- Identical to turboprops but lighter gearbox logic.\n- **Governance:** Engine must maintain constant RPM (e.g., 100%) regardless of how much pitch (load) the pilot pulls.\n- **APU:** The Auxiliary Power Unit in jets is a small turboshaft driving a generator/compressor.`
            }
          ],
          keyTakeaways: [
            'Turboprops extract exhaust energy to drive a propeller',
            'Reduction gearboxes are critical to convert high RPM to usable torque',
            'Free turbines allow the prop to stop while the engine runs (Hotel Mode)',
            'Turboprops fill the gap between piston efficiency and jet speed'
          ],
          quiz: {
            questions: [
              { id: 'q1', question: 'How is a Turboprop different from a Turbojet?', options: ['It uses diesel', 'It extracts energy to drive a shaft', 'It has no compressor', 'It is quieter'], correctAnswer: 1, explanation: 'A turboprop uses turbines to extract energy for a shaft/propeller rather than jet thrust.' },
              { id: 'q2', question: 'What does the Reduction Gearbox do?', options: ['Increases RPM', 'Reduces RPM and increases Torque', 'Cools the engine', 'Mixes fuel'], correctAnswer: 1, explanation: 'It steps down the high turbine speed to a speed the propeller can handle.' },
              { id: 'q3', question: 'Turboshafts are primarily used in:', options: ['Fighters', 'Gliders', 'Helicopters', 'Submarines'], correctAnswer: 2, explanation: 'Helicopters use turboshafts to drive the main rotor transmission.' }
            ]
          }
        },
        {
          id: 'engine-systems',
          title: 'Engine Systems',
          duration: '30 min',
          xp: 150,
          description: 'Fuel, oil, and FADEC control systems',
          introduction: 'An engine is useless without fuel to burn, oil to lubricate, and a computer to tell it what to do.',
          sections: [
            {
              title: 'Fuel Systems',
              content: `**Liquid Energy**\n- **Jet A/A-1:** Kerosene based. Higher flash point than gas (safer).\n- **Heaters:** Fuel is used to cool engine oil (Heat Exchanger). Warms fuel to prevent icing.\n- **Pumps:**\n  - **Boost Pumps:** In tanks (prevent cavitation/vapor lock).\n  - **Engine Driven Pump:** High pressure for injection.`
            },
            {
              title: 'Oil Systems',
              content: `**Lifeblood of the Engine**\n- **Functions:** Lubricate, Cool, Clean, Seal, Actuate (Prop governors).\n- **Dry Sump:** Oil is stored in a separate tank, not the oil pan. Allows inverted flight and better cooling.\n- **Chip Detectors:** Magnetic plugs that catch metal flakes (early warning of failure).`
            },
            {
              title: 'FADEC',
              content: `**Full Authority Digital Engine Control**\nThe computer is the boss.\n- **No Mechanical Link:** Throttle lever is just a sensor.\n- **Protection:** Prevents hot starts, over-speed, and compressor stalls.\n- **Efficiency:** Adjusts fuel flow 100s of times a second for optimal burn.\n- **Redundancy:** Dual channels (A and B). If both fail, the engine quits.`
            }
          ],
          keyTakeaways: [
            'Jet A is kerosene-based and used for cooling oil',
            'Dry sump oil systems allow for complex maneuvers',
            'FADEC protects the engine and optimizes efficiency',
            'Magnetic chip detectors warn of internal engine wear'
          ],
          quiz: {
            questions: [
              { id: 'q1', question: 'FADEC stands for:', options: ['Fast Acting Digital Engine Control', 'Full Authority Digital Engine Control', 'Fuel And Digital Engine Computer', 'Flight Automated Digital Engine Control'], correctAnswer: 1, explanation: 'Full Authority Digital Engine Control.' },
              { id: 'q2', question: 'Why is a dry sump system used?', options: ['It uses no oil', 'To store oil separately for better cooling/inverted flight', 'It is cheaper', 'It weighs less'], correctAnswer: 1, explanation: 'Dry sumps ensure oil supply during maneuvers where gravity might starve a wet sump.' },
              { id: 'q3', question: 'What is the purpose of a Fuel-Oil Heat Exchanger?', options: ['Cool fuel, heat oil', 'Heat fuel, cool oil', 'Mix them together', 'Filter the fuel'], correctAnswer: 1, explanation: 'It cools the hot engine oil while heating the cold fuel (preventing ice).' }
            ]
          }
        }
      ]
    }
  ]
};

export default section2Propulsion;
