// components/wardrobe/clothingDetail/SeasonSection.tsx
import React, { useState } from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

type Season = 'Printemps' | 'Été' | 'Automne' | 'Hiver';

export function SeasonSection() {
  const [selectedSeasons, setSelectedSeasons] = useState<Season[]>([]);

  const toggleSeason = (season: Season) => {
    setSelectedSeasons(current => {
      if (current.includes(season)) {
        return current.filter(s => s !== season);
      }
      return [...current, season];
    });
  };

  const getSelectedSeasonsText = () => {
    if (selectedSeasons.length === 0) return '';
    return selectedSeasons.join(', ');
  };

  return (
    <View style={styles.container}>
      <View style={styles.seasonHeader}>
        <ThemedText style={styles.label}>Saison</ThemedText>
        {selectedSeasons.length > 0 && (
          <ThemedText style={styles.selectedText}>
            {getSelectedSeasonsText()}
          </ThemedText>
        )}
      </View>
      
      <View style={styles.seasonTags}>
        {(['Printemps', 'Été', 'Automne', 'Hiver'] as Season[]).map((season) => (
          <Pressable
            key={season}
            onPress={() => toggleSeason(season)}
            style={[
              styles.tag,
              selectedSeasons.includes(season) && styles.tagSelected
            ]}
          >
            <ThemedText style={[
              styles.tagText,
              selectedSeasons.includes(season) && styles.tagTextSelected
            ]}>
              {season}
            </ThemedText>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  seasonHeader: {
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
  },
  selectedText: {
    color: '#007AFF',
    fontSize: 14,
  },
  seasonTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#DEDEDE',
  },
  tagSelected: {
    backgroundColor: '#000',
    borderColor: '#000',
  },
  tagText: {
    fontSize: 14,
    color: '#000',
  },
  tagTextSelected: {
    color: '#fff',
  },
});