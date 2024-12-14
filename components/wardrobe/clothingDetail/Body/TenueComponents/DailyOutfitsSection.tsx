import React from 'react';
import { View, Pressable, Image } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { styles } from '../../Style/OutfitIdeasSection';

interface DailyOutfitsSectionProps {
  clothingId: number;
}

export function DailyOutfitsSection({ clothingId }: DailyOutfitsSectionProps) {
    return (
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <ThemedText style={styles.sectionTitle}>
            Tenues du jour créées avec ces vêtements
          </ThemedText>
        </View>
        <Pressable style={styles.emptyStateCard}>
          <Image 
            source={require('@/assets/images/clothing/outfit-placeholder2.png')}
            style={{ width: 80, height: 80 }}
            resizeMode="contain"
          />
          <ThemedText style={styles.emptyStateText}>
            Montrer les Tenues du jour avec ce vêtement ici
          </ThemedText>
        </Pressable>
      </View>
    );
  }