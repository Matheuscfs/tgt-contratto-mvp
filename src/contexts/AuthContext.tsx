import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { supabase } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      try {
        if (session?.user) {
          const userData: User = {
            id: session.user.id,
            name: session.user.user_metadata.name || session.user.email?.split('@')[0] || 'User',
            email: session.user.email || '',
            type: (session.user.user_metadata.type as 'client' | 'company') || 'client',
            avatar: session.user.user_metadata.avatar_url,
          };

          // Always check if user has a company to ensure type consistency and get slug
          try {
            const { data: companyData, error } = await supabase
              .from('companies')
              .select('slug')
              .eq('profile_id', session.user.id)
              .single();

            if (error && error.code !== 'PGRST116') { // Ignore checking error if no rows found
              console.error("AuthContext: Error checking company existence", error);
            }

            if (companyData) {
              userData.type = 'company'; // Force type to company if record exists
              userData.companySlug = companyData.slug;
            }
          } catch (companyError) {
            console.error("AuthContext: Failed to fetch company data", companyError);
          }

          setUser(userData);
        }
      } catch (err) {
        console.error("AuthContext: Unexpected error in session check", err);
      } finally {
        setLoading(false);
      }
    }).catch(err => {
      console.error("AuthContext: Terminal error getting session", err);
      setLoading(false);
    });

    // Listen for changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      try {
        if (session?.user) {
          const userData: User = {
            id: session.user.id,
            name: session.user.user_metadata.name || session.user.email?.split('@')[0] || 'User',
            email: session.user.email || '',
            type: (session.user.user_metadata.type as 'client' | 'company') || 'client',
            avatar: session.user.user_metadata.avatar_url,
          };

          try {
            // Always check if user has a company
            const { data: companyData } = await supabase
              .from('companies')
              .select('slug')
              .eq('profile_id', session.user.id)
              .single();

            if (companyData) {
              userData.type = 'company'; // Force type to company if record exists
              userData.companySlug = companyData.slug;
            }
          } catch (companyError) {
            console.error("AuthContext: Failed to fetch company data on state change", companyError);
          }

          setUser(userData);
        } else {
          setUser(null);
        }
      } catch (authStateError) {
        console.error("AuthContext: Error handling auth state change", authStateError);
      } finally {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async () => {
    // This is a placeholder as actual login happens in LoginPage via Supabase directly.
    // We just expose the user state here.
  };

  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/#/auth/callback`, // Hash router support might need adjustment or handle in backend
        },
      });
      if (error) throw error;
    } catch (error) {
      console.error("Error signing in with Google:", error);
      throw error;
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signInWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
