//import axios from 'axios';
import axios, { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
//const API_URL = 'https://dummyjson.com'; // Replace with your actual base URL

const API_URL = 'http://192.168.1.22:8088/api';  //URL dyali pour le test de Wardrobe localement.
//const API_URL = 'https://25423c9b-63d3-4678-bbe0-35a51c99fb9a.mock.pstmn.io'; 


export const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});


export const apiClientWrapper = {

    async get<T>(endpoint: string): Promise<T> {
        const response = await apiClient.get<T>(endpoint);
        return response.data;
    },

    async post<T>(endpoint: string, data: any): Promise<T> {
        const response = await apiClient.post<T>(endpoint, data);
        return response.data;
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
};
*/