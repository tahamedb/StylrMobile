import { Platform, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 16,
    },
    headerRight: {
      flexDirection: 'row',
      gap: 16,
    },
    title: {
      fontSize: 20,
      fontWeight: '600',
    },
  });