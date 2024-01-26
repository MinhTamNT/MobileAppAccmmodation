import { View, Text, Image, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { style } from "./HomeStyle";
import { Feather } from "@expo/vector-icons";
import { COLOR } from "../../../contants";
import { Notification } from "iconsax-react-native";
import Carousel from "../../Carousel/Carousel";
import InputField from "../../InputFields/InputFields";
const HomeScreen = () => {
  const user = {
    name: "Nguyễn Sinh Hùng",
    profile: require("../../../assets/image/avatardefault.jpg"),
    address: "Q.12 TP.Hồ Chí Minh",
  };
  return (
    <SafeAreaView style={style.container}>
      <View style={style.content_header}>
        <View style={style.header_title}>
          <View style={style.title_hello}>
            <Text style={style.text_title}>Welcome back</Text>
            <Text style={style.text_title}>{user.name}</Text>
          </View>
          <View style={style.address}>
            <Feather name="map-pin" size={12} color={COLOR.text_weak_color} />
            <Text style={{ color: COLOR.text_weak_color }}>{user.address}</Text>
          </View>
        </View>
        <View style={style.header_action}>
          <Notification size="24" color="#697689" />
          <Image
            source={require("../../../assets/image/avatardefault.jpg")}
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
