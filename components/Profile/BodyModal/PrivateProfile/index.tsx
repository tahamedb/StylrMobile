import React from 'react';
import { View, ScrollView } from 'react-native';
import { TabBar } from '../common/TabBar';
import { useTabContext } from '../TabContext';
import { PrivateGardeRobe } from './PrivateGardeRobe';
import { PrivateTenue } from './PrivateTenue';

export const PrivateProfile = () => {
  const { activeTab } = useTabContext();

  return (
    <View className="flex-1 bg-white">
      <TabBar />
      <ScrollView className="flex-1">
        {activeTab === 'garde-robe' ? <PrivateGardeRobe /> : <PrivateTenue />}
      </ScrollView>
    </View>
  );
};
