// Section 7: Manufacturing & Materials - 5 Deep Lessons
export const section7Manufacturing = {
    id: 'manufacturing-materials',
    title: 'Unit 7: Manufacturing & Materials',
    description: 'The engineering of mass production and advanced alloys',
    icon: '🏭',
    color: 'from-slate-600 to-zinc-800',
    units: [{
        id: 'automotive-production',
        title: 'The Modern Factory',
        description: 'Robotics, Materials, and the Assembly Line',
        lessons: [
            {
                id: 'chassis-construction-unibody',
                title: 'Chassis: Unibody vs. Body-on-Frame',
                duration: '15 min', xp: 200,
                description: 'The structural skeleton of the vehicle',
                aiTutor: true,
                introduction: "Every car starts with a skeleton. How that skeleton is built dictates the car's weight, safety, and towing capacity. This lesson explores the difference between the 'Rugged' Body-on-Frame and the 'Efficient' Unibody.",
                sections: [
                    { title: '🎯 Body-on-Frame: The Traditional Tank', content: "**Separating the Functions**\n\nBody-on-Frame (BoF) is how cars were built for 100 years. \n- **The Chassis:** A heavy steel 'Ladder' frame that carries the engine and wheels.\n- **The Body:** A separate 'Shell' that is bolted on top of the frame. \n- **Pros:** Extremely tough, great for towing 10,000 lbs, and easy to repair after a crash. This is why almost all heavy-duty trucks (F-150, Silverado) and true off-roaders (Jeep Wrangler) still use this tech." },
                    { title: '🔧 Unibody: The Integrated Shell', content: "**Lightness and Safety**\n\nIn a Unibody (Unitized Body), the chassis and the body are ONE piece of stamped steel. \n- **The Shell is the Strength:** Every panel (the roof, the floor, the pillars) contributes to the car's rigidity. \n- **Pros:** Much lighter than BoF, better fuel economy, and vastly superior safety. Because the whole car is one piece, engineers can design complex 'Crumple Zones' that aren't possible with a rigid ladder frame. 99% of modern passenger cars and SUVs use Unibody." },
                    { title: '📐 Torsional Rigidity', content: "**The Anti-Twist Factor**\n\n- Torsional Rigidity is a measure of how much a car 'twists' when hitting a bump or turning hard. \n- A 'Floppy' car feels cheap and handles poorly because the suspension can't do its job if the frame is bending. \n- Modern Unibody cars use 'Laser Welding' and high-strength adhesives to achieve rigidity levels that make the car feel 'Solid' even after 200,000 miles." },
                    { title: '🚀 Monocoque: The Racing Carbon-Fiber', section: 'Formula 1 Tech', content: "**One Single Stone**\n\n- **Monocoque** (French for 'Single Shell') is the extreme version of Unibody. \n- In a supercar (Mclaren, Ferrari) or F1 car, the 'Tub' where the driver sits is a single piece of molded Carbon Fiber. It is 5x stronger than steel but weighs less than a human. This ensures that even in a 200 mph crash, the driver's space remains a perfectly intact 'Survival Cell.'" },
                    { title: '🧪 Chassis Practice', content: "**P1:** Why do Unibody cars 'Total' more easily after a crash?\n*Answer: Because the frame IS the body. If you bend the main structural pillars of a Unibody car, it is almost impossible to pull them back to perfect alignment safely. In a BoF car, you can sometimes just swap the frame.*\n\n**P2:** What is 'NVH' in chassis design?\n*Answer: Noise, Vibration, and Harshness. Unibody cars are generally much quieter because they don't have body-mounts that can squeak and rattle like a BoF truck.*\n\n**P3:** Can a Unibody car tow heavy trailers?\n*Answer: To an extent. Modern Unibody SUVs can tow 5,000 to 7,000 lbs, but for 15,000+ lbs, the stress would eventually 'Stretch' or tear the sheet metal of a Unibody, which is why heavy hauling remains the domain of Body-on-Frame.*\n\n**P4:** What is 'Hydroforming'?\n*Answer: A way to shape metal using high-pressure water. It allows engineers to create complex, strong, one-piece frame rails for trucks without having to weld multiple pieces together.*\n\n**P5:** What is the 'Greenhouse' of a car?\n*Answer: The part of the body above the 'beltline' (the windows and roof). It must be strong enough to support the entire weight of the car in a rollover (Roof Crush Test).*" }
                ],
                keyTakeaways: ['Body-on-Frame is rugged and ideal for heavy towing and off-roading', 'Unibody integration reduces weight and enables advanced crash safety', 'Torsional rigidity is key to vehicle handling and "solid" build quality', 'Monocoque designs use single-piece molded structures for maximum strength-to-weight', 'Hydroforming enables complex, high-strength chassis components with fewer welds'],
                vocabulary: [
                    { term: 'Unibody', definition: 'A vehicle construction technique where the body and chassis are a single unit' },
                    { term: 'Body-on-Frame', definition: 'A vehicle construction technique where a separate body is mounted on a rigid frame' },
                    { term: 'Torsional Rigidity', definition: 'The resistance of a structure to being twisted' },
                    { term: 'Monocoque', definition: 'A structural technique where the outer skin supports the bulk of the load' },
                    { term: 'Hydroforming', definition: 'A manufacturing process that uses a specialized type of die forming to shape ductile metals' }
                ],
                quiz: {
                    questions: [
                        { id: 'q1', question: 'Which design is best for a heavy-duty pickup truck towing 15,000 lbs?', options: ['Unibody', 'Body-on-Frame', 'Carbon Fiber Monocoque', 'Plastic frame'], correctAnswer: 1, explanation: 'Ladder frames provide the longitudinal strength needed for heavy pulling.' },
                        { id: 'q2', question: 'Why are Unibody cars safer in a head-on collision?', options: ['They are made of titanium', 'They allow for integrated, folding crumple zones across the whole shell', 'They are heavier', 'They don’t break'], correctAnswer: 1, explanation: 'The integrated design lets engineers control exactly how the energy flows through the structure.' },
                        { id: 'q3', question: 'A "Monocoque" survival cell is typically found in:', options: ['Delivery vans', 'Formula 1 cars and Supercars', 'Bicycles', 'Old tractors'], correctAnswer: 1, explanation: 'It is the lightest and strongest possible way to build a cabin.' },
                        { id: 'q4', question: 'High "Torsional Rigidity" makes a car feel:', options: ['Bouncier', 'Precise and solid (the suspension can do its job better)', 'Slower', 'Lighter'], correctAnswer: 1, explanation: 'A rigid frame prevents body-flex from interfering with steering and alignment.' },
                        { id: 'q5', question: 'What is the main drawback of Body-on-Frame for a sedan?', options: ['Too expensive', 'Very heavy and poor fuel economy/handling', 'Too fast', 'It is only for blue cars'], correctAnswer: 1, explanation: 'The heavy steel frame adds significant weight without aiding aerodynamics or comfort.' }
                    ]
                }
            },
            {
                id: 'stamping-welding-gigapress',
                title: 'Stamping, Welding, & The Gigapress',
                duration: '15 min', xp: 200,
                description: 'How to make a car in 60 seconds: Giant presses and 5,000 spot welds',
                aiTutor: true,
                introduction: "Automotive manufacturing is a game of scale. To make 500,000 cars a year, you need massive machines. This lesson moves through the 'Body Shop' — from giant 5-story presses to the army of robots that perform 5,000 welds in minutes.",
                sections: [
                    { title: '🎯 Progressive Stamping: The 1,000-Ton Punch', content: "**Turning Sheets into Shapes**\n\nA car starts as a giant roll of steel (a Coil). \n- **The Press:** A machine the size of a building uses 'Dies' (molds) to punch parts out of the steel. \n- **Multi-Stage:** One hit shapes the car door, the next hit trims the edges, and the third hit punches the holes for the handle. This happens every few seconds, 24 hours a day." },
                    { title: '🔧 Welding: Resistance & Laser', content: "**The Robot Army**\n\nA Unibody car is made of about 300 different stamped parts. \n- **Spot Welding:** Two copper electrodes 'pinch' the steel and send a massive burst of electricity. This melts the two pieces together at one 'Spot.' There are roughly 5,000 of these spots on an average car. \n- **Laser Welding:** A high-power laser melts a continuous 'seam' between parts. It is 3x stronger than spot welding and makes the car much stiffer." },
                    { title: '📐 Adhesives: Gluing a Car Together', content: "**Chemical Fastening**\n\nModern cars use 'Structural Adhesives' (special industrial glue) in addition to welds. \n- **Why?** It distributes the load along the whole edge rather than just at a few 'spots.' It also acts as a sealant to prevent rust and helps absorb road noise, making the car feel more premium." },
                    { title: '🚀 The Tesla Gigapress Revolution', section: 'Megacasting', content: "**1 Part instead of 70**\n\n- **Old Way:** The rear of a car was made of 70 different stamped pieces welded together. \n- **New Way (Gigapress):** A house-sized machine injects molten aluminum into a mold. In 60 seconds, it 'Pops' out the entire rear structure as one single piece. \n- **The Result:** The car is lighter, stiffer, and 30% cheaper to build because you don't need 100 robots to weld it together." },
                    { title: '🧪 Manufacturing Practice', content: "**P1:** What is a 'Jig'?\n*Answer: A heavy metal frame that holds all the parts in the exact right position while the robots weld them. If the Jig is off by even 1mm, the doors won't close correctly later.*\n\n**P2:** Why do we see orange sparks during car manufacturing?\n*Answer: That's Resistance Spot Welding. The intense heat and pressure cause tiny bits of molten metal to spray out. It's the 'heartbeat' of a modern body shop.*\n\n**P3:** What is 'Hemming'?\n*Answer: Folding the edge of the outer door skin over the inner door frame. It hides the sharp edges and creates a clean finished look.*\n\n**P4:** What is 'Dimensional Accuracy'?\n*Answer: Using high-speed cameras and lasers to check every car. If a car's 'Gap' is 5mm on one side and 4mm on the other, the computer flags it for repair.*\n\n**P5:** Can you weld Aluminum to Steel?\n*Answer: Not easily with standard tools. They have different melting points. To join them, engineers use 'Self-Piercing Rivets' and 'Structural Glue' rather than heat.*" }
                ],
                keyTakeaways: ['Progressive stamping uses massive force to pulse-shape car panels from steel coils', 'Spot and laser welding are the primary methods for structural assembly', 'Structural adhesives improve rigidity, sealing, and noise isolation', 'The Gigapress/Megacasting replaces dozens of small parts with a single large casting', 'Dimensional accuracy is verified by automated laser measurement systems'],
                vocabulary: [
                    { term: 'Die', definition: 'A specialized machine tool used to cut or shape material under pressure' },
                    { term: 'Spot Welding', definition: 'A type of resistance welding where metal surfaces are joined by heat from electric current' },
                    { term: 'Megacasting', definition: 'The process of producing large, single-piece vehicle structural components through high-pressure die casting' },
                    { term: 'Adhesion', definition: 'The process of joining two surfaces together using a chemical compound' },
                    { term: 'Stamping', definition: 'The process of placing flat sheet metal in either coil or blank form into a stamping press' }
                ],
                quiz: {
                    questions: [
                        { id: 'q1', question: 'How many spot welds are roughly on a modern Unibody car?', options: ['10', '100', '5,000', '1,000,000'], correctAnswer: 2, explanation: 'Robots perform thousands of precise welds to build the shell.' },
                        { id: 'q2', question: 'Laser welding is superior to spot welding because:', options: ['It uses light', 'It creates a continuous, stronger seam', 'It is cheaper', 'It doesn’t need power'], correctAnswer: 1, explanation: 'Continuous seams provide higher structural integrity and stiffness.' },
                        { id: 'q3', question: 'Tesla’s "Gigapress" achieves what feat?', options: ['Prints the whole car', 'Casts 70+ parts as one single piece of aluminum', 'Washes the car faster', 'Saves the world'], correctAnswer: 1, explanation: 'It dramatically reduces part count, complexity, and manufacturing time.' },
                        { id: 'q4', question: 'A "Die" in a stamping press is used to:', options: ['Paint the car', 'Give the metal its final shape', 'Cool the metal', 'Melt the metal'], correctAnswer: 1, explanation: 'Dies act as the "mold" that sheet metal is pressed into.' },
                        { id: 'q5', question: 'Why use structural glue (adhesives) on a car?', options: ['The robots ran out of power', 'To increase rigidity and prevent rust between panels', 'To make the car sticky', 'So the windows don’t fall out'], correctAnswer: 1, explanation: 'Glue provides a continuous bond that reduces noise and increases strength.' }
                    ]
                }
            },
            {
                id: 'advanced-materials-science',
                title: 'Material Science: AHSS & Aluminum',
                duration: '15 min', xp: 200,
                description: 'The chemistry of lightweight, unbreakable cars',
                aiTutor: true,
                introduction: "A car is no longer just 'Steel.' It is a cocktail of advanced materials. This lesson explores the chemistry of **AHSS** (Advanced High-Strength Steel), the weight-saving magic of **Aluminum**, and the exotic future of **Carbon Fiber**.",
                sections: [
                    { title: '🎯 AHSS: The Iron Giant', content: "**Stronger by Atomic Rearrangement**\n\n- **Dual-Phase (DP) Steel:** Contains hard islands of 'Martensite' in a soft 'Ferrite' matrix. This allows it to be easily stamped but incredibly strong during a crash.\n- **Boron Steel (Hot Stamped):** Steel is heated to 900°C, shaped, and then 'Quenched' (cooled) instantly while in the mold. This transforms the atoms into a lattice so hard that even professional rescue crews need specialized hydraulic cutters to get through it." },
                    { title: '🔧 Aluminum: Lightness at a Cost', content: "**3x Lighter than Steel**\n\n- **Usage:** Used for hoods, trunks, and suspension arms. Some cars (Ford F-150, Tesla Model S) are almost entirely aluminum. \n- **The Trade-off:** Aluminum is more expensive and requires more energy to produce. It is also harder to fix — a 'dent' in aluminum often can't be pulled out; the whole panel must be replaced." },
                    { title: '📐 Carbon Fiber & Composites', content: "**Plastic Reinforced with Diamonds**\n\n- **CFRP (Carbon Fiber Reinforced Plastic):** Threads of pure carbon woven into a cloth and 'baked' in resin. \n- **Strength:** It is stronger than steel but light as plastic. \n- **The Bottleneck:** It takes 2 hours to 'bake' one part. A steel press takes 5 seconds to stamp one part. This is why carbon fiber remains limited to supercars like the Ferrari SF90 or the Rimac Nevera." },
                    { title: '🚀 Magnesium & Plastics: The Last Grams', section: 'Squeezing out weight', content: "**Every Gram Counts**\n\n- **Magnesium:** 33% lighter than aluminum. Used for dashboard 'beams' and steering wheels. It is highly flammable when molten, so it requires specialized casting! \n- **Engineering Plastics:** Parts like intake manifolds and valve covers are now plastic. This reduces weight and lowers the car's center of gravity." },
                    { title: '🧪 Materials Practice', content: "**P1:** What is an 'Alloy'?\n*Answer: A mix of metals. Pure iron is soft. Adding Carbon makes Steel. Adding Chromium makes Stainless. Automotive engineers 'cook' specific alloys for every part of the car.*\n\n**P2:** What is 'Galvanic Corrosion'?\n*Answer: The 'Battery Effect.' If you touch Aluminum to Steel and add salt water, the aluminum will 'dissolve' through chemistry. This is why these metals must be separated by special coatings or glues.*\n\n**P3:** What is 'Work Hardening'?\n*Answer: When you bend metal, it gets harder and more brittle. If you bend it too much (e.g. at a sharp corner), it will crack. Engineers use computer FEA to ensure the metal doesn't 'tear' during stamping.*\n\n**P4:** Why do we use 'High-Strength Steel' only in the cage?\n*Answer: Cost and function. It doesn't crumple well. You use 'Mild Steel' for the bumper (to absorb energy) and 'Ultra-High Strength' for the pillars (to protect the head).*\n\n**P5:** Can you recycle a car?\n*Answer: Cars are the most recycled consumer products in the world. 95% of the metal is melted down and turned into new cars within months.*" }
                ],
                keyTakeaways: ['AHSS (High-Strength Steel) provides crash protection with minimal weight', 'Aluminum reduces weight by 3x but increases material and repair costs', 'Carbon fiber offers the ultimate power-to-weight ratio but lacks mass-production speed', 'Galvanic corrosion must be prevented when mixing different metals like aluminum and steel', 'Strategic material placement uses soft metals for energy absorption and hard metals for protection'],
                vocabulary: [
                    { term: 'Quenching', definition: 'The rapid cooling of a workpiece in water, oil, or air to obtain specific material properties' },
                    { term: 'CFRP', definition: 'Carbon Fiber Reinforced Plastic' },
                    { term: 'Galvanic Corrosion', definition: 'An electrochemical process in which one metal corrodes preferentially when it is in electrical contact with another' },
                    { term: 'Alloy', definition: 'A metal made by combining two or more metallic elements' },
                    { term: 'Martensite', definition: 'A very hard form of steel crystalline structure' }
                ],
                quiz: {
                    questions: [
                        { id: 'q1', question: 'Which material allows a truck like the Ford F-150 to lose 700 lbs of weight?', options: ['Cast Iron', 'Aluminum', 'Lead', 'Gold'], correctAnswer: 1, explanation: 'Aluminum has a much lower density than steel, allowing for significant weight reduction.' },
                        { id: 'q2', question: 'Boron Steel is used for:', options: ['The floor mats', 'Critical safety members (A/B pillars) to prevent cabin collapse', 'The engine oil', 'The windows'], correctAnswer: 1, explanation: 'Its extreme yield strength makes it nearly impossible to crush in an accident.' },
                        { id: 'q3', question: 'What is the "Galvanic" problem in a car?', options: ['The car is too quiet', 'Mixing different metals like steel and aluminum causes rapid rust/corrosion', 'The battery is dead', 'Lights are too bright'], correctAnswer: 1, explanation: 'Electrochemical reactions between different metals must be managed with insulators.' },
                        { id: 'q4', question: 'Carbon Fiber is slow for mass production because:', options: ['It is too heavy', 'It must be "cured" or "baked" in an oven for long periods', 'It is only one color', 'It is made of wood'], correctAnswer: 1, explanation: 'The chemical curing process takes much longer than a mechanical stamping press.' },
                        { id: 'q5', question: '95% of a car’s metal is:', options: ['Threw in the trash', 'Recyclable and reused in new cars', 'Explosive', 'Floating'], correctAnswer: 1, explanation: 'Cars are highly sustainable through closed-loop metal recycling.' }
                    ]
                }
            },
            {
                id: 'painting-coatings-corrosion',
                title: 'Painting & Corrosion Protection',
                duration: '15 min', xp: 200,
                description: 'E-Coat, Primer, & The 10-Step Beauty Process',
                aiTutor: true,
                introduction: "A car is $20,000 worth of raw metal that wants to turn back into 'Dirt' (Rust). The paint shop's job is to stop that. This lesson follows a car shell through the world's most sophisticated bathroom — the 'E-Coat' tank.",
                sections: [
                    { title: '🎯 The Pre-treatment: Getting Naked', content: "**Cleaning the Oil**\n\nStamping metal requires oil. Welding creates soot. \n- Before painting, the car is dipped into 10 different chemical baths to strip away every microscopic bit of dirt. \n- **Phosphate Coating:** Creates a rough 'crystal' surface on the steel so the paint has something to 'grab' onto." },
                    { title: '🔧 E-Coat: Electronic Dipping', content: "**The Rust-Proof Foundation**\n\nThe whole car body is dipped into a giant tank of gray liquid primer. \n- **Electrophoresis:** They give the car a Negative charge and the tank a Positive charge. \n- The paint is 'pulled' into every single tiny crevice, inside the doors, and inside the frame rails. This ensures that 100% of the metal is covered, preventing rust from ever starting on the inside-out." },
                    { title: '📐 Sealing & The "Clear Coat"', content: "**The Final Layers**\n\n1. **Base Coat:** This contains the 'Color' and any metallic 'Flakes.'\n2. **Clear Coat:** The most important layer. It is a 2-part chemical 'Shield' that protects the color from UV rays (sunlight), bird droppings, and acid rain. It provides the 'Wet' shine look of a new car.\n3. **Sealing:** Robots apply 'PVC goop' to every joint to keep water out." },
                    { title: '🚀 Sustainable Painting: No More Solvents', section: 'Eco-Friendly Shine', content: "**Water-Based Future**\n\n- In the past, car paint used solvents that created 'Smog' (VOCs). \n- Modern paint shops use **Water-Based** paints and oversized 'dry scrubbers' that catch the paint mist using limestone powder rather than water, saving millions of gallons of waste." },
                    { title: '🧪 Painting Practice', content: "**P1:** What causes 'Orange Peel'?\n*Answer: When the paint doesn't 'flow' flat as it dries. It looks like the texture of an orange. High-end cars like Rolls Royce have their paint 'hand-sanded' to remove this for a perfect mirror finish.*\n\n**P2:** Why do new cars 'Smell' like they do?\n*Answer: The 'Off-gassing' of the plastics, glues, and the clear-coat. Some manufacturers have an 'Odor Team' that smells parts to ensure the car doesn't smell like fish or garbage!*\n\n**P3:** What is a 'Stone Chip' vulnerable area?\n*Answer: The hood and rockers. Some cars have a 'Sacrificial' layer of thick plastic coating applied under the paint in these areas to prevent gravel from chipping away the rust protection.*\n\n**P4:** What is 'Flash-off'?\n*Answer: The time between paint layers where the solvent evaporates. If you paint the next layer too fast, you get bubbles.*\n\n**P5:** Can you paint a car with a brush?\n*Answer: Yes (Tesla early days had some brush touch-ups), but for mass production, we use 'Electrostatic Bell' robots that spin at 60,000 RPM to create a mist so fine it acts like a cloud.*" }
                ],
                keyTakeaways: ['Pre-treatment crystals allow paint to bond chemically to raw steel', 'E-coat uses electromagnetism to ensure 100% rust coverage in hidden cavities', 'Clear coat is the primary defensive barrier against UV and chemical damage', 'Water-based paints and limestone scrubbers have made paint shops more sustainable', 'Electrostatic application maximizes paint efficiency and minimizes waste'],
                vocabulary: [
                    { term: 'E-Coat', definition: 'Electrophoretic Deposition — using an electric current to apply paint' },
                    { term: 'VOC', definition: 'Volatile Organic Compounds — gases emitted from certain solids or liquids' },
                    { term: 'Clear Coat', definition: 'The transparent top layer of a vehicle’s paint system' },
                    { term: 'Phosphate Coating', definition: 'A chemical treatment that creates a protective layer and a base for paint' },
                    { term: 'Orange Peel', definition: 'A textured finish in paint that resembles the skin of an orange' }
                ],
                quiz: {
                    questions: [
                        { id: 'q1', question: 'The main goal of the "E-Coat" dip is:', options: ['To choose the color', 'To provide 100% coverage and prevent rust in hidden crevices', 'To make the car faster', 'To add weight'], correctAnswer: 1, explanation: 'Electromagnetism pulls the primer into every tiny hole in the chassis.' },
                        { id: 'q2', question: 'Which paint layer protects the car from UV sunlight damage?', options: ['The E-Coat', 'The Clear Coat', 'The Metal', 'The primer'], correctAnswer: 1, explanation: 'The clear coat is the "sunscreen" for your car’s color.' },
                        { id: 'q3', question: 'VOCs are a concern in paint shops because they represent:', options: ['Lost money', 'Harmful gases and air pollution', 'Pretty colors', 'Good smells'], correctAnswer: 1, explanation: 'Solvent vapors are harmful to the environment and human health.' },
                        { id: 'q4', question: 'The "Phosphate" bath does what?', options: ['Washes the car with soap', 'Creates a microscopic "crystalline" surface for paint to stick to', 'Paints the car blue', 'Melt the car'], correctAnswer: 1, explanation: 'It is the "Velcro" that helps the paint layers anchor to the steel.' },
                        { id: 'q5', question: '"Electrostatic" painting works by:', options: ['Using a lot of tape', 'Charging the car and the paint mist with opposite electricity to attract the mist', 'Using a giant brush', 'Gravity'], correctAnswer: 1, explanation: 'This ensures almost zero paint is wasted as it is "pulled" toward the car.' }
                    ]
                }
            },
            {
                id: 'lean-manufacturing-toyota-system',
                title: 'Lean Manufacturing: Toyota Production System',
                duration: '15 min', xp: 200,
                description: 'The philosophy of "Just-in-Time" and 0% Waste',
                aiTutor: true,
                introduction: "Cars are built by humans and robots working as a single organism. The **Toyota Production System (TPS)** is the world's most successful way of organizing a factory. This lesson is about the logic of 'Lean' — eliminating waste to make high-quality cars at the lowest price.",
                sections: [
                    { title: '🎯 JIT: Just-in-Time', content: "**No More Warehouses**\n\n- **Old Way:** Have a 1 month supply of steering wheels. If there's a bug in the wheel, you have 10,000 bad ones. \n- **TPS Way:** The steering wheel arrives at the factory 4 hours before it is bolted to the car. \n- **Why?** It forces perfection. If a part is bad, the whole line stops immediately. This 'Pains' the factory to find the root cause and fix it forever." },
                    { title: '🔧 The Andon Cord: Stopping the Line', content: "**Every Worker is an Engineer**\n\nIn a Toyota factory, every worker can pull a physical cord (The Andon) and **Stop the entire multi-billion dollar assembly line**. \n- **The Philosophy:** It is better to stop and fix a problem NOW than to send a broken car to a customer later. This builds a 'Culture of Quality' where everyone is responsible for the final product." },
                    { title: '📐 Kaizen: Continuous Improvement', content: "**1% Better Every Day**\n\nKaizen is the belief that no process is ever perfect. \n- If a worker has to walk 3 steps to pick up a bolt, they might design a small rack to put the bolts 1 step away. \n- Over a year, these 2-second improvements add up to thousands of hours of saved labor and lower prices for the buyer." },
                    { title: '🚀 Poka-Yoke: Mistake Proofing', section: 'Eliminating Human Error', content: "**Designing for Perfection**\n\n- How do you ensure a worker doesn't put a part on upside down? \n- **Poka-Yoke:** Make the part so it ONLY fits one way. Give it a unique shape or a tab that blocks it from being installed wrong. If the part requires 4 bolts, the computer won't let the next car move until it detects 4 clicks from the torque wrench." },
                    { title: '🧪 TPS Practice', content: "**P1:** What is 'Takt Time'?\n*Answer: The 'Heartbeat' of the factory. If the factory must make 1,000 cars in 1,000 minutes, the Takt Time is 1 minute. Every station must finish its job in exactly 60 seconds.*\n\n**P2:** What is 'Muda'?\n*Answer: The Japanese word for 'Waste.' It includes waste of time, waste of movement, waste of over-production, and waste of defects.*\n\n**P3:** What is a 'Kanban'?\n*Answer: A 'Signal.' Usually a card or a digital light. When a worker is low on bolts, they send the Kanban to the supplier. This 'Pulls' the inventory only when it's needed.*\n\n**P4:** What is 'Gemba'?\n*Answer: 'The Real Place.' It means managers must leave their offices and walk the factory floor to understand problems, rather than just looking at spreadsheets.*\n\n**P5:** Can JIT fail?\n*Answer: Yes. During COVID or natural disasters, the 'Just-in-Time' system broke because the trucks couldn't arrive. Many companies are now moving to 'Just-in-Case' for critical parts like microchips.*" }
                ],
                keyTakeaways: ['JIT (Just-in-Time) minimizes inventory and forces immediate quality control', 'The Andon Cord empowers every worker to stop production to fix defects', 'Kaizen represents the compounding value of continuous, small improvements', 'Poka-yoke designs physical and digital systems to make errors impossible', 'Takt time synchronizes the entire factory to the speed of customer demand'],
                vocabulary: [
                    { term: 'JIT', definition: 'Just-in-Time — a production strategy that strives to improve a business return on investment by reducing in-process inventory' },
                    { term: 'Kaizen', definition: 'A Japanese business philosophy of continuous improvement of working practices' },
                    { term: 'Andon', definition: 'A system to notify management, maintenance, and other workers of a quality or process problem' },
                    { term: 'Poka-Yoke', definition: 'A mechanism that helps an equipment operator avoid mistakes' },
                    { term: 'Takt Time', definition: 'The rate at which a finished product needs to be completed in order to meet customer demand' }
                ],
                quiz: {
                    questions: [
                        { id: 'q1', question: 'The goal of "Just-in-Time" manufacturing is to:', options: ['Buy as many parts as possible', 'Minimize inventory and force high quality', 'Be late', 'Save on electricity'], correctAnswer: 1, explanation: 'Reducing "Stock" saves money and highlights system failures immediately.' },
                        { id: 'q2', question: 'An "Andon Cord" is used to:', options: ['Listen to music', 'Stop the entire assembly line to fix a quality problem', 'Charge the car', 'Tie the engine down'], correctAnswer: 1, explanation: 'Empowering workers to stop the line prevents defect propagation.' },
                        { id: 'q3', question: '"Poka-Yoke" is a technique to:', options: ['Paint the car', 'Design parts/tools so they cannot be used incorrectly (Error-proofing)', 'Make the car fast', 'Sell more cars'], correctAnswer: 1, explanation: 'Mechanical or electronic "checks" ensure a job is done right every time.' },
                        { id: 'q4', question: 'The Japanese word "Kaizen" means:', options: ['Fast car', 'Continuous Improvement', 'End of work', 'Big Factory'], correctAnswer: 1, explanation: 'It is the philosophy of making small, steady gains over time.' },
                        { id: 'q5', question: '"Takt Time" is the _________ of the factory.', options: ['Color', 'Price', 'Heartbeat (rate of production)', 'Noise'], correctAnswer: 2, explanation: 'It synchronizes production speed with customer purchase speed.' }
                    ]
                }
            }
        ]
    }]
};

export default section7Manufacturing;
