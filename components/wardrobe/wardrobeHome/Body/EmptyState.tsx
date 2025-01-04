import React from 'react';
import { View } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { styles } from '../Style/EmptyState';

type EmptyStateProps = {
  count?: number;
  total?: number;
  message?: string;
  subMessage?: string;
};

export function EmptyState({ 
  count = 0, 
  total = 0, 
  message = `${count} habits sur ${total}`,
  subMessage = 'Changez de filtre pour voir plus d\'habits'
}: EmptyStateProps) {
  return (
    <View style={styles.emptyState}>
      <ThemedText style={styles.countText}>
        {message}
      </ThemedText>
      <ThemedText style={styles.helperText}>
        {subMessage}
      </ThemedText>
    </View>
  );
}
