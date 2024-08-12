import axios from 'axios';

const MusicService = {
  getAllMusic: async () => {
    try {
      const response = await axios.get('/api/music');
      return response.data;
    } catch (error) {
      console.error('Error fetching music:', error);
      throw error;
    }
  },
  getMusicDetail: async (id) => {
    try {
      const response = await axios.get(`/api/music/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching music detail:', error);
      throw error;
    }
  },
  createMusic: async (musicData) => {
    try {
      const response = await axios.post('/api/music', musicData);
      return response.data;
    } catch (error) {
      console.error('Error creating music:', error);
      throw error;
    }
  },
  updateMusic: async (id, musicData) => {
    try {
      const response = await axios.put(`/api/music/${id}`, musicData);
      return response.data;
    } catch (error) {
      console.error('Error updating music:', error);
      throw error;
    }
  },
  deleteMusic: async (id) => {
    try {
      const response = await axios.delete(`/api/music/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting music:', error);
      throw error;
    }
  },
};

export default MusicService;
