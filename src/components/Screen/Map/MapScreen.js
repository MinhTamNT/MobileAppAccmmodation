import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  Animated,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import MapView, { Circle, Marker } from "react-native-maps";
import { MapStyle } from "./MapStyle";
import {
  Moneys,
  SearchNormal,
  Profile2User,
  Clock,
  User,
  ArrowLeft2,
} from "iconsax-react-native";
import { MAP_KEY } from "@env";
import { useSelector } from "react-redux";
import { StyleDefault } from "../../StyleDeafult/StyleDeafult";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { authApi, endpoint } from "../../../Services/Config/Api";

export default ({ route }) => {
  const actions = [
    {
      name: "According to price",
      icon: <Moneys size="18" color="#697689" style={MapStyle.chipsIcon} />,
      handler: () => setModalVisible(true),
    },
    {
      name: "Number of residents",
      icon: (
        <Profile2User size="18" color="#697689" style={MapStyle.chipsIcon} />
      ),
    },
  ];
  const mapRef = useRef(null);
  const { locationPresent } = route?.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [formattedAddresses, setFormattedAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [latitude, setLatitude] = useState(locationPresent.coords.latitude);
  const [longitude, setLongitude] = useState(locationPresent.coords.longitude);
  const [allAccomoda, setAllAccommodation] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const auth = useSelector((state) => state?.auth?.currentUser);
  const [currentLocationMarker, setCurrentLocationMarker] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [selectedAccommodation, setSelectedAccommodation] = useState(null);
  const navigation = useNavigation();

  const handleReturnToCurrentLocation = () => {
    if (mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: locationPresent.coords.latitude,
        longitude: locationPresent.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
      setCurrentLocationMarker({
        latitude: locationPresent.coords.latitude,
        longitude: locationPresent.coords.longitude,
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://dev.virtualearth.net/REST/v1/Autosuggest?query=${searchText}&key=${MAP_KEY}`
        );

        const responseBody = await response.text();

        if (!responseBody.trim()) {
          return;
        }

        const data = JSON.parse(responseBody);

        if (
          data.resourceSets &&
          data.resourceSets.length > 0 &&
          data.resourceSets[0].resources
        ) {
          const resources = data.resourceSets[0].resources;

          const addresses = resources
            .map((resource) =>
              resource.value
                ? resource.value.map((item) => item.address.formattedAddress)
                : []
            )
            .flat();

          setFormattedAddresses(addresses);
        }
      } catch (error) {
        console.error("Error fetching suggestions:", error.message);
      }
    };

    fetchData();
  }, [searchText]);

  useEffect(() => {
    try {
      const fetchDataCurrent = async () => {
        setIsLoading(true);
        const res = await authApi(auth?.access_token).get(
          endpoint.map_accommodation(
            locationPresent.coords.latitude,
            locationPresent.coords.longitude
          )
        );
        setAllAccommodation(res.data.results);
      };

      fetchDataCurrent();
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [latitude, longitude]);

  const handleAddressSelect = async (selectedAddress) => {
    try {
      const response = await fetch(
        `https://dev.virtualearth.net/REST/v1/Locations?query=${selectedAddress}&key=${MAP_KEY}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      if (
        data.resourceSets &&
        data.resourceSets.length > 0 &&
        data.resourceSets[0].resources
      ) {
        const resources = data.resourceSets[0].resources;

        resources.forEach((resource) => {
          const latitude = resource.point.coordinates[0];
          const longitude = resource.point.coordinates[1];
          setLatitude(latitude);
          setLongitude(longitude);
        });
      }

      setSelectedAddress(selectedAddress);
      setSearchText("");
      setCurrentLocationMarker(false);
    } catch (error) {
      console.error("Error fetching location coordinates:", error.message);
    }
  };

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={MapStyle.container}>
      <MapView
        style={MapStyle.map}
        region={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        ref={mapRef}
      >
        {currentLocationMarker ? (
          <>
            <Marker
              coordinate={{
                latitude: locationPresent.coords.latitude,
                longitude: locationPresent.coords.longitude,
              }}
            />

            <Circle
              center={{
                latitude: locationPresent.coords.latitude,
                longitude: locationPresent.coords.longitude,
              }}
              radius={1000}
              fillColor="rgba(100, 100, 255, 0.5)"
            />
          </>
        ) : (
          <>
            <Marker
              coordinate={{
                latitude: latitude,
                longitude: longitude,
              }}
            />
            <Circle
              center={{
                latitude: latitude,
                longitude: longitude,
              }}
              radius={1000}
              fillColor="rgba(100, 100, 255, 0.5)"
            />
          </>
        )}

        {allAccomoda.map((accommodation, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: accommodation.latitude,
              longitude: accommodation.longitude,
            }}
            onPress={() => setSelectedAccommodation(accommodation)}
          >
            <Animated.View
              style={[
                MapStyle.markerWrap,
                selectedMarker === accommodation && MapStyle.selectedMarkerWrap,
              ]}
            >
              <Animated.Image
                source={require("../../../assets/image/map_marker.png")}
                style={[
                  MapStyle.marker,
                  selectedMarker === accommodation && MapStyle.selectedMarker,
                ]}
                resizeMode="cover"
              />
            </Animated.View>
          </Marker>
        ))}
      </MapView>

      <View style={MapStyle.searchBox}>
        <TextInput
          placeholder="Search here"
          placeholderTextColor="#333"
          autoCapitalize="none"
          style={{ flex: 1, padding: 4 }}
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
        <TouchableOpacity
          onPress={() => {
            handleAddressSelect(searchText);
          }}
        >
          <SearchNormal size="32" color="#FF8A65" />
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        scrollEventThrottle={1}
        showsVerticalScrollIndicator={false}
        style={MapStyle.chipsScrollView}
      >
        {actions.map((action, index) => (
          <TouchableOpacity
            key={index}
            style={MapStyle.chipsItem}
            onPress={action.handler}
          >
            {action.icon}
            <Text>{action.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 270,
          backgroundColor: "white",
          right: 12,
          padding: 12,
          borderRadius: 10,
          zIndex: 99,
        }}
        onPress={handleReturnToCurrentLocation}
      >
        <FontAwesome name="location-arrow" size={24} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          position: "absolute",
          top: 52,
          left: 12,
          zIndex: 99,
        }}
        onPress={() => navigation.goBack()}
      >
        <ArrowLeft2 size="30" color="white" />
      </TouchableOpacity>
      <Animated.ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={[
          MapStyle.scrollView,
          selectedMarker && MapStyle.scrollViewWithCard,
        ]}
      >
        {selectedAccommodation && (
          <View style={MapStyle.card}>
            <Image
              source={{ uri: selectedAccommodation.image[0].image }}
              style={MapStyle.cardImage}
            />
            <View style={MapStyle.textContent}>
              <Text numberOfLines={1}>
                {selectedAccommodation.address} {selectedAccommodation.district}
              </Text>
              <View>
                <View
                  style={[
                    StyleDefault.flexBoxRow,
                    { justifyContent: "space-between" },
                  ]}
                >
                  <View style={StyleDefault.flexBoxRow}>
                    <Text>{selectedAccommodation.rent_cost}VND</Text>
                    <Text style={StyleDefault.FontSizeMedium}>
                      {selectedAccommodation.number_of_people}
                    </Text>
                    <User size="15" color="#697689" />
                  </View>
                  <TouchableOpacity style={MapStyle.actionDetail}>
                    <Text style={{ color: "white" }}>Detail</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        )}
      </Animated.ScrollView>

      {searchText.length > 0 && (
        <View style={MapStyle.searchAction}>
          <Text>{selectedAddress}</Text>
        </View>
      )}

      {searchText.length > 0 && (
        <View style={MapStyle.searchAction}>
          <ScrollView
            style={MapStyle.searchResults}
            showsVerticalScrollIndicator={false}
          >
            {formattedAddresses.map((address, index) => (
              <TouchableOpacity
                key={index}
                style={MapStyle.searchResultItem}
                onPress={() => {
                  console.log(`Selected address: ${address}`);
                  handleAddressSelect(address);
                }}
              >
                <Clock size="15" color="#697689" />
                <Text style={{ fontSize: 12, borderBottomWidth: 1 }}>
                  {address}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};
