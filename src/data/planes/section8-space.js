export const section8Space = {
    id: 'space-basics',
    title: 'Section 8: Introduction to Spaceflight',
    description: 'Leaving the atmosphere',
    icon: '🌌',
    color: 'from-violet-500 to-indigo-500',
    units: [
        {
            id: 'orbital-flight',
            title: 'The Final Frontier',
            description: 'Basics of getting to orbit',
            lessons: [
                {
                    id: 'karman-line',
                    title: 'Where Space Begins',
                    duration: '25 min',
                    xp: 150,
                    description: 'Defining the edge of the atmosphere',
                    introduction: 'There is no "Stop" sign in the sky. The atmosphere just gets thinner until you can’t fly anymore. You have to orbit.',
                    sections: [
                        {
                            title: 'The Kármán Line',
                            content: `**100 km (62 miles) up:**\n- Defined by Theodore von Kármán.\n- At this altitude, you would have to fly faster than orbital velocity just to generate enough lift from the thin air.\n- **US Definition:** 50 miles (80 km) - Astronaut wings awarded here.`
                        },
                        {
                            title: 'Getting to Orbit',
                            content: `**Speed is Key:**\n- Going *high* is easy. Staying there is hard.\n- **Orbital Velocity:** ~17,500 mph (28,000 km/h).\n- You are falling towards Earth, but missing it.`
                        }
                    ],
                    keyTakeaways: [
                        'Space officially begins at 100km (Kármán Line)',
                        'Orbit is about horizontal speed, not just altitude',
                        'You must travel 17,500 mph to stay in Low Earth Orbit',
                        'Aerodynamic lift stops working near the Kármán line'
                    ],
                    quiz: {
                        questions: [
                            { id: 'q1', question: 'What is the Kármán Line altitude?', options: ['10 km', '50 km', '100 km', '1000 km'], correctAnswer: 2, explanation: '100 km is the internationally recognized boundary of space.' },
                            { id: 'q2', question: 'Why do satellites stay in orbit?', options: ['No gravity', 'They are tied down', 'They fall sideways fast enough to miss the Earth', 'Magnetic fields'], correctAnswer: 2, explanation: 'Orbit is a continuous freefall where the curvature of the fall matches the curvature of the Earth.' },
                            { id: 'q3', question: 'To reach orbit, you need:', options: ['High altitude', 'High speed', 'Both', 'Neither'], correctAnswer: 2, explanation: 'You need altitude to avoid drag and speed to counteract gravity.' }
                        ]
                    }
                },
                {
                    id: 'rocket-propulsion',
                    title: 'Rocket Propulsion Basics',
                    duration: '30 min',
                    xp: 175,
                    description: 'Newton’s Third Law in a vacuum',
                    introduction: 'How do you move without air to push against? You bring your own mass to throw out the back.',
                    sections: [
                        {
                            title: 'Action and Reaction',
                            content: `**Newton's 3rd Law:**\n- For every action, there is an equal and opposite reaction.\n- **Thrust:** Mass Flow Rate x Exhaust Velocity.\n- Throw mass out the back fast -> Go forward fast.`
                        },
                        {
                            title: 'The Rocket Equation',
                            content: `**Tsiolkovsky Equation:**\n- Delta V (Change in speed) depends on:\n1. **Exhaust Velocity (Ve):** How efficient the engine is.\n2. **Mass Ratio:** Full weight vs Empty weight.\n- To go faster, you need exponentially more fuel.`
                        }
                    ],
                    keyTakeaways: [
                        'Rockets work by throwing mass backward to go forward',
                        'Thrust works perfectly in a vacuum',
                        'The Rocket Equation dictates the exponential cost of speed',
                        'Isp (Specific Impulse) measures rocket efficiency'
                    ],
                    quiz: {
                        questions: [
                            { id: 'q1', question: 'Do rockets need air to push against?', options: ['Yes', 'No', 'Only at launch', 'Only for landing'], correctAnswer: 1, explanation: 'Rockets work *better* in a vacuum because there is no air pressure resisting the exhaust.' },
                            { id: 'q2', question: 'What is Specific Impulse (Isp)?', options: ['Thrust', 'Efficiency (MPG for rockets)', 'Weight', 'Speed'], correctAnswer: 1, explanation: 'Isp measures how much momentum you get for a unit of fuel mass.' },
                            { id: 'q3', question: 'To double your Delta V, you need:', options: ['Double the fuel', 'Triple the fuel', 'Exponentially more fuel', 'Less fuel'], correctAnswer: 2, explanation: 'The tyranny of the rocket equation: mass grows exponentially with required change in velocity.' }
                        ]
                    }
                },
                {
                    id: 'orbital-mechanics',
                    title: 'Orbital Mechanics 101',
                    duration: '35 min',
                    xp: 200,
                    description: 'Kepler’s Laws and Transfers',
                    introduction: 'In space, you don’t just point and shoot. You have to dance with gravity.',
                    sections: [
                        {
                            title: 'Orbits are Ellipses',
                            content: `**Kepler’s 1st Law:**\nEvery orbit is an ellipse with the Earth at one focus.\n- **Periapsis:** Lowest point (Fastest).\n- **Apoapsis:** Highest point (Slowest).`
                        },
                        {
                            title: 'Changing Orbits',
                            content: `**Hohmann Transfer:**\nThe most efficient way to move between two circular orbits.\n1. Burn at Periapsis to raise Apoapsis.\n2. Burn at Apoapsis to circularize.`
                        }
                    ],
                    keyTakeaways: [
                        'Orbits are elliptical, not perfectly circular',
                        'You fly faster when closer to the planet (Periapsis)',
                        'Hohmann Transfer is the standard maneuver for changing altitude',
                        'To catch up to someone ahead of you, you must slow down (drop lower)'
                    ],
                    quiz: {
                        questions: [
                            { id: 'q1', question: 'Where is a satellite moving fastest?', options: ['Apoapsis (Highest)', 'Periapsis (Lowest)', 'Constant speed', 'Launch'], correctAnswer: 1, explanation: 'Gravity accelerates the object as it falls closer to the planet.' },
                            { id: 'q2', question: 'What is a Hohmann Transfer?', options: ['A docking maneuver', 'Standard orbital transfer', 'Emergency landing', 'Refueling'], correctAnswer: 1, explanation: 'An elliptical transfer orbit tangent to both the starting and target orbits.' },
                            { id: 'q3', question: 'If you speed up in orbit, what happens?', options: ['You go higher', 'You go faster only', 'You fall', 'You stop'], correctAnswer: 0, explanation: 'Adding energy (speed) raises the altitude of the opposite side of the orbit.' }
                        ]
                    }
                },
                {
                    id: 'reentry',
                    title: 'Re-entry & Landing',
                    duration: '30 min',
                    xp: 175,
                    description: 'Surviving the heat',
                    introduction: 'Coming home is harder than leaving. You have to shed 17,500 mph of energy without burning up.',
                    sections: [
                        {
                            title: 'The Heat Barrier',
                            content: `**Compression Heating:**\nThe air can’t move out of the way fast enough. It gets crushed and turns into plasma (3000°F+).\n- **Blunt Body Theory:** A wide, flat shape creates a strong shockwave that keeps the hot plasma away from the skin (Apollo/SpaceX Dragon).`
                        },
                        {
                            title: 'Protection',
                            content: `**Heat Shields:**\n- **Ablative:** Burns away to carry heat (Apollo, Orion).\n- **Tiles:** Insulative ceramic tiles (Space Shuttle, Starship).\n- **Active Cooling:** Running fuel through the skin (uncommon).`
                        }
                    ],
                    keyTakeaways: [
                        'Re-entry turns kinetic energy into massive heat',
                        'Blunt body shapes protect the capsule by creating a detached shockwave',
                        'Ablative shields burn away; Ceramic tiles insulate',
                        'The atmosphere does the braking work'
                    ],
                    quiz: {
                        questions: [
                            { id: 'q1', question: 'What causes re-entry heat?', options: ['Friction', 'Compression of air', 'Engine exhaust', 'Sunlight'], correctAnswer: 1, explanation: 'Rapid compression of the air in front of the vehicle heats it to plasma temperatures.' },
                            { id: 'q2', question: 'Why are capsules blunt (flat bottom)?', options: ['To land upright', 'To create drag and a detached shockwave', 'More room inside', 'Cheaper'], correctAnswer: 1, explanation: 'A blunt shape pushes the shockwave away from the surface, insulating the vehicle.' },
                            { id: 'q3', question: 'Ablative heat shields work by:', options: ['Reflecting heat', 'Burning/melting away', 'Freezing', 'Spinning'], correctAnswer: 1, explanation: 'The material absorbs heat as it vaporizes and carries it away.' }
                        ]
                    }
                },
                {
                    id: 'human-spaceflight',
                    title: 'Humans in Space',
                    duration: '25 min',
                    xp: 150,
                    description: 'Life support and G-forces',
                    introduction: 'The human body is not designed for space. We have to bring an Earth-like environment with us.',
                    sections: [
                        {
                            title: 'The Environment',
                            content: `**Life Support (ECLSS):**\n- **Oxygen:** Electrolysis splits water into O2.\n- **CO2:** Scribbers (LiOH) or CDRA remove carbon dioxide.\n- **Pressure:** 14.7 psi (Sea level) matches Earth.\n- **Water:** Recycled from urine and sweat (93% efficient).`
                        },
                        {
                            title: 'G-Forces',
                            content: `**Launch & Re-entry:**\n- Astronauts experience 3-4Gs normally.\n- **Ballistic Re-entry:** Can hit 8-9Gs if the capsule isn't flying significantly.\n- **Zero-G:** Causes muscle atrophy and fluid shift (puffy face, bird legs).`
                        }
                    ],
                    keyTakeaways: [
                        'ECLSS provides air, water, and pressure',
                        'Water is strictly recycled on the ISS',
                        'Zero-G causes long-term health effects (bone loss)',
                        'High G-forces occur during launch and re-entry'
                    ],
                    quiz: {
                        questions: [
                            { id: 'q1', question: 'Where does oxygen come from on the ISS?', options: ['Tanks only', 'Plants', 'Electrolysis of water', 'Space'], correctAnswer: 2, explanation: 'Electricity splits water (H2O) into Breathable Oxygen and Hydrogen.' },
                            { id: 'q2', question: 'What is the "Puffy face" effect?', options: ['Allergic reaction', 'Fluid shift in Zero-G', 'Too much food', 'Helmet too tight'], correctAnswer: 1, explanation: 'Without gravity pulling blood to the legs, it pools in the head/chest.' },
                            { id: 'q3', question: 'Typical launch G-force is:', options: ['1 G', '3-4 Gs', '10 Gs', '0 G'], correctAnswer: 1, explanation: 'Most rockets limit acceleration to 3-4 Gs for crew comfort.' }
                        ]
                    }
                }
            ]
        }
    ]
};

export default section8Space;
