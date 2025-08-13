import axios from 'axios';

// Create axios instance with base URL
const api = axios.create({
  baseURL: 'http://localhost:5001/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Handle 401 Unauthorized errors
    if (error.response && error.response.status === 401) {
      // Redirect to login or refresh token logic here
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth services
export const authService = {
  login: (credentials: { email: string; password: string }) => 
    api.post('/auth/login', credentials),
  register: (userData: { name: string; email: string; password: string }) => 
    api.post('/auth/register', userData),
  logout: () => {
    localStorage.removeItem('token');
    return Promise.resolve();
  },
};

// Analysis services
export const analysisService = {
  analyze: (data: { language: string; code: string; title: string }) => 
    api.post('/analysis/metrics', data),
  getAllAnalyses: () => 
    api.get('/analysis'),
  getAnalysisById: (id: string) => 
    api.get(`/analysis/${id}`),
  deleteAnalysis: (id: string) => 
    api.delete(`/analysis/${id}`),
  compareAnalyses: (ids: string[]) => 
    api.post('/analysis/compare', { ids }),
  exportAnalysis: (id: string, format: 'pdf' | 'json') => 
    api.get(`/analysis/${id}/export/${format}`),
};

// User services
export const userService = {
  getProfile: () => 
    api.get('/users/profile'),
  updateProfile: (data: { name?: string; email?: string }) => 
    api.put('/users/profile', data),
  changePassword: (data: { currentPassword: string; newPassword: string }) => 
    api.put('/users/password', data),
  deleteAccount: () => 
    api.delete('/users/account'),
};

export default api; 