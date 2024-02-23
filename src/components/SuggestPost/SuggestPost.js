import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { postStyle } from "./PostStyle";
import { Item } from "./Item";
import { StyleDefault } from "../StyleDeafult/StyleDeafult";
import { AntDesign } from "@expo/vector-icons";
import { Sort } from "iconsax-react-native";
import ModalSort from "../Modal/ModalSort/ModalSort";
import { COLOR } from "../../contants";
import { getAllAccommodation } from "../../Redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";

const SuggestPost = ({ selectedDistrict, searchInput }) => {
  const allAccomoda = useSelector(
    (state) => state?.accommodation?.allAccommodation?.accommodations
  );
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [sortOption, setSortOption] = useState(null);
  const [sortedData, setSortedData] = useState(allAccomoda);
  const [dataLoaded, setDataLoaded] = useState(false);
  const sortData = (op) => {
    const sortedResult = [...allAccomoda].sort((a, b) => {
      const priceA = typeof a.rent_cost === "number" ? a.rent_cost : 0;
      const priceB = typeof b.rent_cost === "number" ? b.rent_cost : 0;
      return op === "low" ? priceA - priceB : priceB - priceA;
    });
    setSortOption(op);
    setSortedData([...sortedResult]);
  };
  console.log(allAccomoda);
  useEffect(() => {
    let filteredData = [...allAccomoda];

    if (selectedDistrict?.district_name) {
      const selectedDistrictName = selectedDistrict.district_name.toLowerCase();
      filteredData = filteredData.filter((item) =>
        item.district.toLowerCase().includes(selectedDistrictName)
      );
    }

    if (sortOption) {
      filteredData.sort((a, b) =>
        sortOption === "low"
          ? a.rent_cost - b.rent_cost
          : b.rent_cost - a.rent_cost
      );
    }

    if (searchInput) {
      filteredData = filteredData.filter((item) =>
        item.address.toLowerCase().includes(searchInput.toLowerCase())
      );
    }

    setSortedData(filteredData);
  }, [selectedDistrict, sortOption, searchInput]);

  useEffect(() => {
    if (!dataLoaded) {
      setDataLoaded(true);
      getAllAccommodation(dispatch);
    }
  }, [dispatch, dataLoaded]);

  const renderPostItem = (item, index) => (
    <TouchableOpacity key={index}>
      <Item item={item} />
    </TouchableOpacity>
  );

  return (
    <View style={postStyle.wrapper}>
      <View style={postStyle.wrapperItem}>
        <View
          style={{ flexDirection: "row", justifyContent: "center", gap: 10 }}
        >
          <TouchableOpacity
            style={postStyle.headerAction}
            onPress={() => setModalVisible(!modalVisible)}
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
