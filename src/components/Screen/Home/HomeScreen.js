import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { style } from "./HomeStyle";
import { Feather } from "@expo/vector-icons";
import { COLOR } from "../../../contants";
import Carousel from "../../Carousel/Carousel";
import { useSelector } from "react-redux";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";
import InputField from "../../InputFields/InputField";
import ModalRequire from "../../Modal/ModalRequire";
const HomeScreen = ({ route }) => {
  const currentUser = useSelector((state) => state?.user.currentUser);
  const accommodation = useSelector(
    (state) => state.accommodation.createAccommodation.userAccommdation
  );
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);
  const [modalVisible, setModalVisible] = useState(true);
  const navigation = useNavigation();
  useEffect(() => {
    const getPermission = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Please grant location permissions");
        return;
      }
      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
        maximumAge: 10000,
      });
      setLocation(currentLocation);

      geocode(
        currentLocation.coords.latitude,
        currentLocation.coords.longitude
      );
    };

    getPermission();
  }, []);

  const geocode = async (latitude, longitude) => {
    try {
      const geocodeLocation = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      const firstResult = geocodeLocation[0];
      setAddress(firstResult);
    } catch (error) {
      console.error("Error fetching geocode:", error);
    }
  };

  if (!currentUser) {
    return (
      <SafeAreaView style={style.container}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={style.container}>
      <View style={style.content_header}>
        <View style={style.header_title}>
          <View style={style.title_hello}>
            <Text style={style.text_title}>Welcome back</Text>
            <Text style={style.text_title}>
              {currentUser.last_name} {currentUser.first_name}
            </Text>
          </View>
          <View style={style.address}>
            <Feather name="map-pin" size={12} color={COLOR.text_weak_color} />
            {address && (
              <Text style={{ color: COLOR.text_weak_color }}>
                {address.subregion} {address.region}
              </Text>
            )}
          </View>
        </View>
        <View style={style.header_action}>
          <TouchableOpacity onPress={() => navigation.navigate("UserDeatil")}>
            <Image
              source={{
                uri:
                  currentUser?.avatar_user === null
                    ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNL_ZnOTpXSvhf1UaK7beHey2BX42U6solRA&usqp=CAU"
                    : currentUser?.avatar_user,
              }}
              style={style.image}
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        <Carousel />

        <View style={style.action_search}>
          <InputField
            label="Find rooms quickly"
            style={style.inputSearch}
            placeholder="Enter your keyword"
            onPressIn={() =>
              navigation.navigate("Search", { locationUser: location })
            }
          />
        </View>
      </ScrollView>
      {modalVisible && (
        <ModalRequire setModalVisible={setModalVisible} location={location} />
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;
