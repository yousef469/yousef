// Section 0: Rocket Foundations - Math & Physics from Zero
// 5 Deep Lessons (~2000 words each, 10 min reading)

export const section0Foundations = {
    id: 'foundations',
    title: 'Unit 0: Rocket Foundations',
    description: 'The math and physics you need before anything else',
    icon: '🧮',
    color: 'from-blue-500 to-cyan-500',
    units: [
        {
            id: 'math-physics',
            title: 'Math & Physics for Rockets',
            description: 'Build your foundation from absolute zero',
            lessons: [
                {
                    id: 'vectors-forces',
                    title: 'Vectors & Forces: The Language of Rockets',
                    duration: '10 min',
                    xp: 150,
                    description: 'Master vectors — every rocket force is a vector with magnitude AND direction',
                    aiTutor: true,
                    introduction: `Imagine you're standing on a launchpad watching a rocket ignite. Thousands of forces act on that vehicle simultaneously — thrust pushing up, gravity pulling down, wind pushing sideways, drag slowing it. How do engineers keep track of all these forces? The answer is vectors. A vector is a mathematical arrow that captures both HOW MUCH force and WHICH DIRECTION it acts. Without vectors, rocket science would be impossible. By the end of this lesson, you'll think in vectors like an aerospace engineer.`,
                    sections: [
                        {
                            title: '🎯 What Exactly Is a Vector?',
                            content: `**The Difference That Changes Everything**

In everyday life, you use numbers like "100 km/h" or "50 kg." These are **scalars** — they only tell you HOW MUCH. But in rocket engineering, that's never enough.

**Scalars (just a number):**
- Mass = 549,054 kg (Falcon 9 at liftoff)
- Temperature = 3,300°C (combustion chamber)
- Pressure = 97 atmospheres (Merlin engine)

**Vectors (number + direction):**
- Thrust = 7,607,000 N pointing UP from the nozzle
- Velocity = 7,800 m/s heading EAST toward orbit
- Drag = 4,500 N pointing DOWN (opposing motion)

**Why does direction matter?** Consider this: a rocket with 10 million newtons of thrust pointing sideways is useless for getting to orbit. The same 10 MN pointing straight up — that's what gets you to space. Direction is everything.

**How We Write Vectors:**
Engineers use arrows over letters: →F means "force vector." The arrow reminds us it has direction. The magnitude (size) is written as |F| or just F without the arrow.

**Vector Components — The Secret Weapon:**
Any vector can be split into horizontal (x) and vertical (y) parts using trigonometry:
- Fx = F × cos(θ)  — horizontal component
- Fy = F × sin(θ)  — vertical component

This is incredibly powerful because it lets you analyze complex angled forces as simple up/down and left/right numbers.

**Real Example:** A Saturn V launches at 2° from vertical (to begin its gravity turn). Its 34,020,000 N thrust splits into:
- Vertical: 34,020,000 × cos(2°) = 34,000,000 N fighting gravity
- Horizontal: 34,020,000 × sin(2°) = 1,188,000 N starting the turn East

Even that tiny 2° angle creates over a million newtons of sideways force!`
                        },
                        {
                            title: '🔧 Adding Vectors: Finding the Net Force',
                            content: `**When Multiple Forces Act Together**

A rocket at liftoff has AT LEAST four forces acting on it simultaneously. To know what the rocket actually does, you need the **net force** — the single vector that's equivalent to all forces combined.

**The Component Method (how real engineers do it):**
1. Break each force into x and y components
2. Add all x-components together → Fnet,x
3. Add all y-components together → Fnet,y
4. Combine: |Fnet| = √(Fnet,x² + Fnet,y²)

**Falcon 9 Liftoff Example:**
Let's calculate the net force on a Falcon 9 at the moment of liftoff:

| Force | Magnitude | Direction | Fy (vertical) | Fx (horizontal) |
|-------|-----------|-----------|---------------|-----------------|
| Thrust | 7,607 kN | Up | +7,607 kN | 0 |
| Weight | 5,495 kN | Down | −5,495 kN | 0 |
| Drag | ~50 kN | Down | −50 kN | 0 |
| Wind | ~5 kN | East | 0 | +5 kN |

**Net force:**
- Fnet,y = 7,607 − 5,495 − 50 = **2,062 kN upward**
- Fnet,x = 5 kN eastward
- |Fnet| = √(2,062² + 5²) ≈ **2,062 kN** (the tiny wind barely matters!)

**The Thrust-to-Weight Ratio (TWR):**
This is the most critical number at liftoff:
- TWR = Thrust / Weight = 7,607 / 5,495 = **1.38**
- TWR > 1.0 means the rocket accelerates upward
- TWR < 1.0 means it stays on the pad (or falls!)
- Most rockets launch with TWR between 1.2 and 1.5

**Fun Fact:** The Space Shuttle's TWR at liftoff was only 1.5, but it reached 3.0 just before booster separation because the fuel mass decreased while thrust stayed constant!`
                        },
                        {
                            title: '📐 Vector Direction: Angles and Coordinates',
                            content: `**Knowing WHERE Forces Point**

In 2D, a vector's direction is given by the angle θ from the positive x-axis (East). You can find this from components:

**θ = arctan(Fy / Fx)**

But be careful — arctan only gives angles in the right half of the coordinate plane. You need to check which quadrant your vector points to:
- Quadrant I (up-right): θ is correct
- Quadrant II (up-left): θ = 180° − |arctan result|
- Quadrant III (down-left): θ = 180° + |arctan result|
- Quadrant IV (down-right): θ = 360° − |arctan result|

**3D Vectors — The Full Picture:**
Real rockets work in three dimensions, so vectors have three components: (x, y, z)

For a rocket heading to orbit:
- x: East/West (toward orbital plane)
- y: North/South (orbital inclination)
- z: Up/Down (altitude)

**Magnitude in 3D:** |F| = √(Fx² + Fy² + Fz²)

**Unit Vectors:**
Engineers often use unit vectors — vectors with magnitude 1 that only show direction:
- î = unit vector pointing East
- ĵ = unit vector pointing North
- k̂ = unit vector pointing Up

Any vector can be written as: →F = Fx·î + Fy·ĵ + Fz·k̂

**Example:** A rocket's velocity entering orbit might be:
→v = 6,500·î + 0·ĵ + 1,200·k̂ m/s
Speed = √(6,500² + 0² + 1,200²) = 6,610 m/s
Direction = mostly East with a slight upward climb

**Why This Matters for Trajectories:**
When mission planners design a flight path, they specify the direction of thrust at every second of flight. These thrust vectors are what guides the rocket from the launchpad to orbit. One wrong angle and you miss orbit entirely!`
                        },
                        {
                            title: '🌍 The Dot Product and Cross Product',
                            content: `**Two Ways to Multiply Vectors**

There are two special ways to "multiply" vectors that engineers use constantly:

**1. The Dot Product (Scalar Product):**
→A · →B = |A| × |B| × cos(θ)

The result is a SCALAR (just a number). It tells you how much two vectors point in the same direction.

**Uses in Rocketry:**
- **Work done by force:** W = →F · →d (force dot displacement)
  - If thrust points in the direction of motion → maximum work
  - If thrust is perpendicular to motion → zero work
- **Checking perpendicularity:** If →A · →B = 0, the vectors are perpendicular

**Example:** A retrofire burn slows a spacecraft. The thrust vector points OPPOSITE to the velocity vector:
- →Thrust · →Velocity = |T| × |v| × cos(180°) = −|T||v|
- Negative work → the engine removes kinetic energy (slowing down)

**2. The Cross Product (Vector Product):**
→A × →B = |A| × |B| × sin(θ) × n̂

The result is a NEW VECTOR perpendicular to both inputs!

**Uses in Rocketry:**
- **Torque:** →τ = →r × →F (a force applied at a distance creates rotation)
  - This is how thrust vectoring works: angling the nozzle creates torque to steer the rocket
- **Angular momentum:** →L = →r × →p
  - Critical for satellite attitude control

**Example — Thrust Vectoring:**
If a Falcon 9's engine gimbal deflects the thrust 5° from center, the offset creates a torque:
- Force = 845,000 N per engine
- Lever arm = 2.5 m from center
- Torque = 845,000 × 2.5 × sin(5°) = 184,000 N·m
- That's enough to rotate the entire 549-ton rocket!

**Memory Trick:** Dot product → "how aligned are they?" Cross product → "how perpendicular are they?"`
                        },
                        {
                            title: '🚀 Vectors in Real Rocket Missions',
                            content: `**Putting It All Together**

Let's walk through how vectors are used in an actual SpaceX Falcon 9 mission:

**T-0: Liftoff**
Engineers compute the net force vector every millisecond:
→Fnet = →Thrust + →Weight + →Drag + →Wind
If |Fnet| points up with TWR > 1.0 → the rocket rises

**T+80s: Max-Q (Maximum Dynamic Pressure)**
The drag vector is at its peak because the rocket is going fast but still in thick air:
- Dynamic pressure q = ½ρv² (ρ = air density, v = speed)
- At Max-Q: q ≈ 35,000 Pa
- Drag force = q × A × Cd ≈ 35,000 × 10.5 × 0.3 = 110,250 N
- The flight computer throttles engines to reduce acceleration and structural loads

**T+160s: Stage Separation**
The first stage separates. Now the second stage has:
- Much less mass → higher TWR
- Much less drag (thinner air)
- Velocity vector tilting more horizontal (gravity turn)

**T+510s: MECO (Main Engine Cutoff)**
The velocity vector must be almost perfectly horizontal:
→v = vorbital·î + 0·k̂
vorbital = √(GM/r) ≈ 7,800 m/s

If there's ANY vertical component left, the orbit will be elliptical rather than circular.

**Key Insight: The Gravity Turn**
One of the most elegant uses of vectors in rocketry is the **gravity turn**. Instead of flying straight up and then turning hard, the rocket tilts slightly early. Gravity naturally curves the trajectory from vertical to horizontal, saving enormous amounts of fuel. The thrust vector gradually rotates from pointing "up" to pointing "sideways" — and it's all vector math!

**Summary Table:**
| Phase | Key Vector | What It Does |
|-------|-----------|--------------|
| Liftoff | Thrust >> Weight | Accelerate upward |
| Gravity Turn | Thrust tilts East | Begin horizontal acceleration |
| Max-Q | Drag peaks | Throttle down to reduce stress |
| MECO | Velocity = orbital | Achieve desired orbit |

Every single one of these decisions is made by computing vectors in real time. That's why vectors are the absolute first thing you need to master in rocket engineering!`
                        },
                        {
                            title: '🧪 Practice Problems',
                            content: `**Test Your Understanding**

**Problem 1: Net Force Calculation**
A rocket has these forces at liftoff:
- Thrust: 12,000 kN straight up
- Weight: 9,000 kN straight down
- Drag: 200 kN straight down
What is the net force? What is the TWR?
*Answer: Fnet = 12,000 - 9,000 - 200 = 2,800 kN upward. TWR = 12,000/9,000 = 1.33*

**Problem 2: Angled Thrust**
A rocket pitches 15° from vertical. Thrust = 5,000 kN.
What are the vertical and horizontal thrust components?
*Answer: Vertical = 5,000 × cos(15°) = 4,830 kN. Horizontal = 5,000 × sin(15°) = 1,294 kN*

**Problem 3: Finding Speed from Components**
A spacecraft has velocity components: vx = 6,000 m/s, vy = 2,000 m/s, vz = 500 m/s.
What is its total speed?
*Answer: |v| = √(6000² + 2000² + 500²) = √(36M + 4M + 0.25M) = √40.25M ≈ 6,344 m/s*

**Problem 4: Work Done**
A thruster fires 500 N at 30° to the direction of motion. The craft moves 1,000 m.
How much work is done?
*Answer: W = F·d·cos(θ) = 500 × 1000 × cos(30°) = 433,000 J ≈ 433 kJ*

**Bonus Challenge:** A satellite is in orbit at 400 km altitude. It fires a burn of 100 m/s in the velocity direction (prograde). How does this change its orbit? (Hint: Think about what adding to the velocity vector does to orbital mechanics.)
*Answer: A prograde burn raises the opposite side of the orbit, making it elliptical with a higher apogee.*`
                        }
                    ],
                    keyTakeaways: [
                        'Vectors have both magnitude AND direction — scalars only have magnitude',
                        'Any vector can be split into x and y (and z) components using trig',
                        'Net force = vector sum of all forces; it determines acceleration',
                        'TWR > 1.0 is required for liftoff; most rockets launch at 1.2-1.5',
                        'Dot product measures alignment; cross product creates torque'
                    ],
                    vocabulary: [
                        { term: 'Vector', definition: 'A quantity with both magnitude and direction' },
                        { term: 'Scalar', definition: 'A quantity with only magnitude (no direction)' },
                        { term: 'Component', definition: 'The projection of a vector along an axis (x, y, or z)' },
                        { term: 'TWR', definition: 'Thrust-to-Weight Ratio — must exceed 1.0 for liftoff' },
                        { term: 'Unit Vector', definition: 'A vector with magnitude 1, carrying only directional information' }
                    ],
                    quiz: {
                        questions: [
                            { id: 'q1', question: 'A vector has:', options: ['Only magnitude', 'Only direction', 'Magnitude and direction', 'Neither'], correctAnswer: 2, explanation: 'Vectors always carry both how much (magnitude) and which way (direction).' },
                            { id: 'q2', question: 'A rocket with thrust 8,000 kN and weight 6,000 kN has a TWR of:', options: ['0.75', '1.00', '1.33', '2.00'], correctAnswer: 2, explanation: 'TWR = Thrust/Weight = 8000/6000 = 1.33. Since >1.0, the rocket can lift off.' },
                            { id: 'q3', question: 'Thrust at 20° from vertical. The vertical component is:', options: ['Thrust × sin(20°)', 'Thrust × cos(20°)', 'Thrust × tan(20°)', 'Thrust / cos(20°)'], correctAnswer: 1, explanation: 'Vertical component = F × cos(θ) where θ is measured from vertical.' },
                            { id: 'q4', question: 'If →A · →B = 0, the vectors are:', options: ['Parallel', 'Anti-parallel', 'Perpendicular', 'Equal'], correctAnswer: 2, explanation: 'Dot product = |A||B|cos(θ); equals zero when θ = 90° (perpendicular).' },
                            { id: 'q5', question: 'The 3D magnitude of v = (3, 4, 0) m/s is:', options: ['7 m/s', '5 m/s', '12 m/s', '25 m/s'], correctAnswer: 1, explanation: '|v| = √(3² + 4²) = √(9+16) = √25 = 5 m/s.' }
                        ]
                    }
                },

                {
                    id: 'newtons-laws',
                    title: "Newton's Laws: Why Rockets Move",
                    duration: '10 min',
                    xp: 175,
                    description: 'The three laws that govern ALL rocket motion',
                    aiTutor: true,
                    introduction: `In 1687, Isaac Newton published three laws that explain every motion in the universe. These aren't abstract physics rules; they're the operating manual for every rocket ever built. Newton's Third Law literally IS the reason rockets work.`,
                    sections: [
                        { title: "🎯 Newton's First Law: Inertia", content: `**An Object in Motion Stays in Motion**\n\nNewton's First Law: An object remains at rest or in uniform motion unless acted upon by a net external force.\n\n**What This Means for Rockets:**\n- A rocket on the pad stays there until thrust exceeds weight\n- In orbit, a spacecraft keeps moving at 7,800 m/s WITHOUT engines — no drag in space!\n- Voyager 1 has been coasting since 1977 at 17 km/s — Newton's 1st Law for 49+ years!\n\n**Inertia = Resistance to Change:**\nThe more massive an object, the harder it is to accelerate:\n- Saturn V needed 34 MN of thrust for its 2,800-ton mass\n- A small satellite thruster of 1 N is enough for a 500 kg spacecraft\n\n**The Microgravity Misconception:**\nAstronauts on ISS appear weightless, but gravity at 400 km is still 89% of surface! They're in "free fall" — falling toward Earth but moving sideways fast enough to miss it.` },
                        { title: "🔧 Newton's Second Law: F = ma", content: `**The Most Important Equation in Rocketry**\n\n→F = m × →a    or    →a = →F / m\n\nThis tells you how fast a rocket accelerates:\n- More thrust → more acceleration\n- More mass → less acceleration\n- This is why rockets burn fuel to get lighter!\n\n**Falcon 9 Numbers:**\nAt liftoff: a = (7,607 - 5,495) kN / 549,054 kg = 3.85 m/s² (0.39g)\nAt MECO: a = (7,607 - 1,500) kN / 150,000 kg = 40.7 m/s² (4.2g)\n\nSame thrust but 4× less mass = 10× more acceleration!\n\n**g-Force Connection:**\n- 1g = Earth normal (9.81 m/s²)\n- 3g = fighter jet turn\n- 6g = max for untrained humans\n- Launch: 3-4g max\n\n**Weight vs Mass:**\n- Mass doesn't change in space; weight does\n- Moon: same mass, g = 1.62 m/s² → 1/6 weight\n- Critical for lunar lander design!` },
                        { title: "🚀 Newton's Third Law: Action-Reaction", content: `**The REASON Rockets Work**\n\nFor every action, there is an equal and opposite reaction.\n\n- Action: Hot gas shoots out the nozzle at 3,000+ m/s\n- Reaction: Rocket pushed in opposite direction\n- No air needed — works in vacuum of space!\n\n**Rockets push against their own exhaust, NOT the ground or air.**\n\n**Momentum Conservation:**\nm_rocket × v_rocket = m_exhaust × v_exhaust\n\n**Why Exhaust Velocity Matters:**\nHigh exhaust velocity = more efficient propulsion\n\n**Specific Impulse (Isp):**\nIsp = Exhaust velocity / g = ve / 9.81\n- Solid rockets: Isp ≈ 250s\n- Kerosene/LOX (Merlin): Isp ≈ 311s\n- Hydrogen/LOX (RS-25): Isp ≈ 452s\n- Ion engines: Isp ≈ 3,000s (tiny thrust though)\n\n**In everyday space:**\n- Astronaut pushes wall → floats backward\n- Satellite fires thruster East → moves West` },
                        { title: '🌍 All Three Laws in a Real Mission', content: `**Falcon 9 to ISS — Step by Step**\n\n**1st Law — Pre-Launch:** Rocket sits motionless. No net force = no acceleration.\n\n**2nd Law — Liftoff:** Engines ignite 7,607 kN. Weight 5,495 kN. Fnet = 2,112 kN up. a = 3.85 m/s².\n\n**2nd + 3rd Law — Ascent:** As fuel burns, mass drops. Same thrust, less mass = increasing acceleration. The 3rd law drives the 2nd: exhaust goes down, rocket goes up.\n\n**1st Law — Coast:** After engine cutoff, no thrust, no drag in space → constant velocity. The craft coasts to orbital insertion.\n\n**2nd Law — Orbital Insertion:** Brief burn fine-tunes velocity to exactly 7,660 m/s.\n\n**The Tsiolkovsky Rocket Equation** (unites all 3 laws):\nΔv = Isp × g × ln(m_initial / m_final)\n\nFor Falcon 9 first stage:\n- Initial: 549,054 kg, Final: ~100,000 kg\n- Mass ratio: 5.49\n- Δv = 311 × 9.81 × ln(5.49) = 5,200 m/s\n\nThis equation IS the fundamental limit of chemical rocketry. It says you need mass ratios of 3-10 to achieve orbital velocities, which is why rockets are 85-90% fuel.` },
                        { title: '🧪 Practice Problems', content: `**Test Your Understanding**\n\n**P1:** A 2,000 kg spacecraft fires a 500 N thruster. Acceleration?\n*Answer: a = F/m = 500/2000 = 0.25 m/s²*\n\n**P2:** A rocket engine has Isp = 350s. Exhaust velocity?\n*Answer: ve = Isp × g = 350 × 9.81 = 3,434 m/s*\n\n**P3:** A 100,000 kg rocket needs 3g acceleration. Required thrust (including gravity)?\n*Answer: Need a_net = 29.43 m/s². F_thrust = m(a + g) = 100,000 × (29.43 + 9.81) = 3,924 kN*\n\n**P4:** If rocket mass halves during a burn but thrust stays constant, how does acceleration change?\n*Answer: a = F/m. If m → m/2, then a doubles!*\n\n**Mind-Blowing Facts:**\n- Space Shuttle Main Engines: 12 million horsepower EACH\n- One Raptor engine = 37 Boeing 747 engines in thrust\n- Newton wrote his laws at age 24\n- Saturn V: 15 tons of exhaust per second at 2,500 m/s` }
                    ],
                    keyTakeaways: [
                        "1st Law: Objects maintain velocity unless a force acts",
                        "2nd Law: F=ma — acceleration depends on force AND mass",
                        "3rd Law: Rockets eject mass backward to go forward",
                        "Specific Impulse measures engine efficiency in seconds",
                        "As fuel burns, rockets get lighter → faster acceleration"
                    ],
                    vocabulary: [
                        { term: 'Inertia', definition: 'Resistance to changes in motion; proportional to mass' },
                        { term: 'Specific Impulse', definition: 'Engine efficiency = exhaust velocity / g, in seconds' },
                        { term: 'Mass Ratio', definition: 'M_initial / M_final — determines max delta-v' },
                        { term: 'g-force', definition: 'Acceleration in multiples of Earth gravity (9.81 m/s²)' },
                        { term: 'Tsiolkovsky Equation', definition: 'Δv = Isp×g×ln(MR) — the fundamental rocket equation' }
                    ],
                    quiz: {
                        questions: [
                            { id: 'q1', question: "Newton's 3rd Law says rockets work by:", options: ['Pushing against air', 'Pushing against ground', 'Ejecting mass backward', 'Magnetic fields'], correctAnswer: 2, explanation: 'Exhaust goes backward → equal reaction pushes rocket forward.' },
                            { id: 'q2', question: 'A 50,000 kg rocket with 200,000 N thrust has acceleration:', options: ['0.4 m/s²', '4 m/s²', '40 m/s²', '400 m/s²'], correctAnswer: 1, explanation: 'a = F/m = 200,000/50,000 = 4 m/s² (before subtracting gravity).' },
                            { id: 'q3', question: 'Higher Specific Impulse means:', options: ['More thrust', 'Less thrust', 'More fuel efficient', 'Heavier engine'], correctAnswer: 2, explanation: 'Higher Isp = higher exhaust velocity = more delta-v per kg of fuel.' },
                            { id: 'q4', question: 'In orbit with engines off, a spacecraft:', options: ['Stops', 'Slows down', 'Keeps constant velocity', 'Falls straight down'], correctAnswer: 2, explanation: "Newton's 1st Law: no net force = constant velocity." },
                            { id: 'q5', question: 'As fuel burns during ascent, acceleration:', options: ['Decreases', 'Stays same', 'Increases', 'Becomes zero'], correctAnswer: 2, explanation: 'Less mass + same thrust = higher acceleration (a = F/m).' }
                        ]
                    }
                },
                {
                    id: 'energy-work',
                    title: 'Energy & Work: The Currency of Spaceflight',
                    duration: '10 min', xp: 175,
                    description: 'Kinetic energy, potential energy, and why getting to orbit is all about energy budgets',
                    aiTutor: true,
                    introduction: `Getting to orbit isn't just about going fast — it's about having enough energy. Every kilogram of propellant stores chemical energy that converts into kinetic energy (speed) and potential energy (altitude). Understanding energy is understanding why rockets are 90% fuel.`,
                    sections: [
                        { title: '🎯 Kinetic and Potential Energy', content: `**The Two Types That Matter**\n\n**Kinetic Energy (KE)** = ½mv²\n**Potential Energy (PE)** = mgh (near surface) or -GMm/r (general)\n\n**Getting to LEO at 400 km requires:**\n1. KE: Speed 0→7,800 m/s = ½×1×7800² = **30.4 MJ/kg**\n2. PE: Altitude 0→400 km = 1×9.81×400,000 = **3.9 MJ/kg**\n\n**Surprise: Orbit is 87% about speed, only 13% about altitude!**\n\nYou could reach 100 km altitude (space!) with far less energy, but without orbital velocity you'd fall right back down.\n\n**Energy Efficiency:**\nChemical rockets convert only 40-60% of fuel energy into useful kinetic energy. The rest becomes heat, sound, and radiation.` },
                        { title: '🔧 Work-Energy Theorem & Oberth Effect', content: `**Work = Force × Distance × cos(θ)**\n\nW_net = ΔKE = ½mv²_final - ½mv²_initial\n\n**The Oberth Effect — Rocket Engineering's Best Trick:**\nA burn is MORE efficient at HIGH speed. Why?\n\nAt high speed, the rocket covers more distance per second. W = F×d, so same thrust × more distance = more work!\n\n**Example:**\n- 60s burn at 100 m/s: covers 6,000 m → Work = F×6,000\n- 60s burn at 5,000 m/s: covers 300,000 m → Work = F×300,000\n\nSame fuel, **50× more work!** This is why spacecraft burn at periapsis (closest point, fastest speed).\n\n**Power = Thrust × Velocity**\nA rocket's power output INCREASES as it speeds up, even with constant thrust!` },
                        { title: '🌍 Conservation of Energy in Orbits', content: `**E_total = KE + PE = constant (without thrust)**\n\nThis creates a trade-off in elliptical orbits:\n- Perigee (lowest): fastest speed, least PE → most KE\n- Apogee (highest): slowest speed, most PE → least KE\n\n**Escape Velocity:**\nWhen total energy = 0:\nv_escape = √(2GM/r) = √2 × v_orbital\n\nFrom Earth surface: v_escape = 11,186 m/s\nThat's only **41% more than orbital velocity!**\n\n"Once you're in orbit, you're halfway to anywhere" — Robert Heinlein\n\n**ISS Energy Budget (per kg):**\n- KE: 29.3 MJ, PE: -58.6 MJ, Total: -29.3 MJ\n- Negative total = bound to Earth (can't escape without adding energy)` },
                        { title: '🔥 Chemical Energy in Propellants', content: `**Where the Energy Comes From**\n\n| Propellant | Energy Density | Example |\n|-----------|---------------|--------|\n| Solid (APCP) | 5.5 MJ/kg | Shuttle SRBs |\n| Kerosene/LOX | 10.3 MJ/kg | Falcon 9 |\n| Hydrogen/LOX | 13.4 MJ/kg | SLS |\n| Methane/LOX | 11.1 MJ/kg | Starship |\n\n**The cruel math:** 34 MJ/kg needed for orbit, ~50% efficiency, so ~68 MJ from fuel. With kerosene at 10.3 MJ/kg, that's ~6.6 kg fuel per kg payload — just for energy.\n\nBut the rocket equation cascades: you need fuel to carry fuel to carry fuel... Actual ratios are 20-50:1.\n\n**Why SpaceX chose methane:** Good energy density, reasonable tank volume, AND can be made on Mars from CO2 + water (in-situ resource utilization)!` },
                        { title: '🧪 Reentry Energy & Practice', content: `**Reentry: Removing 34 MJ/kg of Energy**\n\nAll orbital energy must be dissipated to land. It goes into HEAT:\n- Reentry temperatures: 1,650°C (Shuttle tiles)\n- Dragon: ablative shield burns away, carrying heat with it\n- Starship: steel radiates heat (glows orange!)\n\n**Practice:**\n\n**P1:** KE of 5,000 kg spacecraft at 7,800 m/s?\n*Answer: ½×5000×7800² = 152 GJ*\n\n**P2:** PE gained lifting 1 kg to 400 km?\n*Answer: 1×9.81×400,000 = 3.92 MJ*\n\n**P3:** Mars escape velocity (g=3.72, R=3,390 km)?\n*Answer: √(2×3.72×3,390,000) = 5,022 m/s (less than half Earth's!)*\n\n**P4:** Hohmann LEO→GEO needs Δv=3,935 m/s. Mass ratio with Isp=311s?\n*Answer: ln(MR)=3935/(311×9.81)=1.29 → MR=3.63*` }
                    ],
                    keyTakeaways: ['Orbital velocity needs far more energy than altitude', 'Oberth Effect: burns more efficient at high speed', 'Energy conserved in orbits: speed trades with altitude', 'Escape velocity = √2 × orbital velocity', 'Reentry converts 34 MJ/kg into heat in minutes'],
                    vocabulary: [
                        { term: 'Kinetic Energy', definition: 'Energy of motion: KE = ½mv²' },
                        { term: 'Oberth Effect', definition: 'Burns more efficient at higher speed (more work per second)' },
                        { term: 'Escape Velocity', definition: 'Min speed to leave permanently: v = √(2GM/r)' },
                        { term: 'Ablative', definition: 'Heat shield that burns away, carrying heat with it' }
                    ],
                    quiz: {
                        questions: [
                            { id: 'q1', question: 'Getting to orbit is mostly about:', options: ['Going high', 'Going fast', 'Low gravity', 'Air pressure'], correctAnswer: 1, explanation: 'KE (87%) dominates over PE (13%).' },
                            { id: 'q2', question: 'Escape velocity from Earth is:', options: ['3,000 m/s', '7,800 m/s', '11,186 m/s', '300,000 m/s'], correctAnswer: 2, explanation: 'v_escape = √(2GM/R) ≈ 11.2 km/s.' },
                            { id: 'q3', question: 'Oberth Effect: burns more efficient at:', options: ['Low speed', 'High speed', 'Zero speed', 'Any speed'], correctAnswer: 1, explanation: 'More distance per second = more work.' },
                            { id: 'q4', question: 'In elliptical orbit, speed highest at:', options: ['Apogee', 'Perigee', 'Midpoint', 'Same everywhere'], correctAnswer: 1, explanation: 'Conservation of energy: lowest PE = highest KE.' },
                            { id: 'q5', question: 'Reentry heat comes from:', options: ['Engine exhaust', 'KE→heat conversion', 'Sunlight', 'Friction only'], correctAnswer: 1, explanation: 'Orbital KE converts to thermal energy in the atmosphere.' }
                        ]
                    }
                },
                {
                    id: 'orbital-mechanics',
                    title: "Orbital Mechanics: The Rules of Space",
                    duration: '10 min', xp: 200,
                    description: "Kepler's laws, orbital transfers, and how spacecraft navigate between worlds",
                    aiTutor: true,
                    introduction: `Kepler figured out how planets orbit in the 1600s. Today, his laws govern every satellite, space station, and probe. Orbital mechanics is deeply counterintuitive: to go faster in orbit, you slow down first!`,
                    sections: [
                        { title: "🎯 Kepler's Three Laws", content: `**The Foundation of Orbital Motion**\n\n**1st Law: Orbits are Ellipses** with the central body at one focus.\n- Semi-major axis (a): determines energy and period\n- Eccentricity (e): 0=circle, 1=escape\n- ISS: a=6,787 km, e≈0.0002\n\n**2nd Law: Equal Areas in Equal Times**\nClose to Earth → moves FAST. Far away → moves SLOW.\nThis is conservation of angular momentum: L = mvr = constant.\n\n**3rd Law: T² ∝ a³**\nT² = (4π²/GM) × a³\n- ISS (408 km): 92 min\n- GPS (20,200 km): 12 hours\n- GEO (35,786 km): 24 hours exactly\n- Moon (384,400 km): 27.3 days` },
                        { title: '🔧 Orbital Maneuvers', content: `**The Hohmann Transfer — Most Fuel-Efficient**\n\n1. Burn prograde at perigee → enter transfer ellipse\n2. Coast half an orbit to apogee\n3. Burn prograde again → circularize at target\n\n**LEO→GEO Transfer:**\n- Burn 1: Δv₁ = 2,457 m/s\n- Coast: 5.25 hours\n- Burn 2: Δv₂ = 1,478 m/s\n- Total: 3,935 m/s\n\n**Counterintuitive Part:**\n- Speed UP to go HIGHER orbit\n- But higher orbit = SLOWER speed\n- You burn to speed up... end up slower!\n\n**Plane Changes Are Expensive:**\nΔv = 2v×sin(Δi/2)\nISS (51.6°) to equatorial: 6,663 m/s — nearly another orbit's worth!` },
                        { title: '🌍 Interplanetary Travel', content: `**Getting to Other Planets**\n\n**Earth→Mars Hohmann:**\n- Departure Δv: 3,600 m/s from LEO\n- Transfer time: ~259 days (8.5 months)\n- Arrival Δv: 2,100 m/s to Mars orbit\n- Launch window: every 26 months\n\n**Gravity Assists — Free Δv!**\nSpacecraft steals momentum from planets:\n- Voyager 2: Jupiter, Saturn, Uranus assists → Neptune\n- Jupiter flyby can give 10+ km/s free!\n\n**How it works:** Enter planet's gravity well, accelerate toward it, exit on other side. Relative to the Sun, the planet's own velocity gets added. Like bouncing a ball off a moving train!\n\n**Apollo Free Return:** If engines failed near the Moon, the trajectory would sling the spacecraft back to Earth automatically. This saved Apollo 13!` },
                        { title: '🛰️ Special Orbits', content: `**Orbits Designed for Missions**\n\n**GEO (Geostationary):**\n- 35,786 km, 0° inclination, T=24h\n- Appears stationary from Earth\n- TV, weather, communications\n\n**SSO (Sun-Synchronous):**\n- 600-800 km, ~98° inclination\n- Same lighting every pass\n- Earth observation, reconnaissance\n\n**Molniya:**\n- 500×40,000 km elliptical, i=63.4°\n- 8 hours over northern hemisphere\n- Russia uses for high-latitude coverage\n\n**Lagrange Points:**\n- L1: between Earth-Sun (SOHO)\n- L2: behind Earth from Sun (JWST)\n- L4/L5: stable, 60° ahead/behind (Trojan asteroids)\n\nJWST orbits AROUND L2 in a halo orbit to stay out of Earth's shadow.` },
                        { title: '🧪 Orbital Practice', content: `**P1:** Period at 800 km altitude? (ISS at 408km = 92 min)\n*Answer: a₁=6,779 km, a₂=7,171 km. T₂=92×(7171/6779)^1.5=100 min*\n\n**P2:** Velocity at GEO? v = √(GM/r), r=42,164 km\n*Answer: v = √(3.986e14/42,164,000) = 3,075 m/s*\n\n**P3:** Δv to escape from LEO (7,800 m/s)?\n*Answer: v_esc = √2×7,800 = 11,031 m/s. Δv = 3,231 m/s*\n\n**P4:** Mars escape velocity (g=3.72, R=3,390 km)?\n*Answer: √(2×3.72×3,390,000) = 5,022 m/s — much easier than Earth!*\n\n**Fun fact:** GPS satellites orbit at exactly the right altitude so their orbital period = 12 hours, passing over the same ground spots twice per day.` }
                    ],
                    keyTakeaways: ["Kepler: ellipses, equal areas, T²∝a³", "Hohmann transfers are most fuel-efficient", "To go higher = speed up, but end up slower", "Gravity assists give free delta-v", "Special orbits serve specific missions"],
                    vocabulary: [
                        { term: 'Semi-major axis', definition: 'Half the orbit longest diameter; sets energy and period' },
                        { term: 'Hohmann Transfer', definition: 'Minimum-fuel two-burn orbit change maneuver' },
                        { term: 'Delta-v', definition: 'Velocity change needed for a maneuver' },
                        { term: 'Lagrange Point', definition: 'Gravitational balance point between two bodies' }
                    ],
                    quiz: {
                        questions: [
                            { id: 'q1', question: "Kepler's 1st Law: orbits are:", options: ['Circles', 'Ellipses', 'Parabolas', 'Lines'], correctAnswer: 1, explanation: 'All orbits are ellipses (circles are special case).' },
                            { id: 'q2', question: 'GEO at 35,786 km because:', options: ['No gravity', 'T=24 hours', 'No atmosphere', 'Lagrange point'], correctAnswer: 1, explanation: 'This altitude gives exactly 24-hour period.' },
                            { id: 'q3', question: 'To raise orbit altitude, burn:', options: ['Retrograde', 'Prograde', 'Normal', 'Radial'], correctAnswer: 1, explanation: 'Prograde adds energy, raising the opposite side.' },
                            { id: 'q4', question: 'Gravity assist works by:', options: ['Planet pushes craft', 'Stealing planet momentum', 'Solar wind', 'Magic'], correctAnswer: 1, explanation: 'Craft exchanges momentum with the planet relative to the Sun.' },
                            { id: 'q5', question: 'Earth-Mars transfer takes:', options: ['2 weeks', '2 months', '8.5 months', '2 years'], correctAnswer: 2, explanation: 'Hohmann transfer to Mars ≈ 259 days.' }
                        ]
                    }
                },
                {
                    id: 'fluid-dynamics',
                    title: 'Fluid Dynamics: How Gases Behave in Engines',
                    duration: '10 min', xp: 175,
                    description: 'Gas flow, pressure, nozzle physics, and why rocket nozzles are shaped the way they are',
                    aiTutor: true,
                    introduction: `Every rocket engine is an exercise in fluid dynamics. The combustion chamber generates hot, high-pressure gas, and the nozzle converts that pressure into high-speed exhaust. The nozzle shape determines everything about performance.`,
                    sections: [
                        { title: '🎯 Pressure, Density & Temperature', content: `**The Three Gas Properties**\n\n**Pressure (P):** Force per area (Pa or atm)\n- Sea level: 101,325 Pa = 1 atm\n- Merlin chamber: 9.7 MPa ≈ 97 atm\n- Raptor chamber: 30 MPa ≈ 300 atm\n\n**Density (ρ):** kg/m³\n- Sea level air: 1.225\n- Air at 20 km: 0.089 (14× thinner)\n- Liquid O2: 1,141\n\n**Temperature (T):** Kelvin\n- Combustion: 3,500 K\n- Cryo LOX: 90 K\n\n**Ideal Gas Law: PV = nRT**\nHigh T + constant V = very high P → drives exhaust out nozzle.\nHigher chamber pressure = more thrust potential.` },
                        { title: '🔧 Bernoulli & De Laval Nozzle', content: `**Bernoulli: P + ½ρv² = constant**\nFaster flow → lower pressure.\n\n**Continuity: ρ₁A₁v₁ = ρ₂A₂v₂**\nSmaller cross-section → faster flow (subsonic).\n\n**But supersonic flow is OPPOSITE:**\n- Subsonic: smaller area → faster (garden hose)\n- Supersonic: LARGER area → faster!\n\n**De Laval Nozzle (converging-diverging):**\n1. Convergent: subsonic gas accelerates\n2. Throat: flow hits exactly Mach 1\n3. Divergent: supersonic gas accelerates further to Mach 3-4\n\n**Expansion Ratio ε = A_exit/A_throat:**\n- Sea level (Merlin 1D): ε = 16\n- Vacuum (Merlin 1D Vac): ε = 165\n- RL-10B-2: ε = 285 (!)\n\nVacuum engines have giant bells because gas can expand much more with no atmosphere.` },
                        { title: '📐 Supersonic Flow & Shocks', content: `**Mach Number: M = v/a**\n- M<1: Subsonic\n- M=1: Sonic\n- M>5: Hypersonic\n\n**Speed of Sound: a = √(γRT/M_mol)**\n- Air at sea level: 343 m/s\n- Hot exhaust: ~1,000 m/s\n\n**Shock Waves:**\nAbrupt deceleration from supersonic → subsonic:\n- Pressure, temperature jump instantly\n- Energy is lost (entropy increases)\n\n**In Rockets:**\n- Over-expanded nozzle: shocks INSIDE nozzle (dangerous!)\n- Under-expanded: Mach diamonds visible in exhaust\n- Those beautiful diamond patterns = shock waves bouncing!\n\n**Flow Separation:**\nToo much expansion for ambient pressure → flow detaches from wall → asymmetric forces can destroy engine. This is why sea-level nozzles are smaller.` },
                        { title: '🌡️ Real Engine Gas Dynamics', content: `**Raptor Engine — State of the Art**\n\nSpaceX's Raptor operates at 300 atm chamber pressure — the highest ever for a production engine.\n\n**Why push pressure so high?**\n- Higher P_chamber / P_exit ratio → higher exhaust velocity\n- Higher velocity → higher Isp → more efficient\n- Raptor achieves Isp = 350s (sea level) vs 311s for Merlin\n\n**Full-flow staged combustion cycle:**\nBOTH fuel and oxidizer are pre-burned to drive turbopumps before entering the main chamber. Every drop of propellant goes through the main combustion.\n\n**Cooling:**\nCombustion at 3,500 K would melt ANY metal. Solution:\n- Regenerative cooling: fuel flows through channels in the nozzle wall\n- Film cooling: a thin layer of cooler gas protects the wall\n- Ablative: the wall slowly burns away (simpler but single-use)\n\nThe Raptor uses regenerative cooling with methane flowing through 1,000+ channels.` },
                        { title: '🧪 Fluid Dynamics Practice', content: `**P1:** Combustion at 100 atm exits to vacuum. Subsonic or supersonic?\n*Answer: Supersonic — the enormous pressure ratio drives flow well past Mach 1.*\n\n**P2:** Why is Merlin Vacuum nozzle bigger than Merlin 1D?\n*Answer: In vacuum P_exit≈0, so gas can expand more. ε=165 vs 16 gives higher Isp (348s vs 311s).*\n\n**P3:** Where does flow reach Mach 1 in a nozzle?\n*Answer: At the throat — always true for choked converging-diverging nozzles.*\n\n**P4:** What causes Mach diamonds?\n*Answer: Exhaust pressure ≠ ambient pressure → shock waves reflect in the plume.*\n\n**P5:** Speed of sound at 3,000K, γ=1.2, M=22 g/mol?\n*Answer: a = √(1.2×8.314×3000/0.022) ≈ 1,167 m/s*\n\n**Key insight:** Nozzle design — throat diameter, expansion ratio, contour — all comes from fluid dynamics. Master this, and you understand rocket engine hearts.` }
                    ],
                    keyTakeaways: ['Ideal gas law connects P, ρ, T', 'De Laval nozzle: converge→Mach 1→diverge→supersonic', 'Expansion ratio sets max exhaust velocity', 'Vacuum engines use much larger nozzles', 'Mach diamonds = visible shock waves'],
                    vocabulary: [
                        { term: 'De Laval Nozzle', definition: 'Converging-diverging nozzle for subsonic→supersonic acceleration' },
                        { term: 'Mach Number', definition: 'Velocity / speed of sound ratio' },
                        { term: 'Expansion Ratio', definition: 'A_exit/A_throat — sets maximum exhaust velocity' },
                        { term: 'Choked Flow', definition: 'Flow at throat = Mach 1; max mass flow rate' }
                    ],
                    quiz: {
                        questions: [
                            { id: 'q1', question: 'Supersonic acceleration happens in:', options: ['Convergent section', 'Throat', 'Divergent section', 'Chamber'], correctAnswer: 2, explanation: 'Supersonic gas accelerates when area INCREASES.' },
                            { id: 'q2', question: 'Throat flow velocity is:', options: ['Maximum', 'Mach 1', 'Zero', 'Mach 5'], correctAnswer: 1, explanation: 'Throat always reaches exactly Mach 1 in choked flow.' },
                            { id: 'q3', question: 'Vacuum engines have larger nozzles because:', options: ['More thrust needed', 'Gas expands more', 'Cooler exhaust', 'Structural'], correctAnswer: 1, explanation: 'No ambient pressure allows maximum expansion.' },
                            { id: 'q4', question: 'Mach diamonds indicate:', options: ['Perfect expansion', 'Pressure mismatch', 'Engine failure', 'Fuel leak'], correctAnswer: 1, explanation: 'Shock reflections from imperfect pressure matching.' },
                            { id: 'q5', question: 'Higher chamber pressure gives:', options: ['Less thrust', 'Higher exhaust velocity', 'Lower temperature', 'Slower flow'], correctAnswer: 1, explanation: 'Larger pressure ratio across nozzle = higher exit velocity.' }
                        ]
                    }
                }
            ]
        }
    ]
};

export default section0Foundations;
