import { SafeAreaView, StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { style } from "./SignInAndUpStyle";

const SignInAndUp = () => {
  return (
    <SafeAreaView style={style.contain}>
      <View style={style.content}>
        <View style={style.content_image}>
          <Image
            source={require("../../../assets/image/Login.png")}
            style={style.image}
          />
        </View>
        <Text style={style.text_login}>Login</Text>
        
      </View>
    </SafeAreaView>
  );
};

export default SignInAndUp;

const styles = StyleSheet.create({});
