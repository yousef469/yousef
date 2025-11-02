import React, { useRef, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Rocket, Plane, Car, X, Loader2, MousePointer, ZoomIn, Info, Send, Sparkles, RotateCw } from 'lucide-react';
import HomePage from './pages/HomePage';
import RocketsPage from './pages/RocketsPage';
import PlanesPage from './pages/PlanesPage';
import CarsPage from './pages/CarsPage';
import ModelViewerPage from './pages/ModelViewerPage';
import RocketMechanicsPage from './pages/RocketMechanicsPage';
import CarMechanicsPage from './pages/CarMechanicsPage';
import PlaneMechanicsPage from './pages/PlaneMechanicsPage';
import GamesPage from './pages/GamesPage';
import QuizGame from './pages/QuizGame';
import SimulationGame from './pages/SimulationGame';
import MatchingGame from './pages/MatchingGame';
import EngineBuilderGame from './pages/EngineBuilderGame';
import UnifiedGame from './pages/UnifiedGame';
import GameCategorySelect from './pages/GameCategorySelect';
import GameMapRockets from './pages/GameMapRockets';
import GameMapCars from './pages/GameMapCars';
import GameMapPlanes from './pages/GameMapPlanes';
import LessonsDemoPage from './pages/LessonsDemoPage';
import RocketLessonPage from './pages/RocketLessonPage';
import PlaneLessonPage from './pages/PlaneLessonPage';
import PlaneQuizPage from './pages/PlaneQuizPage';
import ProgressDashboard from './pages/ProgressDashboard';
import UnitOverviewPage from './pages/UnitOverviewPage';
import BeginnerLessonPage from './pages/BeginnerLessonPage';
import BeginnerQuizPage from './pages/BeginnerQuizPage';
import LearningHubPage from './pages/LearningHubPage';
import TestCurriculumPage from './pages/TestCurriculumPage';

