// Section 0: Foundations - Aerodynamics Basics for Aircraft
// 3 Lessons - MIT Quality Content

export const section0Foundations = {
  id: 'foundations',
  title: 'Unit 0: Foundations',
  description: 'Essential aerodynamics and flight physics',
  icon: '🎓',
  color: 'from-blue-500 to-cyan-500',
  units: [
    {
      id: 'aero-basics',
      title: 'Aerodynamics Fundamentals',
      description: 'Core concepts for understanding flight',
      lessons: [
        {
          id: 'aerodynamics-basics',
          title: 'Aerodynamics Basics',
          duration: '25 min',
          xp: 150,
          description: 'How air flows around aircraft and creates lift',
          aiTutor: true,
          introduction: `Aerodynamics is the study of how air moves around objects. Understanding airflow is essential for designing aircraft that fly efficiently and safely.`,
          sections: [
            {
              title: 'What is Aerodynamics?',
              content: `**The Science of Air in Motion**

Aerodynamics studies how air interacts with moving objects. For aircraft:
- Air flowing over wings creates lift
- Air resistance creates drag
- Airflow patterns determine stability

**Key Properties of Air:**
- Density (ρ): ~1.225 kg/m³ at sea level
- Viscosity: Air has "stickiness" that affects flow
- Compressibility: Air compresses at high speeds

**Why It Matters:**
Every aspect of aircraft design depends on aerodynamics - from wing shape to engine placement.`
            },
            {
              title: 'Airfoil Basics',
              content: `**The Wing Cross-Section**

An airfoil is the 2D shape of a wing slice:
- Leading edge: Front of the wing
- Trailing edge: Back of the wing  
- Chord line: Straight line from leading to trailing edge
- Camber: Curvature of the airfoil

**How Airfoils Create Lift:**
1. Air splits at the leading edge
2. Upper surface air travels faster (curved path)
3. Faster air = lower pressure (Bernoulli's principle)
4. Pressure difference pushes wing UP

**Common Airfoil Types:**
- Symmetric: Same top and bottom (aerobatic planes)
- Cambered: Curved top, flatter bottom (most aircraft)
- Supercritical: Flat top, curved bottom (high-speed jets)`
            },
            {
              title: 'Boundary Layer',
              content: `**The Thin Layer That Matters Most**

The boundary layer is the thin layer of air directly touching the aircraft surface.

**Two Types:**
1. Laminar: Smooth, parallel flow (low drag)
2. Turbulent: Chaotic, mixed flow (higher drag but more stable)

**Transition Point:**
Air starts laminar at the leading edge, then transitions to turbulent.
- Smooth surfaces delay transition
- Rough surfaces cause early transition

**Why It Matters:**
- 50% of aircraft drag comes from the boundary layer
- Laminar flow wings can reduce fuel consumption by 10-15%`
            }
          ],
          keyTakeaways: [
            'Aerodynamics studies air movement around objects',
            'Airfoils create lift through pressure differences',
            'Boundary layer behavior affects drag significantly',
            'Wing shape determines aircraft performance'
          ],
          quiz: {
            questions: [
              { id: 'q1', question: 'What creates lift on a wing?', options: ['Engine thrust', 'Pressure difference', 'Wing weight', 'Air temperature'], correctAnswer: 1, explanation: 'Lift is created by lower pressure on top of the wing than below.' },
              { id: 'q2', question: 'The chord line connects:', options: ['Wing tips', 'Leading and trailing edges', 'Top and bottom surfaces', 'Fuselage to wing'], correctAnswer: 1, explanation: 'The chord is a straight line from leading to trailing edge.' },
              { id: 'q3', question: 'Laminar flow has:', options: ['Higher drag', 'Lower drag', 'No effect on drag', 'Variable drag'], correctAnswer: 1, explanation: 'Laminar (smooth) flow creates less friction drag than turbulent flow.' },
              { id: 'q4', question: 'Air density at sea level is approximately:', options: ['0.5 kg/m³', '1.225 kg/m³', '2.5 kg/m³', '5.0 kg/m³'], correctAnswer: 1, explanation: 'Standard sea level air density is 1.225 kg/m³.' },
              { id: 'q5', question: 'Camber refers to:', options: ['Wing length', 'Airfoil curvature', 'Aircraft speed', 'Engine power'], correctAnswer: 1, explanation: 'Camber is the curvature of the airfoil shape.' }
            ]
          }
        },
        {
          id: 'flight-forces',
          title: 'Flight Forces & Balance',
          duration: '30 min',
          xp: 175,
          description: 'The four forces that govern all flight',
          aiTutor: true,
          introduction: `Every aircraft in flight experiences four fundamental forces. Understanding how these forces interact is the key to understanding flight.`,
          sections: [
            {
              title: 'The Four Forces of Flight',
              content: `**Lift, Weight, Thrust, Drag**

**1. LIFT (↑)**
- Generated by wings
- Perpendicular to flight path
- L = ½ρv²SC_L
- Must equal or exceed weight for flight

**2. WEIGHT (↓)**
- Gravity pulling aircraft down
- W = mg
- Acts through center of gravity
- Changes as fuel burns

**3. THRUST (→)**
- Generated by engines
- Propels aircraft forward
- Must overcome drag for acceleration

**4. DRAG (←)**
- Air resistance opposing motion
- D = ½ρv²SC_D
- Increases with speed squared`
            },
            {
              title: 'Force Balance in Flight',
              content: `**Equilibrium Conditions**

**Steady Level Flight:**
- Lift = Weight
- Thrust = Drag
- No acceleration

**Climbing:**
- Thrust > Drag (accelerating) OR
- Lift component > Weight component
- Excess power converts to altitude

**Descending:**
- Drag > Thrust OR
- Weight component > Lift component
- Potential energy converts to speed

**Turning:**
- Lift tilted to provide centripetal force
- Lift must increase to maintain altitude
- Load factor: n = L/W > 1 in turns`
            },
            {
              title: 'Center of Gravity & Balance',
              content: `**Where Weight Acts**

The Center of Gravity (CG) is where all weight appears to concentrate.

**CG Position Matters:**
- Too far forward: Heavy nose, hard to rotate
- Too far aft: Unstable, may be uncontrollable
- Within limits: Safe, controllable flight

**CG Envelope:**
Aircraft have defined CG limits:
- Forward limit: Elevator authority
- Aft limit: Stability margin

**Weight & Balance:**
Before every flight, pilots calculate:
- Total weight (must be under max)
- CG position (must be within limits)

**Example: Cessna 172**
- Empty weight: ~1,680 lbs
- Max takeoff: 2,550 lbs
- CG range: 35-47 inches aft of datum`
            }
          ],
          keyTakeaways: [
            'Four forces: Lift, Weight, Thrust, Drag',
            'Steady flight requires force balance',
            'CG position affects stability and control',
            'Weight and balance are critical for safety'
          ],
          quiz: {
            questions: [
              { id: 'q1', question: 'In steady level flight:', options: ['Thrust > Drag', 'Lift = Weight', 'Lift > Weight', 'Drag > Thrust'], correctAnswer: 1, explanation: 'Steady level flight requires Lift = Weight and Thrust = Drag.' },
              { id: 'q2', question: 'Drag increases with speed:', options: ['Linearly', 'Squared', 'Cubed', 'Not at all'], correctAnswer: 1, explanation: 'Drag is proportional to velocity squared (D ∝ v²).' },
              { id: 'q3', question: 'A CG too far aft causes:', options: ['Heavy nose', 'Instability', 'More lift', 'Less drag'], correctAnswer: 1, explanation: 'Aft CG reduces stability margin and can make the aircraft uncontrollable.' },
              { id: 'q4', question: 'In a turn, load factor is:', options: ['Less than 1', 'Equal to 1', 'Greater than 1', 'Zero'], correctAnswer: 2, explanation: 'Turns require increased lift, so load factor n = L/W > 1.' },
              { id: 'q5', question: 'Which force is generated by wings?', options: ['Thrust', 'Drag', 'Lift', 'Weight'], correctAnswer: 2, explanation: 'Wings generate lift through pressure differences.' }
            ]
          }
        },
        {
          id: 'vectors-motion',
          title: 'Vectors & Motion for Aircraft',
          duration: '25 min',
          xp: 150,
          description: 'Mathematical tools for analyzing flight',
          aiTutor: true,
          introduction: `Vectors are essential tools for describing aircraft motion. They let us analyze velocity, acceleration, and forces in three dimensions.`,
          sections: [
            {
              title: 'Vectors in Aviation',
              content: `**Direction + Magnitude**

A vector has both size and direction. In aviation:

**Velocity Vector:**
- Speed (magnitude): 250 knots
- Direction: Heading 090° (East)
- Combines to give ground track

**Force Vectors:**
- Lift: Perpendicular to relative wind
- Drag: Parallel to relative wind, opposite direction
- Weight: Always toward Earth's center
- Thrust: Along engine axis

**Vector Addition:**
Forces combine by adding components:
- F_total = F₁ + F₂ + F₃...
- Use component method (x, y, z)`
            },
            {
              title: 'Aircraft Motion',
              content: `**Six Degrees of Freedom**

Aircraft can move in 6 ways:

**Translations (Linear Motion):**
1. Longitudinal (X): Forward/backward
2. Lateral (Y): Left/right  
3. Vertical (Z): Up/down

**Rotations (Angular Motion):**
4. Roll: Rotation about X-axis (ailerons)
5. Pitch: Rotation about Y-axis (elevator)
6. Yaw: Rotation about Z-axis (rudder)

**Equations of Motion:**
- F = ma (Newton's 2nd Law)
- M = Iα (Rotational equivalent)

**Example: Takeoff Roll**
- Thrust - Drag - Friction = ma
- Solve for acceleration
- Use v² = v₀² + 2as for takeoff distance`
            },
            {
              title: 'Relative Wind & Angles',
              content: `**Critical Angles in Flight**

**Angle of Attack (α):**
- Angle between chord line and relative wind
- Increasing α increases lift (up to stall)
- Typical cruise: 2-5°
- Stall occurs at ~15-20°

**Relative Wind:**
- Direction air approaches the aircraft
- Opposite to flight path
- NOT the same as wind direction

**Sideslip Angle (β):**
- Angle between nose and velocity vector
- Zero in coordinated flight
- Caused by rudder or crosswind

**Flight Path Angle (γ):**
- Angle between horizon and flight path
- Positive = climbing
- Negative = descending`
            }
          ],
          keyTakeaways: [
            'Vectors describe both magnitude and direction',
            'Aircraft have 6 degrees of freedom',
            'Angle of attack is critical for lift and stall',
            'Relative wind determines aerodynamic forces'
          ],
          quiz: {
            questions: [
              { id: 'q1', question: 'How many degrees of freedom does an aircraft have?', options: ['3', '4', '6', '8'], correctAnswer: 2, explanation: 'Aircraft have 6 DOF: 3 translations and 3 rotations.' },
              { id: 'q2', question: 'Angle of attack is measured from:', options: ['Horizon', 'Chord line to relative wind', 'Fuselage axis', 'Wing tip to tip'], correctAnswer: 1, explanation: 'Angle of attack is the angle between chord line and relative wind.' },
              { id: 'q3', question: 'Roll is controlled by:', options: ['Elevator', 'Rudder', 'Ailerons', 'Flaps'], correctAnswer: 2, explanation: 'Ailerons control roll (rotation about the longitudinal axis).' },
              { id: 'q4', question: 'Stall typically occurs at angle of attack of:', options: ['5°', '10°', '15-20°', '45°'], correctAnswer: 2, explanation: 'Most airfoils stall between 15-20° angle of attack.' },
              { id: 'q5', question: 'Relative wind is:', options: ['Same as wind direction', 'Opposite to flight path', 'Always horizontal', 'Vertical'], correctAnswer: 1, explanation: 'Relative wind is opposite to the aircraft flight path.' }
            ]
          }
        }
      ]
    }
  ]
};

export default section0Foundations;
