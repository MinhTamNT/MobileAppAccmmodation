import {
  registerFail,
  registerSuccess,
  registerStart,
  loginStarts,
  loginSuccess,
  loginFail,
} from "./autheslice";
import Api, { endpoint } from "../../../Services/Config/Api";

export const registerUser = async (from, dispatch) => {
  dispatch(registerStart());
  try {
    const response = await Api.post(endpoint["register"], from, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.log(error.message);
    dispatch(registerFail());
  }
};

export const LoginUser = async (user, dispatch) => {
  dispatch(loginStarts());
  try {
    const response = await Api.post(endpoint["login"], user);
    console.log(response.data);
    dispatch(loginSuccess(response.data));
  } catch (error) {
    dispatch(loginFail());
    console.log(error);
  }
};
