import { useState, useEffect } from 'react';
import { X, Rocket, Target, Trophy, ArrowRight, Brain, Clock, Star, Lightbulb, ChevronRight, CheckCircle2, Briefcase, GraduationCap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function OnboardingFlow({ onComplete }) {
  const [step, setStep] = useState(1);
  const [selections, setSelections] = useState({
    goal: '',
    answers: [],
    dailyGoal: '10'
  });
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const navigate = useNavigate();

  const assessmentQuestions = [
    {
      id: 1,
      category: 'Aerodynamics',
      question: "What is the primary principle that explains how an aircraft wing produces lift?",
      options: ["Bernoulli's Principle", "Ohm's Law", "Hooke's Law", "Archimedes' Principle"],
      correct: 0
    },
    {
      id: 2,
      category: 'Structures',
      question: "Which geometric shape is universally considered the most structurally stable for engineering?",
      options: ["Square", "Circle", "Triangle", "Hexagon"],
      correct: 2
    },
    {
      id: 3,
      category: 'Electronics',
      question: "What electronic component is used to store electrical energy in an electric field?",
      options: ["Resistor", "Capacitor", "Transistor", "Inductor"],
      correct: 1
    },
    {
      id: 4,
      category: 'Mechanics',
      question: "In a simple gear train, if a small gear drives a larger gear, the output torque:",
      options: ["Increases", "Decreases", "Stays the same", "Becomes zero"],
      correct: 0
    }
  ];

  const handleGoalSelect = (goal) => {
    setSelections(prev => ({ ...prev, goal }));
    setStep(2);
  };

  const handleAnswerSelect = (index) => {
    const newAnswers = [...selections.answers];
    newAnswers[currentQuizIndex] = index;
    setSelections(prev => ({ ...prev, answers: newAnswers }));

    if (currentQuizIndex < assessmentQuestions.length - 1) {
      setCurrentQuizIndex(currentQuizIndex + 1);
    } else {
      setStep(3);
    }
  };

  const handleDailyGoalSelect = (mins) => {
    setSelections(prev => ({ ...prev, dailyGoal: mins }));
    setStep(4);
  };

  const calculateScore = () => {
    return selections.answers.reduce((score, ans, idx) => {
      return ans === assessmentQuestions[idx].correct ? score + 1 : score;
    }, 0);
  };

  const getRecommendation = () => {
    const score = calculateScore();
    if (score <= 1) return {
      title: 'Foundation Builder',
      desc: 'We recommend starting with our "Rocket Engineering" track to master the core principles.',
      path: '/learn/rockets'
    };
    if (score <= 3) return {
      title: 'Engineering Explorer',
      desc: 'You have a solid base! Rockets or Planes tracks will challenge and inspire you.',
      path: '/learn/rockets'
    };
    return {
      title: 'Advanced Innovator',
      desc: 'Impressive! You are ready for Electronics or Civil Engineering tracks.',
      path: '/learn/electronics'
    };
  };

  const finishOnboarding = () => {
    localStorage.setItem('onboarding_completed', 'true');
    localStorage.setItem('user_goal', selections.goal);
    localStorage.setItem('daily_goal_mins', selections.dailyGoal);
    onComplete();
    const rec = getRecommendation();
    navigate(rec.path);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-3xl font-bold text-white mb-2 text-center">Why are you here?</h2>
            <p className="text-gray-400 text-center mb-8">We will tailor your learning experience.</p>
            <div className="grid gap-4">
              {[
                { id: 'professional', title: 'Career Growth', desc: 'I want to build real engineering skills for work.', icon: Briefcase },
                { id: 'academic', title: 'Academic Excellence', desc: 'Improving my grades and understanding of STEM.', icon: GraduationCap },
                { id: 'curiosity', title: 'Casual Curiosity', desc: 'I just love learning how things work!', icon: Lightbulb }
              ].map(goal => (
                <button
                  key={goal.id}
                  onClick={() => handleGoalSelect(goal.id)}
                  className="flex items-center gap-4 p-5 rounded-2xl bg-gray-800/50 border-2 border-gray-700 hover:border-cyan-500 hover:bg-gray-800 transition-all group text-left"
                >
                  <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform text-cyan-400">
                    <goal.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">{goal.title}</h3>
                    <p className="text-sm text-gray-400">{goal.desc}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 ml-auto text-gray-600 group-hover:text-cyan-400" />
                </button>
              ))}
            </div>
          </div>
        );

      case 2:
        const q = assessmentQuestions[currentQuizIndex];
        const progress = ((currentQuizIndex + 1) / assessmentQuestions.length) * 100;
        return (
          <div className="animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">{q.category}</span>
              <span className="text-xs text-gray-500">{currentQuizIndex + 1} / {assessmentQuestions.length}</span>
            </div>
            <div className="w-full bg-gray-700 h-2 rounded-full mb-8">
              <div className="bg-cyan-500 h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>
            <h2 className="text-2xl font-bold text-white mb-8">{q.question}</h2>
            <div className="grid gap-3">
              {q.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswerSelect(idx)}
                  className="p-4 rounded-xl bg-gray-800/50 border-2 border-gray-700 hover:border-cyan-500 hover:bg-gray-800 transition-all text-left font-medium text-gray-200"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 text-center">
            <h2 className="text-3xl font-bold text-white mb-2">Pick a daily goal</h2>
            <p className="text-gray-400 mb-8">Consistent practice is key to mastery!</p>
            <div className="grid gap-4 max-w-sm mx-auto">
              {[
                { id: '5', title: 'Casual', mins: '5 min / day' },
                { id: '10', title: 'Regular', mins: '10 min / day' },
                { id: '15', title: 'Serious', mins: '15 min / day' },
                { id: '30', title: 'Hardcore', mins: '30 min / day' }
              ].map(g => (
                <button
                  key={g.id}
                  onClick={() => handleDailyGoalSelect(g.id)}
                  className={`p-4 rounded-2xl border-2 transition-all flex items-center justify-between ${selections.dailyGoal === g.id
                    ? 'border-cyan-500 bg-cyan-500/10'
                    : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                    }`}
                >
                  <span className="font-bold text-white">{g.title}</span>
                  <span className="text-gray-400 text-sm">{g.mins}</span>
                </button>
              ))}
            </div>
            <button
              onClick={() => setStep(4)}
              className="mt-8 bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 mx-auto transition-all"
            >
              Continue <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        );

      case 4:
        const rec = getRecommendation();
        return (
          <div className="animate-in zoom-in-95 duration-500 text-center pb-4">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-green-400">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Assessment Ready!</h2>
            <p className="text-gray-400 mb-8">Based on your results, we've found your perfect start.</p>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-cyan-500/30 rounded-3xl p-8 mb-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Rocket className="w-24 h-24" />
              </div>
              <span className="inline-block px-3 py-1 bg-cyan-500 text-black text-[10px] font-black uppercase tracking-tighter rounded-full mb-4">Recommended Track</span>
              <h3 className="text-2xl font-black text-cyan-400 mb-2">{rec.title}</h3>
              <p className="text-gray-300 leading-relaxed">{rec.desc}</p>
            </div>

            <button
              onClick={finishOnboarding}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-3 transition-all shadow-xl shadow-cyan-500/20 hover:scale-[1.02] active:scale-[0.98]"
            >
              START LEARNING
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-950/90 backdrop-blur-xl z-[60] flex items-center justify-center p-4">
      <div className="bg-[#1a1c23] border border-gray-800 rounded-[2.5rem] max-w-xl w-full p-8 md:p-12 relative shadow-2xl overflow-hidden">
        {/* Background glow Decor */}
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-cyan-500/10 blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-purple-500/10 blur-[100px] pointer-events-none" />

        <button
          onClick={() => {
            localStorage.setItem('onboarding_completed', 'true');
            onComplete();
          }}
          className="absolute top-6 right-6 p-2 text-gray-500 hover:text-white hover:bg-gray-800 rounded-full transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-12 h-1.5 bg-gray-800 rounded-full mx-auto mb-10 overflow-hidden">
          <div
            className="h-full bg-cyan-500 transition-all duration-500"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>

        {renderStep()}
      </div>
    </div>
  );
}

