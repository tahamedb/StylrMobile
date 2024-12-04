import React from 'react';
import { View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { SeasonSection } from './SeasonSection';

import { styles } from '../../Style/InformationContent';
import { OccasionSection } from './OccasionSection';
import { RatingSection } from './RatingSection';
import { CategorySection } from './CategorySection';

export function InformationContent() {
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Infos sur les TLO</ThemedText>
        <SeasonSection />
        <OccasionSection />
      </View>
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Infos sur l'article</ThemedText>
        <RatingSection />
        <CategorySection />
      </View>
    </View>
  );
}
