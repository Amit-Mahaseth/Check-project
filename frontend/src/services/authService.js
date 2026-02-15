import api from './api'

export const authService = {
  // Login
  login: (email, password) => 
    api.post('/auth/login', { email, password }),

  // Register
  register: (email, password, name) => 
    api.post('/auth/register', { email, password, name }),

  // Logout
  logout: () => {
    localStorage.removeItem('authToken')
    localStorage.removeItem('user')
  },

  // Get current user
  getCurrentUser: () => api.get('/auth/me'),

  // Update profile
  updateProfile: (data) => api.put('/auth/profile', data),

  // Refresh token
  refreshToken: () => api.post('/auth/refresh'),

  // Verify email
  verifyEmail: (token) => api.post('/auth/verify-email', { token }),

  // Request password reset
  requestPasswordReset: (email) => api.post('/auth/forgot-password', { email }),

  // Reset password
  resetPassword: (token, password) => 
    api.post('/auth/reset-password', { token, password }),
}
