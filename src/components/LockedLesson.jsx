import { Lock } from 'lucide-react';

export default function LockedLesson({ lessonNumber, requiredLesson }) {
  return (
    <div className="relative bg-gray-800/50 border-2 border-gray-700 rounded-xl p-6 opacity-60 cursor-not-allowed">
      <div className="absolute top-4 right-4">
        <Lock className="w-6 h-6 text-gray-500" />
      </div>
      
      <div className="text-center">
        <div className="text-4xl mb-3">🔒</div>
        <h3 className="text-xl font-bold text-gray-400 mb-2">
          Lesson {lessonNumber} - Locked
        </h3>
        <p className="text-sm text-gray-500">
          Complete Lesson {requiredLesson} to unlock
        </p>
      </div>
    </div>
  );
}
