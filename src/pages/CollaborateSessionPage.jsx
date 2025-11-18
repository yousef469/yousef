import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { 
  Mic, MicOff, Video, VideoOff, Share2, Upload, Users, 
  Crown, PhoneOff, Copy, Check, FileVideo, Box
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import webrtcService from '../services/webrtc';
import ThreeJSViewer from '../components/ThreeJSViewer';

export default function CollaborateSessionPage() {
  const navigate = useNavigate();
  const { sessionId } = useParams();
  const { state } = useLocation();
  const { user } = useAuth();
  const localVideoRef = useRef(null);
  const remoteVideosRef = useRef(new Map());
  const canvasRef = useRef(null);
  const drawingRef = useRef({ isDrawing: false, color: '#3b82f6', tool: 'pen' });
  
  // Get initial settings from setup page
  const initialVideoEnabled = state?.videoEnabled ?? true;
  const initialAudioEnabled = state?.audioEnabled ?? true;
  
  // Generate consistent passcode from sessionId (same for all participants)
  const [sessionPasscode] = useState(() => {
    // Create deterministic passcode from sessionId
    let hash = 0;
    for (let i = 0; i < sessionId.length; i++) {
      hash = ((hash << 5) - hash) + sessionId.charCodeAt(i);
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash % 1000000).toString().padStart(6, '0');
  });
  
  // Session state - Only the creator is host initially
  const [isHost, setIsHost] = useState(!state?.isJoining);
  const [isMicOn, setIsMicOn] = useState(initialAudioEnabled);
  const [isCameraOn, setIsCameraOn] = useState(initialVideoEnabled);
  const [linkCopied, setLinkCopied] = useState(false);
  const [showUploadMenu, setShowUploadMenu] = useState(false);
  const [showMeetingInfo, setShowMeetingInfo] = useState(false);
  const [isConnecting, setIsConnecting] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState('Initializing...'); // Status message
  const [showParticipants, setShowParticipants] = useState(false);
  const [showWhiteboard, setShowWhiteboard] = useState(false);
  const [uploadedContent, setUploadedContent] = useState(null);
  const [isLoadingContent, setIsLoadingContent] = useState(true); // Track IndexedDB loading
  const [localStreamReady, setLocalStreamReady] = useState(false); // Track when stream is ready
  const [uploadProgress, setUploadProgress] = useState(null); // {fileName: string, progress: number}
  const [receivingFiles, setReceivingFiles] = useState(new Map()); // Map of fileId -> {chunks, totalChunks, type, name}
  const sharedVideoRef = useRef(null); // Ref for synced video playback
  const dbRef = useRef(null); // IndexedDB reference
  
  // Participants - start with just the current user
  const [participants, setParticipants] = useState([
    { 
      id: user?.id, 
      socketId: 'local',
      name: user?.email?.split('@')[0] || 'You', 
      isHost: !state?.isJoining, // Only creator is host, not joiners
      isMuted: !isMicOn, 
      isCameraOff: !isCameraOn 
    }
  ]);

  // Store user info in ref to avoid re-renders
  const userInfoRef = useRef({
    id: user?.id,
    name: user?.email?.split('@')[0] || 'User'
  });

  // Initialize IndexedDB for large file storage (supports 50MB+)
  useEffect(() => {
    const initDB = async () => {
      try {
        const request = indexedDB.open('CollaborateDB', 1);
        
        request.onerror = () => console.error('IndexedDB error');
        
        request.onupgradeneeded = (event) => {
          const db = event.target.result;
          if (!db.objectStoreNames.contains('sessions')) {
            db.createObjectStore('sessions', { keyPath: 'sessionId' });
          }
        };
        
        request.onsuccess = async (event) => {
          dbRef.current = event.target.result;
          
          // Restore content from IndexedDB
          const transaction = dbRef.current.transaction(['sessions'], 'readonly');
          const store = transaction.objectStore('sessions');
          const getRequest = store.get(sessionId);
          
          getRequest.onsuccess = () => {
            if (getRequest.result && getRequest.result.content) {
              const savedContent = getRequest.result.content;
              
              // For 3D models, recreate Blob URL from base64 data
              if (savedContent.type === '3d' && savedContent.data) {
                try {
                  const base64 = savedContent.data.split(',')[1];
                  const mimeType = savedContent.data.match(/data:([^;]+);/)?.[1] || 'model/gltf-binary';
                  const byteCharacters = atob(base64);
                  const byteNumbers = new Array(byteCharacters.length);
                  for (let i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                  }
                  const byteArray = new Uint8Array(byteNumbers);
                  const blob = new Blob([byteArray], { type: mimeType });
                  const newBlobUrl = URL.createObjectURL(blob);
                  
                  setUploadedContent({
                    ...savedContent,
                    url: newBlobUrl // Use new Blob URL
                  });
                  console.log('✅ Restored 3D model from IndexedDB with new Blob URL');
                } catch (error) {
                  console.error('❌ Failed to recreate Blob URL:', error);
                  setUploadedContent(savedContent);
                }
              } else {
                setUploadedContent(savedContent);
                console.log('✅ Restored content from IndexedDB');
              }
            }
            // Mark loading as complete
            setIsLoadingContent(false);
          };
          
          getRequest.onerror = () => {
            console.error('❌ Failed to load from IndexedDB');
            setIsLoadingContent(false);
          };
        };
      } catch (error) {
        console.error('Failed to initialize IndexedDB:', error);
      }
    };
    
    initDB();
    
    // Note: Don't cleanup on unmount - we want content to persist across page switches
    // Content will be cleaned up when user explicitly closes it or leaves the session
  }, [sessionId]);

  // Persist uploaded content to IndexedDB
  useEffect(() => {
    if (dbRef.current && uploadedContent) {
      try {
        const transaction = dbRef.current.transaction(['sessions'], 'readwrite');
        const store = transaction.objectStore('sessions');
        const putRequest = store.put({ sessionId, content: uploadedContent });
        
        putRequest.onsuccess = () => {
          console.log('💾 Saved content to IndexedDB:', uploadedContent.name, uploadedContent.type);
        };
        
        putRequest.onerror = (error) => {
          console.error('❌ Failed to save to IndexedDB:', error);
        };
      } catch (error) {
        console.error('❌ Failed to save to IndexedDB:', error);
      }
    }
    // Don't delete on null - let closeContent handle explicit deletion
  }, [uploadedContent, sessionId]);

  // Initialize WebRTC on mount
  useEffect(() => {
    const initializeSession = async () => {
      try {
        console.log('🚀 Initializing WebRTC session...');
        
        // Connect to signaling server
        setConnectionStatus('Connecting to server...');
        await webrtcService.connect();
        
        // Set up event handlers
        webrtcService.onUserJoined = ({ socketId, userId, userName }) => {
          console.log('👤 User joined:', userName, socketId);
          setParticipants(prev => {
            // Prevent duplicates
            if (prev.some(p => p.socketId === socketId)) {
              console.log('⚠️ Participant already exists:', socketId);
              return prev;
            }
            
            // If this is a joiner and there are no other remote participants yet,
            // this must be the host (first person in the session)
            const isFirstRemoteUser = prev.length === 1 && prev[0].socketId === 'local';
            const isHostUser = isFirstRemoteUser && !isHost; // Joiner sees first remote as host
            
            return [...prev, {
              id: userId,
              socketId,
              name: userName,
              isHost: isHostUser,
              isMuted: false,
              isCameraOff: false
            }];
          });
          
          // If host has content displayed, broadcast it to new joiner after a delay
          if (isHost && uploadedContent && uploadedContent.data) {
            setTimeout(async () => {
              console.log('📤 Re-broadcasting content to new joiner');
              const CHUNK_SIZE = 16 * 1024;
              const BATCH_SIZE = 50;
              const totalChunks = Math.ceil(uploadedContent.data.length / CHUNK_SIZE);
              const fileId = `${Date.now()}-${Math.random()}`;
              
              for (let batchStart = 0; batchStart < totalChunks; batchStart += BATCH_SIZE) {
                const batchEnd = Math.min(batchStart + BATCH_SIZE, totalChunks);
                
                for (let i = batchStart; i < batchEnd; i++) {
                  const chunk = uploadedContent.data.slice(i * CHUNK_SIZE, (i + 1) * CHUNK_SIZE);
                  webrtcService.broadcastData({
                    type: 'file-chunk',
                    fileId,
                    chunkIndex: i,
                    totalChunks,
                    data: chunk,
                    fileType: uploadedContent.type,
                    fileName: uploadedContent.name
                  });
                }
                
                if (batchEnd < totalChunks) {
                  await new Promise(resolve => setTimeout(resolve, 1));
                }
              }
              console.log('✅ Content re-broadcast complete');
            }, 2000); // 2 second delay to ensure peer connection is ready
          }
        };

        webrtcService.onUserLeft = (socketId) => {
          console.log('👋 User left:', socketId);
          setParticipants(prev => prev.filter(p => p.socketId !== socketId));
          const videoElement = remoteVideosRef.current.get(socketId);
          if (videoElement && videoElement.parentNode) {
            videoElement.parentNode.removeChild(videoElement);
          }
          remoteVideosRef.current.delete(socketId);
        };

        webrtcService.onStreamReceived = (socketId, stream) => {
          console.log('📹 Received stream from:', socketId);
          
          // Force re-render to show the new video
          setParticipants(prev => {
            console.log('📋 Current participants before update:', prev.map(p => ({ socketId: p.socketId, name: p.name, hasStream: p.hasStream })));
            // Update the participant to trigger re-render
            const updated = prev.map(p => 
              p.socketId === socketId 
                ? { ...p, hasStream: true }
                : p
            );
            console.log('📋 Updated participants:', updated.map(p => ({ socketId: p.socketId, name: p.name, hasStream: p.hasStream })));
            return updated;
          });
          
          let videoElement = remoteVideosRef.current.get(socketId);
          if (!videoElement) {
            videoElement = document.createElement('video');
            videoElement.autoplay = true;
            videoElement.playsInline = true;
            videoElement.muted = false; // Don't mute remote videos
            videoElement.style.width = '100%';
            videoElement.style.height = '100%';
            videoElement.style.objectFit = 'cover';
            remoteVideosRef.current.set(socketId, videoElement);
          }
          
          videoElement.srcObject = stream;
          
          // Force play (some browsers need this)
          videoElement.play().catch(err => {
            console.log('Auto-play prevented, user interaction needed:', err);
          });
        };

        webrtcService.onHostChanged = (newHostId) => {
          const amINewHost = webrtcService.socket.id === newHostId;
          const isLocalNewHost = newHostId === 'local';
          
          console.log('👑 Host changed to:', newHostId, 'Am I host?', amINewHost || isLocalNewHost);
          
          setIsHost(amINewHost || isLocalNewHost);
          setParticipants(prev => prev.map(p => ({
            ...p,
            isHost: p.socketId === newHostId || (newHostId === 'local' && p.socketId === 'local')
          })));
        };

        // Handle data channel messages (screen sharing sync)
        webrtcService.onDataReceived = (message) => {
          console.log('📨 Received:', message.type);
          
          if (message.type === 'whiteboard-opened') {
            setShowWhiteboard(true);
            setUploadedContent(null);
          }
          
          if (message.type === 'whiteboard-closed') {
            setShowWhiteboard(false);
          }
          
          if (message.type === 'whiteboard-start' && canvasRef.current) {
            // Start new drawing path
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            const x = message.x * canvas.width;
            const y = message.y * canvas.height;
            
            ctx.strokeStyle = message.tool === 'eraser' ? '#ffffff' : message.color;
            ctx.lineWidth = message.tool === 'eraser' ? 20 : 3;
            ctx.beginPath();
            ctx.moveTo(x, y);
          }
          
          if (message.type === 'whiteboard-draw' && canvasRef.current) {
            // Continue drawing
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            const x = message.x * canvas.width;
            const y = message.y * canvas.height;
            
            ctx.lineTo(x, y);
            ctx.stroke();
          }
          
          if (message.type === 'whiteboard-clear' && canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
          }
          
          // File chunk receiving
          if (message.type === 'file-chunk') {
            setReceivingFiles(prev => {
              const newMap = new Map(prev);
              const fileData = newMap.get(message.fileId) || {
                chunks: [],
                totalChunks: message.totalChunks,
                type: message.fileType,
                name: message.fileName
              };
              
              fileData.chunks[message.chunkIndex] = message.data;
              newMap.set(message.fileId, fileData);
              
              // Check if all chunks received
              const receivedChunks = fileData.chunks.filter(c => c).length;
              console.log(`📦 Received chunk ${receivedChunks}/${message.totalChunks} for ${message.fileName}`);
              
              if (receivedChunks === message.totalChunks) {
                // Reassemble file
                const completeData = fileData.chunks.join('');
                
                // For 3D models, convert base64 to Blob URL for GLTFLoader
                let fileUrl = completeData;
                if (fileData.type === '3d') {
                  try {
                    // Extract base64 data (remove data:...;base64, prefix)
                    const base64 = completeData.split(',')[1];
                    const mimeType = completeData.match(/data:([^;]+);/)?.[1] || 'model/gltf-binary';
                    const byteCharacters = atob(base64);
                    const byteNumbers = new Array(byteCharacters.length);
                    for (let i = 0; i < byteCharacters.length; i++) {
                      byteNumbers[i] = byteCharacters.charCodeAt(i);
                    }
                    const byteArray = new Uint8Array(byteNumbers);
                    const blob = new Blob([byteArray], { type: mimeType });
                    fileUrl = URL.createObjectURL(blob);
                    console.log('✅ Converted 3D model to Blob URL');
                  } catch (error) {
                    console.error('❌ Error converting 3D model:', error);
                  }
                }
                
                setUploadedContent({
                  type: fileData.type,
                  url: fileUrl,
                  name: fileData.name
                });
                setShowWhiteboard(false);
                newMap.delete(message.fileId);
                console.log('✅ File reassembled:', fileData.name);
              }
              
              return newMap;
            });
          }
          
          if (message.type === 'content-uploaded') {
            // Legacy: Received content from host - use the base64 data as URL
            setUploadedContent({
              type: message.content.type,
              url: message.content.data, // Base64 data URL
              name: message.content.name
            });
            setShowWhiteboard(false);
          }
          
          if (message.type === 'content-closed') {
            setUploadedContent(null);
          }
          
          // Video sync events
          if (message.type === 'video-play' && sharedVideoRef.current) {
            sharedVideoRef.current.currentTime = message.time;
            sharedVideoRef.current.play();
          }
          
          if (message.type === 'video-pause' && sharedVideoRef.current) {
            sharedVideoRef.current.currentTime = message.time;
            sharedVideoRef.current.pause();
          }
          
          if (message.type === 'video-seek' && sharedVideoRef.current) {
            sharedVideoRef.current.currentTime = message.time;
          }
        };

        // ALWAYS get media BEFORE joining session (required for peer connections)
        // Microphone is always required for WebRTC to work properly
        let streamReady = false;
        try {
          setConnectionStatus('Requesting camera and microphone access...');
          console.log('🎥 Getting user media before joining...', { video: initialVideoEnabled, audio: true });
          const stream = await webrtcService.getUserMedia({ 
            video: initialVideoEnabled, 
            audio: true // Always get audio for peer connections
          });
          
          // Update camera state based on actual stream
          const videoTrack = stream.getVideoTracks()[0];
          const audioTrack = stream.getAudioTracks()[0];
          if (videoTrack) {
            setIsCameraOn(videoTrack.enabled);
            console.log('📹 Video track enabled:', videoTrack.enabled);
          }
          if (audioTrack) {
            setIsMicOn(audioTrack.enabled);
            console.log('🎤 Audio track enabled:', audioTrack.enabled);
          }
          
          console.log('✅ Got user media, stream ready', {
            hasVideo: stream.getVideoTracks().length > 0,
            hasAudio: stream.getAudioTracks().length > 0,
            videoEnabled: videoTrack?.enabled,
            audioEnabled: audioTrack?.enabled
          });
          
          streamReady = true;
        } catch (error) {
          console.error('❌ Error getting media:', error);
          // If media fails, create dummy stream so peers can still connect
          console.log('🔇 Creating dummy stream as fallback');
          const dummyStream = webrtcService.getDummyStream();
          console.log('Dummy stream created:', dummyStream);
          streamReady = !!dummyStream;
          setIsCameraOn(false);
        }

        // Only join if we have a stream ready
        if (!streamReady) {
          throw new Error('Failed to initialize media stream');
        }

        // Small delay to ensure stream is fully ready
        await new Promise(resolve => setTimeout(resolve, 100));

        // Join the session (now we have stream for peer connections)
        setConnectionStatus('Joining session...');
        await webrtcService.joinSession(
          sessionId, 
          userInfoRef.current.id, 
          userInfoRef.current.name
        );

        console.log('✅ WebRTC session initialized');
        setConnectionStatus('Connected!');
        setIsConnecting(false);
        
        // Set stream ready AFTER component renders (after isConnecting = false)
        // This ensures the video element exists before we try to set the stream
        setTimeout(() => {
          setLocalStreamReady(true);
          console.log('📹 Local stream ready flag set');
        }, 100);
      } catch (error) {
        console.error('❌ Failed to initialize session:', error);
        setIsConnecting(false);
        
        let errorMessage = 'Failed to connect to session. Please try again.';
        
        if (error.message.includes('timeout')) {
          errorMessage = 'Connection timeout. The server is waking up (this can take 30-60 seconds on first use). Please refresh and try again.';
        } else if (error.message.includes('Permission denied') || error.message.includes('NotAllowedError')) {
          errorMessage = 'Camera/microphone access denied. Please allow access and try again.';
        } else if (error.message.includes('NotFoundError')) {
          errorMessage = 'No camera or microphone found. Please connect a device and try again.';
        }
        
        setConnectionStatus('Connection failed');
        alert(errorMessage);
        navigate('/collaborate');
      }
    };

    initializeSession();

    // Cleanup on unmount
    return () => {
      console.log('🧹 Cleaning up WebRTC session');
      webrtcService.leaveSession();
    };
  }, [sessionId]); // Only re-initialize if sessionId changes

  // Set local video stream when ready
  useEffect(() => {
    if (localStreamReady && localVideoRef.current && webrtcService.localStream) {
      console.log('📹 Setting local video stream to ref');
      localVideoRef.current.srcObject = webrtcService.localStream;
      localVideoRef.current.play().catch(err => {
        console.log('📹 Local video autoplay prevented:', err);
      });
      console.log('✅ Local video element updated with stream');
    }
  }, [localStreamReady]);

  // Update local video when camera state changes
  useEffect(() => {
    if (localVideoRef.current && webrtcService.localStream) {
      const videoTrack = webrtcService.localStream.getVideoTracks()[0];
      if (videoTrack && isCameraOn) {
        if (!localVideoRef.current.srcObject) {
          localVideoRef.current.srcObject = webrtcService.localStream;
        }
        localVideoRef.current.play().catch(err => {
          console.log('Local video autoplay prevented:', err);
        });
        console.log('📹 Local video updated, camera on');
      } else if (!isCameraOn) {
        console.log('📹 Camera is off');
      }
    }
  }, [isCameraOn]);

  // Initialize canvas
  useEffect(() => {
    if (showWhiteboard && canvasRef.current) {
      const canvas = canvasRef.current;
      const container = canvas.parentElement;
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      const ctx = canvas.getContext('2d');
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineWidth = 3;
    }
  }, [showWhiteboard]);

  // Drawing functions
  const startDrawing = (e) => {
    if (!canvasRef.current) return;
    drawingRef.current.isDrawing = true;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    ctx.beginPath();
    ctx.moveTo(x, y);
    
    // Broadcast drawing start to other participants
    if (isHost) {
      webrtcService.broadcastData({
        type: 'whiteboard-start',
        x: x / canvas.width,
        y: y / canvas.height,
        color: drawingRef.current.color,
        tool: drawingRef.current.tool
      });
    }
  };

  const draw = (e) => {
    if (!drawingRef.current.isDrawing || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    ctx.strokeStyle = drawingRef.current.tool === 'eraser' ? '#ffffff' : drawingRef.current.color;
    ctx.lineWidth = drawingRef.current.tool === 'eraser' ? 20 : 3;
    ctx.lineTo(x, y);
    ctx.stroke();
    
    // Broadcast drawing to other participants
    if (isHost) {
      webrtcService.broadcastData({
        type: 'whiteboard-draw',
        x: x / canvas.width, // Normalize coordinates
        y: y / canvas.height,
        color: drawingRef.current.color,
        tool: drawingRef.current.tool
      });
    }
  };

  const stopDrawing = () => {
    drawingRef.current.isDrawing = false;
  };

  const clearCanvas = () => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    
    // Broadcast clear to other participants
    if (isHost) {
      webrtcService.broadcastData({ type: 'whiteboard-clear' });
    }
  };

  const toggleMic = async () => {
    if (!isMicOn) {
      try {
        if (!webrtcService.localStream) {
          await webrtcService.getUserMedia({ audio: true, video: isCameraOn });
        }
        const enabled = webrtcService.toggleMicrophone();
        setIsMicOn(enabled);
      } catch (err) {
        alert('Microphone access denied');
      }
    } else {
      const enabled = webrtcService.toggleMicrophone();
      setIsMicOn(enabled);
    }
  };

  const toggleCamera = async () => {
    if (!isCameraOn) {
      try {
        if (!webrtcService.localStream) {
          const stream = await webrtcService.getUserMedia({ audio: isMicOn, video: true });
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = stream;
          }
        }
        const enabled = webrtcService.toggleCamera();
        setIsCameraOn(enabled);
      } catch (err) {
        alert('Camera access denied');
      }
    } else {
      const enabled = webrtcService.toggleCamera();
      setIsCameraOn(enabled);
      if (!enabled && localVideoRef.current) {
        localVideoRef.current.srcObject = null;
      }
    }
  };

  const copySessionLink = () => {
    const link = `${window.location.origin}/collaborate/${sessionId}`;
    navigator.clipboard.writeText(link);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const makeHost = (participant) => {
    if (isHost && participant.socketId !== 'local') {
      webrtcService.transferHost(participant.socketId);
    }
  };

  // Broadcast helpers
  const openWhiteboard = () => {
    setShowWhiteboard(true);
    setUploadedContent(null);
    if (isHost) {
      // Small delay to ensure peers are ready
      setTimeout(() => {
        webrtcService.broadcastData({ type: 'whiteboard-opened' });
      }, 100);
    }
  };

  const closeWhiteboard = () => {
    setShowWhiteboard(false);
    if (isHost) {
      setTimeout(() => {
        webrtcService.broadcastData({ type: 'whiteboard-closed' });
      }, 100);
    }
  };

  const closeContent = () => {
    setUploadedContent(null);
    
    // Clean up IndexedDB when content is explicitly closed
    if (dbRef.current) {
      try {
        const transaction = dbRef.current.transaction(['sessions'], 'readwrite');
        const store = transaction.objectStore('sessions');
        store.delete(sessionId);
        console.log('🗑️ Cleaned up IndexedDB');
      } catch (error) {
        console.error('Failed to cleanup IndexedDB:', error);
      }
    }
    
    if (isHost) {
      setTimeout(() => {
        webrtcService.broadcastData({ type: 'content-closed' });
      }, 100);
    }
  };

  const handleFileUpload = (type) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = type === 'video' ? 'video/*' : type === '3d' ? '.obj,.fbx,.gltf,.glb,.stl' : 'image/*';
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (file) {
        // Check file size (limit to 50MB for reasonable transfer)
        const maxSize = 50 * 1024 * 1024; // 50MB
        if (file.size > maxSize) {
          alert(`File too large! Please upload files smaller than 50MB.\nYour file: ${(file.size / (1024 * 1024)).toFixed(2)}MB`);
          return;
        }
        
        // Create a URL for local display
        const fileUrl = URL.createObjectURL(file);
        
        // Convert file to base64 for sharing
        const reader = new FileReader();
        reader.onload = async () => {
          const base64Data = reader.result;
          const content = {
            type,
            url: fileUrl, // Local URL for this user
            name: file.name,
            data: base64Data // Base64 for sharing
          };
          
          setUploadedContent(content);
          setShowWhiteboard(false);
          setShowUploadMenu(false);
          
          // Broadcast to other participants (host only) with chunking
          if (isHost) {
            const CHUNK_SIZE = 16 * 1024; // 16KB chunks (safe for all browsers)
            const totalChunks = Math.ceil(base64Data.length / CHUNK_SIZE);
            const fileId = `${Date.now()}-${Math.random()}`;
            
            console.log(`📤 Sending file in ${totalChunks} chunks:`, file.name);
            setUploadProgress({ fileName: file.name, progress: 0 });
            
            // Ultra-fast batch sending with minimal delays
            const BATCH_SIZE = 50; // Send 50 chunks at once (increased from 10)
            const BATCH_DELAY = 1; // Only 1ms delay between batches (reduced from 10ms)
            
            // Use requestAnimationFrame for smoother progress updates
            let lastProgressUpdate = 0;
            
            for (let batchStart = 0; batchStart < totalChunks; batchStart += BATCH_SIZE) {
              const batchEnd = Math.min(batchStart + BATCH_SIZE, totalChunks);
              
              // Send entire batch instantly
              for (let i = batchStart; i < batchEnd; i++) {
                const chunk = base64Data.slice(i * CHUNK_SIZE, (i + 1) * CHUNK_SIZE);
                
                webrtcService.broadcastData({
                  type: 'file-chunk',
                  fileId,
                  chunkIndex: i,
                  totalChunks,
                  data: chunk,
                  fileType: type,
                  fileName: file.name
                });
              }
              
              // Update progress only every 5% to reduce UI lag
              const progress = Math.round((batchEnd / totalChunks) * 100);
              if (progress - lastProgressUpdate >= 5 || batchEnd === totalChunks) {
                setUploadProgress({ fileName: file.name, progress });
                lastProgressUpdate = progress;
              }
              
              // Minimal delay only between batches
              if (batchEnd < totalChunks) {
                await new Promise(resolve => setTimeout(resolve, BATCH_DELAY));
              }
            }
            
            console.log('✅ All chunks sent');
            setTimeout(() => setUploadProgress(null), 2000);
          }
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const leaveSession = () => {
    webrtcService.leaveSession();
    navigate('/collaborate');
  };

  // Show loading while connecting
  if (isConnecting) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <div className="relative mb-8">
            <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-t-4 border-blue-500 mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Video className="w-12 h-12 text-blue-400" />
            </div>
          </div>
          <h2 className="text-3xl font-bold mb-3">Setting up your meeting</h2>
          <p className="text-xl text-blue-400 mb-4">{connectionStatus}</p>
          <p className="text-gray-400 text-sm">
            {connectionStatus.includes('server') && '⏳ First connection may take 30-60 seconds as the server wakes up'}
            {connectionStatus.includes('camera') && '📹 Please allow camera and microphone access in your browser'}
            {connectionStatus.includes('Joining') && '🚀 Almost there...'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Top Meeting Info Bar */}
      <div className="bg-gray-800 border-b border-gray-700 px-4 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowMeetingInfo(!showMeetingInfo)}
              className="flex items-center gap-2 px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-all"
            >
              <Users className="w-4 h-4" />
              <span className="text-sm font-semibold">Meeting Info</span>
            </button>
            
            {showMeetingInfo && (
              <div className="flex items-center gap-4 px-4 py-2 bg-gray-700/50 rounded-lg">
                <div>
                  <p className="text-xs text-gray-400">Session ID (Share this to invite)</p>
                  <p className="font-mono font-bold text-blue-400">{sessionId}</p>
                </div>
                <div className="h-8 w-px bg-gray-600"></div>
                <div>
                  <p className="text-xs text-gray-400">Passcode (Optional - if you want security)</p>
                  <p className="font-mono font-bold text-green-400">{sessionPasscode}</p>
                </div>
                <button
                  onClick={() => {
                    const inviteText = `Join my Engineerium meeting!\n\nSession ID: ${sessionId}\nPasscode: ${sessionPasscode}\n\nOr click: ${window.location.origin}/collaborate/session/${sessionId}`;
                    navigator.clipboard.writeText(inviteText);
                    setLinkCopied(true);
                    setTimeout(() => setLinkCopied(false), 2000);
                  }}
                  className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm font-semibold transition-all flex items-center gap-2"
                >
                  {linkCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {linkCopied ? 'Copied!' : 'Copy Invite'}
                </button>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Users className="w-4 h-4" />
            <span>{participants.length} participant{participants.length !== 1 ? 's' : ''}</span>
          </div>
        </div>
      </div>

      {/* Main Layout: Content + Video Sidebar */}
      <div className="h-[calc(100vh-120px)] flex">
        {/* Left: Main Content Area */}
        <div className="flex-1 flex items-center justify-center bg-gray-900">
          {isLoadingContent ? (
            <div className="text-center text-gray-500">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-lg">Restoring session...</p>
            </div>
          ) : uploadedContent ? (
            <div className="w-full h-full p-4 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">{uploadedContent.name}</h2>
                <button
                  onClick={closeContent}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg"
                >
                  Close
                </button>
              </div>
              
              <div className="flex-1 flex items-center justify-center bg-black rounded-lg overflow-hidden">
                {uploadedContent.type === 'image' && (
                  <img 
                    src={uploadedContent.url} 
                    alt={uploadedContent.name}
                    className="max-w-full max-h-full object-contain"
                  />
                )}
                {uploadedContent.type === 'video' && (
                  <video 
                    ref={sharedVideoRef}
                    src={uploadedContent.url}
                    controls={isHost}
                    className="max-w-full max-h-full"
                    onPlay={(e) => {
                      if (isHost) {
                        webrtcService.broadcastData({
                          type: 'video-play',
                          time: e.target.currentTime
                        });
                      }
                    }}
                    onPause={(e) => {
                      if (isHost) {
                        webrtcService.broadcastData({
                          type: 'video-pause',
                          time: e.target.currentTime
                        });
                      }
                    }}
                    onSeeked={(e) => {
                      if (isHost) {
                        webrtcService.broadcastData({
                          type: 'video-seek',
                          time: e.target.currentTime
                        });
                      }
                    }}
                  />
                )}
                {uploadedContent.type === '3d' && (
                  <div className="w-full h-full relative">
                    {/* Loading overlay */}
                    <div className="absolute inset-0 bg-gray-900 flex items-center justify-center z-10 pointer-events-none">
                      <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-2"></div>
                        <p className="text-sm text-gray-400">Loading 3D Model...</p>
                      </div>
                    </div>
                    {/* 3D Viewer with key to prevent unnecessary remounts */}
                    <ThreeJSViewer 
                      key={uploadedContent.url} 
                      modelInfo={{ 
                        path: uploadedContent.url,
                        name: uploadedContent.name,
                        type: '3d-model'
                      }} 
                    />
                  </div>
                )}
              </div>
            </div>
          ) : showWhiteboard ? (
            <div className="w-full h-full p-4 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Whiteboard</h2>
                {isHost && (
                  <button
                    onClick={closeWhiteboard}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg"
                  >
                    Close
                  </button>
                )}
              </div>
              
              {/* Drawing Tools - Host Only */}
              {isHost ? (
                <div className="flex items-center gap-2 mb-4 p-3 bg-gray-800 rounded-lg">
                  <button
                    onClick={() => drawingRef.current.tool = 'pen'}
                    className="p-2 bg-blue-600 hover:bg-blue-700 rounded"
                  >
                    Pen
                  </button>
                  <button
                    onClick={() => drawingRef.current.tool = 'eraser'}
                    className="p-2 bg-gray-700 hover:bg-gray-600 rounded"
                  >
                    Eraser
                  </button>
                  <input
                    type="color"
                    defaultValue="#3b82f6"
                    onChange={(e) => drawingRef.current.color = e.target.value}
                    className="w-10 h-10 rounded"
                  />
                  <button
                    onClick={clearCanvas}
                    className="p-2 bg-red-600 hover:bg-red-700 rounded ml-auto"
                  >
                    Clear
                  </button>
                </div>
              ) : (
                <div className="mb-4 p-3 bg-gray-800 rounded-lg text-center text-gray-400">
                  <p className="text-sm">👁️ View Only - Host is controlling the whiteboard</p>
                </div>
              )}
              
              {/* Canvas with event handlers - only host can draw */}
              <div className="flex-1 bg-white rounded-lg overflow-hidden">
                <canvas
                  ref={canvasRef}
                  onMouseDown={isHost ? startDrawing : undefined}
                  onMouseMove={isHost ? draw : undefined}
                  onMouseUp={isHost ? stopDrawing : undefined}
                  onMouseLeave={isHost ? stopDrawing : undefined}
                  className={`w-full h-full ${isHost ? 'cursor-crosshair' : 'cursor-not-allowed'}`}
                />
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500">
              <svg className="w-24 h-24 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <p className="text-lg">Video Call Active</p>
              <p className="text-sm mt-2">{isHost ? 'Click Whiteboard to start' : 'Waiting for host'}</p>
            </div>
          )}
        </div>

        {/* Right: Video Sidebar */}
        <div className="w-80 bg-gray-800 border-l border-gray-700 flex flex-col overflow-y-auto p-2 space-y-2">
          {/* Sort participants: Host first, then others */}
          {participants
            .sort((a, b) => {
              // Host always first
              if (a.isHost && !b.isHost) return -1;
              if (!a.isHost && b.isHost) return 1;
              // Then by socketId to keep consistent order
              return a.socketId.localeCompare(b.socketId);
            })
            .map((participant) => {
              const isLocalUser = participant.socketId === 'local';
              const videoElement = remoteVideosRef.current.get(participant.socketId);
              const hasVideo = isLocalUser ? isCameraOn : (participant.hasStream && videoElement);
              
              return (
                <div key={participant.socketId} className="relative bg-gray-700 rounded-lg overflow-hidden aspect-video group">
                  {isLocalUser ? (
                    // Local user video
                    isCameraOn ? (
                      <video
                        ref={localVideoRef}
                        autoPlay
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-900 to-purple-900">
                        <div className="text-center">
                          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-1 text-xl">
                            {user?.email?.[0]?.toUpperCase() || 'Y'}
                          </div>
                          <p className="font-semibold text-sm">{participant.name}</p>
                        </div>
                      </div>
                    )
                  ) : (
                    // Remote participant video
                    hasVideo ? (
                      <div 
                        className="w-full h-full bg-black"
                        ref={(container) => {
                          if (container && videoElement && !container.contains(videoElement)) {
                            while (container.firstChild) {
                              container.removeChild(container.firstChild);
                            }
                            container.appendChild(videoElement);
                          }
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-900 to-pink-900">
                        <div className="text-center">
                          <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-1 text-xl">
                            {participant.name[0]}
                          </div>
                          <p className="font-semibold text-sm">{participant.name}</p>
                          <p className="text-xs text-gray-400 mt-1">Connecting...</p>
                        </div>
                      </div>
                    )
                  )}
                  
                  {/* Overlay Info */}
                  <div className="absolute bottom-1 left-1 flex items-center gap-1">
                    <span className="px-2 py-0.5 bg-black/70 rounded text-xs">{participant.name}</span>
                    {participant.isHost && <Crown className="w-3 h-3 text-yellow-400" />}
                    {participant.isMuted && <MicOff className="w-3 h-3 text-red-400" />}
                  </div>

                  {/* Make Host Button (only visible to current host for non-hosts) */}
                  {isHost && !participant.isHost && !isLocalUser && (
                    <button
                      onClick={() => makeHost(participant)}
                      className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 px-2 py-0.5 bg-yellow-600 hover:bg-yellow-700 rounded text-xs font-semibold transition-all"
                    >
                      Make Host
                    </button>
                  )}
                </div>
              );
            })}
        </div>
      </div>

      {/* Control Bar */}
      <div className="h-[60px] bg-gray-800 border-t border-gray-700">
        <div className="h-full max-w-7xl mx-auto flex items-center justify-between px-6">
          {/* Left: Session Info */}
          <div>
            <h3 className="font-bold">Engineering Session</h3>
            <p className="text-sm text-gray-400">{participants.length} participants</p>
          </div>

          {/* Center: Controls */}
          <div className="flex items-center gap-3">
              {/* Mic Toggle */}
              <button
                onClick={toggleMic}
                className={`p-4 rounded-full transition-all ${
                  isMicOn 
                    ? 'bg-gray-700 hover:bg-gray-600' 
                    : 'bg-red-600 hover:bg-red-700'
                }`}
                title={isMicOn ? 'Mute' : 'Unmute'}
              >
                {isMicOn ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
              </button>

              {/* Camera Toggle */}
              <button
                onClick={toggleCamera}
                className={`p-4 rounded-full transition-all ${
                  isCameraOn 
                    ? 'bg-gray-700 hover:bg-gray-600' 
                    : 'bg-red-600 hover:bg-red-700'
                }`}
                title={isCameraOn ? 'Turn off camera' : 'Turn on camera'}
              >
                {isCameraOn ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
              </button>

              {/* Share Link */}
              <button
                onClick={copySessionLink}
                className="p-4 bg-blue-600 hover:bg-blue-700 rounded-full transition-all"
                title="Copy invite link"
              >
                {linkCopied ? <Check className="w-6 h-6" /> : <Share2 className="w-6 h-6" />}
              </button>

              {/* Upload Menu - Host Only */}
              {isHost && (
                <div className="relative">
                  <button
                    onClick={() => setShowUploadMenu(!showUploadMenu)}
                    className="p-4 bg-purple-600 hover:bg-purple-700 rounded-full transition-all"
                    title="Upload content"
                  >
                    <Upload className="w-6 h-6" />
                  </button>

                  {showUploadMenu && (
                    <div className="absolute bottom-full mb-2 right-0 bg-gray-800 border border-gray-700 rounded-lg shadow-xl p-2 min-w-[200px]">
                      <button
                        onClick={() => handleFileUpload('image')}
                        className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-700 rounded transition-colors text-left"
                      >
                        <Upload className="w-5 h-5 text-blue-400" />
                        <span>Upload Image</span>
                      </button>
                      <button
                        onClick={() => handleFileUpload('video')}
                        className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-700 rounded transition-colors text-left"
                      >
                        <FileVideo className="w-5 h-5 text-red-400" />
                        <span>Upload Video</span>
                      </button>
                      <button
                        onClick={() => handleFileUpload('3d')}
                        className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-700 rounded transition-colors text-left"
                      >
                        <Box className="w-5 h-5 text-cyan-400" />
                        <span>Upload 3D Model</span>
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Whiteboard Toggle - Host Only */}
              {isHost && (
                <button
                  onClick={() => showWhiteboard ? closeWhiteboard() : openWhiteboard()}
                  className={`p-4 rounded-full transition-all ${
                    showWhiteboard 
                      ? 'bg-green-600 hover:bg-green-700' 
                      : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                  title="Toggle whiteboard (Host only)"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
              )}

              {/* Participants */}
              <button
                onClick={() => setShowParticipants(!showParticipants)}
                className="p-4 bg-gray-700 hover:bg-gray-600 rounded-full transition-all relative"
                title="Participants"
              >
                <Users className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full text-xs flex items-center justify-center">
                  {participants.length}
                </span>
              </button>

              {/* Leave */}
              <button
                onClick={leaveSession}
                className="p-4 bg-red-600 hover:bg-red-700 rounded-full transition-all"
                title="Leave session"
              >
                <PhoneOff className="w-6 h-6" />
              </button>
            </div>

            {/* Right: Host Badge */}
            <div>
              {isHost && (
                <div className="flex items-center gap-2 px-3 py-2 bg-yellow-600/20 border border-yellow-600/50 rounded-lg">
                  <Crown className="w-5 h-5 text-yellow-400" />
                  <span className="font-semibold text-yellow-400">Host</span>
                </div>
              )}
            </div>
          </div>
        </div>

      {/* Participants Sidebar */}
      {showParticipants && (
        <div className="fixed right-0 top-0 h-full w-80 bg-gray-800 border-l border-gray-700 shadow-2xl z-50 flex flex-col">
          <div className="p-4 border-b border-gray-700 flex items-center justify-between">
            <h3 className="font-bold text-lg">Participants ({participants.length})</h3>
            <button
              onClick={() => setShowParticipants(false)}
              className="p-2 hover:bg-gray-700 rounded transition-colors"
            >
              ✕
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {participants.map((participant) => (
              <div
                key={participant.socketId}
                className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-lg font-bold">
                    {participant.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold">{participant.name}</p>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      {participant.isHost && <Crown className="w-3 h-3 text-yellow-400" />}
                      {participant.isMuted && <MicOff className="w-3 h-3 text-red-400" />}
                    </div>
                  </div>
                </div>
                {isHost && !participant.isHost && participant.socketId !== 'local' && (
                  <button
                    onClick={() => makeHost(participant)}
                    className="px-2 py-1 bg-yellow-600 hover:bg-yellow-700 rounded text-xs font-semibold transition-colors"
                  >
                    Make Host
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Link Copied Toast */}
      {linkCopied && (
        <div className="fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-xl flex items-center gap-2 animate-fade-in z-50">
          <Check className="w-5 h-5" />
          <span>Invite link copied!</span>
        </div>
      )}

      {/* Upload Progress */}
      {uploadProgress && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 bg-gray-800 border border-gray-700 text-white px-6 py-4 rounded-lg shadow-xl z-50 min-w-[300px]">
          <div className="flex items-center gap-3 mb-2">
            <Upload className="w-5 h-5 text-blue-400 animate-pulse" />
            <span className="font-semibold">Uploading {uploadProgress.fileName}</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-blue-500 h-full transition-all duration-300"
              style={{ width: `${uploadProgress.progress}%` }}
            />
          </div>
          <p className="text-sm text-gray-400 mt-1 text-right">{uploadProgress.progress}%</p>
        </div>
      )}
    </div>
  );
}
