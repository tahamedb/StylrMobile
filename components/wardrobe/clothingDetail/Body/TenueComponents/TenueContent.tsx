import React from 'react';
import { ScrollView, View } from 'react-native';
import { styles } from '../../Style/TenueContent';
import { OutfitIdeasSection } from './OutfitIdeasSection';
import { DailyOutfitsSection } from './DailyOutfitsSection';
import { TryOutfitSection } from './TryOutfitSection';

interface TenueContentProps {
  clothingId: number;
}

export function TenueContent({ clothingId }: TenueContentProps) {
  return (
    <ScrollView style={styles.container}>
      <OutfitIdeasSection clothingId={clothingId} />
      <DailyOutfitsSection clothingId={clothingId} />
      <TryOutfitSection />
    </ScrollView>
  );
}