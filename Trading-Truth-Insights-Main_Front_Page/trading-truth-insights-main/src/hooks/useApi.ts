import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient, TradingData, DashboardStats, isBackendAvailable } from '@/lib/api';

// Query keys for React Query cache management
export const QUERY_KEYS = {
  dashboard: ['dashboard'] as const,
  calendar: ['calendar'] as const,
  journal: ['journal'] as const,
  performance: ['performance'] as const,
  backendStatus: ['backend-status'] as const,
} as const;

// Hook to check if backend is available
export const useBackendStatus = () => {
  return useQuery({
    queryKey: QUERY_KEYS.backendStatus,
    queryFn: isBackendAvailable,
    refetchInterval: 30000, // Check every 30 seconds
    retry: 3,
    retryDelay: 1000,
  });
};

// Hook to get dashboard statistics
export const useDashboardStats = () => {
  return useQuery({
    queryKey: QUERY_KEYS.dashboard,
    queryFn: async () => {
      const response = await apiClient.getDashboardStats();
      if (!response.success) {
        throw new Error(response.error || 'Failed to fetch dashboard stats');
      }
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
};

// Hook to get calendar data
export const useCalendarData = () => {
  return useQuery({
    queryKey: QUERY_KEYS.calendar,
    queryFn: async () => {
      const response = await apiClient.getCalendarData();
      if (!response.success) {
        throw new Error(response.error || 'Failed to fetch calendar data');
      }
      return response.data || {};
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
    retry: 1,
  });
};

// Hook to save calendar data
export const useSaveCalendarData = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: Record<string, TradingData>) => {
      const response = await apiClient.saveCalendarData(data);
      if (!response.success) {
        throw new Error(response.error || 'Failed to save calendar data');
      }
      return response;
    },
    onSuccess: () => {
      // Invalidate and refetch calendar data
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.calendar });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.dashboard });
    },
    onError: (error) => {
      console.error('Failed to save calendar data:', error);
    },
  });
};

// Hook to get journal entries
export const useJournalEntries = () => {
  return useQuery({
    queryKey: QUERY_KEYS.journal,
    queryFn: async () => {
      const response = await apiClient.getJournalEntries();
      if (!response.success) {
        throw new Error(response.error || 'Failed to fetch journal entries');
      }
      return response.data || [];
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
};

// Hook to save journal entry
export const useSaveJournalEntry = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (entry: any) => {
      const response = await apiClient.saveJournalEntry(entry);
      if (!response.success) {
        throw new Error(response.error || 'Failed to save journal entry');
      }
      return response;
    },
    onSuccess: () => {
      // Invalidate and refetch journal data
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.journal });
    },
    onError: (error) => {
      console.error('Failed to save journal entry:', error);
    },
  });
};

// Hook to get performance data
export const usePerformanceData = () => {
  return useQuery({
    queryKey: QUERY_KEYS.performance,
    queryFn: async () => {
      const response = await apiClient.getPerformanceData();
      if (!response.success) {
        throw new Error(response.error || 'Failed to fetch performance data');
      }
      return response.data || [];
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 1,
  });
};

// Utility hook to provide API status information
export const useApiStatus = () => {
  const { data: isOnline, isLoading, error } = useBackendStatus();
  
  return {
    isOnline: isOnline || false,
    isLoading,
    error,
    status: isOnline ? 'connected' : 'offline',
    message: isOnline 
      ? 'Connected to backend' 
      : 'Using offline mode (localStorage)',
  };
}; 