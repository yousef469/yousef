import { useState } from 'react';
import { X, Sparkles, MessageSquare } from 'lucide-react';

const BetaBanner = ({ onFeedbackClick }) => {
  const [dismissed, setDismissed] = useState(() => {
    return localStorage.getItem('beta-banner-dismissed') === 'true';
  });

  if (dismissed) return null;

  const handleDismiss = () => {
    localStorage.setItem('beta-banner-dismissed', 'true');
    setDismissed(true);
  };

  const handleShareThoughts = (e) => {
    e.preventDefault();
    // Dispatch custom event to open feedback widget
    window.dispatchEvent(new CustomEvent('openFeedbackWidget'));
  };

  return (
    <div className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 text-white py-2 px-4 text-center relative">
      <div className="flex items-center justify-center gap-2 text-sm font-medium">
        <Sparkles className="w-4 h-4 animate-pulse" />
        <span>🚀 Welcome to Engineerium Beta! We'd love your feedback.</span>
        <button 
          onClick={handleShareThoughts}
          className="underline hover:text-cyan-200 transition-colors ml-1 flex items-center gap-1"
        >
          <MessageSquare className="w-3 h-3" />
          Share thoughts
        </button>
      </div>
      <button 
        onClick={handleDismiss}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-white/20 rounded transition-colors"
        aria-label="Dismiss banner"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default BetaBanner;
