import React, { useEffect, useState, useRef } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { postStyle } from "./PostStyle";
import { StyleDefault } from "../StyleDeafult/StyleDeafult";
import { Feather } from "@expo/vector-icons";
import { COLOR } from "../../contants";
import { useNavigation } from "@react-navigation/native";
import { SliderBox } from "react-native-image-slider-box";

export const Item = ({ item }) => {
  const navigation = useNavigation();

  const navigateToPostDetail = (item) => {
    navigation.navigate("PostDeatil", { item });
  };
  const formatToVND = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };
  return (
    <View style={postStyle.posItem}>
      <SliderBox
        images={item.image.map((img) => img.image)}
        ImageComponentStyle={{
          width: 390,
          resizeMode: "cover",
          marginRight: 25,
          marginTop: 10,
        }}
      />
      <TouchableOpacity onPress={() => navigateToPostDetail(item)}>
        <View style={postStyle.detail}>
          <View
            style={{ justifyContent: "space-between", flexDirection: "row" }}
          >
            <Text style={{ color: "white" }}>{item.address}</Text>
          </View>
        </View>
        <View style={postStyle.descripitonItem}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 2 }}>
            <Text style={StyleDefault.fontSizeSmail}>{item.city}</Text>
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
              {formatToVND(item.rent_cost)}
            </Text>
            <View style={StyleDefault.flexBoxRow}>
              <Text style={StyleDefault.fontSizeDeault}>
                {item.number_of_people}
              </Text>
              <Feather name="users" size={16} color="black" />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};
