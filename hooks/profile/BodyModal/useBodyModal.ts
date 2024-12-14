import { useState } from 'react';

export const useBodyModal = () => {
  const [selectedTab, setSelectedTab] = useState('wardrobe');

  const routes = [
    { key: 'wardrobe', title: 'Garde-robe' },
    { key: 'outfits', title: 'Tenues' },
  ];

  return {
    selectedTab,
    routes,
    setSelectedTab
  };
};