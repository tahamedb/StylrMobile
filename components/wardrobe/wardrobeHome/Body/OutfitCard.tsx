import React from 'react';
import { View, Pressable, Image } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { router } from "expo-router";
import { Outfit } from '@/types/api.types';
import { styles } from '../Style/OutfitCard';
type OutfitCardProps = {
  outfit: Outfit;
};

export function OutfitCard({ outfit }: OutfitCardProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const handlePress = () => {
    router.push({
      pathname: "/outfitDetail",
      params: {
        id: outfit.id.toString(),
      }
    });
  };

  return (
    <Pressable style={styles.outfitItem} onPress={handlePress}>
      <View style={[styles.imageContainer, isDark && styles.imageContainerDark]}>
        <View style={styles.imageWrapper}>
          <Image
            source={{ uri: outfit.imageUrl }}
            style={styles.adaptiveImage}
            resizeMode="cover"
          />
        </View>
        <ThemedText style={styles.name}>{outfit.name || 'Tenue sans nom'}</ThemedText>
        <ThemedText style={styles.date}>
          {new Date(outfit.createdAt).toLocaleDateString('fr-FR')}
        </ThemedText>
      </View>
    </Pressable>
  );
} 