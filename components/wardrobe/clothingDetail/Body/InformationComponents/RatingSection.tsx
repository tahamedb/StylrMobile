import React, { useState } from 'react';
import { View, Pressable } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { styles } from '../../Style/RatingSection';
import { ClothingItem } from '@/types/api.types';
interface RatingSectionProps {
  initialRating?: number;
  onUpdate: (value: number) => void;
}

export function RatingSection({ initialRating = 0, onUpdate }: RatingSectionProps) {
  const [rating, setRating] = useState(initialRating);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleRatingPress = (selectedRating: number) => {
    const newRating = rating === selectedRating ? 0 : selectedRating;
    setRating(newRating);
    onUpdate(newRating);
  };

  const displayRating = rating > 0 ? `${rating} ★` : '';

  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <View style={styles.labelContainer}>
          <ThemedText style={styles.label}>Ma note</ThemedText>
        </View>
        <Pressable 
          style={styles.selectionContainer}
          onPress={() => setIsExpanded(!isExpanded)}
        >
          {rating > 0 && (
            <ThemedText style={styles.selectedText}>{displayRating}</ThemedText>
          )}
          <IconSymbol
            name={isExpanded ? "chevron.up" : "chevron.right"}
            size={16}
            color="#000000"
          />
        </Pressable>
      </View>

      {isExpanded && (
        <View style={styles.ratingContainer}>
          <View style={styles.starsRow}>
            {[1, 2, 3, 4, 5].map((star) => (
              <Pressable
                key={star}
                onPress={() => handleRatingPress(star)}
              >
                <IconSymbol
                  name="star.fill"
                  size={32}
                  color={star <= rating ? '#FFD700' : '#E0E0E0'}
                />
              </Pressable>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}