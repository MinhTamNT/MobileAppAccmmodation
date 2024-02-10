import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../Redux/apiRequest";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const RequireUsers = ({ navigation, Component }) => {
  const auth = useSelector((state) => state.auth?.login.currentUser);
  const accessToken = auth?.access_token;
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUser = async () => {
      if (accessToken) {
        await AsyncStorage.setItem("access-token", accessToken);
        await getUser(dispatch, accessToken);
      } else {
        navigation.navigate("Login");
      }
    };
    fetchUser();
  }, [accessToken, dispatch, navigation]);

  return accessToken ? <Component /> : null;
};
