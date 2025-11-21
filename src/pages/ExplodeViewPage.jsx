import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, ArrowLeft, Loader2, Crosshair, RotateCcw, Scan, Cpu, Maximize } from 'lucide-react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import gsap from 'gsap';
import { generateResponse, callGeminiVision } from '../services/gemini';

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
  const [originalCenter, setOriginalCenter] = useState(new THREE.Vector3()); // NEVER recalculate!

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
  }, [hoveredPart, selectedPart]);

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

  // --- 3. Helper: Classify by shape (IMPROVED) ---
  const classifyByShape = (size) => {
    const { x: width, y: height, z: length } = size;
    
    // Rocket: Tall and thin (height >> width, height >> length)
    if (height > width * 1.5 && height > length * 1.5) {
      return 'Rocket';
    }
    
    // Plane: Wide wingspan (width >> length, flat)
    if (width > length * 2 && height < width * 0.6) {
      return 'Aircraft';
    }
    
    // Car: Long and low (length > width, width ≈ height)
    if (length > width * 2 && width > height * 0.5) {
      return 'Vehicle';
    }
    
    // Boat: Long and low (length > width, height small)
    if (length > width * 2 && height < length * 0.5) {
      return 'Boat';
    }
    
    return '3D Model';
  };

  // --- 3.5. AI Vision Identification (MULTI-ANGLE + BATCH ANALYSIS) ---
  const identifyModelByVision = async (allParts, partsData) => {
    setAnalyzingModel(true);
    console.log('📸 Capturing multi-angle images for AI vision analysis...');
    
    try {
      // Step 1: Capture multiple angles for better accuracy
      const images = await captureMultiAngleImages();
      console.log(`📷 Captured ${images.length} views`);
      
      // Step 2: Send primary view to Gemini Vision API for model identification
      const identification = await analyzeModelImage(images[0], partsData);
      
      // Validate response
      if (!identification || !identification.modelType) {
        throw new Error('Invalid AI response - missing modelType');
      }
      
      // Step 3: Update UI with results
      const modelName = identification.modelType || 'Unknown Model';
      const confidence = identification.confidence || 'low';
      setModelType(`${modelName} (${confidence} confidence)`);
      
      // Step 4: Filter parts based on AI-identified critical components
      let filteredList = [];
      
      if (identification.criticalParts && identification.criticalParts.length > 0) {
        console.log('🎯 AI identified critical parts:', identification.criticalParts);
        
        partsData.forEach((partData) => {
          const partName = partData.name.toLowerCase();
          const isImportant = identification.criticalParts.some(crit => {
            const critLower = crit.toLowerCase();
            return partName.includes(critLower) || critLower.includes(partName);
          });
          
          if (isImportant) {
            filteredList.push(partData);
          }
        });
      }
      
      // Fallback to size-based if no matches
      if (filteredList.length === 0) {
        console.log('⚠️ No critical parts matched, using size filter');
        filteredList = filterBySize(partsData);
      }
      
      setPartsList(filteredList);
      console.log(`✅ AI Vision identified: ${modelName} | Showing ${filteredList.length} parts`);
      
      // Step 5: BATCH ANALYZE major parts automatically (pre-cache explanations)
      console.log('🤖 Starting batch analysis of major parts...');
      await batchAnalyzeParts(filteredList, modelName);
      
    } catch (error) {
      console.warn('⚠️ AI Vision failed, using shape detection:', error.message);
      
      // Fallback to shape detection
      const shapeBox = new THREE.Box3();
      allParts.forEach(m => shapeBox.expandByObject(m));
      const shapeSize = shapeBox.getSize(new THREE.Vector3());
      const category = classifyByShape(shapeSize);
      
      setModelType(`${category} (Shape Detected)`);
      
      const filteredList = filterBySize(partsData);
      setPartsList(filteredList);
    } finally {
      setAnalyzingModel(false);
    }
  };
  
  // Capture model from multiple angles (OPTIMIZED)
  const captureMultiAngleImages = async () => {
    return new Promise((resolve) => {
      const images = [];
      const angles = [
        { name: 'front', rotation: 0 },
        { name: 'side', rotation: Math.PI / 2 },
        { name: 'top', rotation: 0, elevation: Math.PI / 3 }
      ];
      
      // Store original camera position
      const originalPos = cameraRef.current.position.clone();
      const originalTarget = controlsRef.current.target.clone();
      
      // Calculate distance from center
      const distance = originalPos.distanceTo(originalCenter);
      
      angles.forEach(({ name, rotation, elevation = 0 }) => {
        // Position camera at angle
        const x = originalCenter.x + Math.cos(rotation) * Math.cos(elevation) * distance;
        const y = originalCenter.y + Math.sin(elevation) * distance;
        const z = originalCenter.z + Math.sin(rotation) * Math.cos(elevation) * distance;
        
        cameraRef.current.position.set(x, y, z);
        cameraRef.current.lookAt(originalCenter);
        
        // Render and capture with JPEG compression (smaller file size)
        rendererRef.current.render(sceneRef.current, cameraRef.current);
        const imageData = rendererRef.current.domElement.toDataURL('image/jpeg', 0.8);
        images.push({ name, data: imageData });
        
        console.log(`📷 Captured ${name} view (${(imageData.length / 1024).toFixed(0)}KB)`);
      });
      
      // Restore original camera position
      cameraRef.current.position.copy(originalPos);
      cameraRef.current.lookAt(originalTarget);
      controlsRef.current.target.copy(originalTarget);
      
      resolve(images);
    });
  };
  
  // FIX 2: Analyze parts INDIVIDUALLY (not in batches) to prevent MAX_TOKENS
  const batchAnalyzeParts = async (majorParts, modelType) => {
    if (majorParts.length === 0) return;
    
    console.log(`🔄 Analyzing ${majorParts.length} major parts individually (100% stable)...`);
    
    let successCount = 0;
    
    // Process each part individually to avoid MAX_TOKENS
    for (let i = 0; i < majorParts.length; i++) {
      const part = majorParts[i];
      
      console.log(`📦 Processing part ${i + 1}/${majorParts.length}: ${part.name}...`);
      
      try {
        const prompt = `Analyze this ${modelType} part: ${part.name}

YOU MUST RESPOND WITH VALID JSON ONLY.

Return exactly:
{"partName":"${part.name}","purpose":"brief purpose","material":"material type","cost":"estimate","tip":"1 sentence"}

RULES:
- ONLY valid JSON output
- NO markdown blocks
- Keep ALL fields under 40 characters
- If unknown, use "Unknown"`;

        console.log(`📝 Prompt tokens: ~${Math.ceil(prompt.length / 4)} (${prompt.length} chars)`);
        
        const response = await generateResponse(prompt);
        
        if (!response || !response.trim()) {
          console.warn(`⚠️ Empty response for ${part.name}`);
          continue;
        }
        
        console.log(`📄 ${part.name} raw response:`, response.substring(0, 200));
        
        // Try to parse JSON object
        let jsonMatch = response.match(/\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}/);
        
        // If wrapped in markdown, extract it
        if (!jsonMatch && response.includes('```')) {
          const codeBlock = response.match(/```(?:json)?\s*(\{[\s\S]*?\})\s*```/);
          if (codeBlock) jsonMatch = [codeBlock[1]];
        }
        
        if (jsonMatch) {
          const analysis = JSON.parse(jsonMatch[0]);
          
          // Cache the analysis
          if (analysis.partName) {
            setPartExplanations(prev => new Map(prev).set(analysis.partName, {
              purpose: analysis.purpose || 'Component analysis',
              material: analysis.material || 'Various materials',
              cost: analysis.cost || 'Contact supplier',
              tip: analysis.tip || 'Refer to technical documentation'
            }));
            successCount++;
            console.log(`✅ ${part.name} analyzed successfully`);
          }
        } else {
          console.warn(`⚠️ Could not parse JSON for ${part.name}`);
        }
        
        // Small delay between parts to avoid rate limiting
        if (i < majorParts.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 800));
        }
        
      } catch (error) {
        console.warn(`⚠️ ${part.name} failed:`, error.message);
        // Continue with next part
      }
    }
    
    console.log(`✅ Individual analysis complete: ${successCount}/${majorParts.length} parts analyzed`);
  };

  // Analyze image with Gemini Vision (ENHANCED PROMPT)
  const analyzeModelImage = async (imageObj, partsData) => {
    // Filter to only major parts (ignore screws, bolts, pins)
    const majorParts = partsData.filter(p => p.isMajor);
    
    console.log(`🎯 Analyzing ${majorParts.length} major parts (ignoring ${partsData.length - majorParts.length} small parts)`);
    
    // Get part names for context (limit to 10 to keep prompt small)
    const partNames = majorParts.slice(0, 10).map(p => p.name).join(', ');
    
    console.log(`📝 Prompt size: ~${partNames.length} chars for part names`);
    
    const prompt = `Identify this 3D model. Parts visible: ${partNames}

YOU MUST RESPOND WITH VALID JSON ONLY.

Return exactly:
{"modelType":"specific name","category":"rocket/car/plane/boat/spacecraft/vehicle","confidence":"high/medium/low","criticalParts":["part1","part2","part3"]}

RULES:
- ONLY valid JSON output
- NO markdown blocks
- modelType: specific (e.g., "SpaceX Falcon 9", "BMW M3")
- criticalParts: 3-5 LARGEST parts from list above
- Ignore screws/bolts/pins`;
    
    console.log(`📝 Model ID prompt tokens: ~${Math.ceil(prompt.length / 4)} (${prompt.length} chars)`);
    
    // Convert base64 to format Gemini expects
    const base64Data = imageObj.data.split(',')[1];
    
    // Detect mime type from data URL
    const mimeType = imageObj.data.match(/data:(image\/[^;]+);/)?.[1] || 'image/jpeg';
    
    // 🔥 Use the new stable callGeminiVision with proper retry logic
    // maxTokens=300 is perfect for model identification JSON (prevents MAX_TOKENS)
    const apiResponse = await callGeminiVision(prompt, [{
      mime_type: mimeType,
      data: base64Data
    }], 5, 300);
    
    // Extract text from API response (already validated in callGeminiVision)
    const response = apiResponse.candidates?.[0]?.content?.parts?.[0]?.text;
    
    console.log('📄 Full AI response:', response);
    
    // Try multiple JSON extraction methods
    let jsonData = null;
    
    // Method 1: Direct JSON parse (if response is pure JSON)
    try {
      jsonData = JSON.parse(response);
      console.log('✅ Parsed JSON directly');
    } catch (e) {
      // Method 2: Extract from markdown code block
      const codeBlock = response.match(/```(?:json)?\s*(\{[\s\S]*?\})\s*```/);
      if (codeBlock) {
        try {
          jsonData = JSON.parse(codeBlock[1]);
          console.log('✅ Parsed JSON from code block');
        } catch (e2) {
          // Method 3: Find first complete JSON object
          const jsonMatch = response.match(/\{[^{}]*(?:\{[^{}]*\}[^{}]*)*\}/);
          if (jsonMatch) {
            try {
              jsonData = JSON.parse(jsonMatch[0]);
              console.log('✅ Parsed JSON from regex match');
            } catch (e3) {
              console.warn('❌ All JSON parsing methods failed');
            }
          }
        }
      }
    }
    
    if (!jsonData) {
      console.warn('Could not parse JSON from response:', response.substring(0, 500));
      throw new Error('Invalid JSON response');
    }
    
    // Validate required fields
    if (!jsonData.modelType || !jsonData.category) {
      console.warn('Missing required fields in JSON:', jsonData);
      throw new Error('Incomplete JSON response');
    }
    
    return jsonData;
  };

  // --- 4. Model Loading Logic (The Fix) ---
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

      // Calculate size threshold for filtering small parts (5% of model size)
      const maxModelDim = Math.max(scaledSize.x, scaledSize.y, scaledSize.z);
      const sizeThreshold = maxModelDim * 0.05; // Parts smaller than 5% are considered "small"
      
      console.log(`🔍 Size threshold for major parts: ${sizeThreshold.toFixed(2)} units`);

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
        
        // Calculate part size for filtering
        const partBox = new THREE.Box3().setFromObject(mesh);
        const partSize = partBox.getSize(new THREE.Vector3());
        const partDiagonal = partSize.length();
        const partVolume = partSize.x * partSize.y * partSize.z;
        
        // Metadata
        mesh.userData.isPart = true;
        mesh.userData.originalMaterial = mesh.material.clone();
        mesh.userData.size = partDiagonal;
        mesh.userData.volume = partVolume;
        mesh.userData.isMajorPart = partDiagonal > sizeThreshold; // Flag major parts
        
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
        partsData.push({ 
          id: i, 
          name: pName, 
          mesh: mesh,
          size: partDiagonal,
          volume: partVolume,
          isMajor: mesh.userData.isMajorPart
        });
      });
      
      // Log filtering stats
      const majorParts = partsData.filter(p => p.isMajor);
      const minorParts = partsData.filter(p => !p.isMajor);
      console.log(`📊 Parts breakdown: ${majorParts.length} major, ${minorParts.length} minor (screws/bolts/pins)`);

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
      
      // STORE ORIGINAL CENTER - Never recalculate!
      setOriginalCenter(finalCenter.clone());
      
      console.log(`✅ Loaded ${newParts.length} parts`);
      console.log('Model center:', finalCenter);
      console.log('Model size:', finalSize);
      console.log('Camera position AFTER fit:', cameraRef.current.position);
      console.log('Camera looking at:', controlsRef.current.target);

      setModelLoaded(true);
      setIsLoading(false);
      URL.revokeObjectURL(url);

      // AI VISION IDENTIFICATION - Multi-angle capture and analysis
      setTimeout(() => {
        identifyModelByVision(newParts, partsData);
      }, 1000);

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
      // NEVER filter parts array - keep all meshes for raycasting/explode
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
      // NEVER filter parts array - keep all meshes for raycasting/explode
      
    } catch (e) {
      console.warn("⚠️ AI failed (non-critical):", e.message);
      // Fallback: show top 10 largest parts
      const filteredList = filterBySize(allPartsData);
      
      console.log(`✅ Fallback: showing ${filteredList.length} largest parts`);
      
      setModelType(`${category} (AI Unavailable)`);
      setPartsList(filteredList);
      // NEVER filter parts array - keep all meshes for raycasting/explode
    } finally {
      setAnalyzingModel(false);
    }
  };



  // Helper function to filter by size
  const filterBySize = (allPartsData) => {
    console.log('📏 Filtering by bounding box size...');
    
    // Filter to only major parts first (ignore screws, bolts, pins)
    const majorParts = allPartsData.filter(p => p.isMajor);
    
    console.log(`🔍 Filtering from ${majorParts.length} major parts (ignoring ${allPartsData.length - majorParts.length} small parts)`);
    
    // Sort by volume (largest first) and take top 10
    const sortedParts = majorParts
      .sort((a, b) => b.volume - a.volume)
      .slice(0, 10);
    
    console.log('Top 10 major parts by size:', sortedParts.map(p => ({
      name: p.name,
      volume: p.volume.toFixed(2),
      size: p.size.toFixed(2)
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

    // Reset Camera - Use ORIGINAL center (never recalculate!)
    const dist = 200; // Fixed distance
    const angle = Math.PI / 4;

    gsap.to(cameraRef.current.position, {
      x: originalCenter.x + Math.cos(angle) * dist,
      y: originalCenter.y + dist * 0.5,
      z: originalCenter.z + Math.sin(angle) * dist,
      duration: 1.2,
      ease: "power2.inOut"
    });
    gsap.to(controlsRef.current.target, {
      x: originalCenter.x, y: originalCenter.y, z: originalCenter.z,
      duration: 1.2
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
    // Check if already cached from batch analysis
    if (partExplanations.has(partName)) {
      console.log(`✅ Using cached analysis for ${partName}`);
      return;
    }
    
    setLoadingExplanation(true);
    console.log(`🔍 Generating individual analysis for ${partName}...`);
    
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

Be specific and technical. Use real-world engineering knowledge. Output ONLY the JSON.`;
      
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
      console.log(`✅ Generated analysis for ${partName}`);
    } catch (e) {
      console.warn(`⚠️ Failed to analyze ${partName}:`, e.message);
      // Provide fallback data
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
