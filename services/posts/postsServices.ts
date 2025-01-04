import { apiClientWrapper } from '../api/client';
import { Post, PostCreation } from '@/types/api.types';

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

  async createPost(postData: PostCreation): Promise<Post> {
    try {
      const response = await apiClientWrapper.post<Post>('/posts', postData);
      return response;
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  }
};