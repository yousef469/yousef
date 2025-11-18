import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import ThreeJSViewer from './ThreeJSViewer';
import AnnotationCanvas from './AnnotationCanvas';

/**
 * Enhanced ThreeJSViewer with camera synchronization and annotations for presentation mode
 * Host controls camera and can draw annotations, joiners follow automatically
 */
const ThreeJSViewerSynced = ({ 
  modelInfo, 
  isHost = false,
  onCameraChange = null, // Callback when host moves camera
  syncedCameraState = null, // Camera state from host (for joiners)
  enableControls = true, // Disable for joiners
  onAnnotationDraw = null, // Callback when host draws
  receivedAnnotations = [], // Annotations from host
  onAnnotationClear = null // Callback when host clears
}) => {
  const viewerRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const lastBroadcastTime = useRef(0);
  const lastCameraState = useRef(null);
  const BROADCAST_THROTTLE = 100; // ms (10 updates/second - reduced for performance)

  // Handle camera ready callback from ThreeJSViewer
  const handleCameraReady = ({ camera, controls }) => {
    cameraRef.current = camera;
    controlsRef.current = controls;
  };

  // Monitor camera changes (host only) - throttled for performance
  useEffect(() => {
    if (!isHost || !enableControls || !onCameraChange) return;

    const checkCamera = () => {
      const camera = cameraRef.current;
      const controls = controlsRef.current;
      if (!camera || !controls) return;

      const now = Date.now();
      if (now - lastBroadcastTime.current < BROADCAST_THROTTLE) return;

      // Calculate distance for zoom (OrbitControls uses distance, not camera.zoom for perspective)
      const distance = camera.position.distanceTo(controls.target);
      
      const state = {
        position: {
          x: camera.position.x,
          y: camera.position.y,
          z: camera.position.z
        },
        target: {
          x: controls.target.x,
          y: controls.target.y,
          z: controls.target.z
        },
        distance: distance, // Use distance for zoom tracking
        zoom: camera.zoom // Keep for compatibility
      };

      // Only broadcast if significantly changed (reduce network traffic)
      const stateStr = JSON.stringify(state);
      if (stateStr !== lastCameraState.current) {
        lastCameraState.current = stateStr;
        onCameraChange(state);
        lastBroadcastTime.current = now;
      }
    };

    // Wait for camera to be ready
    const waitForCamera = setInterval(() => {
      if (cameraRef.current && controlsRef.current) {
        clearInterval(waitForCamera);
        
        // Listen to controls change event
        const controls = controlsRef.current;
        controls.addEventListener('change', checkCamera);

        // Also check periodically (fallback)
        const interval = setInterval(checkCamera, BROADCAST_THROTTLE);

        // Store cleanup function
        window.__cameraSyncCleanup = () => {
          controls.removeEventListener('change', checkCamera);
          clearInterval(interval);
        };
      }
    }, 100);

    return () => {
      clearInterval(waitForCamera);
      if (window.__cameraSyncCleanup) {
        window.__cameraSyncCleanup();
        delete window.__cameraSyncCleanup;
      }
    };
  }, [isHost, enableControls, onCameraChange]);

  // Apply synced camera state (joiners only) - optimized with requestAnimationFrame
  useEffect(() => {
    if (isHost || !syncedCameraState || !cameraRef.current || !controlsRef.current) return;

    let animationFrameId;
    const updateCamera = () => {
      const camera = cameraRef.current;
      const controls = controlsRef.current;
      if (!camera || !controls) return;

      // Smoothly interpolate to new position (reduced lerp for faster sync)
      camera.position.lerp(
        new THREE.Vector3(
          syncedCameraState.position.x,
          syncedCameraState.position.y,
          syncedCameraState.position.z
        ),
        0.2 // Increased from 0.1 for faster sync
      );

      controls.target.lerp(
        new THREE.Vector3(
          syncedCameraState.target.x,
          syncedCameraState.target.y,
          syncedCameraState.target.z
        ),
        0.2
      );

      // Sync zoom by adjusting camera distance to target
      if (syncedCameraState.distance !== undefined) {
        const currentDistance = camera.position.distanceTo(controls.target);
        const targetDistance = syncedCameraState.distance;
        const direction = new THREE.Vector3()
          .subVectors(camera.position, controls.target)
          .normalize();
        
        // Interpolate distance
        const newDistance = THREE.MathUtils.lerp(currentDistance, targetDistance, 0.2);
        camera.position.copy(controls.target).add(direction.multiplyScalar(newDistance));
        camera.updateProjectionMatrix();
      } else if (syncedCameraState.zoom !== undefined) {
        // Fallback to zoom if distance not available
        camera.zoom = THREE.MathUtils.lerp(camera.zoom, syncedCameraState.zoom, 0.2);
        camera.updateProjectionMatrix();
      }
      controls.update();
    };

    // Use requestAnimationFrame for smooth updates
    const animate = () => {
      updateCamera();
      animationFrameId = requestAnimationFrame(animate);
    };
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [syncedCameraState, isHost]);

  return (
    <div ref={viewerRef} className="relative w-full h-full">
      {/* 3D Viewer */}
      <ThreeJSViewer 
        modelInfo={modelInfo}
        enableControls={enableControls}
        onCameraReady={handleCameraReady}
      />
      
      {/* Annotation Canvas Overlay */}
      <AnnotationCanvas
        isHost={isHost}
        onDraw={onAnnotationDraw}
        receivedDrawings={receivedAnnotations}
        onClear={onAnnotationClear}
      />
      
      {/* View-only indicator for joiners */}
      {!isHost && (
        <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-2 rounded-lg flex items-center gap-2 z-50">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          <span className="text-sm">Following host's view</span>
        </div>
      )}

      {/* Presentation mode indicator for host */}
      {isHost && (
        <div className="absolute top-4 left-4 bg-blue-600/90 text-white px-3 py-2 rounded-lg flex items-center gap-2 z-50">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          <span className="text-sm font-semibold">Presenting</span>
        </div>
      )}
    </div>
  );
};

export default ThreeJSViewerSynced;
