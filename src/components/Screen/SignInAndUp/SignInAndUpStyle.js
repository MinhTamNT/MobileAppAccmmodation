import { StyleSheet } from "react-native";
import { COLOR } from "../../../contants";

export const style = StyleSheet.create({
  contain: {
    flex: 1,
    backgroundColor: "#ffff",
  },
  content: {
    paddingHorizontal: 21,
  },
  content_image: {
    alignItems: "center",
  },
  title: {
    marginBottom: 30,
    fontSize: 24,
    fontWeight: "700",
    fontFamily: "Poppins-Medium",
  },
  text_login: {
    fontFamily: "Poppins-Medium",
    fontSize: 28,
    color: "#333",
    fontWeight: "500",
    marginBottom: 30,
  },
  image: {
    width: "100%",
    height: 300,
    resizeMode: "contain",
  },
  imageAva: {
    borderRadius: 75,
    width: 150,
    height: 150,
    borderColor: COLOR.gray,
    borderWidth: 3,
  },
  imageRegister: {
    width: "100%",
    height: 100,
  },
  btn_login: {
    backgroundColor: COLOR.PRIMARY,
    padding: 20,
    borderRadius: 16,
    marginBottom: 40,
  },
  login_text: {
    color: COLOR.offWhite,
    textAlign: "center",
    fontSize: 16,
  },
  or: {
    textAlign: "center",
    color: COLOR.text_weak_color,
    fontSize: 12,
    marginBottom: 30,
    fontFamily: "Poppins-Regular",
  },
  login_other: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 30,
    marginBottom: 30,
  },
  btnLoginOther: {
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderColor: "#ddd",
  },
  register: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: "Poppins-Regular",
  },
  registerText: {
    fontFamily: "Poppins-Regular",
    color: COLOR.bg_color_blue_200,
  },
  btn_next: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  btnAction: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 5,
  },
  btnEdit: {
    position: "absolute",
    bottom: 0,
    right: "32%",
  },
  btnPrev: {
    position: "absolute",
    top: 40,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 2,
    gap: 2,
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },

  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  containerDown: {
    backgroundColor: "white",
    marginBottom: 10,
    paddingVertical: 12,
  },
});
