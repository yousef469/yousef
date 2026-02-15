export const section4Avionics = {
    id: 'avionics',
    title: 'Section 4: Avionics & Flight Control',
    description: 'Instruments, navigation, and fly-by-wire',
    icon: '🎛️',
    color: 'from-emerald-500 to-teal-500',
    units: [
        {
            id: 'avionics-systems',
            title: 'The Digital Cockpit',
            description: 'From steam gauges to glass cockpits',
            lessons: [
                {
                    id: 'instruments',
                    title: 'Cockpit Instruments',
                    duration: '35 min',
                    xp: 175,
                    description: 'The Six Pack and the Glass Cockpit',
                    introduction: 'Pilots don’t fly by feel; they fly by numbers. The instrument panel is the interface between the human brain and the machine state.',
                    sections: [
                        {
                            title: 'The "Six Pack"',
                            content: `**The Standard T-Arrangement:**\n1. **Airspeed Indicator (ASI):** Top Left. Pitot vs Static pressure.\n2. **Attitude Indicator (AI):** Top Center. The artificial horizon (Gyro).\n3. **Altimeter:** Top Right. Barometric pressure (Static).\n4. **Turn Coordinator:** Bottom Left. Rate of turn.\n5. **Heading Indicator:** Bottom Center. Gyroscopic compass.\n6. **Vertical Speed (VSI):** Bottom Right. Rate of climb/descent.`
                        },
                        {
                            title: 'Glass Cockpit (EFIS)',
                            content: `**Electronic Flight Instrument System:**\n- **PFD (Primary Flight Display):** Combines the Six Pack into one screen. Attitude is central.\n- **ND (Navigation Display):** The moving map, radar, and route.\n- **EICAS/ECAM:** Engine and system monitoring.`
                        },
                        {
                            title: 'Pitot-Static System',
                            content: `**The Sensors:**\n- **Pitot Tube:** Measures Ram Air (Dynamic + Static Pressure).\n- **Static Port:** Measures Ambient Air (Static Pressure).\n\n**Failures:**\n- Blocked Pitot: Airspeed acts like an altimeter (Dangerous!).\n- Blocked Static: Altimeter freezes.`
                        }
                    ],
                    keyTakeaways: [
                        'The "Six Pack" is the foundation of instrument flying',
                        'Glass cockpits integrate data into PFD and ND screens',
                        'Pitot-Static systems drive the ASI, Altimeter, and VSI',
                        'Gyroscopes drive the Attitude and Heading indicators'
                    ],
                    quiz: {
                        questions: [
                            { id: 'q1', question: 'Which instrument relies on both Pitot and Static pressure?', options: ['Altimeter', 'Airspeed Indicator', 'Attitude Indicator', 'Vertical Speed Indicator'], correctAnswer: 1, explanation: 'ASI measures the difference between Ram (Pitot) and Static pressure.' },
                            { id: 'q2', question: 'What is the "T-Arrangement"?', options: ['Engine layout', 'Wing shape', 'Standard instrument layout', 'Landing gear'], correctAnswer: 2, explanation: 'The standard layout places the Attitude Indicator in the center, flanked by Airspeed and Altitude.' },
                            { id: 'q3', question: 'If the Pitot tube freezes, what fails?', options: ['The Engine', 'The Altimeter', 'The Airspeed Indicator', 'The Radio'], correctAnswer: 2, explanation: 'Without ram air pressure, the ASI cannot calculate speed.' }
                        ]
                    }
                },
                {
                    id: 'navigation',
                    title: 'Navigation Systems',
                    duration: '30 min',
                    xp: 150,
                    description: 'VOR, GPS, and ILS',
                    introduction: 'How do you find a runway in the clouds? Radio waves and satellites guide the way.',
                    sections: [
                        {
                            title: 'Radio Navigation',
                            content: `**VOR (VHF Omnidirectional Range):**\n- Ground stations emit 360 "radials".\n- Pilots track a radial to/from the station.\n- **DME (Distance Measuring Equipment):** Tells you how far you are (Slant range).\n\n**NDB (Non-Directional Beacon):**\n- Simplest form. An AM radio tower.\n- ADF needle points to the station.`
                        },
                        {
                            title: 'GPS & RNAV',
                            content: `**Satellite Navigation:**\n- **GPS:** Uses time signals from 4+ satellites to triangulate position.\n- **RNAV (Area Navigation):** Allows flying point-to-point without zig-zagging between ground VORs.\n- **RNP (Required Navigation Performance):** Need highly accurate GPS to fly tight approaches in mountains.`
                        },
                        {
                            title: 'Instrument Landing System (ILS)',
                            content: `**Precision Approach:**\n1. **Localizer:** Lateral guidance (Left/Right) to the runway centerline.\n2. **Glideslope:** Vertical guidance (Up/Down) usually 3° slope.\n3. **Marker Beacons:** Range checks (Outer, Middle, Inner).`
                        }
                    ],
                    keyTakeaways: [
                        'VORs allow flying along specific magnetic radials',
                        'GPS enables direct point-to-point navigation (RNAV)',
                        'ILS provides both lateral and vertical guidance for landing',
                        'RNP allows for curved approaches in difficult terrain'
                    ],
                    quiz: {
                        questions: [
                            { id: 'q1', question: 'What does the Glideslope provide?', options: ['Distance', 'Left/Right guidance', 'Vertical (Descent) guidance', 'Speed info'], correctAnswer: 2, explanation: 'The glideslope creates a vertical path (usually 3 degrees) to the touchdown zone.' },
                            { id: 'q2', question: 'What is the main advantage of RNAV?', options: ['Cheaper', 'Direct routing (Point-to-Point)', 'Needs no electricity', 'Uses lasers'], correctAnswer: 1, explanation: 'RNAV frees aircraft from flying directly over ground stations.' },
                            { id: 'q3', question: 'How many satellites are needed for a 3D GPS fix?', options: ['2', '3', '4', '10'], correctAnswer: 2, explanation: 'Four satellites are required to solve for X, Y, Z, and Time.' }
                        ]
                    }
                },
                {
                    id: 'communication',
                    title: 'Communication & Surveillance',
                    duration: '25 min',
                    xp: 150,
                    description: 'Radios, Transponders, and TCAS',
                    introduction: 'Aviation is a team sport. Pilots talk to ATC, and planes "talk" to each other to avoid collisions.',
                    sections: [
                        {
                            title: 'VHF Communication',
                            content: `**The Radio:**\n- **Frequency:** 118.00 - 136.975 MHz.\n- **AM (Amplitude Modulation):** Used because it doesn't suffer from the "capture effect" (you can hear a weak signal over a strong one).\n- **Squelch:** Silences the static when no one is talking.`
                        },
                        {
                            title: 'Transponders',
                            content: `**"Squawk":**\n- **Mode A:** Identity (4-digit code e.g., 7700 for emergency).\n- **Mode C:** Altitude (Pressure altitude).\n- **Mode S:** Data link (Callsign, Speed, Heading).\n- **ADS-B (Out):** Broadcasts exact GPS position to everyone once a second. The new standard.`
                        },
                        {
                            title: 'TCAS',
                            content: `**Traffic Collision Avoidance System:**\n- Planes interrogate each other's transponders.\n- **TA (Traffic Advisory):** "Traffic, Traffic". Visual warning.\n- **RA (Resolution Advisory):** "Climb, Climb". Integrating commands.\n- **Rule:** ALWAYS follow the TCAS RA, even if ATC says otherwise.`
                        }
                    ],
                    keyTakeaways: [
                        'VHF AM radios are the standard for voice comms',
                        'Transponders (Squawk) make the plane visible to radar',
                        'ADS-B broadcasts GPS position significantly improving surveillance',
                        'TCAS provides vertical commands (RA) to avoid mid-air collisions'
                    ],
                    quiz: {
                        questions: [
                            { id: 'q1', question: 'What should a pilot do if a TCAS RA conflicts with ATC instructions?', options: ['Follow ATC', 'Follow TCAS', 'Do nothing', 'Ask for clarification'], correctAnswer: 1, explanation: 'TCAS commands are the highest priority for collision avoidance.' },
                            { id: 'q2', question: 'What is Squawk 7700?', options: ['Hijack', 'Radio Failure', 'General Emergency', 'VFR Flight'], correctAnswer: 2, explanation: '7500 (Hijack), 7600 (Radio Loss), 7700 (Emergency).' },
                            { id: 'q3', question: 'What does ADS-B Out do?', options: ['Listens to music', 'Broadcasts GPS position to ground/other planes', 'Talks to satellites', 'Records data'], correctAnswer: 1, explanation: 'Automatic Dependent Surveillance - Broadcast sends position data out.' }
                        ]
                    }
                },
                {
                    id: 'autopilot',
                    title: 'Autopilot & FMS',
                    duration: '35 min',
                    xp: 175,
                    description: 'Automation management',
                    introduction: 'George, the autopilot, flies 90% of the trip. The pilot becomes a systems manager, programming the Flight Management System (FMS).',
                    sections: [
                        {
                            title: 'Autopilot Modes',
                            content: `**Basic Modes:**\n- **HDG (Heading):** Follows the bug.\n- **ALT (Altitude):** Holds current altitude.\n- **VS (Vertical Speed):** Climbs at set ft/min.\n\n**Advanced Modes:**\n- **LNAV (Lateral Nav):** Follows the FMS magenta line.\n- **VNAV (Vertical Nav):** Climbs/Descends to meet altitude constraints at waypoints.\n- **Autoland:** Can land the plane in zero visibility (Cat III).`
                        },
                        {
                            title: 'Flight Management System (FMS)',
                            content: `**The Brain:**\n- **Database:** Contains all airports, waypoints, and airways.\n- **Performance:** Calculates fuel burn, top of descent, and V-speeds.\n- **Input:** CDU (Control Display Unit) - the keypad.`
                        }
                    ],
                    keyTakeaways: [
                        'Autopilots reduce workload but require monitoring',
                        'LNAV/VNAV follow the programmed FMS path',
                        'The FMS calculates optimal performance and fuel planning',
                        'Automated landings are possible with Cat III ILS'
                    ],
                    quiz: {
                        questions: [
                            { id: 'q1', question: 'What mode follows the FMS route?', options: ['HDG', 'LNAV', 'ALT', 'VS'], correctAnswer: 1, explanation: 'Lateral Navigation (LNAV) tracks the flight plan.' },
                            { id: 'q2', question: 'What is the "Magenta Line"?', options: ['The runway', 'The route on the map display', 'The horizon', 'The glideslope'], correctAnswer: 1, explanation: 'The active course line on modern glass cockpits is typically magenta.' },
                            { id: 'q3', question: 'Who is responsible for the flight when Autopilot is on?', options: ['The computer', 'ATC', 'The Pilot', 'The Airline'], correctAnswer: 2, explanation: 'The pilot is always responsible for monitoring and managing the automation.' }
                        ]
                    }
                },
                {
                    id: 'fbw',
                    title: 'Digital Fly-By-Wire',
                    duration: '30 min',
                    xp: 200,
                    description: 'Flight envelope protection',
                    introduction: 'In modern jets, the stick is not connected to the wings. It sends signals to a computer, which decides how to move the surfaces.',
                    sections: [
                        {
                            title: 'Cables vs Computers',
                            content: `**Mechanical:**\n- Pilot inputs -> Cables/Pulleys -> Hydraulic Valve -> Actuator -> Surface.\n- Feedback is felt directly.\n\n**Fly-By-Wire (FBW):**\n- Pilot inputs -> Electrical Wire -> Flight Control Computer (FCC) -> Actuator.\n- **Advantages:** Weight saving, precision, and **Envelope Protection**.`
                        },
                        {
                            title: 'Flight Envelope Protection',
                            content: `**The "Hard" Limits (Airbus):**\n- **Pitch Limit:** Cannot pull up more than 30° or stall the plane (Alpha Floor).\n- **Bank Limit:** Cannot roll past 67°.\n- **Overspeed:** Automatically pitches up to slow down.\n\n**Boeing Philosophy:**\n- "Soft" limits. You can override the computer if you pull hard enough. The pilot has ultimate authority.`
                        },
                        {
                            title: 'Control Laws',
                            content: `**Normal Law:**\n- Full protection. The "video game" mode.\n\n**Alternate Law:**\n- Some sensors failed. Some protections lost.\n\n**Direct Law:**\n- Stick moves surface directly (proportional). No protections. Like a Cessna.`
                        }
                    ],
                    keyTakeaways: [
                        'FBW replaces mechanical linkages with computer signals',
                        'Envelope protection prevents stalling, overspeed, and over-banking',
                        'Airbus uses "Hard" limits; Boeing uses "Soft" limits',
                        'Degraded modes (Direct Law) occur during system failures'
                    ],
                    quiz: {
                        questions: [
                            { id: 'q1', question: 'What is the main safety benefit of FBW?', options: ['It uses less power', 'Envelope Protection', 'Cheaper to build', 'Looks cool'], correctAnswer: 1, explanation: 'Computers can prevent the pilot from making dangerous maneuvers (like stalling).' },
                            { id: 'q2', question: 'In "Normal Law", what happens if you pull the stick all the way back?', options: ['Plane loops', 'Plane stalls', 'Computer limits pitch to max safe angle', 'Stick breaks'], correctAnswer: 2, explanation: 'The computer ignores unsafe commands and maintains maximum safe alpha.' },
                            { id: 'q3', question: 'What is the difference between Airbus and Boeing FBW?', options: ['No difference', 'Airbus has Hard limits, Boeing has Soft limits', 'Boeing has no computers', 'Airbus is wireless'], correctAnswer: 1, explanation: 'Airbus prioritizes hard protection limits; Boeing prioritizes pilot authority.' }
                        ]
                    }
                }
            ]
        }
    ]
};

export default section4Avionics;
