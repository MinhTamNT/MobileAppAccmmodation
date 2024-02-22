import axios from "axios";
export const endpoint = {
  register: "/users/register/",
  login: "/o/token/",
  current_user: "/users/current_user/",
  logout: "/users/logout/",
  update_user: (userID) => `/users/${userID}/update/`,
  create_accomommdation: "/accommodation/create/",
  creare_post: "/post/create/",
  all_accommodation: "/accommodation/",
  all_post: (pageNumber) => `/post/?page=${pageNumber}`,
  user_accommodation: "/accommodation/accmmodation_user/",
  follow_user: (username) => `/users/follow/?username=${username}`,
  comment_post: (postId) => `/post/${postId}/comment/`,
  comment_of_post: (postId) => `/post/${postId}/comments_of_post/`,
};

export const authApi = (accessToken) =>
  axios.create({
    baseURL: "http://192.168.1.7:8000/",
    headers: { Authorization: `bearer ${accessToken}` },
  });
export default axios.create({
  baseURL: "http://192.168.1.7:8000/",
});
