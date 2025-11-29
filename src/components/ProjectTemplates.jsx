import { useState } from 'react';
import { createPortal } from 'react-dom';
import { 
  X, Download, ExternalLink, Clock, Users, Star, 
  Cpu, Settings, Zap, FileCode, Box, CircuitBoard,
  ChevronRight, CheckCircle
} from 'lucide-react';

const projectTemplates = [
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
    steps: [
      'Design arm structure in CAD',
      'Wire servo motors to Arduino',
      'Implement forward kinematics',
      'Add inverse kinematics solver',
      'Create control interface'
    ],
    codeSnippet: `// Servo control for robotic arm
#include <Servo.h>

Servo base, shoulder, elbow;

void setup() {
  base.attach(9);
  shoulder.attach(10);
  elbow.attach(11);
}

void moveToPosition(int b, int s, int e) {
  base.write(b);
  shoulder.write(s);
  elbow.write(e);
  delay(500);
}`,
    resources: [
      { name: 'Servo Library Docs', url: '#' },
      { name: 'Kinematics Tutorial', url: '#' },
      { name: 'CAD Files', url: '#' }
    ]
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
    components: ['Arduino Nano', '2x DC Motors', 'L298N Driver', '3x IR Sensors', 'Chassis'],
    steps: [
      'Assemble robot chassis',
      'Connect motors to driver',
      'Wire IR sensors',
      'Implement basic line following',
      'Add PID control for smooth movement'
    ],
    codeSnippet: `// Line follower with PID
int leftSensor = A0;
int rightSensor = A1;

void loop() {
  int left = analogRead(leftSensor);
  int right = analogRead(rightSensor);
  
  if (left < 500 && right < 500) {
    forward();
  } else if (left < 500) {
    turnLeft();
  } else if (right < 500) {
    turnRight();
  }
}`,
    resources: [
      { name: 'PID Tutorial', url: '#' },
      { name: 'Motor Driver Guide', url: '#' }
    ]
  },
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
    steps: [
      'Connect sensors to ESP32',
      'Set up WiFi connection',
      'Create data logging system',
      'Build web dashboard',
      'Add weather predictions'
    ],
    codeSnippet: `// Weather station with ESP32
#include <WiFi.h>
#include <DHT.h>

DHT dht(4, DHT22);

void setup() {
  WiFi.begin(ssid, password);
  dht.begin();
}

void loop() {
  float temp = dht.readTemperature();
  float humidity = dht.readHumidity();
  sendToCloud(temp, humidity);
  delay(60000);
}`,
    resources: [
      { name: 'ESP32 WiFi Guide', url: '#' },
      { name: 'Sensor Datasheets', url: '#' }
    ]
  },
  {
    id: 'drone-frame',
    name: 'Quadcopter Frame Design',
    category: 'CAD',
    icon: '🚁',
    difficulty: 'Advanced',
    duration: '6-8 hours',
    color: 'from-orange-500 to-red-500',
    description: 'Design a lightweight quadcopter frame optimized for racing',
    skills: ['CAD Design', 'FEA Analysis', '3D Printing', 'Aerodynamics'],
    components: ['Carbon Fiber Tubes', '3D Printed Parts', 'Motor Mounts', 'Landing Gear'],
    steps: [
      'Define frame requirements',
      'Create initial CAD design',
      'Run FEA stress analysis',
      'Optimize for weight',
      'Prepare for manufacturing'
    ],
    codeSnippet: `// Frame specifications
Frame Type: X-Configuration
Wheelbase: 250mm
Material: Carbon Fiber + PLA
Weight Target: < 150g
Motor Size: 2205-2300KV
Prop Size: 5" tri-blade

// Key dimensions
Arm Length: 110mm
Arm Width: 12mm
Center Plate: 80x80mm`,
    resources: [
      { name: 'CAD Tutorial', url: '#' },
      { name: 'FEA Guide', url: '#' },
      { name: 'STL Files', url: '#' }
    ]
  },
  {
    id: 'motor-controller',
    name: 'BLDC Motor Controller',
    category: 'Electronics',
    icon: '⚡',
    difficulty: 'Advanced',
    duration: '8-10 hours',
    color: 'from-yellow-500 to-amber-500',
    description: 'Design a brushless DC motor controller with FOC',
    skills: ['Power Electronics', 'PCB Design', 'FOC Algorithm', 'Embedded C'],
    components: ['STM32', 'Gate Drivers', 'MOSFETs', 'Current Sensors', 'Encoder'],
    steps: [
      'Design power stage schematic',
      'Layout PCB with thermal considerations',
      'Implement six-step commutation',
      'Add FOC algorithm',
      'Tune current and speed loops'
    ],
    codeSnippet: `// FOC control loop
void FOC_Loop() {
  // Read encoder position
  float theta = getRotorAngle();
  
  // Clarke transform
  float i_alpha = i_a;
  float i_beta = (i_a + 2*i_b) / sqrt(3);
  
  // Park transform
  float i_d = i_alpha*cos(theta) + i_beta*sin(theta);
  float i_q = -i_alpha*sin(theta) + i_beta*cos(theta);
  
  // PI controllers
  float v_d = PI_d(i_d_ref - i_d);
  float v_q = PI_q(i_q_ref - i_q);
}`,
    resources: [
      { name: 'FOC Theory', url: '#' },
      { name: 'PCB Design Guide', url: '#' }
    ]
  },
  {
    id: 'rc-car',
    name: 'RC Car Chassis',
    category: 'CAD',
    icon: '🏎️',
    difficulty: 'Intermediate',
    duration: '5-7 hours',
    color: 'from-blue-500 to-indigo-500',
    description: 'Design a 1:10 scale RC car chassis with suspension',
    skills: ['CAD Design', 'Suspension Geometry', '3D Printing', 'Assembly'],
    components: ['3D Printed Parts', 'Bearings', 'Shock Absorbers', 'Steering Linkage'],
    steps: [
      'Design chassis base plate',
      'Create suspension arms',
      'Design steering mechanism',
      'Add shock mounts',
      'Assemble and test'
    ],
    codeSnippet: `// Suspension specifications
Type: Double Wishbone
Travel: 30mm
Camber: -1.5°
Caster: 5°
Toe: 0°

// Steering
Ackermann: 60%
Steering Angle: ±25°
Servo: 20kg-cm`,
    resources: [
      { name: 'Suspension Tutorial', url: '#' },
      { name: 'STL Files', url: '#' }
    ]
  }
];

