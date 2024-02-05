import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLOR, SHADOWS } from "../../../contants";
import InputField from "../../InputFields/InputFields";
import { FacebookLogo, GoogleLogo } from "../../../assets/image/image";
import { Formik } from "formik";
import * as Yup from "yup";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { style } from "./SignInStyle";
import { LoginUser } from "../../../Redux/Slice/AutheSlice/authrequest";
import { useDispatch } from "react-redux";
import { CLIENT_ID, CLIENT_SECRET } from "@env";
const SignIn = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const handleLogin = async (values, { setSubmitting, setFieldError }) => {
    try {
      const newUser = {
        username: values.username,
        password: values.password,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: "password",
      };
      console.log("New user :", newUser);
      const res = await LoginUser(newUser, dispatch);
      console.log(res);
    } catch (error) {
      setFieldError("general", "Invalid username or password");
    } finally {
      setSubmitting(false);
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
                  <Text style={style.textLogin}>Login</Text>
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
                Login in
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default SignIn;
