import React, { createContext, useContext, useState } from 'react';

// Crear el contexto de autenticación
export const AuthContext = createContext();

// Hook personalizado para usar el contexto de autenticación
export const useAuth = () => {
  return useContext(AuthContext);
};

// Proveedor de contexto de autenticación
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Función para iniciar sesión
  const login = (userData) => {
    setUser(userData);
  };

  // Función para cerrar sesión
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
