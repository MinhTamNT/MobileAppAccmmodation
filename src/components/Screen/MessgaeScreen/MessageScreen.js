import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleDefault } from "../../StyleDeafult/StyleDeafult";
import { useSelector } from "react-redux";
import { MeassgeStyle } from "./MessageStyle";
import { TabViewTopCommunity } from "../../TabViewTop/TabViewBottom";

const MessageScreen = () => {
  const user = useSelector((state) => state?.user?.currentUser);

  return (
    <SafeAreaView style={StyleDefault.container}>
      <View style={MeassgeStyle.header}>
        <Image
          source={{ uri: user.avatar_user }}
          style={StyleDefault.imageUsers}
        />
      </View>
      <TabViewTopCommunity />
    </SafeAreaView>
  );
};

export default MessageScreen;

const styles = StyleSheet.create({});
