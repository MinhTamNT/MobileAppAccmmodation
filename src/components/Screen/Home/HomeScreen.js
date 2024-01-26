import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { style } from "./HomeStyle";
const HomeScreen = () => {
  const user = {
    name: "Nguyễn Sinh Hùng",
    profile: require("../../../assets/image/avatardefault.jpg"),
  };
  return (
    <SafeAreaView style={style.container}>
      <View style={style.content_header}>
        <View style={style.header_title}>
          <View style={style.title_hello}>
            <Text style={style.text_title}>Welcome back</Text>
            <Text style={style.text_title}>{user.name}</Text>
          </View>
        </View>
        <View style={style.header_action}></View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
