// Text-to-Speech Service - Edge TTS (high quality) with browser fallback
class TextToSpeechService {
  constructor() {
    this.isSpeaking = false;
    this.isPaused = false;
    this.audio = null;
    this.onStart = null;
    this.onEnd = null;
    this.onPause = null;
    this.onResume = null;
    this.onProgress = null;
    this.voices = [];
    this.browserVoice = null;

    // TikTok TTS voices (free, good quality)
    this.edgeVoices = [
      { id: 'en_us_001', name: 'Jessie (US Female) ⭐' },
      { id: 'en_us_006', name: 'Joey (US Male)' },
      { id: 'en_us_007', name: 'Professor (US Male)' },
      { id: 'en_us_009', name: 'Scientist (US Male)' },
      { id: 'en_us_010', name: 'Confident (US Female)' },
      { id: 'en_uk_001', name: 'UK Male' },
      { id: 'en_au_001', name: 'Metro (AU Female)' },
      { id: 'en_au_002', name: 'Smooth (AU Male)' },
    ];
    this.selectedVoice = 'en_us_001';
    
    this.loadBrowserVoices();
  }

  loadBrowserVoices() {
    const load = () => {
      this.voices = window.speechSynthesis?.getVoices() || [];
      const priorities = ['Google UK English Female', 'Google US English', 'Samantha'];
      for (const name of priorities) {
        const v = this.voices.find((voice) => voice.name.includes(name));
        if (v) { this.browserVoice = v; break; }
      }
      if (!this.browserVoice) {
        this.browserVoice = this.voices.find((v) => v.lang.startsWith('en')) || this.voices[0];
      }
    };
    load();
    window.speechSynthesis?.addEventListener('voiceschanged', load);
  }

  getAvailableVoices() {
    return this.edgeVoices;
  }

  setVoice(voiceId) {
    this.selectedVoice = voiceId;
  }

  cleanText(text) {
    return text
      .replace(/#{1,6}\s*/g, '')
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\*(.*?)\*/g, '$1')
      .replace(/`(.*?)`/g, '$1')
      .replace(/\[(.*?)\]\(.*?\)/g, '$1')
      .replace(/[🚀✈️🎯💡🔢📊🌍⚡🏗️✓•→←↑↓🎧✨]/g, '')
      .replace(/\n+/g, '. ')
      .replace(/\s{2,}/g, ' ')
      .trim();
  }

  extractLessonText(lessonData) {
    const parts = [];
    if (lessonData.title) parts.push(lessonData.title);
    if (lessonData.introduction) parts.push(lessonData.introduction);
    const sections = lessonData.sections || lessonData.content?.sections || [];
    sections.forEach((s) => {
      if (s.title) parts.push(s.title);
      if (s.content) parts.push(s.content);
    });
    const takeaways = lessonData.keyTakeaways || lessonData.content?.keyTakeaways || [];
    if (takeaways.length) {
      parts.push('Key Takeaways');
      takeaways.forEach((t, i) => parts.push(`${i + 1}. ${t}`));
    }
    return this.cleanText(parts.join('. '));
  }

  // Use backend Edge TTS (high quality)
  async speakWithEdgeTTS(text) {
    // Use TTS server URL (Python Edge TTS service)
    const serverUrl = import.meta.env.VITE_SERVER_URL || 'https://engineeruim.onrender.com';
    
    const response = await fetch(`${serverUrl}/api/tts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: text.slice(0, 5000), voice: this.selectedVoice }),
    });

    if (!response.ok) throw new Error('TTS failed');

    const audioBlob = await response.blob();
    const audioUrl = URL.createObjectURL(audioBlob);

    return new Promise((resolve, reject) => {
      this.audio = new Audio(audioUrl);
      
      this.audio.onplay = () => {
        this.isSpeaking = true;
        this.isPaused = false;
        if (this.onStart) this.onStart();
      };
      
      this.audio.onended = () => {
        this.isSpeaking = false;
        URL.revokeObjectURL(audioUrl);
        if (this.onEnd) this.onEnd();
        resolve();
      };
      
      this.audio.onerror = () => reject(new Error('Audio error'));
      
      this.audio.ontimeupdate = () => {
        if (this.audio.duration && this.onProgress) {
          this.onProgress((this.audio.currentTime / this.audio.duration) * 100);
        }
      };
      
      this.audio.play();
    });
  }

  // Browser fallback
  speakWithBrowser(text) {
    return new Promise((resolve) => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = this.browserVoice;
      utterance.rate = 0.95;
      
      utterance.onstart = () => {
        this.isSpeaking = true;
        if (this.onStart) this.onStart();
      };
      
      utterance.onend = () => {
        this.isSpeaking = false;
        if (this.onEnd) this.onEnd();
        resolve();
      };
      
      window.speechSynthesis.speak(utterance);
    });
  }

  async speak(text) {
    this.stop();
    
    try {
      await this.speakWithEdgeTTS(text);
    } catch (error) {
      console.warn('Edge TTS failed, using browser:', error.message);
      await this.speakWithBrowser(text);
    }
  }

  async speakLesson(lessonData) {
    const text = this.extractLessonText(lessonData);
    await this.speak(text);
  }

  pause() {
    if (this.audio) {
      this.audio.pause();
      this.isPaused = true;
      if (this.onPause) this.onPause();
    } else if (window.speechSynthesis) {
      window.speechSynthesis.pause();
      this.isPaused = true;
    }
  }

  resume() {
    if (this.audio && this.isPaused) {
      this.audio.play();
      this.isPaused = false;
      if (this.onResume) this.onResume();
    } else if (window.speechSynthesis) {
      window.speechSynthesis.resume();
      this.isPaused = false;
    }
  }

  stop() {
    if (this.audio) {
      this.audio.pause();
      this.audio = null;
    }
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    this.isSpeaking = false;
    this.isPaused = false;
  }

  getIsSpeaking() { return this.isSpeaking; }
  getIsPaused() { return this.isPaused; }

  setOnStart(cb) { this.onStart = cb; }
  setOnEnd(cb) { this.onEnd = cb; }
  setOnPause(cb) { this.onPause = cb; }
  setOnResume(cb) { this.onResume = cb; }
  setOnProgress(cb) { this.onProgress = cb; }
}

const textToSpeechService = new TextToSpeechService();
export default textToSpeechService;
