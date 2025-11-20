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
const HUDOverlay = ({ selectedPartName, modelType, isAnalyzing }) => (
  <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
    {/* Tech Corners */}
    <div className="absolute top-6 left-6 w-32 h-32 border-l-2 border-t-2 border-cyan-500/40 rounded-tl-3xl opacity-80" />
    <div className="absolute bottom-6 right-6 w-32 h-32 border-r-2 border-b-2 border-cyan-500/40 rounded-br-3xl opacity-80" />
    
    {/* Crosshair Lines */}
    <div className="absolute top-1/2 left-0 w-12 h-[1px] bg-cyan-500/50" />
    <div className="absolute top-1/2 right-0 w-12 h-[1px] bg-cyan-500/50" />
    <div className="absolute top-0 left-1/2 w-[1px] h-12 bg-cyan-500/50" />
    <div className="absolute bottom-0 left-1/2 w-[1px] h-12 bg-cyan-500/50" />
    
    {/* Center Status */}
    {(selectedPartName || isAnalyzing) && (
      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2">
        <div className="bg-black/80 border border-cyan-400/50 px-8 py-3 rounded backdrop-blur-md shadow-[0_0_20px_rgba(0,255,255,0.2)]">
          <div className="flex items-center gap-3">
            {isAnalyzing ? (
              <>
                <Loader2 className="w-4 h-4 text-cyan-400 animate-spin" />
                <span className="text-cyan-400 font-mono font-bold tracking-[0.15em] text-sm">
                  IDENTIFYING BLUEPRINT...
                </span>
              </>
            ) : (
              <>
                <Crosshair className="w-4 h-4 text-cyan-400 animate-spin-slow" />
                <span className="text-cyan-400 font-mono font-bold tracking-[0.15em] text-sm">
                  ANALYZING: {selectedPartName ? selectedPartName.toUpperCase() : "SYSTEM READY"}
                </span>
              </>
            )}
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
  const [modelType, setModelType] = useState(''); // "Falcon 9", "Porsche 911", etc.
  const [analyzingModel, setAnalyzingModel] = useState(false);

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

    // Lighting (BRIGHT for visibility)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5); // Increased brightness
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.0); // Increased
    dirLight.position.set(10, 20, 10);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    scene.add(dirLight);

    const dirLight2 = new THREE.DirectionalLight(0xffffff, 1.0); // Additional light
    dirLight2.position.set(-10, -20, -10);
    scene.add(dirLight2);

    const blueRim = new THREE.SpotLight(0x00ffff, 50);
    blueRim.position.set(-20, 0, -10);
    scene.add(blueRim);

    const purpleFill = new THREE.PointLight(0xbd00ff, 2);
    purpleFill.position.set(20, -10, 0);
    scene.add(purpleFill);
    
    console.log('✅ Scene setup complete with enhanced lighting');

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
        // Clear old hover - check if material has emissive property
        if (hoveredPart && hoveredPart !== selectedPart && hoveredPart.material.emissive) {
          hoveredPart.material.emissive.setHex(0x000000);
        }
        // Set new hover - only if not selected and material supports emissive
        if (obj !== selectedPart && obj.material.emissive) {
          obj.material.emissive = new THREE.Color(0x00ffff);
          obj.material.emissiveIntensity = 0.3;
        }
        setHoveredPart(obj);
        containerRef.current.style.cursor = 'pointer';
      }
    } else {
      if (hoveredPart) {
        if (hoveredPart !== selectedPart && hoveredPart.material.emissive) {
          hoveredPart.material.emissive.setHex(0x000000);
        }
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
      
      // AUTO-SCALE: Normalize ALL models to ~100 units
      const maxDimension = Math.max(size.x, size.y, size.z);
      const targetSize = 100;
      const scaleFactor = targetSize / maxDimension;
      
      console.log(`📏 Original: ${maxDimension.toFixed(2)} units → Scaling ${scaleFactor.toFixed(4)}x`);
      
      root.scale.multiplyScalar(scaleFactor);
      root.updateMatrixWorld(true);
      
      // Recalculate after scaling
      const scaledBox = new THREE.Box3().setFromObject(root);
      const scaledSize = scaledBox.getSize(new THREE.Vector3());
      const scaledCenter = scaledBox.getCenter(new THREE.Vector3());
      
      console.log(`✅ Scaled: ${Math.max(scaledSize.x, scaledSize.y, scaledSize.z).toFixed(2)} units`);

      // 2. Flatten and Reparent logic (use scaled values)
      // To make "explode" work, we need all parts to be children of the Scene,
      // NOT buried in groups. But we must preserve their World Transform.
      const meshes = [];
      
      // FIXED: Recursive traversal to find ALL meshes
      const findAllMeshes = (obj) => {
        if (obj.isMesh) {
          meshes.push(obj);
        }
        if (obj.children) {
          obj.children.forEach(child => findAllMeshes(child));
        }
      };
      findAllMeshes(root);
      
      console.log(`🔍 Found ${meshes.length} meshes in model`);

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
          
          // Ensure material is visible
          if (mesh.material.isMeshStandardMaterial || mesh.material.isMeshPhysicalMaterial) {
            mesh.material.metalness = 0.5;
            mesh.material.roughness = 0.4;
            // Ensure color is not black
            if (mesh.material.color.r === 0 && mesh.material.color.g === 0 && mesh.material.color.b === 0) {
              mesh.material.color.setHex(0x888888); // Gray if black
            }
          }
        }

        // Store World Transform
        mesh.updateMatrixWorld(true);
        const worldPos = new THREE.Vector3();
        const worldQuat = new THREE.Quaternion();
        const worldScale = new THREE.Vector3();
        mesh.matrixWorld.decompose(worldPos, worldQuat, worldScale);

        // Keep flattening for explode to work
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
        // Note: We use the 'scaledCenter' we calculated from the whole model earlier
        const explodeDir = new THREE.Vector3().subVectors(worldPos, scaledCenter).normalize();
        
        // Fallback for parts exactly at center
        if (explodeDir.lengthSq() === 0) explodeDir.set(Math.random(), Math.random(), Math.random()).normalize();
        
        // Variable explode distance based on SCALED model size
        const maxDim = Math.max(scaledSize.x, scaledSize.y, scaledSize.z);
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

      // IMPORTANT: Keep all parts visible and ensure proper rendering
      newParts.forEach((p, i) => {
        p.visible = true;
        p.frustumCulled = false; // Prevent culling
        
        // Force material update and ensure it's visible
        if (p.material) {
          p.material.needsUpdate = true;
          p.material.transparent = false;
          p.material.opacity = 1;
          p.material.depthTest = true;
          p.material.depthWrite = true;
          
          // Add bright color for debugging
          if (i === 0) {
            console.log('First part material:', {
              type: p.material.type,
              visible: p.visible,
              opacity: p.material.opacity,
              color: p.material.color
            });
          }
        }
      });
      
      setParts(newParts);
      setOriginalStates(states);
      setExplodeVectors(vectors);
      setPartsList(partsData); // Show all initially
      
      // 3. FIT CAMERA (FIXED - Reasonable distance)
      // Re-calculate box now that parts are in the scene
      const finalBox = new THREE.Box3();
      newParts.forEach(p => finalBox.expandByObject(p));
      const finalCenter = finalBox.getCenter(new THREE.Vector3());
      const finalSize = finalBox.getSize(new THREE.Vector3());
      
      const maxDim = Math.max(finalSize.x, finalSize.y, finalSize.z);
      
      // FIXED: Reasonable camera distance (not 700 units!)
      const cameraDistance = Math.max(maxDim * 2, 150); // Max 150-200 units
      
      // Position camera at 45-degree angle
      const angle = Math.PI / 4; // 45 degrees
      const camX = finalCenter.x + Math.cos(angle) * cameraDistance;
      const camY = finalCenter.y + cameraDistance * 0.5;
      const camZ = finalCenter.z + Math.sin(angle) * cameraDistance;
      
      cameraRef.current.position.set(camX, camY, camZ);
      cameraRef.current.lookAt(finalCenter);
      
      // Update Controls Target to center of model
      controlsRef.current.target.copy(finalCenter);
      controlsRef.current.update();
      
      console.log(`✅ Loaded ${newParts.length} parts`);
      console.log('Model center:', finalCenter);
      console.log('Model size:', finalSize);
      console.log('Camera position AFTER fit:', cameraRef.current.position);
      console.log('Camera looking at:', controlsRef.current.target);

      setModelLoaded(true);
      setIsLoading(false);
      URL.revokeObjectURL(url);

      // TRIGGER AI IDENTIFICATION (after model is visible)
      // If it fails, will automatically use size-based filtering
      setTimeout(() => identifyModel(partsData), 1000);

    }, undefined, (e) => {
      console.error(e);
      setIsLoading(false);
      alert("Error loading model");
    });
  };

  // --- 4. AI Identification Logic ---
  const identifyModel = async (allPartsData) => {
    console.log(`🔍 Analyzing ${allPartsData.length} parts...`);
    setAnalyzingModel(true);
    
    // STEP 1: Detect model type by bounding box shape
    const allMeshes = allPartsData.map(p => p.mesh);
    const modelBox = new THREE.Box3();
    allMeshes.forEach(m => modelBox.expandByObject(m));
    const modelSize = modelBox.getSize(new THREE.Vector3());
    
    const category = classifyByShape(modelSize);
    console.log(`📐 Shape analysis: ${modelSize.x.toFixed(1)} × ${modelSize.y.toFixed(1)} × ${modelSize.z.toFixed(1)} → ${category}`);
    
    // Check if names are too generic (Object 1, Object 2, etc.)
    const genericNames = allPartsData.filter(p => 
      /^(object|mesh|part|node|group)\s*\d+$/i.test(p.name.trim())
    );
    
    if (genericNames.length > allPartsData.length * 0.5) {
      console.log('⚠️ Model has generic names, using shape-based classification');
      const filteredList = filterBySize(allPartsData);
      setModelType(`${category} (Shape Detected)`);
      setPartsList(filteredList);
      setParts(filteredList.map(p => p.mesh));
      setAnalyzingModel(false);
      return;
    }
    
    // Prepare a list of names for the AI (truncate if too long)
    const namesList = allPartsData.map(p => p.name).slice(0, 100).join(', ');
    
    const prompt = `Analyze 3D model parts: ${namesList}

Identify the model and select 5-10 LARGEST components only.

Return ONLY this JSON (no other text):
{
  "modelType": "Model Name",
  "criticalParts": ["part1", "part2"]
}

Rules:
- Rockets: engine, nozzle, tank, fairing
- Cars: engine, chassis, transmission
- Planes: wings, fuselage, engines
- IGNORE small parts`;
    
    try {
      const response = await generateResponse(prompt);
      
      // FIXED: Check for empty response
      if (!response || !response.trim()) {
        throw new Error('Empty API response');
      }
      
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      
      let filteredList = [];
      let type = "Unknown Model";
      
      if (jsonMatch) {
        const data = JSON.parse(jsonMatch[0]);
        type = data.modelType || "3D Model";
        
        // Filter for sidebar only - keep all parts visible in 3D
        if (data.criticalParts && data.criticalParts.length > 0) {
          allPartsData.forEach((partData) => {
            const partName = partData.name.toLowerCase();
            const isImportant = data.criticalParts.some(crit => {
              const critLower = crit.toLowerCase();
              return partName.includes(critLower) || critLower.includes(partName);
            });
            
            if (isImportant) {
              filteredList.push(partData);
            }
            // Keep ALL parts visible in 3D scene
            partData.mesh.visible = true;
          });
        }
      }
      
      // If filtering failed or too aggressive, show top 10 largest parts
      if (filteredList.length === 0) {
        console.log('⚠️ No parts matched, using size-based filtering');
        filteredList = filterBySize(allPartsData);
      }
      
      console.log(`✅ Identified: ${type}`);
      console.log(`📋 Showing ${filteredList.length} critical parts`);
      
      setModelType(type);
      setPartsList(filteredList);
      
      // Update parts array to only include visible parts
      setParts(filteredList.map(p => p.mesh));
      
    } catch (e) {
      console.warn("⚠️ AI failed (non-critical):", e.message);
      // Fallback: show top 10 largest parts
      const filteredList = filterBySize(allPartsData);
      
      console.log(`✅ Fallback: showing ${filteredList.length} largest parts`);
      
      setModelType(`${category} (AI Unavailable)`);
      setPartsList(filteredList);
      setParts(filteredList.map(p => p.mesh));
    } finally {
      setAnalyzingModel(false);
    }
  };

  // Helper function to classify model by bounding box shape
  const classifyByShape = (size) => {
    const { x, y, z } = size;
    const maxDim = Math.max(x, y, z);
    const ratioXY = x / y;
    const ratioYZ = y / z;
    const ratioXZ = x / z;
    
    // Rocket: Very tall (Y >> X, Y >> Z), cylindrical
    if (y > x * 3 && y > z * 3 && Math.abs(x - z) < maxDim * 0.3) {
      return 'Rocket';
    }
    
    // Plane: Wide wings (X >> Y, X >> Z), flat
    if (x > y * 2 && x > z * 1.5 && y < z) {
      return 'Aircraft';
    }
    
    // Car: Long (X > Y), low (Y < Z), rectangular
    if (x > y * 1.5 && y < z && ratioXZ > 1.2) {
      return 'Vehicle';
    }
    
    // Boat: Long (X > Y), curved bottom
    if (x > y * 1.5 && x > z * 1.2) {
      return 'Boat';
    }
    
    // Spacecraft: Roughly cubic or complex
    if (Math.abs(ratioXY - 1) < 0.5 && Math.abs(ratioYZ - 1) < 0.5) {
      return 'Spacecraft';
    }
    
    return '3D Model';
  };

  // Helper function to filter by size
  const filterBySize = (allPartsData) => {
    console.log('📏 Filtering by bounding box size...');
    
    // Calculate size for each part
    const partsWithSize = allPartsData.map(p => {
      const box = new THREE.Box3().setFromObject(p.mesh);
      const size = box.getSize(new THREE.Vector3());
      const volume = size.x * size.y * size.z;
      return { ...p, volume, size: size.length() };
    });
    
    // Sort by volume (largest first) and take top 10
    const sortedParts = partsWithSize
      .sort((a, b) => b.volume - a.volume)
      .slice(0, 10);
    
    console.log('Top 10 parts by size:', sortedParts.map(p => ({
      name: p.name,
      volume: p.volume.toFixed(2)
    })));
    
    // DON'T hide parts - keep them all visible
    // Just return the filtered list for the sidebar
    allPartsData.forEach(p => {
      p.mesh.visible = true; // Keep all visible
    });
    
    return sortedParts;
  };

  // --- 5. Animation Actions ---

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
    selectedPart.userData.isInspecting = false;

    // BRING EVERYTHING BACK
    parts.forEach((p, i) => {
      const state = originalStates.get(p);
      p.visible = true;
      p.material.transparent = true;
      p.material.opacity = 0;
      
      if (p.material.emissive) {
        p.material.emissive.setHex(0x000000); // Reset glow
      }

      // Move back
      gsap.to(p.position, {
        x: state.pos.x, y: state.pos.y, z: state.pos.z,
        duration: 1, ease: "back.out(1.2)", delay: i * 0.005
      });
      // Fade in
      gsap.to(p.material, {
        opacity: 1, duration: 0.8, delay: i * 0.005,
        onComplete: () => { p.material.transparent = false; }
      });
      // Rotate back
      gsap.to(p.rotation, {
        x: state.rot.x, y: state.rot.y, z: state.rot.z, duration: 1
      });
    });

    // Reset Camera
    const box = new THREE.Box3().setFromObject(sceneRef.current);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const dist = maxDim * 2.0;

    gsap.to(cameraRef.current.position, {
      x: center.x + dist, y: center.y + (dist * 0.5), z: center.z + dist,
      duration: 1.2, ease: "power2.inOut"
    });
    gsap.to(controlsRef.current.target, {
      x: center.x, y: center.y, z: center.z, duration: 1.2
    });

    setSelectedPart(null);
  };

  const handlePartSelect = async (part) => {
    if (selectedPart === part) return;
    if (selectedPart) handleResetSelection();

    setSelectedPart(part);
    part.userData.isInspecting = true;

    // 1. DISAPPEAR ANIMATION FOR OTHERS
    parts.forEach((p, i) => {
      if (p !== part) {
        const vec = explodeVectors.get(p);
        
        // Fly away fast
        gsap.to(p.position, {
          x: p.position.x + (vec.x * 5),
          y: p.position.y + (vec.y * 5),
          z: p.position.z + (vec.z * 5),
          duration: 0.8, ease: "power2.in"
        });
        // Fade out
        p.material.transparent = true;
        gsap.to(p.material, {
          opacity: 0, duration: 0.5,
          onComplete: () => { p.visible = false; }
        });
      } else {
        // Highlight Selected
        const mat = p.userData.originalMaterial.clone();
        mat.emissive = new THREE.Color(0x00ffff);
        mat.emissiveIntensity = 0.5;
        p.material = mat;
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
      const contextPrompt = modelType 
        ? `You are analyzing the "${partName}" component from a ${modelType}.` 
        : `You are analyzing the "${partName}" component.`;
      
      const prompt = `${contextPrompt}

Provide detailed engineering analysis in JSON format:
{
  "purpose": "Detailed explanation of what this part does and why it's critical",
  "material": "Specific materials used (e.g., Titanium alloy, Carbon fiber, Aluminum 7075)",
  "cost": "Realistic cost estimate with currency",
  "tip": "Professional engineering insight or maintenance tip"
}

Be specific and technical. Use real-world engineering knowledge.`;
      
      const text = await generateResponse(prompt);
      
      // Robust JSON parsing
      if (!text || text.trim() === '') {
        throw new Error('Empty response from API');
      }
      
      const match = text.match(/\{[\s\S]*\}/);
      const json = match ? JSON.parse(match[0]) : { 
        purpose: "AI analysis unavailable for this part", 
        material: "Unknown", 
        cost: "N/A", 
        tip: "Manual inspection recommended" 
      };
      
      setPartExplanations(prev => new Map(prev).set(partName, json));
    } catch (e) {
      // Silently handle errors - don't log to console
      setPartExplanations(prev => new Map(prev).set(partName, { 
        purpose: "This component is part of the assembly structure", 
        material: "Varies by design", 
        cost: "Contact supplier", 
        tip: "Refer to technical documentation for detailed specifications" 
      }));
    } finally {
      setLoadingExplanation(false);
    }
  };

  const handleClick = () => {
    raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);
    const intersects = raycasterRef.current.intersectObjects(parts.filter(p => p.visible), false);
    if (intersects.length > 0) handlePartSelect(intersects[0].object);
    else handleResetSelection();
  };

  return (
    <div className="h-screen bg-black text-white font-mono overflow-hidden flex flex-col">
      
      {/* Top Bar */}
      <div className="z-20 px-6 py-4 border-b border-cyan-900/30 bg-black/90 backdrop-blur flex justify-between items-center">
        <div className="flex items-center gap-6">
          <button onClick={() => navigate('/')} className="text-gray-400 hover:text-white transition-colors"><ArrowLeft /></button>
          <div>
            <h1 className="text-xl font-bold tracking-widest text-cyan-500 flex items-center gap-2">
              <Cpu className="w-5 h-5 animate-pulse" /> J.A.R.V.I.S. VIEW
            </h1>
            {modelType && <p className="text-[10px] text-cyan-400/60 tracking-widest mt-1">TARGET: {modelType.toUpperCase()}</p>}
          </div>
        </div>
        <div className="flex gap-4">
          {modelLoaded && (
            <>
              <button 
                onClick={() => {
                  // Show all parts
                  parts.forEach(p => p.visible = true);
                  setPartsList(parts.map((p, i) => ({ id: i, name: p.userData.partName, mesh: p })));
                }} 
                className="px-4 py-2 text-xs rounded bg-gray-700 hover:bg-gray-600 text-white transition-all"
                title="Show All Parts"
              >
                SHOW ALL
              </button>
              <button onClick={() => handleResetSelection()} className="p-2 rounded hover:bg-cyan-900/30 text-cyan-400 border border-transparent hover:border-cyan-500/50 transition-all" title="Fit View">
                <Maximize className="w-5 h-5" />
              </button>
            </>
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
        
        {modelLoaded && <HUDOverlay selectedPartName={selectedPart?.userData?.partName} modelType={modelType} isAnalyzing={analyzingModel} />}
        
        <div 
          ref={containerRef}
          className="flex-1 cursor-default outline-none"
          onMouseMove={handleMouseMove}
          onClick={handleClick}
        />

        {/* Sidebar */}
        <div className={`w-96 border-l border-cyan-900/30 bg-black/80 backdrop-blur absolute right-0 top-0 bottom-0 z-30 transition-transform duration-500 flex flex-col ${modelLoaded ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-4 border-b border-cyan-900/30 max-h-[400px] overflow-y-auto custom-scrollbar">
            <h3 className="text-cyan-600 text-[10px] font-bold uppercase tracking-widest mb-3">
              {analyzingModel ? "Scanning Systems..." : `Critical Components (${partsList.length})`}
            </h3>
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
