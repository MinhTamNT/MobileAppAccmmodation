import axios from "axios";
import { PROVINCE_API } from "@env";

export const fetchGetProvinces = async () => {
  try {
    const res = await axios.get(`${PROVINCE_API}/api/province/`);
    return res.data.results; // Make sure to return the data
  } catch (error) {
    console.log(error);
    throw error; // Rethrow the error to handle it in the calling component
  }
};
