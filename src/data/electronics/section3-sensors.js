// Section 3: Sensors & Actuators - 6 Lessons (2 units × 3 lessons)

export const section3Sensors = {
  id: 'sensors',
  title: 'Section 3: Sensors & Actuators',
  description: 'Interfacing with the physical world',
  icon: '📡',
  color: 'from-purple-500 to-pink-500',
  units: [
    {
      id: 'sensors',
      title: 'Sensors',
      description: 'Measuring the physical world',
      lessons: [
        {
          id: 'sensor-types',
          title: 'Sensor Types & Selection',
          duration: '25 min', xp: 150,
          description: 'Overview of common sensors',
          introduction: 'Sensors convert physical quantities into electrical signals. Choosing the right sensor is crucial for any project.',
          sections: [
            { title: 'Temperature Sensors', content: "**Thermistor:**\n- Resistance changes with temp\n- NTC (negative coefficient)\n- Cheap, non-linear\n\n**LM35/TMP36:**\n- Linear voltage output\n- 10mV/°C\n- Easy to use\n\n**DS18B20:**\n- Digital output (1-Wire)\n- ±0.5°C accuracy\n- Multiple on one wire" },
            { title: 'Motion Sensors', content: "**Accelerometer:**\n- Measures acceleration/tilt\n- MEMS technology\n- MPU6050 (accel + gyro)\n\n**Gyroscope:**\n- Measures rotation rate\n- Drift over time\n\n**IMU:**\n- Inertial Measurement Unit\n- Accel + Gyro + Magnetometer\n- Sensor fusion for orientation" },
            { title: 'Environmental Sensors', content: "**Light Sensors:**\n- LDR (photoresistor)\n- Photodiode/phototransistor\n- BH1750 (digital lux)\n\n**Distance:**\n- Ultrasonic (HC-SR04)\n- IR proximity\n- LIDAR (laser)\n\n**Humidity:**\n- DHT11/DHT22\n- BME280 (temp+humidity+pressure)" }
          ],
          keyTakeaways: ['Choose sensor based on accuracy needs', 'Digital sensors simplify interfacing', 'IMUs combine multiple sensors', 'Consider cost, accuracy, and interface'],
          quiz: { questions: [
            { id: 'q1', question: 'DS18B20 interface:', options: ['Analog', 'I2C', '1-Wire', 'SPI'], correctAnswer: 2, explanation: 'DS18B20 uses 1-Wire protocol.' },
            { id: 'q2', question: 'IMU typically includes:', options: ['Only accelerometer', 'Accel + Gyro', 'Only gyro', 'Temperature only'], correctAnswer: 1, explanation: 'IMU = Accelerometer + Gyroscope (often + Magnetometer).' },
            { id: 'q3', question: 'HC-SR04 measures:', options: ['Temperature', 'Light', 'Distance', 'Humidity'], correctAnswer: 2, explanation: 'HC-SR04 is an ultrasonic distance sensor.' }
          ]}
        },
        {
          id: 'sensor-interfacing',
          title: 'Sensor Interfacing',
          duration: '30 min', xp: 175,
          description: 'Connecting and reading sensors',
          introduction: 'Proper sensor interfacing ensures accurate readings. Learn signal conditioning and noise reduction.',
          sections: [
            { title: 'Analog Sensors', content: "**Signal Conditioning:**\n- Amplification (op-amp)\n- Filtering (RC low-pass)\n- Level shifting\n\n**Example: Thermistor**\n```\nint raw = analogRead(A0);\nfloat voltage = raw * 5.0 / 1023;\nfloat temp = (voltage - 0.5) * 100;\n```" },
            { title: 'Digital Sensors', content: "**I2C Sensor Example:**\n```\nWire.beginTransmission(0x68);\nWire.write(0x3B); // Register\nWire.endTransmission();\nWire.requestFrom(0x68, 6);\nint16_t ax = Wire.read()<<8 | Wire.read();\n```\n\n**Libraries:**\nMost sensors have Arduino libraries\nSimplifies complex protocols" },
            { title: 'Calibration', content: "**Why Calibrate:**\n- Sensor variations\n- Environmental factors\n- Aging effects\n\n**Methods:**\n- Two-point calibration\n- Multi-point curve fitting\n- Factory calibration data\n\n**Example:**\n```\nfloat calibrated = raw * scale + offset;\n```" }
          ],
          keyTakeaways: ['Condition analog signals before ADC', 'Use libraries for complex sensors', 'Calibration improves accuracy', 'Filter noise for stable readings'],
          quiz: { questions: [
            { id: 'q1', question: 'RC filter removes:', options: ['DC', 'High frequency noise', 'Low frequency', 'All signals'], correctAnswer: 1, explanation: 'RC low-pass filter removes high frequency noise.' },
            { id: 'q2', question: 'Two-point calibration uses:', options: ['One reference', 'Two references', 'No references', 'Ten references'], correctAnswer: 1, explanation: 'Two-point calibration uses two known reference points.' },
            { id: 'q3', question: 'I2C sensor address is:', options: ['4-bit', '7-bit', '16-bit', '32-bit'], correctAnswer: 1, explanation: 'I2C uses 7-bit addresses (0-127).' }
          ]}
        },
        {
          id: 'sensor-fusion',
          title: 'Sensor Fusion & Filtering',
          duration: '25 min', xp: 150,
          description: 'Combining sensor data intelligently',
          introduction: 'Sensor fusion combines multiple sensors for better accuracy. Filters smooth noisy data.',
          sections: [
            { title: 'Complementary Filter', content: "**Combining Accel + Gyro:**\n```\nangle = 0.98*(angle + gyro*dt) + 0.02*accel_angle;\n```\n\n**Why It Works:**\n- Gyro: Good short-term, drifts\n- Accel: Noisy, no drift\n- Combine best of both" },
            { title: 'Kalman Filter', content: "**Optimal Estimation:**\n- Predicts next state\n- Updates with measurement\n- Minimizes error\n\n**Steps:**\n1. Predict state\n2. Predict uncertainty\n3. Compute Kalman gain\n4. Update estimate\n5. Update uncertainty" },
            { title: 'Moving Average', content: "**Simple Smoothing:**\n```\nreadings[index] = newValue;\nindex = (index + 1) % N;\nfloat avg = sum(readings) / N;\n```\n\n**Exponential Moving Average:**\n```\nfiltered = alpha*new + (1-alpha)*filtered;\n```\nalpha = 0.1 for heavy smoothing" }
          ],
          keyTakeaways: ['Complementary filter: simple and effective', 'Kalman filter: optimal but complex', 'Moving average smooths noise', 'Choose filter based on needs'],
          quiz: { questions: [
            { id: 'q1', question: 'Complementary filter combines:', options: ['Two accelerometers', 'Accel and gyro', 'Two gyros', 'GPS and IMU'], correctAnswer: 1, explanation: 'Complementary filter typically combines accelerometer and gyroscope.' },
            { id: 'q2', question: 'Kalman filter is:', options: ['Simple average', 'Optimal estimator', 'High-pass filter', 'Amplifier'], correctAnswer: 1, explanation: 'Kalman filter is an optimal state estimator.' },
            { id: 'q3', question: 'EMA alpha=0.1 means:', options: ['Light smoothing', 'Heavy smoothing', 'No smoothing', 'Maximum smoothing'], correctAnswer: 1, explanation: 'Low alpha = heavy smoothing (slow response).' }
          ]}
        }
      ]
    },
    {
      id: 'actuators',
      title: 'Actuators',
      description: 'Making things move',
      lessons: [
        {
          id: 'motors',
          title: 'Motors & Motor Control',
          duration: '30 min', xp: 175,
          description: 'DC, stepper, and servo motors',
          introduction: 'Motors convert electrical energy to mechanical motion. Different types suit different applications.',
          sections: [
            { title: 'DC Motors', content: "**Characteristics:**\n- Simple, cheap\n- Speed varies with voltage\n- Direction with polarity\n\n**Control:**\n- PWM for speed\n- H-bridge for direction\n- L298N, TB6612 drivers\n\n**Back-EMF:**\nMotor generates voltage when spinning\nUse flyback diodes!" },
            { title: 'Stepper Motors', content: "**Characteristics:**\n- Precise positioning\n- Steps (1.8° = 200 steps/rev)\n- Holding torque\n\n**Types:**\n- Unipolar (5-6 wires)\n- Bipolar (4 wires)\n\n**Drivers:**\n- A4988, DRV8825\n- Microstepping for smoothness" },
            { title: 'Servo Motors', content: "**RC Servos:**\n- Position control built-in\n- PWM signal (1-2ms pulse)\n- 0-180° typical range\n\n**Arduino:**\n```\n#include <Servo.h>\nServo myservo;\nmyservo.attach(9);\nmyservo.write(90); // Center\n```" }
          ],
          keyTakeaways: ['DC motors: simple speed control', 'Steppers: precise positioning', 'Servos: built-in position control', 'Always use proper drivers'],
          quiz: { questions: [
            { id: 'q1', question: 'H-bridge controls:', options: ['Speed only', 'Direction only', 'Speed and direction', 'Neither'], correctAnswer: 2, explanation: 'H-bridge controls both speed (PWM) and direction.' },
            { id: 'q2', question: '1.8° stepper has:', options: ['100 steps/rev', '200 steps/rev', '400 steps/rev', '50 steps/rev'], correctAnswer: 1, explanation: '360°/1.8° = 200 steps per revolution.' },
            { id: 'q3', question: 'Servo PWM pulse width:', options: ['0-5ms', '1-2ms', '10-20ms', '100-200ms'], correctAnswer: 1, explanation: 'Servo position controlled by 1-2ms pulse width.' }
          ]}
        },
        {
          id: 'displays',
          title: 'Displays & Indicators',
          duration: '25 min', xp: 150,
          description: 'LEDs, LCDs, and OLEDs',
          introduction: 'Displays provide visual feedback. From simple LEDs to full graphics displays.',
          sections: [
            { title: 'LEDs', content: "**Single LED:**\n- Forward voltage: 1.8-3.3V\n- Current: 10-20mA\n- Series resistor required\n\n**RGB LED:**\n- Common cathode/anode\n- PWM for color mixing\n\n**LED Strips:**\n- WS2812B (addressable)\n- 5V, data pin\n- FastLED library" },
            { title: 'Character LCDs', content: "**HD44780 (16x2):**\n- 4-bit or 8-bit mode\n- I2C backpack simplifies wiring\n\n**Arduino:**\n```\n#include <LiquidCrystal_I2C.h>\nLiquidCrystal_I2C lcd(0x27, 16, 2);\nlcd.begin();\nlcd.print(\"Hello!\");\n```" },
            { title: 'OLED Displays', content: "**SSD1306 (128x64):**\n- I2C or SPI\n- Graphics capable\n- Low power\n\n**Libraries:**\n- Adafruit_SSD1306\n- U8g2 (universal)\n\n**Features:**\n- Text, shapes, images\n- Fast refresh\n- High contrast" }
          ],
          keyTakeaways: ['LEDs need current limiting resistors', 'I2C simplifies LCD wiring', 'OLEDs offer graphics capability', 'WS2812B for addressable LED strips'],
          quiz: { questions: [
            { id: 'q1', question: 'LED current limiting resistor:', options: ['Optional', 'Required', 'Never used', 'Only for RGB'], correctAnswer: 1, explanation: 'LEDs always need current limiting resistors.' },
            { id: 'q2', question: 'WS2812B LEDs are:', options: ['Analog', 'Addressable', 'AC powered', 'Non-programmable'], correctAnswer: 1, explanation: 'WS2812B are individually addressable RGB LEDs.' },
            { id: 'q3', question: 'SSD1306 is:', options: ['LCD', 'OLED', 'LED', 'E-ink'], correctAnswer: 1, explanation: 'SSD1306 is a common OLED display controller.' }
          ]}
        },
        {
          id: 'relays-solenoids',
          title: 'Relays & Solenoids',
          duration: '25 min', xp: 150,
          description: 'Switching high power loads',
          introduction: 'Relays and solenoids let low-power circuits control high-power devices safely.',
          sections: [
            { title: 'Relays', content: "**Electromechanical:**\n- Coil activates switch\n- Isolation between circuits\n- NO/NC contacts\n\n**Solid State Relay (SSR):**\n- No moving parts\n- Faster switching\n- No contact bounce\n\n**Ratings:**\n- Coil voltage (5V, 12V)\n- Contact rating (10A 250VAC)" },
            { title: 'Driving Relays', content: "**Transistor Driver:**\n```\n// NPN transistor\n// Base -> MCU pin via 1k resistor\n// Collector -> Relay coil\n// Emitter -> GND\n```\n\n**Flyback Diode:**\nESSENTIAL! Protects from coil spike\nReverse biased across coil" },
            { title: 'Solenoids', content: "**Linear Motion:**\n- Push or pull action\n- Door locks, valves\n- High current draw\n\n**Control:**\n- Same as relay (transistor + flyback)\n- PWM for holding (reduce heat)\n\n**Types:**\n- Push solenoid\n- Pull solenoid\n- Rotary solenoid" }
          ],
          keyTakeaways: ['Relays isolate high/low voltage', 'Always use flyback diodes', 'SSRs for fast/frequent switching', 'Solenoids for linear motion'],
          quiz: { questions: [
            { id: 'q1', question: 'Flyback diode protects from:', options: ['Overcurrent', 'Voltage spike', 'Short circuit', 'Overheating'], correctAnswer: 1, explanation: 'Flyback diode absorbs voltage spike when coil turns off.' },
            { id: 'q2', question: 'SSR advantage:', options: ['Cheaper', 'No moving parts', 'Higher current', 'Lower voltage'], correctAnswer: 1, explanation: 'Solid State Relays have no moving parts - faster and longer life.' },
            { id: 'q3', question: 'Relay provides:', options: ['Amplification', 'Isolation', 'Filtering', 'Rectification'], correctAnswer: 1, explanation: 'Relays provide electrical isolation between control and load circuits.' }
          ]}
        }
      ]
    }
  ]
};

export default section3Sensors;
