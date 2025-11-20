import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, ArrowLeft, Loader2, RotateCcw, Scan, Cpu } from 'lucide-react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import gsap from 'gsap';
import { generateResponse } from '../services/gemini';

// --- HUD Component (Iron Man Style) ---
const HUDOverlay = ({ selectedPartName }) => (
  <div className="absolute inset-0 pointer-events-none z-10">
    <div className="absolute top-4 left-4 w-16 h-16 border-l-2 border-t-2 border-cyan-400/60 rounded-tl-lg" />
    <div className="absolute top-4 right-4 w-16 h-16 border-r-2 border-t-2 border-cyan-400/60 rounded-tr-lg" />
    <div className="absolute bottom-4 left-4 w-16 h-16 border-l-2 border-b-2 border-cyan-400/60 rounded-bl-lg" />
    <div className="absolute bottom-4 right-4 w-16 h-16 border-r-2 border-b-2 border-cyan-400/60 rounded-br-lg" />
    
    {/* Scanning line animation */}
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/5 to-transparent opacity-20 animate-[scan_4s_linear_infinite]" />
    
    {selectedPartName && (
      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 bg-black/80 border border-cyan-500/50 px-8 py-2 rounded-none skew-x-12 backdrop-blur-md animate-pulse">
        <div className="-skew-x-12 text-cyan-400 font-mono font-bold tracking-[0.2em]">
          TARGET: {selectedPartName.toUpperCase()}
        </div>
      </div>
    )}
  </div>
);

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
  const animationFrameRef = useRef(null);

  // State
  const [parts, setParts] = useState([]);
  const [partsList, setPartsList] = useState([]);
  const [originalPositions, setOriginalPositions] = useState(new Map());
  const [explodeOffsets, setExplodeOffsets] = useState(new Map());
  const [isExploded, setIsExploded] = useState(false);
  const [selectedPart, setSelectedPart] = useState(null);
  const [hoveredPart, setHoveredPart] = useState(null);
  const [partExplanations, setPartExplanations] = useState(new Map());
  const [loadingExplanation, setLoadingExplanation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modelLoaded, setModelLoaded] = useState(false);

  // --- Initialization ---
  useEffect(() => {
    if (!containerRef.current) return;

    // 1. Scene - Darker Deep Space
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x020205);
    scene.fog = new THREE.FogExp2(0x020205, 0.015);
    sceneRef.current = scene;

    // 2. Camera - Better Default Position
    const camera = new THREE.PerspectiveCamera(
      45,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      2000 // Increased Far plane for large models
    );
    camera.position.set(15, 10, 20); // Start further back
    cameraRef.current = camera;

    // 3. Renderer - High Quality
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 2;
    controls.maxDistance = 100;
    controlsRef.current = controls;

    // 5. Lighting Setup (Standardized for Normalized Model)
    const ambientLight = new THREE.AmbientLight(0x404040, 3);
    scene.add(ambientLight);

    const mainSpot = new THREE.SpotLight(0xffffff, 100); // Intense light
    mainSpot.position.set(20, 30, 20);
    mainSpot.angle = Math.PI / 6;
    mainSpot.penumbra = 1;
    mainSpot.castShadow = true;
    mainSpot.shadow.bias = -0.0001;
    scene.add(mainSpot);

    // Blue Rim Light (Iron Man Vibe)
    const rimLight = new THREE.SpotLight(0x00eeff, 50);
    rimLight.position.set(-20, 0, -20);
    scene.add(rimLight);

    // Grid
    const gridHelper = new THREE.GridHelper(60, 60, 0x004444, 0x050505);
    gridHelper.position.y = -5; // Push floor down slightly
    scene.add(gridHelper);

    // Animation Loop
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      controls.update();
      
      // Holographic Rotation Effect for selected part
      if (selectedPart && selectedPart.userData.isInspecting) {
        selectedPart.rotation.y += 0.005;
        // Gentle float
        selectedPart.position.y += Math.sin(Date.now() * 0.002) * 0.005;
      }

      renderer.render(scene, camera);
    };
    animate();

    // Resize Handler
    const handleResize = () => {
      if (!containerRef.current) return;
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameRef.current);
      renderer.dispose();
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, [selectedPart]);

  // --- Core Logic: Hover & Interactions ---
  const handleMouseMove = (event) => {
    if (!modelLoaded || parts.length === 0) return;

    const rect = containerRef.current.getBoundingClientRect();
    mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);
    const intersects = raycasterRef.current.intersectObjects(parts, false);

    if (intersects.length > 0) {
      const object = intersects[0].object;
      if (object !== hoveredPart && object !== selectedPart) {
        if (hoveredPart && hoveredPart !== selectedPart) {
          hoveredPart.material.emissive.setHex(0x000000);
        }
        
        // Hover Effect: Cyan Glow
        object.material.emissive = new THREE.Color(0x00ffff);
        object.material.emissiveIntensity = 0.4;
        setHoveredPart(object);
        containerRef.current.style.cursor = 'pointer';
      }
    } else {
      if (hoveredPart) {
        if (hoveredPart !== selectedPart) {
          hoveredPart.material.emissive.setHex(0x000000);
        }
        setHoveredPart(null);
        containerRef.current.style.cursor = 'default';
      }
    }
  };

  // --- Core Logic: Model Loading & Normalization ---
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsLoading(true);
    const url = URL.createObjectURL(file);
    const extension = file.name.split('.').pop().toLowerCase();
    
    let loader = extension === 'fbx' ? new FBXLoader() : new GLTFLoader();
    if (extension !== 'fbx') {
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
      loader.setDRACOLoader(dracoLoader);
    }

    loader.load(url, (gltf) => {
      try {
        const rawModel = extension === 'fbx' ? gltf : gltf.scene;
        
        // 1. Clean Scene
        if (sceneRef.current) {
          // Remove only parts, keep lights/grid
          const toRemove = sceneRef.current.children.filter(c => c.userData.isPart || c.userData.isWireframe);
          toRemove.forEach(c => sceneRef.current.remove(c));
        }
        setParts([]);
        setPartsList([]);
        setSelectedPart(null);
        setIsExploded(false);

        // 2. Normalize Scale & Center
        // We calculate the bounding box of the raw model to see how big/offset it is
        const box = new THREE.Box3().setFromObject(rawModel);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());

        // Determine scale factor to make max dimension exactly 15 units
        const maxDim = Math.max(size.x, size.y, size.z);
        const scaleFactor = 15 / maxDim;

        // 3. Extract Meshes with "Baked" World Coordinates
        // This solves the hierarchy issue where parts fly away
        const newParts = [];
        const positions = new Map();
        const offsets = new Map();
        const partsData = [];
        
        const meshes = [];
        rawModel.traverse((child) => {
          if (child.isMesh) meshes.push(child);
        });

        meshes.forEach((child, index) => {
          // a. Get World Transform before detaching
          child.updateWorldMatrix(true, false);
          const worldPos = new THREE.Vector3();
          const worldQuat = new THREE.Quaternion();
          const worldScale = new THREE.Vector3();
          child.matrixWorld.decompose(worldPos, worldQuat, worldScale);

          // b. Apply Normalization (Centering + Scaling)
          // Move point to 0,0,0 based on center, then scale it
          worldPos.sub(center).multiplyScalar(scaleFactor);
          worldScale.multiplyScalar(scaleFactor);

          // c. Detach from parent logic (we create a clean object in the scene)
          // We can reuse the mesh, but we must reset its matrix to local
          child.parent = null; // Detach
          child.position.copy(worldPos);
          child.quaternion.copy(worldQuat);
          child.scale.copy(worldScale);

          // d. Material Upgrade
          const oldMat = Array.isArray(child.material) ? child.material[0] : child.material;
          const color = oldMat?.color || new THREE.Color(0x888888);
          
          child.material = new THREE.MeshPhysicalMaterial({
            color: color,
            metalness: 0.6,
            roughness: 0.3,
            clearcoat: 0.5,
            side: THREE.DoubleSide
          });
          
          child.castShadow = true;
          child.receiveShadow = true;
          child.userData.isPart = true;
          child.userData.originalMaterial = child.material.clone();
          child.userData.originalRotation = child.rotation.clone();
          
          // Smart Naming
          let pName = child.name || `Part ${index + 1}`;
          pName = pName.replace(/_/g, ' ').replace(/mesh/gi, '').trim() || `Component ${index + 1}`;
          child.userData.partName = pName;

          // e. Explode Vector Calculation
          // Direction is from (0,0,0) because we centered it
          const direction = worldPos.clone().normalize();
          // If perfectly center, use random up/out
          if (direction.length() < 0.1) direction.set(Math.random()-0.5, 1, Math.random()-0.5).normalize();
          
          const explodeDist = 5 + Math.random() * 5;
          offsets.set(child, direction.multiplyScalar(explodeDist));
          positions.set(child, worldPos.clone());

          // f. Add to scene
          sceneRef.current.add(child);
          newParts.push(child);
          partsData.push({ id: index, name: pName, mesh: child });
        });

        setParts(newParts);
        setPartsList(partsData);
        setOriginalPositions(positions);
        setExplodeOffsets(offsets);
        setModelLoaded(true);
        setIsLoading(false);
        URL.revokeObjectURL(url);

        // 4. Reset Camera to Look at the normalized model
        // Since we normalized to ~15 units, we know exactly where to put the camera
        gsap.to(cameraRef.current.position, {
          x: 20, y: 15, z: 20, 
          duration: 1.5,
          ease: "power2.out"
        });
        gsap.to(controlsRef.current.target, {
          x: 0, y: 0, z: 0, 
          duration: 1.5
        });

      } catch (err) {
        console.error(err);
        setIsLoading(false);
        alert("Error processing model geometry.");
      }
    }, undefined, (err) => {
      console.error(err);
      setIsLoading(false);
      alert("Failed to load file.");
    });
  };

  // --- Animation Logic ---

  const handleExplode = () => {
    if (parts.length === 0) return;
    if (selectedPart) handleResetSelection();

    if (isExploded) {
      // Implode
      parts.forEach((part, i) => {
        const target = originalPositions.get(part);
        gsap.to(part.position, {
          x: target.x, y: target.y, z: target.z,
          duration: 1.2, ease: "power3.inOut", delay: i * 0.002
        });
        gsap.to(part.rotation, {
          x: part.userData.originalRotation.x,
          y: part.userData.originalRotation.y,
          z: part.userData.originalRotation.z,
          duration: 1
        });
      });
      setIsExploded(false);
    } else {
      // Explode
      parts.forEach((part, i) => {
        const origin = originalPositions.get(part);
        const offset = explodeOffsets.get(part);
        
        gsap.to(part.position, {
          x: origin.x + offset.x,
          y: origin.y + offset.y,
          z: origin.z + offset.z,
          duration: 1.5, ease: "back.out(1.2)", delay: i * 0.005
        });
        // Random spin for debris feel
        gsap.to(part.rotation, {
          x: Math.random(), y: Math.random(), duration: 2
        });
      });
      setIsExploded(true);
    }
  };

  const handleResetSelection = () => {
    if (!selectedPart) return;
    selectedPart.userData.isInspecting = false;

    parts.forEach(part => {
      part.material = part.userData.originalMaterial.clone();
      part.material.transparent = false;
      part.material.opacity = 1;
      part.visible = true;
    });

    // Return camera to default "Overview" position
    gsap.to(cameraRef.current.position, {
      x: 20, y: 15, z: 20, duration: 1, ease: "power2.inOut"
    });
    gsap.to(controlsRef.current.target, {
      x: 0, y: 0, z: 0, duration: 1
    });

    setSelectedPart(null);
  };

  const handlePartSelect = async (part) => {
    if (selectedPart === part) return;
    if (selectedPart) handleResetSelection();

    setSelectedPart(part);
    part.userData.isInspecting = true;

    // 1. Dim others to Schematic Style
    parts.forEach(p => {
      if (p !== part) {
        p.material = new THREE.MeshBasicMaterial({
          color: 0x002244, // Dark Blueprint Blue
          wireframe: true,
          transparent: true,
          opacity: 0.05
        });
      } else {
        p.material = p.userData.originalMaterial.clone();
        p.material.emissive = new THREE.Color(0x00ffff);
        p.material.emissiveIntensity = 0.3;
      }
    });

    // 2. Focus Camera on Part
    // Get center of part
    const box = new THREE.Box3().setFromObject(part);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);

    // Calculate zoomed position
    const zoomDist = Math.max(maxDim * 3, 5); // Don't get closer than 5 units
    const camPos = cameraRef.current.position.clone().sub(center).normalize().multiplyScalar(zoomDist).add(center);

    gsap.to(cameraRef.current.position, {
      x: camPos.x, y: camPos.y, z: camPos.z,
      duration: 1.5, ease: "power3.out"
    });
    gsap.to(controlsRef.current.target, {
      x: center.x, y: center.y, z: center.z,
      duration: 1.5
    });

    // 3. AI
    await generatePartExplanation(part.userData.partName);
  };

  const generatePartExplanation = async (partName) => {
    if (partExplanations.has(partName)) return;
    setLoadingExplanation(true);
    try {
      const prompt = `Analyze mechanical part: "${partName}". JSON format: {"purpose": "short text", "material": "material name", "cost": "$price", "tip": "short tip"}`;
      const text = await generateResponse(prompt);
      const json = JSON.parse(text.match(/\{[\s\S]*\}/)[0]);
      setPartExplanations(prev => new Map(prev).set(partName, json));
    } catch (e) {
      setPartExplanations(prev => new Map(prev).set(partName, {
        purpose: "Technical component", material: "Unknown", cost: "N/A", tip: "See specs"
      }));
    } finally {
      setLoadingExplanation(false);
    }
  };

  const handleClick = () => {
    raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);
    const intersects = raycasterRef.current.intersectObjects(parts, false);
    if (intersects.length > 0) handlePartSelect(intersects[0].object);
    else handleResetSelection();
  };

  return (
    <div className="h-screen bg-[#020205] text-cyan-50 font-mono overflow-hidden flex flex-col">
      
      {/* Header */}
      <div className="z-20 px-6 py-4 border-b border-cyan-900/30 bg-[#020205]/90 backdrop-blur flex justify-between items-center">
        <div className="flex items-center gap-6">
          <button onClick={() => navigate('/')} className="text-cyan-600 hover:text-cyan-400 transition-colors"><ArrowLeft /></button>
          <h1 className="text-xl font-bold tracking-[0.2em] text-cyan-100 flex items-center gap-3">
            <Cpu className="w-5 h-5 text-cyan-500 animate-pulse" />
            SCHEMATIC.VIEWER_v2.0
          </h1>
        </div>
        <div className="flex gap-4">
          <button onClick={handleExplode} disabled={!modelLoaded} className={`flex items-center gap-2 px-6 py-2 rounded border font-bold tracking-widest transition-all ${isExploded ? 'border-orange-500 text-orange-500' : 'border-cyan-500 text-cyan-500 hover:bg-cyan-500/10'}`}>
            {isExploded ? <RotateCcw className="w-4 h-4" /> : <Scan className="w-4 h-4" />}
            {isExploded ? 'ASSEMBLE' : 'EXPLODE'}
          </button>
          <button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-2 px-6 py-2 bg-cyan-600 hover:bg-cyan-500 text-black font-bold rounded transition-all">
            {isLoading ? <Loader2 className="animate-spin w-4 h-4" /> : <Upload className="w-4 h-4" />} LOAD
          </button>
        </div>
      </div>

      {/* Viewport */}
      <div className="flex-1 relative flex overflow-hidden">
        {modelLoaded && <HUDOverlay selectedPartName={selectedPart?.userData?.partName} />}
        
        <div ref={containerRef} className="flex-1 cursor-default" onMouseMove={handleMouseMove} onClick={handleClick} />

        {/* Right Panel */}
        <div className={`w-[400px] border-l border-cyan-900/30 bg-[#050510]/95 backdrop-blur transform transition-transform duration-500 absolute right-0 top-0 bottom-0 z-30 flex flex-col ${modelLoaded ? 'translate-x-0' : 'translate-x-full'}`}>
          {/* List */}
          <div className="p-4 border-b border-cyan-900/30 max-h-[40%] overflow-y-auto custom-scrollbar">
            <h3 className="text-cyan-500 text-[10px] font-bold tracking-[0.2em] mb-4 uppercase">Component Manifest</h3>
            <div className="space-y-1">
              {partsList.map(p => (
                <button key={p.id} onClick={(e) => { e.stopPropagation(); handlePartSelect(p.mesh); }} className={`w-full text-left px-3 py-2 text-xs font-bold tracking-wide border-l-2 transition-all ${selectedPart === p.mesh ? 'border-cyan-400 bg-cyan-900/20 text-cyan-200' : 'border-transparent text-gray-600 hover:text-cyan-400'}`}>
                  {p.name.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="flex-1 p-6 overflow-y-auto">
            {selectedPart ? (
              <div className="animate-in slide-in-from-right-4 duration-300">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-cyan-900/30">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping" />
                  <span className="font-bold text-xl uppercase tracking-wider text-white">{selectedPart.userData.partName}</span>
                </div>
                
                {loadingExplanation ? (
                  <div className="flex flex-col gap-2 animate-pulse">
                    <div className="h-2 bg-cyan-900/50 rounded w-3/4" />
                    <div className="h-2 bg-cyan-900/50 rounded w-1/2" />
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="bg-cyan-900/10 p-4 border border-cyan-500/20 rounded">
                      <h4 className="text-cyan-500 text-[10px] font-bold uppercase mb-2">Functionality</h4>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {partExplanations.get(selectedPart.userData.partName)?.purpose || "Loading..."}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 border-t border-cyan-800">
                        <span className="text-[10px] text-gray-500 uppercase block">Material composition</span>
                        <span className="text-cyan-300 text-sm">{partExplanations.get(selectedPart.userData.partName)?.material || "N/A"}</span>
                      </div>
                      <div className="p-3 border-t border-cyan-800">
                        <span className="text-[10px] text-gray-500 uppercase block">Unit Cost</span>
                        <span className="text-green-400 text-sm">{partExplanations.get(selectedPart.userData.partName)?.cost || "N/A"}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center opacity-30">
                <Scan className="w-16 h-16 mb-4" />
                <p className="text-xs tracking-[0.2em]">AWAITING INPUT</p>
              </div>
            )}
          </div>
        </div>

        {!modelLoaded && !isLoading && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center opacity-50">
              <Upload className="w-16 h-16 mx-auto mb-4 text-cyan-800" />
              <p className="text-cyan-900 tracking-[0.3em] font-bold">NO SCHEMATIC LOADED</p>
            </div>
          </div>
        )}
      </div>
      
      <input ref={fileInputRef} type="file" accept=".glb,.gltf,.fbx" onChange={handleFileUpload} className="hidden" />
    </div>
  );
}
