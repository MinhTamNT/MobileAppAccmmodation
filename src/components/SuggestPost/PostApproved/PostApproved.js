import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { postapproved } from "./PostApprovedStyle";
import { postData } from "../SuggestPostData";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
const PostApproved = () => {
  const [acceptedPosts, setAcceptedPosts] = useState([]);
  const [rejectedPosts, setRejectedPosts] = useState([]);

  const handleApprove = (postId) => {
    const postToApprove = postData.find((post) => post.id === postId);
    setAcceptedPosts([...acceptedPosts, postToApprove]);
    const updatedPosts = postData.filter((post) => post.id !== postId);
    postData = updatedPosts;

    console.log(`Post ${postId} approved`);
  };

  const handleDelete = (postId) => {
    const postToDelete = postData.find((post) => post.id === postId);
    setRejectedPosts([...rejectedPosts, postToDelete]);
    const updatedPosts = postData.filter((post) => post.id !== postId);
    postData = updatedPosts;

    console.log(`Post ${postId} deleted`);
  };

  return (
    <ScrollView style={postapproved.container}>
      {postData.map((post) => (
        <View key={post.id} style={postapproved.postContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {post.images.map((image, index) => (
              <Image
                key={index}
                source={{ uri: image.uri }}
                style={postapproved.postImage}
                resizeMode="cover"
              />
            ))}
          </ScrollView>
          <Text style={postapproved.postTitle}>{post.title}</Text>
          <Text style={postapproved.postTitle}>{post.address}</Text>
          <Text style={postapproved.postContent}>{post.description}</Text>
          <View style={postapproved.buttonContainer}>
            <TouchableOpacity
              style={[postapproved.button, { backgroundColor: "green" }]}
              onPress={() => handleApprove(post.id)}
            >
              <Text style={postapproved.buttonText}>Accept</Text>
              <AntDesign name="checkcircleo" size={14} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[postapproved.button, { backgroundColor: "#e62222" }]}
              onPress={() => handleDelete(post.id)}
            >
              <Text style={postapproved.buttonText}>Delete</Text>
              <AntDesign name="delete" size={14} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default PostApproved;
