import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { postapproved } from "./PostApprovedStyle";
import { AntDesign } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import Api, { authApi, endpointAdmin } from "../../../Services/Config/Api";
import { useDispatch, useSelector } from "react-redux";
import { verifyPost } from "../../../Redux/apiRequest";
import Toast from "react-native-toast-message";

const PostApproved = () => {
  const [postIsApproved, setPostApproved] = useState([]);
  const auth = useSelector((state) => state?.auth?.currentUser);
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();
  const [reload, setReload] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);
    try {
      const res = await Api.get(endpointAdmin["postIsApproved"]);
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
        const res = await Api.get(endpointAdmin["postIsApproved"]);
        setPostApproved(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [reload]);

  const handlerverifyPosts = async (postId) => {
    await verifyPost(auth?.access_token, dispatch, postId);
    Toast.show({
      type: "success",
      text1: "Verify successfully",
      position: "top",
    });
    setReload(!reload);
  };
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
            <View style={postapproved.buttonContainer}>
              <TouchableOpacity
                style={[postapproved.button, { backgroundColor: "#181818" }]}
                onPress={() => handlerverifyPosts(post.id)}
              >
                <Text style={postapproved.buttonText}>Accept</Text>
                <AntDesign name="checkcircleo" size={14} color="green" />
              </TouchableOpacity>
              <TouchableOpacity
                style={[postapproved.button, { backgroundColor: "#e62222" }]}
              >
                <Text style={postapproved.buttonText}>Delete</Text>
                <AntDesign name="delete" size={14} color="white" />
              </TouchableOpacity>
            </View>
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

export default PostApproved;
