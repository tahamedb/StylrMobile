import { apiClientWrapper } from '../api/client';
import { Post, PostsResponse } from '@/types/api.types';

export const postsService = {
  async getPosts(): Promise<Post[]> {
    try {
      const response = await apiClientWrapper.get<Post[]>('/posts');
      console.log('Posts response:', response); // Add this for debugging
      return response;
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  },
};