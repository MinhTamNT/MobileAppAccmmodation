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
  return <View style={styleTab.container}>
    
  </View>;
};
const style = StyleSheet.create({});
export default TabViewPost;
