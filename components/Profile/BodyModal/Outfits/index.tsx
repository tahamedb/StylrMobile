import React from 'react';
import { View } from 'react-native';
import { useOutfits } from '@/hooks/profile/BodyModal/useOutfits';
import { styles } from './styles';

export const Outfits = () => {
  const { outfitsData } = useOutfits();

  return (
    <View style={styles.container}>
      {/* Votre contenu de tenues */}
    </View>
  );
};