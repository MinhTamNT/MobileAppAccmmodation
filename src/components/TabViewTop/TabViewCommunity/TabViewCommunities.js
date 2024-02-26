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
import ModalPost from "../../Modal/ModalPost";
import Api, { endpoint } from "../../../Services/Config/Api";
import { StyleDefault } from "../../StyleDeafult/StyleDeafult";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { commentPost } from "../../../Redux/apiRequest";
import moment from "moment";
import CommentPosts from "../../Comment/CommentPots";
import { COLOR } from "../../../contants";
import { AntDesign, Ionicons } from "@expo/vector-icons";

const TabViewCommunities = () => {
  const [isModalPost, setModalPost] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPresent, setPostPresent] = useState([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [comments, setComments] = useState({});
  const [commentPosts, setCommentsPosts] = useState({});
  const [refreshing, setRefreshing] = useState(false);
  const [isComment, setIsComment] = useState(false);
  const [openCommentPostId, setOpenCommentPostId] = useState(null);
  const [isloading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const auth = useSelector((state) => state?.auth?.currentUser);
  const user = useSelector((state) => state?.user?.currentUser);
  const navigation = useNavigation();

  const handlerPost = () => {
    setModalPost(!isModalPost);
  };

  const loadMorePosts = async () => {
    if (!isLoadingMore && hasNextPage) {
      setIsLoadingMore(true);
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const openComment = (postId) => {
    setIsComment(true);
    setOpenCommentPostId(postId);
  };

  const handlerComment = async (postId) => {
    const form = new FormData();
    const newComment = {
      text: comments[postId] || "",
    };
    form.append("text", newComment.text);
    await commentPost(auth?.access_token, form, dispatch, postId);
    setComments((prevComments) => {
      const updatedComments = { ...prevComments };
      updatedComments[postId] = ""; 
      return updatedComments;
    });
  };

  const handleEndReached = () => {
    if (!isLoadingMore && hasNextPage) {
      loadMorePosts();
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      setCurrentPage(1);

      const res = await Api.get(endpoint.all_post(1));
      const newPosts = res.data.results.filter(
        (post) => post.is_approved === true
      );
      setPostPresent(newPosts);

      const commentPromise = newPosts.map(async (post) => {
        const commentRes = await Api.get(endpoint.comment_of_post(post.id));
        return commentRes.data;
      });

      const commentsArray = await Promise.all(commentPromise);
      const commentsObj = Object.fromEntries(
        newPosts.map((post, index) => [post.id, commentsArray[index]])
      );

      setCommentsPosts(commentsObj);

      if (res.data.next !== null) {
        setHasNextPage(true);
      } else {
        setHasNextPage(false);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoadingMore(true);

        const res = await Api.get(endpoint.all_post(currentPage));
        const newPosts = res.data.results.filter(
          (post) => post.is_approved === true
        );

        if (newPosts.length > 0) {
          setPostPresent((prevPosts) => [...prevPosts, ...newPosts]);
          setComments((prevComments) => {
            const updatedComments = { ...prevComments };
            newPosts.forEach((post) => {
              if (!updatedComments[post.id]) {
                updatedComments[post.id] = "";
              }
            });
            return updatedComments;
          });

          const commentPromise = newPosts.map(async (post) => {
            const commentRes = await Api.get(endpoint.comment_of_post(post.id));
            return commentRes.data;
          });

          const commentsArray = await Promise.all(commentPromise);
          const commentsObj = Object.fromEntries(
            newPosts.map((post, index) => [post.id, commentsArray[index]])
          );

          setCommentsPosts((prevCommentsPosts) => ({
            ...prevCommentsPosts,
            ...commentsObj,
          }));

          if (res.data.next !== null) {
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
        setLoading(false);
      }
    };

    if (hasNextPage) {
      fetchPosts();
    }
  }, [currentPage, hasNextPage]);

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
              <View
                style={[
                  StyleDefault.flexBoxRow,
                  { justifyContent: "space-between" },
                ]}
              >
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
                <Text style={{ color: COLOR.text_weak_color }}>
                  {moment(item.created_at).fromNow()}
                </Text>
              </View>
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
                {isComment && openCommentPostId === item.id ? (
                  <View style={styleTab.addCommentContainer}>
                    <TouchableOpacity
                      style={styleTab.btnCloseActionComment}
                      onPress={() => setIsComment(false)}
                    >
                      <AntDesign name="close" size={22} color="#697689" />
                    </TouchableOpacity>
                    <TextInput
                      style={styleTab.commentInput}
                      placeholder="Add a comment..."
                      value={comments[item.id]}
                      onChangeText={(text) =>
                        setComments((prevComments) => {
                          const updatedComments = { ...prevComments };
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
                ) : (
                  <TouchableOpacity
                    style={styleTab.actionComment}
                    onPress={() => openComment(item.id)}
                  >
                    <Text
                      style={{
                        color: "white",
                        alignItems: "center",
                      }}
                    >
                      Comment Post
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
              {openCommentPostId === item.id ? (
                <CommentPosts
                  comment={commentPosts[item.id]}
                  setComments={setComments}
                  currentUserId={comments.user_comment}
                />
              ) : (
                <></>
              )}
            </View>
          </View>
        )}
        onEndReached={handleEndReached} // Use this callback for automatic loading more posts
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
