import { useState, useEffect } from 'react';
import { Globe, Check, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function LanguageSelector({ isOpen, onClose, onSelect }) {
  const { i18n } = useTranslation();
  const [selectedLang, setSelectedLang] = useState(i18n.language || 'en');

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸', nativeName: 'English' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸', nativeName: 'Español' },
    { code: 'fr', name: 'French', flag: '🇫🇷', nativeName: 'Français' },
    { code: 'de', name: 'German', flag: '🇩🇪', nativeName: 'Deutsch' },
    { code: 'pt', name: 'Portuguese', flag: '🇧🇷', nativeName: 'Português' },
    { code: 'zh', name: 'Chinese', flag: '🇨🇳', nativeName: '中文' },
    { code: 'ja', name: 'Japanese', flag: '🇯🇵', nativeName: '日本語' },
    { code: 'ar', name: 'Arabic', flag: '🇸🇦', nativeName: 'العربية' },
    { code: 'hi', name: 'Hindi', flag: '🇮🇳', nativeName: 'हिन्दी' }
  ];

  const handleLanguageSelect = (langCode) => {
    setSelectedLang(langCode);
    // Change language immediately
    i18n.changeLanguage(langCode);
    localStorage.setItem('preferredLanguage', langCode);
    if (onSelect) {
      onSelect(langCode);
    }
  };

  const handleConfirm = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="bg-gray-900 border border-cyan-400 rounded-2xl max-w-2xl w-full shadow-2xl my-auto max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-700">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center flex-shrink-0">
              <Globe className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg sm:text-2xl font-bold text-white">Choose Language</h3>
              <p className="text-xs sm:text-sm text-gray-400 hidden sm:block">Select your preferred language</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors flex-shrink-0"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Language Grid */}
        <div className="p-4 sm:p-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageSelect(lang.code)}
                className={`relative p-3 sm:p-4 rounded-xl border-2 transition-all touch-ripple active:scale-95 ${
                  selectedLang === lang.code
                    ? 'border-cyan-400 bg-cyan-500/20 pulse-on-select'
                    : 'border-gray-700 bg-gray-800/50 hover:border-gray-600 hover:bg-gray-800 active:bg-gray-700'
                }`}
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                {/* Selected Check */}
                {selectedLang === lang.code && (
                  <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 w-5 h-5 sm:w-6 sm:h-6 bg-cyan-400 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 sm:w-4 sm:h-4 text-gray-900" />
                  </div>
                )}

                {/* Flag */}
                <div className="text-3xl sm:text-4xl mb-1 sm:mb-2">{lang.flag}</div>

                {/* Language Name */}
                <div className="text-xs sm:text-sm font-semibold text-white mb-0.5 sm:mb-1">
                  {lang.nativeName}
                </div>
                <div className="text-xs text-gray-400">
                  {lang.name}
                </div>
              </button>
            ))}
          </div>

          {/* Info - Hidden on mobile */}
          <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg hidden sm:block">
            <p className="text-sm text-gray-300">
              💡 <strong>Note:</strong> The interface will be translated to your selected language. 
              AI responses will also be provided in your chosen language.
            </p>
          </div>

          {/* Close Button */}
          <button
            onClick={handleConfirm}
            className="w-full mt-4 sm:mt-6 py-2.5 sm:py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-lg font-semibold text-white transition-all flex items-center justify-center gap-2"
          >
            <Check className="w-5 h-5" />
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
