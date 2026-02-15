import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle, Clock } from 'lucide-react';
import { useProgress } from '../contexts/ProgressContext';
import beginnerLessons from '../data/beginnerLessonsData';
import MicroLessonPlayer from '../components/MicroLessonPlayer';

export default function BeginnerLessonPage() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const [lessonCompleted, setLessonCompleted] = useState(false);

  const { completeLesson } = useProgress();

  // Find lesson across all units
  let lesson = null;
  let unitKey = null;

  for (const key in beginnerLessons) {
    const found = beginnerLessons[key].find(l => l.id === parseInt(lessonId));
    if (found) {
      lesson = found;
      unitKey = key;
      break;
    }
  }

  if (!lesson) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Lesson Not Found</h1>
          <button
            onClick={() => navigate('/learn')}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
          >
            Back to Learning
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white">
      {/* Header */}
      <div className="border-b border-white/20 bg-purple-900/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(`/learn/unit/${lesson.unitNumber}`)}
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Unit</span>
            </button>

            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-cyan-300" />
              <span className="text-sm">{lesson.duration}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Lesson Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Lesson Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="text-6xl">{lesson.emoji}</div>
            <div>
              <div className="text-sm text-white/60 mb-1">
                {lesson.level} • Unit {lesson.unitNumber} • Lesson {lesson.lessonNumber}
              </div>
              <h1 className="text-4xl font-bold">{lesson.title}</h1>
              <div className="text-lg text-white/80 mt-2">{lesson.unit}</div>
            </div>
          </div>
        </div>

        {/* Micro-Lesson Player */}
        <MicroLessonPlayer
          subject="beginner"
          lessonData={lesson}
          onComplete={() => {
            completeLesson(parseInt(lessonId), 3, 0); // Correct call for beginner track
            navigate(`/learn/unit/${lesson.unitNumber}`);
          }}
        />
      </div>
    </div>
  );
}
