import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="menu">
      <p className="menu-label">General</p>
      <ul className="menu-list">
        <li><Link to="/profile">Perfil</Link></li>
        <li><Link to="/music">Música</Link></li>
      </ul>
    </aside>
  );
};

export default Sidebar;
