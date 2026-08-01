import React, { createContext, useState, useEffect, useContext } from 'react';
import { getUsers } from '../utils/storage';
import { API_BASE_URL } from '../config/api';

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem('rnl_current_user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (username, password, expectedRole) => {
    try {
      const endpoint = expectedRole === 'student' ? '/api/auth/student-login' : '/api/auth/login';
      const body = expectedRole === 'student' 
        ? { registrationNumber: username, dob: password }
        : { username, password };

      const res = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      
      const data = await res.json();
      
      if (data.success) {
        if (expectedRole && data.user.role !== expectedRole) {
          return { success: false, message: `Access denied: This portal is for ${expectedRole}s only.` };
        }
        
        setCurrentUser(data.user);
        localStorage.setItem('rnl_current_user', JSON.stringify(data.user));
        return { success: true };
      }
      return { success: false, message: data.message || 'Invalid credentials' };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, message: 'Server error. Is the backend running?' };
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('rnl_current_user');
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
