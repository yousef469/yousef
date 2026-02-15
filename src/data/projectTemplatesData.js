// Comprehensive Engineering Project Templates - 20 Projects

export const projectTemplates = [
  // ROBOTICS
  {
    id: 'robotic-arm',
    name: 'Robotic Arm Controller',
    category: 'Robotics',
    icon: '🤖',
    difficulty: 'Intermediate',
    duration: '4-6 hours',
    color: 'from-purple-500 to-pink-500',
    description: 'Build a 3-DOF robotic arm with servo control and inverse kinematics',
    skills: ['Arduino', 'Servo Motors', 'Kinematics', 'C++'],
    components: ['Arduino Uno', '3x Servo Motors', 'Potentiometers', 'Power Supply'],
    steps: ['Design arm structure', 'Wire servo motors', 'Implement forward kinematics', 'Add inverse kinematics', 'Create control interface'],
    codeSnippet: `#include <Servo.h>
Servo base, shoulder, elbow;
void setup() {
  base.attach(9);
  shoulder.attach(10);
  elbow.attach(11);
}`,
    resources: [{ name: 'Servo Library Docs', url: '#' }]
  },
  {
    id: 'line-follower',
    name: 'Line Following Robot',
    category: 'Robotics',
    icon: '🚗',
    difficulty: 'Beginner',
    duration: '2-3 hours',
    color: 'from-green-500 to-emerald-500',
    description: 'Create an autonomous robot that follows a black line using IR sensors',
    skills: ['Arduino', 'IR Sensors', 'Motor Control', 'PID'],
    components: ['Arduino Nano', '2x DC Motors', 'L298N Driver', '3x IR Sensors'],
    steps: ['Assemble chassis', 'Connect motors', 'Wire IR sensors', 'Implement line following', 'Add PID control'],
    codeSnippet: `int leftSensor = A0, rightSensor = A1;
void loop() {
  int left = analogRead(leftSensor);
  int right = analogRead(rightSensor);
  if (left < 500 && right < 500) forward();
  else if (left < 500) turnLeft();
  else if (right < 500) turnRight();
}`,
    resources: [{ name: 'PID Tutorial', url: '#' }]
  },
  {
    id: 'quadcopter',
    name: 'Mini Quadcopter Drone',
    category: 'Robotics',
    icon: '🚁',
    difficulty: 'Advanced',
    duration: '8-12 hours',
    color: 'from-orange-500 to-red-500',
    description: 'Build a small quadcopter with flight controller and stabilization',
    skills: ['Flight Dynamics', 'PID Control', 'IMU Sensors', 'ESC Programming'],
    components: ['Flight Controller', '4x Brushless Motors', '4x ESCs', 'LiPo Battery', 'Frame', 'Propellers'],
    steps: ['Assemble frame', 'Mount motors and ESCs', 'Install flight controller', 'Configure PID gains', 'Test and tune'],
    codeSnippet: `// PID stabilization loop
float rollPID = Kp * rollError + Ki * rollIntegral + Kd * rollDerivative;
motor1 = throttle + rollPID - pitchPID + yawPID;
motor2 = throttle - rollPID - pitchPID - yawPID;`,
    resources: [{ name: 'Flight Controller Setup', url: '#' }]
  },
  // ELECTRONICS
  {
    id: 'weather-station',
    name: 'IoT Weather Station',
    category: 'Electronics',
    icon: '🌡️',
    difficulty: 'Intermediate',
    duration: '3-4 hours',
    color: 'from-cyan-500 to-blue-500',
    description: 'Build a connected weather station with real-time data logging',
    skills: ['ESP32', 'Sensors', 'WiFi', 'Data Logging'],
    components: ['ESP32', 'DHT22', 'BMP280', 'Rain Sensor', 'OLED Display'],
    steps: ['Wire sensors to ESP32', 'Setup WiFi connection', 'Create data logging', 'Build dashboard', 'Add alerts'],
    codeSnippet: `#include <WiFi.h>
#include <DHT.h>
DHT dht(4, DHT22);
void loop() {
  float temp = dht.readTemperature();
  float humidity = dht.readHumidity();
  sendToCloud(temp, humidity);
}`,
    resources: [{ name: 'ESP32 WiFi Guide', url: '#' }]
  },
  {
    id: 'smart-home',
    name: 'Smart Home Controller',
    category: 'Electronics',
    icon: '🏠',
    difficulty: 'Intermediate',
    duration: '5-7 hours',
    color: 'from-yellow-500 to-orange-500',
    description: 'Create a home automation system with voice control and app interface',
    skills: ['ESP32', 'Relays', 'MQTT', 'Mobile App'],
    components: ['ESP32', '4-Channel Relay', 'Power Supply', 'Sensors'],
    steps: ['Setup relay module', 'Configure MQTT broker', 'Create mobile app', 'Add voice control', 'Implement schedules'],
    codeSnippet: `void callback(char* topic, byte* payload) {
  if (strcmp(topic, "home/light1") == 0) {
    digitalWrite(RELAY1, payload[0] == '1');
  }
}`,
    resources: [{ name: 'MQTT Setup Guide', url: '#' }]
  },
  {
    id: 'oscilloscope',
    name: 'DIY Oscilloscope',
    category: 'Electronics',
    icon: '📊',
    difficulty: 'Advanced',
    duration: '6-8 hours',
    color: 'from-indigo-500 to-purple-500',
    description: 'Build a basic oscilloscope using Arduino and Processing',
    skills: ['ADC', 'Signal Processing', 'GUI Programming', 'Electronics'],
    components: ['Arduino Mega', 'Op-Amp', 'Resistors', 'BNC Connector'],
    steps: ['Build input protection', 'Configure ADC', 'Create Processing GUI', 'Add trigger modes', 'Calibrate'],
    codeSnippet: `void loop() {
  for(int i = 0; i < 500; i++) {
    buffer[i] = analogRead(A0);
    delayMicroseconds(100);
  }
  Serial.write(buffer, 500);
}`,
    resources: [{ name: 'Processing Tutorial', url: '#' }]
  },

  // AEROSPACE
  {
    id: 'model-rocket',
    name: 'Model Rocket with Telemetry',
    category: 'Aerospace',
    icon: '🚀',
    difficulty: 'Intermediate',
    duration: '6-8 hours',
    color: 'from-orange-500 to-red-500',
    description: 'Build a model rocket with altitude tracking and data logging',
    skills: ['Rocketry', 'Altimeter', 'Data Logging', 'Recovery Systems'],
    components: ['Rocket Kit', 'Altimeter', 'Arduino Nano', 'Parachute', 'Motor'],
    steps: ['Assemble rocket body', 'Install altimeter', 'Wire data logger', 'Setup recovery system', 'Launch and analyze'],
    codeSnippet: `#include <BMP280.h>
float maxAltitude = 0;
void loop() {
  float altitude = bmp.readAltitude();
  if (altitude > maxAltitude) maxAltitude = altitude;
  logData(altitude);
}`,
    resources: [{ name: 'NAR Safety Code', url: '#' }]
  },
  {
    id: 'wind-tunnel',
    name: 'Desktop Wind Tunnel',
    category: 'Aerospace',
    icon: '💨',
    difficulty: 'Advanced',
    duration: '10-15 hours',
    color: 'from-blue-500 to-cyan-500',
    description: 'Build a small wind tunnel for aerodynamic testing',
    skills: ['Aerodynamics', 'Flow Visualization', 'Data Acquisition', 'CAD'],
    components: ['Fan', 'Honeycomb', 'Test Section', 'Pitot Tube', 'Manometer'],
    steps: ['Design tunnel geometry', 'Build contraction section', 'Install flow straighteners', 'Add instrumentation', 'Calibrate'],
    codeSnippet: `// Calculate airspeed from pitot tube
float dynamicPressure = pitotPressure - staticPressure;
float airspeed = sqrt(2 * dynamicPressure / airDensity);`,
    resources: [{ name: 'Wind Tunnel Design', url: '#' }]
  },
  // AUTOMOTIVE
  {
    id: 'obd-scanner',
    name: 'OBD-II Diagnostic Scanner',
    category: 'Automotive',
    icon: '🔧',
    difficulty: 'Intermediate',
    duration: '4-5 hours',
    color: 'from-green-500 to-teal-500',
    description: 'Build a car diagnostic tool that reads engine codes and live data',
    skills: ['OBD-II Protocol', 'CAN Bus', 'Arduino', 'Data Parsing'],
    components: ['Arduino', 'ELM327 Module', 'OLED Display', 'Buttons'],
    steps: ['Connect ELM327', 'Parse OBD responses', 'Display live data', 'Read trouble codes', 'Add data logging'],
    codeSnippet: `void readRPM() {
  Serial.println("010C"); // OBD command for RPM
  String response = readResponse();
  int rpm = ((hexToDec(response[0]) * 256) + hexToDec(response[1])) / 4;
}`,
    resources: [{ name: 'OBD-II PIDs', url: '#' }]
  },
  {
    id: 'ev-charger',
    name: 'EV Charging Station Monitor',
    category: 'Automotive',
    icon: '⚡',
    difficulty: 'Advanced',
    duration: '8-10 hours',
    color: 'from-yellow-500 to-green-500',
    description: 'Build a smart EV charging monitor with energy tracking',
    skills: ['Power Electronics', 'Energy Metering', 'IoT', 'Safety Systems'],
    components: ['ESP32', 'CT Sensor', 'Relay', 'LCD Display', 'Enclosure'],
    steps: ['Install CT sensor', 'Setup energy metering', 'Add safety interlocks', 'Create web dashboard', 'Implement scheduling'],
    codeSnippet: `float current = ct.calcIrms(1480);
float power = current * voltage;
float energy += power * (millis() - lastTime) / 3600000.0;`,
    resources: [{ name: 'J1772 Standard', url: '#' }]
  },
  // CIVIL ENGINEERING
  {
    id: 'bridge-model',
    name: 'Structural Bridge Model',
    category: 'Civil',
    icon: '🌉',
    difficulty: 'Beginner',
    duration: '3-4 hours',
    color: 'from-amber-500 to-orange-500',
    description: 'Design and build a model bridge to test structural concepts',
    skills: ['Structural Analysis', 'Load Testing', 'Material Selection', 'CAD'],
    components: ['Balsa Wood', 'Glue', 'Testing Weights', 'Measuring Tools'],
    steps: ['Design truss structure', 'Cut members', 'Assemble bridge', 'Test to failure', 'Analyze results'],
    codeSnippet: `// Calculate member forces (Method of Joints)
float forceAB = load * sin(angle) / sin(jointAngle);
float forceBC = load * cos(angle) / sin(jointAngle);`,
    resources: [{ name: 'Truss Analysis', url: '#' }]
  },
  {
    id: 'soil-tester',
    name: 'Soil Moisture Monitor',
    category: 'Civil',
    icon: '🌱',
    difficulty: 'Beginner',
    duration: '2-3 hours',
    color: 'from-green-600 to-emerald-500',
    description: 'Build a soil moisture monitoring system for geotechnical applications',
    skills: ['Sensors', 'Data Logging', 'Calibration', 'Arduino'],
    components: ['Arduino', 'Soil Moisture Sensors', 'SD Card Module', 'Battery'],
    steps: ['Wire sensors', 'Calibrate readings', 'Setup data logging', 'Create alerts', 'Deploy in field'],
    codeSnippet: `int moistureRaw = analogRead(SENSOR_PIN);
float moisturePercent = map(moistureRaw, dryValue, wetValue, 0, 100);
logToSD(moisturePercent);`,
    resources: [{ name: 'Sensor Calibration', url: '#' }]
  },
  // MECHANICAL
  {
    id: 'cnc-plotter',
    name: 'CNC Pen Plotter',
    category: 'Mechanical',
    icon: '✏️',
    difficulty: 'Intermediate',
    duration: '8-12 hours',
    color: 'from-blue-500 to-indigo-500',
    description: 'Build a 2-axis CNC plotter for drawing and engraving',
    skills: ['CNC', 'Stepper Motors', 'G-Code', 'Mechanical Design'],
    components: ['Arduino', 'CNC Shield', '2x Stepper Motors', 'Linear Rails', 'Servo'],
    steps: ['Build frame', 'Install linear motion', 'Wire electronics', 'Configure GRBL', 'Test plotting'],
    codeSnippet: `// GRBL configuration
$100=80.000 // X steps/mm
$101=80.000 // Y steps/mm
$110=500.000 // X max rate
$111=500.000 // Y max rate`,
    resources: [{ name: 'GRBL Wiki', url: '#' }]
  },
  {
    id: '3d-scanner',
    name: 'DIY 3D Scanner',
    category: 'Mechanical',
    icon: '📷',
    difficulty: 'Advanced',
    duration: '10-15 hours',
    color: 'from-purple-500 to-pink-500',
    description: 'Build a turntable 3D scanner using photogrammetry',
    skills: ['Photogrammetry', 'Stepper Control', 'Point Clouds', 'Mesh Processing'],
    components: ['Camera', 'Turntable', 'Stepper Motor', 'Arduino', 'Lighting'],
    steps: ['Build turntable', 'Setup camera trigger', 'Capture images', 'Process in software', 'Generate mesh'],
    codeSnippet: `void scanObject() {
  for(int angle = 0; angle < 360; angle += 10) {
    stepper.step(stepsPerDegree * 10);
    triggerCamera();
    delay(500);
  }
}`,
    resources: [{ name: 'Meshroom Tutorial', url: '#' }]
  },
  // ENERGY
  {
    id: 'solar-tracker',
    name: 'Solar Panel Tracker',
    category: 'Energy',
    icon: '☀️',
    difficulty: 'Intermediate',
    duration: '5-7 hours',
    color: 'from-yellow-400 to-orange-500',
    description: 'Build a dual-axis solar tracker for maximum energy harvest',
    skills: ['Solar Energy', 'Servo Control', 'Light Sensors', 'Power Systems'],
    components: ['Solar Panel', '2x Servos', '4x LDRs', 'Arduino', 'Charge Controller'],
    steps: ['Build mount', 'Install LDR sensors', 'Program tracking algorithm', 'Add power monitoring', 'Optimize angles'],
    codeSnippet: `int topLeft = analogRead(A0);
int topRight = analogRead(A1);
int avgTop = (topLeft + topRight) / 2;
int avgBottom = (bottomLeft + bottomRight) / 2;
if (avgTop > avgBottom + threshold) tiltUp();`,
    resources: [{ name: 'Solar Tracking Theory', url: '#' }]
  },
  {
    id: 'wind-turbine',
    name: 'Small Wind Turbine',
    category: 'Energy',
    icon: '🌬️',
    difficulty: 'Advanced',
    duration: '12-16 hours',
    color: 'from-cyan-500 to-blue-500',
    description: 'Design and build a small vertical axis wind turbine',
    skills: ['Aerodynamics', 'Generator Design', 'Power Electronics', 'Mechanical Design'],
    components: ['Blades', 'Generator', 'Bearings', 'Charge Controller', 'Tower'],
    steps: ['Design blades', 'Build generator', 'Assemble turbine', 'Install electronics', 'Test and optimize'],
    codeSnippet: `// Power calculation
float tipSpeedRatio = bladeSpeed * radius / windSpeed;
float Cp = calculatePowerCoefficient(tipSpeedRatio);
float power = 0.5 * airDensity * sweptArea * pow(windSpeed, 3) * Cp;`,
    resources: [{ name: 'VAWT Design Guide', url: '#' }]
  },
  // BIOMEDICAL
  {
    id: 'heart-monitor',
    name: 'Heart Rate Monitor',
    category: 'Biomedical',
    icon: '❤️',
    difficulty: 'Beginner',
    duration: '2-3 hours',
    color: 'from-red-500 to-pink-500',
    description: 'Build a pulse oximeter with heart rate display',
    skills: ['Biosensors', 'Signal Processing', 'Arduino', 'Data Visualization'],
    components: ['Arduino', 'MAX30102 Sensor', 'OLED Display', 'Battery'],
    steps: ['Wire sensor', 'Implement filtering', 'Detect peaks', 'Calculate BPM', 'Display results'],
    codeSnippet: `#include <MAX30105.h>
MAX30105 sensor;
void loop() {
  long irValue = sensor.getIR();
  if (checkForBeat(irValue)) {
    long delta = millis() - lastBeat;
    bpm = 60 / (delta / 1000.0);
  }
}`,
    resources: [{ name: 'PPG Signal Processing', url: '#' }]
  },
  {
    id: 'prosthetic-hand',
    name: 'Prosthetic Hand Prototype',
    category: 'Biomedical',
    icon: '🤚',
    difficulty: 'Advanced',
    duration: '15-20 hours',
    color: 'from-purple-500 to-indigo-500',
    description: 'Build a 3D printed prosthetic hand with EMG control',
    skills: ['3D Printing', 'EMG Sensors', 'Servo Control', 'Biomechanics'],
    components: ['3D Printed Parts', '5x Servos', 'EMG Sensor', 'Arduino', 'Strings'],
    steps: ['Print hand parts', 'Assemble mechanism', 'Wire servos', 'Setup EMG control', 'Calibrate gestures'],
    codeSnippet: `int emgValue = analogRead(EMG_PIN);
if (emgValue > threshold) {
  closeHand();
} else {
  openHand();
}`,
    resources: [{ name: 'Open Bionics', url: '#' }]
  }
];

export default projectTemplates;
