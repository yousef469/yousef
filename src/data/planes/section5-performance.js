export const section5Performance = {
    id: 'performance',
    title: 'Section 5: Performance & Planning',
    description: 'Weight and balance, flight planning, and simulation',
    icon: '📊',
    color: 'from-indigo-500 to-purple-500',
    units: [
        {
            id: 'flight-performance',
            title: 'Mission Planning',
            description: 'The science of safe flight operations',
            lessons: [
                {
                    id: 'weight-balance',
                    title: 'Weight & Balance',
                    duration: '30 min',
                    xp: 175,
                    description: 'Center of Gravity and loading limits',
                    introduction: 'A plane that is too heavy won’t fly. A plane that is out of balance becomes uncontrollable. Gravity is a harsh mistress.',
                    sections: [
                        {
                            title: 'The Center of Gravity (CG)',
                            content: `**The Seesaw Principle:**\n- **CG:** The point where the aircraft would balance if suspended.\n- **Limits:** Forward Limit (hard to rotate/flare) and Aft Limit (unstable, hard to recover from stall).\n- **Arm:** Distance from the Datum (reference point).\n- **Moment:** Weight x Arm.`
                        },
                        {
                            title: 'Weights',
                            content: `**Key Definitions:**\n- **OEW (Operating Empty Weight):** Plane + Crew + Oil (No fuel/pax).\n- **ZFW (Zero Fuel Weight):** OEW + Payload. (Structural limit of wing roots).\n- **MTOW (Max Takeoff Weight):** Structural or performance limit at start of flight.\n- **MLW (Max Landing Weight):** Structural limit for touchdown.`
                        },
                        {
                            title: 'Fuel Management',
                            content: `**Fuel Types:**\n- **Taxi Fuel:** Burned on the ground.\n- **Trip Fuel:** A to B.\n- **Contingency:** ~5% extra for winds/errors.\n- **Alternate:** Fuel to fly to backup airport.\n- **Final Reserve:** 30-45 mins (DO NOT BURN unless emergency).`
                        }
                    ],
                    keyTakeaways: [
                        'CG must remain within the envelope for controllability',
                        'Aft CG is more efficient (less drag) but less stable',
                        'ZFW prevents bending the wings too much with heavy payload',
                        'Final Reserve fuel is a legal minimum for landing'
                    ],
                    quiz: {
                        questions: [
                            { id: 'q1', question: 'What is the danger of an Aft CG?', options: ['Hard to land', 'Uses more fuel', 'Unstable and hard to recover from stall', 'Nose heavy'], correctAnswer: 2, explanation: 'Aft CG reduces longitudinal static stability.' },
                            { id: 'q2', question: 'What is Zero Fuel Weight (ZFW)?', options: ['Weight of the fuel', 'Empty plane', 'Total weight of loaded plane BEFORE adding fuel', 'Takeoff weight'], correctAnswer: 2, explanation: 'It is the weight of the aircraft plus all payload (passengers/cargo) but without fuel.' },
                            { id: 'q3', question: 'Which fuel is burned on the ground?', options: ['Trip fuel', 'Taxi fuel', 'Reserve fuel', 'Alternate fuel'], correctAnswer: 1, explanation: 'Taxi fuel is allocated for APU usage and taxiing to the runway.' }
                        ]
                    }
                },
                {
                    id: 'takeoff-landing',
                    title: 'Takeoff & Landing Data',
                    duration: '35 min',
                    xp: 175,
                    description: 'V-Speeds and runway analysis',
                    introduction: 'Can we stop if an engine fails? Performance calculations ensure we have enough runway to either Fly or Stop.',
                    sections: [
                        {
                            title: 'V-Speeds',
                            content: `**The Critical Numbers:**\n- **V1 (Decision Speed):** Engine failure before V1 -> STOP. After V1 -> GO.\n- **Vr (Rotation):** Pull back on the stick.\n- **V2 (Takeoff Safety Speed):** Speed to climb with one engine inoperative.\n- **Vref:** Target speed for landing approach (1.3 x Stall Speed).`
                        },
                        {
                            title: 'Runway Performance',
                            content: `**Balanced Field Length:**\nThe distance where Accelerate-Stop distance equals Accelerate-Go distance.\n\n**Variables:**\n- **Heat:** Hot air is less dense -> Longer run.\n- **Altitude:** High airport -> Longer run.\n- **Heavy:** More mass -> Longer run.\n- **Slope/Wind:** Uphill/Tailwind hurts performance.`
                        }
                    ],
                    keyTakeaways: [
                        'V1 is the point of no return',
                        'Hot, High, and Heavy conditions drastically increase runway requirements',
                        'Balanced Field Length ensures safety during engine failure',
                        'V2 ensures safe climb gradient with one engine out'
                    ],
                    quiz: {
                        questions: [
                            { id: 'q1', question: 'If an engine fails AFTER V1, what do you do?', options: ['Stop', 'Continue Takeoff', 'Turn', 'Eject'], correctAnswer: 1, explanation: 'After V1, you do not have enough runway left to stop safely. You must fly.' },
                            { id: 'q2', question: 'High Density Altitude means:', options: ['Good performance', 'Poor performance (Thin air)', 'Low airport', 'Cold weather'], correctAnswer: 1, explanation: 'High density altitude (Hot/High) means the air is thin, reducing lift and engine power.' },
                            { id: 'q3', question: 'Which factor increases takeoff distance?', options: ['Headwind', 'Cold temperature', 'Tailwind', 'Low weight'], correctAnswer: 2, explanation: 'A tailwind increases the groundspeed required to achieve lift-off airspeed.' }
                        ]
                    }
                },
                {
                    id: 'cruise-ops',
                    title: 'Cruise Operations',
                    duration: '25 min',
                    xp: 150,
                    description: 'Efficiency, range, and ETOPS',
                    introduction: 'Cruise is about efficiency. How far can we go, and how fast can we get there?',
                    sections: [
                        {
                            title: 'Range & Endurance',
                            content: `**Specific Range:** Nautical Miles per pound of fuel.\n- **Step Climbs:** As fuel burns, the plane gets lighter. Climbing to thinner air reduces drag and improves range.\n- **Coffin Corner:** At very high altitudes, the Stall speed and Max Mach speed converge. Little margin for error.`
                        },
                        {
                            title: 'ETOPS',
                            content: `**Extended-range Twin-engine Operations:**\n(Engine Turns Or Passengers Swim).\n- Rules for flying twins over oceans.\n- **Rating:** ETOPS-180 means you can fly 180 minutes from the nearest suitable airport on one engine.`
                        },
                        {
                            title: 'Cost Index (CI)',
                            content: `**Time is Money:**\n- A number entered in the FMS (0-999).\n- **Low CI:** slow, save fuel.\n- **High CI:** fast, burn fuel (make up schedule).\n- Airlines optimize this daily based on fuel price vs crew costs.`
                        }
                    ],
                    keyTakeaways: [
                        'Step climbs improve range as the aircraft lightens',
                        'ETOPS allows twin-engine jets to cross oceans safely',
                        'Cost Index balances fuel cost against time cost',
                        'Coffin corner is the high-altitude limit of performance'
                    ],
                    quiz: {
                        questions: [
                            { id: 'q1', question: 'What is ETOPS?', options: ['Engine Testing', 'Rules for twin-engine flights far from airports', 'A fuel type', 'A radar system'], correctAnswer: 1, explanation: 'Extended Operations allow twins to fly long overwater routes.' },
                            { id: 'q2', question: 'A Cost Index of 0 would result in:', options: ['Max speed', 'Max range/Min fuel', 'Emergency descent', 'Climb'], correctAnswer: 1, explanation: 'CI 0 commands the FMS to fly the most fuel-efficient profile regardless of time.' },
                            { id: 'q3', question: 'Why step climb?', options: ['To see better', 'To avoid traffic', 'To stay in efficient thin air as weight drops', 'To cool engines'], correctAnswer: 2, explanation: 'Higher is generally more efficient, but heavy planes can not climb high initially.' }
                        ]
                    }
                },
                {
                    id: 'flight-planning',
                    title: 'Flight Planning',
                    duration: '30 min',
                    xp: 150,
                    description: 'Charts, Routes, and Weather',
                    introduction: 'A good pilot is always ahead of the airplane. That starts on the ground with a solid plan.',
                    sections: [
                        {
                            title: 'The Route',
                            content: `**Structure of the Skies:**\n- **SID (Standard Instrument Departure):** Getting from the runway to the enroute structure.\n- **Airways:** Highways in the sky (Victor airways low, Jet routes high).\n- **STAR (Standard Terminal Arrival Route):** Getting from enroute to the airport approach.\n- **Approach Plate:** Maps the detailed final landing segment.`
                        },
                        {
                            title: 'Weather Briefing',
                            content: `**METAR & TAF:**\n- **METAR:** Current weather (hourly).\n- **TAF:** Forecast (for the next 24-30 hrs).\n\n**Hazards:**\n- **Thunderstorms:** Avoid by 20 miles. Violent turbulence/Hail.\n- **Turbulence:** CAT (Clear Air Turbulence) near jet streams.\n- **Icing:** Freezing Level charts.`
                        }
                    ],
                    keyTakeaways: [
                        'SIDs and STARs streamline traffic flow near airports',
                        'METAR gives current weather; TAF gives the forecast',
                        'Thunderstorms must be avoided by a wide margin',
                        'Charts provide all necessary navigation data'
                    ],
                    quiz: {
                        questions: [
                            { id: 'q1', question: 'What is a METAR?', options: ['Forecast', 'Current Weather Report', 'Radar image', 'Wind chart'], correctAnswer: 1, explanation: 'Meteorological Aerodrome Report (Current conditions).' },
                            { id: 'q2', question: 'What connects a SID to a STAR?', options: ['Runway', 'Airway / Enroute structure', 'Taxiway', 'Parking'], correctAnswer: 1, explanation: 'The enroute phase (Airways) connects the departure (SID) to the arrival (STAR).' },
                            { id: 'q3', question: 'How far should you stay from a thunderstorm?', options: ['1 mile', '5 miles', '20 miles', 'Fly through it'], correctAnswer: 2, explanation: 'FAA recommends at least 20 miles to avoid hail and severe turbulence.' }
                        ]
                    }
                },
                {
                    id: 'sim-project',
                    title: 'Project: Flight Simulation',
                    duration: '45 min',
                    xp: 250,
                    description: 'Apply your knowledge in a virtual flight',
                    introduction: 'It is time to take the Captain’s seat. You will plan and "fly" a short route using the concepts you have learned.',
                    sections: [
                        {
                            title: 'Mission Briefing',
                            content: `**Route:** London Heathrow (EGLL) to Paris CDG (LFPG).\n**Aircraft:** Airbus A320 or Boeing 737.\n**Cruising Altitude:** FL250 (Short hop).\n\n**The Plan:**\n1. check Weather (Is Paris foggy?).\n2. Fuel Load (Trip + Reserves).\n3. Program FMC (Dept: EGLL, Arr: LFPG).\n4. Calculate V-Speeds.`
                        },
                        {
                            title: 'Phase Check',
                            content: `**1. Departure:**\n- Fly the SID (Ex: DVR departure).\n- Respect altitude constraints.\n\n**2. Cruise:**\n- Monitor fuel.\n- Check top of descent point.\n\n**3. Arrival:**\n- Fly the STAR.\n- Capture the ILS for Rwy 27R.\n- Stabilized approach by 1000ft.`
                        }
                    ],
                    keyTakeaways: [
                        'Apply planning, performance, and systems knowledge',
                        'Manage the flight in real-time',
                        'Adhere to standard operating procedures',
                        'Complete a safe flight from Gate to Gate'
                    ],
                    quiz: {
                        questions: [
                            { id: 'q1', question: 'What is the first step of the mission?', options: ['Takeoff', 'Planning & Briefing', 'Starting engines', 'Pushback'], correctAnswer: 1, explanation: 'Always start with planning (Weather, Route, Fuel).' },
                            { id: 'q2', question: 'On a short flight like London to Paris, do we climb to FL390?', options: ['Yes', 'No, not efficient for short distance', 'Always', 'Climb as high as possible'], correctAnswer: 1, explanation: 'On short hops, you spend too much time climbing. FL230-FL270 is typical.' },
                            { id: 'q3', question: 'A stabilized approach mean:', options: ['Landing fast', 'Configured, on speed, on path by 1000ft', 'Engine idle', 'Autopilot off'], correctAnswer: 1, explanation: 'You must be fully configured and stable to land safely.' }
                        ]
                    }
                }
            ]
        }
    ]
};

export default section5Performance;
