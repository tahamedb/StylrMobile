import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    paddingHorizontal: 16,
  },
  outfitCard: {
    flex: 1,
    minWidth: '48%',
    aspectRatio: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  createBox: {
    margin: 16,
    height: 160,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#E5E5E5',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  iconContainer: {
    marginBottom: 8,
  },
  createText: {
    fontSize: 14,
    color: '#9E9E9E',
    marginTop: 4,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#9E9E9E',
    textAlign: 'center',
  },
}); 