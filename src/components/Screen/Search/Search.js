import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Animated,
  StatusBar,
  Platform,
  ToastAndroid,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SearchStyles } from "./SearchStyle";
import { AntDesign } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { COLOR } from "../../../contants";
import SuggestPost from "../../SuggestPost/SuggestPost";
import { ProvinceModal } from "../../Modal/ModalProvince";
import {
  fetchGetDistrict,
  fetchGetProvinces,
} from "../../../Services/Province/ProvinceServices";
import DistrictModal from "../../Modal/ModalDistrict";
const Search = () => {
  const scrollX = new Animated.Value(0);
  const [provinces, setProvinces] = useState([]);
  const [district, setDistrict] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectDistrict, setSelectDistric] = useState(null);
  const diffClampScrollY = Animated.diffClamp(scrollX, 0, 50);
  const [isProvinceModalVisible, setProvinceModalVisible] = useState(false);
  const [isDistrictModalVisible, setDistrictModalVisible] = useState(false);

  const handleSelectProvince = async () => {
    try {
      const fetchedProvinces = await fetchGetProvinces();
      setProvinces(fetchedProvinces);
      setProvinceModalVisible(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseProvinceModal = () => {
    setProvinceModalVisible(false);
  };
  const handleSelectDistrict = async (district) => {
    if (!selectedProvince || !selectedProvince.province_id) {
      Platform.OS === "ios"
        ? alert("Please select a province first")
        : ToastAndroid.show(
            "Please select a province first",
            ToastAndroid.SHORT
          );
      return;
    }
    try {
      const fetchedDistricts = await fetchGetDistrict(
        selectedProvince.province_id
      );
      setDistrict(fetchedDistricts);
      setDistrictModalVisible(true);
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleCloseDistrictModal = () => {
    setDistrictModalVisible(false);
  };
  const handleSelectProvinceItem = (province) => {
    setSelectedProvince(province);
    setProvinceModalVisible(false);
  };
  const handleSelectDistrictItem = (district) => {
    setSelectDistric(district);
    setDistrictModalVisible(false);
  };
  const headerHeight = diffClampScrollY.interpolate({
    inputRange: [0, 70],
    outputRange: [70, 0],
    extrapolate: "clamp",
  });

  const headerHeight_translateY = diffClampScrollY.interpolate({
    inputRange: [0, 70],
    outputRange: [0, -70],
    extrapolate: "clamp",
  });

  const headerOpacity = diffClampScrollY.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });
  return (
    <>
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
                handleSelectProvince();
                setProvinceModalVisible(!false);
              }}
            >
              <EvilIcons
                name="location"
                size={24}
                color={COLOR.bg_color_blue_200}
              />
              <Text style={{ color: COLOR.bg_color_blue_200 }}>
                {selectedProvince
                  ? selectedProvince.province_name
                  : "Select Province/City"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={SearchStyles.actionDistrict}
              onPress={handleSelectDistrict}
            >
              <Text>
                {selectDistrict
                  ? selectDistrict.district_name
                  : "Select District"}
              </Text>
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
      <ProvinceModal
        visible={isProvinceModalVisible}
        onClose={handleCloseProvinceModal}
        onSelectProvince={handleSelectProvinceItem}
        provinces={provinces}
      />
      <DistrictModal
        visible={isDistrictModalVisible}
        onClose={handleCloseDistrictModal}
        onSelectDistrict={handleSelectDistrictItem}
        districts={district} // Pass your list of districts here
      />
    </>
  );
};

export default Search;
