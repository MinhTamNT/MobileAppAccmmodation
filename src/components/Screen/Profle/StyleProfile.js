import { StyleSheet } from "react-native";
import { COLOR } from "../../../contants";

export const styleProfile = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:COLOR.gray_100
  },
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
    borderRadius: 6,
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
    color: "#333",
  },
  headerEdit: {
    marginTop: 30,
    padding: 5,
    borderRadius: 10,
  },
  dropDownContainer: {
    height: 40,
    marginVertical: 10,
  },
  dropDownStyle: {
    backgroundColor: "#fafafa",
    borderColor: "#ddd",
    borderWidth: 1,
  },
  dropDownLabel: {
    fontSize: 16,
    textAlign: "center",
    color: "#333",
  },
  selectedItemContainer: {
    backgroundColor: "#e0e0e0",
  },
  arrowIcon: {
    color: "#555",
  },
});
