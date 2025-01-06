import axios, { AxiosError } from 'axios';
import { Platform } from 'react-native';

const AI_API_URL = Platform.select({
    ios: 'http://localhost:8000',
    android: 'http://192.168.1.106:8000',
});

const aiClient = axios.create({
    baseURL: AI_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

interface ColorPrediction {
    name: string;
    hex: string;
}

export interface PredictionResponse {
    category: string;
    colors: ColorPrediction[];
    materials: string[];
    occasions: string[];
    seasons: string[];
    confidence: number;
    pattern: string;
}

export const predictClothingAttributes = async (imageBase64: string): Promise<PredictionResponse> => {
    try {
        console.log('AI API URL:', AI_API_URL);
        
        // Clean the base64 string if it contains the data URI prefix
        const base64Data = imageBase64.includes('base64,') 
            ? imageBase64.split('base64,')[1] 
            : imageBase64;

        // Send the base64 string directly in the request body
        const response = await aiClient.post<PredictionResponse>('/predict', {
            image: base64Data
        });
        
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError;
            console.error('Error predicting clothing attributes:');
            console.error('Status:', axiosError.response?.status);
            console.error('Status Text:', axiosError.response?.statusText);
            console.error('Response Data:', axiosError.response?.data);
            console.error('Request URL:', axiosError.config?.url);
            console.error('Request Data:', axiosError.config?.data);
        } else {
            console.error('Non-Axios error:', error);
        }
        throw error;
    }
}; 