import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronDown, Search, HelpCircle, Zap, Award, Shield, Save, Bug, BookOpen, Rocket, MessageCircle } from 'lucide-react';

export default function HelpPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    {
      id: 1,
      icon: Zap,
      color: 'text-yellow-400',
      question: 'How do I earn XP?',
      answer: `You earn XP (Experience Points) by:
      
• Completing lessons: 100 base XP per lesson
• Quiz performance: 
  - Perfect score (100%): +50 bonus XP
  - Good score (80-99%): +30 bonus XP
  - Passing score (60-79%): +10 bonus XP
• Daily challenges: 50 XP per challenge
• Community participation:
  - Asking questions: 25 XP
  - Answering questions: 50 XP
  - Best answer: +25 bonus XP
• Career projects: 200-500 XP per project
• Daily streak bonuses: 10 XP per consecutive day

You need 1,000 XP to level up. Your level is displayed on your profile and leaderboard.`
    },
    {
      id: 2,
      icon: MessageCircle,
      color: 'text-cyan-400',
      question: 'How does the AI tutor work?',
      answer: `Our AI tutor (EnGo) is powered by Google's Gemini AI and provides:

• Real-time help: Click the floating bot icon on any lesson page
• Context-aware answers: The AI knows which lesson you're on
• Quick help buttons: Pre-made questions for common topics
• Natural conversation: Ask questions in plain English
• Code examples: Get explanations with visual examples
• 24/7 availability: Help whenever you need it

The AI tutor can explain concepts, provide examples, and guide you through difficult topics. It's like having a personal engineering tutor available anytime!`
    },
    {
      id: 3,
      icon: Award,
      color: 'text-purple-400',
      question: 'Do I get certificates?',
      answer: `Yes! You earn certificates for:

• Completing all lessons in a subject:
  - Rockets (28 lessons) → Rocket Engineering Certificate
  - Cars (20 lessons) → Automotive Engineering Certificate
  - Aircraft (20 lessons) → Aviation Engineering Certificate
  - Electronics (20 lessons) → Electronics Engineering Certificate
  - Physics (33 lessons) → Physics Certificate
  - Mathematics (37 lessons) → Mathematics Certificate

• Completing career projects:
  - Each project completion earns a project certificate
  - Showcase your practical engineering skills

• Achievements:
  - Special badges for milestones
  - Displayed on your profile

Certificates are shareable on LinkedIn and include your completion date and performance metrics.`
    },
    {
      id: 4,
      icon: Shield,
      color: 'text-green-400',
      question: 'Is the platform free?',
      answer: `Yes! Engineerium is completely free to use:

✅ Free Features:
• All 150+ MIT-quality lessons
• Interactive 3D models and simulations
• AI tutor (EnGo) assistance
• Progress tracking and XP system
• Community Q&A access
• Career projects
• Certificates and achievements
• J.A.R.V.I.S. Mode (3D exploded views)
• Engineering toolbox
• Books library

No credit card required. No hidden fees. No premium tiers.

Our mission is to make engineering education accessible to everyone, everywhere.`
    },
    {
      id: 5,
      icon: Save,
      color: 'text-blue-400',
      question: 'How is progress saved?',
      answer: `Your progress is automatically saved in two ways:

1. Cloud Storage (Supabase):
   • Syncs across all your devices
   • Requires account login
   • Stores: completed lessons, XP, level, achievements
   • Backed up securely

2. Local Storage (Browser):
   • Works offline
   • Instant access
   • Fallback if cloud is unavailable
   • Syncs with cloud when online

Your progress includes:
• Completed lessons and quiz scores
• Total XP and current level
• Unlocked achievements
• Last accessed lessons
• Community contributions
• Project completions

Progress is saved automatically after each lesson completion. No manual saving needed!`
    },
    {
      id: 6,
      icon: Bug,
      color: 'text-red-400',
      question: 'How do I report bugs?',
      answer: `Found a bug? Help us improve! Here's how to report:

1. GitHub Issues (Preferred):
   • Visit: github.com/yourusername/engineerium
   • Click "Issues" → "New Issue"
   • Describe the bug with screenshots
   • Include: browser, device, steps to reproduce

2. Community Page:
   • Go to Community → Ask Question
   • Tag with "bug" or "technical-issue"
   • Our team monitors daily

3. Email:
   • Send to: support@engineerium.com
   • Include: screenshots, error messages, device info

What to include:
• What you were doing when the bug occurred
• Expected vs actual behavior
• Browser and device information
• Screenshots or screen recording
• Console errors (F12 → Console tab)

We typically respond within 24 hours and fix critical bugs within 48 hours.`
    },
    {
      id: 7,
      icon: BookOpen,
      color: 'text-orange-400',
      question: 'How do lessons work?',
      answer: `Our lessons are structured for maximum learning:

Lesson Structure:
1. Introduction: Overview of the topic
2. Theory: Core concepts with visuals
3. Interactive Elements:
   - 3D models you can rotate and explore
   - Simulations you can adjust
   - Calculators for real-world problems
4. Practice Problems: Apply what you learned
5. Quiz: Test your understanding (required to complete)

Progression System:
• Lessons unlock sequentially
• Must complete previous lesson to unlock next
• Quiz score affects XP earned
• Can revisit completed lessons anytime

Lesson Types:
• Foundation lessons: Math & physics basics
• Subject lessons: Rockets, cars, aircraft, electronics
• Project lessons: Hands-on engineering projects

Each lesson takes 15-30 minutes to complete.`
    },
    {
      id: 8,
      icon: Rocket,
      color: 'text-cyan-400',
      question: 'What is J.A.R.V.I.S. Mode?',
      answer: `J.A.R.V.I.S. Mode is our AI-powered 3D analysis tool:

Features:
• Upload 3D models (GLB/FBX format)
• Interactive exploded views
• Auto-rotate for cinematic showcase
• Click parts to inspect details
• Hover labels show component names
• AI identifies and explains models

Scan with Photo:
• Take a photo of any machine/vehicle
• AI identifies what it is
• Get detailed specifications:
  - Engine specs
  - Performance data
  - Cost information
  - Historical context
• Structured data in colored sections

Perfect for:
• Understanding how machines work
• Analyzing competitor products
• Learning component functions
• Engineering research

Access: Click "J.A.R.V.I.S. Mode" from the home page.`
    }
  ];

  const filteredFAQs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFAQ = (id) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Header */}
      <div className="border-b border-gray-700 bg-gray-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <HelpCircle className="w-7 h-7 text-cyan-400" />
                Help Center
              </h1>
              <p className="text-sm text-gray-400">Find answers to common questions</p>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-cyan-900/20 to-blue-900/20 border-b border-gray-700">
        <div className="max-w-4xl mx-auto px-6 py-12 text-center">
          <h2 className="text-4xl font-bold mb-4">How can we help you?</h2>
          <p className="text-gray-300 mb-8">
            Search our knowledge base or browse frequently asked questions below
          </p>

          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-cyan-400" />
          Frequently Asked Questions
        </h3>

        <div className="space-y-4">
          {filteredFAQs.map((faq) => {
            const Icon = faq.icon;
            const isOpen = openFAQ === faq.id;

            return (
              <div
                key={faq.id}
                className="bg-gray-800/50 border border-gray-700 rounded-xl overflow-hidden hover:border-cyan-500/50 transition-colors"
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-800/80 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <Icon className={`w-6 h-6 ${faq.color}`} />
                    <span className="text-lg font-semibold">{faq.question}</span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-gray-400 transition-transform ${
                      isOpen ? 'transform rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 py-4 border-t border-gray-700 bg-gray-900/50">
                    <div className="text-gray-300 whitespace-pre-line leading-relaxed">
                      {faq.answer}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {filteredFAQs.length === 0 && (
          <div className="text-center py-12">
            <HelpCircle className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">No results found for "{searchQuery}"</p>
            <p className="text-gray-500 mt-2">Try different keywords or browse all FAQs</p>
          </div>
        )}
      </div>

      {/* Contact Section */}
      <div className="bg-gradient-to-r from-cyan-900/20 to-blue-900/20 border-t border-gray-700">
        <div className="max-w-4xl mx-auto px-6 py-12 text-center">
          <h3 className="text-2xl font-bold mb-4">Still need help?</h3>
          <p className="text-gray-300 mb-6">
            Can't find what you're looking for? Our community and support team are here to help.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => navigate('/community')}
              className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 rounded-lg font-semibold transition-colors flex items-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              Ask Community
            </button>
            <button
              onClick={() => window.open('https://github.com/yourusername/engineerium/issues', '_blank')}
              className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold transition-colors flex items-center gap-2"
            >
              <Bug className="w-5 h-5" />
              Report Bug
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
