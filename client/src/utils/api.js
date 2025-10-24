import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  signup: (data) => api.post('/auth/signup', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
  addToFavorites: (songId) => api.post(`/auth/favorites/${songId}`),
  removeFromFavorites: (songId) => api.delete(`/auth/favorites/${songId}`)
};

// Songs API calls
export const songsAPI = {
  search: (query, limit = 20) => api.get('/songs/search', { params: { query, limit } }),
  getInstrumental: (limit = 50) => api.get('/songs/instrumental', { params: { limit } }),
  getRecommended: (limit = 20) => api.get('/songs/recommended', { params: { limit } }),
  getById: (id) => api.get(`/songs/${id}`),
  save: (data) => api.post('/songs', data)
};

// JioSaavn API calls (Free alternative with full streaming)
export const jiosaavnAPI = {
  search: (query, limit = 20) => api.get('/jiosaavn/search', { params: { query, limit } }),
  getInstrumental: (limit = 20) => api.get('/jiosaavn/instrumental', { params: { limit } }),
  getTrending: (limit = 20) => api.get('/jiosaavn/trending', { params: { limit } }),
  getById: (id) => api.get(`/jiosaavn/${id}`)
};

// Jamendo API calls (Free Creative Commons music)
export const jamendoAPI = {
  search: (query, limit = 20) => api.get('/jamendo/search', { params: { query, limit } }),
  getInstrumental: (limit = 50) => api.get('/jamendo/instrumental', { params: { limit } }),
};

// YouTube API calls (Removed - YouTube songs are not supported for playback)
export const youtubeAPI = {
  search: (query, limit = 20) => Promise.resolve({ data: { data: [] } }),
  getInstrumental: (limit = 20) => Promise.resolve({ data: { data: [] } }),
  getRecommended: (limit = 20) => Promise.resolve({ data: { data: [] } })
};

// Spotify API calls (Removed - Only 30-second previews available)
export const spotifyAPI = {
  search: (query, limit = 20) => Promise.resolve({ data: { data: [] } })
};

// Playlists API calls
export const playlistsAPI = {
  create: (data) => api.post('/playlists', data),
  getUserPlaylists: (userId) => api.get(`/playlists/user/${userId}`),
  getById: (id) => api.get(`/playlists/${id}`),
  update: (id, data) => api.put(`/playlists/${id}`, data),
  delete: (id) => api.delete(`/playlists/${id}`),
  addSong: (id, songData) => api.post(`/playlists/${id}/songs`, songData),
  removeSong: (id, songId) => api.delete(`/playlists/${id}/songs/${songId}`)
};

export default api;
