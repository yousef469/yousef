import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser, onAuthStateChange, signIn, signUp, signOut, signInWithGoogle, signInWithApple } from '../services/supabase';

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
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
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
      const { data, error } = await signIn(email, password);
      if (error) throw error;
      setUser(data.user);
      return data;
    },
    signUp: async (email, password, fullName) => {
      const { data, error } = await signUp(email, password, fullName);
      if (error) throw error;
      setUser(data.user);
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
      setUser(null);
    },
    signInWithGoogle: async () => {
      const { error } = await signInWithGoogle();
      if (error) throw error;
    },
    signInWithApple: async () => {
      const { error } = await signInWithApple();
      if (error) throw error;
    },
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
