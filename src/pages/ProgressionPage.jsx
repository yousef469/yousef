import { useNavigate } from 'react-router-dom';
import { ArrowLeft, TrendingUp, Trophy, Target, Award } from 'lucide-react';

export default function ProgressionPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </button>

        <div className="flex items-center gap-4 mb-8">
          <TrendingUp className="w-12 h-12 text-purple-400" />
          <div>
            <h1 className="text-4xl font-bold">Your Progression</h1>
            <p className="text-gray-400">Track your learning journey</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <Trophy className="w-8 h-8 text-yellow-400 mb-4" />
            <h3 className="text-2xl font-bold mb-2">12</h3>
            <p className="text-gray-400">Achievements Unlocked</p>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <Target className="w-8 h-8 text-cyan-400 mb-4" />
            <h3 className="text-2xl font-bold mb-2">85%</h3>
            <p className="text-gray-400">Course Completion</p>
          </div>
          
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <Award className="w-8 h-8 text-purple-400 mb-4" />
            <h3 className="text-2xl font-bold mb-2">Level 7</h3>
            <p className="text-gray-400">Current Level</p>
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
          <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-gray-700/50 rounded-lg">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                <Trophy className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <p className="font-semibold">Completed Rocket Mechanics Course</p>
                <p className="text-sm text-gray-400">2 days ago</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-4 bg-gray-700/50 rounded-lg">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <p className="font-semibold">Achieved 90% in Quiz</p>
                <p className="text-sm text-gray-400">5 days ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
