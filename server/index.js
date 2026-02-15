// WebRTC Signaling Server for Engineerium
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' })); // Support large image payloads

const sessions = new Map(); // sessionId -> Set of socket IDs
const userInfo = new Map(); // socketId -> {userId, userName}

// Health check endpoints for deployment platforms
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Engineerium WebRTC Signaling Server',
    timestamp: new Date().toISOString(),
    activeSessions: sessions.size
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', uptime: process.uptime() });
});

// ============================================
// GEMINI API ENDPOINTS - ENGO BOT ONLY
// ============================================

// Gemini Text API (for Engo Bot)
app.post('/api/gemini/text', async (req, res) => {
  try {
    const { prompt, maxTokens = 1024 } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Missing prompt' });
    }

    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    if (!GEMINI_API_KEY) {
      console.error('❌ GEMINI_API_KEY not set in environment variables!');
      return res.status(500).json({ error: 'API key not configured on server' });
    }

    console.log(`💬 Engo Bot request: ${maxTokens} tokens`);

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            role: 'user',
            parts: [{ text: prompt }]
          }],
          generationConfig: {
            maxOutputTokens: maxTokens,
            temperature: 0.7
          }
        })
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Gemini API Error:', response.status, errorText);
      return res.status(response.status).json({
        error: `Gemini API Failed: ${response.status}`,
        details: errorText
      });
    }

    const data = await response.json();

    // Return the full response structure that frontend expects
    console.log('✅ Engo Bot response sent');
    return res.json(data);

  } catch (error) {
    console.error('❌ Text API Error:', error);
    return res.status(500).json({ error: error.message });
  }
});

// Gemini Vision API (for 3D analysis / screenshots)
app.post('/api/gemini/vision', async (req, res) => {
  try {
    const { prompt, images, maxTokens = 1024 } = req.body;

    if (!prompt || !images || !images.length) {
      return res.status(400).json({ error: 'Missing prompt or images' });
    }

    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    if (!GEMINI_API_KEY) {
      return res.status(500).json({ error: 'API key not configured on server' });
    }

    console.log(`👁️ Gemini Vision request: ${images.length} images`);

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            role: 'user',
            parts: [
              { text: prompt },
              ...images.map(img => ({
                inlineData: {
                  mimeType: img.mime_type,
                  data: img.data
                }
              }))
            ]
          }],
          generationConfig: {
            maxOutputTokens: maxTokens,
            temperature: 0.4
          }
        })
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({ error: errorText });
    }

    const data = await response.json();
    return res.json(data);

  } catch (error) {
    console.error('❌ Vision API Error:', error);
    return res.status(500).json({ error: error.message });
  }
});

// ============================================
// TEXT-TO-SPEECH API - TikTok TTS (Free, Human-like voices)
// ============================================

app.post('/api/tts', async (req, res) => {
  try {
    const { text, voice = 'en_us_001' } = req.body;

    if (!text) {
      return res.status(400).json({ error: 'Missing text' });
    }

    console.log(`🎤 TTS request: ${text.length} chars, voice: ${voice}`);

    // TikTok TTS API - free, high quality, human-like voices
    // Voices: en_us_001 (female), en_us_006 (male), en_us_007 (male), en_us_009 (male), en_us_010 (female)
    // en_uk_001 (UK male), en_au_001 (AU female), en_au_002 (AU male)
    const ttsUrl = 'https://tiktok-tts.weilnet.workers.dev/api/generation';

    const response = await fetch(ttsUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: text.slice(0, 300),
        voice: voice
      })
    });

    if (!response.ok) {
      throw new Error('TikTok TTS failed');
    }

    const data = await response.json();

    if (!data.data) {
      throw new Error('No audio data');
    }

    // Convert base64 to buffer
    const audioBuffer = Buffer.from(data.data, 'base64');

    res.set({
      'Content-Type': 'audio/mpeg',
      'Content-Length': audioBuffer.length
    });
    res.send(audioBuffer);

    console.log('✅ TTS audio sent');
  } catch (error) {
    console.error('❌ TTS Error:', error.message);
    return res.status(500).json({ error: error.message });
  }
});

// ============================================

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [
      'https://engineeruim.vercel.app',
      'https://engineeruim-eight.vercel.app',
      'https://www.engineeruim.com',
      'https://engineerium.vercel.app',
      'http://localhost:3000',
      /\.vercel\.app$/ // Allow all Vercel preview deployments
    ],
    methods: ["GET", "POST"],
    credentials: true
  }
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Join a session
  socket.on('join-session', ({ sessionId, userId, userName }) => {
    socket.join(sessionId);

    // Store user info
    userInfo.set(socket.id, { userId, userName });

    if (!sessions.has(sessionId)) {
      sessions.set(sessionId, new Set());
    }
    sessions.get(sessionId).add(socket.id);

    // Notify others in the session
    socket.to(sessionId).emit('user-joined', {
      socketId: socket.id,
      userId,
      userName
    });

    // Send list of existing users with their info to the new user
    const existingUsers = Array.from(sessions.get(sessionId))
      .filter(id => id !== socket.id)
      .map(id => ({
        socketId: id,
        ...userInfo.get(id)
      }));
    socket.emit('existing-users', existingUsers);

    console.log(`User ${userName} joined session ${sessionId}`);
  });

  // WebRTC signaling
  socket.on('signal', ({ to, signal, from }) => {
    io.to(to).emit('signal', { signal, from });
  });

  // Host transfer
  socket.on('transfer-host', ({ sessionId, newHostId }) => {
    io.to(sessionId).emit('host-changed', { newHostId });
  });

  // File sharing
  socket.on('share-file', ({ sessionId, fileData }) => {
    socket.to(sessionId).emit('file-shared', fileData);
  });

  // Disconnect
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);

    // Remove user info
    userInfo.delete(socket.id);

    // Remove from all sessions
    sessions.forEach((users, sessionId) => {
      if (users.has(socket.id)) {
        users.delete(socket.id);
        socket.to(sessionId).emit('user-left', socket.id);

        // Clean up empty sessions
        if (users.size === 0) {
          sessions.delete(sessionId);
        }
      }
    });
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`🚀 Signaling server running on port ${PORT}`);
});
