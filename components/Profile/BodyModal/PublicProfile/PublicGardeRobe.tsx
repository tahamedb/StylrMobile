import React from 'react';
import { View, Text } from 'react-native';
import { DoorOpen } from "lucide-react-native";

export const PublicGardeRobe = () => {
  return (
    <View className="flex-1 items-center justify-center">
      <DoorOpen size={48} color="#cccccc" />
      <Text className="text-gray-400 mt-4 text-lg">Aucune garde-robe de dinahs</Text>
    </View>
  );
};