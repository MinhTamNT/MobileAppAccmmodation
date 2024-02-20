import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Image,
  TextInput,
  RefreshControl,
} from "react-native";
import { styleTab } from "../TabViewUser/TabStyle";
import { Ionicons } from "@expo/vector-icons";
import ModalPost from "../../Modal/ModalPost";
import Api, { authApi, endpoint } from "../../../Services/Config/Api";
import { StyleDefault } from "../../StyleDeafult/StyleDeafult";
import { useNavigation } from "@react-navigation/native";
import _ from "lodash"; // Import lodash
import { useDispatch, useSelector } from "react-redux";
import { commentPost } from "../../../Redux/apiRequest";

const TabViewCommunities = () => {
  const [isModalPost, setModalPost] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPresent, setPostPresent] = useState([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [comments, setComments] = useState([]); // Use an array for comments
  const [commentPosts, setCommentsPosts] = useState([]);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state?.auth?.currentUser);
  const user = useSelector((state) => state?.user?.currentUser);
  const navigation = useNavigation();

  const debouncedLoadMorePosts = useCallback(
    _.debounce(() => loadMorePosts(), 500),
    []
  );

  const handlerPost = () => {
    setModalPost(!isModalPost);
  };

  const loadMorePosts = () => {
    if (!isLoadingMore && hasNextPage) {
      setIsLoadingMore(true);
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlerComment = async (postId) => {
    const form = new FormData();
    const newComment = {
      text: comments[postId] || "",
    };
    form.append("text", newComment.text);
    await commentPost(auth?.access_token, form, dispatch, postId);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await Api.get(endpoint.all_post(currentPage));
        const newPosts = res.data.results;

        if (newPosts.length > 0) {
          setPostPresent((prevPosts) => [...prevPosts, ...newPosts]);

          // Initialize comments array with empty strings for each post
          setComments((prevComments) => [
            ...prevComments,
            ...new Array(newPosts.length).fill(""),
          ]);

          if (res.data.next !== null) {
            setCurrentPage((prevPage) => prevPage + 1);
            setHasNextPage(true);
          } else {
            setHasNextPage(false);
          }
        } else {
          setHasNextPage(false);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setIsLoadingMore(false);
      }
    };

    if (hasNextPage) {
      fetchPosts();
    }
  }, [currentPage, hasNextPage]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      const res = await Api.get(endpoint.all_post(1));
      const newPosts = res.data.results;

      if (newPosts.length > 0) {
        setPostPresent(newPosts);
        setComments(new Array(newPosts.length).fill("")); // Reset comments array
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    return () => {
      debouncedLoadMorePosts.cancel();
    };
  }, [debouncedLoadMorePosts]);
  const handlerFriendPage = (idUser) => {
    if (user.username === idUser.username) {
      navigation.navigate("UserDeatil");
    } else {
      navigation.navigate("Friend", { userId: idUser });
    }
  };
  return (
    <View style={styleTab.container}>
      <TouchableOpacity style={styleTab.btnCreatePost} onPress={handlerPost}>
        <Ionicons name="create-outline" size={24} color="white" />
      </TouchableOpacity>

      {isModalPost && (
        <ModalPost
          setModalPost={setModalPost}
          setCurrentPage={setCurrentPage}
        />
      )}

      <FlatList
        data={postPresent}
        renderItem={({ item, index }) => (
          <View key={item.id} style={styleTab.postWrapper}>
            <View style={styleTab.ownerPost}>
              <TouchableOpacity
                style={StyleDefault.flexBoxRow}
                onPress={() => handlerFriendPage(item.user_post)}
              >
                <Image
                  source={{ uri: item.user_post.avatar_user }}
                  style={StyleDefault.imageUserPost}
                />
                <Text>{item.user_post.username}</Text>
              </TouchableOpacity>

              <View style={styleTab.contentPost}>
                <Text>{item.caption}</Text>
                <Text>{item.description}</Text>
                <View style={{ flexDirection: "row" }}>
                  {item.image.map((imageObj, index) => (
                    <Image
                      key={index}
                      source={{ uri: imageObj.image }}
                      style={{ width: 100, height: 100, marginRight: 10 }}
                    />
                  ))}
                </View>
                <View style={styleTab.addCommentContainer}>
                  <TextInput
                    style={styleTab.commentInput}
                    placeholder="Add a comment..."
                    value={comments[item.id]}
                    onChangeText={(text) =>
                      setComments((prevComments) => {
                        const updatedComments = [...prevComments];
                        updatedComments[item.id] = text;
                        return updatedComments;
                      })
                    }
                    placeholderTextColor={"#333"}
                  />
                  <TouchableOpacity
                    style={{ position: "absolute", right: 12, top: 20 }}
                    onPress={() => handlerComment(item.id)}
                  >
                    <Ionicons name="send" size={20} color="#697689" />
                  </TouchableOpacity>
                </View>
                <View></View>
              </View>
            </View>
          </View>
        )}
        onEndReached={debouncedLoadMorePosts}
        onEndReachedThreshold={0.1}
        ListFooterComponent={() =>
          isLoadingMore && hasNextPage ? (
            <ActivityIndicator size="small" color="#0000ff" />
          ) : null
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

export default TabViewCommunities;
