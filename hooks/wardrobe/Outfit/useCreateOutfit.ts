import { useState } from 'react';
import { outfitService } from '@/services/wardrobe/outfitService';
import { Outfit } from '@/types/api.types';

export const useCreateOutfit = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const createOutfit = async (data: Partial<Outfit>): Promise<Outfit | null> => {
        setLoading(true);
        setError(null);
        try {
            const newOutfit = await outfitService.createOutfit(data);
            return newOutfit;
        } catch (err) {
            setError('Failed to create outfit');
            console.error('Error creating outfit:', err);
            return null;
        } finally {
            setLoading(false);
        }
    };
    return { createOutfit, loading, error };
};