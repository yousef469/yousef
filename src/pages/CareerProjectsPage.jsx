import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Award, Rocket, Zap, Cpu, Car, Plane, Filter, Search } from 'lucide-react';
import { careerProjects } from '../data/careerProjects';

const categoryIcons = {
  Aerospace: Rocket,
  Electrical: Zap,
  Robotics: Cpu,
  Automotive: Car,
  Aviation: Plane
};

const difficultyColors = {
  Easy: 'bg-green-100 text-green-800 border-green-300',
  Medium: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  Hard: 'bg-orange-100 text-orange-800 border-orange-300',
  Advanced: 'bg-red-100 text-red-800 border-red-300'
};

export default function CareerProjectsPage() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['all', ...new Set(careerProjects.map(p => p.category))];
  const difficulties = ['all', 'Easy', 'Medium', 'Hard', 'Advanced'];

  const filteredProjects = careerProjects.filter(project => {
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || project.difficulty === selectedDifficulty;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesDifficulty && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Header */}
      <div className="border-b border-gray-700 bg-gray-900/50 backdrop-blur sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </button>

          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">🚀 Career Projects</h1>
              <p className="text-gray-400">Build portfolio-worthy engineering projects</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-400">{filteredProjects.length}</div>
              <div className="text-sm text-gray-400">Projects Available</div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 items-center">
            {/* Search */}
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-white"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-white"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat === 'all' ? 'All Categories' : cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Difficulty Filter */}
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500 text-white"
            >
              {difficulties.map(diff => (
                <option key={diff} value={diff}>
                  {diff === 'all' ? 'All Difficulties' : diff}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => {
            const CategoryIcon = categoryIcons[project.category] || Rocket;
            
            return (
              <div
                key={project.id}
                className={`group relative bg-gradient-to-br ${project.color} rounded-2xl p-6 border-2 border-white/20 hover:border-white/40 transition-all cursor-pointer hover:scale-105 hover:shadow-2xl ${
                  project.comingSoon ? 'opacity-60' : ''
                }`}
                onClick={() => {
                  if (!project.comingSoon) {
                    navigate(`/projects/${project.id}`);
                  }
                }}
              >
                {project.comingSoon && (
                  <div className="absolute top-4 right-4 bg-yellow-500 text-black px-3 py-1 rounded-full text-xs font-bold">
                    Coming Soon
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity" />
                
                <div className="relative z-10">
                  {/* Icon and Category */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-5xl">{project.icon}</div>
                    <CategoryIcon className="w-8 h-8 text-white/80" />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold mb-2 text-white">{project.title}</h3>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${difficultyColors[project.difficulty]}`}>
                      {project.difficulty}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white border border-white/30">
                      {project.category}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-white/90 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Duration */}
                  <div className="flex items-center gap-2 text-white/80 text-sm mb-4">
                    <Clock className="w-4 h-4" />
                    <span>{project.duration}</span>
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.skills.slice(0, 3).map((skill, idx) => (
                      <span key={idx} className="px-2 py-1 bg-white/10 rounded text-xs text-white/80">
                        {skill}
                      </span>
                    ))}
                    {project.skills.length > 3 && (
                      <span className="px-2 py-1 bg-white/10 rounded text-xs text-white/80">
                        +{project.skills.length - 3}
                      </span>
                    )}
                  </div>

                  {/* CTA */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-white font-semibold">
                      <span>{project.comingSoon ? 'Coming Soon' : 'Start Project'}</span>
                      {!project.comingSoon && (
                        <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
                      )}
                    </div>
                    <Award className="w-6 h-6 text-white/60" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold mb-2">No projects found</h3>
            <p className="text-gray-400">Try adjusting your filters</p>
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-2xl p-8 border border-blue-500/30">
          <h2 className="text-3xl font-bold mb-4">💼 Build Your Engineering Portfolio</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <div className="text-4xl mb-2">🎯</div>
              <h3 className="text-xl font-bold mb-2">Real-World Skills</h3>
              <p className="text-gray-300">
                Every project teaches skills used by engineers at SpaceX, Tesla, Boeing, and more.
              </p>
            </div>
            <div>
              <div className="text-4xl mb-2">🤖</div>
              <h3 className="text-xl font-bold mb-2">AI-Powered Learning</h3>
              <p className="text-gray-300">
                Get instant feedback and explanations as you work. Learn why your choices matter.
              </p>
            </div>
            <div>
              <div className="text-4xl mb-2">📄</div>
              <h3 className="text-xl font-bold mb-2">Professional Reports</h3>
              <p className="text-gray-300">
                Generate PDF reports for each project to showcase in your portfolio or resume.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
