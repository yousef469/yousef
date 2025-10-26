import React, { useState, useEffect } from 'react';
import { Users, Video, MessageCircle, Share2, UserPlus, Copy, Check } from 'lucide-react';

const CollaborationMode = () => {
  const [sessionId, setSessionId] = useState('');
  const [isHost, setIsHost] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [copied, setCopied] = useState(false);

  const generateSessionId = () => {
    const id = Math.random().toString(36).substring(2, 8).toUpperCase();
    setSessionId(id);
    setIsHost(true);
    setParticipants([{ id: 1, name: 'You (Host)', color: '#06b6d4' }]);
  };

  const joinSession = (id) => {
    setSessionId(id);
    setIsHost(false);
    setParticipants([
      { id: 1, name: 'Host', color: '#06b6d4' },
      { id: 2, name: 'You', color: '#3b82f6' }
    ]);
  };

  const copySessionLink = () => {
    const link = `${window.location.origin}/collaborate/${sessionId}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    
    const message = {
      id: Date.now(),
      sender: isHost ? 'You (Host)' : 'You',
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([...messages, message]);
    setNewMessage('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Users className="w-8 h-8 text-cyan-400" />
          <div>
            <h1 className="text-3xl font-bold">Collaboration Mode</h1>
            <p className="text-gray-400">Study together in real-time</p>
          </div>
        </div>

        {!sessionId ? (
          // Start/Join Session
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-gray-800/50 border border-cyan-500/30 rounded-xl p-8">
              <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                <UserPlus className="w-8 h-8 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold text-center mb-4">Start New Session</h3>
              <p className="text-gray-400 text-center mb-6">
                Create a study room and invite friends
              </p>
              <button
                onClick={generateSessionId}
                className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-lg font-semibold transition-all"
              >
                Create Session
              </button>
            </div>

            <div className="bg-gray-800/50 border border-purple-500/30 rounded-xl p-8">
              <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Users className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-center mb-4">Join Session</h3>
              <p className="text-gray-400 text-center mb-6">
                Enter a session code to join
              </p>
              <input
                type="text"
                placeholder="Enter session code"
                className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-3 text-white mb-3"
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && e.target.value) {
                    joinSession(e.target.value.toUpperCase());
                  }
                }}
              />
              <button
                onClick={() => {
                  const input = document.querySelector('input[placeholder="Enter session code"]');
                  if (input.value) joinSession(input.value.toUpperCase());
                }}
                className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 rounded-lg font-semibold transition-all"
              >
                Join Session
              </button>
            </div>
          </div>
        ) : (
          // Active Session
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Main Content Area */}
            <div className="lg:col-span-2 space-y-6">
              {/* Session Info */}
              <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/50 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Session Code</p>
                    <p className="text-3xl font-bold text-cyan-400">{sessionId}</p>
                  </div>
                  <button
                    onClick={copySessionLink}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                  >
                    {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                    {copied ? 'Copied!' : 'Copy Link'}
                  </button>
                </div>
              </div>

              {/* Shared 3D Viewer */}
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4">Shared 3D Model Viewer</h3>
                <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🚀</div>
                    <p className="text-gray-400">3D model will appear here</p>
                    <p className="text-sm text-gray-500 mt-2">All participants see the same view</p>
                  </div>
                </div>
              </div>

              {/* Shared Whiteboard */}
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4">Shared Whiteboard</h3>
                <div className="aspect-video bg-white rounded-lg">
                  <canvas className="w-full h-full rounded-lg" />
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Participants */}
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-cyan-400" />
                  Participants ({participants.length})
                </h3>
                <div className="space-y-2">
                  {participants.map((participant) => (
                    <div key={participant.id} className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg">
                      <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                        style={{ backgroundColor: participant.color }}
                      >
                        {participant.name[0]}
                      </div>
                      <span className="font-semibold">{participant.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chat */}
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-cyan-400" />
                  Chat
                </h3>
                
                <div className="h-64 bg-gray-900 rounded-lg p-4 mb-4 overflow-y-auto">
                  {messages.length === 0 ? (
                    <p className="text-gray-500 text-sm text-center mt-20">No messages yet</p>
                  ) : (
                    <div className="space-y-3">
                      {messages.map((msg) => (
                        <div key={msg.id} className="bg-gray-800 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-cyan-400 text-sm font-semibold">{msg.sender}</span>
                            <span className="text-gray-500 text-xs">{msg.timestamp}</span>
                          </div>
                          <p className="text-gray-300 text-sm">{msg.text}</p>
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
                    placeholder="Type a message..."
                    className="flex-1 bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 text-white text-sm"
                  />
                  <button
                    onClick={sendMessage}
                    className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-lg transition-colors"
                  >
                    Send
                  </button>
                </div>
              </div>

              {/* Video Call (Coming Soon) */}
              <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 opacity-50">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Video className="w-5 h-5 text-purple-400" />
                  Video Call
                </h3>
                <p className="text-gray-400 text-sm text-center">Coming Soon</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollaborationMode;
