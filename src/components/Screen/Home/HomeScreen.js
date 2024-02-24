import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Homestyle } from "./HomeStyle";
import { Feather } from "@expo/vector-icons";
import { COLOR } from "../../../contants";
import Carousel from "../../Carousel/Carousel";
import { useSelector } from "react-redux";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";
import InputField from "../../InputFields/InputField";
import ModalRequire from "../../Modal/ModalRequire";
import LoadingPage from "../../LoadingPage/LoadingPage";
import { authApi, endpoint } from "../../../Services/Config/Api";
import HomeCards from "./HomeCards";
import HomeList from "./HomeList";
import { Notification } from "iconsax-react-native";

const HomeScreen = ({ route }) => {
  const currentUser = useSelector((state) => state?.user?.currentUser);
  const [location, setLocation] = useState(null);
  const auth = useSelector((state) => state?.auth?.currentUser);
  const [address, setAddress] = useState(null);
  const [accommodationUser, setAccommodationUser] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [allAccommodation, setAllAccommodation] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await authApi(auth?.access_token).get(
          endpoint["user_accommodation"]
        );
        setAccommodationUser(res.data.results);
      } catch (error) {
        console.error("Error fetching user accommodations:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await authApi(auth?.access_token).get(
          endpoint["notifcation_uer"]
        );
        setNotifications(res.data);

        const unreadNotifications = res.data.filter((notif) => !notif.is_read);
        setUnreadCount(unreadNotifications.length);
      } catch (error) {
        console.log(error);
      }
    };

    fetchNotifications();
  }, []);

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

  const handleSeeMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    if (location?.coords?.latitude && location?.coords?.longitude) {
      const fetchData = async () => {
        try {
          const res = await authApi(auth?.access_token).get(
            endpoint.current_accommodation(
              currentPage,
              location.coords.latitude,
              location.coords.longitude
            )
          );
          if (res.data && res.data.results) {
            setAllAccommodation((prevData) => [
              ...prevData,
              ...res.data.results,
            ]);
          } else {
            console.log("No more data");
          }
        } catch (error) {
          console.error("Error fetching accommodations:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchData();
    }
  }, [location?.coords?.latitude, location?.coords?.longitude, currentPage]);

  useEffect(() => {
    if (currentUser?.role === "HOST" && accommodationUser.length === 0) {
      setModalVisible(true);
    }
  }, [currentUser?.role, accommodationUser]);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <SafeAreaView style={Homestyle.container}>
      <View style={Homestyle.content_header}>
        <View style={Homestyle.header_title}>
          <View style={Homestyle.title_hello}>
            <Text style={Homestyle.text_title}>Welcome back</Text>
            <Text style={Homestyle.text_title}>
              {currentUser?.last_name} {currentUser?.first_name}
            </Text>
          </View>
          <View style={Homestyle.address}>
            <Feather name="map-pin" size={12} color={COLOR.text_weak_color} />
            {address && (
              <Text
                style={{
                  color: COLOR.text_weak_color,
                }}
              >
                {address.subregion} {address.region}
              </Text>
            )}
          </View>
        </View>
        <View style={Homestyle.header_action}>
          <TouchableOpacity onPress={() => navigation.navigate("Notifaction")}>
            <View style={Homestyle.notificationIconContainer}>
              <Notification color="#697689" />
              {unreadCount > 0 && (
                <View style={Homestyle.unreadCountContainer}>
                  <Text style={Homestyle.unreadCountText}>{unreadCount}</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("UserDeatil")}>
            <Image
              source={{
                uri:
                  currentUser?.avatar_user === null
                    ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNL_ZnOTpXSvhf1UaK7beHey2BX42U6solRA&usqp=CAU"
                    : currentUser?.avatar_user,
              }}
              style={Homestyle.image}
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        <Carousel />
        <View style={Homestyle.action_search}>
          <InputField
            label="Find rooms quickly"
            style={Homestyle.inputSearch}
            placeholder="Enter your keyword"
            onPressIn={() =>
              navigation.navigate("Search", { locationUser: location })
            }
            editable={false}
          />
        </View>
        <View style={[{ paddingTop: 15 }]}>
          <View
            style={[Homestyle.flex_row, Homestyle.pH_14, { marginBottom: 20 }]}
          >
            <Text style={Homestyle.text_HomeCrad}>Near from you</Text>
            <Text style={Homestyle.text_2} onPress={handleSeeMore}>
              See more
            </Text>
          </View>
          <HomeCards allAccommodation={allAccommodation} />
        </View>
        <View style={[{ marginTop: -30 }, Homestyle.pH_14]}>
          <View style={[Homestyle.flex_row, { marginBottom: 20 }]}>
            <Text style={Homestyle.text_HomeCrad}>Best for you</Text>
            <Text
              style={Homestyle.text_2}
              onPress={() => {
                console.log("See more");
              }}
            >
              See more
            </Text>
          </View>
          {allAccommodation.map((item, index) => (
            <HomeList key={index} item={item} />
          ))}
        </View>
      </ScrollView>
      {modalVisible && accommodationUser.length < 0 && (
        <ModalRequire setModalVisible={setModalVisible} location={location} />
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;
