import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SliderBox } from "react-native-image-slider-box";
const Carousel = () => {
  const slides = [
    require("../../assets/image/Carousel1.jpg"),
    require("../../assets/image/Carousel2.png"),
    require("../../assets/image/Carousel3.jpg"),
    require("../../assets/image/Carousel4.jpg"),
];
  return (
    <View style={styles.container}>
      <SliderBox
        images={slides}
        ImageComponentStyle={{
          borderRadius: 15,
          width: "93%",
          marginTop: 15,
        }}
        autoplay
        circleLoop
      />
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center" },
});
