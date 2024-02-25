import React, { useEffect, useState } from "react";
import { StyleSheet, View, Image, Text } from "react-native";
const HomeList = ({ item }) => {
  const formatToVND = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: item?.image[0]?.image,
        }}
        style={styles.image}
      />
      <View style={styles.content}>
        <Text style={styles.title}>{item.address}</Text>
        <View style={styles.dash}></View>
        <Text style={styles.Rp}>
          Rent price: {formatToVND(item.rent_cost)}/month
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
