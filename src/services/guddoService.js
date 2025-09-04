import axios from 'axios'

const guddoService = axios.create({
    baseURL: 'http://localhost:8080', // Ensure this matches your backend URL
    withCredentials: true,
    timeout: 10000,
});

// Request interceptor for adding auth token
guddoService.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken'); // Make sure this matches your token key
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Add these services methods
export default {
    // Login method
    logIn(credentials) {
        return guddoService.post('/auth/login', credentials)
            .then(response => response.data);
    },

    // Register method
    register(userData) {
        return guddoService.post('/auth/register', userData)
            .then(response => response.data);
    },

    googleLogin() {
        window.location.href = 'http://localhost:8080/oauth2/authorization/google';
    }

};