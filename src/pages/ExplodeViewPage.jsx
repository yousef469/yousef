import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, ArrowLeft, Loader2, Sparkles, DollarSign, Package } from 'lucide-react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import gsap from 'gsap';
import { generateResponse } from '../services/gemini';

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
  const [partsList, setPartsList] = useState([]);
  const [originalPositions, setOriginalPositions] = useState(new Map());
  const [explodeOffsets, setExplodeOffsets] = useState(new Map());
  const [isExploded, setIsExploded] = useState(false);
  const [selectedPart, setSelectedPart] = useState(null);
  const [partExplanations, setPartExplanations] = useState(new Map());
  const [loadingExplanation, setLoadingExplanation] = useState(false);
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

  // AI-powered part detection and explanation
  const generatePartExplanation = async (partName) => {
    if (partExplanations.has(partName)) {
      return partExplanations.get(partName);
    }

    setLoadingExplanation(true);
    try {
      const prompt = `You are an engineering expert. Analyze this mechanical part: "${partName}"

Provide a JSON response with:
{
  "purpose": "What this part does (1-2 sentences)",
  "material": "Typical material used (e.g., Aluminum, Steel, Titanium)",
  "cost": "Estimated cost range (e.g., $50-$200)",
  "tip": "One critical engineering insight or design consideration"
}

Be specific and technical. If the part name is generic, make reasonable engineering assumptions.`;

      const response = await generateResponse(prompt);
      
      // Parse AI response
      let explanation;
      try {
        const jsonMatch = response.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          explanation = JSON.parse(jsonMatch[0]);
        } else {
          throw new Error('No JSON found');
        }
      } catch {
        explanation = {
          purpose: response.substring(0, 200) || "Component of the mechanical assembly",
          material: "Varies by application",
          cost: "Contact manufacturer",
          tip: "Proper maintenance extends lifespan"
        };
      }

      setPartExplanations(prev => new Map(prev).set(partName, explanation));
      setLoadingExplanation(false);
      return explanation;
    } catch (error) {
      console.error('AI explanation error:', error);
      setLoadingExplanation(false);
      return {
        purpose: "Mechanical component",
        material: "Various materials",
        cost: "Varies",
        tip: "Consult engineering specifications"
      };
    }
  };

  // Handle model upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsLoading(true);
    const url = URL.createObjectURL(file);
    
    // Determine loader based on file extension
    const extension = file.name.split('.').pop().toLowerCase();
    let loader;
    
    if (extension === 'fbx') {
      loader = new FBXLoader();
    } else {
      loader = new GLTFLoader();
      
      // Setup Draco compression for optimized loading
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
      loader.setDRACOLoader(dracoLoader);
    }

    loader.load(
      url,
      (gltf) => {
        const model = extension === 'fbx' ? gltf : gltf.scene;
        
        if (!model) {
          alert('Invalid model file. Please try another file.');
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

        // Add model to scene
        sceneRef.current.add(model);

        // Extract all meshes as separate parts
        const newParts = [];
        const positions = new Map();
        const offsets = new Map();

        try {
          // Calculate model center for explode direction
          const box = new THREE.Box3().setFromObject(model);
          const center = box.getCenter(new THREE.Vector3());
          
          // Traverse the model to find all meshes
          const partsInfo = [];
          let partIndex = 0;

          model.traverse((child) => {
            if (child.isMesh) {
              child.userData.isPart = true;
              
              // Smart part name detection
              let partName = child.name || `Part ${partIndex + 1}`;
              
              // Auto-detect common part names
              const nameLower = partName.toLowerCase();
              if (nameLower.includes('piston')) partName = 'Piston';
              else if (nameLower.includes('cylinder')) partName = 'Cylinder';
              else if (nameLower.includes('nozzle')) partName = 'Nozzle';
              else if (nameLower.includes('exhaust')) partName = 'Exhaust';
              else if (nameLower.includes('turbine')) partName = 'Turbine';
              else if (nameLower.includes('valve')) partName = 'Valve';
              else if (nameLower.includes('shaft')) partName = 'Shaft';
              else if (nameLower.includes('gear')) partName = 'Gear';
              else if (nameLower.includes('bearing')) partName = 'Bearing';
              else if (nameLower.includes('housing')) partName = 'Housing';
              
              child.userData.partName = partName;
              
              // Clone material safely
              if (child.material) {
                child.userData.originalMaterial = child.material.clone();
              } else {
                child.userData.originalMaterial = new THREE.MeshStandardMaterial({ color: 0x888888 });
              }
              
              // Save original position
              positions.set(child, {
                x: child.position.x,
                y: child.position.y,
                z: child.position.z
              });

              // Calculate explode direction and offset
              const partWorldPos = new THREE.Vector3();
              child.getWorldPosition(partWorldPos);
              const direction = new THREE.Vector3()
                .subVectors(partWorldPos, center)
                .normalize();
              
              // Vary distance for dramatic effect
              const baseDistance = 5;
              const randomOffset = (Math.random() - 0.5) * 2;
              const distance = baseDistance + randomOffset;
              
              offsets.set(child, {
                x: direction.x * distance,
                y: direction.y * distance,
                z: direction.z * distance
              });

              newParts.push(child);
              partsInfo.push({
                id: partIndex,
                name: partName,
                mesh: child
              });
              
              partIndex++;
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
          setPartsList(partsInfo);
          setOriginalPositions(positions);
          setExplodeOffsets(offsets);
          setModelLoaded(true);
          setIsLoading(false);

          // Center camera on model
          const modelBox = new THREE.Box3().setFromObject(model);
          const modelCenter = modelBox.getCenter(new THREE.Vector3());
          const size = modelBox.getSize(new THREE.Vector3());
          const maxDim = Math.max(size.x, size.y, size.z);
          const fov = cameraRef.current.fov * (Math.PI / 180);
          let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));
          cameraZ *= 2;

          cameraRef.current.position.set(modelCenter.x + cameraZ, modelCenter.y + cameraZ / 2, modelCenter.z + cameraZ);
          cameraRef.current.lookAt(modelCenter);
          controlsRef.current.target.copy(modelCenter);
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

  // Iron-Man style explode animation
  const handleExplode = () => {
    if (parts.length === 0) return;

    if (isExploded) {
      // Collapse back with staggered timing
      parts.forEach((part, index) => {
        const original = originalPositions.get(part);
        const delay = index * 0.05;
        
        gsap.to(part.position, {
          x: original.x,
          y: original.y,
          z: original.z,
          duration: 1.2,
          delay: delay,
          ease: 'back.in(1.2)'
        });
      });
      setIsExploded(false);
    } else {
      // Explode outward with dramatic staggered animation
      parts.forEach((part, index) => {
        const offset = explodeOffsets.get(part);
        const original = originalPositions.get(part);
        const delay = index * 0.08;
        
        gsap.to(part.position, {
          x: original.x + offset.x,
          y: original.y + offset.y,
          z: original.z + offset.z,
          duration: 1.5,
          delay: delay,
          ease: 'back.out(1.7)'
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

  // Handle click on part with AI explanation
  const handleClick = async (event) => {
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
      clickedPart.material.emissiveIntensity = 0.8;
      clickedPart.material.transparent = false;
      clickedPart.material.opacity = 1;

      setSelectedPart(clickedPart);
      
      // Generate AI explanation
      await generatePartExplanation(clickedPart.userData.partName);
    }
  };

  // Select part from list with AI explanation
  const handleSelectPart = async (part) => {
    // Reset all parts
    parts.forEach(p => {
      p.material = p.userData.originalMaterial.clone();
      p.material.transparent = true;
      p.material.opacity = 0.3;
    });

    // Highlight selected part
    part.material = part.userData.originalMaterial.clone();
    part.material.emissive = new THREE.Color(0x00ffff);
    part.material.emissiveIntensity = 0.8;
    part.material.transparent = false;
    part.material.opacity = 1;

    setSelectedPart(part);

    // Auto-focus on selected part
    handleFocusSelected(part);
    
    // Generate AI explanation
    await generatePartExplanation(part.userData.partName);
  };

  // Focus on selected part
  const handleFocusSelected = (part = selectedPart) => {
    if (!part || !cameraRef.current || !controlsRef.current) return;

    const partBox = new THREE.Box3().setFromObject(part);
    const partCenter = partBox.getCenter(new THREE.Vector3());
    const size = partBox.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const fov = cameraRef.current.fov * (Math.PI / 180);
    let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2));
    cameraZ *= 2.5;

    gsap.to(cameraRef.current.position, {
      x: partCenter.x + cameraZ,
      y: partCenter.y + cameraZ / 2,
      z: partCenter.z + cameraZ,
      duration: 1.5,
      ease: 'power2.inOut',
      onUpdate: () => {
        cameraRef.current.lookAt(partCenter);
      }
    });

    gsap.to(controlsRef.current.target, {
      x: partCenter.x,
      y: partCenter.y,
      z: partCenter.z,
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

          <div className="flex items-center gap-3">
            <button
              onClick={handleExplode}
              disabled={!modelLoaded}
              className="flex items-center gap-2 px-4 py-2 bg-primary/20 hover:bg-primary/30 text-primary border border-primary rounded-lg transition-all disabled:opacity-30"
            >
              <Sparkles className="w-5 h-5" />
              <span>{isExploded ? 'Collapse' : 'Explode'}</span>
            </button>
            
            <button
              onClick={handleReset}
              disabled={!modelLoaded}
              className="px-4 py-2 bg-background-light hover:bg-background border border-primary/20 text-white rounded-lg transition-all disabled:opacity-30"
            >
              Reset
            </button>
            
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
                  <span>Upload</span>
                </>
              )}
            </button>
          </div>
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

        {/* Info Sidebar */}
        {modelLoaded && (
          <div className="w-96 border-l border-primary/20 bg-background-dark overflow-y-auto flex flex-col">
            {/* Parts List */}
            <div className="p-6 border-b border-primary/20">
              <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                <Package className="w-5 h-5" />
                <span>Parts</span>
                <span className="text-xs font-mono text-text-muted">({partsList.length})</span>
              </h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {partsList.map((partInfo) => (
                  <button
                    key={partInfo.id}
                    onClick={() => handleSelectPart(partInfo.mesh)}
                    className={`w-full text-left p-3 rounded-lg transition-all ${
                      selectedPart === partInfo.mesh
                        ? 'bg-primary/20 border border-primary text-primary'
                        : 'bg-background-light hover:bg-background border border-primary/20 text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">{partInfo.name}</span>
                      {selectedPart === partInfo.mesh && (
                        <span className="text-xs">✓</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* AI Explanation Panel */}
            {selectedPart && (
              <div className="p-6 flex-1">
                <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <span>{selectedPart.userData.partName}</span>
                </h3>

                {loadingExplanation ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  </div>
                ) : partExplanations.has(selectedPart.userData.partName) ? (
                  <div className="space-y-4">
                    {/* Purpose */}
                    <div className="bg-background-light p-4 rounded-lg border border-primary/20">
                      <h4 className="text-primary font-semibold mb-2 text-sm">Purpose</h4>
                      <p className="text-text-secondary text-sm leading-relaxed">
                        {partExplanations.get(selectedPart.userData.partName).purpose}
                      </p>
                    </div>

                    {/* Material */}
                    <div className="bg-background-light p-4 rounded-lg border border-primary/20">
                      <h4 className="text-primary font-semibold mb-2 text-sm flex items-center gap-2">
                        <Package className="w-4 h-4" />
                        Material
                      </h4>
                      <p className="text-white font-mono text-sm">
                        {partExplanations.get(selectedPart.userData.partName).material}
                      </p>
                    </div>

                    {/* Cost */}
                    <div className="bg-background-light p-4 rounded-lg border border-primary/20">
                      <h4 className="text-primary font-semibold mb-2 text-sm flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        Estimated Cost
                      </h4>
                      <p className="text-white font-mono text-sm">
                        {partExplanations.get(selectedPart.userData.partName).cost}
                      </p>
                    </div>

                    {/* Engineering Tip */}
                    <div className="bg-primary/10 p-4 rounded-lg border border-primary/30">
                      <h4 className="text-primary font-semibold mb-2 text-sm">💡 Engineering Insight</h4>
                      <p className="text-text-secondary text-sm leading-relaxed">
                        {partExplanations.get(selectedPart.userData.partName).tip}
                      </p>
                    </div>

                    <button
                      onClick={() => handleFocusSelected()}
                      className="w-full py-2 bg-primary/20 hover:bg-primary/30 text-primary border border-primary rounded-lg transition-all text-sm font-semibold"
                    >
                      Focus on Part
                    </button>
                  </div>
                ) : (
                  <p className="text-text-muted text-sm">Click a part to see details</p>
                )}
              </div>
            )}
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
        accept=".glb,.gltf,.fbx"
        onChange={handleFileUpload}
        className="hidden"
      />
    </div>
  );
}
