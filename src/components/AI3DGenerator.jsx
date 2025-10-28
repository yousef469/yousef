import { useState } from 'react';
import { Wand2, Upload, Image, Type, Download, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import ThreeJSViewer from './ThreeJSViewer';

export default function AI3DGenerator() {
  const [mode, setMode] = useState('text'); // 'text' or 'image'
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

  // Generate 3D model using local Python backend
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
      // Check if backend is running
      const BACKEND_URL = 'https://yousef-ai-backend.onrender.com';
      
      try {
        const healthCheck = await fetch(`${BACKEND_URL}/health`);
        if (!healthCheck.ok) {
          throw new Error('Backend not responding');
        }
      } catch (e) {
        setError('Backend not running. Please start the Python backend first. See AI_BACKEND_SETUP.md for instructions.');
        setIsGenerating(false);
        return;
      }

      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 5, 90));
      }, 1000);

      // Prepare form data
      const formData = new FormData();
      formData.append('mode', mode);
      
      if (mode === 'text') {
        formData.append('prompt', textPrompt);
        formData.append('model', 'triposr');
      } else {
        formData.append('image', imageFile);
        formData.append('model', 'triposr'); // or 'trellis' for higher quality
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
        type: 'generated',
        path: url,
        timestamp: new Date().toISOString(),
        blob: blob, // Store blob for download
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
    
    // Create download link
    const link = document.createElement('a');
    link.href = generatedModel.path;
    link.download = `ai-generated-${Date.now()}.glb`;
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
            <p className="text-sm text-gray-400">Powered by TripoSR & TRELLIS</p>
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
            <Type className="w-4 h-4" />
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
        {/* Input Section */}
        {mode === 'text' ? (
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
            
            {/* Example Prompts */}
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="text-xs text-gray-500">Quick examples:</span>
              {[
                'Modern sports car',
                'Medieval castle',
                'Futuristic robot',
                'Ancient temple'
              ].map((example) => (
                <button
                  key={example}
                  onClick={() => setTextPrompt(example)}
                  disabled={isGenerating}
                  className="text-xs px-3 py-1 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 rounded-full text-gray-400 transition-colors"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        ) : (
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
                <span className="font-semibold text-white">Generated:</span> {new Date(generatedModel.timestamp).toLocaleString()}
              </p>
            </div>
          </div>
        )}

        {/* Setup Instructions */}
        {!generatedModel && !isGenerating && (
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
            <h4 className="text-sm font-semibold text-blue-400 mb-2">🚀 Backend Setup</h4>
            <p className="text-xs text-gray-400 mb-2">
              To generate 3D models, start the Python backend:
            </p>
            <ol className="text-xs text-gray-400 space-y-1 ml-4 list-decimal">
              <li>Open terminal in <code className="bg-gray-800 px-1 py-0.5 rounded">ai-backend</code> folder</li>
              <li>Activate venv: <code className="bg-gray-800 px-1 py-0.5 rounded">venv\Scripts\activate</code></li>
              <li>Run: <code className="bg-gray-800 px-1 py-0.5 rounded">python app.py</code></li>
              <li>See <code className="bg-gray-800 px-1 py-0.5 rounded">AI_BACKEND_SETUP.md</code> for full setup guide</li>
            </ol>
            <p className="text-xs text-gray-500 mt-2">
              Backend should run on <span className="text-cyan-400">http://localhost:5000</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
