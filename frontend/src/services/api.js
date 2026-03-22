import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('sessaoToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response, 

  (error) => {
    if (error.response?.status === 401) {
      sessionStorage.removeItem('sessaoToken');
      sessionStorage.removeItem('participante');
      window.location.href = '/'; 
    }
    return Promise.reject(error);
  }
);

export default api;