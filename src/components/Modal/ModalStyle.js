import { StyleSheet } from "react-native";
import { COLOR } from "../../contants";
export const ModalStyle = StyleSheet.create({
  content_modal: {
    height: 550,
    width: "100%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 20,
  },
  btnActionApply: {
    backgroundColor: COLOR.bg_color_blue_200,
    padding: 10,
    borderRadius: 20,
  },
  btnActionCancel: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 20,
    borderColor: COLOR.PRIMARY,
  },
  textApply: {
    color: COLOR.offWhite,
    fontSize: 16,
  },
  textCancel: {
    color: COLOR.PRIMARY,
    fontSize: 16,
  },
});
