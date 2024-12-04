import React, { useState } from 'react';
import { View, Pressable } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { styles } from '../../Style/OccasionSection';

type Occasion = 
  | 'Quotidien'
  | 'Travail'
  | 'Rendez-Vous'
  | 'Formel'
  | 'Voyage'
  | 'Maison'
  | 'Fête'
  | 'Sport'
  | 'Spécial'
  | 'Scolaire'
  | 'Plage'
  | 'Et';

export function OccasionSection() {
  const [selectedOccasion, setSelectedOccasion] = useState<Occasion | null>(null);
  const [isExpanded, setIsExpanded] = useState(true);

  const occasions: Occasion[] = [
    'Quotidien', 'Travail', 'Rendez-Vous', 'Formel',
    'Voyage', 'Maison', 'Fête', 'Sport', 'Spécial',
    'Scolaire', 'Plage', 'Et'
  ];

  const handleOccasionPress = (occasion: Occasion) => {
    setSelectedOccasion(occasion);
  };

  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <View style={styles.labelContainer}>
          <ThemedText style={styles.label}>Occasions</ThemedText>
        </View>
        
        <Pressable 
          style={styles.selectionContainer}
          onPress={() => setIsExpanded(!isExpanded)}
        >
          {selectedOccasion && (
            <ThemedText style={styles.selectedText}>
              {selectedOccasion}
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
        <View style={styles.occasionTags}>
          {occasions.map((occasion) => (
            <Pressable
              key={occasion}
              onPress={() => handleOccasionPress(occasion)}
              style={[
                styles.tag,
                selectedOccasion === occasion && styles.tagSelected
              ]}
            >
              <ThemedText 
                style={[
                  styles.tagText,
                  selectedOccasion === occasion && styles.tagTextSelected
                ]}
              >
                {occasion}
              </ThemedText>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}