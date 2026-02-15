import { ChevronLeft, ChevronRight, List } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function LessonNavigation({ subject, currentLessonId, allLessons }) {
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);

  const currentId = parseInt(currentLessonId);
  const lessonIds = Object.keys(allLessons).map(id => parseInt(id)).sort((a, b) => a - b);
  
  const currentIndex = lessonIds.indexOf(currentId);
  const prevLessonId = currentIndex > 0 ? lessonIds[currentIndex - 1] : null;
  const nextLessonId = currentIndex < lessonIds.length - 1 ? lessonIds[currentIndex + 1] : null;

  const getLessonPath = (lessonId) => {
    return `/games/play/${subject}/lesson/${lessonId}`;
  };

  const handlePrevious = () => {
    if (prevLessonId) {
      navigate(getLessonPath(prevLessonId));
    }
  };

  const handleNext = () => {
    if (nextLessonId) {
      navigate(getLessonPath(nextLessonId));
    }
  };

  // Keyboard shortcuts
  useState(() => {
    const handleKeyDown = (e) => {
      // Only trigger if not typing in an input
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      if (e.key === 'ArrowLeft' && prevLessonId) {
        handlePrevious();
      } else if (e.key === 'ArrowRight' && nextLessonId) {
        handleNext();
      } else if (e.key === 'l' && e.ctrlKey) {
        e.preventDefault();
        setShowSidebar(prev => !prev);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [prevLessonId, nextLessonId]);

  return (
    <>
      {/* Navigation Buttons */}
      <div className="flex items-center justify-between gap-4 mt-8 pt-6 border-t border-gray-700">
        <button
          onClick={handlePrevious}
          disabled={!prevLessonId}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
            prevLessonId
              ? 'bg-gray-800 hover:bg-gray-700 text-white'
              : 'bg-gray-900 text-gray-600 cursor-not-allowed'
          }`}
        >
          <ChevronLeft className="w-5 h-5" />
          <div className="text-left">
            <div className="text-xs text-gray-400">Previous</div>
            {prevLessonId && (
              <div className="text-sm font-medium">{allLessons[prevLessonId]?.title}</div>
            )}
          </div>
        </button>

        <button
          onClick={() => setShowSidebar(true)}
          className="p-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
          title="View all lessons (Ctrl+L)"
        >
          <List className="w-5 h-5" />
        </button>

        <button
          onClick={handleNext}
          disabled={!nextLessonId}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
            nextLessonId
              ? 'bg-purple-600 hover:bg-purple-700 text-white'
              : 'bg-gray-900 text-gray-600 cursor-not-allowed'
          }`}
        >
          <div className="text-right">
            <div className="text-xs text-purple-200">Next</div>
            {nextLessonId && (
              <div className="text-sm font-medium">{allLessons[nextLessonId]?.title}</div>
            )}
          </div>
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Keyboard Shortcuts Hint */}
      <div className="text-center text-xs text-gray-500 mt-4">
        Use ← → arrow keys to navigate between lessons
      </div>

      {/* Lesson Sidebar */}
      {showSidebar && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={() => setShowSidebar(false)}>
          <div 
            className="absolute right-0 top-0 h-full w-full max-w-md bg-gray-900 shadow-2xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-gray-900 border-b border-gray-700 p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">All Lessons</h3>
                <button
                  onClick={() => setShowSidebar(false)}
                  className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
              <p className="text-sm text-gray-400 mt-2">
                {lessonIds.length} lessons • Lesson {currentId} of {lessonIds.length}
              </p>
            </div>

            <div className="p-4 space-y-2">
              {lessonIds.map((lessonId) => {
                const lesson = allLessons[lessonId];
                const isCurrent = lessonId === currentId;
                
                return (
                  <button
                    key={lessonId}
                    onClick={() => {
                      navigate(getLessonPath(lessonId));
                      setShowSidebar(false);
                    }}
                    className={`w-full p-4 rounded-lg text-left transition-all ${
                      isCurrent
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`text-sm font-bold ${isCurrent ? 'text-white' : 'text-gray-500'}`}>
                        {lessonId}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium">{lesson?.title}</div>
                        {lesson?.unit && (
                          <div className={`text-xs mt-1 ${isCurrent ? 'text-purple-200' : 'text-gray-500'}`}>
                            {lesson.unit}
                          </div>
                        )}
                      </div>
                      {isCurrent && (
                        <div className="text-xs bg-white/20 px-2 py-1 rounded">
                          Current
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
