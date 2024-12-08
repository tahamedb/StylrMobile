// Replace these with your actual API response types
export interface ApiResponse<T> {
    data: T;
    message: string;
    status: number;
}

// used By Taha
/*export interface User {
    id: number;
    username: string;
    email: string;
}
*/
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


import { Occasion } from '../components/wardrobe/clothingDetail/Body/InformationComponents/OccasionSection';

export interface ClothingItem {
    occasion: Occasion | undefined;
    id: any;
    name: string;
    category: string;
    color: string;
    size: string;
    material: string;
    season: string;
    imageUrl: string;
    createdAt: string;
    updatedAt: string;
    brand: string;
    rating: number;
    price: number;
    purchaseDate: string;
    purchaseLink: string;
    colors: string[];
}



// End Wordrobe part 


// attributs non utilises mais existent dans backend (ajouter si besoin)
export interface User {
    id: number;
    username: string;
    //email: string;
    //password: string;
    profileImage: string;
    bio: string;
    //createdAt: string;
    //updatedAt: string;
    followers: User[];
    followings: User[];
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
