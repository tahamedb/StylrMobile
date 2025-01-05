import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

// For Android physical device, use your computer's local IP address
const BASE_URL = Platform.select({
    ios: 'http://localhost:8088',
  android: 'http://192.168.1.57:8088', // Replace with your actual IP address
});

if (!BASE_URL) {
    throw new Error('API URL is not configured for this platform');
}

const API_URL = `${BASE_URL}/auth`;

interface User {
  id: number;
  username: string;
  email: string;
}

interface LoginResponse {
  token: string;
  user: User;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

interface LoginData {
  username: string;
  password: string;
}

class AuthService {
  private static instance: AuthService;
  private token: string | null = null;
  private currentUser: User | null = null;

  private constructor() {
    // Initialize axios default headers
    axios.defaults.headers.post['Content-Type'] = 'application/json';
  }

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async login(data: LoginData): Promise<LoginResponse> {
    try {
      console.log('Attempting login to:', `${API_URL}/login`, 'with data:', {
        username: data.username,
        password: '***'
      });

      const response = await axios.post<{token: string}>(`${API_URL}/login`, {
        username: data.username,
        password: data.password
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      console.log('Login response:', response.data);

      // Create user object from username
      const user: User = {
        id: 0, // We'll use 0 as default since we don't have the real ID
        username: data.username,
        email: data.username // Using username as email for now
      };

      await this.setToken(response.data.token);
      await this.setUser(user);

      return {
        token: response.data.token,
        user
      };
    } catch (error) {
      console.error('Login error:', error);
      if (axios.isAxiosError(error)) {
        console.error('Response data:', error.response?.data);
        console.error('Status code:', error.response?.status);
        console.error('Request config:', {
          url: error.config?.url,
          method: error.config?.method,
          headers: error.config?.headers,
          data: '***' // Hide sensitive data in logs
        });
      }
      throw error;
    }
  }

  async register(data: RegisterData): Promise<LoginResponse> {
    try {
      console.log('Attempting registration to:', `${API_URL}/register`, 'with data:', {
        username: data.username,
        email: data.email,
        password: '***'
      });

      // First, register the user
      const registerResponse = await axios.post(`${API_URL}/register`, data, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      console.log('Registration response:', {
        status: registerResponse.status,
        data: registerResponse.data
      });

      // If registration is successful, automatically log them in
      if (registerResponse.status === 200) {
        return await this.login({
          username: data.username,
          password: data.password
        });
      } else {
        throw new Error(registerResponse.data?.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error in service:', error);
      if (axios.isAxiosError(error)) {
        console.error('Response data:', error.response?.data);
        console.error('Status code:', error.response?.status);
        console.error('Request config:', {
          url: error.config?.url,
          method: error.config?.method,
          headers: error.config?.headers
        });
      }
      throw error;
    }
  }

  async logout(): Promise<void> {
    await this.setToken(null);
    await this.setUser(null);
  }

  async getToken(): Promise<string | null> {
    if (!this.token) {
      this.token = await SecureStore.getItemAsync('auth_token');
      // Set up axios interceptor for authenticated requests if we have a token
      if (this.token) {
        this.setupAuthInterceptor(this.token);
      }
    }
    return this.token;
  }

  private setupAuthInterceptor(token: string) {
    // Set up axios interceptor to add token to all requests
    axios.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  private async setToken(token: string | null): Promise<void> {
    this.token = token;
    if (token) {
      await SecureStore.setItemAsync('auth_token', token);
      this.setupAuthInterceptor(token);
    } else {
      await SecureStore.deleteItemAsync('auth_token');
      // Reset axios headers
      delete axios.defaults.headers.common['Authorization'];
    }
  }

  async getStoredUser(): Promise<User | null> {
    if (!this.currentUser) {
      const userJson = await SecureStore.getItemAsync('user_data');
      if (userJson) {
        this.currentUser = JSON.parse(userJson);
      }
    }
    return this.currentUser;
  }

  private async setUser(user: User | null): Promise<void> {
    this.currentUser = user;
    if (user) {
      await SecureStore.setItemAsync('user_data', JSON.stringify(user));
    } else {
      await SecureStore.deleteItemAsync('user_data');
    }
  }

  async isAuthenticated(): Promise<boolean> {
    const token = await this.getToken();
    return !!token;
  }
}

export const authService = AuthService.getInstance(); 