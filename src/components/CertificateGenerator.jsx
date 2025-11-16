import { useState } from 'react';
import { Download, Share2, X, Award } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Logo from './Logo';

export default function CertificateGenerator({ subject, totalLessons, onClose }) {
  const { user } = useAuth();
  const [generating, setGenerating] = useState(false);

  const subjectNames = {
    physics: 'Physics Engineering',
    mathematics: 'Mathematics Engineering',
    electronics: 'Electronics & Robotics',
    rockets: 'Rocket Engineering',
    cars: 'Automotive Engineering',
    planes: 'Aircraft Engineering'
  };

  const generateCertificate = () => {
    setGenerating(true);
    
    const canvas = document.createElement('canvas');
    canvas.width = 1920;
    canvas.height = 1080;
    const ctx = canvas.getContext('2d');

    // Background - elegant gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#0f172a');
    gradient.addColorStop(0.5, '#1e3a8a');
    gradient.addColorStop(1, '#581c87');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Border
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 20;
    ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);

    // Inner border
    ctx.strokeStyle = '#06b6d4';
    ctx.lineWidth = 5;
    ctx.strokeRect(60, 60, canvas.width - 120, canvas.height - 120);

    // Certificate title
    ctx.font = 'bold 80px Arial';
    ctx.fillStyle = '#fbbf24';
    ctx.textAlign = 'center';
    ctx.fillText('CERTIFICATE OF COMPLETION', canvas.width / 2, 200);

    // Subtitle
    ctx.font = '40px Arial';
    ctx.fillStyle = '#e2e8f0';
    ctx.fillText('This certifies that', canvas.width / 2, 300);

    // Student name
    ctx.font = 'bold 72px Arial';
    ctx.fillStyle = '#ffffff';
    const studentName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Student';
    ctx.fillText(studentName, canvas.width / 2, 420);

    // Achievement text
    ctx.font = '40px Arial';
    ctx.fillStyle = '#e2e8f0';
    ctx.fillText('has successfully completed', canvas.width / 2, 520);

    // Subject name
    ctx.font = 'bold 64px Arial';
    ctx.fillStyle = '#06b6d4';
    ctx.fillText(subjectNames[subject] || subject, canvas.width / 2, 640);

    // Lesson count
    ctx.font = '36px Arial';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText(`${totalLessons} Lessons Completed`, canvas.width / 2, 720);

    // Date
    const date = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
    ctx.font = '32px Arial';
    ctx.fillStyle = '#cbd5e1';
    ctx.fillText(`Issued on ${date}`, canvas.width / 2, 850);

    // Engineerium branding
    ctx.font = 'bold 48px Arial';
    ctx.fillStyle = '#06b6d4';
    ctx.fillText('Engineerium', canvas.width / 2, 950);

    ctx.font = '28px Arial';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText('Interactive Engineering Education Platform', canvas.width / 2, 1000);

    // Download
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Engineerium_${subject}_Certificate_${studentName.replace(/\s+/g, '_')}.png`;
      a.click();
      URL.revokeObjectURL(url);
      setGenerating(false);
    });
  };

  const handleShare = () => {
    const shareText = `🎓 I just completed ${subjectNames[subject]} on Engineerium! ${totalLessons} lessons mastered! 🚀`;
    const shareUrl = window.location.origin;

    if (navigator.share) {
      navigator.share({
        title: 'Engineerium Certificate',
        text: shareText,
        url: shareUrl
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${shareText}\n\n${shareUrl}`);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 max-w-2xl w-full border border-cyan-500/30 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-8">
          <Award className="w-20 h-20 text-yellow-400 mx-auto mb-4" />
          <h2 className="text-3xl font-bold mb-2">Congratulations!</h2>
          <p className="text-gray-300 text-lg">
            You've completed all lessons in {subjectNames[subject]}
          </p>
        </div>

        {/* Certificate Preview */}
        <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-xl p-8 border border-cyan-500/30 mb-6">
          <div className="text-center">
            <div className="mb-4">
              <Logo size="md" showText={true} />
            </div>
            <div className="text-2xl font-bold text-yellow-400 mb-2">CERTIFICATE OF COMPLETION</div>
            <div className="text-gray-300 mb-2">This certifies that</div>
            <div className="text-3xl font-bold text-white mb-2">
              {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Student'}
            </div>
            <div className="text-gray-300 mb-2">has successfully completed</div>
            <div className="text-2xl font-bold text-cyan-400 mb-2">{subjectNames[subject]}</div>
            <div className="text-gray-400 text-sm">{totalLessons} Lessons Completed</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={generateCertificate}
            disabled={generating}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-lg font-semibold transition-colors disabled:opacity-50"
          >
            <Download className="w-5 h-5" />
            {generating ? 'Generating...' : 'Download Certificate'}
          </button>

          <button
            onClick={handleShare}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 rounded-lg font-semibold transition-colors"
          >
            <Share2 className="w-5 h-5" />
            Share Achievement
          </button>
        </div>

        <p className="text-center text-sm text-gray-400 mt-4">
          Your certificate will be downloaded as a high-quality image
        </p>
      </div>
    </div>
  );
}
