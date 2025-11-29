import { useNavigate, useLocation } from 'react-router-dom';
import { Home, BookOpen, Trophy, User, Compass } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function MobileBottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  
  const navItems = [
    { path: '/home', icon: Home, label: 'Home' },
    { path: '/learn', icon: Compass, label: 'Learn' },
    { path: '/career-projects', icon: BookOpen, label: 'Projects' },
    { path: '/community', icon: Trophy, label: 'Community' },
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
    if (path === '/learn') {
      return location.pathname.startsWith('/learn') || location.pathname.startsWith('/games');
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      {/* Gradient blur background */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/98 to-gray-900/90 backdrop-blur-xl" />
      
      {/* Top border glow */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
      
      <div className="relative flex items-center justify-around py-2 pb-safe">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="relative flex flex-col items-center justify-center py-2 px-3 min-w-[60px] group"
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              {/* Active background pill */}
              {active && (
                <div className="absolute inset-x-1 top-1 bottom-1 bg-cyan-500/15 rounded-xl" />
              )}
              
              {/* Icon container */}
              <div className={`relative z-10 transition-all duration-200 ${active ? 'scale-110' : 'group-active:scale-90'}`}>
                <Icon 
                  className={`w-5 h-5 transition-all duration-200 ${
                    active 
                      ? 'text-cyan-400' 
                      : 'text-gray-500 group-active:text-gray-300'
                  }`}
                  strokeWidth={active ? 2.5 : 2}
                />
                {/* Glow effect for active */}
                {active && (
                  <div className="absolute inset-0 blur-md bg-cyan-400/40 -z-10" />
                )}
              </div>
              
              {/* Label */}
              <span className={`relative z-10 text-[10px] mt-1.5 font-medium transition-all duration-200 ${
                active ? 'text-cyan-400' : 'text-gray-500'
              }`}>
                {item.label}
              </span>
              
              {/* Active indicator dot */}
              {active && (
                <div className="absolute -bottom-0.5 w-1 h-1 bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
              )}
            </button>
          );
        })}
      </div>
      
      {/* Safe area padding for notched phones */}
      <div className="h-safe bg-gray-900" />
    </nav>
  );
}
