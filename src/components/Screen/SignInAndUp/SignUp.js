import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { User, Lock, Call, Edit, Next, Previous } from "iconsax-react-native";
import { Fontisto } from "react-native-vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { Dropdown } from "react-native-element-dropdown";
import { style } from "./SignInAndUpStyle";
import { useNavigation } from "@react-navigation/native";
import InputField from "../../InputFields/InputFields";

const SignUp = () => {
  const data = [
    { label: "HOST", value: "1" },
    { label: "TENANT", value: "2" },
  ];

  const navigation = useNavigation();
  const [value, setValue] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [isFocus, setIsFocus] = useState(false);
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

  const renderLabel = () =>
    (value || isFocus) && (
      <Text style={[style.label, isFocus && { color: "blue" }]}>
        Who are you ?
      </Text>
    );

  const nextStep = () => setCurrentStep((prevStep) => prevStep + 1);
  const prevStep = () => setCurrentStep((prevStep) => prevStep - 1);

  const handlerNavigate = () => navigation.navigate("Register");

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      alert("Permission Denied");
    } else {
      const result = await ImagePicker.launchImageLibraryAsync();

      if (!result.canceled) {
        change("avatar", result.assets[0]);
      }
    }
  };

  const register = async () => {
    setLoading(true);

    const form = new FormData();
    for (const key in user) {
      if (key === "avatar") {
        form.append(key, {
          uri: user[key].uri,
          name: user[key].fileName,
          type: user[key].type,
        });
      } else {
        form.append(key, user[key]);
      }
    }

    try {
      const res = await axios.post(
        "https://thanhduong.pythonanywhere.com/users/",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.info(res.data);
    } catch (ex) {
      console.error(ex);
    } finally {
      setLoading(false);
    }
  };

  const change = (field, value) => {
    setUser((current) => ({ ...current, [field]: value }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <View>
            <View style={style.content_image}>
              <Image
                source={require("../../../assets/image/sigup.png")}
                style={style.image}
              />
            </View>
            <Text style={style.text_login}>Create new account</Text>
            <View>
              <InputField
                label={"Enter your First Name"}
                icon={
                  <User size="24" color="#697689" style={{ marginRight: 5 }} />
                }
                onChangeText={(firstName) => change("first_name", firstName)}
              />
              <InputField
                label={"Enter your Last Name"}
                icon={
                  <User size="24" color="#697689" style={{ marginRight: 5 }} />
                }
                onChangeText={(lastName) => change("last_name", lastName)}
              />
              <InputField
                label={"Enter your email"}
                icon={
                  <Fontisto
                    name="email"
                    size={24}
                    color="#697689"
                    style={{ marginRight: 5 }}
                  />
                }
                onChangeText={(email) => change("email", email)}
                keyboardType={"email-address"}
              />
              <View style={style.btn_next}>
                <TouchableOpacity style={style.btnAction} onPress={nextStep}>
                  <Text>Next</Text>
                  <Next size="32" color="#ff8a65" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        );
      case 2:
        return (
          <View>
            <View style={style.content_image}>
              <Image
                source={require("../../../assets/image/sigup.png")}
                style={style.image}
              />
            </View>
            <Text style={style.text_login}>Enter your information</Text>
            <InputField
              label={"Enter your username"}
              icon={
                <User size="24" color="#697689" style={{ marginRight: 5 }} />
              }
              onChangeText={(username) => change("username", username)}
            />

            <InputField
              label={"Enter your Password"}
              icon={
                <Lock size="24" color="#697689" style={{ marginRight: 5 }} />
              }
              inputType="password"
              onChangeText={(password) => change("password", password)}
            />
            <InputField
              label={"Enter your Confirm Password"}
              icon={
                <Lock size="24" color="#697689" style={{ marginRight: 5 }} />
              }
              inputType="password"
              onChangeText={(confirmPassword) =>
                change("confirm_password", confirmPassword)
              }
            />
            <View style={style.btn_next}>
              <TouchableOpacity style={style.btnAction} onPress={prevStep}>
                <Previous size="32" color="#ff8a65" />
                <Text>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity style={style.btnAction} onPress={nextStep}>
                <Text>Next</Text>
                <Next size="32" color="#ff8a65" />
              </TouchableOpacity>
            </View>
          </View>
        );
      case 3:
        return (
          <View>
            <View style={style.content_image}>
              <Image
                source={require("../../../assets/image/sigup.png")}
                style={style.image}
              />
            </View>
            <Text style={style.text_login}>Enter your information</Text>
            <InputField
              label={"Enter your phone number"}
              icon={
                <Call size="24" color="#697689" style={{ marginRight: 5 }} />
              }
              keyboardType={"phone-pad"}
              onChangeText={(phoneNumber) =>
                change("phone_number", phoneNumber)
              }
            />
            <View style={style.containerDown}>
              {renderLabel()}
              <Dropdown
                style={style.dropdown}
                placeholderStyle={style.placeholderStyle}
                selectedTextStyle={style.selectedTextStyle}
                inputSearchStyle={style.inputSearchStyle}
                iconStyle={style.iconStyle}
                data={data}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? "Who are you" : "..."}
                searchPlaceholder="Search..."
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={(item) => {
                  setValue(item.value);
                  setIsFocus(false);
                }}
              />
            </View>
            <View style={style.btn_next}>
              <TouchableOpacity style={style.btnAction} onPress={prevStep}>
                <Previous size="32" color="#ff8a65" />
                <Text>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity style={style.btnAction} onPress={nextStep}>
                <Text>Next</Text>
                <Next size="32" color="#ff8a65" />
              </TouchableOpacity>
            </View>
          </View>
        );
      case 4:
        return (
          <>
            <View style={style.content_image}>
              <Image
                source={require("../../../assets/image/sigup.png")}
                style={style.image}
              />
            </View>

            <View style={[style.content_image, { position: "relative" }]}>
              <TouchableOpacity onPress={pickImage}>
                <Image
                  source={
                    user.avatar?.uri
                      ? { uri: user.avatar.uri }
                      : require("../../../assets/image/avatardefault.jpg")
                  }
                  style={style.imageAva}
                />
              </TouchableOpacity>
              <TouchableOpacity style={style.btnEdit} onPress={pickImage}>
                <Edit size="32" color="#d9e3f0" />
              </TouchableOpacity>
            </View>
            <Text style={[style.title, { textAlign: "center", marginTop: 2 }]}>
              Upload Avatar
            </Text>
            <TouchableOpacity style={style.btnPrev} onPress={prevStep}>
              <AntDesign name="arrowleft" size={24} />
              <Text>Back Step</Text>
            </TouchableOpacity>
            <TouchableOpacity style={style.btn_login} onPress={register}>
              <Text style={style.login_text}>Create an account</Text>
            </TouchableOpacity>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={style.contain}>
      <ScrollView style={style.content} showsVerticalScrollIndicator={false}>
        <View>{renderStepContent()}</View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
