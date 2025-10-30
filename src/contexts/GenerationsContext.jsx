import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { supabase } from '../services/supabase';
import { PRICING_PLANS } from '../services/stripe';

const GenerationsContext = createContext();

export function useGenerations() {
  const context = useContext(GenerationsContext);
  if (!context) {
    throw new Error('useGenerations must be used within GenerationsProvider');
  }
  return context;
}

export function GenerationsProvider({ children }) {
  const { user } = useAuth();
  const [generationsUsed, setGenerationsUsed] = useState(0);
  const [dailyGenerationsUsed, setDailyGenerationsUsed] = useState(0);
  const [maxGenerations, setMaxGenerations] = useState(21);
  const [maxDailyGenerations, setMaxDailyGenerations] = useState(3);
  const [userTier, setUserTier] = useState('free');
  const [trialEndDate, setTrialEndDate] = useState(null);
  const [isTrialActive, setIsTrialActive] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadUserGenerations();
    }
  }, [user]);

  async function loadUserGenerations() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('user_generations')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error loading generations:', error);
        return;
      }

      if (data) {
        setGenerationsUsed(data.generations_used);
        setDailyGenerationsUsed(data.daily_generations_used);
        setMaxGenerations(data.max_generations);
        setMaxDailyGenerations(data.max_daily_generations);
        setUserTier(data.tier);
        setTrialEndDate(data.trial_end_date);
        
        // Check if trial is still active
        if (data.tier === 'free' && data.trial_end_date) {
          const now = new Date();
          const trialEnd = new Date(data.trial_end_date);
          setIsTrialActive(now < trialEnd);
        }
      } else {
        // Create initial generations record
        await createUserGenerations();
      }
    } catch (error) {
      console.error('Error loading generations:', error);
    } finally {
      setLoading(false);
    }
  }

  async function createUserGenerations() {
    try {
      const now = new Date();
      const trialEnd = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000); // 7 days from now

      const { error } = await supabase
        .from('user_generations')
        .insert({
          user_id: user.id,
          tier: 'free',
          generations_used: 0,
          daily_generations_used: 0,
          max_generations: 21,
          max_daily_generations: 3,
          trial_start_date: now.toISOString(),
          trial_end_date: trialEnd.toISOString(),
          last_generation_date: now.toISOString().split('T')[0],
          last_reset_date: now.toISOString().split('T')[0]
        });

      if (error) throw error;
      
      setGenerationsUsed(0);
      setDailyGenerationsUsed(0);
      setMaxGenerations(21);
      setMaxDailyGenerations(3);
      setUserTier('free');
      setTrialEndDate(trialEnd.toISOString());
      setIsTrialActive(true);
    } catch (error) {
      console.error('Error creating generations:', error);
    }
  }

  async function useGeneration() {
    // Check if user can generate
    if (!canGenerate()) {
      return { success: false, error: getGenerationError() };
    }

    try {
      const newGenerationsUsed = generationsUsed + 1;
      const newDailyGenerationsUsed = dailyGenerationsUsed + 1;
      const today = new Date().toISOString().split('T')[0];

      const { error } = await supabase
        .from('user_generations')
        .update({
          generations_used: newGenerationsUsed,
          daily_generations_used: newDailyGenerationsUsed,
          last_generation_date: today,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id);

      if (error) throw error;

      setGenerationsUsed(newGenerationsUsed);
      setDailyGenerationsUsed(newDailyGenerationsUsed);
      
      return { success: true };
    } catch (error) {
      console.error('Error using generation:', error);
      return { success: false, error: error.message };
    }
  }

  function canGenerate() {
    // Paid tiers have monthly limits
    if (userTier !== 'free') {
      return generationsUsed < maxGenerations;
    }

    // Free tier: check trial status and daily limit
    if (!isTrialActive) {
      return false;
    }

    return dailyGenerationsUsed < maxDailyGenerations;
  }

  function getGenerationError() {
    if (userTier === 'free') {
      if (!isTrialActive) {
        return 'Your 7-day trial has ended. Upgrade to continue generating models!';
      }
      if (dailyGenerationsUsed >= maxDailyGenerations) {
        return 'Daily limit reached (3/day). Come back tomorrow or upgrade for more!';
      }
    } else {
      if (generationsUsed >= maxGenerations) {
        return 'Monthly limit reached. Upgrade your plan for more generations!';
      }
    }
    return 'Unable to generate at this time';
  }

  function getRemainingGenerations() {
    if (userTier === 'free') {
      if (!isTrialActive) return 0;
      return maxDailyGenerations - dailyGenerationsUsed;
    }
    return maxGenerations - generationsUsed;
  }

  function getDaysRemainingInTrial() {
    if (userTier !== 'free' || !trialEndDate) return 0;
    
    const now = new Date();
    const end = new Date(trialEndDate);
    const diffTime = end - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return Math.max(0, diffDays);
  }

  async function upgradeTier(newTier) {
    const plan = PRICING_PLANS[newTier];
    if (!plan) return;

    try {
      const { error } = await supabase
        .from('user_generations')
        .update({
          tier: newTier,
          max_generations: plan.credits,
          max_daily_generations: plan.credits, // No daily limit for paid tiers
          generations_used: 0, // Reset on upgrade
          daily_generations_used: 0,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id);

      if (error) throw error;

      setUserTier(newTier);
      setMaxGenerations(plan.credits);
      setMaxDailyGenerations(plan.credits);
      setGenerationsUsed(0);
      setDailyGenerationsUsed(0);
      
      await loadUserGenerations();
    } catch (error) {
      console.error('Error upgrading tier:', error);
    }
  }

  const value = {
    generationsUsed,
    dailyGenerationsUsed,
    maxGenerations,
    maxDailyGenerations,
    userTier,
    isTrialActive,
    trialEndDate,
    loading,
    canGenerate: canGenerate(),
    remainingGenerations: getRemainingGenerations(),
    daysRemainingInTrial: getDaysRemainingInTrial(),
    generationError: getGenerationError(),
    useGeneration,
    upgradeTier,
    loadUserGenerations
  };

  return (
    <GenerationsContext.Provider value={value}>
      {children}
    </GenerationsContext.Provider>
  );
}
