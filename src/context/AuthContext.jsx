import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('user-info');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [admin, setAdmin] = useState(() => {
    try {
      const saved = localStorage.getItem('admin-info');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => localStorage.getItem('user-token') || '');

  const loginUser = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
    localStorage.setItem('user-info', JSON.stringify(userData));
    localStorage.setItem('user-token', userToken);
  };

  const logoutUser = () => {
    setUser(null);
    setToken('');
    localStorage.removeItem('user-info');
    localStorage.removeItem('user-token');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        admin,
        token,
        isAuthenticated: !!user,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
