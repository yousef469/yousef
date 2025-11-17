import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { 
  Mic, MicOff, Video, VideoOff, Share2, Users, 
  Crown, PhoneOff, Copy, Check, X
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import webrtcService from '../services/webrtc';

export default function CollaborateSessionPage() {
  const navigate = useNavigate();
  const { sessionId } = useParams();
  const { state } = useLocation();
  const { user } = useAuth();
  const localVideoRef = useRef(null);
  const remoteVideosRef = useRef(new Map());
  const canvasRef = useRef(null);
  const drawingRef = useRef({ isDrawing: false, color: '#3b82f6', tool: 'pen' });
  
  const initialVideoEnabled = state?.videoEnabled ?? false;
  const initialAudioEnabled = state?.audioEnabled ?? false;
  
  const [sessionPasscode] = useState(() => Math.floor(100000 + Math.random() * 900000).toString());
  const [isHost, setIsHost] = useState(true);
  const [isMicOn, setIsMicOn] = useState(initialAudioEnabled);
  const [isCameraOn, setIsCameraOn] = useState(initialVideoEnabled);
  const [linkCopied, setLinkCopied] = useState(false);
  const [showMeetingInfo, setShowMeetingInfo] = useState(false);
  const [isConnecting, setIsConnecting] = useState(true);
  const [showWhiteboard, setShowWhiteboard] = useState(false);
  const [participants, setParticipants] = useState([]);

  // Initialize WebRTC
  useEffect(() => {
    const initializeSession = async () => {
      try {
        console.log('🚀 Initializing WebRTC session...');
        
        await webrtcService.connect();
        
        webrtcService.onUserJoined = ({ socketId, userId, userName }) => {
          console.log('👤 User joined:', userName, socketId);
          setParticipants(prev => {
            if (prev.some(p => p.socketId === socketId)) return prev;
            return [...prev, {
              id: userId,
              socketId,
              name: userName,
              isHost: false,
              isMuted: false,
              isCameraOff: false
            }];
          });
        };

        webrtcService.onUserLeft = (socketId) => {
          console.log('👋 User left:', socketId);
          setParticipants(prev => prev.filter(p => p.socketId !== socketId));
          const videoElement = remoteVideosRef.current.get(socketId);
          if (videoElement?.parentNode) {
            videoElement.parentNode.removeChild(videoElement);
          }
          remoteVideosRef.current.delete(socketId);
        };

        webrtcService.onStreamReceived = (socketId, stream) => {
          console.log('📹 Received stream from:', socketId);
          let videoElement = remoteVideosRef.current.get(socketId);
          if (!videoElement) {
            videoElement = document.createElement('video');
            videoElement.autoplay = true;
            videoElement.playsInline = true;
            videoElement.className = 'w-full h-full object-cover';
            remoteVideosRef.current.set(socketId, videoElement);
          }
          videoElement.srcObject = stream;
        };

        webrtcService.onHostChanged = (newHostId) => {
          setIsHost(webrtcService.socket.id === newHostId);
          setParticipants(prev => prev.map(p => ({
            ...p,
            isHost: p.socketId === newHostId
          })));
        };

        let streamReady = false;
        try {
          const stream = await webrtcService.getUserMedia({ 
            video: initialVideoEnabled, 
            audio: true
          });
          if (localVideoRef.current && initialVideoEnabled) {
            localVideoRef.current.srcObject = stream;
          }
          streamReady = true;
        } catch (error) {
          console.error('❌ Error getting media:', error);
          const dummyStream = webrtcService.getDummyStream();
          streamReady = !!dummyStream;
        }

        if (!streamReady) throw new Error('Failed to initialize media stream');

        await new Promise(resolve => setTimeout(resolve, 100));
        await webrtcService.joinSession(sessionId, user?.id, user?.email?.split('@')[0] || 'User');

        console.log('✅ WebRTC session initialized');
        setIsConnecting(false);
      } catch (error) {
        console.error('❌ Failed to initialize session:', error);
        setIsConnecting(false);
        alert(error.message.includes('timeout') 
          ? 'Connection timeout. Server may be waking up. Please wait 30 seconds and try again.'
          : 'Failed to connect. Please check your internet and try again.');
        navigate('/collaborate');
      }
    };

    initializeSession();
    return () => {
      console.log('🧹 Cleaning up WebRTC session');
      webrtcService.leaveSession();
    };
  }, [sessionId, user, navigate, initialVideoEnabled, initialAudioEnabled]);

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

  const startDrawing = (e) => {
    if (!canvasRef.current) return;
    drawingRef.current.isDrawing = true;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  };

  const draw = (e) => {
    if (!drawingRef.current.isDrawing || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = drawingRef.current.tool === 'eraser' ? '#ffffff' : drawingRef.current.color;
    ctx.lineWidth = drawingRef.current.tool === 'eraser' ? 20 : 3;
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    drawingRef.current.isDrawing = false;
  };

  const clearCanvas = () => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  const toggleMic = async () => {
    if (!isMicOn) {
      try {
        if (!webrtcService.localStream) {
          await webrtcService.getUserMedia({ audio: true, video: isCameraOn });
        }
        const audioTrack = webrtcService.localStream.getAudioTracks()[0];
        if (audioTrack) audioTrack.enabled = true;
        setIsMicOn(true);
      } catch (error) {
        console.error('Error enabling microphone:', error);
      }
    } else {
      const audioTrack = webrtcService.localStream?.getAudioTracks()[0];
      if (audioTrack) audioTrack.enabled = false;
      setIsMicOn(false);
    }
  };

  const toggleCamera = async () => {
    if (!isCameraOn) {
      try {
        const stream = await webrtcService.getUserMedia({ video: true, audio: isMicOn });
        if (localVideoRef.current) localVideoRef.current.srcObject = stream;
        setIsCameraOn(true);
      } catch (error) {
        console.error('Error enabling camera:', error);
      }
    } else {
      const videoTrack = webrtcService.localStream?.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.stop();
        webrtcService.localStream.removeTrack(videoTrack);
      }
      if (localVideoRef.current) localVideoRef.current.srcObject = null;
      setIsCameraOn(false);
    }
  };

  const copyInviteLink = () => {
    const inviteText = `Join my Engineerium meeting!\n\nSession ID: ${sessionId}\nPasscode: ${sessionPasscode}\n\nOr click: ${window.location.origin}/collaborate/session/${sessionId}`;
    navigator.clipboard.writeText(inviteText);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const leaveSession = () => {
    webrtcService.leaveSession();
    navigate('/collaborate');
  };

  const removeParticipant = (participant) => {
    if (!isHost) return;
    console.log('Remove participant:', participant.name);
  };

  if (isConnecting) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className=er">
          <lassName="anpin rounded--2 border-blue-mx-auto mb-4">v>
          <h2 className="te font-bold mb-2>Connecting to session...2>
          <p clasion = "text-{se wait while we set ur video call</
    webr</div>
      </div>
    );
  }
  // Show loading while connecting
  if (isColParticipants = [
    return (
      idiv classNam
      socketId: 'local',
      nam <div c',
      isHost,
      isMuted: !isMicOn,
        CameraOaOn,
      isLocal: t
    );
    ...participants
  ];

  return (lassName="min-h-screen bg-gray-900 text-white">
      {/* lassName="min-h-screen bg-gt-white flex l">
