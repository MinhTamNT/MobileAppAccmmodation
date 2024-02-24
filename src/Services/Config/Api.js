import axios from "axios";
export const endpoint = {
  register: "/users/register/",
  login: "/o/token/",
  current_user: "/users/current_user/",
  logout: "/users/logout/",
  update_user: (userID) => `/users/${userID}/update/`,
  create_accomommdation: "/accommodation/create/",
  creare_post: "/post/create/",
  all_accommodation: (pageNumber, limit) =>
    `/accommodation/?page=${pageNumber}&limit=${limit}`,
  current_accommodation: (pageNumber, latitude, longitude) =>
    `accommodation/?latitude=${latitude}&longitude=${longitude}&page=${pageNumber}&limit=3`,
  all_post: (pageNumber) => `/post/?page=${pageNumber}&limit=3`,
  user_accommodation: "/accommodation/accmmodation_user/",
  follow_user: (username) => `/users/follow/?username=${username}`,
  comment_post: (postId) => `/post/${postId}/comment/`,
  comment_of_post: (postId) => `/post/${postId}/comments_of_post/`,
  rely_comment: (commentId) => `/comment/${commentId}/reply/`,
  edit_comment: (commentId) => `/comment/${commentId}/edit/`,
  delete_comment: (commentId) => `/comment/${commentId}/delete/`,
  user_post: "/post/post_of_user/",
  map_accommodation: (latitude, longitude) =>
    `/accommodation/?latitude=${latitude}&longitude=${longitude}&limit=20`,
  notifcation_uer: "/notification/notification_user/",
  mark_notification_read: (notiId) => `/notification/${notiId}/mark_as_read/`,
};
export const endpointAdmin = {
  postIsApproved: "/post/not_approved/",
  accommodationIsVerify: "/accommodation/not_verified/",
  verifypost: (postId) => `/post/${postId}/edit_approved/`,
};
export const authApi = (accessToken) =>
  axios.create({
    baseURL: "http://192.168.0.104:8000/",
    headers: { Authorization: `bearer ${accessToken}` },
  });
export default axios.create({
  baseURL: "http://192.168.0.104:8000/",
});
