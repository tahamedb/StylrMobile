import { apiClient } from '@/services/api/client';
import { Post, PostsResponse } from '@/types/api.types';

export const postsService = {
    getPosts: () =>
        apiClient.get<PostsResponse>('/posts'),

    getPostById: (id: number) =>
        apiClient.get<Post>(`/posts/${id}`),

    createPost: (postData: Omit<Post, 'id'>) =>
        apiClient.post<Post>('/posts', postData),
};