import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { style } from "./HomeStyle";
import { Feather } from "@expo/vector-icons";
import { COLOR } from "../../../contants";
import { Notification } from "iconsax-react-native";
import Carousel from "../../Carousel/Carousel";
import InputField from "../../InputFields/InputFields";
import { NotiStyle } from "../Notification/NotificationStyle";
import { useSelector } from "react-redux";
import * as Location from "expo-location";
const HomeScreen = ({ route, navigation }) => {
  const currentUser = useSelector((state) => state?.user.user.currentUser);
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState(null);

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
      console.log("Location:");
      console.log(currentLocation);
      console.log(JSON.stringify(currentLocation));
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
  const handlerNavigationNotifi = () => {
    navigation.navigate("Notification");
  };
  const notificationCount = route?.params?.notificationCount;

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
          <View style={{ position: "relative" }}>
            <TouchableOpacity onPress={handlerNavigationNotifi}>
              <Notification size="24" color="#697689" />
              {notificationCount > 0 && (
                <View style={NotiStyle.notificationBadge}>
                  <Text style={NotiStyle.notificationText}>
                    {notificationCount}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("UserDeatil")}>
            <Image
              source={{ uri: currentUser.avatar_user }}
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
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
