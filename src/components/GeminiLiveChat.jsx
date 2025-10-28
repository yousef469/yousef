import { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';

const API_KEY = 'AIzaSyAyc8h7rPTKJ9UM5GF4div6iLgZ_dQ5CNw';

export default function GeminiLiveChat() {
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isAISpeaking, setIsAISpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState('');
  
  const wsRef = useRef(null);
  const audioContextRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const processorRef = useRef(null);
  const audioQueueRef = useRef([]);
  const isPlayingRef = useRef(false);

  // Initialize audio context
  const initAudioContext = async () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)({
        sampleRate: 16000
      });
    }
    
    if (audioContextRef.current.state === 'suspended') {
      await audioContextRef.current.resume();
    }
  };

  // Convert Float32Array to base64 PCM16
  const floatTo16BitPCM = (float32Array) => {
    const buffer = new ArrayBuffer(float32Array.length * 2);
    const view = new DataView(buffer);
    let offset = 0;
    for (let i = 0; i < float32Array.length; i++, offset += 2) {
      const s = Math.max(-1, Math.min(1, float32Array[i]));
      view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
    }
    return buffer;
  };

  // Convert base64 to audio buffer and play
  const playAudioChunk = async (base64Audio) => {
    try {
      await initAudioContext();
      
      const binaryString = atob(base64Audio);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      const audioBuffer = await audioContextRef.current.decodeAudioData(bytes.buffer);
      const source = audioContextRef.current.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContextRef.current.destination);
      
      return new Promise((resolve) => {
        source.onended = resolve;
        source.start(0);
      });
    } catch (err) {
      console.error('Error playing audio:', err);
    }
  };

  // Process audio queue
  const processAudioQueue = async () => {
    if (isPlayingRef.current || audioQueueRef.current.length === 0) return;
    
    isPlayingRef.current = true;
    setIsAISpeaking(true);
    
    while (audioQueueRef.current.length > 0) {
      const audioData = audioQueueRef.current.shift();
      await playAudioChunk(audioData);
    }
    
    isPlayingRef.current = false;
    setIsAISpeaking(false);
  };

  // Connect to Gemini Live API
  const connectToGemini = async () => {
    try {
      setError('');
      await initAudioContext();

      // Get microphone access
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          channelCount: 1,
          sampleRate: 16000,
          echoCancellation: true,
          noiseSuppression: true
        } 
      });
      mediaStreamRef.current = stream;

      // Create WebSocket connection to Gemini Live API
      const ws = new WebSocket(
        `wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1alpha.GenerativeService.BidiGenerateContent?key=${API_KEY}`
      );

      ws.onopen = () => {
        console.log('🎤 Connected to Gemini Live');
        setIsConnected(true);
        
        // Send setup message
        ws.send(JSON.stringify({
          setup: {
            model: 'models/gemini-2.0-flash-exp',
            generation_config: {
              response_modalities: ['AUDIO'],
              speech_config: {
                voice_config: {
                  prebuilt_voice_config: {
                    voice_name: 'Puck'
                  }
                }
              }
            },
            system_instruction: {
              parts: [{
                text: `You are an expert aerospace and automotive engineering tutor. 
Help students understand rockets, planes, cars, and engineering principles.
Provide clear, concise explanations with real-world examples.
Keep responses brief (2-3 sentences) for voice conversation.`
              }]
            }
          }
        }));

        // Setup audio processing
        const source = audioContextRef.current.createMediaStreamSource(stream);
        const processor = audioContextRef.current.createScriptProcessor(4096, 1, 1);
        
        processor.onaudioprocess = (e) => {
          if (!isSpeaking || ws.readyState !== WebSocket.OPEN) return;
          
          const inputData = e.inputBuffer.getChannelData(0);
          const pcm16 = floatTo16BitPCM(inputData);
          const base64Audio = btoa(String.fromCharCode(...new Uint8Array(pcm16)));
          
          ws.send(JSON.stringify({
            realtime_input: {
              media_chunks: [{
                data: base64Audio,
                mime_type: 'audio/pcm'
              }]
            }
          }));
        };

        source.connect(processor);
        processor.connect(audioContextRef.current.destination);
        processorRef.current = processor;
      };

      ws.onmessage = async (event) => {
        try {
          const response = JSON.parse(event.data);
          
          // Handle setup complete
          if (response.setupComplete) {
            console.log('✅ Setup complete');
          }
          
          // Handle server content (audio response)
          if (response.serverContent) {
            const parts = response.serverContent.modelTurn?.parts || [];
            
            for (const part of parts) {
              // Handle text transcript
              if (part.text) {
                setTranscript(prev => prev + ' ' + part.text);
              }
              
              // Handle audio data
              if (part.inlineData?.data) {
                audioQueueRef.current.push(part.inlineData.data);
                processAudioQueue();
              }
            }
          }

          // Handle turn complete
          if (response.serverContent?.turnComplete) {
            console.log('🔄 Turn complete');
          }

        } catch (err) {
          console.error('Error processing message:', err);
        }
      };

      ws.onerror = (err) => {
        console.error('WebSocket error:', err);
        setError('Connection error. Please try again.');
        setIsConnected(false);
      };

      ws.onclose = () => {
        console.log('🔌 Disconnected from Gemini Live');
        setIsConnected(false);
        setIsSpeaking(false);
      };

      wsRef.current = ws;

    } catch (err) {
      console.error('Error connecting:', err);
      setError(err.message || 'Failed to connect. Please check microphone permissions.');
    }
  };

  // Disconnect
  const disconnect = () => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
    
    if (processorRef.current) {
      processorRef.current.disconnect();
      processorRef.current = null;
    }
    
    setIsConnected(false);
    setIsSpeaking(false);
    setTranscript('');
  };

  // Toggle speaking
  const toggleSpeaking = () => {
    if (!isConnected) {
      connectToGemini();
    } else {
      setIsSpeaking(!isSpeaking);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      disconnect();
    };
  }, []);

  return (
    <div className="flex flex-col gap-3">
      {/* Connection Status */}
      {isConnected && (
        <div className="flex items-center gap-2 text-xs">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-gray-400">Connected to Gemini Live</span>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* Voice Button */}
      <button
        onClick={toggleSpeaking}
        className={`relative p-4 rounded-full transition-all ${
          isSpeaking
            ? 'bg-gradient-to-r from-red-500 to-pink-500 animate-pulse'
            : isConnected
            ? 'bg-gradient-to-r from-green-500 to-emerald-600'
            : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700'
        }`}
        title={
          !isConnected 
            ? 'Start Live Chat' 
            : isSpeaking 
            ? 'Stop Speaking' 
            : 'Start Speaking'
        }
      >
        {isSpeaking ? (
          <MicOff className="w-6 h-6 text-white" />
        ) : (
          <Mic className="w-6 h-6 text-white" />
        )}

        {/* Speaking Animation */}
        {isSpeaking && (
          <>
            <div className="absolute inset-0 rounded-full bg-red-400 animate-ping opacity-75" />
            <div className="absolute inset-0 rounded-full bg-red-400 animate-pulse opacity-50" />
          </>
        )}
      </button>

      {/* AI Speaking Indicator */}
      {isAISpeaking && (
        <div className="flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
          <Volume2 className="w-4 h-4 text-blue-400 animate-pulse" />
          <span className="text-sm text-blue-400">AI is speaking...</span>
        </div>
      )}

      {/* Live Transcript */}
      {transcript && (
        <div className="bg-gray-800 border border-cyan-400 rounded-lg p-3 max-h-32 overflow-y-auto">
          <div className="text-xs text-gray-400 mb-1">Transcript:</div>
          <p className="text-sm text-white">{transcript}</p>
        </div>
      )}

      {/* Instructions */}
      {!isConnected && (
        <div className="text-xs text-gray-500 text-center">
          Click to start live voice conversation with AI
        </div>
      )}

      {/* Disconnect Button */}
      {isConnected && (
        <button
          onClick={disconnect}
          className="text-xs text-red-400 hover:text-red-300 transition-colors"
        >
          Disconnect
        </button>
      )}
    </div>
  );
}
