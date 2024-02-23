import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Api, { endpointAdmin } from "../../../Services/Config/Api";
import { postapproved } from "../../SuggestPost/PostApproved/PostApprovedStyle";
import Toast from "react-native-toast-message";
import { AntDesign } from "@expo/vector-icons";
const TabViewPostAccepted = () => {
  const [accommodationIsApproved, setAccommodationApproved] = useState([]);
  const auth = useSelector((state) => state?.auth?.currentUser);
  const dispatch = useDispatch();
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Api.get(endpointAdmin["accommodationIsVerify"]);
        setAccommodationApproved(res.data);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  const handlerVerifyAccommodation = async (accommodationId) => {
    Toast.show({
      type: "success",
      text1: "Verify successfully",
      position: "top",
    });
    setReload(!reload);
  };
  return (
    <ScrollView style={postapproved.container}>
      {accommodationIsApproved && accommodationIsApproved.length > 0 ? (
        accommodationIsApproved.map((accommodation) => (
          <View key={accommodation.id} style={postapproved.postContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {accommodation.image.map((image, index) => (
                <Image
                  key={index}
                  source={{ uri: image.image }}
                  style={postapproved.postImage}
                  resizeMode="cover"
                />
              ))}
            </ScrollView>
            <Text style={postapproved.postTitle}>{accommodation.address}</Text>
            <Text style={postapproved.postContent}>{accommodation.city}</Text>
            <Text style={postapproved.postContent}>
              People : {accommodation.number_of_people}
            </Text>
            <View style={postapproved.buttonContainer}>
              <TouchableOpacity
                style={[postapproved.button, { backgroundColor: "#181818" }]}
                onPress={() => handlerVerifyAccommodation(accommodation.id)}
              >
                <Text style={postapproved.buttonText}>Accept</Text>
                <AntDesign name="checkcircleo" size={14} color="green" />
              </TouchableOpacity>
              <TouchableOpacity
                style={[postapproved.button, { backgroundColor: "#e62222" }]}
              >
                <Text style={postapproved.buttonText}>Delete</Text>
                <AntDesign name="delete" size={14} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        ))
      ) : (
        <Text style={{ justifyContent: "center", alignItems: "center" }}>
          No approved accommodations found.
        </Text>
      )}
    </ScrollView>
  );
};

export default TabViewPostAccepted;
