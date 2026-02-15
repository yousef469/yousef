// Section 9: Future Mobility - 5 Deep Lessons
export const section9Future = {
    id: 'future-mobility',
    title: 'Unit 9: Future Mobility',
    description: 'The next century of transportation engineering',
    icon: '🚀',
    color: 'from-blue-600 to-purple-900',
    units: [{
        id: 'emerging-tech',
        title: 'The Post-Gasoline Era',
        description: 'Hydrogen, eVTOL, and Life-Cycle Engineering',
        lessons: [
            {
                id: 'hydrogen-fuel-cells-pem',
                title: 'Hydrogen Fuel Cells: PEM Physics',
                duration: '15 min', xp: 200,
                description: 'Generating electricity from the most abundant element',
                aiTutor: true,
                introduction: "A Fuel Cell car is an electric car that doesn't need to be 'Plugged in' for 8 hours. It makes its own electricity from Hydrogen gas. This lesson explores the **PEM** (Proton Exchange Membrane) and why Hydrogen might be the 'Diesel' of the future for long-haul trucks.",
                sections: [
                    { title: '🎯 The PEM Fuel Cell: Reverse Electrolysis', content: "**Chemistry in Action**\n\nA fuel cell works by forcing Hydrogen and Oxygen together across a special membrane.\n1. **The Anode:** Hydrogen gas enters and is stripped of its electrons by a Platinum catalyst.\n2. **The Proton Exchange Membrane:** Only the Protons can sneak through the membrane. The Electrons are forced to take 'the long way' around through an external circuit—this 'long way' IS the electricity that powers the car's motor.\n3. **The Cathode:** Oxygen (from the air) meets the protons and electrons at the other side. They combine to create pure **H₂O (Water Vapor)**. No CO₂, no NOX, just steam." },
                    { title: '🔧 Storing Hydrogen: 700 Bar Pressure', content: "**The Density Challenge**\n\nHydrogen is the lightest gas in the universe. To fit enough into a car, you must compress it to **700 Bar (10,000 PSI)**. \n- **The Tank:** Carbon fiber wrapped, multi-layered tanks designed to survive being hit by a train without leaking. \n- **The Infrastructure:** While a battery is 90% efficient 'Grid-to-Wheel,' Hydrogen is only 30% efficient due to the energy needed to compress and transport it. This is Hydrogen's biggest hurdle." },
                    { title: '📐 Green vs. Blue vs. Grey Hydrogen', content: "**The Source Matters**\n\nNot all Hydrogen is 'Zero Emission.'\n- **Grey:** Made from natural gas (methane). Creates CO₂. 95% of today's Hydrogen is grey.\n- **Green:** Made using solar/wind power to split water (Electrolysis). This is the only 100% 'Clean' version." },
                    { title: '🚀 Future of Heavy Transport', section: 'Trucks vs. Cars', content: "**The Weight Advantage**\n\n- To move a 40-ton truck 500 miles, you would need 10 tons of batteries. \n- With Hydrogen, you only need 100kg of gas and a 300kg fuel cell stack. \n- This 'Weight Savings' means a Hydrogen truck can carry more 'Payload' (Cargo) than a battery truck. Hydrogen is likely the future for shipping, planes, and construction equipment." },
                    { title: '🧪 Hydrogen Practice', content: "**P1:** What comes out of the 'Exhaust' of a Fuel Cell car?\n*Answer: Pure, drinkable water vapor. In cold weather, it looks like white steam, but it is completely non-toxic.*\n\n**P2:** Is Hydrogen 'Explosive'?\n*Answer: Hydrogen is flammable, but it is also the 'lightest' gas. If a tank leaks, the gas shoots UP into the atmosphere at 45 mph, rather than pooling on the ground like gasoline. This makes it safer in open-air crashes.*\n\n**P3:** Can you convert a gas engine to run on Hydrogen?\n*Answer: Yes (Hydrogen Internal Combustion). Toyota and Cummins are building these. It is less efficient than a fuel cell, but much cheaper to build because you use the same factory tools as a gas engine.*\n\n**P4:** What is 'Hydrogen Embrittlement'?\n*Answer: Hydrogen atoms are so small they can literally 'Squeeze' inside the crystal lattice of steel, making the metal brittle and crack. High-pressure tanks must use specialized alloys to prevent this.*\n\n**P5:** Current Leaders?\n*Answer: Toyota (Mirai) and Hyundai (Nexo) are the pioneers. While passenger car sales are slow, they are proving the 'State of the Art' for future semi-trucks.*" }
                ],
                keyTakeaways: ['PEM fuel cells generate electricity by separating protons and electrons from hydrogen', 'Hydrogen storage requires carbon-fiber tanks pressurized to 10,000 PSI', 'Green hydrogen produced via electrolysis is the only truly carbon-neutral form', 'Hydrogen provides a massive weight advantage over batteries for heavy-duty hauling', 'Fuel cells offer 5-minute refueling speeds, rivaling traditional gasoline cars'],
                vocabulary: [
                    { term: 'PEM', definition: 'Proton Exchange Membrane — the heart of the fuel cell' },
                    { term: '700 Bar', definition: 'The standard pressure for automotive hydrogen storage (about 700x sea level pressure)' },
                    { term: 'Electrolysis', definition: 'Using electricity to split water into hydrogen and oxygen' },
                    { term: 'Embrittlement', definition: 'The loss of ductility in a metal caused by hydrogen atom absorption' },
                    { term: 'Catalyst', definition: 'A substance (usually Platinum) that speeds up a chemical reaction' }
                ],
                quiz: {
                    questions: [
                        { id: 'q1', question: 'The only "exhaust" from a PEM fuel cell car is:', options: ['Carbon Dioxide', 'Carbon Monoxide', 'Pure Water Vapor', 'Methane'], correctAnswer: 2, explanation: 'Hydrogen and Oxygen combine to form H2O.' },
                        { id: 'q2', question: 'Why is Hydrogen better than batteries for Semi-Trucks?', options: ['It’s cheaper', 'It weighs much less, allowing for more cargo payload', 'It smells better', 'It doesn’t need tires'], correctAnswer: 1, explanation: 'Batteries for 500+ miles of heavy hauling would weigh thousands of pounds more than a hydrogen system.' },
                        { id: 'q3', question: '700 Bar pressure is roughly equivalent to:', options: ['100 PSI', '10,000 PSI', '1,000,000 PSI', 'Sea level'], correctAnswer: 1, explanation: 'Extreme pressure is needed to pack the light gas into a usable volume.' },
                        { id: 'q4', question: '"Green Hydrogen" is made using:', options: ['Coal', 'Natural Gas', 'Electrolysis powered by renewable energy (Solar/Wind)', 'Plants'], correctAnswer: 2, explanation: 'Green H2 uses zero fossil fuels from start to finish.' },
                        { id: 'q5', question: 'The function of the PEM membrane is to:', options: ['Look pretty', 'Let Protons through but block Electrons (forcing them through a circuit)', 'Mix the gas with water', 'Filter the oil'], correctAnswer: 1, explanation: 'Blocking electrons and forcing them through a wire "is" the electricity generation.' }
                    ]
                }
            },
            {
                id: 'sustainable-ebio-fuels',
                title: 'Sustainable Fuels (E-Fuels)',
                duration: '15 min', xp: 200,
                description: 'Saving the Internal Combustion Engine: Carbon-Neutral Gasoline',
                aiTutor: true,
                introduction: "What if you could keep your classic Porsche or your heavy-duty truck, but have it be zero-emission? **E-Fuels** (Electro-fuels) are synthetic gasolines made from captured CO₂ and Hydrogen. This lesson covers the 'Cradle-to-Grave' carbon cycle of synthetic fuels.",
                sections: [
                    { title: '🎯 Carbon Capture: Mining the Air', content: "**The Alchemy of Energy**\n\n- Standard gas takes carbon from 'The Ground' (Old oil) and moves it to 'The Air' (Exhaust), increasing CO₂.\n- **E-Fuels** take CO₂ from 'The Air' (using giant fans), mix it with Hydrogen, and turn it back into liquid 'Gasoline.' \n- When you burn it, you release the CO₂ back into the air. \n- **The Net Result:** Zero new carbon added to the atmosphere. It's a closed loop." },
                    { title: '🔧 Drop-in Compatibility', content: "**No Retrofits Needed**\n\nE-Fuels are 'Molecularly Identical' to gasoline. \n- You can pour it into a 1965 Mustang, a Boeing 747, or a modern Ferrari. \n- It burns cleaner than pump gas because it doesn't have Sulfur or Lead. This is the 'Silver Bullet' for industries that can't easily go electric, like long-range aviation and classic car preservation." },
                    { title: '📐 The Efficiency Problem', content: "**Thermodynamic Cost**\n\nWhy aren't we doing this already? \n- To make 1 liter of E-Fuel, you need a massive amount of electricity. \n- **Efficiency:** You lose energy during Carbon Capture, lose energy during Hydrogen creation, and lose energy during the synthesis. \n- It takes roughly 5-10x more energy to drive a car on E-Fuel than to drive the same car on a battery. This is why E-Fuels will likely cost $10-15 per gallon for the foreseeable future." },
                    { title: '🚀 Biofuels: The 2nd Gen', section: 'From Waste to Watt', content: "**Beyond Corn**\n\n- **1st Gen:** Corn Ethanol (Competing with food). \n- **2nd Gen:** Using wood chips, algae, and garbage. \n- By turning municipal waste into fuel, we solve two problems at once: cleaning the landfill and making carbon-neutral fuel for airplanes." },
                    { title: '🧪 E-Fuel Practice', content: "**P1:** Does E-Fuel produce 'Smog'?\n*Answer: Yes. While it's carbon-neutral, it still burns in a hot engine, which produces Nitrogen Oxides (NOX). You still need a catalytic converter.*\n\n**P2:** Who is building this?\n*Answer: Porsche and HIF Global are building a massive wind-powered E-Fuel plant in Chile. They chose Chile because the wind blows 300 days a year, providing 'Infinite' cheap energy to offset the efficiency losses.*\n\n**P3:** Can E-Fuels save the ICE engine?\n*Answer: Yes. The EU has created a 'Loophole' that allows new gas cars to be sold after 2035 IF they only run on carbon-neutral E-Fuels.*\n\n**P4:** What is 'SAF'?\n*Answer: Sustainable Aviation Fuel. It is the aerospace version of E-Fuel. Since you can't put a half-ton battery on a passenger plane, SAF is the only way to make flying green.*\n\n**P5:** Is it 'Fake' gas?\n*Answer: No. It is chemically 'High-Octane' fuel. In fact, it's often higher quality than what you get at the gas station because it is pure and consistent.*" }
                ],
                keyTakeaways: ['E-Fuels create a closed carbon loop by synthesizing gasoline from atmospheric CO2', 'They are molecularly identical to fossil fuels, requiring zero hardware modifications', 'The primary drawback is low thermodynamic efficiency and high production cost', 'E-Fuels are essential for decarbonizing aviation, shipping, and classic cars', 'EU regulations allow for ICE engines post-2035 if powered by E-Fuels'],
                vocabulary: [
                    { term: 'E-Fuel', definition: 'Synthetic fuel produced using captured CO2 and renewable hydrogen' },
                    { term: 'Carbon Capture', definition: 'The process of trapping waste carbon dioxide at its source or from the air' },
                    { term: 'SAF', definition: 'Sustainable Aviation Fuel' },
                    { term: 'Drop-in Fuel', definition: 'Synthetic fuel that can be used in existing engines without modification' },
                    { term: 'Octane Rating', definition: 'A measure of a fuel’s ability to resist "knock" or premature detonation' }
                ],
                quiz: {
                    questions: [
                        { id: 'q1', question: 'E-Fuels are considered "Carbon Neutral" because:', options: ['They have no carbon', 'They use CO2 captured from the atmosphere to create the fuel (Closed Loop)', 'They are blue', 'They are free'], correctAnswer: 1, explanation: 'They only release the carbon they previously "took" from the air.' },
                        { id: 'q2', question: 'What is the biggest "Problem" with E-Fuels today?', options: ['They smell like corn', 'They are very energy-intensive and expensive to produce', 'They melt engines', 'They are only for trucks'], correctAnswer: 1, explanation: 'Synthesis requires massive amounts of green electricity.' },
                        { id: 'q3', question: 'A "Drop-in" fuel means:', options: ['You drop it in the ocean', 'It works in existing engines without any modifications', 'It’s for the trash', 'It only works in new cars'], correctAnswer: 1, explanation: 'Molecular identity allows for use in current infrastructure.' },
                        { id: 'q4', question: 'Porsche is building E-Fuel plants in Chile because of:', options: ['Cheap labor', 'Consistent high-speed wind for renewable electricity', 'The soil', 'The mountains'], correctAnswer: 1, explanation: 'Abundant renewable energy is the only way to make E-Fuel viable.' },
                        { id: 'q5', question: 'Which industry MOST needs E-Fuel/SAF to survive?', options: ['Long-distance Aviation', 'City scooters', 'Bicycles', 'Trains'], correctAnswer: 0, explanation: 'Batteries are currently too heavy for trans-oceanic flight.' }
                    ]
                }
            },
            {
                id: 'evtol-flying-car-propulsion',
                title: 'eVTOL & Flying Car Propulsion',
                duration: '15 min', xp: 200,
                description: 'Distributed Electric Propulsion: The 3rd Dimension',
                aiTutor: true,
                introduction: "We have spent 100 years driving in 2D. The future is 3D. **eVTOL** (Electric Vertical Take-off and Landing) vehicles are the 'Flying Cars' we were promised. This lesson covers the engineering of **Distributed Electric Propulsion** (DEP) and why batteries finally made flight quiet enough for cities.",
                sections: [
                    { title: '🎯 DEP: Distributed Electric Propulsion', content: "**Many Small Motors**\n\n- **Old Helicopters:** One giant engine and one giant rotor. If it fails, you fall. \n- **eVTOL:** Uses 6, 8, or 12 small electric motors. \n- **Redundancy:** If 2 motors fail, the others can adjust their speed to keep the craft stable. This makes them 10x safer than a traditional helicopter. It also makes them much quieter because smaller blades create less 'Thump' from the air being pushed." },
                    { title: '🔧 The Weight Penalty: Gravity vs. Wh', content: "**The Density Barrier**\n\n- To lift a car, you need massive power. \n- Currently, eVTOLs (like Joby or Archer) can only fly for about **30 to 60 minutes**. \n- They are 'Short-Range Air Taxis.' They use 200 Watts of power to lift just to save you 45 minutes of sitting in traffic." },
                    { title: '📐 Tilting Rotors vs. Lift & Cruise', content: "**Design Archetypes**\n\n1. **Multicopter:** Just a giant drone. Simple, but slow and inefficient.\n2. **Lift & Cruise:** Uses some motors for vertical lift, and a separate motor/wing for forward flight.\n3. **Tilting Rotor:** The most complex. The same motors rotate 90 degrees to lift you up, then face forward to fly like a plane. This is the fastest but hardest to engineer safely." },
                    { title: '🚀 Autonomous Air Traffic Control', section: 'No more Pilots', content: "**Digital Skyways**\n\n- You can't have 1,000 human pilots flying randomly over a city. \n- eVTOLs will use **V2V (Vehicle-to-Vehicle)** communication. \n- Each craft shares its 'Intent' path with every other craft. A central AI cloud manages the 'Sky Lanes' to ensure cars never get within 500 feet of each other." },
                    { title: '🧪 eVTOL Practice', content: "**P1:** Why aren't we use gas engines for flying cars?\n*Answer: Noise and Response. A gas engine takes seconds to change RPM. An electric motor takes milliseconds. To stay stable in a wind gust, an eVTOL needs to adjust motor speed 100 times per second.*\n\n**P2:** What is 'Blade Vortex Interaction'?\n*Answer: The 'Whop-Whop' noise of a helicopter. Electric rotors are designed with weird 'S' shapes or 5-blades to spread out this air pressure, making them as quiet as a vacuum cleaner.*\n\n**P3:** Can an eVTOL glide if it runs out of battery?\n*Answer: Only if it has wings (Lift & Cruise or Tilt-Rotor). A pure multicopter drone drops like a stone. This is why winged designs are winning for city transport.*\n\n**P4:** What is 'Specific Power'?\n*Answer: kW/kg. For cars, we want Energy Density (Wh/kg). For flying, we want power. The battery must be able to 'Dump' massive power for 30 seconds during take-off without melting.*\n\n**P5:** When can I buy one?\n*Answer: You likely won't 'Buy' one. They will be Uber-style services. Certification from the FAA is the biggest bottleneck, but the first commercial flights are expected in 2025-2026 in cities like NYC, Paris, and Dubai.*" }
                ],
                keyTakeaways: ['DEP (Distributed Electric Propulsion) provides safety via motor redundancy', 'eVTOL designs trade simplicity for speed and range through tilting rotors or wings', 'Electric propulsion enables flight stabilization speeds impossible for gas engines', 'Digital autonomous corridors are required to manage dense urban air traffic', 'Flight is limited by power-to-weight ratios and battery discharge rates during liftoff'],
                vocabulary: [
                    { term: 'eVTOL', definition: 'Electric Vertical Take-off and Landing' },
                    { term: 'DEP', definition: 'Distributed Electric Propulsion — using multiple small motors instead of one large one' },
                    { term: 'Redundancy', definition: 'The inclusion of extra components which are not strictly necessary to functioning, in case of failure' },
                    { term: 'V2V', definition: 'Vehicle-to-Vehicle communication' },
                    { term: 'Specific Power', definition: 'Power per unit of mass (kW/kg) — critical for takeoff' }
                ],
                quiz: {
                    questions: [
                        { id: 'q1', question: 'What is the main safety advantage of DEP (multiple motors)?', options: ['It’s cheaper', 'Redundancy: if one motor fails, the others can keep the craft level', 'It’s easier to paint', 'It uses less wire'], correctAnswer: 1, explanation: 'Small motors allow for "Fail-Soft" designs.' },
                        { id: 'q2', question: 'Why are electric motors better than gas engines for vertical flight stability?', options: ['They are quieter', 'They can change speed in milliseconds to respond to wind gusts', 'They use no oil', 'They are made of copper'], correctAnswer: 1, explanation: 'Stability in high-density flight requires near-instantaneous control adjustments.' },
                        { id: 'q3', question: 'A "Tilting Rotor" design is used to:', options: ['Lift you up AND push you forward efficiently', 'Wavelength measurement', 'Save on batteries', 'Look like a bird'], correctAnswer: 1, explanation: 'It offers the best of both worlds: vertical lift and efficient horizontal cruising.' },
                        { id: 'q4', question: 'What is the "Take-off" challenge for eVTOL batteries?', options: ['They get cold', 'They must provide massive amounts of power (High Current) for 30 seconds', 'They are too small', 'They only work on Tuesdays'], correctAnswer: 1, explanation: 'Takeoff requires "Specific Power" – the ability to dump energy rapidly.' },
                        { id: 'q5', question: 'Flying cars in cities will likely be managed by:', options: ['Traffic lights', 'Autonomous V2V (Vehicle-to-Vehicle) networks and AI Cloud controllers', 'Police', 'The driver’s eyes'], correctAnswer: 1, explanation: 'Scale requires autonomous coordination, not human pilots.' }
                    ]
                }
            },
            {
                id: 'micromobility-urban-design',
                title: 'Micro-mobility & Urban Design',
                duration: '15 min', xp: 200,
                description: 'Vehicles for the 15-Minute City',
                aiTutor: true,
                introduction: "70% of car trips are under 3 miles, often with one person in a 5,000 lb SUV. This is 'Engineering Waste.' **Micro-mobility** covers e-bikes, scooters, and 3-wheeled 'pod' vehicles. This lesson is about scaling transportation down to fit the human body and the city.",
                sections: [
                    { title: '🎯 The Efficiency of 1/10th Scale', content: "**Weight vs. Utility**\n\n- **A Car:** Weighs 2,000kg to move a 80kg human. (Efficiency: 4%).\n- **An E-Bike:** Weighs 20kg to move a 80kg human. (Efficiency: 80%).\n- By moving the weight of the vehicle closer to the weight of the passenger, you reduce the energy needed to move by **95%**. This is more effective than any engine improvement." },
                    { title: '🔧 The 15-Minute City', content: "**Design for Proximity**\n\n- Urban planning is shifting from 'Highways' to 'Human Zones.' \n- Micro-mobility allows for 'The 15-Minute City' — a design where work, food, and schools are all within a 15-minute e-bike ride. \n- This eliminates the need for giant parking lots, which cover 30% of most modern cities." },
                    { title: '📐 Battery Swapping vs. Charging', content: "**The Gogoro Model**\n\n- In crowded cities, you can't plug in 1,000 scooters to one building. \n- **Battery Swapping:** You go to a kiosk, drop your dead battery, and pull a fresh one out in 6 seconds. This solves 'Range Anxiety' and infrastructure limits simultaneously." },
                    { title: '🚀 Last-Mile Robotics', section: 'Sidewalk Delivery', content: "**The End of the Van**\n\n- The 'Last Mile' of delivery (from the warehouse to your door) is the most expensive and creates the most traffic. \n- Smaller, autonomous 'Sidewalk Bots' can deliver packages, using 1/50th the energy of a delivery van and reducing road congestion." },
                    { title: '🧪 Micro Practice', content: "**P1:** What is 'Active Transportation'?\n*Answer: Walking and cycling. Micro-mobility (like e-bikes) makes active transport possible for people who are older or have longer commutes.*\n\n**P2:** What is 'Induced Demand'?\n*Answer: The 'Highways' Paradox. If you build more lanes, you get MORE traffic. If you build more bike lanes, you get more micro-mobility. The city 'Induces' what you design for.*\n\n**P3:** Why is 'Battery Safety' hard for scooters?\n*Answer: Unlike cars, scooters are often charged indoors. Cheap, non-certified batteries can cause house fires. Engineers must design 'Smart Chargers' that talk to the BMS to prevent overcharging.*\n\n**P4:** What is 'Modal Shift'?\n*Answer: The goal of convincing people to switch from a car to a train/bike for just one trip a week. Even a 5% shift can eliminate 'Rush Hour' traffic jams.*\n\n**P5:** Can a city be 'Car Free'?\n*Answer: Oslo and Amsterdam are close. They use 'Mobility Hubs' at the edges. You drive to the edge, then use Micro-mobility to enter the center. This makes the city quieter, cleaner, and safer.*" }
                ],
                keyTakeaways: ['Micro-mobility improves transportation efficiency by aligning vehicle mass with passenger mass', 'The "15-Minute City" reduces total VMT (Vehicle Miles Traveled) by shortening trip distances', 'Battery swapping infrastructure solves charging bottlenecks in high-density urban areas', 'Last-mile autonomous bots reduce congestion caused by large delivery vehicles', 'Urban design choices "Induce" demand for either cars or sustainable transit'],
                vocabulary: [
                    { term: 'VMT', definition: 'Vehicle Miles Traveled — a measure of the amount of travel for all vehicles in a geographic region over a given period' },
                    { term: 'Induced Demand', definition: 'The phenomenon where increasing supply (roads) increases the demand for a resource' },
                    { term: 'Micro-mobility', definition: 'Small, lightweight vehicles operating at speeds typically below 25 km/h' },
                    { term: 'Battery Swapping', definition: 'The exchange of a discharged battery for a fully charged one in seconds' },
                    { term: 'Vulnerable Road User', definition: 'Non-motorized road users, such as pedestrians and cyclists' }
                ],
                quiz: {
                    questions: [
                        { id: 'q1', question: 'What is the main energy benefit of an E-Bike over an SUV?', options: ['It’s cheaper', 'It weighs 1/100th as much, meaning 95% less energy is needed to move a person', 'It’s faster', 'It has no battery'], correctAnswer: 1, explanation: 'Excess vehicle weight is the biggest waste in modern transit.' },
                        { id: 'q2', question: '"Induced Demand" suggests that building more roads usually results in:', options: ['Less traffic', 'More traffic', 'Cheaper gas', 'No change'], correctAnswer: 1, explanation: 'New roads attract more drivers, quickly filling the new capacity.' },
                        { id: 'q3', question: 'Battery swapping is popular for scooters in Asia because:', options: ['It is fun', 'It solves the problem of not being able to charge in small/crowded apartment buildings', 'Batteries are free', 'It creates jobs'], correctAnswer: 1, explanation: 'Urban density makes personal charging ports difficult to install.' },
                        { id: 'q4', question: 'A "15-Minute City" is designed so:', options: ['Cars move at 15 mph', 'Everything you need is within a 15-minute walk or bike ride', 'Work starts at 15:00', 'Parking is only 15 cents'], correctAnswer: 1, explanation: 'Proximity reduces the mathematical "Need" for a high-speed vehicle.' },
                        { id: 'q5', question: 'The "Last Mile" refers to:', options: ['The end of the car’s life', 'The final, most expensive leg of delivering a package to a home', 'A race', 'A unit of measure'], correctAnswer: 1, explanation: 'Solving the "Last Mile" with small bots or bikes saves massive amounts of traffic.' }
                    ]
                }
            },
            {
                id: 'life-cycle-assessment-cradle-to-grave',
                title: 'Life Cycle Assessment (LCA)',
                duration: '15 min', xp: 200,
                description: 'The real carbon cost: From the Mine to the Scrapyard',
                aiTutor: true,
                introduction: "Is an EV actually 'Clean' if the energy came from a coal plant and the Cobalt came from a child-labor mine? To answer this, engineers use **Life Cycle Assessment (LCA)**. This lesson covers 'Cradle-to-Grave' engineering and why an EV is 'Dirtier' than a gas car for the first 15,000 miles.",
                sections: [
                    { title: '🎯 Cradle-to-Grave: The 4 Phases', content: "**Total Impact**\n\n1. **Material Extraction:** Mining the Lithium, Iron, and Bauxite.\n2. **Production:** The energy used by robots and Gigapresses.\n3. **Usage:** The fuel/electricity used over 200,000 miles.\n4. **End of Life:** Recycling vs. Landfill. \n- **The Paradox:** An EV starts its life with a 'Carbon Debt.' It takes more CO₂ to build a battery than a gas tank. You have to drive it about 1-2 years to 'pay off' that debt and become cleaner than a gas car." },
                    { title: '🔧 Carbon Intensity of the Grid', content: "**Fueling the Charger**\n\n- If you charge an EV in **Sweden** (Nuclear/Hydro), it is 99% cleaner than gas. \n- If you charge an EV in **West Virginia** (100% Coal), it is only 10% cleaner than a hybrid. \n- As the world's electricity grid gets 'Greener,' every EV on the road automatically gets cleaner every day without the owner doing anything." },
                    { title: '📐 Ethical Mining & Human Rights', content: "**The Social Cost**\n\nLCA also includes **Social Life Cycle Assessment**. \n- **Cobalt:** 60% comes from the DRC, often with poor labor conditions. \n- **The Engineering Solution:** Move to 'Cobalt-Free' batteries (LFP) or 'Sodium-ion' (Salt-based). Engineers are now choosing materials based on 'Ethical Traceability' rather than just weight or power." },
                    { title: '🚀 Design for Disassembly', section: 'Closing the Loop', content: "**Future Recycling**\n\n- **Old Cars:** Glued and welded so they can only be 'crushed.' \n- **Future Cars:** Designed with 'Snap-fit' joints and unified materials that a robot can take apart in 10 minutes. This allows for 'Closed Loop' recycling where the old car door literally becomes a new car door the next week." },
                    { title: '🧪 LCA Practice', content: "**P1:** What is an 'EPD'?\n*Answer: Environmental Product Declaration. It's like a 'Nutrition Label' for a car, but instead of calories, it shows CO₂, Water Use, and Primary Energy Demand.*\n\n**P2:** Does an EV battery end up in a landfill?\n*Answer: Almost never. It is too valuable. Large batteries are 98% recycled. Even a dead car battery is worth $1,000 in raw minerals, so companies fight to get them back.*\n\n**P3:** Is 'Hyrdogen' or 'EV' better in LCA?\n*Answer: Currently, EVs are better for cars, while Hydrogen is better for heavy machines. Hydrogen infrastructure has a massive 'Production' footprint that makes it harder to compete in early life cycles.*\n\n**P4:** What is 'Embodied Carbon'?\n*Answer: The CO₂ 'locked' into the car before it ever drives an inch. Steel and Aluminum have high embodied carbon because they require massive heat (2,000°F) to melt and shape.*\n\n**P5:** Can a car be 'Carbon Positive'?\n*Answer: Some concept cars use seats made of 'CO₂ capturing' moss or plastics made from air. While the whole car isn't yet positive, we are moving toward 'Net Zero' factories.*" }
                ],
                keyTakeaways: ['LCA (Life Cycle Assessment) measures environmental impact from mining to recycling', 'EVs have a higher manufacturing "Carbon Debt" but much lower operating impact', 'The cleanliness of an EV is directly tethered to the carbon intensity of the local power grid', 'Ethical material sourcing (e.g., cobalt-free) is a major focus for sustainable engineering', 'Design for disassembly is the key to creating a circular automotive economy'],
                vocabulary: [
                    { term: 'LCA', definition: 'Life Cycle Assessment — a systematic analysis of the environmental impact of a product' },
                    { term: 'Carbon Debt', definition: 'The initial CO2 emissions caused by the manufacturing of a product' },
                    { term: 'Embodied Carbon', definition: 'The total carbon emitted during the material extraction and manufacturing of a product' },
                    { term: 'LFP', definition: 'Lithium Iron Phosphate — a battery chemistry that avoids using cobalt' },
                    { term: 'Circular Economy', definition: 'An economic system aimed at eliminating waste and the continual use of resources' }
                ],
                quiz: {
                    questions: [
                        { id: 'q1', question: 'Why does an EV start its life with a "Carbon Debt"?', options: ['Blowing up the gas car is expensive', 'Manufacturing the battery is energy-intensive and produces more CO2 than making a gas tank', 'The tires are heavier', 'It uses more paint'], correctAnswer: 1, explanation: 'Battery production is currently a high-carbon process, though it pays for itself via zero tailpipe emissions.' },
                        { id: 'q2', question: 'An EV is "Cleanest" when charged in a country with:', options: ['Lots of oil', 'Nuclear, Hydro, or Solar power grids', 'Coal mines', 'No electricity'], correctAnswer: 1, explanation: 'The "fuel" for an EV is only as clean as the power plant that made it.' },
                        { id: 'q3', question: 'Engineers are moving to LFP (Lithium Iron Phosphate) batteries to avoid:', options: ['Weight', 'The use of Cobalt (which has ethical mining issues)', 'Electricity', 'Water'], correctAnswer: 1, explanation: 'LFP uses abundant iron instead of scarce, ethically-challenged cobalt.' },
                        { id: 'q4', question: '"Design for Disassembly" means:', options: ['Making the car easy to crash', 'Ensuring a car can be easily taken apart at the end of its life for recycling', 'The car falls apart while driving', 'Using more glue'], correctAnswer: 1, explanation: 'Closed-loop recycling requires that parts can be separated easily by machines.' },
                        { id: 'q5', question: 'What does "Cradle-to-Grave" mean in engineering?', options: ['Designing for babies', 'Considering every stage of a product’s life from raw material to scrap', 'The speed of the car', 'The price of the car'], correctAnswer: 1, explanation: 'It is the only way to measure the "True" impact of a technology.' }
                    ]
                }
            }
        ]
    }]
};

export default section9Future;
