export const section3Systems = {
    id: 'systems',
    title: 'Section 3: Aircraft Systems',
    description: 'Hydraulics, electrics, and environmental control',
    icon: '⚙️',
    color: 'from-cyan-500 to-blue-500',
    units: [
        {
            id: 'aircraft-systems',
            title: 'Utility Systems',
            description: 'The veins and nerves of the aircraft',
            lessons: [
                {
                    id: 'hydraulics',
                    title: 'Hydraulic Systems',
                    duration: '35 min',
                    xp: 175,
                    description: 'Pascal’s Law and moving heavy surfaces',
                    introduction: 'How do you move a 5-ton rudder at 600 mph? You don’t. You use pressurized fluid to do it for you.',
                    sections: [
                        {
                            title: 'Fluid Power',
                            content: `**Pascal’s Law:**\nPressure applied to a confined fluid is transmitted equally in all directions. F = P x A.\n\n**Why Hydraulics?**\n- **Power Density:** Huge force from small actuators.\n- **Incompressibility:** Instant response, no lag.\n- **Lubrication:** The fluid lubricates the system itself.`
                        },
                        {
                            title: 'System Components',
                            content: `**The Circuit:**\n1. **Reservoir:** Stores fluid (Skydrol - fire resistant, but corrosive).\n2. **Pumps:** Engine-driven (EDP) or Electric (ACMP).\n3. **Accumulator:** A gas-charged sphere that stores energy for emergency braking and dampens spikes.\n4. **Actuators:** Cylinders that push/pull surfaces.\n5. **PTU (Power Transfer Unit):** Transfers *pressure* (not fluid) between systems. The "barking dog" noise on Airbus.`
                        },
                        {
                            title: 'Redundancy',
                            content: `**Triple Redundancy:**\nCommercial jets usually have 3 independent systems (e.g., Green, Blue, Yellow).\n- If one fails, the others take over.\n- **RAT (Ram Air Turbine):** A small propeller drops into the airstream to power a backup pump if all engines fail.`
                        }
                    ],
                    keyTakeaways: [
                        'Hydraulics use incompressible fluid to transmit massive force',
                        'Skydrol is the industry standard fluid (fire resistant)',
                        'The PTU transfers power between systems without mixing fluid',
                        'The RAT provides emergency hydraulic power'
                    ],
                    quiz: {
                        questions: [
                            { id: 'q1', question: 'What is the main advantage of hydraulic systems?', options: ['They are light', 'High power density and instant response', 'They use air', 'They are cheap'], correctAnswer: 1, explanation: 'Hydraulics can generate tons of force with small actuators.' },
                            { id: 'q2', question: 'What does a PTU do?', options: ['Transfers fluid', 'Transfers power/pressure', 'Cools the fluid', 'Filters the fluid'], correctAnswer: 1, explanation: 'The Power Transfer Unit uses a hydraulic motor/pump to transfer pressure between systems without mixing the fluid.' },
                            { id: 'q3', question: 'What happens if all engines fail?', options: ['No hydraulics', 'The RAT deploys', 'Gravity works', 'Use electrics'], correctAnswer: 1, explanation: 'The Ram Air Turbine drops down to power critical systems.' }
                        ]
                    }
                },
                {
                    id: 'pneumatics',
                    title: 'Pneumatic Systems',
                    duration: '25 min',
                    xp: 150,
                    description: 'High pressure air usage',
                    introduction: 'Air isn’t just for breathing. High-pressure "bleed air" from the engines is used for heating, cooling, and de-icing.',
                    sections: [
                        {
                            title: 'Bleed Air',
                            content: `**Source:**\nTaken from the compressor stage of the jet engine (P3 or P2.5).\n- Very hot (400°C+) and high pressure.\n- Cooled by Pre-coolers before entering the fuselage.\n\n**Uses:**\n- **Anti-Ice:** Heated wing leading edges.\n- **Pressurization:** Pumped into the cabin.\n- **Starting:** Used to spin other engines for start.\n- **Water tank:** Pressurizing the potable water system.`
                        },
                        {
                            title: 'Bleedless Aircraft',
                            content: `**The B787 Dreamliner:**\n- Moves away from bleed air.\n- Uses electric compressors for cabin air.\n- **Why?** Taking bleed air robs the engine of thrust and efficiency. Electric is more efficient.`
                        }
                    ],
                    keyTakeaways: [
                        'Bleed air comes from the engine compressor',
                        'It is used for anti-ice, pressurization, and engine starting',
                        'Bleed air is extremely hot and must be cooled',
                        'Modern aircraft are moving towards electric systems (Bleedless)'
                    ],
                    quiz: {
                        questions: [
                            { id: 'q1', question: 'Where does bleed air come from?', options: ['The exhaust', 'The compressor', 'The fan', 'The landing gear'], correctAnswer: 1, explanation: 'It is "bled" from the high-pressure compressor stages.' },
                            { id: 'q2', question: 'Why are new aircraft going "bleedless"?', options: ['It is safer', 'Bleed air reduces engine efficiency', 'Bleed air is toxic', 'It is cheaper'], correctAnswer: 1, explanation: 'Extracting high-pressure air reduces the thrust output and fuel efficiency of the engine.' },
                            { id: 'q3', question: 'What is a primary use of bleed air?', options: ['Cooling brakes', 'Wing Anti-Ice', 'Moving flaps', 'Radio cooling'], correctAnswer: 1, explanation: 'Hot bleed air is routed to the leading edges to melt ice.' }
                        ]
                    }
                },
                {
                    id: 'electrical',
                    title: 'Electrical Systems',
                    duration: '35 min',
                    xp: 175,
                    description: 'AC vs DC and the electrical bus',
                    introduction: 'Modern aircraft are flying data centers. A robust electrical grid is essential for avionics, sensors, and even flight controls.',
                    sections: [
                        {
                            title: 'AC vs DC',
                            content: `**AC (Alternating Current):**\n- **Wild Frequency:** 115V, 400Hz (not 60Hz like home).\n- **Why 400Hz?** Allows motors/transformers to be much lighter. (Lighter magentics).\n- **Sources:** Engine Generators (IDG).\n\n**DC (Direct Current):**\n- **28 Volts:** The standard for avionics and charging batteries.\n- **TRU (Transformer Rectifier Unit):** Converts AC to DC.`
                        },
                        {
                            title: 'Distribution',
                            content: `**The Bus:**\nA metal bar that distributes power.\n- **Hot Battery Bus:** Always connected to battery (Clicking relays).\n- **Essential Bus:** Powers critical items (Screens, Radio) in emergencies.\n- **Utility Bus:** Galleys, Coffee Makers (First to be shed if load is high).`
                        },
                        {
                            title: 'Sources',
                            content: `**Hierarchy of Power:**\n1. **Generators:** Main engine driven.\n2. **APU:** Ground power and backup in flight.\n3. **GPU:** Ground Power Unit (plugged in at gate).\n4. **Batteries:** Last resort (30-60 mins of power).`
                        }
                    ],
                    keyTakeaways: [
                        'Aircraft use 115V 400Hz AC power to save weight',
                        'TRUs convert AC to 28V DC for avionics',
                        'The Essential Bus powers critical systems during failures',
                        'Batteries are the final backup source'
                    ],
                    quiz: {
                        questions: [
                            { id: 'q1', question: 'Why do aircraft use 400Hz power?', options: ['It travels faster', 'It allows for lighter components', 'It is safer', 'It prevents shocking'], correctAnswer: 1, explanation: 'Higher frequency allows for smaller, lighter transformers and motors.' },
                            { id: 'q2', question: 'What converts AC to DC?', options: ['Inverter', 'Transformer Rectifier Unit (TRU)', 'Battery', 'Generator'], correctAnswer: 1, explanation: 'A TRU rectifies AC power into DC power.' },
                            { id: 'q3', question: 'Which bus powers the coffee makers?', options: ['Essential Bus', 'Hot Battery Bus', 'Utility Bus', 'Emergency Bus'], correctAnswer: 2, explanation: 'Non-essential loads are on the Utility bus and are shed first.' }
                        ]
                    }
                },
                {
                    id: 'environmental',
                    title: 'Environmental Control',
                    duration: '30 min',
                    xp: 150,
                    description: 'Pressurization and Air Conditioning',
                    introduction: 'At 35,000 feet, the temperature is -55°C and the air is unbreathable. The ECS packs make the cabin a comfortable 22°C living room.',
                    sections: [
                        {
                            title: 'Pressurization',
                            content: `**The Balloon Principle:**\nWe pump air IN and control how fast it leaks OUT.\n- **Inflow:** Bleed air (conditioned).\n- **Outflow Valve:** The "drain plug" at the back of the plane. It modulates to control pressure.\n- **Cabin Altitude:** Even at 40,000ft, the cabin feels like 6,000-8,000ft.`
                        },
                        {
                            title: 'Air Conditioning (Packs)',
                            content: `**Air Cycle Machine (ACM):**\nHow to cool hot bleed air without Freon?\n1. **Compress:** Heats it up.\n2. **Heat Exchanger:** Cools it with outside air.\n3. **Expand:** Rapid expansion causes massive temperature drop (Thermodynamics).\n- Result: Near freezing air to mix with hot air for temperature control.`
                        }
                    ],
                    keyTakeaways: [
                        'Pressurization is controlled by the Outflow Valve',
                        'The cabin acts like a controlled leak',
                        'Air Cycle Machines use expansion to cool air without refrigerant',
                        'Cabin altitude is maintained at 8,000ft max'
                    ],
                    quiz: {
                        questions: [
                            { id: 'q1', question: 'How is cabin pressure controlled?', options: ['Pumping more air in', 'Opening/Closing the Outflow Valve', 'Sealing the doors', 'Using oxygen tanks'], correctAnswer: 1, explanation: 'The outflow valve regulates the release of air to maintain pressure.' },
                            { id: 'q2', question: 'What is a "Pack"?', options: ['Luggage', 'Pneumatic Air Conditioning Kit', 'A fuel tank', 'A hydraulic pump'], correctAnswer: 1, explanation: 'Systems that condition the hot bleed air for cabin use.' },
                            { id: 'q3', question: 'If the cabin altitude goes above 14,000ft, what happens?', options: ['Pilots eject', 'Oxygen masks drop', 'Engines stop', 'Coffee maker stops'], correctAnswer: 1, explanation: 'Automatic sensors deploy passenger oxygen masks.' }
                        ]
                    }
                },
                {
                    id: 'ice-protection',
                    title: 'Ice & Rain Protection',
                    duration: '25 min',
                    xp: 150,
                    description: 'Surviving icing conditions',
                    introduction: 'Ice destroys lift and adds weight. Aircraft must be able to shed ice (De-ice) or prevent it from forming (Anti-ice).',
                    sections: [
                        {
                            title: 'Types of Ice',
                            content: `**Structural Icing:**\n- **Rime:** Rough, milky white. Instant freeze. Changes wing shape.\n- **Clear:** Heavy, transparent. Flows back over wing. Very dangerous.\n\n**Effects:**\n- Reduces Lift (up to 30%).\n- Increases Drag (up to 40%).\n- Increases stall speed.`
                        },
                        {
                            title: 'Protection Systems',
                            content: `**Anti-Ice (Prevention):**\n- **Thermal:** Hot bleed air heats the leading edge (Jets).\n- **Electric:** Heated windshields and pitot tubes.\n\n**De-Ice (Removal):**\n- **Boots:** Rubber bladders on the wing that inflate to crack ice (Turboprops).\n- **TKS:** Weeping wings that ooze glycol antifreeze.`
                        }
                    ],
                    keyTakeaways: [
                        'Ice destroys lift and increases stall speed',
                        'Anti-ice prevents formation; De-ice removes accumulation',
                        'Boots are common on turboprops; Thermal is common on jets',
                        'Clear ice is the most dangerous form'
                    ],
                    quiz: {
                        questions: [
                            { id: 'q1', question: 'Which ice is most dangerous?', options: ['Rime', 'Frost', 'Clear', 'Slush'], correctAnswer: 2, explanation: 'Clear ice is heavy, hard to see, and alters the wing shape significantly.' },
                            { id: 'q2', question: 'How do "Boots" work?', options: ['Heat', 'Chemicals', 'Inflation/Expansion', 'Vibration'], correctAnswer: 2, explanation: 'They inflate with air to crack the brittle ice off the leading edge.' },
                            { id: 'q3', question: 'What is TKS?', options: ['Thermal Kinetic System', 'A chemical fluid system (Weeping Wing)', 'A brand of boot', 'A type of heater'], correctAnswer: 1, explanation: 'A system that releases anti-icing fluid through microscopic holes.' }
                        ]
                    }
                }
            ]
        }
    ]
};

export default section3Systems;
