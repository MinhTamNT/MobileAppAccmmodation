import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import TabViewPost from "./TabViewPost";
import TabViewComment from "./TabViewComment";

const TabViewBottom = () => {
  const Tab = createMaterialTopTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIndicatorStyle: { backgroundColor: "black", height: 1.5 },
      })}
    >
      <Tab.Screen name="Post" component={TabViewPost} />
      <Tab.Screen name="Comment" component={TabViewComment} />
    </Tab.Navigator>
  );
};

export default TabViewBottom;
