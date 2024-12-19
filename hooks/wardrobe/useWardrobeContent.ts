import { useState, useEffect, useMemo } from 'react';
import { wardrobeService } from '@/services/wardrobe/wardrobeService';
import { ClothingItem, Tab } from '../../types/api.types';

export function useWardrobeContent() {
  const [activeTab, setActiveTab] = useState<Tab>('tous');
  const [showOptions, setShowOptions] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [clothingItems, setClothingItems] = useState<ClothingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error] = useState<Error | null>(null);
  
  //Ajout de état de selection :
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedItems, setSelectedItems] = useState<ClothingItem[]>([]);

  const toggleItemSelection = (item: ClothingItem) => {
    setSelectedItems(prev => {
      const isSelected = prev.some(i => i.id === item.id);
      if (isSelected) {
        return prev.filter(i => i.id !== item.id);
      } else {
        return [...prev, item];
      }
    });
  };

  const fetchClothingItems = async () => {
    setLoading(true);
    const response = await wardrobeService.getAllClothingItems();
    setClothingItems(response);
    setLoading(false);
  };

  useEffect(() => {
    fetchClothingItems();
  }, []);

  const displayedItems = useMemo(() => {
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
    // ajouter pour la selection
    isSelectionMode,
    setIsSelectionMode,
    selectedItems,
    toggleItemSelection,

    refetch: fetchClothingItems

  };
}