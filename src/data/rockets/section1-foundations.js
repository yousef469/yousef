// Section 1: Rocket Foundations - Unit 0 Math & Physics + Rocket Basics
// 10 Lessons - MIT Quality, Career-Ready Content

export const section1Foundations = {
  id: 'foundations',
  title: 'Unit 0: Foundations',
  description: 'Essential math, physics, and rocket fundamentals',
  icon: '🧮',
  color: 'from-blue-500 to-cyan-500',
  units: [
    {
      id: 'math-physics',
      title: 'Math & Physics for Rockets',
      description: 'Core concepts you need before rocket engineering',
      lessons: [
        {
          id: 'vectors-forces',
          title: 'Vectors & Forces',
          duration: '25 min',
          xp: 150,
          description: 'Master vectors - the language of rocket forces',
          aiTutor: true,
          introduction: `Every force on a rocket is a vector - it has magnitude AND direction. Understanding vectors lets you calculate thrust, drag, lift, and gravity acting on your rocket.`,
          sections: [
            {
              title: 'What is a Vector?',
              content: `**Scalar vs Vector:**
- Scalar: Just a number (mass = 1000 kg)
- Vector: Number + Direction (velocity = 100 m/s NORTH)

**Rocket Vectors:**
- Thrust: Points out the nozzle (opposite exhaust)
- Weight: Always points toward Earth's center
- Drag: Opposes motion through air
- Lift: Perpendicular to velocity (from fins)

**Notation:**
→F = Force vector
|F| = Magnitude (size) of force`
            },
            {
              title: 'Vector Components',
              content: `**Breaking Vectors into X and Y:**
Any vector can be split into horizontal (x) and vertical (y) parts.

Fx = F × cos(θ)
Fy = F × sin(θ)

**Example: Rocket at 30° from vertical**
Thrust = 1,000,000 N at 30° from vertical
- Vertical component: 1,000,000 × cos(30°) = 866,000 N
- Horizontal component: 1,000,000 × sin(30°) = 500,000 N

**Why This Matters:**
Only the vertical thrust fights gravity!`
            },
            {
              title: 'Adding Vectors',
              content: `**Net Force = Sum of All Vectors**

For a rocket at liftoff:
→F_net = →Thrust + →Weight + →Drag

**Component Method:**
F_net,x = Thrust_x + Weight_x + Drag_x
F_net,y = Thrust_y + Weight_y + Drag_y

**Magnitude of Result:**
|F_net| = √(F_net,x² + F_net,y²)

**Example:**
- Thrust: 1,500,000 N up
- Weight: 1,000,000 N down
- Drag: 50,000 N down

F_net = 1,500,000 - 1,000,000 - 50,000 = 450,000 N up`
            }
          ],
          keyTakeaways: [
            'Vectors have magnitude AND direction',
            'Break vectors into x and y components using sin/cos',
            'Add vectors by adding their components',
            'Net force determines acceleration'
          ],
          quiz: {
            questions: [
              { id: 'q1', question: 'A vector has:', options: ['Only magnitude', 'Only direction', 'Magnitude and direction', 'Neither'], correctAnswer: 2, explanation: 'Vectors have both size (magnitude) and direction.' },
              { id: 'q2', question: 'Thrust at 45° from vertical. Vertical component is:', options: ['Thrust × sin(45°)', 'Thrust × cos(45°)', 'Thrust × tan(45°)', 'Thrust / 2'], correctAnswer: 1, explanation: 'Vertical = adjacent side = F × cos(θ)' },
              { id: 'q3', question: 'Thrust=2MN up, Weight=1.5MN down. Net force?', options: ['3.5 MN up', '0.5 MN up', '0.5 MN down', '2 MN up'], correctAnswer: 1, explanation: '2 - 1.5 = 0.5 MN upward' },
              { id: 'q4', question: 'Which is NOT a vector?', options: ['Velocity', 'Force', 'Mass', 'Acceleration'], correctAnswer: 2, explanation: 'Mass is a scalar - just a number, no direction.' },
              { id: 'q5', question: 'To find magnitude from components Fx and Fy:', options: ['Fx + Fy', 'Fx × Fy', '√(Fx² + Fy²)', 'Fx / Fy'], correctAnswer: 2, explanation: 'Pythagorean theorem: magnitude = √(x² + y²)' }
            ]
          }
        },
        {
          id: 'newtons-laws',
          title: "Newton's Laws of Motion",
          duration: '30 min',
          xp: 175,
          description: 'The three laws that govern ALL rocket motion',
          aiTutor: true,
          introduction: `Isaac Newton's three laws explain everything from why rockets need thrust to why they work in space. These 300-year-old laws are still used by NASA today.`,
          sections: [
            {
              title: "Newton's First Law - Inertia",
              content: `**"An object at rest stays at rest, an object in motion stays in motion, unless acted upon by a force."**

**For Rockets:**
- A rocket on the pad stays there until thrust exceeds weight
- In space, a rocket keeps moving forever without engines (no friction!)
- This is why spacecraft can coast to Mars with engines off

**Inertia = Resistance to change**
More mass = more inertia = harder to accelerate`
            },
            {
              title: "Newton's Second Law - F=ma",
              content: `**"Force equals mass times acceleration"**

F = m × a  →  a = F/m

**This is THE rocket equation for acceleration:**
- More thrust (F) = more acceleration
- More mass (m) = less acceleration

**Example: Falcon 9 at liftoff**
- Thrust: 7,600,000 N
- Mass: 549,000 kg
- Acceleration: a = 7,600,000 / 549,000 = 13.8 m/s²

But wait! Gravity pulls down at 9.8 m/s²
Net acceleration = 13.8 - 9.8 = 4.0 m/s² upward`
            },
            {
              title: "Newton's Third Law - Action/Reaction",
              content: `**"For every action, there is an equal and opposite reaction"**

**THIS IS WHY ROCKETS WORK!**
- Rocket pushes exhaust backward (action)
- Exhaust pushes rocket forward (reaction)

**Key Insight:** Rockets don't push against air or ground!
They push against their own exhaust. This is why they work in the vacuum of space.

**The forces are equal but on DIFFERENT objects:**
- Force on exhaust: backward
- Force on rocket: forward`
            }
          ],
          keyTakeaways: [
            '1st Law: Objects resist changes in motion (inertia)',
            '2nd Law: F = ma - force causes acceleration',
            '3rd Law: Action/reaction - rockets push exhaust, exhaust pushes rocket',
            'Rockets work in space because they push against exhaust, not air'
          ],
          quiz: {
            questions: [
              { id: 'q1', question: 'Why do rockets work in space?', options: ['Push against solar wind', 'Push against their exhaust', 'Magnetic fields', 'They dont'], correctAnswer: 1, explanation: "Newton's 3rd Law - rockets push exhaust backward, exhaust pushes rocket forward." },
              { id: 'q2', question: 'F=ma. If mass doubles and force stays same:', options: ['Acceleration doubles', 'Acceleration halves', 'Acceleration stays same', 'Acceleration quadruples'], correctAnswer: 1, explanation: 'a = F/m. Double m means half a.' },
              { id: 'q3', question: 'A spacecraft coasting in space with engines off will:', options: ['Slow down', 'Speed up', 'Keep constant velocity', 'Stop'], correctAnswer: 2, explanation: "Newton's 1st Law - no force means no change in motion." },
              { id: 'q4', question: 'Thrust=10MN, Mass=500,000kg. Acceleration?', options: ['5 m/s²', '10 m/s²', '20 m/s²', '50 m/s²'], correctAnswer: 2, explanation: 'a = F/m = 10,000,000/500,000 = 20 m/s²' },
              { id: 'q5', question: 'The reaction force to thrust acts on:', options: ['The rocket', 'The exhaust', 'The launchpad', 'The air'], correctAnswer: 1, explanation: 'Rocket pushes exhaust (action on exhaust), exhaust pushes rocket (reaction on rocket).' }
            ]
          }
        },
    
    {
          id: 'energy-work',
          title: 'Energy & Work',
          duration: '25 min',
          xp: 150,
          description: 'How rockets convert chemical energy to motion',
          aiTutor: true,
          introduction: `Rockets are energy conversion machines. They convert chemical energy (fuel) into kinetic energy (motion). Understanding energy helps you calculate how much fuel you need.`,
          sections: [
            {
              title: 'Types of Energy',
              content: `**Kinetic Energy (KE)** - Energy of motion
KE = ½mv²

**Potential Energy (PE)** - Stored energy
- Gravitational: PE = mgh (near Earth surface)
- Chemical: Energy stored in propellant bonds

**Example: ISS Kinetic Energy**
- Mass: 420,000 kg
- Velocity: 7,660 m/s
- KE = ½ × 420,000 × 7,660² = 12.3 trillion Joules!

That's equivalent to 3 kilotons of TNT.`
            },
            {
              title: 'Work and Energy Transfer',
              content: `**Work = Force × Distance**
W = F × d (when force is in direction of motion)

**Work-Energy Theorem:**
Work done = Change in kinetic energy
W = ΔKE = ½mv₂² - ½mv₁²

**Rocket Application:**
Thrust does work on the rocket, increasing its kinetic energy.

**Example:**
Thrust = 1,000,000 N over 1,000 m
Work = 1,000,000 × 1,000 = 1 billion Joules
This energy goes into the rocket's speed!`
            },
            {
              title: 'Energy in Rocket Propellants',
              content: `**Chemical Energy Density:**
| Propellant | Energy (MJ/kg) |
|------------|----------------|
| LH2/LOX | 13.4 |
| RP-1/LOX | 12.7 |
| Solid | 5-7 |

**The Sad Truth:**
Only ~1-2% of propellant energy becomes rocket kinetic energy!
The rest goes into:
- Exhaust kinetic energy (~40%)
- Heat (~58%)

**Why so inefficient?**
The exhaust carries away most of the energy. This is fundamental to how rockets work.`
            }
          ],
          keyTakeaways: [
            'KE = ½mv² - kinetic energy depends on velocity squared',
            'Work = Force × Distance transfers energy',
            'Rockets convert chemical energy to kinetic energy',
            'Only 1-2% of fuel energy becomes rocket motion'
          ],
          quiz: {
            questions: [
              { id: 'q1', question: 'If velocity doubles, kinetic energy:', options: ['Doubles', 'Triples', 'Quadruples', 'Stays same'], correctAnswer: 2, explanation: 'KE = ½mv². If v doubles, v² quadruples, so KE quadruples.' },
              { id: 'q2', question: 'Work equals:', options: ['Force × Time', 'Force × Distance', 'Mass × Velocity', 'Energy × Time'], correctAnswer: 1, explanation: 'W = F × d (force times distance in direction of force)' },
              { id: 'q3', question: 'What % of propellant energy becomes rocket KE?', options: ['50%', '25%', '1-2%', '90%'], correctAnswer: 2, explanation: 'Most energy goes into exhaust KE and heat. Only 1-2% moves the rocket.' },
              { id: 'q4', question: 'A 1000kg rocket at 100m/s has KE of:', options: ['100,000 J', '5,000,000 J', '10,000,000 J', '50,000 J'], correctAnswer: 1, explanation: 'KE = ½ × 1000 × 100² = ½ × 1000 × 10000 = 5,000,000 J' },
              { id: 'q5', question: 'Chemical energy in propellant is:', options: ['Kinetic energy', 'Potential energy', 'Thermal energy', 'Nuclear energy'], correctAnswer: 1, explanation: 'Chemical energy is stored (potential) energy in molecular bonds.' }
            ]
          }
        },
        {
          id: 'momentum-impulse',
          title: 'Momentum & Impulse',
          duration: '30 min',
          xp: 175,
          description: 'The physics behind the rocket equation',
          aiTutor: true,
          introduction: `Momentum is the key to understanding rockets. The rocket equation comes directly from conservation of momentum. Master this and you understand WHY rockets work the way they do.`,
          sections: [
            {
              title: 'What is Momentum?',
              content: `**Momentum = Mass × Velocity**
p = m × v

**Units:** kg⋅m/s

**Conservation of Momentum:**
In an isolated system, total momentum stays constant.

**Rocket Application:**
Before engine fires: Rocket + fuel at rest, p = 0
After: Rocket moves forward, exhaust moves backward
Total momentum still = 0!

m_rocket × v_rocket = m_exhaust × v_exhaust (opposite directions)`
            },
            {
              title: 'Impulse',
              content: `**Impulse = Change in Momentum**
J = Δp = F × Δt

**Impulse-Momentum Theorem:**
Force × Time = Change in momentum

**For Rockets:**
Thrust × Burn time = Change in rocket momentum

**Example:**
- Thrust: 1,000,000 N
- Burn time: 180 seconds
- Impulse: 180,000,000 N⋅s

This impulse changes the rocket's momentum by 180 million kg⋅m/s!`
            },
            {
              title: 'Specific Impulse (Isp)',
              content: `**Isp = Impulse per unit weight of propellant**
Isp = F / (ṁ × g₀) = vₑ / g₀

**Units:** Seconds (weird but useful!)

**What Isp Tells You:**
Higher Isp = More efficient engine
- Solid rockets: ~260 s
- RP-1/LOX: ~310 s
- LH2/LOX: ~450 s
- Ion engines: ~3000 s

**Physical Meaning:**
Isp is how many seconds 1 kg of propellant can produce 9.8 N of thrust.

**Example:**
Isp = 300 s means 1 kg of propellant produces 9.8 N for 300 seconds.`
            }
          ],
          keyTakeaways: [
            'Momentum p = mv is conserved in isolated systems',
            'Impulse J = F×t equals change in momentum',
            'Specific Impulse (Isp) measures engine efficiency',
            'Higher Isp = less propellant needed for same Δv'
          ],
          quiz: {
            questions: [
              { id: 'q1', question: 'Momentum equals:', options: ['Mass × Acceleration', 'Mass × Velocity', 'Force × Time', 'Energy / Time'], correctAnswer: 1, explanation: 'p = m × v (mass times velocity)' },
              { id: 'q2', question: 'If a rocket and exhaust start at rest, after firing:', options: ['Both move same direction', 'Total momentum increases', 'Total momentum stays zero', 'Only rocket has momentum'], correctAnswer: 2, explanation: 'Conservation of momentum - rocket forward momentum equals exhaust backward momentum.' },
              { id: 'q3', question: 'Impulse equals:', options: ['Force × Distance', 'Force × Time', 'Mass × Velocity', 'Energy × Time'], correctAnswer: 1, explanation: 'J = F × Δt (force times time)' },
              { id: 'q4', question: 'Higher Isp means:', options: ['More thrust', 'More efficient', 'Heavier engine', 'Faster burn'], correctAnswer: 1, explanation: 'Higher Isp = more impulse per kg of propellant = more efficient.' },
              { id: 'q5', question: 'LH2/LOX has Isp ~450s. RP-1/LOX has ~310s. Which needs less fuel for same Δv?', options: ['RP-1/LOX', 'LH2/LOX', 'Same amount', 'Depends on thrust'], correctAnswer: 1, explanation: 'Higher Isp (LH2/LOX) means less propellant needed.' }
            ]
          }
        },
        {
          id: 'rocket-equation',
          title: 'The Tsiolkovsky Rocket Equation',
          duration: '35 min',
          xp: 200,
          description: 'THE most important equation in spaceflight',
          aiTutor: true,
          introduction: `This single equation determines what missions are possible. It explains why rockets are 90% fuel, why we need staging, and why getting to orbit is so hard. Master this and you understand the fundamental challenge of space travel.`,
          sections: [
            {
              title: 'Deriving the Equation',
              content: `**Starting Point:** Conservation of momentum

As rocket burns propellant:
- Rocket loses mass dm
- Exhaust leaves at velocity vₑ

Momentum balance:
m × dv = vₑ × dm

**Integrate both sides:**
∫dv = vₑ × ∫(dm/m)

**Result - The Rocket Equation:**
Δv = vₑ × ln(m₀/mf)

Or equivalently:
**Δv = Isp × g₀ × ln(m₀/mf)**

Where:
- Δv = velocity change (m/s)
- vₑ = exhaust velocity (m/s)
- m₀ = initial mass (with fuel)
- mf = final mass (empty)`
            },
            {
              title: 'The Tyranny of the Rocket Equation',
              content: `**Mass Ratio:** R = m₀/mf

**The Exponential Problem:**
To DOUBLE Δv, you must SQUARE the mass ratio!

| Δv/vₑ | Mass Ratio | Fuel % |
|-------|------------|--------|
| 1 | 2.72 | 63% |
| 2 | 7.39 | 86% |
| 3 | 20.1 | 95% |
| 4 | 54.6 | 98% |

**Example: LEO requires Δv ≈ 9,400 m/s**
With Isp = 300s (vₑ = 2,943 m/s):
Δv/vₑ = 9,400/2,943 = 3.2
Mass ratio = e^3.2 = 24.5
Fuel = 96% of rocket mass!

**This is why rockets are mostly fuel tanks!**`
            },
            {
              title: 'Why Staging Works',
              content: `**Single Stage to Orbit (SSTO):**
Need mass ratio of ~25 with structure
Payload fraction: <1% (almost impossible!)

**Two-Stage Rocket:**
Each stage: Δv = 4,700 m/s
Mass ratio per stage: e^1.6 = 4.95
Much more achievable!

**Why Staging Helps:**
You DROP the empty tanks instead of accelerating them.

**Falcon 9 Example:**
- Stage 1: Gets to ~2 km/s, then separates
- Stage 2: Finishes the job to 7.8 km/s
- Payload to LEO: ~22,800 kg (4% of liftoff mass)

**More stages = better payload fraction, but more complexity**`
            },
            {
              title: 'Mission Δv Requirements',
              content: `**Δv Budget for Common Missions:**

| Destination | Δv Required |
|-------------|-------------|
| LEO (400 km) | 9,400 m/s |
| GTO | 12,000 m/s |
| Lunar orbit | 12,500 m/s |
| Moon landing | 15,500 m/s |
| Mars orbit | 15,000 m/s |
| Mars landing | 18,000 m/s |

**LEO Breakdown:**
- Orbital velocity: 7,800 m/s
- Gravity losses: 1,200 m/s
- Drag losses: 200 m/s
- Steering: 200 m/s
- **Total: ~9,400 m/s**

**Key Insight:**
Getting to orbit is the hardest part. Once there, you're "halfway to anywhere" in the solar system!`
            }
          ],
          keyTakeaways: [
            'Δv = vₑ × ln(m₀/mf) - the fundamental rocket equation',
            'Doubling Δv requires SQUARING the mass ratio',
            'LEO requires ~9,400 m/s total Δv',
            'Staging dramatically improves payload fraction',
            'Typical payload to LEO is only 2-4% of liftoff mass'
          ],
          quiz: {
            questions: [
              { id: 'q1', question: 'The rocket equation shows Δv depends on:', options: ['Thrust only', 'Exhaust velocity and mass ratio', 'Fuel type only', 'Engine size'], correctAnswer: 1, explanation: 'Δv = vₑ × ln(m₀/mf) - depends on vₑ and mass ratio.' },
              { id: 'q2', question: 'To double Δv, mass ratio must:', options: ['Double', 'Square', 'Triple', 'Stay same'], correctAnswer: 1, explanation: 'Δv ∝ ln(R), so doubling Δv requires R² (squaring).' },
              { id: 'q3', question: 'LEO requires approximately:', options: ['1,000 m/s', '5,000 m/s', '9,400 m/s', '15,000 m/s'], correctAnswer: 2, explanation: '7,800 orbital + 1,600 losses ≈ 9,400 m/s' },
              { id: 'q4', question: 'Why does staging help?', options: ['More fuel', 'Drop empty mass', 'Higher Isp', 'Less drag'], correctAnswer: 1, explanation: 'Dropping empty tanks means less mass to accelerate.' },
              { id: 'q5', question: 'Typical payload fraction to LEO:', options: ['50%', '25%', '10%', '2-4%'], correctAnswer: 3, explanation: 'The rocket equation makes high payload fractions impossible.' }
            ]
          }
        },
        {
          id: 'orbital-mechanics-intro',
          title: 'Introduction to Orbital Mechanics',
          duration: '30 min',
          xp: 175,
          description: 'How objects move in orbit - Keplers laws',
          aiTutor: true,
          introduction: `Orbital mechanics is the physics of how things move around planets and stars. Understanding orbits lets you plan missions, calculate fuel needs, and navigate the solar system.`,
          sections: [
            {
              title: 'What is an Orbit?',
              content: `**An orbit is falling... and missing!**

A spacecraft in orbit is constantly falling toward Earth, but moving sideways fast enough to keep missing it.

**Orbital Velocity at 400 km (ISS):**
v = √(GM/r) = √(3.986×10¹⁴ / 6,771,000) = 7,670 m/s

That's 27,600 km/h or 17,150 mph!

**Why No Fuel Needed:**
Once in orbit, no thrust required to stay there. The spacecraft follows a natural path determined by gravity.

**Orbital Period:**
ISS orbits Earth every 92 minutes!`
            },
            {
              title: "Kepler's Laws",
              content: `**1st Law: Orbits are Ellipses**
Planets/spacecraft follow elliptical paths with the central body at one focus.

**2nd Law: Equal Areas in Equal Times**
A line from planet to Sun sweeps equal areas in equal time.
→ Objects move faster when closer to the central body!

**3rd Law: Period-Distance Relationship**
T² ∝ a³

T² = (4π²/GM) × a³

**Example:**
- ISS (a = 6,771 km): T = 92 min
- Moon (a = 384,400 km): T = 27.3 days
- Geostationary (a = 42,164 km): T = 24 hours exactly!`
            },
            {
              title: 'Orbital Elements',
              content: `**6 Numbers Define Any Orbit:**

1. **Semi-major axis (a)** - Size of orbit
2. **Eccentricity (e)** - Shape (0=circle, 0-1=ellipse)
3. **Inclination (i)** - Tilt from equator
4. **RAAN (Ω)** - Where orbit crosses equator going north
5. **Argument of periapsis (ω)** - Where lowest point is
6. **True anomaly (ν)** - Where spacecraft is now

**Common Orbit Types:**
- LEO: 200-2000 km altitude, any inclination
- GEO: 35,786 km, 0° inclination (stays over one spot)
- Polar: 90° inclination (passes over poles)
- Sun-sync: ~98° inclination (same sun angle)`
            }
          ],
          keyTakeaways: [
            'Orbits are "falling and missing" - no fuel needed to maintain',
            'Orbital velocity: v = √(GM/r)',
            "Kepler's laws describe orbital shapes and timing",
            '6 orbital elements fully define any orbit'
          ],
          quiz: {
            questions: [
              { id: 'q1', question: 'A spacecraft in orbit is:', options: ['Floating in zero gravity', 'Constantly falling toward Earth', 'Pushed by solar wind', 'Held up by atmosphere'], correctAnswer: 1, explanation: 'Orbiting = falling sideways fast enough to keep missing Earth.' },
              { id: 'q2', question: 'ISS orbital velocity is approximately:', options: ['1,000 m/s', '7,700 m/s', '11,000 m/s', '30,000 m/s'], correctAnswer: 1, explanation: 'v = √(GM/r) ≈ 7,670 m/s at ISS altitude.' },
              { id: 'q3', question: "Kepler's 1st Law says orbits are:", options: ['Circles', 'Ellipses', 'Parabolas', 'Straight lines'], correctAnswer: 1, explanation: 'All orbits are ellipses (circles are special ellipses with e=0).' },
              { id: 'q4', question: 'Geostationary orbit period is:', options: ['90 minutes', '12 hours', '24 hours', '27 days'], correctAnswer: 2, explanation: 'GEO period = 24 hours, so satellite stays over same spot on Earth.' },
              { id: 'q5', question: 'How many orbital elements define an orbit?', options: ['3', '4', '6', '8'], correctAnswer: 2, explanation: '6 elements: a, e, i, Ω, ω, ν fully define position and orbit shape.' }
            ]
          }
        },
        {

          id: 'thermodynamics-basics',
          title: 'Thermodynamics for Rockets',
          duration: '30 min',
          xp: 175,
          description: 'How heat becomes thrust',
          aiTutor: true,
          introduction: `Rocket engines are heat engines - they convert thermal energy from combustion into kinetic energy of the exhaust. Understanding thermodynamics explains why some propellants are better than others.`,
          sections: [
            {
              title: 'Temperature and Heat',
              content: `**Temperature:** Average kinetic energy of molecules
- Measured in Kelvin (K) or Celsius (°C)
- K = °C + 273

**Heat:** Energy transfer due to temperature difference
- Flows from hot to cold
- Measured in Joules (J)

**Rocket Combustion Temperatures:**
| Propellant | Chamber Temp |
|------------|--------------|
| RP-1/LOX | 3,400 K |
| LH2/LOX | 3,250 K |
| Solid | 3,000-3,500 K |

That's hotter than the surface of the Sun (5,778 K surface, but only ~2,000 K for sunspots)!`
            },
            {
              title: 'Ideal Gas Law',
              content: `**PV = nRT** or **PV = mRT/M**

Where:
- P = Pressure (Pa)
- V = Volume (m³)
- n = Moles of gas
- R = Gas constant (8.314 J/mol·K)
- T = Temperature (K)
- M = Molecular mass (kg/mol)

**For Rocket Nozzles:**
As gas expands through nozzle:
- Pressure drops
- Temperature drops
- Velocity increases!

**Key Insight:**
Lower molecular mass (M) = higher exhaust velocity
This is why hydrogen (M=2) beats kerosene (M≈24)!`
            },
            {
              title: 'Energy Conversion in Nozzles',
              content: `**Nozzle converts thermal energy → kinetic energy**

Energy conservation:
cpT₁ + ½v₁² = cpT₂ + ½v₂²

**Exhaust Velocity:**
vₑ = √(2cpT₀ × [1 - (Pₑ/P₀)^((γ-1)/γ)])

Where:
- cp = specific heat
- T₀ = chamber temperature
- γ = ratio of specific heats (~1.2 for exhaust)

**Higher vₑ from:**
- Higher chamber temperature (T₀)
- Lower molecular weight (affects cp)
- Higher pressure ratio (P₀/Pₑ)

**Example: Why LH2 beats RP-1**
- LH2: Lower M → higher vₑ → Isp ~450s
- RP-1: Higher M → lower vₑ → Isp ~310s`
            }
          ],
          keyTakeaways: [
            'Rocket chambers reach 3,000-3,500 K',
            'PV = nRT relates pressure, volume, and temperature',
            'Nozzles convert thermal energy to kinetic energy',
            'Lower molecular weight = higher exhaust velocity'
          ],
          quiz: {
            questions: [
              { id: 'q1', question: 'Rocket combustion temperature is typically:', options: ['500 K', '1,000 K', '3,000-3,500 K', '10,000 K'], correctAnswer: 2, explanation: 'Most rocket propellants burn at 3,000-3,500 K.' },
              { id: 'q2', question: 'In a nozzle, as gas expands:', options: ['Temp increases, velocity decreases', 'Temp decreases, velocity increases', 'Both increase', 'Both decrease'], correctAnswer: 1, explanation: 'Thermal energy converts to kinetic - temp drops, velocity rises.' },
              { id: 'q3', question: 'Why does hydrogen give higher Isp than kerosene?', options: ['Burns hotter', 'Lower molecular weight', 'Higher density', 'Cheaper'], correctAnswer: 1, explanation: 'Lower M means higher exhaust velocity: vₑ ∝ √(T/M)' },
              { id: 'q4', question: 'The ideal gas law is:', options: ['F = ma', 'PV = nRT', 'E = mc²', 'Δv = vₑln(R)'], correctAnswer: 1, explanation: 'PV = nRT relates pressure, volume, moles, and temperature.' },
              { id: 'q5', question: 'Heat flows from:', options: ['Cold to hot', 'Hot to cold', 'High pressure to low', 'Low to high density'], correctAnswer: 1, explanation: 'Heat naturally flows from hot to cold (2nd law of thermodynamics).' }
            ]
          }
        },
        {
          id: 'fluid-dynamics-basics',
          title: 'Fluid Dynamics for Rockets',
          duration: '25 min',
          xp: 150,
          description: 'How gases flow through rocket engines',
          aiTutor: true,
          introduction: `Rockets are all about moving fluids - liquid propellants through pipes, hot gases through nozzles. Understanding fluid dynamics helps you design efficient engines and predict performance.`,
          sections: [
            {
              title: 'Mass Flow Rate',
              content: `**Mass Flow Rate (ṁ):** Mass passing a point per second
ṁ = ρ × A × v

Where:
- ρ = density (kg/m³)
- A = cross-sectional area (m²)
- v = velocity (m/s)

**Units:** kg/s

**Conservation of Mass:**
What goes in must come out!
ṁ₁ = ṁ₂ (at steady state)

**Example: Merlin Engine**
- Propellant flow: ~280 kg/s
- That's 280 kg of fuel+oxidizer every second!
- Full tank empties in ~162 seconds`
            },
            {
              title: 'Bernoulli Principle',
              content: `**For incompressible flow:**
P + ½ρv² + ρgh = constant

**Key Insight:**
Higher velocity → Lower pressure

**Applications:**
- Venturi effect in injectors
- Cavitation in turbopumps
- Pressure drops in feed lines

**Compressible Flow (gases):**
More complex! Must account for density changes.
Used for nozzle design.`
            },
            {
              title: 'Choked Flow',
              content: `**Critical Concept for Nozzles!**

At the throat (narrowest point), flow reaches Mach 1 (sonic).
This is called "choked flow."

**Once choked:**
- Mass flow is MAXIMUM
- Downstream pressure doesn't affect mass flow
- Flow accelerates to supersonic in diverging section

**Choked Mass Flow:**
ṁ = P₀ × A* × √(γ/RT₀) × (2/(γ+1))^((γ+1)/(2(γ-1)))

**Why This Matters:**
- Throat area determines max mass flow
- Chamber pressure determines thrust
- Nozzle shape determines exhaust velocity`
            }
          ],
          keyTakeaways: [
            'Mass flow rate ṁ = ρAv',
            'Higher velocity means lower pressure (Bernoulli)',
            'Choked flow occurs at Mach 1 in the throat',
            'Throat area limits maximum mass flow'
          ],
          quiz: {
            questions: [
              { id: 'q1', question: 'Mass flow rate equals:', options: ['ρ × v', 'ρ × A × v', 'P × A', 'F / v'], correctAnswer: 1, explanation: 'ṁ = ρAv (density × area × velocity)' },
              { id: 'q2', question: 'According to Bernoulli, higher velocity means:', options: ['Higher pressure', 'Lower pressure', 'Same pressure', 'Higher temperature'], correctAnswer: 1, explanation: 'P + ½ρv² = constant, so higher v means lower P.' },
              { id: 'q3', question: 'Choked flow occurs at:', options: ['Mach 0.5', 'Mach 1', 'Mach 2', 'Any Mach number'], correctAnswer: 1, explanation: 'Flow becomes choked (maximum) when it reaches Mach 1 at the throat.' },
              { id: 'q4', question: 'In a rocket nozzle, the throat is:', options: ['Widest point', 'Narrowest point', 'Exit', 'Inlet'], correctAnswer: 1, explanation: 'The throat is the narrowest point where flow reaches Mach 1.' },
              { id: 'q5', question: 'Merlin engine mass flow is about:', options: ['28 kg/s', '280 kg/s', '2800 kg/s', '28000 kg/s'], correctAnswer: 1, explanation: 'Merlin uses ~280 kg/s of propellant.' }
            ]
          }
        },
        {

          id: 'materials-basics',
          title: 'Materials Science Basics',
          duration: '25 min',
          xp: 150,
          description: 'Choosing materials that survive rocket conditions',
          aiTutor: true,
          introduction: `Rockets face extreme conditions - cryogenic fuels at -253°C, combustion at 3,400°C, and forces of 5+ g. Choosing the right materials is critical for survival and performance.`,
          sections: [
            {
              title: 'Key Material Properties',
              content: `**Strength (σ):** Stress before failure
- Yield strength: Permanent deformation begins
- Ultimate strength: Material breaks
- Units: MPa (megapascals)

**Stiffness (E):** Resistance to deformation
- Young's modulus
- Higher E = stiffer material

**Density (ρ):** Mass per volume
- kg/m³
- Lower = lighter = better for rockets!

**THE KEY METRIC: Specific Strength**
σ/ρ = Strength-to-weight ratio

| Material | σ (MPa) | ρ (kg/m³) | σ/ρ |
|----------|---------|-----------|-----|
| Steel | 250 | 7,800 | 32 |
| Al 7075 | 500 | 2,800 | 179 |
| Ti-6Al-4V | 880 | 4,400 | 200 |
| CFRP | 1,500 | 1,600 | 938 |`
            },
            {
              title: 'Aerospace Materials',
              content: `**Aluminum Alloys (Most Common)**
- 2024: Good fatigue resistance
- 6061: Excellent weldability
- 7075: Highest strength
- 2195 Al-Li: 5% lighter, used in Falcon 9

**Titanium**
- Excellent strength-to-weight
- Works at high temperatures
- Expensive! Used sparingly

**Carbon Fiber (CFRP)**
- Best strength-to-weight
- Used in fairings, interstages
- Can't handle high temps

**Inconel (Nickel superalloy)**
- Survives extreme heat
- Used in combustion chambers
- Heavy but necessary`
            },
            {
              title: 'Temperature Effects',
              content: `**Cryogenic Temperatures (-253°C for LH2):**
- Most metals get STRONGER when cold!
- Aluminum is excellent cryogenic material
- Some steels become brittle (bad!)

**High Temperatures (3,400 K in chamber):**
- Most metals melt or weaken
- Need active cooling or special alloys
- Inconel, tungsten, ceramics

**Thermal Expansion:**
Materials expand when heated, contract when cooled.
Must design for thermal stresses!

**Example: SSME (Space Shuttle Main Engine)**
- Chamber: Inconel + copper liner
- Nozzle: Inconel tubes (regenerative cooling)
- Turbopump: Titanium + Inconel`
            }
          ],
          keyTakeaways: [
            'Specific strength (σ/ρ) is the key metric for aerospace',
            'Aluminum alloys are most common - good strength, light, cheap',
            'Carbon fiber has best strength-to-weight but limited temp range',
            'Cryogenic temps make most metals stronger'
          ],
          quiz: {
            questions: [
              { id: 'q1', question: 'The most important material property for rockets is:', options: ['Strength', 'Stiffness', 'Specific strength (σ/ρ)', 'Hardness'], correctAnswer: 2, explanation: 'Strength-to-weight ratio matters most - every gram counts!' },
              { id: 'q2', question: 'Which has best specific strength?', options: ['Steel', 'Aluminum', 'Titanium', 'Carbon fiber'], correctAnswer: 3, explanation: 'CFRP has σ/ρ of ~938, far better than metals.' },
              { id: 'q3', question: 'At cryogenic temperatures, aluminum:', options: ['Gets weaker', 'Gets stronger', 'Melts', 'Becomes brittle'], correctAnswer: 1, explanation: 'Most metals, including aluminum, get stronger when cold.' },
              { id: 'q4', question: 'Combustion chambers often use:', options: ['Aluminum', 'Carbon fiber', 'Inconel', 'Plastic'], correctAnswer: 2, explanation: 'Inconel (nickel superalloy) survives extreme heat.' },
              { id: 'q5', question: 'Why is carbon fiber not used in combustion chambers?', options: ['Too heavy', 'Too expensive', 'Cant handle high temps', 'Not strong enough'], correctAnswer: 2, explanation: 'CFRP degrades at high temperatures.' }
            ]
          }
        },
        {
          id: 'rocket-basics-intro',
          title: 'How Rockets Work',
          duration: '25 min',
          xp: 150,
          description: 'Putting it all together - complete rocket systems',
          aiTutor: true,
          introduction: `Now that you understand the physics, let's see how all the pieces fit together in a real rocket. From propellant tanks to guidance computers, every system must work perfectly.`,
          sections: [
            {
              title: 'Rocket Anatomy',
              content: `**Major Systems:**

**1. Propulsion**
- Engines (thrust)
- Propellant tanks
- Feed systems (pumps, valves)
- Ignition system

**2. Structures**
- Tanks (hold propellant)
- Interstage (connects stages)
- Payload fairing (protects cargo)

**3. Avionics**
- Flight computer
- Guidance & navigation
- Telemetry (sends data to ground)

**4. Payload**
- Satellites, cargo, or crew
- Payload adapter

**Mass Breakdown (typical):**
- Propellant: 85-90%
- Structure: 5-10%
- Engines: 2-3%
- Avionics: <1%
- Payload: 2-4%`
            },
            {
              title: 'Flight Sequence',
              content: `**Typical Launch Timeline:**

T-0: Liftoff
- Engines at full thrust
- Hold-down clamps release

T+60s: Max-Q
- Maximum aerodynamic pressure
- May throttle down engines

T+150s: Stage 1 separation
- First stage engines cut off
- Stages separate
- Second stage ignites

T+180s: Fairing jettison
- Above atmosphere
- Fairing no longer needed

T+540s: Stage 2 cutoff
- Orbital velocity achieved
- Payload deployed

**Key Events:**
- MECO: Main Engine Cutoff
- SECO: Second Engine Cutoff
- Payload deploy`
            },
            {
              title: 'Types of Rockets',
              content: `**By Propellant:**
- Solid: Simple, high thrust, can't throttle
- Liquid: Complex, can throttle/restart
- Hybrid: Solid fuel, liquid oxidizer

**By Size:**
- Small lift: <2,000 kg to LEO (Electron)
- Medium lift: 2,000-20,000 kg (Falcon 9)
- Heavy lift: >20,000 kg (Falcon Heavy, SLS)
- Super heavy: >100,000 kg (Starship)

**By Reusability:**
- Expendable: Used once (most historical)
- Partially reusable: Boosters return (Falcon 9)
- Fully reusable: Everything returns (Starship goal)

**Cost Comparison:**
- Expendable: $10,000-50,000/kg to LEO
- Reusable: $2,000-5,000/kg to LEO
- Starship goal: <$100/kg to LEO`
            }
          ],
          keyTakeaways: [
            'Rockets are 85-90% propellant by mass',
            'Major systems: propulsion, structures, avionics, payload',
            'Flight sequence: liftoff → Max-Q → staging → orbit',
            'Reusability dramatically reduces launch costs'
          ],
          quiz: {
            questions: [
              { id: 'q1', question: 'What percentage of a rocket is typically propellant?', options: ['50%', '70%', '85-90%', '99%'], correctAnswer: 2, explanation: 'The rocket equation demands ~85-90% propellant mass.' },
              { id: 'q2', question: 'Max-Q occurs when:', options: ['Engines are loudest', 'Aerodynamic pressure is maximum', 'Rocket is fastest', 'Staging happens'], correctAnswer: 1, explanation: 'Max-Q = maximum dynamic pressure from air resistance.' },
              { id: 'q3', question: 'Why jettison the fairing?', options: ['Its on fire', 'No longer needed above atmosphere', 'To reduce drag', 'To deploy payload'], correctAnswer: 1, explanation: 'Fairing protects payload from air - not needed in space.' },
              { id: 'q4', question: 'Falcon 9 is classified as:', options: ['Small lift', 'Medium lift', 'Heavy lift', 'Super heavy'], correctAnswer: 1, explanation: 'Falcon 9 lifts ~22,800 kg to LEO - medium lift class.' },
              { id: 'q5', question: 'Reusability reduces cost to LEO by approximately:', options: ['10%', '50%', '5-10x', '100x'], correctAnswer: 2, explanation: 'Reusable rockets cost ~$2-5k/kg vs $10-50k/kg expendable.' }
            ]
          }
        }
      ]
    }
  ]
};

export default section1Foundations;