export const section1Structures = {
  id: 'structures',
  title: 'Section 1: Aircraft Structures',
  description: 'Wing design, fuselage, landing gear, and materials',
  icon: '🏗️',
  color: 'from-purple-500 to-pink-500',
  units: [
    {
      id: 'aircraft-structures',
      title: 'Structural Engineering',
      description: 'How aircraft are built to withstand flight loads',
      lessons: [
        {
          id: 'wing-design',
          title: 'Wing Design & Construction',
          duration: '30 min',
          xp: 175,
          description: 'Spars, ribs, skin, and structural elements',
          introduction: 'Aircraft wings must be strong enough to handle enormous loads while remaining as light as possible. Their internal structure is a marvel of engineering.',
          sections: [
            {
              title: 'Wing Structure Overview',
              content: `**Main Structural Elements:**\n\n- **Spars:** Main load-bearing beams running spanwise. They carry bending loads.\n- **Ribs:** Maintain airfoil shape and distribute loads from skin to spars.\n- **Skin:** Aerodynamic surface that carries shear loads (and torsion).\n- **Stringers:** Longitudinal stiffeners that prevent skin buckling.\n\n**Load Paths:**\nLift → Skin → Ribs → Spars → Fuselage`
            },
            {
              title: 'Spar Concepts',
              content: `**The Backbone of the Wing**\n\n**Types of Spars:**\n1. **I-beam:** Efficient for bending, common in many aircraft.\n2. **Box spar:** Two vertical webs, very stiff in torsion (twisting).\n3. **Multi-spar:** Failsafe design (if one breaks, others hold).\n\n**Components:**\n- **Spar Caps:** Top/bottom flanges. Handle tension/compression (bending).\n- **Spar Web:** Vertical part. Handles shear forces.`
            },
            {
              title: 'Wing Configurations',
              content: `**Planform Shapes:**\n- **Rectangular:** Simple to build, stall starts at root (safe).\n- **Tapered:** More efficient distribution of lift, lighter.\n- **Swept:** Delays shockwaves for high-speed flight, but can suffer tip stall.\n- **Delta:** Optimal for supersonic (Concorde, fighters).\n\n**Aspect Ratio (AR):**\n- AR = Span² / Area\n- High AR (Gliders): Efficient, low drag.\n- Low AR (Fighters): Maneuverable, strong.`
            }
          ],
          keyTakeaways: [
            'Spars are the primary load-bearing beams',
            'Ribs maintain the airfoil shape',
            'Box spars provide great torsional stiffness',
            'Aspect ratio dictates part of the efficiency vs. maneuverability trade-off'
          ],
          quiz: {
            questions: [
              { id: 'q1', question: 'Which component carries primary bending loads?', options: ['Rib', 'Spar', 'Skin', 'Stringer'], correctAnswer: 1, explanation: 'Spars act as the main beams to resist bending forces.' },
              { id: 'q2', question: 'Ribs primarily:', options: ['Carry bending loads', 'Maintain airfoil shape', 'Generate lift', 'Reduce drag'], correctAnswer: 1, explanation: 'Ribs maintain the airfoil shape and transfer air loads to the spars.' },
              { id: 'q3', question: 'High aspect ratio wings are best for:', options: ['Maneuverability', 'Efficiency/Gliding', 'Supersonic speed', 'Storage'], correctAnswer: 1, explanation: 'High aspect ratio reduces induced drag, making wings very efficient (like on gliders).' }
            ]
          }
        },
        {
          id: 'fuselage-design',
          title: 'Fuselage & Pressurization',
          duration: '30 min',
          xp: 175,
          description: 'Semi-monocoque structures and cabin pressure',
          introduction: 'The fuselage carries payload and connects the aircraft parts. For high-altitude flight, it must also serve as a pressure vessel.',
          sections: [
            {
              title: 'Structural Concepts',
              content: `**Truss (Old):**\n- Frame of tubes (wood/steel) covered in fabric. Strong but draggy.\n\n**Monocoque (Eggshell):**\n- Skin carries ALL loads. Efficient but denting destroys strength.\n\n**Semi-Monocoque (Modern):**\n- **Skin:** Carries pressure & shear.\n- **Frames:** Maintain shape (like ribs).\n- **Stringers:** Carry bending/axial loads.\n- Result: Damage tolerant and light.`
            },
            {
              title: 'Pressurization Physics',
              content: `**Why Pressurize?**\nAt 35,000 ft, air pressure is ~25% of sea level. Humans need ~8,000 ft equivalent or lower.\n\n**The Pressure Vessel:**\n The fuselage acts like a balloon.\n- **Differential Pressure (ΔP):** Difference between inside and outside air (typ. 8-9 psi).\n- **Hoop Stress:** Tension around the circumference (σ = PR/t).\n- **Fatigue:** Each flight pumps up and deflates the fuselage (cycle).`
            },
            {
              title: 'Structural Failure Modes',
              content: `**Things to Avoid:**\n\n1. **Fatigue Cracking:** Caused by cycles (Aloha Airlines 243).\n2. **Decompression:**\n   - **Slow:** Seal leak.\n   - **Rapid:** Lung damage risk, fog formation.\n   - **Explosive:** Structural failure.\n\n**Design Solutions:**\n- Rip-stop doublers (grids that stop cracks).\n- Window rounded corners (reduce stress risers).`
            }
          ],
          keyTakeaways: [
            'Semi-monocoque is the standard for modern aircraft',
            'Fuselage acts as a pressure vessel at altitude',
            'Hoop stress is the primary load from pressurization',
            'Square windows cause stress concentrations (Comet disasters)'
          ],
          quiz: {
            questions: [
              { id: 'q1', question: 'Most common modern fuselage structure:', options: ['Truss', 'Monocoque', 'Semi-monocoque', 'Solid beam'], correctAnswer: 2, explanation: 'Semi-monocoque combines skin, frames, and stringers for an optimal weight/strength ratio.' },
              { id: 'q2', question: 'Square windows were found to cause:', options: ['Better views', 'Stress risers & fatigue', 'Less drag', 'More weight'], correctAnswer: 1, explanation: 'The de Havilland Comet crashes proved square windows concentrate stress, leading to fatigue cracks.' },
              { id: 'q3', question: 'Hoop stress acts:', options: ['Lengthwise', 'Circumferentially', 'Vertically', 'Diagonally'], correctAnswer: 1, explanation: 'Hoop stress tries to pull the cylinder apart around its circumference.' }
            ]
          }
        },
        {
          id: 'landing-gear',
          title: 'Landing Gear Systems',
          duration: '35 min',
          xp: 200,
          description: 'Shock absorption, brakes, and retraction',
          aiTutor: true,
          introduction: 'Landing gear must withstand the brutal impact of landing, support the aircraft on ground, and disappear during flight to reduce drag.',
          sections: [
            {
              title: 'Gear Configurations',
              content: `**Types of Arrangements:**\n\n1. **Tricycle (Standard):**\n- Nose gear + 2 Main gear.\n- Stable on ground, easy to steer.\n- Allows braking in turns.\n\n2. **Taildragger (Conventional):**\n- 2 Main gear + Tail wheel.\n- Lighter, less drag.\n- Unstable on ground (prone to "ground loop").\n\n3. **Bicycle:**\n- Main gear in line (U-2 spy plane, B-52).\n- Requires outriggers.`
            },
            {
              title: 'Shock Absorption',
              content: `**Oleo-Pneumatic Strut:**\nThe standard for almost all aircraft.\n\n**How it works:**\n- **Gas (Nitrogen):** Acts as a spring (supports weight).\n- **Oil (Hydraulic Fluid):** Acts as a damper (absorbs impact energy).\n- When landing, oil is forced through small orifices, converting kinetic energy to heat.\n\n**Other Types:**\n- Rigid (Helicopter skids).\n- Spring Steel (Cessna 172).`
            },
            {
              title: 'Brakes & Retraction',
              content: `**Braking Systems:**\n- **Multi-disc stacks:** Stators (fixed) & Rotors (spinning).\n- **Carbon Brakes:** Lighter, handle higher heat than steel.\n- **Anti-Skid:** Like ABS on cars, prevents tire lockup (essential for jets).\n\n**Retraction:**\n- Uses hydraulic rams (or electric motors).\n- **Uplocks:** Hold gear up mechanically (so hydraulics can turn off).\n- **Emergency Extension:** Gravity drop or manual pump if systems fail.`
            }
          ],
          keyTakeaways: [
            'Tricycle gear is the most stable configuration',
            'Oleo struts use gas for spring and oil for damping',
            'Carbon brakes offer superior performance and weight savings',
            'Anti-skid systems prevent tires from blowing out'
          ],
          quiz: {
            questions: [
              { id: 'q1', question: 'The gas in an Oleo strut serves as:', options: ['The damper', 'The spring', 'The lubricant', 'The coolant'], correctAnswer: 1, explanation: 'Compressed nitrogen acts as the spring to support the aircraft weight.' },
              { id: 'q2', question: 'Tricycle gear is preferred because:', options: ['It is lighter', 'It is ground stable', 'It has less drag', 'It is cheaper'], correctAnswer: 1, explanation: 'Detailed analysis shows tricycle gear prevents ground loops, making it stable.' },
              { id: 'q3', question: 'Carbon brakes are better than steel because:', options: ['They are cheaper', 'They handle high heat & are lighter', 'They never wear out', 'They are quieter'], correctAnswer: 1, explanation: 'Carbon brakes maintain friction at high temps and save significant weight.' }
            ]
          }
        },
        {
          id: 'aerospace-materials',
          title: 'Aerospace Materials',
          duration: '30 min',
          xp: 175,
          description: 'Aluminum, composites, and future alloys',
          introduction: 'Material selection is a trade-off between strength, weight, cost, and temperature resistance. Modern aircraft are transitioning from metal to plastic (composites).',
          sections: [
            {
              title: 'Metals',
              content: `**Aluminum Alloys:**\n- **2024:** Tension (Lower Wing skins). Fatigue resistant.\n- **7075:** Compression (Upper Wing skins). Stronger but brittle.\n\n**Titanium:**\n- High strength-to-weight.\n- Heat resistant (used in engines/firewalls).\n- Compatible with carbon fiber (doesn't corrode).\n\n**Steel:**\n- Heavy but cheap and hard.\n- Used in landing gear and fasteners.`
            },
            {
              title: 'Composites',
              content: `**Carbon Fiber Reinforced Polymer (CFRP):**\n- **Pros:** 20% lighter than Al, infinite fatigue life, no corrosion, can be molded into complex shapes.\n- **Cons:** Expensive, hides damage (barely visible impact damage), hard to repair.\n\n**Honeycomb Cores:**\n- Sandwich structure (Face sheets + Core).\n- Incredible stiffness for low weight.\n- Used in floor panels and control surfaces.`
            },
            {
              title: 'Galvanic Corrosion',
              content: `**The Hidden Killer**\n\nWhen dissimilar metals touch in the presence of an electrolyte (water):\n- Setting up a battery.\n- Aluminum corrodes rapidly if touching Carbon or Steel.\n- Solution: Sealants, paint, or using Titanium fasteners.`
            }
          ],
          keyTakeaways: [
            'Aluminum 2024 and 7075 are the workhorses of metal aircraft',
            'Composites offer weight savings and fatigue resistance',
            'Titanium is used in high-heat areas and with composites',
            'Galvanic corrosion must be prevented by insulation'
          ],
          quiz: {
            questions: [
              { id: 'q1', question: 'Boeing 787 is primarily made of:', options: ['Aluminum', 'Steel', 'Titanium', 'Carbon Fiber Composite'], correctAnswer: 3, explanation: 'The 787 is ~50% composite by weight.' },
              { id: 'q2', question: 'Which metal is best for high heat (engines)?', options: ['Aluminum', 'Magnesium', 'Titanium', 'Zinc'], correctAnswer: 2, explanation: 'Titanium retains strength at high temperatures where aluminum would melt or weaken.' },
              { id: 'q3', question: 'Aluminum touching Carbon Fiber causes:', options: ['Stronger bond', 'Galvanic corrosion', 'Fire', 'Magnetic interference'], correctAnswer: 1, explanation: 'Carbon is cathodic to Aluminum, causing the aluminum to corrode rapidly.' }
            ]
          }
        },
        {
          id: 'structural-loads',
          title: 'Structural Loads & Fatigue',
          duration: '30 min',
          xp: 175,
          description: 'V-n diagrams, limit loads, and damage tolerance',
          introduction: 'How do engineers calculate if a wing will snap? It comes down to understanding the Flight Envelope and how materials eventually get tired.',
          sections: [
            {
              title: 'The V-n Diagram',
              content: `**Flight Envelope Map**\n- Plots Velocity (V) vs. Load Factor (n).\n- **Corner Velocity (Va):** Speed where you stall before you break the plane. (Maneuvering Speed).\n- **Vne:** Never Exceed speed (flutter risk).\n- **Limit Load:** Max expected load (2.5g for airliners).\n- **Ultimate Load:** Limit x 1.5 (Wing must hold for 3 seconds).`
            },
            {
              title: 'Fatigue & Damage Tolerance',
              content: `**Metal Fatigue:**\n- Repeated loading causes cracks to grow even below yield stress. (Like bending a paperclip).\n- **S-N Curve:** Stress vs Number of cycles.\n\n**Damage Tolerance Philosophy:**\n"We know cracks exist. We manage them."\n- Design structure so cracks grow slowly.\n- Inspect frequently enough to catch them before catastrophic failure.\n- Redundancy: Multiple load paths.`
            },
            {
              title: 'Stress Analysis Basics',
              content: `**Types of Stress:**\n1. **Tension:** Pulling apart.\n2. **Compression:** Crushing (Buckling risk).\n3. **Shear:** Sliding layers (Rivets).\n4. **Torsion:** Twisting.\n\n**Margin of Safety (MS):**\nMS = (Allowable Load / Applied Load) - 1\n- Must be positive (>0).`
            }
          ],
          keyTakeaways: [
            'Ultimate Load is 1.5x Limit Load',
            'Va (Maneuvering Speed) protects the structure from overstress',
            'Fatigue is the progressive growth of cracks under cyclic loads',
            'Damage tolerance relies on inspection and redundancy'
          ],
          quiz: {
            questions: [
              { id: 'q1', question: 'The Safety Factor for aircraft structures is typically:', options: ['1.1', '1.5', '2.0', '10.0'], correctAnswer: 1, explanation: 'Aviation standard is 1.5 (Ultimate Load = 1.5 x Limit Load).' },
              { id: 'q2', question: 'Maneuvering Speed (Va) allows:', options: ['Full control deflection without structural failure', 'Flying at Mach 1', 'Landing on short runways', 'Zero G flight'], correctAnswer: 0, explanation: 'Below Va, the wing will stall before generating enough force to bend the spar.' },
              { id: 'q3', question: 'Damage Tolerance assumes:', options: ['Materials are perfect', 'Cracks exist and must be managed', 'Planes never break', 'Only aluminum cracks'], correctAnswer: 1, explanation: 'It assumes flaws/cracks are present and ensures safety via inspection/redundancy.' }
            ]
          }
        }
      ]
    }
  ]
};

export default section1Structures;
