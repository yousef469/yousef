import React from 'react';

const ModelList = ({ models, onModelSelect, selectedModelId }) => {
  return (
    <div className="w-64 h-full bg-gray-900 border-r border-gray-800 overflow-y-auto">
      <div className="p-4">
        <h2 className="text-xl font-bold text-white mb-4">Model Library</h2>
        <div className="space-y-2">
          {models.map((model) => (
            <div
              key={model.id}
              onClick={() => onModelSelect(model)}
              className={`p-3 rounded-lg cursor-pointer transition-colors ${
                selectedModelId === model.id
                  ? 'bg-blue-600/20 border border-blue-500/50'
                  : 'hover:bg-gray-800/50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-800 rounded-md overflow-hidden">
                  {model.thumbnail ? (
                    <img
                      src={model.thumbnail}
                      alt={model.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-700 text-gray-400">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  )}
                </div>
                <div>
                  <h3 className="font-medium text-white">{model.name}</h3>
                  <p className="text-xs text-gray-400">{model.type}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModelList;
