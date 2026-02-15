// Section 0: Foundations - Basic Electronics (4 Lessons)

export const section0Foundations = {
  id: 'foundations',
  title: 'Unit 0: Foundations',
  description: 'Essential electronics fundamentals',
  icon: '🔌',
  color: 'from-yellow-500 to-orange-500',
  units: [
    {
      id: 'circuit-basics',
      title: 'Circuit Fundamentals',
      description: 'Core concepts for understanding electronics',
      lessons: [
        {
          id: 'ohms-law-power',
          title: "Ohm's Law & Power",
          duration: '25 min', xp: 150,
          description: 'The fundamental relationship between voltage, current, and resistance',
          introduction: "Ohm's Law is the foundation of all electronics. Understanding V=IR unlocks circuit analysis.",
          sections: [
            { title: "Ohm's Law", content: "**V = I × R**\n\n- V = Voltage (Volts)\n- I = Current (Amperes)\n- R = Resistance (Ohms)\n\n**Rearranged:**\n- I = V/R (find current)\n- R = V/I (find resistance)\n\n**Example:**\n12V battery, 100Ω resistor\nI = 12V / 100Ω = 0.12A = 120mA" },
            { title: 'Electrical Power', content: "**P = V × I** (Power in Watts)\n\n**Other Forms:**\n- P = I²R (when you know I and R)\n- P = V²/R (when you know V and R)\n\n**Example:**\n12V × 0.12A = 1.44W\n\n**Power Rating:**\nComponents have max power ratings\n1/4W resistor common for low power" },
            { title: 'Units & Prefixes', content: "**SI Prefixes:**\n- milli (m) = 10⁻³ (milliamps)\n- micro (μ) = 10⁻⁶ (microfarads)\n- nano (n) = 10⁻⁹ (nanoseconds)\n- kilo (k) = 10³ (kilohms)\n- mega (M) = 10⁶ (megahertz)\n\n**Common Values:**\n- 4.7kΩ = 4,700Ω\n- 100μF = 0.0001F\n- 10mA = 0.01A" }
          ],
          keyTakeaways: ["V=IR is the foundation of circuit analysis", "Power P=VI determines heat dissipation", "Always check component power ratings", "Use SI prefixes for readability"],
          quiz: { questions: [
            { id: 'q1', question: '12V across 4Ω resistor. Current?', options: ['3A', '48A', '0.33A', '8A'], correctAnswer: 0, explanation: 'I = V/R = 12/4 = 3A' },
            { id: 'q2', question: 'Power formula using I and R:', options: ['P=V/R', 'P=I²R', 'P=R/I', 'P=IR'], correctAnswer: 1, explanation: 'P = I²R when you know current and resistance.' },
            { id: 'q3', question: '4.7kΩ equals:', options: ['0.0047Ω', '47Ω', '470Ω', '4700Ω'], correctAnswer: 3, explanation: 'k = kilo = 1000, so 4.7k = 4700' }
          ]}
        },
        {
          id: 'series-parallel',
          title: 'Series & Parallel Circuits',
          duration: '30 min', xp: 175,
          description: 'How components combine in different configurations',
          introduction: 'Components can be connected in series (one path) or parallel (multiple paths). Each has different effects on voltage and current.',
          sections: [
            { title: 'Series Circuits', content: "**Characteristics:**\n- Single current path\n- Same current through all components\n- Voltages add up\n\n**Resistors in Series:**\nR_total = R1 + R2 + R3...\n\n**Example:**\n100Ω + 220Ω + 470Ω = 790Ω\n\n**Voltage Divider:**\nV_R1 = V_total × (R1/R_total)" },
            { title: 'Parallel Circuits', content: "**Characteristics:**\n- Multiple current paths\n- Same voltage across all branches\n- Currents add up\n\n**Resistors in Parallel:**\n1/R_total = 1/R1 + 1/R2 + 1/R3...\n\n**Two Resistors:**\nR_total = (R1 × R2)/(R1 + R2)\n\n**Example:**\n100Ω || 100Ω = 50Ω" },
            { title: 'Mixed Circuits', content: "**Analysis Steps:**\n1. Identify series and parallel groups\n2. Simplify parallel groups first\n3. Add series resistances\n4. Calculate total current\n5. Work backwards for individual values\n\n**Kirchhoff's Laws:**\n- KVL: Voltages around loop = 0\n- KCL: Currents into node = currents out" }
          ],
          keyTakeaways: ['Series: same current, voltages add', 'Parallel: same voltage, currents add', 'Parallel resistance is always less than smallest', "Use Kirchhoff's laws for complex circuits"],
          quiz: { questions: [
            { id: 'q1', question: '100Ω and 100Ω in parallel:', options: ['200Ω', '100Ω', '50Ω', '10000Ω'], correctAnswer: 2, explanation: 'R = (100×100)/(100+100) = 50Ω' },
            { id: 'q2', question: 'In series circuit, what is constant?', options: ['Voltage', 'Current', 'Resistance', 'Power'], correctAnswer: 1, explanation: 'Current is the same through all series components.' },
            { id: 'q3', question: '10Ω + 20Ω + 30Ω in series:', options: ['6Ω', '60Ω', '600Ω', '5.45Ω'], correctAnswer: 1, explanation: 'Series: R_total = 10 + 20 + 30 = 60Ω' }
          ]}
        },
        {
          id: 'circuit-algebra',
          title: 'Basic Algebra for Circuits',
          duration: '25 min', xp: 150,
          description: 'Mathematical tools for circuit analysis',
          introduction: 'Circuit analysis requires solving equations. Master these algebraic techniques to analyze any circuit.',
          sections: [
            { title: 'Solving for Unknowns', content: "**Rearranging Ohm's Law:**\n\nGiven: V = IR\n- Solve for I: I = V/R\n- Solve for R: R = V/I\n\n**Example:**\nFind R if V=9V and I=45mA\nR = 9V / 0.045A = 200Ω\n\n**Unit Conversion:**\nAlways convert to base units first!" },
            { title: 'Simultaneous Equations', content: "**Mesh Analysis:**\nMultiple loops create multiple equations\n\n**Example:**\nLoop 1: 12 = 100×I1 + 220×(I1-I2)\nLoop 2: 0 = 220×(I2-I1) + 330×I2\n\n**Solve:**\n1. Simplify each equation\n2. Substitute or use matrices\n3. Check answers" },
            { title: 'Logarithms & Decibels', content: "**Decibels (dB):**\nPower: dB = 10×log₁₀(P2/P1)\nVoltage: dB = 20×log₁₀(V2/V1)\n\n**Common Values:**\n- 3dB = 2× power\n- 6dB = 2× voltage\n- 10dB = 10× power\n- 20dB = 10× voltage\n\n**Example:**\n100mW to 1W = 10×log(10) = 10dB" }
          ],
          keyTakeaways: ['Always convert units before calculating', 'Mesh analysis uses loop equations', 'dB is logarithmic ratio', '3dB = doubling of power'],
          quiz: { questions: [
            { id: 'q1', question: 'V=5V, I=25mA. Find R:', options: ['0.2Ω', '125Ω', '200Ω', '0.005Ω'], correctAnswer: 2, explanation: 'R = V/I = 5/0.025 = 200Ω' },
            { id: 'q2', question: '10× power increase in dB:', options: ['3dB', '6dB', '10dB', '20dB'], correctAnswer: 2, explanation: '10×log₁₀(10) = 10dB' },
            { id: 'q3', question: '6dB voltage gain means:', options: ['2× voltage', '4× voltage', '6× voltage', '10× voltage'], correctAnswer: 0, explanation: '6dB = 20×log(2), so 2× voltage.' }
          ]}
        },
        {
          id: 'passive-components',
          title: 'Capacitors, Resistors, Inductors',
          duration: '30 min', xp: 175,
          description: 'The three fundamental passive components',
          introduction: 'Resistors, capacitors, and inductors are the building blocks of all electronic circuits. Each stores or dissipates energy differently.',
          sections: [
            { title: 'Resistors', content: "**Function:** Oppose current flow, dissipate power as heat\n\n**Color Code:**\n- Band 1,2: Digits\n- Band 3: Multiplier\n- Band 4: Tolerance\n\n**Types:**\n- Carbon film: General purpose\n- Metal film: Precision\n- Wirewound: High power\n- SMD: Surface mount\n\n**Power Rating:** 1/8W, 1/4W, 1/2W, 1W..." },
            { title: 'Capacitors', content: "**Function:** Store energy in electric field\n\n**Q = CV** (Charge = Capacitance × Voltage)\n\n**Capacitor Behavior:**\n- Blocks DC, passes AC\n- Opposes voltage changes\n- Xc = 1/(2πfC)\n\n**Types:**\n- Ceramic: High frequency\n- Electrolytic: High capacitance (polarized!)\n- Film: Precision\n- Tantalum: Compact" },
            { title: 'Inductors', content: "**Function:** Store energy in magnetic field\n\n**V = L(di/dt)**\n\n**Inductor Behavior:**\n- Passes DC, blocks AC\n- Opposes current changes\n- XL = 2πfL\n\n**Types:**\n- Air core: RF applications\n- Iron core: Power supplies\n- Ferrite: High frequency\n\n**Applications:**\nFilters, transformers, motors" }
          ],
          keyTakeaways: ['Resistors dissipate energy as heat', 'Capacitors store energy in electric fields', 'Inductors store energy in magnetic fields', 'Reactance depends on frequency'],
          quiz: { questions: [
            { id: 'q1', question: 'Capacitor blocks:', options: ['AC', 'DC', 'Both', 'Neither'], correctAnswer: 1, explanation: 'Capacitors block DC and pass AC.' },
            { id: 'q2', question: 'Inductor reactance formula:', options: ['XL=2πfL', 'XL=1/2πfL', 'XL=fL', 'XL=L/f'], correctAnswer: 0, explanation: 'Inductive reactance XL = 2πfL' },
            { id: 'q3', question: 'Electrolytic capacitors are:', options: ['Non-polarized', 'Polarized', 'Variable', 'Ceramic'], correctAnswer: 1, explanation: 'Electrolytic capacitors are polarized - connect correctly or they can explode!' }
          ]}
        }
      ]
    }
  ]
};

export default section0Foundations;
