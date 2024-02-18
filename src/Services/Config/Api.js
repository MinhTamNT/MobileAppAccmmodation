import axios from "axios";
export const endpoint = {
  register: "/users/register/",
  login: "/o/token/",
  current_user: "/users/current_user/",
  logout: "/users/logout/",
  update_user: (userID) => `/users/${userID}/update/`,
  create_accomommdation: "/accommodation/create/",
};

export const authApi = (accessToken) =>
  axios.create({
    baseURL: "http://192.168.0.104:8000",
    headers: { Authorization: `bearer ${accessToken}` },
  });
export default axios.create({
  baseURL: "http://192.168.0.104:8000",
});
