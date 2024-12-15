import React, { useState } from 'react';
import { View, Pressable } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { styles } from '../../Style/MotifSection';
import { ClothingItem } from '@/types/api.types';
export const MATERIALS = [
  'Coton',
  'Lin',
  'Laine',
  'Soie',
  'Polyester',
  'Nylon',
  'Cuir',
  'Daim',
  'Denim',
  'Velours',
  'Satin',
  'Jersey',
  'Cachemire',
  'Flanelle',
  'Maille',
  'Molleton',
  'Tweed',
  'Néoprène',
  'Tulle',
  'Dentelle',
  'Mousseline',
  'Viscose',
  'Élasthanne',
  'Autres Matériaux'
] as const;

export type Material = typeof MATERIALS[number];

interface MotifSectionProps {
  initialMaterial: Material;
  onUpdate: (value: string) => void;
}

export function MotifSection({ initialMaterial, onUpdate }: MotifSectionProps) {
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(initialMaterial || null);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleMaterialPress = (material: Material) => {
    const newMaterial = selectedMaterial === material ? null : material;
    setSelectedMaterial(newMaterial);
    onUpdate(newMaterial || '');
  };

  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <View style={styles.labelContainer}>
          <ThemedText style={styles.label}>Matériaux</ThemedText>
        </View>
        <Pressable 
          style={styles.selectionContainer}
          onPress={() => setIsExpanded(!isExpanded)}
        >
          {selectedMaterial && (
            <ThemedText style={styles.selectedText}>
              {selectedMaterial}
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
        <View style={styles.patternGrid}>
          {MATERIALS.map((material) => (
            <Pressable
              key={material}
              onPress={() => handleMaterialPress(material)}
              style={[
                styles.patternTag,
                selectedMaterial === material && styles.tagSelected
              ]}
            >
              <ThemedText 
                style={[
                  styles.tagText,
                  selectedMaterial === material && styles.tagTextSelected
                ]}
              >
                {material}
              </ThemedText>
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}