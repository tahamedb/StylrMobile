import React from 'react';
import { View, ScrollView } from 'react-native';
import { TabBar } from '../common/TabBar';
import { useTabContext } from '../TabContext';
import { PublicGardeRobe } from './PublicGardeRobe';
import { PublicTenue } from './PublicTenue';

export const PublicProfile = () => {
  const { activeTab } = useTabContext();

  return (
    <View className="flex-1 bg-white">
      <TabBar />
      <ScrollView className="flex-1">
        {activeTab === 'garde-robe' ? <PublicGardeRobe /> : <PublicTenue />}
      </ScrollView>
    </View>
  );
};