// ==================== 3D VIEWER COMPONENT ====================
const ThreeJSViewer = ({ modelType, hotspots = [] }) => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const meshRef = useRef(null);
  const animationFrameRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, isDragging: false, lastX: 0, lastY: 0 });
  const rotationRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    
    // Enhanced background with gradient
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createRadialGradient(256, 256, 0, 256, 256, 512);
    gradient.addColorStop(0, '#1a1a2e');
    gradient.addColorStop(0.5, '#0f0f1e');
    gradient.addColorStop(1, '#050510');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 512);
    scene.background = new THREE.CanvasTexture(canvas);
    scene.fog = new THREE.Fog(0x0a0a0f, 20, 50);
    
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      50,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(8, 3, 12);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Renderer setup with enhanced quality
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
    renderer.toneMappingExposure = 1.2;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting - Professional 3-point lighting setup
    const ambientLight = new THREE.AmbientLight(0x404060, 0.4);
    scene.add(ambientLight);

    // Key light (main)
    const mainLight = new THREE.DirectionalLight(0xffffff, 1.5);
    mainLight.position.set(15, 20, 15);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 2048;
    mainLight.shadow.mapSize.height = 2048;
    mainLight.shadow.camera.near = 0.5;
    mainLight.shadow.camera.far = 50;
    mainLight.shadow.camera.left = -15;
    mainLight.shadow.camera.right = 15;
    mainLight.shadow.camera.top = 15;
    mainLight.shadow.camera.bottom = -15;
    mainLight.shadow.bias = -0.0001;
    scene.add(mainLight);

    // Fill light (softer, blue tint)
    const fillLight = new THREE.DirectionalLight(0x6688ff, 0.6);
    fillLight.position.set(-15, 10, -10);
    scene.add(fillLight);

    // Rim light (back light for edge definition)
    const rimLight = new THREE.DirectionalLight(0xffffff, 0.8);
    rimLight.position.set(0, 10, -20);
    scene.add(rimLight);

    // Accent lights for metallic surfaces
    const accentLight1 = new THREE.PointLight(0x4ecdc4, 0.5, 30);
    accentLight1.position.set(5, 5, 5);
    scene.add(accentLight1);

    const accentLight2 = new THREE.PointLight(0xff6b6b, 0.3, 25);
    accentLight2.position.set(-5, 3, -5);
    scene.add(accentLight2);

    // Create model based on type - Enhanced Falcon 9 Rocket
    const createRocket = () => {
      const group = new THREE.Group();
      
      // Enhanced Materials with better visual properties
      const whitePaint = new THREE.MeshStandardMaterial({
        color: 0xfafafa,
        metalness: 0.3,
        roughness: 0.25,
        envMapIntensity: 0.8,
        clearcoat: 0.1,
        clearcoatRoughness: 0.3
      });
      const blackPaint = new THREE.MeshStandardMaterial({
        color: 0x0a0a0a,
        metalness: 0.4,
        roughness: 0.2,
        envMapIntensity: 1.0
      });
      const carbonFiber = new THREE.MeshStandardMaterial({
        color: 0x1a1a1a,
        metalness: 0.75,
        roughness: 0.12,
        envMapIntensity: 1.2
      });
      const aluminum = new THREE.MeshStandardMaterial({
        color: 0xc0c0c0,
        metalness: 0.9,
        roughness: 0.15,
        envMapIntensity: 1.5
      });
      
      // Payload Fairing (cylindrical section under nose)
      const fairing = new THREE.Mesh(
        new THREE.CylinderGeometry(0.45, 0.45, 1.5, 64),
        whitePaint
      );
      fairing.position.y = 6.25;
      fairing.castShadow = true;
      group.add(fairing);
      
      // Nose Cone - Clean cone on top of fairing
      const noseCone = new THREE.Mesh(
        new THREE.ConeGeometry(0.45, 1.5, 64),
        whitePaint
      );
      noseCone.position.y = 7.75;
      noseCone.castShadow = true;
      noseCone.receiveShadow = true;
      group.add(noseCone);
      
      // Second Stage (body)
      const secondStage = new THREE.Mesh(
        new THREE.CylinderGeometry(0.45, 0.45, 3.5, 64),
        whitePaint
      );
      secondStage.position.y = 3.75;
      secondStage.castShadow = true;
      group.add(secondStage);
      
      // Interstage (black band)
      const interstage = new THREE.Mesh(
        new THREE.CylinderGeometry(0.475, 0.475, 1.2, 64),
        blackPaint
      );
      interstage.position.y = 1.6;
      interstage.castShadow = true;
      group.add(interstage);
      
      // Grid fins structure lines
      for (let i = 0; i < 8; i++) {
        const angle = (i * Math.PI * 2) / 8;
        const gridLine = new THREE.Mesh(
          new THREE.BoxGeometry(0.01, 1.1, 0.015),
          carbonFiber
        );
        gridLine.position.set(
          Math.cos(angle) * 0.48,
          1.6,
          Math.sin(angle) * 0.48
        );
        gridLine.lookAt(0, 1.6, 0);
        group.add(gridLine);
      }
      
      // First Stage
      const firstStage = new THREE.Mesh(
        new THREE.CylinderGeometry(0.475, 0.475, 5, 64),
        whitePaint
      );
      firstStage.position.y = -1;
      firstStage.castShadow = true;
      group.add(firstStage);
      
      // Tank dome
      const tankDome = new THREE.Mesh(
        new THREE.SphereGeometry(0.475, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2),
        whitePaint
      );
      tankDome.position.y = 1.5;
      tankDome.rotation.x = Math.PI;
      group.add(tankDome);
      
      // Raceway (external pipe)
      const raceway = new THREE.Mesh(
        new THREE.BoxGeometry(0.04, 8, 0.04),
        aluminum
      );
      raceway.position.set(0.49, 1.5, 0);
      group.add(raceway);
      
      // Landing Legs (4 legs)
      for (let i = 0; i < 4; i++) {
        const legAssembly = new THREE.Group();
        
        const leg = new THREE.Mesh(
          new THREE.CylinderGeometry(0.06, 0.075, 2.5, 8),
          carbonFiber
        );
        leg.position.y = -1;
        leg.castShadow = true;
        
        const pad = new THREE.Mesh(
          new THREE.CylinderGeometry(0.225, 0.25, 0.075, 16),
          carbonFiber
        );
        pad.position.y = -2.25;
        pad.castShadow = true;
        
        legAssembly.add(leg, pad);
        
        const angle = (i * Math.PI * 2) / 4 + Math.PI / 4;
        legAssembly.position.x = Math.cos(angle) * 0.8;
        legAssembly.position.z = Math.sin(angle) * 0.8;
        legAssembly.position.y = -1;
        legAssembly.rotation.z = 0.16;
        legAssembly.rotation.y = angle;
        group.add(legAssembly);
      }
      
      // Grid Fins (4 fins)
      for (let i = 0; i < 4; i++) {
        const finAssembly = new THREE.Group();
        
        const frame = new THREE.Mesh(
          new THREE.BoxGeometry(1.1, 1.1, 0.04),
          new THREE.MeshStandardMaterial({
            color: 0x4a4a4a,
            metalness: 0.9,
            roughness: 0.15
          })
        );
        frame.castShadow = true;
        finAssembly.add(frame);
        
        // Grid pattern
        for (let j = -4; j <= 4; j++) {
          const bar = new THREE.Mesh(
            new THREE.BoxGeometry(1, 0.02, 0.05),
            new THREE.MeshStandardMaterial({
              color: 0x3a3a3a,
              metalness: 0.85,
              roughness: 0.2
            })
          );
          bar.position.y = j * 0.12;
          finAssembly.add(bar);
        }
        
        const angle = (i * Math.PI * 2) / 4;
        finAssembly.position.x = Math.cos(angle) * 0.775;
        finAssembly.position.z = Math.sin(angle) * 0.775;
        finAssembly.position.y = 0.75;
        finAssembly.rotation.y = angle;
        group.add(finAssembly);
      }
      
      // Engine Section (Octaweb)
      const octaweb = new THREE.Mesh(
        new THREE.CylinderGeometry(0.675, 0.725, 0.9, 8),
        carbonFiber
      );
      octaweb.position.y = -3.75;
      octaweb.castShadow = true;
      group.add(octaweb);
      
      // Heat Shield Base
      const heatShield = new THREE.Mesh(
        new THREE.CylinderGeometry(0.7, 0.7, 0.125, 32),
        new THREE.MeshStandardMaterial({
          color: 0x2a2a2a,
          metalness: 0.5,
          roughness: 0.6
        })
      );
      heatShield.position.y = -3.375;
      group.add(heatShield);
      
      // Merlin Engines (9 engines in octaweb pattern) - Enhanced
      const engineMaterial = new THREE.MeshStandardMaterial({
        color: 0x3a3a3a,
        metalness: 0.95,
        roughness: 0.1,
        envMapIntensity: 1.3
      });
      const nozzleMaterial = new THREE.MeshStandardMaterial({
        color: 0x6b5a45,
        metalness: 0.7,
        roughness: 0.3,
        emissive: 0x221100,
        emissiveIntensity: 0.1
      });
      
      // Center engine
      const createEngine = (x, z) => {
        const engineGroup = new THREE.Group();
        
        // Turbopump housing
        const turbopump = new THREE.Mesh(
          new THREE.BoxGeometry(0.15, 0.2, 0.12),
          engineMaterial
        );
        turbopump.position.y = 0.5;
        engineGroup.add(turbopump);
        
        // Combustion chamber
        const chamber = new THREE.Mesh(
          new THREE.CylinderGeometry(0.14, 0.16, 0.9, 24),
          engineMaterial
        );
        chamber.castShadow = true;
        engineGroup.add(chamber);
        
        // Injector plate
        const injector = new THREE.Mesh(
          new THREE.CylinderGeometry(0.135, 0.135, 0.03, 24),
          new THREE.MeshStandardMaterial({
            color: 0xb87333,
            metalness: 0.8,
            roughness: 0.2
          })
        );
        injector.position.y = 0.45;
        engineGroup.add(injector);
        
        // Bell nozzle with better shape
        const nozzlePoints = [];
        for (let i = 0; i <= 15; i++) {
          const t = i / 15;
          let radius;
          
          if (t < 0.2) {
            // Throat (narrowest part)
            radius = 0.16 - t * 0.2;
          } else {
            // Bell expansion
            const expansionT = (t - 0.2) / 0.8;
            radius = 0.12 + Math.pow(expansionT, 0.6) * 0.15;
          }
          
          const height = -t * 0.9;
          nozzlePoints.push(new THREE.Vector2(radius, height));
        }
        
        const nozzle = new THREE.Mesh(
          new THREE.LatheGeometry(nozzlePoints, 32),
          nozzleMaterial
        );
        nozzle.position.y = -0.45;
        nozzle.castShadow = true;
        engineGroup.add(nozzle);
        
        // Nozzle extension (darker)
        const nozzleExt = new THREE.Mesh(
          new THREE.CylinderGeometry(0.26, 0.28, 0.15, 32),
          new THREE.MeshStandardMaterial({
            color: 0x2a2a2a,
            metalness: 0.6,
            roughness: 0.4
          })
        );
        nozzleExt.position.y = -1.3;
        engineGroup.add(nozzleExt);
        
        engineGroup.position.set(x, -4, z);
        return engineGroup;
      };
      
      group.add(createEngine(0, 0));
      
      // Outer 8 engines
      const outerRadius = 0.425;
      for (let i = 0; i < 8; i++) {
        const angle = (i * Math.PI * 2) / 8 + Math.PI / 8;
        const x = Math.cos(angle) * outerRadius;
        const z = Math.sin(angle) * outerRadius;
        group.add(createEngine(x, z));
      }
      
      return group;
    };
    
    const createPlane = () => {
      const group = new THREE.Group();
      
      // Fuselage (main body)
      const fuselageGeometry = new THREE.CylinderGeometry(0.4, 0.3, 5, 32);
      const fuselageMaterial = new THREE.MeshStandardMaterial({
        color: 0x4ecdc4,
        metalness: 0.7,
        roughness: 0.2
      });
      const fuselage = new THREE.Mesh(fuselageGeometry, fuselageMaterial);
      fuselage.rotation.z = Math.PI / 2;
      group.add(fuselage);
      
      // Nose cone
      const noseGeometry = new THREE.SphereGeometry(0.4, 32, 32, 0, Math.PI);
      const nose = new THREE.Mesh(noseGeometry, fuselageMaterial);
      nose.rotation.z = -Math.PI / 2;
      nose.position.x = 2.5;
      group.add(nose);
      
      // Wings (main)
      const wingGeometry = new THREE.BoxGeometry(0.2, 4, 1.5);
      const wingMaterial = new THREE.MeshStandardMaterial({
        color: 0x3db8aa,
        metalness: 0.6,
        roughness: 0.3
      });
      const wings = new THREE.Mesh(wingGeometry, wingMaterial);
      wings.position.x = -0.5;
      group.add(wings);
      
      // Tail wing (vertical stabilizer)
      const tailGeometry = new THREE.BoxGeometry(0.2, 0.8, 1.2);
      const tail = new THREE.Mesh(tailGeometry, wingMaterial);
      tail.rotation.x = Math.PI / 2;
      tail.position.x = -2.2;
      tail.position.y = 0.6;
      group.add(tail);
      
      // Horizontal stabilizers
      const hStabGeometry = new THREE.BoxGeometry(0.15, 1.5, 0.6);
      const hStab = new THREE.Mesh(hStabGeometry, wingMaterial);
      hStab.position.x = -2.2;
      group.add(hStab);
      
      // Engines (2 engines under wings)
      const engineGeometry = new THREE.CylinderGeometry(0.25, 0.25, 0.8, 32);
      const engineMaterial = new THREE.MeshStandardMaterial({
        color: 0x666666,
        metalness: 0.9,
        roughness: 0.1
      });
      
      const engine1 = new THREE.Mesh(engineGeometry, engineMaterial);
      engine1.rotation.z = Math.PI / 2;
      engine1.position.set(-0.5, 1.2, 0);
      group.add(engine1);
      
      const engine2 = new THREE.Mesh(engineGeometry, engineMaterial);
      engine2.rotation.z = Math.PI / 2;
      engine2.position.set(-0.5, -1.2, 0);
      group.add(engine2);
      
      return group;
    };
    
    const createCar = () => {
      const group = new THREE.Group();
      
      // Car body (lower part)
      const bodyGeometry = new THREE.BoxGeometry(4, 0.6, 1.8);
      const bodyMaterial = new THREE.MeshStandardMaterial({
        color: 0xffa726,
        metalness: 0.8,
        roughness: 0.2
      });
      const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
      body.position.y = 0.5;
      group.add(body);
      
      // Car cabin (upper part)
      const cabinGeometry = new THREE.BoxGeometry(2, 0.8, 1.6);
      const cabin = new THREE.Mesh(cabinGeometry, bodyMaterial);
      cabin.position.y = 1.1;
      cabin.position.x = -0.3;
      group.add(cabin);
      
      // Hood (front slope)
      const hoodGeometry = new THREE.BoxGeometry(1.2, 0.3, 1.8);
      const hood = new THREE.Mesh(hoodGeometry, bodyMaterial);
      hood.position.set(1.6, 0.65, 0);
      hood.rotation.z = -0.2;
      group.add(hood);
      
      // Wheels
      const wheelGeometry = new THREE.CylinderGeometry(0.35, 0.35, 0.3, 32);
      const wheelMaterial = new THREE.MeshStandardMaterial({
        color: 0x222222,
        metalness: 0.5,
        roughness: 0.7
      });
      
      const wheelPositions = [
        { x: 1.2, y: 0.35, z: 1.0 },
        { x: 1.2, y: 0.35, z: -1.0 },
        { x: -1.2, y: 0.35, z: 1.0 },
        { x: -1.2, y: 0.35, z: -1.0 }
      ];
      
      wheelPositions.forEach(pos => {
        const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
        wheel.rotation.z = Math.PI / 2;
        wheel.position.set(pos.x, pos.y, pos.z);
        group.add(wheel);
        
        // Rim
        const rimGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.32, 32);
        const rimMaterial = new THREE.MeshStandardMaterial({
          color: 0xcccccc,
          metalness: 0.9,
          roughness: 0.1
        });
        const rim = new THREE.Mesh(rimGeometry, rimMaterial);
        rim.rotation.z = Math.PI / 2;
        rim.position.set(pos.x, pos.y, pos.z);
        group.add(rim);
      });
      
      // Spoiler
      const spoilerGeometry = new THREE.BoxGeometry(0.2, 1.6, 0.6);
      const spoilerMaterial = new THREE.MeshStandardMaterial({
        color: 0xff8800,
        metalness: 0.7,
        roughness: 0.3
      });
      const spoiler = new THREE.Mesh(spoilerGeometry, spoilerMaterial);
      spoiler.position.set(-2, 1.2, 0);
      group.add(spoiler);
      
      // Windows (darker material)
      const windowMaterial = new THREE.MeshStandardMaterial({
        color: 0x111111,
        metalness: 0.9,
        roughness: 0.1,
        transparent: true,
        opacity: 0.3
      });
      
      const windowGeometry = new THREE.BoxGeometry(1.8, 0.7, 1.62);
      const windows = new THREE.Mesh(windowGeometry, windowMaterial);
      windows.position.set(-0.3, 1.15, 0);
      group.add(windows);
      
      return group;
    };
    
    // Create the appropriate model
    const loader = new GLTFLoader();
    
    if (modelType === 'rocket') {
      // Use procedural rocket model
      const model = createRocket();
      scene.add(model);
      meshRef.current = model;
    } else if (modelType === 'plane' || modelType === 'car') {
      // Load GLB models for plane and car
      const modelPath = modelType === 'plane' ? '/plane.glb' : '/porsche.glb';
      
      loader.load(
        modelPath,
        (gltf) => {
          const model = gltf.scene;
          
          // Scale and position adjustments
          if (modelType === 'car') {
            model.scale.set(2, 2, 2);
            model.position.y = -1;
          } else if (modelType === 'plane') {
            model.scale.set(0.5, 0.5, 0.5);
            model.position.y = 0;
          }
          
          // Enable shadows
          model.traverse((child) => {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
            }
          });
          
          scene.add(model);
          meshRef.current = model;
        },
        (progress) => {
          console.log('Loading:', (progress.loaded / progress.total * 100) + '%');
        },
        (error) => {
          console.error('Error loading model:', error);
          // Fallback to procedural model
          const fallbackModel = modelType === 'plane' ? createPlane() : createCar();
          scene.add(fallbackModel);
          meshRef.current = fallbackModel;
        }
      );
    } else {
      // Fallback to box
      const geometry = new THREE.BoxGeometry(2, 3, 2);
      const material = new THREE.MeshStandardMaterial({
        color: 0x4a90e2,
        metalness: 0.7,
        roughness: 0.2
      });
      const model = new THREE.Mesh(geometry, material);
      scene.add(model);
      meshRef.current = model;
    }

    // Add ground plane for better depth perception
    if (modelType === 'rocket' || modelType === 'car') {
      const groundGeometry = new THREE.CircleGeometry(15, 64);
      const groundMaterial = new THREE.MeshStandardMaterial({
        color: 0x1a1a1a,
        metalness: 0.2,
        roughness: 0.8,
        transparent: true,
        opacity: 0.4
      });
      const ground = new THREE.Mesh(groundGeometry, groundMaterial);
      ground.rotation.x = -Math.PI / 2;
      ground.position.y = modelType === 'rocket' ? -4.5 : -0.5;
      ground.receiveShadow = true;
      scene.add(ground);
      
      // Add grid lines on ground for better depth
      const gridHelper = new THREE.GridHelper(20, 20, 0x444444, 0x222222);
      gridHelper.position.y = modelType === 'rocket' ? -4.49 : -0.49;
      gridHelper.material.transparent = true;
      gridHelper.material.opacity = 0.2;
      scene.add(gridHelper);
    }
    
    // Add stars for rocket background
    if (modelType === 'rocket') {
      const starsGeometry = new THREE.BufferGeometry();
      const starCount = 1000;
      const positions = new Float32Array(starCount * 3);
      const colors = new Float32Array(starCount * 3);
      
      for (let i = 0; i < starCount; i++) {
        const i3 = i * 3;
        const radius = 40 + Math.random() * 60;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        
        positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i3 + 2] = radius * Math.cos(phi);
        
        const brightness = 0.5 + Math.random() * 0.5;
        colors[i3] = brightness;
        colors[i3 + 1] = brightness;
        colors[i3 + 2] = brightness;
      }
      
      starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      starsGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      
      const starsMaterial = new THREE.PointsMaterial({
        size: 0.1,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        sizeAttenuation: true
      });
      
      const stars = new THREE.Points(starsGeometry, starsMaterial);
      scene.add(stars);
    }

    // Animation loop
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      
      if (meshRef.current) {
        meshRef.current.rotation.x = rotationRef.current.x;
        meshRef.current.rotation.y = rotationRef.current.y;
        
        if (!mouseRef.current.isDragging) {
          rotationRef.current.y += 0.005;
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
      if (mouseRef.current.isDragging) {
        const deltaX = e.clientX - mouseRef.current.lastX;
        const deltaY = e.clientY - mouseRef.current.lastY;
        
        rotationRef.current.y += deltaX * 0.01;
        rotationRef.current.x += deltaY * 0.01;
        
        mouseRef.current.lastX = e.clientX;
        mouseRef.current.lastY = e.clientY;
      }
    };

    const handleMouseUp = () => {
      mouseRef.current.isDragging = false;
    };

    const handleWheel = (e) => {
      e.preventDefault();
      const camera = cameraRef.current;
      const zoomSpeed = 0.5; // Increased from 0.1 for easier zooming
      const direction = new THREE.Vector3();
      camera.getWorldDirection(direction);
      
      // Zoom in/out with limits
      const minDistance = 3;
      const maxDistance = 25;
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
      
      // Dispose of all geometries and materials in the scene
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
  }, [modelType]);

  return <div ref={containerRef} className="w-full h-full" />;
};

