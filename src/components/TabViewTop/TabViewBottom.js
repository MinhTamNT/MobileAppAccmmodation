import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useSelector } from "react-redux";
import TabViewPost from "./TabViewUser/TabViewPost";
import TabViewComment from "./TabViewUser/TabViewComment";
import TabViewPostAccpet from "./ViewAdmin/TabViewPostAccpet";
import TabViewPostAccepted from "./ViewAdmin/TabViewPostAccepted";
const TabViewBottom = () => {
  const Tab = createMaterialTopTabNavigator();
  const user = useSelector((state) => state.user.user.currentUser);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIndicatorStyle: { backgroundColor: "black", height: 1.5 },
      })}
    >
      {user.role === "ADMIN" ? (
        <>
          <Tab.Screen name="Wattng" component={TabViewPostAccpet} />
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
