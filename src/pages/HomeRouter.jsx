import { Sparkles } from 'lucide-react';
import HomePageLoggedIn from './HomePageLoggedIn';

const HomeRouter = () => {
  // AUTH DISABLED FOR BETA - Always show the main app
  // Landing page is only accessible via direct URL to /landing
  // When auth is re-enabled, restore the user check logic
  
  return <HomePageLoggedIn />;
};

export default HomeRouter;
