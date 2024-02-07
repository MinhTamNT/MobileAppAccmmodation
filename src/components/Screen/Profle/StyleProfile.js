import { StyleSheet } from "react-native";
import { COLOR } from "../../../contants";

export const styleProfile = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 10,
    paddingVertical: 16,
  },
  ImageUser: {
    marginTop: 10,
  },
  content: {
    padding: 16,
  },
  HeaderDeatil: {
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  listItem: {
    flexDirection: "row",
    marginTop: 10,
    paddingVertical: 17,
    justifyContent: "space-between",
    borderBottomWidth: 0.2,
    borderBottomColor: COLOR.text_weak_color,
  },

  inforUser: {
    marginLeft: 12,
  },
  fotter: {
    padding: 16,
  },
  btnAction: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  footerText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
  },
});
