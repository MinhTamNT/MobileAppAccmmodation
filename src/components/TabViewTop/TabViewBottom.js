import React, { useRef } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useSelector } from "react-redux";
import TabViewPost from "./TabViewUser/TabViewPost";
import TabViewComment from "./TabViewUser/TabViewComment";
import TabViewPostAccpet from "./ViewAdmin/TabViewPostAccpet";
import TabViewPostAccepted from "./ViewAdmin/TabViewPostAccepted";
import { Animated } from "react-native";
const Tab = createMaterialTopTabNavigator();

const TabViewBottom = () => {
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
          <Tab.Screen name="Comment" component={TabViewComment} />
        </>
      )}
    </Tab.Navigator>
  );
};

export default TabViewBottom;
