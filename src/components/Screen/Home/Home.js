import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import BottomNavigation from "../../Navigation/BottomNavigation";
import { useSelector } from "react-redux";
import { View, Text, ScrollView } from "react-native"; // Import View from react-native
import { SafeAreaView } from "react-native-safe-area-context";
import { style } from "./HomeStyle";
import { StyleDefault } from "../../StyleDeafult/StyleDeafult";
import TabViewBottom from "../../TabViewTop/TabViewBottom";
import LoadingPage from "../../LoadingPage/LoadingPage";
const Stack = createStackNavigator();

const Home = () => {
  const user = useSelector((state) => state.user?.user?.currentUser);
  if (!user) {
    return <LoadingPage />;
  }
  return (
    <>
      {user.role === "ADMIN" ? (
        <SafeAreaView style={style.container}>
          <View style={style.content_header}>
            <View style={style.header_title}>
              <View style={style.title_hello}>
                <Text style={style.text_titleAdmin}>Welcome back</Text>
                <Text style={style.text_titleAdmin}>
                  {user.last_name} {user.first_name}
                </Text>
              </View>
              <Text style={StyleDefault.FontSizeMedium}>Role:{user.role}</Text>
            </View>
          </View>
          <TabViewBottom />
        </SafeAreaView>
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Bottom Navigation" component={BottomNavigation} />
        </Stack.Navigator>
      )}
    </>
  );
};

export default Home;
