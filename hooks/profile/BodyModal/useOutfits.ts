import { useState, useEffect } from 'react';

export const useOutfits = () => {
  const [outfitsData, setOutfitsData] = useState(null);

  useEffect(() => {
    // Logique pour charger les données des tenues
  }, []);

  return {
    outfitsData,
  };
};