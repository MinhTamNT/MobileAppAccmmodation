import { StyleSheet } from "react-native";
import { COLOR } from "../../../contants";

export const styleProfile = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 10,
    paddingVertical: 16,
  },
  ImageUser: {
    marginTop: 10,
    borderRadius: 50,
  },
  content: {
    padding: 16,
  },
  HeaderDeatil: {
    padding: 10,
    width: "100%",
    height: 230,
    backgroundColor: "#AF0C6E",
    shadowColor: "#000",
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
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

  //Detail
  headerText: {
    color: "#fff",
  },
  headerEdit: {
    marginTop: 30,
    borderWidth: 1,
    padding: 5,
    borderRadius: 10,
    borderColor: "#fff",
  },
});
