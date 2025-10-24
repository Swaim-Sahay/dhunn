import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../utils/api';
import { getErrorMessage } from '../utils/helpers';

const AuthContext = createContext();

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
  const [error, setError] = useState(null);

  // Check if user is logged in on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // Sign up
  const signup = async (userData) => {
    try {
      setError(null);
      setLoading(true);
      
      const response = await authAPI.signup(userData);
      const { data } = response.data;
      
      // Save to localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data));
      
      setUser(data);
      setLoading(false);
      return { success: true };
    } catch (err) {
      const message = getErrorMessage(err);
      setError(message);
      setLoading(false);
      return { success: false, error: message };
    }
  };

  // Login
  const login = async (credentials) => {
    try {
      setError(null);
      setLoading(true);
      
      const response = await authAPI.login(credentials);
      const { data } = response.data;
      
      // Save to localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data));
      
      setUser(data);
      setLoading(false);
      return { success: true };
    } catch (err) {
      const message = getErrorMessage(err);
      setError(message);
      setLoading(false);
      return { success: false, error: message };
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setError(null);
  };

  // Add to favorites
  const addToFavorites = async (songId) => {
    try {
      const response = await authAPI.addToFavorites(songId);
      const updatedUser = { ...user, favorites: response.data.data };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return { success: true };
    } catch (err) {
      return { success: false, error: getErrorMessage(err) };
    }
  };

  // Remove from favorites
  const removeFromFavorites = async (songId) => {
    try {
      const response = await authAPI.removeFromFavorites(songId);
      const updatedUser = { ...user, favorites: response.data.data };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return { success: true };
    } catch (err) {
      return { success: false, error: getErrorMessage(err) };
    }
  };

  const value = {
    user,
    loading,
    error,
    signup,
    login,
    logout,
    addToFavorites,
    removeFromFavorites,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
