import axios, { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { Platform } from 'react-native';
import Constants from 'expo-constants';

// Base URL for the API
// const API_URL = 'https://dummyjson.com'; // Replace with your actual base URL

// const API_URL = 'http://192.168.100.162:8088/api';  //URL dyali pour le test de Wardrobe localement.
// //const API_URL = 'https://25423c9b-63d3-4678-bbe0-35a51c99fb9a.mock.pstmn.io'; 




const API_URL = Platform.select({
    ios: 'http://localhost:8088/api', // Use localhost for iOS simulator
    android: 'http://192.168.1.6:8088/api', // Use the local network IP for Android
});






export const apiClient = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});
//intercepteur
apiClient.interceptors.request.use(
    config => {
        console.log('Request:', config.url);
        return config;
    },
    error => {
        console.log('Request Error:', error);
        return Promise.reject(error);
    }
);

// Wrapper for API requests
export const apiClientWrapper = {
    async get<T>(endpoint: string): Promise<T> {
        const token = Constants.expoConfig?.extra?.EXPO_PUBLIC_AUTH_TOKEN;
    const headers = token
        ? { 'Authorization': `Bearer ${token}` }
        : {};
    try {
        console.log('Tentative GET:', endpoint);
        console.log('Headers:', headers);
        const response = await apiClient.get<T>(endpoint, { headers });
        console.log('Réponse:', response.data);
        return response.data;
    } catch (error: any) {
        console.error('Erreur API GET détaillée:', {
            message: error.message,
            status: error.response?.status,
            data: error.response?.data,
            config: error.config
        });
        throw error;
    }
    },
    async post<T>(endpoint: string, data: any): Promise<T> {
        const token = Constants.expoConfig?.extra?.EXPO_PUBLIC_AUTH_TOKEN;
        // Include the token in the headers only if it exists
        const headers = token
            ? { 'Authorization': `Bearer ${token}` }
            : {};
        try {
            const response = await apiClient.post<T>(endpoint, data, { headers });
            return response.data;
        } catch (error) {
            console.error('API POST Error:', error);
            throw error;
        }
    },
    async put<T>(endpoint: string, data: any): Promise<T> {
        const token = Constants.expoConfig?.extra?.EXPO_PUBLIC_AUTH_TOKEN;
        const headers = token
            ? { 'Authorization': `Bearer ${token}` }
            : {};
        const response = await apiClient.put<T>(endpoint, data, { headers });
        return response.data;
    },
    async delete<T>(endpoint: string): Promise<T> {
        const token = Constants.expoConfig?.extra?.EXPO_PUBLIC_AUTH_TOKEN;
        const headers = token
            ? { 'Authorization': `Bearer ${token}` }
            : {};
        const response = await apiClient.delete<T>(endpoint, { headers });
        return response.data;
    },
};