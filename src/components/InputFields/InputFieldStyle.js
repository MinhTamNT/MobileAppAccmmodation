import { StyleSheet } from "react-native";
import { COLOR } from "../../contants";
export const styleFields = StyleSheet.create({
  labelText: {
    fontFamily: "Poppins-Medium",
    marginLeft: 4,
  },
  inputForm: {
    padding: 16,
    backgroundColor: COLOR.color_white,
    color: COLOR.gray,
    borderRadius: 10,
    marginBottom: 10,
  },
  errorInput: {
    borderColor: COLOR.PRIMARY,
  },
  errorText: {
    paddingHorizontal: 10,
    color: COLOR.PRIMARY,
  },
});
