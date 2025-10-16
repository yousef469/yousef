import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plane } from 'lucide-react';
import ModelViewer from '../components/ModelViewer';
import { planeModels } from '../data/planesData';

const PlanesPage = () => {
  const navigate = useNavigate();
  const [selectedModel, setSelectedModel] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Header */}
      <header className="border-b border-gray-700 bg-gray-900/95 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <Plane className="w-6 h-6 text-blue-400" />
            <h1 className="text-2xl font-bold">Aircraft Models</h1>
          </div>
        </div>
      </header>

      {selectedModel ? (
        <ModelViewer
          model={selectedModel}
          onClose={() => setSelectedModel(null)}
        />
      ) : (
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">Select an Aircraft Model</h2>
            <p className="text-gray-400">Explore our collection of aviation models</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {planeModels.map((model) => (
              <div
                key={model.id}
                onClick={() => setSelectedModel(model)}
                className="group bg-gray-800/50 backdrop-blur rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-all cursor-pointer hover:scale-105"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Plane className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
                      {model.name}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4">{model.description}</p>
                    
                    <div className="flex gap-2 flex-wrap">
                      {model.specs.slice(0, 3).map((spec, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-gray-700/50 rounded-full text-xs text-gray-300"
                        >
                          {spec.label}: {spec.value}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 flex items-center text-blue-400 font-semibold group-hover:gap-3 gap-2 transition-all">
                  <span>View in 3D</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PlanesPage;
