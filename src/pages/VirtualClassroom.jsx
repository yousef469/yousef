import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Mic, MicOff, Video, VideoOff, Upload, Users, 
  Crown, PhoneOff, Copy, Check, Box, Pointer, X,
  Download, Loader2
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import classroomService from '../services/classroom';
import { generateToken, getLiveKitUrl, isLiveKitConfigured } from '../services/livekit';
import ThreeJSViewerSynced from '../components/ThreeJSViewerSynced';

// Lazy load LiveKit components (only if configured)
let LiveKitRoom, VideoConference, RoomAudioRenderer;
if (isLiveKitConfigured()) {
  try {
    const livekit = await import('@livekit/components-react');
    LiveKitRoom = livekit.LiveKitRoom;
    VideoConference = livekit.VideoConference;
    RoomAudioRenderer = livekit.RoomAudioRenderer;
    // Import styles
    await import('@livekit/components-styles');
  } catch (error) {
    console.warn('LiveKit not installed. Video/audio disabled.');
  }
}

export default function VirtualClassroom() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const controlsRef = useRef();
  const fileInputRef = useRef();

  // Session state
  const [isTeacher, setIsTeacher] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [currentModel, setCurrentModel] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [showParticipants, setShowParticipants] = useState(false);
  const [followTeacher, setFollowTeacher] = useState(true);
  const [pointerPosition, setPointerPosition] = useState(null);

  // Media controls
  const [isMicOn, setIsMicOn] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [liveKitToken, setLiveKitToken] = useState(null);
  const [liveKitEnabled] = useState(isLiveKitConfigured());

  // Initialize classroom
  useEffect(() => {
    const initClassroom = async () => {
      // Determine if user is teacher (first to join or creator)
      const isTeacherRole = localStorage.getItem(`classroom-${roomId}-teacher`) === user.id;
      setIsTeacher(isTeacherRole);

      // Join room
      await classroomService.joinRoom(roomId, isTeacherRole, {
        userId: user.id,
        userName: user.email?.split('@')[0] || 'Student',
        
        onConnected: () => {
          setIsConnected(true);
          console.log('Connected to classroom');
        },

        onCameraMove: (cameraData) => {
          if (followTeacher && controlsRef.current) {
            // Update camera to match teacher's view
            const { position, target, zoom } = cameraData;
            
            if (controlsRef.current.object) {
              controlsRef.current.object.position.set(
                position.x,
                position.y,
                position.z
              );
            }

            if (controlsRef.current.target) {
              controlsRef.current.target.set(
                target.x,
                target.y,
                target.z
              );
            }

            controlsRef.current.update();
          }
        },

        onModelChange: async (modelData) => {
          console.log('Model changed:', modelData);
          setCurrentModel(modelData);
        },

        onPointer: (pointerData) => {
          setPointerPosition(pointerData.visible ? pointerData : null);
        },

        onPresenceChange: (presenceState) => {
          const participantList = [];
          Object.keys(presenceState).forEach(key => {
            presenceState[key].forEach(presence => {
              participantList.push(presence);
            });
          });
          setParticipants(participantList);
        }
      });
    };

    initClassroom();

    return () => {
      classroomService.leaveRoom();
    };
  }, [roomId, user, followTeacher]);

  // Initialize LiveKit (if configured)
  useEffect(() => {
    const initLiveKit = async () => {
      if (!liveKitEnabled || !isConnected) return;

      try {
        const token = await generateToken(
          roomId,
          user.email?.split('@')[0] || `User-${user.id.slice(0, 6)}`,
          isTeacher
        );
        if (token) {
          setLiveKitToken(token);
        }
      } catch (error) {
        console.error('Failed to initialize LiveKit:', error);
      }
    };

    initLiveKit();
  }, [isConnected, roomId, user, isTeacher, liveKitEnabled]);

  // Handle camera movement (teacher only)
  const handleCameraChange = () => {
    if (isTeacher && controlsRef.current) {
      const camera = controlsRef.current.object;
      const target = controlsRef.current.target;

      classroomService.broadcastCameraMove({
        position: camera.position,
        target: target,
        zoom: camera.zoom
      });
    }
  };

  // Handle model upload (teacher only)
  const handleModelUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const modelData = await classroomService.uploadModel(file);
      await classroomService.broadcastModelChange(modelData.url, modelData.name);
      setCurrentModel(modelData);
    } catch (error) {
      console.error('Failed to upload model:', error);
      alert('Failed to upload model. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  // Copy room link
  const copyRoomLink = () => {
    const link = `${window.location.origin}/classroom/${roomId}`;
    navigator.clipboard.writeText(link);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  // Leave classroom
  const handleLeave = async () => {
    await classroomService.leaveRoom();
    navigate('/');
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
          <p className="text-xl text-white">Connecting to classroom...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-background flex flex-col">
      {/* Top Bar */}
      <div className="glass border-b border-primary/20 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-white">Virtual Classroom</h1>
            {isTeacher && (
              <span className="flex items-center gap-2 px-3 py-1 bg-accent/20 text-accent rounded-full text-sm font-medium">
                <Crown className="w-4 h-4" />
                Teacher
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Participant count */}
            <button
              onClick={() => setShowParticipants(!showParticipants)}
              className="flex items-center gap-2 px-4 py-2 bg-background-light hover:bg-background rounded-lg transition-colors"
            >
              <Users className="w-5 h-5 text-primary" />
              <span className="font-mono text-white">{participants.length}</span>
            </button>

            {/* Copy link */}
            <button
              onClick={copyRoomLink}
              className="flex items-center gap-2 px-4 py-2 bg-background-light hover:bg-background rounded-lg transition-colors"
            >
              {linkCopied ? (
                <>
                  <Check className="w-5 h-5 text-success" />
                  <span className="text-success">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5 text-white" />
                  <span className="text-white">Share</span>
                </>
              )}
            </button>

            {/* Leave button */}
            <button
              onClick={handleLeave}
              className="flex items-center gap-2 px-4 py-2 bg-danger/20 hover:bg-danger/30 text-danger rounded-lg transition-colors"
            >
              <PhoneOff className="w-5 h-5" />
              <span>Leave</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* 3D Viewer */}
        <div className="flex-1 relative">
          {currentModel ? (
            <ThreeJSViewerSynced
              modelUrl={currentModel.url}
              controlsRef={controlsRef}
              onCameraChange={handleCameraChange}
              enableControls={isTeacher || !followTeacher}
            />
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <Box className="w-24 h-24 text-text-muted mx-auto mb-4" />
                <p className="text-xl text-white mb-2">No model loaded</p>
                {isTeacher ? (
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="glow-primary bg-primary hover:bg-primary-light text-black font-semibold px-6 py-3 rounded-lg transition-all"
                  >
                    <Upload className="w-5 h-5 inline mr-2" />
                    Upload 3D Model
                  </button>
                ) : (
                  <p className="text-text-muted">Waiting for teacher to load a model...</p>
                )}
              </div>
            </div>
          )}

          {/* Laser pointer indicator */}
          {pointerPosition && (
            <div
              className="absolute w-4 h-4 bg-danger rounded-full animate-pulse pointer-events-none"
              style={{
                left: `${pointerPosition.x}%`,
                top: `${pointerPosition.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
            />
          )}

          {/* Teacher Controls Overlay */}
          {isTeacher && currentModel && (
            <div className="absolute bottom-6 left-6 glass rounded-lg p-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="flex items-center gap-2 px-4 py-2 bg-primary/20 hover:bg-primary/30 text-primary rounded-lg transition-colors disabled:opacity-50"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Uploading...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="w-5 h-5" />
                      <span>Change Model</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Student Controls Overlay */}
          {!isTeacher && (
            <div className="absolute bottom-6 left-6 glass rounded-lg p-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={followTeacher}
                  onChange={(e) => setFollowTeacher(e.target.checked)}
                  className="w-5 h-5 rounded border-primary/30 bg-background-light text-primary focus:ring-2 focus:ring-primary"
                />
                <span className="text-white font-medium">Follow Teacher's View</span>
              </label>
            </div>
          )}
        </div>

        {/* Sidebar - Participants & Video (Future: LiveKit) */}
        <div className="w-80 glass border-l border-primary/20 flex flex-col">
          {/* Participants List */}
          <div className="flex-1 overflow-y-auto p-4">
            <h3 className="text-lg font-semibold text-white mb-4">
              Participants ({participants.length})
            </h3>
            <div className="space-y-2">
              {participants.map((participant, index) => (
                <div
                  key={index}
                  className="engineering-card p-3 rounded-lg flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="text-primary font-bold">
                      {participant.user_name?.[0]?.toUpperCase() || 'U'}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium">{participant.user_name}</p>
                    {participant.is_teacher && (
                      <span className="text-xs text-accent">Teacher</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Video/Audio Section */}
          <div className="border-t border-primary/20 p-4">
            {liveKitEnabled && liveKitToken && LiveKitRoom ? (
              <LiveKitRoom
                token={liveKitToken}
                serverUrl={getLiveKitUrl()}
                connect={true}
                audio={isMicOn}
                video={isCameraOn}
                className="h-full"
                options={{
                  adaptiveStream: true,
                  dynacast: true,
                }}
              >
                <VideoConference />
                <RoomAudioRenderer />
              </LiveKitRoom>
            ) : (
              <>
                <div className="flex items-center justify-center gap-4 mb-3">
                  <button
                    onClick={() => setIsMicOn(!isMicOn)}
                    disabled={!liveKitEnabled}
                    className={`p-4 rounded-full transition-colors ${
                      isMicOn 
                        ? 'bg-primary/20 text-primary' 
                        : 'bg-danger/20 text-danger'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {isMicOn ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
                  </button>
                  <button
                    onClick={() => setIsCameraOn(!isCameraOn)}
                    disabled={!liveKitEnabled}
                    className={`p-4 rounded-full transition-colors ${
                      isCameraOn 
                        ? 'bg-primary/20 text-primary' 
                        : 'bg-danger/20 text-danger'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {isCameraOn ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
                  </button>
                </div>
                <p className="text-xs text-text-muted text-center">
                  {liveKitEnabled 
                    ? 'Connecting to video...' 
                    : 'Video/Audio: Add LiveKit credentials to enable'}
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".glb,.gltf"
        onChange={handleModelUpload}
        className="hidden"
      />
    </div>
  );
}
