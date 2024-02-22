import { View, Text, StyleSheet, TouchableOpacity } from "react-native"

const HomeBtn = ({ name }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        console.log({ name })
      }}
    >
      <View style={styles.container}>
        <Text style={styles.font}>{name}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "auto",
    height: 50,
    backgroundColor: "pink",
    marginRight: 10,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20
  },
  font: {
    fontSize: 16,
    color: "white",
    fontWeight: "500"
  }
})

export default HomeBtn
