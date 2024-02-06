import axios from "axios";
export const endpoint = {
  register: "/users/register/",
  login: "/o/token/",
  current_user: "/users/current_user/",
};

export const authApi = (accessToken) =>
  axios.create({
    baseURL: "http://10.0.2.2:8000",
    headers: { Authorization: `bearer ${accessToken}` },
  });
export default axios.create({
  baseURL: "http://10.0.2.2:8000",
});
