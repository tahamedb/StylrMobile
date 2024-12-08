import React, { useState } from 'react';
import { View, Pressable } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { styles } from '../../Style/MarqueSection';


interface MarqueSectionProps {
  initialBrand?: string;
}

export function MarqueSection({ initialBrand = '' }: MarqueSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [brandName, setBrandName] = useState(initialBrand);
  
    const handleAddBrand = () => {
      //TODO Logique pour ajouter une marque
    };
  
    return (
      <View style={styles.container}>
        <View style={styles.sectionHeader}>
          <View style={styles.labelContainer}>
            <ThemedText style={styles.label}>Marque</ThemedText>
          </View>
          <Pressable 
            style={styles.selectionContainer}
            onPress={() => setIsExpanded(!isExpanded)}
          >
            {brandName && (
              <ThemedText style={styles.selectedText}>
                {brandName}
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
          <Pressable 
            style={styles.addBrandButton}
            onPress={handleAddBrand}
          >
            <IconSymbol name="plus" size={16} color="#000000" />
            <ThemedText style={styles.addBrandText}>Marque</ThemedText>
          </Pressable>
        )}
      </View>
    );
  }