import axios from 'axios';
// Create axios instance with base URL
const api = axios.create({
    baseURL: 'http://localhost:5001/api',
    headers: {
        'Content-Type': 'application/json',
    },
});
// Request interceptor for adding auth token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => Promise.reject(error));
// Response interceptor for error handling
api.interceptors.response.use((response) => response, async (error) => {
    // Handle 401 Unauthorized errors
    if (error.response && error.response.status === 401) {
        // Redirect to login or refresh token logic here
        localStorage.removeItem('token');
        window.location.href = '/login';
    }
    return Promise.reject(error);
});
// Auth services
export const authService = {
    login: (credentials) => api.post('/auth/login', credentials),
    register: (userData) => api.post('/auth/register', userData),
    logout: () => {
        localStorage.removeItem('token');
        return Promise.resolve();
    },
};
// Analysis services
export const analysisService = {
    analyze: (data) => api.post('/analysis/metrics', data),
    getAllAnalyses: () => api.get('/analysis'),
    getAnalysisById: (id) => api.get(`/analysis/${id}`),
    deleteAnalysis: (id) => api.delete(`/analysis/${id}`),
    compareAnalyses: (ids) => api.post('/analysis/compare', { ids }),
    exportAnalysis: (id, format) => api.get(`/analysis/${id}/export/${format}`),
};
// User services
export const userService = {
    getProfile: () => api.get('/users/profile'),
    updateProfile: (data) => api.put('/users/profile', data),
    changePassword: (data) => api.put('/users/password', data),
    deleteAccount: () => api.delete('/users/account'),
};
export default api;
