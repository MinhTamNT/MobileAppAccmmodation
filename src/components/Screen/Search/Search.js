import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Animated,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SearchStyles } from "./SearchStyle";
import { AntDesign } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { COLOR } from "../../../contants";

import SuggestPost from "../../SuggestPost/SuggestPost";
const Search = () => {
  const scrollX = new Animated.Value(0);

  const diffClampScrollY = Animated.diffClamp(scrollX, 0, 50);

  const headerHeight = diffClampScrollY.interpolate({
    inputRange: [0, 70],
    outputRange: [70, 0],
    extrapolate: "clamp",
  });

  const headerHeight_translateY = diffClampScrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, -100],
    extrapolate: "clamp",
  });

  const headerOpacity = diffClampScrollY.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });
  return (
    <SafeAreaView style={SearchStyles.safeAreaView}>
      <StatusBar barStyle={"light-content"} />
      <Animated.View
        style={[
          SearchStyles.header,
          {
            height: headerHeight,
            transform: [{ translateY: headerHeight_translateY }],
            opacity: headerOpacity,
          },
        ]}
      >
        <View style={SearchStyles.header_content}>
          <TouchableOpacity>
            <AntDesign name="left" size={24} color={COLOR.gray} />
          </TouchableOpacity>
          <TextInput
            placeholder="Enter your address"
            style={SearchStyles.InpuStyle}
            placeholderTextColor={"#333"}
          />
          <AntDesign name="qrcode" size={24} color="black" />
        </View>
        <View style={SearchStyles.header_action}>
          <TouchableOpacity
            style={SearchStyles.actionProvince}
            onPress={() => {
              alert("Choose Province");
            }}
          >
            <EvilIcons
              name="location"
              size={24}
              color={COLOR.bg_color_blue_200}
            />
            <Text style={{ color: COLOR.bg_color_blue_200 }}>
              Select Province/City
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={SearchStyles.actionDistrict}
            onPress={() => {
              alert("Choose District");
            }}
          >
            <Text>Select district</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
      <Animated.ScrollView
        style={SearchStyles.scrollView}
        showsVerticalScrollIndicator={false}
        bounces={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollX } } }],
          { useNativeDriver: false }
        )}
      >
        <SuggestPost />
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

export default Search;
