const API_URL = 'https://dummyjson.com';

class ApiError extends Error {
    constructor(public status: number, message: string) {
        super(message);
    }
}

export const apiClient = {
    async get<T>(endpoint: string): Promise<T> {
        const response = await fetch(`${API_URL}${endpoint}`);
        if (!response.ok) {
            throw new ApiError(response.status, await response.text());
        }
        return response.json();
    },

    async post<T>(endpoint: string, data: any): Promise<T> {
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new ApiError(response.status, await response.text());
        }
        return response.json();
    }
};