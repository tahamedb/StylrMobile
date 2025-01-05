import React from 'react';
import { View } from 'react-native';
import { Outfit } from '@/types/api.types';
import { OutfitGrid } from '../Grid/OutfitGrid';
import { styles } from './styles';

interface DailyOutfitProps {
  outfits: Outfit[];
  variant: 'private' | 'public';
}

export function DailyOutfit({ outfits, variant }: DailyOutfitProps) {
  return (
    <View style={styles.container}>
      <OutfitGrid 
        outfits={outfits}
        variant={variant}
        emptyStateMessage="Aucune tenue du jour"
      />
    </View>
  );
} 