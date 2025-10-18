import React, { useRef, useEffect } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const ThreeJSViewer = ({ modelType, modelInfo }) => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const controlsRef = useRef(null);
  const modelRef = useRef(null);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1a1f);
    scene.fog = new THREE.Fog(0x1a1a1f, 20, 50);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      50,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(5, 3, 8);
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
    renderer.toneMappingExposure = 2.0;
    rendererRef.current = renderer;
    containerRef.current.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;
    controls.minDistance = 1;
    controls.maxDistance = 20;
    controls.maxPolarAngle = Math.PI / 2;
    controlsRef.current = controls;

    // Lighting - Enhanced for better visibility
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.5);
    scene.add(ambientLight);

    // Main directional light (key light)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 2.5);
    directionalLight.position.set(5, 10, 7);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);

    // Fill light (from opposite side)
    const fillLight = new THREE.DirectionalLight(0xffffff, 1.5);
    fillLight.position.set(-5, 5, -5);
    scene.add(fillLight);

    // Rim light (from behind)
    const rimLight = new THREE.DirectionalLight(0xffffff, 1.2);
    rimLight.position.set(0, 5, -10);
    scene.add(rimLight);

    // Additional hemisphere light for natural lighting
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1.5);
    scene.add(hemiLight);

    // Grid helper
    const gridHelper = new THREE.GridHelper(10, 10, 0x444444, 0x222222);
    scene.add(gridHelper);

    // Load model
    const loader = new GLTFLoader();
    if (modelInfo && modelInfo.path) {
      loader.load(
        modelInfo.path,
        (gltf) => {
          // Clear previous model
          if (modelRef.current) {
            scene.remove(modelRef.current);
          }

          const model = gltf.scene;
          model.traverse((child) => {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;

              // Enhance material brightness
              if (child.material) {
                child.material.needsUpdate = true;
                // Ensure materials aren't too dark
                if (child.material.color) {
                  child.material.emissive = child.material.color.clone().multiplyScalar(0.15);
                  child.material.emissiveIntensity = 0.3;
                }
                // Reduce metalness and roughness for brighter appearance
                if (child.material.metalness !== undefined) {
                  child.material.metalness = Math.min(child.material.metalness, 0.5);
                }
                if (child.material.roughness !== undefined) {
                  child.material.roughness = Math.max(child.material.roughness, 0.3);
                }
              }
            }
          });

          // Center and scale model
          const box = new THREE.Box3().setFromObject(model);
          const center = box.getCenter(new THREE.Vector3());
          const size = box.getSize(new THREE.Vector3());

          model.position.x = -center.x;
          model.position.y = -center.y;
          model.position.z = -center.z;

          const maxDim = Math.max(size.x, size.y, size.z);
          const scale = 5 / maxDim;
          model.scale.set(scale, scale, scale);

          scene.add(model);
          modelRef.current = model;
        },
        undefined,
        (error) => {
          console.error('Error loading model:', error);
        }
      );
    }

    // Animation loop
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      controls.update();
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

  return <div ref={containerRef} className="w-full h-full" />;
};

export default ThreeJSViewer;
