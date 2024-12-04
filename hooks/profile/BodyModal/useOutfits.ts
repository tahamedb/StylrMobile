import { useState, useEffect } from 'react';

export const useOutfits = () => {
  const [outfitsData, setOutfitsData] = useState(null);

  useEffect(() => {
  }, []);

  return {
    outfitsData,
  };
};