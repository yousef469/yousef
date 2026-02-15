import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import GlobalSearch from './GlobalSearch';

export default function SearchButton() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Keyboard shortcut to open search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <button
        onClick={() => setIsSearchOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg transition-colors border border-gray-600/50 hover:border-gray-500/50"
      >
        <Search className="w-4 h-4 text-gray-400" />
        <span className="text-gray-400 text-sm">Search lessons...</span>
        <div className="hidden md:flex items-center gap-1 ml-2">
          <kbd className="px-1.5 py-0.5 text-xs bg-gray-700 rounded border border-gray-600 text-gray-300">
            ⌘K
          </kbd>
        </div>
      </button>
      
      <GlobalSearch 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
    </>
  );
}
