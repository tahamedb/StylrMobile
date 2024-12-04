import React, { useState } from 'react';
import { View, Pressable } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { styles } from '../../Style/RatingSection';

export function RatingSection() {
  const [rating, setRating] = useState(0);
  const [isExpanded, setIsExpanded] = useState(true);

  const handleRatingPress = (selectedRating: number) => {
    setRating(selectedRating);
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
            size={20}
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
                  color={star <= rating ? '#000000' : '#E0E0E0'}
                />
              </Pressable>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}