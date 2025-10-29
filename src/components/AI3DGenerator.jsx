import { useState } from 'react';
import { Wand2, Upload, Image, Download, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import ThreeJSViewer from './ThreeJSViewer';

export default function AI3DGenerator() {
  const [mode, setMode] = useState('text'); // 'text' or 'image'
  const [modelChoice, setModelChoice] = useState('triposr'); // 'triposr' or 'trellis'
  const [textPrompt, setTextPrompt] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedModel, setGeneratedModel] = useState(null);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);

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
        setProgress(prev => Math.min(prev + 3, 90));
      }, 2000);

      // Prepare form data
      const formData = new FormData();
      formData.append('mode', mode);
      formData.append('model', modelChoice);
      
      if (mode === 'text') {
        formData.append('prompt', textPrompt);
      } else {
        formData.append('image', imageFile);
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
        name: mode === 'text' ? textPrompt : 'Generated from image',
        type: 'ai',
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
            <p className="text-sm text-gray-400">Powered by Replicate - Choose your quality level</p>
          </div>
        </div>
        
        {/* Mode Selector */}
        <div className="flex gap-3 mt-4">
          <button
            onClick={() => setMode('text')}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all ${
              mode === 'text'
                ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            Text to 3D
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
            Image to 3D
          </button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Model Quality Selector */}
        <div className="bg-gray-800 rounded-lg p-4">
          <label className="block text-sm font-semibold text-gray-300 mb-3">Choose Quality</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setModelChoice('triposr')}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                modelChoice === 'triposr'
                  ? 'border-green-500 bg-green-500/10'
                  : 'border-gray-600 bg-gray-700 hover:border-gray-500'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-white">TripoSR</span>
                <span className="text-xs bg-green-500 text-white px-2 py-1 rounded">Fast</span>
              </div>
              <p className="text-xs text-gray-400 mb-1">Good quality, 30-60 sec</p>
              <p className="text-xs font-semibold text-green-400">~$0.01 per model</p>
            </button>
            
            <button
              onClick={() => setModelChoice('trellis')}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                modelChoice === 'trellis'
                  ? 'border-purple-500 bg-purple-500/10'
                  : 'border-gray-600 bg-gray-700 hover:border-gray-500'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-white">TRELLIS</span>
                <span className="text-xs bg-purple-500 text-white px-2 py-1 rounded">Best</span>
              </div>
              <p className="text-xs text-gray-400 mb-1">Highest quality, 2-3 min</p>
              <p className="text-xs font-semibold text-purple-400">~$0.05 per model</p>
            </button>
          </div>
        </div>

        {/* AI Text Mode */}
        {mode === 'text' && (
          <div className="space-y-4">
            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3">
              <p className="text-sm text-purple-400">🎨 AI-powered 3D generation from text</p>
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
              <p className="text-sm text-purple-400">📸 Turn any image into 3D</p>
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
                <span className="font-semibold text-white">Model:</span> {modelChoice === 'trellis' ? 'TRELLIS (Best Quality)' : 'TripoSR (Fast)'}
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
