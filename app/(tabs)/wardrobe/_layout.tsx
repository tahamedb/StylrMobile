import { Stack } from 'expo-router';

export default function WardrobeLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen 
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="clothingDetail" 
        options={{
          headerShown: false,
          presentation: 'modal'
        }}
      />
    </Stack>
  );
}