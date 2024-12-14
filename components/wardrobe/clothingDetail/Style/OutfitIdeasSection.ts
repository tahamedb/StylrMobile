import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },

  sectionContainer: {
    padding: 10,
    backgroundColor: '#f8f8f8',

  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 16,
  },

  labelContainer: {
    flex: 1,
  },

  label: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000000',
  },

  placeholderContainer: {
    marginHorizontal: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    aspectRatio: 1.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },

  placeholderImage: {
    width: 64,
    height: 64,
    marginBottom: 16,
    tintColor: '#666666',
  },

  placeholderText: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
  },
  emptyStateCard: {

    alignItems: 'center',

    justifyContent: 'center',

    padding: 20,

    backgroundColor: '#f0f0f0',

    borderRadius: 10,
  },

  emptyStateText: {

    fontSize: 16,

    color: '#888',

    textAlign: 'center',

    marginTop: 10,

  },
});