import React from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { TabView } from 'react-native-tab-view';
import { TabBar } from './TabBar';
import { Wardrobe } from './Wardrobe';
import { Outfits } from './Outfits';
import { useBodyModal } from '@/hooks/profile/BodyModal/useBodyModal';

interface BodyModalProps {
  variant: 'private' | 'public';
}

export const BodyModal = ({ variant }: BodyModalProps) => {
  const layout = useWindowDimensions();
  const { index, routes, handleIndexChange } = useBodyModal();

  const renderScene = ({ route }: { route: { key: string } }) => {
    switch (route.key) {
      case 'wardrobe':
        return <Wardrobe />;
      case 'outfits':
        return <Outfits />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <TabView
        style={styles.container}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={handleIndexChange}
        initialLayout={{ width: layout.width }}
        renderTabBar={(props) => <TabBar props={props} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
 
});
