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
  clothingDetail: Partial<ClothingItem>;
  isNewItem?: boolean;
  onUpdate: (field: keyof ClothingItem, value: any) => void;
}

export function InformationContent({ clothingDetail, isNewItem, onUpdate }: InfosProps) {
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Infos sur les TLO</ThemedText>
        <SeasonSection 
          initialSeason={clothingDetail.season as Season} 
          onUpdate={(value) => onUpdate('season', value)}
        />
        <OccasionSection 
          initialOccasion={clothingDetail.occasion}
          onUpdate={(value) => onUpdate('occasion', value)}
        />
      </View>
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Infos sur l'article</ThemedText>
        <RatingSection 
          initialRating={clothingDetail.rating}
          onUpdate={(value) => onUpdate('rating', value)}
        />
        <CategorySection 
          initialCategory={clothingDetail.category || ''}
          isNewItem={isNewItem}
          onUpdate={(value) => onUpdate('category', value)}
        />
        <ColorSection 
          initialColors={clothingDetail.colors || []}
          onUpdate={(value) => onUpdate('colors', value)}
        />
        <MotifSection 
          initialMaterial={clothingDetail.material as Material}
          onUpdate={(value) => onUpdate('material', value)}
        />
        <MarqueSection 
          initialBrand={clothingDetail.brand || ''}
          onUpdate={(value) => onUpdate('brand', value)}
        />
        <PurchaseSection 
          initialSize={clothingDetail.size}
          initialPrice={clothingDetail.price}
          initialPurchaseDate={clothingDetail.purchaseDate}
          initialPurchaseLink={clothingDetail.purchaseLink}
          onUpdate={(field, value) => onUpdate(field, value)}
        />
      </View>
    </View>
  );
}
