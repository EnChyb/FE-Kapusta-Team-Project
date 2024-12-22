import axios from 'axios';
const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://be-kapusta-team-project.onrender.com";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
// Dodanie interceptorów 
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const { data } = await axios.post(`${API_URL}/refresh-token`, { token: refreshToken });
        
        localStorage.setItem('token', data.accessToken); originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;
        return api(originalRequest);
      } catch (err) {
        console.error('Unable to refresh token', err);
        // Wyloguj użytkownika, jeśli nie uda się odświeżyć tokena
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
      }
    } return Promise.reject(error);
  }
);

export default API_URL;
