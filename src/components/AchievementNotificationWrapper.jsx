import { useProgress } from '../contexts/ProgressContext';
import AchievementNotification from './AchievementNotification';

export default function AchievementNotificationWrapper() {
  const { newAchievement, clearNewAchievement } = useProgress();

  if (!newAchievement) return null;

  return (
    <AchievementNotification 
      achievement={newAchievement} 
      onClose={clearNewAchievement}
    />
  );
}
