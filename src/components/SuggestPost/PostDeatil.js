// PostDetail.js
import React, { useEffect, useState } from "react";
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
import InputField from "../InputFields/InputField";
import { styleFields } from "../InputFields/InputFieldStyle";
import CommentPosts from "../Comment/CommentPots";
import { commentAccommodation } from "../../Redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import { authApi, endpoint } from "../../Services/Config/Api";
import Comment from "../Comment/Comment";
const PostDetail = ({ route }) => {
  const auth = useSelector((state) => state?.auth?.currentUser);
  const { item } = route.params;
  const navigation = useNavigation();
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const [comment, setComment] = useState([]);
  const dispatch = useDispatch();
  const formatToVND = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };
  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };
  const hanlerComment = async (commentAccommodationId) => {
    const form = new FormData();
    const newComment = {
      text: commentText,
    };
    form.append("text", newComment.text);
    await commentAccommodation(
      dispatch,
      auth?.access_token,
      form,
      commentAccommodationId
    );
    setCommentText("");
  };
  const makePhoneCall = () => {
    const phoneNumber = item.owner.phone;
    const phoneUrl = `tel:${phoneNumber}`;

    if (Linking.canOpenURL(phoneUrl)) {
      Linking.openURL(phoneUrl);
    } else {
      console.error("Phone call is not supported on this device.");
    }
  };
  useEffect(() => {
    const getAccommodationComment = async () => {
      const res = await authApi(auth?.access_token).get(
        endpoint.getcomment_accommodation(item?.id)
      );
      setComments(res.data);
    };
    getAccommodationComment();
  }, []);
  console.log("commment", comments);
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
          {item.image && item.image.length > 0 ? (
            <SliderBox
              images={item.image.map((img) => img.image)}
              ImageComponentStyle={{
                width: "100%",
              }}
              style={{ height: 350 }}
            />
          ) : (
            <Text>No images available</Text>
          )}
          <View style={postStyle.postDetail}>
            <View style={postStyle.titlecol}>
              <Text
                style={[StyleDefault.FontSizeMedium, { fontWeight: "500" }]}
              ></Text>
              <View style={{ flexDirection: "row", gap: 5 }}>
                <Location size={24} color="#697689" />
                <Text
                  style={[
                    StyleDefault.FontSizeMedium,
                    { textDecorationLine: "underline" },
                  ]}
                >
                  {item.address} {item.city} {item.district}
                </Text>
              </View>
              <View style={StyleDefault.flexBoxRow}>
                <House color="#697689" />
                <Text style={StyleDefault.FontSizeMedium}>Phòng trọ</Text>
              </View>
              <View style={[postStyle.onwerPost, SHADOWS.small]}>
                <View style={StyleDefault.flexBoxRow}>
                  <Image
                    source={{ uri: item.owner.avatar_user }}
                    width={50}
                    height={50}
                    borderRadius={50}
                    resizeMode="cover"
                  />
                  <View>
                    <Text style={StyleDefault.FontSizeMedium}>
                      {item.owner.first_name}
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
                  value={commentText}
                  onChangeText={(text) => setCommentText(text)}
                  OnPressIncon={() => hanlerComment(item.id)}
                />
                <Comment />
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
                    {item.description}
                  </Text>
                  {item?.description?.length > 100 &&
                    item?.description !== null && (
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
              {formatToVND(item.rent_cost)}
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
