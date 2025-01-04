import { useState, useEffect } from 'react';
import { wardrobeService } from '@/services/wardrobe/wardrobeService';
import { Outfit } from '@/types/api.types';
import { useWardrobe } from '@/contexts/WardrobeContext';

export const useOutfits = () => {
  const [outfitsData, setOutfitsData] = useState<Outfit[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { currentWardrobe } = useWardrobe();

  const fetchOutfits = async () => {
    if (!currentWardrobe?.id) {
      setOutfitsData([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      console.log(currentWardrobe.id);
      const outfits = await wardrobeService.getWardrobeOutfits(currentWardrobe.id);
      setOutfitsData(outfits || []);
    } catch (err) {
      console.error('Error fetching outfits:', err);
      setError('Failed to load outfits');
      setOutfitsData([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOutfits();
  }, [currentWardrobe?.id]);

  const createOutfit = async (data: Partial<Outfit>) => {
    if (!currentWardrobe?.id) {
      throw new Error('No wardrobe selected');
    }

    try {
      const newOutfit = await wardrobeService.createOutfit(currentWardrobe.id, data);
      setOutfitsData(prev => [...prev, newOutfit]);
      return newOutfit;
    } catch (err) {
      console.error('Error creating outfit:', err);
      throw err;
    }
  };

  const updateOutfit = async (outfitId: number, data: Partial<Outfit>) => {
    if (!currentWardrobe?.id) {
      throw new Error('No wardrobe selected');
    }

    try {
      const updatedOutfit = await wardrobeService.updateOutfit(currentWardrobe.id, outfitId, data);
      setOutfitsData(prev => prev.map(outfit => 
        outfit.id === outfitId ? updatedOutfit : outfit
      ));
      return updatedOutfit;
    } catch (err) {
      console.error('Error updating outfit:', err);
      throw err;
    }
  };

  const deleteOutfit = async (outfitId: number) => {
    if (!currentWardrobe?.id) {
      throw new Error('No wardrobe selected');
    }

    try {
      await wardrobeService.deleteOutfit(currentWardrobe.id, outfitId);
      setOutfitsData(prev => prev.filter(outfit => outfit.id !== outfitId));
    } catch (err) {
      console.error('Error deleting outfit:', err);
      throw err;
    }
  };

  return {
    outfitsData,
    isLoading,
    error,
    refetch: fetchOutfits,
    createOutfit,
    updateOutfit,
    deleteOutfit,
  };
};