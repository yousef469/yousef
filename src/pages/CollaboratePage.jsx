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
    const code = generateSessionCode();
    const pass = generatePassword();
    setSessionCode(code);
    setPassword(pass);
    setIsHost(true);
    setStep('create');
  };

  const startSession = () => {
    setParticipants([
      { id: 1, name: user?.email?.split('@')[0] || 'Host', role: 'host', video: videoEnabled, audio: audioEnabled }
    ]);
    setStep('session');
  };

  const joinWithCode = (code, pass) => {
    setSessionCode(code);
    setPassword(pass);
    setIsHost(false);
    setParticipants([
      { id: 1, name: 'Host', role: 'host', video: true, audio: true },
      { id: 2, name: user?.email?.split('@')[0] || 'Guest', role: 'participant', video: videoEnabled, audio: audioEnabled }
    ]);
    setStep('session');
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

  if (step === 'create') {
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

          <div className="bg-gray-800 border-2 border-cyan-500/50 rounded-2xl p-8">
            <h2 className="text-3xl font-bold mb-6 text-center">Session Created!</h2>
            
            <div className="space-y-6 mb-8">
              <div className="bg-gray-900 rounded-xl p-6">
                <p className="text-sm text-gray-400 mb-2">Session Code</p>
                <p className="text-4xl font-bold text-cyan-400 text-center tracking-wider">{sessionCode}</p>
              </div>

              <div className="bg-gray-900 rounded-xl p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-400">Password</p>
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-2xl font-bold text-center tracking-wider">
                  {showPassword ? password : '••••••••'}
                </p>
              </div>
            </div>

            <button
              onClick={copySessionInfo}
              className="w-full py-4 bg-gray-700 hover:bg-gray-600 rounded-xl transition-colors mb-4 flex items-center justify-center gap-2"
            >
              {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
              {copied ? 'Copied to Clipboard!' : 'Copy Session Info'}
            </button>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <button
                onClick={toggleVideo}
                className={`py-3 rounded-xl transition-all flex items-center justify-center gap-2 ${
                  videoEnabled ? 'bg-cyan-500 hover:bg-cyan-600' : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                {videoEnabled ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
                {videoEnabled ? 'Video On' : 'Video Off'}
              </button>
              <button
                onClick={toggleAudio}
                className={`py-3 rounded-xl transition-all flex items-center justify-center gap-2 ${
                  audioEnabled ? 'bg-cyan-500 hover:bg-cyan-600' : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                {audioEnabled ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                {audioEnabled ? 'Mic On' : 'Mic Off'}
              </button>
            </div>

            <button
              onClick={startSession}
              className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-xl font-bold text-lg transition-all"
            >
              Start Session
            </button>
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
                <label className="block text-sm text-gray-400 mb-2">Session Code</label>
                <input
                  type="text"
                  value={sessionCode}
                  onChange={(e) => setSessionCode(e.target.value.toUpperCase())}
                  placeholder="Enter 6-digit code"
                  maxLength={6}
                  className="w-full bg-gray-900 border border-gray-600 rounded-xl px-6 py-4 text-2xl text-center tracking-wider font-bold uppercase focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
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
              disabled={!sessionCode || !password}
              className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-bold text-lg transition-all"
            >
              Join Session
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Active Session
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-4">
      <div className="max-w-[1800px] mx-auto">
        {/* Top Bar */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 mb-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                if (confirm('Leave session?')) setStep('home');
              }}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <p className="text-sm text-gray-400">Session: {sessionCode}</p>
              <p className="text-xs text-gray-500">Password: {password}</p>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleVideo}
              className={`p-3 rounded-lg transition-all ${
                videoEnabled ? 'bg-cyan-500 hover:bg-cyan-600' : 'bg-red-500 hover:bg-red-600'
              }`}
            >
              {videoEnabled ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
            </button>
            <button
              onClick={toggleAudio}
              className={`p-3 rounded-lg transition-all ${
                audioEnabled ? 'bg-cyan-500 hover:bg-cyan-600' : 'bg-red-500 hover:bg-red-600'
              }`}
            >
              {audioEnabled ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
            </button>
            <button
              onClick={toggleScreenShare}
              className={`p-3 rounded-lg transition-all ${
                screenSharing ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              {screenSharing ? <Monitor className="w-5 h-5" /> : <MonitorOff className="w-5 h-5" />}
            </button>
            <button
              onClick={copySessionInfo}
              className="p-3 rounded-lg bg-gray-700 hover:bg-gray-600 transition-all"
            >
              {copied ? <Check className="w-5 h-5 text-green-400" /> : <Share2 className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-4">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-4">
            {/* Video Grid */}
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
              <div className="grid grid-cols-2 gap-4">
                {participants.map((p) => (
                  <div key={p.id} className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-20 h-20 bg-cyan-500 rounded-full flex items-center justify-center text-2xl font-bold mb-2 mx-auto">
                          {p.name[0]}
                        </div>
                        <p className="font-semibold">{p.name}</p>
                        <p className="text-xs text-gray-400">{p.role}</p>
                      </div>
                    </div>
                    <div className="absolute bottom-2 left-2 flex gap-2">
                      {p.video ? (
                        <div className="bg-green-500 p-1 rounded"><Video className="w-3 h-3" /></div>
                      ) : (
                        <div className="bg-red-500 p-1 rounded"><VideoOff className="w-3 h-3" /></div>
                      )}
                      {p.audio ? (
                        <div className="bg-green-500 p-1 rounded"><Mic className="w-3 h-3" /></div>
                      ) : (
                        <div className="bg-red-500 p-1 rounded"><MicOff className="w-3 h-3" /></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3D Model Viewer */}
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <Monitor className="w-5 h-5 text-cyan-400" />
                Shared 3D Model Viewer
              </h3>
              <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">🚀</div>
                  <p className="text-gray-400">3D model synchronized for all participants</p>
                </div>
              </div>
            </div>

            {/* Whiteboard */}
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold flex items-center gap-2">
                  <Pencil className="w-5 h-5 text-green-400" />
                  Collaborative Whiteboard
                </h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setTool('pen')}
                    className={`p-2 rounded ${tool === 'pen' ? 'bg-blue-500' : 'bg-gray-700'}`}
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setTool('eraser')}
                    className={`p-2 rounded ${tool === 'eraser' ? 'bg-blue-500' : 'bg-gray-700'}`}
                  >
                    <Eraser className="w-4 h-4" />
                  </button>
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-10 h-10 rounded cursor-pointer"
                  />
                  <button
                    onClick={clearCanvas}
                    className="p-2 rounded bg-red-500 hover:bg-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <canvas
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                className="w-full h-96 bg-white rounded-lg cursor-crosshair"
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Participants */}
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <Users className="w-5 h-5 text-cyan-400" />
                Participants ({participants.length})
              </h3>
              <div className="space-y-2">
                {participants.map((p) => (
                  <div key={p.id} className="flex items-center gap-2 p-2 bg-gray-700 rounded-lg">
                    <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center text-sm font-bold">
                      {p.name[0]}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold">{p.name}</p>
                      <p className="text-xs text-gray-400">{p.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat */}
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
              <h3 className="font-bold mb-3">Chat</h3>
              <div className="h-64 bg-gray-900 rounded-lg p-3 mb-3 overflow-y-auto">
                {messages.length === 0 ? (
                  <p className="text-gray-500 text-sm text-center mt-20">No messages</p>
                ) : (
                  <div className="space-y-2">
                    {messages.map((msg) => (
                      <div key={msg.id} className="bg-gray-800 rounded p-2">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-cyan-400 font-semibold">{msg.sender}</span>
                          <span className="text-gray-500">{msg.time}</span>
                        </div>
                        <p className="text-sm">{msg.text}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Message..."
                  className="flex-1 bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-sm focus:border-cyan-500 focus:outline-none"
                />
                <button
                  onClick={sendMessage}
                  className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-lg transition-colors"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
