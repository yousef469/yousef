import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ModelList from '../components/ModelList';
import ThreeJSViewer from '../components/ThreeJSViewer';
// Combine all models from different categories
const combineModels = (categories) => {
  return Object.values(categories).flatMap(category => 
    category.map(item => ({
      ...item,
      type: category.title
    }))
  );
};

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

        const allModels = combineModels({
          cars: { title: 'Cars', ...carsModule },
          planes: { title: 'Planes', ...planesModule },
          rockets: { title: 'Rockets', ...rocketsModule },
          engines: { title: 'Engines', ...enginesModule }
        });

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
    <div className="flex h-screen bg-gray-900 text-white overflow-hidden">
      {/* Sidebar with model list */}
      <ModelList 
        models={models} 
        onModelSelect={handleModelSelect} 
        selectedModelId={selectedModel?.id} 
      />
      
      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        <header className="bg-gray-800/50 border-b border-gray-700 p-4">
          <h1 className="text-2xl font-bold">
            {selectedModel?.name || '3D Model Viewer'}
          </h1>
          {selectedModel && (
            <p className="text-sm text-gray-400">
              {selectedModel.type} • {selectedModel.description}
            </p>
          )}
        </header>
        
        <main className="flex-1 relative">
          {selectedModel ? (
            <div className="absolute inset-0">
              <ThreeJSViewer 
                modelType={selectedModel.type.toLowerCase()}
                modelInfo={selectedModel}
              />
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              <p>No model selected</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ModelViewerPage;
