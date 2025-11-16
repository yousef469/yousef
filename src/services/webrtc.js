import Peer from 'simple-peer';
import io from 'socket.io-client';

class WebRTCService {
  constructor() {
    this.socket = null;
    this.peers = new Map(); // socketId -> Peer instance
    this.localStream = null;
    this.sessionId = null;
    this.userId = null;
    this.userName = null;
    this.isHost = false;
    
    // Callbacks
    this.onUserJoined = null;
    this.onUserLeft = null;
    this.onStreamReceived = null;
    this.onHostChanged = null;
    this.onFileShared = null;
  }

  // Initialize connection to signaling server
  async connect(serverUrl) {
    // Auto-detect production vs development
    if (!serverUrl) {
      const isProd = import.meta.env.PROD;
      const envServer = import.meta.env.VITE_SIGNALING_SERVER;
      
      console.log('🔍 Environment check:', {
        isProd,
        envServer,
        mode: import.meta.env.MODE
      });
      
      serverUrl = isProd 
        ? (envServer || 'https://name-ai-3d-backend.onrender.com')
        : 'http://localhost:3001';
    }
    
    console.log('🔌 Connecting to signaling server:', serverUrl);
    
    return new Promise((resolve, reject) => {
      this.socket = io(serverUrl, {
        transports: ['websocket', 'polling'],
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionAttempts: 5
      });
      
      this.socket.on('connect', () => {
        console.log('✅ Connected to signaling server');
        resolve();
      });

      this.socket.on('connect_error', (error) => {
        console.error('❌ Connection error:', error.message);
        reject(error);
      });
      
      // Timeout after 10 seconds
      setTimeout(() => {
        if (!this.socket.connected) {
          reject(new Error('Connection timeout'));
        }
      }, 10000);
    }).then(() => {
      // Set up event handlers after connection is established
      this.setupEventHandlers();
    });
  }
  
  setupEventHandlers() {

    this.socket.on('user-joined', ({ socketId, userId, userName }) => {
      console.log('👤 User joined:', userName);
      
      // Ensure we have a stream (create dummy if needed)
      if (!this.localStream) {
        this.getDummyStream();
      }
      
      this.createPeer(socketId, true); // We initiate the call
      
      if (this.onUserJoined) {
        this.onUserJoined({ socketId, userId, userName });
      }
    });

    this.socket.on('existing-users', (users) => {
      console.log('👥 Existing users:', users.length);
      
      // Ensure we have a stream (create dummy if needed)
      if (!this.localStream) {
        this.getDummyStream();
      }
      
      users.forEach(socketId => {
        this.createPeer(socketId, false); // They initiate the call
      });
    });

    this.socket.on('signal', ({ signal, from }) => {
      const peer = this.peers.get(from);
      if (peer) {
        peer.signal(signal);
      }
    });

    this.socket.on('user-left', (socketId) => {
      console.log('👋 User left:', socketId);
      const peer = this.peers.get(socketId);
      if (peer) {
        peer.destroy();
        this.peers.delete(socketId);
      }
      if (this.onUserLeft) {
        this.onUserLeft(socketId);
      }
    });

    this.socket.on('host-changed', ({ newHostId }) => {
      this.isHost = newHostId === this.socket.id;
      if (this.onHostChanged) {
        this.onHostChanged(newHostId);
      }
    });

    this.socket.on('file-shared', (fileData) => {
      if (this.onFileShared) {
        this.onFileShared(fileData);
      }
    });
  }

  // Join a session
  async joinSession(sessionId, userId, userName) {
    this.sessionId = sessionId;
    this.userId = userId;
    this.userName = userName;
    this.isHost = true; // Will be updated by server if needed

    // Always ensure we have a stream (even if silent) for peer connections
    if (!this.localStream) {
      this.getDummyStream();
    }

    if (this.socket) {
      this.socket.emit('join-session', { sessionId, userId, userName });
    }
  }

