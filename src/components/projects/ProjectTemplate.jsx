import { useState } from 'react';
import { ArrowLeft, Download, Lightbulb, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ProjectTemplate({ 
  project,
  controls,
  simulation,
  insights,
  onGenerateReport,
  children 
}) {
  const navigate = useNavigate();
  const [showIntro, setShowIntro] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Header */}
      <div className="border-b border-gray-700 bg-gray-900/50 backdrop-blur sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button
            onClick={() => navigate('/career-projects')}
            className="flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Projects
          </button>

          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-4xl">{project.icon}</span>
                <h1 className="text-3xl font-bold">{project.title}</h1>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full border border-yellow-500/30">
                  {project.difficulty}
                </span>
                <span className="text-gray-400">{project.category}</span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-400">{project.duration}</span>
              </div>
            </div>
            <button
              onClick={onGenerateReport}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg font-semibold transition-all"
            >
              <Download className="w-5 h-5" />
              Generate Report
            </button>
          </div>
        </div>
      </div>

      {/* Intro Section (Collapsible) */}
      {showIntro && (
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-xl p-6 border border-blue-500/30">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <Lightbulb className="w-6 h-6 text-yellow-400" />
                <h2 className="text-xl font-bold">About This Project</h2>
              </div>
              <button
                onClick={() => setShowIntro(false)}
                className="text-gray-400 hover:text-white text-sm"
              >
                Hide
              </button>
            </div>
            
            <p className="text-gray-300 mb-4">{project.description}</p>
            
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <h3 className="font-semibold mb-2 text-blue-400">Used In:</h3>
                <p className="text-sm text-gray-300">{project.usedIn}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-purple-400">Skills You'll Learn:</h3>
                <div className="flex flex-wrap gap-2">
                  {project.skills.map((skill, idx) => (
                    <span key={idx} className="px-2 py-1 bg-white/10 rounded text-xs">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2 text-green-400">Learning Objectives:</h3>
              <ul className="space-y-1">
                {project.learningObjectives.map((obj, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                    <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {children || (
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Controls Panel */}
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <h2 className="text-xl font-bold mb-4">⚙️ Controls</h2>
              {controls}
            </div>

            {/* Simulation Panel */}
            <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
              <h2 className="text-xl font-bold mb-4">📊 Live Simulation</h2>
              {simulation}
            </div>
          </div>
        )}

        {/* AI Insights */}
        {insights && (
          <div className="mt-6 bg-gradient-to-r from-cyan-900/30 to-blue-900/30 rounded-xl p-6 border border-cyan-500/30">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="w-5 h-5 text-cyan-400" />
              <h2 className="text-xl font-bold">🤖 AI Insights</h2>
            </div>
            {insights}
          </div>
        )}
      </div>
    </div>
  );
}
