import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Image,
} from "react-native";
import { styleTab } from "../TabViewUser/TabStyle";
import { Ionicons } from "@expo/vector-icons";
import ModalPost from "../../Modal/ModalPost";
import Api, { endpoint } from "../../../Services/Config/Api";
import { RefreshControl } from "react-native";
import { StyleDefault } from "../../StyleDeafult/StyleDeafult";
import Swiper from "react-native-swiper";

const TabViewCommunities = () => {
  const [isModalPost, setModalPost] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPresent, setPostPresent] = useState([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);

  const handlerPost = () => {
    setModalPost(!isModalPost);
  };

  const loadMorePosts = () => {
    if (!isLoadingMore && hasNextPage) {
      setIsLoadingMore(true);
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await Api.get(endpoint.all_post(currentPage));
        const newPosts = res.data.results;

        if (newPosts.length > 0) {
          setPostPresent((prevPosts) => [...prevPosts, ...newPosts]);

          if (res.data.next !== null) {
            setCurrentPage((prevPage) => prevPage + 1);
            setHasNextPage(true);
            setIsLoadingMore(true);
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
      if (newPosts.length > 0 && res.data.next !== null) {
        setPostPresent(newPosts);
        setCurrentPage((perv) => perv + 1);
        setHasNextPage(true);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setRefreshing(false);
    }
  }, []);

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
              <View style={StyleDefault.flexBoxRow}>
                <Image
                  source={{ uri: item.user_post.avatar_user }}
                  style={StyleDefault.imageUserPost}
                />
                <Text>{item.user_post.username}</Text>
              </View>
            
              <View style={styleTab.contentPost}>
                <Text>{item.caption}</Text>
                <Text>{item.description}</Text>
                {item.image.length > 0 && (
                  <Swiper style={{ height: 200 }}>
                    {item.image.map((imageObj, index) => (
                      <Image
                        key={index}
                        source={{ uri: imageObj.image }}
                        style={{ flex: 1 }}
                        resizeMode="cover"
                      />
                    ))}
                  </Swiper>
                )}
                
              </View>
            </View>
          </View>
        )}
        onEndReached={loadMorePosts}
        onEndReachedThreshold={0.1}
        ListFooterComponent={() =>
          isLoadingMore && <ActivityIndicator size="small" color="#0000ff" />
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

export default TabViewCommunities;
