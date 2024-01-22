import { StatusBar } from "expo-status-bar";
import React, { useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import WelcomeApp from "./src/components/WelcomeApp/WelcomeApp";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import SignInAndUp from "./src/components/Screen/SignInAndUp/SignInAndUp";
import { useFonts } from "expo-font";
const Stack = createStackNavigator();
export default function App() {
  const [fontsLoaded, fontError] = useFonts({
    "Poppins-Regular": require("./src/assets/fonts/Poppins-Regular.ttf"),
    "Poppins-ExtraBold": require("./src/assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-Italic": require("./src/assets/fonts/Poppins-Italic.ttf"),
    "Poppins-Medium": require("./src/assets/fonts/Poppins-Medium.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="WelcomeApp" component={WelcomeApp} />
        <Stack.Screen name="LoginAndRegister" component={SignInAndUp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
