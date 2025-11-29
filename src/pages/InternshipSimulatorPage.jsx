import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Briefcase, Clock, Star, CheckCircle, Lock, 
  Trophy, Zap, ChevronRight, Building2, Rocket, Car, Plane,
  Cpu, HardHat, FileText, MessageSquare, Award, Target
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useProgress } from '../contexts/ProgressContext';

const companies = [
  {
    id: 'spacex',
    name: 'SpaceX',
    logo: '🚀',
    industry: 'Aerospace',
    color: 'from-gray-800 to-gray-900',
    borderColor: 'border-gray-600',
    description: 'Design rockets and spacecraft for Mars missions',
    difficulty: 'Advanced',
    tasks: 5
  },
  {
    id: 'tesla',
    name: 'Tesla',
    logo: '⚡',
    industry: 'Automotive & Energy',
    color: 'from-red-600 to-red-800',
    borderColor: 'border-red-500',
    description: 'Engineer electric vehicles and battery systems',
    difficulty: 'Intermediate',
    tasks: 5
  },
  {
    id: 'boeing',
    name: 'Boeing',
    logo: '✈️',
    industry: 'Aviation',
    color: 'from-blue-600 to-blue-800',
    borderColor: 'border-blue-500',
    description: 'Design commercial aircraft and defense systems',
    difficulty: 'Advanced',
    tasks: 5
  },
  {
    id: 'nvidia',
    name: 'NVIDIA',
    logo: '🎮',
    industry: 'Electronics & AI',
    color: 'from-green-600 to-green-800',
    borderColor: 'border-green-500',
    description: 'Develop GPUs and AI computing systems',
    difficulty: 'Intermediate',
    tasks: 4
  },
  {
    id: 'arup',
    name: 'Arup',
    logo: '🏗️',
    industry: 'Civil Engineering',
    color: 'from-amber-600 to-amber-800',
    borderColor: 'border-amber-500',
    description: 'Design bridges, buildings and infrastructure',
    difficulty: 'Intermediate',
    tasks: 4
  }
];

