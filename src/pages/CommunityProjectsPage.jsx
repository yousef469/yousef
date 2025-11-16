import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, MessageCircle, Share2, Eye, Upload, TrendingUp } from 'lucide-react';

export default function CommunityProjectsPage() {
  const navigate = useNavigate();
  const [likedProjects, setLikedProjects] = useState(new Set());

  const projects = [
    {
      id: 1,
      title: 'DIY Rocket Launch Simulator',
      author: 'Alex Chen',
      description: 'Built a complete rocket simulator with real physics calculations and 3D visualization',
      image: '🚀',
      likes: 234,
      comments: 45,
      views: 1200,
      tags: ['Rockets', 'Physics', 'JavaScript'],
      gradient: 'from-orange-500 to-red-600'
    },
    {
      id: 2,
      title: 'Smart Car Dashboard App',
      author: 'Sarah Johnson',
      description: 'Real-time car diagnostics dashboard with OBD-II integration',
      image: '🚗',
      likes: 189,
      comments: 32,
      views: 890,
      tags: ['Cars', 'Electronics', 'React'],
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      id: 3,
      title: 'Drone Flight Controller',
      author: 'Mike Rodriguez',
      description: 'Custom flight controller with autopilot and GPS navigation',
      image: '✈️',
      likes: 312,
      comments: 67,
      views: 1500,
      tags: ['Planes', 'Robotics', 'C++'],
      gradient: 'from-cyan-500 to-blue-600'
    },
    {
      id: 4,
      title: 'Robotic Arm with AI',
      author: 'Emma Wilson',
      description: 'AI-powered robotic arm that can pick and sort objects',
      image: '🤖',
      likes: 276,
      comments: 54,
      views: 1100,
      tags: ['Robotics', 'AI', 'Python'],
      gradient: 'from-yellow-500 to-amber-600'
    },
    {
      id: 5,
      title: 'Wind Tunnel Simulator',
      author: 'David Kim',
      description: 'CFD simulation tool for testing aerodynamic designs',
      image: '🌪️',
      likes: 198,
      comments: 38,
      views: 750,
      tags: ['Aerodynamics', 'Simulation', 'MATLAB'],
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      id: 6,
      title: 'Electric Motor Controller',
      author: 'Lisa Park',
      description: 'PWM-based motor controller with regenerative braking',
      image: '⚡',
      likes: 145,
      comments: 28,
      views: 620,
      tags: ['Electronics', 'Motors', 'Arduino'],
      gradient: 'from-blue-500 to-indigo-600'
    }
  ];

  const toggleLike = (projectId) => {
    setLikedProjects(prev => {
      const newSet = new Set(prev);
      if (newSet.has(projectId)) {
        newSet.delete(projectId);
      } else {
        newSet.add(projectId);
      }
      return newSet;
    });
  };

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
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Community Projects</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-6">
            Discover amazing projects from fellow engineers, share your work, and get inspired!
          </p>
          
          <button
            onClick={() => navigate('/projects/upload')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 rounded-lg font-semibold transition-all"
          >
            <Upload className="w-5 h-5" />
            Share Your Project
          </button>
        </div>

        {/* Trending Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-6 h-6 text-orange-400" />
            <h2 className="text-2xl font-bold">Trending Projects</h2>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-gray-800/50 border border-gray-700 rounded-xl overflow-hidden hover:border-purple-500/50 transition-all hover:scale-105 cursor-pointer"
              onClick={() => navigate(`/community-projects/${project.id}`)}
            >
              {/* Project Image/Icon */}
              <div className={`h-48 bg-gradient-to-br ${project.gradient} flex items-center justify-center text-8xl`}>
                {project.image}
              </div>

              {/* Project Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-sm text-gray-400 mb-3">by {project.author}</p>
                <p className="text-gray-300 text-sm mb-4">{project.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs font-semibold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleLike(project.id);
                    }}
                    className={`flex items-center gap-1 hover:text-red-400 transition-colors ${
                      likedProjects.has(project.id) ? 'text-red-400' : ''
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${likedProjects.has(project.id) ? 'fill-current' : ''}`} />
                    {project.likes + (likedProjects.has(project.id) ? 1 : 0)}
                  </button>
                  
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" />
                    {project.comments}
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {project.views}
                  </div>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigator.share?.({
                        title: project.title,
                        text: project.description,
                        url: window.location.href
                      });
                    }}
                    className="flex items-center gap-1 hover:text-cyan-400 transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
