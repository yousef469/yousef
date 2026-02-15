// Section 6: Autonomous Systems - 5 Deep Lessons
export const section6Autonomous = {
    id: 'autonomous-systems',
    title: 'Unit 6: Autonomous Systems',
    description: 'The mathematics and software of self-driving vehicles',
    icon: '🤖',
    color: 'from-purple-600 to-indigo-800',
    units: [{
        id: 'self-driving-stack',
        title: 'The Autonomy Stack',
        description: 'From Sensing to Decision Making',
        lessons: [
            {
                id: 'localization-mapping-slam',
                title: 'Localization & Mapping (SLAM)',
                duration: '15 min', xp: 200,
                description: 'How a car knows where it is to within 2 centimeters',
                aiTutor: true,
                introduction: "Standard GPS is off by 5 to 10 meters — that's the difference between being in your lane and being in a lake. To drive themselves, cars need **Localization** accurate to 2 centimeters. This lesson covers **SLAM** (Simultaneous Localization and Mapping) and the math of the HD-Map.",
                sections: [
                    { title: '🎯 GPS vs. RTK: The Precision Gap', content: "**Correcting the Satellite**\n\n- **Standard GPS:** Your car listens to satellites. The signal is distorted by the atmosphere and 'echoes' off buildings (Multipath Error).\n- **RTK (Real-Time Kinematic):** The car talks to a base station on the ground with a known location. The base station calculates the GPS error and 'shouts' the correction to the car. This brings accuracy from 10 meters down to 2-3 centimeters." },
                    { title: '🔧 SLAM: Simultaneous Localization and Mapping', content: "**The Mathematical Loop**\n\nImagine walking into a dark room with a flashlight. You don't have a map, and you don't know where you are. \n- **The Paradox:** To build a map, you need to know where you are. To know where you are, you need a map. \n- **The Solution (SLAM):** The computer identifies 'Landmarks' (a specific tree, a building corner). As the car moves, it calculates: 'If that tree moved 5 feet left in my camera, I must have moved 5 feet right.' It builds the map and finds itself at the same time." },
                    { title: '📐 HD Maps: The Digital Twin', content: "**More than just a Picture**\n\nAn HD Map (High-Definition) contains more than just roads. It is a 'Layered' data structure:\n- **Geometric Layer:** Lidar point clouds of every curb and pole.\n- **Semantic Layer:** Where exactly the stop lines are, the speed limit for THIS specific lane, and the timing of traffic lights.\n- **Dynamic Layer:** Real-time updates on construction or accidents. The car 'compares' its current Lidar view to the HD Map to 'lock' its position." },
                    { title: '🚀 Particle Filters & Kalman Filters', section: 'Reducing Uncertainty', content: "**Filtering the Noise**\n\nSensors are never perfect. \n- **Kalman Filter:** A mathematical tool that predicts where the car SHOULD be (based on speed/steering) and then averages that with where the sensor SAYS it is. It 'smooths' out the jumps and glitches in the data. \n- **Particle Filter:** The computer imagines 1,000 'Ghost Cars' (Particles) in different possible locations. It deletes the ghosts that don't match the sensor data. The ghosts that remain are the 'True' location." },
                    { title: '🧪 Localization Practice', content: "**P1:** What happens in a tunnel where GPS is lost?\n*Answer: 'Dead Reckoning.' The computer uses the Inertial Measurement Unit (IMU) — gyroscopes and accelerometers — to calculate its path based on the last known position. High-end IMUs can keep a car on course for minutes without a single satellite signal.*\n\n**P2:** Why do autonomous cars struggle in the snow?\n*Answer: Snow covers 'Landmarks.' If the Lidar can't see the curb or the camera can't see the lane lines, the SLAM algorithm 'gets lost' because its real-world view no longer matches the HD Map.*\n\n**P3:** What is a 'Pose'?\n*Answer: The combination of Position (X, Y, Z) and Orientation (Roll, Pitch, Yaw). Knowing the car's 'Pose' is the primary goal of localization.*\n\n**P4:** What is 'Odometry'?\n*Answer: Estimating position by counting wheel rotations. If the tires slip on ice, the 'Odometry' will be wrong, which is why we must cross-reference it with Lidar and GPS.*\n\n**P5:** Can a car localize using only cameras?\n*Answer: Yes (Visual Odometry). Companies like Tesla use 'Pseudo-Lidar' where neural networks guess the distance to objects in pixels to build a 3D map without expensive lasers.*" }
                ],
                keyTakeaways: ['RTK-GPS provides centimeter-level accuracy by correcting satellite distortions', 'SLAM solves the chicken-and-egg problem of mapping and localization simultaneously', 'HD Maps provide a high-precision digital twin for the car to "match" against', 'Kalman filters merge noisy sensor data with physical predictions for a smooth path', 'Localization must cross-reference GPS, Lidar, and IMU to remain reliable'],
                vocabulary: [
                    { term: 'SLAM', definition: 'Simultaneous Localization and Mapping' },
                    { term: 'RTK', definition: 'Real-Time Kinematic — a satellite navigation technique used to enhance precision' },
                    { term: 'IMU', definition: 'Inertial Measurement Unit — sensors that measure force, angular rate, and orientation' },
                    { term: 'Kalman Filter', definition: 'An algorithm that uses a series of measurements observed over time to produce estimates of unknown variables' },
                    { term: 'Dead Reckoning', definition: 'Calculating current position by using a previously determined position and advancing that position based upon known speeds' }
                ],
                quiz: {
                    questions: [
                        { id: 'q1', question: 'Standard GPS is usually accurate to within:', options: ['2 centimeters', '5-10 meters', '1 kilometer', 'The next state'], correctAnswer: 1, explanation: 'GPS is affected by atmospheric interference and "Multipath" errors.' },
                        { id: 'q2', question: 'SLAM is the process of:', options: ['Braking as hard as possible', 'Building a map and finding your location within it at the same time', 'Talking to other cars', 'Racing'], correctAnswer: 1, explanation: 'It is the core "chicken-and-egg" problem of robotics.' },
                        { id: 'q3', question: 'An IMU (Inertial Measurement Unit) helps the car when:', options: ['The radio is off', 'The GPS signal is lost (e.g., in a tunnel)', 'The car is parked', 'It’s sunny out'], correctAnswer: 1, explanation: 'IMUs use gyroscopes to track motion relative to the last known point.' },
                        { id: 'q4', question: 'Why is "RTK" better than standard GPS?', options: ['It uses more batteries', 'It uses a ground-based station to correct atmospheric errors', 'It is made by NASA', 'It works underwater'], correctAnswer: 1, explanation: 'Ground reference points provide the correction data needed for cm-level precision.' },
                        { id: 'q5', question: 'HD Maps differ from Google Maps because they include:', options: ['Names of restaurants', 'Millimeter-accurate 3D point clouds of curbs, poles, and lane geometry', 'More colors', 'Live music'], correctAnswer: 1, explanation: 'HD maps are for machines, providing precise geometric data to match sensors against.' }
                    ]
                }
            },
            {
                id: 'path-planning-decision-making',
                title: 'Path Planning & Decision Making',
                duration: '15 min', xp: 200,
                description: 'The logic of "How to get from A to B" without crashing',
                aiTutor: true,
                introduction: "Once a car knows where it is and what's around it, it has to decide what to do. This is **Path Planning**. It isn't just about following a line; it's about predicting how other drivers will move and choosing the safest 'Trajectoy.' This lesson covers the math of **Optimal Control**.",
                sections: [
                    { title: '🎯 Global vs. Local Planning', content: "**The Two Levels of Thought**\n\n1. **Global Planning (Mission):** 'I am at Home, I want to go to the Airport.' This is like Google Maps. It finds the sequence of streets to take.\n2. **Local Planning (Trajectoy):** 'A child just ran into the street 20 feet away.' This defines the exact motion of the steering wheel and brakes for the next 5 seconds to avoid the obstacle while staying on the road." },
                    { title: '🔧 A* and Dijkstra’s: Searching for a Path', content: "**Finding the Shortest Route**\n\nThe computer treats the world as a 'Graph' of connected points. \n- **Dijkstra’s Algorithm:** Explores every possible path in all directions. It always finds the shortest path but is very slow.\n- **A* (A-Star):** Uses a 'Heuristic' (a guess). It knows the general direction of the goal and only explores paths that move towards it. This is how your GPS calculates a cross-country route in a fraction of a second." },
                    { title: '📐 Behavioral Choice: Finite State Machines', content: "**The Rules of the Road**\n\nHow does a car handle a 4-way stop? \n- Engineers use a **Finite State Machine (FSM)**. \n- **States:** 'Cruising,' 'Stopping,' 'Waiting at Sign,' 'Going.' \n- **Transitions:** If (Car stopped) AND (Front is clear) THEN Transition to 'Going.' \n- This works well for simple rules, but in a chaotic city like Mumbai or NYC, simple rules often 'Freeze' the car. Modern systems use **Reinforcement Learning** to handle more complex human behaviors." },
                    { title: '🚀 Cost Functions: Defining "Good" Driving', section: 'The Mathematical Opinion', content: "**What do we value?**\n\nTo pick the best path, the computer calculates a 'Cost' for every option:\n- **Path A:** Smooth, but gets too close to a cyclist (Cost: 1000 for safety).\n- **Path B:** Swerves hard, but stays 10 feet from the cyclist (Cost: 50 for comfort).\n- The computer always picks the path with the **Lowest Cost**. By changing the weights in the math, engineers can make a car drive 'Aggressively' or 'Like a Grandma.'" },
                    { title: '🧪 Planning Practice', content: "**P1:** What is 'Prediction' in path planning?\n*Answer: The car doesn't just see a cyclist; it uses a 'Constant-Velocity' or 'Neural Net' model to predict where the cyclist will be in 3 seconds. It plans its path to where the obstacle NO LONGER is.*\n\n**P2:** What is 'Lattice Planning'?\n*Answer: The computer calculates 50 different 'Swerve' paths at once. It checks them all for collisions and picks the smoothest one. If all 50 have collisions, it defaults to 'Panic Brake.'*\n\n**P3:** Why is 'Merging' on a highway so hard for AI?\n*Answer: It requires 'Negotiation.' Humans use eye contact or slight movements to say 'I'm coming in.' Computers struggle to read these subtle social cues.*\n\n**P4:** What is 'Jerk' in engineering?\n*Answer: The rate of change of acceleration. High 'Jerk' makes passengers feel sick. Path planners are programmed to minimize Jerk for a 'Premium' feel.*\n\n**P5:** Can a car plan a path through a crowd?\n*Answer: Usually, no. Most AI safety rules say 'If person is within X feet, Stop.' Crowds create a 'Freezing Robot' problem where the car is too scared to move. 'Social Force' models are being developed to allow cars to 'nudge' through crowds safely.*" }
                ],
                keyTakeaways: ['Global planning defines the route; Local planning defines the immediate maneuvers', 'A* algorithms use heuristics to find optimal paths across graphs quickly', 'Finite State Machines manage the transitions between complex driving behaviors', 'Cost functions mathematically rank trajectories based on safety, speed, and comfort', 'Prediction models are essential for planning paths around moving obstacles'],
                vocabulary: [
                    { term: 'Heuristic', definition: 'A "rule of thumb" used to guide an algorithm toward a goal faster' },
                    { term: 'Trajectory', definition: 'The specific path of an object through space as a function of time' },
                    { term: 'FSM', definition: 'Finite State Machine — a model of behavior based on a set of discrete states' },
                    { term: 'Cost Function', definition: 'A mathematical formula that represents a "penalty" for undesirable traits (e.g., danger)' },
                    { term: 'Jerk', definition: 'The third derivative of position (change in acceleration)' }
                ],
                quiz: {
                    questions: [
                        { id: 'q1', question: 'Which level of planning handles avoiding a sudden obstacle?', options: ['Global Planning', 'Local/Trajectory Planning', 'The Battery', 'Satellite'], correctAnswer: 1, explanation: 'Local planning makes millisecond decisions about steering and braking.' },
                        { id: 'q2', question: 'The A* (A-Star) algorithm is famous for:', options: ['Crashing cars', 'Finding the shortest path efficiently using "heuristics"', 'Making the radio louder', 'Painting lanes'], correctAnswer: 1, explanation: 'It is the standard algorithm for finding paths on maps.' },
                        { id: 'q3', question: 'How does an autonomous car decide between "Safe but bumpy" and "Dangeorus but smooth"?', options: ['It flips a coin', 'Using a "Cost Function" to mathematically weigh the trade-offs', 'It asks the driver', 'It doesn’t care'], correctAnswer: 1, explanation: 'Engineers assign "costs" to safety risks vs. discomfort to guide the AI.' },
                        { id: 'q4', question: 'Prediction is necessary because:', options: ['Obstacles (like pedestrians) move over time', 'The car is fast', 'Weather changes', 'The driver is sleeping'], correctAnswer: 0, explanation: 'A car must plan for where an object will be, not just where it is now.' },
                        { id: 'q5', question: 'High "Jerk" in a path refers to:', options: ['Mean drivers', 'Sudden, uncomfortable changes in acceleration', 'Fast speed', 'Turning the lights on'], correctAnswer: 1, explanation: 'Minimizing jerk is the key to creating a smooth, professional driving feel.' }
                    ]
                }
            },
            {
                id: 'deep-learning-machine-vision',
                title: 'Deep Learning for Machine Vision',
                duration: '15 min', xp: 200,
                description: 'Convolutional Neural Networks (CNNs) and Semantic Segmentation',
                aiTutor: true,
                introduction: "How does a car know a 'Stop Sign' from a 'Red Octagonal Balloon'? It uses **Deep Learning**. This lesson dives into the architecture of **CNNs** (Convolutional Neural Networks) and how they process raw video into a meaningful understanding of the environment.",
                sections: [
                    { title: '🎯 Pixels to Features: The Convolution', content: "**The Mathematical Filter**\n\nThe computer doesn't see 'Signs.' It sees 'Edges.' \n- **Convolutional Layers:** These act like 'Filters.' The first layer might find vertical lines. The second layer finds circles. The third layer combines these to find a 'Face' or a 'Wheel.' \n- **Weights:** During 'Training,' the computer is shown 10 million photos. If it guesses 'Cat' when it’s a 'Stop Sign,' we mathematically adjust the 'Weights' until it gets it right." },
                    { title: '🔧 Semantic Segmentation: Coloring the World', content: "**Pixel-Level Understanding**\n\nStandard object detection just draws a box around a car. \n- **Semantic Segmentation** is much deeper. It assigns a category to EVERY SINGLE PIXEL in the image. \n- Pink pixels = Road. Blue pixels = Sidewalk. Green pixels = Drivable space. \n- This allows the car to find the exact edge of the road, even if there are no painted lines." },
                    { title: '📐 Recurrent Neural Networks (RNN) & Timing', content: "**The Element of Time**\n\nA single photo doesn't tell you if a toddler is 'Running' or 'Standing still.' \n- **RNNs / LSTMs:** These networks have a 'Memory.' They process a sequence of 10 video frames at once. \n- They can 'see' the speed and direction of objects (Flow), allowing the car to predict if a car in the lane over is about to 'Cut-in' before it actually crosses the line." },
                    { title: '🚀 The "Long Tail" Problem', section: 'Edges cases', content: "**The 0.01% Error**\n\nNeural networks are 99% accurate within a month of training. But in driving, 99% means you crash once every 100 miles. \n- **The Long Tail:** Rare events (A unicyclist, a kangaroo, a truck carrying a giant mirror). \n- Because these events are rare, they aren't in the training data. This is why self-driving cars still 'Glitch' — they see something they have never seen before and don't know the 'Rules' for it." },
                    { title: '🧪 Vision Practice', content: "**P1:** What is 'Training' vs 'Inference'?\n*Answer: 'Training' is the weeks of computation it taking to teach the AI on a supercomputer. 'Inference' is the milliseconds it takes for the car's on-board chip to use that knowledge to 'Infer' what a sign is while driving.*\n\n**P2:** What is 'Data Labeling'?\n*Answer: Thousands of humans manually drawing boxes and coloring pixels in photos to create the 'Answer Key' for the computer to study. This is the most expensive part of AI.*\n\n**P3:** Why do AI cars struggle in the dark?\n*Answer: 'Noise' in the pixels. In the dark, the sensor creates random colored dots (grain). This can 'trick' the neural network into seeing a line or an object that isn't there (Hallucinations).*\n\n**P4:** What is 'Overfitting'?\n*Answer: When the AI memorizes the training photos so well that it can't handle a new, slightly different photo. It’s like a student who memorizes the answers to a practice test but doesn't understand the math.*\n\n**P5:** Can you fool an AI driver?\n*Answer: Yes. 'Adversarial Attacks.' A specific sticker on a stop sign can make a neural network 'think' it's a 45mph speed limit sign because it triggers a specific mathematical pattern in the features.*" }
                ],
                keyTakeaways: ['CNNs use layered filters to identify features from pixels to complex objects', 'Semantic segmentation provides pixel-perfect categorization of the environment', 'Recurrent networks add "memory" to understand motion and intent over time', 'The "Long Tail" of rare edge cases is the biggest hurdle to full autonomy', 'Data quality and labeling are the foundation of effective machine vision'],
                vocabulary: [
                    { term: 'CNN', definition: 'Convolutional Neural Network — a class of deep neural networks, most commonly applied to analyzing visual imagery' },
                    { term: 'Inference', definition: 'The process of using a trained neural network to make predictions on new data' },
                    { term: 'Edge Case', definition: 'A problem or situation that occurs only at an extreme (maximum or minimum) operating parameter' },
                    { term: 'Overfitting', definition: 'The production of an analysis that corresponds too closely or exactly to a particular set of data' },
                    { term: 'Feature', definition: 'An individual measurable property or characteristic of a phenomenon being observed' }
                ],
                quiz: {
                    questions: [
                        { id: 'q1', question: 'Which type of network is best for identifying objects in a static image?', options: ['F1 Network', 'CNN (Convolutional)', 'Battery Network', 'Radio Network'], correctAnswer: 1, explanation: 'CNNs are designed to recognize patterns and features in visual data.' },
                        { id: 'q2', question: 'Semantic Segmentation is unique because:', options: ['It uses colors', 'It categorizes Every Single Pixel in the image', 'It is faster', 'It only works in the city'], correctAnswer: 1, explanation: 'It allows for a high-resolution "understanding" of road boundaries.' },
                        { id: 'q3', question: 'The "Long Tail" problem refers to:', options: ['A car with a long trunk', 'Rare edge cases that the AI hasn’t been trained for', 'A cat on the road', 'Long batteries'], correctAnswer: 1, explanation: 'Training for rare events is the hardest part of autonomous safety.' },
                        { id: 'q4', question: '"Inference" happens in:', options: ['A lab in Silicon Valley', 'The car’s computer in real-time while driving', 'In the clouds', 'In the tires'], correctAnswer: 1, explanation: 'Inference is the "Live" use of the AI.' },
                        { id: 'q5', question: 'Why is "Timing" (RNNs) important for self-driving?', options: ['So the music is in sync', 'To understand if objects are moving and predict their path', 'To save gas', 'To check the clock'], correctAnswer: 1, explanation: 'Knowing direction and velocity is critical for avoiding collisions.' }
                    ]
                }
            },
            {
                id: 'control-systems-mpc-pure-pursuit',
                title: 'Control Systems: MPC & Pure Pursuit',
                duration: '15 min', xp: 200,
                description: 'Translating a path into steering and pedal commands',
                aiTutor: true,
                introduction: "Planning a path is just an idea. To move the car, the computer must command the steering motor and the brakes. This is **Control Theory**. This lesson covers the two main ways we 'drive' the car: the simple **Pure Pursuit** and the advanced **Model Predictive Control (MPC)**.",
                sections: [
                    { title: '🎯 Pure Pursuit: The Carrot and the Donkey', content: "**Geometry-Based Steering**\n\nPure Pursuit is the simplest steering algorithm. \n- **The Goal:** The computer looks at a point on the path a few meters ahead (The 'Look-ahead' point). \n- **The Math:** It calculates the 'Arc' required to hit that point. \n- **Pros/Cons:** It is extremely easy to code and works great at low speeds. However, at high speeds (100 km/h), it can 'Oscillate' (wobble) and feels very unnatural to passengers." },
                    { title: '🔧 MPC: Model Predictive Control', content: "**The Advanced Standard**\n\nMPC is how 'Pro' autonomous cars drive. Instead of just looking at one point, it looks at the ENTIRE path for the next 10 seconds. \n- **The Internal Model:** The computer has a 'Mental Model' of the car (Mass, Inertia, Tire Grip). \n- **The optimization:** It calculates 1,000 different ways to turn the steering wheel. For each one, it 'Simulates' the car's behavior. \n- **The Selection:** It picks the ONE set of commands that gets the car where it needs to go with the least swerving and the most comfort. Then, it throws it all away and does it again 0.02 seconds later." },
                    { title: '📐 Feedback vs. Feed-Forward', content: "**Anticipating the Future**\n\n- **Feedback:** 'The car is too far left, move right.' (Reactive).\n- **Feed-Forward:** 'There is a sharp curve coming in 100 feet; start slowing down NOW.' (Proactive).\n- By combining both, the car drives smoothly. It anticipates the curves of the road and the physics of the suspension before they even happen." },
                    { title: '🚀 Actuator Constraints: The Reality Check', section: 'Can the car do it?', content: "**Safety Limits**\n\nIn the simulation, the computer might want to turn the tires 90 degrees instantly. \n- **Constraints:** The control system 'knows' the physical limits: 'The steering motor can only turn at 500 degrees per second' and 'Braking more than 1G will lock the tires.' \n- It limits its own commands to stay within the 'Safe Envelope' of the car's physics." },
                    { title: '🧪 Control Practice', content: "**P1:** What happens if the 'Look-ahead' distance is too short?\n*Answer: The car will swerve violently to follow every tiny wiggle in the path. It’s like looking at your shoes while running — you lose the big picture.*\n\n**P2:** What is 'Latent Delay'?\n*Answer: The time between the computer deciding to turn and the steering motor actually turning (~50-100ms). MPC compensates for this by 'predicting' where the car will be by the time the motor actually moves.*\n\n**P3:** Why is 'Tire Slip' hard for the controller?\n*Answer: On ice, the car doesn't follow its 'Internal Model.' MPC must detect this 'Error' and switch to a more conservative, 'Robust' control strategy.*\n\n**P4:** What is 'Yaw Rate Control'?\n*Answer: Controlling the speed at which the car rotates. Controllers use this to prevent a skid during a high-speed lane change.*\n\n**P5:** Can the car 'Learn' to drive better?\n*Answer: Yes (End-to-End Learning). Instead of separate Planning and Control, some cars take raw pixels and output steering commands directly. This is powerful but hard to 'Explain' for safety audits.*" }
                ],
                keyTakeaways: ['Pure Pursuit uses geometry to steer toward a target "look-ahead" point', 'MPC (Model Predictive Control) uses an internal physics model to optimize paths over time', 'Feed-forward control allows the car to proactively anticipate curves and speed changes', 'Controllers must operate within the physical safety constraints of the car’s actuators', 'Robust control strategies are needed to handle unpredictable road surfaces like ice'],
                vocabulary: [
                    { term: 'Pure Pursuit', definition: 'A tracking algorithm that calculates the curvature needed to move a vehicle to a look-ahead point' },
                    { term: 'MPC', definition: 'Model Predictive Control — an advanced method of process control that relies on dynamic models' },
                    { term: 'Look-ahead', definition: 'The distance in front of the vehicle used by a controller to calculate its next move' },
                    { term: 'Actuator', definition: 'The physical part that moves (e.g., the steering motor)' },
                    { term: 'Constraints', definition: 'The physical or safety limits imposed on a system' }
                ],
                quiz: {
                    questions: [
                        { id: 'q1', question: 'Which steering algorithm is simplest and based on a "look-ahead point"?', options: ['Neural Network', 'Pure Pursuit', 'Rocket Science', 'Manual Steering'], correctAnswer: 1, explanation: 'Pure Pursuit is the basic "geometry" of following a line.' },
                        { id: 'q2', question: 'MPC is better than Pure Pursuit because it:', options: ['Uses an "Internal Physics Model" to simulate and optimize future moves', 'Is cheaper', 'Works without a computer', 'Is faster than light'], correctAnswer: 0, explanation: 'MPC "thinks ahead" and compensates for the car’s mass and delay.' },
                        { id: 'q3', question: 'A "Feed-Forward" control system is:', options: ['Reactive', 'Proactive (acts before the error happens)', 'Slow', 'Broken'], correctAnswer: 1, explanation: 'It uses known info (like an upcoming curve) to prepare the car early.' },
                        { id: 'q4', question: 'What is a "Constraint" in control theory?', options: ['The color of the car', 'The physical limit of how fast a part (like steering) can move', 'The price of the gas', 'A passenger'], correctAnswer: 1, explanation: 'Computers must know what the hardware "can" and "cannot" do.' },
                        { id: 'q5', question: 'If the "Look-ahead" distance is too long, the car will:', options: ['Stop', 'Explode', '"Cut corners" and drive too straight', 'Go backward'], correctAnswer: 2, explanation: 'It ignores local details and follows the "average" path too broadly.' }
                    ]
                }
            },
            {
                id: 'ethics-legal-trolley-problem',
                title: 'Ethics & Legal: The Trolley Problem',
                duration: '15 min', xp: 200,
                description: 'Programming the Unthinkable: AI Ethics and Liabilities',
                aiTutor: true,
                introduction: "If a self-driving car must choose between hitting a child or swerving off a cliff and killing the driver, what should it do? This is the **Trolley Problem**. This lesson explores the philosophical, legal, and insurance-based challenges of the autonomous future.",
                sections: [
                    { title: '🎯 The Trolley Problem: Value of Life', content: "**The Unsolvable Question**\n\nPhilosophers have debated this for centuries, but for AI engineers, it’s a line of code. \n- **Utilitarianism:** Minimize the total number of deaths. (Swerve to hit 1 person instead of 5).\n- **Duty to Protect:** A car's primary duty is to protect its OWN passengers first.\n- **The Reality:** Most companies avoid these rules. The car is programmed to 'Always follow the rules' and 'Always brake.' It doesn't make a 'Choice' based on person-type; it just tries to not hit *anything*." },
                    { title: '🔧 Liability: Who gets the Ticket?', content: "**Person vs. Product**\n\n- **In a Human Crash:** The person is sued. \n- **In an AI Crash:** The Manufacturer (Tesla/Waymo) or the Software Provider is potentially liable. \n- **The Shift:** This is moving car insurance from 'Personal' to 'Product Liability.' If a car crashes because of a software bug, the company might be responsible for thousands of cars at once, not just one." },
                    { title: '📐 Validation & Corner Cases', content: "**How Safe is 'Safe Enough'?**\n\nHumans crash roughly once every 1 million miles. \n- To prove an AI is safer than a human, companies must drive **billions** of miles. \n- **Simulation (Shadow Mode):** Companies run the AI 'in the background' on millions of cars driven by humans. If the AI *would* have crashed while the human was safe, they find the bug and fix it before the AI is ever given control." },
                    { title: '🚀 Regulatory Standards: The "OEDR"', section: 'The Legal Framework', content: "**Operating Design Domain**\n\n- No self-driving car today is 'Go Anywhere.' They have an **ODD**. \n- **Example:** 'This car can drive only in Phoenix, only in daylight, and only below 40 mph.' \n- If it starts to rain, the car must perform a 'Fall-back' (pull over safely) because the weather is outside its legal ODD." },
                    { title: '🧪 Ethics Practice', content: "**P1:** What happens if an AI car is 'Hacked'?\n*Answer: Cyber-liability. If a hacker causes a fleet-wide crash, the company must prove it had 'State-of-the-art' security to avoid massive lawsuits.\n\n**P2:** Should an AI car 'Prioritize' the elderly or the young?\n*Answer: Most global ethics boards (like Germany's) say it is ILLEGAL to program an AI to distinguish based on age, gender, or race. Life is treated as having equal value.*\n\n**P3:** What is the 'Moral Machine' project?\n*Answer: An MIT study where millions of humans voted on trolley problems. It showed that different cultures have different values (e.g., Eastern cultures often value the elderly more than Western cultures). Designing a 'Global AI' is therefore very difficult.*\n\n**P4:** What is 'Post-Crash De-brief'?\n*Answer: Every Waymo/Tesla crash is dissected by engineers. The 'Black Box' data (seconds before the hit) is used to create a new simulation that the AI must 'Pass' before the software is updated.*\n\n**P5:** Can the AI 'Break the Law' to save a life?\n*Answer: This is a legal grey area. Should an AI cross a double-yellow line to avoid a collision? Most current systems are programmed to NEVER break the law, which sometimes makes them 'Stupid' compared to human drivers.*" }
                ],
                keyTakeaways: ['The Trolley Problem highlights the ethical conflict between utilitarianism and passenger protection', 'AI liability is shifting from individual drivers to car manufacturers and software developers', 'Billion-mile validation is required to statistically prove AI safety over humans', 'ODD (Operating Design Domain) defines the specific conditions where an AI is legally allowed to drive', 'Global ethics standards generally prohibit AI from discriminating based on personal characteristics'],
                vocabulary: [
                    { term: 'Trolley Problem', definition: 'A thought experiment in ethics regarding the choice to sacrifice one person to save others' },
                    { term: 'Liability', definition: 'The state of being responsible for something, especially by law' },
                    { term: 'ODD', definition: 'Operational Design Domain — the specific conditions under which a self-driving system is designed to function' },
                    { term: 'Validation', definition: 'The process of determining if a system meets its requirements and safety goals' },
                    { term: 'Utilitarianism', definition: 'The ethical theory that the best action is the one that maximizes overall "utility" or wellbeing' }
                ],
                quiz: {
                    questions: [
                        { id: 'q1', question: 'The "Trolley Problem" is difficult because it:', options: ['Is a math problem', 'Requires choosing between two bad outcomes with ethical consequences', 'Has no answer', 'Only happens in San Francisco'], correctAnswer: 1, explanation: 'Ethics in AI requires programming logic for life-and-death scenarios.' },
                        { id: 'q2', question: 'Who is usually liable if a Level 4 autonomous car crashes due to a software error?', options: ['The sleeping passenger', 'The manufacturer/software company', 'The satellite', 'The road'], correctAnswer: 1, explanation: 'Autonomous driving moves liability from the driver to the "Product."' },
                        { id: 'q3', question: 'An "ODD" defines:', options: ['The odd-looking parts of the car', 'The specific weather, geography, and speed limits a car is safe for', 'How loud the music can be', 'How many wheels the car has'], correctAnswer: 1, explanation: 'The domain defines where and when the AI is allowed to operate.' },
                        { id: 'q4', question: 'In Germany, what is the legal rule for AI when choosing between two lives?', options: ['Save the driver first', 'It is illegal to discriminate based on personal features like age or gender', 'The car chooses the fastest person', 'There is no rule'], correctAnswer: 1, explanation: 'Equal value of life is a core legal standard for most safety frameworks.' },
                        { id: 'q5', question: 'Validation of AI safety requires:', options: ['Driving 1 mile', 'Statistical proof through billions of miles of real and simulated driving', 'A high score on a game', 'Buying more stickers'], correctAnswer: 1, explanation: 'Scale is needed to catch the "Long Tail" of rare accidents.' }
                    ]
                }
            }
        ]
    }]
};

export default section6Autonomous;
