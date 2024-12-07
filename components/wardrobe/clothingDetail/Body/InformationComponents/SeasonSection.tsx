import React, { useState } from 'react';
import { View, Pressable } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import {styles} from '../../Style/SaisonSection';

type Season = 'Printemps' | 'Été' | 'Automne' | 'Hiver';

export function SeasonSection() {
  const [selectedSeasons, setSelectedSeasons] = useState<Season[]>([]);
  const [isExpanded, setIsExpanded] = useState(true);

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
      <View style={styles.sectionHeader}>
        <View style={styles.labelContainer}>
          <ThemedText style={styles.label}>Saison</ThemedText>
        </View>
        
        <Pressable 
          style={styles.selectionContainer}
          onPress={() => setIsExpanded(!isExpanded)}
        >
          {selectedSeasons.length > 0 ? (
            <ThemedText style={styles.selectedText}>
              {getSelectedSeasonsText()}
            </ThemedText>
          ) : null}
          <IconSymbol
            name={isExpanded ? "chevron.up" : "chevron.right"}
            size={16}
            color="#000000"
          />
        </Pressable>
      </View>

      {/* Affichage des tags de saison */}
      {isExpanded && (
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
      )}
    </View>
  );
}
