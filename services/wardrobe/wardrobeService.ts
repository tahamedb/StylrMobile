import { apiClientWrapper } from '@/services/api/client';
import { ClothingItem } from '@/types/api.types';

//TODO:  Il doit etre dynamique selon Wordrobe de User Connecter(val statique 1: Juste pour tester endpoint.) 
const WARDROBE_ID = 1;

export const wardrobeService = {

    getAllClothingItems: async () => {
        return await apiClientWrapper.get<ClothingItem[]>(`/wardrobes/${WARDROBE_ID}/clothing-items`);
    },
    
    getClothingItemById: (clothingId: number) => {
        console.log('Calling getClothingItemById with:', clothingId);
        return apiClientWrapper.get<ClothingItem>( `/wardrobes/${WARDROBE_ID}/clothing-items/${clothingId}`);
      },

    createClothingItem: async (data: Partial<ClothingItem>): Promise<ClothingItem> => {
        console.log('Calling createClothingItem with:',data);
        const response = await apiClientWrapper.post<ClothingItem>(
            `/clothing-items`, 
            {
                ...data,
                wardrobe: { id: WARDROBE_ID }
            }
        );
        return response;
    },

    updateClothingItem: async (id: number, data: Partial<ClothingItem>): Promise<ClothingItem> => {
        const response = await apiClientWrapper.put<ClothingItem>(
            `/clothing-items/${id}`, 
            data
        );
        return response;
    }

    //TODO: Ajouter les autres Endpoints si necessaire selon Fonctionalité Ajouter dans app

};
