import { View, Text } from "react-native";
import React from "react";
import { postStyle } from "./PostStyle";
import SuggesPostItem from "./SuggesPostItem";

const SuggestPost = () => {
  return (
    <View style={postStyle.wrapper}>
      <SuggesPostItem />
    </View>
  );
};

export default SuggestPost;
