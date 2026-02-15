import { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Clock, Box, Search, CheckCircle, ExternalLink, Settings, Zap, FileCode } from 'lucide-react';
import { projectTemplates } from '../data/projectTemplatesData';

const categories = [
  { id: 'all', name: 'All', icon: '📊' },
  { id: 'Robotics', name: 'Robotics', icon: '🤖' },
  { id: 'Electronics', name: 'Electronics', icon: '⚡' },
  { id: 'Aerospace', name: 'Aerospace', icon: '🚀' },
  { id: 'Automotive', name: 'Automotive', icon: '🚗' },
  { id: 'Civil', name: 'Civil', icon: '🏗️' },
  { id: 'Mechanical', name: 'Mechanical', icon: '⚙️' },
  { id: 'Energy', name: 'Energy', icon: '☀️' },
  { id: 'Biomedical', name: 'Biomedical', icon: '❤️' },
];

const difficultyColors = {
  'Beginner': 'bg-green-500/20 text-green-400 border-green-500/30',
  'Intermediate': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  'Advanced': 'bg-red-500/20 text-red-400 border-red-500/30'
};

export default function ProjectTemplates({ isOpen, onClose }) {
  const [selectedProject, setSelectedProject] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = projectTemplates.filter(p => {
    const matchesCategory = filter === 'all' || p.category === filter;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
                <p className="text-gray-400 text-sm">{projectTemplates.length} ready-to-build projects</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-700 rounded-lg">
              <X className="w-6 h-6 text-gray-400" />
            </button>
          </div>

          {!selectedProject && (
            <>
              {/* Search */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search projects..."
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              {/* Category Filter */}
              <div className="flex gap-2 flex-wrap">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setFilter(cat.id)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      filter === cat.id
                        ? 'bg-cyan-500 text-white'
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    }`}
                  >
                    <span className="mr-1">{cat.icon}</span>
                    {cat.name}
                  </button>
                ))}
              </div>
            </>
          )}
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
                    <p className="text-white/80 mb-3">{selectedProject.description}</p>
                    <div className="flex items-center gap-4 text-sm text-white/70">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {selectedProject.duration}
                      </span>
                      <span className="bg-white/20 px-2 py-0.5 rounded">{selectedProject.category}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Skills & Components */}
                <div className="space-y-4">
                  <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
                    <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-yellow-400" />
                      Skills Required
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.skills.map((skill, idx) => (
                        <span key={idx} className="px-3 py-1 bg-gray-700 rounded-full text-sm text-gray-300">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
                    <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                      <Settings className="w-4 h-4 text-cyan-400" />
                      Components
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
                </div>

                {/* Steps & Code */}
                <div className="space-y-4">
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

                  <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
                    <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                      <FileCode className="w-4 h-4 text-purple-400" />
                      Code Snippet
                    </h4>
                    <pre className="bg-gray-900 rounded-lg p-4 text-sm text-gray-300 overflow-x-auto">
                      <code>{selectedProject.codeSnippet}</code>
                    </pre>
                  </div>

                  {selectedProject.resources && (
                    <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
                      <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                        <ExternalLink className="w-4 h-4 text-blue-400" />
                        Resources
                      </h4>
                      <div className="space-y-2">
                        {selectedProject.resources.map((res, idx) => (
                          <a
                            key={idx}
                            href={res.url}
                            className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 text-sm"
                          >
                            <ExternalLink className="w-3 h-3" />
                            {res.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
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
