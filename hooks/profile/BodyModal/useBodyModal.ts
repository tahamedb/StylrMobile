import { useState } from 'react';

export const useBodyModal = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'wardrobe', title: 'Garde-robe' },
    { key: 'outfits', title: 'Tenues' },
  ]);

  const handleIndexChange = (index: number) => {
    setIndex(index);
  };

  return {
    index,
    routes,
    handleIndexChange,
  };
};