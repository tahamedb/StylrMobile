import React from 'react';
import { View } from 'react-native';
import { Season } from './SeasonSection';
import { Category } from './CategorySection';
import { ThemedText } from '@/components/ThemedText';
import { SeasonSection } from './SeasonSection';

import { styles } from '../../Style/InformationContent';
import { OccasionSection } from './OccasionSection';
import { RatingSection } from './RatingSection';
import { CategorySection } from './CategorySection';
import { ColorSection } from './ColorSection';
import { Material, MotifSection } from './MotifSection';
import { MarqueSection } from './MarqueSection';
import { PurchaseSection } from './PurchaseSection';
import { ClothingItem } from '@/types/api.types';

interface InfosProps {
  clothingDetail: ClothingItem;
}

export function InformationContent({ clothingDetail }: InfosProps) {
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Infos sur les TLO</ThemedText>
        <SeasonSection initialSeason={clothingDetail.season as Season} />
        <OccasionSection initialOccasion={clothingDetail.occasion} />
      </View>
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Infos sur l'article</ThemedText>
        <RatingSection initialRating={clothingDetail.rating} />
        <CategorySection initialCategory={clothingDetail.category as Category} />
        <ColorSection initialColors={clothingDetail.colors} />
        <MotifSection initialMaterial={clothingDetail.material as Material} />
        <MarqueSection initialBrand={clothingDetail.brand} />
        <PurchaseSection 
          initialSize={clothingDetail.size}
          initialPrice={clothingDetail.price}
          initialPurchaseDate={clothingDetail.purchaseDate}
          initialPurchaseLink={clothingDetail.purchaseLink}
        />
      </View>
    </View>
  );
}
