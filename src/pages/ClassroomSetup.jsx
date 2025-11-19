import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Crown, ArrowRight, Copy, Check } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function ClassroomSetup() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [mode, setMode] = useState(null); // 'create' or 'join'
  const [roomId, setRoomId] = useState('');
  const [linkCopied, setLinkCopied] = useState(false);

  // Generate random room ID
  const generateRoomId = () => {
    return Math.random().toString(36).substring(2, 10).toUpperCase();
  };

  // Create new classroom
  const handleCreateClassroom = () => {
    const newRoomId = generateRoomId();
    // Mark user as teacher for this room
    localStorage.setItem(`classroom-${newRoomId}-teacher`, user.id);
    navigate(`/classroom/${newRoomId}`);
  };

  // Join existing classroom
  const handleJoinClassroom = () => {
    if (!roomId.trim()) {
      alert('Please enter a room code');
      return;
    }
    navigate(`/classroom/${roomId.trim().toUpperCase()}`);
  };

  // Copy room link
  const copyRoomLink = (id) => {
    const link = `${window.location.origin}/classroom/${id}`;
    navigator.clipboard.writeText(link);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  if (!mode) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-4">Virtual Classroom</h1>
            <p className="text-xl text-text-secondary">
              Teach or learn with synchronized 3D models in real-time
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Create Classroom */}
            <button
              onClick={() => setMode('create')}
              className="engineering-card p-8 rounded-2xl hover:border-primary/50 transition-all group"
            >
              <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Crown className="w-8 h-8 text-accent" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">Create Classroom</h2>
              <p className="text-text-secondary mb-6">
                Start a new session as a teacher. Upload 3D models and guide students through lessons.
              </p>
              <div className="flex items-center text-primary font-semibold">
                <span>Get Started</span>
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
              </div>
            </button>

            {/* Join Classroom */}
            <button
              onClick={() => setMode('join')}
              className="engineering-card p-8 rounded-2xl hover:border-primary/50 transition-all group"
            >
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">Join Classroom</h2>
              <p className="text-text-secondary mb-6">
                Enter a room code to join an existing classroom session as a student.
              </p>
              <div className="flex items-center text-primary font-semibold">
                <span>Join Now</span>
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
              </div>
            </button>
          </div>

          {/* Features */}
          <div className="mt-12 glass rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Features</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-success/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-success">✓</span>
                </div>
                <div>
                  <p className="text-white font-medium">3D Model Sync</p>
                  <p className="text-sm text-text-muted">Crystal clear, zero lag</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-success/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-success">✓</span>
                </div>
                <div>
                  <p className="text-white font-medium">Real-time Camera</p>
                  <p className="text-sm text-text-muted">Follow teacher's view</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-success/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-success">✓</span>
                </div>
                <div>
                  <p className="text-white font-medium">Model Upload</p>
                  <p className="text-sm text-text-muted">Teachers can share any GLB</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (mode === 'create') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <button
            onClick={() => setMode(null)}
            className="text-text-secondary hover:text-white mb-6 transition-colors"
          >
            ← Back
          </button>

          <div className="engineering-card p-8 rounded-2xl">
            <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mb-6">
              <Crown className="w-8 h-8 text-accent" />
            </div>

            <h2 className="text-3xl font-bold text-white mb-3">Create Classroom</h2>
            <p className="text-text-secondary mb-8">
              You'll be the teacher. Students can join using the room code.
            </p>

            <button
              onClick={handleCreateClassroom}
              className="glow-primary w-full bg-primary hover:bg-primary-light text-black font-semibold py-4 rounded-lg transition-all transform hover:scale-105"
            >
              Create & Start Teaching
            </button>

            <div className="mt-6 p-4 bg-background-light rounded-lg">
              <p className="text-sm text-text-muted">
                <strong className="text-white">Note:</strong> You'll be able to upload 3D models and control the camera. Students will follow your view.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (mode === 'join') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <button
            onClick={() => setMode(null)}
            className="text-text-secondary hover:text-white mb-6 transition-colors"
          >
            ← Back
          </button>

          <div className="engineering-card p-8 rounded-2xl">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-6">
              <Users className="w-8 h-8 text-primary" />
            </div>

            <h2 className="text-3xl font-bold text-white mb-3">Join Classroom</h2>
            <p className="text-text-secondary mb-8">
              Enter the room code provided by your teacher
            </p>

            <div className="mb-6">
              <label className="block text-sm font-medium text-white mb-2">
                Room Code
              </label>
              <input
                type="text"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value.toUpperCase())}
                placeholder="e.g., ABC123XY"
                className="w-full px-4 py-3 bg-background-light border border-primary/30 rounded-lg text-white font-mono text-lg focus:outline-none focus:ring-2 focus:ring-primary"
                maxLength={8}
              />
            </div>

            <button
              onClick={handleJoinClassroom}
              disabled={!roomId.trim()}
              className="glow-primary w-full bg-primary hover:bg-primary-light text-black font-semibold py-4 rounded-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              Join Classroom
            </button>

            <div className="mt-6 p-4 bg-background-light rounded-lg">
              <p className="text-sm text-text-muted">
                <strong className="text-white">Tip:</strong> You can toggle "Follow Teacher" mode to explore the model on your own.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
