import { Platform } from 'react-native';
import axios, { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { authService } from '../auth/authService';

const BASE_URL = Platform.select({
    ios: 'http://localhost:8088/api',
    android: 'http://192.168.1.57:8088/api',
});

if (!BASE_URL) {
    throw new Error('API URL is not configured for this platform');
}

export const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add request interceptor to include auth token
apiClient.interceptors.request.use(
    async (config) => {
        const token = await authService.getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add response interceptor for better error handling
apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            // Token expired or invalid
            await authService.logout();
            // You might want to redirect to login here
        }
        return Promise.reject(error);
    }
);

export const apiClientWrapper = {
    async get<T>(endpoint: string): Promise<T> {
        try {
            const response = await apiClient.get<T>(endpoint);
            return response.data;
        } catch (error: any) {
            console.error('API GET Error:', {
                endpoint,
                error: error.response?.data || error.message
            });
            throw new Error(error.response?.data?.message || error.message);
        }
    },

    async post<T>(endpoint: string, data: any): Promise<T> {
        try {
            console.log('API POST Request:', {
                endpoint,
                data
            });
            const response = await apiClient.post<T>(endpoint, data);
            console.log('API POST Response:', response.data);
            return response.data;
        } catch (error: any) {
            console.error('API POST Error:', {
                endpoint,
                data,
                error: error.response?.data || error.message
            });
            throw new Error(error.response?.data?.message || error.message);
        }
    },

    async put<T>(endpoint: string, data: any): Promise<T> {
        try {
            const response = await apiClient.put<T>(endpoint, data);
            return response.data;
        } catch (error: any) {
            console.error('API PUT Error:', {
                endpoint,
                data,
                error: error.response?.data || error.message
            });
            throw new Error(error.response?.data?.message || error.message);
        }
    },

    async delete<T>(endpoint: string): Promise<T> {
        try {
            const response = await apiClient.delete<T>(endpoint);
            return response.data;
        } catch (error: any) {
            console.error('API DELETE Error:', {
                endpoint,
                error: error.response?.data || error.message
            });
            throw new Error(error.response?.data?.message || error.message);
        }
    },
};

