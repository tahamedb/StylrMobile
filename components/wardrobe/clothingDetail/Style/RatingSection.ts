import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  labelContainer: {
    flex: 1,
  },
  selectionContainer: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
  },
  selectedText: {
    color: '#007AFF',
    fontSize: 14,
  },
  ratingContainer: {
    paddingVertical: 16,
  },
  starsRow: {
    flexDirection: 'row',
    justifyContent: 'center', // Centre les étoiles
    alignItems: 'center',
    gap: 16, // Plus d'espace entre les étoiles
  },
});