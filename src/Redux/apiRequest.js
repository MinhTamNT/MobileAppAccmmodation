import {
  registerFail,
  registerSuccess,
  registerStart,
  loginStart,
  loginFail,
  loginSuccess,
} from "./autheslice";
import Api, { authApi, endpoint, endpointAdmin } from "../Services/Config/Api";
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
  commentAccommodationFail,
  commentAccommodationSuccess,
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
  editPostFailed,
  editPostStart,
  editPostSuccess,
} from "./postSlices";
import {
  addCommentFail,
  addCommentSucess,
  addCommentstart,
  deleteCommentFailed,
  deleteCommentStart,
  deleteCommentSuccess,
  relyCommentFail,
  relyCommentStart,
  relyCommentSuccess,
} from "./commentSlice";
import Toast from "react-native-toast-message";

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

export const LoginUser = async (users, dispatch, navigation, showToast) => {
  dispatch(loginStart());
  dispatch(updateStart());

  try {
    let response = await Api.post(endpoint["login"], users);
    dispatch(loginSuccess(response.data));
    if (response.status === 400) {
      showToast("Check username or password");
    }
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
export const commentAccommodation = async (
  dispatch,
  token,
  newComent,
  commentId
) => {
  dispatch(commentAccommodationSuccess());
  try {
    await authApi(token).post(
      endpoint.comment_Accommodation(commentId),
      newComent
    );
  } catch (error) {
    console.log(error);
    dispatch(commentAccommodationFail());
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
    Toast.show({
      type: "success",
      text1: "Follower Success",
    });
  } catch (error) {
    console.log(error);
    dispatch(followUserFailed());
    Toast.show({
      type: "error",
      text1: "Follower Success",
    });
  }
};
export const commentPost = async (token, newComment, dispatch, postId) => {
  dispatch(addCommentstart());
  try {
    await authApi(token).post(endpoint.comment_post(postId), newComment);
    dispatch(addCommentSucess());
    Toast.show({
      type: "success",
      text1: "Comment Success",
    });
  } catch (error) {
    console.error("Axios Error:", error);
    dispatch(addCommentFail());
    Toast.show({
      type: "error",
      text1: "Comment Success",
    });
  }
};
export const verifyPost = async (token, dispatch, postId) => {
  dispatch(editPostStart());
  try {
    await authApi(token).put(endpointAdmin.verifypost(postId));
    dispatch(editPostSuccess());
  } catch (error) {
    console.log(error);
    dispatch(editPostFailed());
  }
};
export const relyCommentPrev = async (
  token,
  comentRely,
  dispatch,
  commentId
) => {
  dispatch(relyCommentStart());
  try {
    await authApi(token).post(endpoint.rely_comment(commentId), comentRely);
    dispatch(relyCommentSuccess());
  } catch (error) {
    console.log(error);
    dispatch(relyCommentFail());
  }
};
export const deletedComment = async (token, dispatch, commetId) => {
  dispatch(deleteCommentStart());
  try {
    await authApi(token).delete(endpoint.delete_comment(commetId));
    dispatch(deleteCommentSuccess());
  } catch (error) {
    console.log(error);
    dispatch(deleteCommentFailed());
  }
};
export const deletedCommentAccomodation = async (token, dispatch, commetId) => {
  dispatch(deleteCommentStart());
  try {
    await authApi(token).delete(
      endpoint.deleted_commentAccommodation(commetId)
    );
    dispatch(deleteCommentSuccess());
  } catch (error) {
    console.log(error);
    dispatch(deleteCommentFailed());
  }
};

export const relyCommentPrevAcco = async (
  token,
  comentRely,
  dispatch,
  commentId
) => {
  dispatch(relyCommentStart());
  try {
    await authApi(token).post(
      endpoint.rely_commentAccommodationn(commentId),
      comentRely
    );
    dispatch(relyCommentSuccess());
  } catch (error) {
    console.log(error);
    dispatch(relyCommentFail());
  }
};
