
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = sessionStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        // Validate the parsed object to ensure it has the shape of a User object
        if (parsedUser && typeof parsedUser === 'object' && 'id' in parsedUser && 'type' in parsedUser && 'name' in parsedUser) {
          setUser(parsedUser as User);
        } else {
          // The stored data is not a valid User object, so remove it.
          console.warn("Invalid user data found in sessionStorage, clearing it.");
          sessionStorage.removeItem('user');
        }
      }
    } catch (error) {
      console.error("Failed to parse user from sessionStorage, clearing it.", error);
      sessionStorage.removeItem('user');
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (userData: User) => {
    sessionStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    sessionStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
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
