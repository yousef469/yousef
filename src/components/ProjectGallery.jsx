import { useState, useEffect } from 'react';
import { Upload, Image, Code, Cpu, Heart, MessageCircle, Share2, Eye, X, Plus } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function ProjectGallery() {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = () => {
    const savedProjects = JSON.parse(localStorage.getItem('user_projects') || '[]');
    setProjects(savedProjects);
  };
  const [showUpload, setShowUpload] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [filter, setFilter] = useState('all');
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    type: 'CAD',
    tags: ''
  });

  const projectTypes = [
    { id: 'all', label: 'All', icon: '📁' },
    { id: 'CAD', label: 'CAD Models', icon: '🔧' },
    { id: 'Code', label: 'Code', icon: '💻' },
    { id: 'Circuit', label: 'Circuits', icon: '⚡' }
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.type === filter);

  const handleLike = (projectId) => {
    setProjects(projects.map(p => 
      p.id === projectId ? { ...p, likes: p.likes + 1 } : p
    ));
  };

  const handleUpload = () => {
    if (!newProject.title.trim()) return;

    const project = {
      id: Date.now(),
      ...newProject,
      authorId: user?.id,
      author: user?.email?.split('@')[0] || 'Anonymous',
      avatar: '👤',
      thumbnail: null,
      likes: 0,
      comments: 0,
      views: 0,
      tags: newProject.tags.split(',').map(t => t.trim()).filter(Boolean),
      createdAt: 'Just now'
    };

    const savedProjects = JSON.parse(localStorage.getItem('user_projects') || '[]');
    const updatedProjects = [project, ...savedProjects];
    localStorage.setItem('user_projects', JSON.stringify(updatedProjects));
    
    setProjects(updatedProjects);
    setNewProject({ title: '', description: '', type: 'CAD', tags: '' });
    setShowUpload(false);
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'CAD': return <Image className="w-4 h-4" />;
      case 'Code': return <Code className="w-4 h-4" />;
      case 'Circuit': return <Cpu className="w-4 h-4" />;
      default: return <Image className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'CAD': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Code': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Circuit': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };


  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Project Gallery</h2>
          <p className="text-gray-400">Share your CAD models, code, and circuit designs</p>
        </div>
        <button
          onClick={() => setShowUpload(true)}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-lg font-medium transition-all"
        >
          <Plus className="w-5 h-5" />
          Upload Project
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {projectTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => setFilter(type.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
              filter === type.id
                ? 'bg-cyan-500 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            <span>{type.icon}</span>
            {type.label}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-xl overflow-hidden hover:border-cyan-500/50 transition-all cursor-pointer group"
            onClick={() => setSelectedProject(project)}
          >
            {/* Thumbnail */}
            <div className="h-40 bg-gradient-to-br from-gray-700 to-gray-800 flex items-center justify-center relative">
              <span className="text-6xl opacity-50">{project.avatar}</span>
              <div className="absolute top-2 right-2">
                <span className={`px-2 py-1 rounded text-xs font-medium border ${getTypeColor(project.type)}`}>
                  {project.type}
                </span>
              </div>
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Eye className="w-8 h-8 text-white" />
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="font-bold text-white mb-1 truncate">{project.title}</h3>
              <p className="text-sm text-gray-400 mb-3 line-clamp-2">{project.description}</p>

              {/* Author */}
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-xs">
                  {project.avatar}
                </div>
                <span className="text-sm text-gray-400">{project.author}</span>
                <span className="text-xs text-gray-600">• {project.createdAt}</span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-3">
                {project.tags.slice(0, 3).map((tag, i) => (
                  <span key={i} className="px-2 py-0.5 bg-gray-700 rounded text-xs text-gray-400">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <button
                  onClick={(e) => { e.stopPropagation(); handleLike(project.id); }}
                  className="flex items-center gap-1 hover:text-red-400 transition-colors"
                >
                  <Heart className="w-4 h-4" />
                  {project.likes}
                </button>
                <span className="flex items-center gap-1">
                  <MessageCircle className="w-4 h-4" />
                  {project.comments}
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  {project.views}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Modal */}
      {showUpload && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 max-w-lg w-full border border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Upload Project</h3>
              <button onClick={() => setShowUpload(false)} className="text-gray-400 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Project Title</label>
                <input
                  type="text"
                  value={newProject.title}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                  placeholder="My Awesome Project"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Description</label>
                <textarea
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  placeholder="Describe your project..."
                  rows={3}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Project Type</label>
                <div className="flex gap-2">
                  {['CAD', 'Code', 'Circuit'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setNewProject({ ...newProject, type })}
                      className={`flex-1 py-2 rounded-lg font-medium transition-all ${
                        newProject.type === type
                          ? 'bg-cyan-500 text-white'
                          : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">Tags (comma separated)</label>
                <input
                  type="text"
                  value={newProject.tags}
                  onChange={(e) => setNewProject({ ...newProject, tags: e.target.value })}
                  placeholder="aerospace, CAD, design"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center hover:border-cyan-500/50 transition-colors cursor-pointer">
                <Upload className="w-12 h-12 text-gray-500 mx-auto mb-2" />
                <p className="text-gray-400">Click to upload files</p>
                <p className="text-xs text-gray-600 mt-1">CAD files, images, or code</p>
              </div>

              <button
                onClick={handleUpload}
                disabled={!newProject.title.trim()}
                className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 text-white rounded-lg font-bold transition-all"
              >
                Upload Project
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className={`px-2 py-1 rounded text-xs font-medium border ${getTypeColor(selectedProject.type)}`}>
                    {selectedProject.type}
                  </span>
                  <h2 className="text-2xl font-bold text-white mt-2">{selectedProject.title}</h2>
                </div>
                <button onClick={() => setSelectedProject(null)} className="text-gray-400 hover:text-white">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-xl">
                  {selectedProject.avatar}
                </div>
                <div>
                  <p className="font-semibold text-white">{selectedProject.author}</p>
                  <p className="text-sm text-gray-500">{selectedProject.createdAt}</p>
                </div>
              </div>

              <p className="text-gray-300 mb-4">{selectedProject.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {selectedProject.tags.map((tag, i) => (
                  <span key={i} className="px-3 py-1 bg-gray-700 rounded-full text-sm text-gray-300">
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-gray-700">
                <button className="flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors">
                  <Heart className="w-5 h-5" />
                  {selectedProject.likes}
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors">
                  <MessageCircle className="w-5 h-5" />
                  {selectedProject.comments} Comments
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors">
                  <Share2 className="w-5 h-5" />
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
