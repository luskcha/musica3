import React, { useEffect } from 'react';
import { useMusic } from '../../hooks/useMusic';
import { Link } from 'react-router-dom';

const MusicList = () => {
  const { music, fetchMusic } = useMusic();

  useEffect(() => {
    fetchMusic();
  }, [fetchMusic]);

  return (
    <div className="music-list-container">
      <h2>Lista de Canciones</h2>
      <Link to="/add-music" className="add-music-button">
        Agregar Canción
      </Link>
      <ul className="music-list">
        {music.map((song) => (
          <li key={song._id} className="music-list-item">
            <Link to={`/music/${song._id}`}>{song.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MusicList;
