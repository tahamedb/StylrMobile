import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    marginTop: 8,
    color: '#FF0000',
    fontSize: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
    
  },
  gridItem: {
    width: '47%',
    aspectRatio: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 22,
    //overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#f6f2f0',
  },
  previewGrid: {
    width: '100%',
    height: '70%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#fff',
  },
  smallPreviewImage: {
    width: '50%',
    height: '50%',
    resizeMode: 'contain',
  },
  rightImage: {
    borderLeftWidth: 1,
    borderLeftColor: '#f6f2f0',
  },
  bottomImage: {
    borderTopWidth: 1,
    borderTopColor: '#f6f2f0',
  },
  itemFooter: {
    padding: 8,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  countContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  countText: {
    fontSize: 14,
    color: '#666',
  },
  createButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  plusText: {
    fontSize: 24,
    color: '#000',
  },
  createText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 8,
  },
  comingSoon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EEEEEE',
  },
  comingSoonText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
    marginBottom: 150,
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});