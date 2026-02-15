import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  Menu,
  X,
  Trophy,
  User,
  LogOut,
  Settings,
  Zap,
  Star,
  Layout,
  MessageSquare,
  ChevronRight
} from 'lucide-react';

export default function SidebarMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    { icon: Layout, label: 'Dashboard', path: '/home' },
    { icon: User, label: 'Profile', path: '/profile' },
    { icon: Trophy, label: 'Leaderboard', path: '/leaderboard' },
    { icon: MessageSquare, label: 'Story Mode', path: '/home' },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
      setIsOpen(false);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  if (!user) return null;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-3 md:top-5 left-4 z-50 p-2 md:p-3 bg-gray-900/80 backdrop-blur-md border border-white/10 rounded-2xl hover:border-cyan-500/50 hover:bg-gray-800 transition-all shadow-xl group"
        aria-label="Open menu"
      >
        <Menu className="w-5 h-5 md:w-6 md:h-6 text-cyan-400 group-hover:scale-110 transition-transform" />
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] animate-in fade-in duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-full w-80 bg-gray-900 border-r border-white/10 z-[101] transform transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] shadow-2xl ${isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        <div className="absolute top-0 left-0 w-full h-40 bg-cyan-500/5 blur-[80px]" />

        <div className="relative p-8 pt-10 h-full flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-black italic text-white tracking-widest uppercase">
              Engineeruim
            </h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-white/5 rounded-xl transition-all"
            >
              <X className="w-6 h-6 text-gray-500 hover:text-white" />
            </button>
          </div>

          <div className="group p-5 bg-white/5 border border-white/10 rounded-3xl mb-8 hover:border-white/20 transition-all relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-2xl" />
            <div className="relative flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg transform group-hover:rotate-6 transition-transform">
                <User className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-black text-lg truncate">
                  {user.user_metadata?.full_name || user.email?.split('@')[0] || 'User'}
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <Star className="w-3 h-3 text-yellow-500 fill-current" />
                  <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Elite Learner</span>
                </div>
              </div>
            </div>
          </div>

          <nav className="space-y-2 flex-1 overflow-y-auto custom-scrollbar pr-2">
            {menuItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavigation(item.path)}
                className="w-full flex items-center gap-4 p-4 text-gray-400 hover:text-white hover:bg-white/5 rounded-2xl transition-all group"
              >
                <div className="p-2.5 rounded-xl bg-gray-800 border border-white/5 group-hover:border-cyan-500/30 group-hover:bg-cyan-500/10 transition-all">
                  <item.icon className="w-5 h-5 group-hover:text-cyan-400 group-hover:scale-110 transition-all" />
                </div>
                <span className="font-bold text-lg">{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="pt-6 space-y-4">
            <div className="p-6 bg-gradient-to-br from-indigo-900/60 to-purple-900/60 border border-purple-500/30 rounded-3xl relative overflow-hidden group animate-shine-sweep">
              <div className="relative z-10">
                <h4 className="text-white font-black italic uppercase tracking-wider mb-1 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-yellow-400 fill-current" />
                  Double the Fun
                </h4>
                <p className="text-purple-200 text-xs mb-4">Unlock pro lessons, infinite lives & more.</p>
                <button
                  onClick={() => handleNavigation('/pricing')}
                  className="w-full bg-white text-indigo-900 font-black py-3 rounded-xl shadow-lg hover:shadow-white/10 hover:scale-105 active:scale-95 transition-all text-sm uppercase tracking-widest"
                >
                  Go Pro Now
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2 pb-4">
              <button
                onClick={() => handleNavigation('/settings')}
                className="flex-1 flex items-center justify-center gap-2 p-4 text-gray-500 hover:text-white hover:bg-white/5 rounded-2xl transition-all"
              >
                <Settings className="w-5 h-5" />
                <span className="font-bold">Settings</span>
              </button>
              <div className="w-px h-8 bg-white/5" />
              <button
                onClick={handleSignOut}
                className="px-6 py-4 text-red-400/80 hover:text-red-400 transition-all"
                title="Sign Out"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
