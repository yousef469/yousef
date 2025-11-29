// Section 2: Vehicle Dynamics - 6 Lessons (2 units × 3 lessons)

export const section2Dynamics = {
  id: 'dynamics',
  title: 'Section 2: Vehicle Dynamics',
  description: 'Suspension, steering, and handling',
  icon: '🏎️',
  color: 'from-blue-500 to-cyan-500',
  units: [
    {
      id: 'suspension',
      title: 'Suspension Systems',
      description: 'Keeping tires on the road',
      lessons: [
        {
          id: 'suspension-basics',
          title: 'Suspension Fundamentals',
          duration: '30 min', xp: 175,
          description: 'Springs, dampers, and geometry',
          introduction: 'Suspension systems isolate the cabin from road imperfections while maintaining tire contact for control and safety.',
          sections: [
            { title: 'Springs', content: "**Coil Springs:**\n- Most common type\n- Steel wire wound in helix\n- Spring rate: force per deflection (N/mm)\n\n**Leaf Springs:**\n- Stacked steel plates\n- Used in trucks, rear axles\n- Also locates axle\n\n**Air Springs:**\n- Adjustable ride height\n- Variable spring rate\n- Luxury/commercial vehicles\n\n**Torsion Bars:**\n- Twisted steel bar\n- Compact packaging" },
            { title: 'Dampers (Shocks)', content: "**Purpose:**\nControl spring oscillation\nConvert kinetic energy to heat\n\n**Operation:**\nOil forced through valves\nResistance creates damping force\n\n**Characteristics:**\n- Compression damping (bump)\n- Rebound damping (extension)\n- Usually more rebound than compression\n\n**Types:**\n- Twin-tube: Common, economical\n- Monotube: Better cooling, performance\n- Adjustable: Variable damping" },
            { title: 'Suspension Geometry', content: "**Camber:**\nWheel tilt from vertical\n- Negative: Top inward (grip in corners)\n- Positive: Top outward (rare)\n\n**Caster:**\nSteering axis tilt\n- Positive: Stability, self-centering\n\n**Toe:**\nWheel pointing in/out\n- Toe-in: Stability\n- Toe-out: Turn-in response\n\n**Kingpin Inclination:**\nSteering axis angle\nReduces scrub radius" }
          ],
          keyTakeaways: ['Springs support weight, dampers control motion', 'Negative camber improves cornering grip', 'Caster provides self-centering', 'Toe affects stability and response'],
          quiz: { questions: [
            { id: 'q1', question: 'Dampers convert kinetic energy to:', options: ['Electrical', 'Heat', 'Light', 'Sound'], correctAnswer: 1, explanation: 'Dampers convert motion energy to heat through oil resistance.' },
            { id: 'q2', question: 'Negative camber means:', options: ['Wheel tilts outward', 'Wheel tilts inward at top', 'Wheel points inward', 'Wheel points outward'], correctAnswer: 1, explanation: 'Negative camber = top of wheel tilts inward.' },
            { id: 'q3', question: 'Toe-in provides:', options: ['Better turn-in', 'Stability', 'More grip', 'Lower wear'], correctAnswer: 1, explanation: 'Toe-in (wheels pointing slightly inward) provides straight-line stability.' }
          ]}
        },
        {
          id: 'suspension-types',
          title: 'Suspension Types',
          duration: '25 min', xp: 150,
          description: 'Independent vs solid axle designs',
          introduction: 'Different suspension designs offer various trade-offs between comfort, handling, cost, and durability.',
          sections: [
            { title: 'Independent Front', content: "**MacPherson Strut:**\n- Strut is structural member\n- Simple, compact, economical\n- Limited camber control\n- Most common front suspension\n\n**Double Wishbone:**\n- Upper and lower A-arms\n- Better geometry control\n- More complex, expensive\n- Sports cars, luxury vehicles\n\n**Multi-link:**\n- Multiple separate links\n- Optimal geometry control\n- Most complex and expensive" },
            { title: 'Independent Rear', content: "**Multi-link:**\n- 4-5 separate links\n- Controls toe, camber precisely\n- Common in modern vehicles\n\n**Double Wishbone:**\n- Similar to front\n- Good geometry control\n\n**Trailing Arm:**\n- Simple, compact\n- Limited camber control\n- Economy vehicles\n\n**Semi-trailing Arm:**\n- Angled pivot axis\n- Better than pure trailing" },
            { title: 'Solid Axle', content: "**Live Axle:**\n- Axle housing contains differential\n- Wheels connected rigidly\n- Simple, strong, durable\n\n**Advantages:**\n- Constant camber\n- High load capacity\n- Simple, reliable\n\n**Disadvantages:**\n- Unsprung weight\n- Wheel interaction\n- Rougher ride\n\n**Applications:**\nTrucks, SUVs, off-road vehicles" }
          ],
          keyTakeaways: ['MacPherson strut is most common', 'Multi-link offers best control', 'Solid axle is strong but heavy', 'Independent improves ride quality'],
          quiz: { questions: [
            { id: 'q1', question: 'MacPherson strut advantage:', options: ['Best handling', 'Simple and compact', 'Lowest unsprung weight', 'Best camber control'], correctAnswer: 1, explanation: 'MacPherson struts are simple, compact, and economical.' },
            { id: 'q2', question: 'Multi-link suspension has:', options: ['1-2 links', '4-5 links', 'No links', 'Solid connection'], correctAnswer: 1, explanation: 'Multi-link uses 4-5 separate links for precise control.' },
            { id: 'q3', question: 'Solid axle advantage:', options: ['Light weight', 'Smooth ride', 'High load capacity', 'Best handling'], correctAnswer: 2, explanation: 'Solid axles are strong with high load capacity.' }
          ]}
        },
        {
          id: 'steering-systems',
          title: 'Steering Systems',
          duration: '25 min', xp: 150,
          description: 'Rack and pinion, power assist',
          introduction: 'Steering systems translate driver input into wheel angle, with power assist reducing effort.',
          sections: [
            { title: 'Rack and Pinion', content: "**Components:**\n- Pinion gear (on steering column)\n- Rack (toothed bar)\n- Tie rods (to wheels)\n\n**Operation:**\nSteering wheel rotates pinion\nPinion moves rack left/right\nTie rods turn wheels\n\n**Steering Ratio:**\nSteering wheel turns / wheel turns\nTypical: 14:1 to 18:1\nLower = quicker, heavier" },
            { title: 'Power Steering', content: "**Hydraulic (HPS):**\n- Engine-driven pump\n- Hydraulic cylinder assists\n- Always running = parasitic loss\n\n**Electric (EPS):**\n- Electric motor assists\n- Only uses power when needed\n- Variable assist possible\n- Enables lane-keep assist\n\n**Electro-hydraulic:**\n- Electric pump\n- Hydraulic assist\n- Compromise solution" },
            { title: 'Steering Geometry', content: "**Ackermann Geometry:**\nInner wheel turns more than outer\nBoth wheels follow arc centers\n\n**Steering Axis Inclination:**\nReduces steering effort\nProvides returnability\n\n**Scrub Radius:**\nDistance from steering axis to tire center\n- Positive: Outboard\n- Negative: Inboard (safer)\n- Zero: At center\n\n**Bump Steer:**\nUnwanted toe change over bumps" }
          ],
          keyTakeaways: ['Rack and pinion is most common', 'EPS is more efficient than hydraulic', 'Ackermann ensures proper turning geometry', 'Scrub radius affects stability'],
          quiz: { questions: [
            { id: 'q1', question: 'EPS advantage over hydraulic:', options: ['More power', 'Energy efficient', 'Simpler', 'Cheaper'], correctAnswer: 1, explanation: 'Electric power steering only uses energy when steering.' },
            { id: 'q2', question: 'Lower steering ratio means:', options: ['Easier steering', 'Quicker response', 'More stable', 'Better fuel economy'], correctAnswer: 1, explanation: 'Lower ratio = fewer steering wheel turns for same wheel angle = quicker.' },
            { id: 'q3', question: 'Ackermann geometry ensures:', options: ['Equal wheel angles', 'Inner wheel turns more', 'Outer wheel turns more', 'No toe change'], correctAnswer: 1, explanation: 'Ackermann makes inner wheel turn more sharply for proper arc.' }
          ]}
        }
      ]
    },
    {
      id: 'handling',
      title: 'Vehicle Handling',
      description: 'Cornering dynamics and control',
      lessons: [
        {
          id: 'tire-dynamics',
          title: 'Tire Dynamics',
          duration: '30 min', xp: 175,
          description: 'How tires generate grip',
          introduction: 'Tires are the only contact between vehicle and road. Understanding tire behavior is crucial for vehicle dynamics.',
          sections: [
            { title: 'Tire Construction', content: "**Components:**\n- Tread: Contact surface, grooves for water\n- Belts: Steel/fabric reinforcement\n- Sidewall: Flex zone, size markings\n- Bead: Seals to rim\n\n**Tire Sizing:**\n225/45R17 91W\n- 225: Width (mm)\n- 45: Aspect ratio (%)\n- R: Radial construction\n- 17: Rim diameter (inches)\n- 91: Load index\n- W: Speed rating (270 km/h)" },
            { title: 'Slip Angle', content: "**Definition:**\nAngle between tire direction and travel direction\n\n**Why It Happens:**\nTire deforms under cornering force\nContact patch trails behind wheel\n\n**Grip vs Slip Angle:**\n- 0°: No lateral force\n- 6-10°: Maximum grip\n- Beyond: Sliding, less grip\n\n**Tire Characteristics:**\n- Performance tires: Peak at lower angle\n- All-season: More gradual curve" },
            { title: 'Friction Circle', content: "**Concept:**\nTotal grip is limited\nCan be used for:\n- Acceleration\n- Braking\n- Cornering\n- Or combination\n\n**Trade-offs:**\nMax braking = no cornering grip\nMax cornering = no braking grip\nCombined = less of each\n\n**Trail Braking:**\nBrake into corner, release gradually\nUses friction circle efficiently" }
          ],
          keyTakeaways: ['Slip angle generates cornering force', 'Peak grip at 6-10° slip angle', 'Friction circle limits total grip', 'Combined forces reduce individual limits'],
          quiz: { questions: [
            { id: 'q1', question: 'Peak tire grip occurs at slip angle of:', options: ['0°', '6-10°', '20-30°', '45°'], correctAnswer: 1, explanation: 'Maximum lateral grip typically occurs at 6-10° slip angle.' },
            { id: 'q2', question: '225/45R17 - what is 45?', options: ['Width', 'Aspect ratio', 'Rim size', 'Load index'], correctAnswer: 1, explanation: '45 is the aspect ratio (sidewall height as % of width).' },
            { id: 'q3', question: 'Friction circle shows:', options: ['Tire pressure', 'Total grip limit', 'Tire temperature', 'Wear rate'], correctAnswer: 1, explanation: 'Friction circle represents the total available grip.' }
          ]}
        },
        {
          id: 'cornering-dynamics',
          title: 'Cornering Dynamics',
          duration: '25 min', xp: 150,
          description: 'Understeer, oversteer, and balance',
          introduction: 'Vehicle handling characteristics determine how a car responds to steering input and driver corrections.',
          sections: [
            { title: 'Understeer & Oversteer', content: "**Understeer:**\nFront tires lose grip first\nCar goes wide (pushes)\n- Cause: Front slip angle > rear\n- Correction: Reduce speed, less steering\n\n**Oversteer:**\nRear tires lose grip first\nRear swings out (loose)\n- Cause: Rear slip angle > front\n- Correction: Counter-steer, throttle control\n\n**Neutral:**\nBalanced front/rear grip\nIdeal but unstable" },
            { title: 'Weight Transfer', content: "**Lateral Transfer:**\nWeight shifts to outside wheels in corners\n\n**Calculation:**\n**ΔW = (m × a × h) / t**\n- m = mass\n- a = lateral acceleration\n- h = CG height\n- t = track width\n\n**Effects:**\n- Outside tires: More load, more grip\n- Inside tires: Less load, less grip\n- Net effect: Less total grip\n\n**Lower CG = Less transfer = More grip**" },
            { title: 'Balance Tuning', content: "**To Reduce Understeer:**\n- Softer front springs/bars\n- Stiffer rear springs/bars\n- More front negative camber\n- Less front toe-in\n\n**To Reduce Oversteer:**\n- Stiffer front springs/bars\n- Softer rear springs/bars\n- More rear negative camber\n- More rear toe-in\n\n**Roll Stiffness Distribution:**\nFront/rear anti-roll bar balance\nKey tuning parameter" }
          ],
          keyTakeaways: ['Understeer: front loses grip first', 'Oversteer: rear loses grip first', 'Weight transfer reduces total grip', 'Anti-roll bars tune balance'],
          quiz: { questions: [
            { id: 'q1', question: 'Understeer means:', options: ['Rear slides out', 'Front pushes wide', 'Perfect balance', 'No steering'], correctAnswer: 1, explanation: 'Understeer = front tires lose grip, car goes wide.' },
            { id: 'q2', question: 'Lower center of gravity:', options: ['More weight transfer', 'Less weight transfer', 'No effect', 'More understeer'], correctAnswer: 1, explanation: 'Lower CG = less weight transfer = more total grip.' },
            { id: 'q3', question: 'Stiffer rear anti-roll bar causes:', options: ['More understeer', 'More oversteer', 'No change', 'Better ride'], correctAnswer: 1, explanation: 'Stiffer rear bar transfers more load at rear, causing oversteer.' }
          ]}
        },
        {
          id: 'stability-control',
          title: 'Electronic Stability Control',
          duration: '25 min', xp: 150,
          description: 'ESC, ABS, and traction control',
          introduction: 'Electronic systems enhance safety by helping drivers maintain control in emergency situations.',
          sections: [
            { title: 'ABS (Anti-lock Braking)', content: "**Purpose:**\nPrevent wheel lockup during braking\nMaintain steering control\n\n**Components:**\n- Wheel speed sensors\n- Hydraulic modulator\n- ECU\n\n**Operation:**\n1. Detect wheel about to lock\n2. Release brake pressure\n3. Reapply pressure\n4. Cycle 15+ times/second\n\n**Result:**\nShorter stops on most surfaces\nSteering maintained" },
            { title: 'Traction Control (TCS)', content: "**Purpose:**\nPrevent wheel spin during acceleration\n\n**Methods:**\n- Reduce engine power\n- Apply brake to spinning wheel\n- Both combined\n\n**When Active:**\n- Wet/icy roads\n- Hard acceleration\n- Uneven surfaces\n\n**Limitation:**\nCan't create grip that isn't there\nMay reduce acceleration on loose surfaces" },
            { title: 'ESC (Electronic Stability Control)', content: "**Purpose:**\nPrevent skids and loss of control\n\n**Sensors:**\n- Steering angle\n- Yaw rate (rotation)\n- Lateral acceleration\n- Wheel speeds\n\n**Operation:**\nCompares intended path (steering) to actual path (yaw)\nIf different → intervene\n\n**Corrections:**\n- Understeer: Brake inner rear wheel\n- Oversteer: Brake outer front wheel\n- Reduce engine power\n\n**Effectiveness:**\nReduces fatal crashes by ~50%" }
          ],
          keyTakeaways: ['ABS prevents wheel lockup', 'TCS prevents wheel spin', 'ESC compares intended vs actual path', 'ESC reduces fatal crashes by ~50%'],
          quiz: { questions: [
            { id: 'q1', question: 'ABS cycles approximately:', options: ['1-2 times/sec', '5-10 times/sec', '15+ times/sec', '100 times/sec'], correctAnswer: 2, explanation: 'ABS modulates brake pressure 15+ times per second.' },
            { id: 'q2', question: 'ESC corrects understeer by braking:', options: ['All wheels', 'Front wheels', 'Inner rear wheel', 'Outer front wheel'], correctAnswer: 2, explanation: 'Braking inner rear wheel creates yaw to tighten the turn.' },
            { id: 'q3', question: 'ESC reduces fatal crashes by:', options: ['10%', '25%', '50%', '90%'], correctAnswer: 2, explanation: 'Studies show ESC reduces fatal single-vehicle crashes by about 50%.' }
          ]}
        }
      ]
    }
  ]
};

export default section2Dynamics;
