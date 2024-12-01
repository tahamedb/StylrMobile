import { Platform, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    tabContainer: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: '#e0e0e0',
    },
    tabContainerDark: {
      borderBottomColor: '#333',
    },
    tab: {
      paddingVertical: 12,
      paddingHorizontal: 20,
    },
    activeTab: {
      borderBottomWidth: 2,
      borderBottomColor: '#000',
    },
    tabText: {
      color: '#999',
    },
    tabTextDark: {
      color: '#666',
    },
    activeTabText: {
      color: '#000',
    },
  });