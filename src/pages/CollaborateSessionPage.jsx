import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Mic, MicOff, Video, VideoOff, Share2, Upload, Users, 
  Crown, PhoneOff, Copy, Check, FileVideo, Box
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function CollaborateSessionPage() {
  const navigate = useNavigate();
  const { sessionId } = useParams();
  const { user } = useAuth();
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);
  
  // Session state
  const [isHost, setIsHost] = useState(true); // First person is host
  const [isMicOn, setIsMicOn] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [showUploadMenu, setShowUploadMenu] = useState(false);
  
  // Participants (mock data - would come from real-time DB)
  const [participants, setParticipants] = useState([
    { id: user?.id, name: user?.email?.split('@')[0] || 'You', isHost: true, isMuted: false, isCameraOff: false },
    { id: '2', name: 'Alex Chen', isHost: false, isMuted: false, isCameraOff: false },
    { id: '3', name: 'Sarah Kim', isHost: false, isMuted: true, isCameraOff: false }
  ]);

  // Initialize media on mount
  useEffect(() => {
    return () => {
      // Cleanup: stop all tracks when component unmounts
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  const toggleMic = async () => {
    if (!isMicOn) {
      try {
        const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setStream(prev => {
          if (prev) {
            audioStream.getAudioTracks().forEach(track => prev.addTrack(track));
            return prev;
          }
          return audioStream;
        });
        setIsMicOn(true);
      } catch (err) {
        alert('Microphone access denied');
      }
    } else {
      if (stream) {
        stream.getAudioTracks().forEach(track => {
          track.stop();
          stream.removeTrack(track);
        });
      }
      setIsMicOn(false);
    }
  };

  const toggleCamera = async () => {
    if (!isCameraOn) {
      try {
        const videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = videoStream;
        }
        setStream(prev => {
          if (prev) {
            videoStream.getVideoTracks().forEach(track => prev.addTrack(track));
            return prev;
          }
          return videoStream;
        });
        setIsCameraOn(true);
      } catch (err) {
        alert('Camera access denied');
      }
    } else {
      if (stream) {
        stream.getVideoTracks().forEach(track => {
          track.stop();
          stream.removeTrack(track);
        });
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      setIsCameraOn(false);
    }
  };

  const copySessionLink = () => {
    const link = `${window.location.origin}/collaborate/${sessionId}`;
    navigator.clipboard.writeText(link);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const makeHost = (participantId) => {
    if (isHost) {
      setParticipants(prev => prev.map(p => ({
        ...p,
        isHost: p.id === participantId
      })));
      if (participantId !== user?.id) {
        setIsHost(false);
      }
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
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    navigate('/collaborate');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Main Video Grid */}
      <div className="h-screen flex flex-col">
        {/* Video Grid */}
        <div className="flex-1 grid grid-cols-2 lg:grid-cols-3 gap-2 p-4">
          {/* Your Video */}
          <div className="relative bg-gray-800 rounded-lg overflow-hidden">
            {isCameraOn ? (
              <video
                ref={videoRef}
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
          {participants.slice(1).map((participant) => (
            <div key={participant.id} className="relative bg-gray-800 rounded-lg overflow-hidden group">
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-900 to-pink-900">
                <div className="text-center">
                  <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-2 text-3xl">
                    {participant.name[0]}
                  </div>
                  <p className="font-semibold">{participant.name}</p>
                </div>
              </div>
              
              <div className="absolute bottom-2 left-2 flex items-center gap-2">
                <span className="px-2 py-1 bg-black/70 rounded text-sm">{participant.name}</span>
                {participant.isHost && <Crown className="w-4 h-4 text-yellow-400" />}
                {participant.isMuted && <MicOff className="w-4 h-4 text-red-400" />}
              </div>

              {/* Make Host Button (only visible to host) */}
              {isHost && !participant.isHost && (
                <button
                  onClick={() => makeHost(participant.id)}
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 px-2 py-1 bg-yellow-600 hover:bg-yellow-700 rounded text-xs font-semibold transition-all"
                >
                  Make Host
                </button>
              )}
            </div>
          ))}
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
