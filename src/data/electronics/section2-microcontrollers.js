// Section 2: Microcontrollers & Programming - 6 Lessons (2 units × 3 lessons)

export const section2Microcontrollers = {
  id: 'microcontrollers',
  title: 'Section 2: Microcontrollers',
  description: 'Arduino, embedded C, and real-time programming',
  icon: '🎛️',
  color: 'from-green-500 to-teal-500',
  units: [
    {
      id: 'mcu-basics',
      title: 'Microcontroller Fundamentals',
      description: 'Architecture and basic programming',
      lessons: [
        {
          id: 'mcu-architecture',
          title: 'MCU Architecture',
          duration: '25 min', xp: 150,
          description: 'CPU, memory, and peripherals',
          introduction: 'Microcontrollers are complete computers on a chip. Understanding their architecture is key to embedded programming.',
          sections: [
            { title: 'MCU Components', content: "**CPU Core:**\n- ALU (Arithmetic Logic Unit)\n- Registers\n- Program counter\n\n**Memory:**\n- Flash (program storage)\n- SRAM (variables)\n- EEPROM (persistent data)\n\n**Peripherals:**\n- GPIO, Timers, ADC\n- UART, SPI, I2C\n- PWM, Interrupts" },
            { title: 'Popular MCUs', content: "**Arduino (ATmega328):**\n- 8-bit AVR\n- 16 MHz, 32KB Flash\n- Great for learning\n\n**ESP32:**\n- 32-bit dual core\n- WiFi + Bluetooth\n- 240 MHz, 4MB Flash\n\n**STM32:**\n- ARM Cortex-M\n- Professional grade\n- Wide range of options" },
            { title: 'Development Tools', content: "**IDE Options:**\n- Arduino IDE (beginner)\n- PlatformIO (professional)\n- Vendor IDEs (STM32CubeIDE)\n\n**Programming:**\n- USB bootloader\n- JTAG/SWD debugger\n- ISP programmer\n\n**Debugging:**\n- Serial print\n- Logic analyzer\n- Oscilloscope" }
          ],
          keyTakeaways: ['MCUs have CPU, memory, and peripherals', 'Flash stores program, SRAM stores variables', 'Arduino is great for learning', 'ESP32 adds WiFi/Bluetooth'],
          quiz: { questions: [
            { id: 'q1', question: 'Program code stored in:', options: ['SRAM', 'Flash', 'EEPROM', 'Registers'], correctAnswer: 1, explanation: 'Flash memory stores the program code.' },
            { id: 'q2', question: 'Arduino ATmega328 is:', options: ['8-bit', '16-bit', '32-bit', '64-bit'], correctAnswer: 0, explanation: 'ATmega328 is an 8-bit AVR microcontroller.' },
            { id: 'q3', question: 'ESP32 includes:', options: ['Only WiFi', 'Only Bluetooth', 'WiFi + Bluetooth', 'Neither'], correctAnswer: 2, explanation: 'ESP32 has both WiFi and Bluetooth built-in.' }
          ]}
        },
        {
          id: 'gpio-basics',
          title: 'GPIO & Digital I/O',
          duration: '25 min', xp: 150,
          description: 'Reading buttons, driving LEDs',
          introduction: 'GPIO (General Purpose Input/Output) pins are how microcontrollers interact with the physical world.',
          sections: [
            { title: 'Digital Output', content: "**LED Example:**\n```\npinMode(13, OUTPUT);\ndigitalWrite(13, HIGH); // LED on\ndigitalWrite(13, LOW);  // LED off\n```\n\n**Current Limits:**\n- Arduino: 20mA per pin\n- Use transistor for higher loads\n\n**Active High vs Low:**\n- Active HIGH: HIGH = ON\n- Active LOW: LOW = ON" },
            { title: 'Digital Input', content: "**Button Reading:**\n```\npinMode(2, INPUT_PULLUP);\nint state = digitalRead(2);\n```\n\n**Pull-up/Pull-down:**\n- Prevent floating inputs\n- Internal or external resistors\n\n**Debouncing:**\n- Mechanical switches bounce\n- Software delay or hardware filter" },
            { title: 'Pin Configurations', content: "**Input Modes:**\n- INPUT: High impedance\n- INPUT_PULLUP: Internal pull-up\n\n**Output Modes:**\n- OUTPUT: Push-pull\n- Open-drain: Needs external pull-up\n\n**Tri-state:**\nHigh impedance when disabled\nUsed for bus sharing" }
          ],
          keyTakeaways: ['pinMode sets pin direction', 'Use pull-ups to prevent floating', 'Debounce mechanical switches', 'Respect current limits'],
          quiz: { questions: [
            { id: 'q1', question: 'Arduino max current per pin:', options: ['5mA', '20mA', '100mA', '500mA'], correctAnswer: 1, explanation: 'Arduino pins can source/sink about 20mA max.' },
            { id: 'q2', question: 'INPUT_PULLUP enables:', options: ['External resistor', 'Internal pull-up', 'Internal pull-down', 'No resistor'], correctAnswer: 1, explanation: 'INPUT_PULLUP enables the internal pull-up resistor.' },
            { id: 'q3', question: 'Debouncing prevents:', options: ['Noise', 'Multiple triggers from bounce', 'Short circuits', 'Overheating'], correctAnswer: 1, explanation: 'Debouncing prevents multiple triggers from switch bounce.' }
          ]}
        },
        {
          id: 'analog-io',
          title: 'Analog I/O & PWM',
          duration: '30 min', xp: 175,
          description: 'ADC, DAC, and pulse width modulation',
          introduction: 'Analog signals require special handling. ADC reads analog inputs, PWM simulates analog outputs.',
          sections: [
            { title: 'Analog Input (ADC)', content: "**Reading Sensors:**\n```\nint value = analogRead(A0);\n// Returns 0-1023 (10-bit)\n```\n\n**Resolution:**\n- 10-bit: 0-1023 (Arduino)\n- 12-bit: 0-4095 (ESP32)\n\n**Voltage Calculation:**\nvoltage = value × (Vref / 1023)" },
            { title: 'PWM Output', content: "**Simulating Analog:**\n```\nanalogWrite(9, 127); // 50% duty\n// Range: 0-255\n```\n\n**Duty Cycle:**\n- 0 = always LOW\n- 127 = 50% HIGH\n- 255 = always HIGH\n\n**Applications:**\n- LED dimming\n- Motor speed control\n- Servo control" },
            { title: 'Signal Conditioning', content: "**Voltage Divider:**\nScale high voltages to ADC range\nVout = Vin × R2/(R1+R2)\n\n**Filtering:**\n- RC low-pass filter\n- Software averaging\n\n**Protection:**\n- Clamp diodes\n- Series resistor\n- Optoisolation" }
          ],
          keyTakeaways: ['ADC converts analog to digital', 'PWM simulates analog output', 'Use voltage dividers to scale inputs', 'Filter noisy signals'],
          quiz: { questions: [
            { id: 'q1', question: '10-bit ADC range:', options: ['0-255', '0-511', '0-1023', '0-4095'], correctAnswer: 2, explanation: '10-bit = 2¹⁰ = 1024 values (0-1023)' },
            { id: 'q2', question: 'analogWrite(pin, 127) gives:', options: ['25% duty', '50% duty', '75% duty', '100% duty'], correctAnswer: 1, explanation: '127/255 ≈ 50% duty cycle' },
            { id: 'q3', question: 'Voltage divider scales:', options: ['Current', 'Voltage', 'Resistance', 'Power'], correctAnswer: 1, explanation: 'Voltage dividers scale voltage down.' }
          ]}
        }
      ]
    },
    {
      id: 'embedded-programming',
      title: 'Embedded Programming',
      description: 'Interrupts, timers, and real-time concepts',
      lessons: [
        {
          id: 'interrupts',
          title: 'Interrupts & Event Handling',
          duration: '25 min', xp: 150,
          description: 'Responding to events efficiently',
          introduction: 'Interrupts allow immediate response to events without constant polling. Essential for real-time systems.',
          sections: [
            { title: 'Interrupt Basics', content: "**What Happens:**\n1. Event triggers interrupt\n2. CPU saves state\n3. ISR (handler) executes\n4. CPU restores state\n5. Normal code resumes\n\n**Arduino Example:**\n```\nattachInterrupt(0, myISR, RISING);\n\nvoid myISR() {\n  // Keep it short!\n}\n```" },
            { title: 'Interrupt Types', content: "**External Interrupts:**\n- Pin change (RISING, FALLING)\n- Button press detection\n\n**Timer Interrupts:**\n- Periodic events\n- Precise timing\n\n**Peripheral Interrupts:**\n- UART receive\n- ADC complete\n- SPI transfer done" },
            { title: 'ISR Best Practices', content: "**Keep ISRs Short:**\n- Set flag, process in main loop\n- No delays or Serial prints\n\n**Volatile Variables:**\n```\nvolatile bool flag = false;\n```\nTells compiler variable can change\n\n**Critical Sections:**\nDisable interrupts briefly\nnoInterrupts(); / interrupts();" }
          ],
          keyTakeaways: ['Interrupts respond immediately to events', 'Keep ISRs short and fast', 'Use volatile for shared variables', 'Disable interrupts for critical sections'],
          quiz: { questions: [
            { id: 'q1', question: 'ISR should be:', options: ['Long and detailed', 'Short and fast', 'Contain delays', 'Print to Serial'], correctAnswer: 1, explanation: 'ISRs should be short and fast to not block other interrupts.' },
            { id: 'q2', question: 'volatile keyword tells compiler:', options: ['Variable is constant', 'Variable can change unexpectedly', 'Variable is global', 'Variable is local'], correctAnswer: 1, explanation: 'volatile indicates the variable can change outside normal program flow.' },
            { id: 'q3', question: 'RISING trigger fires on:', options: ['LOW to HIGH', 'HIGH to LOW', 'Any change', 'LOW level'], correctAnswer: 0, explanation: 'RISING triggers on LOW to HIGH transition.' }
          ]}
        },
        {
          id: 'timers',
          title: 'Timers & Scheduling',
          duration: '30 min', xp: 175,
          description: 'Precise timing and task scheduling',
          introduction: 'Hardware timers provide precise timing independent of main code. Essential for PWM, delays, and scheduling.',
          sections: [
            { title: 'Hardware Timers', content: "**Timer Components:**\n- Counter register\n- Prescaler (divides clock)\n- Compare registers\n- Overflow interrupt\n\n**Arduino Timers:**\n- Timer0: millis(), delay()\n- Timer1: 16-bit, Servo library\n- Timer2: 8-bit, tone()" },
            { title: 'Timer Modes', content: "**Normal Mode:**\nCount up, overflow at max\n\n**CTC Mode:**\nClear Timer on Compare match\nPrecise frequency generation\n\n**PWM Mode:**\nFast PWM or Phase Correct\nHardware-generated PWM" },
            { title: 'Task Scheduling', content: "**Simple Scheduler:**\n```\nif (millis() - lastTime >= interval) {\n  lastTime = millis();\n  doTask();\n}\n```\n\n**RTOS:**\n- FreeRTOS\n- Multiple tasks\n- Priority scheduling\n- Semaphores, queues" }
          ],
          keyTakeaways: ['Hardware timers run independently', 'Prescaler divides clock frequency', 'CTC mode for precise frequencies', 'RTOS for complex scheduling'],
          quiz: { questions: [
            { id: 'q1', question: 'millis() uses which timer:', options: ['Timer0', 'Timer1', 'Timer2', 'No timer'], correctAnswer: 0, explanation: 'Arduino millis() and delay() use Timer0.' },
            { id: 'q2', question: 'Prescaler function:', options: ['Multiply clock', 'Divide clock', 'Stop clock', 'Invert clock'], correctAnswer: 1, explanation: 'Prescaler divides the clock frequency.' },
            { id: 'q3', question: 'CTC mode clears timer on:', options: ['Overflow', 'Compare match', 'External signal', 'Never'], correctAnswer: 1, explanation: 'CTC = Clear Timer on Compare match.' }
          ]}
        },
        {
          id: 'communication',
          title: 'Serial Communication',
          duration: '25 min', xp: 150,
          description: 'UART, SPI, and I2C protocols',
          introduction: 'Serial protocols let microcontrollers communicate with sensors, displays, and other devices.',
          sections: [
            { title: 'UART', content: "**Universal Asynchronous:**\n- TX and RX lines\n- Baud rate (9600, 115200...)\n- Start/stop bits\n\n**Arduino:**\n```\nSerial.begin(9600);\nSerial.println(\"Hello\");\nint data = Serial.read();\n```" },
            { title: 'SPI', content: "**Synchronous, Fast:**\n- MOSI, MISO, SCK, SS\n- Master/slave architecture\n- Full duplex\n\n**Speed:** Up to 10+ MHz\n\n**Uses:**\n- SD cards\n- Displays\n- Fast sensors" },
            { title: 'I2C', content: "**Two-Wire Interface:**\n- SDA (data), SCL (clock)\n- Multiple devices, one bus\n- 7-bit addresses\n\n**Speed:** 100kHz, 400kHz\n\n**Arduino:**\n```\nWire.begin();\nWire.beginTransmission(0x68);\nWire.write(data);\nWire.endTransmission();\n```" }
          ],
          keyTakeaways: ['UART: simple, asynchronous', 'SPI: fast, 4 wires', 'I2C: multi-device, 2 wires', 'Choose based on speed and complexity'],
          quiz: { questions: [
            { id: 'q1', question: 'I2C uses how many wires:', options: ['1', '2', '4', '8'], correctAnswer: 1, explanation: 'I2C uses 2 wires: SDA and SCL.' },
            { id: 'q2', question: 'Fastest protocol:', options: ['UART', 'I2C', 'SPI', 'All same'], correctAnswer: 2, explanation: 'SPI is typically fastest (10+ MHz vs 400kHz I2C).' },
            { id: 'q3', question: 'UART is:', options: ['Synchronous', 'Asynchronous', 'Both', 'Neither'], correctAnswer: 1, explanation: 'UART is asynchronous - no shared clock.' }
          ]}
        }
      ]
    }
  ]
};

export default section2Microcontrollers;