const internshipTasks = {
  spacex: [
    {
      id: 1,
      title: 'Rocket Nozzle Optimization',
      description: 'Your supervisor needs you to calculate the optimal expansion ratio for a new Raptor engine variant operating at sea level.',
      type: 'calculation',
      duration: '45 min',
      xp: 150,
      skills: ['Thermodynamics', 'Propulsion', 'Fluid Dynamics'],
      scenario: `You've just joined the Propulsion team at SpaceX. Your first task is to help optimize the Raptor engine nozzle for better sea-level performance.

**Background:**
The current nozzle has an expansion ratio of 40:1, optimized for vacuum. We need a sea-level variant.

**Given Data:**
- Chamber pressure: 300 bar
- Chamber temperature: 3500 K
- Ambient pressure: 1.01 bar
- Specific heat ratio (γ): 1.2

**Your Task:**
Calculate the optimal expansion ratio for maximum thrust at sea level using the isentropic flow equations.`,
      questions: [
        { q: 'What is the optimal expansion ratio for sea-level operation?', type: 'number', answer: 15, tolerance: 2 },
        { q: 'What would be the exit Mach number?', type: 'number', answer: 2.8, tolerance: 0.3 },
        { q: 'Should we use a bell or aerospike nozzle for this application?', type: 'choice', options: ['Bell nozzle', 'Aerospike nozzle', 'Plug nozzle'], answer: 0 }
      ]
    },
    {
      id: 2,
      title: 'Orbital Transfer Planning',
      description: 'Plan a Hohmann transfer from LEO to GEO for a Starlink satellite deployment mission.',
      type: 'calculation',
      duration: '30 min',
      xp: 120,
      skills: ['Orbital Mechanics', 'Mission Planning'],
      scenario: `The Mission Planning team needs your help calculating the delta-v budget for a satellite deployment.

**Mission Parameters:**
- Initial orbit: 400 km circular (LEO)
- Target orbit: 35,786 km circular (GEO)
- Earth radius: 6,371 km
- Earth μ: 398,600 km³/s²

**Your Task:**
Calculate the total delta-v required for a Hohmann transfer.`,
      questions: [
        { q: 'What is the delta-v for the first burn (LEO to transfer)?', type: 'number', answer: 2.44, tolerance: 0.1, unit: 'km/s' },
        { q: 'What is the delta-v for the second burn (transfer to GEO)?', type: 'number', answer: 1.47, tolerance: 0.1, unit: 'km/s' },
        { q: 'What is the transfer orbit period?', type: 'number', answer: 10.6, tolerance: 0.5, unit: 'hours' }
      ]
    },
    {
      id: 3,
      title: 'Heat Shield Material Selection',
      description: 'Select appropriate thermal protection materials for Starship re-entry.',
      type: 'analysis',
      duration: '35 min',
      xp: 130,
      skills: ['Materials Science', 'Thermal Analysis'],
      scenario: `The Thermal Protection team is evaluating materials for Starship's heat shield tiles.

**Re-entry Conditions:**
- Peak heating: 1,650°C
- Duration: 6 minutes
- Dynamic pressure: 50 kPa

**Material Options:**
A) PICA-X (Phenolic Impregnated Carbon Ablator)
B) Ceramic tiles (similar to Space Shuttle)
C) Stainless steel with active cooling

Analyze each option's pros and cons.`,
      questions: [
        { q: 'Which material is most suitable for reusability?', type: 'choice', options: ['PICA-X', 'Ceramic tiles', 'Stainless steel'], answer: 2 },
        { q: 'What is the main advantage of PICA-X?', type: 'choice', options: ['Reusability', 'Low weight', 'High ablation efficiency'], answer: 2 },
        { q: 'Why did SpaceX choose stainless steel for Starship?', type: 'choice', options: ['Lowest cost', 'Best thermal properties', 'Reusability + strength at high temp'], answer: 2 }
      ]
    }
  ],
  tesla: [
    {
      id: 1,
      title: 'Battery Pack Thermal Management',
      description: 'Design a cooling system for a new Model S battery pack variant.',
      type: 'design',
      duration: '40 min',
      xp: 140,
      skills: ['Thermal Engineering', 'Battery Systems', 'Heat Transfer'],
      scenario: `You're on the Battery Engineering team working on thermal management.

**Battery Specifications:**
- Pack capacity: 100 kWh
- Max discharge rate: 250 kW (Ludicrous mode)
- Cell type: 4680 cylindrical
- Operating temp range: 20-45°C
- Ambient temp range: -20 to 45°C

**Your Task:**
Design a liquid cooling system to maintain optimal battery temperature.`,
      questions: [
        { q: 'What coolant flow rate is needed to remove 10 kW of heat with 5°C temp rise?', type: 'number', answer: 0.48, tolerance: 0.05, unit: 'L/s' },
        { q: 'Which cooling approach is best for fast charging?', type: 'choice', options: ['Air cooling', 'Liquid cooling', 'Phase change'], answer: 1 },
        { q: 'What is the heat generation rate at max discharge (assume 5% loss)?', type: 'number', answer: 12.5, tolerance: 1, unit: 'kW' }
      ]
    },
    {
      id: 2,
      title: 'Motor Efficiency Optimization',
      description: 'Analyze and improve the efficiency of the rear drive unit motor.',
      type: 'analysis',
      duration: '35 min',
      xp: 130,
      skills: ['Electric Motors', 'Power Electronics', 'Efficiency'],
      scenario: `The Powertrain team wants to improve motor efficiency at highway speeds.

**Current Motor Specs:**
- Type: Permanent Magnet Synchronous Motor
- Peak power: 375 kW
- Peak torque: 660 Nm
- Current efficiency at 100 km/h: 92%

**Target:** Improve efficiency to 95% at cruise speeds.`,
      questions: [
        { q: 'What is the main source of losses in a PMSM at high speed?', type: 'choice', options: ['Copper losses', 'Iron losses', 'Mechanical friction'], answer: 1 },
        { q: 'How much power is saved improving from 92% to 95% efficiency at 20kW output?', type: 'number', answer: 0.69, tolerance: 0.1, unit: 'kW' },
        { q: 'Which technique reduces iron losses?', type: 'choice', options: ['Thicker laminations', 'Thinner laminations', 'Solid core'], answer: 1 }
      ]
    }
  ],
  boeing: [
    {
      id: 1,
      title: 'Wing Structural Analysis',
      description: 'Perform stress analysis on a 787 wing spar under maximum load.',
      type: 'calculation',
      duration: '45 min',
      xp: 150,
      skills: ['Structural Analysis', 'Composites', 'FEA'],
      scenario: `You're supporting the Structures team on 787 wing certification.

**Wing Spar Data:**
- Material: Carbon Fiber Reinforced Polymer (CFRP)
- Tensile strength: 600 MPa
- Max bending moment: 45 MN·m
- Spar height: 0.8 m
- Spar width: 0.3 m

**Your Task:**
Calculate the maximum stress and factor of safety.`,
      questions: [
        { q: 'What is the section modulus of the spar (rectangular)?', type: 'number', answer: 0.032, tolerance: 0.005, unit: 'm³' },
        { q: 'What is the maximum bending stress?', type: 'number', answer: 1406, tolerance: 100, unit: 'MPa' },
        { q: 'Is the design safe with FoS > 1.5?', type: 'choice', options: ['Yes, safe', 'No, needs redesign', 'Need more data'], answer: 1 }
      ]
    }
  ],
  nvidia: [
    {
      id: 1,
      title: 'GPU Thermal Design',
      description: 'Design the cooling solution for a new RTX 5090 graphics card.',
      type: 'design',
      duration: '40 min',
      xp: 140,
      skills: ['Thermal Management', 'Electronics Cooling', 'Heat Sinks'],
      scenario: `The GPU Cooling team needs your help with the next-gen flagship card.

**GPU Specifications:**
- TDP: 600W
- Die size: 600 mm²
- Max junction temp: 83°C
- Ambient temp: 35°C
- Target: Keep junction under 80°C

**Your Task:**
Design a cooling solution (heatsink + fans).`,
      questions: [
        { q: 'What is the required thermal resistance (junction to ambient)?', type: 'number', answer: 0.075, tolerance: 0.01, unit: '°C/W' },
        { q: 'Which cooling method is most effective for 600W?', type: 'choice', options: ['Air cooling only', 'Vapor chamber + fans', 'Passive heatsink'], answer: 1 },
        { q: 'How many heat pipes minimum (50W each)?', type: 'number', answer: 12, tolerance: 2 }
      ]
    }
  ],
  arup: [
    {
      id: 1,
      title: 'Bridge Load Analysis',
      description: 'Calculate the load capacity of a pedestrian bridge design.',
      type: 'calculation',
      duration: '40 min',
      xp: 140,
      skills: ['Structural Engineering', 'Load Analysis', 'Safety Factors'],
      scenario: `You're working on a new pedestrian bridge project in London.

**Bridge Specifications:**
- Span: 30 m
- Width: 4 m
- Material: Steel (yield strength 250 MPa)
- Design load: 5 kN/m² (pedestrian)
- Dead load: 3 kN/m²

**Your Task:**
Verify the main beam design meets safety requirements.`,
      questions: [
        { q: 'What is the total distributed load per meter length?', type: 'number', answer: 32, tolerance: 2, unit: 'kN/m' },
        { q: 'What is the maximum bending moment (simply supported)?', type: 'number', answer: 3600, tolerance: 200, unit: 'kN·m' },
        { q: 'What beam section modulus is needed for FoS = 2?', type: 'number', answer: 0.0288, tolerance: 0.005, unit: 'm³' }
      ]
    }
  ]
};

