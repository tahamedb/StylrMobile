import { apiClientWrapper } from '@/services/api/client';
import { ClothingItem} from '@/types/api.types';

//TODO:  Il doit etre dynamique selon Wordrobe de User Connecter(val statique 1: Juste pour tester endpoint.) 
const WARDROBE_ID = 1;

export const wardrobeService = {

    getAllClothingItems: async () => {
        const endpoint = `/wardrobes/${WARDROBE_ID}/clothing-items`;
        return await apiClientWrapper.get<ClothingItem[]>(endpoint);
    }

    //TODO: Ajouter les autres Endpoints si necessaire selon Fonctionalité Ajouter dans app
};
