import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { User, Lock } from "iconsax-react-native";
import InputField from "../../InputFields/InputFields";
import { style } from "./SignInAndUpStyle";
import { useNavigation } from "@react-navigation/native";
import { FacebookLogo, GoogleLogo } from "../../../assets/image/image";
import { loginSchema } from "../../Validate/Validate";

const SignIn = () => {
  const navigation = useNavigation();

  // State variables for username and password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validateLogin = async () => {
    if (!username.trim() || !password.trim()) {
      setError("Please enter both username and password");
      return;
    }

    try {
      setLoading(true);
      await loginSchema.validate({ username, password }, { abortEarly: false });
      setLoading(false);
      alert("Login successful!");
    } catch (validationError) {
      setError("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

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
          <View>
            <InputField
              label={"Enter your username"}
              icon={
                <User size="32" color="#697689" style={{ marginRight: 5 }} />
              }
              onChangeText={(text) => setUsername(text)}
              error={(errorMessage) => setError(errorMessage)} // Pass error prop
            />
            {error ? <Text style={style.errorText}>{error}</Text> : null}
          </View>
          <View>
            <InputField
              label={"Enter your password"}
              icon={
                <Lock size="32" color="#697689" style={{ marginRight: 5 }} />
              }
              inputType="password"
              onChangeText={(text) => setPassword(text)}
              error={(errorMessage) => setError(errorMessage)} // Pass error prop
            />
            {error ? <Text style={style.errorText}>{error}</Text> : null}
          </View>
          <TouchableOpacity style={style.btn_login} onPress={validateLogin}>
            <Text style={style.login_text}>Login</Text>
          </TouchableOpacity>

          <Text style={style.or}>Or, Login With</Text>
          <View style={style.login_other}>
            <TouchableOpacity style={style.btnLoginOther}>
              <GoogleLogo />
            </TouchableOpacity>
            <TouchableOpacity style={style.btnLoginOther}>
              <FacebookLogo />
            </TouchableOpacity>
          </View>
          <View style={style.register}>
            <Text style={style.text}>New to the app?</Text>
            <TouchableOpacity onPress={handlerNavigate}>
              <Text style={style.registerText}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
