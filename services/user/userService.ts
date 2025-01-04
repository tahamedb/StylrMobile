import { apiClientWrapper } from '../api/client';
import { User } from '@/types/api.types';

class UserService {
  private static instance: UserService;

  private constructor() {}

  static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  async getCurrentUser(): Promise<User> {
    try {
      const response = await apiClientWrapper.get<User>('/users/me');
      return response;
    } catch (error) {
      console.error('Error fetching current user:', error);
      throw error;
    }
  }

  async updateProfile(data: Partial<User>): Promise<User> {
    try {
      const response = await apiClientWrapper.put<User>('/users/me', data);
      return response;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  }

  async searchUsers(query: string): Promise<User[]> {
    try {
      const response = await apiClientWrapper.get<User[]>(`/users/search/${query}`);
      return response;
    } catch (error) {
      console.error('Error searching users:', error);
      throw error;
    }
  }

  async getUserById(userId: number): Promise<User> {
    try {
      const response = await apiClientWrapper.get<User>(`/users/${userId}`);
      return response;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  }
}

export const userService = UserService.getInstance(); 