import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, ArrowLeft, Loader2, Crosshair, RotateCcw, Scan, Cpu, Maximize, Lock, Crown } from 'lucide-react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import gsap from 'gsap';
import { generateResponse } from '../services/gemini';
import { useUsageLimits } from '../contexts/UsageLimitsContext';

// --- HUD Overlay (Visuals) ---
const HUDOverlay = ({ selectedPartName, modelType, isAnalyzing, hoveredPartName, mousePosition }) => (
  <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
    {/* Tech Corners */}
    <div className="absolute top-6 left-6 w-32 h-32 border-l-2 border-t-2 border-cyan-500/40 rounded-tl-3xl opacity-80" />
    <div className="absolute bottom-6 right-6 w-32 h-32 border-r-2 border-b-2 border-cyan-500/40 rounded-br-3xl opacity-80" />
    
    {/* Crosshair Lines */}
    <div className="absolute top-1/2 left-0 w-12 h-[1px] bg-cyan-500/50" />
    <div className="absolute top-1/2 right-0 w-12 h-[1px] bg-cyan-500/50" />
    <div className="absolute top-0 left-1/2 w-[1px] h-12 bg-cyan-500/50" />
    <div className="absolute bottom-0 left-1/2 w-[1px] h-12 bg-cyan-500/50" />
    
    {/* Floating Hover Label */}
    {hoveredPartName && !selectedPartName && mousePosition && (
      <div 
        className="absolute pointer-events-none animate-fade-in"
        style={{
          left: `${mousePosition.x + 20}px`,
          top: `${mousePosition.y - 10}px`,
          transform: 'translateY(-100%)'
        }}
      >
        <div className="bg-gradient-to-r from-cyan-500/90 to-blue-500/90 backdrop-blur-md px-4 py-2 rounded-lg shadow-[0_0_30px_rgba(0,255,255,0.5)] border border-cyan-300/50">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-cyan-300 rounded-full animate-pulse" />
            <span className="text-white font-bold text-sm tracking-wide">
              {hoveredPartName}
            </span>
          </div>
          <div className="text-xs text-cyan-100 mt-1 opacity-80">
            Click to inspect
          </div>
        </div>
        {/* Arrow pointing to part */}
        <div className="absolute left-4 bottom-0 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-cyan-500/90 transform translate-y-full" />
      </div>
    )}
    
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
  const { canUseExplodeMode, useExplodeMode, getRemainingExplodes, getTimeUntilReset, isPremium, userTier } = useUsageLimits();
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const controlsRef = useRef(null);
  const raycasterRef = useRef(new THREE.Raycaster());
  const mouseRef = useRef(new THREE.Vector2());
  const fileInputRef = useRef(null);

  // 🔥 CRITICAL FIX: Use refs for animation loop to prevent scene reset
  const hoveredPartRef = useRef(null);
  const selectedPartRef = useRef(null);

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
  const [modelInput, setModelInput] = useState('');
  const [modelInfo, setModelInfo] = useState(null);
  const [isAnalyzingImage, setIsAnalyzingImage] = useState(false);
  const imageInputRef = useRef(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const [userInteracting, setUserInteracting] = useState(false);
  const interactionTimeoutRef = useRef(null);
  const [mousePosition, setMousePosition] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);

  // --- 1. Setup Scene ---
  useEffect(() => {
    if (!containerRef.current) return;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x05070a); // Deep UI Black/Blue
    scene.fog = new THREE.FogExp2(0x05070a, 0.002); // Soft fog for depth
    scene.environment = null; // Prevent HDR environment map issues
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
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true, 
      powerPreference: 'high-performance',
      preserveDrawingBuffer: true // REQUIRED FOR SCREENSHOTS - prevents GL_INVALID_OPERATION
    });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    // FIX: Prevent texture immutability issues
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.NoToneMapping;
    // Don't override capabilities - causes texture errors
    
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Controls with auto-rotate
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = true;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.0; // Slow, cinematic rotation
    controlsRef.current = controls;
    
    // Detect user interaction to pause auto-rotate
    const handleInteractionStart = () => {
      setUserInteracting(true);
      controls.autoRotate = false;
      
      // Clear existing timeout
      if (interactionTimeoutRef.current) {
        clearTimeout(interactionTimeoutRef.current);
      }
      
      // Resume auto-rotate after 3 seconds of inactivity
      interactionTimeoutRef.current = setTimeout(() => {
        setUserInteracting(false);
        if (autoRotate) {
          controls.autoRotate = true;
        }
      }, 3000);
    };
    
    renderer.domElement.addEventListener('mousedown', handleInteractionStart);
    renderer.domElement.addEventListener('touchstart', handleInteractionStart);
    renderer.domElement.addEventListener('wheel', handleInteractionStart);

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
    let frameCount = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      
      // 🔥 FIX: Use refs instead of state to avoid stale closures
      const currentHover = hoveredPartRef.current;
      const currentSelect = selectedPartRef.current;
      
      // Hover Effect Pulse - SAFE: Only modify intensity, not color
      if (currentHover && !currentSelect) {
        const materials = Array.isArray(currentHover.material) ? currentHover.material : [currentHover.material];
        materials.forEach(mat => {
          if (mat && mat.emissive && mat.userData.isHovered) {
            const pulse = (Math.sin(Date.now() * 0.005) + 1) * 0.5;
            mat.emissiveIntensity = 0.2 + (pulse * 0.2);
          }
        });
      }
      
      // Inspection Rotation
      if (currentSelect && currentSelect.userData.isInspecting) {
        currentSelect.rotation.y += 0.002;
      }
      
      // Periodic visibility check (every 60 frames = ~1 second)
      frameCount++;
      if (frameCount % 60 === 0) {
        scene.traverse((obj) => {
          if (obj.userData.isPart) {
            // Ensure part stays visible
            if (!obj.visible) obj.visible = true;
            
            // Ensure part is in scene
            if (!obj.parent) scene.add(obj);
            
            // Fix material opacity
            const materials = Array.isArray(obj.material) ? obj.material : [obj.material];
            materials.forEach(mat => {
              if (mat && !mat.transparent && mat.opacity !== 1) {
                mat.opacity = 1; // Fix any opacity drift
              }
            });
          }
        });
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
  }, []); // 🔥 CRITICAL FIX: Empty array - scene only created ONCE

  // --- 2. Raycasting (Interaction) - Using Refs ---
  const handleMouseMove = (e) => {
    if (!parts.length || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouseRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    
    // Update mouse position for floating label
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });

    raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);
    
    // Intersect parts
    const intersects = raycasterRef.current.intersectObjects(parts, false);

    // 🔥 FIX: Use refs for comparison to avoid stale state
    const currentHover = hoveredPartRef.current;
    const currentSelect = selectedPartRef.current;

    if (intersects.length > 0) {
      const obj = intersects[0].object;
      if (currentHover !== obj) {
        // Clear old hover - SAFE: Only reset hex, don't create new Color
        if (currentHover && currentHover !== currentSelect) {
          const materials = Array.isArray(currentHover.material) ? currentHover.material : [currentHover.material];
          materials.forEach(mat => {
            if (mat && mat.emissive) {
              mat.emissive.setHex(0x000000);
              mat.emissiveIntensity = 0;
              mat.userData.isHovered = false;
            }
          });
        }
        // Set new hover - SAFE: Only modify existing emissive, don't create new
        if (obj !== currentSelect) {
          const materials = Array.isArray(obj.material) ? obj.material : [obj.material];
          materials.forEach(mat => {
            if (mat && mat.emissive) {
              mat.emissive.setHex(0x00ffff);
              mat.emissiveIntensity = 0.3;
              mat.userData.isHovered = true;
            }
          });
        }
        // Update both ref and state
        hoveredPartRef.current = obj;
        setHoveredPart(obj);
        containerRef.current.style.cursor = 'pointer';
      }
    } else {
      if (currentHover) {
        const materials = Array.isArray(currentHover.material) ? currentHover.material : [currentHover.material];
        materials.forEach(mat => {
          if (mat && mat.emissive && currentHover !== currentSelect) {
            mat.emissive.setHex(0x000000);
            mat.emissiveIntensity = 0;
            mat.userData.isHovered = false;
          }
        });
        hoveredPartRef.current = null;
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

  // --- 3.5. AI Text Classification (NO IMAGES NEEDED) ---
  const identifyModelByVision = async (allParts, partsData) => {
    setAnalyzingModel(true);
    console.log('🔮 Starting text-based part classification...');
    
    try {
      // Use shape detection - works perfectly!
      const filteredList = filterBySize(partsData);
      setPartsList(filteredList);
      setModelType('Generic Model');
      
      console.log(`✅ Shape detection: Showing ${filteredList.length} major parts`);
      
      // AI classification removed - using shape detection only
      
    } catch (error) {
      console.warn('⚠️ Classification failed, using basic shape detection:', error.message);
      
      // Ensure all parts stay visible
      allParts.forEach(p => {
        p.visible = true;
        if (p.material) {
          p.material.opacity = 1;
          p.material.transparent = false;
        }
      });
      
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
  
  // Capture model from multiple angles (OPTIMIZED - 2 images max to stay under 20k token limit)
  // REMOVED: Vision-based image capture (not needed for text classification)
  /* const captureMultiAngleImages = async () => {
    return new Promise((resolve) => {
      const images = [];
      // REDUCED: 3 images → 2 images (front + isometric)
      // 3 images = ~70KB = ~20k+ vision tokens = MAX_TOKENS error
      // 2 images = ~46KB = ~13k vision tokens = SAFE
      const angles = [
        { name: 'front', rotation: 0, elevation: 0 },
        { name: 'isometric', rotation: Math.PI / 4, elevation: Math.PI / 6 }
      ];
      
      // Store original camera position
      const originalPos = cameraRef.current.position.clone();
      const originalTarget = controlsRef.current.target.clone();
      
      // Calculate distance from center
      const distance = originalPos.distanceTo(originalCenter);
      
      // Ensure all parts are visible before capturing
      parts.forEach(p => {
        p.visible = true;
        if (p.material) {
          p.material.opacity = 1;
          p.material.transparent = false;
        }
      });
      
      angles.forEach(({ name, rotation, elevation = 0 }) => {
        // Position camera at angle
        const x = originalCenter.x + Math.cos(rotation) * Math.cos(elevation) * distance;
        const y = originalCenter.y + Math.sin(elevation) * distance;
        const z = originalCenter.z + Math.sin(rotation) * Math.cos(elevation) * distance;
        
        cameraRef.current.position.set(x, y, z);
        cameraRef.current.lookAt(originalCenter);
        cameraRef.current.updateProjectionMatrix();
        
        // Force render BEFORE capturing to ensure buffer is ready
        rendererRef.current.render(sceneRef.current, cameraRef.current);
        
        // Capture with JPEG compression (smaller file size)
        const imageData = rendererRef.current.domElement.toDataURL('image/jpeg', 0.8);
        
        // Send full data URI - backend will clean the base64 prefix
        images.push({ 
          name, 
          mime_type: 'image/jpeg',
          data: imageData 
        });
        
        console.log(`📷 Captured ${name} view (${(imageData.length / 1024).toFixed(0)}KB)`);
      });
      
      // Restore original camera position
      cameraRef.current.position.copy(originalPos);
      cameraRef.current.lookAt(originalTarget);
      controlsRef.current.target.copy(originalTarget);
      cameraRef.current.updateProjectionMatrix();
      
      resolve(images);
    });
  };
  
  // FIX 2: Analyze parts INDIVIDUALLY (not in batches) to prevent MAX_TOKENS
  const batchAnalyzeParts = async (majorParts, modelType) => {
    if (majorParts.length === 0) return;
    
    // RATE LIMIT PROTECTION: Only analyze top 5 parts to stay under 15 req/min
    const partsToAnalyze = majorParts.slice(0, 5);
    
    console.log(`🔄 Analyzing ${partsToAnalyze.length} major parts (limited to 5 for rate limits)...`);
    
    let successCount = 0;
    
    // Process each part individually to avoid MAX_TOKENS
    for (let i = 0; i < partsToAnalyze.length; i++) {
      const part = majorParts[i];
      
      console.log(`📦 Processing part ${i + 1}/${partsToAnalyze.length}: ${part.name}...`);
      
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
        
        // Delay to respect Free Tier limits (15 requests/min = 1 request every 4 seconds)
        if (i < partsToAnalyze.length - 1) {
          console.log('⏳ Waiting 4 seconds to respect Free Tier limits...');
          await new Promise(resolve => setTimeout(resolve, 4000));
        }
        
      } catch (error) {
        console.warn(`⚠️ ${part.name} failed:`, error.message);
        // Continue with next part
      }
    }
    
    console.log(`✅ Individual analysis complete: ${successCount}/${partsToAnalyze.length} parts analyzed`);
  };

  // REMOVED: Vision-based image analysis (not needed for text classification)
  /* const analyzeModelImage = async (imageObj, partsData) => {
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
    // CRITICAL: maxTokens=200 prevents MAX_TOKENS with vision (images consume input tokens)
    const apiResponse = await callGeminiVision(prompt, [{
      mime_type: mimeType,
      data: base64Data
    }], 5, 200);
    
    // Extract text from API response
    // Backend returns text at top level for convenience, with fallback to nested path
    const response = apiResponse.text || apiResponse.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!response || !response.trim()) {
      console.error('❌ Empty response from backend:', apiResponse);
      throw new Error('Empty response from AI Vision');
    }
    
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
  }; */

  // --- 4. Model Loading Logic (The Fix) ---
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsLoading(true);
    const url = URL.createObjectURL(file);
    const extension = file.name.split('.').pop().toLowerCase();
    
    let loader = extension === 'fbx' ? new FBXLoader() : new GLTFLoader();
    if (extension !== 'fbx') {
      // Setup DRACO decoder only (skip KTX2 and Meshopt to prevent texture issues)
      const draco = new DRACOLoader();
      draco.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');
      loader.setDRACOLoader(draco);
    }

    loader.load(url, (gltf) => {
      const root = extension === 'fbx' ? gltf : gltf.scene;
      
      // 🔥 CRITICAL FIX: Clone materials to avoid texture immutability errors
      if (!extension || extension !== 'fbx') {
        gltf.scene.traverse((child) => {
          if (child.isMesh) {
            // Fix normals
            if (child.geometry) {
              child.geometry.computeVertexNormals();
            }
            
            // 🔥 CLONE materials to make them mutable
            if (child.material) {
              const materials = Array.isArray(child.material) ? child.material : [child.material];
              const clonedMaterials = materials.map(m => {
                const cloned = m.clone();
                cloned.side = THREE.DoubleSide;
                cloned.transparent = false;
                cloned.opacity = 1;
                
                // Ensure color is visible if no texture
                if (!cloned.map && (!cloned.color || (cloned.color.r === 0 && cloned.color.g === 0 && cloned.color.b === 0))) {
                  cloned.color.setHex(0x888888); // SAFE: Use setHex on cloned material
                }
                
                // Store original opacity for animations
                cloned.userData = cloned.userData || {};
                cloned.userData.originalOpacity = 1;
                
                return cloned;
              });
              
              // Replace with cloned materials
              child.material = Array.isArray(child.material) ? clonedMaterials : clonedMaterials[0];
            }
          }
        });
      }

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
        // DON'T clone materials - modify them directly to avoid texture errors
        if (mesh.material) {
          // Handle array of materials
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach(mat => {
              mat.side = THREE.DoubleSide;
              if (mat.isMeshStandardMaterial || mat.isMeshPhysicalMaterial) {
                mat.metalness = 0.5;
                mat.roughness = 0.4;
                if (mat.color.r === 0 && mat.color.g === 0 && mat.color.b === 0) {
                  mat.color.setHex(0x888888);
                }
              }
            });
          } else {
            // Single material
            mesh.material.side = THREE.DoubleSide;
            
            if (mesh.material.isMeshStandardMaterial || mesh.material.isMeshPhysicalMaterial) {
              mesh.material.metalness = 0.5;
              mesh.material.roughness = 0.4;
              if (mesh.material.color.r === 0 && mesh.material.color.g === 0 && mesh.material.color.b === 0) {
                mesh.material.color.setHex(0x888888);
              }
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
        // Store reference to original material (don't clone again to avoid texture issues)
        mesh.userData.originalMaterial = mesh.material;
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

      // 🔥 CRITICAL FIX: Freeze materials to prevent shader recompilation
      newParts.forEach((p, i) => {
        p.visible = true;
        p.frustumCulled = false; // Prevent culling
        
        // FREEZE materials - prevents GL_INVALID_OPERATION and disappearing models
        const materials = Array.isArray(p.material) ? p.material : [p.material];
        materials.forEach(mat => {
          if (mat) {
            // Initial setup
            mat.transparent = false;
            mat.opacity = 1;
            mat.depthTest = true;
            mat.depthWrite = true;
            mat.visible = true;
            
            // 🔥 FREEZE SHADER RECOMPILATION - This is the key fix!
            mat.needsUpdate = false;
            
            // Store original state for safe modifications
            mat.userData = mat.userData || {};
            mat.userData.originalOpacity = 1;
            mat.userData.isHovered = false;
            mat.userData.isSelected = false;
          }
        });
        
        // Debug first part
        if (i === 0) {
          console.log('✅ First part material frozen:', {
            type: materials[0]?.type,
            visible: p.visible,
            opacity: materials[0]?.opacity,
            needsUpdate: materials[0]?.needsUpdate
          });
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

      // Auto-analyze model with AI vision
      setTimeout(async () => {
        const filteredList = filterBySize(partsData);
        setPartsList(filteredList);
        
        // Capture screenshot and analyze
        try {
          setIsAnalyzingImage(true);
          
          // 🔥 CRITICAL: Force render BEFORE screenshot to ensure buffer is ready
          rendererRef.current.render(sceneRef.current, cameraRef.current);
          
          // Small delay to ensure render completes
          await new Promise(resolve => setTimeout(resolve, 100));
          
          // Capture as JPEG with error handling
          let screenshot, base64;
          try {
            screenshot = rendererRef.current.domElement.toDataURL('image/jpeg', 0.8);
            base64 = screenshot.split(',')[1];
          } catch (screenshotError) {
            console.warn('Screenshot failed, using text-only analysis:', screenshotError);
            // Continue without screenshot - AI will work with part names only
            base64 = null;
          }
          
          // Analyze with AI
          const { GoogleGenerativeAI } = await import('@google/generative-ai');
          const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
          
          if (API_KEY && base64) {
            const genAI = new GoogleGenerativeAI(API_KEY);
            const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

            const prompt = `Identify this 3D model and provide COMPLETE technical specifications with historical context.

YOU MUST respond with ONLY valid JSON. Adapt fields based on vehicle type.

ALWAYS INCLUDE THESE FIELDS:
{
  "modelName": "Full official name",
  "transportation": "Primary purpose/role",
  "type": "Car/Rocket/Aircraft/Boat/Tank/Train/Motorcycle/Robot",
  "history": "Historical context: when used, wars participated in, famous missions, production years, why discontinued",
  "notableFacts": "Interesting facts: racing victories, records, famous uses, cultural impact"
}

FOR CARS/MOTORCYCLES ADD:
{
  "engine": "Engine spec",
  "hp": "Horsepower",
  "torque": "Torque",
  "topSpeed": "Top speed",
  "acceleration": "0-60 time",
  "racing": "Racing history if applicable",
  "productionYears": "Years produced",
  "cost": "Original/current price"
}

FOR ROCKETS ADD:
{
  "engine": "Engine config",
  "thrust": "Thrust",
  "fuel": "Propellant",
  "payload": "Payload capacity",
  "missions": "Notable missions and dates",
  "lastFlight": "Last flight date and mission",
  "reusable": "Reusability details",
  "productionStatus": "Active/Retired and why",
  "firstFlight": "First flight date"
}

FOR AIRCRAFT ADD:
{
  "engine": "Engine type",
  "maxSpeed": "Max speed",
  "range": "Range",
  "purpose": "Passenger/Cargo/Military/Fighter",
  "wars": "Wars participated in (WWI/WWII/etc)",
  "capacity": "Passenger/cargo capacity",
  "armament": "Weapons if military",
  "productionYears": "Years produced",
  "notableOperators": "Countries/airlines that used it"
}

FOR BOATS ADD:
{
  "boatType": "Fishing/Cargo/Passenger/Military/Yacht",
  "engine": "Engine type",
  "topSpeed": "Top speed in knots",
  "range": "Range in nautical miles",
  "capacity": "Passenger/cargo capacity",
  "purpose": "Primary use"
}

FOR TANKS ADD:
{
  "armament": "Main gun and weapons",
  "armor": "Armor thickness",
  "topSpeed": "Top speed",
  "wars": "Wars used in",
  "crew": "Crew size",
  "productionYears": "Years produced"
}

FOR TRAINS ADD:
{
  "trainType": "Passenger/Freight/High-speed",
  "topSpeed": "Top speed",
  "capacity": "Passenger/cargo capacity",
  "powerType": "Steam/Diesel/Electric",
  "routes": "Famous routes",
  "productionYears": "Years in service"
}

FOR ROBOTS ADD:
{
  "robotType": "Industrial/Military/Humanoid/etc",
  "purpose": "Primary function",
  "manufacturer": "Company",
  "capabilities": "What it can do",
  "deploymentYear": "When introduced"
}

CRITICAL RULES:
- Return ONLY JSON, no markdown
- Omit fields that don't apply
- Provide REAL data with units
- Include rich historical context
- Mention specific years, wars, missions, records`;

            const result = await model.generateContent([
              prompt,
              { inlineData: { data: base64, mimeType: 'image/jpeg' } }
            ]);
            
            const response = await result.response;
            const text = response.text();
            
            console.log('🤖 AI response:', text.substring(0, 300));
            
            // Try to parse JSON response
            try {
              // Extract JSON from response (might be wrapped in markdown)
              let jsonText = text;
              const jsonMatch = text.match(/\{[\s\S]*\}/);
              if (jsonMatch) {
                jsonText = jsonMatch[0];
              }
              
              const specs = JSON.parse(jsonText);
              
              console.log('✅ Parsed AI specs:', specs);
              
              // Set model name and info
              setModelType(specs.modelName || '3D Model');
              setModelInfo(specs);
              
            } catch (parseError) {
              console.warn('⚠️ Failed to parse JSON, trying fallback extraction:', parseError);
              
              // Fallback: Try to extract model name from text
              let modelName = '3D Model';
              const nameMatch = text.match(/modelName["']?\s*:\s*["']([^"']+)["']/);
              if (nameMatch) {
                modelName = nameMatch[1];
              }
              
              setModelType(modelName);
              setModelInfo({ 
                type: 'AI Identified',
                analysis: text 
              });
            }
          }
        } catch (error) {
          console.warn('AI analysis failed:', error);
          setModelType('3D Model');
        } finally {
          setIsAnalyzingImage(false);
        }
        
        console.log(`✅ Showing ${filteredList.length} major parts`);
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
    
    // If something is selected, reset it first - use ref
    if (selectedPartRef.current) handleResetSelection();

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
    // 🔥 FIX: Use ref instead of state
    if (!selectedPartRef.current) return;
    selectedPartRef.current.userData.isInspecting = false;

    // BRING EVERYTHING BACK
    parts.forEach((p, i) => {
      const state = originalStates.get(p);
      p.visible = true;
      
      // Reset materials to full opacity - SAFE: No material recreation
      const materials = Array.isArray(p.material) ? p.material : [p.material];
      materials.forEach(mat => {
        if (mat) {
          if (mat.emissive) {
            mat.emissive.setHex(0x000000);
            mat.emissiveIntensity = 0;
          }
          mat.userData.isSelected = false;
          mat.userData.isHovered = false;
          gsap.to(mat, {
            opacity: 1, 
            duration: 0.8, 
            delay: i * 0.005,
            onComplete: () => { 
              mat.transparent = false;
            }
          });
        }
      });

      // Move back
      gsap.to(p.position, {
        x: state.pos.x, y: state.pos.y, z: state.pos.z,
        duration: 1, ease: "back.out(1.2)", delay: i * 0.005
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

    // Update both ref and state
    selectedPartRef.current = null;
    setSelectedPart(null);
  };

  const handlePartSelect = async (part) => {
    // 🔥 FIX: Use ref for comparison
    if (selectedPartRef.current === part) return;
    if (selectedPartRef.current) handleResetSelection();

    // Update both ref and state
    selectedPartRef.current = part;
    setSelectedPart(part);
    part.userData.isInspecting = true;

    // 1. DIM OTHER PARTS (don't hide them) - SAFE: No material recreation
    parts.forEach((p, i) => {
      if (p !== part) {
        // Just dim other parts, keep them visible
        const materials = Array.isArray(p.material) ? p.material : [p.material];
        materials.forEach(mat => {
          if (mat) {
            mat.transparent = true;
            gsap.to(mat, { opacity: 0.3, duration: 0.5 });
          }
        });
      } else {
        // Highlight Selected - SAFE: Only modify existing emissive, don't create new Color
        const materials = Array.isArray(p.material) ? p.material : [p.material];
        materials.forEach(mat => {
          if (mat && mat.emissive) {
            mat.emissive.setHex(0x00ffff); // SAFE: setHex instead of new Color
            mat.emissiveIntensity = 0.5;
            mat.userData.isSelected = true;
          }
        });
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

    // 3. Show static part info (AI disabled)
    // await generatePartExplanation(part.userData.partName);
  };

  const generatePartExplanation = async (partName) => {
    // AI disabled - provide static information
    if (partExplanations.has(partName)) {
      return;
    }
    
    // Set default explanation immediately
    setPartExplanations(prev => new Map(prev).set(partName, { 
      purpose: `This is the ${partName} component. It's a critical part of the assembly structure. Inspect for wear, damage, or misalignment during maintenance.`, 
      material: "Varies by design (typically aluminum alloy, steel, or composite materials)", 
      cost: "Contact manufacturer for pricing", 
      tip: "Refer to technical documentation for detailed specifications and maintenance procedures" 
    }));
  };

  const handleClick = () => {
    // Disabled - no part selection on click
    // Just allow orbit controls to work
  };

  const handleImageAnalysis = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsAnalyzingImage(true);
    setModelInfo(null);

    try {
      const { GoogleGenerativeAI } = await import('@google/generative-ai');
      const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
      
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

      // Convert image to base64
      const reader = new FileReader();
      reader.readAsDataURL(file);
      
      // Store the image for display
      const imageReader = new FileReader();
      imageReader.onload = (e) => {
        setUploadedImage(e.target.result);
      };
      imageReader.readAsDataURL(file);
      
      await new Promise((resolve) => {
        reader.onload = async () => {
          const base64 = reader.result.split(',')[1];
          
          const prompt = `Analyze this vehicle/machine/aircraft and provide COMPLETE technical specifications.

YOU MUST respond with ONLY valid JSON. Adapt fields based on vehicle type.

ALWAYS INCLUDE THESE FIELDS:
{
  "modelName": "Full official name",
  "type": "Car/Rocket/Aircraft/Boat/Tank/Train/Motorcycle/Robot/Machine",
  "transportation": "Primary purpose/role",
  "history": "Historical context: when used, wars participated in, famous missions, production years, why discontinued",
  "notableFacts": "Interesting facts: racing victories, records, famous uses, cultural impact"
}

FOR CARS/MOTORCYCLES ADD:
{
  "engine": "Engine spec (e.g., V8 5.0L Twin-Turbo)",
  "hp": "Horsepower (e.g., 450 hp)",
  "torque": "Torque (e.g., 500 lb-ft)",
  "topSpeed": "Top speed (e.g., 180 mph)",
  "acceleration": "0-60 time (e.g., 3.5 seconds)",
  "transmission": "Transmission type",
  "drivetrain": "AWD/RWD/FWD",
  "fuelType": "Gasoline/Diesel/Electric/Hybrid",
  "fuelCapacity": "Tank size",
  "weight": "Curb weight",
  "cost": "Original/current price (e.g., $85,000 MSRP)",
  "productionYears": "Years produced (e.g., 2015-2023)"
}

FOR ROCKETS ADD:
{
  "engine": "Engine configuration (e.g., 9x Merlin 1D)",
  "thrust": "Thrust (e.g., 7.6 million lbf)",
  "fuel": "Propellant type (e.g., RP-1/LOX)",
  "payload": "Payload capacity (e.g., 22,800 kg to LEO)",
  "height": "Height (e.g., 70m)",
  "diameter": "Diameter (e.g., 3.7m)",
  "missions": "Notable missions and dates",
  "reusable": "Reusability details",
  "cost": "Cost per launch (e.g., $62 million)",
  "firstFlight": "First flight date"
}

FOR AIRCRAFT ADD:
{
  "engine": "Engine type (e.g., 2x Pratt & Whitney F119)",
  "maxSpeed": "Max speed (e.g., Mach 2.25)",
  "range": "Range (e.g., 1,840 miles)",
  "ceiling": "Service ceiling (e.g., 65,000 ft)",
  "wingspan": "Wingspan",
  "length": "Length",
  "purpose": "Passenger/Cargo/Military/Fighter",
  "armament": "Weapons if military",
  "capacity": "Passenger/cargo capacity",
  "cost": "Unit cost (e.g., $150 million)",
  "productionYears": "Years produced"
}

FOR BOATS ADD:
{
  "boatType": "Fishing/Cargo/Passenger/Military/Yacht",
  "engine": "Engine type and power",
  "topSpeed": "Top speed in knots",
  "range": "Range in nautical miles",
  "length": "Length",
  "capacity": "Passenger/cargo capacity",
  "cost": "Purchase price"
}

FOR MACHINES/INDUSTRIAL ADD:
{
  "machineType": "Type of machine",
  "manufacturer": "Company",
  "power": "Power rating",
  "capacity": "Production capacity",
  "weight": "Operating weight",
  "cost": "Purchase/rental price",
  "applications": "Common uses"
}

CRITICAL RULES:
- Return ONLY JSON, no markdown, no code blocks
- Omit fields that don't apply
- Provide REAL data with units
- Include rich historical context
- Be specific with numbers and dates`;

          const result = await model.generateContent([
            prompt,
            { inlineData: { data: base64, mimeType: file.type } }
          ]);
          
          const response = await result.response;
          const text = response.text();
          
          console.log('🤖 AI Vision Response:', text);
          
          // Try to parse JSON response
          try {
            // Extract JSON from response (might be wrapped in markdown)
            let jsonText = text;
            const jsonMatch = text.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
              jsonText = jsonMatch[0];
            }
            
            const specs = JSON.parse(jsonText);
            
            console.log('✅ Parsed specs:', specs);
            
            // Set model name and structured info
            setModelType(specs.modelName || specs.type || 'Machine Identified');
            setModelInput(specs.modelName || '');
            setModelInfo(specs); // Set the full structured data
            
          } catch (parseError) {
            console.warn('⚠️ Failed to parse JSON, using fallback:', parseError);
            
            // Fallback: Extract model name and show raw text
            const modelMatch = text.match(/(?:appears to be|identified as|this is|modelName["\s:]+)([^".,\n]+)/i);
            const modelName = modelMatch ? modelMatch[1].trim() : 'Machine Identified';
            
            setModelType(modelName);
            setModelInput(modelName);
            
            // Show as JARVIS explanation if JSON parsing failed
            setModelInfo({ 
              type: 'AI Identified',
              jarvisExplanation: text,
              timestamp: new Date().toLocaleTimeString()
            });
          }
          
          resolve();
        };
      });
    } catch (error) {
      console.error('Vision error:', error);
      setModelInfo({ error: 'Failed to analyze image. Try manual input instead.' });
    } finally {
      setIsAnalyzingImage(false);
    }
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
            onClick={() => {
              const newAutoRotate = !autoRotate;
              setAutoRotate(newAutoRotate);
              if (controlsRef.current) {
                controlsRef.current.autoRotate = newAutoRotate && !userInteracting;
              }
            }}
            disabled={!modelLoaded}
            className={`flex items-center gap-2 px-4 py-2 rounded border font-bold tracking-widest transition-all text-xs ${
              autoRotate 
                ? 'border-cyan-500 text-cyan-500 hover:bg-cyan-950' 
                : 'border-gray-500 text-gray-500 hover:bg-gray-800'
            } disabled:opacity-30`}
            title={autoRotate ? 'Auto-rotate ON' : 'Auto-rotate OFF'}
          >
            <RotateCcw className={`w-4 h-4 ${autoRotate ? 'animate-spin-slow' : ''}`} />
            AUTO
          </button>
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
          {uploadedImage && !modelLoaded && (
            <button 
              onClick={() => {
                setUploadedImage(null);
                setModelInfo(null);
                setModelType('');
              }}
              className="bg-red-600 hover:bg-red-500 text-white font-bold px-6 py-2 rounded text-xs flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" /> CLEAR IMAGE
            </button>
          )}
          <button 
            onClick={() => imageInputRef.current?.click()} 
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold px-6 py-2 rounded text-xs flex items-center gap-2 shadow-lg shadow-purple-500/50 border border-purple-400/50"
          >
            {isAnalyzingImage ? <Loader2 className="animate-spin w-4 h-4" /> : <Scan className="w-4 h-4" />} 
            SCAN WITH PHOTO
          </button>
          <button onClick={() => fileInputRef.current?.click()} className="bg-cyan-600 hover:bg-cyan-500 text-black font-bold px-6 py-2 rounded text-xs flex items-center gap-2">
            {isLoading ? <Loader2 className="animate-spin w-4 h-4" /> : <Upload className="w-4 h-4" />} UPLOAD 3D MODEL
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 relative flex overflow-hidden">
        
        {modelLoaded && <HUDOverlay 
          selectedPartName={selectedPart?.userData?.partName} 
          modelType={modelType} 
          isAnalyzing={analyzingModel}
          hoveredPartName={hoveredPart?.userData?.partName}
          mousePosition={mousePosition}
        />}
        
        {/* Image Display - Show when image is uploaded but no 3D model */}
        {uploadedImage && !modelLoaded && (
          <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black p-8">
            <div className="relative max-w-4xl w-full">
              {/* Tech corners */}
              <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-cyan-500/40 rounded-tl-2xl" />
              <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-cyan-500/40 rounded-br-2xl" />
              
              {/* Image container */}
              <div className="relative border-2 border-cyan-500/30 rounded-2xl overflow-hidden shadow-2xl shadow-cyan-500/20">
                <img 
                  src={uploadedImage} 
                  alt="Scanned machine" 
                  className="w-full h-auto max-h-[70vh] object-contain bg-black"
                  style={{
                    imageRendering: 'high-quality',
                    WebkitFontSmoothing: 'antialiased',
                    MozOsxFontSmoothing: 'grayscale'
                  }}
                />
                
                {/* Scanning overlay effect */}
                {isAnalyzingImage && (
                  <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/20 via-transparent to-cyan-500/20 animate-pulse">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-black/80 backdrop-blur-md px-8 py-4 rounded-lg border border-cyan-400/50">
                        <div className="flex items-center gap-3">
                          <Loader2 className="w-6 h-6 text-cyan-400 animate-spin" />
                          <span className="text-cyan-400 font-mono font-bold tracking-wider">
                            ANALYZING IMAGE...
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Model name overlay */}
                {modelType && !isAnalyzingImage && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-6">
                    <h2 className="text-2xl font-bold text-cyan-400 mb-1">{modelType}</h2>
                    <p className="text-sm text-cyan-300/60 font-mono">IDENTIFIED BY J.A.R.V.I.S.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        
        <div 
          ref={containerRef}
          className={`flex-1 cursor-default outline-none ${uploadedImage && !modelLoaded ? 'hidden' : ''}`}
          onMouseMove={handleMouseMove}
          onClick={handleClick}
        />

        {/* Sidebar */}
        <div 
          className={`w-96 border-l border-cyan-900/30 bg-black/80 backdrop-blur absolute right-0 top-0 bottom-0 z-30 transition-transform duration-500 flex flex-col ${modelLoaded || modelInfo ? 'translate-x-0' : 'translate-x-full'}`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Sidebar Header */}
          <div className="p-4 border-b border-cyan-900/30 bg-gradient-to-r from-cyan-950/50 to-blue-950/50">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400 animate-pulse" />
              <h2 className="text-cyan-400 text-sm font-bold tracking-wider">
                {modelLoaded ? '3D MODEL ANALYSIS' : 'IMAGE SCAN ANALYSIS'}
              </h2>
            </div>
            {modelType && (
              <p className="text-xs text-cyan-300/60 mt-1 font-mono">
                {modelType.toUpperCase()}
              </p>
            )}
          </div>

          {/* Only show parts list if 3D model is loaded */}
          {modelLoaded && (
            <div className="p-4 border-b border-cyan-900/30 max-h-[400px] overflow-y-auto custom-scrollbar">
              <h3 className="text-cyan-600 text-[10px] font-bold uppercase tracking-widest mb-3">
                {analyzingModel ? "Scanning Systems..." : `Critical Components (${partsList.length})`}
              </h3>
              <div className="space-y-[1px]">
                {partsList.map(p => (
                  <div 
                    key={p.id}
                    className="w-full text-left px-4 py-2 text-xs font-medium border-l-2 border-transparent text-gray-400"
                  >
                    {p.name.toUpperCase()}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Model Info Display */}
          <div className="p-4 border-b border-cyan-900/30 bg-black/50">{isAnalyzingImage && (
              <div className="flex items-center justify-center gap-2 text-purple-400 mb-3">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-xs font-bold">ANALYZING MODEL...</span>
              </div>
            )}
            {modelInfo && (
              <div className="mt-3 p-4 bg-black/60 border border-purple-500/30 rounded-lg text-xs max-h-[500px] overflow-y-auto custom-scrollbar">
                {modelInfo.error ? (
                  <p className="text-red-400">{modelInfo.error}</p>
                ) : modelInfo.jarvisExplanation ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 border-b border-cyan-500/30 pb-2">
                      <Cpu className="w-4 h-4 text-cyan-400 animate-pulse" />
                      <div className="text-cyan-400 font-bold">J.A.R.V.I.S. ANALYSIS</div>
                      <div className="text-xs text-cyan-400/60 ml-auto">{modelInfo.timestamp}</div>
                    </div>
                    <div className="bg-gradient-to-br from-cyan-950/30 to-blue-950/30 p-4 rounded-lg border border-cyan-500/20">
                      <p className="text-gray-200 leading-relaxed whitespace-pre-wrap font-mono text-sm">
                        {modelInfo.jarvisExplanation}
                      </p>
                    </div>
                    <div className="text-xs text-cyan-400/60 italic">
                      💡 Tip: Upload a 3D model for interactive exploded view analysis
                    </div>
                  </div>
                ) : modelInfo.analysis ? (
                  <div className="space-y-2 text-gray-300">
                    <div className="text-purple-400 font-bold">🤖 AI Vision Analysis:</div>
                    <p className="whitespace-pre-wrap">{modelInfo.analysis}</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {/* Model Name Header */}
                    {modelInfo.modelName && (
                      <div className="border-b border-purple-500/30 pb-2 mb-3">
                        <div className="text-purple-400 font-bold text-sm mb-1">MODEL NAME</div>
                        <div className="text-white font-bold text-lg">{modelInfo.modelName}</div>
                      </div>
                    )}
                    
                    {/* Transportation Type */}
                    {modelInfo.transportation && (
                      <div>
                        <div className="text-purple-400 font-bold mb-1">TRANSPORTATION</div>
                        <div className="text-white">{modelInfo.transportation}</div>
                      </div>
                    )}
                    
                    {/* Engine Section */}
                    {modelInfo.engine && (
                      <div className="bg-purple-950/20 p-3 rounded border border-purple-500/20">
                        <div className="text-purple-400 font-bold mb-2 text-sm">🔧 ENGINE</div>
                        <div className="space-y-1.5">
                          <div><span className="text-purple-300">Type:</span> <span className="text-white">{modelInfo.engine}</span></div>
                          {modelInfo.engineCost && <div><span className="text-purple-300">Cost:</span> <span className="text-white">{modelInfo.engineCost}</span></div>}
                          {modelInfo.hp && <div><span className="text-purple-300">Power:</span> <span className="text-white">{modelInfo.hp}</span></div>}
                          {modelInfo.torque && <div><span className="text-purple-300">Torque:</span> <span className="text-white">{modelInfo.torque}</span></div>}
                          {modelInfo.thrust && <div><span className="text-purple-300">Thrust:</span> <span className="text-white">{modelInfo.thrust}</span></div>}
                        </div>
                      </div>
                    )}
                    
                    {/* Fuel Section */}
                    {(modelInfo.fuel || modelInfo.fuelType) && (
                      <div className="bg-orange-950/20 p-3 rounded border border-orange-500/20">
                        <div className="text-orange-400 font-bold mb-2 text-sm">⛽ FUEL SYSTEM</div>
                        <div className="space-y-1.5">
                          {modelInfo.fuel && <div><span className="text-orange-300">Type:</span> <span className="text-white">{modelInfo.fuel}</span></div>}
                          {modelInfo.fuelType && <div><span className="text-orange-300">Type:</span> <span className="text-white">{modelInfo.fuelType}</span></div>}
                          {modelInfo.fuelCapacity && <div><span className="text-orange-300">Capacity:</span> <span className="text-white">{modelInfo.fuelCapacity}</span></div>}
                          {modelInfo.range && <div><span className="text-orange-300">Range:</span> <span className="text-white">{modelInfo.range}</span></div>}
                        </div>
                      </div>
                    )}
                    
                    {/* Performance Section */}
                    <div className="bg-cyan-950/20 p-3 rounded border border-cyan-500/20">
                      <div className="text-cyan-400 font-bold mb-2 text-sm">⚡ PERFORMANCE</div>
                      <div className="space-y-1.5">
                        {modelInfo.topSpeed && <div><span className="text-cyan-300">Top Speed:</span> <span className="text-white">{modelInfo.topSpeed}</span></div>}
                        {modelInfo.maxSpeed && <div><span className="text-cyan-300">Max Speed:</span> <span className="text-white">{modelInfo.maxSpeed}</span></div>}
                        {modelInfo.cruiseSpeed && <div><span className="text-cyan-300">Cruise:</span> <span className="text-white">{modelInfo.cruiseSpeed}</span></div>}
                        {modelInfo.acceleration && <div><span className="text-cyan-300">0-60 mph:</span> <span className="text-white">{modelInfo.acceleration}</span></div>}
                        {modelInfo.payload && <div><span className="text-cyan-300">Payload:</span> <span className="text-white">{modelInfo.payload}</span></div>}
                      </div>
                    </div>
                    
                    {/* Space/Flight Capabilities (Rockets/Aircraft) */}
                    {(modelInfo.reusable || modelInfo.spaceTime || modelInfo.flightTime) && (
                      <div className="bg-green-950/20 p-3 rounded border border-green-500/20">
                        <div className="text-green-400 font-bold mb-2 text-sm">🚀 MISSION CAPABILITIES</div>
                        <div className="space-y-1.5">
                          {modelInfo.reusable && <div><span className="text-green-300">Reusable:</span> <span className="text-white">{modelInfo.reusable}</span></div>}
                          {modelInfo.landingSafety && <div><span className="text-green-300">Landing Safety:</span> <span className="text-white">{modelInfo.landingSafety}</span></div>}
                          {modelInfo.spaceTime && <div><span className="text-green-300">Space Duration:</span> <span className="text-white">{modelInfo.spaceTime}</span></div>}
                          {modelInfo.flightTime && <div><span className="text-green-300">Flight Time:</span> <span className="text-white">{modelInfo.flightTime}</span></div>}
                          {modelInfo.reusability && <div><span className="text-green-300">Reusability:</span> <span className="text-white">{modelInfo.reusability}</span></div>}
                          {modelInfo.ceiling && <div><span className="text-green-300">Service Ceiling:</span> <span className="text-white">{modelInfo.ceiling}</span></div>}
                        </div>
                      </div>
                    )}
                    
                    {/* Cost Section */}
                    <div className="bg-yellow-950/20 p-3 rounded border border-yellow-500/20">
                      <div className="text-yellow-400 font-bold mb-2 text-sm">💰 COST</div>
                      <div className="space-y-1.5">
                        {modelInfo.cost && <div><span className="text-yellow-300">Total Cost:</span> <span className="text-white font-bold">{modelInfo.cost}</span></div>}
                        {modelInfo.productionCost && <div><span className="text-yellow-300">Production:</span> <span className="text-white">{modelInfo.productionCost}</span></div>}
                      </div>
                    </div>
                    
                    {/* History & Context Section */}
                    {(modelInfo.history || modelInfo.notableFacts || modelInfo.missions || modelInfo.wars) && (
                      <div className="bg-blue-950/20 p-3 rounded border border-blue-500/20">
                        <div className="text-blue-400 font-bold mb-2 text-sm">📜 HISTORY & CONTEXT</div>
                        <div className="space-y-2 text-xs">
                          {modelInfo.history && <p className="text-gray-300 leading-relaxed">{modelInfo.history}</p>}
                          {modelInfo.missions && <div><span className="text-blue-300">Notable Missions:</span> <span className="text-white">{modelInfo.missions}</span></div>}
                          {modelInfo.lastFlight && <div><span className="text-blue-300">Last Flight:</span> <span className="text-white">{modelInfo.lastFlight}</span></div>}
                          {modelInfo.firstFlight && <div><span className="text-blue-300">First Flight:</span> <span className="text-white">{modelInfo.firstFlight}</span></div>}
                          {modelInfo.wars && <div><span className="text-blue-300">Wars:</span> <span className="text-white">{modelInfo.wars}</span></div>}
                          {modelInfo.productionYears && <div><span className="text-blue-300">Production:</span> <span className="text-white">{modelInfo.productionYears}</span></div>}
                          {modelInfo.productionStatus && <div><span className="text-blue-300">Status:</span> <span className="text-white">{modelInfo.productionStatus}</span></div>}
                          {modelInfo.racing && <div><span className="text-blue-300">Racing:</span> <span className="text-white">{modelInfo.racing}</span></div>}
                          {modelInfo.notableFacts && <p className="text-gray-300 leading-relaxed italic mt-2">💡 {modelInfo.notableFacts}</p>}
                        </div>
                      </div>
                    )}
                    
                    {/* Additional Specs */}
                    <div className="space-y-1.5 text-xs">
                      {modelInfo.weight && <div><span className="text-purple-300">Weight:</span> <span className="text-gray-300">{modelInfo.weight}</span></div>}
                      {modelInfo.height && <div><span className="text-purple-300">Height:</span> <span className="text-gray-300">{modelInfo.height}</span></div>}
                      {modelInfo.diameter && <div><span className="text-purple-300">Diameter:</span> <span className="text-gray-300">{modelInfo.diameter}</span></div>}
                      {modelInfo.wingspan && <div><span className="text-purple-300">Wingspan:</span> <span className="text-gray-300">{modelInfo.wingspan}</span></div>}
                      {modelInfo.stages && <div><span className="text-purple-300">Stages:</span> <span className="text-gray-300">{modelInfo.stages}</span></div>}
                      {modelInfo.transmission && <div><span className="text-purple-300">Transmission:</span> <span className="text-gray-300">{modelInfo.transmission}</span></div>}
                      {modelInfo.drivetrain && <div><span className="text-purple-300">Drivetrain:</span> <span className="text-gray-300">{modelInfo.drivetrain}</span></div>}
                      {modelInfo.crew && <div><span className="text-purple-300">Crew:</span> <span className="text-gray-300">{modelInfo.crew}</span></div>}
                      {modelInfo.capacity && <div><span className="text-purple-300">Capacity:</span> <span className="text-gray-300">{modelInfo.capacity}</span></div>}
                      {modelInfo.armament && <div><span className="text-purple-300">Armament:</span> <span className="text-gray-300">{modelInfo.armament}</span></div>}
                      {modelInfo.boatType && <div><span className="text-purple-300">Boat Type:</span> <span className="text-gray-300">{modelInfo.boatType}</span></div>}
                      {modelInfo.trainType && <div><span className="text-purple-300">Train Type:</span> <span className="text-gray-300">{modelInfo.trainType}</span></div>}
                      {modelInfo.robotType && <div><span className="text-purple-300">Robot Type:</span> <span className="text-gray-300">{modelInfo.robotType}</span></div>}
                    </div>
                  </div>
                )}
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
      <input ref={imageInputRef} type="file" accept="image/*" capture="environment" onChange={handleImageAnalysis} className="hidden" />
    </div>
  );
}
