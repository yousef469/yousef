import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Briefcase, Rocket, Car, Plane, Zap, Code, CheckCircle } from 'lucide-react';

export default function ProjectsPage() {
  const navigate = useNavigate();

  const projects = [
    {
      id: 'rocket-simulator',
      title: 'Rocket Launch Simulator',
      description: 'Build a physics-based rocket simulator with thrust calculations and trajectory prediction',
      difficulty: 'Advanced',
      duration: '4-6 weeks',
      icon: Rocket,
      skills: ['Physics', 'JavaScript', 'Math'],
      gradient: 'from-orange-500 to-red-600',
      status: 'available'
    },
    {
      id: 'car-dashboard',
      title: 'Smart Car Dashboard',
      description: 'Create an interactive dashboard showing speed, fuel efficiency, and engine diagnostics',
      difficulty: 'Intermediate',
      duration: '2-3 weeks',
      icon: Car,
      skills: ['Electronics', 'UI/UX', 'Data Viz'],
      gradient: 'from-purple-500 to-pink-600',
      status: 'available'
    },
    {
      id: 'flight-controller',
      title: 'Aircraft Flight Controller',
      description: 'Design a flight control system with autopilot and stability features',
      difficulty: 'Advanced',
      duration: '5-7 weeks',
      icon: Plane,
      skills: ['Aerodynamics', 'Control Systems', 'Programming'],
      gradient: 'from-cyan-500 to-blue-600',
      status: 'available'
    },
    {
      id: 'robot-arm',
      title: 'Robotic Arm Controller',
      description: 'Program a robotic arm with inverse kinematics and path planning',
      difficulty: 'Intermediate',
      duration: '3-4 weeks',
      icon: Zap,
      skills: ['Robotics', 'Math', 'Electronics'],
      gradient: 'from-yellow-500 to-amber-600',
      status: 'coming-soon'
    },
    {
      id: 'cad-tool',
      title: 'Mini CAD Tool',
      description: 'Build a simple 2D CAD tool for engineering drawings and measurements',
      difficulty: 'Beginner',
      duration: '2-3 weeks',
      icon: Code,
      skills: ['Programming', 'Geometry', 'UI Design'],
      gradient: 'from-green-500 to-emerald-600',
      status: 'coming-soon'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </button>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <Briefcase className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
          <h1 className="text-5xl font-bold mb-4">Career Projects</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Build real-world engineering projects to showcase your skills and boost your portfolio
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {projects.map((project) => {
            const Icon = project.icon;
            const isComingSoon = project.status === 'coming-soon';
            
            return (
              <div
                key={project.id}
                className={`relative bg-gradient-to-br ${project.gradient} rounded-2xl p-6 border-2 border-white/20 transition-all ${
                  isComingSoon 
                    ? 'opacity-60 cursor-not-allowed' 
                    : 'hover:scale-105 hover:shadow-2xl cursor-pointer'
                }`}
                onClick={() => !isComingSoon && navigate(`/projects/${project.id}`)}
              >
                {isComingSoon && (
                  <div className="absolute top-4 right-4 px-3 py-1 bg-black/50 backdrop-blur rounded-full text-xs font-semibold">
                    Coming Soon
                  </div>
                )}

                <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center mb-4">
                  <Icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold mb-2 text-white">{project.title}</h3>
                <p className="text-white/90 text-sm mb-4">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 bg-white/20 backdrop-blur rounded-full text-xs font-semibold"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" />
                    {project.difficulty}
                  </span>
                  <span>{project.duration}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Info Section */}
        <div className="bg-gradient-to-br from-emerald-900/30 to-teal-900/30 rounded-2xl p-8 border border-emerald-500/30">
          <h2 className="text-3xl font-bold mb-4 text-emerald-300">Why Build Projects?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-xl font-bold mb-2 text-white">📚 Apply Your Knowledge</h3>
              <p className="text-gray-300">
                Put your engineering lessons into practice with hands-on projects
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2 text-white">💼 Build Your Portfolio</h3>
              <p className="text-gray-300">
                Create impressive projects to show employers and universities
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2 text-white">🚀 Career Ready</h3>
              <p className="text-gray-300">
                Gain practical experience that makes you stand out in job applications
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
