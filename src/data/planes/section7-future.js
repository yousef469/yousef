export const section7Future = {
    id: 'future-tech',
    title: 'Section 7: The Future of Aviation',
    description: 'Electric, Hydrogen, and Autonomous flight',
    icon: '🔋',
    color: 'from-green-500 to-emerald-500',
    units: [
        {
            id: 'sustainable-flight',
            title: 'Green Aviation',
            description: 'Decarbonizing the skies',
            lessons: [
                {
                    id: 'electric-propulsion',
                    title: 'Electric Aircraft',
                    description: 'Batteries vs Fuel',
                    duration: '30 min',
                    xp: 175,
                    introduction: 'Electric motors are efficient, quiet, and meaningful. But can batteries ever match the energy density of kerosene?',
                    sections: [
                        {
                            title: 'The Density Problem',
                            content: `**Energy Density:**\n- **Jet Fuel:** ~12,000 Wh/kg.\n- **Li-Ion Battery:** ~250 Wh/kg.\n- **Result:** We need batteries 20x better to replace long-haul jets. Currently feasible only for short trainers (Pipistrel Velis Electro) and regional hops.`
                        },
                        {
                            title: 'Hybrid-Electric',
                            content: `**The Prius of the Sky:**\n- Use a gas turbine to generate electricity.\n- Use batteries for takeoff boost (high power).\n- Cruise on efficient turbine power.\n- **Distributed Propulsion:** Many small electric fans along the wing (blowing the wing) to increase lift.`
                        }
                    ],
                    keyTakeaways: [
                        'Batteries are heavy and have low energy density compared to fuel',
                        'Electric motors are highly efficient (90%+) and low maintenance',
                        'Hybrid systems are the likely bridge technology',
                        'Distributed Electric Propulsion allows new aerodynamic designs'
                    ],
                    quiz: {
                        questions: [
                            { id: 'q1', question: 'What is the main barrier to electric 747s?', options: ['Motors are weak', 'Battery weight/density', 'Too quiet', 'Solar panels too small'], correctAnswer: 1, explanation: 'Batteries store 1/50th the energy per kg of jet fuel.' },
                            { id: 'q2', question: 'What is Distributed Propulsion?', options: ['One big engine', 'Many small motors along the wing', 'Engines in the back', 'Propellers on the tail'], correctAnswer: 1, explanation: 'Using many small motors to energize the airflow over the entire wing.' },
                            { id: 'q3', question: 'Advantages of electric motors include:', options: ['High maintenance', 'Loud noise', 'Instant torque & high efficiency', 'Pollution'], correctAnswer: 2, explanation: 'Electric motors are simple, reliable, and efficient.' }
                        ]
                    }
                },
                {
                    id: 'hydrogen-flight',
                    title: 'Hydrogen Aviation',
                    duration: '35 min',
                    xp: 200,
                    description: 'Liquid Hydrogen and Fuel Cells',
                    introduction: 'Hydrogen has 3x the energy of jet fuel by weight, but it takes up 4x the volume. Is it the holy grail?',
                    sections: [
                        {
                            title: 'Two Ways to Burn It',
                            content: `**1. Hydrogen Combustion:**\n- Burn H2 in a modified jet engine.\n- Producing water vapor (contrails?)\n- **Zero CO2**, but produces NOx (Nitrogen Oxides) due to heat.\n\n**2. Hydrogen Fuel Cell:**\n- Chemical reaction (H2 + O2 -> Electricity + Water).\n- Powers electric motors.\n- **True Zero Emission** (No NOx).`
                        },
                        {
                            title: 'Storage Challenges',
                            content: `**Liquid Hydrogen (LH2):**\n- Must be kept at -253°C (Cryogenic).\n- Tanks must be widely insulated (heavy/bulky).\n- Can't store it in the wings (too thin). Needs a "fat" fuselage.`
                        }
                    ],
                    keyTakeaways: [
                        'Hydrogen is light but voluminous (needs big tanks)',
                        'Fuel cells create electricity without combustion',
                        'Combustion engines create NOx but no CO2',
                        'Cryogenic storage requires new aircraft designs'
                    ],
                    quiz: {
                        questions: [
                            { id: 'q1', question: 'What is the main byproduct of Hydrogen Fuel Cells?', options: ['CO2', 'Soot', 'Pure Water', 'NOx'], correctAnswer: 2, explanation: 'Hydrogen + Oxygen = H2O + Electricity.' },
                            { id: 'q2', question: 'Why is Hydrogen hard to store?', options: ['It is heavy', 'It needs -253°C cooling and large volume', 'It is a solid', 'It corrodes aluminum'], correctAnswer: 1, explanation: 'Liquid Hydrogen requires cryogenic tanks and takes up 4x the space of kerosene.' },
                            { id: 'q3', question: 'Does Hydrogen combustion produce CO2?', options: ['Yes', 'No', 'Only at high altitude', 'Depends on the engine'], correctAnswer: 1, explanation: 'No Carbon in the fuel means no Carbon Dioxide in the exhaust.' }
                        ]
                    }
                },
                {
                    id: 'evtol-uam',
                    title: 'Urban Air Mobility (eVTOL)',
                    duration: '25 min',
                    xp: 150,
                    description: 'Flying taxis and Vertiports',
                    introduction: 'Skip the traffic. eVTOLs (Electric Vertical Takeoff and Landing) aim to democratize flight for short city hops.',
                    sections: [
                        {
                            title: 'The Aircraft',
                            content: `**Design:**\n- **Tilt-Rotor:** Take off like helicopter, tilt props to fly like plane (Joby, Archer).\n- **Multicopter:** Big drones (Volocopter).\n- **Distributed Redundancy:** 6+ rotors. If one fails, you don't crash.`
                        },
                        {
                            title: 'Infrastructure',
                            content: `**Vertiports:**\n- Mini-airports on parking garages and skyscrapers.\n- **Noise:** Must be quieter than a truck to be accepted in cities.\n- **Charging:** Rapid high-power charging between flights.`
                        }
                    ],
                    keyTakeaways: [
                        'eVTOLs aim to solve urban congestion',
                        'Distributed rotors provide safety redundancy',
                        'Noise reduction is critical for city operations',
                        'Tilt-rotors offer speed and range advantages over multicopters'
                    ],
                    quiz: {
                        questions: [
                            { id: 'q1', question: 'What does eVTOL stand for?', options: ['Electric Vehicle To Orbit Landing', 'Electric Vertical Takeoff and Landing', 'Every Vehicle To One Lane', 'Energy Vertical Takeoff Lift'], correctAnswer: 1, explanation: 'Electric Vertical Takeoff and Landing.' },
                            { id: 'q2', question: 'Why use many small rotors?', options: ['Looks cool', 'Redundancy and safety', 'Cheaper', 'Faster'], correctAnswer: 1, explanation: 'If one fails, the others compensate. No single point of failure.' },
                            { id: 'q3', question: 'The main goal of UAM is:', options: ['Cross Atlantic', 'Space travel', 'Short urban hops (Air Taxi)', 'Cargo haulage'], correctAnswer: 2, explanation: 'Replacing cars for short intra-city trips.' }
                        ]
                    }
                },
                {
                    id: 'saf-fuel',
                    title: 'Sustainable Aviation Fuel (SAF)',
                    duration: '25 min',
                    xp: 150,
                    description: 'Biofuels and Synthetic Kerosene',
                    introduction: 'We have thousands of jet engines today. We can’t replace them all overnight. SAF is the drop-in solution.',
                    sections: [
                        {
                            title: 'What is SAF?',
                            content: `**Drop-In Fuel:**\n- Chemically identical to Jet A1.\n- Made from cooking oil, algae, municipal waste, or captured CO2.\n- **Lifecycle Emissions:** Reduces carbon footprint by 80% (plants absorbed CO2 while growing).`
                        },
                        {
                            title: 'Power-to-Liquid (PtL)',
                            content: `**E-Fuels:**\n- Use solar energy to strip Hydrogen from water.\n- Capture Carbon from the air.\n- Combine them to make synthetic kerosene.\n- **Expensive** but limitless.`
                        }
                    ],
                    keyTakeaways: [
                        'SAF can be used in existing engines and airports',
                        'It reduces lifecycle carbon emissions by up to 80%',
                        'Made from waste, biomass, or synthetic processes',
                        'Currently more expensive than fossil jet fuel'
                    ],
                    quiz: {
                        questions: [
                            { id: 'q1', question: 'Can SAF be used in a standard Boeing 737 today?', options: ['No, requires engine mods', 'Yes, it is a drop-in fuel', 'Only on ground', 'Only mixed 1%'], correctAnswer: 1, explanation: 'SAF is certified for use (usually 50% blend) in existing aircraft.' },
                            { id: 'q2', question: 'Why is SAF better for the climate?', options: ['It does not burn', 'It recycles Carbon already in the atmosphere', 'It is made of water', 'It cools the air'], correctAnswer: 1, explanation: 'The carbon released was recently absorbed by the plants/process, closing the loop.' },
                            { id: 'q3', question: 'What is "Power-to-Liquid"?', options: ['Melting ice', 'Turning electricity and CO2 into liquid fuel', 'Hydropower', 'Liquid batteries'], correctAnswer: 1, explanation: 'Using renewable energy to synthesize liquid hydrocarbons.' }
                        ]
                    }
                },
                {
                    id: 'autonomous-flight',
                    title: 'Autonomous Flight',
                    duration: '30 min',
                    xp: 175,
                    description: 'Single pilot and AI operations',
                    introduction: 'Cars are driving themselves. Will planes follow suit?',
                    sections: [
                        {
                            title: 'Reduced Crew Operations (RCO)',
                            content: `**Single Pilot Cruise:**\n- Two pilots for takeoff/landing.\n- One rests during cruise while AI monitors systems.\n- **Challenge:** Incapacitation. What if the single pilot has a heart attack?`
                        },
                        {
                            title: 'AI Pilots',
                            content: `**The Digital Co-Pilot:**\n- Systems like Garmin Autoland can already land a plane if the pilot passes out.\n- **Machine Learning:** Analyzing weather, traffic, and systems faster than a human.\n- **Trust:** Will passengers get on a plane with no pilot?`
                        }
                    ],
                    keyTakeaways: [
                        'Simpler cargo flights will likely be autonomous first',
                        'Garmin Autoland is a certified emergency autonomy system',
                        'Single Pilot Operations allow long flights with fewer crew',
                        'Public trust is the biggest barrier to pilotless airliners'
                    ],
                    quiz: {
                        questions: [
                            { id: 'q1', question: 'What is Garmin Autoland?', options: ['A GPS map', 'An emergency system that lands the plane if the pilot is incapacitated', 'A new autopilot mode', 'A toy'], correctAnswer: 1, explanation: 'It automatically communicates, navigates, and lands the aircraft in an emergency.' },
                            { id: 'q2', question: 'What is the main economic driver for RCO?', options: ['Fuel saving', 'Pilot shortage and salary costs', 'Weight saving', 'Faster flights'], correctAnswer: 1, explanation: 'Airlines want to reduce crew costs and address the global pilot shortage.' },
                            { id: 'q3', question: 'Which sector will likely see full autonomy first?', options: ['Passenger Airlines', 'Small Cargo/Drones', 'Supersonic jets', 'Space shuttles'], correctAnswer: 1, explanation: 'Cargo drones carry no risk to passengers and operate in lower risk airspace.' }
                        ]
                    }
                }
            ]
        }
    ]
};

export default section7Future;
