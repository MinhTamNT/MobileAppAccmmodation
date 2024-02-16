import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  Animated,
  ScrollView,
  TouchableOpacity,
  Platform,
} from "react-native";
import MapView, { Circle, Marker } from "react-native-maps";
import { MapStyle } from "./MapStyle";
import { marker } from "./MapData";
import { TextInput } from "react-native-gesture-handler";
import {
  Moneys,
  SearchNormal,
  Profile2User,
  Clock,
} from "iconsax-react-native";
import { COLOR } from "../../../contants";

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://dev.virtualearth.net/REST/v1/Autosuggest?query=${searchText}&key=AhKaL22nil7f0VevfVpYLr0hEEFmMQ_YaQ3dlIfTJYOfRv3Jbdufdyj0NSF6PVqr`
        );
        const data = await response.json();

        if (
          data.resourceSets &&
          data.resourceSets.length > 0 &&
          data.resourceSets[0].resources
        ) {
          const resources = data.resourceSets[0].resources;

          const addresses = [];

          resources.forEach((resource) => {
            if (resource.value && resource.value.length > 0) {
              resource.value.forEach((item) => {
                const formattedAddress = item.address.formattedAddress;
                addresses.push(formattedAddress);
              });
            }
          });

          setFormattedAddresses(addresses);

          console.log("Formatted Addresses:", formattedAddresses);
        }
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    };

    fetchData();
  }, [searchText]);

  useEffect(() => {
    console.log("Formatted Addresses Updated:", formattedAddresses);
  }, [formattedAddresses]);

  return (
    <View style={MapStyle.container}>
      <MapView
        style={MapStyle.map}
        region={{
          latitude: locationPresent.coords.latitude,
          longitude: locationPresent.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        ref={mapRef}
      >
        <Marker
          coordinate={{
            latitude: locationPresent.coords.latitude,
            longitude: locationPresent.coords.longitude,
          }}
          title="Your Location"
          description="This is where you are currently located"
        />
        <Circle
          center={{
            latitude: locationPresent.coords.latitude,
            longitude: locationPresent.coords.longitude,
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
          onChangeText={(text) => setSearchText(text)}
        />
        <TouchableOpacity>
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

      <ScrollView
        horizontal
        scrollEventThrottle={1}
        showsVerticalScrollIndicator={false}
        style={MapStyle.scrollView}
      >
        {markersToShow.map((marker, index) => (
          <View style={MapStyle.card} key={index}>
            <Image
              source={marker.image}
              style={MapStyle.cardImage}
              resizeMode="cover"
            />
            <View style={MapStyle.textContent}>
              <Text numberOfLines={1} style={MapStyle.cardtitle}>
                {marker.title}
              </Text>
              <Text numberOfLines={1} style={MapStyle.cardDescription}>
                {marker.description}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={MapStyle.cardPrice}>{marker.price}</Text>
                <TouchableOpacity style={MapStyle.button}>
                  <Text style={{ color: COLOR.offWhite }}>See details</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
      {searchText.length > 0 && (
        <View style={MapStyle.searchAction}>
          {searchText.length > 0 && (
            <View style={MapStyle.searchResults}>
              {formattedAddresses.map((address, index) => (
                <TouchableOpacity
                  key={index}
                  style={MapStyle.searchResultItem}
                  onPress={() => {
                    console.log(`Selected address: ${address}`);
                  }}
                >
                  <Clock size="15" color="#697689" />
                  <Text style={{ fontSize: 12, borderBottomWidth: 1 }}>
                    {address}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      )}
    </View>
  );
};
