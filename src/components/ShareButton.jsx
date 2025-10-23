import { useState } from 'react';
import { Share2, Check, Twitter, Facebook, Link } from 'lucide-react';

export default function ShareButton({ title, description, url }) {
  const [showMenu, setShowMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl = url || window.location.href;
  const shareTitle = title || 'Check out this 3D model!';
  const shareText = description || 'Interactive 3D engineering models on AeroAI 3D';

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const shareToTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(twitterUrl, '_blank', 'width=550,height=420');
  };

  const shareToFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(facebookUrl, '_blank', 'width=550,height=420');
  };

  const nativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl
        });
      } catch (err) {
        if (err.name !== 'AbortError') {
          console.error('Share failed:', err);
        }
      }
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => navigator.share ? nativeShare() : setShowMenu(!showMenu)}
        className="flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-lg font-semibold transition-colors"
      >
        <Share2 className="w-5 h-5" />
        <span>Share</span>
      </button>

      {showMenu && !navigator.share && (
        <div className="absolute right-0 mt-2 w-64 bg-gray-800 border border-gray-700 rounded-xl shadow-xl overflow-hidden z-10">
          <div className="p-3 border-b border-gray-700">
            <div className="text-sm font-semibold text-gray-300">Share this model</div>
          </div>

          <div className="p-2">
            <button
              onClick={shareToTwitter}
              className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-700 rounded-lg transition-colors text-left"
            >
              <Twitter className="w-5 h-5 text-blue-400" />
              <span>Share on Twitter</span>
            </button>

            <button
              onClick={shareToFacebook}
              className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-700 rounded-lg transition-colors text-left"
            >
              <Facebook className="w-5 h-5 text-blue-600" />
              <span>Share on Facebook</span>
            </button>

            <button
              onClick={copyLink}
              className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-700 rounded-lg transition-colors text-left"
            >
              {copied ? (
                <>
                  <Check className="w-5 h-5 text-green-400" />
                  <span className="text-green-400">Link copied!</span>
                </>
              ) : (
                <>
                  <Link className="w-5 h-5 text-gray-400" />
                  <span>Copy link</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {showMenu && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setShowMenu(false)}
        />
      )}
    </div>
  );
}
