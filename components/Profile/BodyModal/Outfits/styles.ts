import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    margin: 16,
    alignItems: 'center', 
    justifyContent: 'space-between', 
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 12,
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  activeTab: {
    backgroundColor: '#000',
  },
  inactiveTab: {
    backgroundColor: 'transparent',
  },
  tabText: {
    fontSize: 14,
    textAlign: 'center',
    textAlignVertical: 'center', 
    includeFontPadding: false, 
    color: '#9E9E9E',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  inactiveTabText: {
    color: '#9E9E9E',
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  createIdeaBox: {
    width: 200,  
    height: 200, 
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
  modifyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    right: 16,
    top: 16,
  },
  modifyText: {
    marginRight: 4,
    color: '#666',
  },
  createIdeaText: {
    fontSize: 14,
    color: '#9E9E9E',
    marginTop: 4,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 175,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#9E9E9E',
    marginTop: 12,
    textAlign: 'center',
  },
});