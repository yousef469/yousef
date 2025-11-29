import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser, onAuthStateChange, signIn, signUp, signOut, signInWithGoogle, signInWithApple, supabase } from '../services/supabase';
import { identifyUser, resetUser, trackSignUp, trackSignIn, trackSignOut } from '../services/mixpanel';
import { performFraudCheck } from '../services/fingerprint';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);

  useEffect(() => {
    // Check active session
    const initAuth = async () => {
      try {
        // Get the current user from stored session
        const { user } = await getCurrentUser();
        console.log('👤 Current user:', user?.email || 'none');
        
        setUser(user);
        if (user) {
          identifyUser(user.id, {
            email: user.email,
            name: user.user_metadata?.full_name,
            createdAt: user.created_at,
          });
        }
      } catch (error) {
        console.error('Auth init error:', error);
      } finally {
        setLoading(false);
      }
    };
    
    initAuth();

    // Listen for auth changes
    const { data: { subscription } } = onAuthStateChange((event, session) => {
      console.log('🔔 Auth state change:', event, session?.user?.email);
      const newUser = session?.user ?? null;
      setUser(newUser);
      
      if (newUser) {
        identifyUser(newUser.id, {
          email: newUser.email,
          name: newUser.user_metadata?.full_name,
          createdAt: newUser.created_at,
        });
        
        // Handle successful sign in
        if (event === 'SIGNED_IN') {
          console.log('✅ User signed in successfully');
        }
      } else {
        resetUser();
        
        // Handle sign out
        if (event === 'SIGNED_OUT') {
          console.log('👋 User signed out');
        }
      }
      
      setLoading(false);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const value = {
    user,
    loading,
    signIn: async (email, password) => {
      // Perform fraud check on signin
      const fraudCheck = await performFraudCheck();
      
      const { data, error } = await signIn(email, password);
      if (error) throw error;
      
      // Update fingerprint usage
      if (data.user) {
        const { data: existing } = await supabase
          .from('device_fingerprints')
          .select('*')
          .eq('fingerprint', fraudCheck.fingerprint)
          .single();
        
        if (existing) {
          // Update existing fingerprint
          await supabase
            .from('device_fingerprints')
            .update({
              last_seen: new Date().toISOString(),
              usage_count: existing.usage_count + 1,
              user_id: data.user.id
            })
            .eq('fingerprint', fraudCheck.fingerprint);
        } else {
          // Create new fingerprint record
          await supabase.from('device_fingerprints').insert({
            fingerprint: fraudCheck.fingerprint,
            user_id: data.user.id,
            ip_address: fraudCheck.ip,
            is_vpn: fraudCheck.isVPN,
            vpn_confidence: fraudCheck.vpnConfidence,
            risk_score: fraudCheck.riskScore,
            confidence: fraudCheck.confidence,
            method: fraudCheck.method,
            suspicious_flags: fraudCheck.suspiciousFlags,
            user_agent: navigator.userAgent
          });
        }
        
        // Check for multi-accounting
        const { data: links } = await supabase
          .rpc('detect_multi_accounting', {
            p_fingerprint: fraudCheck.fingerprint,
            p_user_id: data.user.id
          });
        
        if (links && links.length > 0) {
          console.warn('Multi-accounting detected:', links);
          // You can add additional logic here (e.g., flag account, send alert)
        }
      }
      
      // Register user for follow system if not already registered
      if (data.user) {
        const registeredUsers = JSON.parse(localStorage.getItem('registered_users') || '[]');
        const existingUser = registeredUsers.find(u => u.id === data.user.id);
        
        if (!existingUser) {
          const newUser = {
            id: data.user.id,
            email: data.user.email,
            name: data.user.email.split('@')[0],
            avatar: '👤',
            level: 1,
            xp: 0,
            streak: 0,
            joinedAt: new Date().toISOString()
          };
          registeredUsers.push(newUser);
          localStorage.setItem('registered_users', JSON.stringify(registeredUsers));
        }
      }
      
      setUser(data.user);
      trackSignIn('email');
      return data;
    },
    signUp: async (email, password, fullName) => {
      // Perform fraud check before signup
      const fraudCheck = await performFraudCheck();
      
      // Block if high risk
      if (fraudCheck.riskScore > 0.8) {
        throw new Error('Account creation blocked due to suspicious activity. Please contact support.');
      }
      
      const { data, error } = await signUp(email, password, fullName);
      if (error) throw error;
      
      // Store fingerprint in database
      if (data.user) {
        await supabase.from('device_fingerprints').insert({
          fingerprint: fraudCheck.fingerprint,
          user_id: data.user.id,
          ip_address: fraudCheck.ip,
          is_vpn: fraudCheck.isVPN,
          vpn_confidence: fraudCheck.vpnConfidence,
          risk_score: fraudCheck.riskScore,
          confidence: fraudCheck.confidence,
          method: fraudCheck.method,
          suspicious_flags: fraudCheck.suspiciousFlags,
          user_agent: navigator.userAgent
        });
        
        // Create account link
        await supabase.from('account_links').insert({
          fingerprint: fraudCheck.fingerprint,
          user_id: data.user.id,
          link_type: 'device',
          confidence: fraudCheck.confidence
        });
      }
      
      // Register user for follow system
      if (data.user) {
        const registeredUsers = JSON.parse(localStorage.getItem('registered_users') || '[]');
        const newUser = {
          id: data.user.id,
          email: data.user.email,
          name: fullName || data.user.email.split('@')[0],
          avatar: '👤',
          level: 1,
          xp: 0,
          streak: 0,
          joinedAt: new Date().toISOString()
        };
        
        // Add if not already exists
        if (!registeredUsers.find(u => u.id === newUser.id)) {
          registeredUsers.push(newUser);
          localStorage.setItem('registered_users', JSON.stringify(registeredUsers));
        }

        // Process referral if exists
        const pendingReferral = localStorage.getItem('pending_referral');
        if (pendingReferral) {
          const referralCodes = JSON.parse(localStorage.getItem('referral_codes') || '{}');
          const referrerId = referralCodes[pendingReferral];
          
          if (referrerId && referrerId !== data.user.id) {
            // Update referrer's stats
            const referrerStats = JSON.parse(localStorage.getItem(`referral_stats_${referrerId}`) || JSON.stringify({
              totalReferrals: 0,
              pendingReferrals: 0,
              totalXPEarned: 0,
              referredUsers: []
            }));

            referrerStats.totalReferrals += 1;
            referrerStats.totalXPEarned += 500; // REFERRAL_REWARDS.PER_REFERRAL
            referrerStats.referredUsers.unshift({
              id: data.user.id,
              name: fullName || data.user.email.split('@')[0],
              date: new Date().toISOString()
            });

            // Check for milestone bonuses
            let milestoneBonus = 0;
            if (referrerStats.totalReferrals === 5) milestoneBonus = 1000;
            if (referrerStats.totalReferrals === 10) milestoneBonus = 2500;
            if (referrerStats.totalReferrals === 25) milestoneBonus = 5000;
            
            if (milestoneBonus > 0) {
              referrerStats.totalXPEarned += milestoneBonus;
            }

            localStorage.setItem(`referral_stats_${referrerId}`, JSON.stringify(referrerStats));
            
            // Store XP to be awarded to referrer
            const pendingXP = parseInt(localStorage.getItem(`pending_referral_xp_${referrerId}`) || '0');
            localStorage.setItem(`pending_referral_xp_${referrerId}`, String(pendingXP + 500 + milestoneBonus));

            // Store bonus XP for new user (will be claimed on first lesson)
            localStorage.setItem(`referral_bonus_${data.user.id}`, '200');
            
            localStorage.removeItem('pending_referral');
            console.log('✅ Referral processed! Referrer will receive XP.');
          }
        }
      }
      
      setUser(data.user);
      trackSignUp('email');
      // Show language selector for new users
      if (!localStorage.getItem('preferredLanguage')) {
        setShowLanguageSelector(true);
      }
      return data;
    },
    showLanguageSelector,
    setShowLanguageSelector,
    signOut: async () => {
      const { error} = await signOut();
      if (error) throw error;
      trackSignOut();
      setUser(null);
    },
    signInWithGoogle: async () => {
      const { error } = await signInWithGoogle();
      if (error) throw error;
      trackSignIn('google');
    },
    signInWithApple: async () => {
      const { error } = await signInWithApple();
      if (error) throw error;
      trackSignIn('apple');
    },
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
