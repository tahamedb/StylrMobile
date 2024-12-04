import { useState, useEffect } from 'react';
import { wardrobeService } from '@/services/wardrobe/wardrobeService';
import { ClothingItem } from '@/types/api.types';

interface Wardrobe {
  id: string;
  name: string;
  itemCount: number;
  items: ClothingItem[];
  isPublic: boolean; // Ajout de isPublic
}

export const useWardrobe = () => {
  const [wardrobeData, setWardrobeData] = useState<ClothingItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Modifié pour inclure isPublic
  const createStaticWardrobes = (items: ClothingItem[]): Wardrobe[] => {
    if (items.length === 0) return [];

    const halfLength = Math.ceil(items.length / 2);

    return [
      {
        id: '1',
        name: 'Test',
        itemCount: halfLength,
        items: items.slice(0, halfLength),
        isPublic: false
      },
      {
        id: '2',
        name: 'Test1',
        itemCount: items.length - halfLength,
        items: items.slice(halfLength),
        isPublic: false 
      }
    ];
  };

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
    wardrobes: createStaticWardrobes(wardrobeData),
    selectedCategory,
    setSelectedCategory,
    isLoading,
    error,
    refetch: fetchWardrobeData
  };
};