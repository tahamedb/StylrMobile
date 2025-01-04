import React, { createContext, useContext, useState, useEffect } from 'react';
import { Wardrobe, ClothingItem } from '@/types/api.types';
import { wardrobeService } from '@/services/wardrobe/wardrobeService';

interface WardrobeContextType {
  wardrobes: Wardrobe[];
  currentWardrobe: Wardrobe | null;
  setCurrentWardrobe: (wardrobe: Wardrobe | null) => void;
  isLoading: boolean;
  error: string | null;
  refreshWardrobes: () => Promise<void>;
  createNewWardrobe: (data: Partial<Wardrobe>) => Promise<Wardrobe>;
  createClothingItem: (data: Partial<ClothingItem>) => Promise<ClothingItem>;
  updateClothingItem: (itemId: number, data: Partial<ClothingItem>) => Promise<ClothingItem>;
  deleteClothingItem: (itemId: number) => Promise<void>;
  clearCurrentWardrobe: () => void;
}

const WardrobeContext = createContext<WardrobeContextType | undefined>(undefined);

export function WardrobeProvider({ children }: { children: React.ReactNode }) {
  const [wardrobes, setWardrobes] = useState<Wardrobe[]>([]);
  const [currentWardrobe, setCurrentWardrobe] = useState<Wardrobe | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const clearCurrentWardrobe = () => {
    setCurrentWardrobe(null);
  };

  const refreshWardrobes = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await wardrobeService.getAllWardrobes();
      setWardrobes(data);
      
      // Only update current wardrobe if it exists and is in the new data
      if (currentWardrobe) {
        const updatedCurrentWardrobe = data.find(w => w.id === currentWardrobe.id);
        setCurrentWardrobe(updatedCurrentWardrobe || null);
      }
    } catch (err) {
      setError('Failed to load wardrobes');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const createNewWardrobe = async (data: Partial<Wardrobe>) => {
    try {
      setError(null);
      const newWardrobe = await wardrobeService.createWardrobe(data);
      await refreshWardrobes();
      setCurrentWardrobe(newWardrobe);
      return newWardrobe;
    } catch (err) {
      setError('Failed to create wardrobe');
      console.error(err);
      throw err;
    }
  };

  const createClothingItem = async (data: Partial<ClothingItem>) => {
    if (!currentWardrobe) {
      throw new Error('No wardrobe selected');
    }
    try {
      const newItem = await wardrobeService.createClothingItem(currentWardrobe.id, data);
      // Update current wardrobe's items if they exist
      if (currentWardrobe.clothingItems) {
        setCurrentWardrobe({
          ...currentWardrobe,
          clothingItems: [...currentWardrobe.clothingItems, newItem],
        });
      }
      return newItem;
    } catch (err) {
      setError('Failed to create clothing item');
      console.error(err);
      throw err;
    }
  };

  const updateClothingItem = async (itemId: number, data: Partial<ClothingItem>) => {
    if (!currentWardrobe) {
      throw new Error('No wardrobe selected');
    }
    try {
      const updatedItem = await wardrobeService.updateClothingItem(
        currentWardrobe.id,
        itemId,
        data
      );
      // Update current wardrobe's items if they exist
      if (currentWardrobe.clothingItems) {
        setCurrentWardrobe({
          ...currentWardrobe,
          clothingItems: currentWardrobe.clothingItems.map(item =>
            item.id === itemId ? updatedItem : item
          ),
        });
      }
      return updatedItem;
    } catch (err) {
      setError('Failed to update clothing item');
      console.error(err);
      throw err;
    }
  };

  const deleteClothingItem = async (itemId: number) => {
    if (!currentWardrobe) {
      throw new Error('No wardrobe selected');
    }
    try {
      await wardrobeService.deleteClothingItem(currentWardrobe.id, itemId);
      // Update current wardrobe's items if they exist
      if (currentWardrobe.clothingItems) {
        setCurrentWardrobe({
          ...currentWardrobe,
          clothingItems: currentWardrobe.clothingItems.filter(item => item.id !== itemId),
        });
      }
    } catch (err) {
      setError('Failed to delete clothing item');
      console.error(err);
      throw err;
    }
  };

  useEffect(() => {
    refreshWardrobes();
  }, []);

  return (
    <WardrobeContext.Provider 
      value={{
        wardrobes,
        currentWardrobe,
        setCurrentWardrobe,
        isLoading,
        error,
        refreshWardrobes,
        createNewWardrobe,
        createClothingItem,
        updateClothingItem,
        deleteClothingItem,
        clearCurrentWardrobe,
      }}
    >
      {children}
    </WardrobeContext.Provider>
  );
}

export function useWardrobe() {
  const context = useContext(WardrobeContext);
  if (context === undefined) {
    throw new Error('useWardrobe must be used within a WardrobeProvider');
  }
  return context;
} 