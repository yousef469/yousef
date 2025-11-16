import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { 
  Mic, MicOff, Video, VideoOff, Share2, Upload, Users, 
  Crown, PhoneOff, Copy, Check, FileVideo, Box
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
  
  // Get initial settings from setup page
  const initialVideoEnabled = state?.videoEnabled ?? false;
  const initialAudioEnabled = state?.audioEnabled ?? false;
  
  // Generate a random 6-digit passcode for this session
  const [sessionPasscode] = useState(() => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  });
  
  // Session state
  const [isHost, setIsHost] = useState(true);
  const [isMicOn, setIsMicOn] = useState(initialAudioEnabled);
  const [isCameraOn, setIsCameraOn] = useState(initialVideoEnabled);
  const [linkCopied, setLinkCopied] = useState(false);
  const [showUploadMenu, setShowUploadMenu] = useState(false);
  const [showMeetingInfo, setShowMeetingInfo] = useState(false);
  const [isConnecting, setIsConnecting] = useState(true);
  
  // Participants - start with just the current user
  const [participants, setParticipants] = useState([
    { 
      id: user?.id, 
      socketId: 'local',
      name: user?.email?.split('@')[0] || 'You', 
      isHost: true, 
      isMuted: !isMicOn, 
      isCameraOff: !isCameraOn 
    }
  ]);

  // Initialize WebRTC on mount
  useEffect(() => {
    const initializeSession = async () => {
      try {
        console.log('🚀 Initializing WebRTC session...');
        
        // Connect to signaling server
        await webrtcService.connect();
        
        // Set up event handlers
        webrtcService.onUserJoined = ({ socketId, userId, userName }) => {
          console.log('👤 User joined:', userName);
          setParticipants(prev => [...prev, {
            id: userId,
            socketId,
            name: userName,
            isHost: false,
            isMuted: false,
            isCameraOff: false
          }]);
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
          let videoElement = remoteVideosRef.current.get(socketId);
          if (!videoElement) {
            videoElement = document.createElement('video');
            videoElement.autoplay = true;
            videoElement.playsInline = true;
            videoElement.style.width = '100%';
            videoElement.style.height = '100%';
            videoElement.style.objectFit = 'cover';
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

        // ALWAYS get media BEFORE joining session (required for peer connections)
        // Microphone is always required for WebRTC to work properly
        try {
          console.log('🎥 Getting user media before joining...');
          const stream = await webrtcService.getUserMedia({ 
            video: initialVideoEnabled, 
            audio: true // Always get audio for peer connections
          });
          if (localVideoRef.current && initialVideoEnabled) {
            localVideoRef.current.srcObject = stream;
          }
          console.log('✅ Got user media');
        } catch (error) {
          console.error('❌ Error getting media:', error);
          // If media fails, create dummy stream so peers can still connect
          console.log('🔇 Creating dummy stream as fallback');
          webrtcService.getDummyStream();
        }

        // Join the session (now we have stream for peer connections)
        await webrtcService.joinSession(
          sessionId, 
          user?.id, 
          user?.email?.split('@')[0] || 'User'
        );

        console.log('✅ WebRTC session initialized');
        setIsConnecting(false);
      } catch (error) {
        console.error('❌ Failed to initialize session:', error);
        alert('Failed to connect to session. Please try again.');
        navigate('/collaborate');
      }
    };

    initializeSession();

    // Cleanup on unmount
    return () => {
      console.log('🧹 Cleaning up WebRTC session');
      webrtcService.leaveSession();
    };
  }, [sessionId, user, navigate]);

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

  const handleFileUpload = (type) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = type === 'video' ? 'video/*' : type === '3d' ? '.obj,.fbx,.gltf,.glb' : '*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        alert(`${type} file "${file.name}" uploaded! (In production, this would be shared with all participants)`);
        setShowUploadMenu(false);
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
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold mb-2">Connecting to session...</h2>
          <p className="text-gray-400">Please wait while we set up your video call</p>
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

      {/* Main Video Grid */}
      <div className="h-[calc(100vh-60px)] flex flex-col">
        {/* Video Grid */}
        <div className="flex-1 grid grid-cols-2 lg:grid-cols-3 gap-2 p-4">
          {/* Your Video */}
          <div className="relative bg-gray-800 rounded-lg overflow-hidden">
            {isCameraOn ? (
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
                  <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-2 text-3xl">
                    {user?.email?.[0]?.toUpperCase() || 'Y'}
                  </div>
                  <p className="font-semibold">You</p>
                </div>
              </div>
            )}
            
            {/* Overlay Info */}
            <div className="absolute bottom-2 left-2 flex items-center gap-2">
              <span className="px-2 py-1 bg-black/70 rounded text-sm">You</span>
              {isHost && <Crown className="w-4 h-4 text-yellow-400" />}
              {!isMicOn && <MicOff className="w-4 h-4 text-red-400" />}
            </div>
          </div>

          {/* Other Participants */}
          {participants.slice(1).map((participant) => {
            const videoElement = remoteVideosRef.current.get(participant.socketId);
            
            return (
              <div key={participant.socketId} className="relative bg-gray-800 rounded-lg overflow-hidden group">
                {videoElement ? (
                  <div 
                    className="w-full h-full"
                    ref={(container) => {
                      if (container && videoElement && !container.contains(videoElement)) {
                        container.appendChild(videoElement);
                      }
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-900 to-pink-900">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-2 text-3xl">
                        {participant.name[0]}
                      </div>
                      <p className="font-semibold">{participant.name}</p>
                    </div>
                  </div>
                )}
                
                <div className="absolute bottom-2 left-2 flex items-center gap-2">
                  <span className="px-2 py-1 bg-black/70 rounded text-sm">{participant.name}</span>
                  {participant.isHost && <Crown className="w-4 h-4 text-yellow-400" />}
                  {participant.isMuted && <MicOff className="w-4 h-4 text-red-400" />}
                </div>

                {/* Make Host Button (only visible to host) */}
                {isHost && !participant.isHost && (
                  <button
                    onClick={() => makeHost(participant)}
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 px-2 py-1 bg-yellow-600 hover:bg-yellow-700 rounded text-xs font-semibold transition-all"
                  >
                    Make Host
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Control Bar */}
        <div className="bg-gray-800 border-t border-gray-700 p-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
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

              {/* Upload Menu */}
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

              {/* Participants */}
              <button
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
      </div>

      {/* Link Copied Toast */}
      {linkCopied && (
        <div className="fixed top-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-xl flex items-center gap-2 animate-fade-in">
          <Check className="w-5 h-5" />
          <span>Invite link copied!</span>
        </div>
      )}
    </div>
  );
}
