import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Rocket, Brain, Trophy, Users, Zap, Target, BookOpen, Award } from 'lucide-react';
import Logo from '../components/Logo';

export default function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </button>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <Logo size="lg" showText={false} />
          </div>
          <h1 className="text-5xl font-bold mb-4 text-white">About Engineerium</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Your gateway to mastering engineering through interactive learning, AI-powered tutoring, and hands-on practice.
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 rounded-2xl p-8 border border-cyan-500/30 mb-12">
          <h2 className="text-3xl font-bold mb-4 text-cyan-300">Our Mission</h2>
          <p className="text-gray-300 text-lg leading-relaxed mb-4">
            Engineerium is dedicated to making high-quality engineering education accessible to everyone. We believe that learning complex engineering concepts should be engaging, interactive, and fun.
          </p>
          <p className="text-gray-300 text-lg leading-relaxed">
            Our platform combines MIT-quality curriculum with cutting-edge AI technology to create a personalized learning experience that adapts to your pace and style.
          </p>
        </div>

        {/* What We Offer */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center text-white">What We Offer</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Feature 1 */}
            <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-xl p-6 border border-purple-500/30">
              <BookOpen className="w-12 h-12 text-purple-400 mb-4" />
              <h3 className="text-xl font-bold mb-3 text-purple-300">128 MIT-Quality Lessons</h3>
              <p className="text-gray-300">
                Comprehensive curriculum covering Physics, Mathematics, Electronics, Rockets, Cars, and Aircraft engineering.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-xl p-6 border border-blue-500/30">
              <Brain className="w-12 h-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-bold mb-3 text-blue-300">AI-Powered Tutoring</h3>
              <p className="text-gray-300">
                Get instant help from our Gemini AI tutor. Ask questions, get explanations, and receive personalized guidance 24/7.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 rounded-xl p-6 border border-green-500/30">
              <Trophy className="w-12 h-12 text-green-400 mb-4" />
              <h3 className="text-xl font-bold mb-3 text-green-300">Gamified Learning</h3>
              <p className="text-gray-300">
                Earn XP, level up, unlock achievements, and track your progress as you master engineering concepts.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-gradient-to-br from-orange-900/30 to-red-900/30 rounded-xl p-6 border border-orange-500/30">
              <Rocket className="w-12 h-12 text-orange-400 mb-4" />
              <h3 className="text-xl font-bold mb-3 text-orange-300">Interactive 3D Models</h3>
              <p className="text-gray-300">
                Explore rockets, planes, and cars in stunning 3D. Rotate, zoom, and interact with real engineering models.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-gradient-to-br from-yellow-900/30 to-amber-900/30 rounded-xl p-6 border border-yellow-500/30">
              <Zap className="w-12 h-12 text-yellow-400 mb-4" />
              <h3 className="text-xl font-bold mb-3 text-yellow-300">512 Quiz Questions</h3>
              <p className="text-gray-300">
                Test your knowledge with comprehensive quizzes. Get instant feedback and learn from your mistakes.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-gradient-to-br from-pink-900/30 to-rose-900/30 rounded-xl p-6 border border-pink-500/30">
              <Users className="w-12 h-12 text-pink-400 mb-4" />
              <h3 className="text-xl font-bold mb-3 text-pink-300">Community Learning</h3>
              <p className="text-gray-300">
                Join a community of learners. Share progress, compete on leaderboards, and learn together.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-8 border border-gray-700 mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center text-white">By The Numbers</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-cyan-400 mb-2">128</div>
              <div className="text-gray-400">Lessons</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">512</div>
              <div className="text-gray-400">Quiz Questions</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">6</div>
              <div className="text-gray-400">Engineering Subjects</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-400 mb-2">20+</div>
              <div className="text-gray-400">Achievements</div>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center text-white">Why Choose Engineerium?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <Target className="w-8 h-8 text-cyan-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold mb-2 text-cyan-300">Personalized Learning Path</h3>
                <p className="text-gray-300">
                  Sequential lesson unlocking ensures you build a strong foundation before advancing to complex topics.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Award className="w-8 h-8 text-purple-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold mb-2 text-purple-300">Real-World Applications</h3>
                <p className="text-gray-300">
                  Learn with real examples from SpaceX, NASA, Tesla, and leading aerospace companies.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Brain className="w-8 h-8 text-blue-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold mb-2 text-blue-300">AI-Powered Support</h3>
                <p className="text-gray-300">
                  Never get stuck. Our AI tutor is available 24/7 to answer questions and explain concepts.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Zap className="w-8 h-8 text-yellow-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold mb-2 text-yellow-300">Instant Feedback</h3>
                <p className="text-gray-300">
                  Get immediate results on quizzes and lessons. Learn from mistakes and improve quickly.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4 text-white">Ready to Start Your Engineering Journey?</h2>
          <p className="text-xl text-white/90 mb-6">
            Join thousands of students learning engineering the modern way.
          </p>
          <button
            onClick={() => navigate('/auth')}
            className="px-8 py-4 bg-white text-blue-600 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
          >
            Get Started Free
          </button>
        </div>
      </div>
    </div>
  );
}
