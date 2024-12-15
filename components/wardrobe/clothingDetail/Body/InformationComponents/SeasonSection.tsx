import React, { useState } from 'react';
import { View, Pressable } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { styles } from '../../Style/SaisonSection';

export type Season = 'Printemps' | 'Été' | 'Automne' | 'Hiver';

interface SeasonSectionProps {
  initialSeason?: Season;
  onUpdate: (value: Season | null) => void;
}

export function SeasonSection({ 
  initialSeason,
  onUpdate 
}: SeasonSectionProps) {
  const [selectedSeason, setSelectedSeason] = useState<Season | null>(initialSeason || null);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSeasonPress = (season: Season) => {
    const newSeason = selectedSeason === season ? null : season;
    setSelectedSeason(newSeason);
    onUpdate(newSeason);
  };

  const seasons: Season[] = ['Printemps', 'Été', 'Automne', 'Hiver'];

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
          {selectedSeason && (
            <ThemedText style={styles.selectedText}>
              {selectedSeason}
            </ThemedText>
          )}
          <IconSymbol
            name={isExpanded ? "chevron.up" : "chevron.right"}
            size={16}
            color="#000000"
          />
        </Pressable>
      </View>

      {isExpanded && (
        <View style={styles.seasonTags}>
          {seasons.map((season) => (
            <Pressable
              key={season}
              onPress={() => handleSeasonPress(season)}
              style={[
                styles.tag,
                selectedSeason === season && styles.tagSelected
              ]}
            >
              <ThemedText style={[
                styles.tagText,
                selectedSeason === season && styles.tagTextSelected
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