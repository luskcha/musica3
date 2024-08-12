import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useHistory } from 'react-router-dom';

const Logout = () => {
  const { logout } = useAuth();
  const history = useHistory();

  const handleLogout = () => {
    logout();
    history.push('/login');
  };

  return (
    <button onClick={handleLogout} className="logout-button">
      Cerrar Sesión
    </button>
  );
};

export default Logout;
