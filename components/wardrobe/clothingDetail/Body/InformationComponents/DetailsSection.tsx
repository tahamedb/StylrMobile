import React, { useState } from 'react';
import { View, Pressable } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { styles } from '../../Style/DetailsSection';


export function DetailsSection() {
    const [isExpanded, setIsExpanded] = useState(false);
  
    return (
      <View style={styles.container}>
        <View style={styles.sectionHeader}>
          <View style={styles.labelContainer}>
            <ThemedText style={styles.label}>Détails</ThemedText>
          </View>
          <Pressable 
            style={styles.selectionContainer}
            onPress={() => setIsExpanded(!isExpanded)}
          >
            <IconSymbol
              name={isExpanded ? "chevron.up" : "chevron.right"}
              size={16}
              color="#000000"
            />
          </Pressable>
        </View>
  
        {isExpanded && (
          <View style={styles.detailsContainer}>
            
            {/* TODO:  Contenu de partie Detail */}
          </View>
        )}
      </View>
    );
  }