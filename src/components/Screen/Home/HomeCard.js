import { ImageBackground, StyleSheet, Text, View } from "react-native"
import { COLOR } from "../../../contants"

const HomeCard = ({ accommodation }) => {
  console.log(accommodation)
  return (
    <ImageBackground
      style={style.container}
      resizeMode="cover"
      borderRadius={style.container.borderRadius}
      source={{uri: }}
    >
      <View style={style.text_container}>
        <Text style={style.title}>Hồ Chí Minh</Text>
        <Text style={style.title}>Rent cost: 2500000/mon</Text>
      </View>
    </ImageBackground>
  )
}

const style = StyleSheet.create({
  container: {
    width: 280,
    height: 300,
    backgroundColor: "pink",
    borderRadius: 20
  },
  text_container: {
    padding: 8,
    marginTop: "auto",
    borderBottomEndRadius: 20,
    borderBottomLeftRadius: 20,
    backgroundColor: COLOR.bg_color_modal
  },
  title: {
    color: COLOR.offWhite,
    lineHeight: 30,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "left"
  }
})

export default HomeCard
