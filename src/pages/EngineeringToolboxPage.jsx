import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Lock, Zap, Star, Filter, BookOpen, Calculator, Box, Sparkles } from 'lucide-react';
import { engineeringTools, getAllTools, getFreeTools, getPremiumTools } from '../data/engineeringTools';
import FormulaLibrary from '../components/FormulaLibrary';
import MiniQuiz from '../components/MiniQuiz';
import ProjectTemplates from '../components/ProjectTemplates';
import EngineeringCalculators from '../components/EngineeringCalculators';

const difficultyColors = {
  Easy: 'bg-green-100 text-green-800 border-green-300',
  Medium: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  Advanced: 'bg-red-100 text-red-800 border-red-300'
};

export default function EngineeringToolboxPage() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showPremiumOnly, setShowPremiumOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFormulas, setShowFormulas] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [showCalculators, setShowCalculators] = useState(false);

  const categories = ['all', ...Object.keys(engineeringTools)];
  
  const getFilteredTools = () => {
    let tools = selectedCategory === 'all' 
      ? getAllTools() 
      : getAllTools().filter(t => t.category === selectedCategory);
    
    if (showPremiumOnly) {
      tools = tools.filter(t => t.premium);
    }
    
    if (searchQuery) {
      tools = tools.filter(t => 
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return tools;
  };

  const filteredTools = getFilteredTools();
  const freeToolsCount = getFreeTools().length;
  const premiumToolsCount = getPremiumTools().length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Header */}
      <div className="border-b border-gray-700 bg-gray-900 sticky top-0 z-10 shadow-lg">
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
              <h1 className="text-4xl font-bold mb-2">⚙️ Engineering Toolbox</h1>
              <p className="text-gray-400">Professional engineering calculators and simulators</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-4">
                <div>
                  <div className="text-2xl font-bold text-green-400">{freeToolsCount}</div>
                  <div className="text-xs text-gray-400">Free Tools</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-yellow-400">{premiumToolsCount}</div>
                  <div className="text-xs text-gray-400">Premium Tools</div>
                </div>
              </div>
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
                  placeholder="Search tools..."
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
                <option value="all">All Categories</option>
                {Object.keys(engineeringTools).map(cat => (
                  <option key={cat} value={cat}>
                    {engineeringTools[cat].icon} {engineeringTools[cat].name}
                  </option>
                ))}
              </select>
            </div>

            {/* Premium Filter */}
            <button
              onClick={() => setShowPremiumOnly(!showPremiumOnly)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                showPremiumOnly
                  ? 'bg-yellow-500 text-black border-yellow-400'
                  : 'bg-gray-800 text-gray-300 border-gray-700 hover:border-yellow-500'
              }`}
            >
              <Star className="w-4 h-4" />
              Premium Only
            </button>
          </div>
        </div>
      </div>

      {/* Quick Access Tools */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h2 className="text-xl font-bold mb-4 text-white">Quick Access</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <button
            onClick={() => setShowCalculators(true)}
            className="p-4 bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 hover:border-green-400 rounded-xl transition-all active:scale-95 text-left"
          >
            <Calculator className="w-8 h-8 text-green-400 mb-2" />
            <h3 className="font-semibold text-white">Calculators</h3>
            <p className="text-xs text-gray-400">Stress, force, gear ratio...</p>
          </button>
          
          <button
            onClick={() => setShowFormulas(true)}
            className="p-4 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 hover:border-cyan-400 rounded-xl transition-all active:scale-95 text-left"
          >
            <BookOpen className="w-8 h-8 text-cyan-400 mb-2" />
            <h3 className="font-semibold text-white">Formula Library</h3>
            <p className="text-xs text-gray-400">Essential engineering formulas</p>
          </button>
          
          <button
            onClick={() => setShowQuiz(true)}
            className="p-4 bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 hover:border-purple-400 rounded-xl transition-all active:scale-95 text-left"
          >
            <Sparkles className="w-8 h-8 text-purple-400 mb-2" />
            <h3 className="font-semibold text-white">Mini Quizzes</h3>
            <p className="text-xs text-gray-400">Test your knowledge</p>
          </button>
          
          <button
            onClick={() => setShowTemplates(true)}
            className="p-4 bg-gradient-to-br from-orange-500/20 to-red-500/20 border border-orange-500/30 hover:border-orange-400 rounded-xl transition-all active:scale-95 text-left"
          >
            <Box className="w-8 h-8 text-orange-400 mb-2" />
            <h3 className="font-semibold text-white">Project Templates</h3>
            <p className="text-xs text-gray-400">CAD, robotics, circuits</p>
          </button>
        </div>
      </div>

      {/* Premium Banner */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-gradient-to-r from-yellow-900/50 to-orange-900/50 rounded-2xl p-6 border border-yellow-500/30 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Star className="w-8 h-8 text-yellow-400" />
                <h2 className="text-2xl font-bold">Engineerium Pro</h2>
              </div>
              <p className="text-gray-300 mb-3">
                Unlock all {premiumToolsCount} premium tools and turn your browser into a professional engineering laboratory
              </p>
              <ul className="space-y-1 text-sm text-gray-300">
                <li className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  Advanced simulations and calculators
                </li>
                <li className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  AI-powered analysis and recommendations
                </li>
                <li className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  Export professional reports
                </li>
              </ul>
            </div>
            <button
              onClick={() => navigate('/pricing')}
              className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 rounded-lg font-bold text-black transition-all hover:scale-105"
            >
              Upgrade to Pro
            </button>
          </div>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => (
            <div
              key={tool.id}
              className={`group relative bg-gradient-to-br ${tool.categoryColor} rounded-xl p-6 border-2 border-white/20 hover:border-white/40 transition-all cursor-pointer hover:scale-105 ${
                tool.premium ? 'opacity-90' : ''
              }`}
              onClick={() => {
                if (tool.premium) {
                  navigate('/pricing');
                } else {
                  navigate(`/tools/${tool.id}`);
                }
              }}
            >
              {tool.premium && (
                <div className="absolute top-4 right-4 bg-yellow-500 text-black px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  <Lock className="w-3 h-3" />
                  PRO
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 rounded-xl transition-opacity" />
              
              <div className="relative z-10">
                {/* Icon and Category */}
                <div className="flex items-center justify-between mb-4">
                  <div className="text-4xl">{tool.categoryIcon}</div>
                  <span className="text-xs text-white/80 bg-white/20 px-2 py-1 rounded">
                    {tool.categoryName}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold mb-2 text-white">{tool.name}</h3>

                {/* Difficulty Badge */}
                <div className="mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${difficultyColors[tool.difficulty]}`}>
                    {tool.difficulty}
                  </span>
                </div>

                {/* Description */}
                <p className="text-white/90 text-sm mb-4">
                  {tool.description}
                </p>

                {/* Features */}
                <div className="space-y-1 mb-4">
                  {tool.features.slice(0, 3).map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-white/80">
                      <div className="w-1 h-1 bg-white/60 rounded-full" />
                      <span>{feature}</span>
                    </div>
                  ))}
                  {tool.features.length > 3 && (
                    <div className="text-xs text-white/60">
                      +{tool.features.length - 3} more features
                    </div>
                  )}
                </div>

                {/* CTA */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-white font-semibold text-sm">
                    <span>{tool.premium ? 'Upgrade to Use' : 'Open Tool'}</span>
                    <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTools.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold mb-2">No tools found</h3>
            <p className="text-gray-400">Try adjusting your filters</p>
          </div>
        )}
      </div>

      {/* Categories Overview */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-6">Tool Categories</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.keys(engineeringTools).map(catKey => {
            const category = engineeringTools[catKey];
            return (
              <div
                key={catKey}
                className={`bg-gradient-to-br ${category.color} rounded-xl p-6 border border-white/20 cursor-pointer hover:scale-105 transition-all`}
                onClick={() => setSelectedCategory(catKey)}
              >
                <div className="text-5xl mb-3">{category.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-white">{category.name}</h3>
                <p className="text-white/80 text-sm mb-3">
                  {category.tools.length} professional tools
                </p>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-white/70">
                    {category.tools.filter(t => !t.premium).length} free
                  </span>
                  <span className="text-white/50">•</span>
                  <span className="text-yellow-300">
                    {category.tools.filter(t => t.premium).length} premium
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modals */}
      <FormulaLibrary isOpen={showFormulas} onClose={() => setShowFormulas(false)} />
      <MiniQuiz isOpen={showQuiz} onClose={() => setShowQuiz(false)} />
      <ProjectTemplates isOpen={showTemplates} onClose={() => setShowTemplates(false)} />
      <EngineeringCalculators isOpen={showCalculators} onClose={() => setShowCalculators(false)} />
    </div>
  );
}
