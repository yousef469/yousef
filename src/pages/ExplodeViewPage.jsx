import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, ArrowLeft, Loader2 } from 'lucide-react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import gsap from 'gsap';
import ExplodeViewControls from '../components/ExplodeViewControls';

export default function ExplodeViewPage() {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const controlsRef = useRef(null);
  const raycasterRef = useRef(new THREE.Raycaster());
  const mouseRef = useRef(new THREE.Vector2());
  const fileInputRef = useRef(null);

  // State
  const [parts, setParts] = useState([]);
  const [originalPositions, setOriginalPositions] = useState(new Map());
  const [isExploded, setIsExploded] = useState(false);
  const [selectedPart, setSelectedPart] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [modelLoaded, setModelLoaded] = useState(false);

  // Initialize Three.js scene
  useEffect(() => {
    if (!containerRef.current) return;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0e27);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      50,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(5, 3, 8);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controlsRef.current = controls;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight2.position.set(-5, 5, -5);
    scene.add(directionalLight2);

    // Grid helper
    const gridHelper = new THREE.GridHelper(20, 20, 0x00d9ff, 0x1a1f3a);
    scene.add(gridHelper);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

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
      renderer.dispose();
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Handle model upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsLoading(true);
    const url = URL.createObjectURL(file);
    const loader = new GLTFLoader();

    loader.load(
      url,
      (gltf) => {
        if (!gltf || !gltf.scene) {
          alert('Invalid model file. Please try another GLB/GLTF file.');
          setIsLoading(false);
          URL.revokeObjectURL(url);
          return;
        }

        // Clear previous model
        if (sceneRef.current) {
          const oldParts = sceneRef.current.children.filter(
            child => child.userData.isPart
          );
          oldParts.forEach(part => sceneRef.current.remove(part));
        }

        // Add model to scene first
        const model = gltf.scene;
        sceneRef.current.add(model);

        // Extract all meshes as separate parts
        const newParts = [];
        const positions = new Map();

        try {
          // Traverse the model to find all meshes
          model.traverse((child) => {
            if (child.isMesh) {
              child.userData.isPart = true;
              
              // Clone material safely
              if (child.material) {
                child.userData.originalMaterial = child.material.clone();
              } else {
                child.userData.originalMaterial = new THREE.MeshStandardMaterial({ color: 0x888888 });
              }
              
              // Save original world position
              const worldPos = new THREE.Vector3();
              child.getWorldPosition(worldPos);
              
              positions.set(child, {
                x: child.position.x,
                y: child.position.y,
                z: child.position.z
              });

              newParts.push(child);
            }
          });

          if (newParts.length === 0) {
            alert('No parts found in model. Make sure your model has separate meshes.');
            sceneRef.current.remove(model);
            setIsLoading(false);
            URL.revokeObjectURL(url);
            return;
          }

          setParts(newParts);
          setOriginalPositions(positions);
          setModelLoaded(true);
          setIsLoading(false);

          // Center camera on model
          const box = new THREE.Box3().setFromObject(model);
          const center = box.getCenter(new THREE.Vector3());
          const size = box.getSize(new THREE.Vector3());
          const maxDim = Math.max(size.x, size.y, size.z);
          const fov = cameraRef.current.fov * (Math.PI / 180);
          let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));
          cameraZ *= 2;

          cameraRef.current.position.set(center.x + cameraZ, center.y + cameraZ / 2, center.z + cameraZ);
          cameraRef.current.lookAt(center);
          controlsRef.current.target.copy(center);
          controlsRef.current.update();
        } catch (error) {
          console.error('Error processing model:', error);
          alert('Error processing model. Please try another file.');
          sceneRef.current.remove(model);
          setIsLoading(false);
        }

        URL.revokeObjectURL(url);
      },
      undefined,
      (error) => {
        console.error('Error loading model:', error);
        alert('Failed to load model. Please try another file.');
        setIsLoading(false);
      }
    );
  };

  // Explode view
  const handleExplode = () => {
    if (parts.length === 0) return;

    if (isExploded) {
      // Collapse back
      parts.forEach((part) => {
        const original = originalPositions.get(part);
        gsap.to(part.position, {
          x: original.x,
          y: original.y,
          z: original.z,
          duration: 1,
          ease: 'power2.inOut'
        });
      });
      setIsExploded(false);
    } else {
      // Explode outward
      const center = new THREE.Vector3();
      parts.forEach(part => {
        center.add(part.position);
      });
      center.divideScalar(parts.length);

      parts.forEach((part) => {
        const direction = new THREE.Vector3()
          .subVectors(part.position, center)
          .normalize();
        
        const distance = 3; // Explode distance
        
        gsap.to(part.position, {
          x: part.position.x + direction.x * distance,
          y: part.position.y + direction.y * distance,
          z: part.position.z + direction.z * distance,
          duration: 1,
          ease: 'power2.inOut'
        });
      });
      setIsExploded(true);
    }
  };

  // Reset all
  const handleReset = () => {
    parts.forEach((part) => {
      const original = originalPositions.get(part);
      gsap.to(part.position, {
        x: original.x,
        y: original.y,
        z: original.z,
        duration: 1,
        ease: 'power2.inOut'
      });

      // Reset material
      part.material = part.userData.originalMaterial.clone();
      part.material.transparent = false;
      part.material.opacity = 1;
    });
    setIsExploded(false);
    setSelectedPart(null);
  };

  // Handle click on part
  const handleClick = (event) => {
    if (!containerRef.current || parts.length === 0) return;

    const rect = containerRef.current.getBoundingClientRect();
    mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);
    const intersects = raycasterRef.current.intersectObjects(parts);

    if (intersects.length > 0) {
      const clickedPart = intersects[0].object;
      
      // Reset all parts
      parts.forEach(part => {
        part.material = part.userData.originalMaterial.clone();
        part.material.transparent = true;
        part.material.opacity = 0.3;
      });

      // Highlight selected part
      clickedPart.material = clickedPart.userData.originalMaterial.clone();
      clickedPart.material.emissive = new THREE.Color(0x00ffff);
      clickedPart.material.emissiveIntensity = 0.5;
      clickedPart.material.transparent = false;
      clickedPart.material.opacity = 1;

      setSelectedPart(clickedPart);
    }
  };

  // Focus on selected part
  const handleFocusSelected = () => {
    if (!selectedPart || !cameraRef.current || !controlsRef.current) return;

    const box = new THREE.Box3().setFromObject(selectedPart);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const fov = cameraRef.current.fov * (Math.PI / 180);
    let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));
    cameraZ *= 2.5;

    gsap.to(cameraRef.current.position, {
      x: center.x + cameraZ,
      y: center.y + cameraZ / 2,
      z: center.z + cameraZ,
      duration: 1.5,
      ease: 'power2.inOut',
      onUpdate: () => {
        cameraRef.current.lookAt(center);
      }
    });

    gsap.to(controlsRef.current.target, {
      x: center.x,
      y: center.y,
      z: center.z,
      duration: 1.5,
      ease: 'power2.inOut'
    });
  };

  return (
    <div className="h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="glass border-b border-primary/20 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-text-secondary hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
            <h1 className="text-2xl font-bold text-white">🔧 Explode View Mode</h1>
          </div>

          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-light text-black font-semibold rounded-lg transition-all disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Loading...</span>
              </>
            ) : (
              <>
                <Upload className="w-5 h-5" />
                <span>Upload Model</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* 3D Viewer */}
        <div 
          ref={containerRef} 
          onClick={handleClick}
          className="flex-1 cursor-pointer"
        />

        {/* Controls Sidebar */}
        {modelLoaded && (
          <div className="w-80 p-6 border-l border-primary/20 bg-background-dark">
            <ExplodeViewControls
              onExplode={handleExplode}
              onReset={handleReset}
              onFocusSelected={handleFocusSelected}
              isExploded={isExploded}
              hasSelection={!!selectedPart}
            />
          </div>
        )}

        {/* Empty State */}
        {!modelLoaded && !isLoading && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <Upload className="w-24 h-24 text-text-muted mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">No Model Loaded</h2>
              <p className="text-text-muted mb-6">Upload a GLB/GLTF file to get started</p>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="pointer-events-auto glow-primary bg-primary hover:bg-primary-light text-black font-semibold px-8 py-4 rounded-lg transition-all"
              >
                Upload 3D Model
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".glb,.gltf"
        onChange={handleFileUpload}
        className="hidden"
      />
    </div>
  );
}
