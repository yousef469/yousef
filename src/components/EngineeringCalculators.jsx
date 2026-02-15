import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { X, Calculator, RotateCcw, Search, Lock, Crown } from 'lucide-react';
import { calculators } from '../data/calculatorsData';
import { useUsageLimits } from '../contexts/UsageLimitsContext';

const categories = [
  { id: 'all', name: 'All', icon: '📊' },
  { id: 'Mechanics', name: 'Mechanics', icon: '⚙️' },
  { id: 'Automotive', name: 'Automotive', icon: '🚗' },
  { id: 'Aerospace', name: 'Aerospace', icon: '🚀' },
  { id: 'Electrical', name: 'Electrical', icon: '⚡' },
  { id: 'Thermodynamics', name: 'Thermo', icon: '🔥' },
  { id: 'Fluids', name: 'Fluids', icon: '💧' },
  { id: 'Materials', name: 'Materials', icon: '🔧' },
];

export default function EngineeringCalculators({ isOpen, onClose }) {
  const [selectedCalc, setSelectedCalc] = useState(null);
  const [inputs, setInputs] = useState({});
  const [results, setResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { isCalculatorFree, isPremium } = useUsageLimits();
  const navigate = useNavigate();

  // Calculate which calculators are free (first 25%)
  const freeCalculatorCount = Math.ceil(calculators.length * 0.25);

  const selectCalculator = (calc, index) => {
    // Check if calculator is free
    const isFree = isCalculatorFree(index, calculators.length);
    if (!isFree) {
      // Show upgrade prompt
      return;
    }
    
    setSelectedCalc(calc);
    const defaultInputs = {};
    calc.inputs.forEach(input => {
      defaultInputs[input.id] = input.default;
    });
    setInputs(defaultInputs);
    setResults(calc.calculate(defaultInputs));
  };

  const updateInput = (id, value) => {
    const newInputs = { ...inputs, [id]: parseFloat(value) || 0 };
    setInputs(newInputs);
    if (selectedCalc) {
      setResults(selectedCalc.calculate(newInputs));
    }
  };

  const resetCalculator = () => {
    if (selectedCalc) {
      const defaultInputs = {};
      selectedCalc.inputs.forEach(input => {
        defaultInputs[input.id] = input.default;
      });
      setInputs(defaultInputs);
      setResults(selectedCalc.calculate(defaultInputs));
    }
  };

  const filteredCalculators = calculators.filter(calc => {
    const matchesSearch = calc.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || calc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (!isOpen) return null;

  return createPortal(
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-green-500/30 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-700 bg-gradient-to-r from-green-500/10 to-emerald-500/10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  Engineering Calculators
                  {isPremium && <Crown className="w-5 h-5 text-yellow-400" />}
                </h2>
                <p className="text-gray-400 text-sm">
                  {isPremium ? (
                    <span className="text-yellow-400">{calculators.length} calculators • Unlimited Access</span>
                  ) : (
                    <span>{freeCalculatorCount} free • {calculators.length - freeCalculatorCount} Pro</span>
                  )}
                </p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-700 rounded-lg">
              <X className="w-6 h-6 text-gray-400" />
            </button>
          </div>
          
          {!selectedCalc && (
            <>
              {/* Search */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search calculators..."
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-green-500"
                />
              </div>
              
              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      selectedCategory === cat.id
                        ? 'bg-green-500 text-white'
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
          {!selectedCalc ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {filteredCalculators.map((calc, index) => {
                const originalIndex = calculators.findIndex(c => c.id === calc.id);
                const isFree = isCalculatorFree(originalIndex, calculators.length);
                const isLocked = !isFree;
                
                return (
                  <button
                    key={calc.id}
                    onClick={() => isLocked ? navigate('/pricing') : selectCalculator(calc, originalIndex)}
                    className={`p-4 rounded-xl border transition-all hover:scale-[1.02] active:scale-[0.98] text-left relative ${
                      isLocked 
                        ? 'border-gray-600 bg-gray-800/50 opacity-75' 
                        : `border-gray-700 hover:border-green-500/50 bg-gradient-to-br ${calc.color} bg-opacity-10`
                    }`}
                  >
                    {isLocked && (
                      <div className="absolute top-2 right-2 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                        <Lock className="w-3 h-3 text-black" />
                      </div>
                    )}
                    <span className={`text-3xl block mb-2 ${isLocked ? 'opacity-50' : ''}`}>{calc.icon}</span>
                    <span className={`font-medium text-sm block ${isLocked ? 'text-gray-400' : 'text-white'}`}>{calc.name}</span>
                    <span className="text-gray-500 text-xs">{calc.category}</span>
                    {isLocked && (
                      <span className="text-yellow-500 text-xs block mt-1">Pro Only</span>
                    )}
                  </button>
                );
              })}
            </div>
          ) : (
            <div>
              {/* Back Button */}
              <button
                onClick={() => setSelectedCalc(null)}
                className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
              >
                ← Back to Calculators
              </button>

              {/* Calculator Header */}
              <div className={`bg-gradient-to-r ${selectedCalc.color} rounded-xl p-4 mb-6`}>
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{selectedCalc.icon}</span>
                  <div>
                    <h3 className="text-xl font-bold text-white">{selectedCalc.name}</h3>
                    <p className="text-white/80 font-mono text-sm">{selectedCalc.formula}</p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Inputs */}
                <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-white">Inputs</h4>
                    <button
                      onClick={resetCalculator}
                      className="p-2 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-white transition-colors"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="space-y-4">
                    {selectedCalc.inputs.map(input => (
                      <div key={input.id}>
                        <label className="block text-sm text-gray-400 mb-1">{input.label}</label>
                        <input
                          type="number"
                          value={inputs[input.id] || ''}
                          onChange={(e) => updateInput(input.id, e.target.value)}
                          className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-green-500"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Results */}
                <div className="bg-gray-800/50 border border-green-500/30 rounded-xl p-4">
                  <h4 className="font-semibold text-white mb-4">Results</h4>
                  <div className="space-y-3">
                    {results.map((result, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg">
                        <span className="text-gray-400">{result.label}</span>
                        <span className="font-mono text-lg text-green-400">
                          {result.value} <span className="text-gray-500 text-sm">{result.unit}</span>
                        </span>
                      </div>
                    ))}
                  </div>
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
