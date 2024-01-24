import { StyleSheet } from "react-native";
import { COLOR } from "../../../contants";

export const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container_content: {
    display: "flex",
  },
  content_image: {
    flexDirection: "row",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: 300,
  },
  formLogin: {
    flex: 1,
    backgroundColor: COLOR.offWhite,
    paddingHorizontal: 32,
    paddingTop: 32,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  btnForgot: {
    alignItems: "flex-end",
  },
  btnLogin: {
    marginTop: 10,
    backgroundColor: COLOR.PRIMARY,
    paddingVertical: 12,
    borderRadius: 10,
  },
  textDefautlt: {
    fontFamily: "Poppins-Regular",
    fontSize: 12,
  },
  textLogin: {
    fontFamily: "Poppins-Regular",
    fontSize: 16,
    color: COLOR.offWhite,
    textAlign: "center",
  },
  OrLogin: {
    textAlign: "center",
    paddingVertical: 5,
    fontSize: 16,
  },
  loginOther: {
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "center",
    gap: 50,
  },
  btnLoginOther: {
    backgroundColor: "#dfe5eb",
    padding: 8,
    borderRadius: 20,
  },
  account: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 5,
  },
  account_text: {
    fontSize: 16,
    fontWeight: "500",
  },
});
