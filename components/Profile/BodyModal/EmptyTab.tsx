import React from 'react';
import { View, Text } from 'react-native';

export const EmptyTab = () => {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-gray-400">Aucun contenu</Text>
    </View>
  );
};