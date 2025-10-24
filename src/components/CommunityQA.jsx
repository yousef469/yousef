import { useState, useEffect } from 'react';
import { MessageCircle, ThumbsUp, ThumbsDown, Send, User, Clock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function CommunityQA({ modelId, lessonId }) {
  const { user } = useAuth();
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [replyTo, setReplyTo] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [sortBy, setSortBy] = useState('popular'); // popular, recent

  // Mock data - replace with Supabase queries
  useEffect(() => {
    // TODO: Fetch from Supabase
    const mockQuestions = [
      {
        id: 1,
        user: { name: 'Alex Chen', avatar: '👨‍🚀' },
        question: 'Why does the rocket need multiple stages?',
        answer: 'Multiple stages allow the rocket to drop empty fuel tanks, reducing mass and increasing efficiency. This is based on the Tsiolkovsky rocket equation!',
        upvotes: 24,
        downvotes: 2,
        replies: 3,
        timestamp: '2 hours ago',
        hasUpvoted: false,
        hasDownvoted: false
      },
      {
        id: 2,
        user: { name: 'Sarah Johnson', avatar: '👩‍🔬' },
        question: 'How does thrust vectoring work exactly?',
        answer: 'Thrust vectoring uses gimbals to tilt the engine nozzle, changing the direction of thrust. This creates a moment that rotates the rocket.',
        upvotes: 18,
        downvotes: 1,
        replies: 5,
        timestamp: '5 hours ago',
        hasUpvoted: false,
        hasDownvoted: false
      },
      {
        id: 3,
        user: { name: 'Mike Rodriguez', avatar: '🧑‍💻' },
        question: 'What fuel does the Falcon 9 use?',
        answer: 'Falcon 9 uses RP-1 (refined kerosene) and liquid oxygen (LOX). This combination provides good performance and is relatively easy to handle.',
        upvotes: 31,
        downvotes: 0,
        replies: 2,
        timestamp: '1 day ago',
        hasUpvoted: true,
        hasDownvoted: false
      }
    ];

    // Sort questions
    const sorted = [...mockQuestions].sort((a, b) => {
      if (sortBy === 'popular') {
        return (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes);
      } else {
        return b.id - a.id; // Newer first
      }
    });

    setQuestions(sorted);
  }, [sortBy, modelId, lessonId]);

  const handleAskQuestion = async () => {
    if (!newQuestion.trim() || !user) return;

    // TODO: Save to Supabase
    const question = {
      id: Date.now(),
      user: { name: user.email.split('@')[0], avatar: '👤' },
      question: newQuestion,
      answer: null,
      upvotes: 0,
      downvotes: 0,
      replies: 0,
      timestamp: 'Just now',
      hasUpvoted: false,
      hasDownvoted: false
    };

    setQuestions([question, ...questions]);
    setNewQuestion('');
  };

  const handleVote = (questionId, voteType) => {
    if (!user) return;

    setQuestions(questions.map(q => {
      if (q.id === questionId) {
        const newQ = { ...q };
        
        if (voteType === 'up') {
          if (q.hasUpvoted) {
            newQ.upvotes--;
            newQ.hasUpvoted = false;
          } else {
            newQ.upvotes++;
            newQ.hasUpvoted = true;
            if (q.hasDownvoted) {
              newQ.downvotes--;
              newQ.hasDownvoted = false;
            }
          }
        } else {
          if (q.hasDownvoted) {
            newQ.downvotes--;
            newQ.hasDownvoted = false;
          } else {
            newQ.downvotes++;
            newQ.hasDownvoted = true;
            if (q.hasUpvoted) {
              newQ.upvotes--;
              newQ.hasUpvoted = false;
            }
          }
        }
        
        return newQ;
      }
      return q;
    }));

    // TODO: Save vote to Supabase
  };

  const handleReply = (questionId) => {
    if (!replyText.trim() || !user) return;

    // TODO: Save reply to Supabase
    setReplyTo(null);
    setReplyText('');
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <MessageCircle className="w-6 h-6 text-purple-400" />
          <h3 className="text-xl font-bold">Community Q&A</h3>
          <span className="px-2 py-1 bg-purple-500/20 text-purple-400 text-sm rounded-full">
            {questions.length} questions
          </span>
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-3 py-1 bg-gray-700 border border-gray-600 rounded-lg text-sm focus:outline-none focus:border-purple-500"
        >
          <option value="popular">Most Popular</option>
          <option value="recent">Most Recent</option>
        </select>
      </div>

      {/* Ask Question */}
      {user ? (
        <div className="mb-6 p-4 bg-gray-900/50 rounded-lg border border-gray-700">
          <textarea
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            placeholder="Ask a question about this lesson..."
            className="w-full bg-gray-800 border border-gray-600 rounded-lg p-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 resize-none"
            rows="3"
          />
          <div className="flex justify-end mt-2">
            <button
              onClick={handleAskQuestion}
              disabled={!newQuestion.trim()}
              className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-lg font-semibold transition-colors"
            >
              <Send className="w-4 h-4" />
              Ask Question
            </button>
          </div>
        </div>
      ) : (
        <div className="mb-6 p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg text-center">
          <p className="text-gray-300">Sign in to ask questions and participate in discussions</p>
        </div>
      )}

      {/* Questions List */}
      <div className="space-y-4">
        {questions.map((q) => (
          <div key={q.id} className="bg-gray-900/50 rounded-lg border border-gray-700 p-4">
            {/* Question Header */}
            <div className="flex items-start gap-3 mb-3">
              <div className="text-2xl">{q.user.avatar}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold">{q.user.name}</span>
                  <span className="text-xs text-gray-500">•</span>
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {q.timestamp}
                  </span>
                </div>
                <p className="text-gray-300">{q.question}</p>
              </div>
            </div>

            {/* Answer */}
            {q.answer && (
              <div className="ml-11 mb-3 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                <div className="text-xs text-green-400 font-semibold mb-1">✓ Answer</div>
                <p className="text-sm text-gray-300">{q.answer}</p>
              </div>
            )}

            {/* Actions */}
            <div className="ml-11 flex items-center gap-4">
              {/* Upvote */}
              <button
                onClick={() => handleVote(q.id, 'up')}
                disabled={!user}
                className={`flex items-center gap-1 px-2 py-1 rounded transition-colors ${
                  q.hasUpvoted
                    ? 'bg-green-500/20 text-green-400'
                    : 'hover:bg-gray-800 text-gray-400'
                } disabled:cursor-not-allowed`}
              >
                <ThumbsUp className="w-4 h-4" />
                <span className="text-sm font-semibold">{q.upvotes}</span>
              </button>

              {/* Downvote */}
              <button
                onClick={() => handleVote(q.id, 'down')}
                disabled={!user}
                className={`flex items-center gap-1 px-2 py-1 rounded transition-colors ${
                  q.hasDownvoted
                    ? 'bg-red-500/20 text-red-400'
                    : 'hover:bg-gray-800 text-gray-400'
                } disabled:cursor-not-allowed`}
              >
                <ThumbsDown className="w-4 h-4" />
                <span className="text-sm font-semibold">{q.downvotes}</span>
              </button>

              {/* Reply */}
              <button
                onClick={() => setReplyTo(replyTo === q.id ? null : q.id)}
                disabled={!user}
                className="flex items-center gap-1 px-2 py-1 hover:bg-gray-800 rounded transition-colors text-gray-400 text-sm disabled:cursor-not-allowed"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{q.replies} replies</span>
              </button>
            </div>

            {/* Reply Box */}
            {replyTo === q.id && (
              <div className="ml-11 mt-3 p-3 bg-gray-800 rounded-lg border border-gray-600">
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Write a reply..."
                  className="w-full bg-gray-700 border border-gray-600 rounded p-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 resize-none"
                  rows="2"
                />
                <div className="flex justify-end gap-2 mt-2">
                  <button
                    onClick={() => setReplyTo(null)}
                    className="px-3 py-1 text-sm text-gray-400 hover:text-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleReply(q.id)}
                    disabled={!replyText.trim()}
                    className="px-3 py-1 text-sm bg-purple-500 hover:bg-purple-600 disabled:bg-gray-700 rounded transition-colors"
                  >
                    Reply
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {questions.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>No questions yet. Be the first to ask!</p>
        </div>
      )}
    </div>
  );
}
