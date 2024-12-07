import React, { useState } from 'react';
import { View, Pressable } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { styles } from '../../Style/MotifSection';

type Pattern = {
  name: string;
  icon: string;
};

const patterns: Pattern[] = [
  { name: 'Uni', icon: 'solid' },
  { name: 'Rayé', icon: 'striped' },
  { name: 'Graphique', icon: 'graphic' },
  { name: 'À Pois', icon: 'dots' },
  { name: 'Animal', icon: 'animal' },
  { name: 'Floral', icon: 'floral' },
  { name: 'Tropical', icon: 'tropical' },
  { name: 'Paisley', icon: 'paisley' },
  { name: 'Argyle', icon: 'argyle' },
  { name: 'Camouflage', icon: 'camo' },
  { name: 'Bloc De Couleur', icon: 'colorblock' },
  { name: 'Répété', icon: 'repeat' },
  { name: 'Damier', icon: 'checker' },
  { name: 'Plaid', icon: 'plaid' },
  { name: 'Vichy', icon: 'gingham' },
  { name: 'Pied-De-Poule', icon: 'houndstooth' },
  { name: 'Herringbone', icon: 'herringbone' },
  { name: 'Chevron', icon: 'chevron' },
  { name: 'Tweed', icon: 'tweed' },
  { name: 'Abstrait', icon: 'abstract' },
  { name: 'Tie Dye', icon: 'tiedye' },
  { name: 'Géométrique', icon: 'geometric' },
  { name: 'Dentelle', icon: 'lace' },
  { name: 'Autres Motifs', icon: 'more' }
];

export function MotifSection() {
  const [selectedPatterns, setSelectedPatterns] = useState<Pattern[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  const togglePattern = (pattern: Pattern) => {
    setSelectedPatterns(current => {
      const isSelected = current.some(p => p.name === pattern.name);
      if (isSelected) {
        return current.filter(p => p.name !== pattern.name);
      }
      return [...current, pattern];
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <View style={styles.labelContainer}>
          <ThemedText style={styles.label}>Motif</ThemedText>
        </View>
        <Pressable 
          style={styles.selectionContainer}
          onPress={() => setIsExpanded(!isExpanded)}
        >
          {selectedPatterns.length > 0 && (
            <View style={styles.selectedPatternsContainer}>
              {selectedPatterns.length <= 3 ? (
                selectedPatterns.map((pattern, index) => (
                  <View key={pattern.name} style={styles.selectedPatternItem}>
                    <ThemedText style={styles.selectedText}>
                      {pattern.name}{index < selectedPatterns.length - 1 ? ', ' : ''}
                    </ThemedText>
                  </View>
                ))
              ) : (
                <ThemedText style={styles.selectedText}>
                  {selectedPatterns.length} motifs sélectionnés
                </ThemedText>
              )}
            </View>
          )}
          <IconSymbol
            name={isExpanded ? "chevron.up" : "chevron.right"}
            size={16}
            color="#000000"
          />
        </Pressable>
      </View>

      {isExpanded && (
        <View style={styles.patternGrid}>
          {patterns.map((pattern) => (
            <Pressable
              key={pattern.name}
              onPress={() => togglePattern(pattern)}
              style={[
                styles.patternTag,
                selectedPatterns.some(p => p.name === pattern.name) && styles.tagSelected
              ]}
            >
              {/*<IconSymbol
                name={pattern.icon}
                size={16}
                color={selectedPatterns.some(p => p.name === pattern.name) ? '#FFFFFF' : '#000000'}
              />*/}
              <ThemedText 
                style={[
                  styles.tagText,
                  selectedPatterns.some(p => p.name === pattern.name) && styles.tagTextSelected
                ]}
              >
                {pattern.name}
              </ThemedText>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}