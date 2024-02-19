import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  ToastAndroid,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Yup from "yup";
import { SHADOWS } from "../../../../contants";
import { style } from "./SignUpStyle";
import { style as styleForm } from "../SignInStyle";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { registerUser } from "../../../../Redux/apiRequest";
import InputField from "../../../InputFields/InputField";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
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
  const [avatarRequired, setAvatarRequired] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (formValues.role === "Tenant" || formValues.role === "Host") {
      setAvatarRequired(true);
    } else {
      setAvatarRequired(false);
    }
  }, [formValues.role]);

  const handleNext = () => {
    if (validateForm()) {
      setCurrentStep(currentStep + 1);
    }
  };

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
    if (validateForm()) {
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
        if (
          (formValues.role === "Tenant" || formValues.role === "Host") &&
          !formValues.avatar_user.uri
        ) {
          Platform.OS === "ios"
            ? alert(`Role ${formValues.role} need avatar`)
            : ToastAndroid.show(`Role ${formValues.role} need avatar`);
          return;
        }
        await registerUser(form, dispatch, navigation);
        Toast.show({
          type: "success",
          position: "top",
          text1: "Successful the new account",
          visibilityTime: 2000,
          autoHide: true,
        });
      } catch (error) {
        console.error("Full Axios Error:", error);
      }
    }
  };

  const handleChange = (field, value) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [field]: value,
    }));
  };

  const validationSchemaStep1 = Yup.object({
    first_name: Yup.string().required("First Name is required"),
    last_name: Yup.string().required("Last Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  const validationSchemaStep2 = Yup.object({
    username: Yup.string().min(8, "Username must be at least 8 characters"),
    password: Yup.string()
      .matches(
        /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}$/,
        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character"
      )
      .required("Password is required"),
    phone: Yup.string()
      .matches(/^\d+$/, "Phone must be a number")
      .required("Phone is required"),
  });

  const validationSchemaStep3 = Yup.object({});

  const validateForm = () => {
    try {
      let validationSchema;

      switch (currentStep) {
        case 0:
          validationSchema = validationSchemaStep1;
          break;
        case 1:
          validationSchema = validationSchemaStep2;
          break;
        case 2:
          validationSchema = validationSchemaStep3;
          break;
        default:
          validationSchema = Yup.object({});
      }

      validationSchema.validateSync(formValues, { abortEarly: false });
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
            {avatarRequired && (
              <>
                <Text>Choose your avatar</Text>
                <TouchableOpacity
                  style={style.choosenFile}
                  onPress={pickerImage}
                >
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
            )}
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
          <TouchableOpacity
            style={{ marginLeft: 12 }}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-back-circle" size={30} />
          </TouchableOpacity>
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
              {currentStep !== 0 && ( // Hiển thị nút "Back" nếu không phải ở Step 0
                <TouchableOpacity
                  onPress={handlePrev}
                  disabled={currentStep === 0}
                  style={[style.btnAction_content]}
                >
                  <Text style={style.textContent}>Back</Text>
                </TouchableOpacity>
              )}

              {currentStep === steps.length - 1 ? (
                <TouchableOpacity
                  style={style.btnRegister_action}
                  onPress={handleRegister}
                >
                  <Text style={{ textAlign: "center",color:"white" }}>Create an account</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={handleNext}
                  style={style.btnAction_content}
                >
                  <Text style={style.textContent}>
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