export default function InternshipSimulatorPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addXP } = useProgress();
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('internship_completed');
    if (saved) {
      setCompletedTasks(JSON.parse(saved));
    }
  }, []);

  const handleAnswer = (questionIndex, answer) => {
    setAnswers({ ...answers, [questionIndex]: answer });
  };

  const submitTask = () => {
    if (!selectedTask) return;
    
    let correct = 0;
    selectedTask.questions.forEach((q, idx) => {
      const userAnswer = answers[idx];
      if (q.type === 'number') {
        const diff = Math.abs(parseFloat(userAnswer) - q.answer);
        if (diff <= (q.tolerance || 0)) correct++;
      } else if (q.type === 'choice') {
        if (parseInt(userAnswer) === q.answer) correct++;
      }
    });

    const percentage = (correct / selectedTask.questions.length) * 100;
    setScore(percentage);
    setShowResults(true);

    // Award XP
    const xpEarned = Math.round((percentage / 100) * selectedTask.xp);
    if (xpEarned > 0 && addXP) {
      addXP(xpEarned, 'internship_task');
    }

    // Mark as completed
    const taskKey = `${selectedCompany.id}-${selectedTask.id}`;
    if (!completedTasks.includes(taskKey)) {
      const newCompleted = [...completedTasks, taskKey];
      setCompletedTasks(newCompleted);
      localStorage.setItem('internship_completed', JSON.stringify(newCompleted));
    }
  };

  const resetTask = () => {
    setSelectedTask(null);
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
    setScore(0);
  };

  const isTaskCompleted = (companyId, taskId) => {
    return completedTasks.includes(`${companyId}-${taskId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white pb-20 md:pb-0">
      {/* Header */}
      <div className="border-b border-gray-700 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 md:py-6">
          <button
            onClick={() => selectedTask ? resetTask() : selectedCompany ? setSelectedCompany(null) : navigate('/')}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-2"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>{selectedTask ? 'Back to Tasks' : selectedCompany ? 'Back to Companies' : 'Back to Home'}</span>
          </button>
          <div className="flex items-center gap-3">
            <Briefcase className="w-8 h-8 text-cyan-400" />
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Internship Simulator</h1>
              <p className="text-sm text-gray-400">Experience real engineering tasks from top companies</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Company Selection */}
        {!selectedCompany && (
          <div>
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">Choose Your Internship</h2>
              <p className="text-gray-400">Select a company to start working on real engineering challenges</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {companies.map(company => {
                const completedCount = internshipTasks[company.id]?.filter(t => 
                  isTaskCompleted(company.id, t.id)
                ).length || 0;
                
                return (
                  <button
                    key={company.id}
                    onClick={() => setSelectedCompany(company)}
                    className={`relative bg-gradient-to-br ${company.color} rounded-2xl p-6 border-2 ${company.borderColor} hover:scale-[1.02] transition-all text-left active:scale-[0.98]`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <span className="text-5xl">{company.logo}</span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        company.difficulty === 'Advanced' ? 'bg-red-500/20 text-red-300' : 'bg-yellow-500/20 text-yellow-300'
                      }`}>
                        {company.difficulty}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-1">{company.name}</h3>
                    <p className="text-sm text-gray-300 mb-2">{company.industry}</p>
                    <p className="text-sm text-gray-400 mb-4">{company.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">{completedCount}/{company.tasks} tasks completed</span>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                    {completedCount === company.tasks && (
                      <div className="absolute top-4 right-4">
                        <CheckCircle className="w-6 h-6 text-green-400" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Task Selection */}
        {selectedCompany && !selectedTask && (
          <div>
            <div className={`bg-gradient-to-r ${selectedCompany.color} rounded-2xl p-6 mb-8 border ${selectedCompany.borderColor}`}>
              <div className="flex items-center gap-4">
                <span className="text-6xl">{selectedCompany.logo}</span>
                <div>
                  <h2 className="text-2xl font-bold">{selectedCompany.name} Internship</h2>
                  <p className="text-gray-300">{selectedCompany.industry}</p>
                  <p className="text-sm text-gray-400 mt-1">{selectedCompany.description}</p>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-bold mb-4">Available Tasks</h3>
            <div className="space-y-4">
              {internshipTasks[selectedCompany.id]?.map(task => {
                const completed = isTaskCompleted(selectedCompany.id, task.id);
                return (
                  <button
                    key={task.id}
                    onClick={() => setSelectedTask(task)}
                    className={`w-full bg-gray-800/50 border rounded-xl p-5 text-left transition-all hover:bg-gray-800 ${
                      completed ? 'border-green-500/50' : 'border-gray-700 hover:border-cyan-500/50'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold text-lg">{task.title}</h4>
                          {completed && <CheckCircle className="w-5 h-5 text-green-400" />}
                        </div>
                        <p className="text-sm text-gray-400 mb-3">{task.description}</p>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {task.skills.map((skill, idx) => (
                            <span key={idx} className="px-2 py-1 bg-cyan-500/20 text-cyan-400 rounded text-xs">
                              {skill}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {task.duration}
                          </span>
                          <span className="flex items-center gap-1">
                            <Zap className="w-4 h-4 text-yellow-400" />
                            {task.xp} XP
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-500" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Task Execution */}
        {selectedTask && !showResults && (
          <div>
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-6 h-6 text-cyan-400" />
                <h2 className="text-xl font-bold">{selectedTask.title}</h2>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-4">
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {selectedTask.duration}
                </span>
                <span className="flex items-center gap-1">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  Up to {selectedTask.xp} XP
                </span>
              </div>
              <div className="bg-gray-900 rounded-lg p-4 whitespace-pre-wrap text-sm text-gray-300">
                {selectedTask.scenario}
              </div>
            </div>

            <div className="bg-gray-800/50 border border-cyan-500/30 rounded-xl p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-cyan-400" />
                Questions ({currentQuestion + 1}/{selectedTask.questions.length})
              </h3>

              <div className="space-y-6">
                {selectedTask.questions.map((q, idx) => (
                  <div key={idx} className={idx === currentQuestion ? '' : 'hidden'}>
                    <p className="text-lg mb-4">{q.q}</p>
                    
                    {q.type === 'number' && (
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          step="any"
                          value={answers[idx] || ''}
                          onChange={(e) => handleAnswer(idx, e.target.value)}
                          className="flex-1 bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-cyan-500"
                          placeholder="Enter your answer"
                        />
                        {q.unit && <span className="text-gray-400">{q.unit}</span>}
                      </div>
                    )}

                    {q.type === 'choice' && (
                      <div className="space-y-2">
                        {q.options.map((option, optIdx) => (
                          <button
                            key={optIdx}
                            onClick={() => handleAnswer(idx, optIdx)}
                            className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                              answers[idx] === optIdx
                                ? 'border-cyan-500 bg-cyan-500/20'
                                : 'border-gray-700 hover:border-gray-600'
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex justify-between mt-6">
                <button
                  onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                  disabled={currentQuestion === 0}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 rounded-lg"
                >
                  Previous
                </button>
                
                {currentQuestion < selectedTask.questions.length - 1 ? (
                  <button
                    onClick={() => setCurrentQuestion(currentQuestion + 1)}
                    className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 rounded-lg"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    onClick={submitTask}
                    className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-lg font-semibold"
                  >
                    Submit Task
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        {showResults && (
          <div className="max-w-xl mx-auto text-center">
            <div className={`w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center ${
              score >= 70 ? 'bg-gradient-to-br from-green-500 to-emerald-600' : 'bg-gradient-to-br from-yellow-500 to-orange-600'
            }`}>
              {score >= 70 ? (
                <Trophy className="w-12 h-12 text-white" />
              ) : (
                <Target className="w-12 h-12 text-white" />
              )}
            </div>

            <h2 className="text-2xl font-bold mb-2">
              {score >= 70 ? 'Task Completed!' : 'Good Effort!'}
            </h2>
            <p className="text-gray-400 mb-6">
              {score >= 70 
                ? 'Great work! Your supervisor is impressed.' 
                : 'Review the material and try again.'}
            </p>

            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 mb-6">
              <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 mb-2">
                {Math.round(score)}%
              </div>
              <div className="flex items-center justify-center gap-2 text-yellow-400">
                <Zap className="w-5 h-5" />
                <span className="font-semibold">+{Math.round((score / 100) * selectedTask.xp)} XP earned</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={resetTask}
                className="flex-1 py-3 bg-gray-700 hover:bg-gray-600 rounded-xl font-semibold"
              >
                Back to Tasks
              </button>
              <button
                onClick={() => {
                  resetTask();
                  setSelectedCompany(null);
                }}
                className="flex-1 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-xl font-semibold"
              >
                Change Company
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
