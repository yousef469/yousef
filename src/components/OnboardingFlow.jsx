import { useState } from 'react';
import { X, Rocket, Target, Trophy, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function OnboardingFlow({ onComplete }) {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const steps = [
    {
      icon: Rocket,
      title: 'Welcome to Engineerium!',
      description: 'Learn engineering through interactive 3D models, AI tutoring, and hands-on projects.',
      action: 'Get Started'
    },
    {
      icon: Target,
      title: 'Choose Your Path',
      description: 'Pick a subject: Rockets, Cars, Planes, Electronics, Math, or Physics. Complete lessons to earn XP and level up!',
      action: 'Next'
    },
    {
      icon: Trophy,
      title: 'Earn & Compete',
      description: 'Complete lessons (100 XP), ace quizzes (+50 XP), and climb the leaderboard. 1000 XP = 1 Level!',
      action: 'Start Learning'
    }
  ];

  const currentStep = steps[step - 1];
  const Icon = currentStep.icon;

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      localStorage.setItem('onboarding_completed', 'true');
      onComplete();
      navigate('/learn/rockets');
    }
  };

  const handleSkip = () => {
    localStorage.setItem('onboarding_completed', 'true');
    onComplete();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 border-2 border-cyan-500/50 rounded-2xl max-w-2xl w-full p-8 relative">
        <button
          onClick={handleSkip}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Icon className="w-12 h-12 text-white" />
          </div>

          <h2 className="text-3xl font-bold text-white mb-4">{currentStep.title}</h2>
          <p className="text-xl text-gray-300 mb-8">{currentStep.description}</p>

          {/* Progress dots */}
          <div className="flex justify-center gap-2 mb-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full transition-all ${
                  i === step ? 'bg-cyan-500 w-8' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-2 mx-auto transition-all"
          >
            {currentStep.action}
            <ArrowRight className="w-5 h-5" />
          </button>

          {step < 3 && (
            <button
              onClick={handleSkip}
              className="mt-4 text-gray-400 hover:text-white transition-colors text-sm"
            >
              Skip tutorial
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
