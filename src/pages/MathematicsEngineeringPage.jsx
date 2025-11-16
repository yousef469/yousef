import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calculator } from 'lucide-react';

export default function MathematicsEngineeringPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate('/learn')}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Learn
        </button>

        <div className="flex items-center gap-4 mb-8">
          <Calculator className="w-12 h-12 text-green-400" />
          <div>
            <h1 className="text-4xl font-bold">Mathematics Engineering</h1>
            <p className="text-gray-400">Build a strong mathematical foundation for engineering</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 rounded-xl p-8 border border-green-500/30">
          <h2 className="text-3xl font-bold mb-4">37 MIT-Quality Lessons Available!</h2>
          <p className="text-gray-300 mb-6">
            Complete mathematics engineering curriculum covering:
          </p>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <h3 className="text-xl font-bold text-green-300 mb-3">🟢 Algebra & Equations (6 lessons)</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• Variables, Constants & Units</li>
                <li>• Linear & Quadratic Equations</li>
                <li>• Systems of Equations</li>
                <li>• Exponents, Powers & Roots</li>
                <li>• Logarithms</li>
                <li>• Rearranging Formulas</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-purple-300 mb-3">🟣 Geometry & Trigonometry (6 lessons)</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• 2D Geometry</li>
                <li>• 3D Coordinate Geometry</li>
                <li>• Triangles (sin, cos, tan)</li>
                <li>• Vector Basics</li>
                <li>• Dot & Cross Product</li>
                <li>• Transformations & Rotations</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-blue-300 mb-3">🔵 Calculus Basics (5 lessons)</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• What is a Derivative</li>
                <li>• Velocity & Acceleration</li>
                <li>• Integration</li>
                <li>• Simple Physical Models</li>
                <li>• Graph Interpretation</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-orange-300 mb-3">🟠 Linear Algebra (4 lessons)</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• Vectors & Matrices</li>
                <li>• Matrix Operations</li>
                <li>• Solving Systems (Ax = b)</li>
                <li>• Transformations & Rotations</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-yellow-300 mb-3">🟡 Statistics & Data (6 lessons)</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• Data & Averages</li>
                <li>• Standard Deviation</li>
                <li>• Probability Basics</li>
                <li>• Error & Uncertainty</li>
                <li>• Units & Conversions</li>
                <li>• Dimensional Analysis</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-cyan-300 mb-3">🔷 Advanced Topics (10 lessons)</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• Advanced Calculus</li>
                <li>• Differential Equations</li>
                <li>• Fourier Series</li>
                <li>• Laplace Transforms</li>
                <li>• And more...</li>
              </ul>
            </div>
          </div>

          <button
            onClick={() => navigate('/learn/mathematics/engineering/map')}
            className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-lg font-bold text-lg transition-all shadow-lg hover:shadow-xl"
          >
            Start Learning Mathematics Engineering →
          </button>
          
          <div className="mt-6 text-center text-sm text-gray-400">
            37 lessons • 148 quiz questions • MIT-quality content
          </div>
        </div>
      </div>
    </div>
  );
}
