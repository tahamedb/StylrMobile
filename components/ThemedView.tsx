import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';

export function ThemedView({ style, ...props }: { style?: object; [key: string]: any }) {
  const colorScheme = useColorScheme() || 'light';
  const backgroundColor = Colors[colorScheme].background;

  return (
    <View style={[{ backgroundColor }, style]} {...props} />
  );
}
