import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MusicService from '../../services/MusicService';

const AddMusic = () => {
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newMusic = {
      title,
      artist,
    };

    try {
      await MusicService.createMusic(newMusic);
      navigate('/music');
    } catch (error) {
      console.error('Error creating music:', error);
    }
  };

  return (
    <div className="add-music-container">
      <h2>Agregar Canción</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Artista</label>
          <input
            type="text"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            required
          />
        </div>
        <button type="submit">Agregar Canción</button>
      </form>
    </div>
  );
};

export default AddMusic;
