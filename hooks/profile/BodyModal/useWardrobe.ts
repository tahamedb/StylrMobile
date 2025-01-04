import { useState, useEffect } from 'react';
import { wardrobeService } from '@/services/wardrobe/wardrobeService';
import { ClothingItem } from '@/types/api.types';
import { useWardrobe as useWardrobeContext } from '@/contexts/WardrobeContext';

export const useWardrobe = () => {
  const [wardrobeData, setWardrobeData] = useState<ClothingItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { currentWardrobe, wardrobes } = useWardrobeContext();

  useEffect(() => {
    fetchWardrobeData();
  }, [currentWardrobe]);

  const fetchWardrobeData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      let items: ClothingItem[] = [];
      if (currentWardrobe) {
        items = await wardrobeService.getWardrobeItems(currentWardrobe.id);
      }
      setWardrobeData(items || []);
    } catch (err) {
      setError('Erreur lors du chargement de la garde-robe');
      console.error('Error fetching wardrobe data:', err);
      setWardrobeData([]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    wardrobeData: wardrobeData || [],
    wardrobes,
    selectedCategory,
    setSelectedCategory,
    isLoading,
    error,
    refetch: fetchWardrobeData,
    currentWardrobe,
    hasData: wardrobeData.length > 0,
  };
};