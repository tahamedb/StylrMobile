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

// Start Wordrobe part 

export type Tab = 'tous' | 'tops';


import { Occasion } from '../components/wardrobe/clothingDetail/Body/InformationComponents/OccasionSection';

//!!ici ajouter champ brand  dans backend 

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

export interface Outfit {
    id: number;
    name: string;
    description: string | null;
    createdAt: string;
    updatedAt: string;
    clothingItems: ClothingItem[];
}

//Profile wardrobe Component
export interface Wardrobe {
    id: string;
    name: string;
    itemCount: number;
    items: ClothingItem[];
    isPublic: boolean; 
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
  variant: VariantType;
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

//Location
export interface LocationType  {
    place_id: string;
    display_name: string;
    lat: string;
    lon: string;
  }
  
  export interface LocationSearchProps {
    onLocationSelect: (location: Location) => void;
  }