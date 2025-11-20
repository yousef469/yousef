import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, ArrowLeft, Loader2, Crosshair, RotateCcw, Scan, Cpu, Maximize } from 'lucide-react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import gsap from 'gsap';
import { generateResponse } from '../services/gemini';

// --- HUD Overlay (Visuals) ---
const HUDOverlay = ({ selectedPartName }) => (
  <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
    {/* Tech Corners */}
    <div className="absolute top-6 left-6 w-32 h-32 border-l-2 border-t-2 border-cyan-500/40 rounded-tl-3xl opacity-80" />
    <div className="absolute bottom-6 right-6 w-32 h-32 border-r-2 border-b-2 border-cyan-500/40 rounded-br-3xl opacity-80" />
    
    {/* Crosshair Lines */}
    <div className="absolute top-1/2 left-0 w-12 h-[1px] bg-cyan-500/50" />
    <div className="absolute top-1/2 right-0 w-12 h-[1px] bg-cyan-500/50" />
    <div className="absolute top-0 left-1/2 w-[1px] h-12 bg-cyan-500/50" />
    <div className="absolute bottom-0 left-1/2 w-[1px] h-12 bg-cyan-500/50" />
    
    {selectedPartName && (
      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2">
        <div className="bg-black/80 border border-cyan-400/50 px-8 py-3 rounded backdrop-blur-md shadow-[0_0_20px_rgba(0,255,255,0.2)]">
          <div className="flex items-center gap-3">
            <Crosshair className="w-4 h-4 text-cyan-400 animate-spin-slow" />
            <span className="text-cyan-400 font-mono font-bold tracking-[0.15em] text-sm">
              ANALYZING: {selectedPartName.toUpperCase()}
            </span>
          </div>
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

  // State
  const [parts, setParts] = useState([]);
  const [partsList, setPartsList] = useState([]);
  const [originalStates, setOriginalStates] = useState(new Map()); // Stores pos/rot/scale
  const [explodeVectors, setExplodeVectors] = useState(new Map());
  const [isExploded, setIsExploded] = useState(false);
  const [selectedPart, setSelectedPart] = useState(null);
  const [hoveredPart, setHoveredPart] = useState(null);
  const [partExplanations, setPartExplanations] = useState(new Map());
  const [loadingExplanation, setLoadingExplanation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modelLoaded, setModelLoaded] = useState(false);

  // --- 1. Setup Scene ---
  useEffect(() => {
    if (!containerRef.current) return;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x05070a); // Deep UI Black/Blue
    scene.fog = new THREE.FogExp2(0x05070a, 0.002); // Soft fog for depth
    sceneRef.current = scene;

    // Camera - Initial setup (will be moved by fitCamera)
    const camera = new THREE.PerspectiveCamera(
      50,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      10000 // Huge far plane to prevent cutting off large models
    );
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = true;
    controlsRef.current = controls;

    // Lighting (High Contrast Tech Style)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight.position.set(10, 20, 10);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    scene.add(dirLight);

    const blueRim = new THREE.SpotLight(0x00ffff, 50);
    blueRim.position.set(-20, 0, -10);
    scene.add(blueRim);

    const purpleFill = new THREE.PointLight(0xbd00ff, 2);
    purpleFill.position.set(20, -10, 0);
    scene.add(purpleFill);

    // Floor Grid (Dynamic)
    const grid = new THREE.GridHelper(1000, 100, 0x1a1a1a, 0x0a0a0a);
    grid.position.y = -10;
    scene.add(grid);

    // Animation Loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      
      // Hover Effect Pulse
      if (hoveredPart && !selectedPart) {
        const pulse = (Math.sin(Date.now() * 0.005) + 1) * 0.5;
        hoveredPart.material.emissiveIntensity = 0.2 + (pulse * 0.2);
      }
      
      // Inspection Rotation
      if (selectedPart && selectedPart.userData.isInspecting) {
        selectedPart.rotation.y += 0.002;
      }
      
      renderer.render(scene, camera);
    };
    animate();

    // Resize
    const handleResize = () => {
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  // --- 2. Raycasting (Interaction) ---
  const handleMouseMove = (e) => {
    if (!parts.length) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouseRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);
    
    // Intersect parts
    const intersects = raycasterRef.current.intersectObjects(parts, false);

    if (intersects.length > 0) {
      const obj = intersects[0].object;
      if (hoveredPart !== obj) {
        // Clear old hover
        if (hoveredPart && hoveredPart !== selectedPart) {
          hoveredPart.material.emissive.setHex(0x000000);
        }
        // Set new hover
        if (obj !== selectedPart) {
          obj.material.emissive = new THREE.Color(0x00ffff);
          obj.material.emissiveIntensity = 0.3;
        }
        setHoveredPart(obj);
        containerRef.current.style.cursor = 'pointer';
      }
    } else {
      if (hoveredPart) {
        if (hoveredPart !== selectedPart) hoveredPart.material.emissive.setHex(0x000000);
        setHoveredPart(null);
        containerRef.current.style.cursor = 'default';
      }
    }
  };

  // --- 3. Model Loading Logic (The Fix) ---
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsLoading(true);
    const url = URL.createObjectURL(file);
    const extension = file.name.split('.').pop().toLowerCase();
    
    let loader = extension === 'fbx' ? new FBXLoader() : new GLTFLoader();
    if (extension !== 'fbx') {
      const draco = new DRACOLoader();
      draco.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
      loader.setDRACOLoader(draco);
    }

    loader.load(url, (gltf) => {
      const root = extension === 'fbx' ? gltf : gltf.scene;

      // cleanup old
      if (sceneRef.current) {
        const toRemove = [];
        sceneRef.current.traverse(c => { if(c.userData.isPart) toRemove.push(c) });
        toRemove.forEach(c => sceneRef.current.remove(c));
      }
      
      // 1. Calculate Center & Bounds of the RAW model
      const box = new THREE.Box3().setFromObject(root);
      const size = box.getSize(new THREE.Vector3());
      const center = box.getCenter(new THREE.Vector3());

      // 2. Flatten and Reparent logic
      // To make "explode" work, we need all parts to be children of the Scene,
      // NOT buried in groups. But we must preserve their World Transform.
      const meshes = [];
      root.traverse((child) => {
        if (child.isMesh) {
          meshes.push(child);
        }
      });

      const newParts = [];
      const states = new Map();
      const vectors = new Map();
      const partsData = [];

      // Detach meshes from hierarchy and attach to scene, preserving world transforms
      meshes.forEach((mesh, i) => {
        // Setup Material
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        
        // Ensure double side rendering (Fixes invisible parts)
        if (mesh.material) {
          mesh.material.side = THREE.DoubleSide;
          // Clone to avoid sharing materials between parts
          mesh.material = mesh.material.clone();
          
          // Add metalness for tech look
          if (mesh.material.isMeshStandardMaterial) {
            mesh.material.metalness = 0.7;
            mesh.material.roughness = 0.3;
          }
        }

        // Store World Transform
        mesh.updateMatrixWorld(true);
        const worldPos = new THREE.Vector3();
        const worldQuat = new THREE.Quaternion();
        const worldScale = new THREE.Vector3();
        mesh.matrixWorld.decompose(worldPos, worldQuat, worldScale);

        // Logic to flatten:
        // We are abandoning the parent structure.
        // We set the mesh's position/rot/scale to the calculated World values.
        mesh.removeFromParent();
        mesh.position.copy(worldPos);
        mesh.quaternion.copy(worldQuat);
        mesh.scale.copy(worldScale);
        
        // Metadata
        mesh.userData.isPart = true;
        mesh.userData.originalMaterial = mesh.material.clone();
        let pName = mesh.name.replace(/_/g, ' ') || `Part ${i}`;
        mesh.userData.partName = pName;

        // Calculate Explode Vector (Direction from Center of Model to Part Center)
        // Note: We use the 'center' we calculated from the whole model earlier
        const explodeDir = new THREE.Vector3().subVectors(worldPos, center).normalize();
        
        // Fallback for parts exactly at center
        if (explodeDir.lengthSq() === 0) explodeDir.set(Math.random(), Math.random(), Math.random()).normalize();
        
        // Variable explode distance based on model size
        const maxDim = Math.max(size.x, size.y, size.z);
        const explodeDist = maxDim * 0.5 + (Math.random() * maxDim * 0.2);
        
        vectors.set(mesh, explodeDir.multiplyScalar(explodeDist));
        states.set(mesh, {
          pos: worldPos.clone(),
          rot: mesh.rotation.clone(),
          scale: worldScale.clone()
        });

        sceneRef.current.add(mesh);
        newParts.push(mesh);
        partsData.push({ id: i, name: pName, mesh: mesh });
      });

      setParts(newParts);
      setPartsList(partsData);
      setOriginalStates(states);
      setExplodeVectors(vectors);

      // 3. FIT CAMERA (The Fix for "Too Close")
      // Re-calculate box now that parts are in the scene
      const finalBox = new THREE.Box3();
      newParts.forEach(p => finalBox.expandByObject(p));
      const finalCenter = finalBox.getCenter(new THREE.Vector3());
      const finalSize = finalBox.getSize(new THREE.Vector3());
      
      const maxDim = Math.max(finalSize.x, finalSize.y, finalSize.z);
      const fov = cameraRef.current.fov * (Math.PI / 180);
      
      // Calculate Z distance needed to fit the object
      let cameraZ = Math.abs(maxDim / 2 * Math.tan(fov * 2));
      cameraZ *= 2.5; // Multiplier 2.5 gives "Breathing Room"

      // Move Camera
      const newCamPos = new THREE.Vector3(
        finalCenter.x + cameraZ,
        finalCenter.y + (cameraZ * 0.5),
        finalCenter.z + cameraZ
      );
      
      cameraRef.current.position.copy(newCamPos);
      cameraRef.current.lookAt(finalCenter);
      
      // Update Controls Target to center of model
      controlsRef.current.target.copy(finalCenter);
      controlsRef.current.update();

      setModelLoaded(true);
      setIsLoading(false);
      URL.revokeObjectURL(url);

    }, undefined, (e) => {
      console.error(e);
      setIsLoading(false);
      alert("Error loading model");
    });
  };

  // --- 4. Animation Actions ---

  const handleExplode = () => {
    if (!modelLoaded) return;
    
    // If something is selected, reset it first
    if (selectedPart) handleResetSelection();

    if (isExploded) {
      // IMPLODE
      parts.forEach((part, i) => {
        const state = originalStates.get(part);
        gsap.to(part.position, {
          x: state.pos.x, y: state.pos.y, z: state.pos.z,
          duration: 1,
          ease: "power2.inOut",
          delay: i * 0.001 // slight stagger
        });
        gsap.to(part.rotation, {
          x: state.rot.x, y: state.rot.y, z: state.rot.z,
          duration: 1
        });
      });
      setIsExploded(false);
    } else {
      // EXPLODE
      parts.forEach((part, i) => {
        const state = originalStates.get(part);
        const vec = explodeVectors.get(part);
        
        gsap.to(part.position, {
          x: state.pos.x + vec.x,
          y: state.pos.y + vec.y,
          z: state.pos.z + vec.z,
          duration: 1.5,
          ease: "elastic.out(1, 0.75)",
          delay: i * 0.002
        });
        // Random spin
        gsap.to(part.rotation, {
          x: state.rot.x + Math.random(),
          y: state.rot.y + Math.random(),
          duration: 1.5
        });
      });
      setIsExploded(true);
    }
  };

  const handleResetSelection = () => {
    if (!selectedPart) return;
    
    // Stop inspection spin
    selectedPart.userData.isInspecting = false;

    // Restore all materials
    parts.forEach(p => {
      p.material = p.userData.originalMaterial.clone();
      p.material.transparent = false;
      p.material.opacity = 1;
      p.visible = true;
    });

    // Zoom out logic (Fit to whole model)
    const finalBox = new THREE.Box3();
    parts.forEach(p => finalBox.expandByObject(p));
    const center = finalBox.getCenter(new THREE.Vector3());
    const size = finalBox.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const fov = cameraRef.current.fov * (Math.PI / 180);
    let cameraZ = Math.abs(maxDim / 2 * Math.tan(fov * 2)) * 2.5;

    gsap.to(cameraRef.current.position, {
      x: center.x + cameraZ,
      y: center.y + (cameraZ * 0.5),
      z: center.z + cameraZ,
      duration: 1.2,
      ease: "power2.inOut"
    });
    gsap.to(controlsRef.current.target, {
      x: center.x, y: center.y, z: center.z,
      duration: 1.2
    });

    setSelectedPart(null);
  };

  const handlePartSelect = async (part) => {
    if (selectedPart === part) return;
    if (selectedPart) handleResetSelection();

    setSelectedPart(part);
    part.userData.isInspecting = true;

    // 1. Dim others - INCREASED OPACITY so they're visible
    parts.forEach(p => {
      if (p !== part) {
        p.material = new THREE.MeshBasicMaterial({
          color: 0x003366, // Brighter blue schematic
          wireframe: true,
          transparent: true,
          opacity: 0.3 // Increased from 0.1 to 0.3 for visibility
        });
      } else {
        // Highlight Selected - Keep it solid and bright
        p.material = p.userData.originalMaterial.clone();
        p.material.emissive = new THREE.Color(0x00ffff);
        p.material.emissiveIntensity = 0.5;
      }
    });

    // 2. Focus Camera - Better distance calculation
    const box = new THREE.Box3().setFromObject(part);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);

    // Smart zoom distance - ensure minimum distance
    const zoomDist = Math.max(maxDim * 4.0, 10); // Increased multiplier and added minimum
    
    // Calculate vector from current camera to object to maintain angle
    const offset = new THREE.Vector3().subVectors(cameraRef.current.position, center).normalize().multiplyScalar(zoomDist);

    gsap.to(cameraRef.current.position, {
      x: center.x + offset.x,
      y: center.y + offset.y,
      z: center.z + offset.z,
      duration: 1,
      ease: "power3.out"
    });
    
    gsap.to(controlsRef.current.target, {
      x: center.x, y: center.y, z: center.z,
      duration: 1
    });

    // 3. Get AI Data
    await generatePartExplanation(part.userData.partName);
  };

  const generatePartExplanation = async (partName) => {
    if (partExplanations.has(partName)) return;
    
    setLoadingExplanation(true);
    try {
      const prompt = `Analyze mechanical part: "${partName}". Return JSON: {"purpose": "text", "material": "text", "cost": "text", "tip": "text"}`;
      const text = await generateResponse(prompt);
      // Robust JSON parsing
      const match = text.match(/\{[\s\S]*\}/);
      const json = match ? JSON.parse(match[0]) : { purpose: "Details unavailable" };
      
      setPartExplanations(prev => new Map(prev).set(partName, json));
    } catch (e) {
      setPartExplanations(prev => new Map(prev).set(partName, { purpose: "Analysis Failed", material: "Unknown", cost: "N/A", tip: "N/A" }));
    } finally {
      setLoadingExplanation(false);
    }
  };

  const handleClick = () => {
    if (!raycasterRef.current || !mouseRef.current) return;
    raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);
    const intersects = raycasterRef.current.intersectObjects(parts, false);
    
    if (intersects.length > 0) {
      handlePartSelect(intersects[0].object);
    } else {
      handleResetSelection();
    }
  };

  return (
    <div className="h-screen bg-black text-white font-mono overflow-hidden flex flex-col">
      
      {/* Top Bar */}
      <div className="z-20 px-6 py-4 border-b border-cyan-900/30 bg-black/90 backdrop-blur flex justify-between items-center">
        <div className="flex items-center gap-6">
          <button onClick={() => navigate('/')} className="text-gray-400 hover:text-white transition-colors"><ArrowLeft /></button>
          <h1 className="text-xl font-bold tracking-widest text-cyan-500 flex items-center gap-2">
            <Cpu className="w-5 h-5 animate-pulse" /> J.A.R.V.I.S. VIEW
          </h1>
        </div>
        <div className="flex gap-4">
          {modelLoaded && (
            <button onClick={() => handleResetSelection()} className="p-2 rounded hover:bg-cyan-900/30 text-cyan-400 border border-transparent hover:border-cyan-500/50 transition-all" title="Fit View">
              <Maximize className="w-5 h-5" />
            </button>
          )}
          <button 
            onClick={handleExplode}
            disabled={!modelLoaded}
            className={`flex items-center gap-2 px-6 py-2 rounded border font-bold tracking-widest transition-all text-xs ${
              isExploded 
                ? 'border-red-500 text-red-500 hover:bg-red-950' 
                : 'border-cyan-500 text-cyan-500 hover:bg-cyan-950'
            } disabled:opacity-30`}
          >
            {isExploded ? <RotateCcw className="w-4 h-4" /> : <Scan className="w-4 h-4" />}
            {isExploded ? 'REASSEMBLE' : 'INITIATE EXPLODE'}
          </button>
          <button onClick={() => fileInputRef.current?.click()} className="bg-cyan-600 hover:bg-cyan-500 text-black font-bold px-6 py-2 rounded text-xs flex items-center gap-2">
            {isLoading ? <Loader2 className="animate-spin w-4 h-4" /> : <Upload className="w-4 h-4" />} UPLOAD GLB/FBX
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 relative flex overflow-hidden">
        
        {modelLoaded && <HUDOverlay selectedPartName={selectedPart?.userData?.partName} />}
        
        <div 
          ref={containerRef}
          className="flex-1 cursor-default outline-none"
          onMouseMove={handleMouseMove}
          onClick={handleClick}
        />

        {/* Sidebar */}
        <div className={`w-96 border-l border-cyan-900/30 bg-black/80 backdrop-blur absolute right-0 top-0 bottom-0 z-30 transition-transform duration-500 flex flex-col ${modelLoaded ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-4 border-b border-cyan-900/30 max-h-[400px] overflow-y-auto custom-scrollbar">
            <h3 className="text-cyan-600 text-[10px] font-bold uppercase tracking-widest mb-3">Parts Manifest</h3>
            <div className="space-y-[1px]">
              {partsList.map(p => (
                <button 
                  key={p.id}
                  onClick={(e) => {e.stopPropagation(); handlePartSelect(p.mesh)}}
                  className={`w-full text-left px-4 py-2 text-xs font-medium border-l-2 transition-all ${
                    selectedPart === p.mesh 
                      ? 'border-cyan-500 bg-cyan-950 text-cyan-300' 
                      : 'border-transparent text-gray-500 hover:text-gray-300 hover:bg-white/5'
                  }`}
                >
                  {p.name.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Detail Panel */}
          <div className="flex-1 p-6 overflow-y-auto">
            {selectedPart ? (
              <div className="animate-in fade-in duration-500">
                <div className="border-b border-cyan-500/30 pb-4 mb-6">
                  <h2 className="text-2xl text-cyan-400 font-bold font-mono break-words">{selectedPart.userData.partName.toUpperCase()}</h2>
                  <div className="flex items-center gap-2 mt-2 text-[10px] text-cyan-700 uppercase tracking-widest">
                    <span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"/> System Online
                  </div>
                </div>

                {loadingExplanation ? (
                  <div className="space-y-3 opacity-50">
                    <div className="h-2 bg-cyan-900 rounded w-full animate-pulse"/>
                    <div className="h-2 bg-cyan-900 rounded w-3/4 animate-pulse"/>
                    <div className="h-2 bg-cyan-900 rounded w-1/2 animate-pulse"/>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="bg-cyan-950/30 p-4 rounded border border-cyan-900/50">
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {partExplanations.get(selectedPart.userData.partName)?.purpose || "Data unavailable."}
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-black border border-cyan-900/30 rounded">
                        <div className="text-[10px] text-gray-500 uppercase mb-1">Material</div>
                        <div className="text-cyan-300 text-sm">{partExplanations.get(selectedPart.userData.partName)?.material || "Unknown"}</div>
                      </div>
                      <div className="p-3 bg-black border border-cyan-900/30 rounded">
                        <div className="text-[10px] text-gray-500 uppercase mb-1">Est. Cost</div>
                        <div className="text-green-400 text-sm">{partExplanations.get(selectedPart.userData.partName)?.cost || "N/A"}</div>
                      </div>
                    </div>

                    <div className="p-4 border border-orange-500/20 bg-orange-950/10 rounded">
                      <div className="text-[10px] text-orange-500 uppercase mb-1 font-bold">Engineer's Note</div>
                      <p className="text-orange-200/70 text-xs italic">
                        "{partExplanations.get(selectedPart.userData.partName)?.tip || "No additional notes."}"
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="h-full flex items-center justify-center opacity-20">
                <Scan className="w-24 h-24 stroke-1" />
              </div>
            )}
          </div>
        </div>

        {!modelLoaded && !isLoading && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center opacity-30">
              <Upload className="w-20 h-20 mx-auto mb-4" />
              <p className="tracking-[0.5em] font-bold text-lg">WAITING FOR SCHEMATIC</p>
            </div>
          </div>
        )}
      </div>
      
      <input ref={fileInputRef} type="file" accept=".glb,.gltf,.fbx" onChange={handleFileUpload} className="hidden" />
    </div>
  );
}
