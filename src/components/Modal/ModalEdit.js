import {
  View,
  Text,
  Modal,
  Image,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ModalStyle } from "./ModalStyle";
import { StyleDefault } from "../StyleDeafult/StyleDeafult";
import { Edit } from "iconsax-react-native";
import { styleFields } from "../InputFields/InputFieldStyle";
import { AntDesign } from "@expo/vector-icons";
import { updateUser } from "../../Redux/apiRequest";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import InputField from "../InputFields/InputField";
const ModalEdit = (prop) => {
  const { setVissable } = prop;
  const user = useSelector((state) => state.user?.user.currentUser);
  const [firtsName, setFirstName] = useState(user?.first_name);
  const [lastName, setLastName] = useState(user?.last_name);
  const [email, setEmail] = useState(user?.email);
  const [username, setUsername] = useState(user?.username);
  const [phone, setPhone] = useState(user?.phone);
  const [avatar_user, setAvatar] = useState(user?.avatar_user);
  const auth = useSelector((state) => state.auth?.login.currentUser);
  const dispatch = useDispatch();

  const pickerImage = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        alert("Permission Denied");
      } else {
        const result = await ImagePicker.launchImageLibraryAsync();

        if (!result.canceled) {
          const uri = result.assets[0]?.uri;

          if (uri) {
            try {
              const base64 = await FileSystem.readAsStringAsync(uri, {
                encoding: FileSystem.EncodingType.Base64,
              });

              setAvatar(`data:image/jpeg;base64,${base64}`);
            } catch (readError) {
              console.error("Error reading image as base64:", readError);
            }
          } else {
            console.log("Invalid avatar_user data:", result);
          }
        }
      }
    } catch (error) {
      console.error("Error picking image:", error);
    }
  };
  const handlerUpdate = () => {
    const newUser = {
      first_name: firtsName,
      last_name: lastName,
      email: email,
      username: username,
      phone: phone,
      avatar_user: avatar_user,
    };
    console.log(newUser);
    updateUser(user?.id, auth?.access_token, newUser, dispatch);
    setVissable(false);
    ToastAndroid.show("Update successfully", ToastAndroid.SHORT);
  };

  const handlerCloseEdit = () => {
    setVissable(false);
    ToastAndroid.show("Cancel Update", ToastAndroid.SHORT);
  };

  return (
    <Modal animationType="slide">
      <View style={ModalStyle.wrapperEdit}>
        <View style={ModalStyle.actionEdit}>
          <TouchableOpacity onPress={handlerCloseEdit}>
            <AntDesign name="close" size={24} color="#697689" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handlerUpdate}>
            <AntDesign name="check" size={24} color="#697689" />
          </TouchableOpacity>
        </View>
        <View style={ModalStyle.headerEdit}>
          <Text style={[StyleDefault.FontSizeMedium, { fontWeight: 500 }]}>
            Edit Profile
          </Text>
        </View>
        <View style={{ alignItems: "center", position: "relative" }}>
          <TouchableOpacity onPress={pickerImage}>
            <Image
              source={{ uri: avatar_user }}
              width={120}
              height={120}
              resizeMode="cover"
              style={{ borderRadius: 50 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ position: "absolute", right: 130, bottom: 0 }}
            onPress={pickerImage}
          >
            <Edit color="#d9e3f0" />
          </TouchableOpacity>
        </View>
        <View>
          <InputField
            value={firtsName}
            label={"First Name"}
            style={styleFields.formEdit}
            onChangeText={(first) => setFirstName(first)}
          />
          <InputField
            value={lastName}
            label={"Last Name"}
            style={styleFields.formEdit}
            onChangeText={(text) => setLastName(text)}
          />
          <InputField
            value={username}
            label={"Username"}
            style={styleFields.formEdit}
            onChangeText={(text) => setUsername(text)}
          />
          <InputField
            value={email}
            label={"Email"}
            style={styleFields.formEdit}
            onChangeText={(text) => setEmail(text)}
          />
          <InputField
            value={phone}
            label={"Number Phone"}
            style={styleFields.formEdit}
            onChangeText={(text) => setPhone(text)}
          />
        </View>
      </View>
    </Modal>
  );
};

export default ModalEdit;
