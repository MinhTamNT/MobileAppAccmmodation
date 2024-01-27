import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleDefault } from "../../StyleDeafult/StyleDeafult";
import { NotiStyle } from "./NotificationStyle";
import { AntDesign } from "@expo/vector-icons";
import { AlignBottom } from "iconsax-react-native";

const Notification = ({ route, navigation }) => {
  const [notification, setNotification] = useState([
    { id: 1, message: "Notification 1" },
    { id: 2, message: "Notification 2" },
    { id: 3, message: "Notification 3" },
    { id: 4, message: "Notification 4" },
  ]);
  

  return (
    <SafeAreaView style={StyleDefault.container}>
      <View style={NotiStyle.header}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate({
              name: "HomeScreen",
              params: {
                notificationCount: notification.length, // Change 'count' to 'notificationCount
              },
              merge: true,
            })
          }
        >
          <AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={NotiStyle.header_title}>Notification</Text>
        <AlignBottom size="32" color="#697689" />
      </View>
      <View style={{ flex: 1, alignItems: "center" }}>
        {notification.length > 0 ? (
          <>
            <FlatList
              data={notification}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <View>
                  <Text>{item.message}</Text>
                </View>
              )}
            />
          </>
        ) : (
          <>
            <Image
              source={require("../../../assets/image/thongbao.jpg")}
              style={NotiStyle.imageNoti}
            />
            <Text style={NotiStyle.message}>
              You don't have any notifications yet
            </Text>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Notification;
