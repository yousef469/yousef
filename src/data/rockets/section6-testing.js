// Section 6: Testing & Operations
// 10 Lessons - Testing, launch operations, mission control

export const section6Testing = {
  id: 'testing-ops',
  title: 'Unit 5: Testing & Operations',
  description: 'Testing rockets and conducting launches',
  icon: '🔬',
  color: 'from-red-500 to-orange-500',
  units: [
    {
      id: 'testing-operations',
      title: 'Testing & Launch Operations',
      description: 'From test stand to orbit',
      lessons: [
        {
          id: 'test-philosophy',
          title: 'Test Philosophy',
          duration: '25 min',
          xp: 150,
          description: 'Why and how we test rockets',
          aiTutor: true,
          introduction: `Testing is how we turn designs into reliable rockets. Every component, subsystem, and complete vehicle must prove it works before flight. The philosophy of testing determines success or failure.`,
          sections: [
            {
              title: 'Test Philosophies',
              content: `**Traditional (NASA/Old Space):**
- Extensive analysis before testing
- Few, expensive tests
- High confidence before each test
- Long development cycles

**Iterative (SpaceX):**
- Test early, test often
- Learn from failures
- Rapid iteration
- "Hardware-rich" approach

**Test Like You Fly:**
- Test conditions match flight
- Same hardware, same environment
- Realistic scenarios
- No surprises in flight

**Fly Like You Test:**
- Don't exceed tested conditions
- Stay within proven envelope
- Gradual expansion of capability`
            },
            {
              title: 'Test Pyramid',
              content: `**Component Level (Base):**
- Individual parts
- Thousands of tests
- Cheap, fast
- Valves, sensors, actuators

**Subsystem Level:**
- Integrated components
- Hundreds of tests
- Engine assemblies, avionics boxes

**System Level:**
- Complete stages
- Tens of tests
- Full-duration firings

**Vehicle Level (Top):**
- Complete rocket
- Few tests
- Most expensive
- Flight tests

**More tests at bottom, fewer at top.
Find problems early when cheap to fix!`
            },
            {
              title: 'Test Documentation',
              content: `**Test Plan:**
- What to test
- Success criteria
- Resources needed
- Schedule

**Test Procedure:**
- Step-by-step instructions
- Safety precautions
- Data to collect
- Contingencies

**Test Report:**
- Results vs predictions
- Anomalies observed
- Lessons learned
- Recommendations

**Test Readiness Review:**
- Is hardware ready?
- Is facility ready?
- Are procedures approved?
- Go/no-go decision`
            }
          ],
          keyTakeaways: [
            'Test early and often - find problems when cheap to fix',
            'Test like you fly - realistic conditions essential',
            'Test pyramid: many component tests, few vehicle tests',
            'Documentation ensures repeatability and learning'
          ],
          quiz: {
            questions: [
              { id: 'q1', question: 'SpaceX test philosophy emphasizes:', options: ['Extensive analysis first', 'Test early and often', 'Minimal testing', 'Only flight testing'], correctAnswer: 1, explanation: 'SpaceX tests early, learns from failures, iterates rapidly.' },
              { id: 'q2', question: 'Test pyramid has most tests at:', options: ['Vehicle level', 'System level', 'Component level', 'All equal'], correctAnswer: 2, explanation: 'Component tests are cheapest - do many to find problems early.' },
              { id: 'q3', question: 'Test like you fly means:', options: ['Test in flight', 'Match flight conditions', 'Skip ground testing', 'Test faster'], correctAnswer: 1, explanation: 'Test conditions should match actual flight environment.' },
              { id: 'q4', question: 'Test Readiness Review determines:', options: ['Test results', 'Go/no-go for test', 'Budget', 'Schedule only'], correctAnswer: 1, explanation: 'TRR confirms readiness and authorizes test to proceed.' },
              { id: 'q5', question: 'Finding problems early is important because:', options: ['Its more exciting', 'Fixes are cheaper', 'Tests are easier', 'Documentation is simpler'], correctAnswer: 1, explanation: 'Early problems are much cheaper to fix than late ones.' }
            ]
          }
        },
  
      {
          id: 'ground-testing',
          title: 'Ground Testing',
          duration: '30 min',
          xp: 175,
          description: 'Testing rockets without leaving Earth',
          aiTutor: true,
          introduction: `Before a rocket flies, it undergoes extensive ground testing. From engine test stands to thermal vacuum chambers, ground tests prove the vehicle is ready for the harsh environment of launch and space.`,
          sections: [
            {
              title: 'Engine Testing',
              content: `**Test Stand Components:**
- Thrust measurement (load cells)
- Propellant feed systems
- Data acquisition (1000s of sensors)
- High-speed cameras
- Sound suppression (water deluge)

**Test Types:**
- Hot fire: Full combustion test
- Cold flow: Propellant flow without ignition
- Acceptance: Each flight engine
- Development: New designs

**Measurements:**
- Thrust (±0.1% accuracy)
- Chamber pressure
- Temperatures (100s of points)
- Flow rates
- Vibration

**SpaceX McGregor:**
- Tests all Merlin and Raptor engines
- Multiple test stands
- 1000s of tests per year`
            },
            {
              title: 'Environmental Testing',
              content: `**Vibration Testing:**
- Shake tables simulate launch
- Random vibration spectrum
- Sine sweep finds resonances
- Proves structure survives

**Acoustic Testing:**
- 140+ dB sound levels
- Simulates launch acoustics
- Large reverberant chambers
- Critical for payloads

**Thermal Vacuum:**
- Space environment simulation
- Vacuum + temperature cycling
- -150°C to +150°C
- Proves thermal design

**EMI/EMC Testing:**
- Electromagnetic compatibility
- No interference between systems
- Shielded chambers
- Required for all avionics`
            },
            {
              title: 'Static Fire',
              content: `**What is Static Fire?**
Full vehicle on pad, engines fire briefly.
Vehicle doesn't move (held down).

**Purpose:**
- Verify all systems work together
- Check propellant loading
- Confirm engine performance
- Final check before flight

**Falcon 9 Static Fire:**
- ~3 seconds duration
- All 9 engines fire
- Typically 1-2 days before launch
- Data reviewed before flight

**Starship Static Fire:**
- Tests Raptor engines
- Multiple static fires during development
- Validates vehicle integration`
            }
          ],
          keyTakeaways: [
            'Engine tests measure thrust, pressure, temperature, flow',
            'Environmental tests simulate launch and space conditions',
            'Static fire is final integrated test before flight',
            'Thousands of sensors capture data for analysis'
          ],
          quiz: {
            questions: [
              { id: 'q1', question: 'Static fire duration for Falcon 9 is:', options: ['30 seconds', '3 seconds', '3 minutes', '30 minutes'], correctAnswer: 1, explanation: 'Falcon 9 static fires last ~3 seconds.' },
              { id: 'q2', question: 'Thermal vacuum testing simulates:', options: ['Launch acoustics', 'Space environment', 'Vibration', 'Rain'], correctAnswer: 1, explanation: 'TVAC simulates vacuum and temperature extremes of space.' },
              { id: 'q3', question: 'Acoustic testing levels exceed:', options: ['100 dB', '120 dB', '140 dB', '180 dB'], correctAnswer: 2, explanation: 'Launch acoustics exceed 140 dB - extremely loud!' },
              { id: 'q4', question: 'SpaceX engine testing is done at:', options: ['Cape Canaveral', 'McGregor, TX', 'Hawthorne', 'Vandenberg'], correctAnswer: 1, explanation: 'McGregor, Texas is SpaceX primary engine test facility.' },
              { id: 'q5', question: 'Static fire occurs how long before launch?', options: ['1 hour', '1-2 days', '1 week', '1 month'], correctAnswer: 1, explanation: 'Static fire typically occurs 1-2 days before launch.' }
            ]
          }
        },
        {
          id: 'launch-site',
          title: 'Launch Site Operations',
          duration: '30 min',
          xp: 175,
          description: 'Preparing rockets for launch',
          aiTutor: true,
          introduction: `Launch sites are where rockets meet their destiny. From vehicle integration to propellant loading, launch site operations are a carefully choreographed sequence leading to liftoff.`,
          sections: [
            {
              title: 'Launch Site Facilities',
              content: `**Vehicle Assembly:**
- Integration buildings
- Cleanrooms for payloads
- Horizontal or vertical integration

**Launch Pad:**
- Flame trench
- Sound suppression
- Propellant storage
- Lightning protection
- Launch mount

**Support Facilities:**
- Mission control
- Tracking stations
- Weather monitoring
- Emergency response

**Major US Sites:**
- Cape Canaveral (FL): East coast
- Vandenberg (CA): Polar orbits
- Wallops (VA): Small rockets
- Boca Chica (TX): SpaceX Starship`
            },
            {
              title: 'Launch Campaign',
              content: `**Typical Timeline:**
- L-30 days: Vehicle arrives
- L-14 days: Payload integration
- L-7 days: Payload encapsulation
- L-3 days: Vehicle rollout
- L-2 days: Static fire
- L-1 day: Final preps
- L-0: Launch!

**Falcon 9 Efficiency:**
- Horizontal integration
- Transport to pad on transporter
- Raise to vertical
- Same-day propellant load
- Rapid turnaround possible

**Starship Operations:**
- Vertical stacking on pad
- Mechazilla tower
- Rapid reuse goal`
            },
            {
              title: 'Propellant Loading',
              content: `**Cryogenic Loading:**
- LOX: -183°C
- LH2: -253°C
- CH4: -161°C
- Must load close to launch (boil-off)

**Falcon 9 Loading:**
- T-35 min: RP-1 loading
- T-35 min: LOX loading begins
- T-7 min: Full load
- T-1 min: Final top-off

**Densification:**
- SpaceX supercools propellants
- LOX at -207°C (vs -183°C)
- 8% more propellant capacity
- Must launch quickly after load

**Safety:**
- Exclusion zones
- Remote operations
- Automated sequences
- Abort capability`
            }
          ],
          keyTakeaways: [
            'Launch sites have assembly, pad, and support facilities',
            'Launch campaigns take weeks of preparation',
            'Cryogenic propellants loaded close to launch',
            'SpaceX densification increases propellant capacity 8%'
          ],
          quiz: {
            questions: [
              { id: 'q1', question: 'Falcon 9 uses which integration method?', options: ['Vertical only', 'Horizontal', 'In-flight', 'Underground'], correctAnswer: 1, explanation: 'Falcon 9 integrates horizontally, then raises to vertical on pad.' },
              { id: 'q2', question: 'LOX boiling point is:', options: ['-253°C', '-183°C', '-161°C', '0°C'], correctAnswer: 1, explanation: 'Liquid oxygen boils at -183°C.' },
              { id: 'q3', question: 'Vandenberg is used for:', options: ['Only east launches', 'Polar orbits', 'Only crewed', 'Testing only'], correctAnswer: 1, explanation: 'Vandenberg launches south over ocean for polar orbits.' },
              { id: 'q4', question: 'Propellant densification increases capacity by:', options: ['1%', '8%', '20%', '50%'], correctAnswer: 1, explanation: 'Supercooling propellants increases density by ~8%.' },
              { id: 'q5', question: 'Payload encapsulation occurs:', options: ['At factory', 'L-7 days', 'L-1 hour', 'After launch'], correctAnswer: 1, explanation: 'Fairing installation typically happens about a week before launch.' }
            ]
          }
        },
    
    {
          id: 'countdown',
          title: 'Launch Countdown',
          duration: '25 min',
          xp: 150,
          description: 'The final hours before liftoff',
          aiTutor: true,
          introduction: `The countdown is the final sequence leading to launch. Every system is checked, propellants loaded, and the vehicle prepared for its journey. It's a carefully orchestrated process with no room for error.`,
          sections: [
            {
              title: 'Countdown Sequence',
              content: `**T-4 hours:**
- Final vehicle checks
- Weather assessment
- Range clearance

**T-1 hour:**
- Propellant loading begins
- Crew ingress (if crewed)
- Final software loads

**T-10 minutes:**
- Terminal count begins
- Automated sequence starts
- Final polls

**T-1 minute:**
- Propellant top-off complete
- Vehicle in flight configuration
- Final hold point

**T-10 seconds:**
- Ignition sequence start
- Engine start commands
- Sound suppression water

**T-0:**
- Liftoff!`
            },
            {
              title: 'Go/No-Go Polls',
              content: `**What is a Poll?**
Each console position reports status.
"Go" = ready, "No-go" = problem.

**Key Positions:**
- Flight Director: Overall authority
- Propulsion: Engine systems
- GNC: Guidance and control
- Range Safety: Public safety
- Weather: Conditions acceptable
- Payload: Customer ready

**Criteria:**
- All systems nominal
- Weather within limits
- Range clear
- Tracking ready

**Hold vs Scrub:**
- Hold: Pause countdown, may resume
- Scrub: Cancel for the day
- Recycle: Reset to earlier time`
            },
            {
              title: 'Abort Modes',
              content: `**Pre-Ignition Abort:**
- Problem detected before engine start
- Safest - just don't launch
- Can recycle and try again

**Pad Abort:**
- Engines started but problem detected
- Shutdown before liftoff
- Falcon 9 has done this

**In-Flight Abort:**
- Problem after liftoff
- Crew escape (if crewed)
- Vehicle may be lost

**Abort Triggers:**
- Engine anomaly
- Guidance failure
- Structural issue
- Range safety violation

**Falcon 9 Pad Abort (2016):**
- Anomaly detected at T-0
- Engines shut down
- Vehicle safe
- Launched successfully later`
            }
          ],
          keyTakeaways: [
            'Countdown is carefully sequenced over hours',
            'Go/No-Go polls confirm all systems ready',
            'Multiple abort modes protect vehicle and crew',
            'Holds allow issues to be resolved without scrubbing'
          ],
          quiz: {
            questions: [
              { id: 'q1', question: 'Terminal count begins at approximately:', options: ['T-4 hours', 'T-1 hour', 'T-10 minutes', 'T-10 seconds'], correctAnswer: 2, explanation: 'Terminal count (automated sequence) starts around T-10 minutes.' },
              { id: 'q2', question: 'A scrub means:', options: ['Clean the rocket', 'Cancel for the day', 'Pause briefly', 'Launch immediately'], correctAnswer: 1, explanation: 'Scrub = cancel launch attempt for the day.' },
              { id: 'q3', question: 'Flight Director has:', options: ['No authority', 'Overall authority', 'Weather authority only', 'Propulsion authority only'], correctAnswer: 1, explanation: 'Flight Director has overall authority for launch decision.' },
              { id: 'q4', question: 'Pad abort occurs:', options: ['Before ignition', 'After ignition, before liftoff', 'After liftoff', 'In orbit'], correctAnswer: 1, explanation: 'Pad abort: engines started but shutdown before liftoff.' },
              { id: 'q5', question: 'Propellant loading typically starts at:', options: ['T-4 hours', 'T-1 hour', 'T-10 minutes', 'T-1 minute'], correctAnswer: 1, explanation: 'Cryogenic propellant loading begins about 1 hour before launch.' }
            ]
          }
        },
        {
          id: 'mission-control',
          title: 'Mission Control',
          duration: '30 min',
          xp: 175,
          description: 'Commanding rockets from the ground',
          aiTutor: true,
          introduction: `Mission Control is the nerve center of every launch. Teams of engineers monitor every system, ready to respond to any situation. From Houston to Hawthorne, mission control makes spaceflight possible.`,
          sections: [
            {
              title: 'Control Room Layout',
              content: `**Front Room:**
- Flight Director (center)
- Key system consoles
- Large displays
- Real-time decisions

**Back Room:**
- Detailed system experts
- Support front room
- Deep analysis capability

**Console Positions:**
- FLIGHT: Flight Director
- PROP: Propulsion
- GNC: Guidance/Navigation/Control
- EECOM: Electrical/Environmental
- CAPCOM: Crew communication
- FIDO: Flight Dynamics

**Displays:**
- Telemetry data
- Trajectory plots
- Video feeds
- Timeline`
            },
            {
              title: 'Flight Director Role',
              content: `**Responsibilities:**
- Overall mission authority
- Go/No-Go decisions
- Anomaly response
- Team coordination

**Famous Flight Directors:**
- Chris Kraft (invented the role)
- Gene Kranz (Apollo 13)
- Milt Heflin (Shuttle era)

**Decision Making:**
- Gather information quickly
- Assess options
- Make decisive calls
- Accept responsibility

**Gene Kranz Quote:**
"Failure is not an option."
(Actually said by a screenwriter, but captures the spirit!)`
            },
            {
              title: 'Anomaly Response',
              content: `**When Things Go Wrong:**
1. Recognize the problem
2. Gather data
3. Assess severity
4. Determine options
5. Execute response

**Communication:**
- Clear, concise calls
- Standard phraseology
- Confirm understanding
- Document everything

**Apollo 13 Example:**
- Oxygen tank explosion
- Mission control worked problem
- Improvised solutions
- Brought crew home safely

**Modern Automation:**
- Many responses automated
- Faster than human reaction
- Mission control monitors
- Intervenes when needed`
            }
          ],
          keyTakeaways: [
            'Mission control monitors all systems in real-time',
            'Flight Director has overall mission authority',
            'Clear communication protocols prevent confusion',
            'Modern systems automate many responses'
          ],
          quiz: {
            questions: [
              { id: 'q1', question: 'Flight Director position is called:', options: ['CAPCOM', 'FLIGHT', 'GNC', 'PROP'], correctAnswer: 1, explanation: 'FLIGHT is the call sign for Flight Director.' },
              { id: 'q2', question: 'CAPCOM communicates with:', options: ['Propulsion', 'The crew', 'Range safety', 'Weather'], correctAnswer: 1, explanation: 'CAPCOM (Capsule Communicator) talks to the crew.' },
              { id: 'q3', question: 'Back room provides:', options: ['Snacks', 'Detailed expert support', 'Public relations', 'Security'], correctAnswer: 1, explanation: 'Back room has deep experts supporting front room consoles.' },
              { id: 'q4', question: 'Who invented the Flight Director role?', options: ['Gene Kranz', 'Chris Kraft', 'Wernher von Braun', 'Elon Musk'], correctAnswer: 1, explanation: 'Chris Kraft created the Flight Director role for Mercury program.' },
              { id: 'q5', question: 'Modern anomaly response is often:', options: ['Ignored', 'Automated', 'Delayed', 'Manual only'], correctAnswer: 1, explanation: 'Many responses are automated for speed; humans monitor and intervene.' }
            ]
          }
        },
        
{
          id: 'range-safety',
          title: 'Range Safety',
          duration: '25 min',
          xp: 150,
          description: 'Protecting people during launches',
          aiTutor: true,
          introduction: `Range safety ensures that rocket launches don't endanger the public. From exclusion zones to flight termination systems, multiple layers of protection keep people safe even if something goes wrong.`,
          sections: [
            {
              title: 'Range Safety Principles',
              content: `**Primary Goal:**
Protect public safety above all else.

**Risk Criteria:**
- Expected Casualty (Ec) < 30 per million
- Individual risk limits
- Collective risk limits

**Protection Methods:**
- Exclusion zones (keep people away)
- Flight corridors (planned trajectory)
- Flight termination (destroy if off-course)
- Tracking (know where rocket is)

**Range Organizations:**
- Eastern Range (Cape Canaveral)
- Western Range (Vandenberg)
- Wallops Flight Facility
- Commercial ranges`
            },
            {
              title: 'Flight Termination System',
              content: `**Purpose:**
Destroy rocket if it threatens populated areas.

**Traditional FTS:**
- Ground command
- Range safety officer watches
- Sends destruct command if needed
- Explosive charges cut tanks

**Autonomous FTS (AFTS):**
- GPS-based
- Onboard decision making
- Faster response
- No ground command needed
- Falcon 9 uses AFTS

**Termination Criteria:**
- Leaves flight corridor
- Exceeds velocity limits
- Loss of tracking
- Loss of control

**AFTS Advantages:**
- Faster response
- Works over ocean (no ground stations)
- Reduces range infrastructure`
            },
            {
              title: 'Debris Analysis',
              content: `**What Happens After Termination?**
Debris falls - must predict where.

**Debris Footprint:**
- Area where debris may land
- Depends on altitude, velocity, breakup
- Must be over unpopulated area

**Casualty Analysis:**
- Population density
- Debris characteristics
- Probability of impact
- Probability of casualty

**Exclusion Zones:**
- Ocean areas cleared of ships
- Airspace restricted
- Ground areas evacuated if needed

**Notices:**
- NOTAM (Notice to Airmen)
- NOTMAR (Notice to Mariners)
- Public notifications`
            }
          ],
          keyTakeaways: [
            'Range safety protects public from rocket accidents',
            'FTS destroys rocket if it threatens populated areas',
            'AFTS makes autonomous termination decisions',
            'Debris analysis ensures safe impact zones'
          ],
          quiz: {
            questions: [
              { id: 'q1', question: 'Primary range safety goal is:', options: ['Protect rocket', 'Protect payload', 'Protect public', 'Protect schedule'], correctAnswer: 2, explanation: 'Public safety is the primary concern of range safety.' },
              { id: 'q2', question: 'AFTS stands for:', options: ['Automatic Flight Tracking System', 'Autonomous Flight Termination System', 'Advanced Fuel Transfer System', 'Attitude Flight Test System'], correctAnswer: 1, explanation: 'Autonomous Flight Termination System makes onboard destruct decisions.' },
              { id: 'q3', question: 'FTS is triggered when rocket:', options: ['Reaches orbit', 'Leaves flight corridor', 'Runs low on fuel', 'Completes mission'], correctAnswer: 1, explanation: 'FTS activates if rocket leaves designated safe corridor.' },
              { id: 'q4', question: 'NOTAM stands for:', options: ['Notice to All Mariners', 'Notice to Airmen', 'National Orbital Tracking And Monitoring', 'Navigation Of Trajectory And Mission'], correctAnswer: 1, explanation: 'NOTAM = Notice to Airmen, warns of restricted airspace.' },
              { id: 'q5', question: 'Falcon 9 uses which FTS type?', options: ['Ground command only', 'AFTS', 'No FTS', 'Manual'], correctAnswer: 1, explanation: 'Falcon 9 uses Autonomous FTS for faster, more flexible operations.' }
            ]
          }
        },
        {
          id: 'weather',
          title: 'Launch Weather',
          duration: '25 min',
          xp: 150,
          description: 'When weather says no',
          aiTutor: true,
          introduction: `Weather is one of the biggest factors in launch decisions. Lightning, wind, rain, and clouds can all prevent a launch. Understanding weather constraints helps explain why launches sometimes scrub.`,
          sections: [
            {
              title: 'Weather Constraints',
              content: `**Lightning:**
- Most common constraint
- Can't launch through anvil clouds
- Must wait for storms to clear
- Triggered lightning is a risk

**Wind:**
- Upper level winds affect trajectory
- Surface winds affect pad operations
- Wind shear can stress vehicle
- Limits: ~30-40 mph surface

**Precipitation:**
- Rain can damage vehicle
- Ice formation on cryogenic tanks
- Visibility for tracking

**Clouds:**
- Cumulus can indicate convection
- Must see rocket for tracking
- Some cloud types prohibited

**Temperature:**
- Affects propellant density
- O-ring concerns (Challenger)
- Equipment operating limits`
            },
            {
              title: 'Weather Monitoring',
              content: `**45th Weather Squadron:**
- Dedicated to Cape Canaveral
- 24/7 monitoring
- Launch forecasts
- Go/No-Go recommendations

**Tools:**
- Weather balloons
- Radar
- Satellites
- Field mills (lightning)
- Wind profilers

**Forecast Products:**
- L-3 day outlook
- L-24 hour forecast
- L-4 hour update
- Real-time monitoring

**Probability of Violation (POV):**
- Chance weather will violate criteria
- <20% POV typically needed
- Updated throughout countdown`
            },
            {
              title: 'Weather Decisions',
              content: `**Who Decides?**
- Weather officer provides data
- Launch director makes call
- Conservative approach

**Scrub vs Wait:**
- Brief weather: May hold
- Extended weather: Scrub
- Window duration matters

**Florida Challenges:**
- Afternoon thunderstorms common
- Sea breeze convergence
- Morning launches preferred

**California Advantages:**
- More stable weather
- Marine layer main issue
- Fewer lightning concerns

**Statistics:**
- ~30-40% of scrubs are weather
- Florida worse than California
- Summer worse than winter`
            }
          ],
          keyTakeaways: [
            'Lightning is the most common weather constraint',
            'Wind, rain, and clouds also affect launch decisions',
            '45th Weather Squadron provides dedicated forecasts',
            '30-40% of launch scrubs are weather-related'
          ],
          quiz: {
            questions: [
              { id: 'q1', question: 'Most common weather constraint is:', options: ['Wind', 'Rain', 'Lightning', 'Temperature'], correctAnswer: 2, explanation: 'Lightning is the most frequent cause of weather delays.' },
              { id: 'q2', question: 'Surface wind limit is approximately:', options: ['10 mph', '30-40 mph', '100 mph', 'No limit'], correctAnswer: 1, explanation: 'Surface winds above 30-40 mph typically prevent launch.' },
              { id: 'q3', question: 'What % of scrubs are weather-related?', options: ['5-10%', '15-20%', '30-40%', '60-70%'], correctAnswer: 2, explanation: 'Weather causes 30-40% of launch scrubs.' },
              { id: 'q4', question: 'Florida weather challenge is:', options: ['Too cold', 'Afternoon thunderstorms', 'Too dry', 'No wind'], correctAnswer: 1, explanation: 'Florida has frequent afternoon thunderstorms, especially in summer.' },
              { id: 'q5', question: 'POV stands for:', options: ['Point of View', 'Probability of Violation', 'Percent of Visibility', 'Power of Vehicle'], correctAnswer: 1, explanation: 'Probability of Violation = chance weather will violate launch criteria.' }
            ]
          }
        },
  
      {
          id: 'post-flight',
          title: 'Post-Flight Analysis',
          duration: '25 min',
          xp: 150,
          description: 'Learning from every flight',
          aiTutor: true,
          introduction: `Every flight generates gigabytes of data. Post-flight analysis extracts lessons learned, identifies anomalies, and improves future flights. It's how rockets get better over time.`,
          sections: [
            {
              title: 'Data Collection',
              content: `**Telemetry Data:**
- Thousands of parameters
- Recorded throughout flight
- Transmitted to ground
- Stored for analysis

**Video:**
- Onboard cameras
- Ground tracking cameras
- Drone ship cameras
- Public broadcast

**Recovered Hardware:**
- First stage (if reusable)
- Fairings
- Physical inspection
- Forensic analysis

**Data Volume:**
- Falcon 9: ~10 GB per flight
- Thousands of channels
- Millisecond resolution`
            },
            {
              title: 'Analysis Process',
              content: `**Quick Look:**
- Immediate post-flight
- Key parameters check
- Obvious anomalies
- Initial success assessment

**Detailed Analysis:**
- Days to weeks
- Every parameter reviewed
- Compare to predictions
- Identify trends

**Anomaly Investigation:**
- Root cause analysis
- Fault tree
- Corrective actions
- Prevent recurrence

**Flight Readiness:**
- Analysis must complete
- Anomalies resolved
- Before next flight approved`
            },
            {
              title: 'Continuous Improvement',
              content: `**Lessons Learned:**
- Document findings
- Share across teams
- Update procedures
- Improve designs

**Fleet Leader:**
- Track usage of each vehicle
- Identify wear patterns
- Predict maintenance needs
- Extend service life

**Performance Trends:**
- Engine performance over flights
- Structural health
- Avionics reliability
- Identify degradation

**SpaceX Approach:**
- Rapid analysis
- Quick turnaround
- Continuous updates
- Data-driven decisions`
            }
          ],
          keyTakeaways: [
            'Every flight generates gigabytes of telemetry data',
            'Quick look analysis happens immediately after flight',
            'Anomaly investigation finds root causes',
            'Lessons learned improve future flights'
          ],
          quiz: {
            questions: [
              { id: 'q1', question: 'Falcon 9 generates approximately how much data per flight?', options: ['1 MB', '100 MB', '~10 GB', '1 TB'], correctAnswer: 2, explanation: 'Falcon 9 generates ~10 GB of telemetry per flight.' },
              { id: 'q2', question: 'Quick look analysis happens:', options: ['Before flight', 'Immediately after flight', 'Weeks later', 'Never'], correctAnswer: 1, explanation: 'Quick look is immediate post-flight assessment of key parameters.' },
              { id: 'q3', question: 'Anomaly investigation uses:', options: ['Guessing', 'Root cause analysis', 'Ignoring problems', 'Random fixes'], correctAnswer: 1, explanation: 'Root cause analysis systematically identifies why anomalies occurred.' },
              { id: 'q4', question: 'Fleet leader tracking helps:', options: ['Marketing', 'Predict maintenance needs', 'Reduce data', 'Speed up launches'], correctAnswer: 1, explanation: 'Fleet leader data predicts when maintenance or replacement is needed.' },
              { id: 'q5', question: 'Before next flight, anomalies must be:', options: ['Ignored', 'Documented only', 'Resolved', 'Hidden'], correctAnswer: 2, explanation: 'All anomalies must be resolved before approving next flight.' }
            ]
          }
        },
        {
          id: 'failure-investigation',
          title: 'Failure Investigation',
          duration: '30 min',
          xp: 175,
          description: 'When things go wrong',
          aiTutor: true,
          introduction: `Rocket failures are rare but devastating. When they happen, thorough investigation is essential to understand what went wrong and prevent it from happening again. Every failure makes rockets safer.`,
          sections: [
            {
              title: 'Investigation Process',
              content: `**Immediate Response:**
- Secure the scene
- Preserve evidence
- Impound data
- Notify authorities

**Investigation Team:**
- Independent investigators
- Subject matter experts
- Quality assurance
- Sometimes NASA/FAA oversight

**Evidence Collection:**
- Telemetry analysis
- Debris recovery
- Witness interviews
- Manufacturing records

**Timeline:**
- Weeks to months
- Thorough, not rushed
- Must find root cause
- Return to flight depends on it`
            },
            {
              title: 'Root Cause Analysis',
              content: `**Fault Tree:**
- Start with failure event
- Work backward to causes
- Identify all contributors
- Find root cause(s)

**5 Whys:**
- Ask "why" repeatedly
- Dig deeper each time
- Find underlying cause
- Not just symptoms

**Fishbone Diagram:**
- Categories of causes
- People, process, equipment
- Environment, materials
- Systematic approach

**Common Causes:**
- Design errors
- Manufacturing defects
- Procedural mistakes
- Environmental factors
- Software bugs`
            },
            {
              title: 'Return to Flight',
              content: `**Corrective Actions:**
- Fix the root cause
- Verify effectiveness
- Update procedures
- Retrain if needed

**Independent Review:**
- External experts
- Challenge assumptions
- Verify completeness
- Approve return to flight

**Communication:**
- Transparent reporting
- Customer notification
- Public statement
- Regulatory compliance

**Famous Investigations:**
- Challenger (1986): O-ring failure
- Columbia (2003): Foam strike
- Falcon 9 (2015): Strut failure
- Falcon 9 (2016): COPV failure

Each led to significant improvements.`
            }
          ],
          keyTakeaways: [
            'Failure investigation is thorough and systematic',
            'Root cause analysis finds underlying causes, not symptoms',
            'Corrective actions must be verified before return to flight',
            'Every failure leads to improvements'
          ],
          quiz: {
            questions: [
              { id: 'q1', question: 'First step after failure is:', options: ['Launch again', 'Secure scene and preserve evidence', 'Blame someone', 'Ignore it'], correctAnswer: 1, explanation: 'Preserving evidence is critical for investigation.' },
              { id: 'q2', question: '5 Whys technique:', options: ['Asks why 5 times to find root cause', 'Takes 5 days', 'Needs 5 people', 'Costs $5 million'], correctAnswer: 0, explanation: '5 Whys repeatedly asks "why" to dig to root cause.' },
              { id: 'q3', question: 'Challenger failure was caused by:', options: ['Engine failure', 'O-ring failure', 'Software bug', 'Pilot error'], correctAnswer: 1, explanation: 'Cold temperature caused O-ring failure in solid rocket booster.' },
              { id: 'q4', question: 'Return to flight requires:', options: ['Just fixing the problem', 'Independent review approval', 'Waiting 1 year', 'New rocket design'], correctAnswer: 1, explanation: 'Independent review must verify corrective actions before return to flight.' },
              { id: 'q5', question: 'Investigation timeline is typically:', options: ['Hours', 'Days', 'Weeks to months', 'Years'], correctAnswer: 2, explanation: 'Thorough investigations take weeks to months.' }
            ]
          }
        },
       
 {
          id: 'orbital-operations',
          title: 'Orbital Operations',
          duration: '30 min',
          xp: 175,
          description: 'What happens after reaching orbit',
          aiTutor: true,
          introduction: `Reaching orbit is just the beginning. Satellites must be deployed, orbits adjusted, and missions executed. Understanding orbital operations completes your knowledge of the full mission lifecycle.`,
          sections: [
            {
              title: 'Payload Deployment',
              content: `**Deployment Sequence:**
1. Reach target orbit
2. Attitude stabilization
3. Separation command
4. Springs/pushers deploy payload
5. Confirm separation
6. Payload activates

**Deployment Methods:**
- Spring pushers (simple)
- Spin deployment (stability)
- Robotic arm (ISS)
- Dispenser (multiple sats)

**Rideshare Deployment:**
- Multiple payloads
- Sequenced deployment
- Different orbits possible
- Collision avoidance critical

**Confirmation:**
- Telemetry from payload
- Ground tracking
- Visual (cameras)`
            },
            {
              title: 'Orbit Adjustment',
              content: `**Why Adjust?**
- Insertion errors
- Different target orbit
- Collision avoidance
- Station keeping

**Maneuver Types:**
- Hohmann transfer (efficient)
- Bi-elliptic (very high orbits)
- Plane change (expensive!)
- Phasing (rendezvous)

**Propulsion Options:**
- Chemical (fast, high thrust)
- Electric (slow, efficient)
- Combination

**GTO to GEO:**
- Launch to transfer orbit
- Coast to apogee
- Circularization burn
- Takes hours to days`
            },
            {
              title: 'End of Mission',
              content: `**Deorbit (LEO):**
- Retrograde burn
- Reenter atmosphere
- Burn up or controlled impact
- Required within 25 years

**Graveyard Orbit (GEO):**
- Boost above GEO
- ~300 km higher
- Doesn't interfere with active sats
- Remains indefinitely

**Passivation:**
- Deplete propellants
- Discharge batteries
- Prevent explosions
- Reduce debris risk

**Space Debris:**
- Growing problem
- Collision risk
- Active debris removal (future)
- Design for demise`
            }
          ],
          keyTakeaways: [
            'Payload deployment is carefully sequenced',
            'Orbit adjustments use chemical or electric propulsion',
            'LEO satellites must deorbit within 25 years',
            'GEO satellites go to graveyard orbit'
          ],
          quiz: {
            questions: [
              { id: 'q1', question: 'LEO satellites must deorbit within:', options: ['1 year', '5 years', '25 years', 'Never'], correctAnswer: 2, explanation: 'International guidelines require LEO deorbit within 25 years.' },
              { id: 'q2', question: 'Graveyard orbit is:', options: ['Below LEO', 'At GEO', 'Above GEO', 'At L2'], correctAnswer: 2, explanation: 'Graveyard orbit is ~300 km above GEO.' },
              { id: 'q3', question: 'Passivation involves:', options: ['Painting satellite', 'Depleting propellants and batteries', 'Activating payload', 'Boosting orbit'], correctAnswer: 1, explanation: 'Passivation removes stored energy to prevent explosions.' },
              { id: 'q4', question: 'Hohmann transfer is:', options: ['Fastest', 'Most fuel efficient', 'Most expensive', 'Impossible'], correctAnswer: 1, explanation: 'Hohmann transfer is the most fuel-efficient orbit change.' },
              { id: 'q5', question: 'Rideshare deployment requires:', options: ['Single payload', 'Collision avoidance', 'No sequencing', 'Same orbit for all'], correctAnswer: 1, explanation: 'Multiple payloads require careful sequencing to avoid collisions.' }
            ]
          }
        },
        {
          id: 'future-operations',
          title: 'Future of Launch Operations',
          duration: '25 min',
          xp: 150,
          description: 'Where launch operations are heading',
          aiTutor: true,
          introduction: `Launch operations are evolving rapidly. From daily flights to autonomous operations, the future promises more accessible, affordable, and frequent access to space. Let's explore what's coming.`,
          sections: [
            {
              title: 'Increased Cadence',
              content: `**Current State:**
- SpaceX: ~90 launches/year
- Industry total: ~200/year
- Growing rapidly

**Near Future:**
- SpaceX goal: 150+/year
- Starship: Daily flights?
- Multiple providers scaling

**Enabling Factors:**
- Reusability
- Streamlined operations
- Autonomous systems
- Dedicated facilities

**Challenges:**
- Range capacity
- Workforce
- Supply chain
- Regulatory`
            },
            {
              title: 'Autonomous Operations',
              content: `**Current Automation:**
- Countdown sequences
- Flight termination
- Landing
- Some inspections

**Future Automation:**
- Autonomous vehicle processing
- AI-based anomaly detection
- Robotic refurbishment
- Minimal human intervention

**Benefits:**
- Faster turnaround
- Lower cost
- Fewer errors
- 24/7 operations

**Starship Vision:**
- Aircraft-like operations
- Hours between flights
- Minimal ground crew
- Fully autonomous landing/stacking`
            },
            {
              title: 'New Capabilities',
              content: `**Point-to-Point:**
- Earth-to-Earth transport
- 30 minutes anywhere
- Starship capability
- Military and commercial

**Space Tourism:**
- Suborbital (Blue Origin, Virgin)
- Orbital (SpaceX, Axiom)
- Lunar tourism (dearMoon)
- Growing market

**In-Space Manufacturing:**
- Microgravity production
- Pharmaceuticals, materials
- Requires frequent launch

**Lunar/Mars Operations:**
- Artemis program
- SpaceX Mars plans
- Sustained presence
- New operational paradigms

**The Future:**
Space access becomes routine.
Launch operations become like airline operations.
You might fly to space in your lifetime!`
            }
          ],
          keyTakeaways: [
            'Launch cadence is increasing dramatically',
            'Automation will enable faster, cheaper operations',
            'Point-to-point and tourism are emerging markets',
            'Space access is becoming routine'
          ],
          quiz: {
            questions: [
              { id: 'q1', question: 'SpaceX current launch rate is approximately:', options: ['10/year', '50/year', '90/year', '200/year'], correctAnswer: 2, explanation: 'SpaceX launches ~90 times per year as of 2024.' },
              { id: 'q2', question: 'Starship turnaround goal is:', options: ['Months', 'Weeks', 'Days', 'Hours'], correctAnswer: 3, explanation: 'Starship aims for hours between flights - aircraft-like operations.' },
              { id: 'q3', question: 'Point-to-point transport could reach anywhere in:', options: ['30 minutes', '2 hours', '8 hours', '24 hours'], correctAnswer: 0, explanation: 'Suborbital point-to-point could reach anywhere on Earth in ~30 minutes.' },
              { id: 'q4', question: 'Space tourism is offered by:', options: ['Only NASA', 'Blue Origin and SpaceX', 'No one yet', 'Only Russia'], correctAnswer: 1, explanation: 'Blue Origin, Virgin Galactic, and SpaceX offer space tourism.' },
              { id: 'q5', question: 'Future launch operations will be more like:', options: ['Current operations', 'Airline operations', 'Ship operations', 'Train operations'], correctAnswer: 1, explanation: 'Goal is aircraft-like routine operations with rapid turnaround.' }
            ]
          }
        }
      ]
    }
  ]
};

export default section6Testing;