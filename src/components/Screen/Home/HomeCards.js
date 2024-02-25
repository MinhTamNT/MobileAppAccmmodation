import {
  Dimensions,
  Platform,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";
import { COLOR } from "../../../contants";
import { useNavigation } from "@react-navigation/native";

const { width: screenWidth } = Dimensions.get("window");

const HomeCards = ({ allAccommodation }) => {
  const [entries, setEntries] = useState([]);
  const CarouselRef = useRef(null);
  const navigation = useNavigation();

  useEffect(() => {
    setEntries(allAccommodation);
  }, []);

  const handlerDeatilAccommodation = (accommodationId) => {
    navigation.navigate("")
  };
  const renderItem = ({ item, index }, parallaxProps) => {
    return (
      <>
        <View style={style.item}>
          <ParallaxImage
            source={{ uri: item?.image[1]?.image }}
            containerStyle={style.imageContainer}
            style={style.image}
            parallaxFactor={0.4}
            {...parallaxProps}
          />
        </View>
        <TouchableOpacity>
          <View style={style.text_container}>
            <Text style={style.title}>{item.address}</Text>
            <Text style={style.title}>
              District {item.district}, {item.city} city
            </Text>
          </View>
        </TouchableOpacity>
      </>
    );
  };

  return (
    <View style={{ marginBottom: 60 }}>
      <Carousel
        layout="default"
        ref={CarouselRef}
        sliderWidth={screenWidth}
        sliderHeight={screenWidth}
        itemWidth={screenWidth - 60}
        data={allAccommodation}
        renderItem={renderItem}
        hasParallaxImages={true}
      />
    </View>
  );
};

const style = StyleSheet.create({
  item: {
    width: screenWidth - 60,
    height: screenWidth - 60,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover",
  },
  text_container: {
    padding: 10,
    position: "absolute",
    bottom: 0,
  },
  title: {
    color: COLOR.offWhite,
    lineHeight: 30,
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "left",
  },
});

export default HomeCards;
