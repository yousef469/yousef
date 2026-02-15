// Section 1: Aircraft Structures - 6 Lessons (2 units × 3 lessons)

export const section1Structures = {
  id: 'structures',
  title: 'Section 1: Aircraft Structures',
  description: 'Wing design, fuselage construction, and materials',
  icon: '🏗️',
  color: 'from-purple-500 to-pink-500',
  units: [
    {
      id: 'wing-design',
      title: 'Wing Design & Construction',
      description: 'How wings are built to handle flight loads',
      lessons: [
        {
          id: 'wing-anatomy',
          title: 'Wing Anatomy & Components',
          duration: '25 min',
          xp: 150,
          description: 'Spars, ribs, skin, and structural elements',
          introduction: 'Aircraft wings must be strong enough to handle enormous loads while remaining as light as possible.',
          sections: [
            { title: 'Wing Structure Overview', content: '**Main Structural Elements:**\n\n- Spars: Main load-bearing beams running spanwise\n- Ribs: Maintain airfoil shape, transfer loads\n- Skin: Aerodynamic surface, carries shear loads\n- Stringers: Longitudinal stiffeners\n\n**Load Paths:**\nLift → Skin → Ribs → Spars → Fuselage' },
            { title: 'Spar Design', content: '**Types of Spars:**\n\n1. I-beam: Most common, efficient\n2. Box spar: Torsionally stiff\n3. Multi-spar: Distributes loads\n\n**Spar Caps:** Handle bending (tension/compression)\n**Spar Web:** Handles shear loads' },
            { title: 'Wing Configurations', content: '**Planform Shapes:**\n- Rectangular: Simple, good stall characteristics\n- Tapered: Efficient, lighter\n- Swept: High-speed performance\n- Delta: Supersonic aircraft\n\n**Aspect Ratio = Span²/Area**\nHigh AR = Efficient (gliders)\nLow AR = Maneuverable (fighters)' }
          ],
          keyTakeaways: ['Spars carry primary bending loads', 'Ribs maintain airfoil shape', 'Wing planform affects performance', 'Aspect ratio trades efficiency vs maneuverability'],
          quiz: { questions: [
            { id: 'q1', question: 'Main spanwise load-bearing element:', options: ['Rib', 'Spar', 'Skin', 'Stringer'], correctAnswer: 1, explanation: 'Spars are the main beams running along the wing span.' },
            { id: 'q2', question: 'Ribs primarily:', options: ['Carry bending loads', 'Maintain airfoil shape', 'Generate lift', 'Reduce drag'], correctAnswer: 1, explanation: 'Ribs maintain the airfoil shape and transfer loads to spars.' },
            { id: 'q3', question: 'High aspect ratio wings are:', options: ['More maneuverable', 'More efficient', 'Stronger', 'Heavier'], correctAnswer: 1, explanation: 'High AR reduces induced drag, improving efficiency.' }
          ]}
        },
        {
          id: 'wing-loads',
          title: 'Wing Loading & Stress Analysis',
          duration: '30 min',
          xp: 175,
          description: 'Understanding forces and stresses in wings',
          introduction: 'Wings experience complex loads during flight. Engineers must ensure structures can handle all expected conditions.',
          sections: [
            { title: 'Types of Loads', content: '**Flight Loads:**\n- Lift distribution (elliptical ideal)\n- Maneuver loads (g-forces)\n- Gust loads (turbulence)\n\n**Ground Loads:**\n- Landing impact\n- Taxi bumps\n- Towing forces\n\n**Load Factor (n):** n = L/W\n- Normal flight: n = 1\n- 60° bank turn: n = 2\n- Limit load: Max expected (2.5g transport)' },
            { title: 'Stress Analysis', content: '**Bending Stress:**\nσ = My/I\n- M = bending moment\n- y = distance from neutral axis\n- I = moment of inertia\n\n**Shear Stress:**\nτ = VQ/It\n\n**Safety Factor:**\nUltimate load = 1.5 × Limit load\nStructure must not fail at ultimate load' },
            { title: 'V-n Diagram', content: '**Flight Envelope:**\nThe V-n diagram shows allowable combinations of speed and load factor.\n\n**Key Points:**\n- Vs: Stall speed\n- Va: Maneuvering speed\n- Vne: Never exceed speed\n- Positive/negative g limits\n\n**Design Considerations:**\n- Must handle all points in envelope\n- Plus safety factor' }
          ],
          keyTakeaways: ['Load factor measures g-forces', 'Safety factor of 1.5 for ultimate loads', 'V-n diagram defines flight envelope', 'Bending stress is critical in spars'],
          quiz: { questions: [
            { id: 'q1', question: 'Load factor in a 60° bank turn:', options: ['1g', '1.5g', '2g', '3g'], correctAnswer: 2, explanation: 'n = 1/cos(60°) = 2g in a 60° bank.' },
            { id: 'q2', question: 'Ultimate load safety factor:', options: ['1.0', '1.25', '1.5', '2.0'], correctAnswer: 2, explanation: 'Ultimate load = 1.5 × limit load for transport aircraft.' },
            { id: 'q3', question: 'Va is:', options: ['Stall speed', 'Maneuvering speed', 'Never exceed', 'Cruise speed'], correctAnswer: 1, explanation: 'Va is maneuvering speed - max speed for full control deflection.' }
          ]}
        },
        {
          id: 'control-surfaces',
          title: 'Control Surfaces & Mechanisms',
          duration: '25 min',
          xp: 150,
          description: 'Ailerons, flaps, and high-lift devices',
          introduction: 'Control surfaces allow pilots to maneuver the aircraft. High-lift devices enable slower takeoff and landing speeds.',
          sections: [
            { title: 'Primary Control Surfaces', content: '**Ailerons:** Roll control\n- Located on outer wing trailing edge\n- Move differentially (one up, one down)\n- Adverse yaw requires rudder coordination\n\n**Elevator:** Pitch control\n- On horizontal stabilizer\n- Moves up/down together\n\n**Rudder:** Yaw control\n- On vertical stabilizer\n- Coordinates turns, crosswind landings' },
            { title: 'High-Lift Devices', content: '**Trailing Edge Flaps:**\n- Plain flap: Simple hinge\n- Split flap: Lower surface only\n- Slotted flap: Gap for airflow\n- Fowler flap: Extends and deflects\n\n**Leading Edge Devices:**\n- Slats: Create slot for high α\n- Krueger flaps: Fold out from leading edge\n\n**Effect:** Increase C_Lmax by 50-100%' },
            { title: 'Actuation Systems', content: '**Manual Systems:**\n- Cables and pulleys\n- Push-pull rods\n- Light aircraft\n\n**Powered Systems:**\n- Hydraulic actuators\n- Electric actuators\n- Fly-by-wire (electronic)\n\n**Redundancy:**\nMultiple systems for safety\n- Dual hydraulic systems\n- Manual backup' }
          ],
          keyTakeaways: ['Ailerons control roll, elevator pitch, rudder yaw', 'Flaps increase lift coefficient', 'Slats delay stall to higher angles', 'Redundant systems ensure safety'],
          quiz: { questions: [
            { id: 'q1', question: 'Ailerons control:', options: ['Pitch', 'Roll', 'Yaw', 'Speed'], correctAnswer: 1, explanation: 'Ailerons control roll about the longitudinal axis.' },
            { id: 'q2', question: 'Fowler flaps:', options: ['Only deflect', 'Extend and deflect', 'Only extend', 'Retract'], correctAnswer: 1, explanation: 'Fowler flaps extend rearward and deflect, increasing both area and camber.' },
            { id: 'q3', question: 'Slats help by:', options: ['Reducing drag', 'Delaying stall', 'Increasing speed', 'Reducing weight'], correctAnswer: 1, explanation: 'Slats energize boundary layer, delaying stall to higher angles of attack.' }
          ]}
        }
      ]
    },
    {
      id: 'fuselage-materials',
      title: 'Fuselage & Materials',
      description: 'Body construction and aerospace materials',
      lessons: [
        {
          id: 'fuselage-design',
          title: 'Fuselage Design & Construction',
          duration: '25 min',
          xp: 150,
          description: 'Semi-monocoque structures and pressurization',
          introduction: 'The fuselage carries passengers, cargo, and connects all aircraft components. It must handle pressurization, bending, and torsion loads.',
          sections: [
            { title: 'Fuselage Structure Types', content: '**Truss Structure:**\n- Steel tube framework\n- Fabric or metal covering\n- Light aircraft, older designs\n\n**Monocoque:**\n- Skin carries all loads\n- No internal framework\n- Efficient but damage-sensitive\n\n**Semi-Monocoque:**\n- Skin + frames + stringers\n- Most common today\n- Damage tolerant' },
            { title: 'Structural Elements', content: '**Frames:** Circular rings maintaining shape\n**Stringers:** Longitudinal stiffeners\n**Skin:** Carries shear and pressurization\n**Longerons:** Heavy longitudinal members\n**Bulkheads:** Solid frames at major load points\n\n**Load Paths:**\nPressure → Skin → Frames\nBending → Stringers → Frames' },
            { title: 'Pressurization', content: '**Why Pressurize?**\nAt 35,000 ft, air pressure is only 25% of sea level.\nHumans need equivalent of 8,000 ft or lower.\n\n**Pressure Differential:**\nΔP = 8-9 psi typical\n\n**Hoop Stress:**\nσ = PR/t\n- P = pressure differential\n- R = fuselage radius\n- t = skin thickness\n\n**Fatigue Concern:**\nEach pressurization cycle stresses the structure.' }
          ],
          keyTakeaways: ['Semi-monocoque is most common structure', 'Pressurization creates hoop stress in skin', 'Frames and stringers stiffen the structure', 'Fatigue from pressure cycles is critical'],
          quiz: { questions: [
            { id: 'q1', question: 'Most common fuselage structure:', options: ['Truss', 'Monocoque', 'Semi-monocoque', 'Geodetic'], correctAnswer: 2, explanation: 'Semi-monocoque combines skin, frames, and stringers for efficiency and damage tolerance.' },
            { id: 'q2', question: 'Cabin altitude is typically maintained at:', options: ['Sea level', '8,000 ft', '20,000 ft', '35,000 ft'], correctAnswer: 1, explanation: 'Cabin altitude is kept at 8,000 ft or below for passenger comfort.' },
            { id: 'q3', question: 'Hoop stress formula:', options: ['σ = F/A', 'σ = PR/t', 'σ = My/I', 'σ = E×ε'], correctAnswer: 1, explanation: 'Hoop stress σ = PR/t for pressurized cylinders.' }
          ]}
        },
        {
          id: 'aerospace-materials',
          title: 'Aerospace Materials',
          duration: '30 min',
          xp: 175,
          description: 'Aluminum, composites, and advanced materials',
          introduction: 'Material selection is crucial in aerospace. The right material balances strength, weight, cost, and manufacturability.',
          sections: [
            { title: 'Aluminum Alloys', content: '**Most Common Aerospace Material**\n\n**2024-T3:** High strength, fatigue resistant\n- Fuselage skins, wing skins\n- Yield: 345 MPa\n\n**7075-T6:** Highest strength aluminum\n- Wing spars, fittings\n- Yield: 503 MPa\n\n**Advantages:**\n- Good strength-to-weight\n- Easy to manufacture\n- Well understood\n\n**Disadvantages:**\n- Corrosion susceptible\n- Fatigue cracks' },
            { title: 'Composite Materials', content: '**Carbon Fiber Reinforced Polymer (CFRP)**\n\n**Advantages:**\n- 20-30% lighter than aluminum\n- No corrosion\n- Fatigue resistant\n- Can be tailored for loads\n\n**Disadvantages:**\n- Expensive\n- Difficult to inspect\n- Impact damage sensitivity\n\n**Usage:**\n- Boeing 787: 50% composites\n- Airbus A350: 53% composites\n- Wings, fuselage, empennage' },
            { title: 'Other Materials', content: '**Titanium:**\n- High strength, heat resistant\n- Engine pylons, landing gear\n- Expensive, hard to machine\n\n**Steel:**\n- Landing gear, fasteners\n- High strength but heavy\n\n**Honeycomb Core:**\n- Sandwich panels\n- Excellent stiffness-to-weight\n- Floor panels, control surfaces\n\n**Future Materials:**\n- Ceramic matrix composites\n- Metal matrix composites\n- Graphene-enhanced materials' }
          ],
          keyTakeaways: ['Aluminum alloys still dominate aircraft structures', 'Composites offer 20-30% weight savings', 'Material selection depends on application', 'Modern aircraft use 50%+ composites'],
          quiz: { questions: [
            { id: 'q1', question: 'Boeing 787 composite content:', options: ['20%', '35%', '50%', '80%'], correctAnswer: 2, explanation: 'The 787 Dreamliner is approximately 50% composite by weight.' },
            { id: 'q2', question: 'Highest strength aluminum alloy:', options: ['2024', '6061', '7075', '5052'], correctAnswer: 2, explanation: '7075-T6 has the highest strength of common aerospace aluminum alloys.' },
            { id: 'q3', question: 'Main advantage of composites:', options: ['Lower cost', 'Lighter weight', 'Easier inspection', 'Better conductivity'], correctAnswer: 1, explanation: 'Composites offer 20-30% weight savings compared to aluminum.' }
          ]}
        },
        {
          id: 'fatigue-damage',
          title: 'Fatigue & Damage Tolerance',
          duration: '25 min',
          xp: 150,
          description: 'How structures age and inspection requirements',
          introduction: 'Aircraft structures experience millions of load cycles. Understanding fatigue and damage tolerance is essential for safety.',
          sections: [
            { title: 'Metal Fatigue', content: '**What is Fatigue?**\nMaterial failure under repeated loading below ultimate strength.\n\n**S-N Curve:**\nStress vs. Number of cycles to failure\n- Higher stress = fewer cycles\n- Endurance limit (steel) or no limit (aluminum)\n\n**Fatigue Life:**\nAluminum has NO endurance limit\n- Will eventually fail at any stress level\n- Must design for finite life or damage tolerance' },
            { title: 'Damage Tolerance', content: '**Philosophy:**\nAssume cracks exist and will grow.\nDesign so cracks are found before failure.\n\n**Key Concepts:**\n- Crack growth rate: da/dN\n- Stress intensity factor: K\n- Critical crack length\n\n**Inspection Intervals:**\nBased on crack growth analysis\n- Find cracks before critical size\n- Multiple load paths for redundancy' },
            { title: 'Inspection Methods', content: '**Non-Destructive Testing (NDT):**\n\n**Visual:** Most common, surface defects\n**Dye Penetrant:** Surface cracks\n**Magnetic Particle:** Ferrous metals\n**Eddy Current:** Subsurface cracks\n**Ultrasonic:** Internal defects\n**X-Ray:** Internal structure\n\n**Scheduled Inspections:**\n- A Check: ~500 flight hours\n- C Check: ~2 years\n- D Check: ~6 years (heavy maintenance)' }
          ],
          keyTakeaways: ['Aluminum has no fatigue endurance limit', 'Damage tolerance assumes cracks exist', 'Regular inspections catch cracks early', 'Multiple load paths provide redundancy'],
          quiz: { questions: [
            { id: 'q1', question: 'Aluminum fatigue endurance limit:', options: ['50% of ultimate', '30% of ultimate', 'Does not exist', '10% of ultimate'], correctAnswer: 2, explanation: 'Unlike steel, aluminum has no endurance limit and will eventually fail at any stress.' },
            { id: 'q2', question: 'Damage tolerance assumes:', options: ['No cracks exist', 'Cracks exist and grow', 'Material is perfect', 'Infinite life'], correctAnswer: 1, explanation: 'Damage tolerance design assumes cracks exist and manages their growth.' },
            { id: 'q3', question: 'D Check interval:', options: ['500 hours', '1 year', '6 years', '20 years'], correctAnswer: 2, explanation: 'D Check (heavy maintenance) occurs approximately every 6 years.' }
          ]}
        }
      ]
    }
  ]
};

export default section1Structures;
