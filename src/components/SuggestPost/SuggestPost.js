import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { postStyle } from "./PostStyle";
import { Item } from "./Item";
import { StyleDefault } from "../StyleDeafult/StyleDeafult";
import { AntDesign } from "@expo/vector-icons";
import { Sort } from "iconsax-react-native";
import { COLOR } from "../../contants";
import { useDispatch, useSelector } from "react-redux";
import { authApi, endpoint } from "../../Services/Config/Api";
import ModalSort from "../Modal/ModalSort";
import ModalRangPrice from "../Modal/ModalRangPrice";
import ModalNumberPeople from "../Modal/ModalNumberPeople";

const SuggestPost = ({ selectedDistrict, searchInput }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalRangPrice, setModalRangPrice] = useState(false);
  const [modalPeople, setModalPeople] = useState(false);
  const [sortOption, setSortOption] = useState(null);
  const [allAccomoda, setAllAccommodation] = useState([]);
  const [pageNumber, setPageNumer] = useState(1);
  const [sortDatas, setSordata] = useState(allAccomoda);
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);
  const [selectPeople, setSelectPeole] = useState(null);
  const [limit, setLimit] = useState(20);
  const auth = useSelector((state) => state?.auth?.currentUser);
  function arraysAreEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) {
      return false;
    }
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) {
        return false;
      }
    }
    return true;
  }

  useEffect(() => {
    const fecthAccommodation = async () => {
      try {
        const res = await authApi(auth?.access_token).get(
          endpoint.all_accommodation(pageNumber, limit)
        );
        console.log("API Response:", res.data);
        setAllAccommodation(res.data.results);
        setSordata(res.data.results);
      } catch (error) {
        console.error("Error fetching accommodations:", error);
      }
    };
    fecthAccommodation();
  }, [auth?.access_token, pageNumber, limit]);

  const sortData = (op) => {
    const sortedResult = [...allAccomoda].sort((a, b) => {
      const priceA = typeof a.rent_cost === "number" ? a.rent_cost : 0;
      const priceB = typeof b.rent_cost === "number" ? b.rent_cost : 0;
      return op === "low" ? priceA - priceB : priceB - priceA;
    });
    setSortOption(op);
    setSordata([...sortedResult]);
  };
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
    if (!arraysAreEqual(filteredData, sortDatas)) {
      setSordata(filteredData);
    }
    if (selectedPriceRange) {
      filteredData = filteredData.filter((item) => {
        const rentCost =
          typeof item.rent_cost === "number" ? item.rent_cost : 0;
        return (
          rentCost >= selectedPriceRange.min &&
          rentCost <= selectedPriceRange.max
        );
      });
    }
    if (searchInput) {
      filteredData = filteredData.filter((item) =>
        item.address.toLowerCase().includes(searchInput.toLowerCase())
      );
    }
    if (selectPeople !== null) {
      filteredData = filteredData.filter(
        (item) => item.number_of_people === selectPeople
      );
    }
    setSordata(filteredData);
  }, [
    selectedDistrict,
    sortOption,
    searchInput,
    selectedPriceRange,
    selectPeople,
  ]);
  const handlePriceRangeChange = (selectedValue) => {
    console.log("Selected Price Range: ", selectedValue);
    setSelectedPriceRange(selectedValue);
    sortData(selectedValue);
  };
  const renderPostItem = (item, index) => (
    <TouchableOpacity key={index}>
      <Item item={item} />
    </TouchableOpacity>
  );

  return (
    <>
      <View style={postStyle.wrapper}>
        <View style={postStyle.wrapperItem}>
          <View
            style={{ flexDirection: "row", justifyContent: "center", gap: 10 }}
          >
            <TouchableOpacity
              style={postStyle.headerAction}
              onPress={() => setModalRangPrice(!modalRangPrice)}
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
            <TouchableOpacity
              style={postStyle.headerAction}
              onPress={() => setModalPeople(!modalPeople)}
            >
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
                There are {sortDatas.length} results
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
          {sortDatas.length > 0 ? (
            sortDatas.map(renderPostItem)
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
              <Text
                style={[StyleDefault.FontSizeMedium, { fontWeight: "700" }]}
              >
                Results not found
              </Text>
            </View>
          )}
        </View>
      </View>
      {modalRangPrice && (
        <ModalRangPrice
          isVisible={modalRangPrice}
          onPriceRangeChange={handlePriceRangeChange}
          setModalRangPrice={setModalRangPrice}
        />
      )}
      {modalPeople && (
        <ModalNumberPeople
          isVisible={modalPeople}
          onClose={() => setModalPeople(false)}
          onSelectNumberPeople={(selectedPeople) => {
            setSelectPeole(selectedPeople); 
            sortData(selectedPeople); 
          }}
        />
      )}
    </>
  );
};

export default SuggestPost;
