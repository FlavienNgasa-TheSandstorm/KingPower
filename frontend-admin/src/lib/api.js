import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// IMPORTANT: Ajouter le token à chaque requête
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log('🔑 Token ajouté à la requête:', config.url);
  } else {
    console.log('⚠️ Pas de token pour:', config.url);
  }
  return config;
});

// Log les réponses pour debug
api.interceptors.response.use(
  (response) => {
    console.log('✅ Réponse reçue:', response.config.url, response.status);
    return response;
  },
  (error) => {
    console.error('❌ Erreur réponse:', error.config?.url, error.response?.status);
    return Promise.reject(error);
  }
);

export default api;