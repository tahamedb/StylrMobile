import axios from 'axios';
import { Platform } from 'react-native';
import Constants from 'expo-constants';
// Base URL for the API
const API_URL = Platform.select({
    ios: 'http://localhost:8088/api', // Use localhost for iOS simulator
    android: 'http://192.168.1.6:8088/api', // Use the local network IP for Android
});
// Create an axios instance
export const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});
// Wrapper for API requests
export const apiClientWrapper = {
    async get<T>(endpoint: string): Promise<T> {
        const response = await apiClient.get<T>(endpoint);
        return response.data;
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