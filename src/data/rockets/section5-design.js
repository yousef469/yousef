// Section 5: Rocket Design
// 10 Lessons - Design process, optimization, mission planning

export const section5Design = {
  id: 'design',
  title: 'Unit 4: Rocket Design',
  description: 'Designing rockets from concept to flight',
  icon: '📐',
  color: 'from-green-500 to-teal-500',
  units: [
    {
      id: 'design-process',
      title: 'Design Process',
      description: 'From requirements to flight-ready vehicle',
      lessons: [
        {
          id: 'requirements',
          title: 'Requirements & Mission Analysis',
          duration: '30 min',
          xp: 175,
          description: 'Defining what your rocket must do',
          aiTutor: true,
          introduction: `Every rocket design starts with requirements. What payload? What orbit? How often? These questions drive every design decision. Get requirements wrong and you build the wrong rocket.`,
          sections: [
            {
              title: 'Mission Requirements',
              content: `**Key Questions:**
- What payload mass?
- What orbit (altitude, inclination)?
- How many launches per year?
- Reusable or expendable?
- Crewed or cargo?

**Example: Falcon 9 Requirements**
- Payload: 22,800 kg to LEO
- Orbit: Various (LEO, GTO, polar)
- Rate: 50+ launches/year
- Reusability: First stage, fairings
- Crew: Dragon capable

**Derived Requirements:**
From mission requirements, derive:
- Δv budget
- Thrust requirements
- Structural loads
- Reliability targets`
            },
            {
              title: 'Trade Studies',
              content: `**What is a Trade Study?**
Systematic comparison of design options.

**Process:**
1. Define options
2. Establish criteria
3. Weight criteria by importance
4. Score each option
5. Calculate weighted scores
6. Select best option

**Example: Propellant Selection**
Criteria: Isp, density, cost, handling
- LH2/LOX: High Isp, low density
- RP-1/LOX: Medium Isp, high density
- CH4/LOX: Good balance, ISRU potential

**Decision Matrix:**
Quantifies subjective decisions.
Documents rationale for future reference.`
            },
            {
              title: 'Design Phases',
              content: `**Phase A: Concept**
- Mission definition
- Feasibility studies
- Multiple concepts explored

**Phase B: Preliminary Design**
- Down-select to one concept
- Major trade studies
- Preliminary Design Review (PDR)

**Phase C: Detailed Design**
- Complete drawings
- Analysis and simulation
- Critical Design Review (CDR)

**Phase D: Build & Test**
- Manufacturing
- Integration
- Qualification testing

**Phase E: Operations**
- Launch campaigns
- Continuous improvement`
            }
          ],
          keyTakeaways: [
            'Requirements drive all design decisions',
            'Trade studies systematically compare options',
            'Design progresses through defined phases',
            'Reviews (PDR, CDR) gate progression'
          ],
          quiz: {
            questions: [
              { id: 'q1', question: 'Design starts with:', options: ['Drawing rockets', 'Requirements definition', 'Building prototypes', 'Selecting materials'], correctAnswer: 1, explanation: 'Requirements must be defined before design can begin.' },
              { id: 'q2', question: 'PDR stands for:', options: ['Propulsion Design Review', 'Preliminary Design Review', 'Post-Design Review', 'Primary Development Review'], correctAnswer: 1, explanation: 'Preliminary Design Review gates entry to detailed design.' },
              { id: 'q3', question: 'Trade studies help:', options: ['Build faster', 'Compare options systematically', 'Reduce cost only', 'Skip testing'], correctAnswer: 1, explanation: 'Trade studies systematically compare design options.' },
              { id: 'q4', question: 'Falcon 9 payload to LEO is:', options: ['5,000 kg', '10,000 kg', '22,800 kg', '50,000 kg'], correctAnswer: 2, explanation: 'Falcon 9 delivers 22,800 kg to LEO.' },
              { id: 'q5', question: 'CDR occurs in which phase?', options: ['Phase A', 'Phase B', 'Phase C', 'Phase E'], correctAnswer: 2, explanation: 'Critical Design Review concludes Phase C (Detailed Design).' }
            ]
          }
        },
   
     {
          id: 'vehicle-sizing',
          title: 'Vehicle Sizing',
          duration: '35 min',
          xp: 200,
          description: 'Determining rocket size from requirements',
          aiTutor: true,
          introduction: `How big should your rocket be? Vehicle sizing translates mission requirements into physical dimensions - tank sizes, engine thrust, structural mass. It's an iterative process that balances many constraints.`,
          sections: [
            {
              title: 'Sizing Process',
              content: `**Inputs:**
- Payload mass
- Target orbit (Δv)
- Propellant choice (Isp)
- Number of stages

**The Iteration:**
1. Guess initial mass
2. Calculate propellant needed (rocket equation)
3. Estimate structural mass
4. Check if payload fits
5. Adjust and repeat

**Key Relationships:**
- Δv = Isp × g₀ × ln(m₀/mf)
- Propellant mass = m₀ - mf
- Structure mass ≈ 5-10% of propellant
- Payload = mf - structure - engines`
            },
            {
              title: 'Stage Optimization',
              content: `**Why Multiple Stages?**
Single stage: Mass ratio ~25 needed for LEO
Two stages: Each needs ratio ~5 (much easier!)

**Optimal Staging:**
For minimum total mass:
- Equal Δv per stage (roughly)
- Higher Isp upper stages
- Higher thrust lower stages

**Stage Mass Fractions:**
- First stage: 3-5% structure
- Upper stage: 5-10% structure
- Upper stages less efficient (smaller scale)

**Example: Falcon 9**
- Stage 1: Δv ≈ 3,500 m/s
- Stage 2: Δv ≈ 6,000 m/s
- Total: ~9,500 m/s (LEO + losses)`
            },
            {
              title: 'Sizing Example',
              content: `**Design a rocket for 5,000 kg to LEO**

**Given:**
- Δv = 9,400 m/s
- Two stages
- RP-1/LOX (Isp = 300s SL, 340s vac)

**Stage 2 (work backwards):**
- Payload: 5,000 kg
- Δv₂ = 5,500 m/s, Isp = 340s
- Mass ratio = e^(5500/3334) = 5.2
- If dry mass = 2,000 kg
- m₀₂ = 5.2 × 7,000 = 36,400 kg
- Propellant₂ = 29,400 kg

**Stage 1:**
- Payload = Stage 2 = 36,400 kg
- Δv₁ = 3,900 m/s, Isp = 300s
- Mass ratio = e^(3900/2943) = 3.8
- Dry mass = 20,000 kg
- m₀₁ = 3.8 × 56,400 = 214,000 kg

**Total: ~214,000 kg for 5,000 kg payload (2.3%)**`
            }
          ],
          keyTakeaways: [
            'Sizing is iterative - guess, calculate, refine',
            'Multiple stages dramatically improve payload fraction',
            'Upper stages have higher Isp, lower stages higher thrust',
            'Typical payload fraction is 2-4% of liftoff mass'
          ],
          quiz: {
            questions: [
              { id: 'q1', question: 'Vehicle sizing is:', options: ['One-time calculation', 'Iterative process', 'Done after building', 'Not needed'], correctAnswer: 1, explanation: 'Sizing requires iteration - mass affects mass!' },
              { id: 'q2', question: 'Optimal staging typically has:', options: ['All Δv in first stage', 'Equal Δv per stage', 'All Δv in upper stage', 'Random distribution'], correctAnswer: 1, explanation: 'Roughly equal Δv per stage minimizes total mass.' },
              { id: 'q3', question: 'Upper stages typically have:', options: ['Higher thrust', 'Higher Isp', 'More propellant', 'Heavier structure'], correctAnswer: 1, explanation: 'Upper stages optimize for Isp (vacuum operation).' },
              { id: 'q4', question: 'First stage structure fraction is typically:', options: ['1%', '3-5%', '15-20%', '50%'], correctAnswer: 1, explanation: 'First stages achieve 3-5% structure fraction.' },
              { id: 'q5', question: 'Typical payload fraction to LEO:', options: ['10-20%', '5-10%', '2-4%', '0.5%'], correctAnswer: 2, explanation: 'Payload is typically 2-4% of liftoff mass.' }
            ]
          }
        },
        {
          id: 'trajectory-design',
          title: 'Trajectory Design',
          duration: '30 min',
          xp: 175,
          description: 'Planning the path from pad to orbit',
          aiTutor: true,
          introduction: `The trajectory is the path your rocket follows from launch to orbit. A well-designed trajectory minimizes fuel consumption while meeting all constraints. It's a complex optimization problem.`,
          sections: [
            {
              title: 'Trajectory Phases',
              content: `**Vertical Rise:**
- First 10-20 seconds
- Clear the tower
- Build initial velocity

**Pitch Program:**
- Begin turning downrange
- Follow gravity turn
- Minimize steering losses

**Max-Q:**
- Maximum aerodynamic pressure
- May throttle down
- ~60-80 seconds

**Stage Separation:**
- First stage burnout
- Coast phase (brief)
- Second stage ignition

**Orbit Insertion:**
- Final burn to orbital velocity
- Precise targeting
- Payload deployment`
            },
            {
              title: 'Launch Azimuth',
              content: `**Azimuth = Launch direction**

**Inclination Constraint:**
Minimum inclination = Launch latitude
- Cape Canaveral (28.5°N): i ≥ 28.5°
- Vandenberg (34.7°N): i ≥ 34.7°
- Baikonur (45.6°N): i ≥ 45.6°

**Due East Launch:**
- Maximum Earth rotation boost
- ~400 m/s free at equator
- ~350 m/s at Cape Canaveral

**Polar Launch:**
- 90° inclination
- No rotation boost
- Vandenberg preferred (ocean to south)

**Retrograde:**
- Inclination > 90°
- Against Earth rotation
- Requires more Δv`
            },
            {
              title: 'Launch Windows',
              content: `**What is a Launch Window?**
Time period when launch is possible.

**Factors:**
- Target orbit plane
- Lighting conditions
- Range availability
- Weather

**ISS Rendezvous:**
- Must launch into ISS orbital plane
- Window: ~5 minutes
- Instantaneous for direct insertion

**GTO:**
- Launch when target longitude overhead
- Window: ~2 hours typically

**Interplanetary:**
- Planetary alignment
- Mars: Every 26 months
- Window: 2-4 weeks`
            }
          ],
          keyTakeaways: [
            'Trajectory has distinct phases: vertical rise, pitch, Max-Q, staging, insertion',
            'Minimum inclination equals launch site latitude',
            'Due east launch gets free velocity from Earth rotation',
            'Launch windows depend on target orbit and constraints'
          ],
          quiz: {
            questions: [
              { id: 'q1', question: 'Max-Q occurs approximately:', options: ['At liftoff', '60-80 seconds', 'At staging', 'In orbit'], correctAnswer: 1, explanation: 'Max-Q happens when velocity × air density peaks, ~60-80s.' },
              { id: 'q2', question: 'Minimum inclination from Cape Canaveral:', options: ['0°', '28.5°', '45°', '90°'], correctAnswer: 1, explanation: 'Minimum inclination equals latitude: 28.5° for Cape.' },
              { id: 'q3', question: 'Due east launch provides:', options: ['Shortest path', 'Free velocity from Earth rotation', 'Lowest inclination', 'Best weather'], correctAnswer: 1, explanation: 'Earth rotation adds ~350-400 m/s for eastward launches.' },
              { id: 'q4', question: 'ISS launch window is typically:', options: ['All day', '~5 minutes', '~2 hours', '~1 week'], correctAnswer: 1, explanation: 'ISS rendezvous requires precise plane matching - ~5 min window.' },
              { id: 'q5', question: 'Mars launch windows occur:', options: ['Daily', 'Monthly', 'Every 26 months', 'Yearly'], correctAnswer: 2, explanation: 'Mars alignment for efficient transfer occurs every 26 months.' }
            ]
          }
        },
        {

          id: 'payload-integration',
          title: 'Payload Integration',
          duration: '25 min',
          xp: 150,
          description: 'Connecting satellites to rockets',
          aiTutor: true,
          introduction: `The payload is the reason the rocket exists. Integrating payloads safely and correctly is critical - a $500M satellite depends on proper attachment, electrical connections, and environmental protection.`,
          sections: [
            {
              title: 'Payload Interfaces',
              content: `**Mechanical Interface:**
- Payload adapter (connects to rocket)
- Separation system
- Standard bolt patterns
- Clamp bands or Marman clamps

**Electrical Interface:**
- Power from rocket (optional)
- Data/command lines
- Separation signals
- Umbilical connections

**Environmental:**
- Fairing protection
- Thermal control
- Contamination control
- Acoustic protection

**Standard Adapters:**
- 937mm, 1194mm, 1666mm bolt circles
- ESPA rings (multiple small sats)
- Rideshare adapters`
            },
            {
              title: 'Integration Process',
              content: `**Timeline (typical):**
- L-6 months: Interface agreement
- L-3 months: Payload arrives at launch site
- L-2 weeks: Payload processing
- L-1 week: Encapsulation (fairing install)
- L-3 days: Mate to rocket
- L-1 day: Final checks

**Cleanroom Operations:**
- Class 100,000 or better
- Contamination control
- ESD protection
- Careful handling

**Testing:**
- Fit checks
- Electrical verification
- Separation system tests
- End-to-end communication`
            },
            {
              title: 'Rideshare Missions',
              content: `**What is Rideshare?**
Multiple payloads share one launch.
Dramatically reduces cost per kg.

**SpaceX Transporter:**
- Dedicated rideshare missions
- 100+ satellites per launch
- $1M for 200 kg
- Regular schedule

**Deployment Sequence:**
- Primary payload first
- Secondary payloads in sequence
- Different orbits possible
- Collision avoidance critical

**Challenges:**
- Schedule coordination
- Interface standardization
- Orbit compromises
- Separation timing`
            }
          ],
          keyTakeaways: [
            'Payload interfaces: mechanical, electrical, environmental',
            'Integration takes months of preparation',
            'Cleanroom operations prevent contamination',
            'Rideshare dramatically reduces launch cost'
          ],
          quiz: {
            questions: [
              { id: 'q1', question: 'Payload integration begins how long before launch?', options: ['1 week', '1 month', '6+ months', '1 day'], correctAnswer: 2, explanation: 'Interface agreements start 6+ months before launch.' },
              { id: 'q2', question: 'ESPA rings are used for:', options: ['Engine mounting', 'Multiple small satellites', 'Fuel transfer', 'Landing legs'], correctAnswer: 1, explanation: 'ESPA rings allow multiple small satellites on one adapter.' },
              { id: 'q3', question: 'Encapsulation means:', options: ['Fueling', 'Installing fairing', 'Launch', 'Separation'], correctAnswer: 1, explanation: 'Encapsulation is installing the payload fairing.' },
              { id: 'q4', question: 'SpaceX Transporter rideshare cost for 200 kg:', options: ['$100,000', '$1 million', '$10 million', '$50 million'], correctAnswer: 1, explanation: 'SpaceX Transporter offers 200 kg slots for ~$1M.' },
              { id: 'q5', question: 'Cleanroom class 100,000 means:', options: ['100,000 particles per cubic foot', 'Temperature 100,000°F', '100,000 sq ft area', '100,000 people allowed'], correctAnswer: 0, explanation: 'Class rating indicates max particles per cubic foot of air.' }
            ]
          }
        },
        {
          id: 'reliability-engineering',
          title: 'Reliability Engineering',
          duration: '30 min',
          xp: 175,
          description: 'Designing rockets that dont fail',
          aiTutor: true,
          introduction: `Rocket launches are high-stakes events. A single failure can destroy a $500M satellite or, worse, cost lives. Reliability engineering ensures rockets work correctly, every time.`,
          sections: [
            {
              title: 'Reliability Basics',
              content: `**Reliability = Probability of Success**

**Metrics:**
- Mission success rate
- Mean Time Between Failures (MTBF)
- Failure rate (λ)

**Rocket Reliability:**
- Falcon 9: ~98% success rate
- Atlas V: ~99% success rate
- Soyuz: ~97% success rate

**Reliability Allocation:**
If system needs 99% reliability:
- 100 components at 99.99% each
- Or fewer, more reliable components
- Redundancy helps!

**Bathtub Curve:**
- Early failures (infant mortality)
- Random failures (useful life)
- Wear-out failures (end of life)`
            },
            {
              title: 'Failure Analysis',
              content: `**FMEA (Failure Modes and Effects Analysis):**
- List all possible failures
- Assess severity and probability
- Identify mitigations
- Prioritize by risk

**Fault Tree Analysis:**
- Top-down approach
- Start with undesired event
- Trace causes backward
- Identify critical paths

**Criticality:**
- Crit 1: Loss of mission/vehicle
- Crit 2: Loss of mission
- Crit 3: Degraded performance

**Single Point Failures:**
Components where one failure causes mission loss.
Goal: Eliminate or mitigate all SPFs.`
            },
            {
              title: 'Redundancy',
              content: `**Types of Redundancy:**

**Active (Hot):**
- All units operating
- Instant switchover
- Example: Triple flight computers

**Standby (Cold):**
- Backup activates on failure
- Switching time required
- Example: Backup battery

**Functional:**
- Different method, same function
- Example: GPS + star tracker

**Falcon 9 Redundancy:**
- 3 flight computers (voting)
- Engine-out capability
- Dual separation systems
- Redundant sensors

**Cost of Redundancy:**
More mass, complexity, cost.
Must balance against reliability gain.`
            }
          ],
          keyTakeaways: [
            'Reliability is probability of mission success',
            'FMEA and fault trees identify failure modes',
            'Single point failures must be eliminated or mitigated',
            'Redundancy improves reliability but adds mass/cost'
          ],
          quiz: {
            questions: [
              { id: 'q1', question: 'Falcon 9 success rate is approximately:', options: ['90%', '95%', '98%', '100%'], correctAnswer: 2, explanation: 'Falcon 9 has achieved ~98% mission success rate.' },
              { id: 'q2', question: 'FMEA stands for:', options: ['Failure Mode and Effects Analysis', 'Flight Management and Engineering Assessment', 'Fuel Mixture and Engine Analysis', 'Final Mission Evaluation Assessment'], correctAnswer: 0, explanation: 'FMEA systematically analyzes potential failure modes.' },
              { id: 'q3', question: 'Single point failure is:', options: ['Minor issue', 'One failure causing mission loss', 'Redundant system', 'Test procedure'], correctAnswer: 1, explanation: 'SPF = one component failure causes mission failure.' },
              { id: 'q4', question: 'Hot redundancy means:', options: ['High temperature operation', 'All units operating simultaneously', 'Backup is off until needed', 'No redundancy'], correctAnswer: 1, explanation: 'Hot (active) redundancy has all units running for instant switchover.' },
              { id: 'q5', question: 'Falcon 9 has how many flight computers?', options: ['1', '2', '3', '5'], correctAnswer: 2, explanation: 'Falcon 9 uses triple-redundant flight computers with voting.' }
            ]
          }
        },
      
  {
          id: 'cost-engineering',
          title: 'Cost Engineering',
          duration: '25 min',
          xp: 150,
          description: 'Making rockets affordable',
          aiTutor: true,
          introduction: `Space was once only for governments with unlimited budgets. Today, companies compete on cost. Understanding cost drivers helps design affordable rockets that open space to everyone.`,
          sections: [
            {
              title: 'Cost Breakdown',
              content: `**Typical Expendable Rocket:**
- Hardware: 60-70%
- Operations: 15-20%
- Range/insurance: 10-15%
- Overhead: 5-10%

**Hardware Costs:**
- Engines: 30-40% of hardware
- Structures: 20-30%
- Avionics: 15-20%
- Other: 15-25%

**Historical Costs:**
- Space Shuttle: ~$1.5B per launch
- Delta IV Heavy: ~$350M
- Atlas V: ~$150M
- Falcon 9: ~$67M (expendable)
- Falcon 9: ~$50M (reusable)`
            },
            {
              title: 'Cost Reduction Strategies',
              content: `**Reusability:**
- Biggest cost driver
- Falcon 9: 60% cost in first stage
- Reuse 10x = 10x cost reduction potential

**Vertical Integration:**
- Make components in-house
- SpaceX makes 80%+ internally
- Reduces markup, improves control

**Simplification:**
- Fewer parts = lower cost
- Merlin: 1 engine design, 9 per stage
- Common components across vehicles

**Production Rate:**
- Higher volume = lower unit cost
- Learning curve effects
- SpaceX: 50+ rockets/year

**Design for Manufacturing:**
- Easy to build = cheaper
- Automation where possible
- Starship: Stainless steel (cheap, easy)`
            },
            {
              title: 'The SpaceX Revolution',
              content: `**Cost Comparison ($/kg to LEO):**
| Vehicle | $/kg |
|---------|------|
| Shuttle | ~$54,000 |
| Delta IV | ~$14,000 |
| Falcon 9 (exp) | ~$2,700 |
| Falcon 9 (reuse) | ~$1,500 |
| Starship (goal) | ~$100 |

**How SpaceX Did It:**
- Reusability (first stage, fairings)
- Vertical integration
- Rapid iteration
- High production rate
- Simple, robust designs

**Future:**
Starship aims for <$10M per launch
Could enable $100/kg to orbit!`
            }
          ],
          keyTakeaways: [
            'Engines are 30-40% of hardware cost',
            'Reusability is the biggest cost reduction lever',
            'Vertical integration reduces costs and improves control',
            'SpaceX reduced costs from $54,000/kg to ~$1,500/kg'
          ],
          quiz: {
            questions: [
              { id: 'q1', question: 'Engines are what % of rocket hardware cost?', options: ['5-10%', '15-20%', '30-40%', '60-70%'], correctAnswer: 2, explanation: 'Engines typically represent 30-40% of hardware cost.' },
              { id: 'q2', question: 'Falcon 9 reusable cost to LEO is approximately:', options: ['$50,000/kg', '$10,000/kg', '$1,500/kg', '$100/kg'], correctAnswer: 2, explanation: 'Falcon 9 reusable achieves ~$1,500/kg to LEO.' },
              { id: 'q3', question: 'SpaceX manufactures what % of components in-house?', options: ['20%', '50%', '80%+', '100%'], correctAnswer: 2, explanation: 'SpaceX vertically integrates 80%+ of manufacturing.' },
              { id: 'q4', question: 'Space Shuttle cost per launch was:', options: ['$50M', '$150M', '$500M', '~$1.5B'], correctAnswer: 3, explanation: 'Shuttle launches cost approximately $1.5 billion each.' },
              { id: 'q5', question: 'Starship cost goal is:', options: ['$1,000/kg', '$500/kg', '~$100/kg', '$10/kg'], correctAnswer: 2, explanation: 'Starship aims for ~$100/kg to LEO - revolutionary if achieved.' }
            ]
          }
        },
        {
          id: 'systems-engineering',
          title: 'Systems Engineering',
          duration: '30 min',
          xp: 175,
          description: 'Managing rocket complexity',
          aiTutor: true,
          introduction: `A rocket is a system of systems - propulsion, structures, avionics, and more, all working together. Systems engineering ensures all pieces fit together and the whole vehicle meets requirements.`,
          sections: [
            {
              title: 'Systems Engineering Process',
              content: `**The V-Model:**
Left side (decomposition):
- System requirements
- Subsystem requirements
- Component requirements
- Detailed design

Right side (integration):
- Component testing
- Subsystem testing
- System testing
- Mission operations

**Key Activities:**
- Requirements management
- Interface control
- Configuration management
- Risk management
- Technical reviews`
            },
            {
              title: 'Interface Management',
              content: `**Why Interfaces Matter:**
Most problems occur at interfaces!
- Mechanical fit
- Electrical compatibility
- Data formats
- Thermal interactions

**Interface Control Document (ICD):**
- Defines all interfaces
- Owned by systems engineering
- Controlled changes only
- Both sides must agree

**Example Interfaces:**
- Stage 1 ↔ Stage 2
- Avionics ↔ Propulsion
- Vehicle ↔ Ground systems
- Payload ↔ Vehicle

**N² Diagram:**
Matrix showing all interfaces.
Helps identify missing or conflicting interfaces.`
            },
            {
              title: 'Risk Management',
              content: `**Risk = Probability × Consequence**

**Risk Categories:**
- Technical (will it work?)
- Schedule (will it be on time?)
- Cost (will it be affordable?)
- Safety (will anyone get hurt?)

**Risk Process:**
1. Identify risks
2. Assess probability and impact
3. Develop mitigations
4. Track and update

**Risk Matrix:**
| | Low Impact | High Impact |
|---|---|---|
| High Prob | Medium | High |
| Low Prob | Low | Medium |

**Mitigation Strategies:**
- Accept (low risks)
- Mitigate (reduce probability/impact)
- Transfer (insurance)
- Avoid (change design)`
            }
          ],
          keyTakeaways: [
            'V-model guides decomposition and integration',
            'Most problems occur at interfaces',
            'ICDs define and control all interfaces',
            'Risk management identifies and mitigates threats'
          ],
          quiz: {
            questions: [
              { id: 'q1', question: 'Most rocket problems occur at:', options: ['Engines', 'Interfaces', 'Structures', 'Software'], correctAnswer: 1, explanation: 'Interface issues are the most common source of problems.' },
              { id: 'q2', question: 'ICD stands for:', options: ['Internal Component Design', 'Interface Control Document', 'Integrated Circuit Device', 'Initial Concept Definition'], correctAnswer: 1, explanation: 'Interface Control Document defines all interfaces.' },
              { id: 'q3', question: 'Risk equals:', options: ['Probability only', 'Consequence only', 'Probability × Consequence', 'Cost'], correctAnswer: 2, explanation: 'Risk = Probability × Consequence (likelihood × impact).' },
              { id: 'q4', question: 'The V-model left side is:', options: ['Integration', 'Decomposition', 'Testing', 'Operations'], correctAnswer: 1, explanation: 'Left side decomposes requirements; right side integrates and tests.' },
              { id: 'q5', question: 'N² diagram shows:', options: ['Cost breakdown', 'All interfaces', 'Schedule', 'Risk matrix'], correctAnswer: 1, explanation: 'N² (N-squared) diagram maps all system interfaces.' }
            ]
          }
        },
        {

          id: 'reusability-design',
          title: 'Design for Reusability',
          duration: '30 min',
          xp: 175,
          description: 'Making rockets fly again',
          aiTutor: true,
          introduction: `Reusability is revolutionizing spaceflight economics. But designing a rocket to fly multiple times requires different thinking than expendable vehicles. Every system must survive, be inspectable, and be refurbishable.`,
          sections: [
            {
              title: 'Reusability Requirements',
              content: `**Design Life:**
- Expendable: 1 flight (~10 minutes)
- Reusable: 10-100+ flights
- Must survive repeated stress cycles

**Key Challenges:**
- Thermal cycling (ambient → 3,400K → ambient)
- Mechanical fatigue
- Corrosion and contamination
- Wear items

**Design Margins:**
- Higher safety factors
- Operate below maximum capability
- Reserve for degradation

**Falcon 9 Targets:**
- First stage: 10+ flights (achieved 20+)
- Engines: 10+ firings
- Fairings: 2+ flights`
            },
            {
              title: 'Inspection & Refurbishment',
              content: `**Between-Flight Inspection:**
- Visual inspection
- Borescope (internal)
- Non-destructive testing
- Data analysis from flight

**Refurbishment:**
- Replace wear items
- Clean and inspect
- Functional testing
- Typically 2-4 weeks turnaround

**What Gets Replaced:**
- Seals and gaskets
- Pyrotechnics
- Consumables
- Damaged components

**What Gets Reused:**
- Engines (with inspection)
- Tanks
- Structures
- Avionics (mostly)`
            },
            {
              title: 'Recovery Systems',
              content: `**Propulsive Landing (Falcon 9):**
- Boostback burn
- Entry burn
- Landing burn
- Grid fins for steering
- Landing legs

**Parachute Recovery:**
- Fairings use parachutes
- Simpler but less precise
- Water landing possible

**Catch Systems (Starship):**
- Tower catches booster
- No landing legs needed
- Saves mass
- Requires precision

**Trade-offs:**
- Propulsive: Precise but uses fuel
- Parachute: Simple but imprecise
- Catch: Mass-efficient but complex`
            }
          ],
          keyTakeaways: [
            'Reusable rockets need 10-100x design life of expendable',
            'Inspection and refurbishment between flights is critical',
            'Propulsive landing enables precise, rapid reuse',
            'Catch systems save mass but require extreme precision'
          ],
          quiz: {
            questions: [
              { id: 'q1', question: 'Falcon 9 first stage has achieved:', options: ['5 flights', '10 flights', '20+ flights', '100 flights'], correctAnswer: 2, explanation: 'Falcon 9 boosters have flown 20+ times.' },
              { id: 'q2', question: 'Typical refurbishment time is:', options: ['1 day', '2-4 weeks', '6 months', '1 year'], correctAnswer: 1, explanation: 'Falcon 9 turnaround is typically 2-4 weeks.' },
              { id: 'q3', question: 'Starship booster recovery uses:', options: ['Parachutes', 'Propulsive landing with legs', 'Tower catch', 'Water landing'], correctAnswer: 2, explanation: 'Mechazilla tower catches Super Heavy booster.' },
              { id: 'q4', question: 'Reusable design requires:', options: ['Lower safety factors', 'Higher safety factors', 'Same as expendable', 'No safety factors'], correctAnswer: 1, explanation: 'Reusable vehicles need higher margins for repeated use.' },
              { id: 'q5', question: 'Fairings are recovered using:', options: ['Propulsive landing', 'Parachutes', 'Helicopter catch', 'Not recovered'], correctAnswer: 1, explanation: 'Falcon 9 fairings use parachutes and are caught or water-landed.' }
            ]
          }
        },
        {
          id: 'future-propulsion',
          title: 'Future Propulsion Technologies',
          duration: '30 min',
          xp: 175,
          description: 'Beyond chemical rockets',
          aiTutor: true,
          introduction: `Chemical rockets have taken us to the Moon and Mars, but they have fundamental limits. Future propulsion technologies could enable faster travel, larger payloads, and missions to the outer solar system.`,
          sections: [
            {
              title: 'Electric Propulsion',
              content: `**Ion Engines:**
- Accelerate ions with electric field
- Isp: 1,500-10,000 seconds!
- Thrust: Very low (mN to N)
- Used: Deep space missions

**Hall Thrusters:**
- Similar to ion, different geometry
- Isp: 1,500-3,000 s
- Higher thrust than ion
- Used: Starlink satellites

**Limitations:**
- Low thrust (can't launch from Earth)
- Need large solar arrays or nuclear power
- Long trip times

**Applications:**
- Station keeping
- Orbit raising
- Interplanetary missions
- Starlink uses Hall thrusters`
            },
            {
              title: 'Nuclear Propulsion',
              content: `**Nuclear Thermal (NTR):**
- Nuclear reactor heats propellant
- Isp: 800-1000 seconds
- Thrust: High (like chemical)
- Could halve Mars trip time!

**Nuclear Electric (NEP):**
- Reactor generates electricity
- Powers ion/Hall thrusters
- Very high Isp, low thrust
- Good for outer planets

**Challenges:**
- Safety concerns
- Political issues
- Testing difficulties
- Public perception

**DRACO Program:**
- NASA/DARPA nuclear thermal demo
- Planned for 2027
- Could enable fast Mars transit`
            },
            {
              title: 'Advanced Concepts',
              content: `**Solar Sails:**
- Pushed by sunlight pressure
- No propellant needed!
- Very low acceleration
- Good for small probes

**Laser Propulsion:**
- Ground laser pushes spacecraft
- Could achieve very high speeds
- Breakthrough Starshot concept
- 20% light speed to Alpha Centauri?

**Fusion Propulsion:**
- If we can make fusion work...
- Isp: 10,000-1,000,000 seconds
- Could enable interstellar travel
- Still decades away

**Space Elevators:**
- Cable from Earth to orbit
- Climb up instead of rocket
- Requires materials we don't have yet
- Carbon nanotubes promising`
            }
          ],
          keyTakeaways: [
            'Electric propulsion: High Isp but low thrust',
            'Nuclear thermal could halve Mars trip time',
            'Solar sails need no propellant',
            'Fusion and space elevators are far-future technologies'
          ],
          quiz: {
            questions: [
              { id: 'q1', question: 'Ion engine Isp is:', options: ['300 s', '1,000 s', '1,500-10,000 s', '100,000 s'], correctAnswer: 2, explanation: 'Ion engines achieve 1,500-10,000 s Isp - far higher than chemical.' },
              { id: 'q2', question: 'Starlink satellites use:', options: ['Chemical rockets', 'Hall thrusters', 'Nuclear', 'Solar sails'], correctAnswer: 1, explanation: 'Starlink uses krypton Hall thrusters for orbit maintenance.' },
              { id: 'q3', question: 'Nuclear thermal Isp is approximately:', options: ['300 s', '500 s', '800-1000 s', '10,000 s'], correctAnswer: 2, explanation: 'NTR achieves 800-1000 s - about 2x chemical rockets.' },
              { id: 'q4', question: 'Solar sails are pushed by:', options: ['Solar wind', 'Sunlight pressure', 'Magnetic fields', 'Gravity'], correctAnswer: 1, explanation: 'Photon pressure from sunlight pushes solar sails.' },
              { id: 'q5', question: 'DRACO nuclear demo is planned for:', options: ['2024', '2027', '2035', '2050'], correctAnswer: 1, explanation: 'NASA/DARPA DRACO nuclear thermal demo targeted for 2027.' }
            ]
          }
        },
        {
          id: 'career-paths',
          title: 'Aerospace Career Paths',
          duration: '25 min',
          xp: 150,
          description: 'Your future in rocket engineering',
          aiTutor: true,
          introduction: `The space industry is booming with opportunities. From SpaceX to NASA to startups, there's never been a better time to pursue a career in aerospace. Let's explore the paths available to you.`,
          sections: [
            {
              title: 'Engineering Disciplines',
              content: `**Propulsion Engineer:**
- Design engines and propellant systems
- Combustion, turbomachinery, nozzles
- Degrees: Aerospace, Mechanical

**Structures Engineer:**
- Design tanks, airframes, mechanisms
- Stress analysis, materials
- Degrees: Aerospace, Mechanical, Civil

**GNC Engineer:**
- Guidance, navigation, control
- Algorithms, simulation
- Degrees: Aerospace, EE, CS

**Avionics Engineer:**
- Flight computers, sensors, software
- Embedded systems
- Degrees: EE, CS, Aerospace

**Systems Engineer:**
- Integration, requirements, interfaces
- Big picture thinking
- Degrees: Any engineering + experience`
            },
            {
              title: 'Companies & Organizations',
              content: `**Commercial:**
- SpaceX (Hawthorne, TX, FL)
- Blue Origin (Kent, WA; TX)
- Rocket Lab (Long Beach, NZ)
- Relativity Space (Long Beach)
- Many startups!

**Government:**
- NASA (multiple centers)
- Space Force
- National labs

**Traditional Aerospace:**
- Boeing
- Lockheed Martin
- Northrop Grumman
- ULA

**International:**
- ESA, JAXA, ISRO
- Arianespace, ROSCOSMOS
- Many national programs`
            },
            {
              title: 'Getting Started',
              content: `**Education:**
- Bachelor's in engineering (minimum)
- Master's helpful but not required
- PhD for research positions

**Skills to Develop:**
- Programming (Python, C/C++)
- CAD (SolidWorks, CATIA)
- Analysis tools (MATLAB, FEA)
- Hands-on building

**Experience:**
- Internships (apply early!)
- Student rocket teams
- Personal projects
- Research opportunities

**Tips:**
- Network at conferences
- Follow industry news
- Build things!
- Apply widely
- Persistence pays off`
            }
          ],
          keyTakeaways: [
            'Multiple engineering disciplines contribute to rockets',
            'Commercial space is growing rapidly with many opportunities',
            'Bachelors degree is minimum; hands-on experience valuable',
            'Student teams and internships are great entry points'
          ],
          quiz: {
            questions: [
              { id: 'q1', question: 'GNC stands for:', options: ['General Navigation Computer', 'Guidance Navigation Control', 'Ground Network Center', 'Global Navigation Constellation'], correctAnswer: 1, explanation: 'GNC = Guidance, Navigation, and Control engineering.' },
              { id: 'q2', question: 'SpaceX headquarters is in:', options: ['Houston', 'Hawthorne, CA', 'Seattle', 'Washington DC'], correctAnswer: 1, explanation: 'SpaceX HQ is in Hawthorne, California.' },
              { id: 'q3', question: 'Minimum education for aerospace engineer:', options: ['High school', 'Associates', 'Bachelors', 'Masters'], correctAnswer: 2, explanation: 'Bachelors degree in engineering is the minimum requirement.' },
              { id: 'q4', question: 'Best way to gain experience as a student:', options: ['Just study', 'Internships and rocket teams', 'Wait until graduation', 'Online courses only'], correctAnswer: 1, explanation: 'Internships and student rocket teams provide invaluable experience.' },
              { id: 'q5', question: 'Which is NOT a commercial space company?', options: ['SpaceX', 'Blue Origin', 'NASA', 'Rocket Lab'], correctAnswer: 2, explanation: 'NASA is a government agency, not a commercial company.' }
            ]
          }
        }
      ]
    }
  ]
};

export default section5Design;