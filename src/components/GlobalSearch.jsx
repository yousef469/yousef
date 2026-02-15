import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Rocket, Car, Plane, Zap, HardHat } from 'lucide-react';
import rocketsLessons from '../data/rocketsLessonsData';
import carsLessons from '../data/carsLessonsData';
import planesLessons from '../data/planes/planesLessonsData.js';
import electronicsLessons from '../data/electronicsLessonsData';
import civilLessons from '../data/civilLessonsData';

export default function GlobalSearch({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const inputRef = useRef(null);

  // All lessons data
  const allLessons = [
    ...Object.values(rocketsLessons).map(lesson => ({ ...lesson, subject: 'rockets', icon: Rocket, emoji: '🚀' })),
    ...Object.values(carsLessons).map(lesson => ({ ...lesson, subject: 'cars', icon: Car, emoji: '🚗' })),
    ...Object.values(planesLessons).map(lesson => ({ ...lesson, subject: 'planes', icon: Plane, emoji: '✈️' })),
    ...Object.values(electronicsLessons).map(lesson => ({ ...lesson, subject: 'electronics', icon: Zap, emoji: '⚡' })),
    ...Object.values(civilLessons).map(lesson => ({ ...lesson, subject: 'civil', icon: HardHat, emoji: '🏗️' }))
  ];

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Search function
  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    const searchResults = allLessons
      .filter(lesson => {
        const searchText = `${lesson.title} ${lesson.unit} ${lesson.subject}`.toLowerCase();
        return searchText.includes(query.toLowerCase());
      })
      .slice(0, 10);

    setResults(searchResults);
    setSelectedIndex(0);
  }, [query]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => Math.max(prev - 1, 0));
          break;
        case 'Enter':
          e.preventDefault();
          if (results[selectedIndex]) {
            handleSelectLesson(results[selectedIndex]);
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex, onClose]);

  const handleSelectLesson = (lesson) => {
    const paths = {
      rockets: `/games/play/rockets/lesson/${lesson.id}`,
      cars: `/games/play/cars/lesson/${lesson.id}`,
      planes: `/games/play/planes/lesson/${lesson.id}`,
      electronics: `/games/play/electronics/lesson/${lesson.id}`
    };
    
    navigate(paths[lesson.subject]);
    onClose();
    setQuery('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="flex items-start justify-center pt-20 px-4">
        <div className="bg-gray-900 rounded-2xl shadow-2xl border border-gray-700 w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
          {/* Search Input */}
          <div className="flex items-center gap-4 p-6 border-b border-gray-700">
            <Search className="w-6 h-6 text-gray-400" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search lessons... (e.g., 'rocket equation', 'braking', 'lift')"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none text-lg"
            />
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Search Results */}
          <div className="max-h-96 overflow-y-auto">
            {query.length < 2 ? (
              <div className="p-6 text-center text-gray-400">
                <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Type at least 2 characters to search</p>
                <p className="text-sm mt-2">Search across all 88 lessons in rockets, cars, planes, and electronics</p>
              </div>
            ) : results.length === 0 ? (
              <div className="p-6 text-center text-gray-400">
                <p>No lessons found for "{query}"</p>
                <p className="text-sm mt-2">Try different keywords like "equation", "force", "circuit", or "lift"</p>
              </div>
            ) : (
              <div className="p-2">
                {results.map((lesson, index) => {
                  return (
                    <button
                      key={`${lesson.subject}-${lesson.id}`}
                      onClick={() => handleSelectLesson(lesson)}
                      className={`w-full p-4 rounded-lg text-left transition-all ${
                        index === selectedIndex
                          ? 'bg-purple-500/20 border border-purple-400/50'
                          : 'hover:bg-gray-800/50'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="text-3xl">{lesson.emoji}</div>
                        <div className="flex-1">
                          <div className="font-semibold text-white">{lesson.title}</div>
                          <div className="text-sm text-gray-400 mt-1">
                            {lesson.subject.charAt(0).toUpperCase() + lesson.subject.slice(1)} • {lesson.unit}
                          </div>
                        </div>
                        <div className="text-sm text-purple-400">
                          Lesson {lesson.id}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-700 text-xs text-gray-500 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span>↑↓ Navigate</span>
              <span>↵ Select</span>
              <span>Esc Close</span>
            </div>
            <div>
              {results.length > 0 && `${results.length} result${results.length === 1 ? '' : 's'}`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
