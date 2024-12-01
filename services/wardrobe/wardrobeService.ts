import { apiClientWrapper } from '@/services/api/client';
import { ClothingItem } from '@/types/api.types';

//TODO:  Il doit etre dynamique selon Wordrobe de User Connecter(val statique 1: Juste pour tester endpoint.) 
const WARDROBE_ID = 1;

export const wardrobeService = {

    getAllClothingItems: async () => {
        return await apiClientWrapper.get<ClothingItem[]>(`/wardrobes/${WARDROBE_ID}/clothing-items`);
    },

    //getClothingItemById: (clothingId: number) =>
        //apiClientWrapper.get<ClothingItem>(`/api/wardrobes/${WARDROBE_ID}/clothing-items/${clothingId}`),

    getClothingItemById: (clothingId: number) => {
        console.log('Calling getClothingItemById with:', clothingId);
        return apiClientWrapper.get<ClothingItem>(
          `/wardrobes/${WARDROBE_ID}/clothing-items/${clothingId}`
        );
      },

    //TODO: Ajouter les autres Endpoints si necessaire selon Fonctionalité Ajouter dans app

};
