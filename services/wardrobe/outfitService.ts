import { apiClientWrapper } from '@/services/api/client';
import { Outfit } from '@/types/api.types';

export const outfitService = {

    getAllOutfits: async (): Promise<Outfit[]> => {
        return await apiClientWrapper.get<Outfit[]>('/api/outfits');
    },

    getOutfitById: async (id: number): Promise<Outfit> => {
        console.log('Calling getOutfitById with:', id);
        return await apiClientWrapper.get<Outfit>(`/api/outfits/${id}`);
    },

    createOutfit: async (data: Partial<Outfit>): Promise<Outfit> => {
        console.log('Calling createOutfit with:', data);
        return await apiClientWrapper.post<Outfit>('/api/outfits', data);
    },

    updateOutfit: async (id: number, data: Partial<Outfit>): Promise<Outfit> => {
        console.log('Calling updateOutfit with:', id, data);
        return await apiClientWrapper.put<Outfit>(`/api/outfits/${id}`, data);
    },

    deleteOutfit: async (id: number): Promise<void> => {
        console.log('Calling deleteOutfit with:', id);
        return await apiClientWrapper.delete<void>(`/api/outfits/${id}`);
    }

    //TODO: Ajouter les autres Endpoints si nécessaire selon les fonctionnalités ajoutées dans l'application

};