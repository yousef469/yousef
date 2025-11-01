import { useState } from 'react';
import { GripVertical } from 'lucide-react';

export default function DragDropQuestion({ question, answer, onAnswer }) {
  const [items, setItems] = useState(answer || question.pairs || []);
  const [draggedIndex, setDraggedIndex] = useState(null);

  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (dropIndex) => {
    if (draggedIndex === null) return;
    
    const newItems = [...items];
    const draggedItem = newItems[draggedIndex];
    newItems.splice(draggedIndex, 1);
    newItems.splice(dropIndex, 0, draggedItem);
    
    setItems(newItems);
    onAnswer(newItems);
    setDraggedIndex(null);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">{question.question}</h2>
      
      <div className="space-y-3">
        <div className="text-sm text-white/60 mb-4">
          Drag items to match them correctly:
        </div>
        
        {items.map((item, index) => (
          <div
            key={index}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(index)}
            className={`flex items-center gap-3 p-4 bg-white/10 border-2 border-white/20 rounded-lg cursor-move hover:border-cyan-400 transition-all ${
              draggedIndex === index ? 'opacity-50' : ''
            }`}
          >
            <GripVertical className="w-5 h-5 text-white/40" />
            <div className="flex-1 grid grid-cols-2 gap-4">
              <div className="font-semibold">{item.discipline || item.term || item}</div>
              <div className="text-white/80">→ {item.focus || item.definition || ''}</div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 p-3 bg-cyan-500/20 border border-cyan-400/30 rounded-lg text-sm">
        <span className="font-semibold">Tip:</span> Drag and drop items to reorder them
      </div>
    </div>
  );
}
