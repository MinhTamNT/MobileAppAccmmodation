import { View, Text, Image, Linking, Platform } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { StyleDefault } from "../../StyleDeafult/StyleDeafult";
import { TouchableOpacity } from "react-native-gesture-handler";
import { friendStyle } from "./friendProfileStyle";
import { useNavigation } from "@react-navigation/native";
import { COLOR } from "../../../contants";
import { Message } from "iconsax-react-native";
import { followUser } from "../../../Redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import { authApi, endpoint } from "../../../Services/Config/Api";
const FriendProfile = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [following, setFollowing] = useState(false);
  const [isFollow, setFollow] = useState(false);
  const { userId } = route?.params;
  const auth = useSelector((state) => state?.auth?.currentUser);
  const handlerFollowUser = async () => {
    await followUser(auth?.access_token, userId.username, dispatch);
    Platform.OS === "ios";
    setFollow(true);
  };
  const handleCall = () => {
    if (userId?.phone) {
      const phoneNumber = `tel:${userId.phone}`;
      Linking.openURL(phoneNumber);
    }
  };
  useEffect(() => {
    const getFollowingUser = async () => {
      try {
        const res = await authApi(auth?.access_token).get(
          endpoint["following"]
        );
        setFollowing(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getFollowingUser();
  }, []);
  const fileter = following.following.includes(userId.id);
  console.log(fileter);
  return (
    <View style={friendStyle.wrapper}>
      <View style={friendStyle.upper}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="leftcircle" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <Image
        source={{ uri: userId?.avatar_user }}
        style={friendStyle.friendImage}
      />
      <View style={friendStyle.wrapper_content}>
        <View style={friendStyle.introduce}>
          <View
            style={{
              alignItems: "flex-end",
              flexDirection: "row",
              justifyContent: "flex-end",
              gap: 10,
            }}
          >
            <TouchableOpacity
              style={[friendStyle.btnFollowing, StyleDefault.flexBoxRow]}
              onPress={() => navigation.navigate("ChatRoom", { userId })}
            >
              <Message size="14" color="white" />
              <Text style={{ color: "white" }}>Message</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                fileter ? friendStyle.btnFollowing : friendStyle.btnFollow
              }
              onPress={handlerFollowUser}
            >
              <Text style={{ color: "white" }}>
                {fileter ? "Following" : "Follow"}
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text
              style={[
                StyleDefault.FontSizeLarge,
                { marginBottom: 10, color: COLOR.text_weak_color },
              ]}
            >
              Contact Info
            </Text>
            <Text style={[StyleDefault.FontSizeMedium, { marginBottom: 10 }]}>
              Full Name: {userId?.last_name} {userId?.first_name}
            </Text>
            <Text style={[StyleDefault.FontSizeMedium, { marginBottom: 10 }]}>
              Role: {userId?.role}
            </Text>
            <TouchableOpacity onPress={handleCall}>
              <Text style={[StyleDefault.FontSizeMedium, { marginBottom: 10 }]}>
                Phone: {userId?.phone}
              </Text>
            </TouchableOpacity>
            <Text style={[StyleDefault.FontSizeMedium, { marginBottom: 10 }]}>
              Email: {userId?.email}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default FriendProfile;
