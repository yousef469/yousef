import { ChevronRight, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function LessonBreadcrumb({ subject, lessonId, lessonTitle }) {
  const navigate = useNavigate();

  const subjectInfo = {
    rockets: { name: 'Rockets', emoji: '🚀', total: 28, path: '/games/map/rockets' },
    cars: { name: 'Automotive', emoji: '🚗', total: 20, path: '/games/map/cars' },
    planes: { name: 'Aircraft', emoji: '✈️', total: 20, path: '/games/map/planes' },
    electronics: { name: 'Electronics', emoji: '⚡', total: 20, path: '/games/map/electronics' }
  };

  const info = subjectInfo[subject];
  if (!info) return null;

  // Calculate unit based on lesson ID
  const getUnitInfo = (subject, lessonId) => {
    const id = parseInt(lessonId);
    
    switch (subject) {
      case 'rockets':
        if (id <= 5) return { unit: 1, name: 'Foundations' };
        if (id <= 11) return { unit: 2, name: 'Fundamentals' };
        if (id <= 19) return { unit: 3, name: 'Propulsion Physics' };
        if (id <= 23) return { unit: 4, name: 'Orbital Mechanics' };
        if (id <= 25) return { unit: 5, name: 'Structures & Materials' };
        return { unit: 6, name: 'Guidance & Control' };
      
      case 'cars':
        if (id <= 5) return { unit: 1, name: 'Foundations' };
        if (id <= 9) return { unit: 2, name: 'Vehicle Dynamics' };
        if (id <= 14) return { unit: 3, name: 'Powertrain' };
        return { unit: 4, name: 'Systems Design' };
      
      case 'planes':
        if (id <= 5) return { unit: 1, name: 'Foundations' };
        if (id <= 9) return { unit: 2, name: 'Aerodynamics' };
        if (id <= 14) return { unit: 3, name: 'Propulsion' };
        return { unit: 4, name: 'Systems' };
      
      case 'electronics':
        if (id <= 5) return { unit: 1, name: 'Foundations' };
        if (id <= 9) return { unit: 2, name: 'Power Electronics' };
        if (id <= 14) return { unit: 3, name: 'Embedded Systems' };
        return { unit: 4, name: 'Robotics' };
      
      default:
        return { unit: 1, name: 'Unit 1' };
    }
  };

  const unitInfo = getUnitInfo(subject, lessonId);

  return (
    <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6 flex-wrap">
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-1 hover:text-white transition-colors"
      >
        <Home className="w-4 h-4" />
        <span>Home</span>
      </button>
      
      <ChevronRight className="w-4 h-4" />
      
      <button
        onClick={() => navigate(info.path)}
        className="flex items-center gap-1 hover:text-white transition-colors"
      >
        <span>{info.emoji}</span>
        <span>{info.name}</span>
      </button>
      
      <ChevronRight className="w-4 h-4" />
      
      <span className="text-gray-500">
        Unit {unitInfo.unit}: {unitInfo.name}
      </span>
      
      <ChevronRight className="w-4 h-4" />
      
      <span className="text-white font-medium truncate max-w-xs">
        {lessonTitle}
      </span>
    </nav>
  );
}
