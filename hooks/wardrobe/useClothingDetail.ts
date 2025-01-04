import { useState, useEffect, useCallback } from 'react';
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

    // Don't fetch if we don't have all required data
    if (!shouldFetch || !currentWardrobe || !clothingId) {
      setLoading(false);
      return;
    }

    try {
      console.log('Fetching clothing detail:', { wardrobeId: currentWardrobe.id, clothingId });
      const response = await wardrobeService.getClothingItemById(currentWardrobe.id, clothingId);
      
      // If we got a response, the item belongs to the wardrobe
      if (response) {
        setClothingDetail(response);
      } else {
        setError(new Error('Vêtement non trouvé dans cette garde-robe'));
      }
    } catch (err) {
      console.error('Erreur lors de la récupération des détails:', err);
      setError(err instanceof Error ? err : new Error('Erreur inconnue'));
    } finally {
      setLoading(false);
    }
  }, [clothingId, currentWardrobe, shouldFetch]);

  // Reset everything when wardrobe changes
  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      if (!isMounted) return;
      await fetchClothingDetail();
    };

    fetchData();

    return () => {
      isMounted = false;
      // Clear all state when unmounting or wardrobe changes
      setClothingDetail(null);
      setError(null);
      setLoading(false);
    };
  }, [currentWardrobe?.id, fetchClothingDetail]);

  return {
    clothingDetail,
    loading,
    error,
    refetch: fetchClothingDetail
  };
}