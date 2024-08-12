import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import AuthService from '../services/AuthService';

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }

  const { user, setUser } = context;

  const signup = async (userData) => {
    const user = await AuthService.signup(userData);
    setUser(user);
  };

  const login = async (userData) => {
    const user = await AuthService.login(userData);
    setUser(user);
  };

  const logout = () => {
    AuthService.logout();
    setUser(null);
  };

  return {
    user,
    signup,
    login,
    logout,
  };
};
