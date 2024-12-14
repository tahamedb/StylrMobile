//import axios from 'axios';
import { Platform } from 'react-native';
import axios, { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import Constants from 'expo-constants/build/Constants';
//const API_URL = 'https://dummyjson.com'; // Replace with your actual base URL


const API_URL = Platform.select({
    ios: 'http://localhost:8088/api', // Use localhost for iOS simulator
    android: 'http://192.168.1.106:8088/api', // Use the local network IP for Android
});



export const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Constants.expoConfig?.extra?.EXPO_PUBLIC_AUTH_TOKEN}`
    },
});


export const apiClientWrapper = {

    async get<T>(endpoint: string): Promise<T> {
        const response = await apiClient.get<T>(endpoint);
        return response.data;
    },

   /* async post<T>(endpoint: string, data: any): Promise<T> {
        const response = await apiClient.post<T>(endpoint, data);
        return response.data;
    },*/
    async post<T>(endpoint: string, data: any): Promise<T> {
        // Vérification du token avant chaque requête
        const token = Constants.expoConfig?.extra?.EXPO_PUBLIC_AUTH_TOKEN;
        
        if (!token || token.trim() === '') {
            throw new Error('Authentication token is missing');
        }
        
        try {
            const response = await apiClient.post<T>(endpoint, data);
            return response.data;
        } catch (error) {
            console.error('API POST Error:', error);
            throw error;
        }
    },

    async put<T>(endpoint: string, data: any): Promise<T> {
        const response = await apiClient.put<T>(endpoint, data);
        return response.data;
    },

    async delete<T>(endpoint: string): Promise<T> {
        const response = await apiClient.delete<T>(endpoint);
        return response.data;
    },

};

/*apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        console.log('🚀 Request URL:', `${config.baseURL}${config.url}`);
        return config;
    },
    (error) => {
        console.log('❌ Request Error:', error);
        return Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response) => {
        console.log('✅ Response Status:', response.status);
        console.log('📦 Response Data:', response.data);
        return response;
    },
    (error) => {
        console.log('❌ Response Error:', error);
        console.log('🔍 Full URL:', error.config?.url);
        return Promise.reject(error);
    }
);

export const apiClientWrapper = {
    async get<T>(endpoint: string): Promise<T> {
        try {
            const response = await apiClient.get<T>(endpoint);
            return response.data;
        } catch (error) {
            console.error(`Failed GET request to ${endpoint}:`, error);
            throw error;
        }
    }
};*/
