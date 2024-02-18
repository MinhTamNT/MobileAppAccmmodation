import { View, Text, Modal, StyleSheet, Image, ScrollView } from "react-native";
import React from "react";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { StyleDefault } from "../StyleDeafult/StyleDeafult";
import { COLOR } from "../../contants";
import { useSelector } from "react-redux";
import InputField from "../InputFields/InputField";
import { styleFields } from "../InputFields/InputFieldStyle";

const ModalPost = ({ setModalPost }) => {
  return (
    <Modal animationType="slide">
      <View style={style.conatiner}>
        <View
          style={[StyleDefault.flexBoxRow, { justifyContent: "space-between" }]}
        >
          <TouchableOpacity onPress={() => setModalPost(false)}>
            <Ionicons name="arrow-back-circle" size={32} color="black" />
          </TouchableOpacity>
          <View style={StyleDefault.flexBoxRow}>
            <AntDesign name="ellipsis1" size={32} color="black" />
            <TouchableOpacity style={style.actionPost}>
              <Text style={{ color: "white" }}>Post</Text>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView>
          <InputField style={styleFields.formCaption} placeholder={"Tittle"} />
          <Text style={StyleDefault.FontSizeMedium}>Content The Post</Text>
          <View style={style.textAreaContainer}>
            <TextInput
              style={style.textArea}
              underlineColorAndroid="transparent"
              placeholder="Body Text (optional)"
              placeholderTextColor={COLOR.text_weak_color}
              numberOfLines={10}
              multiline={true}
            />
          </View>
        </ScrollView>
      </View>
      <View style={style.footer}>
        <View style={StyleDefault.flexBoxRow}>
          <TouchableOpacity>
            <AntDesign name="picture" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity>
            <AntDesign name="link" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
const style = StyleSheet.create({
  conatiner: {
    marginTop: 50,
    marginHorizontal: 16,
  },
  actionPost: {
    backgroundColor: COLOR.bg_color_blue_200,
    marginRight: 12,
    padding: 12,
    borderRadius: 20,
  },
  titleCaption: {
    backgroundColor: COLOR.bg_color_blue_200,
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
    bottom: 20,
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderTopRightRadius: 10,
    padding: 10,
    borderTopLeftRadius: 10,
  },
});
export default ModalPost;
