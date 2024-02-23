import { View, Text, Image, TouchableOpacity, FlatList } from "react-native"
import React, { useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { StyleDefault } from "../../StyleDeafult/StyleDeafult"
import { NotiStyle } from "./NotificationStyle"
import { AntDesign } from "@expo/vector-icons"
import { AlignBottom } from "iconsax-react-native"
import { useNavigation } from "@react-navigation/native" // Import the hook
import NotificationCard from "./NotificationCard"

const Notification = ({ route }) => {
  const navigation = useNavigation() // Use the hook to get the navigation object

  // const [notification, setNotification] = useState([])

  notification = [
    {
      id: 1,
      sender: {
        id: 3,
        username: "antien",
        avatar_user:
          "https://res.cloudinary.com/dmdljcwau/image/upload/v1708703182/avatar_user/zbgdvnsbmf6qhq9tfawz"
      },
      notice: "antien started following sinhhung",
      created_at: "2024-02-23T16:14:20.096544Z",
      is_read: false,
      recipient: 2
    },
    {
      id: 2,
      sender: {
        id: 5,
        username: "minhtam",
        avatar_user:
          "https://res.cloudinary.com/dmdljcwau/image/upload/v1708703297/avatar_user/gmmxwvrjlsfhfl94h4xt"
      },
      notice: "minhtam started following sinhhung",
      created_at: "2024-02-23T16:15:24.770712Z",
      is_read: false,
      recipient: 2
    },
    {
      id: 5,
      sender: {
        id: 2,
        username: "sinhhung",
        avatar_user:
          "https://res.cloudinary.com/dmdljcwau/image/upload/v1708702448/avatar_user/teomc7c65fizrwxvtywd"
      },
      notice: "sinhhung added new post",
      created_at: "2024-02-23T16:27:45.502855Z",
      is_read: false,
      recipient: 2
    },
    {
      id: 7,
      sender: {
        id: 2,
        username: "sinhhung",
        avatar_user:
          "https://res.cloudinary.com/dmdljcwau/image/upload/v1708702448/avatar_user/teomc7c65fizrwxvtywd"
      },
      notice: "sinhhung added new post",
      created_at: "2024-02-23T16:28:17.063833Z",
      is_read: false,
      recipient: 2
    },
    {
      id: 9,
      sender: {
        id: 2,
        username: "sinhhung",
        avatar_user:
          "https://res.cloudinary.com/dmdljcwau/image/upload/v1708702448/avatar_user/teomc7c65fizrwxvtywd"
      },
      notice: "sinhhung added new post",
      created_at: "2024-02-23T16:30:16.848416Z",
      is_read: false,
      recipient: 2
    },
    {
      id: 14,
      sender: {
        id: 5,
        username: "minhtam",
        avatar_user:
          "https://res.cloudinary.com/dmdljcwau/image/upload/v1708703297/avatar_user/gmmxwvrjlsfhfl94h4xt"
      },
      notice: "minhtam commented your post",
      created_at: "2024-02-23T16:50:54.749160Z",
      is_read: false,
      recipient: 2
    }
  ]

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
        {notification.length > 0 ? (
          <FlatList
            data={notification}
            // keyExtractor={(item) => item.id.toString()}
            renderItem={(item) => {
              return <NotificationCard item={item.item}/>;
            }}
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
  )
}

export default Notification
