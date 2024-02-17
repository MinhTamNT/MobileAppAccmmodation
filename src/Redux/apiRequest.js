import {
  registerFail,
  registerSuccess,
  registerStart,
  loginStart,
  loginFail,
  loginSuccess,
  logoutStart,
  logoutFailed,
  logoutSuccess,
} from "./autheslice";
import Api, { authApi, endpoint } from "../Services/Config/Api";
import {
  getUserFailed,
  getUserStart,
  getUserSuccess,
  updateFail,
  updateStart,
  updateSuccess,
} from "./userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const registerUser = async (form, dispatch, navigation) => {
  dispatch(registerStart());
  try {
    const response = await Api.post(endpoint["register"], form);
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
    console.log(response.data.access_token);
    dispatch(loginSuccess(response.data));
    navigation.navigate("Home");
  } catch (error) {
    console.log(error.message);
    dispatch(loginFail());
  }
};

export const LogoutUser = async (dispatch, navigation, token) => {
  dispatch(logoutStart());
  try {
    await AsyncStorage.removeItem("access-token");
    await authApi(token).post(endpoint["logout"]);
    dispatch(logoutSuccess());
    navigation.navigate("Login");
  } catch (error) {
    console.error("Logout Error:", error);
    dispatch(logoutFailed());
  }
};

export const updateUser = async (id, token, newUser, dispatch) => {
  dispatch(updateStart());
  try {
    const res = await authApi(token).patch(endpoint.update_user(id), newUser);
    console.log("Update User", res.data);
    dispatch(updateSuccess(res.data));
  } catch (error) {
    dispatch(updateFail());
    console.log(error);
  }
};

export const getUser = async (dispatch, token) => {
  dispatch(getUserStart());
  dispatch(updateStart());
  try {
    const respon = await authApi(token).get(endpoint["current_user"]);
    dispatch(getUserSuccess(respon.data));
    dispatch(updateSuccess(respon.data));
  } catch (error) {
    console.log(error);
    dispatch(getUserFailed());
    dispatch(updateFail());
  }
};
