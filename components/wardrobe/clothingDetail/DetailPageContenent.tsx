import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';

// Composant Information
export function InformationContent() {
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Infor sur les TLO</ThemedText>
        
        <View style={styles.infoRow}>
          <ThemedText style={styles.label}>Saison</ThemedText>
          <View style={styles.seasonTags}>
            {['Printemps', 'Été', 'Automne', 'Hiver'].map((season) => (
              <View key={season} style={styles.tag}>
                <ThemedText>{season}</ThemedText>
              </View>
            ))}
          </View>
        </View>

       <View style={styles.infoRow}>
          <ThemedText style={styles.label}> Occasions</ThemedText>
          {/* Contenu des occasions */}
        </View>
      </View>
    </View>
  );
}

// Composant Tenue
export function TenueContent() {
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Mes Tenues</ThemedText>
        {/* Contenu des tenues */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  infoRow: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
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
    borderColor: '#e0e0e0',
  }
});