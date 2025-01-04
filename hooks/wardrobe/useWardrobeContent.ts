import { useState, useEffect, useMemo, useCallback } from 'react';
import { wardrobeService } from '@/services/wardrobe/wardrobeService';
import { ClothingItem, Outfit } from '@/types/api.types';
import { useWardrobe } from '@/contexts/WardrobeContext';
import { useLocalSearchParams } from 'expo-router';

type Tab = 'tous' | 'tops' | 'tenues';

export function useWardrobeContent() {
  const [activeTab, setActiveTab] = useState<Tab>('tous');
  const [clothingItems, setClothingItems] = useState<ClothingItem[]>([]);
  const [outfits, setOutfits] = useState<Outfit[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Get the current view type from URL params
  const params = useLocalSearchParams();
  const isSpecificWardrobe = params.isSpecificWardrobe === 'true';
  const wardrobeId = params.id ? Number(params.id) : null;

  // Define loadData function
  const loadData = useCallback(async () => {
    if (loading) return; // Prevent multiple simultaneous loads
    
    try {
      setLoading(true);
      setError(null);

      let items: ClothingItem[] = [];
      let outfitsList: Outfit[] = [];

      if (isSpecificWardrobe && wardrobeId) {
        console.log('Loading specific wardrobe:', wardrobeId);
        items = await wardrobeService.getWardrobeItems(wardrobeId);
        outfitsList = await wardrobeService.getWardrobeOutfits(wardrobeId);
      } else {
        console.log('Loading all clothes');
        items = await wardrobeService.getAllClothingItems();
        outfitsList = await wardrobeService.getAllOutfits();
      }

      console.log('Setting data:', {
        items: items.length,
        outfits: outfitsList.length,
        viewType: isSpecificWardrobe ? 'specific' : 'all'
      });
      
      // Only update state if we got valid data
      if (Array.isArray(items)) {
        setClothingItems(items);
      }
      if (Array.isArray(outfitsList)) {
        setOutfits(outfitsList);
      }
    } catch (err) {
      console.error('Error loading wardrobe content:', err);
      setError(err instanceof Error ? err : new Error('Failed to load items'));
    } finally {
      setLoading(false);
    }
  }, [isSpecificWardrobe, wardrobeId, loading]);

  // Initial load and reload when parameters change
  useEffect(() => {
    console.log('Loading wardrobe content...');
    loadData();
  }, [isSpecificWardrobe, wardrobeId]);

  const displayedItems = useMemo(() => {
    switch (activeTab) {
      case 'tops':
        return clothingItems.filter(item => 
          item.category?.toLowerCase() === 'tops'
        );
      case 'tenues':
        return outfits;
      default:
        return clothingItems;
    }
  }, [activeTab, clothingItems, outfits]);

  return {
    activeTab,
    setActiveTab,
    clothingItems: displayedItems,
    outfitsData: outfits,
    showEmptyState: !loading && displayedItems.length === 0,
    totalItems: clothingItems.length,
    displayedCount: displayedItems.length,
    loading,
    error,
    refetch: loadData
  };
}