import { apiClientWrapper } from '@/services/api/client';
import { Outfit } from '@/types/api.types';

export const outfitService = {

    createOutfit: async (data: Partial<Outfit>): Promise<Outfit> => {
        console.log('Calling createOutfit with:', data);
        return await apiClientWrapper.post<Outfit>('/api/outfits', data);
    },

    //TODO: Ajouter les autres Endpoints si necessaire selon Fonctionalité Ajouter dans app

};