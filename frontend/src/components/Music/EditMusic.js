import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MusicService from '../../services/MusicService';

const EditMusic = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMusicDetail = async () => {
      try {
        const music = await MusicService.getMusicDetail(id);
        setTitle(music.title);
        setArtist(music.artist);
      } catch (error) {
        console.error('Error fetching music detail:', error);
      }
    };

    fetchMusicDetail();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedMusic = {
      title,
      artist,
    };

    try {
      await MusicService.updateMusic(id, updatedMusic);
      navigate('/music');
    } catch (error) {
      console.error('Error updating music:', error);
    }
  };

  return (
    <div className="edit-music-container">
      <h2>Editar Canción</h2>
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
        <button type="submit">Actualizar Canción</button>
      </form>
    </div>
  );
};

export default EditMusic;



