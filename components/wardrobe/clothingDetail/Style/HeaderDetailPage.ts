import {StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: '#fff',
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
    },
    headerDark: {
      backgroundColor: '#000',
      borderBottomColor: '#333',
    },
    headerActions: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
    },
    backgroundToggle: {
      padding: 8,
      borderRadius: 8,
      backgroundColor: '#f5f5f5',
    },
    backgroundToggleActive: {
      backgroundColor: '#666',
    },
    saveButton: {
      backgroundColor: '#000',
      padding: 8,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
    },
    saveButtonDisabled: {
      opacity: 0.5,
    },
  });