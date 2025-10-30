import React, { useState } from 'react';
import { Share2, Twitter, Linkedin, Facebook, Link, Check, Download } from 'lucide-react';

const SocialShare = ({ achievement, stats }) => {
  const [copied, setCopied] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const shareData = {
    title: achievement?.title || `Level ${stats?.level} on Engineerium!`,
    text: achievement?.text || `I just reached Level ${stats?.level} and earned ${stats?.totalPoints} points learning aerospace engineering! 🚀`,
    url: window.location.origin,
    hashtags: ['Engineerium', 'Engineering', 'Learning', 'STEM']
  };

  const handleTwitterShare = () => {
    const text = encodeURIComponent(shareData.text);
    const url = encodeURIComponent(shareData.url);
    const hashtags = shareData.hashtags.join(',');
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}&hashtags=${hashtags}`, '_blank');
  };

  const handleLinkedInShare = () => {
    const url = encodeURIComponent(shareData.url);
    const title = encodeURIComponent(shareData.title);
    const summary = encodeURIComponent(shareData.text);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
  };

  const handleFacebookShare = () => {
    const url = encodeURIComponent(shareData.url);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareData.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const generateShareImage = () => {
    // Create a canvas for the share image
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 630;
    const ctx = canvas.getContext('2d');

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, 1200, 630);
    gradient.addColorStop(0, '#1a1a2e');
    gradient.addColorStop(1, '#0f0f1e');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1200, 630);

    // Title
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 60px Arial';
    ctx.fillText('Engineerium', 100, 150);

    // Stats
    ctx.font = 'bold 80px Arial';
    ctx.fillStyle = '#06b6d4';
    ctx.fillText(`Level ${stats?.level || 1}`, 100, 280);

    ctx.font = '40px Arial';
    ctx.fillStyle = '#9ca3af';
    ctx.fillText(`${stats?.totalPoints || 0} Points Earned`, 100, 350);
    ctx.fillText(`${stats?.lessonsCompleted || 0} Lessons Completed`, 100, 410);
    ctx.fillText(`${stats?.streak || 0} Day Streak 🔥`, 100, 470);

    // Download
    const link = document.createElement('a');
    link.download = 'engineerium-achievement.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-lg transition-all"
      >
        <Share2 className="w-4 h-4" />
        Share Progress
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-8 max-w-md w-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Share Your Achievement</h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Preview Card */}
            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/50 rounded-xl p-6 mb-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-3xl">
                  🏆
                </div>
                <div>
                  <h3 className="text-xl font-bold">{shareData.title}</h3>
                  <p className="text-gray-300 text-sm mt-1">{shareData.text}</p>
                </div>
              </div>
            </div>

            {/* Share Buttons */}
            <div className="space-y-3 mb-6">
              <button
                onClick={handleTwitterShare}
                className="w-full flex items-center gap-3 p-4 bg-[#1DA1F2] hover:bg-[#1a8cd8] rounded-lg transition-colors"
              >
                <Twitter className="w-5 h-5" />
                <span className="font-semibold">Share on Twitter</span>
              </button>

              <button
                onClick={handleLinkedInShare}
                className="w-full flex items-center gap-3 p-4 bg-[#0A66C2] hover:bg-[#004182] rounded-lg transition-colors"
              >
                <Linkedin className="w-5 h-5" />
                <span className="font-semibold">Share on LinkedIn</span>
              </button>

              <button
                onClick={handleFacebookShare}
                className="w-full flex items-center gap-3 p-4 bg-[#1877F2] hover:bg-[#166fe5] rounded-lg transition-colors"
              >
                <Facebook className="w-5 h-5" />
                <span className="font-semibold">Share on Facebook</span>
              </button>

              <button
                onClick={handleCopyLink}
                className="w-full flex items-center gap-3 p-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              >
                {copied ? <Check className="w-5 h-5 text-green-400" /> : <Link className="w-5 h-5" />}
                <span className="font-semibold">{copied ? 'Link Copied!' : 'Copy Link'}</span>
              </button>

              <button
                onClick={generateShareImage}
                className="w-full flex items-center gap-3 p-4 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 rounded-lg transition-colors"
              >
                <Download className="w-5 h-5" />
                <span className="font-semibold">Download Image</span>
              </button>
            </div>

            <p className="text-center text-gray-400 text-sm">
              Share your progress and inspire others to learn! 🚀
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default SocialShare;
