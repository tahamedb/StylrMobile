//import axios from 'axios';
import axios, { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import Constants from 'expo-constants/build/Constants';
//const API_URL = 'https://dummyjson.com'; // Replace with your actual base URL

const API_URL = 'http://localhost:8088/api';  //URL dyali pour le test de Wardrobe localement.
//const API_URL = 'https://25423c9b-63d3-4678-bbe0-35a51c99fb9a.mock.pstmn.io'; 


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