const difficultyColors = {
  'Beginner': 'bg-green-500/20 text-green-400 border-green-500/30',
  'Intermediate': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  'Advanced': 'bg-red-500/20 text-red-400 border-red-500/30'
};

export default function ProjectTemplates({ isOpen, onClose }) {
  const [selectedProject, setSelectedProject] = useState(null);
  const [filter, setFilter] = useState('all');

  const categories = ['all', 'Robotics', 'Electronics', 'CAD'];
  
  const filteredProjects = filter === 'all' 
    ? projectTemplates 
    : projectTemplates.filter(p => p.category === filter);

  if (!isOpen) return null;

  return createPortal(
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden border border-cyan-500/30 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-700 bg-gradient-to-r from-cyan-500/10 to-blue-500/10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center">
                <Box className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Project Templates</h2>
                <p className="text-gray-400 text-sm">Ready-to-build engineering projects</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-700 rounded-lg">
              <X className="w-6 h-6 text-gray-400" />
            </button>
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  filter === cat
                    ? 'bg-cyan-500 text-white'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                {cat === 'all' ? 'All Projects' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {!selectedProject ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProjects.map(project => (
                <button
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className={`text-left p-5 rounded-xl border border-gray-700 hover:border-cyan-500/50 bg-gradient-to-br ${project.color} bg-opacity-10 transition-all hover:scale-[1.02] active:scale-[0.98]`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-4xl">{project.icon}</span>
                    <span className={`px-2 py-1 rounded text-xs font-medium border ${difficultyColors[project.difficulty]}`}>
                      {project.difficulty}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{project.name}</h3>
                  <p className="text-sm text-gray-400 mb-3 line-clamp-2">{project.description}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {project.duration}
                    </span>
                    <span className="bg-gray-700 px-2 py-0.5 rounded">{project.category}</span>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div>
              {/* Back Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
              >
                ← Back to Projects
              </button>

              {/* Project Header */}
              <div className={`bg-gradient-to-r ${selectedProject.color} rounded-xl p-6 mb-6`}>
                <div className="flex items-start gap-4">
                  <span className="text-5xl">{selectedProject.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-bold text-white">{selectedProject.name}</h3>
                      <span className={`px-2 py-1 rounded text-xs font-medium border ${difficultyColors[selectedProject.difficulty]}`}>
                        {selectedProject.difficulty}
                      </span>
                    </div>
                    <p className="text-white/90 mb-3">{selectedProject.description}</p>
                    <div className="flex items-center gap-4 text-sm text-white/80">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {selectedProject.duration}
                      </span>
                      <span>{selectedProject.category}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* Skills */}
                  <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
                    <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-yellow-400" />
                      Skills You'll Learn
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.skills.map((skill, idx) => (
                        <span key={idx} className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Components */}
                  <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
                    <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                      <Settings className="w-4 h-4 text-purple-400" />
                      Components Needed
                    </h4>
                    <ul className="space-y-2">
                      {selectedProject.components.map((comp, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-gray-300 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          {comp}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Steps */}
                  <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
                    <h4 className="font-semibold text-white mb-3">Build Steps</h4>
                    <ol className="space-y-2">
                      {selectedProject.steps.map((step, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-gray-300 text-sm">
                          <span className="w-6 h-6 bg-cyan-500/20 text-cyan-400 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                            {idx + 1}
                          </span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Code Snippet */}
                  <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
                    <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                      <FileCode className="w-4 h-4 text-green-400" />
                      Sample Code
                    </h4>
                    <pre className="bg-gray-900 rounded-lg p-4 overflow-x-auto text-sm text-gray-300 font-mono">
                      {selectedProject.codeSnippet}
                    </pre>
                  </div>

                  {/* Resources */}
                  <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
                    <h4 className="font-semibold text-white mb-3">Resources</h4>
                    <div className="space-y-2">
                      {selectedProject.resources.map((res, idx) => (
                        <a
                          key={idx}
                          href={res.url}
                          className="flex items-center justify-between p-3 bg-gray-700/50 hover:bg-gray-700 rounded-lg transition-colors"
                        >
                          <span className="text-gray-300">{res.name}</span>
                          <ExternalLink className="w-4 h-4 text-gray-500" />
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Download Button */}
                  <button className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 rounded-xl font-semibold text-white flex items-center justify-center gap-2 active:scale-98">
                    <Download className="w-5 h-5" />
                    Download Project Files
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
