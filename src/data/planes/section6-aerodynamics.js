export const section6Aerodynamics = {
    id: 'advanced-aero',
    title: 'Section 6: Advanced Aerodynamics',
    description: 'Transonic, Supersonic, and Rotary Wing flight',
    icon: '🚀',
    color: 'from-pink-500 to-rose-500',
    units: [
        {
            id: 'high-speed-flight',
            title: 'Beyond the Sound Barrier',
            description: 'Physics changes when air can’t get out of the way',
            lessons: [
                {
                    id: 'transonic-flight',
                    title: 'The Transonic Realm',
                    duration: '35 min',
                    xp: 200,
                    description: 'Mach numbers and Critical Mach',
                    introduction: 'Strange things happen near the speed of sound (Mach 1.0). Controls reverse, shaking begins, and drag skyrockets.',
                    sections: [
                        {
                            title: 'Mach Number',
                            content: `**Ratio of True Airspeed to Speed of Sound:**\n- **Subsonic:** < Mach 0.75\n- **Transonic:** Mach 0.75 - 1.20 (Some air over wing is supersonic, some is subsonic).\n- **Supersonic:** > Mach 1.20\n\n**Critical Mach (Mcrit):**\nThe speed where the airflow *over the wing* first reaches Mach 1.0, even if the plane is slower. Shockwaves form here.`
                        },
                        {
                            title: 'Wave Drag',
                            content: `**The Sound Barrier:**\nAs air hits Mach 1, it piles up into a **Shockwave**.\n- This wave converts energy into heat (huge drag).\n- **Solution:** Swept Wings. By sweeping the wing back, the air "thinks" it is moving slower across the chord.`
                        }
                    ],
                    keyTakeaways: [
                        'Shockwaves form when local airflow hits Mach 1.0',
                        'Swept wings delay the onset of shockwaves',
                        'Transonic flight is the most complex regime due to mixed flows',
                        'Mcrit is the limit for efficient subsonic flight'
                    ],
                    quiz: {
                        questions: [
                            { id: 'q1', question: 'What is Critical Mach (Mcrit)?', options: ['Mach 1.0', 'Speed where airflow first goes supersonic anywhere on the wing', 'Top speed of the plane', 'Stall speed'], correctAnswer: 1, explanation: 'The speed where the first shockwave forms on the wing.' },
                            { id: 'q2', question: 'Why do jets have swept wings?', options: ['Style', 'To delay shockwave formation', 'Structural strength', 'Better lift at low speed'], correctAnswer: 1, explanation: 'Sweep effectively reduces the chordwise velocity component of the air.' },
                            { id: 'q3', question: 'What happens in the Transonic range?', options: ['Smooth flight', 'Shockwaves and drag rise efficiently', 'Engine stops', 'Gravity decreases'], correctAnswer: 1, explanation: 'Mixed subsonic and supersonic flow creates shockwaves and "Wave Drag".' }
                        ]
                    }
                },
                {
                    id: 'supersonic-design',
                    title: 'Supersonic Design',
                    duration: '30 min',
                    xp: 175,
                    description: 'Area Rule and Delta Wings',
                    introduction: 'To fly faster than sound efficiently, you need to change the shape of the machine entirely.',
                    sections: [
                        {
                            title: 'The Area Rule',
                            content: `**The "Coke Bottle" Shape:**\nWhitcomb discovered that drag is related to the smooth distribution of cross-sectional area.\n- Where wings attach (adding area), the fuselage should narrow (subtracting area) to keep the total area change smooth.`
                        },
                        {
                            title: 'Airfoils',
                            content: `**Supersonic Wings:**\n- **Thin & Sharp:** Leading edges must be razor sharp to cut the air.\n- **Diamond Shape:** Bi-convex airfoils used on missiles/fighters.\n- **Delta Wings:** Giant triangles (Concorde, Mirage). Good for high speed but poor at low speed.`
                        }
                    ],
                    keyTakeaways: [
                        'The Area Rule dictates a "pinched" fuselage waist for lower drag',
                        'Supersonic airfoils are thin and sharp unlike round subsonic ones',
                        'Delta wings provide high lift at high angles of attack',
                        'Shock cones are used to slow intake air for the engine'
                    ],
                    quiz: {
                        questions: [
                            { id: 'q1', question: 'The "Area Rule" results in:', options: ['Larger wings', 'A "pinched" fuselage waist', 'More engines', 'Taller tail'], correctAnswer: 1, explanation: 'Smoothing the cross-sectional area distribution reduces transonic drag.' },
                            { id: 'q2', question: 'Why are supersonic wings thin?', options: ['Save weight', 'Minimize shockwave drag', 'Look cool', 'Fit in hangar'], correctAnswer: 1, explanation: 'Thick wings create massive shockwaves; thin wings slice through.' },
                            { id: 'q3', question: 'Which wing shape is common for supersonic jets?', options: ['Rectangular', 'Delta (Triangle)', 'Forward swept', 'Biplane'], correctAnswer: 1, explanation: 'Delta wings are structurally strong and efficient at Mach 2+.' }
                        ]
                    }
                },
                {
                    id: 'stability-advanced',
                    title: 'Advanced Stability',
                    duration: '35 min',
                    xp: 200,
                    description: 'Dutch Roll and Spiral Divergence',
                    introduction: 'Swept wings introduce strange new instability modes. Pilots (and Yaw Dampers) must fight them.',
                    sections: [
                        {
                            title: 'Dutch Roll',
                            content: `**The Waddle:**\nA combination of rolling and yawing.\n- Caused by strong static stability vs weak directional stability (swept wings).\n- **Solution:** Yaw Damper. A computer wiggles the rudder to stop it before the pilot feels it.`
                        },
                        {
                            title: 'Spiral Divergence',
                            content: `**The Death Spiral:**\nPlane banks, yaw drops nose, speed increases, bank tightens.\n- Opposite of Dutch Roll.\n- If a plane is too stable directionally, it may want to spiral down if left alone.`
                        },
                        {
                            title: 'Mach Tuck',
                            content: `**Nose Down Tendency:**\nAs the Center of Pressure moves aft in supersonic flight, the nose wants to drop.\n- **Mach Trimmer:** Automatically applies nose-up trim to compensate.`
                        }
                    ],
                    keyTakeaways: [
                        'Dutch Roll is a coupled roll-yaw oscillation',
                        'Yaw Dampers are mandatory on swept-wing jets',
                        'Mach Tuck causes the nose to drop as speed increases',
                        'Spiral Divergence requires pilot intervention to stop'
                    ],
                    quiz: {
                        questions: [
                            { id: 'q1', question: 'What prevents Dutch Roll?', options: ['Ailerons', 'Yaw Damper', 'Slowing down', 'Landing gear'], correctAnswer: 1, explanation: 'The Yaw Damper automatically inputs rudder to stop the oscillation.' },
                            { id: 'q2', question: 'Mach Tuck is caused by:', options: ['Center of Pressure moving aft', 'Engine failure', 'Pilot error', 'Gravity shift'], correctAnswer: 0, explanation: 'The lifting point moves backwards in supersonic flow, creating a nose-down moment.' },
                            { id: 'q3', question: 'Swept wings generally have:', options: ['Good low speed handling', 'Dutch Roll tendencies', 'No stability', 'Too much drag'], correctAnswer: 1, explanation: 'Sweep increases the tendency for roll-yaw coupling (Dutch Roll).' }
                        ]
                    }
                },
                {
                    id: 'hypersonics',
                    title: 'Hypersonic Flight',
                    duration: '25 min',
                    xp: 175,
                    description: 'Mach 5 and beyond',
                    introduction: 'When you go fast enough, the air doesn’t just get hot—it turns into plasma. Welcome to the frontier.',
                    sections: [
                        {
                            title: 'Defining Hypersonic',
                            content: `**Mach 5+ (3,800 mph+):**\n- **Thermal Barrier:** Skin friction melts aluminum. Titanium or Ceramics needed.\n- **Chemistry:** Air molecules break apart (dissociate).\n- **Waveriders:** Riding your own shockwave for lift.`
                        },
                        {
                            title: 'Scramjets',
                            content: `**Supersonic Combustion Ramjet:**\n- No moving parts (no turbine).\n- Air enters at supersonic speed and *burns* at supersonic speed.\n- **Difficulty:** "Like keeping a match lit in a hurricane."`
                        }
                    ],
                    keyTakeaways: [
                        'Hypersonic is generally defined as Mach 5 and above',
                        'Scramjets have no moving parts and burn fuel in supersonic airflow',
                        'Heat management is the biggest challenge',
                        'Air chemistry changes (ionization) at these speeds'
                    ],
                    quiz: {
                        questions: [
                            { id: 'q1', question: 'Hypersonic speed starts at:', options: ['Mach 1', 'Mach 3', 'Mach 5', 'Mach 10'], correctAnswer: 2, explanation: 'Mach 5 is the generally accepted threshold where thermodynamic heating dominates.' },
                            { id: 'q2', question: 'What engine powers hypersonic vehicles?', options: ['Turbojet', 'Scramjet', 'Propeller', 'Diesel'], correctAnswer: 1, explanation: 'Supersonic Combustion Ramjets (Scramjets) work at Mach 5+.' },
                            { id: 'q3', question: 'The biggest problem in hypersonic flight is:', options: ['Cold', 'Heat', 'Noise', 'Fuel'], correctAnswer: 1, explanation: 'Friction with the air creates temperatures that melt most metals.' }
                        ]
                    }
                },
                {
                    id: 'rotary-wing',
                    title: 'Rotary Wing Basics',
                    duration: '35 min',
                    xp: 200,
                    description: 'Helicopter aerodynamics',
                    introduction: 'Helicopters don’t fly; they beat the air into submission. But the physics of a spinning wing are fascinating.',
                    sections: [
                        {
                            title: 'Forces',
                            content: `**The Rotor Disc:**\n- Can tilt to create thrust in any direction (Vectoring).\n- **Collective:** Changes pitch of ALL blades at once (Up/Down).\n- **Cyclic:** Changes pitch of blades depending on where they are in the circle (Tilt/Direction).`
                        },
                        {
                            title: 'Dissymmetry of Lift',
                            content: `**The Retreating Blade:**\n- **Advancing Blade:** Moving *with* the helicopter (Fast airflow).\n- **Retreating Blade:** Moving *away* from direction of flight (Slow airflow).\n- **Stall:** At high speed, the retreating blade stalls. This limits a helicopter's top speed (~200 kts).`
                        },
                        {
                            title: 'Autorotation',
                            content: `**Engine Failure:**\n- Helicopter effectively becomes a glider (gyroplane).\n- Air flowing *up* through the rotor keeps it spinning.\n- Pilot uses this stored energy to flare and land softly.`
                        }
                    ],
                    keyTakeaways: [
                        'Helicopters use Cyclic to steer and Collective to climb',
                        'Dissymmetry of lift is caused by the forward speed of the aircraft',
                        'Retreating Blade Stall limits top speed',
                        'Autorotation allows safe landing after engine failure'
                    ],
                    quiz: {
                        questions: [
                            { id: 'q1', question: 'What control changes the pitch of all blades simultaneously?', options: ['Cyclic', 'Collective', 'Pedals', 'Throttle'], correctAnswer: 1, explanation: 'The Collective Pitch Control increases lift everywhere to climb.' },
                            { id: 'q2', question: 'Why can helicopters not fly Mach 1?', options: ['Not enough power', 'Retreating Blade Stall / Tip Mach issues', 'Too heavy', 'They can'], correctAnswer: 1, explanation: 'The retreating blade would have zero airspeed, and the advancing tip would be supersonic.' },
                            { id: 'q3', question: 'What is Autorotation?', options: ['Spinning out of control', 'Engine-off safe landing maneuver', 'Automatic pilot', 'Ground taxi'], correctAnswer: 1, explanation: 'Using airflow to spin the rotor during descent for a safe landing.' }
                        ]
                    }
                }
            ]
        }
    ]
};

export default section6Aerodynamics;
