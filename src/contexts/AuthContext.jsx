import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser, onAuthStateChange, signIn, signUp, signOut, signInWithGoogle, signInWithApple } from '../services/supabase';
import { identifyUser, resetUser, trackSignUp, trackSignIn, trackSignOut } from '../services/mixpanel';

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
      const { data, error } = await signIn(email, password);
      if (error) throw error;
      setUser(data.user);
      trackSignIn('email');
      return data;
    },
    signUp: async (email, password, fullName) => {
      const { data, error } = await signUp(email, password, fullName);
      if (error) throw error;
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
