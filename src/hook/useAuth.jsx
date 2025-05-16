import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  useEffect(() => {
  const loginTime = localStorage.getItem("loginTime");
  if (loginTime) {
    const now = Date.now();
    const maxTime = 1000 * 60 * 60 * 4; // 4 horas
    if (now - loginTime > maxTime) {
      logout();
    }
  }
}, []);
  // Tenta recuperar do localStorage
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = data => {
    setUser(data);
    localStorage.setItem("user", JSON.stringify(data));
    localStorage.setItem("loginTime", Date.now());
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("loginTime");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}