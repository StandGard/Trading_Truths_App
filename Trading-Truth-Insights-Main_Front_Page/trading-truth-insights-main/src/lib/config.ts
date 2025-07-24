// API Configuration
export const API_CONFIG = {
  // Backend API URL - update this when deploying
  baseURL: import.meta.env.VITE_API_URL || 'https://trading-truths-app-2.onrender.com',
  
  // API endpoints
  endpoints: {
    // User authentication
    login: '/api/auth/login',
    register: '/api/auth/register',
    logout: '/api/auth/logout',
    
    // Trading data
    dashboard: '/api/dashboard',
    trades: '/api/trades',
    journal: '/api/journal',
    calendar: '/api/calendar',
    
    // Analytics
    performance: '/api/analytics/performance',
    stats: '/api/analytics/stats',
  },
  
  // Request configuration
  timeout: 10000, // 10 seconds
  retries: 3,
};

// Environment settings
export const ENV = {
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
  apiUrl: API_CONFIG.baseURL,
}; 