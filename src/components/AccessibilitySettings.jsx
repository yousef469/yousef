import { useState, useEffect } from 'react';
import { Settings, Eye, Zap, Contrast } from 'lucide-react';

export default function AccessibilitySettings() {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState({
    reducedMotion: false,
    highContrast: false,
    largeText: false,
    keyboardNav: true
  });

  useEffect(() => {
    // Load saved settings
    const saved = localStorage.getItem('accessibilitySettings');
    if (saved) {
      setSettings(JSON.parse(saved));
    }

    // Check system preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const prefersHighContrast = window.matchMedia('(prefers-contrast: high)').matches;
    
    if (prefersReducedMotion || prefersHighContrast) {
      setSettings(prev => ({
        ...prev,
        reducedMotion: prefersReducedMotion,
        highContrast: prefersHighContrast
      }));
    }
  }, []);

  useEffect(() => {
    // Apply settings
    const root = document.documentElement;
    
    if (settings.reducedMotion) {
      root.style.setProperty('--animation-duration', '0.01ms');
      document.body.classList.add('reduce-motion');
    } else {
      root.style.removeProperty('--animation-duration');
      document.body.classList.remove('reduce-motion');
    }

    if (settings.highContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }

    if (settings.largeText) {
      root.style.fontSize = '18px';
    } else {
      root.style.fontSize = '16px';
    }

    // Save settings
    localStorage.setItem('accessibilitySettings', JSON.stringify(settings));
  }, [settings]);

  const toggleSetting = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <>
      {/* Settings Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 left-4 p-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-full shadow-lg transition-colors z-40"
        aria-label="Accessibility Settings"
        title="Accessibility Settings"
      >
        <Settings className="w-6 h-6 text-cyan-400" />
      </button>

      {/* Settings Panel */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Accessibility Settings</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              {/* Reduced Motion */}
              <div className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  <div>
                    <div className="font-semibold">Reduced Motion</div>
                    <div className="text-sm text-gray-400">Minimize animations</div>
                  </div>
                </div>
                <button
                  onClick={() => toggleSetting('reducedMotion')}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    settings.reducedMotion ? 'bg-cyan-500' : 'bg-gray-600'
                  }`}
                  role="switch"
                  aria-checked={settings.reducedMotion}
                >
                  <div
                    className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      settings.reducedMotion ? 'translate-x-6' : ''
                    }`}
                  />
                </button>
              </div>

              {/* High Contrast */}
              <div className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Contrast className="w-5 h-5 text-purple-400" />
                  <div>
                    <div className="font-semibold">High Contrast</div>
                    <div className="text-sm text-gray-400">Increase visibility</div>
                  </div>
                </div>
                <button
                  onClick={() => toggleSetting('highContrast')}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    settings.highContrast ? 'bg-cyan-500' : 'bg-gray-600'
                  }`}
                  role="switch"
                  aria-checked={settings.highContrast}
                >
                  <div
                    className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      settings.highContrast ? 'translate-x-6' : ''
                    }`}
                  />
                </button>
              </div>

              {/* Large Text */}
              <div className="flex items-center justify-between p-4 bg-gray-900/50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Eye className="w-5 h-5 text-green-400" />
                  <div>
                    <div className="font-semibold">Large Text</div>
                    <div className="text-sm text-gray-400">Increase font size</div>
                  </div>
                </div>
                <button
                  onClick={() => toggleSetting('largeText')}
                  className={`relative w-12 h-6 rounded-full transition-colors ${
                    settings.largeText ? 'bg-cyan-500' : 'bg-gray-600'
                  }`}
                  role="switch"
                  aria-checked={settings.largeText}
                >
                  <div
                    className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      settings.largeText ? 'translate-x-6' : ''
                    }`}
                  />
                </button>
              </div>
            </div>

            <div className="mt-6 p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
              <div className="text-sm text-gray-300">
                💡 These settings are saved and will persist across sessions.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Global Styles */}
      <style jsx global>{`
        .reduce-motion * {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }

        .high-contrast {
          filter: contrast(1.2);
        }

        .high-contrast button,
        .high-contrast a {
          border: 2px solid currentColor;
        }
      `}</style>
    </>
  );
}
