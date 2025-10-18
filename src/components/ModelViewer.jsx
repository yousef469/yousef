import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { X, Loader2, MousePointer, ZoomIn, Info, RotateCw } from 'lucide-react';

const ModelViewer = ({ model, onClose }) => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const meshRef = useRef(null);
  const animationFrameRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, isDragging: false, lastX: 0, lastY: 0 });
  const rotationRef = useRef({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f0f1a);
    scene.fog = new THREE.Fog(0x0f0f1a, 10, 50);
    sceneRef.current = scene;

    // Camera setup - adjusted based on model type
    const camera = new THREE.PerspectiveCamera(
      60,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    
    // Set camera position based on model type
    if (model.type === 'glb') {
      if (model.path.includes('falcon9-engine')) {
        camera.position.set(0, 1, 8);
      } else if (model.path.includes('falcon9') || model.path.includes('falcon-heavy') || model.path.includes('saturn-v') || model.path.includes('space-shuttle')) {
        camera.position.set(0, 2, 15);
      } else if (model.path.includes('porsche') || model.path.includes('bmw') || model.path.includes('ford')) {
        camera.position.set(0, 1, 10);
      } else if (model.path.includes('f22-raptor')) {
        camera.position.set(0, 0, 12);
      } else if (model.path.includes('f16')) {
        camera.position.set(0, 0, 15);
      } else if (model.path.includes('mig29')) {
        camera.position.set(0, 0, 15);
      } else if (model.path.includes('plane')) {
        camera.position.set(0, 0, 12);
      }
    } else {
      camera.position.set(0, 2, 8);
    }
    
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Renderer setup with better quality
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Professional Lighting Setup - Brighter for better visibility
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);
    
    // Main key light - brighter
    const mainLight = new THREE.DirectionalLight(0xffffff, 2.0);
    mainLight.position.set(10, 10, 10);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 2048;
    mainLight.shadow.mapSize.height = 2048;
    mainLight.shadow.camera.near = 0.5;
    mainLight.shadow.camera.far = 50;
    mainLight.shadow.camera.left = -20;
    mainLight.shadow.camera.right = 20;
    mainLight.shadow.camera.top = 20;
    mainLight.shadow.camera.bottom = -20;
    scene.add(mainLight);

    // Fill light - brighter
    const fillLight = new THREE.DirectionalLight(0x8899ff, 1.0);
    fillLight.position.set(-10, 5, -5);
    scene.add(fillLight);

    // Rim/back light - brighter
    const rimLight = new THREE.DirectionalLight(0xffffff, 1.2);
    rimLight.position.set(0, 5, -10);
    scene.add(rimLight);
    
    // Hemisphere light for better ambient
    const hemiLight = new THREE.HemisphereLight(0xaabbff, 0x556677, 0.8);
    scene.add(hemiLight);
    
    // Additional side lights for cars
    const sideLight1 = new THREE.PointLight(0xffffff, 1.0, 50);
    sideLight1.position.set(15, 3, 0);
    scene.add(sideLight1);
    
    const sideLight2 = new THREE.PointLight(0xffffff, 1.0, 50);
    sideLight2.position.set(-15, 3, 0);
    scene.add(sideLight2);

    // Load model
    const loader = new GLTFLoader();
    
    if (model.type === 'glb') {
      loader.load(
        model.path,
        (gltf) => {
          const loadedModel = gltf.scene;
          
          // Create a wrapper group to ensure proper rotation
          const modelGroup = new THREE.Group();
          
          // Apply scale to the loaded model
          loadedModel.scale.set(model.scale, model.scale, model.scale);
          
          // Update world matrix to ensure accurate bounding box
          loadedModel.updateMatrixWorld(true);
          
          // Calculate center for proper rotation
          const box = new THREE.Box3().setFromObject(loadedModel);
          const center = box.getCenter(new THREE.Vector3());
          
          // Move model so its center is at origin (0,0,0)
          loadedModel.position.set(-center.x, -center.y, -center.z);
          
          // Enhance materials for realistic look
          loadedModel.traverse((child) => {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
              
              if (child.material) {
                if (Array.isArray(child.material)) {
                  child.material.forEach(mat => {
                    mat.metalness = Math.max(mat.metalness || 0, 0.3);
                    mat.roughness = Math.min(mat.roughness || 1, 0.7);
                    mat.envMapIntensity = 1.0;
                  });
                } else {
                  child.material.metalness = Math.max(child.material.metalness || 0, 0.3);
                  child.material.roughness = Math.min(child.material.roughness || 1, 0.7);
                  child.material.envMapIntensity = 1.0;
                }
              }
            }
          });
          
          // Add the model to the group
          modelGroup.add(loadedModel);
          
          // Add the group to the scene and use it for rotation
          scene.add(modelGroup);
          meshRef.current = modelGroup;
          setIsLoading(false);
        },
        (progress) => {
          const percent = (progress.loaded / progress.total) * 100;
          setLoadProgress(Math.round(percent));
        },
        (error) => {
          console.error('Error loading model:', error);
          setIsLoading(false);
        }
      );
    } else {
      // Load procedural rocket model
      const createRocket = () => {
        const group = new THREE.Group();
        
        const whitePaint = new THREE.MeshStandardMaterial({
          color: 0xfafafa,
          metalness: 0.3,
          roughness: 0.25,
          envMapIntensity: 0.8
        });
        
        // Fairing
        const fairing = new THREE.Mesh(
          new THREE.CylinderGeometry(0.45, 0.45, 1.5, 64),
          whitePaint
        );
        fairing.position.y = 6.25;
        fairing.castShadow = true;
        group.add(fairing);
        
        // Nose cone
        const noseCone = new THREE.Mesh(
          new THREE.ConeGeometry(0.45, 1.5, 64),
          whitePaint
        );
        noseCone.position.y = 7.75;
        noseCone.castShadow = true;
        group.add(noseCone);
        
        // Body
        const body = new THREE.Mesh(
          new THREE.CylinderGeometry(0.45, 0.45, 5, 64),
          whitePaint
        );
        body.position.y = 3.5;
        body.castShadow = true;
        group.add(body);
        
        return group;
      };
      
      const rocketModel = createRocket();
      scene.add(rocketModel);
      meshRef.current = rocketModel;
      setIsLoading(false);
    }

    // No ground plane - allows viewing from all angles

    // Animation loop
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      
      if (meshRef.current) {
        meshRef.current.rotation.x = rotationRef.current.x;
        meshRef.current.rotation.y = rotationRef.current.y;
        
        if (!mouseRef.current.isDragging) {
          rotationRef.current.y += 0.003;
        }
      }

      renderer.render(scene, camera);
    };
    animate();

    // Mouse controls
    const handleMouseDown = (e) => {
      mouseRef.current.isDragging = true;
      mouseRef.current.lastX = e.clientX;
      mouseRef.current.lastY = e.clientY;
    };

    const handleMouseMove = (e) => {
      if (!mouseRef.current.isDragging) return;
      
      const deltaX = e.clientX - mouseRef.current.lastX;
      const deltaY = e.clientY - mouseRef.current.lastY;
      
      rotationRef.current.y += deltaX * 0.01;
      rotationRef.current.x += deltaY * 0.01;
      
      // No rotation limits - can rotate freely to see all angles including bottom
      
      mouseRef.current.lastX = e.clientX;
      mouseRef.current.lastY = e.clientY;
    };

    const handleMouseUp = () => {
      mouseRef.current.isDragging = false;
    };

    const handleWheel = (e) => {
      e.preventDefault();
      const camera = cameraRef.current;
      const zoomSpeed = 0.5;
      const direction = new THREE.Vector3();
      camera.getWorldDirection(direction);
      
      const minDistance = 5;
      const maxDistance = 40;
      const currentDistance = camera.position.length();
      
      if (e.deltaY < 0 && currentDistance > minDistance) {
        camera.position.addScaledVector(direction, zoomSpeed);
      } else if (e.deltaY > 0 && currentDistance < maxDistance) {
        camera.position.addScaledVector(direction, -zoomSpeed);
      }
    };

    renderer.domElement.addEventListener('mousedown', handleMouseDown);
    renderer.domElement.addEventListener('mousemove', handleMouseMove);
    renderer.domElement.addEventListener('mouseup', handleMouseUp);
    renderer.domElement.addEventListener('wheel', handleWheel);

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('mousedown', handleMouseDown);
      renderer.domElement.removeEventListener('mousemove', handleMouseMove);
      renderer.domElement.removeEventListener('mouseup', handleMouseUp);
      renderer.domElement.removeEventListener('wheel', handleWheel);

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }

      scene.traverse((object) => {
        if (object.geometry) {
          object.geometry.dispose();
        }
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });

      renderer.dispose();
    };
  }, [model]);

  return (
    <div className="fixed inset-0 z-50 bg-gray-950">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-10 flex items-center justify-between p-4 bg-gray-900/95 backdrop-blur border-b border-gray-700">
        <h2 className="text-xl font-bold text-white">{model.name}</h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      {/* Main Content */}
      <div className="flex h-screen pt-16">
        {/* Info Panel - LEFT */}
        <div className="w-2/5 bg-gray-900 p-8 overflow-y-auto border-r border-gray-700">
          <h3 className="text-2xl font-bold text-white mb-4">{model.name}</h3>
          <p className="text-gray-300 mb-8 text-lg">{model.description}</p>
          
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold text-cyan-400 mb-4">Key Components</h4>
              <ul className="space-y-3">
                {model.components.map((component, index) => (
                  <li key={index} className="flex items-start gap-3 bg-gray-800/50 p-3 rounded-lg">
                    <Info className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="text-white font-semibold block">{component.name}</span>
                      <span className="text-gray-400 text-sm">{component.description}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-cyan-400 mb-4">Specifications</h4>
              <div className="grid grid-cols-2 gap-3">
                {model.specs.map((spec, index) => (
                  <div key={index} className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                    <div className="text-xs text-gray-500 uppercase tracking-wide">{spec.label}</div>
                    <div className="text-lg text-white font-bold mt-1">{spec.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 3D Viewer - RIGHT */}
        <div className="w-3/5 relative bg-gradient-to-br from-gray-900 to-black">
          <div ref={containerRef} className="w-full h-full" />

          {/* Loading Indicator */}
          {isLoading && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70">
              <Loader2 className="w-12 h-12 text-cyan-400 animate-spin mb-4" />
              <span className="text-white text-lg mb-2">Loading 3D Model...</span>
              <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-cyan-400 transition-all duration-300"
                  style={{ width: `${loadProgress}%` }}
                />
              </div>
              <span className="text-gray-400 text-sm mt-2">{loadProgress}%</span>
            </div>
          )}

          {/* Controls Help */}
          <div className="absolute bottom-6 right-6 bg-gray-800/90 backdrop-blur p-4 rounded-lg border border-gray-700">
            <div className="flex flex-col gap-3 text-sm text-gray-300">
              <div className="flex items-center gap-2">
                <MousePointer className="w-5 h-5 text-cyan-400" />
                <span>Drag to rotate</span>
              </div>
              <div className="flex items-center gap-2">
                <ZoomIn className="w-5 h-5 text-cyan-400" />
                <span>Scroll to zoom</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCw className="w-5 h-5 text-cyan-400" />
                <span>Auto-rotate when idle</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelViewer;
