import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Lock, CheckCircle, Play, Star, Clock } from 'lucide-react';
import { useProgress } from '../contexts/ProgressContext';
import beginnerLessons from '../data/beginnerLessonsData';

export default function UnitOverviewPage() {
  const { unitId } = useParams();
  const navigate = useNavigate();
  const { lessonsCompleted } = useProgress();
  
  // Get unit data
  const unitKey = `unit${unitId}`;
  const lessons = beginnerLessons[unitKey] || [];
  
  if (lessons.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Unit Coming Soon!</h1>
          <p className="text-gray-400 mb-6">This unit is currently being developed.</p>
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
  
  const firstLesson = lessons[0];
  const unitInfo = {
    number: firstLesson.unitNumber,
    title: firstLesson.unit,
    level: firstLesson.level,
    totalLessons: lessons.length,
    description: getUnitDescription(parseInt(unitId))
  };
  
  // Check if lesson is unlocked - ALL LESSONS UNLOCKED FOR TESTING
  const isLessonUnlocked = (lessonIndex) => {
    return true; // All lessons unlocked
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Header */}
      <div className="border-b border-gray-700 bg-gray-900/50 backdrop-blur sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <button
            onClick={() => navigate('/learn')}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Learning</span>
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Unit Header */}
        <div className="mb-12">
          <div className="inline-block px-4 py-2 bg-purple-600/20 border border-purple-500/30 rounded-full text-purple-300 text-sm font-semibold mb-4">
            {unitInfo.level} • Unit {unitInfo.number}
          </div>
          <h1 className="text-5xl font-bold mb-4">{unitInfo.title}</h1>
          <p className="text-xl text-gray-300 mb-6">{unitInfo.description}</p>
          
          <div className="flex items-center gap-6 text-gray-400">
            <div className="flex items-center gap-2">
              <Play className="w-5 h-5" />
              <span>{unitInfo.totalLessons} Lessons</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>~{unitInfo.totalLessons * 15} minutes</span>
            </div>
          </div>
        </div>

        {/* Lessons Grid */}
        <div className="grid gap-6">
          {lessons.map((lesson, index) => {
            const unlocked = isLessonUnlocked(index);
            const completed = lessonsCompleted > lesson.id;
            
            return (
              <div
                key={lesson.id}
                className={`bg-gray-800 rounded-xl border transition-all ${
                  unlocked
                    ? 'border-gray-700 hover:border-purple-500 cursor-pointer'
                    : 'border-gray-800 opacity-60'
                }`}
                onClick={() => unlocked && navigate(`/learn/beginner/lesson/${lesson.id}`)}
              >
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Lesson Number/Icon */}
                    <div className={`w-16 h-16 rounded-xl flex items-center justify-center text-3xl flex-shrink-0 ${
                      completed
                        ? 'bg-green-600'
                        : unlocked
                        ? 'bg-gradient-to-br from-purple-600 to-blue-600'
                        : 'bg-gray-700'
                    }`}>
                      {completed ? (
                        <CheckCircle className="w-8 h-8 text-white" />
                      ) : unlocked ? (
                        <span>{lesson.emoji}</span>
                      ) : (
                        <Lock className="w-6 h-6 text-gray-500" />
                      )}
                    </div>

                    {/* Lesson Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="text-sm text-gray-400 mb-1">
                            Lesson {lesson.lessonNumber}
                          </div>
                          <h3 className="text-2xl font-bold text-white mb-2">
                            {lesson.title}
                          </h3>
                        </div>
                        
                        {completed && (
                          <div className="flex items-center gap-1 text-yellow-400">
                            <Star className="w-5 h-5 fill-yellow-400" />
                            <Star className="w-5 h-5 fill-yellow-400" />
                            <Star className="w-5 h-5 fill-yellow-400" />
                          </div>
                        )}
                      </div>

                      <p className="text-gray-300 mb-4">
                        {lesson.content.introduction.substring(0, 150)}...
                      </p>

                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{lesson.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span>•</span>
                          <span>{lesson.quiz.questions.length} Quiz Questions</span>
                        </div>
                        {!unlocked && (
                          <div className="flex items-center gap-2 text-orange-400">
                            <Lock className="w-4 h-4" />
                            <span>Complete previous lesson to unlock</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action Button */}
                    {unlocked && (
                      <div className="flex-shrink-0">
                        <button
                          className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                            completed
                              ? 'bg-gray-700 hover:bg-gray-600 text-white'
                              : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white'
                          }`}
                        >
                          {completed ? 'Review' : 'Start Lesson'}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Unit Progress */}
        <div className="mt-12 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-xl p-6 border border-purple-500/30">
          <h3 className="text-xl font-bold mb-4">Unit Progress</h3>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div
                  className="h-3 rounded-full bg-gradient-to-r from-purple-500 to-blue-600 transition-all duration-500"
                  style={{ 
                    width: `${(lessons.filter(l => lessonsCompleted > l.id).length / lessons.length) * 100}%` 
                  }}
                />
              </div>
            </div>
            <div className="text-lg font-semibold">
              {lessons.filter(l => lessonsCompleted > l.id).length} / {lessons.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getUnitDescription(unitId) {
  const descriptions = {
    1: "Discover what engineers do, learn the design process, and explore different engineering fields. Perfect for beginners starting their engineering journey.",
    2: "Master the fundamental physics concepts that power all engineering: forces, motion, energy, and more.",
    3: "Build your mathematical toolkit with algebra, trigonometry, geometry, and calculus basics for engineering.",
    4: "Understand how aircraft fly, from the four forces of flight to aircraft components and flight instruments.",
    5: "Explore aircraft structures, from wings and fuselage to landing gear and control systems.",
    6: "Learn about materials used in aerospace and the tools engineers use to build and maintain aircraft."
  };
  return descriptions[unitId] || "Explore this unit to learn more!";
}
