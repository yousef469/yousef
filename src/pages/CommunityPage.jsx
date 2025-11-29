import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Plus, TrendingUp, MessageCircle, Share2, Loader2, Briefcase, Users, Image } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { createPost, getPosts, votePost } from '../services/community';
import ProjectGallery from '../components/ProjectGallery';
import { DiscoverUsers, FollowingFeed } from '../components/FollowSystem';
import CommentSystem from '../components/CommentSystem';

export default function CommunityPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('help'); // 'help', 'projects', 'gallery', 'people'
  const [searchQuery, setSearchQuery] = useState('');
  const [followedGroups, setFollowedGroups] = useState(new Set(['rockets', 'physics']));
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    category: 'question',
    subject: 'general'
  });

  const groups = [
    { id: 'rockets', name: 'r/RocketEngineering', members: '12.5k', icon: '🚀', color: 'orange' },
    { id: 'planes', name: 'r/AerospaceEng', members: '8.3k', icon: '✈️', color: 'cyan' },
    { id: 'cars', name: 'r/AutomotiveEng', members: '15.2k', icon: '🚗', color: 'purple' },
    { id: 'electronics', name: 'r/ElectronicsHelp', members: '20.1k', icon: '⚡', color: 'yellow' },
    { id: 'physics', name: 'r/PhysicsHelp', members: '18.7k', icon: '🔬', color: 'blue' },
    { id: 'math', name: 'r/EngineeringMath', members: '9.8k', icon: '📐', color: 'green' }
  ];

  useEffect(() => {
    fetchPosts();
  }, [activeTab, searchQuery]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      // For help tab, show questions and discussions
      // For projects tab, show projects and designs
      const filters = {
        search: searchQuery,
        sortBy: 'recent'
      };
      
      // Don't filter by category - show all posts for now
      // Later we can add more sophisticated filtering
      
      const data = await getPosts(filters);
      
      // Filter on client side based on tab
      let filteredData = data || [];
      if (activeTab === 'help') {
        filteredData = filteredData.filter(post => 
          post.category === 'question' || post.category === 'discussion'
        );
      } else {
        filteredData = filteredData.filter(post => 
          post.category === 'project' || post.category === 'design'
        );
      }
      
      setPosts(filteredData);
    } catch (error) {
      console.error('Error fetching posts:', error);
      // If tables don't exist, show empty state
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async () => {
    if (!newPost.title.trim() || !newPost.content.trim()) {
      alert('Please fill in both title and content');
      return;
    }

    try {
      const postData = {
        ...newPost,
        user_id: user.id
      };
      
      console.log('Creating post:', postData);
      await createPost(postData);
      
      setShowCreateModal(false);
      setNewPost({ title: '', content: '', category: 'question', subject: 'general' });
      
      // Refresh posts to show the new one
      await fetchPosts();
      
      alert('Post created successfully!');
    } catch (error) {
      console.error('Error creating post:', error);
      
      // Check if it's a database error
      if (error.message?.includes('relation') || error.message?.includes('does not exist')) {
        alert('Database tables not set up yet. Please run the SQL schema in Supabase first. Check COMMUNITY_SCHEMA.sql file.');
      } else {
        alert('Failed to create post: ' + (error.message || 'Unknown error'));
      }
    }
  };

  const handleVote = async (postId, voteType) => {
    try {
      await votePost(user.id, postId, voteType);
      fetchPosts();
    } catch (error) {
      console.error('Error voting:', error);
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInHours = Math.floor((now - time) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const toggleFollow = (groupId) => {
    setFollowedGroups(prev => {
      const newSet = new Set(prev);
      if (newSet.has(groupId)) {
        newSet.delete(groupId);
      } else {
        newSet.add(groupId);
      }
      return newSet;
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="border-b border-gray-700 bg-gray-800/50 backdrop-blur sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </button>

          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold">Community</h1>
            <button 
              onClick={() => {
                // Set default category based on active tab
                const defaultCategory = activeTab === 'help' ? 'question' : 'project';
                setNewPost({ title: '', content: '', category: defaultCategory, subject: 'general' });
                setShowCreateModal(true);
              }}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors"
            >
              <Plus className="w-5 h-5" />
              Create Post
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search communities..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Tabs */}
          <div className="flex gap-2 md:gap-4 overflow-x-auto pb-2">
            <button
              onClick={() => setActiveTab('help')}
              className={`flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg font-semibold transition-colors whitespace-nowrap ${
                activeTab === 'help'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <MessageCircle className="w-5 h-5" />
              Help
            </button>
            <button
              onClick={() => setActiveTab('projects')}
              className={`flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg font-semibold transition-colors whitespace-nowrap ${
                activeTab === 'projects'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <Briefcase className="w-5 h-5" />
              Projects
            </button>
            <button
              onClick={() => setActiveTab('gallery')}
              className={`flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg font-semibold transition-colors whitespace-nowrap ${
                activeTab === 'gallery'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <Image className="w-5 h-5" />
              Gallery
            </button>
            <button
              onClick={() => setActiveTab('people')}
              className={`flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg font-semibold transition-colors whitespace-nowrap ${
                activeTab === 'people'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <Users className="w-5 h-5" />
              People
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Gallery Tab - Full Width */}
        {activeTab === 'gallery' && (
          <ProjectGallery />
        )}

        {/* People Tab - Full Width */}
        {activeTab === 'people' && (
          <div className="grid lg:grid-cols-2 gap-6">
            <DiscoverUsers />
            <FollowingFeed />
          </div>
        )}

        {/* Help & Projects Tabs */}
        {(activeTab === 'help' || activeTab === 'projects') && (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-4">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
              </div>
            ) : posts.length === 0 ? (
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-12 text-center">
                <MessageCircle className="w-16 h-16 mx-auto mb-4 text-gray-600" />
                <h3 className="text-xl font-bold mb-2">No posts yet</h3>
                <p className="text-gray-400 mb-4">Be the first to start a discussion!</p>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors"
                >
                  Create First Post
                </button>
              </div>
            ) : (
              posts.map((post) => (
                <div
                  key={post.id}
                  className="bg-gray-800 border border-gray-700 rounded-lg p-4 hover:border-gray-600 transition-colors cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex flex-col items-center gap-1">
                      <button 
                        onClick={() => handleVote(post.id, 'up')}
                        className="text-gray-400 hover:text-orange-500"
                      >
                        <TrendingUp className="w-5 h-5" />
                      </button>
                      <span className="text-sm font-bold">{post.upvotes - post.downvotes}</span>
                      <button 
                        onClick={() => handleVote(post.id, 'down')}
                        className="text-gray-400 hover:text-blue-500"
                      >
                        <TrendingUp className="w-5 h-5 rotate-180" />
                      </button>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                        <span className="font-semibold">{groups.find(g => g.id === post.subject)?.name || 'General'}</span>
                        <span>•</span>
                        <span>u/{user?.email?.split('@')[0] || 'Anonymous'}</span>
                        <span>•</span>
                        <span>{formatTimeAgo(post.created_at)}</span>
                      </div>

                      <h3 className="text-lg font-bold mb-2">{post.title}</h3>
                      <p className="text-gray-300 mb-3">{post.content}</p>

                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <button className="flex items-center gap-1 hover:text-white">
                          <MessageCircle className="w-4 h-4" />
                          0 Comments
                        </button>
                        <button className="flex items-center gap-1 hover:text-white">
                          <Share2 className="w-4 h-4" />
                          Share
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Followed Groups */}
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
              <h3 className="font-bold mb-4">Your Communities</h3>
              <div className="space-y-2">
                {groups.filter(g => followedGroups.has(g.id)).map((group) => (
                  <div key={group.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{group.icon}</span>
                      <div>
                        <div className="font-semibold text-sm">{group.name}</div>
                        <div className="text-xs text-gray-400">{group.members} members</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Popular Groups */}
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
              <h3 className="font-bold mb-4">Popular Communities</h3>
              <div className="space-y-3">
                {groups.map((group) => (
                  <div key={group.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{group.icon}</span>
                      <div>
                        <div className="font-semibold text-sm">{group.name}</div>
                        <div className="text-xs text-gray-400">{group.members} members</div>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleFollow(group.id)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                        followedGroups.has(group.id)
                          ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      {followedGroups.has(group.id) ? 'Joined' : 'Join'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        )}
      </div>

      {/* Create Post Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-6">Create New Post</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <input
                    type="text"
                    value={newPost.title}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                    placeholder="What's your question or topic?"
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Category</label>
                    <select
                      value={newPost.category}
                      onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
                    >
                      <option value="question">Question</option>
                      <option value="design">Design</option>
                      <option value="project">Project</option>
                      <option value="discussion">Discussion</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Subject</label>
                    <select
                      value={newPost.subject}
                      onChange={(e) => setNewPost({ ...newPost, subject: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
                    >
                      <option value="general">General</option>
                      <option value="rockets">Rockets</option>
                      <option value="cars">Cars</option>
                      <option value="planes">Planes</option>
                      <option value="electronics">Electronics</option>
                      <option value="mathematics">Mathematics</option>
                      <option value="physics">Physics</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Content</label>
                  <textarea
                    value={newPost.content}
                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                    placeholder="Describe your question, design, or start a discussion..."
                    rows={8}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="px-6 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreatePost}
                  disabled={!newPost.title.trim() || !newPost.content.trim()}
                  className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-2 rounded-lg font-semibold transition-colors"
                >
                  Create Post
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
