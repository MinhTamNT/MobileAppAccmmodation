import {
  registerFail,
  registerSuccess,
  registerStart,
  loginStart,
  loginFail,
  loginSuccess,
} from "./autheslice";
import Api, { authApi, endpoint } from "../Services/Config/Api";
import {
  followUserFailed,
  followUserStart,
  followUserSuccess,
  getUserFailed,
  getUserStart,
  getUserSuccess,
  updateFail,
  updateStart,
  updateSuccess,
} from "./userSlice";
import {
  createAccommodationFailed,
  createAccommodationStart,
  createAccommodationSuccess,
  getAllAccommodationFail,
  getAllAccommodationStart,
  getAllAccommodationSuccess,
} from "./accommodation";
import {
  createPostFailed,
  createPostStart,
  createPostSuccess,
} from "./postSlices";
import { FIREBASE_AUTH } from "../Services/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInAnonymously,
} from "firebase/auth";
import {
  addCommentFail,
  addCommentSucess,
  addCommentstart,
} from "./commentSlice";
const auth = FIREBASE_AUTH;
export const registerUser = async (form, dispatch, navigation) => {
  dispatch(registerStart());
  try {
    const response = await Api.post(endpoint["register"], form);
    console.log(form);
    await createUserWithEmailAndPassword(auth, form.email, form.password);
    dispatch(registerSuccess(response.data));
    navigation.navigate("Login");
  } catch (error) {
    console.log(error.message);
    dispatch(registerFail());
  }
};

export const LoginUser = async (users, dispatch, navigation) => {
  dispatch(loginStart());
  dispatch(updateStart());

  try {
    let response = await Api.post(endpoint["login"], users);
    console.log("usersApi", users);
    await signInAnonymously(auth);
    dispatch(loginSuccess(response.data));
    navigation.navigate("Home");
  } catch (error) {
    dispatch(loginFail(error.response.data.message));
    dispatch(updateFail());
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
export const createAccommodation = async (dispatch, accommodation, token) => {
  console.log(token);
  try {
    dispatch(createAccommodationStart());
    const res = await authApi(token).post(
      endpoint["create_accomommdation"],
      accommodation,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    dispatch(createAccommodationSuccess(res.data));
  } catch (error) {
    console.log(error);
    dispatch(createAccommodationFailed());
  }
};
export const createPost = async (dispatch, newPost, token) => {
  dispatch(createPostStart());
  try {
    await authApi(token).post(endpoint["creare_post"], newPost, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    dispatch(createPostSuccess());
  } catch (error) {
    console.log(error);
    dispatch(createPostFailed());
  }
};
export const getAllAccommodation = async (dispatch) => {
  dispatch(getAllAccommodationStart());
  try {
    const res = await Api.get(endpoint["all_accommodation"]);
    dispatch(getAllAccommodationSuccess(res.data.results));
  } catch (error) {
    console.log(error);
    dispatch(getAllAccommodationFail());
  }
};
export const followUser = async (token, username, dispatch) => {
  dispatch(followUserStart());
  try {
    const res = await authApi(token).post(endpoint.follow_user(username));
    dispatch(followUserSuccess(res.data));
  } catch (error) {
    console.log(error);
    dispatch(followUserFailed());
  }
};
export const commentPost = async (token, newComment, dispatch, postId) => {
  dispatch(addCommentstart());
  try {
    await authApi(token).post(endpoint.comment_post(postId), newComment);
  } catch (error) {
    console.error("Axios Error:", error);
  }
};
