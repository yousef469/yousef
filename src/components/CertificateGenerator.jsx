import React, { useRef } from 'react';
import { Award, Download, Share2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const CertificateGenerator = ({ courseName, completionDate, score }) => {
  const { user } = useAuth();
  const canvasRef = useRef(null);

  const generateCertificate = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1920;
    canvas.height = 1080;
    const ctx = canvas.getContext('2d');

    // Background
    const gradient = ctx.createLinearGradient(0, 0, 1920, 1080);
    gradient.addColorStop(0, '#1a1a2e');
    gradient.addColorStop(0.5, '#16213e');
    gradient.addColorStop(1, '#0f3460');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1920, 1080);

    // Border
    ctx.strokeStyle = '#06b6d4';
    ctx.lineWidth = 20;
    ctx.strokeRect(60, 60, 1800, 960);

    // Inner border
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 5;
    ctx.strokeRect(80, 80, 1760, 920);

    // Title
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 80px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('CERTIFICATE OF COMPLETION', 960, 200);

    // Subtitle
    ctx.font = '40px Arial';
    ctx.fillStyle = '#9ca3af';
    ctx.fillText('This certifies that', 960, 300);

    // Student Name
    ctx.font = 'bold 70px Arial';
    ctx.fillStyle = '#06b6d4';
    const studentName = user?.email?.split('@')[0] || 'Student';
    ctx.fillText(studentName.toUpperCase(), 960, 420);

    // Line under name
    ctx.strokeStyle = '#06b6d4';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(560, 450);
    ctx.lineTo(1360, 450);
    ctx.stroke();

    // Course completion text
    ctx.font = '40px Arial';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('has successfully completed', 960, 540);

    // Course Name
    ctx.font = 'bold 60px Arial';
    ctx.fillStyle = '#3b82f6';
    ctx.fillText(courseName || 'Aerospace Engineering Course', 960, 640);

    // Score
    if (score) {
      ctx.font = '35px Arial';
      ctx.fillStyle = '#10b981';
      ctx.fillText(`Final Score: ${score}%`, 960, 720);
    }

    // Date
    ctx.font = '30px Arial';
    ctx.fillStyle = '#9ca3af';
    const date = completionDate || new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    ctx.fillText(`Completed on ${date}`, 960, 800);

    // Logo/Badge
    ctx.beginPath();
    ctx.arc(960, 900, 60, 0, Math.PI * 2);
    ctx.fillStyle = '#06b6d4';
    ctx.fill();
    ctx.font = 'bold 50px Arial';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('🚀', 960, 920);

    // Footer
    ctx.font = '25px Arial';
    ctx.fillStyle = '#6b7280';
    ctx.fillText('Engineerium - Interactive Engineering Education', 960, 980);

    // Download
    const link = document.createElement('a');
    link.download = `AeroAI-Certificate-${courseName.replace(/\s+/g, '-')}.png`;
    link.href = canvas.toDataURL('image/png', 1.0);
    link.click();
  };

  const generatePDF = () => {
    // For a real PDF, you'd use jsPDF library
    // This is a simplified version that downloads as image
    generateCertificate();
  };

  return (
    <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/50 rounded-2xl p-8">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
          <Award className="w-8 h-8 text-white" />
        </div>
        <div>
          <h3 className="text-2xl font-bold">Congratulations! 🎉</h3>
          <p className="text-gray-300">You've completed {courseName}</p>
        </div>
      </div>

      {/* Certificate Preview */}
      <div className="bg-gray-900 rounded-xl p-8 mb-6 border-4 border-cyan-500/30">
        <div className="text-center">
          <p className="text-sm text-gray-400 mb-2">CERTIFICATE OF COMPLETION</p>
          <p className="text-gray-500 text-xs mb-4">This certifies that</p>
          <p className="text-2xl font-bold text-cyan-400 mb-4">
            {user?.email?.split('@')[0]?.toUpperCase() || 'STUDENT'}
          </p>
          <p className="text-gray-400 text-sm mb-2">has successfully completed</p>
          <p className="text-xl font-bold text-blue-400 mb-4">{courseName}</p>
          {score && (
            <p className="text-green-400 text-sm mb-4">Final Score: {score}%</p>
          )}
          <p className="text-gray-500 text-xs mb-4">
            {completionDate || new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
          <div className="text-4xl mb-2">🚀</div>
          <p className="text-gray-600 text-xs">Engineerium - Interactive Engineering Education</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={generatePDF}
          className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-lg font-semibold transition-all"
        >
          <Download className="w-5 h-5" />
          Download Certificate
        </button>
        <button
          onClick={() => {
            // Share functionality
            if (navigator.share) {
              navigator.share({
                title: 'My AeroAI Certificate',
                text: `I just completed ${courseName} on Engineerium!`,
                url: window.location.href
              });
            }
          }}
          className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
        >
          <Share2 className="w-5 h-5" />
        </button>
      </div>

      <p className="text-center text-gray-400 text-sm mt-4">
        Share your achievement on LinkedIn to showcase your skills! 🎓
      </p>
    </div>
  );
};

export default CertificateGenerator;
