// Section 3: Structures & Materials
// 10 Lessons - Tanks, materials, loads, thermal protection

export const section3Structures = {
  id: 'structures',
  title: 'Unit 2: Structures',
  description: 'Rocket structures, materials, and thermal systems',
  icon: '🏗️',
  color: 'from-purple-500 to-indigo-500',
  units: [
    {
      id: 'structures-materials',
      title: 'Structures & Materials',
      description: 'Building rockets that survive extreme conditions',
      lessons: [
        {
          id: 'structural-loads',
          title: 'Structural Loads Analysis',
          duration: '30 min',
          xp: 175,
          description: 'Understanding forces on rocket structures',
          aiTutor: true,
          introduction: `Rockets experience extreme loads - 5g acceleration, aerodynamic forces, vibration, and thermal stress. Understanding these loads is essential for designing structures that survive launch.`,
          sections: [
            {
              title: 'Types of Loads',
              content: `**Axial Loads:**
- Thrust pushing up
- Weight pulling down
- Acceleration loads (F = ma)
- Peak at Max-Q and staging

**Bending Loads:**
- Wind and gusts
- Steering maneuvers
- Asymmetric thrust
- Creates tension on one side, compression on other

**Shear Loads:**
- Lateral forces
- Stage separation
- Payload attachment

**Pressure Loads:**
- Internal tank pressure (2-5 bar)
- External aerodynamic pressure
- Pressure differential across walls`
            },
            {
              title: 'Load Cases',
              content: `**Max-Q (Maximum Dynamic Pressure):**
- Highest aerodynamic load
- Occurs ~60-80 seconds after launch
- q = ½ρv² (dynamic pressure)
- Falcon 9 Max-Q: ~35 kPa

**Max Acceleration:**
- Near end of each stage burn
- Propellant depleted, thrust constant
- Falcon 9: ~4-5g at MECO

**Staging:**
- Explosive separation
- Shock loads
- Sudden load transfer

**Landing (Reusable):**
- Impact loads
- Leg deployment
- Falcon 9: ~3g landing load`
            },
            {
              title: 'Safety Factors',
              content: `**Factor of Safety (FoS):**
FoS = Allowable Stress / Applied Stress

**Typical Values:**
- Crewed vehicles: 1.4-1.5
- Uncrewed: 1.25-1.4
- Pressure vessels: 1.5-2.0

**Why Not Higher?**
Every extra kg of structure = less payload!

**Margin of Safety:**
MS = FoS - 1
MS > 0 means structure is adequate

**Example:**
- Material yield: 500 MPa
- Applied stress: 350 MPa
- FoS = 500/350 = 1.43 ✓
- MS = 0.43 (43% margin)`
            }
          ],
          keyTakeaways: [
            'Rockets face axial, bending, shear, and pressure loads',
            'Max-Q and max acceleration are critical design cases',
            'Safety factors balance reliability vs mass',
            'Typical FoS is 1.25-1.5 for rockets'
          ],
          quiz: {
            questions: [
              { id: 'q1', question: 'Max-Q occurs approximately:', options: ['At liftoff', '60-80 seconds after launch', 'At staging', 'In orbit'], correctAnswer: 1, explanation: 'Max-Q happens when velocity × air density is maximum, typically 60-80s.' },
              { id: 'q2', question: 'Typical safety factor for uncrewed rockets:', options: ['1.0', '1.25-1.4', '2.0-3.0', '5.0'], correctAnswer: 1, explanation: 'Uncrewed rockets use FoS of 1.25-1.4 to minimize mass.' },
              { id: 'q3', question: 'Bending loads are caused by:', options: ['Thrust', 'Wind and steering', 'Tank pressure', 'Payload weight'], correctAnswer: 1, explanation: 'Wind, gusts, and steering maneuvers create bending moments.' },
              { id: 'q4', question: 'Falcon 9 max acceleration is approximately:', options: ['1g', '2g', '4-5g', '10g'], correctAnswer: 2, explanation: 'Near MECO, with tanks nearly empty, acceleration reaches 4-5g.' },
              { id: 'q5', question: 'If FoS = 1.5, margin of safety is:', options: ['0.5', '1.5', '50%', '150%'], correctAnswer: 0, explanation: 'MS = FoS - 1 = 1.5 - 1 = 0.5 (or 50%).' }
            ]
          }
        },
        {

          id: 'tank-design',
          title: 'Propellant Tank Design',
          duration: '35 min',
          xp: 200,
          description: 'Designing tanks that hold cryogenic propellants',
          aiTutor: true,
          introduction: `Propellant tanks are the largest structures on a rocket and hold 85-90% of the vehicle mass. They must contain cryogenic fluids, withstand pressure and loads, and be as light as possible.`,
          sections: [
            {
              title: 'Tank Types',
              content: `**Monocoque:**
- Single-wall construction
- Tank wall carries all loads
- Simple but heavy
- Used in early rockets

**Semi-Monocoque:**
- Skin + stringers + frames
- Skin carries pressure, stringers carry axial load
- Most common design
- Falcon 9 uses this

**Isogrid:**
- Machined grid pattern
- Excellent strength-to-weight
- Expensive to manufacture
- Used in Atlas V, SLS

**Common Bulkhead:**
- Single wall between fuel and oxidizer
- Saves mass (one wall instead of two)
- Complex thermal management
- Used in Centaur, Saturn V S-II`
            },
            {
              title: 'Tank Materials',
              content: `**Aluminum Alloys (Most Common):**
- 2219: Good weldability, cryogenic
- 2195 Al-Li: 5% lighter, Falcon 9
- 7075: High strength, not weldable

**Stainless Steel:**
- 301/304: Starship tanks
- Stronger at cryo temps
- Heavier but cheaper
- Easier to manufacture

**Carbon Composites:**
- Highest strength-to-weight
- Challenging with cryogenics
- Permeability issues
- Future technology

**Wall Thickness:**
Thin! Falcon 9 tank walls: ~3-4 mm
That's thinner than a soda can (relative to size)!`
            },
            {
              title: 'Tank Pressurization',
              content: `**Why Pressurize?**
1. Prevent tank collapse (buckling)
2. Provide NPSH for turbopumps
3. Maintain structural rigidity

**Pressurization Methods:**
- **Helium:** Stored in COPVs, heated and expanded
- **Autogenous:** Use vaporized propellant
- **Heated helium:** More efficient expansion

**Typical Pressures:**
- LOX tank: 2-3 bar
- Fuel tank: 2-4 bar
- Helium storage: 300+ bar

**Falcon 9 Innovation:**
Uses supercooled propellants (densified)
- LOX at -207°C (vs -183°C normal)
- RP-1 chilled to -7°C
- 8% more propellant in same tank!`
            }
          ],
          keyTakeaways: [
            'Tank walls are incredibly thin - 3-4mm for Falcon 9',
            'Semi-monocoque and isogrid are common designs',
            'Aluminum alloys dominate; steel used in Starship',
            'Pressurization prevents buckling and feeds turbopumps'
          ],
          quiz: {
            questions: [
              { id: 'q1', question: 'Falcon 9 tank wall thickness is approximately:', options: ['10-15 mm', '3-4 mm', '1 mm', '20 mm'], correctAnswer: 1, explanation: 'Falcon 9 tanks are only 3-4mm thick - incredibly thin!' },
              { id: 'q2', question: 'Common bulkhead design:', options: ['Uses two separate walls', 'Shares wall between tanks', 'Has no bulkhead', 'Uses composite only'], correctAnswer: 1, explanation: 'Common bulkhead shares one wall between fuel and oxidizer tanks.' },
              { id: 'q3', question: 'Starship tanks use:', options: ['Aluminum', 'Carbon fiber', 'Stainless steel', 'Titanium'], correctAnswer: 2, explanation: 'Starship uses 301/304 stainless steel - stronger at cryo temps.' },
              { id: 'q4', question: 'Tank pressurization prevents:', options: ['Overheating', 'Buckling', 'Leaks', 'Corrosion'], correctAnswer: 1, explanation: 'Pressure keeps thin tank walls from buckling under load.' },
              { id: 'q5', question: 'Falcon 9 densifies propellants by:', options: ['Heating them', 'Supercooling them', 'Pressurizing them', 'Adding chemicals'], correctAnswer: 1, explanation: 'Supercooling increases density, fitting 8% more propellant.' }
            ]
          }
        },
        {
          id: 'aerospace-materials',
          title: 'Aerospace Materials Deep Dive',
          duration: '30 min',
          xp: 175,
          description: 'Advanced materials for rocket applications',
          aiTutor: true,
          introduction: `Material selection can make or break a rocket design. The right material in the right place saves mass, improves performance, and ensures survival. Let's explore aerospace materials in depth.`,
          sections: [
            {
              title: 'Aluminum Alloys',
              content: `**2000 Series (Al-Cu):**
- 2024: Aircraft standard, good fatigue
- 2219: Excellent weldability, cryogenic
- 2195 Al-Li: Lightest, used in Falcon 9

**6000 Series (Al-Mg-Si):**
- 6061: General purpose, weldable
- Lower strength than 2000/7000

**7000 Series (Al-Zn):**
- 7075: Highest strength aluminum
- NOT weldable (riveted/bolted)
- Used in aircraft, some rocket parts

**Cryogenic Behavior:**
Most aluminum gets STRONGER when cold!
- 2219 at -196°C: +20% yield strength
- No brittle transition (unlike some steels)`
            },
            {
              title: 'High-Temperature Materials',
              content: `**Nickel Superalloys:**
- Inconel 718: Up to 700°C
- Inconel 625: Excellent corrosion resistance
- Used in combustion chambers, turbines

**Refractory Metals:**
- Tungsten: Highest melting point (3,422°C)
- Molybdenum: Good high-temp strength
- Niobium: Used in nozzle extensions

**Ceramics:**
- Silicon carbide: Thermal protection
- Carbon-carbon: Shuttle nose, leading edges
- Withstand 1,600°C+

**Ablatives:**
- PICA (Phenolic Impregnated Carbon Ablator)
- Chars and carries heat away
- Used in heat shields`
            },
            {
              title: 'Composites',
              content: `**Carbon Fiber Reinforced Polymer (CFRP):**
- Strength-to-weight: 5-10x steel
- Used in fairings, interstages
- Temperature limited (~150°C)

**Layup Design:**
- Fibers oriented for load paths
- [0/±45/90] typical layup
- Quasi-isotropic for general loads

**Challenges:**
- Cryogenic permeability
- Impact damage sensitivity
- Expensive manufacturing
- Difficult to inspect

**Applications:**
- Payload fairings (Falcon, Atlas)
- Interstages
- Pressure vessels (COPVs)
- Future: Cryogenic tanks?`
            }
          ],
          keyTakeaways: [
            'Aluminum alloys are workhorses - 2219 for cryo, 7075 for strength',
            'Nickel superalloys survive combustion chamber temperatures',
            'Composites offer best strength-to-weight but have limitations',
            'Material selection is always a trade-off'
          ],
          quiz: {
            questions: [
              { id: 'q1', question: 'Which aluminum alloy is used in Falcon 9 tanks?', options: ['6061', '7075', '2195 Al-Li', '2024'], correctAnswer: 2, explanation: '2195 Al-Li is lightest aluminum alloy, used in Falcon 9.' },
              { id: 'q2', question: 'At cryogenic temperatures, aluminum:', options: ['Gets weaker', 'Gets stronger', 'Becomes brittle', 'Melts'], correctAnswer: 1, explanation: 'Aluminum alloys gain ~20% strength at cryogenic temps.' },
              { id: 'q3', question: 'Inconel is used in:', options: ['Tanks', 'Fairings', 'Combustion chambers', 'Payload adapters'], correctAnswer: 2, explanation: 'Inconel survives high temperatures in combustion chambers.' },
              { id: 'q4', question: 'CFRP is limited by:', options: ['Strength', 'Temperature (~150°C)', 'Weight', 'Cost only'], correctAnswer: 1, explanation: 'Carbon fiber composites degrade above ~150°C.' },
              { id: 'q5', question: 'Highest melting point metal is:', options: ['Steel', 'Titanium', 'Tungsten', 'Aluminum'], correctAnswer: 2, explanation: 'Tungsten melts at 3,422°C - highest of any metal.' }
            ]
          }
        },
    
    {
          id: 'thermal-protection',
          title: 'Thermal Protection Systems',
          duration: '30 min',
          xp: 175,
          description: 'Protecting rockets from extreme heat',
          aiTutor: true,
          introduction: `Rockets face extreme temperatures - from -253°C cryogenic propellants to 1,600°C+ during reentry. Thermal protection systems (TPS) keep structures and payloads safe.`,
          sections: [
            {
              title: 'Heat Sources',
              content: `**Aerodynamic Heating:**
- Air compression during ascent
- Worse at high speed + dense air
- Max heating near Max-Q

**Reentry Heating:**
- Returning from orbit at 7.8 km/s
- Air can't move out of the way fast enough
- Compression heats air to plasma (>10,000 K)
- Peak heating: 1,600°C+ on surfaces

**Engine Heat:**
- Combustion at 3,400 K
- Exhaust plume radiation
- Conducted through structure

**Solar Heating:**
- In space, sun side gets hot
- Shadow side gets cold
- Large thermal gradients`
            },
            {
              title: 'TPS Types',
              content: `**Ablative:**
- Material burns/vaporizes away
- Carries heat with it
- Single use
- Used: Apollo, Dragon heat shields
- Materials: PICA, SLA-561V

**Reusable Surface Insulation:**
- Ceramic tiles
- Radiate heat away
- Multiple use
- Used: Space Shuttle, Starship
- Materials: Silica tiles, TUFROC

**Active Cooling:**
- Circulate coolant through structure
- Used in engine nozzles
- Regenerative cooling

**Insulation:**
- Foam, MLI (multi-layer insulation)
- Prevents heat transfer
- Used on cryogenic tanks`
            },
            {
              title: 'Starship TPS',
              content: `**Hexagonal Tiles:**
- Ceramic material
- ~18,000 tiles per Starship
- Mechanically attached (not glued)
- Designed for rapid replacement

**Transpiration Cooling (Future):**
- Propellant seeps through porous steel
- Evaporates, carrying heat away
- Could reduce/eliminate tiles

**Design Philosophy:**
- Tiles on windward (hot) side
- Bare steel on leeward side
- Steel radiates heat effectively
- Simpler than Shuttle approach

**Reentry Profile:**
- Belly-flop orientation
- Maximum drag, minimum heating
- Flip and land vertically`
            }
          ],
          keyTakeaways: [
            'Reentry heating can exceed 1,600°C',
            'Ablative TPS burns away, carrying heat with it',
            'Reusable TPS uses ceramic tiles that radiate heat',
            'Starship uses hexagonal tiles on windward side'
          ],
          quiz: {
            questions: [
              { id: 'q1', question: 'Peak reentry temperature can exceed:', options: ['500°C', '1,000°C', '1,600°C', '5,000°C'], correctAnswer: 2, explanation: 'Surface temperatures exceed 1,600°C during orbital reentry.' },
              { id: 'q2', question: 'Ablative TPS works by:', options: ['Reflecting heat', 'Burning away and carrying heat', 'Conducting heat inside', 'Absorbing all heat'], correctAnswer: 1, explanation: 'Ablative material vaporizes, carrying heat away with it.' },
              { id: 'q3', question: 'Space Shuttle used:', options: ['Ablative TPS', 'Ceramic tiles', 'No TPS', 'Water cooling'], correctAnswer: 1, explanation: 'Shuttle used ~24,000 silica ceramic tiles for reusable TPS.' },
              { id: 'q4', question: 'Starship has approximately how many tiles?', options: ['1,000', '5,000', '18,000', '50,000'], correctAnswer: 2, explanation: 'Starship uses ~18,000 hexagonal ceramic tiles.' },
              { id: 'q5', question: 'Starship reentry orientation is:', options: ['Nose first', 'Engines first', 'Belly flop', 'Spinning'], correctAnswer: 2, explanation: 'Starship reenters belly-first for maximum drag and minimum heating.' }
            ]
          }
        },
        {
          id: 'structural-testing',
          title: 'Structural Testing',
          duration: '25 min',
          xp: 150,
          description: 'Proving structures can survive flight',
          aiTutor: true,
          introduction: `Before a rocket flies, its structures must be tested to prove they can handle flight loads. From small coupons to full-scale tanks, testing validates designs and finds weaknesses.`,
          sections: [
            {
              title: 'Test Types',
              content: `**Coupon Testing:**
- Small material samples
- Tensile, compression, fatigue
- Establishes material properties
- Thousands of tests

**Component Testing:**
- Individual parts (joints, fittings)
- Validates design details
- Finds stress concentrations

**Subassembly Testing:**
- Tank domes, barrel sections
- Pressure testing
- Proof and burst tests

**Full-Scale Testing:**
- Complete stage or vehicle
- Ultimate load testing
- May test to destruction`
            },
            {
              title: 'Test Methods',
              content: `**Static Load Testing:**
- Apply loads slowly
- Measure deflection and strain
- Compare to predictions
- Test to 1.0x, 1.25x, 1.4x limit load

**Pressure Testing:**
- Proof test: 1.1-1.25x operating pressure
- Burst test: Find actual failure pressure
- Leak testing: Helium detection

**Vibration Testing:**
- Shake table simulation
- Random vibration spectrum
- Sine sweep to find resonances

**Thermal Testing:**
- Thermal vacuum chambers
- Simulate space environment
- Verify insulation performance`
            },
            {
              title: 'Qualification Philosophy',
              content: `**Test Like You Fly:**
- Test conditions match flight
- Same materials, processes
- Realistic load combinations

**Qualification vs Acceptance:**
- Qualification: Prove design (higher loads)
- Acceptance: Verify each unit (lower loads)

**Analysis Correlation:**
- Compare test results to FEA predictions
- Adjust models if needed
- Build confidence in analysis

**SpaceX Approach:**
- Test early, test often
- Learn from failures
- Starship: Multiple test tanks burst
- Each failure improves design`
            }
          ],
          keyTakeaways: [
            'Testing progresses from coupons to full-scale',
            'Proof testing verifies each unit; qualification proves design',
            'Vibration and thermal testing simulate flight environment',
            'Test like you fly - realistic conditions essential'
          ],
          quiz: {
            questions: [
              { id: 'q1', question: 'Coupon testing establishes:', options: ['Flight loads', 'Material properties', 'Aerodynamics', 'Cost'], correctAnswer: 1, explanation: 'Coupon tests determine tensile strength, fatigue life, etc.' },
              { id: 'q2', question: 'Proof pressure is typically:', options: ['0.5x operating', '1.0x operating', '1.1-1.25x operating', '2.0x operating'], correctAnswer: 2, explanation: 'Proof testing uses 1.1-1.25x operating pressure.' },
              { id: 'q3', question: 'Qualification testing uses:', options: ['Lower loads than flight', 'Same loads as flight', 'Higher loads than flight', 'No loads'], correctAnswer: 2, explanation: 'Qualification tests to higher loads to prove design margin.' },
              { id: 'q4', question: 'Vibration testing simulates:', options: ['Reentry heating', 'Launch environment', 'Landing', 'Orbital debris'], correctAnswer: 1, explanation: 'Shake tables simulate vibration during launch.' },
              { id: 'q5', question: 'SpaceX structural testing philosophy:', options: ['Minimal testing', 'Test early and often', 'Only computer simulation', 'Test once'], correctAnswer: 1, explanation: 'SpaceX tests early, learns from failures, iterates rapidly.' }
            ]
          }
        },

        {
          id: 'stage-separation',
          title: 'Stage Separation Systems',
          duration: '25 min',
          xp: 150,
          description: 'Cleanly separating rocket stages',
          aiTutor: true,
          introduction: `Stage separation is one of the most critical events in a launch. In milliseconds, stages must separate cleanly without collision or damage. Failure means mission loss.`,
          sections: [
            {
              title: 'Separation Methods',
              content: `**Explosive Bolts:**
- Pyrotechnic charge severs bolt
- Simple, reliable
- Single use
- Used in most rockets

**Linear Shaped Charge:**
- Explosive cuts through structure
- Clean separation line
- Used for large diameter stages

**Pneumatic Pushers:**
- Compressed gas pistons
- Push stages apart
- Provide separation velocity
- Often combined with explosive bolts

**Cold Gas Thrusters:**
- Small thrusters fire to separate
- Precise control
- Used on upper stages`
            },
            {
              title: 'Separation Sequence',
              content: `**Typical Sequence (Falcon 9):**
1. T+0.0s: MECO (Main Engine Cutoff)
2. T+0.5s: Stage separation command
3. T+0.6s: Pneumatic pushers fire
4. T+1.0s: Stages 3m apart
5. T+3.0s: Second stage ignition
6. T+4.0s: First stage flip maneuver

**Critical Timing:**
- Too early: Collision risk
- Too late: Trajectory error
- Millisecond precision required

**Separation Velocity:**
- Typically 1-3 m/s relative
- Must clear before S2 ignition
- Pushers sized for this`
            },
            {
              title: 'Interstage Design',
              content: `**Functions:**
- Connect stages structurally
- House separation system
- Protect second stage engine
- Contain avionics

**Falcon 9 Interstage:**
- Carbon composite construction
- 3.7m diameter
- Houses pneumatic pushers
- Stays with first stage (for landing)

**Design Considerations:**
- Stiffness for load transfer
- Access for integration
- Venting for pressure equalization
- Thermal protection from S2 engine

**Fairing Separation:**
- Similar principles
- Pneumatic or spring pushers
- Must clear payload
- Falcon 9: Fairings recovered and reused`
            }
          ],
          keyTakeaways: [
            'Explosive bolts and pneumatic pushers are common',
            'Separation sequence is millisecond-precise',
            'Stages must clear before next stage ignites',
            'Interstage connects stages and houses separation system'
          ],
          quiz: {
            questions: [
              { id: 'q1', question: 'Most common separation method is:', options: ['Magnetic release', 'Explosive bolts', 'Melting joints', 'Manual release'], correctAnswer: 1, explanation: 'Explosive bolts are simple, reliable, and widely used.' },
              { id: 'q2', question: 'Typical separation velocity is:', options: ['0.1 m/s', '1-3 m/s', '10-20 m/s', '100 m/s'], correctAnswer: 1, explanation: 'Pneumatic pushers provide 1-3 m/s relative velocity.' },
              { id: 'q3', question: 'Second stage ignites how long after separation?', options: ['Immediately', '1-3 seconds', '30 seconds', '5 minutes'], correctAnswer: 1, explanation: 'S2 ignites 1-3 seconds after separation, once clear.' },
              { id: 'q4', question: 'Falcon 9 interstage is made of:', options: ['Aluminum', 'Steel', 'Carbon composite', 'Titanium'], correctAnswer: 2, explanation: 'Falcon 9 interstage is carbon fiber composite.' },
              { id: 'q5', question: 'Falcon 9 interstage stays with:', options: ['Second stage', 'First stage', 'Neither - jettisoned', 'Payload'], correctAnswer: 1, explanation: 'Interstage remains attached to first stage for landing.' }
            ]
          }
        },
        {
          id: 'payload-fairings',
          title: 'Payload Fairings',
          duration: '25 min',
          xp: 150,
          description: 'Protecting payloads during ascent',
          aiTutor: true,
          introduction: `The payload fairing protects satellites from aerodynamic forces, heating, and acoustic vibration during ascent. Once above the atmosphere, it's jettisoned to save mass.`,
          sections: [
            {
              title: 'Fairing Functions',
              content: `**Protection From:**
- Aerodynamic loads (Max-Q)
- Aerodynamic heating
- Acoustic vibration (140+ dB!)
- Rain and debris

**Design Requirements:**
- Aerodynamic shape (low drag)
- Structural strength
- Acoustic attenuation
- Clean separation
- Minimum mass

**Typical Construction:**
- Composite sandwich panels
- Aluminum honeycomb core
- Carbon fiber face sheets
- Acoustic blankets inside`
            },
            {
              title: 'Fairing Sizes',
              content: `**Falcon 9:**
- Diameter: 5.2 m
- Length: 13.1 m
- Mass: ~1,900 kg
- Payload volume: 145 m³

**Atlas V:**
- Diameter: 4.2 m or 5.4 m
- Length: 12-26 m (configurable)

**Ariane 5:**
- Diameter: 5.4 m
- Length: 17 m

**Starship:**
- Diameter: 9 m
- Largest ever!
- Integrated with vehicle

**Fairing Cost:**
- Falcon 9 fairing: ~$6 million
- Worth recovering!`
            },
            {
              title: 'Fairing Recovery',
              content: `**Why Recover?**
- $6M per fairing
- 2 halves = $12M total
- Significant cost savings

**SpaceX Approach:**
1. Fairing separates at ~110 km
2. Cold gas thrusters orient for reentry
3. Parachute deploys
4. GPS-guided parafoil
5. Ship catches with net (or water landing)

**Challenges:**
- Survives reentry heating
- Precise splashdown location
- Salt water damage
- Refurbishment between flights

**Success Rate:**
- Now routine for SpaceX
- Fairings reused multiple times
- Saves ~$6M per flight`
            }
          ],
          keyTakeaways: [
            'Fairings protect payloads from aero loads, heat, and acoustics',
            'Composite sandwich construction is standard',
            'Falcon 9 fairing costs ~$6M - worth recovering',
            'SpaceX routinely recovers and reuses fairings'
          ],
          quiz: {
            questions: [
              { id: 'q1', question: 'Fairing jettison occurs:', options: ['At liftoff', 'At Max-Q', 'Above atmosphere (~110 km)', 'In orbit'], correctAnswer: 2, explanation: 'Fairings jettison once above atmosphere where protection not needed.' },
              { id: 'q2', question: 'Falcon 9 fairing diameter is:', options: ['3.7 m', '5.2 m', '9 m', '12 m'], correctAnswer: 1, explanation: 'Falcon 9 fairing is 5.2m diameter, 13.1m long.' },
              { id: 'q3', question: 'Acoustic levels during launch can exceed:', options: ['100 dB', '120 dB', '140 dB', '180 dB'], correctAnswer: 2, explanation: 'Launch acoustics exceed 140 dB - extremely loud!' },
              { id: 'q4', question: 'Falcon 9 fairing cost is approximately:', options: ['$100,000', '$1 million', '$6 million', '$20 million'], correctAnswer: 2, explanation: 'Each fairing half costs ~$3M, total ~$6M.' },
              { id: 'q5', question: 'SpaceX recovers fairings using:', options: ['Helicopter', 'Parachute and ship', 'Propulsive landing', 'Airplane catch'], correctAnswer: 1, explanation: 'Fairings use parachutes and are caught by ships or land in water.' }
            ]
          }
        },
 
       {
          id: 'landing-systems',
          title: 'Landing Systems',
          duration: '30 min',
          xp: 175,
          description: 'How reusable rockets land',
          aiTutor: true,
          introduction: `Landing a rocket booster is one of the most impressive engineering achievements of our time. From landing legs to grid fins, let's explore the systems that make reusability possible.`,
          sections: [
            {
              title: 'Landing Legs',
              content: `**Falcon 9 Landing Legs:**
- 4 legs, carbon fiber/aluminum
- Stowed against body during ascent
- Deploy pneumatically before landing
- Crush core absorbs impact energy
- Span: 18m when deployed

**Design Requirements:**
- Lightweight (every kg counts!)
- Reliable deployment
- Absorb landing loads (~3g)
- Stable on uneven surfaces

**Starship Legs (Planned):**
- 6 legs
- Much larger scale
- Must support 100+ ton vehicle

**Alternative: Mechazilla**
- Catch booster with tower arms
- No legs needed on booster
- Saves mass
- Higher precision required`
            },
            {
              title: 'Grid Fins',
              content: `**Purpose:**
- Aerodynamic control during descent
- Steer booster to landing site
- Work in subsonic and supersonic flow

**Falcon 9 Grid Fins:**
- 4 fins, titanium construction
- 1.5m × 1.2m each
- Withstand reentry heating
- Hydraulically actuated

**How They Work:**
- Create lift/drag asymmetry
- Tilt to steer left/right/forward/back
- Very effective at high angles of attack
- Work even in turbulent flow

**Evolution:**
- Original: Aluminum, single use
- Current: Titanium, reusable
- Titanium survives reentry heat`
            },
            {
              title: 'Landing Sequence',
              content: `**Falcon 9 RTLS (Return to Launch Site):**
1. Stage separation
2. Boostback burn (flip and return)
3. Grid fins deploy
4. Entry burn (3 engines, slow down)
5. Aerodynamic guidance (grid fins)
6. Landing burn (1 engine)
7. Legs deploy
8. Touchdown at ~2 m/s

**Drone Ship Landing:**
- No boostback burn (saves fuel)
- Longer downrange trajectory
- Ship positions itself
- Same entry and landing burns

**Precision:**
- Landing accuracy: <1 meter
- Velocity at touchdown: ~2 m/s
- Tilt tolerance: <5°

**Success Rate:**
- Now >95% success
- Over 200 successful landings`
            }
          ],
          keyTakeaways: [
            'Landing legs deploy pneumatically, absorb ~3g impact',
            'Grid fins provide aerodynamic steering during descent',
            'Landing sequence: boostback → entry burn → landing burn',
            'Falcon 9 achieves <1m landing accuracy'
          ],
          quiz: {
            questions: [
              { id: 'q1', question: 'Falcon 9 has how many landing legs?', options: ['3', '4', '6', '8'], correctAnswer: 1, explanation: 'Falcon 9 uses 4 landing legs.' },
              { id: 'q2', question: 'Grid fins are made of:', options: ['Aluminum', 'Carbon fiber', 'Titanium', 'Steel'], correctAnswer: 2, explanation: 'Current Falcon 9 grid fins are titanium - survives reentry heat.' },
              { id: 'q3', question: 'Landing touchdown velocity is approximately:', options: ['0 m/s', '2 m/s', '10 m/s', '50 m/s'], correctAnswer: 1, explanation: 'Falcon 9 touches down at ~2 m/s - very gentle.' },
              { id: 'q4', question: 'Falcon 9 landing accuracy is:', options: ['~100 m', '~10 m', '<1 m', '~1 km'], correctAnswer: 2, explanation: 'Falcon 9 lands within 1 meter of target - incredible precision.' },
              { id: 'q5', question: 'Mechazilla catches boosters using:', options: ['Net', 'Tower arms', 'Parachute', 'Water landing'], correctAnswer: 1, explanation: 'Mechazilla uses tower-mounted arms to catch Super Heavy booster.' }
            ]
          }
        },
        {
          id: 'mass-optimization',
          title: 'Mass Optimization',
          duration: '30 min',
          xp: 175,
          description: 'Every gram counts in rocket design',
          aiTutor: true,
          introduction: `In rocket design, mass is the enemy. Every kilogram of structure is one less kilogram of payload. Engineers obsess over mass optimization - it's the difference between reaching orbit and falling short.`,
          sections: [
            {
              title: 'Why Mass Matters',
              content: `**The Rocket Equation Impact:**
Δv = vₑ × ln(m₀/mf)

**Example: 1 kg saved in structure**
- Falcon 9 to LEO
- 1 kg structure saved = ~1 kg more payload
- At $2,700/kg, that's $2,700 per kg saved!

**Mass Ratio:**
- Typical: 20-25 for LEO
- Structure fraction: 5-10%
- Propellant: 85-90%
- Payload: 2-4%

**Every gram matters!**
Engineers track mass to the gram level.`
            },
            {
              title: 'Mass Reduction Techniques',
              content: `**Material Selection:**
- Use highest specific strength materials
- Al-Li instead of standard aluminum (5% lighter)
- Composites where appropriate

**Structural Optimization:**
- Isogrid patterns (remove unnecessary material)
- Topology optimization (computer-designed shapes)
- Minimum gauge (thinnest possible walls)

**System Integration:**
- Common bulkheads (one wall, not two)
- Integrated structures (tank = airframe)
- Eliminate redundancy where safe

**Manufacturing:**
- Friction stir welding (lighter than rivets)
- 3D printing (optimized shapes)
- Composite layup (tailored strength)`
            },
            {
              title: 'Mass Budget Management',
              content: `**Mass Budget:**
Detailed tracking of every component mass.

**Categories:**
- Structures
- Propulsion
- Avionics
- Thermal
- Mechanisms
- Margin

**Margin Management:**
- Early design: 15-20% margin
- PDR: 10-15% margin
- CDR: 5-10% margin
- Flight: 0% margin (all allocated)

**Mass Growth:**
- Designs typically grow 10-20%
- Must plan for this!
- "Mass is the enemy"

**Trade Studies:**
- Performance vs mass
- Reliability vs mass
- Cost vs mass
- Always optimizing!`
            }
          ],
          keyTakeaways: [
            '1 kg structure saved ≈ 1 kg more payload',
            'Material selection and structural optimization are key',
            'Mass budgets track every gram throughout development',
            'Designs typically grow 10-20% - plan margin accordingly'
          ],
          quiz: {
            questions: [
              { id: 'q1', question: 'Typical rocket structure fraction is:', options: ['1-2%', '5-10%', '20-30%', '50%'], correctAnswer: 1, explanation: 'Structure is only 5-10% of rocket mass - rest is propellant.' },
              { id: 'q2', question: 'Al-Li alloy is lighter than standard aluminum by:', options: ['1%', '5%', '20%', '50%'], correctAnswer: 1, explanation: 'Aluminum-lithium alloys are ~5% lighter than standard aluminum.' },
              { id: 'q3', question: 'Isogrid reduces mass by:', options: ['Adding material', 'Removing unnecessary material', 'Using heavier alloys', 'Increasing thickness'], correctAnswer: 1, explanation: 'Isogrid machines away material not needed for load paths.' },
              { id: 'q4', question: 'Early design mass margin should be:', options: ['0%', '5%', '15-20%', '50%'], correctAnswer: 2, explanation: 'Early designs need 15-20% margin for inevitable mass growth.' },
              { id: 'q5', question: 'Designs typically grow in mass by:', options: ['0%', '5%', '10-20%', '50%'], correctAnswer: 2, explanation: 'Rocket designs typically grow 10-20% during development.' }
            ]
          }
        },
        {
          id: 'manufacturing',
          title: 'Rocket Manufacturing',
          duration: '30 min',
          xp: 175,
          description: 'Building rockets at scale',
          aiTutor: true,
          introduction: `Building a rocket is an incredible manufacturing challenge. From welding thin aluminum tanks to laying up composite fairings, every process must be precise and repeatable.`,
          sections: [
            {
              title: 'Tank Manufacturing',
              content: `**Friction Stir Welding (FSW):**
- Solid-state joining process
- No melting - stronger joint
- Used for tank barrel sections
- SpaceX, Blue Origin, NASA all use FSW

**Process:**
1. Roll aluminum sheet into cylinder
2. FSW longitudinal seam
3. FSW circumferential seams
4. Spin-form dome ends
5. Weld domes to barrel

**Quality Control:**
- X-ray inspection of welds
- Dye penetrant testing
- Proof pressure testing
- Every weld inspected!`
            },
            {
              title: 'Composite Manufacturing',
              content: `**Automated Fiber Placement (AFP):**
- Robot lays carbon fiber tape
- Precise fiber orientation
- Consistent quality
- Used for fairings, interstages

**Hand Layup:**
- Manual placement of plies
- Complex shapes
- Labor intensive
- Still used for some parts

**Autoclave Curing:**
- Heat + pressure consolidates part
- 120-180°C, 6-7 bar
- Large autoclaves expensive
- Out-of-autoclave methods emerging

**Inspection:**
- Ultrasonic testing
- Tap testing
- X-ray/CT scanning`
            },
            {
              title: 'Production Rate',
              content: `**Traditional Aerospace:**
- 1-2 rockets per year
- Artisan manufacturing
- Very expensive

**SpaceX Revolution:**
- 50+ Falcon 9s per year
- Assembly line approach
- Vertical integration
- Dramatically lower cost

**Starship Production:**
- Goal: 1 ship per week
- Shipyard-style manufacturing
- Stainless steel (easier to work)
- Rapid iteration

**Key Innovations:**
- 3D printed engine components
- Automated welding
- Standardized processes
- In-house manufacturing`
            }
          ],
          keyTakeaways: [
            'Friction stir welding creates strong tank joints',
            'Automated fiber placement enables consistent composites',
            'SpaceX produces 50+ rockets/year - revolutionary rate',
            'Vertical integration and automation reduce costs'
          ],
          quiz: {
            questions: [
              { id: 'q1', question: 'Friction stir welding is:', options: ['Melting metals together', 'Solid-state joining', 'Gluing', 'Riveting'], correctAnswer: 1, explanation: 'FSW joins metals without melting - stronger than fusion welding.' },
              { id: 'q2', question: 'SpaceX produces approximately how many Falcon 9s per year?', options: ['5', '20', '50+', '200'], correctAnswer: 2, explanation: 'SpaceX produces 50+ Falcon 9 rockets per year.' },
              { id: 'q3', question: 'Autoclave curing uses:', options: ['Cold and vacuum', 'Heat and pressure', 'UV light', 'Chemicals'], correctAnswer: 1, explanation: 'Autoclaves use heat (120-180°C) and pressure (6-7 bar).' },
              { id: 'q4', question: 'Starship production goal is:', options: ['1 per year', '1 per month', '1 per week', '1 per day'], correctAnswer: 2, explanation: 'SpaceX targets 1 Starship per week production rate.' },
              { id: 'q5', question: 'Traditional aerospace produced:', options: ['1-2 rockets/year', '10 rockets/year', '50 rockets/year', '100 rockets/year'], correctAnswer: 0, explanation: 'Traditional aerospace built only 1-2 rockets per year.' }
            ]
          }
        }
      ]
    }
  ]
};

export default section3Structures;