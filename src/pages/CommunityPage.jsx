import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Plus, TrendingUp, Users, MessageCircle, Heart, Share2, Briefcase } from 'lucide-react';

export default function CommunityPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('help'); // 'help' or 'projects'
  const [searchQuery, setSearchQuery] = useState('');
  const [followedGroups, setFollowedGroups] = useState(new Set(['rockets', 'physics']));

  const groups = [
    { id: 'rockets', name: 'r/RocketEngineering', members: '12.5k', icon: '🚀', color: 'orange' },
    { id: 'planes', name: 'r/AerospaceEng', members: '8.3k', icon: '✈️', color: 'cyan' },
    { id: 'cars', name: 'r/AutomotiveEng', members: '15.2k', icon: '🚗', color: 'purple' },
    { id: 'electronics', name: 'r/ElectronicsHelp', members: '20.1k', icon: '⚡', color: 'yellow' },
    { id: 'physics', name: 'r/PhysicsHelp', members: '18.7k', icon: '🔬', color: 'blue' },
    { id: 'math', name: 'r/EngineeringMath', members: '9.8k', icon: '📐', color: 'green' }
  ];

  const helpPosts = [
    {
      id: 1,
      group: 'rockets',
      author: 'u/SpaceEnthusiast',
      title: 'Help with calculating delta-v for my rocket design',
      content: 'I\'m working on a model rocket and need help with the Tsiolkovsky equation...',
      upvotes: 45,
      comments: 12,
      time: '2h ago'
    },
    {
      id: 2,
      group: 'physics',
      author: 'u/StudentEng',
      title: 'Confused about Newton\'s third law in rocket propulsion',
      content: 'Can someone explain how the exhaust velocity relates to thrust?',
      upvotes: 32,
      comments: 8,
      time: '4h ago'
    },
    {
      id: 3,
      group: 'cars',
      author: 'u/GearHead99',
      title: 'Brake distance calculation seems off',
      content: 'My calculations don\'t match real-world data. What am I missing?',
      upvotes: 28,
      comments: 15,
      time: '6h ago'
    }
  ];

  const projectPosts = [
    {
      id: 1,
      group: 'rockets',
      author: 'u/RocketBuilder',
      title: 'Built a working rocket simulator with Unity!',
      content: 'After 3 months of work, here\'s my physics-based rocket sim...',
      upvotes: 234,
      comments: 45,
      time: '1d ago',
      image: '🚀'
    },
    {
      id: 2,
      group: 'electronics',
      author: 'u/CircuitMaster',
      title: 'My DIY robotic arm project - Full tutorial',
      content: 'Complete guide with code and schematics...',
      upvotes: 189,
      comments: 32,
      time: '2d ago',
      image: '🤖'
    }
  ];

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

  const posts = activeTab === 'help' ? helpPosts : projectPosts;

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
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors">
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
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('help')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors ${
                activeTab === 'help'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <MessageCircle className="w-5 h-5" />
              Community Help
            </button>
            <button
              onClick={() => setActiveTab('projects')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors ${
                activeTab === 'projects'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <Briefcase className="w-5 h-5" />
              Community Projects
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-4">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-gray-800 border border-gray-700 rounded-lg p-4 hover:border-gray-600 transition-colors cursor-pointer"
              >
                <div className="flex items-start gap-3">
                  <div className="flex flex-col items-center gap-1">
                    <button className="text-gray-400 hover:text-orange-500">
                      <TrendingUp className="w-5 h-5" />
                    </button>
                    <span className="text-sm font-bold">{post.upvotes}</span>
                    <button className="text-gray-400 hover:text-blue-500">
                      <TrendingUp className="w-5 h-5 rotate-180" />
                    </button>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                      <span className="font-semibold">{groups.find(g => g.id === post.group)?.name}</span>
                      <span>•</span>
                      <span>{post.author}</span>
                      <span>•</span>
                      <span>{post.time}</span>
                    </div>

                    <h3 className="text-lg font-bold mb-2">{post.title}</h3>
                    <p className="text-gray-300 mb-3">{post.content}</p>

                    {post.image && (
                      <div className="w-full h-48 bg-gradient-to-br from-blue-900 to-purple-900 rounded-lg flex items-center justify-center text-6xl mb-3">
                        {post.image}
                      </div>
                    )}

                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <button className="flex items-center gap-1 hover:text-white">
                        <MessageCircle className="w-4 h-4" />
                        {post.comments} Comments
                      </button>
                      <button className="flex items-center gap-1 hover:text-white">
                        <Share2 className="w-4 h-4" />
                        Share
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
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
      </div>
    </div>
  );
}
