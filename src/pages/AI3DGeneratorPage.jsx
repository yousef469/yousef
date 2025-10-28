import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Wand2 } from 'lucide-react';
import AI3DGenerator from '../components/AI3DGenerator';

export default function AI3DGeneratorPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-gray-900/95 backdrop-blur border-b border-gray-700 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-400" />
            </button>
            <div className="flex items-center gap-3">
              <Wand2 className="w-6 h-6 text-purple-400" />
              <h1 className="text-2xl font-bold text-white">AI 3D Model Generator</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto p-6">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Create 3D Models with AI
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Transform your ideas into 3D models using cutting-edge AI technology. 
            Generate models from text descriptions or convert images into 3D objects.
          </p>
        </div>

        <AI3DGenerator />

        {/* Features Section */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
              <Wand2 className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Text to 3D</h3>
            <p className="text-sm text-gray-400">
              Describe any object and watch AI bring it to life in 3D. Perfect for rapid prototyping and creative exploration.
            </p>
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <div className="w-12 h-12 bg-pink-500/20 rounded-lg flex items-center justify-center mb-4">
              <Wand2 className="w-6 h-6 text-pink-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Image to 3D</h3>
            <p className="text-sm text-gray-400">
              Upload any image and convert it into a fully-formed 3D model. Great for recreating real-world objects.
            </p>
          </div>

          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-4">
              <Wand2 className="w-6 h-6 text-cyan-400" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Instant Export</h3>
            <p className="text-sm text-gray-400">
              Download your generated models in GLB format, ready to use in any 3D application or game engine.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
