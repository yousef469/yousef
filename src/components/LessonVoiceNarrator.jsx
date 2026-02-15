import { useState, useEffect } from 'react';
import { Volume2, VolumeX, Pause, Play, Settings, X, Sparkles } from 'lucide-react';
import textToSpeechService from '../services/textToSpeech';

export default function LessonVoiceNarrator({ lessonData }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState('en-US-JennyNeural');
  const [voices, setVoices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const availableVoices = textToSpeechService.getAvailableVoices();
    setVoices(availableVoices);

    textToSpeechService.setOnStart(() => {
      setIsPlaying(true);
      setIsPaused(false);
      setIsLoading(false);
    });

    textToSpeechService.setOnEnd(() => {
      setIsPlaying(false);
      setIsPaused(false);
      setProgress(0);
    });

    textToSpeechService.setOnPause(() => setIsPaused(true));
    textToSpeechService.setOnResume(() => setIsPaused(false));
    textToSpeechService.setOnProgress((p) => setProgress(p));

    return () => textToSpeechService.stop();
  }, []);

  const handlePlay = async () => {
    setError('');

    if (isPlaying && !isPaused) {
      textToSpeechService.pause();
    } else if (isPaused) {
      textToSpeechService.resume();
    } else {
      try {
        setIsLoading(true);
        textToSpeechService.setVoice(selectedVoice);
        await textToSpeechService.speakLesson(lessonData);
      } catch (err) {
        setError('Voice unavailable. Using browser voice.');
        setIsLoading(false);
      }
    }
  };

  const handleStop = () => {
    textToSpeechService.stop();
    setIsPlaying(false);
    setIsPaused(false);
    setProgress(0);
    setIsLoading(false);
  };

  if (!window.speechSynthesis) return null;

  return (
    <div className="relative">
      <div className="flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-3">
        <button
          onClick={handlePlay}
          disabled={isLoading}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
            isLoading
              ? 'bg-gray-600 text-gray-300 cursor-wait'
              : isPlaying && !isPaused
                ? 'bg-purple-500 text-white'
                : 'bg-gray-700 hover:bg-gray-600 text-white'
          }`}
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Loading...</span>
            </>
          ) : isPlaying && !isPaused ? (
            <>
              <Pause className="w-5 h-5" />
              <span>Pause</span>
            </>
          ) : isPaused ? (
            <>
              <Play className="w-5 h-5" />
              <span>Resume</span>
            </>
          ) : (
            <>
              <Volume2 className="w-5 h-5" />
              <span>🎧 Listen to Lesson</span>
            </>
          )}
        </button>

        {isPlaying && (
          <button
            onClick={handleStop}
            className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors"
          >
            <VolumeX className="w-5 h-5" />
          </button>
        )}

        <button
          onClick={() => setShowSettings(!showSettings)}
          className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
        >
          <Settings className="w-5 h-5" />
        </button>

        {isPlaying && (
          <div className="flex-1 ml-2">
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {!isPlaying && (
          <span className="flex items-center gap-1 text-xs text-purple-300 ml-2">
            <Sparkles className="w-3 h-3" />
            AI Voice (Free)
          </span>
        )}
      </div>

      {error && (
        <div className="mt-2 p-2 bg-yellow-500/20 border border-yellow-500/30 rounded-lg text-yellow-300 text-sm">
          {error}
        </div>
      )}

      {showSettings && (
        <div className="absolute top-full left-0 mt-2 w-80 bg-gray-800 border border-gray-700 rounded-xl p-4 shadow-xl z-20">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-white flex items-center gap-2">
              Voice Settings
              <span className="text-xs bg-green-500/30 text-green-300 px-2 py-0.5 rounded">
                FREE
              </span>
            </h4>
            <button
              onClick={() => setShowSettings(false)}
              className="text-gray-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="mb-3">
            <label className="text-sm text-gray-400 mb-2 block">Voice</label>
            <select
              value={selectedVoice}
              onChange={(e) => {
                setSelectedVoice(e.target.value);
                textToSpeechService.setVoice(e.target.value);
              }}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white text-sm"
            >
              {voices.map((voice) => (
                <option key={voice.id} value={voice.id}>
                  {voice.name}
                </option>
              ))}
            </select>
          </div>

          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
            <div className="flex items-center gap-2 text-green-300 text-sm mb-1">
              <Sparkles className="w-4 h-4" />
              <span className="font-medium">Microsoft Neural Voices</span>
            </div>
            <p className="text-xs text-gray-400">
              Human-like AI voices powered by Microsoft Edge TTS. Completely free
              with unlimited usage!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
