import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { BookOpen, Zap } from 'lucide-react';
import ModelList from '../components/ModelList';
import ThreeJSViewer from '../components/ThreeJSViewer';
import LessonsModal from '../components/LessonsModal';
import NozzlePlayground from '../components/NozzlePlayground';

const ModelViewerPage = () => {
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showLessons, setShowLessons] = useState(false);
  const [nozzleParams, setNozzleParams] = useState({
    expansionRatio: 10,
    ambientPressure: 101325,
    throttle: 1.0
  });
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get category from URL path
  const getCategoryFromPath = () => {
    if (location.pathname.includes('/cars')) return 'Cars';
    if (location.pathname.includes('/planes')) return 'Planes';
    if (location.pathname.includes('/rockets')) return 'Rockets';
    if (location.pathname.includes('/engines')) return 'Engines';
    return 'All Models';
  };
  
  const currentCategory = getCategoryFromPath();

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
          ...carsModule.carModels.map(m => ({ ...m, type: 'Cars', category: 'cars' })),
          ...planesModule.planeModels.map(m => ({ ...m, type: 'Planes', category: 'planes' })),
          ...rocketsModule.rocketModels.map(m => ({ ...m, type: 'Rockets', category: 'rockets' })),
          ...enginesModule.engineModels.map(m => ({ ...m, type: 'Engines', category: 'engines' }))
        ];

        // Filter models based on current route
        let filteredModels = allModels;
        if (location.pathname.includes('/cars')) {
          filteredModels = allModels.filter(m => m.category === 'cars');
        } else if (location.pathname.includes('/planes')) {
          filteredModels = allModels.filter(m => m.category === 'planes');
        } else if (location.pathname.includes('/rockets')) {
          filteredModels = allModels.filter(m => m.category === 'rockets');
        } else if (location.pathname.includes('/engines')) {
          filteredModels = allModels.filter(m => m.category === 'engines');
        }

        setModels(filteredModels);
        
        // Set initial selected model based on URL params or first filtered model
        if (id) {
          const model = filteredModels.find(m => m.id === id);
          if (model) {
            setSelectedModel(model);
          } else if (filteredModels.length > 0) {
            setSelectedModel(filteredModels[0]);
          }
        } else if (filteredModels.length > 0) {
          setSelectedModel(filteredModels[0]);
        }
      } catch (error) {
        console.error('Error loading models:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadModels();
  }, [id, navigate, location.pathname]);

  const handleModelSelect = (model) => {
    setSelectedModel(model);
    // Don't navigate - just update the selected model
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
        categoryName={currentCategory}
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
                  {selectedModel.type} • {selectedModel.description}
                </p>
              )}
            </div>
            
            {/* Controls and Lessons Button */}
            <div className="flex items-center gap-4">
              <div className="text-xs text-gray-400 flex items-center gap-4">
                <span>🖱️ Drag to rotate</span>
                <span>🔍 Scroll to zoom</span>
              </div>
              <button
                onClick={() => setShowLessons(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-sm font-medium"
              >
                <BookOpen className="w-4 h-4" />
                <span>Lessons</span>
              </button>
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
                nozzleParams={nozzleParams}
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

      {/* Lessons Modal */}
      <LessonsModal isOpen={showLessons} onClose={() => setShowLessons(false)} />
    </div>
  );
};

export default ModelViewerPage;
