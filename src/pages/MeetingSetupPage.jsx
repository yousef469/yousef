import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Video, VideoOff, Mic, MicOff, Settings, ArrowLeft, Copy, Check } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../services/supabase';

export default function MeetingSetupPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const videoRef = useRef(null);
  
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [usePMI, setUsePMI] = useState(false);
  const [personalMeetingId, setPersonalMeetingId] = useState('');
  const [stream, setStream] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  // Load user's PMI from database
  useEffect(() => {
    const loadPMI = async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('personal_meeting_id')
          .eq('id', user?.id)
          .single();

        if (error) throw error;
        
        if (data?.personal_meeting_id) {
          setPersonalMeetingId(data.personal_meeting_id);
        } else {
          // Generate PMI if user doesn't have one
          const newPMI = Math.floor(1000000000 + Math.random() * 9000000000).toString();
          const { error: updateError } = await supabase
            .from('profiles')
            .update({ personal_meeting_id: newPMI })
            .eq('id', user?.id);
          
          if (!updateError) {
            setPersonalMeetingId(newPMI);
          }
        }
        setLoading(false);
      } catch (error) {
        console.error('Error loading PMI:', error);
        setLoading(false);
      }
    };

    if (user) {
      loadPMI();
    }
  }, [user]);

  // Initialize camera preview
  useEffect(() => {
    const initMedia = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: videoEnabled,
          audio: audioEnabled
        });
        setStream(mediaStream);
        if (videoRef.current && videoEnabled) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (error) {
        console.error('Error accessing media:', error);
      }
    };

    initMedia();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // Update video when toggled
  useEffect(() => {
    if (stream) {
      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = videoEnabled;
      }
    }
  }, [videoEnabled, stream]);

  // Update audio when toggled
  useEffect(() => {
    if (stream) {
      const audioTrack = stream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = audioEnabled;
      }
    }
  }, [audioEnabled, stream]);

  const startMeeting = () => {
    // Stop preview stream
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }

    // Navigate to session with chosen ID
    const meetingId = usePMI ? personalMeetingId : generateRandomId();
    navigate(`/collaborate/session/${meetingId}`, {
      state: { videoEnabled, audioEnabled }
    });
  };

  const generateRandomId = () => {
    return Math.random().toString(36).substring(2, 11).toUpperCase();
  };

  const copyPMI = () => {
    navigator.clipboard.writeText(personalMeetingId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/collaborate')}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        <h1 className="text-4xl font-bold mb-2 text-center">Setup Your Meeting</h1>
        <p className="text-gray-400 text-center mb-8">Configure your camera and microphone before joining</p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Video Preview */}
          <div className="space-y-4">
            <div className="relative aspect-video bg-gray-800 rounded-xl overflow-hidden border-2 border-gray-700">
              {videoEnabled ? (
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-4xl">{user?.email?.[0]?.toUpperCase() || 'U'}</span>
                    </div>
                    <p className="text-gray-400">Camera Off</p>
                  </div>
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => setVideoEnabled(!videoEnabled)}
                className={`p-4 rounded-full transition-all ${
                  videoEnabled 
                    ? 'bg-gray-700 hover:bg-gray-600' 
                    : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                {videoEnabled ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
              </button>
              <button
                onClick={() => setAudioEnabled(!audioEnabled)}
                className={`p-4 rounded-full transition-all ${
                  audioEnabled 
                    ? 'bg-gray-700 hover:bg-gray-600' 
                    : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                {audioEnabled ? <Mic className="w-6 h-6" /> : <MicOff className="w-6 h-6" />}
              </button>
              <button className="p-4 rounded-full bg-gray-700 hover:bg-gray-600 transition-all">
                <Settings className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Meeting Options */}
          <div className="space-y-6">
            {/* Personal Meeting ID */}
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
              <h3 className="font-bold text-lg mb-4">Meeting ID</h3>
              
              {/* Use PMI Toggle */}
              <label className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg cursor-pointer hover:bg-gray-700 transition-all mb-4">
                <div>
                  <p className="font-semibold">Use Personal Meeting ID</p>
                  <p className="text-sm text-gray-400">Your permanent meeting room</p>
                </div>
                <input
                  type="checkbox"
                  checked={usePMI}
                  onChange={(e) => setUsePMI(e.target.checked)}
                  className="w-5 h-5 rounded"
                />
              </label>

              {/* Show PMI */}
              {usePMI && (
                <div className="bg-gray-900 rounded-lg p-4">
                  <p className="text-sm text-gray-400 mb-2">Your Personal Meeting ID</p>
                  <div className="flex items-center justify-between">
                    <p className="text-2xl font-bold tracking-wider">{personalMeetingId}</p>
                    <button
                      onClick={copyPMI}
                      className="p-2 hover:bg-gray-800 rounded transition-all"
                    >
                      {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    This ID is permanent and can be found in your profile
                  </p>
                </div>
              )}

              {!usePMI && (
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                  <p className="text-sm text-blue-400">
                    A random meeting ID will be generated when you start
                  </p>
                </div>
              )}
            </div>

            {/* Meeting Info */}
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
              <h3 className="font-bold text-lg mb-4">Meeting Settings</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Video:</span>
                  <span className={videoEnabled ? 'text-green-400' : 'text-red-400'}>
                    {videoEnabled ? 'On' : 'Off'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Audio:</span>
                  <span className={audioEnabled ? 'text-green-400' : 'text-red-400'}>
                    {audioEnabled ? 'On' : 'Off'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Meeting Type:</span>
                  <span className="text-white">
                    {usePMI ? 'Personal Room' : 'Instant Meeting'}
                  </span>
                </div>
              </div>
            </div>

            {/* Start Button */}
            <button
              onClick={startMeeting}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl"
            >
              Start Meeting
            </button>

            <p className="text-center text-sm text-gray-400">
              You can invite others after starting the meeting
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
