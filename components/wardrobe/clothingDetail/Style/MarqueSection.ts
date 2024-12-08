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
  addBrandButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#DEDEDE',
    gap: 8,
    alignSelf: 'flex-start',  // Pour que le bouton ne prenne que la largeur nécessaire
  },
  addBrandText: {
    fontSize: 14,
    color: '#000000',
  },
  brandInput: {
    borderWidth: 1,
    borderColor: '#DEDEDE',
    borderRadius: 8,
    padding: 8,
    marginTop: 8,
  },
  brandList: {
    marginTop: 8,
  },
  brandItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#DEDEDE',
  },
  selectedBrand: {
    backgroundColor: '#F8F8F8',
  }
});