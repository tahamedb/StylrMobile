import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { DoorOpen } from "lucide-react-native";

export const PrivateGardeRobe = () => {
  return (
    <View className="flex-1">
      <View className="flex-row flex-wrap p-4">
        <View className="w-1/2 p-1">
          <TouchableOpacity className="bg-gray-100 rounded-lg p-2 aspect-square">
            {/* Image component for the striped shirt */}
            <Image 
              source={{ uri: 'your-image-url' }} 
              className="w-full h-full"
            />
            <View className="absolute bottom-2 left-2">
              <View className="bg-white rounded-full p-1">
                <DoorOpen size={18} color="#666" />
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View className="w-1/2 p-1">
          <TouchableOpacity className="border-2 border-gray-300 rounded-lg aspect-square items-center justify-center">
            <DoorOpen size={24} color="#666" />
            <Text className="text-gray-600 mt-2">Créer une garde-robe</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className="px-4 pt-2">
        <Text className="text-lg font-medium">Tous les vêtements</Text>
        <Text className="text-gray-500">1</Text>
      </View>
      <TouchableOpacity className="flex-row items-center justify-center py-4 border-t border-gray-200 mt-4">
        <Text className="text-gray-600">Archiver</Text>
      </TouchableOpacity>
      <TouchableOpacity className="flex-row items-center justify-center py-4 border-t border-gray-200">
        <Text className="text-gray-600">Revue Rapide du Placard</Text>
      </TouchableOpacity>
    </View>
  );
};