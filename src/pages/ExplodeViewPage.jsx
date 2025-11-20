import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, ArrowLeft, Loader2, Sparkles, Crosshair, RotateCcw, Scan, Cpu } from 'lucide-react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import gsap from 'gsap';
import { generateResponse } from '../services/gemini';

// --- HUD Component for Iron Man Feel ---
const HUDOverlay = ({ selectedPartName }) => (
  <div className="absolute inset-0 pointer-events-none z-10">
    {/* Corners */}
    <div className="absolute top-4 left-4 w-16 h-16 border-l-2 border-t-2 border-cyan-400 rounded-tl-lg opacity-60" />
    <div className="absolute top-4 right-4 w-16 h-16 border-r-2 border-t-2 border-cyan-400 rounded-tr-lg opacity-60" />
    <div className="absolute bottom-4 left-4 w-16 h-16 border-l-2 border-b-2 border-cyan-400 rounded-bl-lg opacity-60" />
    <div className="absolute bottom-4 right-4 w-16 h-16 border-r-2 border-b-2 border-cyan-400 rounded-br-lg opacity-60" />
    
    {/* Center Crosshair */}
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-20">
      <div className="w-[300px] h-[300px] border border-cyan-500/30 rounded-full flex items-center justify-center animate-[spin_10s_linear_infinite]">
        <div className="w-[280px] h-[280px] border-t border-b border-cyan-500/50 rounded-full" />
      </div>
    </div>
    
    {/* Selected Part Label Floating */}
    {selectedPartName && (
      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 bg-black/60 border border-cyan-500/50 px-6 py-2 rounded text-cyan-400 font-mono text-sm tracking-widest backdrop-blur-sm animate-pulse">
        TARGET LOCKED: {selectedPartName.toUpperCase()}
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

  // Initialize Three.js scene
  useEffect(() => {
    if (!containerRef.current) return;

    // Scene Setup - Darker, Foggy "Tech" atmosphere
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050510); // Deep space blue/black
    scene.fog = new THREE.FogExp2(0x050510, 0.02);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45, // Narrower FOV for more cinematic look
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(8, 5, 10);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    // High contrast tone mapping
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 2;
    controls.maxDistance = 50;
    controlsRef.current = controls;

    // Advanced Lighting (Iron Man Workshop Style)
    const ambientLight = new THREE.AmbientLight(0x404040, 2); // Blueish ambient
    scene.add(ambientLight);

    // Key Light (Warm/White)
    const spotLight = new THREE.SpotLight(0xffffff, 20);
    spotLight.position.set(10, 20, 10);
    spotLight.angle = Math.PI / 4;
    spotLight.penumbra = 0.5;
    spotLight.castShadow = true;
    scene.add(spotLight);

    // Rim Light (Cyan) - Gives the holographic edge
    const rimLight = new THREE.PointLight(0x00ffff, 5, 20);
    rimLight.position.set(-5, 2, -5);
    scene.add(rimLight);

    // Bottom fill (Purple/Blue)
    const fillLight = new THREE.PointLight(0x8800ff, 3, 20);
    fillLight.position.set(0, -5, 0);
    scene.add(fillLight);

    // Holographic Grid Floor
    const gridHelper = new THREE.GridHelper(30, 30, 0x00ffff, 0x111122);
    gridHelper.position.y = -2;
    gridHelper.material.opacity = 0.2;
    gridHelper.material.transparent = true;
    scene.add(gridHelper);

    // Animation loop
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      controls.update();
      
      // Rotate selected part slightly for inspection effect
      if (selectedPart && selectedPart.userData.isInspecting) {
        selectedPart.rotation.y += 0.005;
      }

      renderer.render(scene, camera);
    };
    animate();

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

  // --- Logic for Hover & Clicking ---

  const handleMouseMove = (event) => {
    if (!containerRef.current || !modelLoaded || parts.length === 0) return;

    // Calculate mouse position
    const rect = containerRef.current.getBoundingClientRect();
    mouseRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouseRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    // Raycasting
    raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);
    
    // Only intersect with PART meshes, not helpers/lines
    const intersects = raycasterRef.current.intersectObjects(parts, false);

    if (intersects.length > 0) {
      const object = intersects[0].object;
      if (object !== hoveredPart && object !== selectedPart) {
        // Reset previous hover
        if (hoveredPart && hoveredPart !== selectedPart) {
          hoveredPart.material.emissive.setHex(0x000000);
        }
        
        // Set new hover (Cyan Glow)
        object.material.emissive = new THREE.Color(0x00ffff);
        object.material.emissiveIntensity = 0.5;
        setHoveredPart(object);
        containerRef.current.style.cursor = 'crosshair';
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

  const generatePartExplanation = async (partName) => {
    if (partExplanations.has(partName)) return partExplanations.get(partName);

    setLoadingExplanation(true);
    try {
      const prompt = `Analyze mechanical part: "${partName}". Return JSON: {"purpose": "string", "material": "string", "cost": "string", "tip": "string"}`;
      const response = await generateResponse(prompt);
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      const explanation = jsonMatch ? JSON.parse(jsonMatch[0]) : {
        purpose: "Analysis unavailable", material: "Unknown", cost: "N/A", tip: "Check manual"
      };

      setPartExplanations(prev => new Map(prev).set(partName, explanation));
      setLoadingExplanation(false);
      return explanation;
    } catch (error) {
      console.log('AI explanation unavailable:', error.message);
      const fallback = { 
        purpose: `${partName} - Mechanical component`, 
        material: "Various materials", 
        cost: "Varies by application", 
        tip: "Consult technical documentation for specifications" 
      };
      setPartExplanations(prev => new Map(prev).set(partName, fallback));
      setLoadingExplanation(false);
      return fallback;
    }
  };

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
        const model = extension === 'fbx' ? gltf : gltf.scene;
        
        if (!model || !model.traverse) {
          console.error('Model is invalid or undefined', model);
          setIsLoading(false);
          alert('Failed to load model - invalid file format');
          URL.revokeObjectURL(url);
          return;
        }
        
        // Clean scene
        if (sceneRef.current) {
          const partsToRemove = sceneRef.current.children.filter(c => c.userData.isPart || c.userData.isWireframe);
          partsToRemove.forEach(p => sceneRef.current.remove(p));
        }

        // Reset states
        setParts([]);
        setPartsList([]);
        setSelectedPart(null);
        setIsExploded(false);

        // Process Mesh
        const newParts = [];
        const positions = new Map();
        const offsets = new Map();
        const partsData = [];
        
        // Calculate bounding box BEFORE adding to scene
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        
        // Collect all meshes first using safe traversal
        const meshes = [];
        let idx = 0;
        
        // Manual safe traversal to avoid undefined children
        const collectMeshes = (obj) => {
          if (!obj) return;
          
          if (obj.isMesh) {
            meshes.push(obj);
          }
          
          if (obj.children && Array.isArray(obj.children)) {
            obj.children.forEach(child => {
              if (child) collectMeshes(child);
            });
          }
        };
        
        collectMeshes(model);
        
        // Process each mesh
        meshes.forEach((child) => {
          // Material Setup for Tech Look
          child.castShadow = true;
          child.receiveShadow = true;
          // Save original material but upgrade to Physical for better metal look
          const oldMat = child.material;
          
          // Handle array materials
          const baseColor = Array.isArray(oldMat) 
            ? (oldMat[0]?.color || 0x888888)
            : (oldMat?.color || 0x888888);
          
          const newMat = new THREE.MeshPhysicalMaterial({
            color: baseColor,
            metalness: 0.8,
            roughness: 0.2,
            clearcoat: 1.0,
            clearcoatRoughness: 0.1,
          });
          
          child.material = newMat;
          child.userData.originalMaterial = newMat.clone();
          child.userData.isPart = true;
          child.userData.partName = child.name || `Component-${idx + 1}`;
          
          // Save Position
          positions.set(child, child.position.clone());
          child.userData.originalRotation = child.rotation.clone();

          // Calculate Explode Vector (from center of scene 0,0,0 since we centered model)
          const worldPos = new THREE.Vector3();
          child.getWorldPosition(worldPos);
          const direction = worldPos.clone().normalize(); // Direction from center
          const distance = 2 + Math.random() * 3; // Randomize distance for organic look
          
          offsets.set(child, direction.multiplyScalar(distance));

          // Get world position before removing from parent
          const worldPosition = new THREE.Vector3();
          const worldRotation = new THREE.Euler();
          const worldScale = new THREE.Vector3();
          
          child.getWorldPosition(worldPosition);
          child.getWorldQuaternion(new THREE.Quaternion().setFromEuler(worldRotation));
          child.getWorldScale(worldScale);
          
          // Remove from parent and add to scene for independent control
          if (child.parent) {
            child.parent.remove(child);
          }
          
          // Set world position/rotation/scale
          child.position.copy(worldPosition);
          child.scale.copy(worldScale);
          
          // Adjust position relative to center
          child.position.sub(center);
          
          // Make sure it's visible
          child.visible = true;
          
          sceneRef.current.add(child);
          newParts.push(child);
          partsData.push({ id: idx++, name: child.userData.partName, mesh: child });
        });
      
        if (newParts.length === 0) {
          alert('No parts found in model. Make sure your model has separate meshes.');
          setIsLoading(false);
          URL.revokeObjectURL(url);
          return;
        }

        setParts(newParts);
        setPartsList(partsData);
        setOriginalPositions(positions);
        setExplodeOffsets(offsets);
        
        // Frame the model properly in camera view
        const modelBox = new THREE.Box3();
        newParts.forEach(part => modelBox.expandByObject(part));
        const modelSize = modelBox.getSize(new THREE.Vector3());
        const modelCenter = modelBox.getCenter(new THREE.Vector3());
        
        const maxDim = Math.max(modelSize.x, modelSize.y, modelSize.z);
        const fov = cameraRef.current.fov * (Math.PI / 180);
        const cameraDistance = Math.abs(maxDim / Math.sin(fov / 2)) * 1.5; // 1.5x for padding
        
        // Position camera to view the model
        cameraRef.current.position.set(
          modelCenter.x + cameraDistance * 0.7,
          modelCenter.y + cameraDistance * 0.5,
          modelCenter.z + cameraDistance
        );
        cameraRef.current.lookAt(modelCenter);
        controlsRef.current.target.copy(modelCenter);
        controlsRef.current.update();
        
        console.log('Model loaded:', {
          parts: newParts.length,
          size: modelSize,
          center: modelCenter,
          cameraDistance
        });
        
        setModelLoaded(true);
        setIsLoading(false);
        URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Error processing model:', error);
        setIsLoading(false);
        alert('Error processing model: ' + error.message);
        URL.revokeObjectURL(url);
      }
    }, undefined, (e) => {
      console.error('Error loading model:', e);
      setIsLoading(false);
      alert("Failed to load model file");
      URL.revokeObjectURL(url);
    });
  };

  const handleExplode = () => {
    if (parts.length === 0) return;

    // If a part is currently inspected (selected), reset it first
    if (selectedPart) {
      handleResetSelection();
    }

    if (isExploded) {
      // Implode
      parts.forEach((part, i) => {
        const target = originalPositions.get(part);
        gsap.to(part.position, {
          x: target.x, y: target.y, z: target.z,
          duration: 1, ease: "power3.inOut", delay: i * 0.005
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
        const pos = originalPositions.get(part);
        const off = explodeOffsets.get(part);
        
        gsap.to(part.position, {
          x: pos.x + off.x,
          y: pos.y + off.y,
          z: pos.z + off.z,
          duration: 1.5, ease: "power4.out", delay: i * 0.01
        });
        // Add random rotation for floating debris effect
        gsap.to(part.rotation, {
          x: Math.random() * 0.5,
          y: Math.random() * 0.5,
          duration: 2
        });
      });
      setIsExploded(true);
    }
  };

  const handleResetSelection = () => {
    if (!selectedPart) return;

    // Stop inspection rotation
    selectedPart.userData.isInspecting = false;

    // Restore all parts
    parts.forEach(part => {
      part.visible = true;
      
      // Reset Material
      part.material = part.userData.originalMaterial.clone();
      part.material.transparent = false;
      part.material.opacity = 1;
      
      // If implied, restore position slightly if we moved it
      gsap.to(part.scale, { x: 1, y: 1, z: 1, duration: 0.5 });
    });

    // Reset Camera (pull back)
    gsap.to(cameraRef.current.position, {
      x: 8, y: 5, z: 10, duration: 1, ease: "power2.inOut"
    });
    gsap.to(controlsRef.current.target, {
      x: 0, y: 0, z: 0, duration: 1
    });

    setSelectedPart(null);
  };

  const handlePartSelect = async (part) => {
    if (selectedPart === part) return;
    
    // If selecting a new part, reset others first visually
    if (selectedPart) handleResetSelection();

    setSelectedPart(part);
    part.userData.isInspecting = true; // Flag for animation loop

    // 1. Visual Isolation: Turn others into "Schematic Wireframes"
    parts.forEach(p => {
      if (p !== part) {
        p.material = new THREE.MeshBasicMaterial({
          color: 0x0044aa, // Dark blue wireframe
          wireframe: true,
          transparent: true,
          opacity: 0.05
        });
      } else {
        // Highlight selected
        p.material = p.userData.originalMaterial.clone();
        p.material.emissive = new THREE.Color(0x00ffff);
        p.material.emissiveIntensity = 0.2;
      }
    });

    // 2. Camera Focus (The "Iron Man" Zoom)
    const box = new THREE.Box3().setFromObject(part);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    
    // Move controls target to the part
    gsap.to(controlsRef.current.target, {
      x: center.x, y: center.y, z: center.z,
      duration: 1, ease: "expo.out"
    });

    // Move camera close
    const dist = maxDim * 2.5;
    const direction = new THREE.Vector3().subVectors(cameraRef.current.position, center).normalize();
    const newCamPos = center.clone().add(direction.multiplyScalar(dist));

    gsap.to(cameraRef.current.position, {
      x: newCamPos.x, y: newCamPos.y, z: newCamPos.z,
      duration: 1.2, ease: "expo.out"
    });

    // 3. AI Info
    await generatePartExplanation(part.userData.partName);
  };

  const handleClick = (event) => {
    // Reuse the calculated mouse ref from hover
    raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);
    const intersects = raycasterRef.current.intersectObjects(parts, false); // Non-recursive, only parts

    if (intersects.length > 0) {
      handlePartSelect(intersects[0].object);
    } else {
      // Click background to reset
      handleResetSelection();
    }
  };

  return (
    <div className="h-screen bg-[#050510] text-cyan-50 font-mono overflow-hidden flex flex-col">
      
      {/* Header / Top Bar */}
      <div className="z-20 px-6 py-4 border-b border-cyan-900/50 bg-[#050510]/80 backdrop-blur-md flex justify-between items-center shadow-[0_0_15px_rgba(0,255,255,0.1)]">
        <div className="flex items-center gap-6">
          <button onClick={() => navigate('/')} className="text-cyan-500 hover:text-cyan-300 transition-colors">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold tracking-wider text-cyan-100 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-cyan-500" />
            SCHEMATIC EXPLORER
          </h1>
        </div>

        <div className="flex gap-4">
          <button 
            onClick={handleExplode}
            disabled={!modelLoaded}
            className={`flex items-center gap-2 px-6 py-2 rounded border ${
              isExploded 
                ? 'border-orange-500 text-orange-500 bg-orange-500/10 hover:bg-orange-500/20' 
                : 'border-cyan-500 text-cyan-500 bg-cyan-500/10 hover:bg-cyan-500/20'
            } transition-all uppercase tracking-wider font-bold text-sm disabled:opacity-30`}
          >
            {isExploded ? <RotateCcw className="w-4 h-4" /> : <Scan className="w-4 h-4" />}
            {isExploded ? 'Implode' : 'Explode'}
          </button>
          
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 px-6 py-2 bg-cyan-600 hover:bg-cyan-500 text-black font-bold rounded transition-all"
          >
            {isLoading ? <Loader2 className="animate-spin w-4 h-4" /> : <Upload className="w-4 h-4" />}
            UPLOAD MODEL
          </button>
        </div>
      </div>

      {/* Main Viewport */}
      <div className="flex-1 relative flex overflow-hidden">
        
        {/* HUD Overlay */}
        {modelLoaded && <HUDOverlay selectedPartName={selectedPart?.userData?.partName} />}

        {/* 3D Canvas */}
        <div 
          ref={containerRef}
          className="flex-1 cursor-default outline-none active:cursor-grabbing"
          onMouseMove={handleMouseMove}
          onClick={handleClick}
        />

        {/* Right Info Panel (Glassmorphism) */}
        <div className={`w-[400px] border-l border-cyan-900/50 bg-[#0a0a1a]/90 backdrop-blur-md transform transition-transform duration-300 absolute right-0 top-0 bottom-0 z-30 flex flex-col ${modelLoaded ? 'translate-x-0' : 'translate-x-full'}`}>
          
          {/* Parts List */}
          <div className="p-4 border-b border-cyan-900/30 flex-shrink-0 max-h-[40%] overflow-y-auto custom-scrollbar">
            <h3 className="text-cyan-400 text-xs font-bold tracking-widest mb-4 uppercase">System Components ({partsList.length})</h3>
            <div className="space-y-1">
              {partsList.map(p => (
                <button
                  key={p.id}
                  onClick={(e) => { e.stopPropagation(); handlePartSelect(p.mesh); }}
                  className={`w-full text-left px-3 py-2 text-sm border-l-2 transition-all ${
                    selectedPart === p.mesh 
                      ? 'border-cyan-400 bg-cyan-500/10 text-cyan-300' 
                      : 'border-transparent text-gray-500 hover:text-cyan-400 hover:bg-cyan-900/20'
                  }`}
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          {/* AI Analysis Panel */}
          <div className="flex-1 p-6 overflow-y-auto">
            {selectedPart ? (
              <>
                <div className="flex items-center gap-2 mb-6 text-cyan-400 border-b border-cyan-900/50 pb-4">
                  <Crosshair className="w-5 h-5 animate-spin-slow" />
                  <span className="font-bold text-lg uppercase tracking-wider">{selectedPart.userData.partName}</span>
                </div>

                {loadingExplanation ? (
                  <div className="space-y-4 opacity-50 animate-pulse">
                    <div className="h-4 bg-cyan-900/50 rounded w-3/4"></div>
                    <div className="h-4 bg-cyan-900/50 rounded w-1/2"></div>
                    <div className="h-24 bg-cyan-900/30 rounded w-full mt-4"></div>
                  </div>
                ) : partExplanations.has(selectedPart.userData.partName) && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="bg-cyan-950/30 p-4 rounded border border-cyan-900/50 relative overflow-hidden group">
                      <div className="absolute top-0 right-0 p-1 opacity-20">
                        <Sparkles className="w-12 h-12" />
                      </div>
                      <h4 className="text-cyan-500 text-xs font-bold uppercase mb-2">Function</h4>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {partExplanations.get(selectedPart.userData.partName).purpose}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-black/40 p-3 rounded border-t border-cyan-900">
                        <span className="text-xs text-gray-500 uppercase block mb-1">Material</span>
                        <span className="text-cyan-300 text-sm font-semibold">{partExplanations.get(selectedPart.userData.partName).material}</span>
                      </div>
                      <div className="bg-black/40 p-3 rounded border-t border-cyan-900">
                        <span className="text-xs text-gray-500 uppercase block mb-1">Est. Cost</span>
                        <span className="text-green-400 text-sm font-mono">{partExplanations.get(selectedPart.userData.partName).cost}</span>
                      </div>
                    </div>

                    <div className="bg-orange-900/10 border border-orange-500/20 p-4 rounded-lg">
                      <h4 className="text-orange-400 text-xs font-bold uppercase mb-2 flex items-center gap-2">
                        Warning / Tip
                      </h4>
                      <p className="text-orange-200/80 text-sm italic">
                        "{partExplanations.get(selectedPart.userData.partName).tip}"
                      </p>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-gray-600 opacity-50">
                <Scan className="w-16 h-16 mb-4 stroke-1" />
                <p className="uppercase tracking-widest text-xs">Select component for analysis</p>
              </div>
            )}
          </div>
        </div>

        {/* Empty State */}
        {!modelLoaded && !isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-0">
            <div className="border border-cyan-900/50 p-12 rounded-full bg-black/40 backdrop-blur-sm">
              <Upload className="w-12 h-12 text-cyan-700 mb-4 mx-auto" />
              <p className="text-cyan-900 font-bold tracking-widest uppercase">System Idle</p>
            </div>
          </div>
        )}
      </div>

      <input ref={fileInputRef} type="file" accept=".glb,.gltf,.fbx" onChange={handleFileUpload} className="hidden" />
    </div>
  );
}
