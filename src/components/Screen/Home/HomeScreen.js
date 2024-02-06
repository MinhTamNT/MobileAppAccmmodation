import { View, Text, Image, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { style } from "./HomeStyle";
import { Feather } from "@expo/vector-icons";
import { COLOR } from "../../../contants";
import { Notification } from "iconsax-react-native";
import Carousel from "../../Carousel/Carousel";
import InputField from "../../InputFields/InputFields";
import { TouchableOpacity } from "react-native-gesture-handler";
import { NotiStyle } from "../Notification/NotificationStyle";
import { useSelector } from "react-redux";
const HomeScreen = ({ route, navigation }) => {
  const currentUser = useSelector((state) => state?.auth?.currentUser);

  const handlerNavigationNotifi = () => {
    navigation.navigate("Notification");
  };
  const notificationCount = route?.params?.notificationCount;

  return (
    <SafeAreaView style={style.container}>
      <View style={style.content_header}>
        <View style={style.header_title}>
          <View style={style.title_hello}>
            <Text style={style.text_title}>Welcome back</Text>
            <Text style={style.text_title}>
              {currentUser.last_name} {currentUser.first_name}
            </Text>
          </View>
          <View style={style.address}>
            <Feather name="map-pin" size={12} color={COLOR.text_weak_color} />
            <Text style={{ color: COLOR.text_weak_color }}>Quận 12</Text>
          </View>
        </View>
        <View style={style.header_action}>
          <View style={{ position: "relative" }}>
            <TouchableOpacity onPress={handlerNavigationNotifi}>
              <Notification size="24" color="#697689" />
              {notificationCount > 0 && (
                <View style={NotiStyle.notificationBadge}>
                  <Text style={NotiStyle.notificationText}>
                    {notificationCount}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
          <Image
            source={{ uri: currentUser.avatar_user }}
            style={style.image}
          />
        </View>
      </View>
      <ScrollView>
        <Carousel />

        <View style={style.action_search}>
          <InputField
            label="Find rooms quickly"
            style={style.inputSearch}
            placeholder="Enter your keyword"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
