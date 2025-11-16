import { useState } from 'react';
import { Share2, Twitter, Facebook, Linkedin, Link, Download, X } from 'lucide-react';

export default function ShareAchievement({ achievement, onClose }) {
  const [copied, setCopied] = useState(false);

  const shareText = `🎉 I just earned "${achievement.title}" on Engineerium! ${achievement.description}`;
  const shareUrl = window.location.origin;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${shareText}\n\n${shareUrl}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTwitterShare = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const handleFacebookShare = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const handleLinkedInShare = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const handleDownloadImage = () => {
    // Create a canvas to generate achievement image
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 630;
    const ctx = canvas.getContext('2d');

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#1e293b');
    gradient.addColorStop(0.5, '#1e40af');
    gradient.addColorStop(1, '#7c3aed');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Achievement icon
    ctx.font = 'bold 120px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(achievement.icon || '🏆', canvas.width / 2, 200);

    // Achievement title
    ctx.font = 'bold 48px Arial';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(achievement.title, canvas.width / 2, 300);

    // Description
    ctx.font = '32px Arial';
    ctx.fillStyle = '#e2e8f0';
    ctx.fillText(achievement.description, canvas.width / 2, 360);

    // Engineerium branding
    ctx.font = 'bold 28px Arial';
    ctx.fillStyle = '#06b6d4';
    ctx.fillText('Engineerium', canvas.width / 2, 550);

    // Download
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${achievement.title.replace(/\s+/g, '_')}_achievement.png`;
      a.click();
      URL.revokeObjectURL(url);
    });
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 max-w-md w-full border border-cyan-500/30 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-6">
          <div className="text-6xl mb-4">{achievement.icon || '🏆'}</div>
          <h2 className="text-2xl font-bold mb-2">{achievement.title}</h2>
          <p className="text-gray-300">{achievement.description}</p>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleTwitterShare}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-[#1DA1F2] hover:bg-[#1a8cd8] rounded-lg font-semibold transition-colors"
          >
            <Twitter className="w-5 h-5" />
            Share on Twitter
          </button>

          <button
            onClick={handleFacebookShare}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-[#4267B2] hover:bg-[#365899] rounded-lg font-semibold transition-colors"
          >
            <Facebook className="w-5 h-5" />
            Share on Facebook
          </button>

          <button
            onClick={handleLinkedInShare}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-[#0077B5] hover:bg-[#006399] rounded-lg font-semibold transition-colors"
          >
            <Linkedin className="w-5 h-5" />
            Share on LinkedIn
          </button>

          <button
            onClick={handleDownloadImage}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-colors"
          >
            <Download className="w-5 h-5" />
            Download Image
          </button>

          <button
            onClick={handleCopyLink}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold transition-colors"
          >
            <Link className="w-5 h-5" />
            {copied ? 'Copied!' : 'Copy Link'}
          </button>
        </div>
      </div>
    </div>
  );
}
