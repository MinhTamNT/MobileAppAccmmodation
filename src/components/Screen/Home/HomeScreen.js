import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList
} from "react-native"
import React, { useState, useEffect } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { style } from "./HomeStyle"
import { Feather } from "@expo/vector-icons"
import { COLOR } from "../../../contants"
import Carousel from "../../Carousel/Carousel"
import { useDispatch, useSelector } from "react-redux"
import * as Location from "expo-location"
import { useNavigation } from "@react-navigation/native"
import InputField from "../../InputFields/InputField"
import ModalRequire from "../../Modal/ModalRequire"
import LoadingPage from "../../LoadingPage/LoadingPage"
import { authApi, endpoint } from "../../../Services/Config/Api"
import HomeBtn from "./HomeBtn"
import HomeCard from "./HomeCard"
import { getAllAccommodation } from "../../../Redux/apiRequest"
import { all } from "axios"

const HomeScreen = ({ route }) => {
  const currentUser = useSelector((state) => state?.user?.currentUser)
  const [location, setLocation] = useState(null)
  const auth = useSelector((state) => state?.auth?.currentUser)
  const [address, setAddress] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [accommodationUser, setAccommodationUser] = useState([])
  const dispatch = useDispatch()
  const allAccomodation = useSelector(
    (state) => state?.accommodation?.allAccommodation?.accommodations
  )
  const navigation = useNavigation()
  useEffect(() => {
    const fetchData = async () => {
      const res = await authApi(auth?.access_token).get(
        endpoint["user_accommodation"]
      )
      setAccommodationUser(res.data)
    }
    fetchData()
  }, [])

  useEffect(() => {
    getAllAccommodation(dispatch)
  }, [dispatch])

  useEffect(() => {
    const getPermission = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== "granted") {
        console.log("Please grant location permissions")
        return
      }
      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
        maximumAge: 10000
      })
      setLocation(currentLocation)

      geocode(currentLocation.coords.latitude, currentLocation.coords.longitude)
    }

    getPermission()
  }, [])

  const geocode = async (latitude, longitude) => {
    try {
      const geocodeLocation = await Location.reverseGeocodeAsync({
        latitude,
        longitude
      })
      const firstResult = geocodeLocation[0]
      setAddress(firstResult)
    } catch (error) {
      console.error("Error fetching geocode:", error)
    }
  }

  useEffect(() => {
    if (currentUser?.role === "HOST" && accommodationUser.length === 0) {
      setModalVisible(true)
    }
  }, [currentUser, accommodationUser])

  if (!currentUser) {
    <LoadingPage />
  }
  console.log(allAccomodation);
  return (
    <SafeAreaView style={style.container}>
      <View style={style.content_header}>
        <View style={style.header_title}>
          <View style={style.title_hello}>
            <Text style={style.text_title}>Welcome back</Text>
            <Text style={style.text_title}>
              {currentUser?.last_name} {currentUser?.first_name}
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
                    : currentUser?.avatar_user
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
        <View>
          <FlatList
            horizontal={true}
            data={[
              "Hồ Chí Minh",
              "Hà Nội",
              "Vũng Tàu",
              "Phan Thiết",
              "Đà Nẵng",
              "Nha Trang"
            ]}
            renderItem={({ item }) => {
              return <HomeBtn name={item} />
            }}
            showsHorizontalScrollIndicator={false}
            style={[style.pl_14, { marginBottom: 18 }]}
          ></FlatList>
        </View>
        <View style={[style.pH_14, { marginTop: 15 }]}>
          <View>
            <View style={[style.flex_row, { marginBottom: 20 }]}>
              <Text style={style.text_HomeCrad}>Near from you</Text>
              <Text
                style={style.text_2}
                onPress={() => {
                  console.log("See more")
                }}
              >
                See more
              </Text>
            </View>

            <HomeCard accommodation = {allAccomodation} />
          </View>
        </View>
      </ScrollView>
      {modalVisible && (
        <ModalRequire setModalVisible={setModalVisible} location={location} />
      )}
    </SafeAreaView>
  )
}

export default HomeScreen
