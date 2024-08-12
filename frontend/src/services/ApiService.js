import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5001', 
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const signupService = (data) => api.post('/api/auth/signup', data);
export const loginService = (data) => api.post('/api/auth/login', data);
export const getProfile = () => api.get('/api/auth/profile');

export default api;

