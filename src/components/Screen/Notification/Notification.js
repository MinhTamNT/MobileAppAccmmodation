import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleDefault } from "../../StyleDeafult/StyleDeafult";
import { NotiStyle } from "./NotificationStyle";
import { AntDesign } from "@expo/vector-icons";
import { AlignBottom } from "iconsax-react-native";
import { useNavigation } from "@react-navigation/native";
import NotificationCard from "./NotificationCard";
import { useSelector } from "react-redux";
import { authApi, endpoint } from "../../../Services/Config/Api";

const Notification = ({ route }) => {
  const navigation = useNavigation();
  const auth = useSelector((state) => state?.auth?.currentUser);
  const [notifications, setNotifications] = useState([]);

  const unreadMessagesCount = notifications.filter(
    (notification) => !notification.is_read
  ).length;

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await authApi(auth?.access_token).get(
          endpoint["notifcation_user"]
        );
        const filerNoti = res.data.filter((noti) => noti.is_read === false);
        setNotifications(filerNoti);
      } catch (error) {
        console.log(error);
      }
    };
    fetchNotifications();
  }, [notifications]);

  const markAsRead = async (notificationId) => {
    try {
      await authApi(auth?.access_token).put(
        endpoint.mark_notification_read(notificationId)
      );
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification.id === notificationId
            ? { ...notification, is_read: true }
            : notification
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={StyleDefault.container}>
      <View style={NotiStyle.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={NotiStyle.header_title}>Notification</Text>
        <AlignBottom size="32" color="#697689" />
      </View>
      <View style={{ flex: 1, paddingHorizontal: 14 }}>
        <View style={NotiStyle.unreadMessagesContainer}>
          <Text style={NotiStyle.unreadMessagesText}>
            {unreadMessagesCount > 0
              ? `Unread messages: ${unreadMessagesCount}`
              : "All messages are read"}
          </Text>
        </View>
        {notifications.length > 0 ? (
          <FlatList
            data={notifications}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <NotificationCard
                item={item}
                markAsRead={() => markAsRead(item.id)}
              />
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
