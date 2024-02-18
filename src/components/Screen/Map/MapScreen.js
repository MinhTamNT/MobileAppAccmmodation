import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  Animated,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import MapView, { Circle, Marker } from "react-native-maps";
import { MapStyle } from "./MapStyle";
import { marker } from "./MapData";
import {
  Moneys,
  SearchNormal,
  Profile2User,
  Clock,
} from "iconsax-react-native";
import { MAP_KEY } from "@env";

export default ({ route }) => {
  const { locationPresent } = route?.params;
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
  const [markersToShow, setMarkersToShow] = useState(marker);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [formattedAddresses, setFormattedAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [latitude, setLatitude] = useState(locationPresent.coords.latitude);
  const [longitude, setLongitude] = useState(locationPresent.coords.longitude);

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
    } catch (error) {
      console.error("Error fetching location coordinates:", error.message);
    }
  };

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
        {markersToShow.map((map, index) => (
          <Marker key={index} coordinate={map.coordinate}>
            <Animated.View style={[MapStyle.markerWrap]}>
              <Animated.Image
                source={require("../../../assets/image/map_marker.png")}
                style={[MapStyle.marker]}
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

      {searchText.length > 0 && (
        <View style={MapStyle.searchAction}>
          <Text>{selectedAddress}</Text>
        </View>
      )}

      {formattedAddresses.length > 0 && (
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
