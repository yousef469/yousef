export const section0Foundations = {
  id: 'foundations',
  title: 'Section 0: Foundations of Flight',
  description: 'Essential aerodynamics, physics, and flight mechanics',
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
              content: `**The Science of Air in Motion**\n\nAerodynamics studies how air interacts with moving objects. For aircraft:\n- Air flowing over wings creates lift\n- Air resistance creates drag\n- Airflow patterns determine stability\n\n**Key Properties of Air:**\n- Density (ρ): ~1.225 kg/m³ at sea level\n- Viscosity: Air has "stickiness" that affects flow\n- Compressibility: Air compresses at high speeds\n\n**Why It Matters:**\nEvery aspect of aircraft design depends on aerodynamics - from wing shape to engine placement.`
            },
            {
              title: 'Airfoil Basics',
              content: `**The Wing Cross-Section**\n\nAn airfoil is the 2D shape of a wing slice:\n- Leading edge: Front of the wing\n- Trailing edge: Back of the wing  \n- Chord line: Straight line from leading to trailing edge\n- Camber: Curvature of the airfoil\n\n**How Airfoils Create Lift:**\n1. Air splits at the leading edge\n2. Upper surface air travels faster (curved path)\n3. Faster air = lower pressure (Bernoulli's principle)\n4. Pressure difference pushes wing UP\n\n**Common Airfoil Types:**\n- Symmetric: Same top and bottom (aerobatic planes)\n- Cambered: Curved top, flatter bottom (most aircraft)\n- Supercritical: Flat top, curved bottom (high-speed jets)`
            },
            {
              title: 'Boundary Layer',
              content: `**The Thin Layer That Matters Most**\n\nThe boundary layer is the thin layer of air directly touching the aircraft surface.\n\n**Two Types:**\n1. Laminar: Smooth, parallel flow (low drag)\n2. Turbulent: Chaotic, mixed flow (higher drag but more stable)\n\n**Transition Point:**\nAir starts laminar at the leading edge, then transitions to turbulent.\n- Smooth surfaces delay transition\n- Rough surfaces cause early transition\n\n**Why It Matters:**\n- 50% of aircraft drag comes from the boundary layer\n- Laminar flow wings can reduce fuel consumption by 10-15%`
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
              content: `**Lift, Weight, Thrust, Drag**\n\n**1. LIFT (↑)**\n- Generated by wings\n- Perpendicular to flight path\n- L = ½ρv²SC_L\n- Must equal or exceed weight for flight\n\n**2. WEIGHT (↓)**\n- Gravity pulling aircraft down\n- W = mg\n- Acts through center of gravity\n- Changes as fuel burns\n\n**3. THRUST (→)**\n- Generated by engines\n- Propels aircraft forward\n- Must overcome drag for acceleration\n\n**4. DRAG (←)**\n- Air resistance opposing motion\n- D = ½ρv²SC_D\n- Increases with speed squared`
            },
            {
              title: 'Force Balance in Flight',
              content: `**Equilibrium Conditions**\n\n**Steady Level Flight:**\n- Lift = Weight\n- Thrust = Drag\n- No acceleration\n\n**Climbing:**\n- Thrust > Drag (accelerating) OR\n- Lift component > Weight component\n- Excess power converts to altitude\n\n**Descending:**\n- Drag > Thrust OR\n- Weight component > Lift component\n- Potential energy converts to speed\n\n**Turning:**\n- Lift tilted to provide centripetal force\n- Lift must increase to maintain altitude\n- Load factor: n = L/W > 1 in turns`
            },
            {
              title: 'Center of Gravity & Balance',
              content: `**Where Weight Acts**\n\nThe Center of Gravity (CG) is where all weight appears to concentrate.\n\n**CG Position Matters:**\n- Too far forward: Heavy nose, hard to rotate\n- Too far aft: Unstable, may be uncontrollable\n- Within limits: Safe, controllable flight\n\n**CG Envelope:**\nAircraft have defined CG limits:\n- Forward limit: Elevator authority\n- Aft limit: Stability margin\n\n**Weight & Balance:**\nBefore every flight, pilots calculate:\n- Total weight (must be under max)\n- CG position (must be within limits)\n\n**Example: Cessna 172**\n- Empty weight: ~1,680 lbs\n- Max takeoff: 2,550 lbs\n- CG range: 35-47 inches aft of datum`
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
              content: `**Direction + Magnitude**\n\nA vector has both size and direction. In aviation:\n\n**Velocity Vector:**\n- Speed (magnitude): 250 knots\n- Direction: Heading 090° (East)\n- Combines to give ground track\n\n**Force Vectors:**\n- Lift: Perpendicular to relative wind\n- Drag: Parallel to relative wind, opposite direction\n- Weight: Always toward Earth's center\n- Thrust: Along engine axis\n\n**Vector Addition:**\nForces combine by adding components:\n- F_total = F₁ + F₂ + F₃...\n- Use component method (x, y, z)`
            },
            {
              title: 'Aircraft Motion',
              content: `**Six Degrees of Freedom**\n\nAircraft can move in 6 ways:\n\n**Translations (Linear Motion):**\n1. Longitudinal (X): Forward/backward\n2. Lateral (Y): Left/right  \n3. Vertical (Z): Up/down\n\n**Rotations (Angular Motion):**\n4. Roll: Rotation about X-axis (ailerons)\n5. Pitch: Rotation about Y-axis (elevator)\n6. Yaw: Rotation about Z-axis (rudder)\n\n**Equations of Motion:**\n- F = ma (Newton's 2nd Law)\n- M = Iα (Rotational equivalent)\n\n**Example: Takeoff Roll**\n- Thrust - Drag - Friction = ma\n- Solve for acceleration\n- Use v² = v₀² + 2as for takeoff distance`
            },
            {
              title: 'Relative Wind & Angles',
              content: `**Critical Angles in Flight**\n\n**Angle of Attack (α):**\n- Angle between chord line and relative wind\n- Increasing α increases lift (up to stall)\n- Typical cruise: 2-5°\n- Stall occurs at ~15-20°\n\n**Relative Wind:**\n- Direction air approaches the aircraft\n- Opposite to flight path\n- NOT the same as wind direction\n\n**Sideslip Angle (β):**\n- Angle between nose and velocity vector\n- Zero in coordinated flight\n- Caused by rudder or crosswind\n\n**Flight Path Angle (γ):**\n- Angle between horizon and flight path\n- Positive = climbing\n- Negative = descending`
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
        },
        {
          id: 'atmosphere-weather',
          title: 'The Atmosphere & Weather',
          duration: '35 min',
          xp: 180,
          description: 'Understanding the environment of flight',
          aiTutor: true,
          introduction: 'The atmosphere is the medium in which we fly. Its properties—density, temperature, and pressure—directly affect aircraft performance, while weather phenomena pose critical challenges.',
          sections: [
            {
              title: 'Structure of the Atmosphere',
              content: `**Layers of the Atmosphere:**\n\n1. **Troposphere (0-36,000 ft):**\n- Where weather happens\n- Temperature decreases with altitude (-2°C/1000 ft)\n- Most flying occurs here\n\n2. **Tropopause:**\n- Boundary layer\n- Jet stream location\n- Stabilized temperature\n\n3. **Stratosphere (above 36,000 ft):**\n- Stable air, good for cruising\n- Ozone layer\n- Temperature increases with altitude\n\n**Standard Atmosphere (ISA):**\n- Sea Level: 15°C, 29.92 inHg (1013.25 mb)\n- Lapse Rate: -2°C per 1000 ft\n- Used for performance calculations`
            },
            {
              title: 'Atmospheric Physics',
              content: `**Density Altitude (DA):**\n"Where the plane thinks it is."\n- High Temp + High Field Elevation = High DA\n- High DA = Poor Performance (Longer takeoff, slower climb)\n\n**Pressure Systems:**\n- **High Pressure:** Sinking air, generally good weather\n- **Low Pressure:** Rising air, storms, precipitation\n\n**Wind:**\n- Flow from High to Low pressure\n- Coriolis force turns wind to right (N. Hemisphere)\n- Friction slows wind at surface`
            },
            {
              title: 'Hazardous Weather',
              content: `**Thunderstorms:**\n- Severe turbulence, hail, lightning\n- Avoid by 20 NM\n- Microbursts: Sudden downdrafts (fatal to landing aircraft)\n\n**Icing:**\n- **Induction Icing:** Carburetor or intake (reduces power)\n- **Structural Icing:** Changes wing shape (destroys lift)\n- **Rime vs. Clear Ice:** Clear is heavy and hard to remove\n\n**Turbulence:**\n- Convective (thermals)\n- Mechanical (terrain/buildings)\n- Clear Air Turbulence (CAT) near jet streams`
            }
          ],
          keyTakeaways: [
            'Standard Atmosphere (ISA) is 15°C and 29.92 inHg at sea level',
            'High density altitude drastically reduces aircraft performance',
            'Thunderstorms and icing are major hazards to aviation',
            'Pressure systems drive global weather patterns'
          ],
          quiz: {
            questions: [
              { id: 'q1', question: 'Standard sea level temperature is:', options: ['0°C', '10°C', '15°C', '25°C'], correctAnswer: 2, explanation: 'Standard ISA temperature at sea level is 15°C (59°F).' },
              { id: 'q2', question: 'High density altitude results in:', options: ['Better performance', 'Shorter takeoff roll', 'Poor performance', 'Lower fuel burn'], correctAnswer: 2, explanation: 'High DA means thinner air, reducing lift and engine power.' },
              { id: 'q3', question: 'Microbursts are dangerous because of:', options: ['Heavy rain', 'Sudden powerful downdrafts', 'Lightning', 'Fog'], correctAnswer: 1, explanation: 'Microbursts cause extreme downdrafts and wind shear dangerous to landing aircraft.' }
            ]
          }
        },
        {
          id: 'stability-control',
          title: 'Stability & Control Basics',
          duration: '35 min',
          xp: 180,
          description: 'Static vs Dynamic stability and aircraft handling',
          aiTutor: true,
          introduction: 'Stability is the tendency of an aircraft to return to its original flight path after a disturbance. Control is the ability of the pilot to change that path. Balancing these two is the art of aircraft design.',
          sections: [
            {
              title: 'Static Stability',
              content: `**Initial Tendency**\n\nWhen disturbed (e.g., by a gust):\n- **Positive Static Stability:** Aircraft tries to return to original attitude.\n- **Neutral Static Stability:** Aircraft stays in new attitude.\n- **Negative Static Stability:** Aircraft continues to diverge (moves further away).\n\n**Design:**\n- Commercial jets: Positive stability (easy to fly)\n- Fighters: Neutral/Negative (maneuverable)`
            },
            {
              title: 'Dynamic Stability',
              content: `**Response Over Time**\n\n1. **Positive Dynamic Stability:** Oscillations dampen out over time (return to smooth flight).\n2. **Neutral Dynamic Stability:** Oscillations continue unchanged.\n3. **Negative Dynamic Stability:** Oscillations get worse (divergent).\n\n**Example:**\nA car with bad shocks has poor dynamic stability (keeps bouncing after a bump).`
            },
            {
              title: 'Axes of Stability',
              content: `**Longitudinal (Pitch):**\n- Stability about lateral axis\n- Center of Gravity (CG) vs. Center of Pressure (CP)\n- Tail downforce balances the nose-heavy CG\n\n**Lateral (Roll):**\n- Stability about longitudinal axis\n- "Dihedral" (wings angled up) helps return wings to level\n\n**Directional (Yaw):**\n- Stability about vertical axis\n- "Weather Vane" effect of the vertical stabilizer (tail)`
            }
          ],
          keyTakeaways: [
            'Static stability is the initial reaction to displacement',
            'Dynamic stability is the reaction over time',
            'Dihedral contributes to lateral (roll) stability',
            'CG position is critical for longitudinal stability'
          ],
          quiz: {
            questions: [
              { id: 'q1', question: 'Positive static stability means:', options: ['Remains in new position', 'Returns to original position', 'Moves further away', 'Spins'], correctAnswer: 1, explanation: 'Positive static stability creates a restoring force to return to the original equilibrium.' },
              { id: 'q2', question: 'Dihedral wing design improves:', options: ['Pitch stability', 'Roll stability', 'Yaw stability', 'Speed'], correctAnswer: 1, explanation: 'Dihedral (wings angled up) provides lateral stability by leveling the wings.' },
              { id: 'q3', question: 'Longitudinal stability is primarily provided by:', options: ['Ailerons', 'Horizontal stabilizer', 'Vertical stabilizer', 'Engine placement'], correctAnswer: 1, explanation: 'The horizontal stabilizer (tail) balances pitching moments.' }
            ]
          }
        }
      ]
    }
  ]
};

export default section0Foundations;
