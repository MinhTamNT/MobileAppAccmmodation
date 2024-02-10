import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { postStyle } from "./PostStyle";
import { Item } from "./Item";
import { postData } from "./SuggestPostData";
import { StyleDefault } from "../StyleDeafult/StyleDeafult";
import ModalPrice from "../Modal/ModalPrice";
import { AntDesign } from "@expo/vector-icons";
import { Sort } from "iconsax-react-native";
import { SearchStyles } from "../Screen/Search/SearchStyle";
import ModalSort from "../Modal/ModalSort/ModalSort";

const SuggestPost = (props) => {
  const { selectedProvince, selectedDistrict } = props;
  const [modalVisible, setModalVisible] = useState(false);
  const [sortOption, setSortOption] = useState(null);
  const [sortedData, setSortedData] = useState(postData);

  const sortData = (op) => {
    let sortedResult = [...postData];

    if (op === "low") sortedResult.sort((a, b) => a.price - b.price);
    else if (op === "high") sortedResult.sort((a, b) => b.price - a.price);

    setSortOption(op);
    setSortedData(sortedResult);
  };

  useEffect(() => {
    let filteredData = [...postData];

    if (selectedDistrict && selectedDistrict.district_name) {
      const selectedDistrictName = selectedDistrict.district_name.toLowerCase();
      filteredData = filteredData.filter(
        (item) =>
          item.district &&
          item.district.toLowerCase().includes(selectedDistrictName)
      );
    }

    if (sortOption === "low") filteredData.sort((a, b) => a.price - b.price);
    else if (sortOption === "high")
      filteredData.sort((a, b) => b.price - a.price);

    setSortedData(filteredData);
  }, [selectedDistrict, sortOption]);

  return (
    <View style={postStyle.wrapper}>
      <View style={postStyle.wrapperItem}>
        <View style={SearchStyles.headerAction_Select}>
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center", gap: 2 }}
            onPress={() => setVissable(!isVissble)}
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
            <Text style={{ fontSize: 18 }}>
              There are {sortedData.length} results
            </Text>
            <TouchableOpacity
              style={[StyleDefault.flexBoxRow]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text>Sort</Text>
              <Sort size="32" color="#2ccce4" />
            </TouchableOpacity>
          </View>
        </View>
        <ModalSort
          isModal={modalVisible}
          setModal={setModalVisible}
          onSort={sortData}
        />
        {sortedData.length > 0 ? (
          sortedData.map((item, index) => <Item item={item} key={index} />)
        ) : (
          <View style={[StyleDefault.flexBoxCol, { justifyContent: "center" }]}>
            <Image
              source={require("../../assets/image/notFind.gif")}
              style={{ width: 300, height: 300 }}
            />
            <Text style={[StyleDefault.FontSizeMedium, { fontWeight: "700" }]}>
              Results not found
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default SuggestPost;
