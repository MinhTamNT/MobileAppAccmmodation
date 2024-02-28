import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Platform,
  ToastAndroid,
  ActivityIndicator,
  ScrollView
} from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { StyleDefault } from "../StyleDeafult/StyleDeafult";
import InputField from "../InputFields/InputField";
import { styleFields } from "../InputFields/InputFieldStyle";
import { COLOR } from "../../contants";
import * as ImagePicker from "expo-image-picker";
import { TextInput } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import { createAccommodation } from "../../Redux/apiRequest";
import Toast from "react-native-toast-message";

const VND = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

const ModalRequire = ({ setModalVisible, location }) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [loading, setLoading] = useState(false); // Add the loading state
  const user = useSelector((state) => state?.user?.currentUser);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state?.auth?.currentUser);
  const tokenUser = auth?.access_token;
  const [formValue, setFormValues] = useState({
    address: "",
    city: "",
    district: "",
    number_of_people: "",
    rent_cost: VND.format(1000),
    latitude: "",
    longitude: "",
    image: [],
  });

  const handlerCreateAccommodation = async () => {
    try {
      if (user.role === "HOST" && selectedImages.length >= 3) {
        setLoading(true);

        const form = new FormData();

        for (let key in formValue) {
          if (key === "image") {
            selectedImages.forEach((image, index) => {
              form.append("image", {
                uri: image.uri,
                type: "image/jpeg",
                name: `image_${index}.jpg`,
              });
            });
          } else {
            form.append(key, formValue[key]);
          }
        }

        await createAccommodation(dispatch, form, tokenUser);
        setModalVisible(false);
        setLoading(false);

        Platform.OS === "ios"
          ? Toast.show({
              type: "success",
              visibilityTime: 2000,
              autoHide: true,
              text1: "Create Accommodation",
              text2: "Create Accommodation Successfully",
            })
          : ToastAndroid.show(
              "Create accommodation successfully",
              ToastAndroid.SHORT
            );
      } else {
        console.log("User is not a HOST or not enough images");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const change = (field, value) => {
    setFormValues((current) => {
      return { ...current, [field]: value };
    });
  };

  const removeImage = (imageId) => {
    setSelectedImages((prevImages) =>
      prevImages.filter((image) => image.id !== imageId)
    );
  };

  useEffect(() => {
    (async () => {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    })();
  }, []);

  const handleImageUpload = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        quality: 1,
        allowsMultipleSelection: true,
        base64: false,
      });

      if (!result.canceled) {
        const newImages = result.assets.map((asset) => ({
          id: asset.assetId,
          uri: asset.uri,
        }));
        setSelectedImages((prevImages) => [...prevImages, ...newImages]);
        change("image", newImages);
      }
    } catch (error) {
      console.error("Error picking an image", error);
    }
  };

  return (
    <Modal animationType="slide">
      <ScrollView>
        <View style={style.container}>
          <View
            style={[
              StyleDefault.flexBoxRow,
              { justifyContent: "space-between" },
            ]}
          >
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Ionicons name="arrow-back-circle" size={32} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              style={style.actionPost}
              onPress={handlerCreateAccommodation}
              disabled={loading}
            >
              <Text style={{ color: "black" }}>Create the accommodation</Text>
            </TouchableOpacity>
          </View>
          <View style={style.formCreate}>
            <InputField
              label={"Address"}
              value={formValue.address}
              placeholder={"Address accommodation"}
              style={styleFields.formEdit}
              onChangeText={(t) => change("address", t)}
              maxLength={100}
            />
            <InputField
              label={"City"}
              value={formValue.city}
              placeholder={"City accommodation"}
              style={styleFields.formEdit}
              onChangeText={(t) => change("city", t)}
              maxLength={100}
            />
            <InputField
              label={"District"}
              value={formValue.district}
              placeholder={"District accommodation"}
              style={styleFields.formEdit}
              onChangeText={(t) => change("district", t)}
              maxLength={100}
            />
            <View
              style={[
                StyleDefault.flexBoxRow,
                { justifyContent: "space-between" },
              ]}
            >
              <InputField
                label={"People"}
                value={formValue.number_of_people}
                placeholder={"How many people"}
                style={styleFields.inputsmall}
                onChangeText={(t) => change("number_of_people", t)}
                maxLength={3}
              />
              <View>
                <Text style={{ marginBottom: 5 }}>Cost</Text>
                <TextInput
                  style={style.customCost}
                  placeholder="Price"
                  placeholderTextColor={"#333"}
                  value={formValue.rent_cost}
                  onChangeText={(t) => change("rent_cost", t)}
                  keyboardType="numeric"
                  maxLength={12}
                />
              </View>
            </View>
            <InputField
              label={"Latitude"}
              placeholder={"Latitude"}
              style={styleFields.formEdit}
              value={formValue.latitude}
              onChangeText={(t) => change("latitude", t)}
              maxLength={100}
            />
            <InputField
              label={"Longitude"}
              placeholder={"Longitude"}
              style={styleFields.formEdit}
              value={formValue.longitude}
              onChangeText={(t) => change("longitude", t)}
              maxLength={100}
            />
            <InputField
              label={"Description"}
              placeholder={"Description (max 100 characters)"}
              style={[styleFields.formEdit, { height: 100 }]}
              value={formValue.description}
              onChangeText={(t) => change("description", t)}
              multiline
              maxLength={100}
            />
          </View>
          <View style={style.ImageAccommodation}>
            <FlatList
              data={selectedImages}
              horizontal
              bounces={false}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View>
                  <Image
                    source={{ uri: item.uri }}
                    style={style.uploadedImage}
                  />
                  <TouchableOpacity
                    style={style.closeButton}
                    onPress={() => removeImage(item.id)}
                  >
                    <Ionicons name="close-circle" size={24} color="black" />
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
        </View>
      </ScrollView>
      <View style={style.footer}>
        <View style={StyleDefault.flexBoxRow}>
          <TouchableOpacity
            style={[StyleDefault.flexBoxRow, style.btnUploadImage]}
            onPress={handleImageUpload}
            disabled={loading}
          >
            <AntDesign name="picture" size={32} color="white" />
            <Text style={{ color: "white" }}>Upload Image</Text>
          </TouchableOpacity>
        </View>
      </View>
      {loading && (
        <View style={style.loadingOverlay}>
          <ActivityIndicator size="large" color={COLOR.bg_color_blue_200} />
        </View>
      )}
    </Modal>
  );
};

const style = StyleSheet.create({
  container: {
    marginTop: 25,
    marginHorizontal: 16,
  },
  actionPost: {
    padding: 12,
    borderRadius: 20,
  },
  formCreate: {
    marginTop: 10,
  },
  footer: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    height: 60,
    backgroundColor: "#fff",
    borderTopRightRadius: 10,
    padding: 10,
    borderTopLeftRadius: 10,
  },
  btnUploadImage: {
    backgroundColor: COLOR.PRIMARY,
    padding: 5,
    borderRadius: 10,
  },
  ImageAccommodation: {
    justifyContent: "center",
    alignItems: "center",
  },
  uploadedImage: {
    width: 100,
    height: 100,
    marginVertical: 5,
    marginHorizontal: 12,
    borderRadius: 10,
  },
  closeButton: {
    position: "absolute",
    left: 20,
    top: 12,
  },
  customCost: {
    backgroundColor: COLOR.offWhite,
    marginBottom: 10,
    width: 170,
    padding: 16,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ModalRequire;
