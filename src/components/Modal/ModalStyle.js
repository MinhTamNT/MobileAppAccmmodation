import { StyleSheet, Platform } from "react-native";
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
  searchStyle: {
    width: "100%",
    borderWidth: 1,
    height: 50,
    borderRadius: 10,
    borderColor: COLOR.input_default,
    marginVertical: 10,
    paddingLeft: 34,
  },
  actionFindProvince: { position: "absolute", top: 22, left: 2 },
  selectDistrictItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "white", // Set your desired background color
    marginVertical: 10,
    borderRadius: 5,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 1,
      },
      android: {
        elevation: 2,
      },
    }),
  },
});
