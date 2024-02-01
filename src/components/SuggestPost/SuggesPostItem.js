import React, { useState } from "react";
import {
  View,
  Text,
  Dimensions,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { COLOR } from "../../contants/theme.js";
import { postStyle } from "./PostStyle";
import { postData } from "./SuggestPostData.js";
import { StyleDefault } from "../StyleDeafult/StyleDeafult.js";
import { Item } from "./Item.js";
import { SearchStyles } from "../Screen/Search/SearchStyle.js";
import ModalPrice from "../Modal/ModalPrice.js";
import { AntDesign } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { Sort } from "iconsax-react-native";
const SuggesPostItem = () => {
  const [isVissble, setVissable] = useState(false);
  return (
    <View style={postStyle.wrapperItem}>
      <View style={SearchStyles.headerAction_Select}>
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center", gap: 2 }}
          onPress={() => setVissable(!false)}
        >
          <Text style={{ fontSize: 16 }}>Price</Text>
          <AntDesign name="down" />
        </TouchableOpacity>
        <ModalPrice modalVisible={isVissble} setModalVisible={setVissable} />
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center", gap: 2 }}
        >
          <Text style={{ fontSize: 16 }}>Number people</Text>
          <AntDesign name="down" />
        </TouchableOpacity>
      </View>
      <View style={postStyle.headerItem}>
        <View style={postStyle.headerItem_content}>
          <Text style={{ fontSize: 18 }}>There are 200 results</Text>
          <TouchableOpacity style={[StyleDefault.flexBoxRow]}>
            <Text>Sort</Text>
            <Sort size="32" color="#2ccce4" />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        {postData.map((item, index) => (
          <Item item={item} key={index} />
        ))}
      </ScrollView>
    </View>
  );
};

export default SuggesPostItem;
