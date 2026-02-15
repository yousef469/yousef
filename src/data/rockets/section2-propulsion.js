// Section 2: Rocket Propulsion
// 10 Lessons - Engine types, fuels, combustion, nozzles

export const section2Propulsion = {
  id: 'propulsion',
  title: 'Unit 1: Propulsion',
  description: 'Master rocket engines, fuels, and combustion',
  icon: '🔥',
  color: 'from-orange-500 to-red-500',
  units: [
    {
      id: 'engines',
      title: 'Rocket Engines',
      description: 'How rocket engines generate thrust',
      lessons: [
        {
          id: 'liquid-engines',
          title: 'Liquid Rocket Engines',
          duration: '35 min',
          xp: 200,
          description: 'The workhorses of spaceflight',
          aiTutor: true,
          introduction: `Liquid engines power most orbital rockets. They're complex but offer the best performance and control. From the Saturn V F-1 to SpaceX Raptor, liquid engines have taken humanity to the Moon and beyond.`,
          sections: [
            {
              title: 'How Liquid Engines Work',
              content: `**Basic Process:**
1. Pump fuel and oxidizer from tanks
2. Inject into combustion chamber
3. Ignite and burn at 3,000+ K
4. Expand hot gas through nozzle
5. Exhaust exits at 2,500-4,500 m/s

**Key Components:**
- **Turbopump:** Pressurizes propellants (up to 500+ bar!)
- **Injector:** Mixes fuel and oxidizer
- **Chamber:** Where combustion happens
- **Nozzle:** Accelerates exhaust

**Advantages:**
- Highest Isp (300-450 s)
- Can throttle (10-100%)
- Can restart multiple times
- Precise control`
            },
            {
              title: 'Engine Cycles',
              content: `**Gas Generator Cycle (Merlin, F-1)**
- Some propellant burns to drive turbopump
- Turbine exhaust dumped overboard
- Simple, reliable, ~95% efficient
- Isp loss from dumped gas

**Staged Combustion (Raptor, RD-180)**
- ALL propellant goes through main chamber
- Preburner drives turbopump
- Complex but ~99% efficient
- Highest performance

**Expander Cycle (RL-10)**
- Fuel heated by nozzle drives turbopump
- No preburner needed
- Limited to hydrogen (needs heat capacity)
- Very efficient, lower thrust

**Pressure-Fed (Draco)**
- Helium pushes propellant
- No turbopump - simple!
- Limited chamber pressure
- Good for small engines`
            },
            {
              title: 'Famous Liquid Engines',
              content: `**Merlin 1D (SpaceX)**
- Cycle: Gas generator
- Propellant: RP-1/LOX
- Thrust: 845 kN (sea level)
- Isp: 282s SL / 311s vac
- Reusable: 10+ flights

**Raptor (SpaceX)**
- Cycle: Full-flow staged combustion
- Propellant: CH4/LOX
- Thrust: 2,300 kN
- Isp: 327s SL / 363s vac
- Most advanced engine ever

**RS-25 (Space Shuttle)**
- Cycle: Staged combustion
- Propellant: LH2/LOX
- Thrust: 2,090 kN (vacuum)
- Isp: 452s vacuum
- Flew 135 shuttle missions`
            }
          ],
          keyTakeaways: [
            'Liquid engines offer highest performance and control',
            'Gas generator is simple; staged combustion is most efficient',
            'Turbopumps are engineering marvels - 500+ bar pressure',
            'Modern engines like Raptor achieve unprecedented efficiency'
          ],
          quiz: {
            questions: [
              { id: 'q1', question: 'Which engine cycle is most efficient?', options: ['Gas generator', 'Staged combustion', 'Pressure-fed', 'Expander'], correctAnswer: 1, explanation: 'Staged combustion routes all propellant through main chamber - ~99% efficient.' },
              { id: 'q2', question: 'Merlin engine uses which cycle?', options: ['Staged combustion', 'Gas generator', 'Expander', 'Pressure-fed'], correctAnswer: 1, explanation: 'Merlin uses gas generator cycle - simpler and reliable.' },
              { id: 'q3', question: 'What drives the turbopump in a gas generator cycle?', options: ['Electric motor', 'Burning some propellant', 'Compressed air', 'Solar power'], correctAnswer: 1, explanation: 'A small amount of propellant burns in the gas generator to drive turbines.' },
              { id: 'q4', question: 'Raptor engine uses which propellant?', options: ['RP-1/LOX', 'LH2/LOX', 'CH4/LOX', 'Hypergolic'], correctAnswer: 2, explanation: 'Raptor uses methane/oxygen - good for Mars ISRU.' },
              { id: 'q5', question: 'Liquid engines can typically throttle to:', options: ['Only 100%', '50-100%', '10-100%', 'Cannot throttle'], correctAnswer: 2, explanation: 'Modern liquid engines throttle from ~10% to 100% thrust.' }
            ]
          }
        },
        
{
          id: 'solid-rockets',
          title: 'Solid Rocket Motors',
          duration: '30 min',
          xp: 175,
          description: 'Simple, powerful, and reliable',
          aiTutor: true,
          introduction: `Solid rockets are the simplest and oldest type. Mix fuel and oxidizer together, pack it in a tube, light it, and stand back! They power everything from fireworks to the Space Shuttle boosters.`,
          sections: [
            {
              title: 'How Solid Motors Work',
              content: `**Propellant Composition (APCP):**
- Ammonium Perchlorate: 70% (oxidizer)
- Aluminum powder: 16% (fuel)
- HTPB binder: 12% (holds it together)
- Other additives: 2%

**Burn Process:**
1. Igniter starts combustion at one end
2. Propellant burns from inside out
3. Hot gas exits through nozzle
4. Burns until propellant exhausted

**Grain Geometry:**
The shape of the hollow core determines thrust profile:
- Star: High initial thrust, decreases
- Cylinder: Constant thrust
- End-burner: Long, low thrust`
            },
            {
              title: 'Advantages & Disadvantages',
              content: `**Advantages:**
- Simple - no pumps, valves, or plumbing
- Storable for years (no cryogenics)
- High thrust density
- Very reliable
- Cheap to manufacture

**Disadvantages:**
- Cannot throttle or shut down!
- Lower Isp (~260s vs 300-450s liquid)
- Once lit, burns to completion
- Cannot restart
- Toxic exhaust (HCl)

**Best Uses:**
- Boosters (high thrust needed at liftoff)
- Missiles (instant readiness)
- Upper stages (simplicity)
- Emergency escape systems`
            },
            {
              title: 'Famous Solid Motors',
              content: `**Space Shuttle SRB**
- Thrust: 12,500 kN each (!)
- Burn time: 124 seconds
- Propellant: 500,000 kg each
- Provided 83% of liftoff thrust

**Ariane 5 EAP**
- Thrust: 7,080 kN each
- Burn time: 130 seconds
- Two boosters per launch

**Star 48 (Upper Stage)**
- Thrust: 66 kN
- Used for deep space missions
- Sent New Horizons to Pluto

**GEM-63 (Atlas V)**
- Thrust: 1,660 kN
- Up to 5 per launch
- Augments first stage thrust`
            }
          ],
          keyTakeaways: [
            'Solid motors are simple - fuel and oxidizer pre-mixed',
            'Cannot throttle or restart - burns until empty',
            'Lower Isp but high thrust and reliability',
            'Best for boosters and applications needing instant readiness'
          ],
          quiz: {
            questions: [
              { id: 'q1', question: 'Main oxidizer in solid propellant is:', options: ['Liquid oxygen', 'Ammonium perchlorate', 'Nitrogen tetroxide', 'Hydrogen peroxide'], correctAnswer: 1, explanation: 'APCP uses ammonium perchlorate (~70%) as oxidizer.' },
              { id: 'q2', question: 'Can solid motors be throttled?', options: ['Yes, easily', 'Yes, but limited', 'No', 'Only in vacuum'], correctAnswer: 2, explanation: 'Once ignited, solid motors burn at a rate determined by grain geometry - no throttling.' },
              { id: 'q3', question: 'Solid motor Isp is typically:', options: ['450 s', '350 s', '260 s', '150 s'], correctAnswer: 2, explanation: 'Solid motors achieve ~260s Isp - lower than liquid engines.' },
              { id: 'q4', question: 'Shuttle SRBs provided what % of liftoff thrust?', options: ['50%', '65%', '83%', '95%'], correctAnswer: 2, explanation: 'SRBs provided 83% of thrust at liftoff - massive boosters!' },
              { id: 'q5', question: 'Grain geometry affects:', options: ['Isp', 'Thrust profile over time', 'Exhaust velocity', 'Propellant density'], correctAnswer: 1, explanation: 'The shape of the hollow core determines how thrust varies during burn.' }
            ]
          }
        },
        {
          id: 'propellants',
          title: 'Rocket Propellants',
          duration: '35 min',
          xp: 200,
          description: 'Choosing the right fuel for the mission',
          aiTutor: true,
          introduction: `The propellant you choose affects everything - performance, cost, complexity, and what missions are possible. Let's explore the chemistry that powers spaceflight.`,
          sections: [
            {
              title: 'Propellant Basics',
              content: `**What Makes Good Propellant?**
1. High energy density
2. Low molecular weight exhaust
3. Stable and safe to handle
4. Reasonable cost

**Key Metrics:**
- **Isp:** Efficiency (higher = better)
- **Density:** Affects tank size
- **Storability:** Cryogenic vs storable
- **Toxicity:** Safety concerns

**The Trade-off:**
High Isp propellants (LH2) are often:
- Low density (huge tanks)
- Cryogenic (boils off)
- Expensive

Lower Isp propellants (RP-1) are:
- Dense (smaller tanks)
- Storable
- Cheap`
            },
            {
              title: 'Common Propellant Combinations',
              content: `**LH2/LOX (Hydrogen/Oxygen)**
- Isp: 450s (highest!)
- Density: Very low (huge tanks)
- Temp: -253°C / -183°C
- Used: Upper stages, SLS, Delta IV
- Pro: Best performance
- Con: Boil-off, large tanks

**RP-1/LOX (Kerosene/Oxygen)**
- Isp: 310s
- Density: High (compact)
- Temp: Room temp / -183°C
- Used: Falcon 9, Atlas V first stage
- Pro: Dense, cheap, easy
- Con: Lower Isp, coking

**CH4/LOX (Methane/Oxygen)**
- Isp: 360s
- Density: Medium
- Temp: -161°C / -183°C
- Used: Starship, Vulcan
- Pro: Can make on Mars!
- Con: Newer technology`
            },
            {
              title: 'Hypergolic & Exotic Propellants',
              content: `**Hypergolics (Self-igniting)**
N2O4/UDMH or N2O4/MMH
- Isp: 290s
- Ignite on contact - no igniter needed!
- Storable at room temperature
- VERY toxic and corrosive
- Used: Spacecraft thrusters, some upper stages

**Monopropellants**
Hydrazine (N2H4)
- Decomposes over catalyst
- Isp: 220s
- Simple, reliable
- Used: Attitude control thrusters

**Future Propellants**
- Nuclear thermal: Isp ~900s (!)
- Ion/plasma: Isp 1,500-10,000s
- Solar thermal: Uses sunlight to heat propellant`
            }
          ],
          keyTakeaways: [
            'LH2/LOX has highest Isp but lowest density',
            'RP-1/LOX is dense and cheap - great for first stages',
            'CH4/LOX balances performance with Mars ISRU potential',
            'Hypergolics are toxic but storable and self-igniting'
          ],
          quiz: {
            questions: [
              { id: 'q1', question: 'Which propellant has highest Isp?', options: ['RP-1/LOX', 'LH2/LOX', 'CH4/LOX', 'Solid'], correctAnswer: 1, explanation: 'LH2/LOX achieves ~450s Isp - best chemical propellant.' },
              { id: 'q2', question: 'Why is RP-1 popular for first stages?', options: ['Highest Isp', 'Dense and cheap', 'Non-toxic', 'Easiest to ignite'], correctAnswer: 1, explanation: 'RP-1 is dense (small tanks) and cheap - ideal for first stages.' },
              { id: 'q3', question: 'Hypergolic propellants:', options: ['Need spark to ignite', 'Ignite on contact', 'Are non-toxic', 'Have highest Isp'], correctAnswer: 1, explanation: 'Hypergolics ignite spontaneously when fuel meets oxidizer.' },
              { id: 'q4', question: 'Why is CH4/LOX attractive for Mars?', options: ['Highest Isp', 'Can be made from Mars atmosphere', 'Cheapest', 'Non-cryogenic'], correctAnswer: 1, explanation: 'Mars has CO2 and water ice - can produce CH4 and O2 locally (ISRU).' },
              { id: 'q5', question: 'LH2 storage temperature is:', options: ['-183°C', '-161°C', '-253°C', '20°C'], correctAnswer: 2, explanation: 'Liquid hydrogen boils at -253°C (20 K) - extremely cold!' }
            ]
          }
        },
     
   {
          id: 'combustion',
          title: 'Combustion Chemistry',
          duration: '30 min',
          xp: 175,
          description: 'The chemistry that powers rockets',
          aiTutor: true,
          introduction: `Every rocket launch begins with a chemical reaction. Understanding combustion chemistry helps you predict performance, choose propellants, and design efficient engines.`,
          sections: [
            {
              title: 'Combustion Basics',
              content: `**What is Combustion?**
Rapid oxidation releasing heat and light.
Fuel + Oxidizer → Products + Energy

**Example: Hydrogen Combustion**
2H₂ + O₂ → 2H₂O + Energy
Energy released: 286 kJ/mol

**Example: Methane Combustion**
CH₄ + 2O₂ → CO₂ + 2H₂O + Energy
Energy released: 890 kJ/mol

**Stoichiometry:**
The exact ratio for complete combustion.
- H2/O2: 8:1 by mass (oxidizer:fuel)
- CH4/O2: 4:1 by mass
- RP-1/O2: 3.4:1 by mass`
            },
            {
              title: 'Mixture Ratio',
              content: `**O/F Ratio = Oxidizer mass / Fuel mass**

**Stoichiometric:** Complete combustion
**Fuel-rich:** Excess fuel (rockets use this!)
**Oxidizer-rich:** Excess oxidizer

**Why Fuel-Rich?**
1. Lower molecular weight exhaust
2. Higher exhaust velocity (vₑ ∝ √(T/M))
3. Protects chamber from oxidation
4. Slightly lower temperature (safer)

**Typical O/F Ratios:**
| Propellant | Stoich | Actual |
|------------|--------|--------|
| LH2/LOX | 8.0 | 5.5-6.0 |
| RP-1/LOX | 3.4 | 2.3-2.7 |
| CH4/LOX | 4.0 | 3.2-3.6 |

Running fuel-rich increases Isp by 5-10%!`
            },
            {
              title: 'Combustion Temperature',
              content: `**Adiabatic Flame Temperature:**
Maximum temperature if no heat loss.

| Propellant | Flame Temp |
|------------|------------|
| LH2/LOX | 3,250 K |
| RP-1/LOX | 3,400 K |
| CH4/LOX | 3,350 K |
| Solid | 3,000-3,500 K |

**Why Not Hotter = Better?**
At very high temps, molecules dissociate:
H₂O → H₂ + ½O₂ (absorbs energy!)

This limits effective temperature.

**Chamber Pressure Effect:**
Higher pressure → Less dissociation → Higher performance
Modern engines: 100-300 bar chamber pressure
Raptor: 300+ bar (!)`
            }
          ],
          keyTakeaways: [
            'Combustion converts chemical energy to thermal energy',
            'Rockets run fuel-rich for higher Isp',
            'Flame temperatures reach 3,000-3,500 K',
            'Higher chamber pressure improves performance'
          ],
          quiz: {
            questions: [
              { id: 'q1', question: 'Rockets typically run:', options: ['Stoichiometric', 'Fuel-rich', 'Oxidizer-rich', 'Varies randomly'], correctAnswer: 1, explanation: 'Fuel-rich gives lower molecular weight exhaust = higher Isp.' },
              { id: 'q2', question: 'Typical combustion temperature is:', options: ['1,000 K', '2,000 K', '3,000-3,500 K', '10,000 K'], correctAnswer: 2, explanation: 'Most propellants burn at 3,000-3,500 K.' },
              { id: 'q3', question: 'Higher chamber pressure:', options: ['Decreases performance', 'Increases performance', 'No effect', 'Decreases temperature'], correctAnswer: 1, explanation: 'Higher pressure reduces dissociation, improving performance.' },
              { id: 'q4', question: 'O/F ratio for RP-1/LOX is typically:', options: ['1:1', '2.3-2.7', '5.5-6.0', '8:1'], correctAnswer: 1, explanation: 'RP-1/LOX runs at O/F ~2.3-2.7 (fuel-rich).' },
              { id: 'q5', question: 'At very high temps, water molecules:', options: ['Freeze', 'Dissociate', 'Become plasma', 'Solidify'], correctAnswer: 1, explanation: 'H₂O dissociates into H₂ and O₂ at extreme temperatures.' }
            ]
          }
        },
        {
          id: 'nozzle-design',
          title: 'Nozzle Design',
          duration: '35 min',
          xp: 200,
          description: 'Where thermal energy becomes thrust',
          aiTutor: true,
          introduction: `The nozzle is where the magic happens. It converts hot, high-pressure gas into a supersonic exhaust jet. A well-designed nozzle can mean the difference between reaching orbit and falling short.`,
          sections: [
            {
              title: 'The de Laval Nozzle',
              content: `**Converging-Diverging Shape:**
Why this specific shape?

**Subsonic Flow (M < 1):**
- Accelerates in converging section
- Like squeezing a garden hose

**At Throat (M = 1):**
- Flow reaches speed of sound
- This is "choked flow"
- Minimum area point

**Supersonic Flow (M > 1):**
- Accelerates in DIVERGING section!
- Counterintuitive but true
- Density drops faster than area increases

**Result:**
Gas enters at ~100 m/s, exits at 2,500-4,500 m/s!`
            },
            {
              title: 'Expansion Ratio',
              content: `**ε = Exit Area / Throat Area**

**Optimal Expansion:**
Exit pressure = Ambient pressure

**Under-expanded (Pₑ > Pₐ):**
- Exhaust continues expanding outside
- Loses some efficiency
- Happens at high altitude with sea-level nozzle

**Over-expanded (Pₑ < Pₐ):**
- Shock waves inside nozzle
- Flow separation possible
- Can damage nozzle!

**Typical Expansion Ratios:**
| Application | ε |
|-------------|---|
| Sea level | 10-20 |
| Vacuum | 50-300 |
| Merlin 1D | 16 |
| Merlin Vac | 165 |`
            },
            {
              title: 'Nozzle Cooling',
              content: `**The Problem:**
Gas at 3,400 K would melt any metal!

**Regenerative Cooling:**
- Fuel flows through channels in nozzle wall
- Absorbs heat before entering chamber
- Most common method
- Merlin, Raptor, RS-25 all use this

**Film Cooling:**
- Inject cool fuel along walls
- Creates protective boundary layer
- Often combined with regen cooling

**Ablative Cooling:**
- Nozzle material burns away slowly
- Absorbs heat as it vaporizes
- Used in solid motors
- Simple but single-use

**Radiation Cooling:**
- Nozzle glows red/white hot
- Radiates heat to space
- Used for nozzle extensions`
            }
          ],
          keyTakeaways: [
            'De Laval nozzle: converging-diverging shape for supersonic flow',
            'Throat is where flow reaches Mach 1 (choked)',
            'Expansion ratio optimized for operating altitude',
            'Regenerative cooling uses fuel to cool nozzle walls'
          ],
          quiz: {
            questions: [
              { id: 'q1', question: 'At the nozzle throat, flow is:', options: ['Subsonic', 'Exactly Mach 1', 'Supersonic', 'Zero'], correctAnswer: 1, explanation: 'Flow reaches exactly Mach 1 (sonic) at the throat.' },
              { id: 'q2', question: 'In the diverging section, supersonic flow:', options: ['Slows down', 'Speeds up', 'Stays constant', 'Becomes subsonic'], correctAnswer: 1, explanation: 'Counterintuitively, supersonic flow accelerates in expanding area.' },
              { id: 'q3', question: 'Vacuum nozzles have expansion ratio of:', options: ['5-10', '10-20', '50-300', '1000+'], correctAnswer: 2, explanation: 'Vacuum nozzles can expand more since Pₐ ≈ 0.' },
              { id: 'q4', question: 'Regenerative cooling uses:', options: ['Water', 'Air', 'Fuel', 'Liquid nitrogen'], correctAnswer: 2, explanation: 'Fuel flows through nozzle channels, absorbing heat before combustion.' },
              { id: 'q5', question: 'Over-expanded nozzle means:', options: ['Exit pressure > ambient', 'Exit pressure < ambient', 'Exit pressure = ambient', 'No exhaust'], correctAnswer: 1, explanation: 'Over-expanded: Pₑ < Pₐ, causing shock waves inside nozzle.' }
            ]
          }
        },
       
 {
          id: 'turbopumps',
          title: 'Turbopumps',
          duration: '30 min',
          xp: 175,
          description: 'The heart of liquid rocket engines',
          aiTutor: true,
          introduction: `Turbopumps are engineering marvels that pressurize propellants to 500+ bar. They spin at 30,000+ RPM and handle cryogenic fluids. Getting them right is one of the hardest challenges in rocket engineering.`,
          sections: [
            {
              title: 'Why Turbopumps?',
              content: `**The Pressure Problem:**
Combustion chamber: 100-300 bar
Tank pressure: 2-5 bar

Need to boost pressure 50-100x!

**Options:**
1. **Pressure-fed:** Heavy tanks (must hold high pressure)
2. **Turbopump-fed:** Light tanks + pump

**Turbopump Advantage:**
- Tank walls can be thin (low pressure)
- Saves thousands of kg of mass
- Enables high chamber pressure
- Higher performance

**The Trade-off:**
Turbopumps are complex, expensive, and can fail spectacularly.`
            },
            {
              title: 'How Turbopumps Work',
              content: `**Components:**
1. **Inducer:** Low-pressure boost, prevents cavitation
2. **Impeller:** Main pressure increase
3. **Turbine:** Powered by hot gas, drives pump

**Power Source:**
- Gas generator: Burns some propellant
- Preburner: Staged combustion cycle
- Expander: Heat from nozzle

**Incredible Stats (RS-25):**
- LOX pump: 25,000 RPM
- LH2 pump: 37,000 RPM
- Power: 55,000 kW (74,000 hp!)
- Flow: 70 kg/s LOX, 12 kg/s LH2

That's more power than a locomotive in a package you can hold!`
            },
            {
              title: 'Turbopump Challenges',
              content: `**Cavitation:**
- Liquid boils at pump inlet (low pressure)
- Vapor bubbles collapse violently
- Damages pump, reduces flow
- Solution: Inducer pre-pressurizes

**Cryogenic Seals:**
- Must seal at -253°C (LH2)
- Thermal contraction issues
- Special materials required

**Bearing Loads:**
- Extreme RPM
- High pressures
- Must last entire burn

**Historical Failures:**
- N-1 rocket: Turbopump failures caused all 4 launch failures
- Early Merlin: Turbopump issues delayed Falcon 1

**Modern Success:**
SpaceX Merlin turbopump: >99.9% reliability`
            }
          ],
          keyTakeaways: [
            'Turbopumps boost pressure from ~3 bar to 300+ bar',
            'Enable lightweight tanks and high performance',
            'Spin at 25,000-37,000 RPM with enormous power',
            'Cavitation and cryogenic seals are major challenges'
          ],
          quiz: {
            questions: [
              { id: 'q1', question: 'Turbopumps boost pressure by factor of:', options: ['2-5x', '10-20x', '50-100x', '1000x'], correctAnswer: 2, explanation: 'From ~3 bar tank to 300 bar chamber = 100x boost.' },
              { id: 'q2', question: 'RS-25 turbopump power is approximately:', options: ['1,000 hp', '10,000 hp', '74,000 hp', '500,000 hp'], correctAnswer: 2, explanation: 'RS-25 turbopumps produce ~74,000 hp combined!' },
              { id: 'q3', question: 'Cavitation is caused by:', options: ['High temperature', 'Low pressure causing boiling', 'High RPM', 'Contamination'], correctAnswer: 1, explanation: 'Low pressure at pump inlet causes liquid to boil, forming damaging bubbles.' },
              { id: 'q4', question: 'The inducer prevents:', options: ['Overheating', 'Cavitation', 'Leaks', 'Corrosion'], correctAnswer: 1, explanation: 'Inducer provides initial pressure boost to prevent cavitation in main pump.' },
              { id: 'q5', question: 'Why use turbopumps instead of pressure-fed?', options: ['Simpler', 'Lighter tanks', 'Cheaper', 'More reliable'], correctAnswer: 1, explanation: 'Turbopumps allow thin, lightweight tanks - huge mass savings.' }
            ]
          }
        },
        {
          id: 'injectors',
          title: 'Injectors & Combustion Stability',
          duration: '30 min',
          xp: 175,
          description: 'Mixing propellants for stable combustion',
          aiTutor: true,
          introduction: `The injector is where fuel meets oxidizer. Get it wrong and you get combustion instability - violent pressure oscillations that can destroy an engine in milliseconds. Injector design is part science, part art.`,
          sections: [
            {
              title: 'Injector Types',
              content: `**Impinging Injectors:**
- Fuel and oxidizer streams collide
- Creates fine spray
- Used in many engines
- F-1 had 2,600 injection elements!

**Coaxial Injectors:**
- Fuel surrounds oxidizer (or vice versa)
- Shear mixing at interface
- Common in LH2/LOX engines
- RS-25 uses this type

**Pintle Injector:**
- Single central element
- Fuel/oxidizer meet at pintle tip
- Naturally stable
- SpaceX Merlin uses this
- Enables deep throttling`
            },
            {
              title: 'Combustion Instability',
              content: `**The Problem:**
Pressure oscillations in chamber can:
- Exceed structural limits
- Cause uneven heating
- Destroy engine in <1 second

**Types:**
1. **Chugging (10-400 Hz):** Feed system coupling
2. **Buzzing (400-1000 Hz):** Injection coupling
3. **Screaming (1000+ Hz):** Acoustic resonance

**F-1 Engine Story:**
- Suffered violent instability
- 2,000+ tests to solve
- Added baffles to break up waves
- Became most reliable engine ever

**Modern Approach:**
- CFD simulation
- Pintle injectors (naturally stable)
- Acoustic dampers
- Extensive testing`
            },
            {
              title: 'Ignition Systems',
              content: `**Spark Ignition:**
- Electric spark ignites propellants
- Used in Merlin (TEA-TEB)
- Reliable, repeatable

**Hypergolic Ignition:**
- Small amount of hypergolic fluid
- Ignites on contact
- TEA-TEB (triethylaluminum-triethylborane)
- Green flame visible at startup

**Pyrotechnic:**
- One-shot igniter
- Common in solid motors
- Simple but not restartable

**Torch Igniter:**
- Small flame ignites main propellants
- Used in some engines
- Raptor uses spark-ignited torch`
            }
          ],
          keyTakeaways: [
            'Injectors atomize and mix propellants for combustion',
            'Pintle injectors are naturally stable and throttleable',
            'Combustion instability can destroy engines in milliseconds',
            'Modern engines use simulation and testing to ensure stability'
          ],
          quiz: {
            questions: [
              { id: 'q1', question: 'Merlin engine uses which injector type?', options: ['Impinging', 'Coaxial', 'Pintle', 'Showerhead'], correctAnswer: 2, explanation: 'Merlin uses pintle injector - naturally stable and throttleable.' },
              { id: 'q2', question: 'Combustion instability can destroy an engine in:', options: ['Minutes', 'Seconds', 'Less than 1 second', 'Hours'], correctAnswer: 2, explanation: 'High-frequency instability can destroy engines in milliseconds.' },
              { id: 'q3', question: 'F-1 engine required how many tests to solve instability?', options: ['100', '500', '2,000+', '10,000'], correctAnswer: 2, explanation: 'Over 2,000 tests were needed to solve F-1 combustion instability.' },
              { id: 'q4', question: 'TEA-TEB is used for:', options: ['Cooling', 'Ignition', 'Thrust vectoring', 'Pressurization'], correctAnswer: 1, explanation: 'TEA-TEB is a hypergolic ignition fluid - ignites on contact with oxygen.' },
              { id: 'q5', question: 'Screaming instability frequency is:', options: ['10-100 Hz', '100-400 Hz', '1000+ Hz', '1 Hz'], correctAnswer: 2, explanation: 'Screaming is high-frequency acoustic instability at 1000+ Hz.' }
            ]
          }
        },

        {
          id: 'thrust-vectoring',
          title: 'Thrust Vector Control',
          duration: '25 min',
          xp: 150,
          description: 'Steering rockets with engine movement',
          aiTutor: true,
          introduction: `How do you steer a rocket with no wings or control surfaces? By pointing the engine! Thrust vector control (TVC) is how rockets maintain attitude and follow their trajectory.`,
          sections: [
            {
              title: 'TVC Basics',
              content: `**The Concept:**
Tilt the engine slightly off-center.
Thrust no longer passes through center of mass.
Creates a torque that rotates the rocket.

**Gimbal Angle:**
Typical range: ±5° to ±7°
Small angle, big effect!

**Control Axes:**
- **Pitch:** Nose up/down
- **Yaw:** Nose left/right
- **Roll:** Rotation around long axis

**Single Engine:**
Can control pitch and yaw.
Roll requires other methods.

**Multiple Engines:**
Differential thrust for roll control.
Falcon 9: 9 engines provide full 3-axis control.`
            },
            {
              title: 'TVC Methods',
              content: `**Gimbaled Engine (Most Common):**
- Entire engine pivots on bearings
- Hydraulic or electric actuators
- Fast response (~100 ms)
- Used: Merlin, Raptor, RS-25

**Gimbaled Nozzle:**
- Only nozzle moves, not whole engine
- Lighter actuators needed
- Used in some solid motors

**Jet Vanes:**
- Vanes in exhaust deflect flow
- Simple but erodes quickly
- Used: V-2, some missiles

**Secondary Injection:**
- Inject fluid into nozzle
- Deflects exhaust asymmetrically
- No moving parts
- Used in some solid motors`
            },
            {
              title: 'TVC Actuators',
              content: `**Hydraulic:**
- High force, fast response
- Heavy (fluid, pumps, lines)
- Used: Space Shuttle, SLS

**Electromechanical:**
- Electric motors drive screws
- Lighter, simpler
- Modern preference
- Used: Falcon 9, Starship

**Pneumatic:**
- Compressed gas drives pistons
- Simple but limited force
- Used in some upper stages

**Falcon 9 Stats:**
- Gimbal range: ±5°
- Response time: <100 ms
- Actuator force: ~50 kN
- Electric actuators (no hydraulics)`
            }
          ],
          keyTakeaways: [
            'TVC steers by tilting engine off-center',
            'Typical gimbal range is ±5° to ±7°',
            'Gimbaled engines are most common method',
            'Modern rockets use electric actuators'
          ],
          quiz: {
            questions: [
              { id: 'q1', question: 'Typical gimbal angle range is:', options: ['±1°', '±5-7°', '±20°', '±45°'], correctAnswer: 1, explanation: 'Most engines gimbal ±5° to ±7° - small angle, big effect.' },
              { id: 'q2', question: 'A single gimbaled engine can control:', options: ['Pitch only', 'Pitch and yaw', 'All three axes', 'Roll only'], correctAnswer: 1, explanation: 'Single engine controls pitch and yaw; roll needs other methods.' },
              { id: 'q3', question: 'Falcon 9 uses which actuator type?', options: ['Hydraulic', 'Pneumatic', 'Electromechanical', 'Manual'], correctAnswer: 2, explanation: 'Falcon 9 uses electric actuators - lighter and simpler than hydraulic.' },
              { id: 'q4', question: 'Jet vanes work by:', options: ['Moving the engine', 'Deflecting exhaust flow', 'Changing fuel flow', 'Spinning the rocket'], correctAnswer: 1, explanation: 'Vanes in the exhaust deflect flow to create steering force.' },
              { id: 'q5', question: 'TVC response time is typically:', options: ['1 second', '100 ms', '10 seconds', '1 minute'], correctAnswer: 1, explanation: 'TVC actuators respond in ~100 ms for precise control.' }
            ]
          }
        },
        {
          id: 'engine-testing',
          title: 'Engine Testing & Development',
          duration: '25 min',
          xp: 150,
          description: 'How engines are developed and qualified',
          aiTutor: true,
          introduction: `You can't fly an engine until you've tested it extensively on the ground. Engine development involves thousands of tests, from component level to full-duration firings. Let's see how it's done.`,
          sections: [
            {
              title: 'Test Types',
              content: `**Component Testing:**
- Turbopump alone
- Injector water flow
- Valve cycling
- Igniter tests

**Subscale Testing:**
- Smaller version of full engine
- Cheaper, faster iteration
- Validates design concepts

**Full-Scale Testing:**
- Complete engine assembly
- Short duration first (1-5 seconds)
- Build up to full duration
- Multiple firings per engine

**Qualification Testing:**
- Proves design meets requirements
- Margin testing (beyond normal limits)
- Environmental testing (vibration, thermal)`
            },
            {
              title: 'Test Facilities',
              content: `**Test Stand Components:**
- Thrust measurement (load cells)
- Propellant feed systems
- Data acquisition (1000s of sensors)
- High-speed cameras
- Sound suppression (water deluge)

**Famous Test Sites:**
- **Stennis Space Center:** NASA's main engine test site
- **McGregor, TX:** SpaceX test facility
- **Mojave, CA:** Multiple companies

**Test Stand Capabilities:**
- Measure thrust to 0.1% accuracy
- Record 10,000+ data channels
- Withstand engine failures safely
- Quick turnaround between tests`
            },
            {
              title: 'Development Philosophy',
              content: `**Traditional (NASA/Old Space):**
- Extensive analysis before testing
- Few, expensive tests
- Long development cycles
- High confidence before flight

**Iterative (SpaceX):**
- Test early, test often
- Learn from failures
- Rapid iteration
- "Test to failure" approach

**SpaceX Raptor Development:**
- 1,000+ test firings before flight
- Multiple engine versions
- Continuous improvement
- Starship uses latest iteration

**Key Metrics:**
- Thrust accuracy: ±1%
- Isp measurement: ±0.5%
- Reliability goal: >99.9%`
            }
          ],
          keyTakeaways: [
            'Engine development requires thousands of tests',
            'Testing progresses from components to full-scale',
            'Modern approach: test early, test often, iterate fast',
            'Test stands measure thrust, Isp, and thousands of parameters'
          ],
          quiz: {
            questions: [
              { id: 'q1', question: 'SpaceX Raptor had how many test firings before flight?', options: ['10', '100', '1,000+', '10,000'], correctAnswer: 2, explanation: 'Raptor underwent 1,000+ test firings during development.' },
              { id: 'q2', question: 'Subscale testing is used to:', options: ['Save money and iterate faster', 'Test at full thrust', 'Qualify for flight', 'Test in space'], correctAnswer: 0, explanation: 'Smaller engines are cheaper and faster to test, validating concepts.' },
              { id: 'q3', question: 'Test stands measure thrust accuracy to:', options: ['±10%', '±5%', '±1%', '±0.1%'], correctAnswer: 3, explanation: 'Modern test stands achieve ±0.1% thrust measurement accuracy.' },
              { id: 'q4', question: 'SpaceX development philosophy emphasizes:', options: ['Extensive analysis first', 'Test early and often', 'Single perfect test', 'No ground testing'], correctAnswer: 1, explanation: 'SpaceX tests early, learns from failures, and iterates rapidly.' },
              { id: 'q5', question: 'NASA main engine test site is:', options: ['Kennedy Space Center', 'Stennis Space Center', 'Johnson Space Center', 'JPL'], correctAnswer: 1, explanation: 'Stennis Space Center in Mississippi is NASAs primary engine test facility.' }
            ]
          }
        },
        {
          id: 'engine-reusability',
          title: 'Engine Reusability',
          duration: '30 min',
          xp: 175,
          description: 'Making engines fly again and again',
          aiTutor: true,
          introduction: `Reusable engines are revolutionizing spaceflight economics. Instead of throwing away a $10M engine after one use, fly it 10+ times. But making engines survive multiple flights is an enormous engineering challenge.`,
          sections: [
            {
              title: 'Reusability Challenges',
              content: `**Thermal Cycling:**
- Engine goes from ambient to 3,400 K to ambient
- Thermal stress causes fatigue
- Materials expand/contract

**Mechanical Stress:**
- Vibration during flight
- Shock at ignition/shutdown
- Landing loads (for boosters)

**Contamination:**
- Soot buildup (RP-1 engines)
- Oxidation
- Foreign object damage

**Wear Items:**
- Turbopump bearings
- Seals
- Igniter components

**Inspection Requirements:**
- Visual inspection
- Borescope internal inspection
- Non-destructive testing
- Data analysis from flight`
            },
            {
              title: 'Design for Reusability',
              content: `**Material Selection:**
- Fatigue-resistant alloys
- Coatings for thermal protection
- Corrosion-resistant materials

**Margin in Design:**
- Operate below maximum capability
- Structural safety factors
- Thermal margins

**Accessibility:**
- Easy inspection points
- Replaceable wear items
- Modular components

**Merlin Engine Design:**
- Designed for 10+ flights
- Pintle injector (robust)
- Simplified turbopump
- Rapid inspection capability`
            },
            {
              title: 'Reusability Economics',
              content: `**Cost Breakdown (Falcon 9):**
- First stage: ~$30M (60% of rocket)
- Engines (9 Merlins): ~$10M
- Recovery/refurb: ~$1-2M per flight

**Reuse Impact:**
| Flights | Cost/Flight |
|---------|-------------|
| 1 | $62M |
| 5 | $20M |
| 10 | $15M |
| 20 | $12M |

**Current Records:**
- Falcon 9 booster: 20+ flights
- Merlin engine: 20+ firings
- Goal: 100+ flights per booster

**Future: Starship**
- Target: Aircraft-like operations
- Rapid turnaround (hours)
- 1000+ flights per vehicle
- Cost goal: <$10/kg to orbit`
            }
          ],
          keyTakeaways: [
            'Reusability requires designing for thermal cycling and fatigue',
            'Inspection and refurbishment between flights is critical',
            'Falcon 9 boosters have flown 20+ times',
            'Reusability reduces cost from $62M to ~$15M per flight'
          ],
          quiz: {
            questions: [
              { id: 'q1', question: 'Falcon 9 boosters have achieved how many flights?', options: ['5', '10', '20+', '100'], correctAnswer: 2, explanation: 'Falcon 9 boosters have flown 20+ times as of 2024.' },
              { id: 'q2', question: 'Main challenge for engine reusability is:', options: ['Weight', 'Thermal cycling fatigue', 'Cost', 'Size'], correctAnswer: 1, explanation: 'Repeated heating/cooling cycles cause material fatigue.' },
              { id: 'q3', question: 'Reuse reduces Falcon 9 cost from $62M to approximately:', options: ['$50M', '30M', '$15M', '$5M'], correctAnswer: 2, explanation: 'With 10+ reuses, cost drops to ~$15M per flight.' },
              { id: 'q4', question: 'Starship reusability goal is:', options: ['10 flights', '100 flights', '1000+ flights', 'Single use'], correctAnswer: 2, explanation: 'Starship targets 1000+ flights per vehicle - aircraft-like operations.' },
              { id: 'q5', question: 'Between flights, engines require:', options: ['Complete rebuild', 'Inspection and minor refurbishment', 'No maintenance', 'Replacement'], correctAnswer: 1, explanation: 'Engines are inspected and wear items replaced between flights.' }
            ]
          }
        }
      ]
    }
  ]
};

export default section2Propulsion;