import {StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingVertical: 12,
    },
    headerRight: {
      flexDirection: 'row',
      gap: 16,
    },
    title: {
      fontSize: 18,
      fontWeight: '600',
    },
  });