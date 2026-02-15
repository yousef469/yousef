// Speech Recognition Service - Works in all browsers including Brave
class SpeechRecognitionService {
  constructor() {
    this.isListening = false;
    this.mediaRecorder = null;
    this.audioChunks = [];
    this.onResult = null;
    this.onError = null;
    this.onStart = null;
    this.onEnd = null;
    this.stream = null;
    
    // Check if native speech recognition is available and working
    this.nativeRecognition = null;
    this.useNative = false;
    this.initNativeRecognition();
  }

  initNativeRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.nativeRecognition = new SpeechRecognition();
      this.nativeRecognition.continuous = false;
      this.nativeRecognition.interimResults = true;
      this.nativeRecognition.lang = 'en-US';

      this.nativeRecognition.onstart = () => {
        this.isListening = true;
        if (this.onStart) this.onStart();
      };

      this.nativeRecognition.onresult = (event) => {
        let finalTranscript = '';
        let interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }
        if (this.onResult) {
          this.onResult({ final: finalTranscript, interim: interimTranscript, isFinal: finalTranscript.length > 0 });
        }
      };

      this.nativeRecognition.onerror = (event) => {
        this.isListening = false;
        // If network error, fall back to Gemini-based recognition
        if (event.error === 'network' || event.error === 'service-not-allowed') {
          this.useNative = false;
        }
        if (this.onError) {
          this.onError(this.getErrorMessage(event.error));
        }
      };

      this.nativeRecognition.onend = () => {
        this.isListening = false;
        if (this.onEnd) this.onEnd();
      };
    }
  }

  getErrorMessage(error) {
    const messages = {
      'no-speech': 'No speech detected. Try again.',
      'audio-capture': 'Microphone not accessible.',
      'not-allowed': 'Microphone permission denied.',
      'network': 'Voice recognition unavailable. Recording audio instead...',
      'service-not-allowed': 'Speech service blocked by browser.',
      'aborted': 'Stopped.'
    };
    return messages[error] || `Error: ${error}`;
  }

  getIsSupported() {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
  }

  getIsListening() {
    return this.isListening;
  }

  async startListening() {
    if (this.isListening) return;

    // Try native first (works in Chrome/Edge)
    if (this.nativeRecognition && this.useNative !== false) {
      try {
        this.useNative = true;
        this.nativeRecognition.start();
        return;
      } catch (e) {
        this.useNative = false;
      }
    }

    // Fallback: Record audio and transcribe with Gemini
    await this.startRecording();
  }

  async startRecording() {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.audioChunks = [];
      
      this.mediaRecorder = new MediaRecorder(this.stream, { mimeType: 'audio/webm' });
      
      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.audioChunks.push(event.data);
        }
      };

      this.mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
        await this.transcribeWithGemini(audioBlob);
      };

      this.mediaRecorder.start();
      this.isListening = true;
      if (this.onStart) this.onStart();
      
      // Auto-stop after 10 seconds max
      setTimeout(() => {
        if (this.isListening && this.mediaRecorder?.state === 'recording') {
          this.stopListening();
        }
      }, 10000);

    } catch (error) {
      if (this.onError) this.onError('Microphone access denied');
    }
  }

  async transcribeWithGemini(audioBlob) {
    try {
      if (this.onResult) {
        this.onResult({ final: '', interim: 'Transcribing...', isFinal: false });
      }

      const { GoogleGenerativeAI } = await import('@google/generative-ai');
      const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
      
      if (!API_KEY) {
        throw new Error('API key not configured');
      }

      // Convert blob to base64
      const base64Audio = await this.blobToBase64(audioBlob);
      
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

      const result = await model.generateContent([
        {
          inlineData: {
            mimeType: 'audio/webm',
            data: base64Audio
          }
        },
        'Transcribe this audio to text. Return ONLY the transcribed text, nothing else. If no speech is detected, return "NO_SPEECH".'
      ]);

      const text = result.response.text().trim();
      
      if (text === 'NO_SPEECH' || text === '') {
        if (this.onError) this.onError('No speech detected. Try again.');
      } else {
        if (this.onResult) {
          this.onResult({ final: text, interim: '', isFinal: true });
        }
      }
    } catch (error) {
      if (this.onError) this.onError('Failed to transcribe. Try again.');
    } finally {
      if (this.onEnd) this.onEnd();
    }
  }

  blobToBase64(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  stopListening() {
    if (this.useNative && this.nativeRecognition) {
      try { this.nativeRecognition.stop(); } catch (e) {}
    }
    
    if (this.mediaRecorder && this.mediaRecorder.state === 'recording') {
      this.mediaRecorder.stop();
    }
    
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
    
    this.isListening = false;
  }

  setOnResult(cb) { this.onResult = cb; }
  setOnError(cb) { this.onError = cb; }
  setOnStart(cb) { this.onStart = cb; }
  setOnEnd(cb) { this.onEnd = cb; }
}

const speechRecognitionService = new SpeechRecognitionService();
export default speechRecognitionService;

export const requestMicrophonePermission = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    stream.getTracks().forEach(track => track.stop());
    return true;
  } catch (error) {
    return false;
  }
};
