// SignIn.js
import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Formik } from "formik";
import * as Yup from "yup";
import { COLOR, SHADOWS } from "../../../../contants";
import { style } from "./SignUpStyle";
import { style as styleForm } from "../SignInStyle";
import { signUpSchema } from "../../../Validate/Validate";
import InputField from "../../../InputFields/InputFields";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";

const SignIn = () => {
  const navigation = useNavigation();
  const [currentStep, setCurrentStep] = useState(0);
  const pickerRef = useRef();
  const steps = ["Step 1", "Step 2", "Step 3", "Step 4"];
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    username: "",
    password: "",
    email: "",
    confirm_password: "",
    phone_number: "",
    avatar: "",
    role: "",
  });

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleChange = (field, value) => {
    setUser((prevUser) => ({
      ...prevUser,
      [field]: value,
    }));
  };

  const pickerImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      alert("Permission Denied");
    } else {
      const result = await ImagePicker.launchImageLibraryAsync();

      if (!result.canceled) {
        handleChange("avatar", result.assets[0]);
      }
    }
  };

  const renderFormFields = (formikProps) => {
    const {
      values,
      errors,
      touched,
      handleChange: formikHandleChange,
    } = formikProps;

    switch (currentStep) {
      case 0:
        return (
          <>
            <InputField
              label="First Name"
              placeholder="Enter your first Name"
              value={values.first_name}
              onChangeText={formikHandleChange("first_name")}
              error={touched.first_name && errors.first_name}
            />
            {errors.first_name && (
              <Text style={style.errorMessgae}>{errors.first_name}</Text>
            )}
            <InputField
              label="Last Name"
              placeholder="Enter your Last Name"
              value={values.last_name}
              onChangeText={formikHandleChange("last_name")}
              error={touched.last_name && errors.last_name}
            />
            {errors.last_name && (
              <Text style={style.errorMessgae}>{errors.last_name}</Text>
            )}
            <InputField
              label="Email"
              placeholder="Enter your Email"
              value={values.email}
              onChangeText={formikHandleChange("email")}
              error={touched.email && errors.email}
            />
            {errors.email && (
              <Text style={style.errorMessgae}>{errors.email}</Text>
            )}
          </>
        );
      case 1:
        return (
          <>
            <InputField
              label="UserName"
              placeholder="Enter your username"
              value={values.username}
              onChangeText={formikHandleChange("username")}
              error={touched.username && errors.username}
            />
            {errors.username && (
              <Text style={style.errorMessgae}>{errors.username}</Text>
            )}
            <InputField
              label="Password"
              placeholder="Enter your password"
              secureEntry={true}
              value={values.password}
              onChangeText={formikHandleChange("password")}
              error={touched.password && errors.password}
            />
            {errors.password && (
              <Text style={style.errorMessgae}>{errors.password}</Text>
            )}
            <InputField
              label="Confirm Password"
              placeholder="Enter your Confirm Password"
              secureEntry={true}
              value={values.confirm_password}
              onChangeText={formikHandleChange("confirm_password")}
              error={touched.confirm_password && errors.confirm_password}
            />
            {errors.password && (
              <Text style={style.errorMessgae}>{errors.confirm_password}</Text>
            )}
            <InputField
              label="Phone Number"
              placeholder="Enter your phone number"
              keyboardType="phone-pad"
              value={values.phone_number}
              onChangeText={formikHandleChange("phone_number")}
              error={touched.phone_number && errors.phone_number}
            />
            {errors.password && (
              <Text style={style.errorMessgae}>{errors.phone_number}</Text>
            )}
          </>
        );
      case 2:
        return (
          <>
            <Text
              style={{
                marginVertical: 10,

                fontSize: 20,
              }}
            >
              Who are you ?
            </Text>
            <Picker
              selectedValue={values.role}
              onValueChange={(itemValue, itemIndex) =>
                handleChange("role", itemValue)
              }
            >
              <Picker.Item label="Tenant" value="Tenant" />
              <Picker.Item label="Host" value="Host" />
            </Picker>
            {errors.role && (
              <Text style={style.errorMessgae}>{errors.role}</Text>
            )}
          </>
        );
      case 3:
        return (
          <>
            <Text>Choose your avatar</Text>
            <TouchableOpacity style={style.choosenFile} onPress={pickerImage}>
              <Image
                source={
                  user.avatar?.uri
                    ? { uri: user.avatar.uri }
                    : require("../../../../assets/image/avatardefault.jpg")
                }
                style={style.ImageUser}
              />
              <Text style={{ fontSize: 20, fontWeight: "700" }}>
                Upload avatar
              </Text>
            </TouchableOpacity>
          </>
        );
    }
  };
  const handleRegister = async (values, { setSubmitting, setFieldError }) => {
    try {
      alert("Login successful!");
    } catch (error) {
      setFieldError("general", "Invalid username or password");
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <View style={style.contain}>
      <KeyboardAwareScrollView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <SafeAreaView>
          <View style={styleForm.content_image}>
            <Image
              source={require("../../../../assets/image/home.jpg")}
              style={styleForm.image}
            />
          </View>
        </SafeAreaView>
        <View style={[SHADOWS.medium, style.registerForm]}>
          <Formik
            initialValues={{
              first_name: "",
              last_name: "",
              username: "",
              password: "",
              email: "",
              confirm_password: "",
              phone_number: "",
              avatar: "",
              role: "",
            }}
            validationSchema={
              currentStep === 0
                ? Yup.object({
                    first_name: Yup.string().required("First Name is required"),
                    last_name: Yup.string().required("Last Name is required"),
                    email: Yup.string()
                      .email("Invalid email")
                      .required("Email is required"),
                  })
                : currentStep === 1
                ? Yup.object({
                    username: Yup.string().required("Username is required"),
                    password: Yup.string().required("Password is required"),
                    confirm_password: Yup.string()
                      .oneOf(
                        [Yup.ref("password"), null],
                        "Passwords must match"
                      )
                      .required("Confirm Password is required"),
                    phone_number: Yup.string().required(
                      "Phone Number is required"
                    ),
                  })
                : currentStep === 2
                ? Yup.object({
                    role: Yup.string().required("Role is required"),
                  })
                : Yup.object().shape({})
            }
            onSubmit={handleRegister}
          >
            {(formikProps) => (
              <View>
                <Text style={style.Step}>{steps[currentStep]}</Text>
                {renderFormFields(formikProps)}
                <View style={style.btnAction}>
                  <TouchableOpacity
                    onPress={handlePrev}
                    disabled={currentStep === 0}
                    style={[style.btnAction_content]}
                  >
                    <Text style={{ color: "white" }}>Back</Text>
                  </TouchableOpacity>

                  {currentStep === steps.length - 1 ? (
                    <>
                      <TouchableOpacity onPress={handleRegister}>
                        <Text>Create an account</Text>
                      </TouchableOpacity>
                    </>
                  ) : (
                    <>
                      <TouchableOpacity
                        onPress={handleNext}
                        style={style.btnAction_content}
                      >
                        <Text style={{ color: "white" }}>
                          {currentStep === steps.length - 1 ? "Save" : "Next"}
                        </Text>
                      </TouchableOpacity>
                    </>
                  )}
                </View>
              </View>
            )}
          </Formik>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default SignIn;
