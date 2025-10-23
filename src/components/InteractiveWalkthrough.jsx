import { useState, useEffect } from 'react';
import { MousePointer, RotateCw, ZoomIn, Move, X } from 'lucide-react';

export default function InteractiveWalkthrough({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const steps = [
    {
      icon: MousePointer,
      title: 'Welcome to 3D Viewer!',
      description: 'Let me show you how to interact with 3D models',
      action: null
    },
    {
      icon: RotateCw,
      title: 'Rotate the Model',
      description: 'Click and drag anywhere to rotate the model',
      action: 'rotate'
    },
    {
      icon: ZoomIn,
      title: 'Zoom In/Out',
      description: 'Scroll your mouse wheel to zoom',
      action: 'zoom'
    },
    {
      icon: Move,
      title: 'Pan the View',
      description: 'Right-click and drag to move the camera',
      action: 'pan'
    }
  ];

  const step = steps[currentStep];
  const Icon = step.icon;

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const skip = () => {
    handleComplete();
  };

  const handleComplete = () => {
    setIsVisible(false);
    localStorage.setItem('walkthroughCompleted', 'true');
    onComplete?.();
  };

  // Check if user has seen walkthrough
  useEffect(() => {
    const completed = localStorage.getItem('walkthroughCompleted');
    if (completed) {
      setIsVisible(false);
    }
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 border-2 border-cyan-500 rounded-2xl p-8 max-w-md w-full relative">
        {/* Skip Button */}
        <button
          onClick={skip}
          className="absolute top-4 right-4 p-2 hover:bg-gray-700 rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-gray-400" />
        </button>

        {/* Icon */}
        <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Icon className="w-10 h-10 text-white" />
        </div>

        {/* Content */}
        <h3 className="text-2xl font-bold text-center mb-3">{step.title}</h3>
        <p className="text-gray-300 text-center mb-8">{step.description}</p>

        {/* Progress Dots */}
        <div className="flex justify-center gap-2 mb-6">
          {steps.map((_, idx) => (
            <div
              key={idx}
              className={`h-2 rounded-full transition-all ${
                idx === currentStep
                  ? 'w-8 bg-cyan-500'
                  : idx < currentStep
                  ? 'w-2 bg-cyan-500/50'
                  : 'w-2 bg-gray-600'
              }`}
            />
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          {currentStep > 0 && (
            <button
              onClick={() => setCurrentStep(currentStep - 1)}
              className="flex-1 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold transition-colors"
            >
              Back
            </button>
          )}
          <button
            onClick={nextStep}
            className="flex-1 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-lg font-semibold transition-colors"
          >
            {currentStep === steps.length - 1 ? 'Get Started' : 'Next'}
          </button>
        </div>

        {/* Skip Link */}
        <button
          onClick={skip}
          className="w-full mt-4 text-sm text-gray-400 hover:text-gray-300 transition-colors"
        >
          Skip tutorial
        </button>
      </div>
    </div>
  );
}
