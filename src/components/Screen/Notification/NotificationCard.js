import { View, Text, StyleSheet, Image, Dimensions } from "react-native"

const { width: screenWidth } = Dimensions.get("window")

const NotificationCard = ({ item }) => {
  return (
    <View style={style.container}>
      <Image source={{ uri: item.sender.avatar_user }} style={style.avatar} />
      <View style={style.content}>
        <View style={style.row}>
          <Text style={style.user}>{item.sender.username}</Text>
          <Text>12h</Text>
        </View>
        <View style={style.dash}></View>
        <Text style={style.notify}>{item.notice}</Text>
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  row:{
    flexDirection: "row",
    justifyContent: 'space-between'
  },
  container: {
    height: 100,
    flexDirection: "row",
    backgroundColor: "#08c0ff",
    alignItems: "center",
    padding: 15,
    marginBottom: 10,
    borderRadius: 20
  },
  avatar: {
    width: 60,
    height: 60,
    resizeMode: "cover",
    borderRadius: 50,
    marginRight: 10
  },
  content: {
    width: "80%",
    justifyContent: "center",
    marginRight: 15
  },
  dash: {
    height: 1,
    backgroundColor: "#000"
  },
  user: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  notify: {
    fontSize: 18,
    fontWeight: 500,
    marginTop: 5
  }

})

export default NotificationCard
