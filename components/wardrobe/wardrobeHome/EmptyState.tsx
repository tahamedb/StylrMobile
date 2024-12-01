import React from 'react';
import { View} from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { styles } from './Style/EmptyState';

type EmptyStateProps = {
  count?: number;
  total?: number;
};

export function EmptyState({ count = 0, total = 0 }: EmptyStateProps) {
  return (
    <View style={styles.emptyState}>
      <ThemedText style={styles.countText}>
        {count} habits sur {total}
      </ThemedText>
      <ThemedText style={styles.helperText}>
        Changez de filtre pour voir plus d'habits
      </ThemedText>
    </View>
  );
}
