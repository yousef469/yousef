// Section 4: Avionics & Control
// 10 Lessons - Guidance, navigation, control, computers

export const section4Avionics = {
  id: 'avionics',
  title: 'Unit 3: Avionics',
  description: 'Guidance, navigation, and control systems',
  icon: '🧠',
  color: 'from-cyan-500 to-blue-500',
  units: [
    {
      id: 'gnc',
      title: 'Guidance, Navigation & Control',
      description: 'The brains of the rocket',
      lessons: [
        {
          id: 'gnc-overview',
          title: 'GNC System Overview',
          duration: '30 min',
          xp: 175,
          description: 'How rockets know where they are and where to go',
          aiTutor: true,
          introduction: `GNC - Guidance, Navigation, and Control - is the brain of the rocket. It determines where the rocket is, where it needs to go, and how to get there. Without GNC, rockets would tumble out of control.`,
          sections: [
            {
              title: 'The Three Functions',
              content: `**Navigation: "Where am I?"**
- Determines current position and velocity
- Uses sensors (IMU, GPS, star trackers)
- Integrates measurements over time

**Guidance: "Where should I go?"**
- Computes desired trajectory
- Determines required attitude and thrust
- Optimizes for fuel efficiency

**Control: "How do I get there?"**
- Commands actuators (engines, fins)
- Maintains stability
- Follows guidance commands

**The Loop:**
Navigation → Guidance → Control → Actuators → Vehicle Motion → Navigation...

This loop runs 50-400 times per second!`
            },
            {
              title: 'GNC Hardware',
              content: `**Sensors:**
- IMU (Inertial Measurement Unit)
- GPS receivers
- Star trackers
- Radar altimeter
- Air data sensors

**Computers:**
- Flight computers (redundant)
- Real-time processing
- Fault tolerance

**Actuators:**
- Engine gimbals
- Grid fins
- Cold gas thrusters
- Reaction wheels

**Falcon 9 GNC:**
- Triple-redundant computers
- Voting logic for fault tolerance
- Custom Linux-based software
- Updates possible between flights`
            },
            {
              title: 'GNC Challenges',
              content: `**Changing Dynamics:**
- Mass decreases as fuel burns
- Center of gravity shifts
- Aerodynamics change with altitude

**Sensor Errors:**
- IMU drift over time
- GPS dropouts
- Noise in measurements

**Actuator Limits:**
- Gimbal range limited
- Response time delays
- Saturation possible

**Fault Tolerance:**
- Must handle sensor failures
- Engine-out capability
- Graceful degradation`
            }
          ],
          keyTakeaways: [
            'GNC = Navigation (where am I) + Guidance (where to go) + Control (how)',
            'The GNC loop runs 50-400 times per second',
            'Redundant computers and sensors ensure reliability',
            'System must handle changing dynamics and failures'
          ],
          quiz: {
            questions: [
              { id: 'q1', question: 'Navigation answers:', options: ['Where should I go?', 'Where am I?', 'How do I get there?', 'When to launch?'], correctAnswer: 1, explanation: 'Navigation determines current position and velocity.' },
              { id: 'q2', question: 'GNC loop runs how many times per second?', options: ['1-5', '10-20', '50-400', '1000+'], correctAnswer: 2, explanation: 'GNC loops typically run at 50-400 Hz.' },
              { id: 'q3', question: 'Falcon 9 uses how many redundant computers?', options: ['1', '2', '3', '5'], correctAnswer: 2, explanation: 'Falcon 9 uses triple-redundant flight computers.' },
              { id: 'q4', question: 'IMU measures:', options: ['Temperature', 'Acceleration and rotation', 'Pressure', 'Light'], correctAnswer: 1, explanation: 'IMU measures acceleration (3 axes) and angular rate (3 axes).' },
              { id: 'q5', question: 'Control system commands:', options: ['Sensors', 'Actuators', 'Propellants', 'Payload'], correctAnswer: 1, explanation: 'Control commands actuators like engine gimbals and fins.' }
            ]
          }
        },

        {
          id: 'imu-sensors',
          title: 'Inertial Measurement Units',
          duration: '30 min',
          xp: 175,
          description: 'Measuring acceleration and rotation',
          aiTutor: true,
          introduction: `The IMU is the most critical sensor on a rocket. It measures acceleration and rotation rate, allowing the navigation system to track position and attitude without any external references.`,
          sections: [
            {
              title: 'IMU Components',
              content: `**Accelerometers (3 axes):**
- Measure linear acceleration
- X, Y, Z directions
- Range: ±20g to ±100g
- Accuracy: 0.001g or better

**Gyroscopes (3 axes):**
- Measure angular velocity
- Roll, pitch, yaw rates
- Range: ±500°/s typical
- Accuracy: 0.01°/s or better

**6-DOF Sensing:**
Together, accelerometers and gyros provide complete motion sensing - 6 degrees of freedom.

**Important Note:**
Accelerometers measure "specific force" - they can't distinguish between acceleration and gravity!
In free fall (orbit), accelerometers read ZERO.`
            },
            {
              title: 'IMU Technologies',
              content: `**MEMS (Micro-Electro-Mechanical):**
- Tiny silicon structures
- Cheap, small, low power
- Moderate accuracy
- Used in consumer devices, some rockets

**Ring Laser Gyro (RLG):**
- Two laser beams in opposite directions
- Rotation causes frequency shift
- Very accurate, no moving parts
- Used in aircraft, missiles

**Fiber Optic Gyro (FOG):**
- Light in coiled fiber
- Sagnac effect measures rotation
- High accuracy, reliable
- Common in spacecraft

**Hemispherical Resonator Gyro (HRG):**
- Vibrating quartz hemisphere
- Extremely accurate and reliable
- Used in spacecraft, missiles`
            },
            {
              title: 'IMU Errors and Calibration',
              content: `**Error Sources:**
- **Bias:** Constant offset (reads non-zero at rest)
- **Scale factor:** Gain error
- **Misalignment:** Axes not perfectly orthogonal
- **Noise:** Random fluctuations
- **Drift:** Errors accumulate over time

**Calibration:**
- Factory calibration
- Pre-flight calibration
- In-flight updates (GPS aiding)

**Error Growth:**
Position error grows as t² for accelerometer bias!
1 mg bias → 18 km error after 1 hour

**Mitigation:**
- High-quality sensors
- Sensor fusion (GPS + IMU)
- Kalman filtering
- Redundant IMUs`
            }
          ],
          keyTakeaways: [
            'IMU = 3 accelerometers + 3 gyroscopes (6-DOF)',
            'Technologies: MEMS, ring laser, fiber optic, HRG',
            'Errors accumulate over time - drift is the enemy',
            'GPS aiding corrects IMU drift'
          ],
          quiz: {
            questions: [
              { id: 'q1', question: 'IMU provides how many degrees of freedom?', options: ['3', '4', '6', '9'], correctAnswer: 2, explanation: '3 accelerometers + 3 gyros = 6 DOF sensing.' },
              { id: 'q2', question: 'In orbit, accelerometers read:', options: ['1g', '0g', '9.8 m/s²', 'Varies'], correctAnswer: 1, explanation: 'In free fall (orbit), accelerometers read zero - cant sense gravity.' },
              { id: 'q3', question: 'Ring laser gyros use:', options: ['Spinning mass', 'Two laser beams', 'Magnetic field', 'Vibrating crystal'], correctAnswer: 1, explanation: 'RLGs use counter-propagating laser beams - rotation shifts frequency.' },
              { id: 'q4', question: 'IMU bias causes position error to grow as:', options: ['t', 't²', 't³', 'Constant'], correctAnswer: 1, explanation: 'Accelerometer bias integrates twice → position error ∝ t².' },
              { id: 'q5', question: 'IMU drift is corrected using:', options: ['Better gyros only', 'GPS aiding', 'Faster sampling', 'Larger sensors'], correctAnswer: 1, explanation: 'GPS provides absolute position to correct accumulated IMU errors.' }
            ]
          }
        },
        {
          id: 'gps-navigation',
          title: 'GPS Navigation',
          duration: '25 min',
          xp: 150,
          description: 'Satellite-based positioning for rockets',
          aiTutor: true,
          introduction: `GPS revolutionized rocket navigation. Instead of relying solely on IMUs that drift over time, rockets can now get precise position fixes from satellites. But using GPS on a rocket has unique challenges.`,
          sections: [
            {
              title: 'How GPS Works',
              content: `**The Concept:**
- 24+ satellites in orbit
- Each broadcasts time and position
- Receiver measures signal travel time
- Distance = speed of light × time

**Trilateration:**
- 3 satellites → position (with clock error)
- 4 satellites → position + time
- More satellites → better accuracy

**GPS Accuracy:**
- Standard: ~5 m horizontal
- Differential GPS: ~1 m
- RTK GPS: ~1 cm
- Rockets typically use standard GPS`
            },
            {
              title: 'GPS on Rockets',
              content: `**Challenges:**
- High velocity (up to 7+ km/s)
- High altitude (above GPS constellation)
- High acceleration (signal acquisition)
- Ionospheric effects

**COCOM Limits:**
GPS receivers have built-in limits:
- Velocity: <515 m/s (1,000 knots)
- Altitude: <18 km (60,000 ft)
- Must exceed BOTH to disable

**Space-Rated GPS:**
- Special receivers for rockets
- Handle high dynamics
- Work above constellation
- Falcon 9 uses GPS throughout flight

**GPS Dropouts:**
- May lose lock during high-g maneuvers
- IMU bridges the gap
- Reacquire when dynamics settle`
            },
            {
              title: 'Sensor Fusion',
              content: `**Why Fuse GPS + IMU?**
- GPS: Accurate but slow (1-10 Hz), can drop out
- IMU: Fast (100+ Hz) but drifts
- Together: Best of both worlds!

**Kalman Filter:**
- Optimal estimation algorithm
- Combines measurements with dynamics model
- Weights by uncertainty
- Standard in aerospace

**Result:**
- Continuous navigation (IMU rate)
- Bounded errors (GPS corrections)
- Handles sensor failures
- Smooth trajectory estimate`
            }
          ],
          keyTakeaways: [
            'GPS provides absolute position from satellite signals',
            'COCOM limits restrict consumer GPS at high speed/altitude',
            'Space-rated GPS works throughout rocket flight',
            'Kalman filter fuses GPS + IMU for best navigation'
          ],
          quiz: {
            questions: [
              { id: 'q1', question: 'Minimum satellites needed for 3D position + time:', options: ['2', '3', '4', '6'], correctAnswer: 2, explanation: '4 satellites needed to solve for x, y, z, and clock error.' },
              { id: 'q2', question: 'COCOM limits disable GPS above:', options: ['1 km/s AND 18 km', '515 m/s AND 18 km', '515 m/s OR 18 km', 'No limits exist'], correctAnswer: 1, explanation: 'Must exceed BOTH 515 m/s AND 18 km altitude to trigger limits.' },
              { id: 'q3', question: 'GPS update rate is typically:', options: ['1000 Hz', '100 Hz', '1-10 Hz', '0.1 Hz'], correctAnswer: 2, explanation: 'GPS updates at 1-10 Hz - much slower than IMU.' },
              { id: 'q4', question: 'Kalman filter is used to:', options: ['Amplify signals', 'Fuse sensor data optimally', 'Generate GPS signals', 'Control engines'], correctAnswer: 1, explanation: 'Kalman filter optimally combines GPS and IMU measurements.' },
              { id: 'q5', question: 'Standard GPS accuracy is approximately:', options: ['1 cm', '1 m', '5 m', '100 m'], correctAnswer: 2, explanation: 'Standard GPS provides ~5m horizontal accuracy.' }
            ]
          }
        },
        
{
          id: 'guidance-algorithms',
          title: 'Guidance Algorithms',
          duration: '35 min',
          xp: 200,
          description: 'Computing the optimal path to orbit',
          aiTutor: true,
          introduction: `Guidance algorithms determine the optimal trajectory from launchpad to orbit. They must account for changing vehicle mass, atmospheric drag, and mission constraints while minimizing fuel consumption.`,
          sections: [
            {
              title: 'Guidance Objectives',
              content: `**Primary Goals:**
- Reach target orbit (altitude, velocity, inclination)
- Minimize propellant usage
- Stay within structural limits
- Avoid restricted zones

**Constraints:**
- Max acceleration (structural, human)
- Max dynamic pressure (Max-Q)
- Heating limits
- Engine throttle range
- Gimbal limits

**Trade-offs:**
- Steeper trajectory: Less gravity loss, more drag
- Shallower trajectory: Less drag, more gravity loss
- Optimal is somewhere in between`
            },
            {
              title: 'Gravity Turn',
              content: `**The Concept:**
Instead of fighting gravity, use it!

**Ideal Gravity Turn:**
1. Launch vertically
2. Pitch over slightly
3. Let gravity naturally curve trajectory
4. Thrust always along velocity vector

**Benefits:**
- Minimizes steering losses
- Natural, stable trajectory
- Reduces structural loads

**Reality:**
- Not perfectly optimal
- Modified for constraints
- Active guidance adjusts

**Falcon 9 Profile:**
- Vertical for ~10 seconds
- Pitch program begins
- Gravity turn through Max-Q
- Active guidance to orbit`
            },
            {
              title: 'Powered Explicit Guidance',
              content: `**PEG (Powered Explicit Guidance):**
Used by Space Shuttle, many modern rockets.

**How It Works:**
1. Predict where you'll be at burnout
2. Compare to target orbit
3. Calculate required thrust direction
4. Update continuously

**Advantages:**
- Handles off-nominal conditions
- Fuel-optimal
- Adapts to engine performance

**Terminal Guidance:**
Final phase to hit exact orbit:
- Very precise pointing
- Small velocity corrections
- Achieves <1 m/s accuracy

**Iterative Guidance Mode (IGM):**
Similar to PEG, used by Saturn V.
Continuously recomputes optimal trajectory.`
            }
          ],
          keyTakeaways: [
            'Guidance computes optimal trajectory to target orbit',
            'Gravity turn minimizes losses by following natural path',
            'PEG adapts trajectory in real-time for fuel efficiency',
            'Terminal guidance achieves precise orbit insertion'
          ],
          quiz: {
            questions: [
              { id: 'q1', question: 'Gravity turn thrust direction is:', options: ['Always vertical', 'Always horizontal', 'Along velocity vector', 'Toward target'], correctAnswer: 2, explanation: 'Gravity turn thrusts along velocity - lets gravity curve the path.' },
              { id: 'q2', question: 'PEG stands for:', options: ['Powered Engine Guidance', 'Powered Explicit Guidance', 'Precision Entry Guidance', 'Programmed Earth Guidance'], correctAnswer: 1, explanation: 'Powered Explicit Guidance - used by Shuttle and modern rockets.' },
              { id: 'q3', question: 'Steeper trajectory has:', options: ['More drag, less gravity loss', 'Less drag, more gravity loss', 'More of both', 'Less of both'], correctAnswer: 0, explanation: 'Steeper = more time in atmosphere (drag) but less time fighting gravity.' },
              { id: 'q4', question: 'Terminal guidance achieves velocity accuracy of:', options: ['~100 m/s', '~10 m/s', '<1 m/s', '~1 km/s'], correctAnswer: 2, explanation: 'Terminal guidance achieves <1 m/s accuracy for precise orbit insertion.' },
              { id: 'q5', question: 'Falcon 9 begins pitch program after:', options: ['Immediately', '~10 seconds', '~60 seconds', '~180 seconds'], correctAnswer: 1, explanation: 'Falcon 9 launches vertically for ~10s before beginning pitch maneuver.' }
            ]
          }
        },
        {
          id: 'control-systems',
          title: 'Control Systems',
          duration: '30 min',
          xp: 175,
          description: 'Keeping rockets stable and on course',
          aiTutor: true,
          introduction: `Control systems are what keep a rocket from tumbling out of control. They take guidance commands and translate them into actuator movements that maintain stability and follow the desired trajectory.`,
          sections: [
            {
              title: 'Control Basics',
              content: `**Feedback Control:**
1. Measure current state (attitude, rate)
2. Compare to desired state
3. Calculate error
4. Command correction
5. Repeat!

**PID Controller:**
Most common control algorithm.
Output = Kp×error + Ki×∫error + Kd×(d/dt)error

- **P (Proportional):** React to current error
- **I (Integral):** Eliminate steady-state error
- **D (Derivative):** Dampen oscillations

**Tuning:**
- Too much P: Oscillations
- Too much I: Slow, overshoot
- Too much D: Noise sensitivity
- Just right: Fast, stable response`
            },
            {
              title: 'Attitude Control',
              content: `**Three Axes:**
- **Roll:** Rotation around long axis
- **Pitch:** Nose up/down
- **Yaw:** Nose left/right

**Actuators:**
- Engine gimbal (pitch, yaw)
- Differential throttle (roll with multiple engines)
- Grid fins (atmospheric)
- Cold gas thrusters (space)
- Reaction wheels (spacecraft)

**Control Modes:**
- Rate control: Maintain desired rotation rate
- Attitude hold: Maintain fixed orientation
- Trajectory following: Track guidance commands

**Bandwidth:**
How fast the control system responds.
- Structural modes: Must not excite!
- Typically 1-10 Hz bandwidth`
            },
            {
              title: 'Stability Challenges',
              content: `**Changing Dynamics:**
- Mass decreases (fuel burns)
- CG moves (propellant slosh)
- Aerodynamics change (altitude)

**Propellant Slosh:**
- Liquid moves in tanks
- Can couple with control system
- Baffles reduce slosh
- Control system must handle it

**Structural Flexibility:**
- Rocket bends under load
- Sensors see bending, not just rigid motion
- Must filter out structural modes

**Engine-Out:**
- Asymmetric thrust
- Control must compensate
- Falcon 9 can lose engines and continue`
            }
          ],
          keyTakeaways: [
            'PID control is the workhorse algorithm',
            'Attitude control manages roll, pitch, and yaw',
            'Propellant slosh and flexibility are major challenges',
            'Control system must adapt to changing dynamics'
          ],
          quiz: {
            questions: [
              { id: 'q1', question: 'PID stands for:', options: ['Power Input Device', 'Proportional-Integral-Derivative', 'Precision Inertial Drive', 'Programmed Input Data'], correctAnswer: 1, explanation: 'PID = Proportional + Integral + Derivative control.' },
              { id: 'q2', question: 'The D term in PID helps with:', options: ['Steady-state error', 'Damping oscillations', 'Increasing speed', 'Reducing noise'], correctAnswer: 1, explanation: 'Derivative term dampens oscillations by responding to rate of change.' },
              { id: 'q3', question: 'Propellant slosh is controlled by:', options: ['Faster pumps', 'Baffles in tanks', 'Heating propellant', 'Pressurization'], correctAnswer: 1, explanation: 'Baffles reduce liquid movement that can destabilize the rocket.' },
              { id: 'q4', question: 'Roll control on Falcon 9 uses:', options: ['Single engine gimbal', 'Differential throttle', 'Fins only', 'Reaction wheels'], correctAnswer: 1, explanation: 'With 9 engines, differential throttle provides roll control.' },
              { id: 'q5', question: 'Control bandwidth is typically:', options: ['0.01 Hz', '1-10 Hz', '100 Hz', '1000 Hz'], correctAnswer: 1, explanation: 'Control bandwidth is 1-10 Hz - fast enough to control, slow enough to avoid exciting structure.' }
            ]
          }
        },
       
 {
          id: 'flight-computers',
          title: 'Flight Computers',
          duration: '25 min',
          xp: 150,
          description: 'The hardware running rocket software',
          aiTutor: true,
          introduction: `Flight computers are the central nervous system of a rocket. They run the GNC algorithms, manage all systems, and make split-second decisions. Reliability is paramount - there's no rebooting in flight!`,
          sections: [
            {
              title: 'Computer Architecture',
              content: `**Requirements:**
- Real-time performance
- Radiation tolerance
- Extreme reliability
- Low power consumption

**Redundancy:**
- Triple Modular Redundancy (TMR)
- Three computers vote on outputs
- Majority wins
- Single failure tolerated

**Falcon 9 Computers:**
- 3 flight computers
- Linux-based OS
- x86 processors
- Commercial hardware (rad-tolerant)

**Traditional Space:**
- RAD750, RAD5500 processors
- Radiation-hardened
- Very expensive ($200k+ each)
- Slower than your phone!`
            },
            {
              title: 'Real-Time Systems',
              content: `**Real-Time Requirements:**
- Deterministic timing
- Guaranteed response time
- No missed deadlines!

**Timing:**
- GNC loop: 50-400 Hz
- Sensor sampling: 100-1000 Hz
- Actuator commands: 50-100 Hz

**Operating Systems:**
- VxWorks (traditional aerospace)
- RTEMS (open source)
- Linux with RT patches (SpaceX)

**Watchdog Timer:**
- Hardware timer
- Software must "pet" it regularly
- If missed, system resets
- Catches software hangs`
            },
            {
              title: 'Software Development',
              content: `**Safety-Critical Software:**
- DO-178C (aviation standard)
- Extensive testing
- Code review
- Formal verification

**SpaceX Approach:**
- Agile development
- Continuous integration
- Extensive simulation
- Test on real hardware

**Software Updates:**
- Can update between flights
- Bug fixes and improvements
- New features added
- Falcon 9 software constantly evolving

**Lines of Code:**
- Falcon 9: Millions of lines
- Extensive testing coverage
- Automated test suites`
            }
          ],
          keyTakeaways: [
            'Triple redundancy with voting ensures reliability',
            'Real-time systems guarantee timing deadlines',
            'SpaceX uses Linux on commercial hardware',
            'Software can be updated between flights'
          ],
          quiz: {
            questions: [
              { id: 'q1', question: 'Falcon 9 uses how many flight computers?', options: ['1', '2', '3', '5'], correctAnswer: 2, explanation: 'Falcon 9 uses 3 computers with voting for fault tolerance.' },
              { id: 'q2', question: 'TMR stands for:', options: ['Total Mission Reliability', 'Triple Modular Redundancy', 'Thermal Management Relay', 'Telemetry Monitoring Receiver'], correctAnswer: 1, explanation: 'Triple Modular Redundancy - 3 computers vote on outputs.' },
              { id: 'q3', question: 'Falcon 9 runs which operating system?', options: ['Windows', 'VxWorks', 'Linux', 'Custom OS'], correctAnswer: 2, explanation: 'SpaceX uses Linux with real-time patches.' },
              { id: 'q4', question: 'Watchdog timer purpose is:', options: ['Keep time', 'Catch software hangs', 'Control temperature', 'Monitor fuel'], correctAnswer: 1, explanation: 'Watchdog resets system if software stops responding.' },
              { id: 'q5', question: 'RAD750 processors cost approximately:', options: ['$100', '$1,000', '$200,000+', '$1 million'], correctAnswer: 2, explanation: 'Radiation-hardened processors cost $200k+ each.' }
            ]
          }
        },
        {
          id: 'telemetry',
          title: 'Telemetry & Communications',
          duration: '25 min',
          xp: 150,
          description: 'Sending data from rocket to ground',
          aiTutor: true,
          introduction: `Telemetry is the lifeline between rocket and ground. It sends thousands of measurements per second, allowing engineers to monitor vehicle health and make decisions. Without telemetry, we'd be flying blind.`,
          sections: [
            {
              title: 'Telemetry Basics',
              content: `**What is Telemetry?**
Remote measurement transmission.
Rocket → Ground station

**Data Types:**
- Sensor readings (1000s of channels)
- System status
- GPS position
- Video feeds
- Event markers

**Data Rates:**
- Falcon 9: ~10 Mbps
- Includes video streams
- Compressed data

**Frequency Bands:**
- S-band: 2-4 GHz (common)
- C-band: 4-8 GHz
- Ku-band: 12-18 GHz (high data rate)
- Ka-band: 26-40 GHz`
            },
            {
              title: 'Communication Links',
              content: `**Ground Stations:**
- Track rocket with dish antennas
- Multiple stations for coverage
- Handoff as rocket moves

**TDRS (NASA):**
- Tracking and Data Relay Satellites
- Provides coverage over oceans
- Used by many missions

**Starlink (SpaceX):**
- Direct to satellite communication
- Global coverage
- Used for Starship telemetry

**Link Budget:**
- Transmit power
- Antenna gain
- Path loss
- Receiver sensitivity
- Must close the link!`
            },
            {
              title: 'Flight Termination',
              content: `**Range Safety:**
- If rocket goes off course, must be destroyed
- Protects people and property
- Required by range

**FTS (Flight Termination System):**
- Independent system
- Receives destruct command
- Cuts propellant tanks
- Terminates thrust

**AFTS (Autonomous FTS):**
- GPS-based
- Onboard decision making
- No ground command needed
- Falcon 9 uses AFTS

**Criteria:**
- Leaves designated corridor
- Exceeds velocity limits
- Loss of control detected`
            }
          ],
          keyTakeaways: [
            'Telemetry sends thousands of measurements per second',
            'Multiple ground stations provide continuous coverage',
            'Flight termination system ensures range safety',
            'AFTS makes autonomous destruct decisions'
          ],
          quiz: {
            questions: [
              { id: 'q1', question: 'Falcon 9 telemetry data rate is approximately:', options: ['1 kbps', '100 kbps', '10 Mbps', '1 Gbps'], correctAnswer: 2, explanation: 'Falcon 9 transmits ~10 Mbps including video.' },
              { id: 'q2', question: 'S-band frequency range is:', options: ['100-500 MHz', '2-4 GHz', '10-20 GHz', '50-100 GHz'], correctAnswer: 1, explanation: 'S-band is 2-4 GHz - common for rocket telemetry.' },
              { id: 'q3', question: 'AFTS stands for:', options: ['Automatic Flight Tracking System', 'Autonomous Flight Termination System', 'Advanced Fuel Transfer System', 'Attitude Flight Test System'], correctAnswer: 1, explanation: 'Autonomous Flight Termination System - makes destruct decisions onboard.' },
              { id: 'q4', question: 'TDRS provides:', options: ['Propulsion', 'Communication relay', 'Navigation', 'Weather data'], correctAnswer: 1, explanation: 'TDRS satellites relay communications over areas without ground stations.' },
              { id: 'q5', question: 'FTS is triggered when rocket:', options: ['Reaches orbit', 'Leaves designated corridor', 'Runs low on fuel', 'Completes mission'], correctAnswer: 1, explanation: 'FTS activates if rocket leaves safe flight corridor.' }
            ]
          }
        },
  
      {
          id: 'power-systems',
          title: 'Electrical Power Systems',
          duration: '25 min',
          xp: 150,
          description: 'Powering rocket avionics',
          aiTutor: true,
          introduction: `Every sensor, computer, and actuator needs electrical power. Rocket power systems must be lightweight, reliable, and provide clean power throughout the mission - from pre-launch through orbit insertion.`,
          sections: [
            {
              title: 'Power Sources',
              content: `**Batteries:**
- Primary (non-rechargeable)
- Lithium-ion most common
- High energy density
- Sized for mission duration

**Falcon 9 Batteries:**
- Lithium-ion packs
- ~28V nominal
- Sized for ~30 min mission
- Separate packs for redundancy

**Other Sources:**
- Fuel cells (Shuttle)
- Solar panels (spacecraft)
- RTGs (deep space)
- APUs (hydraulic power)

**Power Budget:**
- Avionics: 500-2000 W
- Actuators: 1000-5000 W
- Heaters: Variable
- Total: Several kW`
            },
            {
              title: 'Power Distribution',
              content: `**Voltage Levels:**
- 28V DC (aerospace standard)
- 5V, 3.3V for electronics
- 270V DC (some new systems)

**Distribution:**
- Main bus from batteries
- DC-DC converters for different voltages
- Fuses and circuit breakers
- Redundant paths

**Power Quality:**
- Voltage regulation
- Noise filtering
- Transient protection
- EMI shielding

**Grounding:**
- Single-point ground
- Prevents ground loops
- Critical for sensor accuracy`
            },
            {
              title: 'Pyrotechnics',
              content: `**Pyrotechnic Devices:**
- Stage separation
- Fairing jettison
- Landing leg deployment
- FTS charges

**Firing Circuits:**
- Redundant initiation
- Safe/Arm devices
- Capacitor discharge units
- Precise timing

**Safety:**
- Multiple inhibits
- Arm only when needed
- Shielded wiring
- ESD protection

**Testing:**
- Continuity checks
- Resistance measurement
- No-fire current verification`
            }
          ],
          keyTakeaways: [
            'Lithium-ion batteries power most rocket avionics',
            '28V DC is the aerospace standard voltage',
            'Redundant power paths ensure reliability',
            'Pyrotechnic systems require multiple safety inhibits'
          ],
          quiz: {
            questions: [
              { id: 'q1', question: 'Standard aerospace voltage is:', options: ['5V', '12V', '28V', '120V'], correctAnswer: 2, explanation: '28V DC is the aerospace standard for power distribution.' },
              { id: 'q2', question: 'Falcon 9 uses which battery type?', options: ['Lead-acid', 'NiCd', 'Lithium-ion', 'Fuel cells'], correctAnswer: 2, explanation: 'Lithium-ion batteries - high energy density, lightweight.' },
              { id: 'q3', question: 'Typical avionics power consumption is:', options: ['10-50 W', '500-2000 W', '10-50 kW', '1 MW'], correctAnswer: 1, explanation: 'Avionics typically consume 500-2000 W.' },
              { id: 'q4', question: 'Pyrotechnic safety uses:', options: ['Single inhibit', 'Multiple inhibits', 'No inhibits', 'Software only'], correctAnswer: 1, explanation: 'Multiple inhibits (safe/arm) prevent accidental firing.' },
              { id: 'q5', question: 'Single-point grounding prevents:', options: ['Overheating', 'Ground loops', 'Short circuits', 'Battery drain'], correctAnswer: 1, explanation: 'Single-point ground prevents ground loops that cause noise.' }
            ]
          }
        },
        {
          id: 'software-simulation',
          title: 'Flight Software & Simulation',
          duration: '30 min',
          xp: 175,
          description: 'Developing and testing rocket software',
          aiTutor: true,
          introduction: `Flight software is the most complex part of a modern rocket. Millions of lines of code control every aspect of flight. Extensive simulation ensures it works perfectly before the rocket ever leaves the pad.`,
          sections: [
            {
              title: 'Software Architecture',
              content: `**Layers:**
- Hardware abstraction
- Operating system
- Middleware
- Application software

**Key Functions:**
- GNC algorithms
- Sequencing (event timing)
- Health monitoring
- Fault management
- Telemetry formatting

**Modularity:**
- Separate modules for each function
- Well-defined interfaces
- Easier testing and updates

**Real-Time Constraints:**
- Hard deadlines
- Deterministic execution
- Priority-based scheduling`
            },
            {
              title: 'Simulation Levels',
              content: `**Software-in-the-Loop (SIL):**
- Flight software on desktop
- Simulated sensors/actuators
- Fast execution
- Early development

**Processor-in-the-Loop (PIL):**
- Flight software on flight processor
- Simulated I/O
- Tests real-time performance

**Hardware-in-the-Loop (HIL):**
- Real flight hardware
- Simulated vehicle dynamics
- Most realistic ground test
- "Iron bird" test stands

**Monte Carlo:**
- Thousands of simulated flights
- Random variations in parameters
- Statistical success analysis
- Finds edge cases`
            },
            {
              title: 'Verification & Validation',
              content: `**Verification:** Did we build it right?
- Unit testing
- Integration testing
- Code review
- Static analysis

**Validation:** Did we build the right thing?
- Requirements traceability
- System testing
- Flight testing

**Test Coverage:**
- Statement coverage
- Branch coverage
- MC/DC (Modified Condition/Decision)
- 100% coverage goal

**SpaceX Testing:**
- Continuous integration
- Automated test suites
- Simulation before every flight
- Learn from each mission`
            }
          ],
          keyTakeaways: [
            'Flight software has millions of lines of code',
            'SIL → PIL → HIL progression increases fidelity',
            'Monte Carlo finds edge cases through random simulation',
            'Verification ensures correct implementation; validation ensures correct requirements'
          ],
          quiz: {
            questions: [
              { id: 'q1', question: 'HIL stands for:', options: ['High Integration Level', 'Hardware-in-the-Loop', 'Hybrid Inertial Logic', 'Horizontal Integration Lab'], correctAnswer: 1, explanation: 'Hardware-in-the-Loop uses real hardware with simulated dynamics.' },
              { id: 'q2', question: 'Monte Carlo simulation runs:', options: ['One perfect case', 'Thousands of random variations', 'Only failure cases', 'Real flights'], correctAnswer: 1, explanation: 'Monte Carlo runs thousands of cases with random parameter variations.' },
              { id: 'q3', question: 'Verification asks:', options: ['Did we build the right thing?', 'Did we build it right?', 'Is it fast enough?', 'Is it cheap enough?'], correctAnswer: 1, explanation: 'Verification = built correctly; Validation = correct requirements.' },
              { id: 'q4', question: 'MC/DC is a type of:', options: ['Processor', 'Test coverage metric', 'Communication protocol', 'Power system'], correctAnswer: 1, explanation: 'MC/DC (Modified Condition/Decision Coverage) is a rigorous test coverage metric.' },
              { id: 'q5', question: 'SIL testing runs flight software on:', options: ['Flight hardware', 'Desktop computer', 'In flight', 'Ground station'], correctAnswer: 1, explanation: 'Software-in-the-Loop runs on desktop with simulated environment.' }
            ]
          }
        },
        {
          id: 'autonomous-operations',
          title: 'Autonomous Operations',
          duration: '30 min',
          xp: 175,
          description: 'Rockets that think for themselves',
          aiTutor: true,
          introduction: `Modern rockets are increasingly autonomous. From automatic abort decisions to propulsive landing, rockets must make split-second decisions without human intervention. This autonomy enables capabilities that would be impossible with ground control.`,
          sections: [
            {
              title: 'Why Autonomy?',
              content: `**Speed:**
- Light-speed delay to ground
- Decisions needed in milliseconds
- Human reaction too slow

**Examples:**
- Engine-out response: <100 ms
- Abort decision: <1 second
- Landing burn timing: Precise

**Falcon 9 Autonomy:**
- Automatic engine-out compensation
- Autonomous flight termination
- Propulsive landing (no human input)
- Fairing recovery guidance

**Crew Dragon:**
- Automatic abort capability
- Autonomous docking
- Can complete mission without crew input`
            },
            {
              title: 'Autonomous Landing',
              content: `**The Challenge:**
- Supersonic to zero in ~30 seconds
- Fuel-optimal trajectory
- Pinpoint accuracy (<1 m)
- No second chances!

**Guidance:**
- Convex optimization
- Real-time trajectory planning
- Adapts to conditions

**Sensors:**
- GPS for position
- Radar altimeter for height
- IMU for attitude
- Cameras (future)

**Control:**
- Engine gimbal for steering
- Throttle for descent rate
- Grid fins for aerodynamic control

**Success Rate:**
- Now >95% for Falcon 9
- Continuous improvement`
            },
            {
              title: 'Fault Management',
              content: `**Automatic Responses:**
- Sensor failure: Switch to backup
- Engine anomaly: Shutdown or compensate
- Off-nominal trajectory: Abort or adapt

**Decision Trees:**
- Pre-programmed responses
- Based on extensive analysis
- Tested in simulation

**Machine Learning (Future):**
- Pattern recognition
- Anomaly detection
- Adaptive control
- SpaceX exploring for Starship

**Human Oversight:**
- Ground can command abort
- But rocket can act faster
- Autonomy as backup to human`
            }
          ],
          keyTakeaways: [
            'Autonomy enables millisecond decisions impossible for humans',
            'Falcon 9 landing is fully autonomous - no human input',
            'Fault management automatically handles failures',
            'Machine learning may enhance future autonomy'
          ],
          quiz: {
            questions: [
              { id: 'q1', question: 'Engine-out response time is:', options: ['~10 seconds', '~1 second', '<100 ms', '~1 minute'], correctAnswer: 2, explanation: 'Engine-out compensation happens in <100 milliseconds.' },
              { id: 'q2', question: 'Falcon 9 landing accuracy is:', options: ['~100 m', '~10 m', '<1 m', '~1 km'], correctAnswer: 2, explanation: 'Falcon 9 lands within 1 meter of target.' },
              { id: 'q3', question: 'Crew Dragon can dock:', options: ['Only with crew control', 'Only with ground control', 'Autonomously', 'Cannot dock'], correctAnswer: 2, explanation: 'Crew Dragon can dock to ISS fully autonomously.' },
              { id: 'q4', question: 'Landing guidance uses:', options: ['Simple ballistic trajectory', 'Convex optimization', 'Random search', 'Fixed program'], correctAnswer: 1, explanation: 'Convex optimization computes fuel-optimal landing trajectory in real-time.' },
              { id: 'q5', question: 'Falcon 9 landing success rate is now:', options: ['~50%', '~75%', '>95%', '100%'], correctAnswer: 2, explanation: 'Falcon 9 achieves >95% landing success rate.' }
            ]
          }
        }
      ]
    }
  ]
};

export default section4Avionics;