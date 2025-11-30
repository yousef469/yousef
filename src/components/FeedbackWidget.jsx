import { useState } from 'react';
import { MessageSquare, X, Send, Star, ThumbsUp, Bug, Lightbulb } from 'lucide-react';
import { supabase } from '../services/supabase';
import { useAuth } from '../contexts/AuthContext';

const FeedbackWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [feedbackType, setFeedbackType] = useState('general');
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { user } = useAuth();

  const feedbackTypes = [
    { id: 'general', icon: MessageSquare, label: 'General' },
    { id: 'bug', icon: Bug, label: 'Bug Report' },
    { id: 'feature', icon: Lightbulb, label: 'Feature Request' },
    { id: 'praise', icon: ThumbsUp, label: 'Praise' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSubmitting(true);

    try {
      // Try to save to Supabase
      const feedbackData = {
        type: feedbackType,
        message: message.trim(),
        rating: rating || null,
        user_id: user?.id || null,
        user_email: user?.email || 'anonymous',
        page_url: window.location.href,
        user_agent: navigator.userAgent,
        created_at: new Date().toISOString()
      };

      // Try Supabase first
      const { error } = await supabase.from('feedback').insert([feedbackData]);
      
      if (error) {
        // Fallback: store locally
        const localFeedback = JSON.parse(localStorage.getItem('pending_feedback') || '[]');
        localFeedback.push(feedbackData);
        localStorage.setItem('pending_feedback', JSON.stringify(localFeedback));
        console.log('Feedback stored locally (will sync later)');
      }

      setSubmitted(true);
      setTimeout(() => {
        setIsOpen(false);
        setSubmitted(false);
        setMessage('');
        setRating(0);
        setFeedbackType('general');
      }, 2000);
    } catch (err) {
      console.error('Feedback error:', err);
      // Store locally as fallback
      const localFeedback = JSON.parse(localStorage.getItem('pending_feedback') || '[]');
      localFeedback.push({ type: feedbackType, message, rating, timestamp: Date.now() });
      localStorage.setItem('pending_feedback', JSON.stringify(localFeedback));
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-40 bg-gradient-to-r from-cyan-500 to-blue-600 text-white p-3 rounded-full shadow-lg hover:shadow-cyan-500/50 transition-all hover:scale-110"
        aria-label="Send feedback"
      >
        <MessageSquare className="w-5 h-5" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-50 w-80 bg-gray-900 border border-cyan-500/30 rounded-2xl shadow-2xl shadow-cyan-500/20 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-600 to-blue-600 px-4 py-3 flex items-center justify-between">
        <h3 className="font-bold text-white">Send Feedback</h3>
        <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">
          <X className="w-5 h-5" />
        </button>
      </div>

      {submitted ? (
        <div className="p-6 text-center">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <ThumbsUp className="w-8 h-8 text-green-400" />
          </div>
          <h4 className="text-lg font-bold text-white mb-2">Thank you! 🎉</h4>
          <p className="text-gray-400 text-sm">Your feedback helps us improve Engineerium.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Feedback Type */}
          <div className="grid grid-cols-4 gap-2">
            {feedbackTypes.map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                type="button"
                onClick={() => setFeedbackType(id)}
                className={`p-2 rounded-lg flex flex-col items-center gap-1 transition-all text-xs ${
                  feedbackType === id
                    ? 'bg-cyan-500/20 border border-cyan-500 text-cyan-400'
                    : 'bg-gray-800 border border-gray-700 text-gray-400 hover:border-gray-600'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </button>
            ))}
          </div>

          {/* Rating */}
          <div>
            <label className="text-sm text-gray-400 mb-2 block">How's your experience?</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="p-1 transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-6 h-6 ${
                      star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Message */}
          <div>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us what you think..."
              className="w-full bg-gray-800 border border-gray-700 rounded-lg p-3 text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none resize-none"
              rows={3}
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting || !message.trim()}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-2 rounded-lg font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {isSubmitting ? (
              <span>Sending...</span>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Send Feedback</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
};

export default FeedbackWidget;
