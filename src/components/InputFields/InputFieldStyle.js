import { StyleSheet } from "react-native";
import { COLOR } from "../../contants";
export const styleFields = StyleSheet.create({
  labelText: {
    marginLeft: 4,
    marginBottom: 5,
  },

  inputForm: {
    padding: 16,
    backgroundColor: COLOR.color_white,
    color: COLOR.gray,
    borderRadius: 10,
    marginTop: 2,
    marginBottom: 5,
  },
  errorInput: {
    borderColor: COLOR.PRIMARY,
  },
  errorText: {
    paddingHorizontal: 5,
    color: COLOR.PRIMARY,
  },
  PriceFields: {
    width: 180,
    backgroundColor: COLOR.offWhite,
  },
  searchScreen: {
    width: "100%",
  },
  formEdit: {
    backgroundColor: COLOR.offWhite,
    marginBottom: 2,
  },
  iconContainer: {
    position: "absolute",
    zIndex: 999,
    right: 12,
    top: 26,
  },
});
