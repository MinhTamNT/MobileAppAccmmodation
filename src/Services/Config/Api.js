import axios from "axios";
import { HOST_API } from "@env";
export const endpoint = {
  register: "/users/register/",
  login: "/o/token/",
};

export default axios.create({
  baseURL: "http://10.0.2.2:8000",
});
