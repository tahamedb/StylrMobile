import {apiClientWrapper} from '@/services/api/client';
import { Post, PostCreation, PostsResponse } from '@/types/api.types';

export const postsService = {
    getPosts: () =>
        apiClientWrapper.get<PostsResponse>('/posts'),

    getPostById: (id: number) =>
        apiClientWrapper.get<Post>(`/posts/${id}`),

   
    /* 
     createPost: (postData: Omit<Post, 'id'>) =>
        apiClientWrapper.post<Post>('/posts', postData),
    */ 
     createPost: (postData: PostCreation) =>
        apiClientWrapper.post<Post>('/posts', postData),
};