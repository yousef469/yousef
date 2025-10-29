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
    getCurrentUser().then(({ user }) => {
      setUser(user);
      if (user) {
        identifyUser(user.id, {
          email: user.email,
          name: user.user_metadata?.full_name,
          createdAt: user.created_at,
        });
      }
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = onAuthStateChange((event, session) => {
      const newUser = session?.user ?? null;
      setUser(newUser);
      
      if (newUser) {
        identifyUser(newUser.id, {
          email: newUser.email,
          name: newUser.user_metadata?.full_name,
          createdAt: newUser.created_at,
        });
      } else {
        resetUser();
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
