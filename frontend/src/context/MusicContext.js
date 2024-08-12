import React, { createContext, useState } from 'react';
import MusicService from '../services/MusicService';

export const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
  const [music, setMusic] = useState([]);

  const fetchMusic = async () => {
    try {
      const data = await MusicService.getAllMusic();
      setMusic(data);
    } catch (error) {
      console.error('Error fetching music:', error);
    }
  };

  return (
    <MusicContext.Provider value={{ music, fetchMusic }}>
      {children}
    </MusicContext.Provider>
  );
};
