import { StatusBar } from "expo-status-bar";
import React, { useCallback, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import WelcomeApp from "./src/components/WelcomeApp/WelcomeApp";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import SignUp from "./src/components/Screen/SignInAndUp/SignUp/SignUp.js";
import SignIn from "./src/components/Screen/SignInAndUp/Signin.js";
import Home from "./src/components/Screen/Home/Home.js";
import Notification from "./src/components/Screen/Notification/Notification.js";
import Search from "./src/components/Screen/Search/Search.js";
import { store } from "./src/Redux/store.js";
import { Provider } from "react-redux";
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
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="LoginAndRegister" 
        >
          <Stack.Screen name="WelcomeApp" component={WelcomeApp} />
          <Stack.Screen name="LoginAndRegister" component={SignIn} />
          <Stack.Screen name="Register" component={SignUp} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Notification" component={Notification} />
          <Stack.Screen name="Search" component={Search} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
