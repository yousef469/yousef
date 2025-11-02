import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Rocket, CheckCircle, Play, Flame, Mountain, Wind } from 'lucide-react';
import { rocketLessons } from '../data/rocketLessonsData';

export default function RocketLesson1() {
  const navigate = useNavigate();
  const lesson = rocketLessons[1];
  const [currentSection, setCurrentSection] = useState('hook'); // hook, concepts, simulation, summary, quiz
  const [thrustValue, setThrustValue] = useState(500);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showQuizResults, setShowQuizResults] = useState(false);

  // Simulation logic
  const weight = lesson.simulation.parameters.weight;
  const rocketStatus = 
    thrustValue > weight ? 'launching' : 
    thrustValue < weight ? 'falling' : 
    'hovering';

  const handleNextSection = () => {
    const sections = ['hook', 'concepts', 'simulation', 'summary', 'quiz'];
    const currentIndex = sections.indexOf(currentSection);
    if (currentIndex < sections.length - 1) {
      setCurrentSection(sections[currentIndex + 1]);
    }
  };

  const handleQuizAnswer = (questionIndex, answer) => {
    setQuizAnswers({ ...quizAnswers, [questionIndex]: answer });
  };

  const checkQuizResults = () => {
    setShowQuizResults(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white">
      {/* Header */}
      <div className="border-b border-purple-700 bg-purple-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/rockets/map')}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <Rocket className="w-8 h-8 text-purple-400" />
              <div>
                <h1 className="text-xl font-bold">{lesson.title}</h1>
                <p className="text-sm text-purple-200">Lesson 1 • {lesson.duration}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className={`px-3 py-1 rounded-full ${currentSection === 'hook' ? 'bg-purple-500' : 'bg-gray-700'}`}>Hook</div>
              <div className={`px-3 py-1 rounded-full ${currentSection === 'concepts' ? 'bg-purple-500' : 'bg-gray-700'}`}>Learn</div>
              <div className={`px-3 py-1 rounded-full ${currentSection === 'simulation' ? 'bg-purple-500' : 'bg-gray-700'}`}>Try</div>
              <div className={`px-3 py-1 rounded-full ${currentSection === 'summary' ? 'bg-purple-500' : 'bg-gray-700'}`}>Review</div>
              <div className={`px-3 py-1 rounded-full ${currentSection === 'quiz' ? 'bg-purple-500' : 'bg-gray-700'}`}>Quiz</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Column - Content */}
          <div className="space-y-6">
            
            {/* 1️⃣ Hook Section */}
            {currentSection === 'hook' && (
              <div className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 backdrop-blur border border-purple-500 rounded-2xl p-8">
                <div className="text-4xl mb-4">🚀</div>
                <h2 className="text-3xl font-bold mb-4">{lesson.hook.question}</h2>
                <p className="text-lg text-gray-300 mb-6">In this lesson, you'll discover:</p>
                <ul className="space-y-3 mb-8">
                  {lesson.hook.points.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                      <span className="text-gray-200">{point}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={handleNextSection}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 px-6 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all"
                >
                  <Play className="w-5 h-5" />
                  Start Learning
                </button>
              </div>
            )}

            {/* 2️⃣ Concepts Section */}
            {currentSection === 'concepts' && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold mb-6">Understanding the Forces</h2>
                {lesson.concepts.map((concept, idx) => (
                  <div key={idx} className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-4xl">{concept.icon}</span>
                      <h3 className="text-2xl font-bold">{concept.title}</h3>
                    </div>
                    <p className="text-gray-300 mb-4">{concept.description}</p>
                    {concept.details && (
                      <p className="text-sm text-gray-400 italic">{concept.details}</p>
                    )}
                    {concept.interactive && (
                      <div className="mt-4 p-4 bg-purple-900/30 rounded-lg border border-purple-500/30">
                        <p className="text-sm text-purple-300">💡 {concept.interactive}</p>
                      </div>
                    )}
                  </div>
                ))}
                <button
                  onClick={handleNextSection}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 px-6 py-3 rounded-xl font-semibold transition-all"
                >
                  Try the Simulation →
                </button>
              </div>
            )}

            {/* 3️⃣ Simulation Section */}
            {currentSection === 'simulation' && (
              <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-xl p-8">
                <h2 className="text-3xl font-bold mb-4">{lesson.simulation.title}</h2>
                <p className="text-gray-300 mb-6">{lesson.simulation.instruction}</p>
                
                <div className="space-y-6">
                  {/* Thrust Slider */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-semibold">Thrust Force</label>
                      <span className="text-purple-400 font-bold">{thrustValue} N</span>
                    </div>
                    <input
                      type="range"
                      min={lesson.simulation.parameters.thrustMin}
                      max={lesson.simulation.parameters.thrustMax}
                      value={thrustValue}
                      onChange={(e) => setThrustValue(parseInt(e.target.value))}
                      className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
                    />
                  </div>

                  {/* Status Display */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-900/50 p-4 rounded-lg">
                      <div className="text-sm text-gray-400 mb-1">Weight</div>
                      <div className="text-2xl font-bold">{weight} N</div>
                    </div>
                    <div className="bg-gray-900/50 p-4 rounded-lg">
                      <div className="text-sm text-gray-400 mb-1">Status</div>
                      <div className={`text-2xl font-bold ${
                        rocketStatus === 'launching' ? 'text-green-400' :
                        rocketStatus === 'falling' ? 'text-red-400' :
                        'text-yellow-400'
                      }`}>
                        {rocketStatus === 'launching' ? '🚀 Launching!' :
                         rocketStatus === 'falling' ? '📉 Falling' :
                         '⏸️ Hovering'}
                      </div>
                    </div>
                  </div>

                  {/* Rules */}
                  <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
                    <div className="text-sm font-semibold mb-2">Physics Rules:</div>
                    <ul className="space-y-1 text-sm text-gray-300">
                      {lesson.simulation.rules.map((rule, idx) => (
                        <li key={idx}>• {rule}</li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={handleNextSection}
                    disabled={thrustValue <= weight}
                    className={`w-full px-6 py-3 rounded-xl font-semibold transition-all ${
                      thrustValue > weight
                        ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500'
                        : 'bg-gray-700 cursor-not-allowed opacity-50'
                    }`}
                  >
                    {thrustValue > weight ? '✓ Launch Successful! Continue →' : 'Increase thrust to launch'}
                  </button>
                </div>
              </div>
            )}

            {/* 4️⃣ Summary Section */}
            {currentSection === 'summary' && (
              <div className="bg-gradient-to-br from-green-900/50 to-blue-900/50 backdrop-blur border border-green-500 rounded-2xl p-8">
                <div className="text-4xl mb-4">✅</div>
                <h2 className="text-3xl font-bold mb-6">Key Takeaway</h2>
                <p className="text-xl text-gray-200 mb-8 leading-relaxed">{lesson.summary.text}</p>
                
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="text-center p-4 bg-gray-900/50 rounded-lg">
                    <div className="text-4xl mb-2">{lesson.summary.icons.thrust}</div>
                    <div className="text-sm font-semibold">Thrust</div>
                  </div>
                  <div className="text-center p-4 bg-gray-900/50 rounded-lg">
                    <div className="text-4xl mb-2">{lesson.summary.icons.gravity}</div>
                    <div className="text-sm font-semibold">Gravity</div>
                  </div>
                  <div className="text-center p-4 bg-gray-900/50 rounded-lg">
                    <div className="text-4xl mb-2">{lesson.summary.icons.drag}</div>
                    <div className="text-sm font-semibold">Drag</div>
                  </div>
                </div>

                <div className="bg-purple-900/30 border border-purple-500/30 rounded-lg p-4 mb-6">
                  <p className="text-purple-200 font-semibold">💡 {lesson.summary.keyTakeaway}</p>
                </div>

                <button
                  onClick={handleNextSection}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 px-6 py-3 rounded-xl font-semibold transition-all"
                >
                  Take the Quiz →
                </button>
              </div>
            )}

            {/* 5️⃣ Quiz Section */}
            {currentSection === 'quiz' && (
              <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-xl p-8">
                <h2 className="text-3xl font-bold mb-6">🧠 Knowledge Check</h2>
                <p className="text-gray-300 mb-8">Answer these 3 quick questions to complete the lesson!</p>
                
                <div className="space-y-6">
                  {lesson.quiz.map((question, idx) => (
                    <div key={idx} className="bg-gray-900/50 p-6 rounded-lg">
                      <div className="text-sm text-purple-400 mb-2">Question {idx + 1}/3</div>
                      <h3 className="text-lg font-semibold mb-4">{question.question}</h3>
                      
                      {question.type === 'multiple-choice' && (
                        <div className="space-y-2">
                          {question.options.map((option, optIdx) => (
                            <button
                              key={optIdx}
                              onClick={() => handleQuizAnswer(idx, option)}
                              className={`w-full p-3 rounded-lg text-left transition-all ${
                                quizAnswers[idx] === option
                                  ? showQuizResults && option === question.correctAnswer
                                    ? 'bg-green-500/20 border-2 border-green-500'
                                    : showQuizResults
                                    ? 'bg-red-500/20 border-2 border-red-500'
                                    : 'bg-purple-500/20 border-2 border-purple-500'
                                  : 'bg-gray-800 border-2 border-gray-700 hover:border-gray-600'
                              }`}
                              disabled={showQuizResults}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {!showQuizResults ? (
                  <button
                    onClick={checkQuizResults}
                    disabled={Object.keys(quizAnswers).length < lesson.quiz.length}
                    className={`w-full mt-6 px-6 py-3 rounded-xl font-semibold transition-all ${
                      Object.keys(quizAnswers).length === lesson.quiz.length
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500'
                        : 'bg-gray-700 cursor-not-allowed opacity-50'
                    }`}
                  >
                    Submit Answers
                  </button>
                ) : (
                  <div className="mt-6 space-y-4">
                    <div className="bg-green-900/30 border border-green-500 rounded-lg p-6 text-center">
                      <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
                      <h3 className="text-2xl font-bold mb-2">Lesson Complete! 🎉</h3>
                      <p className="text-gray-300 mb-4">You've mastered the basics of rocket flight!</p>
                      <div className="text-sm text-gray-400 mb-4">
                        🔓 Unlocked: {lesson.unlocks}
                      </div>
                    </div>
                    <button
                      onClick={() => navigate('/rockets/lesson/2')}
                      className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 px-6 py-3 rounded-xl font-semibold transition-all"
                    >
                      Continue to Next Lesson →
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Column - 3D Model / Visual */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-gray-800/30 backdrop-blur border border-gray-700 rounded-2xl p-8 aspect-square flex items-center justify-center">
              {currentSection === 'simulation' ? (
                <div className="relative w-full h-full flex items-center justify-center">
                  {/* Rocket Visualization */}
                  <div className={`transition-all duration-500 ${
                    rocketStatus === 'launching' ? 'animate-bounce' : ''
                  }`} style={{
                    transform: rocketStatus === 'launching' ? 'translateY(-50px)' :
                               rocketStatus === 'falling' ? 'translateY(50px)' : 'translateY(0)'
                  }}>
                    <Rocket className="w-32 h-32 text-purple-400" />
                  </div>
                  
                  {/* Force Arrows */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {/* Thrust Arrow (up) */}
                    <div className="absolute bottom-0 flex flex-col items-center">
                      <Flame className={`w-12 h-12 ${thrustValue > 0 ? 'text-orange-500' : 'text-gray-600'}`} />
                      <div className="text-sm font-semibold text-orange-400">Thrust</div>
                    </div>
                    
                    {/* Gravity Arrow (down) */}
                    <div className="absolute top-0 flex flex-col items-center">
                      <Mountain className="w-8 h-8 text-blue-400" />
                      <div className="text-sm font-semibold text-blue-400">Gravity</div>
                    </div>
                    
                    {/* Drag Arrow (side) */}
                    <div className="absolute right-0 flex flex-col items-center">
                      <Wind className="w-8 h-8 text-cyan-400" />
                      <div className="text-sm font-semibold text-cyan-400">Drag</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <Rocket className="w-48 h-48 text-purple-400 mx-auto mb-4" />
                  <p className="text-gray-400">Falcon 9 Rocket</p>
                  <p className="text-sm text-gray-500">Interactive 3D model coming soon</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
