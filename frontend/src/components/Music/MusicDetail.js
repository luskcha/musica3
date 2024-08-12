import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMusic } from '../../hooks/useMusic';

const MusicDetail = () => {
  const { id } = useParams();
  const { getMusicDetail } = useMusic();
  const [song, setSong] = useState(null);

  useEffect(() => {
    const fetchSong = async () => {
      const songData = await getMusicDetail(id);
      setSong(songData);
    };
    fetchSong();
  }, [id, getMusicDetail]);

  if (!song) return <div>Cargando...</div>;

  return (
    <div className="music-detail-container">
      <h2>{song.title}</h2>
      <p>Artista: {song.artist}</p>
      <p>Género: {song.genre}</p>
    </div>
  );
};

export default MusicDetail;
