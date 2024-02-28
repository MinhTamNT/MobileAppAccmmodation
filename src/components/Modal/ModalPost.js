import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Modal,
  StyleSheet,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  ActivityIndicator,
  ToastAndroid,
} from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { StyleDefault } from "../StyleDeafult/StyleDeafult";
import { COLOR } from "../../contants";
import { useDispatch, useSelector } from "react-redux";
import InputField from "../InputFields/InputField";
import { styleFields } from "../InputFields/InputFieldStyle";
import * as ImagePicker from "expo-image-picker";
import { createPost } from "../../Redux/apiRequest";
import * as FileSystem from "expo-file-system";

const ModalPost = ({ setModalPost, setCurrentPage }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");
  const [imagePost, setImagePost] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state?.auth?.currentUser);
  const token = auth?.access_token;

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Chúng tôi cần quyền truy cập thư viện ảnh để chọn hình ảnh.");
      }
    })();
  }, []);

  const pickerImage = async () => {
    let res = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true,
    });
    if (!res.canceled) {
      setImagePost(
        res.assets.map((item) => ({
          uri: item.uri,
          id: item.uri,
        }))
      );
    }
  };

  const renderSelectedImages = ({ item }) => (
    <Image source={{ uri: item.uri }} style={style.selectedImage} />
  );

  const handlerSubmitPost = async () => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("content", content);
      formData.append("caption", title);
      formData.append("description", description);

      imagePost.forEach((item, index) => {
        formData.append("image", {
          uri: item.uri,
          type: "image/jpeg",
          name: `image${index}.jpg`,
        });
      });

      await createPost(dispatch, formData, token);
      setCurrentPage(1);
      setModalPost(false);

      Platform.OS === "ios"
        ? alert("Create Post Success")
        : ToastAndroid.show("create the post success", ToastAndroid.SHORT);
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal animationType="slide">
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={160}
      >
        <View style={style.container}>
          <View
            style={[
              StyleDefault.flexBoxRow,
              { justifyContent: "space-between" },
            ]}
          >
            <TouchableOpacity onPress={() => setModalPost(false)}>
              <Ionicons name="arrow-back-circle" size={32} color="black" />
            </TouchableOpacity>
            <View style={StyleDefault.flexBoxRow}>
              <AntDesign name="ellipsis1" size={32} color="black" />
              <TouchableOpacity
                style={style.actionPost}
                onPress={handlerSubmitPost}
                disabled={loading} 
              >
                <Text style={{ color: "white" }}>Post</Text>
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView>
            <InputField
              style={styleFields.formCaption}
              placeholder={"Title"}
              value={title}
              onChangeText={(title) => setTitle(title)}
            />
            <Text style={StyleDefault.FontSizeMedium}>Content The Post</Text>
            <InputField
              style={styleFields.inputNoBackGround}
              placeholder={"Specific location"}
              value={content}
              onChangeText={(content) => setContent(content)}
            />
            {imagePost.length > 0 && (
              <FlatList
                data={imagePost}
                keyExtractor={(item) => item.id}
                renderItem={renderSelectedImages}
                horizontal
                showsHorizontalScrollIndicator={false}
              />
            )}
            <View style={style.textAreaContainer}>
              <TextInput
                style={style.textArea}
                underlineColorAndroid="transparent"
                placeholder="Body Text (optional)"
                value={description}
                onChangeText={(description) => setDescription(description)}
                placeholderTextColor={COLOR.text_weak_color}
                numberOfLines={10}
                multiline={true}
              />
            </View>
          </ScrollView>
        </View>
        <View style={style.footer}>
          <View style={StyleDefault.flexBoxRow}>
            <TouchableOpacity onPress={pickerImage}>
              <AntDesign name="picture" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity>
              <AntDesign name="link" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        {loading && (
          <View style={style.loadingOverlay}>
            <ActivityIndicator size="large" color={COLOR.bg_color_blue_200} />
          </View>
        )}
      </KeyboardAvoidingView>
    </Modal>
  );
};

const style = StyleSheet.create({
  container: {
    marginTop: 50,
    marginHorizontal: 16,
  },
  actionPost: {
    backgroundColor: COLOR.bg_color_blue_200,
    marginRight: 12,
    padding: 12,
    borderRadius: 20,
  },
  textAreaContainer: {
    marginTop: 12,
    borderColor: COLOR.text_weak_color,
    padding: 5,
  },
  textArea: {
    height: 350,
    justifyContent: "flex-start",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 50,
    left: 12,
    backgroundColor: "#fff",
    borderTopRightRadius: 10,
    padding: 10,
    borderTopLeftRadius: 10,
  },
  selectedImage: {
    width: 200,
    height: 200,
    marginTop: 20,
    marginLeft: 10,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ModalPost;
