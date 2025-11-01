import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle, Clock } from 'lucide-react';
import { useProgress } from '../contexts/ProgressContext';
import beginnerLessons from '../data/beginnerLessonsData';

export default function BeginnerLessonPage() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState(0);
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

  const totalSections = lesson.content.sections.length;
  const isLastSection = currentSection === totalSections - 1;

  const handleNext = async () => {
    if (isLastSection) {
      // Record lesson completion before going to quiz
      if (!lessonCompleted) {
        await completeLesson(parseInt(lessonId), 3, 0);
        setLessonCompleted(true);
      }
      // Go to quiz
      navigate(`/learn/beginner/quiz/${lessonId}`);
    } else {
      setCurrentSection(currentSection + 1);
    }
  };

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const currentContent = lesson.content.sections[currentSection];

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
          
          {/* Progress Bar */}
          <div className="w-full bg-white/20 rounded-full h-2 mt-6">
            <div
              className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentSection + 1) / totalSections) * 100}%` }}
            />
          </div>
          <div className="text-sm text-white/60 mt-2 text-center">
            Section {currentSection + 1} of {totalSections}
          </div>
        </div>

        {/* Introduction (only on first section) */}
        {currentSection === 0 && (
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/20">
            <div className="flex items-start gap-3">
              <BookOpen className="w-6 h-6 text-cyan-300 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-lg mb-2">Introduction</h3>
                <p className="text-white/90 leading-relaxed">{lesson.content.introduction}</p>
              </div>
            </div>
          </div>
        )}

        {/* Current Section Content */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-white/20">
          <h2 className="text-3xl font-bold mb-6">{currentContent.title}</h2>
          <div className="prose prose-invert prose-lg max-w-none">
            {currentContent.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="mb-4 text-white/90 leading-relaxed whitespace-pre-line">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Key Takeaways (only on last section) */}
        {isLastSection && (
          <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-green-400/30">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-green-300 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-3">Key Takeaways</h3>
                <ul className="space-y-2">
                  {lesson.content.keyTakeaways.map((takeaway, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-green-300 mt-1">•</span>
                      <span className="text-white/90">{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Vocabulary (only on last section) */}
        {isLastSection && lesson.content.vocabulary.length > 0 && (
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/20">
            <h3 className="font-bold text-xl mb-4">Vocabulary</h3>
            <div className="grid gap-4">
              {lesson.content.vocabulary.map((item, index) => (
                <div key={index} className="border-l-4 border-cyan-400 pl-4">
                  <div className="font-bold text-cyan-300">{item.term}</div>
                  <div className="text-white/80 text-sm mt-1">{item.definition}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between gap-4">
          <button
            onClick={handlePrevious}
            disabled={currentSection === 0}
            className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Previous
          </button>

          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-lg font-semibold transition-all shadow-lg"
          >
            {isLastSection ? 'Take Quiz' : 'Next'}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
