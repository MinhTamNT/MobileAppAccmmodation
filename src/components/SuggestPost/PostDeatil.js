// PostDetail.js
import React from "react";
import { View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PostDetail = ({ route }) => {
  const { itemPost } = route.params;
  return (
    <SafeAreaView>
      <Text>{itemPost.address}</Text>
    </SafeAreaView>
  );
};

export default PostDetail;
