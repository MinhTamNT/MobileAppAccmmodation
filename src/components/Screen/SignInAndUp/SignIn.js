import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLOR, SHADOWS } from "../../../contants";
import { FacebookLogo, GoogleLogo } from "../../../assets/image/image";
import { Formik } from "formik";
import * as Yup from "yup";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { style } from "./SignInStyle";
import { useDispatch } from "react-redux";
import { CLIENT_ID, CLIENT_SECRET } from "@env";
import { LoginUser } from "../../../Redux/apiRequest";
import InputField from "../../InputFields/InputField";
import Toast from "react-native-toast-message";

const SignIn = () => {
  const [isLoading, setLoading] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const showToast = (message) => {
    Toast.show({
      type: "error",
      text1: message,
      position: "bottom",
    });
  };

  const handleLogin = async (values, { setSubmitting, setFieldError }) => {
    setLoading(true);
    try {
      const newUser = {
        username: values.username,
        password: values.password,
        client_id: "O6BhJdYcf9Z0lCYSQVW7yG0RvGWuyiDmG73HH7LQ",
        client_secret:
          "5txAMLkBUPl6p7hBAYWXjWSWuu6T3N3m2sLxU1Pbnh045GCzv8suE07xy3sRmdrDWMRW6znTwNF3UFymBdxgOZsk0Y3PNsUcGounksXoIKYSa3kxgqY0je1YlnCa9oTR",
        grant_type: "password",
      };
      await LoginUser(newUser, dispatch, navigation, showToast);
    } catch (error) {
      console.log("Error:", error.message);
      if (error.response) {
        console.log("Response Data:", error.response.data);
        console.log("Response Status:", error.response.status);
        console.log("Response Headers:", error.response.headers);
      }
      setFieldError("general", "Invalid username or password");
    } finally {
      setSubmitting(false);
      setLoading(false);
    }
  };

  return (
    <View style={style.container}>
      <KeyboardAwareScrollView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <SafeAreaView style={style.container_content}>
          <View style={style.content_image}>
            <Image
              source={require("../../../assets/image/home.jpg")}
              style={style.image}
            />
          </View>
        </SafeAreaView>
        <View
          style={[style.formLogin, SHADOWS.medium]}
          keyboardDismissMode="on-drag"
        >
          <Formik
            initialValues={{ username: "", password: "" }}
            validationSchema={Yup.object().shape({
              username: Yup.string().required("Username is required"),
              password: Yup.string().required("Password is required"),
            })}
            onSubmit={handleLogin}
          >
            {({
              values,
              handleChange,
              handleSubmit,
              errors,
              touched,
              isSubmitting,
            }) => (
              <View style={{ marginLeft: 8 }}>
                <InputField
                  label="Username"
                  placeholder="Enter your username"
                  onChangeText={handleChange("username")}
                  error={touched.username && errors.username}
                  value={values.username}
                />
                <InputField
                  label="Password"
                  placeholder="Enter your password"
                  secureEntry={true}
                  onChangeText={handleChange("password")}
                  error={touched.password && errors.password}
                  value={values.password}
                />
                <TouchableOpacity
                  style={style.btnLogin}
                  onPress={handleSubmit}
                  disabled={isSubmitting}
                >
                  {isLoading ? (
                    <ActivityIndicator size="small" color={COLOR.white} />
                  ) : (
                    <Text style={style.textLogin}>Login</Text>
                  )}
                </TouchableOpacity>
              </View>
            )}
          </Formik>
          <Text style={style.OrLogin}>OR</Text>
          <View style={style.loginOther}>
            <TouchableOpacity style={style.btnLoginOther}>
              <GoogleLogo />
            </TouchableOpacity>
            <TouchableOpacity style={style.btnLoginOther}>
              <FacebookLogo />
            </TouchableOpacity>
          </View>
          <View style={style.account}>
            <Text style={style.account_text}>Already have an account ?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Register")}>
              <Text
                style={[
                  style.account_text,
                  { color: COLOR.bg_color_blue_200, marginLeft: 2 },
                ]}
              >
                Create here
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default SignIn;
