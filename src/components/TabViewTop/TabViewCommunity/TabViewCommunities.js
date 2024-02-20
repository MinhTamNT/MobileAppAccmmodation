import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { styleTab } from "../TabViewUser/TabStyle";
import { Ionicons } from "@expo/vector-icons";
import ModalPost from "../../Modal/ModalPost";
import { useDispatch, useSelector } from "react-redux";
import { getAllPost } from "../../../Redux/apiRequest";
const TabViewCommunities = () => {
  const [isModalPost, setModalPost] = useState(false);
  const allPost = useSelector((state) => state?.post?.posts);
  const dispatch = useDispatch();
  const handlerPost = () => {
    setModalPost(!isModalPost);
  };
  useEffect(() => {
    getAllPost(dispatch);
  }, []);
  console.log(allPost);
  return (
    <View style={styleTab.container}>
      <TouchableOpacity style={styleTab.btnCreatePost} onPress={handlerPost}>
        <Ionicons name="create-outline" size={24} color="white" />
      </TouchableOpacity>
      {isModalPost && <ModalPost setModalPost={setModalPost} />}
      {allPost.length > 0 &&
        allPost.map((post, index) => <Text key={index}>{post.caption}</Text>)}
    </View>
  );
};

export default TabViewCommunities;
