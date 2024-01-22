import { FlatList, Animated, View } from "react-native";
import React, { useState, useRef } from "react";
import { data } from "./data";
import WelcomeAppItems from "./WelcomeAppItems";
import Pagations from "./Pagations";
import { style } from "./WelcomeAppStyle";
import NextButton from "./NextButton";
import { useNavigation } from "@react-navigation/native";
const WelcomeApp = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  const [currentState, setCurrentState] = useState(0);
  const sildeRef = useRef(null);
  const viewableItemsChange = useRef(({ viewableItems }) => {
    setCurrentState(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;
  const handleNext = () => {
    if (currentState < data.length - 1) {
      sildeRef.current.scrollToIndex({ index: currentState + 1 });
    } else {
      navigation.navigate("LoginAndRegister");
    }
  };
  return (
    <View style={style.contain}>
      <FlatList
        data={data}
        renderItem={({ item }) => <WelcomeAppItems items={item} />}
        horizontal
        pagingEnabled
        bounces={false}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: scrollX,
                },
              },
            },
          ],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={32}
        onViewableItemsChanged={viewableItemsChange}
        viewabilityConfig={viewConfig}
        ref={sildeRef}
      />
      <Pagations data={data} scrollX={scrollX} />
      <NextButton onScroll={handleNext} />
    </View>
  );
};

export default WelcomeApp;
