import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { supabase } from '../services/supabase';

const LivesContext = createContext();

export function useLives() {
  const context = useContext(LivesContext);
  if (!context) {
    throw new Error('useLives must be used within LivesProvider');
  }
  return context;
}

export function LivesProvider({ children }) {
  const { user } = useAuth();
  const [lives, setLives] = useState(5);
  const [maxLives, setMaxLives] = useState(5);
  const [lastLifeLost, setLastLifeLost] = useState(null);
  const [nextLifeIn, setNextLifeIn] = useState(null);
  const [userTier, setUserTier] = useState('free'); // 'free', 'starter', 'pro', 'master'

  // Load user's lives from Supabase
  useEffect(() => {
    if (user) {
      loadUserLives();
    }
  }, [user]);

  // Update timer for next life regeneration
  useEffect(() => {
    if (!lastLifeLost || lives >= maxLives) {
      setNextLifeIn(null);
      return;
    }

    const interval = setInterval(() => {
      const now = new Date();
      const lastLost = new Date(lastLifeLost);
      const timeSinceLastLoss = now - lastLost;
      const fiveHours = 5 * 60 * 60 * 1000;
      
      if (timeSinceLastLoss >= fiveHours) {
        // Regenerate a life
        regenerateLife();
      } else {
        // Calculate time until next life
        const timeUntilNext = fiveHours - timeSinceLastLoss;
        setNextLifeIn(timeUntilNext);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [lastLifeLost, lives, maxLives]);

  async function loadUserLives() {
    try {
      const { data, error } = await supabase
        .from('user_lives')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error loading lives:', error);
        return;
      }

      if (data) {
        setLives(data.lives);
        setMaxLives(data.max_lives);
        setLastLifeLost(data.last_life_lost);
        setUserTier(data.tier || 'free');
      } else {
        // Create initial lives record
        await createUserLives();
      }
    } catch (error) {
      console.error('Error loading lives:', error);
    }
  }

  async function createUserLives() {
    try {
      const { error } = await supabase
        .from('user_lives')
        .insert({
          user_id: user.id,
          lives: 5,
          max_lives: 5,
          tier: 'free',
          last_life_lost: null
        });

      if (error) throw error;
      
      setLives(5);
      setMaxLives(5);
      setUserTier('free');
    } catch (error) {
      console.error('Error creating lives:', error);
    }
  }

  async function loseLife() {
    if (userTier === 'master') {
      // Master tier has unlimited lives
      return true;
    }

    if (lives <= 0) {
      return false;
    }

    const newLives = lives - 1;
    const now = new Date().toISOString();

    try {
      const { error } = await supabase
        .from('user_lives')
        .update({
          lives: newLives,
          last_life_lost: now
        })
        .eq('user_id', user.id);

      if (error) throw error;

      setLives(newLives);
      setLastLifeLost(now);
      return true;
    } catch (error) {
      console.error('Error losing life:', error);
      return false;
    }
  }

  async function regenerateLife() {
    if (lives >= maxLives) return;

    const newLives = Math.min(lives + 1, maxLives);

    try {
      const { error } = await supabase
        .from('user_lives')
        .update({
          lives: newLives,
          last_life_lost: newLives < maxLives ? new Date().toISOString() : null
        })
        .eq('user_id', user.id);

      if (error) throw error;

      setLives(newLives);
      if (newLives >= maxLives) {
        setLastLifeLost(null);
      }
    } catch (error) {
      console.error('Error regenerating life:', error);
    }
  }

  async function upgradeTier(newTier) {
    const tierLimits = {
      free: 5,
      starter: 10,
      pro: -1, // Unlimited per month
      master: -1 // Unlimited forever
    };

    const newMaxLives = tierLimits[newTier];

    try {
      const { error } = await supabase
        .from('user_lives')
        .update({
          tier: newTier,
          max_lives: newMaxLives,
          lives: newMaxLives === -1 ? 999 : newMaxLives
        })
        .eq('user_id', user.id);

      if (error) throw error;

      setUserTier(newTier);
      setMaxLives(newMaxLives);
      setLives(newMaxLives === -1 ? 999 : newMaxLives);
    } catch (error) {
      console.error('Error upgrading tier:', error);
    }
  }

  function formatTimeUntilNext() {
    if (!nextLifeIn) return null;

    const hours = Math.floor(nextLifeIn / (60 * 60 * 1000));
    const minutes = Math.floor((nextLifeIn % (60 * 60 * 1000)) / (60 * 1000));
    const seconds = Math.floor((nextLifeIn % (60 * 1000)) / 1000);

    return `${hours}h ${minutes}m ${seconds}s`;
  }

  const value = {
    lives,
    maxLives,
    userTier,
    nextLifeIn: formatTimeUntilNext(),
    hasLives: userTier === 'master' || lives > 0,
    isUnlimited: userTier === 'master' || userTier === 'pro',
    loseLife,
    upgradeTier,
    loadUserLives
  };

  return (
    <LivesContext.Provider value={value}>
      {children}
    </LivesContext.Provider>
  );
}
