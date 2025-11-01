export default function MultipleChoiceQuestion({ question, answer, onAnswer }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">{question.question}</h2>
      
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswer(index)}
            className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
              answer === index
                ? 'border-cyan-400 bg-cyan-400/20'
                : 'border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                answer === index ? 'border-cyan-400 bg-cyan-400' : 'border-white/40'
              }`}>
                {answer === index && (
                  <div className="w-3 h-3 rounded-full bg-white" />
                )}
              </div>
              <span className="text-lg">{option}</span>
            </div>
          </button>
        ))}
      </div>
      
      {question.hint && (
        <div className="mt-4 p-3 bg-yellow-500/20 border border-yellow-400/30 rounded-lg text-sm">
          <span className="font-semibold">Hint:</span> {question.hint}
        </div>
      )}
    </div>
  );
}
