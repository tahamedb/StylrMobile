import React from 'react';
import { View, Pressable, Image, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { router } from "expo-router";
import { styles } from './Style/ClothingCard';


type ClothingCardProps = {
  image: any;
  brand: string;
  date: string;
  onPress?: () => void;
};

export function ClothingCard({image, brand, date, onPress }: ClothingCardProps) {

  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Pressable style={styles.clothingItem} onPress={() => router.push("/(tabs)/test")}>
      <View style={[styles.imageContainer, isDark && styles.imageContainerDark]}>
        <Image
          source={image}
          style={styles.adaptiveImage}
          resizeMode="cover"
        />
      </View>
      <ThemedText style={styles.brand}>{brand}</ThemedText>
      <ThemedText style={styles.date}>{date}</ThemedText>
    </Pressable>
  );
}

