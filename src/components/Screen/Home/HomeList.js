import { StyleSheet, View, Image, Text } from "react-native";

const HomeList = ({ item }) => {
  const formatToVND = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };
  return (
    <View style={style.container}>
      <Image
        source={{
          uri: item.image[0].image,
        }}
        style={style.image}
      />
      <View style={style.content}>
        <Text style={style.title}>{item.address}</Text>
        <View style={style.dash}></View>
        <Text style={style.Rp}>
          Rent price: {formatToVND(item.rent_cost)}/month
        </Text>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    height: 150,
    flexDirection: "row",
    padding: 15,
    marginTop: -25,
  },
  image: {
    width: "30%",
    height: 100,
    resizeMode: "cover",
    borderRadius: 10,
    marginRight: 10,
    marginTop: 10,
  },
  content: {
    width: "70%",
    justifyContent: "center",
  },
  dash: {
    backgroundColor: "black",
    height: 1,
  },
  title: {
    fontSize: 16,
    marginVertical: 5,
    fontWeight: "bold",
  },

  Rp: {
    fontSize: 14,
    marginVertical: 5,
    color: "#ff3787",
    fontWeight: "600",
  },
});

export default HomeList;
