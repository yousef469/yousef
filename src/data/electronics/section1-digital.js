// Section 1: Digital Electronics & Logic - 6 Lessons (2 units × 3 lessons)

export const section1Digital = {
  id: 'digital',
  title: 'Section 1: Digital Electronics',
  description: 'Logic gates, binary systems, and digital circuits',
  icon: '🔢',
  color: 'from-blue-500 to-indigo-500',
  units: [
    {
      id: 'logic-gates',
      title: 'Logic Gates & Boolean Algebra',
      description: 'Fundamental digital building blocks',
      lessons: [
        {
          id: 'binary-logic',
          title: 'Binary Numbers & Logic Levels',
          duration: '25 min', xp: 150,
          description: 'The foundation of digital systems',
          introduction: 'Digital electronics uses binary (0 and 1) to represent information. Understanding binary is essential for all digital design.',
          sections: [
            { title: 'Binary Number System', content: "**Base 2 System:**\nOnly digits 0 and 1\n\n**Place Values:**\n...8, 4, 2, 1 (powers of 2)\n\n**Conversion:**\n1011₂ = 8+0+2+1 = 11₁₀\n\n**Hexadecimal:**\nBase 16 (0-9, A-F)\n0xFF = 255₁₀ = 11111111₂" },
            { title: 'Logic Levels', content: "**TTL Logic:**\n- LOW: 0-0.8V\n- HIGH: 2-5V\n- Undefined: 0.8-2V\n\n**CMOS Logic:**\n- LOW: 0-1/3 Vcc\n- HIGH: 2/3 Vcc - Vcc\n\n**3.3V vs 5V:**\nModern systems use 3.3V or lower\nLevel shifters needed between systems" },
            { title: 'Digital vs Analog', content: "**Analog:**\n- Continuous values\n- Infinite resolution\n- Noise sensitive\n\n**Digital:**\n- Discrete values (0 or 1)\n- Noise immune\n- Easy to process/store\n\n**ADC/DAC:**\n- ADC: Analog to Digital\n- DAC: Digital to Analog\n- Resolution in bits (8, 10, 12...)" }
          ],
          keyTakeaways: ['Binary uses only 0 and 1', 'Logic levels define voltage thresholds', 'Digital is noise-immune', 'ADC/DAC convert between domains'],
          quiz: { questions: [
            { id: 'q1', question: '1010₂ in decimal:', options: ['8', '10', '12', '5'], correctAnswer: 1, explanation: '1010 = 8+0+2+0 = 10' },
            { id: 'q2', question: 'TTL HIGH voltage:', options: ['0-0.8V', '2-5V', '0-5V', '1-2V'], correctAnswer: 1, explanation: 'TTL HIGH is 2V to 5V.' },
            { id: 'q3', question: '0xFF in decimal:', options: ['15', '16', '255', '256'], correctAnswer: 2, explanation: '0xFF = 15×16 + 15 = 255' }
          ]}
        },
        {
          id: 'basic-gates',
          title: 'Basic Logic Gates',
          duration: '30 min', xp: 175,
          description: 'AND, OR, NOT, NAND, NOR, XOR',
          introduction: 'Logic gates are the building blocks of all digital circuits. Each gate performs a specific Boolean operation.',
          sections: [
            { title: 'Basic Gates', content: "**AND Gate:**\nOutput HIGH only if ALL inputs HIGH\nY = A · B\n\n**OR Gate:**\nOutput HIGH if ANY input HIGH\nY = A + B\n\n**NOT Gate (Inverter):**\nOutput is opposite of input\nY = Ā" },
            { title: 'Universal Gates', content: "**NAND Gate:**\nAND followed by NOT\nY = (A · B)̄\nCan make ANY other gate!\n\n**NOR Gate:**\nOR followed by NOT\nY = (A + B)̄\nAlso universal\n\n**Why Universal?**\nNAND/NOR can implement any logic function" },
            { title: 'XOR & XNOR', content: "**XOR (Exclusive OR):**\nOutput HIGH if inputs DIFFERENT\nY = A ⊕ B\n\n**XNOR:**\nOutput HIGH if inputs SAME\nY = (A ⊕ B)̄\n\n**Applications:**\n- Parity checking\n- Comparators\n- Adders" }
          ],
          keyTakeaways: ['AND: all inputs must be HIGH', 'OR: any input HIGH gives HIGH output', 'NAND/NOR are universal gates', 'XOR detects differences'],
          quiz: { questions: [
            { id: 'q1', question: 'AND gate: 1 AND 0 =', options: ['0', '1', 'Undefined', '2'], correctAnswer: 0, explanation: 'AND requires ALL inputs HIGH. 1 AND 0 = 0' },
            { id: 'q2', question: 'Universal gates are:', options: ['AND, OR', 'NAND, NOR', 'XOR, XNOR', 'NOT only'], correctAnswer: 1, explanation: 'NAND and NOR can implement any logic function.' },
            { id: 'q3', question: 'XOR: 1 XOR 1 =', options: ['0', '1', '2', 'Undefined'], correctAnswer: 0, explanation: 'XOR outputs HIGH only when inputs are different. 1 XOR 1 = 0' }
          ]}
        },
        {
          id: 'boolean-algebra',
          title: 'Boolean Algebra & Simplification',
          duration: '25 min', xp: 150,
          description: 'Simplifying logic expressions',
          introduction: 'Boolean algebra lets us simplify complex logic expressions, reducing the number of gates needed.',
          sections: [
            { title: 'Boolean Laws', content: "**Identity:**\nA + 0 = A, A · 1 = A\n\n**Null:**\nA + 1 = 1, A · 0 = 0\n\n**Complement:**\nA + Ā = 1, A · Ā = 0\n\n**Idempotent:**\nA + A = A, A · A = A\n\n**Double Negation:**\n(Ā)̄ = A" },
            { title: "De Morgan's Theorems", content: "**Theorem 1:**\n(A · B)̄ = Ā + B̄\nNAND = OR of NOTs\n\n**Theorem 2:**\n(A + B)̄ = Ā · B̄\nNOR = AND of NOTs\n\n**Application:**\nConvert between gate types\nSimplify expressions" },
            { title: 'Karnaugh Maps', content: "**K-Map Method:**\n1. Create truth table\n2. Fill K-map grid\n3. Group adjacent 1s (powers of 2)\n4. Write simplified expression\n\n**Grouping Rules:**\n- Groups of 1, 2, 4, 8...\n- Wrap around edges\n- Larger groups = simpler terms" }
          ],
          keyTakeaways: ['Boolean laws simplify expressions', "De Morgan's converts between AND/OR", 'K-maps find minimal expressions', 'Simplification reduces gate count'],
          quiz: { questions: [
            { id: 'q1', question: 'A + 1 =', options: ['A', '0', '1', 'Ā'], correctAnswer: 2, explanation: 'Null law: A + 1 = 1' },
            { id: 'q2', question: "(A·B)̄ equals:", options: ['A·B', 'Ā·B̄', 'Ā+B̄', 'A+B'], correctAnswer: 2, explanation: "De Morgan's: (A·B)̄ = Ā+B̄" },
            { id: 'q3', question: 'K-map groups must be:', options: ['Any size', 'Powers of 2', 'Odd numbers', 'Prime numbers'], correctAnswer: 1, explanation: 'K-map groups must be powers of 2 (1, 2, 4, 8...)' }
          ]}
        }
      ]
    },
    {
      id: 'digital-circuits',
      title: 'Digital Circuit Design',
      description: 'Combinational and sequential circuits',
      lessons: [
        {
          id: 'combinational',
          title: 'Combinational Circuits',
          duration: '25 min', xp: 150,
          description: 'Multiplexers, decoders, and adders',
          introduction: 'Combinational circuits produce outputs based only on current inputs. No memory or feedback.',
          sections: [
            { title: 'Multiplexers', content: "**MUX Function:**\nSelect one of many inputs\n\n**2:1 MUX:**\nY = S̄·A + S·B\n\n**4:1 MUX:**\n2 select lines, 4 inputs\n\n**Applications:**\n- Data routing\n- Function generation\n- Bus switching" },
            { title: 'Decoders & Encoders', content: "**Decoder:**\nn inputs → 2ⁿ outputs\nOnly one output active\n\n**3-to-8 Decoder:**\n3 inputs select 1 of 8 outputs\n\n**Encoder:**\n2ⁿ inputs → n outputs\nOpposite of decoder\n\n**Priority Encoder:**\nHandles multiple active inputs" },
            { title: 'Adders', content: "**Half Adder:**\nSum = A ⊕ B\nCarry = A · B\n\n**Full Adder:**\nSum = A ⊕ B ⊕ Cin\nCout = AB + Cin(A⊕B)\n\n**Ripple Carry Adder:**\nChain full adders\nCarry propagates through" }
          ],
          keyTakeaways: ['MUX selects one of many inputs', 'Decoder activates one output', 'Half adder: 2 inputs, no carry in', 'Full adder handles carry'],
          quiz: { questions: [
            { id: 'q1', question: '3-to-8 decoder has:', options: ['3 outputs', '8 outputs', '11 outputs', '24 outputs'], correctAnswer: 1, explanation: '3 inputs select 1 of 8 (2³) outputs.' },
            { id: 'q2', question: 'Half adder carry output:', options: ['A+B', 'A⊕B', 'A·B', 'A-B'], correctAnswer: 2, explanation: 'Carry = A AND B' },
            { id: 'q3', question: 'MUX with 4 inputs needs:', options: ['1 select line', '2 select lines', '4 select lines', '8 select lines'], correctAnswer: 1, explanation: '2 select lines choose 1 of 4 (2²) inputs.' }
          ]}
        },
        {
          id: 'sequential',
          title: 'Sequential Circuits',
          duration: '30 min', xp: 175,
          description: 'Flip-flops, registers, and counters',
          introduction: 'Sequential circuits have memory - outputs depend on current inputs AND previous state.',
          sections: [
            { title: 'Flip-Flops', content: "**SR Flip-Flop:**\nSet/Reset latch\nS=1: Q=1, R=1: Q=0\n\n**D Flip-Flop:**\nData flip-flop\nQ follows D on clock edge\n\n**JK Flip-Flop:**\nJ=K=1 toggles output\nNo invalid state\n\n**T Flip-Flop:**\nToggle on T=1" },
            { title: 'Registers', content: "**Parallel Register:**\nAll bits load simultaneously\n\n**Shift Register:**\nBits shift on each clock\n- SISO: Serial In, Serial Out\n- SIPO: Serial In, Parallel Out\n- PISO: Parallel In, Serial Out\n- PIPO: Parallel In, Parallel Out" },
            { title: 'Counters', content: "**Asynchronous (Ripple):**\nEach FF clocked by previous\nSimple but slow\n\n**Synchronous:**\nAll FFs share clock\nFaster, more complex\n\n**Types:**\n- Binary up/down\n- BCD (0-9)\n- Ring counter\n- Johnson counter" }
          ],
          keyTakeaways: ['Flip-flops store 1 bit', 'D flip-flop is most common', 'Registers store multiple bits', 'Synchronous counters are faster'],
          quiz: { questions: [
            { id: 'q1', question: 'D flip-flop output:', options: ['Toggles', 'Follows D on clock', 'Always 1', 'Always 0'], correctAnswer: 1, explanation: 'D flip-flop: Q follows D input on clock edge.' },
            { id: 'q2', question: 'SIPO register:', options: ['Serial in, serial out', 'Serial in, parallel out', 'Parallel in, serial out', 'Parallel in, parallel out'], correctAnswer: 1, explanation: 'SIPO = Serial In, Parallel Out' },
            { id: 'q3', question: 'Synchronous counter advantage:', options: ['Simpler', 'Faster', 'Cheaper', 'Smaller'], correctAnswer: 1, explanation: 'Synchronous counters are faster - no ripple delay.' }
          ]}
        },
        {
          id: 'timing-analysis',
          title: 'Timing & State Machines',
          duration: '25 min', xp: 150,
          description: 'Setup time, hold time, and FSMs',
          introduction: 'Digital circuits must meet timing requirements. State machines organize sequential behavior.',
          sections: [
            { title: 'Timing Parameters', content: "**Setup Time (tsu):**\nData must be stable BEFORE clock\n\n**Hold Time (th):**\nData must be stable AFTER clock\n\n**Propagation Delay (tpd):**\nTime for output to change\n\n**Clock-to-Q (tcq):**\nDelay from clock to output change" },
            { title: 'Timing Violations', content: "**Setup Violation:**\nData changes too close to clock\nOutput may be wrong\n\n**Hold Violation:**\nData changes too soon after clock\nMetastability possible\n\n**Solutions:**\n- Slow down clock\n- Add pipeline stages\n- Use faster logic" },
            { title: 'Finite State Machines', content: "**FSM Components:**\n- States (circles)\n- Transitions (arrows)\n- Inputs/Outputs\n\n**Types:**\n- Mealy: Output depends on state + input\n- Moore: Output depends only on state\n\n**Design Steps:**\n1. State diagram\n2. State table\n3. State encoding\n4. Logic equations" }
          ],
          keyTakeaways: ['Setup time: data stable before clock', 'Hold time: data stable after clock', 'FSMs organize sequential behavior', 'Moore outputs depend only on state'],
          quiz: { questions: [
            { id: 'q1', question: 'Setup time requires data stable:', options: ['Before clock', 'After clock', 'During clock', 'Anytime'], correctAnswer: 0, explanation: 'Setup time: data must be stable BEFORE clock edge.' },
            { id: 'q2', question: 'Moore machine output depends on:', options: ['Input only', 'State only', 'State and input', 'Clock only'], correctAnswer: 1, explanation: 'Moore: output depends only on current state.' },
            { id: 'q3', question: 'Metastability occurs from:', options: ['Setup violation', 'Hold violation', 'Both', 'Neither'], correctAnswer: 2, explanation: 'Both setup and hold violations can cause metastability.' }
          ]}
        }
      ]
    }
  ]
};

export default section1Digital;
