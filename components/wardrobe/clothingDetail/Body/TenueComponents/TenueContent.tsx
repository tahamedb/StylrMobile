import React from 'react';
import { View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { styles } from '../../Style/TenueContent';

export function TenueContent() {
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <ThemedText style={styles.sectionTitle}>Mes Tenues</ThemedText>
      </View>
    </View>
  );
}