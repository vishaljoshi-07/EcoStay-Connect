import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authApi } from '../services/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('ecostay_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  
  const [token, setToken] = useState(() => {
    return localStorage.getItem('ecostay_token') || null;
  });

  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  // Helper to persist auth state
  const saveAuth = (newToken, userData) => {
    setToken(newToken);
    setUser(userData);
    localStorage.setItem('ecostay_token', newToken);
    localStorage.setItem('ecostay_user', JSON.stringify(userData));
  };

  // Helper to clear auth state
  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('ecostay_token');
    localStorage.removeItem('ecostay_user');
  }, []);

  // Fetch latest profile on load if token exists
  useEffect(() => {
    let isMounted = true;
    
    // Check if OAuth token returned in URL query params
    const urlParams = new URLSearchParams(window.location.search);
    const oauthToken = urlParams.get('token');

    if (oauthToken) {
      localStorage.setItem('ecostay_token', oauthToken);
      setToken(oauthToken);
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    const currentToken = oauthToken || token;

    if (currentToken) {
      authApi.getProfile()
        .then((res) => {
          if (isMounted && res.success) {
            setUser(res.data);
            localStorage.setItem('ecostay_user', JSON.stringify(res.data));
          }
        })
        .catch((err) => {
          console.error('Failed to restore session:', err.message);
          if (isMounted) {
            logout();
          }
        })
        .finally(() => {
          if (isMounted) setLoading(false);
        });
    } else {
      setLoading(false);
    }

    return () => {
      isMounted = false;
    };
  }, [token, logout]);

  // Login handler
  const login = async (email, password) => {
    setAuthError(null);
    try {
      const res = await authApi.login({ email, password });
      if (res.success && res.token && res.data) {
        saveAuth(res.token, res.data);
        return res;
      } else {
        throw new Error(res.message || 'Login failed');
      }
    } catch (err) {
      setAuthError(err.message);
      throw err;
    }
  };

  // Register handler
  const register = async (name, email, password, role) => {
    setAuthError(null);
    try {
      const res = await authApi.register({ name, email, password, role });
      if (res.success && res.token && res.data) {
        saveAuth(res.token, res.data);
        return res;
      } else {
        throw new Error(res.message || 'Registration failed');
      }
    } catch (err) {
      setAuthError(err.message);
      throw err;
    }
  };

  // Update profile handler
  const updateProfile = async (profileData) => {
    setAuthError(null);
    try {
      const res = await authApi.updateProfile(profileData);
      if (res.success && res.data) {
        if (res.token) setToken(res.token);
        setUser(res.data);
        localStorage.setItem('ecostay_user', JSON.stringify(res.data));
        return res;
      } else {
        throw new Error(res.message || 'Profile update failed');
      }
    } catch (err) {
      setAuthError(err.message);
      throw err;
    }
  };

  // Toggle saved homestay
  const toggleSaveHomestay = async (homestayId) => {
    if (!token) throw new Error('Please log in to save homestays');
    try {
      const res = await authApi.toggleSaveHomestay(homestayId);
      if (res.success && user) {
        const updatedUser = { ...user, savedHomestays: res.savedHomestays };
        setUser(updatedUser);
        localStorage.setItem('ecostay_user', JSON.stringify(updatedUser));
        return res;
      }
    } catch (err) {
      console.error('Error toggling homestay:', err.message);
      throw err;
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      loading,
      authError,
      isAuthenticated: !!token && !!user,
      login,
      register,
      logout,
      updateProfile,
      toggleSaveHomestay
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
