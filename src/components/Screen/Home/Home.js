import { View, Text } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import BottomNavigation from "../../Navigation/BottomNavigation";
const Stack = createStackNavigator();
const Home = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Bottom Navigation" component={BottomNavigation} />
    </Stack.Navigator>
  );
};

export default Home;
