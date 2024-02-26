import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  FlatList,
} from "react-native";
import { useSelector } from "react-redux";
import { authApi, endpoint } from "../../../Services/Config/Api";
import { Location } from "iconsax-react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const OwnerInfo = ({ owner }) => (
  <View style={styles.owner}>
    <Image source={{ uri: owner?.avatar_user }} style={styles.ownerImage} />
    <Text>{owner?.username}</Text>
  </View>
);

const AddressInfo = ({ accommodation }) => (
  <View style={styles.addressInfo}>
    <Location size="24" color="#697689" />
    <Text>
      {accommodation?.address} {accommodation?.city} {accommodation?.district}
    </Text>
  </View>
);

const AccommoUser = () => {
  const auth = useSelector((state) => state?.auth?.currentUser);
  const [currentAcco, setCurrentAcco] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await authApi(auth?.access_token).get(
          endpoint["accomdationUser"]
        );
        setCurrentAcco(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <View style={styles.wrapper}>
      {currentAcco.map((accommodation) => (
        <View key={accommodation.id} style={styles.wrapperContent}>
          <OwnerInfo owner={accommodation?.owner} />
          <AddressInfo accommodation={accommodation} />
          <View style={styles.coordinateInfo}>
            <MaterialCommunityIcons
              name="longitude"
              size={24}
              color="#697689"
            />
            <Text>{accommodation?.longitude}</Text>
          </View>
          <View style={styles.coordinateInfo}>
            <MaterialCommunityIcons name="latitude" size={24} color="#697689" />
            <Text>{accommodation?.latitude}</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {accommodation.image.map((image, index) => (
              <Image
                key={index}
                source={{ uri: image.image }}
                style={styles.accommodaPost}
                resizeMode="cover"
              />
            ))}
          </ScrollView>
          <Text style={styles.description}>{accommodation?.description}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 16,
    marginTop: 10,
  },
  wrapperContent: {
    padding: 10,
    height: 450,
    borderRadius: 10,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  owner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  ownerImage: {
    width: 50,
    height: 50,
    resizeMode: "cover",
    borderRadius: 50,
  },
  addressInfo: {
    marginLeft: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  coordinateInfo: {
    marginLeft: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  accommodationImage: {
    width: 200,
    height: 200,
    borderRadius: 8,
    marginRight: 10,
  },
  description: {
    padding: 10,
  },
  accommodaPost: {
    width: 150,
    height: 150,
    borderRadius: 8,
    marginRight: 10,
  },
});

export default AccommoUser;
