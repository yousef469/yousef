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
// GEMINI API PROXY (Secure - Key Hidden)
// ============================================

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  console.error('❌ GEMINI_API_KEY not found in environment variables!');
}

// Proxy for Gemini Vision API (with images)
app.post('/api/gemini/vision', async (req, res) => {
  try {
    const { prompt, images, maxTokens = 256, retries = 5 } = req.body;

    if (!prompt || !images || !Array.isArray(images)) {
      return res.status(400).json({ 
        error: 'Missing required fields: prompt, images' 
      });
    }

    console.log(`🔮 Gemini Vision request: ${images.length} images, maxTokens: ${maxTokens}`);

    // Retry logic with exponential backoff
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [
                { parts: [{ text: prompt }] },
                { parts: images.map(img => ({ inline_data: img })) }
              ],
              generationConfig: {
                maxOutputTokens: maxTokens,
                temperature: 0.1,
                topP: 0.8
              }
            })
          }
        );

        // Handle 5xx errors with retry
        if (response.status >= 500) {
          console.warn(`⚠️ Gemini overloaded (${response.status}). Retry ${attempt}/${retries}...`);
          if (attempt < retries) {
            await new Promise(r => setTimeout(r, attempt * 1000));
            continue;
          }
        }

        if (!response.ok) {
          const errorText = await response.text();
          return res.status(response.status).json({ 
            error: `Gemini API error: ${response.status}`,
            details: errorText
          });
        }

        const data = await response.json();
        
        // Check for MAX_TOKENS or empty response
        const candidate = data.candidates?.[0];
        const finishReason = candidate?.finishReason;
        const text = candidate?.content?.parts?.[0]?.text;

        if (finishReason === 'MAX_TOKENS') {
          console.warn(`⚠️ MAX_TOKENS on attempt ${attempt}. Retrying...`);
          if (attempt < retries) {
            await new Promise(r => setTimeout(r, attempt * 1000));
            continue;
          }
        }

        if (!text || text.trim().length === 0) {
          console.warn(`⚠️ Empty response on attempt ${attempt}. Retrying...`);
          if (attempt < retries) {
            await new Promise(r => setTimeout(r, attempt * 1000));
            continue;
          }
        }

        console.log(`✅ Gemini Vision success on attempt ${attempt}`);
        
        // Return both the full response AND extracted text for convenience
        return res.json({
          ...data,
          text: text  // Add extracted text at top level for easy access
        });

      } catch (err) {
        console.warn(`⚠️ Attempt ${attempt} failed:`, err.message);
        if (attempt < retries) {
          await new Promise(r => setTimeout(r, attempt * 1000));
        }
      }
    }

    return res.status(500).json({ 
      error: 'Gemini Vision failed after all retries' 
    });

  } catch (error) {
    console.error('❌ Gemini Vision proxy error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Proxy for Gemini Text API (no images)
app.post('/api/gemini/text', async (req, res) => {
  try {
    const { prompt, maxTokens = 256, retries = 4 } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Missing required field: prompt' });
    }

    console.log(`💬 Gemini Text request: ${prompt.substring(0, 50)}...`);

    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{
                parts: [{ text: prompt }]
              }],
              generationConfig: {
                maxOutputTokens: maxTokens,
                temperature: 0.1,
                topP: 0.8
              }
            })
          }
        );

        if (response.status >= 500 && attempt < retries) {
          console.warn(`⚠️ Retry ${attempt}/${retries}...`);
          await new Promise(r => setTimeout(r, attempt * 1000));
          continue;
        }

        if (!response.ok) {
          const errorText = await response.text();
          return res.status(response.status).json({ 
            error: `Gemini API error: ${response.status}`,
            details: errorText
          });
        }

        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!text) {
          throw new Error('No text in response');
        }

        console.log(`✅ Gemini Text success`);
        
        // Return both the full response AND extracted text for convenience
        return res.json({
          ...data,
          text: text  // Add extracted text at top level for easy access
        });

      } catch (err) {
        console.warn(`⚠️ Attempt ${attempt} failed:`, err.message);
        if (attempt < retries) {
          await new Promise(r => setTimeout(r, attempt * 1000));
        }
      }
    }

    return res.status(500).json({ 
      error: 'Gemini Text failed after all retries' 
    });

  } catch (error) {
    console.error('❌ Gemini Text proxy error:', error);
    res.status(500).json({ error: error.message });
  }
});

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [
      'https://engineeruim.vercel.app', 
      'https://www.engineeruim.com', 
      'https://engineerium.vercel.app',
      'https://yousef-one.vercel.app',
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
