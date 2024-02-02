import axios from "axios";
import { PROVINCE_API } from "@env";

export const fetchGetProvinces = async () => {
  try {
    const res = await axios.get(`${PROVINCE_API}/api/province/`);
    return res.data.results;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const fetchGetDistrict = async (province_id) => {
  try {
    const res = await axios.get(`${PROVINCE_API}/api/province/district/${province_id}`);
    return res.data.results;
  } catch (error) {
    console.log(error.message);
  }
};
