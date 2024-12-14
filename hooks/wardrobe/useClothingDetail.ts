import { useState, useEffect } from 'react';
import { wardrobeService } from '@/services/wardrobe/wardrobeService';
import { ClothingItem } from '@/types/api.types';

export function useClothingDetail(clothingId: number) {
  const [clothingDetail, setClothingDetail] = useState<ClothingItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchClothingDetail = async () => {
    
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
    if (clothingId) {
      fetchClothingDetail();
    }
  }, [clothingId]);

  return {
    clothingDetail,
    loading,
    error,
    refetch: fetchClothingDetail
  };
}