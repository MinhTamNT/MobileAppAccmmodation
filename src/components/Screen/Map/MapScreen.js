import React, { useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  Animated,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { MapStyle } from "./MapStyle";
import { marker } from "./MapData";
import { TextInput } from "react-native-gesture-handler";
import { Moneys, SearchNormal, Profile2User } from "iconsax-react-native";
import { COLOR } from "../../../contants";
export default ({ route }) => {
  const locationUser = route?.params?.locationUser;
  console.log("MapScreen", locationUser);
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
  return (
    <View style={MapStyle.container}>
      <MapView
        style={MapStyle.map}
        region={{
          latitude: 1,
          longitude: 1,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        ref={mapRef}
      >
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
        />
        <SearchNormal size="32" color="#FF8A65" />
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
    </View>
  );
};
