export default function DiagramLabelQuestion({ question, answer, onAnswer }) {
  const handleLabelSelect = (index, value) => {
    const newAnswer = answer || [];
    newAnswer[index] = value;
    onAnswer([...newAnswer]);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">{question.question}</h2>
      
      {/* Placeholder for diagram - would be an actual image/SVG */}
      <div className="bg-white/5 rounded-lg p-8 mb-6 border-2 border-dashed border-white/20">
        <div className="text-center text-white/60">
          <div className="text-6xl mb-4">📊</div>
          <div className="text-sm">Diagram: {question.diagram}</div>
          <div className="text-xs mt-2">(Diagram visualization would appear here)</div>
        </div>
      </div>
      
      {/* Labels to assign */}
      <div className="space-y-3">
        <div className="text-sm font-semibold text-white/60 mb-3">
          Drag or select labels in the correct order:
        </div>
        {question.labels.map((label, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-cyan-400 text-black font-bold flex items-center justify-center">
              {index + 1}
            </div>
            <select
              value={answer?.[index] || ''}
              onChange={(e) => handleLabelSelect(index, e.target.value)}
              className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-cyan-400"
            >
              <option value="">Select label...</option>
              {question.labels.map((lbl, i) => (
                <option key={i} value={lbl} className="bg-gray-800">
                  {lbl}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}
