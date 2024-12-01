/*import React from 'react';
import { View, Pressable, Image, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { router } from "expo-router";
import { styles } from './Style/ClothingCard';


type ClothingCardProps = {
  imageUrl: any;
  brand: string;
  date: string;
  //onPress?: () => void;
};

export function ClothingCard({imageUrl, brand, date}: ClothingCardProps) {

  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Pressable style={styles.clothingItem} onPress={() => router.push("/(tabs)/wardrobe/clothingDetail")}>
      <View style={[styles.imageContainer, isDark && styles.imageContainerDark]}>
        <View style={styles.imageWrapper}>
          <Image
            source={imageUrl}
            style={styles.adaptiveImage}
            resizeMode="cover"
          />
        </View>
        <ThemedText style={styles.brand}>{brand}</ThemedText>
        <ThemedText style={styles.date}>{date}</ThemedText>
      </View>
    </Pressable>
  );
}
  */

import React from 'react';
import { View, Pressable, Image } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme';
import { router } from "expo-router";
import { styles } from './Style/ClothingCard';

type ClothingCardProps = {
  id?: number;  // Ajout de id
  imageUrl: any;
  brand: string;
  date: string;
};

export function ClothingCard({id, imageUrl, brand, date}: ClothingCardProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const handlePress = () => {
    console.log('Card pressed with ID:', id);
    router.push({
      pathname: "/(tabs)/wardrobe/clothingDetail",
      params: {
        id: id?.toString(),
        imageUrl: imageUrl.uri,
        brand,
        date
      }
    });
  };

  return (
    <Pressable style={styles.clothingItem} onPress={handlePress}>
      <View style={[styles.imageContainer, isDark && styles.imageContainerDark]}>
        <View style={styles.imageWrapper}>
          <Image
            source={imageUrl}
            style={styles.adaptiveImage}
            resizeMode="cover"
          />
        </View>
        <ThemedText style={styles.brand}>{brand}</ThemedText>
        <ThemedText style={styles.date}>{date}</ThemedText>
      </View>
    </Pressable>
  );
}
