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
    content: string;
    imageUrl?: string;
    createdAt?: string;
    userId?: number;
    likes?: number;
    reactions?: {
        likes: number;
        dislikes: number;
    };
    comments?: Array<{
        id: number;
        content: string;
        username: string;
        createdAt: string;
    }>;
    // ... other fields if needed
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

// Start Wordrobe part 

export type Tab = 'tous' | 'tops' | 'tenues';


import { Occasion } from '../components/wardrobe/clothingDetail/Body/InformationComponents/OccasionSection';

//!!ici ajouter champ brand  dans backend 

export interface ClothingItem {
    id: number;
    name: string;
    category: string;
    imageUrl: string;
    colors: string[];
    patterns: string[];
    season: string;
    occasion: string;
    size: string;
    brand: string;
    material: string;
    wardrobe?: { id: number };
    createdAt: string;
    updatedAt: string;
}
//Profile wardrobe Component
export interface Wardrobe {
    id: number;
    name: string;
    user: {
        id: number;
    };
    clothingItems?: ClothingItem[];
    outfits?: Outfit[];
    createdAt: string;
    updatedAt: string;
}

export interface Outfit {
    id: number;
    name: string;
    description?: string;
    season: string;
    occasion: string;
    tags: string[];
    wardrobe: { id: number };
    top?: { id: number };
    bottom?: { id: number };
    dress?: { id: number };
    outerwear?: { id: number };
    shoes?: { id: number };
    accessories?: { id: number }[];
    rating: number;
    timesWorn: number;
    createdAt: string;
    updatedAt: string;
    imageUrl?: string;
}

//Profile Outfits Component 
export type TabType = 'Idées' | 'Tenue du jour' | 'Recommandation';
export type VariantType = 'private' | 'public';

export interface OutfitTabsProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  variant: VariantType;
}

export interface OutfitsProps {
  variant: 'private' | 'public';
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
