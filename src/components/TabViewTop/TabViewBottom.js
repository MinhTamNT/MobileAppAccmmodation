import React, { useRef } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useSelector } from "react-redux";
import TabViewPost from "./TabViewUser/TabViewPost";
import TabViewComment from "./TabViewUser/TabViewComment";
import TabViewPostAccpet from "./ViewAdmin/TabViewPostAccpet";
import TabViewPostAccepted from "./ViewAdmin/TabViewPostAccepted";
import { Animated } from "react-native";
import TabViewMessage from "./TabViewCommunity/TabViewMessage";
import TabViewCommunity from "./TabViewCommunity/TabViewCommunities";
import TabViewCommunities from "./TabViewCommunity/TabViewCommunities";
const Tab = createMaterialTopTabNavigator();

export const TabViewBottom = () => {
  const user = useSelector((state) => state.user.currentUser);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIndicatorStyle: { backgroundColor: "black", height: 1.5 },
      })}
    >
      {user.role === "ADMIN" ? (
        <>
          <Tab.Screen name="Waiting" component={TabViewPostAccpet} />
          <Tab.Screen name="Accept" component={TabViewPostAccepted} />
        </>
      ) : (
        <>
          <Tab.Screen name="Post" component={TabViewPost} />
          <Tab.Screen name="Comment" component={TabViewCommunities} />
        </>
      )}
    </Tab.Navigator>
  );
};
export const TabViewTopCommunity = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIndicatorStyle: { backgroundColor: "black", height: 1.5 },
      })}
    >
      <Tab.Screen name="Message" component={TabViewMessage} />
      <Tab.Screen name="community" component={TabViewCommunity} />
    </Tab.Navigator>
  );
};
