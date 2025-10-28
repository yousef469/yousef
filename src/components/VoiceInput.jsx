import { useState, useEffect, useRef } from 'react';
import { Mic, MicOff } from 'lucide-react';

export default function VoiceInput({ onTranscript, onSpeechEnd }) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(false);
  const recognitionRef = useRef(null);
  const silenceTimerRef = useRef(null);
  const finalTranscriptRef = useRef('');

  useEffect(() => {
    // Check if browser supports speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      setIsSupported(true);
      const recognition = new SpeechRecognition();
      
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        console.log('🎤 Voice recognition started');
        setIsListening(true);
        finalTranscriptRef.current = '';
      };

      recognition.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = 0; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }

        // Update the displayed transcript
        const fullTranscript = finalTranscript || interimTranscript;
        setTranscript(fullTranscript);
        
        if (onTranscript) {
          onTranscript(fullTranscript);
        }

        // Store final transcript
        if (finalTranscript) {
          finalTranscriptRef.current = finalTranscript;
        }

        // Clear any existing silence timer
        if (silenceTimerRef.current) {
          clearTimeout(silenceTimerRef.current);
        }

        // Set a new silence timer (2 seconds of silence = done speaking)
        silenceTimerRef.current = setTimeout(() => {
          if (recognitionRef.current && isListening) {
            console.log('🎤 Silence detected, stopping...');
            recognitionRef.current.stop();
          }
        }, 2000);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        if (silenceTimerRef.current) {
          clearTimeout(silenceTimerRef.current);
        }
        setIsListening(false);
      };

      recognition.onend = () => {
        console.log('🎤 Voice recognition ended');
        if (silenceTimerRef.current) {
          clearTimeout(silenceTimerRef.current);
        }
        setIsListening(false);
        
        const finalText = finalTranscriptRef.current || transcript;
        if (finalText && onSpeechEnd) {
          onSpeechEnd(finalText);
        }
        setTranscript('');
        finalTranscriptRef.current = '';
      };

      recognitionRef.current = recognition;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (silenceTimerRef.current) {
        clearTimeout(silenceTimerRef.current);
      }
    };
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setTranscript('');
      setIsListening(true);
      try {
        recognitionRef.current.start();
      } catch (e) {
        console.error('Could not start recognition:', e);
        setIsListening(false);
      }
    }
  };

  if (!isSupported) {
    return (
      <div className="text-xs text-gray-500 text-center p-2">
        Voice input not supported in this browser
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {/* Voice Button */}
      <button
        onClick={toggleListening}
        className={`relative p-3 rounded-full transition-all ${
          isListening
            ? 'bg-gradient-to-r from-red-500 to-pink-500 animate-pulse'
            : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700'
        }`}
        title={isListening ? 'Stop listening' : 'Start voice input'}
      >
        {isListening ? (
          <MicOff className="w-5 h-5 text-white" />
        ) : (
          <Mic className="w-5 h-5 text-white" />
        )}

        {/* Listening Animation */}
        {isListening && (
          <>
            <div className="absolute inset-0 rounded-full bg-red-400 animate-ping opacity-75" />
            <div className="absolute inset-0 rounded-full bg-red-400 animate-pulse opacity-50" />
          </>
        )}
      </button>

      {/* Live Transcript */}
      {isListening && (
        <div className="bg-gray-800 border border-cyan-400 rounded-lg p-3 animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-xs text-gray-400 uppercase tracking-wide">
              {transcript ? 'Listening... (2s silence = auto-stop)' : 'Listening... Start speaking'}
            </span>
          </div>
          {transcript && <p className="text-sm text-white">{transcript}</p>}
        </div>
      )}
    </div>
  );
}

// Export speak function for use in other components - MALE VOICE
export const speakText = (text) => {
  if ('speechSynthesis' in window) {
    // Cancel any ongoing speech
    speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 0.8; // Lower pitch for male voice
    utterance.volume = 1.0;
    utterance.lang = 'en-US';
    
    // Wait for voices to load
    const setVoice = () => {
      const voices = speechSynthesis.getVoices();
      
      // Try to find a male voice (priority order)
      const maleVoice = voices.find(voice => 
        voice.name.includes('Male') ||
        voice.name.includes('David') ||
        voice.name.includes('Mark') ||
        voice.name.includes('Google US English Male') ||
        voice.name.includes('Microsoft David') ||
        (voice.name.includes('Google') && voice.lang === 'en-US' && !voice.name.includes('Female'))
      );
      
      if (maleVoice) {
        utterance.voice = maleVoice;
        console.log('🗣️ Using male voice:', maleVoice.name);
      } else {
        // Fallback: use lower pitch with any voice
        console.log('🗣️ No male voice found, using pitch adjustment');
      }
      
      speechSynthesis.speak(utterance);
    };
    
    // Voices might not be loaded yet
    if (speechSynthesis.getVoices().length > 0) {
      setVoice();
    } else {
      speechSynthesis.onvoiceschanged = setVoice;
    }
  }
};
