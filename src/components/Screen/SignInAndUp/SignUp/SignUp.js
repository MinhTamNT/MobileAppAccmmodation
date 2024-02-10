import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Yup from "yup";
import { SHADOWS } from "../../../../contants";
import { style } from "./SignUpStyle";
import { style as styleForm } from "../SignInStyle";
import InputField from "../../../InputFields/InputFields";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { registerUser } from "../../../../Redux/apiRequest";

const SignUp = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigation = useNavigation();
  const steps = ["Step 1", "Step 2", "Step 3", "Step 4"];
  const [formValues, setFormValues] = useState({
    first_name: "",
    last_name: "",
    username: "",
    password: "",
    email: "",
    phone: "",
    avatar_user: "",
    role: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const dispatch = useDispatch();
  const handleNext = () => setCurrentStep(currentStep + 1);
  const handlePrev = () => setCurrentStep(currentStep - 1);

  const pickerImage = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        alert("Permission Denied");
      } else {
        const result = await ImagePicker.launchImageLibraryAsync();
        if (!result.canceled) {
          const avatar_user = result.assets[0];
          if (avatar_user.uri) {
            setFormValues({ ...formValues, avatar_user });
          } else {
            console.log("Invalid avatar_user data:", avatar_user);
          }
        }
      }
    } catch (error) {
      console.error("Error picking image:", error);
    }
  };

  const handleRegister = async () => {
    try {
      const form = new FormData();
      for (let key in formValues) {
        if (key === "avatar_user") {
          form.append(key, {
            uri: formValues[key].uri,
            name: formValues[key].fileName,
            type: formValues[key].type,
          });
        } else {
          form.append(key, formValues[key]);
        }
      }
      await registerUser(form, dispatch, navigation);
    } catch (error) {
      console.error("Full Axios Error:", error);
    }
  };

  const handleChange = (field, value) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [field]: value,
    }));
  };

  const validateForm = () => {
    const schema = Yup.object({
      first_name: Yup.string().required("First Name is required"),
      last_name: Yup.string().required("Last Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
    });

    try {
      schema.validateSync(formValues, { abortEarly: false });
      setFormErrors({});
      return true;
    } catch (errors) {
      const formattedErrors = {};
      errors.inner.forEach((error) => {
        formattedErrors[error.path] = error.message;
      });
      setFormErrors(formattedErrors);
      return false;
    }
  };

  const renderFormFields = () => {
    switch (currentStep) {
      case 0:
        return (
          <>
            <InputField
              label="First Name"
              placeholder="Enter your first Name"
              value={formValues.first_name}
              onChangeText={(value) => handleChange("first_name", value)}
              error={formErrors.first_name}
            />

            <InputField
              label="Last Name"
              placeholder="Enter your Last Name"
              value={formValues.last_name}
              onChangeText={(value) => handleChange("last_name", value)}
              error={formErrors.last_name}
            />

            <InputField
              label="Email"
              placeholder="Enter your Email"
              value={formValues.email}
              onChangeText={(value) => handleChange("email", value)}
              error={formErrors.email}
            />
          </>
        );
      case 1:
        return (
          <>
            <InputField
              label="UserName"
              placeholder="Enter your username"
              value={formValues.username}
              onChangeText={(value) => handleChange("username", value)}
              error={formErrors.username}
            />

            <InputField
              label="Password"
              placeholder="Enter your password"
              secureEntry={true}
              value={formValues.password}
              onChangeText={(value) => handleChange("password", value)}
              error={formErrors.password}
            />

            <InputField
              label="Phone Number"
              placeholder="Enter your phone number"
              keyboardType="phone-pad"
              value={formValues.phone}
              onChangeText={(value) => handleChange("phone", value)}
              error={formErrors.phone}
            />
          </>
        );
      case 2:
        return (
          <>
            <Text style={{ marginVertical: 10, fontSize: 20 }}>
              Who are you?
            </Text>
            <Picker
              selectedValue={formValues.role}
              onValueChange={(itemValue) => handleChange("role", itemValue)}
            >
              <Picker.Item label="Select Role" value="" />
              <Picker.Item label="Tenant" value="Tenant" />
              <Picker.Item label="Host" value="Host" />
            </Picker>
            {formErrors.role && (
              <Text style={style.errorMessgae}>{formErrors.role}</Text>
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
                  formValues.avatar_user.uri
                    ? { uri: formValues.avatar_user.uri }
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
          <View>
            <Text style={style.Step}>{steps[currentStep]}</Text>
            {renderFormFields()}
            <View style={style.btnAction}>
              <TouchableOpacity
                onPress={handlePrev}
                disabled={currentStep === 0}
                style={[style.btnAction_content]}
              >
                <Text style={{ color: "white" }}>Back</Text>
              </TouchableOpacity>

              {currentStep === steps.length - 1 ? (
                <TouchableOpacity onPress={handleRegister}>
                  <Text>Create an account</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    if (validateForm()) {
                      handleNext();
                    }
                  }}
                  style={style.btnAction_content}
                >
                  <Text style={{ color: "white" }}>
                    {currentStep === steps.length - 1 ? "Save" : "Next"}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default SignUp;
