import React, { useRef, useEffect } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const ThreeJSViewer = ({ modelType, modelInfo, nozzleParams = { throttle: 1.0, expansionRatio: 10, ambientPressure: 101325 } }) => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const controlsRef = useRef(null);
  const modelRef = useRef(null);
  const animationFrameRef = useRef(null);
  const particleSystemsRef = useRef([]);
  const nozzleParamsRef = useRef(nozzleParams);

  useEffect(() => {
    if (!containerRef.current) {
      console.log('ThreeJSViewer: Container ref not ready');
      return;
    }

    console.log('ThreeJSViewer: Initializing...', {
      width: containerRef.current.clientWidth,
      height: containerRef.current.clientHeight,
      modelInfo
    });

    // Scene setup
    const scene = new THREE.Scene();
    
    // Dynamic background based on model type
    const bgColor = modelInfo?.type?.toLowerCase().includes('car') 
      ? 0x0a0a0f  // Darker for garage
      : 0x1a1a1f;
    
    scene.background = new THREE.Color(bgColor);
    scene.fog = new THREE.Fog(bgColor, 20, 50);
    sceneRef.current = scene;

    // Camera setup - adjusted based on model type
    const camera = new THREE.PerspectiveCamera(
      60,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    
    // Position camera - closer and better angle
    camera.position.set(0, 3, 8);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight
    );
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = true;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    rendererRef.current = renderer;
    containerRef.current.appendChild(renderer.domElement);

    // Controls - adjusted for garage view
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.screenSpacePanning = false;
    
    controls.minDistance = 3;
    controls.maxDistance = 25;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 2.0;
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    
    controlsRef.current = controls;

    // Lighting - Balanced for good visibility
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    // Main directional light (key light)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(5, 10, 7);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    // Fill light (from opposite side)
    const fillLight = new THREE.DirectionalLight(0xffffff, 0.6);
    fillLight.position.set(-5, 5, -5);
    scene.add(fillLight);

    // Rim light (from behind)
    const rimLight = new THREE.DirectionalLight(0xffffff, 0.5);
    rimLight.position.set(0, 5, -10);
    scene.add(rimLight);

    // Additional hemisphere light for natural lighting
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.6);
    scene.add(hemiLight);

    // Grid helper removed for cleaner look

    // Environment loading removed - clean model view only

    // Create realistic fire particle texture with multiple layers
    const createFireTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 128;
      canvas.height = 128;
      const ctx = canvas.getContext('2d');

      const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.1, 'rgba(255, 240, 200, 1)');
      gradient.addColorStop(0.3, 'rgba(255, 180, 50, 0.9)');
      gradient.addColorStop(0.5, 'rgba(255, 100, 20, 0.7)');
      gradient.addColorStop(0.7, 'rgba(200, 50, 10, 0.4)');
      gradient.addColorStop(1, 'rgba(100, 20, 5, 0)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 128, 128);

      const texture = new THREE.Texture(canvas);
      texture.needsUpdate = true;
      return texture;
    };



    // Create spark texture
    const createSparkTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 32;
      canvas.height = 32;
      const ctx = canvas.getContext('2d');

      const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.3, 'rgba(255, 200, 100, 1)');
      gradient.addColorStop(0.6, 'rgba(255, 150, 50, 0.8)');
      gradient.addColorStop(1, 'rgba(255, 100, 0, 0)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 32, 32);

      const texture = new THREE.Texture(canvas);
      texture.needsUpdate = true;
      return texture;
    };

    // Function to create exhaust particle effects
    const createExhaustEffects = (scene, modelGroup, modelSize) => {
      // Clear existing particle systems
      particleSystemsRef.current.forEach(ps => {
        if (ps.points) modelGroup.remove(ps.points);
        if (ps.sparkPoints) modelGroup.remove(ps.sparkPoints);
        if (ps.coreFlame) modelGroup.remove(ps.coreFlame);
        if (ps.shockDiamonds) modelGroup.remove(ps.shockDiamonds);
        if (ps.light) modelGroup.remove(ps.light);
        if (ps.geometry) ps.geometry.dispose();
        if (ps.sparkGeometry) ps.sparkGeometry.dispose();
        if (ps.material) ps.material.dispose();
        if (ps.sparkMaterial) ps.sparkMaterial.dispose();
      });
      particleSystemsRef.current = [];

      // Detect nozzle positions based on model name and size
      let nozzlePositions = [];
      const modelName = modelInfo?.name?.toLowerCase() || '';
      const bottomY = -modelSize.y * 0.5;
      const backZ = modelSize.z * 0.5; // Back of the model (positive Z)
      const nozzleRadius = modelSize.x * 0.15; // Distance from center for outer engines
      
      // Space Shuttle has 3 main engines at the back (rear)
      if (modelName.includes('shuttle') || modelName.includes('space shuttle')) {
        // 3 SSMEs (Space Shuttle Main Engines) in triangular pattern at the back
        const engineY = bottomY + modelSize.y * 0.15; // Slightly up from bottom
        nozzlePositions.push(
          new THREE.Vector3(0, engineY, backZ), // Center engine
          new THREE.Vector3(-nozzleRadius * 0.6, engineY - nozzleRadius * 0.3, backZ), // Left engine
          new THREE.Vector3(nozzleRadius * 0.6, engineY - nozzleRadius * 0.3, backZ)  // Right engine
        );
      }
      // Falcon Heavy has 3 cores with 9 engines each (27 total, but we'll show main clusters)
      else if (modelName.includes('falcon') && modelName.includes('heavy')) {
        // Center core (3 engines in triangle)
        nozzlePositions.push(
          new THREE.Vector3(0, bottomY, 0),
          new THREE.Vector3(-nozzleRadius * 0.4, bottomY, nozzleRadius * 0.3),
          new THREE.Vector3(nozzleRadius * 0.4, bottomY, nozzleRadius * 0.3)
        );
        // Left booster (3 engines)
        nozzlePositions.push(
          new THREE.Vector3(-nozzleRadius * 1.5, bottomY, 0),
          new THREE.Vector3(-nozzleRadius * 1.8, bottomY, nozzleRadius * 0.3),
          new THREE.Vector3(-nozzleRadius * 1.2, bottomY, nozzleRadius * 0.3)
        );
        // Right booster (3 engines)
        nozzlePositions.push(
          new THREE.Vector3(nozzleRadius * 1.5, bottomY, 0),
          new THREE.Vector3(nozzleRadius * 1.8, bottomY, nozzleRadius * 0.3),
          new THREE.Vector3(nozzleRadius * 1.2, bottomY, nozzleRadius * 0.3)
        );
      }
      // Falcon 9 has 9 engines (Octaweb pattern)
      else if (modelName.includes('falcon')) {
        nozzlePositions.push(new THREE.Vector3(0, bottomY, 0)); // Center
        for (let i = 0; i < 8; i++) {
          const angle = (i / 8) * Math.PI * 2;
          nozzlePositions.push(
            new THREE.Vector3(
              Math.cos(angle) * nozzleRadius,
              bottomY,
              Math.sin(angle) * nozzleRadius
            )
          );
        }
      }
      // Starship has 3 sea-level + 3 vacuum Raptors (simplified to 6)
      else if (modelName.includes('starship')) {
        for (let i = 0; i < 6; i++) {
          const angle = (i / 6) * Math.PI * 2;
          nozzlePositions.push(
            new THREE.Vector3(
              Math.cos(angle) * nozzleRadius,
              bottomY,
              Math.sin(angle) * nozzleRadius
            )
          );
        }
      }
      // Saturn V has 5 F-1 engines (4 outer + 1 center)
      else if (modelName.includes('saturn')) {
        nozzlePositions.push(new THREE.Vector3(0, bottomY, 0)); // Center
        for (let i = 0; i < 4; i++) {
          const angle = (i / 4) * Math.PI * 2;
          nozzlePositions.push(
            new THREE.Vector3(
              Math.cos(angle) * nozzleRadius * 1.2,
              bottomY,
              Math.sin(angle) * nozzleRadius * 1.2
            )
          );
        }
      }
      // Default: single central engine
      else {
        nozzlePositions.push(new THREE.Vector3(0, bottomY, 0));
      }

      // Determine if this is a Space Shuttle (horizontal exhaust)
      const isShuttle = modelName.includes('shuttle') || modelName.includes('space shuttle');

      nozzlePositions.forEach((nozzlePos) => {
        // LAYER 1: Core flame particles (bright, fast)
        const coreCount = 300;
        const corePositions = new Float32Array(coreCount * 3);
        const coreVelocities = [];
        const coreLifetimes = [];
        const coreSizes = new Float32Array(coreCount);
        const coreColors = new Float32Array(coreCount * 3);

        for (let i = 0; i < coreCount; i++) {
          corePositions[i * 3] = nozzlePos.x + (Math.random() - 0.5) * 0.15;
          corePositions[i * 3 + 1] = nozzlePos.y + (Math.random() - 0.5) * 0.15;
          corePositions[i * 3 + 2] = nozzlePos.z + (Math.random() - 0.5) * 0.15;

          // Different velocity direction for shuttle (backward) vs rockets (downward)
          if (isShuttle) {
            coreVelocities.push({
              x: (Math.random() - 0.5) * 0.015,
              y: (Math.random() - 0.5) * 0.015,
              z: 0.12 + Math.random() * 0.08 // Backward (positive Z)
            });
          } else {
            coreVelocities.push({
              x: (Math.random() - 0.5) * 0.015,
              y: -0.12 - Math.random() * 0.08, // Downward (negative Y)
              z: (Math.random() - 0.5) * 0.015
            });
          }

          coreLifetimes.push(Math.random() * 60);
          coreSizes[i] = 0.3 + Math.random() * 0.4;
          
          // Color variation (white to yellow to orange)
          const colorVar = Math.random();
          coreColors[i * 3] = 1.0;
          coreColors[i * 3 + 1] = 0.8 + colorVar * 0.2;
          coreColors[i * 3 + 2] = 0.3 + colorVar * 0.3;
        }

        const coreGeometry = new THREE.BufferGeometry();
        coreGeometry.setAttribute('position', new THREE.BufferAttribute(corePositions, 3));
        coreGeometry.setAttribute('size', new THREE.BufferAttribute(coreSizes, 1));
        coreGeometry.setAttribute('color', new THREE.BufferAttribute(coreColors, 3));

        const coreMaterial = new THREE.PointsMaterial({
          size: 0.5,
          transparent: true,
          opacity: 0.9,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          sizeAttenuation: true,
          vertexColors: true,
          map: createFireTexture()
        });

        const corePoints = new THREE.Points(coreGeometry, coreMaterial);
        modelGroup.add(corePoints);

        // LAYER 2: Outer flame particles (orange/red, medium speed)
        const outerCount = 400;
        const outerPositions = new Float32Array(outerCount * 3);
        const outerVelocities = [];
        const outerLifetimes = [];
        const outerSizes = new Float32Array(outerCount);
        const outerColors = new Float32Array(outerCount * 3);

        for (let i = 0; i < outerCount; i++) {
          outerPositions[i * 3] = nozzlePos.x + (Math.random() - 0.5) * 0.25;
          outerPositions[i * 3 + 1] = nozzlePos.y + (Math.random() - 0.5) * 0.25;
          outerPositions[i * 3 + 2] = nozzlePos.z + (Math.random() - 0.5) * 0.25;

          if (isShuttle) {
            outerVelocities.push({
              x: (Math.random() - 0.5) * 0.025,
              y: (Math.random() - 0.5) * 0.025,
              z: 0.09 + Math.random() * 0.06 // Backward (positive Z)
            });
          } else {
            outerVelocities.push({
              x: (Math.random() - 0.5) * 0.025,
              y: -0.09 - Math.random() * 0.06, // Downward
              z: (Math.random() - 0.5) * 0.025
            });
          }

          outerLifetimes.push(Math.random() * 80);
          outerSizes[i] = 0.4 + Math.random() * 0.5;
          
          // Orange to red gradient
          const colorVar = Math.random();
          outerColors[i * 3] = 1.0;
          outerColors[i * 3 + 1] = 0.3 + colorVar * 0.4;
          outerColors[i * 3 + 2] = 0.1 + colorVar * 0.2;
        }

        const outerGeometry = new THREE.BufferGeometry();
        outerGeometry.setAttribute('position', new THREE.BufferAttribute(outerPositions, 3));
        outerGeometry.setAttribute('size', new THREE.BufferAttribute(outerSizes, 1));
        outerGeometry.setAttribute('color', new THREE.BufferAttribute(outerColors, 3));

        const outerMaterial = new THREE.PointsMaterial({
          size: 0.6,
          transparent: true,
          opacity: 0.7,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          sizeAttenuation: true,
          vertexColors: true,
          map: createFireTexture()
        });

        const outerPoints = new THREE.Points(outerGeometry, outerMaterial);
        modelGroup.add(outerPoints);

        // LAYER 3: Sparks (bright, fast, small)
        const sparkCount = 150;
        const sparkPositions = new Float32Array(sparkCount * 3);
        const sparkVelocities = [];
        const sparkLifetimes = [];
        const sparkSizes = new Float32Array(sparkCount);

        for (let i = 0; i < sparkCount; i++) {
          sparkPositions[i * 3] = nozzlePos.x + (Math.random() - 0.5) * 0.2;
          sparkPositions[i * 3 + 1] = nozzlePos.y + (Math.random() - 0.5) * 0.2;
          sparkPositions[i * 3 + 2] = nozzlePos.z + (Math.random() - 0.5) * 0.2;

          if (isShuttle) {
            sparkVelocities.push({
              x: (Math.random() - 0.5) * 0.04,
              y: (Math.random() - 0.5) * 0.04,
              z: 0.15 + Math.random() * 0.1, // Backward (positive Z)
              gravity: 0.001
            });
          } else {
            sparkVelocities.push({
              x: (Math.random() - 0.5) * 0.04,
              y: -0.15 - Math.random() * 0.1, // Downward
              z: (Math.random() - 0.5) * 0.04,
              gravity: 0.001
            });
          }

          sparkLifetimes.push(Math.random() * 40);
          sparkSizes[i] = 0.1 + Math.random() * 0.15;
        }

        const sparkGeometry = new THREE.BufferGeometry();
        sparkGeometry.setAttribute('position', new THREE.BufferAttribute(sparkPositions, 3));
        sparkGeometry.setAttribute('size', new THREE.BufferAttribute(sparkSizes, 1));

        const sparkMaterial = new THREE.PointsMaterial({
          size: 0.2,
          color: 0xffff99,
          transparent: true,
          opacity: 1.0,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          sizeAttenuation: true,
          map: createSparkTexture()
        });

        const sparkPoints = new THREE.Points(sparkGeometry, sparkMaterial);
        modelGroup.add(sparkPoints);

        // Create shock diamonds (visible at high expansion ratios)
        const shockDiamonds = [];
        for (let i = 0; i < 5; i++) {
          const diamondGeometry = new THREE.RingGeometry(0.15, 0.25, 16);
          const diamondMaterial = new THREE.MeshBasicMaterial({
            color: 0x88ccff,
            transparent: true,
            opacity: 0,
            side: THREE.DoubleSide,
            blending: THREE.AdditiveBlending
          });
          const diamond = new THREE.Mesh(diamondGeometry, diamondMaterial);
          diamond.position.copy(nozzlePos);
          diamond.position.y -= 0.5 + i * 0.4;
          diamond.rotation.x = Math.PI / 2;
          modelGroup.add(diamond);
          shockDiamonds.push(diamond);
        }

        particleSystemsRef.current.push({
          // Core flame
          points: corePoints,
          geometry: coreGeometry,
          material: coreMaterial,
          velocities: coreVelocities,
          lifetimes: coreLifetimes,
          colors: coreColors,
          
          // Outer flame
          outerPoints,
          outerGeometry,
          outerMaterial,
          outerVelocities,
          outerLifetimes,
          outerColors,
          
          // Sparks
          sparkPoints,
          sparkGeometry,
          sparkMaterial,
          sparkVelocities,
          sparkLifetimes,
          
          // Shock diamonds
          shockDiamonds,
          
          nozzlePos,
          modelSize,
          isShuttle
        });
      });

      // Add exhaust glow light
      const exhaustLight = new THREE.PointLight(0xff6600, 2, 10);
      exhaustLight.position.copy(nozzlePositions[0]);
      modelGroup.add(exhaustLight);
      
      // Store light for animation
      particleSystemsRef.current.exhaustLight = exhaustLight;
    };

    // Load model
    const loader = new GLTFLoader();
    console.log('Model loading check:', { hasModelInfo: !!modelInfo, path: modelInfo?.path });
    
    if (modelInfo && modelInfo.path) {
      console.log('Starting to load model from:', modelInfo.path);
      loader.load(
        modelInfo.path,
        (gltf) => {
          console.log('Model loaded successfully!', gltf);
          // Clear previous model
          if (modelRef.current) {
            scene.remove(modelRef.current);
          }

          const model = gltf.scene;
          model.traverse((child) => {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;

              // Enhance material brightness for dark materials only
              if (child.material) {
                child.material.needsUpdate = true;
                
                // Check if material is too dark and brighten it
                if (child.material.color) {
                  const brightness = (child.material.color.r + child.material.color.g + child.material.color.b) / 3;
                  
                  // If material is very dark (black or near-black), brighten it moderately
                  if (brightness < 0.15) {
                    child.material.color.multiplyScalar(1.8);
                    child.material.emissive = child.material.color.clone().multiplyScalar(0.2);
                    child.material.emissiveIntensity = 0.3;
                  }
                }
              }
            }
          });

          // Center and scale model properly
          const box = new THREE.Box3().setFromObject(model);
          const center = box.getCenter(new THREE.Vector3());
          const size = box.getSize(new THREE.Vector3());

          // Create a group to hold the model
          const modelGroup = new THREE.Group();
          
          // Center the model in the group - this puts the model's center at origin
          model.position.x = -center.x;
          model.position.y = -center.y;  // This centers it vertically
          model.position.z = -center.z;
          
          modelGroup.add(model);

          // Scale the group to fit in view
          const maxDim = Math.max(size.x, size.y, size.z);
          const scale = 4 / maxDim;
          modelGroup.scale.set(scale, scale, scale);

          // Lift the model group up based on type
          // Rockets and planes are tall and need more lift
          if (modelInfo?.type?.toLowerCase().includes('rocket')) {
            modelGroup.position.y = 3.5;
          } else if (modelInfo?.type?.toLowerCase().includes('plane')) {
            modelGroup.position.y = 2;
          } else {
            modelGroup.position.y = 1;
          }

          scene.add(modelGroup);
          modelRef.current = modelGroup;
          
          // Add exhaust effects for rockets
          if (modelInfo?.type?.toLowerCase().includes('rocket')) {
            createExhaustEffects(scene, modelGroup, size);
          }
          
          // Adjust camera and controls to look at lifted model
          let lookAtY = 1;
          if (modelInfo?.type?.toLowerCase().includes('rocket')) {
            lookAtY = 3.5;
          } else if (modelInfo?.type?.toLowerCase().includes('plane')) {
            lookAtY = 2;
          }
          const lookAtPoint = new THREE.Vector3(0, lookAtY, 0);
          camera.lookAt(lookAtPoint);
          controls.target.copy(lookAtPoint);
          controls.update();
        },
        (progress) => {
          console.log(`Loading: ${(progress.loaded / progress.total * 100).toFixed(0)}%`);
        },
        (error) => {
          console.error('Error loading model:', modelInfo.path, error);
          console.error('Model info:', modelInfo);
        }
      );
    }

    // Animation loop
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      controls.update();
      
      // Update particle systems with nozzle parameters
      const params = nozzleParamsRef.current;
      const throttle = params.throttle || 1.0;
      const expansionRatio = params.expansionRatio || 10;
      const ambientPressure = params.ambientPressure || 101325;
      
      // Calculate pressure ratio effect (lower ambient = better expansion)
      const pressureRatio = ambientPressure / 101325;
      const expansionEfficiency = 1.0 + (1.0 - pressureRatio) * 0.5;
      
      particleSystemsRef.current.forEach(ps => {
        if (!ps.points) return;
        
        // CORE FLAME PARTICLES
        const corePositions = ps.geometry.attributes.position.array;
        const coreSizes = ps.geometry.attributes.size.array;
        const coreColors = ps.geometry.attributes.color.array;
        const nozzleSpread = 0.15 * Math.sqrt(expansionRatio / 10) * expansionEfficiency;
        
        for (let i = 0; i < ps.velocities.length; i++) {
          ps.lifetimes[i] -= 1.5 * (0.3 + throttle * 0.7);
          
          if (ps.lifetimes[i] <= 0) {
            // Reset at nozzle
            corePositions[i * 3] = ps.nozzlePos.x + (Math.random() - 0.5) * nozzleSpread * 0.5;
            corePositions[i * 3 + 1] = ps.nozzlePos.y + (Math.random() - 0.5) * nozzleSpread * 0.5;
            corePositions[i * 3 + 2] = ps.nozzlePos.z + (Math.random() - 0.5) * nozzleSpread * 0.5;
            ps.lifetimes[i] = 50 + Math.random() * 30;
            
            const baseVelocity = 0.12 * throttle * (1 + expansionRatio / 60) * expansionEfficiency;
            
            if (ps.isShuttle) {
              ps.velocities[i] = {
                x: (Math.random() - 0.5) * 0.015 * (1 + expansionRatio / 50),
                y: (Math.random() - 0.5) * 0.015 * (1 + expansionRatio / 50),
                z: (baseVelocity + Math.random() * 0.08) // Backward (positive Z)
              };
            } else {
              ps.velocities[i] = {
                x: (Math.random() - 0.5) * 0.015 * (1 + expansionRatio / 50),
                y: -(baseVelocity + Math.random() * 0.08), // Downward
                z: (Math.random() - 0.5) * 0.015 * (1 + expansionRatio / 50)
              };
            }
            
            coreSizes[i] = (0.3 + Math.random() * 0.4) * throttle * (0.8 + expansionRatio / 50);
            
            // Hotter colors at high throttle
            const colorVar = Math.random();
            coreColors[i * 3] = 1.0;
            coreColors[i * 3 + 1] = throttle > 0.8 ? 0.9 + colorVar * 0.1 : 0.7 + colorVar * 0.2;
            coreColors[i * 3 + 2] = throttle > 0.8 ? 0.8 + colorVar * 0.2 : 0.3 + colorVar * 0.3;
          } else {
            corePositions[i * 3] += ps.velocities[i].x;
            corePositions[i * 3 + 1] += ps.velocities[i].y;
            corePositions[i * 3 + 2] += ps.velocities[i].z;
            
            const turbulence = 0.003 * (1 + expansionRatio / 30);
            ps.velocities[i].x += (Math.random() - 0.5) * turbulence;
            if (ps.isShuttle) {
              ps.velocities[i].y += (Math.random() - 0.5) * turbulence;
            } else {
              ps.velocities[i].z += (Math.random() - 0.5) * turbulence;
            }
            
            // Fade color as particle ages
            const lifeFactor = ps.lifetimes[i] / 60;
            coreColors[i * 3 + 1] *= lifeFactor;
            coreColors[i * 3 + 2] *= lifeFactor;
          }
        }
        
        ps.geometry.attributes.position.needsUpdate = true;
        ps.geometry.attributes.size.needsUpdate = true;
        ps.geometry.attributes.color.needsUpdate = true;
        ps.material.opacity = (0.7 + throttle * 0.3) + Math.sin(Date.now() * 0.008) * 0.15;
        
        // OUTER FLAME PARTICLES
        const outerPositions = ps.outerGeometry.attributes.position.array;
        const outerSizes = ps.outerGeometry.attributes.size.array;
        const outerColors = ps.outerGeometry.attributes.color.array;
        
        for (let i = 0; i < ps.outerVelocities.length; i++) {
          ps.outerLifetimes[i] -= 1.2 * (0.4 + throttle * 0.6);
          
          if (ps.outerLifetimes[i] <= 0) {
            outerPositions[i * 3] = ps.nozzlePos.x + (Math.random() - 0.5) * nozzleSpread;
            outerPositions[i * 3 + 1] = ps.nozzlePos.y + (Math.random() - 0.5) * nozzleSpread;
            outerPositions[i * 3 + 2] = ps.nozzlePos.z + (Math.random() - 0.5) * nozzleSpread;
            ps.outerLifetimes[i] = 70 + Math.random() * 40;
            
            const baseVelocity = 0.09 * throttle * (1 + expansionRatio / 70) * expansionEfficiency;
            
            if (ps.isShuttle) {
              ps.outerVelocities[i] = {
                x: (Math.random() - 0.5) * 0.025 * (1 + expansionRatio / 40),
                y: (Math.random() - 0.5) * 0.025 * (1 + expansionRatio / 40),
                z: (baseVelocity + Math.random() * 0.06) // Backward (positive Z)
              };
            } else {
              ps.outerVelocities[i] = {
                x: (Math.random() - 0.5) * 0.025 * (1 + expansionRatio / 40),
                y: -(baseVelocity + Math.random() * 0.06), // Downward
                z: (Math.random() - 0.5) * 0.025 * (1 + expansionRatio / 40)
              };
            }
            
            outerSizes[i] = (0.4 + Math.random() * 0.5) * throttle * (0.9 + expansionRatio / 40);
            
            const colorVar = Math.random();
            outerColors[i * 3] = 1.0;
            outerColors[i * 3 + 1] = 0.3 + colorVar * 0.4;
            outerColors[i * 3 + 2] = 0.1 + colorVar * 0.2;
          } else {
            outerPositions[i * 3] += ps.outerVelocities[i].x;
            outerPositions[i * 3 + 1] += ps.outerVelocities[i].y;
            outerPositions[i * 3 + 2] += ps.outerVelocities[i].z;
            
            const turbulence = 0.004 * (1 + expansionRatio / 35);
            ps.outerVelocities[i].x += (Math.random() - 0.5) * turbulence;
            if (ps.isShuttle) {
              ps.outerVelocities[i].y += (Math.random() - 0.5) * turbulence;
            } else {
              ps.outerVelocities[i].z += (Math.random() - 0.5) * turbulence;
            }
            
            // Expand as they move
            outerSizes[i] += 0.002 * throttle;
          }
        }
        
        ps.outerGeometry.attributes.position.needsUpdate = true;
        ps.outerGeometry.attributes.size.needsUpdate = true;
        ps.outerGeometry.attributes.color.needsUpdate = true;
        ps.outerMaterial.opacity = (0.5 + throttle * 0.3) + Math.sin(Date.now() * 0.006) * 0.1;
        
        // SPARK PARTICLES
        const sparkPositions = ps.sparkGeometry.attributes.position.array;
        const sparkSizes = ps.sparkGeometry.attributes.size.array;
        
        for (let i = 0; i < ps.sparkVelocities.length; i++) {
          ps.sparkLifetimes[i] -= 2 * throttle;
          
          if (ps.sparkLifetimes[i] <= 0) {
            sparkPositions[i * 3] = ps.nozzlePos.x + (Math.random() - 0.5) * nozzleSpread * 0.7;
            sparkPositions[i * 3 + 1] = ps.nozzlePos.y + (Math.random() - 0.5) * nozzleSpread * 0.7;
            sparkPositions[i * 3 + 2] = ps.nozzlePos.z + (Math.random() - 0.5) * nozzleSpread * 0.7;
            ps.sparkLifetimes[i] = 30 + Math.random() * 20;
            
            const sparkVel = 0.15 * throttle * (1 + expansionRatio / 80);
            
            if (ps.isShuttle) {
              ps.sparkVelocities[i] = {
                x: (Math.random() - 0.5) * 0.04,
                y: (Math.random() - 0.5) * 0.04,
                z: (sparkVel + Math.random() * 0.1), // Backward (positive Z)
                gravity: 0.001
              };
            } else {
              ps.sparkVelocities[i] = {
                x: (Math.random() - 0.5) * 0.04,
                y: -(sparkVel + Math.random() * 0.1), // Downward
                z: (Math.random() - 0.5) * 0.04,
                gravity: 0.001
              };
            }
            
            sparkSizes[i] = (0.1 + Math.random() * 0.15) * throttle;
          } else {
            sparkPositions[i * 3] += ps.sparkVelocities[i].x;
            sparkPositions[i * 3 + 1] += ps.sparkVelocities[i].y;
            sparkPositions[i * 3 + 2] += ps.sparkVelocities[i].z;
            
            // Gravity effect (downward for rockets, forward for shuttle)
            if (ps.isShuttle) {
              ps.sparkVelocities[i].z += ps.sparkVelocities[i].gravity;
            } else {
              ps.sparkVelocities[i].y -= ps.sparkVelocities[i].gravity;
            }
          }
        }
        
        ps.sparkGeometry.attributes.position.needsUpdate = true;
        ps.sparkGeometry.attributes.size.needsUpdate = true;
        ps.sparkMaterial.opacity = throttle * (0.8 + Math.sin(Date.now() * 0.02) * 0.2);
        
        // SHOCK DIAMONDS (visible at high expansion ratios and low ambient pressure)
        if (ps.shockDiamonds) {
          const shockVisibility = Math.max(0, (expansionRatio - 15) / 40) * (1 - pressureRatio) * throttle;
          ps.shockDiamonds.forEach((diamond, idx) => {
            diamond.material.opacity = shockVisibility * 0.3 * (1 - idx * 0.15);
            diamond.scale.set(
              1 + Math.sin(Date.now() * 0.005 + idx) * 0.1,
              1 + Math.sin(Date.now() * 0.005 + idx) * 0.1,
              1
            );
          });
        }
      });
      
      // Animate exhaust light with throttle and expansion
      if (particleSystemsRef.current.exhaustLight) {
        const light = particleSystemsRef.current.exhaustLight;
        const baseIntensity = 1.5 + throttle * 3.5;
        const flicker = Math.sin(Date.now() * 0.015) * 0.3 + Math.sin(Date.now() * 0.03) * 0.2;
        light.intensity = baseIntensity + flicker * throttle;
        light.distance = 10 + expansionRatio * 0.3 + throttle * 2;
        
        // Color shifts with throttle (white-hot at full throttle)
        if (throttle > 0.8) {
          light.color.setHSL(0.08, 0.8, 0.6 + throttle * 0.2);
        } else {
          light.color.setHSL(0.05, 1.0, 0.5);
        }
      }
      
      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current || !camera || !renderer) return;

      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(
        containerRef.current.clientWidth,
        containerRef.current.clientHeight
      );
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      // Clean up particle systems
      particleSystemsRef.current.forEach(ps => {
        if (ps.geometry) ps.geometry.dispose();
        if (ps.material) ps.material.dispose();
      });
      particleSystemsRef.current = [];
      
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      if (controlsRef.current) {
        controlsRef.current.dispose();
      }
      if (containerRef.current && rendererRef.current?.domElement) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
    };
  }, [modelInfo]);

  // Update nozzle params ref when they change
  useEffect(() => {
    nozzleParamsRef.current = nozzleParams;
  }, [nozzleParams]);

  return (
    <div ref={containerRef} className="w-full h-full bg-gradient-to-br from-gray-900 to-black relative z-10">
      {!modelInfo && (
        <div className="absolute inset-0 flex items-center justify-center text-white">
          <p>Loading 3D Viewer...</p>
        </div>
      )}
    </div>
  );
};

export default ThreeJSViewer;
