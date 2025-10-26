import React, { useState } from 'react';
import { BookMarked, Plus, Trash2, Edit2, Save, X } from 'lucide-react';

const BookmarksNotes = () => {
  const [bookmarks, setBookmarks] = useState([
    {
      id: 1,
      type: 'lesson',
      title: 'Orbital Mechanics Basics',
      category: 'Rockets',
      note: 'Review the Hohmann transfer orbit calculations',
      timestamp: '2 days ago',
      url: '/learn/rockets/orbital-mechanics'
    },
    {
      id: 2,
      type: 'model',
      title: 'Falcon 9 - Grid Fins',
      category: 'Rockets',
      note: 'Check how grid fins provide stability during reentry',
      timestamp: '5 days ago',
      url: '/rockets'
    },
    {
      id: 3,
      type: 'calculator',
      title: 'Thrust Calculator',
      category: 'Tools',
      note: 'Use for homework problem #5',
      timestamp: '1 week ago',
      url: '/learn/rockets'
    }
  ]);

  const [editingId, setEditingId] = useState(null);
  const [editNote, setEditNote] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newBookmark, setNewBookmark] = useState({
    title: '',
    category: 'Rockets',
    note: '',
    type: 'lesson'
  });

  const handleEdit = (bookmark) => {
    setEditingId(bookmark.id);
    setEditNote(bookmark.note);
  };

  const handleSave = (id) => {
    setBookmarks(bookmarks.map(b => 
      b.id === id ? { ...b, note: editNote } : b
    ));
    setEditingId(null);
  };

  const handleDelete = (id) => {
    setBookmarks(bookmarks.filter(b => b.id !== id));
  };

  const handleAdd = () => {
    const bookmark = {
      id: Date.now(),
      ...newBookmark,
      timestamp: 'Just now',
      url: '#'
    };
    setBookmarks([bookmark, ...bookmarks]);
    setShowAddModal(false);
    setNewBookmark({ title: '', category: 'Rockets', note: '', type: 'lesson' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <BookMarked className="w-8 h-8 text-cyan-400" />
            <div>
              <h1 className="text-3xl font-bold">My Bookmarks & Notes</h1>
              <p className="text-gray-400">Save and organize your learning journey</p>
            </div>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-lg transition-all"
          >
            <Plus className="w-5 h-5" />
            Add Bookmark
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-800/50 border border-cyan-500/30 rounded-xl p-4">
            <p className="text-gray-400 text-sm mb-1">Total Bookmarks</p>
            <p className="text-3xl font-bold">{bookmarks.length}</p>
          </div>
          <div className="bg-gray-800/50 border border-orange-500/30 rounded-xl p-4">
            <p className="text-gray-400 text-sm mb-1">Lessons Saved</p>
            <p className="text-3xl font-bold">{bookmarks.filter(b => b.type === 'lesson').length}</p>
          </div>
          <div className="bg-gray-800/50 border border-purple-500/30 rounded-xl p-4">
            <p className="text-gray-400 text-sm mb-1">Models Saved</p>
            <p className="text-3xl font-bold">{bookmarks.filter(b => b.type === 'model').length}</p>
          </div>
        </div>

        {/* Bookmarks List */}
        <div className="space-y-4">
          {bookmarks.map((bookmark) => (
            <div 
              key={bookmark.id}
              className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:border-cyan-500/50 transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-4 flex-1">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    bookmark.type === 'lesson' ? 'bg-cyan-500/20' :
                    bookmark.type === 'model' ? 'bg-orange-500/20' :
                    'bg-purple-500/20'
                  }`}>
                    {bookmark.type === 'lesson' && '📚'}
                    {bookmark.type === 'model' && '🚀'}
                    {bookmark.type === 'calculator' && '🧮'}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-xl font-semibold">{bookmark.title}</h3>
                      <span className="px-2 py-1 bg-gray-700 rounded text-xs">{bookmark.category}</span>
                    </div>
                    <p className="text-gray-400 text-sm mb-3">{bookmark.timestamp}</p>
                    
                    {editingId === bookmark.id ? (
                      <div className="flex gap-2">
                        <textarea
                          value={editNote}
                          onChange={(e) => setEditNote(e.target.value)}
                          className="flex-1 bg-gray-900 border border-gray-600 rounded-lg px-3 py-2 text-white resize-none"
                          rows="2"
                          placeholder="Add your notes..."
                        />
                        <button
                          onClick={() => handleSave(bookmark.id)}
                          className="px-3 py-2 bg-green-500 hover:bg-green-600 rounded-lg transition-colors"
                        >
                          <Save className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="px-3 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <p className="text-gray-300 bg-gray-700/30 rounded-lg p-3">
                        {bookmark.note || 'No notes added yet'}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(bookmark)}
                    className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(bookmark.id)}
                    className="p-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {bookmarks.length === 0 && (
          <div className="text-center py-16">
            <BookMarked className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">No bookmarks yet</p>
            <p className="text-gray-500 text-sm">Start saving your favorite lessons and models!</p>
          </div>
        )}
      </div>

      {/* Add Bookmark Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Add New Bookmark</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Title</label>
                <input
                  type="text"
                  value={newBookmark.title}
                  onChange={(e) => setNewBookmark({...newBookmark, title: e.target.value})}
                  className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 text-white"
                  placeholder="e.g., Rocket Propulsion Basics"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Type</label>
                <select
                  value={newBookmark.type}
                  onChange={(e) => setNewBookmark({...newBookmark, type: e.target.value})}
                  className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 text-white"
                >
                  <option value="lesson">Lesson</option>
                  <option value="model">Model</option>
                  <option value="calculator">Calculator</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Category</label>
                <select
                  value={newBookmark.category}
                  onChange={(e) => setNewBookmark({...newBookmark, category: e.target.value})}
                  className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 text-white"
                >
                  <option value="Rockets">Rockets</option>
                  <option value="Planes">Planes</option>
                  <option value="Cars">Cars</option>
                  <option value="Tools">Tools</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Notes</label>
                <textarea
                  value={newBookmark.note}
                  onChange={(e) => setNewBookmark({...newBookmark, note: e.target.value})}
                  className="w-full bg-gray-900 border border-gray-600 rounded-lg px-4 py-2 text-white resize-none"
                  rows="3"
                  placeholder="Add your notes here..."
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleAdd}
                className="flex-1 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 rounded-lg font-semibold transition-all"
              >
                Add Bookmark
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookmarksNotes;
