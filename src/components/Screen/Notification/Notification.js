import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleDefault } from "../../StyleDeafult/StyleDeafult";
import { NotiStyle } from "./NotificationStyle";
import { AntDesign } from "@expo/vector-icons";
import { AlignBottom } from "iconsax-react-native";
import { useNavigation } from "@react-navigation/native"; // Import the hook

const Notification = ({ route }) => {
  const navigation = useNavigation(); // Use the hook to get the navigation object

  const [notification, setNotification] = useState([]);

  return (
    <SafeAreaView style={StyleDefault.container}>
      <View style={NotiStyle.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={NotiStyle.header_title}>Notification</Text>
        <AlignBottom size="32" color="#697689" />
      </View>
      <View style={{ flex: 1, alignItems: "center" }}>
        {notification.length > 0 ? (
          <FlatList
            data={notification}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View>
                <Text>{item.message}</Text>
              </View>
            )}
          />
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