// ==================== 3D VIEWER MODAL COMPONENT ====================
const Model3DViewer = ({ isOpen, onClose, modelType, modelInfo }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setIsLoading(false), 1000);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-gray-950">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-10 flex items-center justify-between p-4 bg-gray-900/95 backdrop-blur border-b border-gray-700">
        <div className="flex items-center gap-3">
          {modelType === 'rocket' && <Rocket className="w-6 h-6 text-cyan-400" />}
          {modelType === 'plane' && <Plane className="w-6 h-6 text-blue-400" />}
          {modelType === 'car' && <Car className="w-6 h-6 text-orange-400" />}
          <h2 className="text-xl font-bold text-white">{modelInfo.title}</h2>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      {/* Main Content - Info Left, 3D Right */}
      <div className="flex h-screen pt-16">
        {/* Info Panel - LEFT SIDE */}
        <div className="w-2/5 bg-gray-900 p-8 overflow-y-auto border-r border-gray-700">
          <h3 className="text-2xl font-bold text-white mb-4">{modelInfo.title}</h3>
          <p className="text-gray-300 mb-8 text-lg">{modelInfo.description}</p>
          
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold text-cyan-400 mb-4">Key Components</h4>
              <ul className="space-y-3">
                {modelInfo.components.map((component, index) => (
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
                {modelInfo.specs.map((spec, index) => (
                  <div key={index} className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                    <div className="text-xs text-gray-500 uppercase tracking-wide">{spec.label}</div>
                    <div className="text-lg text-white font-bold mt-1">{spec.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 3D Viewer - RIGHT SIDE */}
        <div className="w-3/5 relative bg-gradient-to-br from-gray-900 to-black">
          <ThreeJSViewer modelType={modelType} />

          {/* Loading Indicator */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <div className="flex items-center">
                <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
                <span className="ml-2 text-white text-lg">Loading 3D Model...</span>
              </div>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ==================== AI TUTOR PANEL COMPONENT ====================
const AITutorPanel = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    { id: 1, type: 'bot', text: 'Hello! I\'m your AI engineering tutor. Ask me anything about rockets, planes, or cars!' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const simulatedResponses = {
    rocket: "Rockets use Newton's third law of motion. The combustion of fuel creates hot gases that are expelled at high velocity through the nozzle, generating thrust in the opposite direction.",
    plane: "Airplanes generate lift through their wing shape (airfoil). The curved upper surface causes air to move faster, creating lower pressure above the wing compared to below.",
    car: "Modern cars use either internal combustion engines or electric motors. ICE vehicles convert chemical energy from fuel into mechanical energy, while EVs use batteries to power electric motors.",
    default: "That's an interesting question! Could you be more specific about what aspect you'd like to learn about?"
  };

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const userMessage = {
        id: Date.now(),
        type: 'user',
        text: inputValue
      };
      setMessages(prev => [...prev, userMessage]);
      setInputValue('');
      setIsTyping(true);

      setTimeout(() => {
        const lowerInput = inputValue.toLowerCase();
        let response = simulatedResponses.default;
        
        if (lowerInput.includes('rocket')) response = simulatedResponses.rocket;
        else if (lowerInput.includes('plane')) response = simulatedResponses.plane;
        else if (lowerInput.includes('car')) response = simulatedResponses.car;

        const botMessage = {
          id: Date.now() + 1,
          type: 'bot',
          text: response
        };
        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
      }, 1500);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-gray-900 border-l border-gray-700 z-40 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <Bot className="w-6 h-6 text-cyan-400" />
          <h3 className="text-lg font-semibold text-white">AI Engineering Tutor</h3>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}` }
          >
            <div
              className={`max-w-[80%] p-3 rounded-2xl ${
                message.type === 'user'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                  : 'bg-gray-800 text-gray-300 border border-gray-700'
              }`}
            >
              {message.type === 'bot' && (
                <Bot className="w-4 h-4 inline mr-2 text-cyan-400" />
              )}
              {message.text}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-800 border border-gray-700 px-4 py-3 rounded-2xl">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask about engineering..."
            className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors"
          />
          <button
            onClick={handleSendMessage}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 p-2 rounded-lg hover:scale-105 transition-transform"
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

// ==================== VEHICLE CARD COMPONENT ====================
const VehicleCard = ({ icon: Icon, title, description, gradient, onClick, delay }) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer group relative"
    >
      <div className={`absolute inset-0 ${gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500` } />
      
      <div className="relative bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 overflow-hidden">
        <div className={`absolute inset-0 ${gradient} opacity-10 group-hover:opacity-20 transition-opacity` } />
        
        <div className={`relative z-10 w-16 h-16 ${gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform` }>
          <Icon className="w-8 h-8 text-white" />
        </div>
        
        <h3 className="relative z-10 text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
          {title}
        </h3>
        <p className="relative z-10 text-gray-400 mb-4">
          {description}
        </p>
        
        <div className="relative z-10 flex items-center text-cyan-400 group-hover:text-cyan-300 transition-colors">
          <span className="text-sm font-semibold">Explore in 3D</span>
          <RotateCw className="w-4 h-4 ml-2 group-hover:rotate-180 transition-transform duration-500" />
        </div>
      </div>
    </div>
  );
};

// ==================== MAIN APP COMPONENT ====================
import IntroAnimation from './components/IntroAnimation';
import AllInOnePage from './pages/AllInOnePage';
import AuthPage from './pages/AuthPage';
import ComparePage from './pages/ComparePage';
import DashboardPage from './pages/DashboardPage';
import BookmarksNotes from './components/BookmarksNotes';
import CollaborationMode from './components/CollaborationMode';
import ModelUpload from './components/ModelUpload';
import GamificationSystem from './components/GamificationSystem';
import AI3DGeneratorPage from './pages/AI3DGeneratorPage';
import PricingPage from './pages/PricingPage';
import ProgressionPage from './pages/ProgressionPage';
import LearnMechanicsPage from './pages/LearnMechanicsPage';
import LearnSectionsPage from './pages/LearnSectionsPage';
import LearnInformationPage from './pages/LearnInformationPage';
import CollaboratePage from './pages/CollaboratePage';
import PhysicsPage from './pages/PhysicsPage';
import MathematicsPage from './pages/MathematicsPage';
import ElectronicsPage from './pages/ElectronicsPage';
import BooksPage from './pages/BooksPage';
import Leaderboard from './components/Leaderboard';
import CommunityQA from './components/CommunityQA';

// Wrapper pages for routes
const LeaderboardPage = () => (
  <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-8">
    <Leaderboard />
  </div>
);

const CommunityPage = () => (
  <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-8">
    <CommunityQA />
  </div>
);
import ProtectedRoute from './components/ProtectedRoute';
import FloatingAIHelper from './components/FloatingAIHelper';
import { useState as useAppState } from 'react';

export default function App() {
  const [showIntro, setShowIntro] = useAppState(true);

  return (
    <>
      {showIntro && <IntroAnimation onComplete={() => setShowIntro(false)} />}
      <FloatingAIHelper />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/viewer" element={<ProtectedRoute><AllInOnePage /></ProtectedRoute>} />
          <Route path="/learn" element={<ProtectedRoute><LearnMechanicsPage /></ProtectedRoute>} />
          <Route path="/learn/sections" element={<ProtectedRoute><LearnSectionsPage /></ProtectedRoute>} />
          <Route path="/learn/information" element={<ProtectedRoute><LearnInformationPage /></ProtectedRoute>} />
          <Route path="/learn/rockets" element={<ProtectedRoute><RocketMechanicsPage /></ProtectedRoute>} />
          <Route path="/learn/cars" element={<ProtectedRoute><CarMechanicsPage /></ProtectedRoute>} />
          <Route path="/learn/planes" element={<ProtectedRoute><PlaneMechanicsPage /></ProtectedRoute>} />
          <Route path="/mechanics/rockets" element={<ProtectedRoute><RocketMechanicsPage /></ProtectedRoute>} />
          <Route path="/mechanics/cars" element={<ProtectedRoute><CarMechanicsPage /></ProtectedRoute>} />
          <Route path="/mechanics/planes" element={<ProtectedRoute><PlaneMechanicsPage /></ProtectedRoute>} />
          <Route path="/learn/physics" element={<ProtectedRoute><PhysicsPage /></ProtectedRoute>} />
          <Route path="/learn/mathematics" element={<ProtectedRoute><MathematicsPage /></ProtectedRoute>} />
          <Route path="/learn/electronics" element={<ProtectedRoute><ElectronicsPage /></ProtectedRoute>} />
          <Route path="/learn/books" element={<ProtectedRoute><BooksPage /></ProtectedRoute>} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/collaborate" element={<ProtectedRoute><CollaboratePage /></ProtectedRoute>} />
          <Route path="/games" element={<ProtectedRoute><GameCategorySelect /></ProtectedRoute>} />
          <Route path="/games/map/rockets" element={<ProtectedRoute><GameMapRockets /></ProtectedRoute>} />
          <Route path="/games/map/cars" element={<ProtectedRoute><GameMapCars /></ProtectedRoute>} />
          <Route path="/games/map/planes" element={<ProtectedRoute><GameMapPlanes /></ProtectedRoute>} />
          <Route path="/lessons/demo" element={<ProtectedRoute><LessonsDemoPage /></ProtectedRoute>} />
          <Route path="/lessons/rockets/:lessonId" element={<ProtectedRoute><RocketLessonPage /></ProtectedRoute>} />
          <Route path="/games/play/planes/lesson/:lessonId" element={<ProtectedRoute><PlaneLessonPage /></ProtectedRoute>} />
          <Route path="/games/play/planes/quiz/:lessonId" element={<ProtectedRoute><PlaneQuizPage /></ProtectedRoute>} />
          <Route path="/progress" element={<ProtectedRoute><ProgressDashboard /></ProtectedRoute>} />
          <Route path="/test-curriculum" element={<TestCurriculumPage />} />
          <Route path="/learn/hub" element={<ProtectedRoute><LearningHubPage /></ProtectedRoute>} />
          <Route path="/learn/unit/:unitId" element={<ProtectedRoute><UnitOverviewPage /></ProtectedRoute>} />
          <Route path="/learn/beginner/lesson/:lessonId" element={<ProtectedRoute><BeginnerLessonPage /></ProtectedRoute>} />
          <Route path="/learn/beginner/quiz/:lessonId" element={<ProtectedRoute><BeginnerQuizPage /></ProtectedRoute>} />
          <Route path="/games/play/:category/:level" element={<ProtectedRoute><UnifiedGame /></ProtectedRoute>} />
          <Route path="/games/journey" element={<ProtectedRoute><UnifiedGame /></ProtectedRoute>} />
          <Route path="/games/quiz" element={<ProtectedRoute><QuizGame /></ProtectedRoute>} />
          <Route path="/games/simulation" element={<ProtectedRoute><SimulationGame /></ProtectedRoute>} />
          <Route path="/games/matching" element={<ProtectedRoute><MatchingGame /></ProtectedRoute>} />
          <Route path="/games/engine-builder" element={<ProtectedRoute><EngineBuilderGame /></ProtectedRoute>} />
          <Route path="/models/:id?" element={<ProtectedRoute><AllInOnePage /></ProtectedRoute>} />
          
          {/* New Features */}
          <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
          <Route path="/bookmarks" element={<ProtectedRoute><BookmarksNotes /></ProtectedRoute>} />
          <Route path="/collaborate" element={<ProtectedRoute><CollaborationMode /></ProtectedRoute>} />
          <Route path="/collaborate/:sessionId" element={<ProtectedRoute><CollaborationMode /></ProtectedRoute>} />
          <Route path="/upload" element={<ProtectedRoute><ModelUpload /></ProtectedRoute>} />
          <Route path="/progression" element={<ProtectedRoute><ProgressionPage /></ProtectedRoute>} />
          <Route path="/leaderboard" element={<ProtectedRoute><LeaderboardPage /></ProtectedRoute>} />
          <Route path="/community" element={<ProtectedRoute><CommunityPage /></ProtectedRoute>} />
          <Route path="/ai-generator" element={<AI3DGeneratorPage />} />
          <Route path="/pricing" element={<PricingPage />} />
        </Routes>
      </Router>
    </>
  );
}
