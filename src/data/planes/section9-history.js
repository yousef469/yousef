export const section9History = {
    id: 'history-regulations',
    title: 'Section 9: History & Regulations',
    description: 'From Kitty Hawk to the FAA',
    icon: '📜',
    color: 'from-amber-500 to-orange-500',
    units: [
        {
            id: 'aviation-evolution',
            title: 'The Story of Flight',
            description: 'How we conquered the skies',
            lessons: [
                {
                    id: 'early-aviation',
                    title: 'The Wright Brothers',
                    duration: '30 min',
                    xp: 150,
                    description: '1903 and the invention of control',
                    introduction: 'Many people built gliders. The Wright Brothers built a pilot. They solved the problem of control.',
                    sections: [
                        {
                            title: 'The Problem of Control',
                            content: `**Wing Warping:**\n- Wilbur watched birds twist their wingtips.\n- They invented 3-axis control (Pitch, Roll, Yaw).\n- **The Flyer:** Unstable and hard to fly, but controllable.`
                        },
                        {
                            title: 'World War I',
                            content: `**Rapid Innovation:**\n- 1914: Planes were fragile scouts.\n- 1918: Dedicated fighters (Fokker Dr.I, Sopwith Camel).\n- **Interruptor Gear:** Allowed machine guns to fire *through* the propeller arc.`
                        }
                    ],
                    keyTakeaways: [
                        'The Wright Brothers invented 3-axis control',
                        'Wing Warping was the precursor to ailerons',
                        'WWI transformed airplanes from toys to weapons',
                        'Control was the key missing link before 1903'
                    ],
                    quiz: {
                        questions: [
                            { id: 'q1', question: 'What was the Wright Brothers\' key invention?', options: ['The engine', 'The wheel', 'Three-axis aerodynamic control', 'The propeller'], correctAnswer: 2, explanation: 'Others had engines and wings; the Wrights figured out how to steer.' },
                            { id: 'q2', question: 'How did early planes turn?', options: ['Rudder only', 'Wing Warping', 'Leaning', 'They didn\'t'], correctAnswer: 1, explanation: 'They twisted the wings to create differential lift (roll).' },
                            { id: 'q3', question: 'What innovation allowed guns to fire through props?', options: ['Steel blades', 'Synchronization Gear', 'Lasers', 'Aiming high'], correctAnswer: 1, explanation: 'The interruptor gear stopped the gun from firing when a blade was in front of the muzzle.' }
                        ]
                    }
                },
                {
                    id: 'golden-age',
                    title: 'The Golden Age & WWII',
                    duration: '30 min',
                    xp: 175,
                    description: ' Barnstormers to Bombers',
                    introduction: 'Between the wars, aviation became a romance and a business. Then WWII turned it into an industry.',
                    sections: [
                        {
                            title: 'The Golden Age (1919-1939)',
                            content: `**records & Races:**\n- Charles Lindbergh (1927): NY to Paris solo.\n- Amelia Earhart: Breaking barriers for women.\n- **The DC-3:** The first airliner that could make a profit carrying only passengers (no mail).`
                        },
                        {
                            title: 'World War II',
                            content: `**Mass Production:**\n- **The Jet Engine:** Invented by Whittle (UK) and Von Ohain (Germany).\n- **Pressurization:** Allowed B-29s to fly above the weather.\n- **Radar:** Changed navigation and combat forever.`
                        }
                    ],
                    keyTakeaways: [
                        'The DC-3 revolutionized commercial air travel',
                        'Lindbergh proved ocean crossing was possible solo',
                        'WWII brought Radar, Pressurization, and Jets',
                        'Aviation moved from wood/fabric to aluminum monocoque'
                    ],
                    quiz: {
                        questions: [
                            { id: 'q1', question: 'Which aircraft was the first profitable airliner?', options: ['Wright Flyer', 'Douglas DC-3', 'Boeing 747', 'Concorde'], correctAnswer: 1, explanation: 'The DC-3 was reliable, fast, and carried enough passengers to make money.' },
                            { id: 'q2', question: 'Who invented the Jet Engine?', options: ['Wright Brothers', 'Whittle and Von Ohain', 'Boeing', 'NASA'], correctAnswer: 1, explanation: 'Frank Whittle (UK) and Hans von Ohain (Germany) independently invented it.' },
                            { id: 'q3', question: 'What allowed high-altitude flight in WWII?', options: ['Oxygen masks only', 'Pressurized cabins (B-29)', 'Warmer clothes', 'Open windows'], correctAnswer: 1, explanation: 'The B-29 Superfortress was the first mass-produced pressurized bomber.' }
                        ]
                    }
                },
                {
                    id: 'jet-age',
                    title: 'The Jet Age',
                    duration: '25 min',
                    xp: 150,
                    description: 'Shrinking the world',
                    introduction: 'The De Havilland Comet was first, but the Boeing 707 changed the world. Suddenly, you could have breakfast in London and dinner in New York.',
                    sections: [
                        {
                            title: 'The Comet Disasters',
                            content: `**Metal Fatigue:**\n- The Comet had square windows.\n- Pressurization cycles caused cracks at the corners.\n- Planes broke apart in mid-air.\n- **Lesson:** Round windows distribute stress better.`
                        },
                        {
                            title: 'The Jumbo Jet',
                            content: `**Boeing 747 (1969):**\n- democratized travel. Lowered ticket prices massive capacity.\n- **Supersonic Transport:** Concorde (Mach 2). Engineering marvel, economic failure.`
                        }
                    ],
                    keyTakeaways: [
                        'The Comet proved that square windows cause structural failure',
                        'The 707 and DC-8 launched the jet age',
                        'The 747 made flying affordable for the masses',
                        'Concorde proved supersonic travel was possible but expensive'
                    ],
                    quiz: {
                        questions: [
                            { id: 'q1', question: 'Why do planes have round windows?', options: ['Style', 'To prevent stress cracks (Metal Fatigue)', 'Cheaper glass', 'Better view'], correctAnswer: 1, explanation: 'Square corners concentrate stress, leading to cracks and explosive decompression.' },
                            { id: 'q2', question: 'What killed the Concorde?', options: ['It was slow', 'High cost and sonic booms', 'Rust', 'No pilots'], correctAnswer: 1, explanation: 'It was too loud (banned overland) and too thirsty (expensive tickets).' },
                            { id: 'q3', question: 'The 747 is known as the:', options: ['Queen of the Skies', 'King of Jets', 'Big Bird', 'Cloud Surfer'], correctAnswer: 0, explanation: 'Its iconic hump and size made it the Queen.' }
                        ]
                    }
                },
                {
                    id: 'regulations',
                    title: 'Aviation Law',
                    duration: '35 min',
                    xp: 175,
                    description: 'FAA, EASA, and ICAO',
                    introduction: 'Regulations are written in blood. Every rule exists because of a past accident.',
                    sections: [
                        {
                            title: 'The Big Three',
                            content: `**ICAO (UN):** Sets global standards (Passports, Runway markings).\n**FAA (USA):** Federal Aviation Administration.\n**EASA (Europe):** European Union Aviation Safety Agency.\n- These agencies certify planes and pilots.`
                        },
                        {
                            title: 'Categories',
                            content: `**Part 91:** General Aviation (Private flying).\n**Part 121:** Airlines (Scheduled, strict rules).\n**Part 135:** Charter/Air Taxi.`
                        }
                    ],
                    keyTakeaways: [
                        'ICAO sets international standards; FAA/EASA enforce them',
                        'Part 121 (Airlines) has the strictest safety rules',
                        'Regulations evolve after every major accident'
                    ],
                    quiz: {
                        questions: [
                            { id: 'q1', question: 'Who sets global aviation standards?', options: ['NASA', 'ICAO', 'Boeing', 'The President'], correctAnswer: 1, explanation: 'International Civil Aviation Organization (part of the UN).' },
                            { id: 'q2', question: 'Which regulations cover major airlines in the US?', options: ['Part 91', 'Part 121', 'Part 61', 'Part 107'], correctAnswer: 1, explanation: '14 CFR Part 121 covers scheduled air carriers.' },
                            { id: 'q3', question: '"Regulations are written in blood" means:', options: ['They are red', 'They are scary', 'They are reactive to accidents', 'They are optional'], correctAnswer: 2, explanation: 'Most safety rules were created to prevent a specific accident from happening again.' }
                        ]
                    }
                },
                {
                    id: 'safety-management',
                    title: 'Safety Management (SMS)',
                    duration: '30 min',
                    xp: 200,
                    description: 'The Swiss Cheese Model',
                    introduction: 'Accidents are rarely caused by one thing. They are a chain of events. SMS is how we break the chain.',
                    sections: [
                        {
                            title: 'The Swiss Cheese Model',
                            content: `**James Reason's Model:**\n- Every defense (Training, Technology, Rules) has holes (flaws).\n- An accident happens when the holes in all layers align.\n- **Goal:** Add more layers (slices) or shrink the holes.`
                        },
                        {
                            title: 'Just Culture',
                            content: `**Reporting Errors:**\n- If a pilot makes a mistake, they should report it without fear of punishment.\n- **Why?** So others can learn from it.\n- **Exceptions:** Negligence or intentional harm.`
                        }
                    ],
                    keyTakeaways: [
                        'The Swiss Cheese Model explains how accidents happen',
                        'Safety is about adding layers of defense',
                        'Just Culture encourages reporting mistakes to improve the system',
                        'Human Factors analysis prevents pilot error'
                    ],
                    quiz: {
                        questions: [
                            { id: 'q1', question: 'The Swiss Cheese Model illustrates:', options: ['Food safety', 'How defenses fail and accidents occur', 'Holes in the wing', 'Cost cutting'], correctAnswer: 1, explanation: 'It shows how multiple small failures must align to cause a catastrophe.' },
                            { id: 'q2', question: 'What is "Just Culture"?', options: ['Punishing everyone', 'No rules', 'Non-punitive reporting of errors (for learning)', 'Firing pilots'], correctAnswer: 2, explanation: 'It encourages honesty so the system can be fixed.' },
                            { id: 'q3', question: 'Most aviation accidents are caused by:', options: ['Engine failure', 'Human Error', 'Weather', 'Birds'], correctAnswer: 1, explanation: '70-80% of accidents are attributed to human error, which is why Human Factors training is key.' }
                        ]
                    }
                }
            ]
        }
    ]
};

export default section9History;
