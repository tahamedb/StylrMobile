import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTabContext } from '../TabContext';

export const TabBar = () => {
  const { activeTab, setActiveTab } = useTabContext();

  return (
    <View className="border-b border-gray-200">
      <View className="flex-row">
        <TouchableOpacity 
          onPress={() => setActiveTab('garde-robe')}
          className="flex-1"
        >
          <Text className={`py-3 text-center text-base ${
            activeTab === 'garde-robe' 
              ? 'border-b-2 border-black font-semibold' 
              : 'text-gray-400'
          }`}>
            Garde-robe
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          onPress={() => setActiveTab('tenue')}
          className="flex-1"
        >
          <Text className={`py-3 text-center text-base ${
            activeTab === 'tenue' 
              ? 'border-b-2 border-black font-semibold' 
              : 'text-gray-400'
          }`}>
            Tenue
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => setActiveTab('emballage')}
          className="flex-1"
        >
          <Text className={`py-3 text-center text-base ${
            activeTab === 'emballage' 
              ? 'border-b-2 border-black font-semibold' 
              : 'text-gray-400'
          }`}>
            Emballage
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};