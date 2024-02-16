import React, { useState, useRef } from "react";
import {
  View,
  Image,
  Text,
  Dimensions,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { postStyle } from "./PostStyle";
import { StyleDefault } from "../StyleDeafult/StyleDeafult";
import { Feather } from "@expo/vector-icons"; // Make sure to import Feather
import { COLOR } from "../../contants";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

export const Item = ({ item }) => {
  const flatListRef = useRef(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigation = useNavigation();
  const handleScroll = (event) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / width);
    setCurrentImageIndex(index);
  };

  const scrollToIndex = (index) => {
    flatListRef.current.scrollToIndex({ index, animated: true });
  };
  const navigateToPostDetail = (item) => {
    navigation.navigate("PostDeatil", { itemPost: item });
  };
  return (
    <View style={postStyle.posItem}>
      <FlatList
        ref={flatListRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={200}
        data={item.images}
        keyExtractor={(image, index) => index.toString()}
        renderItem={({ item: image, index }) => (
          <Image
            key={index.toString()}
            source={{ uri: image.uri }}
            style={[
              postStyle.image,
              { width, height: 200, resizeMode: "cover" },
            ]}
          />
        )}
      />
      <TouchableOpacity onPress={() => navigateToPostDetail(item)}>
        <View style={postStyle.detail}>
          <View
            style={{ justifyContent: "space-between", flexDirection: "row" }}
          >
            <Text style={{ color: "white" }}>{item.address}</Text>
            <Text style={{ color: "white" }}>
              {currentImageIndex + 1} of {item.images.length} images
            </Text>
          </View>
        </View>
        <View style={postStyle.descripitonItem}>
          <View style={StyleDefault.flexBoxRow}>
            <Text style={StyleDefault.fontSizeSmail}>{item.address}</Text>
            <Text style={StyleDefault.fontSizeSmail}>{item.province}</Text>
            <Text style={StyleDefault.fontSizeSmail}>{item.district}</Text>
          </View>
          <View
            style={[
              StyleDefault.flexBoxRow,
              { justifyContent: "space-between" },
            ]}
          >
            <Text
              style={[
                StyleDefault.fontSizeDeault,
                { color: COLOR.bg_color_blue_200 },
              ]}
            >
              {item.price}$
            </Text>
            <View style={StyleDefault.flexBoxRow}>
              <Text style={StyleDefault.fontSizeDeault}>{item.people}</Text>
              <Feather name="users" size={16} color="black" />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};
