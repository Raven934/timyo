import { createContext, useState, useContext, useEffect } from 'react';
import api, { getCsrfToken } from '../services/api';

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

  // Check if user is logged in on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await api.get('/user');
      setUser(response.data);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password, passwordConfirmation) => {
    await getCsrfToken();
    const response = await api.post('/register', {
      name,
      email,
      password,
      password_confirmation: passwordConfirmation,
    });
    setUser(response.data.user);
    return response.data;
  };

  const login = async (email, password) => {
    await getCsrfToken();
    const response = await api.post('/login', { email, password });
    setUser(response.data.user);
    return response.data;
  };

  const logout = async () => {
    await api.post('/logout');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
