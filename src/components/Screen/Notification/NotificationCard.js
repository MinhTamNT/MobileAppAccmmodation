import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Animated,
  TouchableOpacity,
} from "react-native";

const { width: screenWidth } = Dimensions.get("window");
import moment from "moment";
const NotificationCard = ({ item,markAsRead }) => {
  const fadeOut = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    Animated.timing(fadeOut, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      markAsRead(item.id); // Pass the notification ID to the parent component
    });
  };
  const animatedStyle = {
    opacity: fadeOut,
  };
  return (
    <TouchableOpacity onPress={handlePress}>
      <Animated.View style={{ ...style.container, ...animatedStyle }}>
        <Image source={{ uri: item.sender.avatar_user }} style={style.avatar} />
        <View style={style.content}>
          <View style={style.row}>
            <Text style={style.user}>{item.sender.username}</Text>
            <Text>{moment(item.created_at).fromNow()}</Text>
          </View>
          <View style={style.dash}></View>
          <Text style={style.notify}>{item.notice}</Text>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  container: {
    height: 100,
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    marginBottom: 10,
    borderRadius: 20,
    backgroundColor: "#fff", // Set a background color to see the shadow effect
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 5,
  },
  avatar: {
    width: 60,
    height: 60,
    resizeMode: "cover",
    borderRadius: 50,
    marginRight: 10,
  },
  content: {
    width: "80%",
    justifyContent: "center",
    marginRight: 15,
  },
  dash: {
    height: 1,
    backgroundColor: "#000",
  },
  user: {
    fontSize: 14,
    fontWeight: "bold",
  },
  notify: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: 5,
  },
});

export default NotificationCard;
