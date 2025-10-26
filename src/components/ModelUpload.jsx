import React, { useState, useRef } from 'react';
import { Upload, File, CheckCircle, XCircle, Loader2, Image, Info } from 'lucide-react';

const ModelUpload = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files) => {
    const validFiles = Array.from(files).filter(file => {
      const extension = file.name.split('.').pop().toLowerCase();
      return ['glb', 'gltf', 'obj', 'fbx', 'stl'].includes(extension);
    });

    if (validFiles.length === 0) {
      alert('Please upload valid 3D model files (.glb, .gltf, .obj, .fbx, .stl)');
      return;
    }

    setUploading(true);

    // Simulate upload process
    validFiles.forEach((file, index) => {
      setTimeout(() => {
        const newFile = {
          id: Date.now() + index,
          name: file.name,
          size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
          type: file.name.split('.').pop().toUpperCase(),
          status: 'success',
          uploadDate: new Date().toLocaleDateString(),
          thumbnail: URL.createObjectURL(file)
        };
        
        setUploadedFiles(prev => [...prev, newFile]);
        
        if (index === validFiles.length - 1) {
          setUploading(false);
        }
      }, 1000 * (index + 1));
    });
  };

  const removeFile = (id) => {
    setUploadedFiles(uploadedFiles.filter(file => file.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <Upload className="w-8 h-8 text-cyan-400" />
          <div>
            <h1 className="text-3xl font-bold">Upload 3D Models</h1>
            <p className="text-gray-400">Share your custom models with the community</p>
          </div>
        </div>

        {/* Upload Area */}
        <div
          className={`border-2 border-dashed rounded-2xl p-12 mb-8 transition-all ${
            dragActive 
              ? 'border-cyan-500 bg-cyan-500/10' 
              : 'border-gray-600 bg-gray-800/50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".glb,.gltf,.obj,.fbx,.stl"
            onChange={handleChange}
            className="hidden"
          />
          
          <div className="text-center">
            {uploading ? (
              <>
                <Loader2 className="w-16 h-16 text-cyan-400 mx-auto mb-4 animate-spin" />
                <p className="text-xl font-semibold mb-2">Uploading...</p>
                <p className="text-gray-400">Please wait while we process your files</p>
              </>
            ) : (
              <>
                <Upload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-xl font-semibold mb-2">Drag & Drop your 3D models here</p>
                <p className="text-gray-400 mb-4">or</p>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-lg font-semibold transition-all"
                >
                  Browse Files
                </button>
                <p className="text-sm text-gray-500 mt-4">
                  Supported formats: GLB, GLTF, OBJ, FBX, STL (Max 50MB per file)
                </p>
              </>
            )}
          </div>
        </div>

        {/* Guidelines */}
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-6 mb-8">
          <div className="flex items-start gap-3">
            <Info className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-semibold text-blue-400 mb-2">Upload Guidelines</h3>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Models should be optimized (under 50MB)</li>
                <li>• Include proper textures and materials</li>
                <li>• Provide accurate descriptions and tags</li>
                <li>• Ensure models are your own work or properly licensed</li>
                <li>• Educational content is prioritized</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Uploaded Files */}
        {uploadedFiles.length > 0 && (
          <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4">Your Uploads ({uploadedFiles.length})</h3>
            
            <div className="space-y-3">
              {uploadedFiles.map((file) => (
                <div 
                  key={file.id}
                  className="flex items-center gap-4 p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-all"
                >
                  <div className="w-16 h-16 bg-gray-600 rounded-lg flex items-center justify-center overflow-hidden">
                    {file.thumbnail ? (
                      <img src={file.thumbnail} alt={file.name} className="w-full h-full object-cover" />
                    ) : (
                      <File className="w-8 h-8 text-gray-400" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold">{file.name}</h4>
                      <span className="px-2 py-1 bg-cyan-500/20 text-cyan-400 rounded text-xs">
                        {file.type}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span>{file.size}</span>
                      <span>•</span>
                      <span>{file.uploadDate}</span>
                      {file.status === 'success' && (
                        <>
                          <span>•</span>
                          <span className="flex items-center gap-1 text-green-400">
                            <CheckCircle className="w-4 h-4" />
                            Uploaded
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-lg text-sm font-semibold transition-colors">
                      View
                    </button>
                    <button 
                      onClick={() => removeFile(file.id)}
                      className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-sm font-semibold transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex gap-3">
              <button className="flex-1 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-lg font-semibold transition-all">
                Publish All Models
              </button>
              <button className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold transition-colors">
                Save as Draft
              </button>
            </div>
          </div>
        )}

        {/* Community Models Preview */}
        <div className="mt-8 bg-gray-800/50 border border-gray-700 rounded-xl p-6">
          <h3 className="text-xl font-bold mb-4">Community Models</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-gray-700/50 rounded-lg p-4 hover:bg-gray-700 transition-all cursor-pointer">
                <div className="aspect-square bg-gray-600 rounded-lg mb-3 flex items-center justify-center">
                  <span className="text-4xl">🚀</span>
                </div>
                <p className="font-semibold text-sm mb-1">Custom Rocket {i}</p>
                <p className="text-xs text-gray-400">By User{i}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelUpload;