  // Create a silent audio stream (for when user doesn't want mic)
  createSilentAudioStream() {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const destination = audioContext.createMediaStreamDestination();
      const oscillator = audioContext.createOscillator();
      oscillator.frequency.value = 0; // Silent
      oscillator.connect(destination);
      oscillator.start();
      
      const stream = destination.stream;
      console.log('🔇 Silent stream created with tracks:', stream.getTracks().length);
      return stream;
    } catch (error) {
      console.error('Failed to create silent audio stream:', error);
      // Return null so we can handle it
      return null;
    }
  }

  // Get user media (camera/microphone)
  async getUserMedia(constraints = { video: true, audio: true }) {
    try {
      // Replace dummy stream with real media
      const newStream = await navigator.mediaDevices.getUserMedia(constraints);
      
      // If we had a dummy stream, replace it
      if (this.localStream) {
        this.localStream.getTracks().forEach(track => track.stop());
      }
      
      this.localStream = newStream;
      
      // Update all existing peer connections with the new stream
      this.addStreamToPeers(newStream);
      
      return this.localStream;
    } catch (error) {
      console.error('Error accessing media devices:', error);
      throw error;
    }
  }
  
  // Get a dummy stream (silent audio) for peer connections when user has no media
  getDummyStream() {
    if (!this.localStream) {
      console.log('🔇 Creating silent audio stream for peer connections');
      
      const silentStream = this.createSilentAudioStream();
      
      if (silentStream && silentStream.getTracks().length > 0) {
        this.localStream = silentStream;
        console.log('✅ Dummy stream created with', silentStream.getTracks().length, 'tracks');
      } else {
        console.warn('⚠️ Silent stream failed, creating empty MediaStream');
        this.localStream = new MediaStream();
      }
    }
    return this.localStream;
  }

  // Create a peer connection
  createPeer(socketId, initiator) {
    console.log('🔗 Creating peer connection:', { socketId, initiator, hasStream: !!this.localStream });
    
    // Check if Peer is available
    if (typeof Peer === 'undefined') {
      console.error('❌ Peer library not loaded!');
      return null;
    }
    
    // CRITICAL: Don't create peer without a valid stream
    if (!this.localStream) {
      console.error('❌ Cannot create peer without local stream!');
      console.log('🔄 Attempting to create dummy stream...');
      this.getDummyStream();
      
      if (!this.localStream) {
        console.error('❌ Still no stream after getDummyStream!');
        return null;
      }
    }
    
    // Validate stream is actually a MediaStream with the required methods
    if (!(this.localStream instanceof MediaStream)) {
      console.error('❌ localStream is not a MediaStream!', typeof this.localStream);
      return null;
    }
    
    if (typeof this.localStream.getTracks !== 'function') {
      console.error('❌ localStream does not have getTracks method!');
      return null;
    }
    
    // Free STUN servers + Metered TURN (you can add your own)
    const iceServers = [
      { urls: 'stun:stun.l.google.com:19302' },
      { urls: 'stun:stun1.l.google.com:19302' },
      { urls: 'stun:stun2.l.google.com:19302' },
      // Add Metered TURN servers (free tier)
      {
        urls: 'turn:a.relay.metered.ca:80',
        username: 'openrelayproject',
        credential: 'openrelayproject'
      },
      {
        urls: 'turn:a.relay.metered.ca:443',
        username: 'openrelayproject',
        credential: 'openrelayproject'
      }
    ];

    const peerConfig = {
      initiator,
      trickle: false,
      config: {
        iceServers
      }
    };

    // Validate stream before adding to peer config
    if (this.localStream && this.localStream instanceof MediaStream) {
      peerConfig.stream = this.localStream;
      console.log('✅ Adding stream to peer config:', {
        hasAudio: this.localStream.getAudioTracks().length > 0,
        hasVideo: this.localStream.getVideoTracks().length > 0
      });
    } else {
      console.warn('⚠️ No valid stream available, peer will be created without stream');
    }

    let peer;
    try {
      peer = new Peer(peerConfig);
    } catch (error) {
      console.error('❌ Failed to create peer:', error);
      console.log('Stream info:', {
        exists: !!this.localStream,
        type: this.localStream?.constructor?.name,
        tracks: this.localStream?.getTracks?.()?.length
      });
      console.log('💡 Tip: Make sure microphone is enabled in setup page');
      // Show user-friendly message
      if (typeof window !== 'undefined' && this.onConnectionError) {
        this.onConnectionError('Connection failed. Please refresh and ensure microphone is enabled.');
      }
      return null;
    }

    peer.on('signal', (signal) => {
      this.socket.emit('signal', {
        to: socketId,
        signal,
        from: this.socket.id
      });
    });

    peer.on('stream', (stream) => {
      console.log('📹 Received stream from:', socketId);
      if (this.onStreamReceived) {
        this.onStreamReceived(socketId, stream);
      }
    });

    peer.on('error', (error) => {
      console.error('❌ Peer error:', error);
    });

    peer.on('close', () => {
      console.log('🔌 Peer connection closed:', socketId);
    });

    this.peers.set(socketId, peer);
    return peer;
  }

  // Add stream to all existing peers
  addStreamToPeers(stream) {
    console.log('📤 Adding stream to', this.peers.size, 'peers');
    this.peers.forEach((peer) => {
      try {
        peer.addStream(stream);
      } catch (error) {
        console.error('Error adding stream to peer:', error);
      }
    });
  }

  // Toggle microphone
  toggleMicrophone() {
    if (this.localStream) {
      const audioTrack = this.localStream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        return audioTrack.enabled;
      }
    }
    return false;
  }

  // Toggle camera
  toggleCamera() {
    if (this.localStream) {
      const videoTrack = this.localStream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        return videoTrack.enabled;
      }
    }
    return false;
  }

  // Transfer host
  transferHost(newHostId) {
    if (this.isHost && this.socket) {
      this.socket.emit('transfer-host', {
        sessionId: this.sessionId,
        newHostId
      });
    }
  }

  // Share file
  shareFile(fileData) {
    if (this.socket) {
      this.socket.emit('share-file', {
        sessionId: this.sessionId,
        fileData
      });
    }
  }

  // Leave session
  leaveSession() {
    // Stop local stream
    if (this.localStream) {
      this.localStream.getTracks().forEach(track => track.stop());
      this.localStream = null;
    }

    // Close all peer connections
    this.peers.forEach(peer => peer.destroy());
    this.peers.clear();

    // Disconnect from signaling server
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }

    // Reset state
    this.sessionId = null;
    this.userId = null;
    this.userName = null;
    this.isHost = false;
  }
}

export default new WebRTCService();
