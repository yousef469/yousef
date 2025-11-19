import { Maximize2, Minimize2, Focus, RotateCcw } from 'lucide-react';

/**
 * Explode View Controls Component
 * UI controls for exploding, resetting, and focusing on 3D model parts
 */
export default function ExplodeViewControls({ 
  onExplode, 
  onReset, 
  onFocusSelected,
  isExploded,
  hasSelection 
}) {
  return (
    <div className="glass rounded-xl p-4 space-y-3">
      <h3 className="text-white font-semibold mb-3">Explode View Controls</h3>
      
      {/* Explode/Collapse Button */}
      <button
        onClick={onExplode}
        className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
          isExploded
            ? 'bg-warning/20 hover:bg-warning/30 text-warning border border-warning/50'
            : 'bg-primary/20 hover:bg-primary/30 text-primary border border-primary/50'
        }`}
      >
        {isExploded ? (
          <>
            <Minimize2 className="w-5 h-5" />
            <span>Collapse View</span>
          </>
        ) : (
          <>
            <Maximize2 className="w-5 h-5" />
            <span>Explode View</span>
          </>
        )}
      </button>

      {/* Reset Button */}
      <button
        onClick={onReset}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-background-light hover:bg-background rounded-lg text-white font-medium transition-all border border-primary/30"
      >
        <RotateCcw className="w-5 h-5" />
        <span>Reset All</span>
      </button>

      {/* Focus Selected Button */}
      <button
        onClick={onFocusSelected}
        disabled={!hasSelection}
        className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
          hasSelection
            ? 'bg-secondary/20 hover:bg-secondary/30 text-secondary border border-secondary/50'
            : 'bg-background-light text-text-muted border border-primary/20 cursor-not-allowed opacity-50'
        }`}
      >
        <Focus className="w-5 h-5" />
        <span>Focus Selected</span>
      </button>

      {/* Instructions */}
      <div className="mt-4 p-3 bg-background-light rounded-lg">
        <p className="text-xs text-text-muted">
          <strong className="text-white">Tip:</strong> Click any part to select it. 
          Selected parts will be highlighted and others will fade.
        </p>
      </div>
    </div>
  );
}
