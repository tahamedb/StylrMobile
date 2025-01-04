import { useState, useEffect, useMemo } from 'react';
import { wardrobeService } from '@/services/wardrobe/wardrobeService';
import { ClothingItem } from '@/types/api.types';
import { useWardrobe } from '@/contexts/WardrobeContext';

type Tab = 'tous' | 'tops' | 'tenues';

export function useWardrobeContent() {
  const [activeTab, setActiveTab] = useState<Tab>('tous');
  const [showOptions, setShowOptions] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [clothingItems, setClothingItems] = useState<ClothingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { currentWardrobe } = useWardrobe();

  const fetchClothingItems = async () => {
    try {
      let response;
      if (currentWardrobe?.id) {
        // Fetch items for specific wardrobe
        response = await wardrobeService.getWardrobeItems(currentWardrobe.id);
      } else {
        // Fetch all items when no wardrobe is selected
        response = await wardrobeService.getAllClothingItems();
      }
      setClothingItems(response || []);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch clothing items'));
      setClothingItems([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle wardrobe changes and data fetching
  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      setLoading(true);
      setClothingItems([]); // Clear old data immediately
      
      try {
        let response;
        if (currentWardrobe?.id) {
          response = await wardrobeService.getWardrobeItems(currentWardrobe.id);
        } else {
          response = await wardrobeService.getAllClothingItems();
        }
        
        if (isMounted) {
          setClothingItems(response || []);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('Failed to fetch clothing items'));
          setClothingItems([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadData();

    // Cleanup function
    return () => {
      isMounted = false;
    };
  }, [currentWardrobe?.id]);

  const displayedItems = useMemo(() => {
    if (!clothingItems) return [];
    
    if (activeTab === 'tops') {
      return clothingItems.filter(item => 
        item.category?.toLowerCase() === 'tops'
      );
    }
    return clothingItems;
  }, [activeTab, clothingItems]);

  return {
    activeTab,
    setActiveTab,
    showOptions,
    setShowOptions,
    showFilterModal,
    setShowFilterModal,
    clothingItems: displayedItems,
    showEmptyState: displayedItems.length === 0,
    totalItems: clothingItems.length,
    displayedCount: displayedItems.length,
    loading,
    error,
    refetch: fetchClothingItems
  };
}