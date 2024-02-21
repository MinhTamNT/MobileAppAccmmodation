// PostDetail.js
import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Linking,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { postStyle } from "./PostStyle";
import { Ionicons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { SliderBox } from "react-native-image-slider-box";
import { StyleDefault } from "../StyleDeafult/StyleDeafult";

import {
  Location,
  House,
  Verify,
  Message,
  Copy,
  Call,
} from "iconsax-react-native";
import { COLOR, SHADOWS } from "../../contants";
import { useSelector } from "react-redux";
import InputField from "../InputFields/InputField";
import { styleFields } from "../InputFields/InputFieldStyle";
import CommentPosts from "../Comment/CommentPots";
const PostDetail = ({ route }) => {
  const { itemPost } = route.params;
  const user = useSelector((state) => state.user.user?.currentUser);
  const navigation = useNavigation();
  const [comments, setComments] = useState([]);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };
  const makePhoneCall = () => {
    const phoneNumber = itemPost.phone;
    Linking.openURL(`tel:${phoneNumber}`);
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View style={postStyle.detailConatiner}>
        <View style={postStyle.upperRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back-circle" size={30} />
          </TouchableOpacity>
          <TouchableOpacity>
            <EvilIcons name="share-apple" size={30} color="black" />
          </TouchableOpacity>
        </View>
        <ScrollView>
          <SliderBox
            images={itemPost.images}
            ImageComponentStyle={{
              width: "100%",
            }}
            style={{ height: 350 }}
          />
          <View style={postStyle.postDetail}>
            <View style={postStyle.titlecol}>
              <Text
                style={[StyleDefault.FontSizeMedium, { fontWeight: "500" }]}
              >
                {itemPost.title}
              </Text>
              <View style={{ flexDirection: "row", gap: 5 }}>
                <Location size={24} color="#697689" />
                <Text
                  style={[
                    StyleDefault.FontSizeMedium,
                    { textDecorationLine: "underline" },
                  ]}
                >
                  {itemPost.address} {itemPost.province} {itemPost.district}
                </Text>
              </View>
              <View style={StyleDefault.flexBoxRow}>
                <House color="#697689" />
                <Text style={StyleDefault.FontSizeMedium}>Phòng trọ</Text>
              </View>
              <View style={[postStyle.onwerPost, SHADOWS.small]}>
                <View style={StyleDefault.flexBoxRow}>
                  <Image
                    source={{ uri: user.avatar_user }}
                    width={50}
                    height={50}
                    borderRadius={50}
                    resizeMode="cover"
                  />
                  <View>
                    <Text style={StyleDefault.FontSizeMedium}>
                      {user.first_name}
                    </Text>
                    <Text style={{ color: COLOR.text_weak_color }}>
                      Liên hệ để xem nhà
                    </Text>
                  </View>
                </View>
                <View style={StyleDefault.flexBoxRow}>
                  <Verify color="#37d67a" />
                  <Text>Đã xác minh</Text>
                </View>
              </View>
              <View style={postStyle.commentPost}>
                <View style={StyleDefault.flexBoxRow}>
                  <Message color="#697689" />
                  <Text>Quick Q&A</Text>
                </View>

                <InputField
                  placeholder={"Comment the post"}
                  style={styleFields.formEdit}
                  icon={"send"}
                  OnPressIncon={() => alert("Chao")}
                />
                {comments.map((comment, index) => (
                  <View key={index}>
                    <CommentPosts comment={comment} setComments={setComments} />
                  </View>
                ))}
              </View>
              <View>
                <View
                  style={[
                    StyleDefault.flexBoxRow,
                    { paddingVertical: 5, justifyContent: "space-between" },
                  ]}
                >
                  <Text
                    style={[StyleDefault.bold700, StyleDefault.FontSizeMedium]}
                  >
                    Mô tả
                  </Text>
                  <Copy size="24" color="#697689" />
                </View>
                <View style={postStyle.contetPost}>
                  <Text
                    style={postStyle.postDescriptionCollapsed}
                    numberOfLines={showFullDescription ? 0 : 3}
                  >
                    {itemPost.description}
                  </Text>
                  {itemPost.description.length > 100 && (
                    <TouchableOpacity onPress={toggleDescription}>
                      <Text style={postStyle.postDescriptionToggle}>
                        {showFullDescription ? "See less" : "See more"}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
                <View
                  style={[
                    StyleDefault.flexBoxRow,
                    { paddingBottom: 20, justifyContent: "space-between" },
                  ]}
                >
                  <Text
                    style={[StyleDefault.bold700, StyleDefault.FontSizeMedium]}
                  >
                    Nội Thất
                  </Text>
                  <Text style={StyleDefault.FontSizeMedium}>Không có</Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={[postStyle.footerPost, SHADOWS.medium]}>
          <Text style={StyleDefault.FontSizeMedium}>Rent cost</Text>
          <View
            style={[
              StyleDefault.flexBoxRow,
              { justifyContent: "space-between" },
            ]}
          >
            <Text
              style={[
                StyleDefault.FontSizeMedium,
                { color: COLOR.bg_color_blue_200 },
              ]}
            >
              {itemPost.price}$
            </Text>
            <TouchableOpacity
              style={[StyleDefault.flexBoxRow, postStyle.btnAction]}
              onPress={makePhoneCall}
            >
              <Call color="#fff" />
              <Text style={{ color: "#fff" }}>Contact</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default PostDetail;
