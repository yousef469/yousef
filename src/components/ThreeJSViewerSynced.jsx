import React, { useRef, useEffect, useState } from 'react';
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
  const [cameraState, setCameraState] = useState(null);
  const lastBroadcastTime = useRef(0);
  const BROADCAST_THROTTLE = 50; // ms (20 updates/second)

  // Monitor camera changes (host only)
  useEffect(() => {
    if (!isHost || !enableControls || !onCameraChange) return;

    const interval = setInterval(() => {
      // Get camera state from ThreeJS viewer
      const viewer = viewerRef.current;
      if (!viewer) return;

      // Access Three.js internals (we'll need to expose these)
      const camera = viewer.querySelector('canvas')?.__camera;
      const controls = viewer.querySelector('canvas')?.__controls;
      
      if (camera && controls) {
        const now = Date.now();
        if (now - lastBroadcastTime.current < BROADCAST_THROTTLE) return;

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
          zoom: camera.zoom
        };

        // Only broadcast if changed
        if (JSON.stringify(state) !== JSON.stringify(cameraState)) {
          setCameraState(state);
          onCameraChange(state);
          lastBroadcastTime.current = now;
        }
      }
    }, BROADCAST_THROTTLE);

    return () => clearInterval(interval);
  }, [isHost, enableControls, onCameraChange, cameraState]);

  // Apply synced camera state (joiners only)
  useEffect(() => {
    if (isHost || !syncedCameraState) return;

    const viewer = viewerRef.current;
    if (!viewer) return;

    const camera = viewer.querySelector('canvas')?.__camera;
    const controls = viewer.querySelector('canvas')?.__controls;

    if (camera && controls && syncedCameraState) {
      // Smoothly interpolate to new position
      camera.position.lerp(
        new THREE.Vector3(
          syncedCameraState.position.x,
          syncedCameraState.position.y,
          syncedCameraState.position.z
        ),
        0.1 // Smooth interpolation
      );

      controls.target.lerp(
        new THREE.Vector3(
          syncedCameraState.target.x,
          syncedCameraState.target.y,
          syncedCameraState.target.z
        ),
        0.1
      );

      camera.zoom = syncedCameraState.zoom;
      camera.updateProjectionMatrix();
      controls.update();
    }
  }, [syncedCameraState, isHost]);

  return (
    <div ref={viewerRef} className="relative w-full h-full">
      {/* 3D Viewer */}
      <ThreeJSViewer 
        modelInfo={modelInfo}
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
