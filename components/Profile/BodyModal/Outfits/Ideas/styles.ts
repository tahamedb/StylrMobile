import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    gap: 16,
  },
  createBox: {
    flex: 1,
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
    textAlign: 'center',
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