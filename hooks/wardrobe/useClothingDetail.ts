import { useState, useCallback, useEffect } from 'react';
import { wardrobeService } from '@/services/wardrobe/wardrobeService';
import { ClothingItem } from '@/types/api.types';
import { useWardrobe } from '@/contexts/WardrobeContext';

export function useClothingDetail(clothingId: number, shouldFetch: boolean = true) {
  const [clothingDetail, setClothingDetail] = useState<ClothingItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { currentWardrobe } = useWardrobe();

  const fetchClothingDetail = useCallback(async () => {
    // Reset state when starting a new fetch
    setLoading(true);
    setError(null);
    setClothingDetail(null);

    // Don't fetch if we don't have the clothing ID or shouldn't fetch
    if (!shouldFetch || !clothingId) {
      setLoading(false);
      return;
    }

    try {
      let response: ClothingItem | null = null;

      if (currentWardrobe) {
        // If we have a current wardrobe, try to get the item from that wardrobe
        console.log('Fetching clothing detail from wardrobe:', { wardrobeId: currentWardrobe.id, clothingId });
        response = await wardrobeService.getClothingItemById(currentWardrobe.id, clothingId);
      }

      // If we didn't find it in the current wardrobe (or don't have one), try to get it directly
      if (!response) {
        console.log('Fetching clothing detail directly:', { clothingId });
        response = await wardrobeService.getClothingItemDirectly(clothingId);
      }
      
      if (response) {
        setClothingDetail(response);
      } else {
        setError(new Error('Vêtement non trouvé'));
      }
    } catch (err) {
      console.error('Erreur lors de la récupération des détails:', err);
      setError(err instanceof Error ? err : new Error('Erreur inconnue'));
    } finally {
      setLoading(false);
    }
  }, [clothingId, currentWardrobe, shouldFetch]);

  // Fetch data when dependencies change
  useEffect(() => {
    fetchClothingDetail();
  }, [fetchClothingDetail]);

  return {
    clothingDetail,
    loading,
    error,
    refetch: fetchClothingDetail
  };
};