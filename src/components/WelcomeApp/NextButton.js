import { Next } from "iconsax-react-native";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { style } from "./WelcomeAppStyle";

const NextButton = ({ onScroll }) => {
  return (
    <View style={{ flex: 0.3, justifyContent: "center", alignItems: "center" }}>
      <TouchableOpacity
        onPress={onScroll}
        style={style.btn}
        activeOpacity={0.5}
      >
        <Next size={32} color="#f47373" />
      </TouchableOpacity>
    </View>
  );
};

export default NextButton;
