import {
  View,
  ScrollView,
  RefreshControl,
  Text,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { postapproved } from "../../SuggestPost/PostApproved/PostApprovedStyle";
import { useDispatch, useSelector } from "react-redux";
import  { authApi, endpoint } from "../../../Services/Config/Api";
const PostUser = () => {
  const [postIsApproved, setPostApproved] = useState([]);
  const auth = useSelector((state) => state?.auth?.currentUser);
  const [reload, setReload] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();
  const onRefresh = async () => {
    setRefreshing(true);
    try {
      const res = await authApi(auth?.access_token).get(endpoint["user_post"]);
      setPostApproved(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setRefreshing(false);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await authApi(auth?.access_token).get(
          endpoint["user_post"]
        );
        setPostApproved(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [reload]);
  console.log(postIsApproved);
  return (
    <ScrollView
      style={postapproved.container}
      contentContainerStyle={{ flexGrow: 1 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {postIsApproved && postIsApproved.length > 0 ? (
        postIsApproved.map((post) => (
          <View key={post.id} style={postapproved.postContainer}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <Image
                source={{ uri: post.user_post.avatar_user }}
                style={postapproved.imageUser}
              />
              <Text style={{ fontSize: 16 }}>{post.user_post.username}</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {post.image.map((image, index) => (
                <Image
                  key={index}
                  source={{ uri: image.image }}
                  style={postapproved.postImage}
                  resizeMode="cover"
                />
              ))}
            </ScrollView>
            <Text style={postapproved.postTitle}>{post.caption}</Text>
            <Text style={postapproved.postTitle}>{post.content}</Text>
            <Text style={postapproved.postContent}>{post.description}</Text>
          </View>
        ))
      ) : (
        <Text style={{ justifyContent: "center", alignItems: "center" }}>
          No approved posts found.
        </Text>
      )}
    </ScrollView>
  );
};
export default PostUser;
