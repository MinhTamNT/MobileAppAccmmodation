import React, { useEffect, useState } from "react";
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
import { AntDesign, EvilIcons } from "@expo/vector-icons";
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
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [isProvinceModalVisible, setProvinceModalVisible] = useState(false);
  const [isDistrictModalVisible, setDistrictModalVisible] = useState(false);

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const fetchedProvinces = await fetchGetProvinces();
        setProvinces(fetchedProvinces);
      } catch (error) {
        console.log("Error fetching provinces:", error.message);
      }
    };

    fetchProvinces();
  }, []);
  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const res = await fetchGetDistrict(selectedProvince.province_id);
        setDistrict(res);
        if (res.status === 200) {
        }
      } catch (error) {
        console.log("Error fetching districts:", error.message);
      }
    };

    if (selectedProvince) {
      fetchDistricts();
    }
  }, [selectedProvince]);

  const handleCloseProvinceModal = () => {
    setProvinceModalVisible(false);
  };

  const handleSelectDistrict = () => {
    if (!selectedProvince?.province_id) {
      const message =
        Platform.OS === "ios"
          ? "Please select a province first"
          : "Please select a province first";
      Platform.OS === "ios"
        ? alert(message)
        : ToastAndroid.show(message, ToastAndroid.SHORT);
      return;
    }

    setDistrictModalVisible(true);
  };

  const handleCloseDistrictModal = () => {
    setDistrictModalVisible(false);
  };

  const handleSelectProvinceItem = (province) => {
    setSelectedProvince(province);
    setProvinceModalVisible(false);
  };

  const handleSelectDistrictItem = (district) => {
    setSelectedDistrict(district);
    setDistrictModalVisible(false);
  };

  const headerHeight = Animated.diffClamp(scrollX, 0, 50).interpolate({
    inputRange: [0, 70],
    outputRange: [70, 0],
    extrapolate: "clamp",
  });

  const headerHeight_translateY = Animated.diffClamp(
    scrollX,
    0,
    50
  ).interpolate({
    inputRange: [0, 70],
    outputRange: [0, -70],
    extrapolate: "clamp",
  });

  const headerOpacity = Animated.diffClamp(scrollX, 0, 50).interpolate({
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
              onPress={() => setProvinceModalVisible(true)}
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
                {selectedDistrict
                  ? selectedDistrict.district_name
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
          <SuggestPost
            selectedProvince={selectedProvince}
            selectedDistrict={selectedDistrict}
          />
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
        districts={district}
      />
    </>
  );
};

export default Search;