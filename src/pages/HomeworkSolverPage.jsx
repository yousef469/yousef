import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2, BookOpen, Upload, Sparkles, CheckCircle, Calculator, Lightbulb, Target, AlertTriangle, Lock, Crown } from 'lucide-react';
import { useUsageLimits } from '../contexts/UsageLimitsContext';

export default function HomeworkSolverPage() {
  const navigate = useNavigate();
  const [question, setQuestion] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [solution, setSolution] = useState(null);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState('');
  const { canUseHomeworkSolver, useHomeworkSolver, getRemainingHomeworkSolves, getTimeUntilReset, isPremium } = useUsageLimits();

  const categories = [
    { id: 'math', name: 'Mathematics', icon: '📐', color: 'from-blue-500 to-cyan-500' },
    { id: 'physics', name: 'Physics', icon: '⚛️', color: 'from-purple-500 to-pink-500' },
    { id: 'rockets', name: 'Rockets & Spacecraft', icon: '🚀', color: 'from-orange-500 to-red-500' },
    { id: 'cars', name: 'Cars & Motorcycles', icon: '🏎️', color: 'from-green-500 to-emerald-500' },
    { id: 'planes', name: 'Aircraft & Aviation', icon: '✈️', color: 'from-cyan-500 to-blue-500' },
    { id: 'boats', name: 'Boats & Submarines', icon: '🚢', color: 'from-blue-500 to-indigo-500' },
    { id: 'bikes', name: 'Bicycles & Mechanics', icon: '🚲', color: 'from-yellow-500 to-orange-500' },
    { id: 'general', name: 'General Engineering', icon: '⚙️', color: 'from-gray-500 to-slate-500' }
  ];

  const exampleQuestions = [
    "Calculate the thrust needed for a 500kg rocket to reach orbit",
    "What's the drag force on a car traveling at 100 km/h?",
    "Calculate the lift force on an aircraft wing",
    "What's the gear ratio needed for a bicycle to climb a 15% grade?"
  ];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const solveProblem = async () => {
    if (!question.trim() && !image) return;

    // Check usage limits
    if (!canUseHomeworkSolver()) {
      const resetTime = getTimeUntilReset('homeworkSolver');
      setSolution({ 
        error: `🔒 Daily Limit Reached\n\nYou've used all 3 free homework solves for today.\n\n⏱️ Resets in: ${resetTime}\n\n💎 Upgrade to Pro for unlimited homework help!` 
      });
      return;
    }

    setLoading(true);
    setSolution(null);

    // Consume one usage
    useHomeworkSolver();

    try {
      const prompt = `You are an expert mechanical engineering tutor. Solve this problem and return ONLY valid JSON.

Problem: ${question}
Category: ${category || 'General Engineering'}

Return this exact JSON structure:
{
  "problemStatement": "Restate the problem clearly",
  "givenValues": ["value1 with unit", "value2 with unit"],
  "findWhat": "What we need to calculate",
  "formulas": [
    {"name": "Formula Name", "equation": "F = ma", "description": "Brief explanation"}
  ],
  "steps": [
    {"stepNumber": 1, "title": "Step title", "calculation": "Show the math", "result": "Result with units"}
  ],
  "finalAnswer": "The complete answer with units",
  "explanation": "Why this answer makes physical sense",
  "tips": ["Helpful tip 1", "Common mistake to avoid"],
  "relatedConcepts": ["Related topic 1", "Related topic 2"]
}

CRITICAL: Return ONLY valid JSON, no markdown, no code blocks.`;

      const { GoogleGenerativeAI } = await import('@google/generative-ai');
      const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

      let result;
      if (image) {
        const reader = new FileReader();
        reader.readAsDataURL(image);
        await new Promise((resolve) => {
          reader.onload = async () => {
            const base64 = reader.result.split(',')[1];
            result = await model.generateContent([
              prompt + "\n\nAnalyze the attached image for diagrams, equations, or problem details.",
              { inlineData: { data: base64, mimeType: image.type } }
            ]);
            resolve();
          };
        });
      } else {
        result = await model.generateContent(prompt);
      }

      const response = result.response;
      const text = response.text();
      
      // Parse JSON
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        setSolution(parsed);
      } else {
        setSolution({ rawText: text });
      }
    } catch (error) {
      console.error('Error:', error);
      setSolution({ error: 'Failed to solve. Please try again.' });
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white safe-area-inset">
      {/* Header - Mobile Optimized */}
      <div className="border-b border-gray-700 bg-gray-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4">
          <div className="flex items-center gap-3 md:gap-4">
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-800 rounded-lg active:scale-95 transition-transform">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex-1 min-w-0">
              <h1 className="text-lg md:text-2xl font-bold flex items-center gap-2 truncate">
                <Sparkles className="w-5 h-5 md:w-7 md:h-7 text-purple-400 flex-shrink-0" />
                <span className="truncate">AI Homework Solver</span>
                {isPremium && <Crown className="w-5 h-5 text-yellow-400" />}
              </h1>
              <p className="text-xs md:text-sm text-gray-400">
                {isPremium ? (
                  <span className="text-yellow-400">Unlimited • Pro</span>
                ) : (
                  <span>{getRemainingHomeworkSolves()}/3 solves left today</span>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 md:py-8">
        {/* Categories - Horizontal scroll on mobile */}
        <div className="mb-4 md:mb-6">
          <h2 className="text-base md:text-lg font-bold mb-2 md:mb-3 flex items-center gap-2">
            <BookOpen className="w-4 h-4 md:w-5 md:h-5 text-cyan-400" /> Category
          </h2>
          <div className="flex md:grid md:grid-cols-8 gap-2 overflow-x-auto pb-2 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 swipe-scroll">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id === category ? '' : cat.id)}
                className={`flex-shrink-0 p-2 md:p-3 rounded-lg border-2 transition-all text-center min-w-[70px] md:min-w-0 active:scale-95 ${
                  category === cat.id
                    ? `bg-gradient-to-r ${cat.color} border-white`
                    : 'bg-gray-800 border-gray-700 hover:border-gray-600'
                }`}
              >
                <div className="text-xl md:text-2xl">{cat.icon}</div>
                <div className="text-[10px] md:text-xs mt-1 whitespace-nowrap">{cat.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Input - Mobile Optimized */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-4 md:p-6 mb-4 md:mb-6">
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Type your problem here..."
            className="w-full h-24 md:h-32 bg-gray-900 border border-gray-700 rounded-lg p-3 md:p-4 text-base text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 resize-none"
          />

          <div className="flex flex-wrap gap-2 md:gap-4 mt-3 md:mt-4">
            <label className="flex items-center gap-2 px-3 md:px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg cursor-pointer active:scale-95 transition-transform">
              <Upload className="w-4 h-4 md:w-5 md:h-5" />
              <span className="text-sm md:text-base">Upload Image</span>
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
            {imagePreview && (
              <div className="relative">
                <img src={imagePreview} alt="Problem" className="h-12 md:h-16 rounded border-2 border-purple-500" />
                <button onClick={() => { setImage(null); setImagePreview(null); }} className="absolute -top-2 -right-2 bg-red-600 rounded-full w-6 h-6 text-xs flex items-center justify-center">✕</button>
              </div>
            )}
          </div>

          {/* Example questions - Horizontal scroll on mobile */}
          <div className="flex gap-2 mt-3 md:mt-4 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap swipe-scroll">
            {exampleQuestions.map((ex, i) => (
              <button key={i} onClick={() => setQuestion(ex)} className="flex-shrink-0 text-xs px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg whitespace-nowrap active:scale-95 transition-transform">
                {ex}
              </button>
            ))}
          </div>

          <button
            onClick={solveProblem}
            disabled={loading || (!question.trim() && !image)}
            className="mt-4 w-full flex items-center justify-center gap-2 px-4 md:px-6 py-3 md:py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:opacity-50 text-white rounded-xl font-bold text-base md:text-lg active:scale-[0.98] transition-transform"
          >
            {loading ? <><Loader2 className="w-5 h-5 md:w-6 md:h-6 animate-spin" /> Solving...</> : <><Sparkles className="w-5 h-5 md:w-6 md:h-6" /> Solve My Homework</>}
          </button>
        </div>


        {/* Solution Display - Mobile Optimized */}
        {solution && !solution.error && !solution.rawText && (
          <div className="space-y-4 md:space-y-6">
            {/* Problem Statement */}
            <div className="bg-gradient-to-r from-blue-900/50 to-cyan-900/50 border-2 border-blue-500/50 rounded-xl p-4 md:p-6">
              <h3 className="text-base md:text-xl font-bold text-blue-400 mb-2 md:mb-3 flex items-center gap-2">
                <Target className="w-5 h-5 md:w-6 md:h-6" /> Problem Statement
              </h3>
              <p className="text-sm md:text-base text-gray-200">{solution.problemStatement}</p>
            </div>

            {/* Given & Find - Stack on mobile */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="bg-gradient-to-r from-green-900/50 to-emerald-900/50 border-2 border-green-500/50 rounded-xl p-4 md:p-6">
                <h3 className="text-base md:text-lg font-bold text-green-400 mb-2 md:mb-3">📋 Given Values</h3>
                <ul className="space-y-1 md:space-y-2">
                  {solution.givenValues?.map((val, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm md:text-base text-gray-200">
                      <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-green-400 flex-shrink-0" /> {val}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 border-2 border-purple-500/50 rounded-xl p-4 md:p-6">
                <h3 className="text-base md:text-lg font-bold text-purple-400 mb-2 md:mb-3">🎯 Find</h3>
                <p className="text-sm md:text-base text-gray-200">{solution.findWhat}</p>
              </div>
            </div>

            {/* Formulas */}
            {solution.formulas?.length > 0 && (
              <div className="bg-gradient-to-r from-orange-900/50 to-red-900/50 border-2 border-orange-500/50 rounded-xl p-4 md:p-6">
                <h3 className="text-base md:text-xl font-bold text-orange-400 mb-3 md:mb-4 flex items-center gap-2">
                  <Calculator className="w-5 h-5 md:w-6 md:h-6" /> Formulas Used
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  {solution.formulas.map((f, i) => (
                    <div key={i} className="bg-black/30 rounded-lg p-3 md:p-4">
                      <div className="text-orange-300 font-bold text-sm md:text-base">{f.name}</div>
                      <div className="text-lg md:text-2xl font-mono text-white my-1 md:my-2 break-all">{f.equation}</div>
                      <div className="text-xs md:text-sm text-gray-400">{f.description}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Steps */}
            {solution.steps?.length > 0 && (
              <div className="bg-gradient-to-r from-cyan-900/50 to-blue-900/50 border-2 border-cyan-500/50 rounded-xl p-4 md:p-6">
                <h3 className="text-base md:text-xl font-bold text-cyan-400 mb-3 md:mb-4">📝 Step-by-Step Solution</h3>
                <div className="space-y-3 md:space-y-4">
                  {solution.steps.map((step, i) => (
                    <div key={i} className="bg-black/30 rounded-lg p-3 md:p-4 border-l-4 border-cyan-500">
                      <div className="flex items-center gap-2 md:gap-3 mb-2">
                        <span className="w-6 h-6 md:w-8 md:h-8 bg-cyan-600 rounded-full flex items-center justify-center font-bold text-sm md:text-base">{step.stepNumber}</span>
                        <span className="font-bold text-cyan-300 text-sm md:text-base">{step.title}</span>
                      </div>
                      <div className="text-xs md:text-sm text-gray-300 font-mono bg-gray-900/50 p-2 md:p-3 rounded mb-2 overflow-x-auto">{step.calculation}</div>
                      <div className="text-green-400 font-semibold text-sm md:text-base">→ {step.result}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Final Answer */}
            <div className="bg-gradient-to-r from-yellow-900/50 to-amber-900/50 border-4 border-yellow-500/50 rounded-xl p-4 md:p-8 text-center">
              <h3 className="text-lg md:text-2xl font-bold text-yellow-400 mb-2 md:mb-4">🏆 Final Answer</h3>
              <div className="text-xl md:text-3xl font-bold text-white break-words">{solution.finalAnswer}</div>
            </div>

            {/* Explanation */}
            {solution.explanation && (
              <div className="bg-gradient-to-r from-indigo-900/50 to-violet-900/50 border-2 border-indigo-500/50 rounded-xl p-4 md:p-6">
                <h3 className="text-base md:text-lg font-bold text-indigo-400 mb-2 md:mb-3 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 md:w-5 md:h-5" /> Why This Makes Sense
                </h3>
                <p className="text-sm md:text-base text-gray-200">{solution.explanation}</p>
              </div>
            )}

            {/* Tips */}
            {solution.tips?.length > 0 && (
              <div className="bg-gradient-to-r from-pink-900/50 to-rose-900/50 border-2 border-pink-500/50 rounded-xl p-4 md:p-6">
                <h3 className="text-base md:text-lg font-bold text-pink-400 mb-2 md:mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 md:w-5 md:h-5" /> Tips & Common Mistakes
                </h3>
                <ul className="space-y-1 md:space-y-2">
                  {solution.tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm md:text-base text-gray-200">
                      <span className="text-pink-400 flex-shrink-0">💡</span> {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Fallback for raw text */}
        {solution?.rawText && (
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
            <div className="text-gray-200 whitespace-pre-wrap">{solution.rawText}</div>
          </div>
        )}

        {/* Error */}
        {solution?.error && (
          <div className="bg-red-900/50 border border-red-500 rounded-xl p-6 text-center">
            <p className="text-red-400">{solution.error}</p>
          </div>
        )}
      </div>
    </div>
  );
}
