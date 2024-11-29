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


export interface WeatherResponse {
    list: Array<{
        dt: number;
        main: {
            temp: number;
            temp_min: number;
            temp_max: number;
        };
        dt_txt: string;
    }>;
}

export interface ForecastDay {
    date: string;
    temp_min: number;
    temp_max: number;
}
