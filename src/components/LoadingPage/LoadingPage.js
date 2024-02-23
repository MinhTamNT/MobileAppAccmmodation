// LoadingPage.js
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleDefault } from "../StyleDeafult/StyleDeafult";

const LoadingPage = () => {
  return (
    <SafeAreaView style={[StyleDefault.container, styles.container]}>
      <View style={StyleDefault.flexBoxCol}>
        <Image
          source={require("../../assets/image/houseanimation.gif")}
          style={styles.loadingImage}
        />
        <Text style={styles.loadingText}>App</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  loadingImage: {
    width: 120,
    height: 120,
  },
  loadingText: {
    fontSize: 24,
    fontWeight: "700",
  },
});

export default LoadingPage;
