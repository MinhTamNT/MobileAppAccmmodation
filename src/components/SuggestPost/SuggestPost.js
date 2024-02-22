import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { postStyle } from "./PostStyle";
import { Item } from "./Item";
import { postData } from "./SuggestPostData";
import { StyleDefault } from "../StyleDeafult/StyleDeafult";
import { AntDesign } from "@expo/vector-icons";
import { Sort } from "iconsax-react-native";
import ModalSort from "../Modal/ModalSort/ModalSort";
import { useNavigation } from "@react-navigation/native";
import { COLOR } from "../../contants";
import ModalPirceRange from "../Modal/ModalPirceRange";
import { getAllAccommodation } from "../../Redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";
const SuggestPost = ({ selectedDistrict, isVissble, setVissable }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [sortOption, setSortOption] = useState(null);
  const [sortedData, setSortedData] = useState(postData);
  const disptach = useDispatch();
  const allAccomoda = useSelector(
    (state) => state?.accommodation?.allAccommodation?.accommodations
  );
  const sortData = (op) => {
    const sortedResult = [...postData].sort((a, b) =>
      op === "low" ? a.price - b.price : b.price - a.price
    );
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

    if (sortOption) {
      filteredData.sort((a, b) =>
        sortOption === "low" ? a.price - b.price : b.price - a.price
      );
    }

    setSortedData(filteredData);
  }, [selectedDistrict, sortOption]);

  const renderPostItem = (item, index) => <Item key={index} item={item} />;
  useEffect(() => {
    getAllAccommodation(disptach);
  }, [disptach]);
  console.log(allAccomoda);
  return (
    <View style={postStyle.wrapper}>
      <View style={postStyle.wrapperItem}>
        <View
          style={{ flexDirection: "row", justifyContent: "center", gap: 10 }}
        >
          <TouchableOpacity
            style={postStyle.headerAction}
            onPress={() => setModalRangPrice(!modalRangePrice)}
          >
            <Text
              style={[
                StyleDefault.FontSizeMedium,
                { color: COLOR.text_weak_color },
              ]}
            >
              Price Range
            </Text>
            <AntDesign name="down" size={12} color={COLOR.text_weak_color} />
          </TouchableOpacity>
          <TouchableOpacity style={postStyle.headerAction}>
            <Text
              style={[
                StyleDefault.FontSizeMedium,
                { color: COLOR.text_weak_color },
              ]}
            >
              Number People
            </Text>
            <AntDesign name="down" size={12} color={COLOR.text_weak_color} />
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
              <Text>Filter</Text>
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
          sortedData.map(renderPostItem)
        ) : (
          <View
            style={[
              StyleDefault.flexBoxCol,
              { justifyContent: "center", backgroundColor: "#fff" },
            ]}
          >
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
