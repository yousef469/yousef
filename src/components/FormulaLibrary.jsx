import { useState } from 'react';
import { createPortal } from 'react-dom';
import { 
  X, Search, Copy, Check, BookOpen, Rocket, Car, Plane, 
  Zap, Settings, Calculator, ChevronDown, ChevronRight
} from 'lucide-react';
import { formulas } from '../data/formulasData';

export default function FormulaLibrary({ isOpen, onClose }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategory, setExpandedCategory] = useState('mechanics');
  const [copiedFormula, setCopiedFormula] = useState(null);

  const copyFormula = (formula) => {
    navigator.clipboard.writeText(formula);
    setCopiedFormula(formula);
    setTimeout(() => setCopiedFormula(null), 2000);
  };

  const filteredFormulas = () => {
    if (!searchQuery) return formulas;
    
    const filtered = {};
    Object.keys(formulas).forEach(cat => {
      const matchingFormulas = formulas[cat].formulas.filter(f => 
        f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.formula.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (matchingFormulas.length > 0) {
        filtered[cat] = { ...formulas[cat], formulas: matchingFormulas };
      }
    });
    return filtered;
  };

  if (!isOpen) return null;

  const displayFormulas = filteredFormulas();

  return createPortal(
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-cyan-500/30 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-700 bg-gradient-to-r from-cyan-500/10 to-blue-500/10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Formula Library</h2>
                <p className="text-gray-400 text-sm">Essential engineering formulas</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-700 rounded-lg">
              <X className="w-6 h-6 text-gray-400" />
            </button>
          </div>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search formulas..."
              className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {Object.keys(displayFormulas).length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <Calculator className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No formulas found</p>
            </div>
          ) : (
            <div className="space-y-4">
              {Object.keys(displayFormulas).map(catKey => {
                const category = displayFormulas[catKey];
                const isExpanded = expandedCategory === catKey || searchQuery;
                
                return (
                  <div key={catKey} className="border border-gray-700 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setExpandedCategory(isExpanded && !searchQuery ? null : catKey)}
                      className={`w-full flex items-center justify-between p-4 bg-gradient-to-r ${category.color} bg-opacity-20 hover:bg-opacity-30 transition-all`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{category.icon}</span>
                        <span className="font-semibold text-white">{category.name}</span>
                        <span className="text-sm text-gray-300 bg-white/10 px-2 py-0.5 rounded">
                          {category.formulas.length} formulas
                        </span>
                      </div>
                      {!searchQuery && (
                        isExpanded ? <ChevronDown className="w-5 h-5 text-gray-400" /> : <ChevronRight className="w-5 h-5 text-gray-400" />
                      )}
                    </button>
                    
                    {isExpanded && (
                      <div className="p-4 space-y-3 bg-gray-800/50">
                        {category.formulas.map((f, idx) => (
                          <div key={idx} className="bg-gray-900/50 border border-gray-700 rounded-lg p-4 hover:border-cyan-500/50 transition-all">
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="font-semibold text-white">{f.name}</h4>
                              <button
                                onClick={() => copyFormula(f.formula)}
                                className={`p-1.5 rounded transition-all ${
                                  copiedFormula === f.formula 
                                    ? 'bg-green-500 text-white' 
                                    : 'bg-gray-700 hover:bg-gray-600 text-gray-400'
                                }`}
                              >
                                {copiedFormula === f.formula ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                              </button>
                            </div>
                            <div className="bg-gray-800 rounded-lg px-4 py-3 mb-3 font-mono text-lg text-cyan-400">
                              {f.formula}
                            </div>
                            <p className="text-sm text-gray-400 mb-3">{f.description}</p>
                            <div className="flex flex-wrap gap-2">
                              {Object.entries(f.variables).map(([key, desc]) => (
                                <span key={key} className="text-xs bg-gray-700 px-2 py-1 rounded text-gray-300">
                                  <span className="text-cyan-400 font-mono">{key}</span> = {desc}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
