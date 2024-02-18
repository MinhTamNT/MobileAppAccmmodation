import { View, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { styleTab } from "./TabStyle";
import { Ionicons } from "@expo/vector-icons";
import ModalPost from "../../Modal/ModalPost";
const TabViewPost = () => {
  const [isModalPost, setModalPost] = useState(false);
  const handlerPost = () => {
    setModalPost(!isModalPost);
  };
  return (
    <View style={styleTab.container}>
      <TouchableOpacity style={styleTab.btnCreatePost} onPress={handlerPost}>
        <Ionicons name="create-outline" size={25} color="white" />
      </TouchableOpacity>
      {isModalPost && <ModalPost setModalPost={setModalPost} />}
    </View>
  );
};
const style = StyleSheet.create({});
export default TabViewPost;
