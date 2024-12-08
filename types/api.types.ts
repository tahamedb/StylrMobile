// Replace these with your actual API response types
export interface ApiResponse<T> {
    data: T;
    message: string;
    status: number;
}

export interface User {
    id: number;
    username: string;
    email: string;
}

export interface Post {
    id: number;
    title?: string;
    //body: string;
    content:string;
    tags?: string[];
    reactions?: {
    title?: string;
    //body: string;
    content:string;
    tags?: string[];
    reactions?: {
        likes: number;
        dislikes: number;
    };
    views?: number;
    userId?: number;
    createdAt?: string;
    imageUrl?:string;
}
}
export interface PostCreation {
    content: string;
    imageUrl: string;
}

export interface PostsResponse {
    posts: Post[];
    total: number;
    skip: number;
    limit: number;
}