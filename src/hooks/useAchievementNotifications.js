import { useEffect, useState } from 'react';
import { useProgress } from '../contexts/ProgressContext';

export function useAchievementNotifications() {
  const { progress, getAchievementInfo } = useProgress();
  const [notification, setNotification] = useState(null);
  const [previousAchievements, setPreviousAchievements] = useState([]);

  useEffect(() => {
    const currentAchievements = progress.achievements || [];
    
    // Check if there's a new achievement
    if (currentAchievements.length > previousAchievements.length) {
      const newAchievements = currentAchievements.filter(
        a => !previousAchievements.includes(a)
      );
      
      if (newAchievements.length > 0) {
        // Show notification for the first new achievement
        const achievementInfo = getAchievementInfo(newAchievements[0]);
        setNotification(achievementInfo);
      }
    }
    
    setPreviousAchievements(currentAchievements);
  }, [progress.achievements, previousAchievements, getAchievementInfo]);

  const clearNotification = () => {
    setNotification(null);
  };

  return { notification, clearNotification };
}
