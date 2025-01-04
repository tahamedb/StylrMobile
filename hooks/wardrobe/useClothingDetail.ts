import { useState, useEffect, useCallback } from 'react';
import { wardrobeService } from '@/services/wardrobe/wardrobeService';
import { ClothingItem } from '@/types/api.types';
import { useWardrobe } from '@/contexts/WardrobeContext';

export function useClothingDetail(clothingId: number, shouldFetch: boolean = true) {
  const [clothingDetail, setClothingDetail] = useState<ClothingItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { currentWardrobe } = useWardrobe();

  // Reset everything when wardrobe changes
  useEffect(() => {
    setClothingDetail(null);
    setError(null);
    setLoading(false); // Set to false since we're clearing everything
    return () => {
      // Cleanup when wardrobe changes or component unmounts
      setClothingDetail(null);
      setError(null);
      setLoading(false);
    };
  }, [currentWardrobe?.id]);

  const fetchClothingDetail = useCallback(async () => {
    // Don't fetch if we don't have all required data
    if (!shouldFetch || !currentWardrobe || !clothingId) {
      setLoading(false);
      setClothingDetail(null);
      return;
    }

    // Don't fetch if the clothing item doesn't belong to current wardrobe
    const currentWardrobeItems = currentWardrobe.clothingItems || [];
    if (!currentWardrobeItems.some(item => item.id === clothingId)) {
      setLoading(false);
      setClothingDetail(null);
      setError(new Error('Vêtement non trouvé dans cette garde-robe'));
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching clothing detail:', { wardrobeId: currentWardrobe.id, clothingId });
      const response = await wardrobeService.getClothingItemById(currentWardrobe.id, clothingId);
      
      // Double check that the item belongs to current wardrobe
      if (response && response.wardrobe?.id === currentWardrobe.id) {
        setClothingDetail(response);
      } else {
        setClothingDetail(null);
        setError(new Error('Vêtement non trouvé dans cette garde-robe'));
      }
    } catch (err) {
      console.error('Erreur lors de la récupération des détails:', err);
      setError(err instanceof Error ? err : new Error('Erreur inconnue'));
      setClothingDetail(null);
    } finally {
      setLoading(false);
    }
  }, [clothingId, currentWardrobe, shouldFetch]);

  // Fetch data when dependencies change
  useEffect(() => {
    if (currentWardrobe?.id) {
      fetchClothingDetail();
    }
  }, [fetchClothingDetail, currentWardrobe?.id]);

  return {
    clothingDetail,
    loading,
    error,
    refetch: fetchClothingDetail
  };
}