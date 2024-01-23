import { SafeAreaView, StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { style } from "./SignInAndUpStyle";
import { User, Lock } from "iconsax-react-native";
import InputField from "../../InputFields/InputFields";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FacebookLogo, GoogleLogo } from "../../../assets/image/image";
import { useNavigation } from "@react-navigation/native";

const SignIn = () => {
  const navigation = useNavigation();
  const handlerNavigate = () => {
    navigation.navigate("Register");
  };
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
        <View style={style.content_field}>
          <InputField
            label={"Enter your username"}
            icon={<User size="32" color="#697689" style={{ marginRight: 5 }} />}
          />
          <InputField
            label={"Enter your password"}
            icon={<Lock size="32" color="#697689" style={{ marginRight: 5 }} />}
            inputType="password"
          />
          <TouchableOpacity style={style.btn_login}>
            <Text style={style.login_text}>Login</Text>
          </TouchableOpacity>
          <Text style={style.or}>Or ,Login With</Text>
          <View style={style.login_other}>
            <TouchableOpacity style={style.btnLoginOther}>
              <GoogleLogo />
            </TouchableOpacity>
            <TouchableOpacity style={style.btnLoginOther}>
              <FacebookLogo />
            </TouchableOpacity>
          </View>
          <View style={style.register}>
            <Text style={style.text}>New to the app ?</Text>
            <TouchableOpacity onPress={handlerNavigate}>
              <Text style={style.registerText}> Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
