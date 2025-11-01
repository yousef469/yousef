import { Calculator } from 'lucide-react';

export default function CalculationQuestion({ question, answer, onAnswer }) {
  return (
    <div>
      <div className="flex items-start gap-3 mb-6">
        <Calculator className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-1" />
        <h2 className="text-2xl font-bold">{question.question}</h2>
      </div>
      
      <div className="bg-white/5 rounded-lg p-6 mb-6">
        <label className="block text-sm font-semibold text-white/60 mb-2">
          Your Answer:
        </label>
        <div className="flex items-center gap-3">
          <input
            type="number"
            step="any"
            value={answer || ''}
            onChange={(e) => onAnswer(e.target.value)}
            placeholder="Enter your answer"
            className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white text-xl focus:outline-none focus:border-cyan-400 transition-colors"
          />
          {question.unit && (
            <span className="text-xl font-semibold text-white/60">{question.unit}</span>
          )}
        </div>
      </div>
      
      {question.hint && (
        <div className="p-3 bg-yellow-500/20 border border-yellow-400/30 rounded-lg text-sm">
          <span className="font-semibold">Hint:</span> {question.hint}
        </div>
      )}
    </div>
  );
}
