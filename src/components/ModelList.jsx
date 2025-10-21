import React from 'react';
import { Rocket, Plane, Car, Cog } from 'lucide-react';

const ModelList = ({ models, onModelSelect, selectedModelId, categoryName }) => {
  const getIcon = (type) => {
    const iconType = type?.toLowerCase();
    if (iconType?.includes('rocket')) return Rocket;
    if (iconType?.includes('plane')) return Plane;
    if (iconType?.includes('car')) return Car;
    if (iconType?.includes('engine')) return Cog;
    return Car;
  };

  const getGradient = (type) => {
    const iconType = type?.toLowerCase();
    if (iconType?.includes('rocket')) return 'from-cyan-500 to-blue-600';
    if (iconType?.includes('plane')) return 'from-blue-500 to-indigo-600';
    if (iconType?.includes('car')) return 'from-orange-500 to-red-600';
    if (iconType?.includes('engine')) return 'from-purple-500 to-pink-600';
    return 'from-gray-500 to-gray-700';
  };

  const [searchQuery, setSearchQuery] = React.useState('');
  
  const filteredModels = models.filter(model =>
    model.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-96 h-full bg-gradient-to-b from-gray-900 to-gray-950 border-r border-gray-800 overflow-y-auto shadow-2xl">
      <div className="p-6">
        <div className="mb-6 pb-4 border-b border-gray-700">
          <h2 className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            {categoryName || 'Model Garage'}
          </h2>
          <p className="text-sm text-gray-400 mb-4">
            <span className="text-cyan-400 font-semibold">{models.length}</span> {models.length === 1 ? 'model' : 'models'} available
          </p>
          
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search models..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 pl-10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
            <span className="absolute left-3 top-2.5 text-gray-500">🔍</span>
          </div>
        </div>
        
        <div className="space-y-3">
          {filteredModels.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No models found</p>
              <p className="text-sm mt-2">Try a different search term</p>
            </div>
          ) : (
            filteredModels.map((model) => {
            const Icon = getIcon(model.type);
            const gradient = getGradient(model.type);
            const isSelected = selectedModelId === model.id;
            
            return (
              <div
                key={model.id}
                onClick={() => onModelSelect(model)}
                className={`group relative rounded-xl cursor-pointer transition-all duration-300 ${
                  isSelected
                    ? 'bg-gradient-to-r ' + gradient + ' shadow-lg scale-105'
                    : 'bg-gray-800/50 hover:bg-gray-800 hover:scale-102'
                }`}
              >
                {isSelected && (
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl blur-xl" />
                )}
                
                <div className="relative p-4">
                  <div className="flex items-center space-x-4">
                    {/* Thumbnail/Icon */}
                    <div className={`w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 ${
                      isSelected 
                        ? 'bg-white/20 backdrop-blur-sm' 
                        : 'bg-gradient-to-br ' + gradient
                    }`}>
                      {model.thumbnail ? (
                        <img
                          src={model.thumbnail}
                          alt={model.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Icon className={`w-10 h-10 ${isSelected ? 'text-white' : 'text-white/90'}`} />
                        </div>
                      )}
                    </div>
                    
                    {/* Model Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className={`font-bold text-sm mb-1 truncate ${
                        isSelected ? 'text-white' : 'text-gray-100 group-hover:text-white'
                      }`}>
                        {model.name}
                      </h3>
                      <p className={`text-xs mb-2 ${
                        isSelected ? 'text-white/80' : 'text-gray-400'
                      }`}>
                        {model.type}
                      </p>
                      
                      {/* Specs preview */}
                      {model.specs && model.specs.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {model.specs.slice(0, 2).map((spec, idx) => (
                            <span
                              key={idx}
                              className={`text-xs px-2 py-0.5 rounded ${
                                isSelected
                                  ? 'bg-white/20 text-white'
                                  : 'bg-gray-700/50 text-gray-300'
                              }`}
                            >
                              {spec.value}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    {/* Selection indicator */}
                    {isSelected && (
                      <div className="flex-shrink-0">
                        <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          }))}
        </div>
      </div>
    </div>
  );
};

export default ModelList;
