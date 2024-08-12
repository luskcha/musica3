import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

const EditProfile = () => {
  const { user, updateUserProfile } = useAuth();
  const [email, setEmail] = useState(user?.email || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserProfile({ email });
  };

  return (
    <div className="edit-profile-container">
      <h2>Editar Perfil</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
};

export default EditProfile;
