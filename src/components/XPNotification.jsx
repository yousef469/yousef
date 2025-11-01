import { useEffect, useState } from 'react';
import { Trophy, Star, Zap } from 'lucide-react';

export default function XPNotification({ xp, message, onClose }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-24 right-6 z-50 transition-all duration-300 ${
        visible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}
    >
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-4 shadow-2xl border border-purple-400/50 min-w-[280px]">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <Zap className="w-6 h-6 text-yellow-300 fill-yellow-300" />
          </div>
          <div className="flex-1">
            <div className="text-2xl font-bold text-white">+{xp} XP</div>
            <div className="text-sm text-white/80">{message}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
