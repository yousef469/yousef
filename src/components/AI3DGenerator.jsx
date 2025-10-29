import { useState } from 'react';
import { Wand2, Upload, Image, Zap, Download, Loader2, Sparkles, AlertCircle, Rocket, Car, Plane } from 'lucide-react';
import ThreeJSViewer from './ThreeJSViewer';

export default function AI3DGenerator() {
  const [mode, setMode] = useState('quick'); // 'quick', 'text', or 'image'
  const [modelType, setModelType] = useState('rocket'); // 'rocket', 'car', 'plane'
  const [textPrompt, setTextPrompt] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedModel, setGeneratedModel] = useState(null);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);
  
  // Procedural parameters
  const [rocketParams, setRocketParams] = useState({ stages: 2, fins: 4, height: 10 });
  const [carParams, setCarParams] = useState({ style: 'sports', spoiler: true });
  const [planeParams, setPlaneParams] = useState({ wingspan: 10, engines: 2 });

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Generate 3D model
  const generateModel = async () => {
    if (mode === 'text' && !textPrompt.trim()) {
      setError('Please enter a text prompt');
      return;
    }
    if (mode === 'image' && !imageFile) {
      setError('Please upload an image');
      return;
    }

    setIsGenerating(true);
    setError(null);
    setProgress(0);

    try {
      const BACKEND_URL = 'https://name-ai-3d-backend.onrender.com';
      
      // Check backend health
      try {
        const healthCheck = await fetch(`${BACKEND_URL}/health`);
        if (!healthCheck.ok) throw new Error('Backend not responding');
      } catch (e) {
        setError('Backend not running. Please try again in a moment.');
        setIsGenerating(false);
        return;
      }

      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + (mode === 'quick' ? 20 : 5), 90));
      }, mode === 'quick' ? 100 : 1000);

      // Prepare form data
      const formData = new FormData();
      
      if (mode === 'quick') {
        // Procedural generation
        formData.append('type', 'procedural');
        formData.append('model_type', modelType);
        
        if (modelType === 'rocket') {
          formData.append('stages', rocketParams.stages);
          formData.append('fins', rocketParams.fins);
          formData.append('height', rocketParams.height);
        } else if (modelType === 'car') {
          formData.append('style', carParams.style);
          formData.append('spoiler', carParams.spoiler);
        } else if (modelType === 'plane') {
          formData.append('wingspan', planeParams.wingspan);
          formData.append('engines', planeParams.engines);
        }
      } else {
        // AI generation
        formData.append('type', 'ai');
        formData.append('mode', mode);
        
        if (mode === 'text') {
          formData.append('prompt', textPrompt);
        } else {
          formData.append('image', imageFile);
        }
      }

      // Call backend API
      const response = await fetch(`${BACKEND_URL}/generate-3d`, {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate model');
      }

      // Get the generated GLB file
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      
      setProgress(100);

      // Set generated model
      setGeneratedModel({
        name: mode === 'quick' ? `${modelType} (procedural)` : (mode === 'text' ? textPrompt : 'Generated from image'),
        type: mode === 'quick' ? 'procedural' : 'ai',
        path: url,
        timestamp: new Date().toISOString(),
        blob: blob,
      });

      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to generate 3D model');
      console.error('Generation error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  // Download generated model
  const downloadModel = () => {
    if (!generatedModel) return;
    
    const link = document.createElement('a');
    link.href = generatedModel.path;
    link.download = `${generatedModel.type}-${Date.now()}.glb`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-gray-900 rounded-xl border border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-b border-gray-700 p-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
            <Wand2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">AI 3D Model Generator</h2>
            <p className="text-sm text-gray-400">Free procedural + Premium AI generation</p>
          </div>
        </div>
        
        {/* Mode Selector */}
        <div className="flex gap-3 mt-4">
          <button
            onClick={() => setMode('quick')}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all ${
              mode === 'quick'
                ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            <Zap className="w-4 h-4" />
            Quick Build (Free)
          </button>
          <button
            onClick={() => setMode('text')}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all ${
              mode === 'text'
                ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            AI Text-to-3D
          </button>
          <button
            onClick={() => setMode('image')}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all ${
              mode === 'image'
                ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            <Image className="w-4 h-4" />
            AI Image-to-3D
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Quick Build Mode */}
        {mode === 'quick' && (
          <div className="space-y-4">
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
              <p className="text-sm text-green-400">✨ Instant & Unlimited - Perfect for learning!</p>
            </div>
            
            {/* Model Type Selector */}
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Choose Model Type</label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => setModelType('rocket')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    modelType === 'rocket'
                      ? 'border-purple-500 bg-purple-500/10'
                      : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                  }`}
                >
                  <Rocket className="w-8 h-8 mx-auto mb-2 text-purple-400" />
                  <p className="text-sm font-semibold text-white">Rocket</p>
                </button>
                <button
                  onClick={() => setModelType('car')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    modelType === 'car'
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                  }`}
                >
                  <Car className="w-8 h-8 mx-auto mb-2 text-blue-400" />
                  <p className="text-sm font-semibold text-white">Car</p>
                </button>
                <button
                  onClick={() => setModelType('plane')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    modelType === 'plane'
                      ? 'border-cyan-500 bg-cyan-500/10'
                      : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                  }`}
                >
                  <Plane className="w-8 h-8 mx-auto mb-2 text-cyan-400" />
                  <p className="text-sm font-semibold text-white">Plane</p>
                </button>
              </div>
            </div>

            {/* Parameters */}
            {modelType === 'rocket' && (
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-gray-400">Stages: {rocketParams.stages}</label>
                  <input
                    type="range"
                    min="1"
                    max="4"
                    value={rocketParams.stages}
                    onChange={(e) => setRocketParams({...rocketParams, stages: parseInt(e.target.value)})}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400">Fins: {rocketParams.fins}</label>
                  <input
                    type="range"
                    min="3"
                    max="8"
                    value={rocketParams.fins}
                    onChange={(e) => setRocketParams({...rocketParams, fins: parseInt(e.target.value)})}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400">Height: {rocketParams.height}m</label>
                  <input
                    type="range"
                    min="5"
                    max="20"
                    value={rocketParams.height}
                    onChange={(e) => setRocketParams({...rocketParams, height: parseInt(e.target.value)})}
                    className="w-full"
                  />
                </div>
              </div>
            )}

            {modelType === 'car' && (
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-gray-400 block mb-2">Style</label>
                  <select
                    value={carParams.style}
                    onChange={(e) => setCarParams({...carParams, style: e.target.value})}
                    className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white"
                  >
                    <option value="sports">Sports</option>
                    <option value="suv">SUV</option>
                    <option value="sedan">Sedan</option>
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={carParams.spoiler}
                    onChange={(e) => setCarParams({...carParams, spoiler: e.target.checked})}
                    className="w-4 h-4"
                  />
                  <label className="text-sm text-gray-400">Add Spoiler</label>
                </div>
              </div>
            )}

            {modelType === 'plane' && (
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-gray-400">Wingspan: {planeParams.wingspan}m</label>
                  <input
                    type="range"
                    min="5"
                    max="20"
                    value={planeParams.wingspan}
                    onChange={(e) => setPlaneParams({...planeParams, wingspan: parseInt(e.target.value)})}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400">Engines: {planeParams.engines}</label>
                  <input
                    type="range"
                    min="1"
                    max="4"
                    value={planeParams.engines}
                    onChange={(e) => setPlaneParams({...planeParams, engines: parseInt(e.target.value)})}
                    className="w-full"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* AI Text Mode */}
        {mode === 'text' && (
          <div className="space-y-4">
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3">
              <p className="text-sm text-purple-400">🎨 AI-powered realistic models (2 free per day)</p>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Describe your 3D model
              </label>
              <textarea
                value={textPrompt}
                onChange={(e) => setTextPrompt(e.target.value)}
                placeholder="e.g., A futuristic spaceship with sleek design, metallic surface, and glowing blue engines"
                className="w-full h-32 bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 resize-none"
                disabled={isGenerating}
              />
            </div>
          </div>
        )}

        {/* AI Image Mode */}
        {mode === 'image' && (
          <div className="space-y-4">
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3">
              <p className="text-sm text-purple-400">📸 Turn any image into 3D (2 free per day)</p>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Upload an image
              </label>
              
              {!imagePreview ? (
                <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-purple-500 transition-colors bg-gray-800/50">
                  <Upload className="w-12 h-12 text-gray-500 mb-2" />
                  <span className="text-sm text-gray-400">Click to upload image</span>
                  <span className="text-xs text-gray-600 mt-1">PNG, JPG up to 10MB</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={isGenerating}
                  />
                </label>
              ) : (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Upload preview"
                    className="w-full h-48 object-contain bg-gray-800 rounded-lg"
                  />
                  <button
                    onClick={() => {
                      setImageFile(null);
                      setImagePreview(null);
                    }}
                    disabled={isGenerating}
                    className="absolute top-2 right-2 p-2 bg-red-500 hover:bg-red-600 disabled:opacity-50 rounded-lg transition-colors"
                  >
                    <AlertCircle className="w-4 h-4 text-white" />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Generate Button */}
        <button
          onClick={generateModel}
          disabled={isGenerating || (mode === 'text' && !textPrompt.trim()) || (mode === 'image' && !imageFile)}
          className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed rounded-lg font-bold text-lg transition-all"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Generating... {progress}%
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              Generate 3D Model
            </>
          )}
        </button>

        {/* Progress Bar */}
        {isGenerating && (
          <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-pink-600 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-yellow-500/10 border border-yellow-500/50 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-yellow-400">Note</p>
                <p className="text-sm text-yellow-300 mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Generated Model Preview */}
        {generatedModel && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">Generated Model</h3>
              <button
                onClick={downloadModel}
                className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg font-semibold transition-colors"
              >
                <Download className="w-4 h-4" />
                Download
              </button>
            </div>
            
            <div className="h-96 bg-gradient-to-br from-gray-900 to-black rounded-xl border border-gray-700 overflow-hidden">
              <ThreeJSViewer modelInfo={generatedModel} />
            </div>
            
            <div className="bg-gray-800/50 rounded-lg p-4">
              <p className="text-sm text-gray-400">
                <span className="font-semibold text-white">Model:</span> {generatedModel.name}
              </p>
              <p className="text-sm text-gray-400 mt-1">
                <span className="font-semibold text-white">Type:</span> {generatedModel.type === 'procedural' ? 'Procedural (Free)' : 'AI Generated (Premium)'}
              </p>
              <p className="text-sm text-gray-400 mt-1">
                <span className="font-semibold text-white">Generated:</span> {new Date(generatedModel.timestamp).toLocaleString()}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
