import { useState, useEffect } from 'react';
import { wardrobeService } from '@/services/wardrobe/wardrobeService';
import { ClothingItem } from '@/types/api.types';

export function useClothingDetail(clothingId: number, shouldFetch: boolean = true) {
  const [clothingDetail, setClothingDetail] = useState<ClothingItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchClothingDetail = async () => {
    if (!shouldFetch) return;
    
    try {
      setLoading(true);
      const response = await wardrobeService.getClothingItemById(clothingId);
      setClothingDetail(response);
    } catch (err) {
      console.error('Erreur lors de la récupération des détails:', err);
      setError(err instanceof Error ? err : new Error('Erreur inconnue'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (clothingId && shouldFetch) {
      fetchClothingDetail();
    }
  }, [clothingId, shouldFetch]);

  return {
    clothingDetail,
    loading,
    error,
    refetch: fetchClothingDetail
  };
}