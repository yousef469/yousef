// Section 2: Vehicle Dynamics - 5 Deep Lessons
export const section2Dynamics = {
  id: 'vehicle-dynamics',
  title: 'Unit 2: Vehicle Dynamics',
  description: 'The science of how a car moves, turns, and stops',
  icon: '🏎️',
  color: 'from-blue-600 to-cyan-700',
  units: [{
    id: 'chassis-steering',
    title: 'Suspension & Control',
    description: 'Mastering the contact between the car and the road',
    lessons: [
      {
        id: 'suspension-geometry-advanced',
        title: 'Suspension Geometry: Camber, Caster, & Toe',
        duration: '15 min', xp: 200,
        description: 'The mathematical alignment of the wheels for stability',
        aiTutor: true,
        introduction: "A car's wheels aren't perfectly straight. To ensure stability at 200 km/h and to maximize tire life, engineers align the wheels at specific angles. This lesson explores the 'Geometry of Grip' — the three critical angles that define how a car handles.",
        sections: [
          { title: '🎯 Camber: The Lean of the Wheel', content: "**Tire Contact Patch Management**\n\nCamber is the angle of the wheel relative to the vertical when viewed from the front.\n- **Negative Camber:** Top of the wheel leans inward. This is used in sports cars because in a hard turn, the car body 'rolls.' Negative camber ensures that when the car leans, the tire becomes *flat* against the road, maximizing the contact patch.\n- **Positive Camber:** Top of the wheel leans outward. Used in farm equipment or heavy trucks to make steering easier when loaded, but rarely used in modern passenger cars." },
          { title: '🔧 Caster: The Shopping Cart Effect', content: "**Self-Centering Stability**\n\nCaster is the angle of the steering pivot relative to the vertical when viewed from the side.\n- **Positive Caster:** The steering axis tilts backward. This creates a 'Trailing' effect (like a shopping cart wheel) that makes the wheels want to snap back to center. \n- **The Feeling:** High positive caster makes the steering feel 'heavy' but very stable at high speeds. It also provides 'Camber Gain' — as you turn the wheel, the tire leans more, helping it grip." },
          { title: '📐 Toe: Pointing the Way', content: "**Straight-Line Logic**\n\nToe is the angle of the wheels relative to each other when viewed from above.\n- **Toe-In:** The front of the wheels point toward each other. This provides great straight-line stability on the highway.\n- **Toe-Out:** The front of the wheels point away from each other. This makes the car 'dart' into corners quickly (preferred by race cars) but makes it feel nervous and twitchy on the highway." },
          { title: '🚀 Scrub Radius & Bump Steer', section: 'Advanced Geometry', content: "**The Invisible Lever Arms**\n\n- **Scrub Radius:** The distance between where the steering axis hits the ground and the center of the tire. If this is too large, every bump in the road will try to rip the steering wheel out of your hands.\n- **Bump Steer:** When the suspension moves up and down, the steering links shouldn't pull the wheels. If 'Bump Steer' is high, the car will steer itself when you hit a pothole, which is a major safety risk." },
          { title: '🧪 Geometry Practice', content: "**P1:** Why do race cars use high Negative Camber?\n*Answer: Because race cars sustain high horizontal G-forces. Negative camber compensates for tire deformation and body roll, ensuring the maximum amount of rubber stays on the road during the turn.*\n\n**P2:** What happens if you have too much 'Toe-In'?\n*Answer: It causes 'Scuffing.' The tires are effectively scrubbing against the road as you drive straight, which leads to rapid tire wear and lower fuel economy.*\n\n**P3:** Why does the steering wheel 'return to center' on its own?\n*Answer: Primarily due to Positive Caster. The geometry creates a mechanical 'Return Force' that aligns the wheels with the direction of travel.*\n\n**P4:** What is 'Ackermann Steering Geometry'?\n*Answer: A geometry where the inside wheel turns sharper than the outside wheel during a turn. This is necessary because the inside wheel follows a smaller circle radius.*\n\n**P5:** Can you change these angles yourself?\n*Answer: Yes, by adjusting the tie-rods and control arm bolts. An 'Alignment' at a shop ensures these are set back to the factory-spec minutes to prevent uneven tire wear.*" }
        ],
        keyTakeaways: ['Negative Camber maximizes grip during cornering body roll', 'Positive Caster provides self-centering stability and steering "feel"', 'Toe-In improves straight-line stability; Toe-Out improves turn-in agility', 'Scrub Radius affects how much road feedback reaches the steering wheel', 'Ackermann geometry ensures wheels don’t "scrub" during tight turns'],
        vocabulary: [
          { term: 'Camber', definition: 'The angle of the wheels relative to the vertical plane' },
          { term: 'Caster', definition: 'The displacement of the steering axis from the vertical axis' },
          { term: 'Toe', definition: 'The symmetric angle that wheels make with the longitudinal axis' },
          { term: 'Scrub Radius', definition: 'The distance between the steering axis ground point and the tire center' },
          { term: 'Ackermann', definition: 'A geometric arrangement of linkages in the steering of a vehicle' }
        ],
        quiz: {
          questions: [
            { id: 'q1', question: 'Negative Camber means the top of the wheels lean:', options: ['Outward', 'Inward', 'Backward', 'Forward'], correctAnswer: 1, explanation: 'Inward lean helps keep the tire flat during cornering roll.' },
            { id: 'q2', question: 'Which angle helps the steering wheel "snap back" to center?', options: ['Camber', 'Caster', 'Toe', 'Weight'], correctAnswer: 1, explanation: 'Positive Caster creates the self-centering trailing effect.' },
            { id: 'q3', question: 'Toe-Out is preferred by race cars because it:', options: ['Saves fuel', 'Is more stable', 'Provides faster turn-in (agility)', 'Is quieter'], correctAnswer: 2, explanation: 'Toe-out makes the car more "eager" to change direction.' },
            { id: 'q4', question: 'Ackermann geometry is used to:', options: ['Add speed', 'Ensure the inside wheel turns sharper than the outside', 'Stop the car', 'Cool the tires'], correctAnswer: 1, explanation: 'The inside wheel follows a tighter radius and must turn more.' },
            { id: 'q5', question: 'Excessive "Scrub Radius" can cause:', options: ['The car to be too fast', 'Violent steering wheel kickback on bumps', 'High fuel economy', 'Better radio reception'], correctAnswer: 1, explanation: 'It acts as a lever arm for road forces to act on the steering rack.' }
          ]
        }
      },
      {
        id: 'springs-dampers-antiroll',
        title: 'Springs & Dampers: Controlling the Bounce',
        duration: '15 min', xp: 200,
        description: 'The science of harmonic motion and energy absorption',
        aiTutor: true,
        introduction: "If a car only had springs, it would bounce down the road like a pogo stick. To stay in control, we need Dampers (Shock Absorbers) and Anti-Roll Bars. This lesson is about managing 'Harmonic Motion' and keeping the tires glued to the pavement, no matter how bumpy it gets.",
        sections: [
          { title: '🎯 Springs: Managing the Mass', content: "**Hooke’s Law (F = kx)**\n\nThe spring's job is to hold the weight of the car and absorb the initial impact of a bump.\n- **Spring Rate (k):** A 'stiff' spring (high k) has less travel but keeps the car level. A 'soft' spring (low k) is comfortable but causes the car to 'wallow' and lean in corners.\n- **Progressive Springs:** These have a variable rate. They are soft at the top for small bumps but get stiffer as they compress to prevent 'bottoming out' on big holes." },
          { title: '🔧 Dampers: The Energy Eaters', content: "**Viscous Friction**\n\nA damper doesn't 'hold' weight; it controls 'Speed.' It turns the kinetic energy of the spring into **Heat** by forcing oil through tiny valves.\n- **Compression Damping:** Controls how fast the wheel moves UP when it hits a bump.\n- **Rebound Damping:** Controls how fast the spring pushes the wheel back DOWN. This is the most important for stability — too little rebound, and the car bounces; too much, and the wheel can't reach the road again fast enough." },
          { title: '📐 Anti-Roll Bars (Sway Bars)', content: "**Lateral Stiffness**\n\nWhen a car turns, it wants to lean (Roll). An Anti-Roll Bar is a u-shaped metal rod that connects the left and right wheels.\n- **How it works:** When one wheel moves up and the other doesn't, the bar 'twists,' resisting the motion. This forces the car to stay flat in a corner without needing stiff, uncomfortable springs. \n- **The Trade-off:** If the bar is too stiff, a bump on the left wheel will be felt on the right wheel, making the ride 'choppy.'" },
          { title: '🚀 Active Suspension & MagneRide', section: 'Electronic Control', content: "**Defying Physics**\n\n- **Magnetic Dampers (MagneRide):** The damper fluid is filled with tiny iron particles. An electromagnet can change the fluid's thickness (viscosity) in 1/1,000th of a second. This allows a car to be ultra-comfortable on the highway and track-stiff in a corner instantly.\n- **Air Suspension:** Uses rubber bags filled with air. This allows the car to change its 'Ride Height' — lifting up for a steep driveway and lowering at high speed to reduce drag." },
          { title: '🧪 Suspension Practice', content: "**P1:** What happens if your shocks are 'Blown' (leaking oil)?\n*Answer: The springs will bounce uncontrolled. This is dangerous because after one bump, the tire will lose contact with the road repeatedly, making braking and steering impossible.*\n\n**P2:** What is 'Unsprung Weight' and why does it matter here?\n*Answer: The weight of the wheels/tires/brakes. The lighter these are, the easier it is for the spring and damper to move them, which improves both comfort and grip.*\n\n**P3:** Why do off-road trucks have long-travel suspension?\n*Answer: To keep the tires in contact with the ground over massive obstacles. If a tire is in the air, it produces zero traction.*\n\n**P4:** What is 'Dive' and 'Squat'?\n*Answer: Dive is the front dipping during braking. Squat is the rear dipping during acceleration. Dampers are tuned to slow these motions down so the driver stays in control.*\n\n**P5:** What is 'Coilover' suspension?\n*Answer: A performance suspension where the spring is wrapped around the damper unit. It allows the driver to adjust the ride height and spring preload by turning a nut.*" }
        ],
        keyTakeaways: ['Springs hold the load; Dampers (shocks) control the speed of movement', 'Dampers turn kinetic energy into heat through valve resistance', 'Anti-roll bars reduce body lean without needing extremely stiff springs', 'MagneRide uses magnetism to adjust damping 1,000 times per second', 'Lighter unsprung weight allows tires to respond faster to road irregularities'],
        vocabulary: [
          { term: 'Spring Rate', definition: 'The force required to compress a spring by one unit of distance' },
          { term: 'Viscosity', definition: 'The thickness or resistance to flow of a fluid' },
          { term: 'Compression', definition: 'The stroke of a damper as a bump forces the wheel upward' },
          { term: 'Rebound', definition: 'The stroke of a damper as the spring pushes the wheel back down' },
          { term: 'Preload', definition: 'The tension placed on a spring before any external load is applied' }
        ],
        quiz: {
          questions: [
            { id: 'q1', question: 'The main job of a Damper (Shock) is to:', options: ['Hold the car up', 'Control the speed of the spring and stop bouncing', 'Turn the wheels', 'Screech'], correctAnswer: 1, explanation: 'Dampers dissipate the energy stored in the springs and prevent oscillation.' },
            { id: 'q2', question: 'An Anti-Roll Bar connects:', options: ['The engine to the trunk', 'The steering wheel to the tires', 'The left and right suspension of an axle', 'The battery to the motor'], correctAnswer: 2, explanation: 'It uses torsional force to resist body roll.' },
            { id: 'q3', question: 'MagneRide dampers use _______ to change fluid thickness.', options: ['Heat', 'Air bubbles', 'Electromagnets and iron particles', 'Soap'], correctAnswer: 2, explanation: 'Magnetism allows for nearly instant adjustment of damping force.' },
            { id: 'q4', question: 'A "Stiff" spring (High Spring Rate) is best for:', options: ['A luxury limo', 'A performance race car on a smooth track', 'Driving through mud', 'A bicycle'], correctAnswer: 1, explanation: 'Stiff springs limit weight transfer and body roll, improving handling precision.' },
            { id: 'q5', question: 'If you have too little "Rebound Damping", the car will:', options: ['Stay too low', 'Feel like a pogo stick (not stop bouncing)', 'Turn too sharp', 'Get better gas mileage'], correctAnswer: 1, explanation: 'Rebound control is what stops the secondary "bounces" after a bump.' }
          ]
        }
      },
      {
        id: 'the-contact-patch-tires',
        title: 'Tire Physics: The Contact Patch',
        duration: '15 min', xp: 200,
        description: 'The complex chemistry and friction of tire rubber',
        aiTutor: true,
        introduction: "Your $100,000 sports car is only connected to the road by four pieces of rubber, each the size of a postcard. This is the 'Contact Patch.' Understanding how rubber generates friction and how it fails is the most important part of vehicle dynamics.",
        sections: [
          { title: '🎯 The Mechanics of Grip: Adhesion vs. Deformation', content: "**Two Ways Tires Stick**\n\n1. **Adhesion (The Glue):** On a microscopic level, tire molecules form temporary chemical bonds with the road. This works best when the tire is warm and the road is dry.\n2. **Deformation (The Interlock):** The rubber 'dents' and fills the tiny holes and cracks in the asphalt. This is why tires need to be relatively soft — if they were hard like plastic, they wouldn't mold into the road surface." },
          { title: '🔧 Slip Angle: The Secret of Turning', content: "**The Direction of Travel**\n\nWhen you turn the steering wheel 10 degrees, the car does NOT start moving 10 degrees instantly. \n- **Slip Angle:** The difference between where the wheel is POINTED and where the tire is actually MOVING.\n- All tires generate lateral force by slipping slightly. A tire is at 'Maximum Grip' when it is at an 8-10 degree slip angle. Beyond that, the rubber starts to 'slide' rather than 'twist,' and grip drops off. This is why you feel the steering get 'light' right before you lose control." },
          { title: '📐 Heat Management & PSI', content: "**The Pressure Equation**\n\n- **Cold Tires:** The rubber is hard and doesn't adhere well. \n- **Overheated Tires:** The rubber becomes 'greasy' as the chemical bonds break down (blistering).\n- **PSI (Pressure):** Higher pressure makes the contact patch SMALLER but the tire stiffer. Lower pressure makes the patch BIGGER (more grip) but creates more heat from 'Sidewall Flex.' Finding the perfect PSI is 50% of a race engineer's job." },
          { title: '🚀 Hydroplaning & Tread Design', section: 'Managing Fluids', content: "**Slicing Through Water**\n\n- **The Problem:** Water doesn't compress. If you hit deep water at speed, a wedge of water forms in front of the tire and lifts it off the road. You are now 'Water Skiing' at 100 km/h.\n- **Tread Grooves:** Their only job is to provide 'Escape Tunnels' for water. A 'Slick' tire (no tread) has 20% more grip on a dry road because it has more rubber contact, but it is 100% useless in even light rain." },
          { title: '🧪 Tire Practice', content: "**P1:** Why do performance tires wear out faster?\n*Answer: They use 'Soft Compounds.' To get high adhesion and deformation, the rubber must be sacrificial. A tire with high grip (e.g., Michelin Pilot Sport) might last 20,000 miles, while an economy tire might last 80,000 miles but have 30% less stopping power.*\n\n**P2:** What is 'Camber Thrust'?\n*Answer: A sideways force produced by a leaning tire. Just like a rolling coin turns in the direction it leans, a tire with negative camber wants to 'push' inward, which helps combat understeer.*\n\n**P3:** What is 'Load Sensitivity'?\n*Answer: Tires are weird. If you double the weight on a tire, you get LESS than double the grip. This is why wide tires are necessary for heavy cars; you need more surface area to distribute the load significantly.*\n\n**P4:** What is 'Heat Cycling'?\n*Answer: Every time a tire gets hot and then cools down, the rubber gets slightly harder (vulcanization). After many heat cycles, a tire might have 'tread' left, but no 'grip' because the rubber has turned into hard plastic.*\n\n**P5:** Why is the 'Inside' of a tire often more worn?\n*Answer: Usually due to excessive Negative Camber or 'Toe-Out.' This tells you that the alignment is dragging that part of the tire against the road more than others.*" }
        ],
        keyTakeaways: ['Tires grip through chemical adhesion and mechanical deformation', 'Slip angle is required to generate cornering force', 'Tire pressure (PSI) dictates the shape and heat generation of the contact patch', 'Tread patterns are only for water displacement, not dry grip', 'Tires have a "sweet spot" temperature for maximum adhesion'],
        vocabulary: [
          { term: 'Contact Patch', definition: 'The area of the tire that is in actual contact with the road' },
          { term: 'Slip Angle', definition: 'The angle between a wheel’s direction of travel and the direction it is pointing' },
          { term: 'Hydroplaning', definition: 'When a layer of water builds up between the tire and the road, causing loss of traction' },
          { term: 'Compound', definition: 'The specific chemical mix of rubber used in a tire' },
          { term: 'Slick', definition: 'A tire with no tread, designed for dry racing conditions' }
        ],
        quiz: {
          questions: [
            { id: 'q1', question: 'Maximum grip in a turn usually happens at around ______ degrees of slip angle.', options: ['0°', '2°', '8-10°', '90°'], correctAnswer: 2, explanation: 'At this point, the tire is twisting to its maximum capability before sliding.' },
            { id: 'q2', question: 'Slick tires have no tread because:', options: ['It’s cheaper to make', 'Tread is only needed to move water; no tread means more rubber on the road', 'They look cooler', 'So they don’t get stuck in mud'], correctAnswer: 1, explanation: 'In dry conditions, total surface area determines the grip potential.' },
            { id: 'q3', question: 'Hydroplaning occurs when:', options: ['The tire is too hot', 'Water cannot be displaced fast enough, lifting the tire off the road', 'The car runs out of gas', 'The road is too dry'], correctAnswer: 1, explanation: 'A wedge of water forms under the tire, breaking contact with the road.' },
            { id: 'q4', question: 'Lowering tire pressure (PSI) generally:', options: ['Increases fuel economy', 'Shrinks the contact patch', 'Increases the contact patch area but increases heat', 'Stiffens the steering'], correctAnswer: 2, explanation: 'Lower pressure lets the tire "spread out," but the flex generates heat.' },
            { id: 'q5', question: 'Wait, what is "Adhesion" in tires?', options: ['The bolts holding the wheel', 'A chemical-level "glue" effect between rubber and road', 'The color of the tire', 'A type of brake'], correctAnswer: 1, explanation: 'Molecular bonds between the soft rubber and the road surface.' }
          ]
        }
      },
      {
        id: 'braking-dynamics-safety',
        title: 'Braking Dynamics: Disc, Drum, & ABS',
        duration: '15 min', xp: 200,
        description: 'Kinetic energy to Heat: The physics of stopping',
        aiTutor: true,
        introduction: "Stopping a 2,000 kg car from 100 km/h releases enough energy to boil 2 liters of water in 3 seconds. To do this safely, we use friction, hydraulics, and electronics. This lesson covers the incredible engineering inside your brake system.",
        sections: [
          { title: '🎯 Kinetic Energy & Thermal Mass', content: "**The Big Equation (1/2mv²)**\n\nBrakes don't 'stop' the car; they change the car's **Energy** from motion into **Heat**. \n- **Brake Rotors (Discs):** These are 'Heat Sinks.' They must be large and heavy enough to absorb the heat without melting. \n- **Vented Rotors:** Most front brakes have hollow 'fins' inside them. As the wheel spins, the rotor acts like a fan, sucking air through itself to stay cool." },
          { title: '🔧 Disc vs. Drum Brakes', content: "**The Battle of Cooling**\n\n- **Drum Brakes:** Older tech. The pads push OUTWARD inside a bowl. They are cheap and good for parking brakes, but they trap heat inside. When they get too hot, the drum expands and the pads can't reach it — this is **Brake Fade**.\n- **Disc Brakes:** Modern standard. The pads 'pinch' a rotating disc. They are exposed to the wind, so they stay cool and work consistently even after repeated hard stops." },
          { title: '📐 Hydraulic Multipliers (Pascal’s Law)', content: "**The Power of Oil**\n\nHow can your foot generate 2,000 lbs of clamping force? \n- **Pascal’s Principle:** Pressure in a closed system is equal. \n- If you push a small piston (Master Cylinder) 10 inches, you can move 4 large pistons (Calipers) 1 inch, but with **10x the force**. \n- **Brake Booster:** Most cars use engine vacuum to help push the master cylinder, making the pedal feel light even during emergency stops." },
          { title: '🚀 ABS & EBD: Electronic Brains', section: 'Stability Control', content: "**Don’t Lock Up**\n\n- **ABS (Anti-lock Braking System):** When a tire stops spinning (locks), it loses grip and you can't steer. ABS 'pulses' the brakes 20 times per second, keeping the tire at that 'Sweet Spot' of 10% slip for maximum stopping power.\n- **EBD (Electronic Brakeforce Distribution):** If you have a heavy trunk, the rear brakes should work harder. EBD monitors weight and adjusts individual wheel pressure for the shortest stop." },
          { title: '🧪 Braking Practice', content: "**P1:** Why are front brakes bigger than rear brakes?\n*Answer: 'Weight Transfer.' Under braking, the front of the car dives, and the front tires carry 70-80% of the load. Therefore, the front brakes must do most of the work.*\n\n**P2:** What is 'Brake Fluid' and why must it be 'Dot 4'?\n*Answer: It is a special non-compressible oil that resists boiling. If your brake fluid boils, it turns into GAS. Gas is compressible, so when you hit the pedal, you just squish the gas instead of moving the brakes. (The 'Mushy Pedal' problem).*\n\n**P3:** What is 'Regenerative Braking'?\n*Answer: Used in EVs and Hybrids. Instead of using friction to make heat, the car uses the electric motor as a generator, turning the energy of motion back into Electricity for the battery.*\n\n**P4:** What are 'Ceramic Brakes'?\n*Answer: Exotic rotors made of carbon-silicon. They are half the weight of iron and can stay at 1,000°C without fading. They are standard on Supercars but cost $10,000+ to replace.*\n\n**P5:** What is 'Engine Braking'?\n*Answer: Using the internal friction and vacuum of the engine to slow the car down by downshifting. This saves your friction brakes from overheating on long mountain descents.*" }
        ],
        keyTakeaways: ['Braking is the conversion of Kinetic Energy into Thermal Energy', 'Disc brakes are superior to drums because of their ability to shed heat', 'Hydraulic systems (Pascal’s Law) multiply leg force into tons of clamping force', 'ABS prevents wheel lock-up to maintain steering control during emergencies', 'Regenerative braking Recycles energy that would otherwise be lost as heat'],
        vocabulary: [
          { term: 'Brake Fade', definition: 'The loss of stopping power due to overheating brake components' },
          { term: 'Caliper', definition: 'The hydraulic clamp that holds the brake pads' },
          { term: 'Master Cylinder', definition: 'The device that converts foot pressure into hydraulic pressure' },
          { term: 'ABS', definition: 'Anti-lock Braking System — prevents wheel lockup during hard braking' },
          { term: 'Brake Bias', definition: 'The distribution of braking force between front and rear wheels' }
        ],
        quiz: {
          questions: [
            { id: 'q1', question: 'Brakes essentially turn Kinetic Energy (Motion) into:', options: ['Electricity only', 'Heat (Thermal Energy)', 'Light', 'Sound'], correctAnswer: 1, explanation: 'Friction between pads and rotors creates significant thermal energy.' },
            { id: 'q2', question: 'Why do front brakes do more work than rear brakes?', options: ['They are closer to the driver', 'Forward weight transfer during deceleration', 'The engine is in the front', 'Rear brakes are smaller'], correctAnswer: 1, explanation: 'The car "dives" forward, pushing the front tires harder into the ground.' },
            { id: 'q3', question: 'If brake fluid boils, the pedal will feel:', options: ['Hard as a rock', 'Very soft and "mushy"', 'Cold', 'Vibrating'], correctAnswer: 1, explanation: 'Boiled fluid creates gas bubbles, which are compressible, making the pedal go to the floor.' },
            { id: 'q4', question: 'ABS works by "pulsing" the brakes to prevent:', options: ['Speeding', 'Wheel lock-up (skidding)', 'Engine stall', 'Tire wear'], correctAnswer: 1, explanation: 'Rotating wheels allow the driver to maintain steering control.' },
            { id: 'q5', question: 'Regenerative braking (EVs) is great because it:', options: ['Makes the car louder', 'Recovers energy to charge the battery', 'Cools the car down', 'Is cheap'], correctAnswer: 1, explanation: 'It captures motion energy instead of wasting it as heat.' }
          ]
        }
      },
      {
        id: 'steering-systems-principles',
        title: 'Steering Systems: Rack, Pinion, & Beyond',
        duration: '15 min', xp: 200,
        description: 'How we translate a hand-turn into a wheel-turn',
        aiTutor: true,
        introduction: "Steering is the most critical feedback loop between the human and the machine. It must be precise, effortless, and informative. From the mechanical directness of 'Rack and Pinion' to the electronic future of 'Steer-by-Wire,' this lesson explores how we guide a multi-ton vehicle.",
        sections: [
          { title: '🎯 The Rack & Pinion: Simple Geometry', content: "**Rotary to Linear**\n\nMost cars use a Rack and Pinion system. \n- **Pinion:** A small gear at the end of the steering column.\n- **Rack:** A long flat gear connected to the wheels.\n- **How it works:** When you turn the wheel, the Pinion 'walks' along the Rack, pushing the wheels left or right. It is simple, light, and provides great 'Road Feel' (you can feel the vibrations of the tires through the steering wheel)." },
          { title: '🔧 Power Steering: Hydraulic vs. Electric', content: "**The Assist Revolution**\n\n- **Hydraulic Power Steering (HPS):** Uses a pump driven by a belt on the engine. It provides a natural feeling but always 'wastes' fuel because the pump is always running.\n- **Electric Power Steering (EPS):** Uses an electric motor on the steering rack. \n- **The Advantage:** It only uses power *when you are actually turning*. It also allows for 'Auto-Parking' and 'Lane Keep Assist' because the computer can turn the wheels without the driver’s help." },
          { title: '📐 Steering Ratio & Precision', content: "**The Variable Rack**\n\n- **Steering Ratio:** The number of degrees the steering wheel must turn to move the tires 1 degree. (e.g., 15:1).\n- **Variable Ratio Racks:** The teeth on the Rack are closer together in the middle and further apart at the ends. This means the steering is 'steady' at highway speeds but gets 'quicker' when you are parking, so you don't have to spin the wheel as many times." },
          { title: '🚀 Steer-by-Wire: The Digital Link', section: 'Removing the Column', content: "**Breaking the Connection**\n\nIn 'Steer-by-Wire' (like on some Infinities or Cybertrucks), there is NO metal shaft connecting your hands to the wheels. \n- **Sensors:** Detect the turn of the steering wheel.\n- **Motors:** Turn the wheels based on the sensor data.\n- **Why?** It allows for 'Dynamic Ratios.' At low speed, a 90-degree turn of the wheel could fully turn the tires; at high speed, it stays stable. It also keeps vibrations and 'Kickback' from reaching the driver's hands, reducing fatigue." },
          { title: '🧪 Steering Practice', content: "**P1:** What is 'Bump Steer'?\n*Answer: When hitting a bump causes the car to change direction without you turning the wheel. It happens when the steering rods and the suspension arms aren't mathematically aligned to move in the same arc.*\n\n**P2:** Why do race cars have 'Heavy' steering?\n*Answer: Less power assist. Race drivers want maximum 'Feedback.' They want to feel exactly when the front tires start to slide, which is easier if the steering isn't overly boosted by an electric motor.*\n\n**P3:** What are 'Tie-Rods'?\n*Answer: The adjustable metal links that connect the steering rack to the wheel hubs. Changing their length is how you adjust the 'Toe' of the car during an alignment.*\n\n**P4:** What is 'Speed-Sensitive' steering?\n*Answer: A system that provides more power help at low speeds (for parking) and less help at high speeds (for safety and stability).*\n\n**P5:** What is '4-Wheel Steering'?\n*Answer: When the rear wheels also turn slightly. At low speed, they turn opposite the front to make the car turn like a small hatchback. At high speed, they turn WITH the front to make lane changes feel perfectly smooth.*\n\n" }
        ],
        keyTakeaways: ['Rack and Pinion is the primary mechanical link for modern steering', 'Electric Power Steering (EPS) saves fuel and enables automated features', 'Variable ratios balance stability with parking ease', 'Steer-by-Wire removes the hardware link, allowing for software-tuned handling', 'Four-wheel steering improves both high-speed stability and low-speed agility'],
        vocabulary: [
          { term: 'Pinion', definition: 'The small driving gear in a rack and pinion system' },
          { term: 'EPS', definition: 'Electric Power Steering — assist provided by an electric motor' },
          { term: 'Steering Ratio', definition: 'The ratio of turns of the steering wheel to turns of the road wheels' },
          { term: 'Tie-Rod', definition: 'The connecting link between the steering rack and the steering arm' },
          { term: 'Bump Steer', definition: 'Sudden steering changes caused by suspension travel over bumps' }
        ],
        quiz: {
          questions: [
            { id: 'q1', question: 'Most modern cars use a _______ steering system.', options: ['Worm Gear', 'Rack and Pinion', 'Cable steering', 'Pulley'], correctAnswer: 1, explanation: 'Rack and Pinion is favored for its simplicity and direct "feel."' },
            { id: 'q2', question: 'Why is Electric Power Steering (EPS) better for fuel economy?', options: ['It is made of light plastic', 'It only uses electricity when you are actually turning', 'It recharges the battery', 'It has no gears'], correctAnswer: 1, explanation: 'Unlike hydraulic pumps, EPS doesn’t put a constant drain on the engine.' },
            { id: 'q3', question: 'What does "Steer-by-Wire" mean?', options: ['The steering wheel is tied to the wheels with rope', 'There is no mechanical shaft between the driver and the road wheels', 'It only works in wires', 'It is controlled by a cell phone'], correctAnswer: 1, explanation: 'The connection is 100% electronic/digital.' },
            { id: 'q4', question: 'A Variable-Ratio rack is designed to be:', options: ['Same speed all the time', 'Steady on the highway, quick while parking', 'Slower at parking', 'Cheap'], correctAnswer: 1, explanation: 'Geared teeth change spacing to optimize the turn-rate based on steering angle.' },
            { id: 'q5', question: 'Rear-Wheel Steering helps a long car by:', options: ['Increasing top speed', 'Making the turning circle much smaller (like a short car)', 'Using less fuel', 'Avoiding the police'], correctAnswer: 1, explanation: 'Inverting the rear wheels at low speed reduces the effective wheelbase.' }
          ]
        }
      }
    ]
  }]
};

export default section2Dynamics;
