import { useState, useEffect } from 'react';
import { wardrobeService } from '@/services/wardrobe/wardrobeService';
import { Outfit } from '@/types/api.types';
import { useRouter } from 'expo-router';
import { useWardrobe } from '@/contexts/WardrobeContext';

export function useOutfitDetails(outfitId: number, isRecommended?: boolean) {
  const [outfit, setOutfit] = useState<Outfit | null>(null);
  const [isLoading, setIsLoading] = useState(!isRecommended);
  const [error, setError] = useState<Error | null>(null);
  const router = useRouter();
  const { currentWardrobe } = useWardrobe();

  useEffect(() => {
    if (!isRecommended) {
      loadOutfit();
    }
  }, [outfitId, isRecommended]);

  const loadOutfit = async () => {
    if (!outfitId || isRecommended) return;

    try {
      setIsLoading(true);
      setError(null);
      const data = await wardrobeService.getOutfitById(outfitId);
      setOutfit(data);
    } catch (err) {
      console.error('Error loading outfit:', err);
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteOutfit = async () => {
    if (!outfit || !currentWardrobe?.id || isRecommended) return;

    try {
      await wardrobeService.deleteOutfit(outfit.id, currentWardrobe.id);
      router.back();
    } catch (err) {
      console.error('Error deleting outfit:', err);
      throw err;
    }
  };

  return {
    outfit,
    isLoading,
    error,
    deleteOutfit,
    refetch: loadOutfit
  };
} 