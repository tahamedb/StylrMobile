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
    title: string;
    body: string;
    tags: string[];
    reactions: {
        likes: number;
        dislikes: number;
    };
    views: number;
    userId: number;
}

export interface PostsResponse {
    posts: Post[];
    total: number;
    skip: number;
    limit: number;
}

// Start Wordrobe part 

export type Tab = 'tous' | 'tops';

//!!ici ajouter champ brand  dans backend 

export interface ClothingItem {
    id: any;
    name: string;
    category: string;
    color: string;
    size: string;
    material: string;
    pattern: string;
    season: string;
    imageUrl: string;
    createdAt: string;
    updatedAt: string;
}

// End Wordrobe part 