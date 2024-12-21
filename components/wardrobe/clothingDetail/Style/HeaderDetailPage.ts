import {StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: '#fff',
      zIndex: 1,
      position: 'relative',
    },
    headerRight: {
      flexDirection: 'row',
      gap: 16,
      alignItems: 'center',
    },
    title: {
      fontSize: 18,
      fontWeight: '600',
    },
    saveButton: {
      padding: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },
    saveButtonDisabled: {
      opacity: 0.5,
    },
    iconButton: {
      padding: 8,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 8,
    },
    iconButtonActive: {
      backgroundColor: 'rgba(76, 175, 80, 0.1)',
    },
  });