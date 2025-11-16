import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, Video, VideoOff, Mic, MicOff, Share2, Copy, Check, 
  Lock, Eye, EyeOff, Pencil, Eraser, Square, Circle, Type,
  ArrowLeft, Monitor, MonitorOff, Hand, Download, Trash2
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function CollaboratePage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [step, setStep] = useState('home'); // home, create, join, session
  const [sessionCode, setSessionCode] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isHost, setIsHost] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // Media states
  const [videoEnabled, setVideoEnabled] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [screenSharing, setScreenSharing] = useState(false);
  
  // Whiteboard states
  const [tool, setTool] = useState('pen');
  const [color, setColor] = useState('#3b82f6');
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef(null);
  
  // Participants
  const [participants, setParticipants] = useState([]);
  
  // Chat
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const generateSessionCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const generatePassword = () => {
    return Math.random().toString(36).substring(2, 10);
  };

  const createSession = () => {
    // Navigate to meeting setup page (like Zoom)
    navigate('/collaborate/setup');
  };

  const startSession = () => {
    setParticipants([
      { id: 1, name: user?.email?.split('@')[0] || 'Host', role: 'host', video: videoEnabled, audio: audioEnabled }
    ]);
    setStep('session');
  };

  const joinWithCode = (code, pass) => {
    // Navigate to setup page first, then to session
    navigate('/collaborate/setup', { 
      state: { 
        sessionId: code, 
        passcode: pass,
        isJoining: true 
      } 
    });
  };

  const copySessionInfo = () => {
    const info = `Join my Engineerium session!\n\nCode: ${sessionCode}\nPassword: ${password}\n\nLink: ${window.location.origin}/collaborate?code=${sessionCode}`;
    navigator.clipboard.writeText(info);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleVideo = () => setVideoEnabled(!videoEnabled);
  const toggleAudio = () => setAudioEnabled(!audioEnabled);
  const toggleScreenShare = () => setScreenSharing(!screenSharing);

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    const msg = {
      id: Date.now(),
      sender: user?.email?.split('@')[0] || (isHost ? 'Host' : 'Guest'),
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([...messages, msg]);
    setNewMessage('');
  };

  // Whiteboard drawing
  const startDrawing = (e) => {
    if (!canvasRef.current) return;
    setIsDrawing(true);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e) => {
    if (!isDrawing || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    ctx.strokeStyle = tool === 'eraser' ? '#ffffff' : color;
    ctx.lineWidth = tool === 'eraser' ? 20 : 3;
    ctx.lineCap = 'round';
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
  }, [step]);

  if (step === 'home') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-8">
        <div className="max-w-6xl mx-auto">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </button>

          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4">
              3D Model <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Collaboration</span>
            </h1>
            <p className="text-xl text-gray-400">
              Teach, learn, and explore 3D models together in real-time
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Create Session */}
            <button
              onClick={createSession}
              className="group bg-gradient-to-br from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-2xl p-8 border-2 border-cyan-400/50 hover:border-cyan-300 transition-all hover:scale-105"
            >
              <div className="w-20 h-20 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform">
                <Video className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Create Session</h3>
              <p className="text-white/90 mb-4">
                Start a new collaboration room with password protection
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-white/80">
                <Lock className="w-4 h-4" />
                <span>Secure & Private</span>
              </div>
            </button>

            {/* Join Session */}
            <button
              onClick={() => setStep('join')}
              className="group bg-gradient-to-br from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 rounded-2xl p-8 border-2 border-purple-400/50 hover:border-purple-300 transition-all hover:scale-105"
            >
              <div className="w-20 h-20 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Join Session</h3>
              <p className="text-white/90 mb-4">
                Enter a session code and password to join
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-white/80">
                <Hand className="w-4 h-4" />
                <span>Collaborate Now</span>
              </div>
            </button>
          </div>

          {/* Features */}
          <div className="mt-16 grid md:grid-cols-4 gap-6">
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 text-center">
              <Video className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
              <h4 className="font-bold mb-2">Video & Audio</h4>
              <p className="text-sm text-gray-400">HD video calls with screen sharing</p>
            </div>
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 text-center">
              <Pencil className="w-8 h-8 text-green-400 mx-auto mb-3" />
              <h4 className="font-bold mb-2">Whiteboard</h4>
              <p className="text-sm text-gray-400">Draw and annotate together</p>
            </div>
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 text-center">
              <Monitor className="w-8 h-8 text-purple-400 mx-auto mb-3" />
              <h4 className="font-bold mb-2">3D Viewer</h4>
              <p className="text-sm text-gray-400">Synchronized 3D model viewing</p>
            </div>
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 text-center">
              <Lock className="w-8 h-8 text-orange-400 mx-auto mb-3" />
              <h4 className="font-bold mb-2">Secure</h4>
              <p className="text-sm text-gray-400">Password-protected rooms</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'join') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-8">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => setStep('home')}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>

          <div className="bg-gray-800 border-2 border-purple-500/50 rounded-2xl p-8">
            <h2 className="text-3xl font-bold mb-6 text-center">Join Session</h2>
            
            <div className="space-y-6 mb-8">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Session ID</label>
                <p className="text-xs text-gray-500 mb-2">The Session ID shown when the meeting was created</p>
                <input
                  type="text"
                  value={sessionCode}
                  onChange={(e) => setSessionCode(e.target.value)}
                  placeholder="e.g., abc123def456"
                  className="w-full bg-gray-900 border border-gray-600 rounded-xl px-6 py-4 text-lg text-center tracking-wider font-mono focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Passcode (Optional)</label>
                <p className="text-xs text-gray-500 mb-2">Only required if the host set a passcode</p>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter passcode if required"
                    className="w-full bg-gray-900 border border-gray-600 rounded-xl px-6 py-4 text-lg focus:border-purple-500 focus:outline-none pr-12"
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <button
                onClick={toggleVideo}
                className={`py-3 rounded-xl transition-all flex items-center justify-center gap-2 ${
                  videoEnabled ? 'bg-purple-500 hover:bg-purple-600' : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                {videoEnabled ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
                {videoEnabled ? 'Video On' : 'Video Off'}
              </button>
              <button
                onClick={toggleAudio}
                className={`py-3 rounded-xl transition-all flex items-center justify-center gap-2 ${
                  audioEnabled ? 'bg-purple-500 hover:bg-purple-600' : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                {audioEnabled ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                {audioEnabled ? 'Mic On' : 'Mic Off'}
              </button>
            </div>

            <button
              onClick={() => joinWithCode(sessionCode, password)}
              disabled={!sessionCode}
              className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-bold text-lg transition-all"
            >
              Join Session
            </button>
            
            <p className="text-xs text-gray-500 text-center mt-4">
              💡 Tip: The Session ID is the long code shown in the meeting info bar when someone creates a meeting
            </p>
          </div>
        </div>
      </div>
    );
  }

}
