import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
    },
    section: {
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      marginBottom: 16,
    },
    infoRow: {
      marginBottom: 16,
    },
    label: {
      fontSize: 16,
      marginBottom: 8,
    },
    seasonTags: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
      marginTop: 8,
    },
    tag: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 20,
      borderWidth: 1,
    },
    tagSelected: {
      backgroundColor: '#000',
      borderColor: '#000',
    },
    tagUnselected: {
      backgroundColor: 'transparent',
      borderColor: '#ccc',
    },
    tagText: {
      fontSize: 14,
    },
    tagTextSelected: {
      color: '#fff',
    },
    tagTextUnselected: {
      color: '#000',
    },
    selectedSeasonsText: {
      color: '#007AFF',
      marginVertical: 8,
    },
  });