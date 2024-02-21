import { View, Text } from "react-native";
import React from "react";
import axios from "axios";
import { useEffect } from "react";

const TabViewMessage = () => {
  useEffect(() => {
    const handlergetUser = async () => {
      let user = await axios.get("http://192.168.0.104:8000/users/");
    };
    handlergetUser();
  }, []);
  return (
    <View>
      <Text>TabViewMessage</Text>
    </View>
  );
};

export default TabViewMessage;
