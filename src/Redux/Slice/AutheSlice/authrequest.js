import {
  registerFail,
  registerSuccess,
  registerStart,
  loginStart,
  loginFail,
  loginSuccess,
} from "./autheslice";
import Api, { authApi, endpoint } from "../../../Services/Config/Api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { HOST_API_CA } from "@env";
export const registerUser = async (form, dispatch, navigation) => {
  dispatch(registerStart());
  try {
    const response = await axios.post(
      `${HOST_API_CA}${endpoint.register}`,
      form
    );
    dispatch(registerSuccess(response.data));
    navigation.navigate("Login");
  } catch (error) {
    console.log(error.message);
    dispatch(registerFail());
  }
};

export const LoginUser = async (users, dispatch, navigation) => {
  dispatch(loginStart());
  try {
    let response = await Api.post(endpoint["login"], users);
    console.log(response.data);
    await AsyncStorage.setItem("access-token", response.data.access_token);
    const getUser = await authApi(response.data.access_token).get(
      endpoint["current_user"]
    );
    console.log(
      "AsyncStorage Data:",
      await AsyncStorage.getItem("access-token")
    );
    dispatch(
      loginSuccess({
        access_token: response.data.access_token,
        user: getUser.data,
      })
    );
    navigation.navigate("Home");
  } catch (error) {
    console.log(error.message);
    dispatch(loginFail());
  }
};
