import { useState } from 'react';
import { MessageCircle, Heart, Reply, MoreHorizontal, Send, Trash2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function CommentSystem({ postId, initialComments = [] }) {
  const { user } = useAuth();
  const [comments, setComments] = useState(initialComments.length > 0 ? initialComments : [
    {
      id: 1,
      author: 'Alex Chen',
      avatar: '🚀',
      content: 'Great explanation! This really helped me understand the concept better.',
      likes: 12,
      liked: false,
      createdAt: '2 hours ago',
      replies: [
        {
          id: 11,
          author: 'Sarah Kim',
          avatar: '✈️',
          content: 'Agreed! The diagrams were especially helpful.',
          likes: 5,
          liked: false,
          createdAt: '1 hour ago'
        }
      ]
    },
    {
      id: 2,
      author: 'Mike Johnson',
      avatar: '🏎️',
      content: 'Could you explain more about the efficiency calculations?',
      likes: 8,
      liked: false,
      createdAt: '3 hours ago',
      replies: []
    }
  ]);
  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState('');

  const handleAddComment = () => {
    if (!newComment.trim() || !user) return;

    const comment = {
      id: Date.now(),
      author: user.email?.split('@')[0] || 'Anonymous',
      avatar: '👤',
      content: newComment,
      likes: 0,
      liked: false,
      createdAt: 'Just now',
      replies: []
    };

    setComments([comment, ...comments]);
    setNewComment('');
  };

  const handleAddReply = (commentId) => {
    if (!replyText.trim() || !user) return;

    const reply = {
      id: Date.now(),
      author: user.email?.split('@')[0] || 'Anonymous',
      avatar: '👤',
      content: replyText,
      likes: 0,
      liked: false,
      createdAt: 'Just now'
    };

    setComments(comments.map(c => 
      c.id === commentId 
        ? { ...c, replies: [...c.replies, reply] }
        : c
    ));
    setReplyText('');
    setReplyingTo(null);
  };

  const handleLike = (commentId, isReply = false, parentId = null) => {
    if (isReply && parentId) {
      setComments(comments.map(c => 
        c.id === parentId 
          ? {
              ...c,
              replies: c.replies.map(r => 
                r.id === commentId 
                  ? { ...r, likes: r.liked ? r.likes - 1 : r.likes + 1, liked: !r.liked }
                  : r
              )
            }
          : c
      ));
    } else {
      setComments(comments.map(c => 
        c.id === commentId 
          ? { ...c, likes: c.liked ? c.likes - 1 : c.likes + 1, liked: !c.liked }
          : c
      ));
    }
  };

  const handleDelete = (commentId, isReply = false, parentId = null) => {
    if (isReply && parentId) {
      setComments(comments.map(c => 
        c.id === parentId 
          ? { ...c, replies: c.replies.filter(r => r.id !== commentId) }
          : c
      ));
    } else {
      setComments(comments.filter(c => c.id !== commentId));
    }
  };

  return (
    <div className="space-y-4">
      {/* Comment Input */}
      <div className="flex gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-xl flex-shrink-0">
          👤
        </div>
        <div className="flex-1">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder={user ? "Write a comment..." : "Sign in to comment"}
            disabled={!user}
            rows={2}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 resize-none disabled:opacity-50"
          />
          <div className="flex justify-end mt-2">
            <button
              onClick={handleAddComment}
              disabled={!newComment.trim() || !user}
              className="flex items-center gap-2 px-4 py-2 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg font-medium transition-colors"
            >
              <Send className="w-4 h-4" />
              Comment
            </button>
          </div>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-gray-800/50 rounded-xl p-4">
            {/* Comment Header */}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-xl flex-shrink-0">
                {comment.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white">{comment.author}</span>
                  <span className="text-xs text-gray-500">{comment.createdAt}</span>
                </div>
                <p className="text-gray-300 mt-1">{comment.content}</p>

                {/* Comment Actions */}
                <div className="flex items-center gap-4 mt-2">
                  <button
                    onClick={() => handleLike(comment.id)}
                    className={`flex items-center gap-1 text-sm transition-colors ${
                      comment.liked ? 'text-red-400' : 'text-gray-500 hover:text-red-400'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${comment.liked ? 'fill-current' : ''}`} />
                    {comment.likes}
                  </button>
                  <button
                    onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                    className="flex items-center gap-1 text-sm text-gray-500 hover:text-cyan-400 transition-colors"
                  >
                    <Reply className="w-4 h-4" />
                    Reply
                  </button>
                  {user && comment.author === (user.email?.split('@')[0] || 'Anonymous') && (
                    <button
                      onClick={() => handleDelete(comment.id)}
                      className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Reply Input */}
                {replyingTo === comment.id && (
                  <div className="mt-3 flex gap-2">
                    <input
                      type="text"
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Write a reply..."
                      className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500"
                    />
                    <button
                      onClick={() => handleAddReply(comment.id)}
                      disabled={!replyText.trim()}
                      className="px-3 py-2 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 text-white rounded-lg text-sm font-medium transition-colors"
                    >
                      Reply
                    </button>
                  </div>
                )}

                {/* Replies */}
                {comment.replies.length > 0 && (
                  <div className="mt-3 space-y-3 pl-4 border-l-2 border-gray-700">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="flex items-start gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-sm flex-shrink-0">
                          {reply.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-white text-sm">{reply.author}</span>
                            <span className="text-xs text-gray-500">{reply.createdAt}</span>
                          </div>
                          <p className="text-gray-300 text-sm mt-0.5">{reply.content}</p>
                          <div className="flex items-center gap-3 mt-1">
                            <button
                              onClick={() => handleLike(reply.id, true, comment.id)}
                              className={`flex items-center gap-1 text-xs transition-colors ${
                                reply.liked ? 'text-red-400' : 'text-gray-500 hover:text-red-400'
                              }`}
                            >
                              <Heart className={`w-3 h-3 ${reply.liked ? 'fill-current' : ''}`} />
                              {reply.likes}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {comments.length === 0 && (
        <div className="text-center py-8">
          <MessageCircle className="w-12 h-12 text-gray-600 mx-auto mb-2" />
          <p className="text-gray-500">No comments yet. Be the first to comment!</p>
        </div>
      )}
    </div>
  );
}
