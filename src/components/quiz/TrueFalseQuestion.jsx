import { CheckCircle, XCircle } from 'lucide-react';

export default function TrueFalseQuestion({ question, answer, onAnswer }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">{question.question}</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => onAnswer(true)}
          className={`p-8 rounded-xl border-2 transition-all ${
            answer === true
              ? 'border-green-400 bg-green-400/20'
              : 'border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10'
          }`}
        >
          <CheckCircle className={`w-16 h-16 mx-auto mb-3 ${
            answer === true ? 'text-green-400' : 'text-white/60'
          }`} />
          <div className="text-2xl font-bold">TRUE</div>
        </button>
        
        <button
          onClick={() => onAnswer(false)}
          className={`p-8 rounded-xl border-2 transition-all ${
            answer === false
              ? 'border-red-400 bg-red-400/20'
              : 'border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10'
          }`}
        >
          <XCircle className={`w-16 h-16 mx-auto mb-3 ${
            answer === false ? 'text-red-400' : 'text-white/60'
          }`} />
          <div className="text-2xl font-bold">FALSE</div>
        </button>
      </div>
      
      {question.hint && (
        <div className="mt-6 p-3 bg-yellow-500/20 border border-yellow-400/30 rounded-lg text-sm">
          <span className="font-semibold">Hint:</span> {question.hint}
        </div>
      )}
    </div>
  );
}
