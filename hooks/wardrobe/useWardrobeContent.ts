import { useState } from 'react';

export type Tab = 'tous' | 'tops';

export function useWardrobeContent() {
  const [activeTab, setActiveTab] = useState<Tab>('tous');
  const [showOptions, setShowOptions] = useState(false);

  const clothingData = {
    image: require('@/assets/images/clothing/1.jpg'),
    brand: 'No Brand',
    date: '-'
  };

  const showEmptyState = activeTab === 'tous';

  return {
    activeTab,
    setActiveTab,
    showOptions,
    setShowOptions,
    clothingData,
    showEmptyState
  };
}