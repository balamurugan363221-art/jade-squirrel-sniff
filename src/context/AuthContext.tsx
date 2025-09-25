"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '@/lib/api';
import { showSuccess, showError } from '@/utils/toast';

interface User {
  email: string;
  // Add other user properties as needed
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    // In a real app, you'd check for a token in localStorage/sessionStorage here
    // and validate it to restore session.
    const storedUser = localStorage.getItem('polaris_ai_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await api.auth.login(email, password);
      if (response.success) {
        const loggedInUser: User = { email: response.user.email };
        setUser(loggedInUser);
        setIsAuthenticated(true);
        localStorage.setItem('polaris_ai_user', JSON.stringify(loggedInUser));
        showSuccess('Logged in successfully!');
        navigate('/dashboard');
      } else {
        showError('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      showError('An error occurred during login.');
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await api.auth.register(email, password);
      if (response.success) {
        showSuccess('Registration successful! Please log in.');
        navigate('/login');
      } else {
        showError('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      showError('An error occurred during registration.');
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('polaris_ai_user'); // Clear user from local storage
    showSuccess('Logged out successfully.');
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, register, logout, loading }}>
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