import { useNavigate, useLocation } from 'react-router-dom';
import { Home, BookOpen, Trophy, User, Wrench } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function MobileBottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  
  const navItems = [
    { path: '/home', icon: Home, label: 'Home' },
    { path: '/learn', icon: BookOpen, label: 'Learn' },
    { path: '/toolbox', icon: Wrench, label: 'Tools' },
    { path: '/leaderboard', icon: Trophy, label: 'Rank' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];
  
  // Don't show on landing page, auth page, or if not logged in
  const hiddenPaths = ['/', '/auth', '/privacy', '/terms', '/about', '/pricing', '/help'];
  const shouldHide = !user || hiddenPaths.includes(location.pathname);
  
  if (shouldHide) return null;
  
  const isActive = (path) => {
    if (path === '/home') {
      return location.pathname === '/home';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900/95 backdrop-blur-md border-t border-gray-700 md:hidden safe-area-inset">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`relative flex flex-col items-center justify-center py-2 px-4 rounded-xl transition-all touch-ripple ${
                active 
                  ? 'text-cyan-400 bg-cyan-400/10' 
                  : 'text-gray-400 active:bg-gray-800'
              }`}
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              <div className={`transition-transform duration-150 ${active ? 'scale-110' : 'active:scale-90'}`}>
                <Icon className={`w-5 h-5 transition-all ${active ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]' : ''}`} />
              </div>
              <span className={`text-[10px] mt-1 font-medium transition-all ${active ? 'text-cyan-400' : ''}`}>
                {item.label}
              </span>
              {active && (
                <div className="absolute -bottom-0.5 w-8 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded-full tab-indicator" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
