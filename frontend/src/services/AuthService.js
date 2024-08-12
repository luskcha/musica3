import axios from 'axios';

const API_URL = 'http://localhost:5001/api/auth';

const signup = async (userData) => {
  const response = await axios.post(`${API_URL}/signup`, userData);
  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  return response.data;
};

const logout = () => {
  localStorage.removeItem('user');
};

export default {
  signup,
  login,
  logout,
};
