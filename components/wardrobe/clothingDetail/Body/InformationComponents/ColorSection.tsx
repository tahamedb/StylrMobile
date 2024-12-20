import React, { useState, useEffect } from 'react';
import { View, Pressable } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { styles } from '../../Style/ColorSection';

type Color = {
  name: string;
  hex: string;
};

const colors: Color[] = [
  { name: 'Blanc', hex: '#FFFFFF' },
  { name: 'Ivoire', hex: '#FFFFF0' },
  { name: 'Beige', hex: '#F5F5DC' },
  { name: 'Gris Clair', hex: '#D3D3D3' },
  { name: 'Gris Foncé', hex: '#696969' },
  { name: 'Noir', hex: '#000000' },
  { name: 'Jaune Clair', hex: '#FFFFE0' },
  { name: 'Jaune', hex: '#FFFF00' },
  { name: 'Couleur Curcuma', hex: '#FFA500' },
  { name: 'Orange', hex: '#FFA500' },
  { name: 'Corail', hex: '#FF7F50' },
  { name: 'Rouge', hex: '#FF0000' },
  { name: 'Rose', hex: '#FFC0CB' },
  { name: 'Rose Vif', hex: '#FF69B4' },
  { name: 'Vert Clair', hex: '#90EE90' },
  { name: 'Vert', hex: '#008000' },
  { name: 'Olive', hex: '#808000' },
  { name: 'Olive Foncé', hex: '#556B2F' },
  { name: 'Sarcelle', hex: '#008080' },
  { name: 'Kaki', hex: '#F0E68C' },
  { name: 'Cyan', hex: '#00FFFF' },
  { name: 'Bleu Ciel', hex: '#87CEEB' },
  { name: 'Bleu', hex: '#0000FF' },
  { name: 'Marine', hex: '#000080' },
  { name: 'Lavande', hex: '#E6E6FA' },
  { name: 'Violet', hex: '#800080' },
  { name: 'Bourgogne', hex: '#800020' },
  { name: 'Camel', hex: '#C19A6B' },
  { name: 'Brun', hex: '#964B00' },
  { name: 'Marron Foncé', hex: '#654321' },
  { name: 'Magenta', hex: '#FF00FF' },
  { name: 'Or', hex: '#FFD700' },
  { name: 'Argent', hex: '#C0C0C0' },
  { name: 'Coloré', hex: 'linear-gradient' }
];

interface ColorSectionProps {
  initialColors: string[];
  onUpdate: (value: string[]) => void;
}

export function ColorSection({ initialColors = [], onUpdate }: ColorSectionProps) {
  const [selectedColors, setSelectedColors] = useState<Color[]>(
    initialColors.map(colorName => 
      colors.find(c => c.name === colorName) || colors[0]
    )
  );
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    onUpdate(selectedColors.map(c => c.name));
  }, [selectedColors]);

  const toggleColor = (color: Color) => {
    setSelectedColors(current => {
      const isSelected = current.some(c => c.name === color.name);
      return isSelected 
        ? current.filter(c => c.name !== color.name)
        : [...current, color];
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <View style={styles.labelContainer}>
          <ThemedText style={styles.label}>Couleurs</ThemedText>
        </View>
        <Pressable 
          style={styles.selectionContainer}
          onPress={() => setIsExpanded(!isExpanded)}
        >
          {selectedColors.length > 0 && (
            <View style={styles.selectedColorsContainer}>
              {selectedColors.length <= 3 ? (
                selectedColors.map((color, index) => (
                  <View key={color.name} style={styles.selectedColorItem}>
                    <View 
                      style={[styles.colorDot, { backgroundColor: color.hex }]} 
                    />
                    <ThemedText style={styles.selectedText}>
                      {color.name}{index < selectedColors.length - 1 ? ', ' : ''}
                    </ThemedText>
                  </View>
                ))
              ) : (
                <ThemedText style={styles.selectedText}>
                  {selectedColors.length} couleurs sélectionnées
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
        <View style={styles.colorGrid}>
          {colors.map((color) => (
            <Pressable
              key={color.name}
              onPress={() => toggleColor(color)}
              style={[
                styles.colorTag,
                selectedColors.some(c => c.name === color.name) && styles.tagSelected
              ]}
            >
              <View 
                style={[
                  styles.colorDot,
                  { backgroundColor: color.hex }
                ]}
              />
              <ThemedText 
                style={[
                  styles.tagText,
                  selectedColors.some(c => c.name === color.name) && styles.tagTextSelected
                ]}
              >
                {color.name}
              </ThemedText>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}