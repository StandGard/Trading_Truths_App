import { API_CONFIG } from './config';

// Types for API responses
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface TradingData {
  date: string;
  trades: number;
  pnl: number;
  emotionalState: {
    before: string;
    during: string;
    after: string;
  };
  sleep: number;
  meals: string;
  water: number;
  newsEvents: string;
  marketImpact: string;
  reflection: string;
  pnlTag: 'profit' | 'loss' | 'neutral';
  tradeDetails: Array<{
    setup: string;
    entry: string;
    exit: string;
    result: number;
    notes: string;
  }>;
}

export interface DashboardStats {
  totalPnL: number;
  accountBalance: number;
  winRate: number;
  totalTrades: number;
  activePlans: number;
}

// API Client class
class ApiClient {
  private baseURL: string;

  constructor() {
    this.baseURL = API_CONFIG.baseURL;
  }

  // Generic request method with error handling
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    
    const defaultOptions: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        // Add CORS headers
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
      // Include credentials for CORS
      credentials: 'include',
      ...options,
    };

    try {
      console.log(`Making API request to: ${url}`);
      
      const response = await fetch(url, defaultOptions);
      
      // Log response for debugging
      console.log(`API Response Status: ${response.status}`);
      
      // Handle non-JSON responses (like your current backend)
      const contentType = response.headers.get('content-type');
      let data: any;
      
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        // Handle text responses from your current backend
        const text = await response.text();
        data = { message: text };
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}, message: ${data.message || 'Unknown error'}`);
      }

      return {
        success: true,
        data,
        message: data.message || 'Success',
      };
    } catch (error) {
      console.error('API request failed:', error);
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        message: 'Request failed',
      };
    }
  }

  // Test connection to backend
  async testConnection(): Promise<ApiResponse<string>> {
    return this.request('/');
  }

  // Dashboard data
  async getDashboardStats(): Promise<ApiResponse<DashboardStats>> {
    // For now, return mock data since backend doesn't have these endpoints yet
    return {
      success: true,
      data: {
        totalPnL: 2450.75,
        accountBalance: 12450.75,
        winRate: 65.3,
        totalTrades: 142,
        activePlans: 3,
      },
      message: 'Dashboard stats retrieved (mock data)',
    };
  }

  // Trading calendar data
  async getCalendarData(): Promise<ApiResponse<Record<string, TradingData>>> {
    // For now, try to get from backend, fall back to localStorage
    try {
      const response = await this.request<Record<string, TradingData>>(API_CONFIG.endpoints.calendar);
      if (response.success) {
        return response;
      }
    } catch (error) {
      console.log('Backend calendar endpoint not available, using localStorage');
    }
    
    // Fallback to localStorage for existing data
    const saved = localStorage.getItem('trading-calendar-entries');
    return {
      success: true,
      data: saved ? JSON.parse(saved) : {},
      message: 'Calendar data retrieved from local storage',
    };
  }

  // Save trading calendar data
  async saveCalendarData(data: Record<string, TradingData>): Promise<ApiResponse<void>> {
    try {
      const response = await this.request<void>(API_CONFIG.endpoints.calendar, {
        method: 'POST',
        body: JSON.stringify(data),
      });
      
      if (response.success) {
        return response;
      }
    } catch (error) {
      console.log('Backend save endpoint not available, using localStorage');
    }
    
    // Fallback to localStorage
    localStorage.setItem('trading-calendar-entries', JSON.stringify(data));
    return {
      success: true,
      message: 'Calendar data saved to local storage',
    };
  }

  // Journal entries
  async getJournalEntries(): Promise<ApiResponse<any[]>> {
    try {
      const response = await this.request<any[]>(API_CONFIG.endpoints.journal);
      if (response.success) {
        return response;
      }
    } catch (error) {
      console.log('Backend journal endpoint not available');
    }
    
    // Return mock data for now
    return {
      success: true,
      data: [],
      message: 'Journal entries retrieved (mock data)',
    };
  }

  // Save journal entry
  async saveJournalEntry(entry: any): Promise<ApiResponse<void>> {
    return this.request(API_CONFIG.endpoints.journal, {
      method: 'POST',
      body: JSON.stringify(entry),
    });
  }

  // Performance analytics
  async getPerformanceData(): Promise<ApiResponse<any[]>> {
    try {
      const response = await this.request<any[]>(API_CONFIG.endpoints.performance);
      if (response.success) {
        return response;
      }
    } catch (error) {
      console.log('Backend performance endpoint not available');
    }
    
    // Return mock data for now
    return {
      success: true,
      data: [],
      message: 'Performance data retrieved (mock data)',
    };
  }
}

// Export singleton instance
export const apiClient = new ApiClient();

// Export utility functions
export const isBackendAvailable = async (): Promise<boolean> => {
  const response = await apiClient.testConnection();
  return response.success;
}; 