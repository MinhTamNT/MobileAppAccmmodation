import { View, Text, Animated, useWindowDimensions } from "react-native";
import React from "react";
import { style } from "./WelcomeAppStyle";
const Pagations = ({ data, scrollX }) => {
  const { width } = useWindowDimensions();
  return (
    <View style={style.pagationContain}>
      {data.map((_, index) => {
        const inputRange = [
          (index - 1) * width,
          index * width,
          (index + 1) * width,
        ];
        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10, 20, 10],
          extrapolate: "clamp",
        });
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: "clamp",
        });
        return (
          <Animated.View
            style={[style.dot, { width: dotWidth, opacity }]}
            key={index.toString()}
          />
        );
      })}
    </View>
  );
};

export default Pagations;
