import { Trophy, Target, Award, RotateCcw, ArrowRight } from 'lucide-react';

export default function QuizResults({ 
  score, 
  totalQuestions, 
  onRetry, 
  onContinue,
  showRetry = true 
}) {
  const percentage = (score / totalQuestions) * 100;
  const passed = percentage >= 70;
  const perfect = percentage === 100;

  return (
    <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-2xl p-8 border border-purple-400/30">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="text-6xl mb-4">
          {perfect ? '🎉' : passed ? '✅' : '📚'}
        </div>
        <h2 className="text-3xl font-bold mb-2">
          {perfect ? 'Perfect Score!' : passed ? 'Quiz Passed!' : 'Keep Learning!'}
        </h2>
        <p className="text-gray-300">
          {perfect 
            ? 'Outstanding! You mastered this lesson!' 
            : passed 
            ? 'Great job! You understand the material well.' 
            : 'Review the lesson and try again.'}
        </p>
      </div>

      {/* Score Display */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
          <Target className="w-8 h-8 text-blue-400 mx-auto mb-2" />
          <div className="text-3xl font-bold">{score}/{totalQuestions}</div>
          <div className="text-sm text-gray-400 mt-1">Questions Correct</div>
        </div>

        <div className={`bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center ${
          perfect ? 'ring-2 ring-yellow-400' : ''
        }`}>
          <Trophy className={`w-8 h-8 mx-auto mb-2 ${
            perfect ? 'text-yellow-400' : passed ? 'text-green-400' : 'text-gray-400'
          }`} />
          <div className="text-3xl font-bold">{percentage.toFixed(0)}%</div>
          <div className="text-sm text-gray-400 mt-1">Score</div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
          <Award className={`w-8 h-8 mx-auto mb-2 ${
            passed ? 'text-green-400' : 'text-red-400'
          }`} />
          <div className="text-2xl font-bold">{passed ? 'PASSED' : 'RETRY'}</div>
          <div className="text-sm text-gray-400 mt-1">Status</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm mb-2">
          <span>Passing: 70%</span>
          <span className={passed ? 'text-green-400' : 'text-red-400'}>
            Your Score: {percentage.toFixed(0)}%
          </span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-4 overflow-hidden relative">
          {/* Passing threshold marker */}
          <div className="absolute left-[70%] top-0 bottom-0 w-0.5 bg-yellow-400 z-10" />
          
          {/* Score bar */}
          <div 
            className={`h-full transition-all duration-1000 ${
              perfect 
                ? 'bg-gradient-to-r from-yellow-400 to-amber-500' 
                : passed 
                ? 'bg-gradient-to-r from-green-400 to-emerald-500' 
                : 'bg-gradient-to-r from-red-400 to-orange-500'
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Achievement Message */}
      {perfect && (
        <div className="bg-gradient-to-r from-yellow-500/20 to-amber-500/20 rounded-lg p-4 mb-6 border border-yellow-400/30">
          <div className="flex items-center gap-3">
            <Trophy className="w-6 h-6 text-yellow-400" />
            <div>
              <div className="font-bold text-yellow-400">Perfect Score Achievement!</div>
              <div className="text-sm text-gray-300">You answered every question correctly!</div>
            </div>
          </div>
        </div>
      )}

      {/* Feedback */}
      <div className="bg-white/5 rounded-lg p-4 mb-6">
        <h3 className="font-bold mb-2">Feedback:</h3>
        <ul className="space-y-2 text-sm text-gray-300">
          {perfect && (
            <>
              <li>✅ Perfect understanding of all concepts</li>
              <li>✅ Ready to move to the next lesson</li>
              <li>✅ Consider helping others who are learning</li>
            </>
          )}
          {passed && !perfect && (
            <>
              <li>✅ Good grasp of the main concepts</li>
              <li>✅ Ready to continue learning</li>
              <li>💡 Review questions you missed for deeper understanding</li>
            </>
          )}
          {!passed && (
            <>
              <li>📚 Review the lesson content carefully</li>
              <li>💡 Pay attention to key equations and concepts</li>
              <li>🔄 Try the quiz again after reviewing</li>
            </>
          )}
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-center">
        {!passed && showRetry && onRetry && (
          <button
            onClick={onRetry}
            className="flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 rounded-lg font-semibold transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
            Retry Quiz
          </button>
        )}
        
        {passed && onContinue && (
          <button
            onClick={onContinue}
            className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 rounded-lg font-semibold transition-colors"
          >
            Continue
            <ArrowRight className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Encouragement */}
      <div className="text-center mt-6 text-sm text-gray-400">
        {perfect 
          ? '🌟 You\'re on fire! Keep up the excellent work!' 
          : passed 
          ? '🚀 Great progress! Ready for the next challenge?' 
          : '💪 Don\'t give up! Learning takes practice.'}
      </div>
    </div>
  );
}
