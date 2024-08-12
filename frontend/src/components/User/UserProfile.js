import React from 'react';
import { useAuth } from '../../hooks/useAuth';

const UserProfile = () => {
  const { user } = useAuth();

  return (
    <div className="container">
      <h2 className="title">Perfil de Usuario</h2>
      <div className="box">
        <p><strong>Nombre de usuario:</strong> {user?.username}</p>
        <p><strong>Email:</strong> {user?.email}</p>
      </div>
    </div>
  );
};

export default UserProfile;

