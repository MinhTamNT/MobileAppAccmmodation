import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../components/Screen/Home/Home";
import { Home2 } from "iconsax-react-native";

const BottomTabNavigation = createBottomTabNavigator();
const BottomNavigation = () => {
  return (
    <BottomTabNavigation.Navigator>
      <BottomTabNavigation.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ foucsed }) => <Home2 size={32} color="#ff8a65" />,
        }}
      />
    </BottomTabNavigation.Navigator>
  );
};

export default BottomNavigation;
