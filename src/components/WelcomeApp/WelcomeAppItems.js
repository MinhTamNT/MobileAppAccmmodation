import { View, Text, Image, useWindowDimensions } from "react-native";
import React from "react";
import WelcomeAppStyle, { style } from "./WelcomeAppStyle";
const WelcomeAppItems = ({ items }) => {
  const { width } = useWindowDimensions();
  return (
    <View style={[style.containItems, { width }]}>
      <Image
        source={items.image}
        style={[style.image, { width, resizeMode: "contain" }]}
      />
      <View style={style.text}>
        <Text style={style.title}>{items.title}</Text>
        <Text style={style.description}>{items.description}</Text>
      </View>
    </View>
  );
};

export default WelcomeAppItems;
