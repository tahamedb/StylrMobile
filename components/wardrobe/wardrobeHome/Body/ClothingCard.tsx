import React from 'react';
import { View, Pressable, Image } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useColorScheme } from 'react-native';
import { router } from "expo-router";
import { IconSymbol } from '@/components/ui/IconSymbol';
import { styles } from '../Style/ClothingCard';

type ClothingCardProps = {
    id?: number;
    imageUrl: any;
    brand: string;
    date: string;
    isSelectionMode?: boolean;
    isSelected?: boolean;
    onSelect?: () => void;
};

export function ClothingCard({
                                 id,
                                 imageUrl,
                                 brand,
                                 date,
                                 isSelectionMode = false,
                                 isSelected = false,
                                 onSelect
                             }: ClothingCardProps) {
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';

    const handlePress = () => {
        if (isSelectionMode && onSelect) {
            onSelect();
        } else {
            router.push({
                pathname: "/clothingDetail",
                params: { id: id?.toString() }
            });
        }
    };

    return (
        <Pressable style={styles.clothingItem} onPress={handlePress}>
            <View style={[styles.imageContainer, isDark && styles.imageContainerDark]}>
                {isSelectionMode && (
                    <View style={[styles.checkmark, isSelected && styles.checkmarkSelected]}>
                        <IconSymbol
                            name={isSelected ? "checkmark.circle.fill" : "circle"}
                            size={24}
                            color={isSelected ? '#007AFF' : '#999'}
                        />
                    </View>
                )}
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