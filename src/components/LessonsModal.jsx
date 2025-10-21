import React from 'react';
import { X, Play } from 'lucide-react';
import { LESSONS } from '../data/lessonsData';

const LessonsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
        <div className="sticky top-0 bg-gray-800 border-b border-gray-700 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Engineering Lessons</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 grid gap-4">
          {LESSONS.map(lesson => (
            <div
              key={lesson.id}
              className="bg-gray-700/50 p-5 rounded-xl border border-gray-600 hover:border-cyan-500 transition-all"
            >
              <h3 className="text-xl font-semibold mb-2 text-white">{lesson.title}</h3>
              <p className="text-gray-300 text-sm mb-4">{lesson.teaser}</p>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-cyan-400 mb-2">Key Concepts:</h4>
                <ul className="space-y-1">
                  {lesson.bullets.map((bullet, idx) => (
                    <li key={idx} className="text-sm text-gray-300 flex gap-2">
                      <span className="text-cyan-400">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Play className="w-4 h-4 text-blue-400" />
                  <h4 className="text-sm font-medium text-blue-400">Interactive Exercise:</h4>
                </div>
                <p className="text-sm text-gray-300">{lesson.exercise}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LessonsModal;
