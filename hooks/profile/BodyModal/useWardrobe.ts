import { useState, useEffect } from 'react';
import { wardrobeService } from '@/services/wardrobe/wardrobeService';
import { ClothingItem } from '@/types/api.types';

export const useWardrobe = () => {
  const [wardrobeData, setWardrobeData] = useState<ClothingItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchWardrobeData();
  }, []);

  const fetchWardrobeData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await wardrobeService.getAllClothingItems();
      setWardrobeData(response);
    } catch (err) {
      setError('Erreur lors du chargement de la garde-robe');
      console.error('Error fetching wardrobe data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    wardrobeData,
    selectedCategory,
    setSelectedCategory,
    isLoading,
    error,
    refetch: fetchWardrobeData
  };
};
