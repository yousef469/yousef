import React, { useState, useRef } from 'react';
import { Upload, XCircle, Loader2, Info } from 'lucide-react';

const ModelUploadModal = ({ onUpload, onClose }) => {
    const [uploading, setUploading] = useState(false);
    const [dragActive, setDragActive] = useState(false);
    const [error, setError] = useState(null);
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

    const handleFiles = async (files) => {
        const file = files[0];
        const extension = file.name.split('.').pop().toLowerCase();

        if (!['glb', 'gltf'].includes(extension)) {
            setError('Please upload valid 3D model files (.glb, .gltf)');
            return;
        }

        if (file.size > 50 * 1024 * 1024) {
            setError('File size must be under 50MB');
            return;
        }

        setError(null);
        setUploading(true);

        try {
            await onUpload(file);
            if (onClose) onClose();
        } catch (err) {
            console.error(err);
            setError('Failed to upload model. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="relative w-full max-w-2xl bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl overflow-hidden">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white rounded-full hover:bg-gray-800 transition-colors"
                >
                    <XCircle className="w-6 h-6" />
                </button>

                <div className="p-8">
                    {/* Header */}
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-3 bg-cyan-500/10 rounded-xl">
                            <Upload className="w-8 h-8 text-cyan-400" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-white">Upload 3D Model</h1>
                            <p className="text-gray-400">Supported formats: GLB, GLTF (Max 50MB)</p>
                        </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400">
                            <XCircle className="w-5 h-5 flex-shrink-0" />
                            <p>{error}</p>
                        </div>
                    )}

                    {/* Upload Area */}
                    <div
                        className={`border-2 border-dashed rounded-2xl p-12 transition-all ${dragActive
                                ? 'border-cyan-500 bg-cyan-500/10'
                                : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                            }`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                    >
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept=".glb,.gltf"
                            onChange={handleChange}
                            className="hidden"
                        />

                        <div className="text-center">
                            {uploading ? (
                                <div className="py-8">
                                    <Loader2 className="w-16 h-16 text-cyan-400 mx-auto mb-6 animate-spin" />
                                    <p className="text-xl font-semibold text-white mb-2">Uploading Model...</p>
                                    <p className="text-gray-400">This may take a moment depending on your connection</p>
                                </div>
                            ) : (
                                <div className="py-4">
                                    <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <Upload className="w-10 h-10 text-gray-400" />
                                    </div>
                                    <p className="text-xl font-semibold text-white mb-3">Drag & Drop your 3D model</p>
                                    <p className="text-gray-400 mb-8">or</p>
                                    <button
                                        onClick={() => fileInputRef.current?.click()}
                                        className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-xl font-semibold transition-all shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40"
                                    >
                                        Browse Files
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Guidelines */}
                    <div className="mt-8 flex items-start gap-3 text-sm text-gray-500 bg-gray-800/50 p-4 rounded-xl border border-gray-700/50">
                        <Info className="w-5 h-5 flex-shrink-0 mt-0.5 text-blue-400" />
                        <p>
                            For the best experience, ensure your model is centered at the origin (0,0,0) and has a reasonable scale.
                            Textures should be embedded in the GLB file.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModelUploadModal;
