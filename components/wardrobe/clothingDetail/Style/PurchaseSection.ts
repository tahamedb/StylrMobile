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
  priceText: {
    color: '#007AFF',
    fontSize: 14,
  },
  detailsContainer: {
    gap: 16,
  },
  inputGroup: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 14,
    color: '#666666',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#DEDEDE',
    paddingBottom: 8,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#000000',
    padding: 0,
  },
  clearButton: {
    padding: 4,
  }
});
