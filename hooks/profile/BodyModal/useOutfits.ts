import { useState, useEffect } from 'react';
import { wardrobeService } from '@/services/wardrobe/wardrobeService';
import { Outfit, ClothingItem } from '@/types/api.types';
import { useWardrobe } from '@/contexts/WardrobeContext';

interface CreateOutfitData extends Partial<Outfit> {
  name: string;
  season: string;
  occasion: string;
  tags: string[];
  top?: { id: number };
  bottom?: { id: number };
  dress?: { id: number };
  outerwear?: { id: number };
  shoes?: { id: number };
  accessories?: { id: number }[];
}

export const useOutfits = () => {
  const [outfitsData, setOutfitsData] = useState<Outfit[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { currentWardrobe } = useWardrobe();

  const fetchOutfits = async () => {
    if (!currentWardrobe?.id) {
      setOutfitsData([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const outfits = await wardrobeService.getWardrobeOutfits(currentWardrobe.id);
      setOutfitsData(outfits || []);
    } catch (err) {
      console.error('Error fetching outfits:', err);
      setError('Failed to load outfits');
      setOutfitsData([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOutfits();
  }, [currentWardrobe?.id]);

  const createOutfit = async (data: CreateOutfitData) => {
    if (!currentWardrobe?.id) {
      throw new Error('No wardrobe selected');
    }

    try {
      console.log('Creating outfit with data:', data);

      // Validate required fields
      if (!data.name?.trim()) {
        throw new Error('Outfit name is required');
      }

      // Validate outfit composition
      const hasTop = data.top?.id;
      const hasBottom = data.bottom?.id;
      const hasDress = data.dress?.id;
      
      if (!hasDress && (!hasTop || !hasBottom)) {
        throw new Error('Please select at least a top and bottom, or a dress');
      }

      // Prepare outfit data
      const outfitData: CreateOutfitData = {
        ...data,
        wardrobe: { id: currentWardrobe.id },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        rating: data.rating || 0,
        timesWorn: data.timesWorn || 0,
        // Ensure all item references are properly formatted
        top: data.top ? { id: data.top.id } : undefined,
        bottom: data.bottom ? { id: data.bottom.id } : undefined,
        dress: data.dress ? { id: data.dress.id } : undefined,
        outerwear: data.outerwear ? { id: data.outerwear.id } : undefined,
        shoes: data.shoes ? { id: data.shoes.id } : undefined,
        accessories: data.accessories?.map(item => ({ id: item.id })) || [],
      };

      console.log('Sending outfit data to service:', outfitData);

      // Create outfit
      const newOutfit = await wardrobeService.createOutfit(currentWardrobe.id, outfitData);
      console.log('New outfit created:', newOutfit);
      
      // Update local state
      setOutfitsData(prev => [...prev, newOutfit]);
      
      return newOutfit;
    } catch (err) {
      console.error('Error creating outfit:', err);
      if (err instanceof Error) {
        throw new Error(`Failed to create outfit: ${err.message}`);
      }
      throw new Error('Failed to create outfit');
    }
  };

  const updateOutfit = async (outfitId: number, data: Partial<CreateOutfitData>) => {
    if (!currentWardrobe?.id) {
      throw new Error('No wardrobe selected');
    }

    try {
      // Prepare update data
      const updateData = {
        ...data,
        wardrobe: { id: currentWardrobe.id },
        updatedAt: new Date().toISOString(),
        // Ensure all item references are properly formatted
        top: data.top ? { id: data.top.id } : undefined,
        bottom: data.bottom ? { id: data.bottom.id } : undefined,
        dress: data.dress ? { id: data.dress.id } : undefined,
        outerwear: data.outerwear ? { id: data.outerwear.id } : undefined,
        shoes: data.shoes ? { id: data.shoes.id } : undefined,
        accessories: data.accessories?.map(item => ({ id: item.id })) || undefined,
      };

      const updatedOutfit = await wardrobeService.updateOutfit(currentWardrobe.id, outfitId, updateData);
      
      // Update local state
      setOutfitsData(prev => prev.map(outfit => 
        outfit.id === outfitId ? updatedOutfit : outfit
      ));
      
      return updatedOutfit;
    } catch (err) {
      console.error('Error updating outfit:', err);
      if (err instanceof Error) {
        throw new Error(`Failed to update outfit: ${err.message}`);
      }
      throw new Error('Failed to update outfit');
    }
  };

  const deleteOutfit = async (outfitId: number) => {
    if (!currentWardrobe?.id) {
      throw new Error('No wardrobe selected');
    }

    try {
      await wardrobeService.deleteOutfit(currentWardrobe.id, outfitId);
      
      // Update local state
      setOutfitsData(prev => prev.filter(outfit => outfit.id !== outfitId));
    } catch (err) {
      console.error('Error deleting outfit:', err);
      if (err instanceof Error) {
        throw new Error(`Failed to delete outfit: ${err.message}`);
      }
      throw new Error('Failed to delete outfit');
    }
  };

  return {
    outfitsData,
    isLoading,
    error,
    refetch: fetchOutfits,
    createOutfit,
    updateOutfit,
    deleteOutfit,
  };
};