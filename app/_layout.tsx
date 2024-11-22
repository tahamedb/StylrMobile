import { Slot } from "expo-router";
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
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme }>
        <Slot />
        <StatusBar style="auto" />
      </ThemeProvider>
  );
}