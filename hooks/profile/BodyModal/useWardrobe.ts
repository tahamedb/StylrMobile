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

  const fetchWardrobeData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      let items: ClothingItem[] = [];
      if (currentWardrobe) {
        items = await wardrobeService.getWardrobeItems(currentWardrobe.id);
      } else {
        // Load all clothing items when no wardrobe is selected
        items = await wardrobeService.getAllClothingItems();
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

  // Load data immediately and when currentWardrobe changes
  useEffect(() => {
    console.log('Loading wardrobe data...');
    fetchWardrobeData();
  }, [currentWardrobe]);

  return {
    wardrobeData,
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