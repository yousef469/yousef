import { useEffect } from 'react';
import { Keyboard } from 'lucide-react';

export default function KeyboardShortcuts({ onShortcut }) {
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Ignore if typing in input
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      switch(e.key.toLowerCase()) {
        case ' ':
          e.preventDefault();
          onShortcut('pause');
          break;
        case 'r':
          onShortcut('reset');
          break;
        case 'f':
          onShortcut('fullscreen');
          break;
        case 'h':
          onShortcut('hideUI');
          break;
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
          onShortcut('switchModel', parseInt(e.key) - 1);
          break;
        case '?':
          onShortcut('help');
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onShortcut]);

  return null;
}

export function KeyboardShortcutsHelp({ isOpen, onClose }) {
  if (!isOpen) return null;

  const shortcuts = [
    { key: 'Space', action: 'Pause/Play animation' },
    { key: 'R', action: 'Reset camera' },
    { key: 'F', action: 'Toggle fullscreen' },
    { key: 'H', action: 'Hide/Show UI' },
    { key: '1-9', action: 'Switch between models' },
    { key: '?', action: 'Show this help' },
    { key: 'Esc', action: 'Close dialogs' }
  ];

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 max-w-md w-full">
        <div className="flex items-center gap-3 mb-6">
          <Keyboard className="w-6 h-6 text-cyan-400" />
          <h3 className="text-xl font-bold">Keyboard Shortcuts</h3>
        </div>

        <div className="space-y-3">
          {shortcuts.map((shortcut, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg">
              <span className="text-gray-300">{shortcut.action}</span>
              <kbd className="px-3 py-1 bg-gray-700 border border-gray-600 rounded text-sm font-mono text-cyan-400">
                {shortcut.key}
              </kbd>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full py-2 bg-cyan-500 hover:bg-cyan-600 rounded-lg font-semibold transition-colors"
        >
          Got it!
        </button>
      </div>
    </div>
  );
}
