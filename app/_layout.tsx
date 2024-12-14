import { Slot } from "expo-router";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SplashScreen } from "expo-router";
import {DarkTheme, DefaultTheme, ThemeProvider} from "@react-navigation/native";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import { useFonts } from "expo-font";


// Import your global CSS file (required for NativeWind)
import "../global.css";

// Prevent the splash screen from auto-hiding before asset loading is complete
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen 
          name="(tabs)" 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="wardrobe"
          options={{
            headerShown: true,
            title: "Garde-robe",
            headerBackVisible: true,
          }}
        />
       <Stack.Screen 
          name="localisation-search"
          options={{ 
            headerShown: false
          }}
        />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}