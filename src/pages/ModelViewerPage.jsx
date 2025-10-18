import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ModelList from '../components/ModelList';
import ThreeJSViewer from '../components/ThreeJSViewer';
const ModelViewerPage = () => {
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { category, id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Dynamically import all model data
    const loadModels = async () => {
      try {
        const carsModule = await import('../data/carsData');
        const planesModule = await import('../data/planesData');
        const rocketsModule = await import('../data/rocketsData');
        const enginesModule = await import('../data/enginesData');

        // Combine all models with their type
        const allModels = [
          ...carsModule.carModels.map(m => ({ ...m, type: 'Cars' })),
          ...planesModule.planeModels.map(m => ({ ...m, type: 'Planes' })),
          ...rocketsModule.rocketModels.map(m => ({ ...m, type: 'Rockets' })),
          ...enginesModule.engineModels.map(m => ({ ...m, type: 'Engines' }))
        ];

        setModels(allModels);
        
        // Set initial selected model based on URL params or first model
        if (id) {
          const model = allModels.find(m => m.id === id);
          if (model) {
            setSelectedModel(model);
          } else if (allModels.length > 0) {
            setSelectedModel(allModels[0]);
            navigate(`/models/${allModels[0].id}`, { replace: true });
          }
        } else if (allModels.length > 0) {
          setSelectedModel(allModels[0]);
          navigate(`/models/${allModels[0].id}`, { replace: true });
        }
      } catch (error) {
        console.error('Error loading models:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadModels();
  }, [id, navigate]);

  const handleModelSelect = (model) => {
    setSelectedModel(model);
    navigate(`/models/${model.id}`);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
      {/* Sidebar with model list */}
      <ModelList 
        models={models} 
        onModelSelect={handleModelSelect} 
        selectedModelId={selectedModel?.id} 
      />
      
      {/* Main content area - 3D Viewer */}
      <div className="flex-1 flex flex-col">
        {/* Compact header */}
        <header className="bg-gray-900/80 backdrop-blur-sm border-b border-gray-700/50 px-6 py-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-white">
                {selectedModel?.name || '3D Model Viewer'}
              </h1>
              {selectedModel && (
                <p className="text-xs text-gray-400 mt-0.5">
                  {selectedModel.description}
                </p>
              )}
            </div>
            
            {/* Controls hint */}
            <div className="text-xs text-gray-400 flex items-center gap-4">
              <span>🖱️ Drag to rotate</span>
              <span>🔍 Scroll to zoom</span>
            </div>
          </div>
        </header>
        
        {/* 3D Viewer - Full screen */}
        <main className="flex-1 relative bg-gradient-to-br from-gray-900 to-black">
          {selectedModel ? (
            <div className="absolute inset-0">
              <ThreeJSViewer 
                modelType={selectedModel.type.toLowerCase()}
                modelInfo={selectedModel}
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <p className="text-lg">No model selected</p>
              <p className="text-sm mt-2">Choose a model from the left sidebar</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ModelViewerPage;
