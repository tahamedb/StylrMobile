import React from 'react';
import { View, Pressable, Image } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { styles } from '../../Style/TryOutfitSection';

export function TryOutfitSection() {
    return (
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeader}>
          <ThemedText style={styles.sectionTitle}>
            Essayez cette tenue
          </ThemedText>
          <IconSymbol name="arrow.clockwise" size={24} color="#000000" />
        </View>
        <Pressable style={styles.emptyStateCard}>
          <Image 
            source={require('@/assets/images/clothing/outfit-placeholder2.png')}
            style={{ width: 80, height: 80 }}
            resizeMode="contain"
          />
          <ThemedText style={styles.emptyStateText}>
            Ajoutez des vêtements au placard et{'\n'}
            obtenez plus de recommandations
          </ThemedText>
        </Pressable>
      </View>
    );
  }