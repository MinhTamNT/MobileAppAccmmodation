import { StyleSheet } from "react-native";
import { COLOR } from "../../../../contants";
export const style = StyleSheet.create({
  contain: {
    flex: 1,
    backgroundColor: "white",
  },
  registerForm: {
    flex: 1,
    backgroundColor: COLOR.offWhite,
    paddingHorizontal: 32,
    paddingTop: 32,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  Step: {
    marginBottom: 10,
  },
  btnAction: {
    paddingTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  btnAction_content: {
    padding: 12,
    backgroundColor: COLOR.bg_color_modal,
    borderRadius: 10,
  },
  choosenFile: {
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 10,
  },
  ImageUser: {
    width: 200,
    height: 200,
    borderRadius: 50,
    marginBottom: 20,
  },
  errorMessgae: {
    paddingHorizontal: 10,
    color: "red",
    fontSize: 15,
  },
});
